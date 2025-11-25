/**
 * Multi-Tile Structure Definitions
 * Defines buildings and infrastructure that span multiple tiles
 */

import type { BiomeType } from "../biomes/definitions";

export type StructureCategory = "building" | "village" | "infrastructure";

export interface StructureDefinition {
  id: string;
  name: string;
  category: StructureCategory;
  footprint: [number, number]; // [width, height] in tiles
  anchorPoint: "corner" | "center"; // Placement reference
  blocksTowers: boolean;
  color: string;
  biomes: BiomeType[]; // Which biomes this structure appears in
  rarity: number; // 0-1, how rare (lower = rarer)
  description: string;
}

export const STRUCTURE_DEFINITIONS: Record<string, StructureDefinition> = {
  // ============================================
  // BASIC BUILDINGS
  // ============================================
  house: {
    id: "house",
    name: "House",
    category: "building",
    footprint: [2, 2],
    anchorPoint: "corner",
    blocksTowers: true,
    color: "#efebe9",
    biomes: ["grassland", "forest"],
    rarity: 0.3,
    description: "Small residential building",
  },

  farmhouse: {
    id: "farmhouse",
    name: "Farmhouse",
    category: "building",
    footprint: [2, 3],
    anchorPoint: "corner",
    blocksTowers: true,
    color: "#d7ccc8",
    biomes: ["grassland"],
    rarity: 0.2,
    description: "Large farm dwelling",
  },

  barn: {
    id: "barn",
    name: "Barn",
    category: "building",
    footprint: [3, 2],
    anchorPoint: "corner",
    blocksTowers: true,
    color: "#8d6e63",
    biomes: ["grassland"],
    rarity: 0.15,
    description: "Agricultural storage building",
  },

  windmill: {
    id: "windmill",
    name: "Windmill",
    category: "building",
    footprint: [2, 2],
    anchorPoint: "center",
    blocksTowers: true,
    color: "#bcaaa4",
    biomes: ["grassland"],
    rarity: 0.1,
    description: "Wind-powered mill",
  },

  // ============================================
  // VILLAGE COMPONENTS
  // ============================================
  market: {
    id: "market",
    name: "Market Stall",
    category: "village",
    footprint: [2, 1],
    anchorPoint: "corner",
    blocksTowers: true,
    color: "#fdd835",
    biomes: ["grassland", "forest", "desert"],
    rarity: 0.25,
    description: "Trading stall",
  },

  inn: {
    id: "inn",
    name: "Inn",
    category: "village",
    footprint: [3, 2],
    anchorPoint: "corner",
    blocksTowers: true,
    color: "#795548",
    biomes: ["grassland", "forest"],
    rarity: 0.12,
    description: "Traveler's rest",
  },

  blacksmith: {
    id: "blacksmith",
    name: "Blacksmith",
    category: "village",
    footprint: [2, 2],
    anchorPoint: "corner",
    blocksTowers: true,
    color: "#546e7a",
    biomes: ["grassland", "forest", "tundra"],
    rarity: 0.15,
    description: "Weapon and tool forge",
  },

  church: {
    id: "church",
    name: "Church",
    category: "village",
    footprint: [2, 3],
    anchorPoint: "corner",
    blocksTowers: true,
    color: "#e0e0e0",
    biomes: ["grassland"],
    rarity: 0.08,
    description: "Place of worship",
  },

  // ============================================
  // INFRASTRUCTURE
  // ============================================
  bridge: {
    id: "bridge",
    name: "Bridge",
    category: "infrastructure",
    footprint: [1, 3],
    anchorPoint: "center",
    blocksTowers: true,
    color: "#8d6e63",
    biomes: ["grassland", "forest", "swamp"],
    rarity: 0.5, // Placed where needed, not randomly
    description: "Spans water crossings",
  },

  pier: {
    id: "pier",
    name: "Pier",
    category: "infrastructure",
    footprint: [2, 4],
    anchorPoint: "corner",
    blocksTowers: true,
    color: "#6d4c41",
    biomes: ["grassland", "forest", "swamp"],
    rarity: 0.15,
    description: "Dock extending into water",
  },

  wall: {
    id: "wall",
    name: "Wall Segment",
    category: "infrastructure",
    footprint: [1, 1],
    anchorPoint: "center",
    blocksTowers: true,
    color: "#78909c",
    biomes: ["grassland", "forest", "desert", "tundra"],
    rarity: 0.4,
    description: "Defensive stone wall",
  },

  gate: {
    id: "gate",
    name: "Gate",
    category: "infrastructure",
    footprint: [1, 2],
    anchorPoint: "center",
    blocksTowers: true,
    color: "#5d4037",
    biomes: ["grassland", "forest", "desert"],
    rarity: 0.1,
    description: "Passage through walls",
  },
};

/**
 * Get structures compatible with a biome
 */
export function getStructuresForBiome(biome: BiomeType): StructureDefinition[] {
  return Object.values(STRUCTURE_DEFINITIONS).filter((structure) =>
    structure.biomes.includes(biome)
  );
}

/**
 * Get structures by category
 */
export function getStructuresByCategory(
  category: StructureCategory
): StructureDefinition[] {
  return Object.values(STRUCTURE_DEFINITIONS).filter(
    (structure) => structure.category === category
  );
}

// All structure IDs
export const ALL_STRUCTURE_IDS = Object.keys(STRUCTURE_DEFINITIONS);

// Structure categories
export const STRUCTURE_CATEGORIES: StructureCategory[] = [
  "building",
  "village",
  "infrastructure",
];
