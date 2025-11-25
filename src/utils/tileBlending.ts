/**
 * Tile Blending Utilities
 * Implements marching squares algorithm for tile edge transitions
 */

import { TileType } from "@/types/map";
import {
  TILE_PRIORITY,
  BASE_TILE_UV,
  getTransitionUV,
  atlasToUV,
} from "@/data/textures/tileAtlasConfig";

export interface TileBlendData {
  baseType: TileType;
  blendType: TileType | null; // Dominant neighbor if blending needed
  marchingIndex: number; // 0-15 marching squares index
}

/**
 * Get tile type at position with bounds checking
 */
function getTileAt(
  tiles: TileType[][],
  x: number,
  y: number,
  width: number,
  height: number
): TileType {
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return TileType.Ground; // Treat out-of-bounds as ground
  }
  return tiles[x]?.[y] ?? TileType.Ground;
}

/**
 * Calculate marching squares index for a tile based on cardinal neighbors
 *
 * Neighbor bit positions:
 *   N(1)
 * W(8) X E(2)
 *   S(4)
 *
 * Index = N*1 + E*2 + S*4 + W*8 (range 0-15)
 *
 * A neighbor contributes to the index if it has higher priority than the base tile
 */
export function calculateMarchingIndex(
  tiles: TileType[][],
  x: number,
  y: number,
  width: number,
  height: number
): { index: number; dominantNeighbor: TileType | null } {
  const baseType = getTileAt(tiles, x, y, width, height);
  const basePriority = TILE_PRIORITY[baseType];

  // Get cardinal neighbors
  const nType = getTileAt(tiles, x, y - 1, width, height);
  const eType = getTileAt(tiles, x + 1, y, width, height);
  const sType = getTileAt(tiles, x, y + 1, width, height);
  const wType = getTileAt(tiles, x - 1, y, width, height);

  // Calculate bits based on priority comparison
  const nBit = TILE_PRIORITY[nType] > basePriority ? 1 : 0;
  const eBit = TILE_PRIORITY[eType] > basePriority ? 2 : 0;
  const sBit = TILE_PRIORITY[sType] > basePriority ? 4 : 0;
  const wBit = TILE_PRIORITY[wType] > basePriority ? 8 : 0;

  const index = nBit | eBit | sBit | wBit;

  // Find dominant neighbor (highest priority among those contributing)
  let dominantNeighbor: TileType | null = null;
  let highestPriority = basePriority;

  const neighbors = [
    { type: nType, bit: nBit },
    { type: eType, bit: eBit },
    { type: sType, bit: sBit },
    { type: wType, bit: wBit },
  ];

  for (const { type, bit } of neighbors) {
    if (bit > 0 && TILE_PRIORITY[type] > highestPriority) {
      highestPriority = TILE_PRIORITY[type];
      dominantNeighbor = type;
    }
  }

  return { index, dominantNeighbor };
}

/**
 * Calculate complete blend data for a tile
 */
export function calculateBlendData(
  tiles: TileType[][],
  x: number,
  y: number,
  width: number,
  height: number
): TileBlendData {
  const baseType = getTileAt(tiles, x, y, width, height);
  const { index, dominantNeighbor } = calculateMarchingIndex(
    tiles,
    x,
    y,
    width,
    height
  );

  return {
    baseType,
    blendType: dominantNeighbor,
    marchingIndex: index,
  };
}

/**
 * Get UV coordinates for a tile (base or transition)
 */
export function getTileUV(blendData: TileBlendData): { u: number; v: number } {
  if (blendData.blendType && blendData.marchingIndex > 0) {
    // Use transition tile
    const atlasUV = getTransitionUV(
      blendData.baseType,
      blendData.blendType,
      blendData.marchingIndex
    );
    return atlasToUV(atlasUV);
  }

  // Use base tile
  return atlasToUV(BASE_TILE_UV[blendData.baseType]);
}

/**
 * Compute UV offset array for entire map (suitable for GPU buffer)
 * Returns Float32Array with [u, v] pairs for each tile
 *
 * @param tiles - 2D tile array [x][y]
 * @param width - Map width
 * @param height - Map height
 * @param lodStep - LOD sampling step (1 = full resolution)
 */
export function computeMapUVs(
  tiles: TileType[][],
  width: number,
  height: number,
  lodStep: number = 1
): Float32Array {
  const lodWidth = Math.ceil(width / lodStep);
  const lodHeight = Math.ceil(height / lodStep);
  const tileCount = lodWidth * lodHeight;

  const uvOffsets = new Float32Array(tileCount * 2);

  let index = 0;

  // Align iteration to LOD grid
  const startX = Math.floor(0 / lodStep) * lodStep;
  const startY = Math.floor(0 / lodStep) * lodStep;

  for (let x = startX; x < width; x += lodStep) {
    for (let y = startY; y < height; y += lodStep) {
      let uv: { u: number; v: number };

      if (lodStep > 4) {
        // At high LOD levels, skip detailed marching squares
        // Just use base tile for dominant type
        const baseType = getDominantTileType(tiles, x, y, lodStep, width, height);
        uv = atlasToUV(BASE_TILE_UV[baseType]);
      } else {
        // Full marching squares at lower LOD levels
        const blendData = calculateBlendData(tiles, x, y, width, height);
        uv = getTileUV(blendData);
      }

      uvOffsets[index * 2] = uv.u;
      uvOffsets[index * 2 + 1] = uv.v;
      index++;
    }
  }

  return uvOffsets;
}

/**
 * Get the dominant tile type in a LOD cell
 * Prioritizes important tiles (Spawn, Exit, Path) over terrain
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

  // Prioritize important tile types
  if (hasSpawn) return TileType.Spawn;
  if (hasExit) return TileType.Exit;
  if (hasPath) return TileType.Path;

  // Otherwise return most common type
  let maxCount = 0;
  let dominantType: TileType = TileType.Ground;

  for (const [type, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantType = type as TileType;
    }
  }

  return dominantType;
}

/**
 * Compute blend data for the entire map
 * Returns both UV offsets and marching indices for potential GPU use
 */
export function computeMapBlendData(
  tiles: TileType[][],
  width: number,
  height: number,
  lodStep: number = 1
): {
  uvOffsets: Float32Array;
  marchingIndices: Uint8Array;
  tileCount: number;
} {
  const lodWidth = Math.ceil(width / lodStep);
  const lodHeight = Math.ceil(height / lodStep);
  const tileCount = lodWidth * lodHeight;

  const uvOffsets = new Float32Array(tileCount * 2);
  const marchingIndices = new Uint8Array(tileCount);

  let index = 0;

  for (let x = 0; x < width; x += lodStep) {
    for (let y = 0; y < height; y += lodStep) {
      const blendData =
        lodStep > 4
          ? {
              baseType: getDominantTileType(tiles, x, y, lodStep, width, height),
              blendType: null,
              marchingIndex: 0,
            }
          : calculateBlendData(tiles, x, y, width, height);

      const uv = getTileUV(blendData);

      uvOffsets[index * 2] = uv.u;
      uvOffsets[index * 2 + 1] = uv.v;
      marchingIndices[index] = blendData.marchingIndex;

      index++;
    }
  }

  return { uvOffsets, marchingIndices, tileCount };
}
