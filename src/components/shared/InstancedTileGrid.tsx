import { useRef, useMemo, useEffect } from "react";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { TileType } from "@/types/map";
import { ELEVATION_UNIT, getTileBaseHeight } from "@/constants/grid.constants";
import { getTileColor } from "@/utils/colors.utils";

interface InstancedTileGridProps {
  width: number;
  height: number;
  tiles: TileType[][];
  heightmap: number[][];
  hoveredTile?: { x: number; y: number } | null;
  zoom?: number;
}

const TILE_TYPES = [
  TileType.Ground,
  TileType.Path,
  TileType.Water,
  TileType.Blocked,
  TileType.Spawn,
  TileType.Exit,
] as const;

// LOD thresholds - zoom level determines LOD
// Higher LOD = fewer tiles rendered = better performance at low zoom
const LOD_THRESHOLDS = [
  { maxZoom: 5, step: 16 },   // LOD 4: very far - every 16th tile
  { maxZoom: 8, step: 8 },    // LOD 3: far - every 8th tile
  { maxZoom: 15, step: 4 },   // LOD 2: medium - every 4th tile
  { maxZoom: 25, step: 2 },   // LOD 1: close - every 2nd tile
  { maxZoom: Infinity, step: 1 }, // LOD 0: full detail
];

function getLODStep(zoom: number): number {
  for (const { maxZoom, step } of LOD_THRESHOLDS) {
    if (zoom <= maxZoom) return step;
  }
  return 1;
}

// Pre-create materials for each tile type
const tileMaterials: Record<TileType, THREE.MeshStandardMaterial> = {
  [TileType.Ground]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Ground, false) }),
  [TileType.Path]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Path, false) }),
  [TileType.Water]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Water, false) }),
  [TileType.Blocked]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Blocked, false) }),
  [TileType.Spawn]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Spawn, false) }),
  [TileType.Exit]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Exit, false) }),
};

// Cache geometries for different LOD levels
const geometryCache = new Map<number, THREE.BoxGeometry>();
function getGeometryForLOD(step: number): THREE.BoxGeometry {
  if (!geometryCache.has(step)) {
    const size = step * 0.95 + (step - 1) * 0.05; // Account for gaps
    geometryCache.set(step, new THREE.BoxGeometry(size, 1, size));
  }
  return geometryCache.get(step)!;
}

export function InstancedTileGrid({
  width,
  height,
  tiles,
  heightmap,
  hoveredTile,
  zoom = 50,
}: InstancedTileGridProps) {
  const meshRefs = useRef<Record<TileType, THREE.InstancedMesh | null>>({
    [TileType.Ground]: null,
    [TileType.Path]: null,
    [TileType.Water]: null,
    [TileType.Blocked]: null,
    [TileType.Spawn]: null,
    [TileType.Exit]: null,
  });

  const hoveredMeshRef = useRef<THREE.InstancedMesh | null>(null);

  // Calculate LOD step based on zoom
  const lodStep = useMemo(() => getLODStep(zoom), [zoom]);

  // Get geometry for current LOD
  const geometry = useMemo(() => getGeometryForLOD(lodStep), [lodStep]);

  // Count tiles per type at current LOD level
  const tileCounts = useMemo(() => {
    const counts: Record<TileType, number> = {
      [TileType.Ground]: 0,
      [TileType.Path]: 0,
      [TileType.Water]: 0,
      [TileType.Blocked]: 0,
      [TileType.Spawn]: 0,
      [TileType.Exit]: 0,
    };

    // Sample tiles based on LOD step
    for (let x = 0; x < width; x += lodStep) {
      for (let y = 0; y < height; y += lodStep) {
        // Get dominant tile type in this LOD cell
        const type = getDominantTileType(tiles, x, y, lodStep, width, height);
        counts[type]++;
      }
    }

    return counts;
  }, [tiles, width, height, lodStep]);

  // Update instance matrices when tiles/heightmap/LOD change
  useEffect(() => {
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);
    const quaternion = new THREE.Quaternion();

    const currentIndices: Record<TileType, number> = {
      [TileType.Ground]: 0,
      [TileType.Path]: 0,
      [TileType.Water]: 0,
      [TileType.Blocked]: 0,
      [TileType.Spawn]: 0,
      [TileType.Exit]: 0,
    };

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const halfStep = lodStep / 2;

    // Sample tiles based on LOD step
    for (let x = 0; x < width; x += lodStep) {
      for (let y = 0; y < height; y += lodStep) {
        const type = getDominantTileType(tiles, x, y, lodStep, width, height);
        const avgHeight = getAverageHeight(heightmap, x, y, lodStep, width, height);
        const baseHeight = getTileBaseHeight(type);
        const totalHeight = baseHeight + avgHeight * ELEVATION_UNIT;

        // Position at center of LOD cell
        position.set(
          x + halfStep - halfWidth,
          totalHeight / 2,
          y + halfStep - halfHeight
        );
        scale.set(1, totalHeight, 1);

        matrix.compose(position, quaternion, scale);

        const mesh = meshRefs.current[type];
        if (mesh) {
          mesh.setMatrixAt(currentIndices[type], matrix);
        }

        currentIndices[type]++;
      }
    }

    // Mark all meshes as needing update
    for (const type of TILE_TYPES) {
      const mesh = meshRefs.current[type];
      if (mesh && mesh.instanceMatrix) {
        mesh.instanceMatrix.needsUpdate = true;
      }
    }
  }, [tiles, heightmap, width, height, lodStep]);

  // Update hovered tile (always full resolution for interaction)
  useEffect(() => {
    const mesh = hoveredMeshRef.current;
    if (!mesh) return;

    if (!hoveredTile) {
      mesh.count = 0;
      return;
    }

    mesh.count = 1;

    const { x, y } = hoveredTile;
    const type = tiles[x]?.[y] ?? TileType.Ground;
    const elevation = heightmap[x]?.[y] ?? 0;
    const baseHeight = getTileBaseHeight(type);
    const totalHeight = baseHeight + elevation * ELEVATION_UNIT;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3(
      x - width / 2 + 0.5,
      totalHeight / 2,
      y - height / 2 + 0.5
    );
    const scaleVec = new THREE.Vector3(1, totalHeight, 1);

    matrix.compose(position, new THREE.Quaternion(), scaleVec);
    mesh.setMatrixAt(0, matrix);
    mesh.instanceMatrix.needsUpdate = true;

    (mesh.material as THREE.MeshStandardMaterial).color.set(
      getTileColor(type, true)
    );
  }, [hoveredTile, tiles, heightmap, width, height]);

  // Single tile geometry for hover highlight
  const singleTileGeometry = useMemo(() => new THREE.BoxGeometry(0.95, 1, 0.95), []);

  return (
    <group>
      {TILE_TYPES.map((type) => (
        <instancedMesh
          key={`${type}-${lodStep}`}
          ref={(mesh) => {
            meshRefs.current[type] = mesh;
          }}
          args={[geometry, tileMaterials[type], tileCounts[type] || 1]}
          count={tileCounts[type]}
          frustumCulled={false}
        />
      ))}

      <instancedMesh
        ref={hoveredMeshRef}
        args={[singleTileGeometry, new THREE.MeshStandardMaterial(), 1]}
        count={0}
        frustumCulled={false}
        renderOrder={1}
      />
    </group>
  );
}

