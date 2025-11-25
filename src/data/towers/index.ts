/**
 * Tower System Exports
 * Central exports for tower database, tiers, categories, and merge system
 */

// Tower database
export {
  TOWER_DATABASE,
  TOWER_MERGE_GRAPH,
  getTowerDefinition,
  getAllTowers,
  getTowersByElement,
  getTowersByCategory,
  getTowersByTier,
  getTowersByRarity,
  getBaseTowers,
  getTowerCounts,
  searchTowers,
} from "./towerDatabase";

// Tier system
export {
  TOWER_TIER_CONFIGS,
  getTierConfig,
  applyTierScaling,
  getRarityFromTier,
  getTierName,
  getRarityColor,
  getTierDisplayColor,
} from "./tiers";

// Category system
export {
  CATEGORY_CONFIGS,
  ELEMENT_STATUS_EFFECTS,
  ELEMENT_BUFF_TYPES,
  getCategoryConfig,
  applyCategoryModifiers,
  getElementStatusEffect,
  getElementBuffType,
  isDamageCategory,
  isSupportCategory,
} from "./categories";

// Merge system
export {
  buildTowerMergeGraph,
  findRecipe,
  getRecipesUsing,
  getRecipeForTower,
  getMergePathTo,
  getPossibleMerges,
  canMergeTowers,
  getRecipesByTier,
  getRecipesByCategory,
  createTowerId,
  parseTowerId,
} from "./mergeGraph";

export type {
  TowerMergeRecipe,
  TowerMergeGraph,
} from "./mergeGraph";

export type { CategoryConfig } from "./categories";

// Re-export types for convenience
export type {
  ExtendedTowerDefinition,
  TowerMeshConfig,
  TowerMeshPart,
  TowerStats,
  TowerTierConfig,
  TowerAbility,
  BuffConfig,
  StatusEffectConfig,
} from "@/types/tower";

export {
  TowerCategory,
  TowerRarity,
  BuffType,
  TargetingMode,
} from "@/types/tower";
