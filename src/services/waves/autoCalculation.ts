/**
 * Auto-Calculation Utilities for Wave Configuration
 * Automatically calculates spawn timing, difficulty, and rewards
 */

import type {
  EnemyType,
  WaveGroup,
  WaveConfig,
} from "@/types/enemy";
import type { SimpleEnemyGroup, SimpleWaveConfig } from "@/types/wavePreset";
import { getEnemyDefinition, applyTier } from "@/data/enemies";
import { calculateWaveDifficulty, createWaveConfig } from "@/data/waves/waveUtils";

/**
 * Calculate spawn timing for an enemy group
 * Based on enemy type, count, wave number, and tier
 */
export function calculateSpawnTiming(
  enemyType: EnemyType,
  count: number,
  waveNumber: number,
  tier: number
): { spawnDelay: number; startDelay: number } {
  const definition = getEnemyDefinition(enemyType);
  if (!definition) {
    return { spawnDelay: 1000, startDelay: 0 };
  }

  // Base delay by enemy category and size
  let baseDelay = 1000; // Default

  if (definition.isBoss) {
    baseDelay = 1500; // Bosses spawn slower
  } else if (definition.category === "flying") {
    baseDelay = 800; // Flying enemies slightly faster
  } else {
    // Check enemy speed to determine base delay
    const stats = applyTier(definition.baseStats, tier);
    if (stats.speed > 0.8) {
      baseDelay = 600; // Fast small enemies
    } else if (stats.speed < 0.4) {
      baseDelay = 1200; // Slow large enemies
    }
  }

  // Wave progression scaling (faster spawns in later waves)
  // Linear scaling: wave 1 = 1.0x, wave 50 = 0.5x
  const waveMultiplier = Math.max(0.5, 1.0 - (waveNumber / 100) * 0.5);

  // Tier scaling (higher tiers spawn slightly slower for impact)
  const tierMultiplier = 1.0 + (tier - 1) * 0.1;

  // Count scaling (large groups spawn slightly faster to reduce wave time)
  const countMultiplier = count > 15 ? 0.85 : count > 10 ? 0.9 : 1.0;

  const spawnDelay = Math.round(
    baseDelay * waveMultiplier * tierMultiplier * countMultiplier
  );

  return {
    spawnDelay: Math.max(300, spawnDelay), // Minimum 300ms
    startDelay: 0, // Will be calculated by group sequencing
  };
}

/**
 * Calculate group sequencing with overlaps
 * Boss groups are delayed until other groups are mostly spawned
 */
export function calculateGroupSequencing(
  groups: SimpleEnemyGroup[],
  waveNumber: number
): WaveGroup[] {
  if (groups.length === 0) return [];

  const fullGroups: WaveGroup[] = [];
  let currentDelay = 0;

  // Separate boss and non-boss groups
  const bossGroups: Array<{ index: number; group: SimpleEnemyGroup }> = [];
  const regularGroups: Array<{ index: number; group: SimpleEnemyGroup }> = [];

  groups.forEach((group, index) => {
    const definition = getEnemyDefinition(group.enemyType);
    if (definition?.isBoss) {
      bossGroups.push({ index, group });
    } else {
      regularGroups.push({ index, group });
    }
  });

  // Process regular groups first with 30% overlap
  regularGroups.forEach(({ group }, idx) => {
    const timing = calculateSpawnTiming(
      group.enemyType,
      group.count,
      waveNumber,
      group.tier
    );

    fullGroups.push({
      ...group,
      spawnDelay: timing.spawnDelay,
      startDelay: currentDelay,
    });

    // Next group starts when this group is 70% spawned (30% overlap)
    const groupDuration = timing.spawnDelay * (group.count - 1);
    currentDelay += Math.round(groupDuration * 0.7);
  });

  // Process boss groups after regular groups are mostly complete
  const regularDuration = currentDelay;
  bossGroups.forEach(({ group }, idx) => {
    const timing = calculateSpawnTiming(
      group.enemyType,
      group.count,
      waveNumber,
      group.tier
    );

    // Boss starts when regular groups are 75% complete, with extra dramatic delay
    const bossDelay = Math.round(regularDuration * 0.75) + 3000; // +3s dramatic pause

    fullGroups.push({
      ...group,
      spawnDelay: timing.spawnDelay,
      startDelay: bossDelay + idx * 5000, // Multiple bosses spawn 5s apart
    });
  });

  return fullGroups;
}

