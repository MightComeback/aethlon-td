/**
 * Global Wave Progression
 * 50 waves with increasing difficulty
 *
 * Wave difficulty curve:
 * - Waves 1-5: Tutorial - basic enemies, slow spawn
 * - Waves 6-15: Early game - introduce flying, mixed groups
 * - Waves 16-30: Mid game - higher tiers, special abilities
 * - Waves 31-45: Late game - all enemy types, large swarms
 * - Waves 46-50: Endgame - boss gauntlet
 */

import type { WaveConfig } from "@/types/enemy";
import { EnemyType } from "@/types/enemy";

/**
 * Global wave configurations
 * Each wave has groups of enemies with spawn timing
 */
export const GLOBAL_WAVES: WaveConfig[] = [
  // ============================================================================
  // TUTORIAL WAVES (1-5) - Learn the basics
  // ============================================================================

  // Wave 1: Introduction
  {
    id: "wave-1",
    waveNumber: 1,
    groups: [
      { enemyType: EnemyType.Snail, tier: 1, count: 5, spawnDelay: 2000, startDelay: 0 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 1,
  },

  // Wave 2: More snails
  {
    id: "wave-2",
    waveNumber: 2,
    groups: [
      { enemyType: EnemyType.Snail, tier: 1, count: 6, spawnDelay: 1800, startDelay: 0 },
      { enemyType: EnemyType.Slug, tier: 1, count: 3, spawnDelay: 2000, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 2,
  },

  // Wave 3: Introduce zombies
  {
    id: "wave-3",
    waveNumber: 3,
    groups: [
      { enemyType: EnemyType.Zombie, tier: 1, count: 5, spawnDelay: 1500, startDelay: 0 },
      { enemyType: EnemyType.Snail, tier: 1, count: 4, spawnDelay: 2000, startDelay: 3000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 3,
  },

  // Wave 4: Skeletons join
  {
    id: "wave-4",
    waveNumber: 4,
    groups: [
      { enemyType: EnemyType.Skeleton, tier: 1, count: 4, spawnDelay: 1400, startDelay: 0 },
      { enemyType: EnemyType.Zombie, tier: 1, count: 4, spawnDelay: 1500, startDelay: 2000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 4,
  },

  // Wave 5: First flying enemies
  {
    id: "wave-5",
    waveNumber: 5,
    groups: [
      { enemyType: EnemyType.Bat, tier: 1, count: 6, spawnDelay: 1200, startDelay: 0 },
      { enemyType: EnemyType.Skeleton, tier: 1, count: 4, spawnDelay: 1500, startDelay: 3000 },
      { enemyType: EnemyType.Moth, tier: 1, count: 4, spawnDelay: 1300, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 10,
    difficulty: 5,
  },

  // ============================================================================
  // EARLY GAME (6-15) - Introduce variety
  // ============================================================================

  // Wave 6: Goblins
  {
    id: "wave-6",
    waveNumber: 6,
    groups: [
      { enemyType: EnemyType.Goblin, tier: 1, count: 8, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.Skeleton, tier: 1, count: 5, spawnDelay: 1400, startDelay: 4000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 6,
  },

  // Wave 7: Rats and spiders
  {
    id: "wave-7",
    waveNumber: 7,
    groups: [
      { enemyType: EnemyType.Rat, tier: 1, count: 10, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.Spider, tier: 1, count: 6, spawnDelay: 1200, startDelay: 2000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 7,
  },

  // Wave 8: First mini-boss wave
  {
    id: "wave-8",
    waveNumber: 8,
    groups: [
      { enemyType: EnemyType.Zombie, tier: 1, count: 6, spawnDelay: 1200, startDelay: 0 },
      { enemyType: EnemyType.GoblinChief, tier: 1, count: 1, spawnDelay: 0, startDelay: 3000 },
      { enemyType: EnemyType.Goblin, tier: 1, count: 8, spawnDelay: 1000, startDelay: 3500 },
    ],
    isBossWave: true,
    bonusReward: 50,
    difficulty: 10,
  },

  // Wave 9: Flying swarm
  {
    id: "wave-9",
    waveNumber: 9,
    groups: [
      { enemyType: EnemyType.Bat, tier: 1, count: 8, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.GiantBat, tier: 1, count: 3, spawnDelay: 1500, startDelay: 4000 },
      { enemyType: EnemyType.Raven, tier: 1, count: 6, spawnDelay: 1100, startDelay: 6000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 9,
  },

  // Wave 10: First real boss
  {
    id: "wave-10",
    waveNumber: 10,
    groups: [
      { enemyType: EnemyType.Skeleton, tier: 1, count: 8, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.SkeletonWarrior, tier: 1, count: 4, spawnDelay: 1300, startDelay: 3000 },
      { enemyType: EnemyType.SkeletonKing, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 100,
    difficulty: 15,
  },

  // Wave 11: Wasps and bugs
  {
    id: "wave-11",
    waveNumber: 11,
    groups: [
      { enemyType: EnemyType.Wasp, tier: 1, count: 8, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.Beetle, tier: 1, count: 6, spawnDelay: 1200, startDelay: 3000 },
      { enemyType: EnemyType.MurderCrow, tier: 1, count: 4, spawnDelay: 1400, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 11,
  },

  // Wave 12: Wolves
  {
    id: "wave-12",
    waveNumber: 12,
    groups: [
      { enemyType: EnemyType.Wolf, tier: 1, count: 8, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.DireWolf, tier: 1, count: 3, spawnDelay: 1500, startDelay: 4000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 12,
  },

  // Wave 13: Slimes
  {
    id: "wave-13",
    waveNumber: 13,
    groups: [
      { enemyType: EnemyType.Slime, tier: 1, count: 10, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.SlimeKing, tier: 1, count: 2, spawnDelay: 2000, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 13,
  },

  // Wave 14: Ghosts introduce magic resist
  {
    id: "wave-14",
    waveNumber: 14,
    groups: [
      { enemyType: EnemyType.Ghost, tier: 1, count: 6, spawnDelay: 1200, startDelay: 0 },
      { enemyType: EnemyType.Specter, tier: 1, count: 4, spawnDelay: 1500, startDelay: 4000 },
      { enemyType: EnemyType.FlyingSkull, tier: 1, count: 6, spawnDelay: 1000, startDelay: 6000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 14,
  },

  // Wave 15: Zombie horde
  {
    id: "wave-15",
    waveNumber: 15,
    groups: [
      { enemyType: EnemyType.Zombie, tier: 1, count: 10, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.ZombieCrawler, tier: 1, count: 6, spawnDelay: 1000, startDelay: 3000 },
      { enemyType: EnemyType.ZombieLord, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
      { enemyType: EnemyType.Ghoul, tier: 1, count: 4, spawnDelay: 1200, startDelay: 7000 },
    ],
    isBossWave: true,
    bonusReward: 100,
    difficulty: 18,
  },

  // ============================================================================
  // MID GAME (16-30) - Higher tiers, more complex
  // ============================================================================

  // Wave 16: Tier 2 enemies appear
  {
    id: "wave-16",
    waveNumber: 16,
    groups: [
      { enemyType: EnemyType.Goblin, tier: 2, count: 8, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.GoblinArcher, tier: 1, count: 5, spawnDelay: 1100, startDelay: 3000 },
      { enemyType: EnemyType.DragonWhelp, tier: 1, count: 3, spawnDelay: 1500, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 16,
  },

  // Wave 17: Harpies
  {
    id: "wave-17",
    waveNumber: 17,
    groups: [
      { enemyType: EnemyType.Harpy, tier: 1, count: 6, spawnDelay: 1100, startDelay: 0 },
      { enemyType: EnemyType.Banshee, tier: 1, count: 4, spawnDelay: 1400, startDelay: 3000 },
      { enemyType: EnemyType.HarpyQueen, tier: 1, count: 2, spawnDelay: 2000, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 17,
  },

  // Wave 18: Spiders galore
  {
    id: "wave-18",
    waveNumber: 18,
    groups: [
      { enemyType: EnemyType.Spider, tier: 2, count: 8, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.GiantSpider, tier: 1, count: 4, spawnDelay: 1300, startDelay: 3000 },
      { enemyType: EnemyType.SpiderQueen, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 100,
    difficulty: 22,
  },

  // Wave 19: Fire enemies
  {
    id: "wave-19",
    waveNumber: 19,
    groups: [
      { enemyType: EnemyType.Imp, tier: 1, count: 8, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.ImpFire, tier: 1, count: 5, spawnDelay: 1100, startDelay: 3000 },
      { enemyType: EnemyType.FireDrake, tier: 1, count: 3, spawnDelay: 1500, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 19,
  },

  // Wave 20: Orc war party
  {
    id: "wave-20",
    waveNumber: 20,
    groups: [
      { enemyType: EnemyType.Orc, tier: 2, count: 6, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.OrcBrute, tier: 1, count: 4, spawnDelay: 1300, startDelay: 3000 },
      { enemyType: EnemyType.OrcWarlord, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
      { enemyType: EnemyType.Orc, tier: 1, count: 6, spawnDelay: 1000, startDelay: 7000 },
    ],
    isBossWave: true,
    bonusReward: 150,
    difficulty: 25,
  },

  // Wave 21: Ice enemies
  {
    id: "wave-21",
    waveNumber: 21,
    groups: [
      { enemyType: EnemyType.FrostDrake, tier: 1, count: 4, spawnDelay: 1300, startDelay: 0 },
      { enemyType: EnemyType.Ghost, tier: 2, count: 6, spawnDelay: 1100, startDelay: 3000 },
      { enemyType: EnemyType.Wraith, tier: 1, count: 3, spawnDelay: 1500, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 21,
  },

  // Wave 22: Slime emperor
  {
    id: "wave-22",
    waveNumber: 22,
    groups: [
      { enemyType: EnemyType.Slime, tier: 2, count: 10, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.SlimeKing, tier: 2, count: 3, spawnDelay: 1500, startDelay: 4000 },
      { enemyType: EnemyType.SlimeEmperor, tier: 1, count: 1, spawnDelay: 0, startDelay: 7000 },
    ],
    isBossWave: true,
    bonusReward: 120,
    difficulty: 26,
  },

  // Wave 23: Poison wave
  {
    id: "wave-23",
    waveNumber: 23,
    groups: [
      { enemyType: EnemyType.Scorpion, tier: 2, count: 6, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.GiantScorpion, tier: 1, count: 3, spawnDelay: 1400, startDelay: 3000 },
      { enemyType: EnemyType.WyvernPoison, tier: 1, count: 2, spawnDelay: 1800, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 23,
  },

  // Wave 24: Trolls
  {
    id: "wave-24",
    waveNumber: 24,
    groups: [
      { enemyType: EnemyType.Troll, tier: 1, count: 4, spawnDelay: 1500, startDelay: 0 },
      { enemyType: EnemyType.TrollBridge, tier: 1, count: 2, spawnDelay: 2000, startDelay: 3000 },
      { enemyType: EnemyType.Ogre, tier: 1, count: 3, spawnDelay: 1800, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 24,
  },

  // Wave 25: Werewolf pack
  {
    id: "wave-25",
    waveNumber: 25,
    groups: [
      { enemyType: EnemyType.Wolf, tier: 2, count: 8, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.DireWolf, tier: 2, count: 4, spawnDelay: 1200, startDelay: 3000 },
      { enemyType: EnemyType.Werewolf, tier: 1, count: 3, spawnDelay: 1500, startDelay: 5000 },
      { enemyType: EnemyType.WerewolfAlpha, tier: 1, count: 1, spawnDelay: 0, startDelay: 7000 },
    ],
    isBossWave: true,
    bonusReward: 150,
    difficulty: 30,
  },

  // Wave 26: Dark mages
  {
    id: "wave-26",
    waveNumber: 26,
    groups: [
      { enemyType: EnemyType.Skeleton, tier: 2, count: 8, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.SkeletonWarrior, tier: 2, count: 4, spawnDelay: 1200, startDelay: 3000 },
      { enemyType: EnemyType.Necromancer, tier: 1, count: 1, spawnDelay: 0, startDelay: 5000 },
      { enemyType: EnemyType.Zombie, tier: 2, count: 6, spawnDelay: 1000, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 130,
    difficulty: 28,
  },

  // Wave 27: Gargoyles
  {
    id: "wave-27",
    waveNumber: 27,
    groups: [
      { enemyType: EnemyType.Gargoyle, tier: 1, count: 6, spawnDelay: 1300, startDelay: 0 },
      { enemyType: EnemyType.Griffin, tier: 1, count: 3, spawnDelay: 1600, startDelay: 4000 },
      { enemyType: EnemyType.Cockatrice, tier: 1, count: 4, spawnDelay: 1400, startDelay: 6000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 27,
  },

  // Wave 28: Stone golems
  {
    id: "wave-28",
    waveNumber: 28,
    groups: [
      { enemyType: EnemyType.Golem, tier: 2, count: 4, spawnDelay: 1500, startDelay: 0 },
      { enemyType: EnemyType.StoneGolem, tier: 1, count: 3, spawnDelay: 1800, startDelay: 3000 },
      { enemyType: EnemyType.AncientGolem, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 160,
    difficulty: 32,
  },

  // Wave 29: Bandits
  {
    id: "wave-29",
    waveNumber: 29,
    groups: [
      { enemyType: EnemyType.Bandit, tier: 2, count: 10, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.BanditLeader, tier: 2, count: 3, spawnDelay: 1300, startDelay: 4000 },
      { enemyType: EnemyType.Centaur, tier: 1, count: 4, spawnDelay: 1400, startDelay: 6000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 29,
  },

  // Wave 30: Vampire's court
  {
    id: "wave-30",
    waveNumber: 30,
    groups: [
      { enemyType: EnemyType.Bat, tier: 2, count: 10, spawnDelay: 700, startDelay: 0 },
      { enemyType: EnemyType.GiantBat, tier: 2, count: 5, spawnDelay: 1100, startDelay: 3000 },
      { enemyType: EnemyType.Vampire, tier: 1, count: 3, spawnDelay: 1500, startDelay: 5000 },
      { enemyType: EnemyType.VampireLord, tier: 1, count: 1, spawnDelay: 0, startDelay: 7000 },
    ],
    isBossWave: true,
    bonusReward: 200,
    difficulty: 35,
  },

  // ============================================================================
  // LATE GAME (31-45) - All tiers, massive waves
  // ============================================================================

  // Wave 31: Mixed ground assault
  {
    id: "wave-31",
    waveNumber: 31,
    groups: [
      { enemyType: EnemyType.Skeleton, tier: 3, count: 8, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.Zombie, tier: 3, count: 6, spawnDelay: 900, startDelay: 2000 },
      { enemyType: EnemyType.Goblin, tier: 3, count: 10, spawnDelay: 700, startDelay: 4000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 31,
  },

  // Wave 32: Cerberus and hounds
  {
    id: "wave-32",
    waveNumber: 32,
    groups: [
      { enemyType: EnemyType.Wolf, tier: 3, count: 10, spawnDelay: 700, startDelay: 0 },
      { enemyType: EnemyType.DireWolf, tier: 2, count: 5, spawnDelay: 1000, startDelay: 3000 },
      { enemyType: EnemyType.Cerberus, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 180,
    difficulty: 36,
  },

  // Wave 33: Flying armada
  {
    id: "wave-33",
    waveNumber: 33,
    groups: [
      { enemyType: EnemyType.Wasp, tier: 3, count: 12, spawnDelay: 600, startDelay: 0 },
      { enemyType: EnemyType.GiantWasp, tier: 2, count: 6, spawnDelay: 900, startDelay: 3000 },
      { enemyType: EnemyType.Wyvern, tier: 1, count: 4, spawnDelay: 1300, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 33,
  },

  // Wave 34: Lizardmen
  {
    id: "wave-34",
    waveNumber: 34,
    groups: [
      { enemyType: EnemyType.Lizardman, tier: 2, count: 8, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.LizardmanShaman, tier: 2, count: 4, spawnDelay: 1200, startDelay: 3000 },
      { enemyType: EnemyType.Crab, tier: 2, count: 5, spawnDelay: 1100, startDelay: 5000 },
      { enemyType: EnemyType.GiantCrab, tier: 1, count: 2, spawnDelay: 1500, startDelay: 7000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 34,
  },

  // Wave 35: Lich King rises
  {
    id: "wave-35",
    waveNumber: 35,
    groups: [
      { enemyType: EnemyType.Skeleton, tier: 3, count: 10, spawnDelay: 700, startDelay: 0 },
      { enemyType: EnemyType.SkeletonWarrior, tier: 3, count: 5, spawnDelay: 1000, startDelay: 3000 },
      { enemyType: EnemyType.Wraith, tier: 2, count: 4, spawnDelay: 1200, startDelay: 5000 },
      { enemyType: EnemyType.LichKing, tier: 1, count: 1, spawnDelay: 0, startDelay: 7000 },
    ],
    isBossWave: true,
    bonusReward: 250,
    difficulty: 40,
  },

  // Wave 36: Death Knight
  {
    id: "wave-36",
    waveNumber: 36,
    groups: [
      { enemyType: EnemyType.Mummy, tier: 2, count: 6, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.Ghoul, tier: 2, count: 5, spawnDelay: 1100, startDelay: 3000 },
      { enemyType: EnemyType.DeathKnight, tier: 1, count: 1, spawnDelay: 0, startDelay: 5000 },
      { enemyType: EnemyType.SkeletonWarrior, tier: 3, count: 6, spawnDelay: 900, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 220,
    difficulty: 38,
  },

  // Wave 37: Beast horde
  {
    id: "wave-37",
    waveNumber: 37,
    groups: [
      { enemyType: EnemyType.Bear, tier: 2, count: 4, spawnDelay: 1400, startDelay: 0 },
      { enemyType: EnemyType.DireBear, tier: 1, count: 3, spawnDelay: 1600, startDelay: 3000 },
      { enemyType: EnemyType.Boar, tier: 3, count: 8, spawnDelay: 900, startDelay: 5000 },
      { enemyType: EnemyType.WildBoar, tier: 2, count: 4, spawnDelay: 1100, startDelay: 7000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 37,
  },

  // Wave 38: Hydra
  {
    id: "wave-38",
    waveNumber: 38,
    groups: [
      { enemyType: EnemyType.Lizardman, tier: 3, count: 8, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.LizardmanShaman, tier: 2, count: 4, spawnDelay: 1100, startDelay: 3000 },
      { enemyType: EnemyType.Hydra, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 260,
    difficulty: 42,
  },

  // Wave 39: Mushroom madness
  {
    id: "wave-39",
    waveNumber: 39,
    groups: [
      { enemyType: EnemyType.Mushroom, tier: 3, count: 12, spawnDelay: 700, startDelay: 0 },
      { enemyType: EnemyType.MushroomGiant, tier: 2, count: 5, spawnDelay: 1200, startDelay: 4000 },
      { enemyType: EnemyType.Slime, tier: 3, count: 8, spawnDelay: 800, startDelay: 6000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 39,
  },

  // Wave 40: Green dragon
  {
    id: "wave-40",
    waveNumber: 40,
    groups: [
      { enemyType: EnemyType.DragonWhelp, tier: 2, count: 5, spawnDelay: 1200, startDelay: 0 },
      { enemyType: EnemyType.Wyvern, tier: 2, count: 4, spawnDelay: 1400, startDelay: 3000 },
      { enemyType: EnemyType.DragonGreen, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 300,
    difficulty: 45,
  },

  // Wave 41: Demon invasion
  {
    id: "wave-41",
    waveNumber: 41,
    groups: [
      { enemyType: EnemyType.Imp, tier: 3, count: 12, spawnDelay: 600, startDelay: 0 },
      { enemyType: EnemyType.ImpFire, tier: 3, count: 6, spawnDelay: 900, startDelay: 3000 },
      { enemyType: EnemyType.FlyingImp, tier: 2, count: 8, spawnDelay: 800, startDelay: 5000 },
      { enemyType: EnemyType.DemonFlyer, tier: 2, count: 4, spawnDelay: 1100, startDelay: 7000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 41,
  },

  // Wave 42: Black dragon
  {
    id: "wave-42",
    waveNumber: 42,
    groups: [
      { enemyType: EnemyType.Ghost, tier: 3, count: 8, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.Specter, tier: 2, count: 5, spawnDelay: 1100, startDelay: 3000 },
      { enemyType: EnemyType.Wraith, tier: 2, count: 4, spawnDelay: 1300, startDelay: 5000 },
      { enemyType: EnemyType.DragonBlack, tier: 1, count: 1, spawnDelay: 0, startDelay: 7000 },
    ],
    isBossWave: true,
    bonusReward: 300,
    difficulty: 46,
  },

  // Wave 43: Cyclops and giants
  {
    id: "wave-43",
    waveNumber: 43,
    groups: [
      { enemyType: EnemyType.Ogre, tier: 2, count: 4, spawnDelay: 1400, startDelay: 0 },
      { enemyType: EnemyType.Cyclops, tier: 1, count: 3, spawnDelay: 1600, startDelay: 3000 },
      { enemyType: EnemyType.Troll, tier: 3, count: 4, spawnDelay: 1200, startDelay: 5000 },
      { enemyType: EnemyType.TrollBridge, tier: 2, count: 2, spawnDelay: 1800, startDelay: 7000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 43,
  },

  // Wave 44: Phoenix rising
  {
    id: "wave-44",
    waveNumber: 44,
    groups: [
      { enemyType: EnemyType.FireDrake, tier: 2, count: 4, spawnDelay: 1300, startDelay: 0 },
      { enemyType: EnemyType.Phoenix, tier: 1, count: 3, spawnDelay: 1600, startDelay: 3000 },
      { enemyType: EnemyType.ImpFire, tier: 3, count: 8, spawnDelay: 800, startDelay: 5000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 44,
  },

  // Wave 45: Blue dragon
  {
    id: "wave-45",
    waveNumber: 45,
    groups: [
      { enemyType: EnemyType.FrostDrake, tier: 2, count: 4, spawnDelay: 1300, startDelay: 0 },
      { enemyType: EnemyType.Gargoyle, tier: 2, count: 5, spawnDelay: 1200, startDelay: 3000 },
      { enemyType: EnemyType.DragonBlue, tier: 1, count: 1, spawnDelay: 0, startDelay: 6000 },
    ],
    isBossWave: true,
    bonusReward: 350,
    difficulty: 48,
  },

  // ============================================================================
  // ENDGAME (46-50) - Boss gauntlet
  // ============================================================================

  // Wave 46: Army of darkness
  {
    id: "wave-46",
    waveNumber: 46,
    groups: [
      { enemyType: EnemyType.Skeleton, tier: 4, count: 12, spawnDelay: 600, startDelay: 0 },
      { enemyType: EnemyType.SkeletonWarrior, tier: 3, count: 6, spawnDelay: 900, startDelay: 3000 },
      { enemyType: EnemyType.Zombie, tier: 4, count: 8, spawnDelay: 700, startDelay: 5000 },
      { enemyType: EnemyType.ZombieCrawler, tier: 3, count: 6, spawnDelay: 800, startDelay: 7000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 46,
  },

  // Wave 47: Flying swarm
  {
    id: "wave-47",
    waveNumber: 47,
    groups: [
      { enemyType: EnemyType.Bat, tier: 4, count: 15, spawnDelay: 500, startDelay: 0 },
      { enemyType: EnemyType.GiantBat, tier: 3, count: 8, spawnDelay: 800, startDelay: 3000 },
      { enemyType: EnemyType.Harpy, tier: 3, count: 6, spawnDelay: 1000, startDelay: 5000 },
      { enemyType: EnemyType.HarpyQueen, tier: 2, count: 3, spawnDelay: 1400, startDelay: 7000 },
    ],
    isBossWave: false,
    bonusReward: 0,
    difficulty: 47,
  },

  // Wave 48: Titan awakens
  {
    id: "wave-48",
    waveNumber: 48,
    groups: [
      { enemyType: EnemyType.Golem, tier: 4, count: 4, spawnDelay: 1200, startDelay: 0 },
      { enemyType: EnemyType.StoneGolem, tier: 3, count: 3, spawnDelay: 1500, startDelay: 3000 },
      { enemyType: EnemyType.AncientGolem, tier: 2, count: 2, spawnDelay: 2000, startDelay: 5000 },
      { enemyType: EnemyType.Titan, tier: 1, count: 1, spawnDelay: 0, startDelay: 8000 },
    ],
    isBossWave: true,
    bonusReward: 400,
    difficulty: 52,
  },

  // Wave 49: Demon lord
  {
    id: "wave-49",
    waveNumber: 49,
    groups: [
      { enemyType: EnemyType.Imp, tier: 4, count: 10, spawnDelay: 600, startDelay: 0 },
      { enemyType: EnemyType.ImpFire, tier: 4, count: 6, spawnDelay: 800, startDelay: 2000 },
      { enemyType: EnemyType.FlyingImp, tier: 3, count: 8, spawnDelay: 700, startDelay: 4000 },
      { enemyType: EnemyType.DemonFlyer, tier: 3, count: 4, spawnDelay: 1000, startDelay: 6000 },
      { enemyType: EnemyType.DemonLord, tier: 1, count: 1, spawnDelay: 0, startDelay: 8000 },
    ],
    isBossWave: true,
    bonusReward: 450,
    difficulty: 55,
  },

  // Wave 50: Final boss - Red Dragon
  {
    id: "wave-50",
    waveNumber: 50,
    groups: [
      { enemyType: EnemyType.DragonWhelp, tier: 4, count: 6, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.FireDrake, tier: 3, count: 4, spawnDelay: 1300, startDelay: 3000 },
      { enemyType: EnemyType.FrostDrake, tier: 3, count: 4, spawnDelay: 1300, startDelay: 5000 },
      { enemyType: EnemyType.Wyvern, tier: 3, count: 4, spawnDelay: 1200, startDelay: 7000 },
      { enemyType: EnemyType.DragonRed, tier: 1, count: 1, spawnDelay: 0, startDelay: 10000 },
    ],
    isBossWave: true,
    bonusReward: 1000,
    difficulty: 60,
  },
];

/**
 * Get a wave by number
 */
export function getGlobalWave(waveNumber: number): WaveConfig | undefined {
  return GLOBAL_WAVES.find((w) => w.waveNumber === waveNumber);
}

/**
 * Get all boss waves
 */
export function getBossWaves(): WaveConfig[] {
  return GLOBAL_WAVES.filter((w) => w.isBossWave);
}

/**
 * Get total number of waves
 */
export function getTotalWaves(): number {
  return GLOBAL_WAVES.length;
}
