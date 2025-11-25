/**
 * Enemy System Exports
 * Central exports for enemy database, tiers, and utilities
 */

// Enemy definitions and database
export {
  ENEMY_DATABASE,
  getEnemyDefinition,
  getEnemiesByCategory,
  getEnemiesUnlockedAtWave,
  getBossEnemies,
} from "./enemyDatabase";

// Tier system
export {
  TIER_CONFIGS,
  getTierConfig,
  applyTier,
  shiftGrayscale,
  getTierColorShift,
  getTierName,
  getTierDisplayColor,
} from "./tiers";

// Re-export types for convenience
export type {
  EnemyDefinition,
  EnemyMeshConfig,
  MeshPart,
  EnemyStats,
  TierConfig,
  SpecialAbility,
} from "@/types/enemy";

export {
  EnemyType,
  EnemyCategory,
  SpecialAbilityType,
} from "@/types/enemy";