/**
 * Convert simple wave config to full wave config with auto-calculations
 */
export function simpleToFullWaveConfig(
  simple: SimpleWaveConfig,
  mapId: string
): WaveConfig {
  // Calculate spawn timing and sequencing
  const groups = calculateGroupSequencing(simple.groups, simple.waveNumber);

  // Detect if it's a boss wave
  const isBossWave = groups.some((g) => {
    const def = getEnemyDefinition(g.enemyType);
    return def?.isBoss;
  });

  // Calculate bonus reward for boss waves
  let bonusReward = 0;
  if (isBossWave) {
    // Base boss reward: 50-500 gold based on wave number and boss count
    const bossCount = groups.filter((g) => {
      const def = getEnemyDefinition(g.enemyType);
      return def?.isBoss;
    }).length;

    bonusReward = Math.round(50 + simple.waveNumber * 5 + bossCount * 100);
  }

  // Create full wave config
  const waveConfig: WaveConfig = {
    id: `${mapId}-wave-${simple.waveNumber}`,
    waveNumber: simple.waveNumber,
    groups,
    isBossWave,
    bonusReward,
    difficulty: 0, // Will be calculated next
    editorMetadata: {
      autoCalculated: true,
    },
  };

  // Calculate difficulty
  waveConfig.difficulty = calculateWaveDifficulty(waveConfig);

  return waveConfig;
}

/**
 * Suggest enemy tier based on wave number
 */
export function suggestTier(waveNumber: number): number {
  if (waveNumber <= 10) return 1;
  if (waveNumber <= 25) return 2;
  if (waveNumber <= 40) return 3;
  if (waveNumber <= 48) return 4;
  return 5;
}

/**
 * Suggest enemy count based on wave number
 * Returns a recommended count range
 */
export function suggestEnemyCount(waveNumber: number, isBoss: boolean): {
  min: number;
  max: number;
  recommended: number;
} {
  if (isBoss) {
    // Boss enemies: 1-3 typically
    return { min: 1, max: 3, recommended: 1 };
  }

  // Regular enemies: scale with wave number
  const baseCount = 5;
  const scaling = Math.floor(waveNumber / 5);

  return {
    min: baseCount,
    max: baseCount + scaling * 5,
    recommended: baseCount + scaling * 2,
  };
}

/**
 * Auto-balance wave difficulty
 * Adjusts enemy counts/tiers to match target difficulty
 */
export function autoBalanceWave(
  groups: SimpleEnemyGroup[],
  waveNumber: number,
  targetDifficulty?: number
): SimpleEnemyGroup[] {
  // If no target, use progressive difficulty curve
  const target = targetDifficulty ?? getTargetDifficulty(waveNumber);

  // Create temp wave config to calculate current difficulty
  const tempWave = simpleToFullWaveConfig({ waveNumber, groups }, "temp");
  const currentDifficulty = tempWave.difficulty;

  // If within 10% of target, return as-is
  if (
    currentDifficulty >= target * 0.9 &&
    currentDifficulty <= target * 1.1
  ) {
    return groups;
  }

  // Calculate scaling factor
  const scaleFactor = Math.sqrt(target / Math.max(1, currentDifficulty));

  // Adjust counts proportionally
  return groups.map((group) => ({
    ...group,
    count: Math.max(1, Math.round(group.count * scaleFactor)),
  }));
}

/**
 * Get target difficulty for a wave number
 * Based on recommended progression curve
 */
export function getTargetDifficulty(waveNumber: number): number {
  // Exponential curve with difficulty tiers
  if (waveNumber <= 5) return 2 + waveNumber; // 3-7 (Tutorial)
  if (waveNumber <= 10) return 8 + (waveNumber - 5) * 1.5; // 9-16 (Early)
  if (waveNumber <= 20) return 16 + (waveNumber - 10) * 1.5; // 17-31 (Mid-Early)
  if (waveNumber <= 35) return 31 + (waveNumber - 20) * 1.3; // 32-50 (Mid-Late)
  if (waveNumber <= 45) return 50 + (waveNumber - 35) * 2; // 51-70 (Late)
  return 70 + (waveNumber - 45) * 3; // 71-85 (Endgame)
}
