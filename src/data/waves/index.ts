/**
 * Wave System Exports
 * Central exports for wave configurations and utilities
 */

// Global wave definitions
export {
  GLOBAL_WAVES,
  getGlobalWave,
  getBossWaves,
  getTotalWaves,
} from "./globalWaves";

// Wave utilities
export {
  getWaveForMap,
  calculateWaveDifficulty,
  generateWavePreview,
  getWaveEnemyCount,
  estimateWaveDuration,
  waveHasFlyingEnemies,
  waveHasBossEnemies,
  getWaveMaxTier,
  generateSpawnEvents,
  createWaveConfig,
  getRecommendedGold,
  getDifficultyRating,
  getUniqueEnemyTypes,
} from "./waveUtils";

// Re-export types
export type {
  WaveConfig,
  WaveGroup,
  MapWaveOverride,
} from "@/types/enemy";

export type {
  WavePreviewEntry,
  SpawnEvent,
} from "./waveUtils";
