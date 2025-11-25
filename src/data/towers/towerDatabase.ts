/**
 * Tower Database
 * Central repository of all tower definitions
 */

import type {
  ExtendedTowerDefinition,
  TowerCategory,
  TowerRarity,
} from "@/types/tower";
import type { Element } from "@/types/element";

// Import Tier 1 tower definitions
import { FIRE_TIER1_TOWERS } from "./definitions/tier1/fire";
import { WATER_TIER1_TOWERS } from "./definitions/tier1/water";
import { EARTH_TIER1_TOWERS } from "./definitions/tier1/earth";
import { AIR_TIER1_TOWERS } from "./definitions/tier1/air";
import { LIGHTNING_TIER1_TOWERS } from "./definitions/tier1/lightning";

// Import Tier 2 tower definitions
import { STEAM_TIER2_TOWERS } from "./definitions/tier2/steam";
import { LAVA_TIER2_TOWERS } from "./definitions/tier2/lava";
import { PLASMA_TIER2_TOWERS } from "./definitions/tier2/plasma";
import { STORM_TIER2_TOWERS } from "./definitions/tier2/storm";
import { ICE_TIER2_TOWERS } from "./definitions/tier2/ice";
import { MIST_TIER2_TOWERS } from "./definitions/tier2/mist";
import { TEMPEST_TIER2_TOWERS } from "./definitions/tier2/tempest";
import { DUST_TIER2_TOWERS } from "./definitions/tier2/dust";
import { CRYSTAL_TIER2_TOWERS } from "./definitions/tier2/crystal";
import { THUNDER_TIER2_TOWERS } from "./definitions/tier2/thunder";

// Import Tier 3 tower definitions
import { VOLCANO_TIER3_TOWERS } from "./definitions/tier3/volcano";
import { EARTHQUAKE_TIER3_TOWERS } from "./definitions/tier3/earthquake";
import { INFERNO_TIER3_TOWERS } from "./definitions/tier3/inferno";
import { TSUNAMI_TIER3_TOWERS } from "./definitions/tier3/tsunami";
import { BLIZZARD_TIER3_TOWERS } from "./definitions/tier3/blizzard";
import { MOUNTAIN_TIER3_TOWERS } from "./definitions/tier3/mountain";
import { HURRICANE_TIER3_TOWERS } from "./definitions/tier3/hurricane";
import { CYCLONE_TIER3_TOWERS } from "./definitions/tier3/cyclone";
import { SUPERCELL_TIER3_TOWERS } from "./definitions/tier3/supercell";
import { DISCHARGE_TIER3_TOWERS } from "./definitions/tier3/discharge";

import { buildTowerMergeGraph, type TowerMergeGraph } from "./mergeGraph";

// ============================================================================
// COMBINED DATABASE
// ============================================================================

const ALL_TIER1 = [
  ...FIRE_TIER1_TOWERS,
  ...WATER_TIER1_TOWERS,
  ...EARTH_TIER1_TOWERS,
  ...AIR_TIER1_TOWERS,
  ...LIGHTNING_TIER1_TOWERS,
];

const ALL_TIER2 = [
  ...STEAM_TIER2_TOWERS,
  ...LAVA_TIER2_TOWERS,
  ...PLASMA_TIER2_TOWERS,
  ...STORM_TIER2_TOWERS,
  ...ICE_TIER2_TOWERS,
  ...MIST_TIER2_TOWERS,
  ...TEMPEST_TIER2_TOWERS,
  ...DUST_TIER2_TOWERS,
  ...CRYSTAL_TIER2_TOWERS,
  ...THUNDER_TIER2_TOWERS,
];

const ALL_TIER3 = [
  ...VOLCANO_TIER3_TOWERS,
  ...EARTHQUAKE_TIER3_TOWERS,
  ...INFERNO_TIER3_TOWERS,
  ...TSUNAMI_TIER3_TOWERS,
  ...BLIZZARD_TIER3_TOWERS,
  ...MOUNTAIN_TIER3_TOWERS,
  ...HURRICANE_TIER3_TOWERS,
  ...CYCLONE_TIER3_TOWERS,
  ...SUPERCELL_TIER3_TOWERS,
  ...DISCHARGE_TIER3_TOWERS,
];

const ALL_TOWERS = [...ALL_TIER1, ...ALL_TIER2, ...ALL_TIER3];

export const TOWER_DATABASE: Map<string, ExtendedTowerDefinition> = new Map();

// Populate the database
ALL_TOWERS.forEach((tower) => {
  TOWER_DATABASE.set(tower.id, tower);
});

// Build merge graph
export const TOWER_MERGE_GRAPH: TowerMergeGraph = buildTowerMergeGraph(ALL_TOWERS);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get tower definition by ID
 */
export function getTowerDefinition(
  id: string
): ExtendedTowerDefinition | undefined {
  return TOWER_DATABASE.get(id);
}

/**
 * Get all tower definitions
 */
export function getAllTowers(): ExtendedTowerDefinition[] {
  return Array.from(TOWER_DATABASE.values());
}

/**
 * Get towers by element
 */
export function getTowersByElement(element: Element): ExtendedTowerDefinition[] {
  return getAllTowers().filter((t) => t.element === element);
}

/**
 * Get towers by category
 */
export function getTowersByCategory(
  category: TowerCategory
): ExtendedTowerDefinition[] {
  return getAllTowers().filter((t) => t.category === category);
}

/**
 * Get towers by tier
 */
export function getTowersByTier(tier: 1 | 2 | 3): ExtendedTowerDefinition[] {
  return getAllTowers().filter((t) => t.tier === tier);
}

/**
 * Get towers by rarity
 */
export function getTowersByRarity(rarity: TowerRarity): ExtendedTowerDefinition[] {
  return getAllTowers().filter((t) => t.rarity === rarity);
}

/**
 * Get base (Tier 1) towers only
 */
export function getBaseTowers(): ExtendedTowerDefinition[] {
  return getTowersByTier(1);
}

/**
 * Get tower count summary
 */
export function getTowerCounts(): {
  total: number;
  byTier: Record<number, number>;
  byElement: Record<string, number>;
  byCategory: Record<string, number>;
  byRarity: Record<string, number>;
} {
  const towers = getAllTowers();

  const byTier: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
  const byElement: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const byRarity: Record<string, number> = {};

  for (const tower of towers) {
    byTier[tower.tier] = (byTier[tower.tier] || 0) + 1;
    byElement[tower.element] = (byElement[tower.element] || 0) + 1;
    byCategory[tower.category] = (byCategory[tower.category] || 0) + 1;
    byRarity[tower.rarity] = (byRarity[tower.rarity] || 0) + 1;
  }

  return {
    total: towers.length,
    byTier,
    byElement,
    byCategory,
    byRarity,
  };
}

/**
 * Search towers by name or description
 */
export function searchTowers(query: string): ExtendedTowerDefinition[] {
  const lowerQuery = query.toLowerCase();
  return getAllTowers().filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.element.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
  );
}
