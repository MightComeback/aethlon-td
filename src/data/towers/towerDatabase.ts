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

// Import tower definitions
import { FIRE_TIER1_TOWERS } from "./definitions/tier1/fire";
import { EARTH_TIER1_TOWERS } from "./definitions/tier1/earth";
import { LAVA_TIER2_TOWERS } from "./definitions/tier2/lava";
import { VOLCANO_TIER3_TOWERS } from "./definitions/tier3/volcano";

import { buildTowerMergeGraph, type TowerMergeGraph } from "./mergeGraph";

// ============================================================================
// COMBINED DATABASE
// ============================================================================

const ALL_TIER1 = [...FIRE_TIER1_TOWERS, ...EARTH_TIER1_TOWERS];

const ALL_TIER2 = [...LAVA_TIER2_TOWERS];

const ALL_TIER3 = [...VOLCANO_TIER3_TOWERS];

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