/**
 * Get the dominant (most common) tile type in a LOD cell
 */
function getDominantTileType(
  tiles: TileType[][],
  startX: number,
  startY: number,
  step: number,
  width: number,
  height: number
): TileType {
  if (step === 1) {
    return tiles[startX]?.[startY] ?? TileType.Ground;
  }

  const counts: Record<TileType, number> = {
    [TileType.Ground]: 0,
    [TileType.Path]: 0,
    [TileType.Water]: 0,
    [TileType.Blocked]: 0,
    [TileType.Spawn]: 0,
    [TileType.Exit]: 0,
  };

  // Priority tiles (always shown if present in cell)
  let hasSpawn = false;
  let hasExit = false;
  let hasPath = false;

  for (let dx = 0; dx < step && startX + dx < width; dx++) {
    for (let dy = 0; dy < step && startY + dy < height; dy++) {
      const type = tiles[startX + dx]?.[startY + dy] ?? TileType.Ground;
      counts[type]++;

      if (type === TileType.Spawn) hasSpawn = true;
      if (type === TileType.Exit) hasExit = true;
      if (type === TileType.Path) hasPath = true;
    }
  }

  // Priority: Spawn > Exit > Path > most common
  if (hasSpawn) return TileType.Spawn;
  if (hasExit) return TileType.Exit;
  if (hasPath) return TileType.Path;

  // Return most common type
  let maxCount = 0;
  let dominantType: TileType = TileType.Ground;
  for (const type of TILE_TYPES) {
    if (counts[type] > maxCount) {
      maxCount = counts[type];
      dominantType = type;
    }
  }

  return dominantType;
}

/**
 * Get average height in a LOD cell
 */
function getAverageHeight(
  heightmap: number[][],
  startX: number,
  startY: number,
  step: number,
  width: number,
  height: number
): number {
  if (step === 1) {
    return heightmap[startX]?.[startY] ?? 0;
  }

  let sum = 0;
  let count = 0;

  for (let dx = 0; dx < step && startX + dx < width; dx++) {
    for (let dy = 0; dy < step && startY + dy < height; dy++) {
      sum += heightmap[startX + dx]?.[startY + dy] ?? 0;
      count++;
    }
  }

  return count > 0 ? sum / count : 0;
}

// Interaction plane for raycasting
interface InteractionPlaneProps {
  width: number;
  height: number;
  onTileHover: (tile: { x: number; y: number } | null) => void;
  onTileClick: (tile: { x: number; y: number }) => void;
  onPointerDown?: (tile: { x: number; y: number }) => void;
  onPointerUp?: () => void;
  onPointerMove?: (tile: { x: number; y: number }) => void;
}

export function InteractionPlane({
  width,
  height,
  onTileHover,
  onTileClick,
  onPointerDown,
  onPointerUp,
  onPointerMove,
}: InteractionPlaneProps) {
  const planeRef = useRef<THREE.Mesh>(null);

  const worldToGrid = (point: THREE.Vector3) => {
    const gridX = Math.floor(point.x + width / 2);
    const gridY = Math.floor(point.z + height / 2);

    if (gridX >= 0 && gridX < width && gridY >= 0 && gridY < height) {
      return { x: gridX, y: gridY };
    }
    return null;
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const tile = worldToGrid(e.point);
    onTileHover(tile);
    if (tile && onPointerMove) {
      onPointerMove(tile);
    }
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const tile = worldToGrid(e.point);
    if (tile && onPointerDown) {
      onPointerDown(tile);
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (onPointerUp) {
      onPointerUp();
    }
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const tile = worldToGrid(e.point);
    if (tile) {
      onTileClick(tile);
    }
  };

  const handlePointerLeave = () => {
    onTileHover(null);
  };

  return (
    <mesh
      ref={planeRef}
      position={[0, 0.01, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}
