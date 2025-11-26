/**
 * Theme Presets
 * Wave sequences based on enemy type themes
 * Note: This is a starter set - can be expanded with more themes later
 */

import type { WavePreset } from "@/types/wavePreset";
import type { WaveConfig } from "@/types/enemy";
import { EnemyType } from "@/types/enemy";
import { createWaveConfig } from "../waveUtils";
import { suggestTier, suggestEnemyCount } from "@/services/waves/autoCalculation";

// Helper to generate themed waves
function generateThemedWaves(
  enemyPool: EnemyType[],
  waveCount: number,
  includeBoss: boolean,
  bossTypes: EnemyType[],
  mapId: string
): WaveConfig[] {
  const waves: WaveConfig[] = [];

  for (let i = 0; i < waveCount; i++) {
    const waveNumber = i + 1;
    const tier = suggestTier(waveNumber);
    const isBossWave = includeBoss && waveNumber % 10 === 0;

    if (isBossWave && bossTypes.length > 0) {
      // Boss wave
      const bossType = bossTypes[Math.floor(waveNumber / 10) % bossTypes.length]!;
      const supportType = enemyPool[waveNumber % enemyPool.length]!;
      const { recommended } = suggestEnemyCount(waveNumber, false);

      waves.push(
        createWaveConfig(
          waveNumber,
          [
            {
              enemyType: supportType,
              tier: Math.max(1, tier - 1),
              count: recommended,
              spawnDelay: 900,
              startDelay: 0,
            },
            {
              enemyType: bossType,
              tier,
              count: 1,
              spawnDelay: 0,
              startDelay: 10000,
            },
          ],
          {
            isBossWave: true,
            bonusReward: 100 + waveNumber * 10,
          }
        )
      );
    } else {
      // Regular wave - mix 2-3 enemy types from pool
      const groupCount = waveNumber < 10 ? 1 : waveNumber < 25 ? 2 : 3;
      const groups = [];

      for (let g = 0; g < groupCount; g++) {
        const enemyType = enemyPool[(waveNumber + g) % enemyPool.length]!;
        const { recommended } = suggestEnemyCount(waveNumber, false);
        const count = Math.max(3, Math.round(recommended / groupCount));

        groups.push({
          enemyType,
          tier: g === 0 ? tier : Math.max(1, tier - 1),
          count,
          spawnDelay: 1000 - g * 100,
          startDelay: g * 3000,
        });
      }

      waves.push(createWaveConfig(waveNumber, groups));
    }
  }

  return waves;
}

// ============================================================================
// Theme Presets
// ============================================================================

