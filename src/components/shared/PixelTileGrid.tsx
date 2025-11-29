/**
 * PixelTileGrid
 * Renders tiles using pixel art sprites instead of the texture atlas
 * Uses instanced rendering for performance with pixel art textures
 */

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { TileType } from "@/types/map";
import { ELEVATION_UNIT, getTileBaseHeight } from "@/constants/grid.constants";
import { useTileMaterialStore } from "@/stores/tileMaterialStore";
import { usePixelTileAtlas, getTileUvOffset } from "@/hooks/usePixelTileAtlas";

interface PixelTileGridProps {
  width: number;
  height: number;
  tiles: TileType[][];
  heightmap: number[][];
  hoveredTile?: { x: number; y: number } | null;
  zoom?: number;
}

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

// Cache geometries for different LOD levels
const geometryCache = new Map<number, THREE.BoxGeometry>();
function getGeometryForLOD(step: number): THREE.BoxGeometry {
  if (!geometryCache.has(step)) {
    const size = step;
    const geometry = new THREE.BoxGeometry(size, 1, size);
    geometryCache.set(step, geometry);
  }
  return geometryCache.get(step)!;
}

// Tile type to atlas index mapping
const TILE_TYPE_TO_INDEX: Record<TileType, number> = {
  [TileType.Ground]: 0,
  [TileType.Path]: 1,
  [TileType.Water]: 2,
  [TileType.Blocked]: 3,
  [TileType.Spawn]: 4,
  [TileType.Exit]: 5,
};

export function PixelTileGrid({
  width,
  height,
  tiles,
  heightmap,
  hoveredTile,
  zoom = 50,
}: PixelTileGridProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const hoveredMeshRef = useRef<THREE.InstancedMesh>(null);

  // Load pixel art tile atlas
  const { texture: atlasTexture, material } = usePixelTileAtlas();

  // Get material store setter for weather system
  const setTileMaterial = useTileMaterialStore((s) => s.setMaterial);

  // Register material with store
  useEffect(() => {
    if (material) {
      setTileMaterial(material);
      return () => setTileMaterial(null);
    }
  }, [material, setTileMaterial]);

  // Calculate LOD step based on zoom
  const lodStep = useMemo(() => getLODStep(zoom), [zoom]);

  // Get geometry for current LOD
  const geometry = useMemo(() => getGeometryForLOD(lodStep), [lodStep]);

  // Calculate tile count
  const tileCount = useMemo(() => {
    const lodWidth = Math.ceil(width / lodStep);
    const lodHeight = Math.ceil(height / lodStep);
    return Math.max(1, lodWidth * lodHeight);
  }, [width, height, lodStep]);

  // Update instance matrices and UV attributes
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || !tiles.length) return;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);
    const quaternion = new THREE.Quaternion();

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const halfStep = lodStep / 2;

    // Create UV offset attribute buffer (for tile type selection in atlas)
    const uvOffsetArray = new Float32Array(tileCount * 2);

    let index = 0;

    for (let x = 0; x < width; x += lodStep) {
      for (let y = 0; y < height; y += lodStep) {
        if (index >= tileCount) break;

        const type = getDominantTileType(tiles, x, y, lodStep, width, height);
        const avgHeight = getAverageHeight(heightmap, x, y, lodStep, width, height);
        const baseHeight = getTileBaseHeight(type);
        const totalHeight = baseHeight + avgHeight * ELEVATION_UNIT;

        position.set(x + halfStep - halfWidth, totalHeight / 2, y + halfStep - halfHeight);
        scale.set(1, Math.max(0.1, totalHeight), 1);

        matrix.compose(position, quaternion, scale);
        mesh.setMatrixAt(index, matrix);

        // Set UV offset based on tile type (2x3 grid atlas)
        const uvIndex = index * 2;
        const tileIndex = TILE_TYPE_TO_INDEX[type];
        const [uvX, uvY] = getTileUvOffset(tileIndex);
        uvOffsetArray[uvIndex] = uvX;
        uvOffsetArray[uvIndex + 1] = uvY;

        index++;
      }
    }

    mesh.count = index;

    if (mesh.instanceMatrix) {
      mesh.instanceMatrix.needsUpdate = true;
    }

    // Update or create UV offset attribute
    const existingAttr = mesh.geometry.getAttribute("uvOffset") as THREE.InstancedBufferAttribute | undefined;
    if (!existingAttr || existingAttr.array.length !== uvOffsetArray.length) {
      if (existingAttr) {
        mesh.geometry.deleteAttribute("uvOffset");
      }
      const uvOffsetAttribute = new THREE.InstancedBufferAttribute(uvOffsetArray, 2);
      mesh.geometry.setAttribute("uvOffset", uvOffsetAttribute);
    } else {
      (existingAttr.array as Float32Array).set(uvOffsetArray);
      existingAttr.needsUpdate = true;
    }
  }, [tiles, heightmap, width, height, lodStep, tileCount]);

  // Hover effect
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
    const scaleVec = new THREE.Vector3(1.02, totalHeight + 0.02, 1.02);

    matrix.compose(pos, new THREE.Quaternion(), scaleVec);
    mesh.setMatrixAt(0, matrix);
    mesh.instanceMatrix.needsUpdate = true;
  }, [hoveredTile, tiles, heightmap, width, height]);

  const hoverGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const hoverMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true }),
    []
  );

  if (!atlasTexture || !material) {
    return null;
  }

  return (
    <group>
      {/* Main tile mesh */}
      <instancedMesh
        key={`tiles-${lodStep}-${tileCount}`}
        ref={meshRef}
        args={[geometry, material, tileCount]}
        count={0}
        frustumCulled={false}
        receiveShadow
      />

      {/* Hover overlay */}
      <instancedMesh
        ref={hoveredMeshRef}
        args={[hoverGeometry, hoverMaterial, 1]}
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

  // Priority: Spawn > Exit > Path > most common
  if (hasSpawn) return TileType.Spawn;
  if (hasExit) return TileType.Exit;
  if (hasPath) return TileType.Path;

  let maxCount = 0;
  let dominantType: TileType = TileType.Ground;
  for (const type of Object.keys(counts) as TileType[]) {
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
