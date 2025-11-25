/**
 * Biome Definitions
 * Defines different terrain biomes with associated colors, objects, and characteristics
 */

import { TileType } from "@/types/map";

export type BiomeType =
  | "grassland"
  | "forest"
  | "desert"
  | "tundra"
  | "swamp"
  | "volcanic";

export interface BiomeColors {
  ground: string;
  groundLight: string;
  groundDark: string;
  path: string;
  pathLight: string;
  water: string;
  waterLight: string;
  blocked: string;
  accent: string;
}

export interface BiomeObjectWeight {
  type: string;
  weight: number;
}

export interface BiomeDefinition {
  id: BiomeType;
  name: string;
  description: string;
  colors: BiomeColors;
  // Object spawn weights for this biome
  objectWeights: BiomeObjectWeight[];
  // Terrain generation parameters
  waterChance: number; // 0-1
  blockedChance: number; // 0-1
  objectDensity: number; // 0-1
}

// Color palettes for each biome
export const BIOME_DEFINITIONS: Record<BiomeType, BiomeDefinition> = {
  grassland: {
    id: "grassland",
    name: "Grassland",
    description: "Rolling green plains with scattered trees",
    colors: {
      ground: "#4a7c3f", // Forest green
      groundLight: "#6b9b5a",
      groundDark: "#3a6331",
      path: "#c9a66b", // Sandy path
      pathLight: "#ddc08a",
      water: "#3d85c6", // Blue water
      waterLight: "#5a9fd4",
      blocked: "#6b6b6b", // Gray rocks
      accent: "#f4d03f", // Yellow flowers
    },
    objectWeights: [
      { type: "tree_oak", weight: 0.2 },
      { type: "tree_pine", weight: 0.1 },
      { type: "bush", weight: 0.15 },
      { type: "grass", weight: 0.2 },
      { type: "flower", weight: 0.15 },
      { type: "rock", weight: 0.08 },
      { type: "fence", weight: 0.05 },
      { type: "house", weight: 0.02 },
      { type: "well", weight: 0.02 },
      { type: "windmill", weight: 0.01 },
      { type: "hay_bale", weight: 0.02 },
    ],
    waterChance: 0.08,
    blockedChance: 0.04,
    objectDensity: 0.12,
  },

  forest: {
    id: "forest",
    name: "Forest",
    description: "Dense woodland with towering trees",
    colors: {
      ground: "#2d5a27", // Dark forest green
      groundLight: "#3d7a35",
      groundDark: "#1e3d1a",
      path: "#8b7355", // Dirt path
      pathLight: "#a68b6a",
      water: "#2d6a8c", // Dark pond
      waterLight: "#3d8aac",
      blocked: "#4a4a4a", // Dark rocks
      accent: "#9b59b6", // Purple mushrooms
    },
    objectWeights: [
      { type: "tree_pine", weight: 0.3 },
      { type: "tree_oak", weight: 0.2 },
      { type: "tree_birch", weight: 0.1 },
      { type: "bush", weight: 0.1 },
      { type: "mushroom", weight: 0.1 },
      { type: "log", weight: 0.05 },
      { type: "rock", weight: 0.05 },
      { type: "grass", weight: 0.05 },
      { type: "stump", weight: 0.03 },
      { type: "cabin", weight: 0.02 },
    ],
    waterChance: 0.05,
    blockedChance: 0.06,
    objectDensity: 0.18,
  },

  desert: {
    id: "desert",
    name: "Desert",
    description: "Arid sands with cacti and ruins",
    colors: {
      ground: "#d4a84b", // Sandy yellow
      groundLight: "#e8c878",
      groundDark: "#b8923f",
      path: "#c9966b", // Lighter sand path
      pathLight: "#ddb08a",
      water: "#45b7d1", // Oasis blue
      waterLight: "#6ccde3",
      blocked: "#a67c52", // Sandstone
      accent: "#27ae60", // Cactus green
    },
    objectWeights: [
      { type: "cactus", weight: 0.25 },
      { type: "cactus_flower", weight: 0.1 },
      { type: "rock_desert", weight: 0.2 },
      { type: "skull", weight: 0.05 },
      { type: "dead_tree", weight: 0.1 },
      { type: "pyramid", weight: 0.02 },
      { type: "obelisk", weight: 0.03 },
      { type: "tent", weight: 0.05 },
      { type: "pottery", weight: 0.1 },
      { type: "bones", weight: 0.1 },
    ],
    waterChance: 0.02,
    blockedChance: 0.08,
    objectDensity: 0.08,
  },

  tundra: {
    id: "tundra",
    name: "Tundra",
    description: "Frozen wasteland with snow and ice",
    colors: {
      ground: "#e8e8e8", // Snow white
      groundLight: "#ffffff",
      groundDark: "#c8c8c8",
      path: "#a8b8c8", // Icy path
      pathLight: "#c8d8e8",
      water: "#88c8e8", // Frozen blue
      waterLight: "#a8e8ff",
      blocked: "#6888a8", // Ice blocks
      accent: "#2ecc71", // Pine green
    },
    objectWeights: [
      { type: "tree_pine_snow", weight: 0.25 },
      { type: "rock_ice", weight: 0.15 },
      { type: "snowman", weight: 0.05 },
      { type: "ice_crystal", weight: 0.1 },
      { type: "dead_tree_snow", weight: 0.1 },
      { type: "igloo", weight: 0.03 },
      { type: "snow_pile", weight: 0.15 },
      { type: "frozen_bush", weight: 0.1 },
      { type: "lantern", weight: 0.02 },
      { type: "sled", weight: 0.05 },
    ],
    waterChance: 0.1,
    blockedChance: 0.05,
    objectDensity: 0.1,
  },

  swamp: {
    id: "swamp",
    name: "Swamp",
    description: "Murky wetlands with twisted trees",
    colors: {
      ground: "#3d5c3d", // Murky green
      groundLight: "#4d7c4d",
      groundDark: "#2d4c2d",
      path: "#5c4d3d", // Muddy path
      pathLight: "#7c6d5d",
      water: "#2d4c3d", // Swamp water
      waterLight: "#3d6c4d",
      blocked: "#4d4d3d", // Mud mounds
      accent: "#8e44ad", // Purple flowers
    },
    objectWeights: [
      { type: "tree_willow", weight: 0.2 },
      { type: "tree_dead", weight: 0.15 },
      { type: "mushroom_glow", weight: 0.1 },
      { type: "lily_pad", weight: 0.1 },
      { type: "cattail", weight: 0.15 },
      { type: "log_moss", weight: 0.08 },
      { type: "rock_moss", weight: 0.08 },
      { type: "grave", weight: 0.05 },
      { type: "lantern_swamp", weight: 0.04 },
      { type: "hut", weight: 0.05 },
    ],
    waterChance: 0.2,
    blockedChance: 0.03,
    objectDensity: 0.14,
  },

  volcanic: {
    id: "volcanic",
    name: "Volcanic",
    description: "Scorched earth with lava and ash",
    colors: {
      ground: "#3d2d2d", // Ash gray
      groundLight: "#5d4d4d",
      groundDark: "#2d1d1d",
      path: "#4d3d3d", // Charred path
      pathLight: "#6d5d5d",
      water: "#ff6b35", // Lava orange
      waterLight: "#ff8b55",
      blocked: "#1d1d1d", // Obsidian
      accent: "#e74c3c", // Fire red
    },
    objectWeights: [
      { type: "rock_volcanic", weight: 0.25 },
      { type: "lava_rock", weight: 0.15 },
      { type: "dead_tree_burned", weight: 0.1 },
      { type: "fire_pit", weight: 0.08 },
      { type: "bones_dragon", weight: 0.02 },
      { type: "obsidian_spike", weight: 0.1 },
      { type: "ember_plant", weight: 0.1 },
      { type: "ash_pile", weight: 0.1 },
      { type: "ruined_tower", weight: 0.05 },
      { type: "forge", weight: 0.05 },
    ],
    waterChance: 0.12,
    blockedChance: 0.1,
    objectDensity: 0.1,
  },
};

