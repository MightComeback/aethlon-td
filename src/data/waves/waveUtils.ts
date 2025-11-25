/**
 * Wave System Utilities
 * Helper functions for wave management
 */

import type { WaveConfig, WaveGroup, MapWaveOverride } from "@/types/enemy";
import { EnemyType } from "@/types/enemy";
import { getGlobalWave } from "./globalWaves";
import { getEnemyDefinition, applyTier } from "@/data/enemies";

/**
 * Get wave configuration for a specific map and wave number
 * Respects map-specific overrides if they exist
 */
export function getWaveForMap(
  mapId: string,
  waveNumber: number,
  mapOverrides?: MapWaveOverride
): WaveConfig | undefined {
  // Check for map-specific override
  if (mapOverrides && mapOverrides.mapId === mapId) {
    const overrideWave = mapOverrides.waves.find((w) => w.waveNumber === waveNumber);

    if (mapOverrides.replaceGlobal) {
      // Complete replacement - only use override waves
      return overrideWave;
    } else if (overrideWave) {
      // Merge mode - override takes precedence if it exists
      return overrideWave;
    }
  }

  // Fall back to global wave
  return getGlobalWave(waveNumber);
}

/**
 * Calculate the total difficulty of a wave
 * Based on enemy types, counts, and tiers
 */
export function calculateWaveDifficulty(wave: WaveConfig): number {
  let difficulty = 0;

  for (const group of wave.groups) {
    const definition = getEnemyDefinition(group.enemyType);
    if (!definition) continue;

    const stats = applyTier(definition.baseStats, group.tier);
    const enemyValue =
      stats.maxHealth * 0.01 +
      stats.armor * 2 +
      stats.magicResistance * 2 +
      (definition.isBoss ? 50 : 0);

    difficulty += enemyValue * group.count * (1 + (group.tier - 1) * 0.5);
  }

  return Math.round(difficulty);
}

/**
 * Generate a preview of enemies in a wave
 * Returns a summary for UI display
 */
export function generateWavePreview(wave: WaveConfig): WavePreviewEntry[] {
  const entries: WavePreviewEntry[] = [];

  for (const group of wave.groups) {
    const definition = getEnemyDefinition(group.enemyType);
    if (!definition) continue;

    entries.push({
      enemyType: group.enemyType,
      name: definition.name,
      count: group.count,
      tier: group.tier,
      isBoss: definition.isBoss,
      isFlying: definition.category === "flying",
    });
  }

  // Sort by importance (bosses first, then by tier, then by count)
  entries.sort((a, b) => {
    if (a.isBoss !== b.isBoss) return a.isBoss ? -1 : 1;
    if (a.tier !== b.tier) return b.tier - a.tier;
    return b.count - a.count;
  });

  return entries;
}

export interface WavePreviewEntry {
  enemyType: EnemyType;
  name: string;
  count: number;
  tier: number;
  isBoss: boolean;
  isFlying: boolean;
}

/**
 * Get total enemy count in a wave
 */
export function getWaveEnemyCount(wave: WaveConfig): number {
  return wave.groups.reduce((sum, group) => sum + group.count, 0);
}

/**
 * Get total wave duration estimate (in ms)
 * Based on spawn timing
 */
export function estimateWaveDuration(wave: WaveConfig): number {
  let maxDuration = 0;

  for (const group of wave.groups) {
    const groupDuration = group.startDelay + group.spawnDelay * (group.count - 1);
    maxDuration = Math.max(maxDuration, groupDuration);
  }

  // Add buffer for enemies to reach the end
  return maxDuration + 30000; // 30 second buffer
}

/**
 * Check if wave has flying enemies
 */
export function waveHasFlyingEnemies(wave: WaveConfig): boolean {
  return wave.groups.some((group) => {
    const definition = getEnemyDefinition(group.enemyType);
    return definition?.category === "flying";
  });
}

/**
 * Check if wave has boss enemies
 */
export function waveHasBossEnemies(wave: WaveConfig): boolean {
  return wave.groups.some((group) => {
    const definition = getEnemyDefinition(group.enemyType);
    return definition?.isBoss;
  });
}

/**
 * Get highest tier in wave
 */
export function getWaveMaxTier(wave: WaveConfig): number {
  return Math.max(...wave.groups.map((g) => g.tier));
}

/**
 * Generate spawn events for a wave
 * Returns timed spawn events in order
 */
export function generateSpawnEvents(wave: WaveConfig): SpawnEvent[] {
  const events: SpawnEvent[] = [];

  for (const group of wave.groups) {
    for (let i = 0; i < group.count; i++) {
      events.push({
        time: group.startDelay + i * group.spawnDelay,
        enemyType: group.enemyType,
        tier: group.tier,
        spawnPoint: group.spawnPoint,
      });
    }
  }

  // Sort by spawn time
  events.sort((a, b) => a.time - b.time);

  return events;
}

export interface SpawnEvent {
  time: number; // ms from wave start
  enemyType: EnemyType;
  tier: number;
  spawnPoint?: number;
}

/**
 * Create a custom wave configuration
 */
export function createWaveConfig(
  waveNumber: number,
  groups: WaveGroup[],
  options?: {
    isBossWave?: boolean;
    bonusReward?: number;
  }
): WaveConfig {
  return {
    id: `wave-custom-${waveNumber}`,
    waveNumber,
    groups,
    isBossWave: options?.isBossWave ?? groups.some((g) => {
      const def = getEnemyDefinition(g.enemyType);
      return def?.isBoss;
    }),
    bonusReward: options?.bonusReward ?? 0,
    difficulty: calculateWaveDifficulty({
      id: "",
      waveNumber,
      groups,
      isBossWave: false,
      bonusReward: 0,
      difficulty: 0,
    }),
  };
}

/**
 * Get recommended player gold for a wave
 * Useful for balancing
 */
export function getRecommendedGold(waveNumber: number): number {
  // Base starting gold + estimated earnings from previous waves
  const baseGold = 100;
  let totalEarnings = 0;

  for (let i = 1; i < waveNumber; i++) {
    const wave = getGlobalWave(i);
    if (!wave) continue;

    for (const group of wave.groups) {
      const definition = getEnemyDefinition(group.enemyType);
      if (!definition) continue;

      const stats = applyTier(definition.baseStats, group.tier);
      totalEarnings += stats.bounty * group.count;
    }

    totalEarnings += wave.bonusReward;
  }

  return baseGold + Math.round(totalEarnings * 0.8); // Assume 80% kill rate
}

/**
 * Get difficulty rating as a string
 */
export function getDifficultyRating(difficulty: number): string {
  if (difficulty < 10) return "Easy";
  if (difficulty < 20) return "Normal";
  if (difficulty < 35) return "Hard";
  if (difficulty < 50) return "Very Hard";
  return "Extreme";
}

/**
 * Get all unique enemy types in a wave
 */
export function getUniqueEnemyTypes(wave: WaveConfig): EnemyType[] {
  return [...new Set(wave.groups.map((g) => g.enemyType))];
}
