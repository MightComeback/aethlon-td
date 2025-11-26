/**
 * Difficulty Presets
 * Scales the 50 global waves with different difficulty multipliers
 */

import type { WavePreset, PresetOptions } from "@/types/wavePreset";
import type { WaveConfig, WaveGroup } from "@/types/enemy";
import { GLOBAL_WAVES } from "../globalWaves";
import { getEnemyDefinition, applyTier } from "@/data/enemies";

/**
 * Scale a wave group with difficulty multipliers
 */
function scaleWaveGroup(
  group: WaveGroup,
  healthMultiplier: number,
  speedMultiplier: number,
  spawnDelayMultiplier: number,
  tierBoost: number
): WaveGroup {
  // Calculate new tier (max 5)
  const newTier = Math.min(5, Math.max(1, group.tier + tierBoost));

  // Apply spawn delay multiplier (lower = faster spawning = harder)
  const newSpawnDelay = Math.round(group.spawnDelay * spawnDelayMultiplier);

  return {
    ...group,
    tier: newTier,
    spawnDelay: Math.max(300, newSpawnDelay), // Min 300ms
  };
}

/**
 * Scale an entire wave configuration
 */
function scaleWave(
  wave: WaveConfig,
  healthMultiplier: number,
  speedMultiplier: number,
  spawnDelayMultiplier: number,
  tierBoost: number,
  rewardMultiplier: number,
  mapId: string
): WaveConfig {
  const scaledGroups = wave.groups.map((group) =>
    scaleWaveGroup(group, healthMultiplier, speedMultiplier, spawnDelayMultiplier, tierBoost)
  );

  // Recalculate difficulty based on new tiers
  let difficulty = 0;
  for (const group of scaledGroups) {
    const definition = getEnemyDefinition(group.enemyType);
    if (!definition) continue;

    const stats = applyTier(definition.baseStats, group.tier);
    const enemyValue =
      stats.maxHealth * healthMultiplier * 0.01 +
      stats.armor * 2 +
      stats.magicResistance * 2 +
      (definition.isBoss ? 50 : 0);

    difficulty += enemyValue * group.count * (1 + (group.tier - 1) * 0.5);
  }

  return {
    ...wave,
    id: `${mapId}-${wave.id}`,
    groups: scaledGroups,
    bonusReward: Math.round(wave.bonusReward * rewardMultiplier),
    difficulty: Math.round(difficulty),
    editorMetadata: {
      autoCalculated: false,
      sourcePreset: "difficulty",
    },
  };
}

/**
 * Generate waves for a difficulty preset
 */
function generateDifficultyWaves(
  healthMult: number,
  speedMult: number,
  spawnDelayMult: number,
  tierBoost: number,
  rewardMult: number,
  options?: PresetOptions
): WaveConfig[] {
  const mapId = "difficulty-preset";
  const startWave = options?.startWave ?? 1;
  const difficultyMultiplier = options?.difficultyMultiplier ?? 1.0;

  // Apply additional difficulty multiplier if provided
  const finalHealthMult = healthMult * difficultyMultiplier;
  const finalSpawnDelayMult = spawnDelayMult / Math.sqrt(difficultyMultiplier);

  return GLOBAL_WAVES.map((wave) =>
    scaleWave(
      { ...wave, waveNumber: wave.waveNumber - 1 + startWave },
      finalHealthMult,
      speedMult,
      finalSpawnDelayMult,
      tierBoost,
      rewardMult,
      mapId
    )
  );
}

// ============================================================================
// Difficulty Presets
// ============================================================================

export const DIFFICULTY_PRESETS: WavePreset[] = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Perfect for learning tower defense basics. Enemies are weaker and spawn slower.",
    category: "difficulty",
    icon: "star",
    difficultyRating: 1,
    waveCount: 50,
    suggestedMode: "replace",
    tags: ["easy", "tutorial", "beginner", "learning"],
    generateWaves: (options) =>
      generateDifficultyWaves(
        0.6, // 40% less health
        0.8, // 20% slower movement
        1.3, // 30% longer spawn delays
        0, // No tier boost
        0.8, // 20% less rewards (easier = less reward)
        options
      ),
  },

  {
    id: "easy",
    name: "Easy",
    description: "Relaxed gameplay with reduced enemy health and slower spawning.",
    category: "difficulty",
    icon: "star",
    difficultyRating: 2,
    waveCount: 50,
    suggestedMode: "replace",
    tags: ["easy", "casual", "relaxed"],
    generateWaves: (options) =>
      generateDifficultyWaves(
        0.8, // 20% less health
        0.9, // 10% slower movement
        1.15, // 15% longer spawn delays
        0, // No tier boost
        0.9, // 10% less rewards
        options
      ),
  },

  {
    id: "normal",
    name: "Normal",
    description: "Balanced difficulty using the default global wave configuration.",
    category: "difficulty",
    icon: "star",
    difficultyRating: 3,
    waveCount: 50,
    suggestedMode: "replace",
    tags: ["normal", "balanced", "default", "standard"],
    generateWaves: (options) =>
      generateDifficultyWaves(
        1.0, // Normal health
        1.0, // Normal speed
        1.0, // Normal spawn delays
        0, // No tier boost
        1.0, // Normal rewards
        options
      ),
  },

  {
    id: "hard",
    name: "Hard",
    description: "Challenging waves with increased enemy health and faster spawning.",
    category: "difficulty",
    icon: "star",
    difficultyRating: 4,
    waveCount: 50,
    suggestedMode: "replace",
    tags: ["hard", "challenging", "difficult"],
    generateWaves: (options) =>
      generateDifficultyWaves(
        1.3, // 30% more health
        1.15, // 15% faster movement
        0.85, // 15% shorter spawn delays
        0, // No tier boost
        1.3, // 30% more rewards
        options
      ),
  },

  {
    id: "very-hard",
    name: "Very Hard",
    description: "Intense difficulty with significantly stronger enemies and higher tiers.",
    category: "difficulty",
    icon: "star",
    difficultyRating: 5,
    waveCount: 50,
    suggestedMode: "replace",
    tags: ["very-hard", "intense", "expert"],
    generateWaves: (options) =>
      generateDifficultyWaves(
        1.6, // 60% more health
        1.25, // 25% faster movement
        0.75, // 25% shorter spawn delays
        1, // +1 tier boost
        1.6, // 60% more rewards
        options
      ),
  },

  {
    id: "extreme",
    name: "Extreme",
    description: "For true masters only. Enemies have double health, maximum tiers, and relentless spawning.",
    category: "difficulty",
    icon: "fire",
    difficultyRating: 5,
    waveCount: 50,
    suggestedMode: "replace",
    tags: ["extreme", "nightmare", "master", "insane"],
    generateWaves: (options) =>
      generateDifficultyWaves(
        2.0, // Double health
        1.4, // 40% faster movement
        0.6, // 40% shorter spawn delays
        2, // +2 tier boost (enemies are 2 tiers higher)
        2.0, // Double rewards
        options
      ),
  },
];

/**
 * Get a difficulty preset by ID
 */
export function getDifficultyPreset(id: string): WavePreset | undefined {
  return DIFFICULTY_PRESETS.find((p) => p.id === id);
}

/**
 * Get all difficulty preset IDs
 */
export function getDifficultyPresetIds(): string[] {
  return DIFFICULTY_PRESETS.map((p) => p.id);
}
