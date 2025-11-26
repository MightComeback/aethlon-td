import { useRef, useMemo, useEffect } from "react";
import { ThreeEvent, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TileType } from "@/types/map";
import { ELEVATION_UNIT, getTileBaseHeight } from "@/constants/grid.constants";
import { getTileColor } from "@/utils/colors.utils";
import { computeMapBlendData } from "@/utils/tileBlending";
import { useTileAtlas } from "@/hooks/useTileAtlas";
import { createTileAtlasMaterial, setAtlasTexture } from "@/shaders/tileAtlasShader";
import { useTileMaterialStore } from "@/stores/tileMaterialStore";

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
const LOD_THRESHOLDS = [
  { maxZoom: 5, step: 16 },
  { maxZoom: 8, step: 8 },
  { maxZoom: 15, step: 4 },
  { maxZoom: 25, step: 2 },
  { maxZoom: Infinity, step: 1 },
];

function getLODStep(zoom: number): number {
  for (const { maxZoom, step } of LOD_THRESHOLDS) {
    if (zoom <= maxZoom) return step;
  }
  return 1;
}

// Cache geometries for different LOD levels (with UV coordinates)
const geometryCache = new Map<number, THREE.BoxGeometry>();
function getGeometryForLOD(step: number): THREE.BoxGeometry {
  if (!geometryCache.has(step)) {
    const size = step * 0.95 + (step - 1) * 0.05;
    const geometry = new THREE.BoxGeometry(size, 1, size);
    geometryCache.set(step, geometry);
  }
  return geometryCache.get(step)!;
}

/**
 * Calculate visible tile bounds based on camera
 * For now, disabled viewport culling - just use full map bounds
 * LOD system handles performance for large maps
 */
function getVisibleBounds(
  _camera: THREE.Camera,
  width: number,
  height: number,
  _padding: number = 2
): { minX: number; maxX: number; minY: number; maxY: number } {
  return { minX: 0, maxX: width - 1, minY: 0, maxY: height - 1 };
}

// Pre-create hover material
const hoverMaterial = new THREE.MeshStandardMaterial();