// Default biome for the game
export const DEFAULT_BIOME: BiomeType = "grassland";

/**
 * Get tile color for a specific biome and tile type
 */
export function getBiomeTileColor(
  biome: BiomeType,
  tileType: TileType,
  variant: "base" | "light" | "dark" = "base"
): string {
  const colors = BIOME_DEFINITIONS[biome].colors;

  switch (tileType) {
    case TileType.Ground:
      return variant === "light"
        ? colors.groundLight
        : variant === "dark"
          ? colors.groundDark
          : colors.ground;
    case TileType.Path:
      return variant === "light" ? colors.pathLight : colors.path;
    case TileType.Water:
      return variant === "light" ? colors.waterLight : colors.water;
    case TileType.Blocked:
      return colors.blocked;
    case TileType.Spawn:
      return "#ffffff"; // Always white for visibility
    case TileType.Exit:
      return "#ff4444"; // Always red for visibility
    default:
      return colors.ground;
  }
}

/**
 * Get all tile colors for a biome as a record
 */
export function getBiomeColorPalette(biome: BiomeType): Record<TileType, string> {
  const def = BIOME_DEFINITIONS[biome];
  return {
    [TileType.Ground]: def.colors.ground,
    [TileType.Path]: def.colors.path,
    [TileType.Water]: def.colors.water,
    [TileType.Blocked]: def.colors.blocked,
    [TileType.Spawn]: "#ffffff",
    [TileType.Exit]: "#ff4444",
  };
}
