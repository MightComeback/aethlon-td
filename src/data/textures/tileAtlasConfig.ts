/**
 * Tile Atlas Configuration
 * Defines the layout of the texture atlas for tile blending
 */

import { TileType } from "@/types/map";

// Atlas dimensions
export const ATLAS_SIZE = 1024;
export const TILE_PIXEL_SIZE = 16;
export const TILES_PER_ROW = ATLAS_SIZE / TILE_PIXEL_SIZE; // 64
export const UV_TILE_SIZE = 1 / TILES_PER_ROW; // 0.015625

// Base tile colors (grayscale B&W palette)
export const TILE_COLORS: Record<TileType, string> = {
  [TileType.Ground]: "#333333",
  [TileType.Path]: "#666666",
  [TileType.Water]: "#1a1a1a",
  [TileType.Blocked]: "#0a0a0a",
  [TileType.Spawn]: "#ffffff",
  [TileType.Exit]: "#888888",
};

// RGB values for shader use
export const TILE_COLORS_RGB: Record<TileType, [number, number, number]> = {
  [TileType.Ground]: [0.2, 0.2, 0.2],
  [TileType.Path]: [0.4, 0.4, 0.4],
  [TileType.Water]: [0.102, 0.102, 0.102],
  [TileType.Blocked]: [0.039, 0.039, 0.039],
  [TileType.Spawn]: [1.0, 1.0, 1.0],
  [TileType.Exit]: [0.533, 0.533, 0.533],
};

// Atlas UV coordinates for base tiles (row 0)
export interface AtlasUV {
  u: number; // Column in atlas (0-63)
  v: number; // Row in atlas (0-63)
}

export const BASE_TILE_UV: Record<TileType, AtlasUV> = {
  [TileType.Ground]: { u: 0, v: 0 },
  [TileType.Path]: { u: 1, v: 0 },
  [TileType.Water]: { u: 2, v: 0 },
  [TileType.Blocked]: { u: 3, v: 0 },
  [TileType.Spawn]: { u: 4, v: 0 },
  [TileType.Exit]: { u: 5, v: 0 },
};

// Transition row mapping in atlas
// Format: "lower-higher" where higher priority tile bleeds into lower
export const TRANSITION_ROWS: Record<string, number> = {
  "ground-path": 1,
  "ground-water": 2,
  "ground-blocked": 3,
  "ground-spawn": 4,
  "ground-exit": 5,
  "path-water": 6,
  "path-blocked": 7,
  "path-spawn": 8,
  "path-exit": 9,
  "water-blocked": 10,
  "exit-spawn": 11,
};

// Priority determines which tile type "bleeds into" others
// Higher priority tiles visually dominate at boundaries
export const TILE_PRIORITY: Record<TileType, number> = {
  [TileType.Ground]: 1, // Lowest - base terrain
  [TileType.Path]: 2, // Roads show over ground
  [TileType.Exit]: 3, // Exit markers visible
  [TileType.Water]: 4, // Water dominates ground/path
  [TileType.Spawn]: 5, // Spawn highly visible
  [TileType.Blocked]: 6, // Blocked most dominant
};

// Order of tile types for iteration
export const TILE_TYPE_ORDER: TileType[] = [
  TileType.Ground,
  TileType.Path,
  TileType.Water,
  TileType.Blocked,
  TileType.Spawn,
  TileType.Exit,
];

/**
 * Convert atlas grid coordinates to UV coordinates (0-1 range)
 * Note: V is flipped for WebGL (top-left origin vs bottom-left)
 */
export function atlasToUV(atlas: AtlasUV): { u: number; v: number } {
  return {
    u: atlas.u * UV_TILE_SIZE,
    v: 1 - (atlas.v + 1) * UV_TILE_SIZE,
  };
}

/**
 * Get the transition key for two tile types (normalized order)
 */
export function getTransitionKey(
  typeA: TileType,
  typeB: TileType
): string | null {
  if (typeA === typeB) return null;

  const priorityA = TILE_PRIORITY[typeA];
  const priorityB = TILE_PRIORITY[typeB];

  // Order by priority: lower-higher
  const [lower, higher] =
    priorityA < priorityB ? [typeA, typeB] : [typeB, typeA];

  return `${lower}-${higher}`;
}

/**
 * Get UV coordinates for a transition tile
 * @param baseType - The tile's own type
 * @param blendType - The dominant neighbor type causing the blend
 * @param marchingIndex - 0-15 marching squares index
 */
export function getTransitionUV(
  baseType: TileType,
  blendType: TileType,
  marchingIndex: number
): AtlasUV {
  const key = getTransitionKey(baseType, blendType);

  if (!key || !TRANSITION_ROWS[key]) {
    // No transition defined, use base tile
    return BASE_TILE_UV[baseType];
  }

  return {
    u: marchingIndex, // Column 0-15 for marching index
    v: TRANSITION_ROWS[key],
  };
}
