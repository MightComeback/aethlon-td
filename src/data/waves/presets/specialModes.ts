/**
 * Special Mode Presets
 * Alternative game modes with unique wave patterns
 */

import type { WavePreset, PresetOptions } from "@/types/wavePreset";
import type { WaveConfig } from "@/types/enemy";
import { EnemyType } from "@/types/enemy";
import { GLOBAL_WAVES, getBossEnemies } from "../globalWaves";
import { createWaveConfig } from "../waveUtils";

// ============================================================================
// Special Mode Presets
// ============================================================================

export const SPECIAL_MODE_PRESETS: WavePreset[] = [
  {
    id: "boss-rush",
    name: "Boss Rush",
    description: "Face a boss every 4 waves. Intense boss encounters with minimal filler waves.",
    category: "special",
    icon: "crown",
    difficultyRating: 5,
    waveCount: 20,
    suggestedMode: "replace",
    tags: ["boss", "challenge", "intense"],
    generateWaves: (options) => {
      const waves: WaveConfig[] = [];
      const startWave = options?.startWave ?? 1;
      const mapId = "boss-rush";

      // Get all boss types from global waves
      const bossTypes = [
        EnemyType.SkeletonKing,
        EnemyType.GoblinChief,
        EnemyType.ZombieLord,
        EnemyType.SpiderQueen,
        EnemyType.OrcWarlord,
      ];

      for (let i = 0; i < 20; i++) {
        const waveNumber = startWave + i;
        const isBossWave = (i + 1) % 4 === 0; // Every 4th wave

        if (isBossWave) {
          // Boss wave with support
          const bossIndex = Math.floor(i / 4) % bossTypes.length;
          const bossType = bossTypes[bossIndex]!;
          const tier = Math.min(5, Math.floor(i / 8) + 1);

          waves.push(
            createWaveConfig(
              waveNumber,
              [
                // Support enemies
                {
                  enemyType: EnemyType.Skeleton,
                  tier: Math.max(1, tier - 1),
                  count: 8 + i * 2,
                  spawnDelay: 800,
                  startDelay: 0,
                },
                // Boss
                {
                  enemyType: bossType,
                  tier,
                  count: 1,
                  spawnDelay: 0,
                  startDelay: 8000,
                },
              ],
              {
                isBossWave: true,
                bonusReward: 150 + i * 25,
              }
            )
          );
        } else {
          // Filler wave - quick and simple
          waves.push(
            createWaveConfig(
              waveNumber,
              [
                {
                  enemyType: EnemyType.Snail,
                  tier: 1,
                  count: 5 + i,
                  spawnDelay: 600,
                  startDelay: 0,
                },
              ],
              {
                bonusReward: 25,
              }
            )
          );
        }
      }

      return waves;
    },
  },

  {
    id: "speed-run",
    name: "Speed Run",
    description: "25 intense waves with rapid spawning. Can you survive the onslaught?",
    category: "special",
    icon: "lightning-bolt",
    difficultyRating: 4,
    waveCount: 25,
    suggestedMode: "replace",
    tags: ["fast", "intense", "quick"],
    generateWaves: (options) => {
      const startWave = options?.startWave ?? 1;
      const mapId = "speed-run";

      // Take first 25 global waves and speed them up
      return GLOBAL_WAVES.slice(0, 25).map((wave, index) => ({
        ...wave,
        id: `${mapId}-wave-${index + startWave}`,
        waveNumber: startWave + index,
        groups: wave.groups.map((group) => ({
          ...group,
          spawnDelay: Math.round(group.spawnDelay * 0.5), // 50% faster spawning
          count: Math.round(group.count * 1.2), // 20% more enemies
        })),
        bonusReward: Math.round(wave.bonusReward * 1.5),
      }));
    },
  },

  {
    id: "endless",
    name: "Endless Survival",
    description: "100 waves with exponential scaling. How long can you last?",
    category: "special",
    icon: "infinity",
    difficultyRating: 5,
    waveCount: 100,
    suggestedMode: "replace",
    tags: ["endless", "survival", "extreme", "long"],
    generateWaves: (options) => {
      const startWave = options?.startWave ?? 1;
      const mapId = "endless";
      const waves: WaveConfig[] = [];

      // Repeat and scale global waves
      for (let i = 0; i < 100; i++) {
        const cycleIndex = i % GLOBAL_WAVES.length;
        const cycle = Math.floor(i / GLOBAL_WAVES.length);
        const baseWave = GLOBAL_WAVES[cycleIndex]!;
        const scaleFactor = 1 + cycle * 0.3; // 30% harder each cycle

        waves.push({
          ...baseWave,
          id: `${mapId}-wave-${i + startWave}`,
          waveNumber: startWave + i,
          groups: baseWave.groups.map((group) => ({
            ...group,
            tier: Math.min(5, group.tier + cycle),
            count: Math.round(group.count * scaleFactor),
          })),
          difficulty: Math.round(baseWave.difficulty * scaleFactor * (1 + cycle)),
          bonusReward: Math.round(baseWave.bonusReward * (1 + cycle * 0.5)),
        });
      }

      return waves;
    },
  },

  {
    id: "tutorial",
    name: "Tutorial Mode",
    description: "10 gentle waves perfect for learning tower defense basics.",
    category: "special",
    icon: "book",
    difficultyRating: 1,
    waveCount: 10,
    suggestedMode: "replace",
    tags: ["tutorial", "beginner", "learning", "easy"],
    generateWaves: (options) => {
      const startWave = options?.startWave ?? 1;
      const mapId = "tutorial";

      // Take first 10 global waves and make them easier
      return GLOBAL_WAVES.slice(0, 10).map((wave, index) => ({
        ...wave,
        id: `${mapId}-wave-${index + startWave}`,
        waveNumber: startWave + index,
        groups: wave.groups.map((group) => ({
          ...group,
          tier: 1, // Always tier 1
          count: Math.max(3, Math.round(group.count * 0.6)), // 40% fewer enemies
          spawnDelay: Math.round(group.spawnDelay * 1.5), // 50% slower spawning
        })),
        bonusReward: Math.round(wave.bonusReward * 0.5),
      }));
    },
  },

  {
    id: "swarm",
    name: "Swarm Mode",
    description: "Massive enemy counts with reduced health. Pure chaos!",
    category: "special",
    icon: "bee",
    difficultyRating: 4,
    waveCount: 40,
    suggestedMode: "replace",
    tags: ["swarm", "chaos", "many-enemies"],
    generateWaves: (options) => {
      const startWave = options?.startWave ?? 1;
      const mapId = "swarm";

      return GLOBAL_WAVES.slice(0, 40).map((wave, index) => ({
        ...wave,
        id: `${mapId}-wave-${index + startWave}`,
        waveNumber: startWave + index,
        groups: wave.groups.map((group) => ({
          ...group,
          tier: Math.max(1, group.tier - 1), // Lower tier (weaker enemies)
          count: Math.round(group.count * 2.5), // 150% more enemies!
          spawnDelay: Math.round(group.spawnDelay * 0.7), // Faster spawning
        })),
        difficulty: Math.round(wave.difficulty * 1.5),
      }));
    },
  },

  {
    id: "elite",
    name: "Elite Challenge",
    description: "Fewer but much stronger enemies. All enemies tier 3-5.",
    category: "special",
    icon: "gem",
    difficultyRating: 5,
    waveCount: 30,
    suggestedMode: "replace",
    tags: ["elite", "hard", "strong-enemies"],
    generateWaves: (options) => {
      const startWave = options?.startWave ?? 1;
      const mapId = "elite";

      return GLOBAL_WAVES.slice(0, 30).map((wave, index) => ({
        ...wave,
        id: `${mapId}-wave-${index + startWave}`,
        waveNumber: startWave + index,
        groups: wave.groups.map((group) => ({
          ...group,
          tier: Math.min(5, Math.max(3, group.tier + 2)), // Tier 3-5
          count: Math.max(2, Math.round(group.count * 0.4)), // 60% fewer enemies
          spawnDelay: Math.round(group.spawnDelay * 1.3), // Slower spawning
        })),
        bonusReward: Math.round(wave.bonusReward * 1.8),
        difficulty: Math.round(wave.difficulty * 1.6),
      }));
    },
  },
];

/**
 * Get a special mode preset by ID
 */
export function getSpecialModePreset(id: string): WavePreset | undefined {
  return SPECIAL_MODE_PRESETS.find((p) => p.id === id);
}

/**
 * Get all special mode preset IDs
 */
export function getSpecialModePresetIds(): string[] {
  return SPECIAL_MODE_PRESETS.map((p) => p.id);
}