export function InstancedTileGrid({
  width,
  height,
  tiles,
  heightmap,
  hoveredTile,
  zoom = 50,
}: InstancedTileGridProps) {
  const { camera } = useThree();
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const hoveredMeshRef = useRef<THREE.InstancedMesh | null>(null);

  // Load tile atlas texture
  const atlasTexture = useTileAtlas();

  // Get material store setter
  const setTileMaterial = useTileMaterialStore((s) => s.setMaterial);

  // Create shader material (memoized)
  const material = useMemo(() => createTileAtlasMaterial(), []);

  // Register material with store for weather system access
  useEffect(() => {
    setTileMaterial(material);
    return () => setTileMaterial(null);
  }, [material, setTileMaterial]);

  // Update material when atlas texture loads
  useEffect(() => {
    if (atlasTexture && material) {
      setAtlasTexture(material, atlasTexture);
    }
  }, [atlasTexture, material]);

  // Calculate LOD step based on zoom
  const lodStep = useMemo(() => getLODStep(zoom), [zoom]);

  // Get geometry for current LOD
  const geometry = useMemo(() => getGeometryForLOD(lodStep), [lodStep]);

  // Get visible bounds
  const visibleBounds = useMemo(
    () => getVisibleBounds(camera, width, height, lodStep * 2),
    [camera, width, height, lodStep]
  );

  // Compute blend data (UV offsets) for all tiles
  const blendData = useMemo(
    () => computeMapBlendData(tiles, width, height, lodStep),
    [tiles, width, height, lodStep]
  );

  // Calculate total tile count at current LOD
  const tileCount = useMemo(() => {
    const { minX, maxX, minY, maxY } = visibleBounds;
    const lodWidth = Math.ceil((maxX - minX + 1) / lodStep);
    const lodHeight = Math.ceil((maxY - minY + 1) / lodStep);
    return Math.max(1, lodWidth * lodHeight);
  }, [visibleBounds, lodStep]);

  // Update instance matrices and UV attributes
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);
    const quaternion = new THREE.Quaternion();

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const halfStep = lodStep / 2;

    const { minX, maxX, minY, maxY } = visibleBounds;
    const startX = Math.floor(minX / lodStep) * lodStep;
    const startY = Math.floor(minY / lodStep) * lodStep;

    // Create UV offset attribute buffer
    const uvOffsetArray = new Float32Array(tileCount * 2);

    let index = 0;

    for (let x = startX; x <= maxX; x += lodStep) {
      for (let y = startY; y <= maxY; y += lodStep) {
        if (x < 0 || x >= width || y < 0 || y >= height) continue;

        const type = getDominantTileType(tiles, x, y, lodStep, width, height);
        const avgHeight = getAverageHeight(heightmap, x, y, lodStep, width, height);
        const baseHeight = getTileBaseHeight(type);
        const totalHeight = baseHeight + avgHeight * ELEVATION_UNIT;

        position.set(x + halfStep - halfWidth, totalHeight / 2, y + halfStep - halfHeight);
        scale.set(1, totalHeight, 1);

        matrix.compose(position, quaternion, scale);

        if (index < tileCount) {
          mesh.setMatrixAt(index, matrix);

          // Get UV from blend data
          const uvIndex = index * 2;
          if (uvIndex < blendData.uvOffsets.length) {
            uvOffsetArray[uvIndex] = blendData.uvOffsets[uvIndex] ?? 0;
            uvOffsetArray[uvIndex + 1] = blendData.uvOffsets[uvIndex + 1] ?? 0;
          }
        }

        index++;
      }
    }

    // Update mesh count
    mesh.count = Math.min(index, tileCount);

    // Update instance matrix
    if (mesh.instanceMatrix) {
      mesh.instanceMatrix.needsUpdate = true;
    }

    // Update or create UV offset attribute
    const existingAttr = mesh.geometry.getAttribute("uvOffset");
    if (existingAttr) {
      (existingAttr as THREE.BufferAttribute).array = uvOffsetArray;
      existingAttr.needsUpdate = true;
    } else {
      const uvOffsetAttribute = new THREE.InstancedBufferAttribute(uvOffsetArray, 2);
      mesh.geometry.setAttribute("uvOffset", uvOffsetAttribute);
    }
  }, [tiles, heightmap, width, height, lodStep, visibleBounds, tileCount, blendData]);

  // Update hovered tile (always full resolution)
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
    const pos = new THREE.Vector3(x - width / 2 + 0.5, totalHeight / 2, y - height / 2 + 0.5);
    const scaleVec = new THREE.Vector3(1, totalHeight, 1);

    matrix.compose(pos, new THREE.Quaternion(), scaleVec);
    mesh.setMatrixAt(0, matrix);
    mesh.instanceMatrix.needsUpdate = true;

    (mesh.material as THREE.MeshStandardMaterial).color.set(getTileColor(type, true));
  }, [hoveredTile, tiles, heightmap, width, height]);

  const singleTileGeometry = useMemo(() => new THREE.BoxGeometry(0.95, 1, 0.95), []);

  // Wait for atlas to load before rendering
  if (!atlasTexture) {
    return null;
  }

  return (
    <group>
      {/* Main unified tile mesh */}
      <instancedMesh
        key={`unified-${lodStep}-${tileCount}`}
        ref={meshRef}
        args={[geometry, material, tileCount]}
        count={0}
        frustumCulled={false}
      />

      {/* Hover overlay mesh */}
      <instancedMesh
        ref={hoveredMeshRef}
        args={[singleTileGeometry, hoverMaterial, 1]}
        count={0}
        frustumCulled={false}
        renderOrder={1}
      />
    </group>
  );
}

/**
 * Get the dominant tile type in a LOD cell
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

  if (hasSpawn) return TileType.Spawn;
  if (hasExit) return TileType.Exit;
  if (hasPath) return TileType.Path;

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
