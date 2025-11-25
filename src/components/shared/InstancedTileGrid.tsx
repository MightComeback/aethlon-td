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
}

const TILE_SIZE = 0.95;
const TILE_TYPES = [
  TileType.Ground,
  TileType.Path,
  TileType.Water,
  TileType.Blocked,
  TileType.Spawn,
  TileType.Exit,
] as const;

// Shared geometry - created once
const tileGeometry = new THREE.BoxGeometry(TILE_SIZE, 1, TILE_SIZE);

// Pre-create materials for each tile type
const tileMaterials: Record<TileType, THREE.MeshStandardMaterial> = {
  [TileType.Ground]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Ground, false) }),
  [TileType.Path]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Path, false) }),
  [TileType.Water]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Water, false) }),
  [TileType.Blocked]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Blocked, false) }),
  [TileType.Spawn]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Spawn, false) }),
  [TileType.Exit]: new THREE.MeshStandardMaterial({ color: getTileColor(TileType.Exit, false) }),
};


export function InstancedTileGrid({
  width,
  height,
  tiles,
  heightmap,
  hoveredTile,
}: InstancedTileGridProps) {
  // Refs for each tile type's instanced mesh
  const meshRefs = useRef<Record<TileType, THREE.InstancedMesh | null>>({
    [TileType.Ground]: null,
    [TileType.Path]: null,
    [TileType.Water]: null,
    [TileType.Blocked]: null,
    [TileType.Spawn]: null,
    [TileType.Exit]: null,
  });

  // Hovered tile mesh (rendered separately for correct color)
  const hoveredMeshRef = useRef<THREE.InstancedMesh | null>(null);

  // Count tiles per type
  const tileCounts = useMemo(() => {
    const counts: Record<TileType, number> = {
      [TileType.Ground]: 0,
      [TileType.Path]: 0,
      [TileType.Water]: 0,
      [TileType.Blocked]: 0,
      [TileType.Spawn]: 0,
      [TileType.Exit]: 0,
    };

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const type = tiles[x]?.[y] ?? TileType.Ground;
        counts[type]++;
      }
    }

    return counts;
  }, [tiles, width, height]);

  // Update instance matrices when tiles/heightmap change
  useEffect(() => {
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);
    const quaternion = new THREE.Quaternion();

    // Track current index for each type
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

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const type = tiles[x]?.[y] ?? TileType.Ground;
        const elevation = heightmap[x]?.[y] ?? 0;
        const baseHeight = getTileBaseHeight(type);
        const totalHeight = baseHeight + elevation * ELEVATION_UNIT;

        // World position (centered)
        position.set(x - halfWidth, totalHeight / 2, y - halfHeight);
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
  }, [tiles, heightmap, width, height]);

  // Update hovered tile separately
  useEffect(() => {
    const mesh = hoveredMeshRef.current;
    if (!mesh) return;

    if (!hoveredTile) {
      // Hide the hovered mesh by scaling to 0
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
      x - width / 2,
      totalHeight / 2,
      y - height / 2
    );
    const scale = new THREE.Vector3(1, totalHeight, 1);

    matrix.compose(position, new THREE.Quaternion(), scale);
    mesh.setMatrixAt(0, matrix);
    mesh.instanceMatrix.needsUpdate = true;

    // Update material color based on hovered tile type
    (mesh.material as THREE.MeshStandardMaterial).color.set(
      getTileColor(type, true)
    );
  }, [hoveredTile, tiles, heightmap, width, height]);

  return (
    <group>
      {/* Render instanced mesh for each tile type */}
      {TILE_TYPES.map((type) => (
        <instancedMesh
          key={type}
          ref={(mesh) => {
            meshRefs.current[type] = mesh;
          }}
          args={[tileGeometry, tileMaterials[type], tileCounts[type] || 1]}
          count={tileCounts[type]}
          frustumCulled={false}
        />
      ))}

      {/* Hovered tile overlay (rendered on top) */}
      <instancedMesh
        ref={hoveredMeshRef}
        args={[tileGeometry, new THREE.MeshStandardMaterial(), 1]}
        count={0}
        frustumCulled={false}
        renderOrder={1}
      />
    </group>
  );
}

// Interaction plane for raycasting (more efficient than per-tile events)
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
