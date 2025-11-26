/**
 * Boss Encounter Templates
 * Pre-configured boss encounters for quick wave building
 * Note: This is a starter set with 1-2 patterns per boss
 * Can be expanded with more encounter patterns later
 */

import type { BossTemplate } from "@/types/wavePreset";
import { EnemyType } from "@/types/enemy";
import { createWaveConfig } from "../waveUtils";

// ============================================================================
// Boss Templates
// ============================================================================

export const BOSS_TEMPLATES: BossTemplate[] = [
  // Skeleton King
  {
    id: "skeleton-king-solo",
    bossType: EnemyType.SkeletonKing,
    name: "Skeleton King - Solo Assault",
    description: "The Skeleton King with minimal skeleton guards.",
    recommendedWave: 10,
    difficulty: 15,
    pattern: "solo",
    waveConfig: createWaveConfig(10, [
      { enemyType: EnemyType.Skeleton, tier: 1, count: 6, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.SkeletonWarrior, tier: 1, count: 3, spawnDelay: 1200, startDelay: 3000 },
      { enemyType: EnemyType.SkeletonKing, tier: 1, count: 1, spawnDelay: 0, startDelay: 8000 },
    ], { isBossWave: true, bonusReward: 150 }),
  },

  {
    id: "skeleton-king-army",
    bossType: EnemyType.SkeletonKing,
    name: "Skeleton King - Undead Army",
    description: "The Skeleton King leads a large undead army.",
    recommendedWave: 15,
    difficulty: 25,
    pattern: "army",
    waveConfig: createWaveConfig(15, [
      { enemyType: EnemyType.Skeleton, tier: 2, count: 15, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.SkeletonWarrior, tier: 2, count: 8, spawnDelay: 1000, startDelay: 5000 },
      { enemyType: EnemyType.SkeletonKing, tier: 2, count: 1, spawnDelay: 0, startDelay: 12000 },
    ], { isBossWave: true, bonusReward: 200 }),
  },

  // Zombie Lord
  {
    id: "zombie-lord-horde",
    bossType: EnemyType.ZombieLord,
    name: "Zombie Lord - Horde",
    description: "The Zombie Lord with a massive zombie horde.",
    recommendedWave: 12,
    difficulty: 18,
    pattern: "army",
    waveConfig: createWaveConfig(12, [
      { enemyType: EnemyType.Zombie, tier: 1, count: 20, spawnDelay: 700, startDelay: 0 },
      { enemyType: EnemyType.ZombieCrawler, tier: 1, count: 10, spawnDelay: 800, startDelay: 4000 },
      { enemyType: EnemyType.ZombieLord, tier: 1, count: 1, spawnDelay: 0, startDelay: 10000 },
    ], { isBossWave: true, bonusReward: 175 }),
  },

  // Goblin Chief
  {
    id: "goblin-chief-raiders",
    bossType: EnemyType.GoblinChief,
    name: "Goblin Chief - Raiding Party",
    description: "The Goblin Chief with goblin raiders.",
    recommendedWave: 8,
    difficulty: 12,
    pattern: "elite",
    waveConfig: createWaveConfig(8, [
      { enemyType: EnemyType.Goblin, tier: 1, count: 12, spawnDelay: 600, startDelay: 0 },
      { enemyType: EnemyType.GoblinArcher, tier: 1, count: 6, spawnDelay: 800, startDelay: 3000 },
      { enemyType: EnemyType.GoblinChief, tier: 1, count: 1, spawnDelay: 0, startDelay: 7000 },
    ], { isBossWave: true, bonusReward: 125 }),
  },

  // Orc Warlord
  {
    id: "orc-warlord-warband",
    bossType: EnemyType.OrcWarlord,
    name: "Orc Warlord - Warband",
    description: "The Orc Warlord with elite orc warriors.",
    recommendedWave: 18,
    difficulty: 30,
    pattern: "elite",
    waveConfig: createWaveConfig(18, [
      { enemyType: EnemyType.Orc, tier: 2, count: 10, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.OrcBrute, tier: 2, count: 5, spawnDelay: 1200, startDelay: 4000 },
      { enemyType: EnemyType.OrcWarlord, tier: 2, count: 1, spawnDelay: 0, startDelay: 10000 },
    ], { isBossWave: true, bonusReward: 250 }),
  },

  // Spider Queen
  {
    id: "spider-queen-nest",
    bossType: EnemyType.SpiderQueen,
    name: "Spider Queen - Nest",
    description: "The Spider Queen emerges from her nest with her children.",
    recommendedWave: 16,
    difficulty: 28,
    pattern: "army",
    waveConfig: createWaveConfig(16, [
      { enemyType: EnemyType.Spider, tier: 2, count: 25, spawnDelay: 500, startDelay: 0 },
      { enemyType: EnemyType.GiantSpider, tier: 2, count: 8, spawnDelay: 900, startDelay: 5000 },
      { enemyType: EnemyType.SpiderQueen, tier: 2, count: 1, spawnDelay: 0, startDelay: 12000 },
    ], { isBossWave: true, bonusReward: 225 }),
  },

  // Ancient Golem
  {
    id: "ancient-golem-solo",
    bossType: EnemyType.AncientGolem,
    name: "Ancient Golem - Awakening",
    description: "The Ancient Golem awakens with stone golem guards.",
    recommendedWave: 25,
    difficulty: 40,
    pattern: "solo",
    waveConfig: createWaveConfig(25, [
      { enemyType: EnemyType.Golem, tier: 3, count: 4, spawnDelay: 1500, startDelay: 0 },
      { enemyType: EnemyType.StoneGolem, tier: 3, count: 2, spawnDelay: 1800, startDelay: 5000 },
      { enemyType: EnemyType.AncientGolem, tier: 3, count: 1, spawnDelay: 0, startDelay: 12000 },
    ], { isBossWave: true, bonusReward: 350 }),
  },

  // Lich King
  {
    id: "lich-king-necromancy",
    bossType: EnemyType.LichKing,
    name: "Lich King - Necromancy",
    description: "The Lich King summons undead legions.",
    recommendedWave: 32,
    difficulty: 50,
    pattern: "army",
    waveConfig: createWaveConfig(32, [
      { enemyType: EnemyType.Ghost, tier: 3, count: 12, spawnDelay: 800, startDelay: 0 },
      { enemyType: EnemyType.Wraith, tier: 3, count: 8, spawnDelay: 1000, startDelay: 4000 },
      { enemyType: EnemyType.Skeleton, tier: 3, count: 15, spawnDelay: 700, startDelay: 2000 },
      { enemyType: EnemyType.LichKing, tier: 3, count: 1, spawnDelay: 0, startDelay: 15000 },
    ], { isBossWave: true, bonusReward: 450 }),
  },

  // Vampire Lord
  {
    id: "vampire-lord-night",
    bossType: EnemyType.VampireLord,
    name: "Vampire Lord - Night Hunt",
    description: "The Vampire Lord hunts with bat swarms.",
    recommendedWave: 28,
    difficulty: 45,
    pattern: "elite",
    waveConfig: createWaveConfig(28, [
      { enemyType: EnemyType.Bat, tier: 3, count: 20, spawnDelay: 500, startDelay: 0 },
      { enemyType: EnemyType.GiantBat, tier: 3, count: 10, spawnDelay: 700, startDelay: 4000 },
      { enemyType: EnemyType.Vampire, tier: 3, count: 3, spawnDelay: 1200, startDelay: 8000 },
      { enemyType: EnemyType.VampireLord, tier: 3, count: 1, spawnDelay: 0, startDelay: 14000 },
    ], { isBossWave: true, bonusReward: 400 }),
  },

  // Werewolf Alpha
  {
    id: "werewolf-alpha-pack",
    bossType: EnemyType.WerewolfAlpha,
    name: "Werewolf Alpha - Pack",
    description: "The Werewolf Alpha leads its pack.",
    recommendedWave: 22,
    difficulty: 35,
    pattern: "army",
    waveConfig: createWaveConfig(22, [
      { enemyType: EnemyType.Wolf, tier: 2, count: 18, spawnDelay: 600, startDelay: 0 },
      { enemyType: EnemyType.DireWolf, tier: 2, count: 10, spawnDelay: 800, startDelay: 4000 },
      { enemyType: EnemyType.Werewolf, tier: 2, count: 3, spawnDelay: 1000, startDelay: 8000 },
      { enemyType: EnemyType.WerewolfAlpha, tier: 3, count: 1, spawnDelay: 0, startDelay: 13000 },
    ], { isBossWave: true, bonusReward: 325 }),
  },

  // Dragon Red
  {
    id: "dragon-red-inferno",
    bossType: EnemyType.DragonRed,
    name: "Red Dragon - Inferno",
    description: "The mighty Red Dragon with fire drake escorts.",
    recommendedWave: 45,
    difficulty: 75,
    pattern: "elite",
    waveConfig: createWaveConfig(45, [
      { enemyType: EnemyType.DragonWhelp, tier: 4, count: 8, spawnDelay: 1000, startDelay: 0 },
      { enemyType: EnemyType.FireDrake, tier: 4, count: 4, spawnDelay: 1500, startDelay: 6000 },
      { enemyType: EnemyType.DragonRed, tier: 4, count: 1, spawnDelay: 0, startDelay: 15000 },
    ], { isBossWave: true, bonusReward: 650 }),
  },

  // Dragon Blue
  {
    id: "dragon-blue-storm",
    bossType: EnemyType.DragonBlue,
    name: "Blue Dragon - Storm",
    description: "The Blue Dragon commands the storm.",
    recommendedWave: 42,
    difficulty: 70,
    pattern: "elite",
    waveConfig: createWaveConfig(42, [
      { enemyType: EnemyType.Wyvern, tier: 4, count: 6, spawnDelay: 1200, startDelay: 0 },
      { enemyType: EnemyType.Harpy, tier: 4, count: 10, spawnDelay: 800, startDelay: 4000 },
      { enemyType: EnemyType.DragonBlue, tier: 4, count: 1, spawnDelay: 0, startDelay: 14000 },
    ], { isBossWave: true, bonusReward: 625 }),
  },

  // Dragon Green
  {
    id: "dragon-green-poison",
    bossType: EnemyType.DragonGreen,
    name: "Green Dragon - Poison Breath",
    description: "The Green Dragon spreads toxic fumes.",
    recommendedWave: 38,
    difficulty: 65,
    pattern: "solo",
    waveConfig: createWaveConfig(38, [
      { enemyType: EnemyType.WyvernPoison, tier: 4, count: 5, spawnDelay: 1400, startDelay: 0 },
      { enemyType: EnemyType.DragonGreen, tier: 4, count: 1, spawnDelay: 0, startDelay: 10000 },
    ], { isBossWave: true, bonusReward: 600 }),
  },

  // Hydra
  {
    id: "hydra-multi-head",
    bossType: EnemyType.Hydra,
    name: "Hydra - Many Heads",
    description: "The multi-headed Hydra.",
    recommendedWave: 36,
    difficulty: 60,
    pattern: "solo",
    waveConfig: createWaveConfig(36, [
      { enemyType: EnemyType.GiantSpider, tier: 3, count: 6, spawnDelay: 1100, startDelay: 0 },
      { enemyType: EnemyType.Hydra, tier: 4, count: 1, spawnDelay: 0, startDelay: 10000 },
    ], { isBossWave: true, bonusReward: 550 }),
  },

  // Cerberus
  {
    id: "cerberus-guardian",
    bossType: EnemyType.Cerberus,
    name: "Cerberus - Hell Guardian",
    description: "The three-headed hell hound.",
    recommendedWave: 30,
    difficulty: 48,
    pattern: "solo",
    waveConfig: createWaveConfig(30, [
      { enemyType: EnemyType.DireWolf, tier: 3, count: 8, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.Cerberus, tier: 3, count: 1, spawnDelay: 0, startDelay: 10000 },
    ], { isBossWave: true, bonusReward: 425 }),
  },

  // Titan
  {
    id: "titan-colossus",
    bossType: EnemyType.Titan,
    name: "Titan - Colossus",
    description: "The massive Titan awakens.",
    recommendedWave: 48,
    difficulty: 80,
    pattern: "solo",
    waveConfig: createWaveConfig(48, [
      { enemyType: EnemyType.AncientGolem, tier: 4, count: 2, spawnDelay: 2000, startDelay: 0 },
      { enemyType: EnemyType.Titan, tier: 5, count: 1, spawnDelay: 0, startDelay: 12000 },
    ], { isBossWave: true, bonusReward: 700 }),
  },

  // Demon Lord
  {
    id: "demon-lord-legion",
    bossType: EnemyType.DemonLord,
    name: "Demon Lord - Infernal Legion",
    description: "The Demon Lord leads hellish forces.",
    recommendedWave: 49,
    difficulty: 85,
    pattern: "army",
    waveConfig: createWaveConfig(49, [
      { enemyType: EnemyType.Imp, tier: 5, count: 15, spawnDelay: 600, startDelay: 0 },
      { enemyType: EnemyType.ImpFire, tier: 5, count: 10, spawnDelay: 800, startDelay: 3000 },
      { enemyType: EnemyType.DemonFlyer, tier: 5, count: 6, spawnDelay: 1000, startDelay: 7000 },
      { enemyType: EnemyType.DemonLord, tier: 5, count: 1, spawnDelay: 0, startDelay: 16000 },
    ], { isBossWave: true, bonusReward: 750 }),
  },

  // Death Knight
  {
    id: "death-knight-crusade",
    bossType: EnemyType.DeathKnight,
    name: "Death Knight - Dark Crusade",
    description: "The Death Knight commands the undead crusade.",
    recommendedWave: 35,
    difficulty: 58,
    pattern: "army",
    waveConfig: createWaveConfig(35, [
      { enemyType: EnemyType.SkeletonWarrior, tier: 3, count: 12, spawnDelay: 900, startDelay: 0 },
      { enemyType: EnemyType.Ghost, tier: 3, count: 8, spawnDelay: 800, startDelay: 4000 },
      { enemyType: EnemyType.DeathKnight, tier: 4, count: 1, spawnDelay: 0, startDelay: 12000 },
    ], { isBossWave: true, bonusReward: 525 }),
  },

  // Necromancer
  {
    id: "necromancer-ritual",
    bossType: EnemyType.Necromancer,
    name: "Necromancer - Dark Ritual",
    description: "The Necromancer summons the dead.",
    recommendedWave: 26,
    difficulty: 42,
    pattern: "army",
    waveConfig: createWaveConfig(26, [
      { enemyType: EnemyType.Skeleton, tier: 3, count: 18, spawnDelay: 700, startDelay: 0 },
      { enemyType: EnemyType.Zombie, tier: 3, count: 15, spawnDelay: 800, startDelay: 3000 },
      { enemyType: EnemyType.Necromancer, tier: 3, count: 1, spawnDelay: 0, startDelay: 14000 },
    ], { isBossWave: true, bonusReward: 375 }),
  },

  // Slime Emperor
  {
    id: "slime-emperor-blob",
    bossType: EnemyType.SlimeEmperor,
    name: "Slime Emperor - Mega Blob",
    description: "The massive Slime Emperor with its subjects.",
    recommendedWave: 20,
    difficulty: 32,
    pattern: "army",
    waveConfig: createWaveConfig(20, [
      { enemyType: EnemyType.Slime, tier: 2, count: 30, spawnDelay: 500, startDelay: 0 },
      { enemyType: EnemyType.SlimeKing, tier: 2, count: 5, spawnDelay: 1000, startDelay: 6000 },
      { enemyType: EnemyType.SlimeEmperor, tier: 2, count: 1, spawnDelay: 0, startDelay: 14000 },
    ], { isBossWave: true, bonusReward: 300 }),
  },
];

/**
 * Get a boss template by ID
 */
export function getBossTemplate(id: string): BossTemplate | undefined {
  return BOSS_TEMPLATES.find((t) => t.id === id);
}