export const THEME_PRESETS: WavePreset[] = [
  {
    id: "undead-horde",
    name: "Undead Horde",
    description: "Face endless waves of zombies, skeletons, and dark spirits.",
    category: "theme",
    icon: "skull",
    difficultyRating: 3,
    waveCount: 40,
    suggestedMode: "replace",
    tags: ["undead", "zombie", "skeleton", "dark", "halloween"],
    generateWaves: () =>
      generateThemedWaves(
        [
          EnemyType.Zombie,
          EnemyType.ZombieCrawler,
          EnemyType.Skeleton,
          EnemyType.SkeletonWarrior,
          EnemyType.Ghost,
          EnemyType.Wraith,
          EnemyType.Mummy,
          EnemyType.Ghoul,
        ],
        40,
        true,
        [EnemyType.SkeletonKing, EnemyType.ZombieLord, EnemyType.LichKing, EnemyType.VampireLord],
        "undead-horde"
      ),
  },

  {
    id: "beast-invasion",
    name: "Beast Invasion",
    description: "Wild creatures attack! Wolves, bears, and fierce beasts.",
    category: "theme",
    icon: "mountain",
    difficultyRating: 3,
    waveCount: 35,
    suggestedMode: "replace",
    tags: ["beast", "animal", "wild", "nature"],
    generateWaves: () =>
      generateThemedWaves(
        [
          EnemyType.Wolf,
          EnemyType.DireWolf,
          EnemyType.Bear,
          EnemyType.DireBear,
          EnemyType.Boar,
          EnemyType.WildBoar,
          EnemyType.Rat,
          EnemyType.GiantRat,
        ],
        35,
        true,
        [EnemyType.WerewolfAlpha, EnemyType.Cerberus],
        "beast-invasion"
      ),
  },

  {
    id: "sky-armada",
    name: "Sky Armada",
    description: "The skies darken with flying enemies. Build anti-air defenses!",
    category: "theme",
    icon: "wind",
    difficultyRating: 4,
    waveCount: 30,
    suggestedMode: "replace",
    tags: ["flying", "air", "dragon", "sky"],
    generateWaves: () =>
      generateThemedWaves(
        [
          EnemyType.Bat,
          EnemyType.GiantBat,
          EnemyType.Raven,
          EnemyType.MurderCrow,
          EnemyType.Harpy,
          EnemyType.HarpyQueen,
          EnemyType.DragonWhelp,
          EnemyType.Wyvern,
        ],
        30,
        true,
        [EnemyType.DragonRed, EnemyType.DragonBlue, EnemyType.DragonGreen],
        "sky-armada"
      ),
  },

  {
    id: "goblin-army",
    name: "Goblin Army",
    description: "Goblins and orcs march to war! Fast and numerous.",
    category: "theme",
    icon: "sword",
    difficultyRating: 3,
    waveCount: 35,
    suggestedMode: "replace",
    tags: ["goblin", "orc", "humanoid", "army"],
    generateWaves: () =>
      generateThemedWaves(
        [
          EnemyType.Goblin,
          EnemyType.GoblinArcher,
          EnemyType.Orc,
          EnemyType.OrcBrute,
          EnemyType.Bandit,
          EnemyType.BanditLeader,
        ],
        35,
        true,
        [EnemyType.GoblinChief, EnemyType.OrcWarlord],
        "goblin-army"
      ),
  },

  {
    id: "insect-swarm",
    name: "Insect Swarm",
    description: "Massive swarms of bugs and insects. Fast and relentless!",
    category: "theme",
    icon: "bee",
    difficultyRating: 4,
    waveCount: 40,
    suggestedMode: "replace",
    tags: ["insect", "bug", "swarm", "fast"],
    generateWaves: () =>
      generateThemedWaves(
        [
          EnemyType.Beetle,
          EnemyType.ScarabBeetle,
          EnemyType.Spider,
          EnemyType.GiantSpider,
          EnemyType.Wasp,
          EnemyType.GiantWasp,
          EnemyType.Scorpion,
          EnemyType.GiantScorpion,
        ],
        40,
        true,
        [EnemyType.SpiderQueen],
        "insect-swarm"
      ),
  },

  {
    id: "chaos-mix",
    name: "Chaos Mix",
    description: "Random and unpredictable waves. Every enemy type appears!",
    category: "theme",
    icon: "dice",
    difficultyRating: 3,
    waveCount: 50,
    suggestedMode: "replace",
    tags: ["random", "mixed", "chaos", "variety"],
    generateWaves: () => {
      // Use a wide mix of all enemy types
      const allEnemies = Object.values(EnemyType).filter(
        (type) => !["SkeletonKing", "ZombieLord", "GoblinChief", "DragonRed"].includes(type)
      );

      return generateThemedWaves(
        allEnemies.slice(0, 30), // Use first 30 enemy types
        50,
        true,
        [
          EnemyType.SkeletonKing,
          EnemyType.DragonRed,
          EnemyType.SpiderQueen,
          EnemyType.DemonLord,
          EnemyType.Titan,
        ],
        "chaos-mix"
      );
    },
  },
];

/**
 * Get a theme preset by ID
 */
export function getThemePreset(id: string): WavePreset | undefined {
  return THEME_PRESETS.find((p) => p.id === id);
}
