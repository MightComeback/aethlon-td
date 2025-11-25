import {
  EnemyType,
  EnemyCategory,
  SpecialAbilityType,
  type EnemyDefinition,
} from "@/types/enemy";

/**
 * Complete enemy database with 100 unique enemy definitions
 * Organized by category: Ground (50), Flying (30), Boss (20)
 */

// ============================================================================
// GROUND ENEMIES (50 total)
// ============================================================================

const GROUND_ENEMIES: EnemyDefinition[] = [
  // 1. Snail - Slowest enemy, tutorial fodder
  {
    type: EnemyType.Snail,
    name: "Snail",
    description: "A slow-moving snail. Easy target for beginners.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 30,
      speed: 0.4,
      armor: 2,
      magicResistance: 0,
      bounty: 5,
      score: 10,
    },
    meshConfig: {
      baseShape: "blob",
      scale: 0.6,
      parts: [
        { type: "sphere", position: [0, 0.1, 0], size: [0.2, 0.12, 0.15], color: "#666666" }, // Body
        { type: "sphere", position: [0, 0.22, 0], size: [0.18, 0.2, 0.18], color: "#777777" }, // Shell
        { type: "cylinder", position: [0.12, 0.15, 0.03], rotation: [0.3, 0, 0.5], size: [0.02, 0.08], color: "#555555" }, // Eye stalk L
        { type: "cylinder", position: [0.12, 0.15, -0.03], rotation: [0.3, 0, 0.5], size: [0.02, 0.08], color: "#555555" }, // Eye stalk R
      ],
    },
    isBoss: false,
    unlockWave: 1,
  },

  // 2. Slug - Slightly faster than snail
  {
    type: EnemyType.Slug,
    name: "Slug",
    description: "A slimy slug. Faster than a snail but still slow.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 25,
      speed: 0.5,
      armor: 0,
      magicResistance: 1,
      bounty: 5,
      score: 10,
    },
    meshConfig: {
      baseShape: "blob",
      scale: 0.5,
      parts: [
        { type: "sphere", position: [0, 0.08, 0], size: [0.25, 0.1, 0.12], color: "#555555" }, // Body
        { type: "sphere", position: [0.1, 0.1, 0], size: [0.08], color: "#666666" }, // Head
        { type: "cylinder", position: [0.15, 0.14, 0.02], rotation: [0.2, 0, 0.4], size: [0.015, 0.05], color: "#444444" }, // Antenna L
        { type: "cylinder", position: [0.15, 0.14, -0.02], rotation: [0.2, 0, 0.4], size: [0.015, 0.05], color: "#444444" }, // Antenna R
      ],
    },
    isBoss: false,
    unlockWave: 1,
  },

  // 3. Zombie - Classic undead, medium stats
  {
    type: EnemyType.Zombie,
    name: "Zombie",
    description: "A shambling undead. Relentless but slow.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 80,
      speed: 0.6,
      armor: 2,
      magicResistance: 3,
      bounty: 10,
      score: 20,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.8,
      parts: [
        { type: "sphere", position: [0, 0.7, 0], size: [0.12], color: "#555555" }, // Head
        { type: "box", position: [0, 0.45, 0], size: [0.18, 0.22, 0.1], color: "#444444" }, // Torso
        { type: "cylinder", position: [-0.12, 0.38, 0], rotation: [0, 0, 0.4], size: [0.035, 0.18], color: "#4a4a4a" }, // Left arm
        { type: "cylinder", position: [0.12, 0.38, 0], rotation: [0, 0, -0.3], size: [0.035, 0.18], color: "#4a4a4a" }, // Right arm
        { type: "cylinder", position: [-0.05, 0.15, 0], size: [0.04, 0.25], color: "#444444" }, // Left leg
        { type: "cylinder", position: [0.05, 0.15, 0], size: [0.04, 0.25], color: "#444444" }, // Right leg
      ],
    },
    isBoss: false,
    unlockWave: 2,
  },

  // 4. Zombie Crawler - Fast zombie variant
  {
    type: EnemyType.ZombieCrawler,
    name: "Crawler",
    description: "A zombie that crawls on all fours. Faster but weaker.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 50,
      speed: 1.0,
      armor: 1,
      magicResistance: 2,
      bounty: 8,
      score: 15,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 0.7,
      parts: [
        { type: "sphere", position: [0.15, 0.12, 0], size: [0.1], color: "#555555" }, // Head
        { type: "box", position: [0, 0.1, 0], size: [0.2, 0.08, 0.12], color: "#444444" }, // Torso
        { type: "cylinder", position: [-0.08, 0.06, 0.08], rotation: [0.3, 0, 0], size: [0.03, 0.12], color: "#4a4a4a" }, // Front left
        { type: "cylinder", position: [-0.08, 0.06, -0.08], rotation: [-0.3, 0, 0], size: [0.03, 0.12], color: "#4a4a4a" }, // Front right
        { type: "cylinder", position: [0.08, 0.06, 0.08], rotation: [0.3, 0, 0], size: [0.03, 0.12], color: "#4a4a4a" }, // Back left
        { type: "cylinder", position: [0.08, 0.06, -0.08], rotation: [-0.3, 0, 0], size: [0.03, 0.12], color: "#4a4a4a" }, // Back right
      ],
    },
    isBoss: false,
    unlockWave: 3,
  },

  // 5. Skeleton - Bone warrior
  {
    type: EnemyType.Skeleton,
    name: "Skeleton",
    description: "An animated skeleton. Fast but fragile.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 45,
      speed: 1.1,
      armor: 0,
      magicResistance: 5,
      bounty: 12,
      score: 20,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.85,
      parts: [
        { type: "sphere", position: [0, 0.72, 0], size: [0.1], color: "#cccccc" }, // Skull
        { type: "box", position: [0, 0.5, 0], size: [0.12, 0.18, 0.06], color: "#bbbbbb" }, // Ribcage
        { type: "cylinder", position: [0, 0.35, 0], size: [0.03, 0.08], color: "#aaaaaa" }, // Spine
        { type: "cylinder", position: [-0.1, 0.45, 0], rotation: [0, 0, 0.2], size: [0.02, 0.2], color: "#bbbbbb" }, // Left arm
        { type: "cylinder", position: [0.1, 0.45, 0], rotation: [0, 0, -0.2], size: [0.02, 0.2], color: "#bbbbbb" }, // Right arm
        { type: "cylinder", position: [-0.04, 0.15, 0], size: [0.025, 0.28], color: "#aaaaaa" }, // Left leg
        { type: "cylinder", position: [0.04, 0.15, 0], size: [0.025, 0.28], color: "#aaaaaa" }, // Right leg
      ],
    },
    isBoss: false,
    unlockWave: 3,
  },

  // 6. Skeleton Warrior - Armored skeleton
  {
    type: EnemyType.SkeletonWarrior,
    name: "Skeleton Warrior",
    description: "An armored skeleton wielding a shield.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 70,
      speed: 0.9,
      armor: 6,
      magicResistance: 4,
      bounty: 18,
      score: 30,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.9,
      parts: [
        { type: "sphere", position: [0, 0.75, 0], size: [0.11], color: "#cccccc" }, // Skull
        { type: "box", position: [0, 0.52, 0], size: [0.14, 0.2, 0.08], color: "#999999" }, // Armor torso
        { type: "cylinder", position: [-0.12, 0.48, 0], rotation: [0, 0, 0.15], size: [0.025, 0.2], color: "#bbbbbb" }, // Left arm
        { type: "box", position: [-0.18, 0.35, 0], size: [0.12, 0.15, 0.02], color: "#888888" }, // Shield
        { type: "cylinder", position: [0.12, 0.48, 0], rotation: [0, 0, -0.15], size: [0.025, 0.2], color: "#bbbbbb" }, // Right arm
        { type: "cylinder", position: [-0.045, 0.16, 0], size: [0.03, 0.28], color: "#aaaaaa" }, // Left leg
        { type: "cylinder", position: [0.045, 0.16, 0], size: [0.03, 0.28], color: "#aaaaaa" }, // Right leg
      ],
    },
    isBoss: false,
    unlockWave: 5,
  },

  // 7. Goblin - Small and quick
  {
    type: EnemyType.Goblin,
    name: "Goblin",
    description: "A small, sneaky creature. Quick but weak.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 35,
      speed: 1.4,
      armor: 1,
      magicResistance: 1,
      bounty: 8,
      score: 15,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.6,
      parts: [
        { type: "sphere", position: [0, 0.45, 0], size: [0.12], color: "#5a5a5a" }, // Head
        { type: "cone", position: [0.08, 0.48, 0.04], rotation: [0.5, 0.3, 0.8], size: [0.04, 0.1], color: "#666666" }, // Ear L
        { type: "cone", position: [0.08, 0.48, -0.04], rotation: [-0.5, -0.3, 0.8], size: [0.04, 0.1], color: "#666666" }, // Ear R
        { type: "box", position: [0, 0.28, 0], size: [0.1, 0.14, 0.07], color: "#555555" }, // Torso
        { type: "cylinder", position: [-0.08, 0.25, 0], rotation: [0, 0, 0.3], size: [0.025, 0.12], color: "#5a5a5a" }, // Left arm
        { type: "cylinder", position: [0.08, 0.25, 0], rotation: [0, 0, -0.3], size: [0.025, 0.12], color: "#5a5a5a" }, // Right arm
        { type: "cylinder", position: [-0.035, 0.1, 0], size: [0.03, 0.16], color: "#555555" }, // Left leg
        { type: "cylinder", position: [0.035, 0.1, 0], size: [0.03, 0.16], color: "#555555" }, // Right leg
      ],
    },
    isBoss: false,
    unlockWave: 4,
  },

  // 8. Goblin Archer - Ranged goblin variant
  {
    type: EnemyType.GoblinArcher,
    name: "Goblin Archer",
    description: "A goblin with a crude bow. Keeps its distance.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 28,
      speed: 1.2,
      armor: 0,
      magicResistance: 1,
      bounty: 10,
      score: 18,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.6,
      parts: [
        { type: "sphere", position: [0, 0.45, 0], size: [0.11], color: "#5a5a5a" }, // Head
        { type: "cone", position: [0.07, 0.48, 0.04], rotation: [0.5, 0.3, 0.8], size: [0.035, 0.09], color: "#666666" }, // Ear L
        { type: "cone", position: [0.07, 0.48, -0.04], rotation: [-0.5, -0.3, 0.8], size: [0.035, 0.09], color: "#666666" }, // Ear R
        { type: "box", position: [0, 0.28, 0], size: [0.09, 0.13, 0.06], color: "#555555" }, // Torso
        { type: "cylinder", position: [-0.12, 0.3, 0], rotation: [0, 0, 1.2], size: [0.01, 0.18], color: "#777777" }, // Bow
        { type: "cylinder", position: [-0.035, 0.1, 0], size: [0.028, 0.15], color: "#555555" }, // Left leg
        { type: "cylinder", position: [0.035, 0.1, 0], size: [0.028, 0.15], color: "#555555" }, // Right leg
      ],
    },
    isBoss: false,
    unlockWave: 6,
  },

  // 9. Orc - Brutish warrior
  {
    type: EnemyType.Orc,
    name: "Orc",
    description: "A brutish green-skin warrior. Strong and tough.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 120,
      speed: 0.8,
      armor: 5,
      magicResistance: 2,
      bounty: 15,
      score: 25,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0, 0.78, 0], size: [0.14], color: "#555555" }, // Head
        { type: "box", position: [0, 0.5, 0], size: [0.22, 0.26, 0.14], color: "#4a4a4a" }, // Torso
        { type: "cylinder", position: [-0.16, 0.45, 0], rotation: [0, 0, 0.25], size: [0.05, 0.22], color: "#505050" }, // Left arm
        { type: "cylinder", position: [0.16, 0.45, 0], rotation: [0, 0, -0.25], size: [0.05, 0.22], color: "#505050" }, // Right arm
        { type: "cylinder", position: [-0.07, 0.17, 0], size: [0.055, 0.3], color: "#4a4a4a" }, // Left leg
        { type: "cylinder", position: [0.07, 0.17, 0], size: [0.055, 0.3], color: "#4a4a4a" }, // Right leg
      ],
    },
    isBoss: false,
    unlockWave: 6,
  },

  // 10. Orc Brute - Heavy orc variant
  {
    type: EnemyType.OrcBrute,
    name: "Orc Brute",
    description: "A massive orc wielding a heavy club. Slow but devastating.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 200,
      speed: 0.5,
      armor: 8,
      magicResistance: 3,
      bounty: 25,
      score: 40,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.2,
      parts: [
        { type: "sphere", position: [0, 0.85, 0], size: [0.16], color: "#505050" }, // Head
        { type: "box", position: [0, 0.52, 0], size: [0.28, 0.32, 0.18], color: "#454545" }, // Torso
        { type: "cylinder", position: [-0.2, 0.48, 0], rotation: [0, 0, 0.3], size: [0.06, 0.26], color: "#4a4a4a" }, // Left arm
        { type: "cylinder", position: [0.2, 0.48, 0], rotation: [0, 0, -0.4], size: [0.06, 0.26], color: "#4a4a4a" }, // Right arm
        { type: "cylinder", position: [0.28, 0.25, 0], rotation: [0, 0, -0.5], size: [0.04, 0.35], color: "#666666" }, // Club
        { type: "cylinder", position: [-0.08, 0.18, 0], size: [0.065, 0.32], color: "#454545" }, // Left leg
        { type: "cylinder", position: [0.08, 0.18, 0], size: [0.065, 0.32], color: "#454545" }, // Right leg
      ],
    },
    isBoss: false,
    unlockWave: 8,
  },

  // 11. Wolf - Fast predator
  {
    type: EnemyType.Wolf,
    name: "Wolf",
    description: "A swift wolf. Hunts in packs.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 55,
      speed: 1.6,
      armor: 1,
      magicResistance: 1,
      bounty: 12,
      score: 20,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 0.8,
      parts: [
        { type: "sphere", position: [0.18, 0.22, 0], size: [0.1, 0.08, 0.07], color: "#666666" }, // Head
        { type: "cone", position: [0.26, 0.22, 0], rotation: [0, 0, -1.57], size: [0.04, 0.08], color: "#777777" }, // Snout
        { type: "cone", position: [0.15, 0.28, 0.04], rotation: [0.3, 0, 0.3], size: [0.03, 0.06], color: "#555555" }, // Ear L
        { type: "cone", position: [0.15, 0.28, -0.04], rotation: [-0.3, 0, 0.3], size: [0.03, 0.06], color: "#555555" }, // Ear R
        { type: "sphere", position: [0, 0.18, 0], size: [0.14, 0.1, 0.08], color: "#5a5a5a" }, // Body
        { type: "cone", position: [-0.18, 0.18, 0], rotation: [0, 0, 1.57], size: [0.03, 0.12], color: "#666666" }, // Tail
        { type: "cylinder", position: [0.08, 0.08, 0.06], size: [0.025, 0.14], color: "#5a5a5a" }, // Front L
        { type: "cylinder", position: [0.08, 0.08, -0.06], size: [0.025, 0.14], color: "#5a5a5a" }, // Front R
        { type: "cylinder", position: [-0.08, 0.08, 0.06], size: [0.025, 0.14], color: "#5a5a5a" }, // Back L
        { type: "cylinder", position: [-0.08, 0.08, -0.06], size: [0.025, 0.14], color: "#5a5a5a" }, // Back R
      ],
    },
    isBoss: false,
    unlockWave: 5,
  },

  // 12. Dire Wolf - Larger wolf variant
  {
    type: EnemyType.DireWolf,
    name: "Dire Wolf",
    description: "A massive dire wolf. Alpha of the pack.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 100,
      speed: 1.4,
      armor: 3,
      magicResistance: 2,
      bounty: 20,
      score: 35,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 1.1,
      parts: [
        { type: "sphere", position: [0.22, 0.28, 0], size: [0.13, 0.1, 0.09], color: "#555555" }, // Head
        { type: "cone", position: [0.32, 0.28, 0], rotation: [0, 0, -1.57], size: [0.05, 0.1], color: "#666666" }, // Snout
        { type: "cone", position: [0.18, 0.36, 0.05], rotation: [0.3, 0, 0.3], size: [0.04, 0.08], color: "#444444" }, // Ear L
        { type: "cone", position: [0.18, 0.36, -0.05], rotation: [-0.3, 0, 0.3], size: [0.04, 0.08], color: "#444444" }, // Ear R
        { type: "sphere", position: [0, 0.24, 0], size: [0.18, 0.13, 0.1], color: "#4a4a4a" }, // Body
        { type: "cone", position: [-0.22, 0.24, 0], rotation: [0, 0, 1.57], size: [0.04, 0.15], color: "#555555" }, // Tail
        { type: "cylinder", position: [0.1, 0.1, 0.08], size: [0.035, 0.18], color: "#4a4a4a" }, // Front L
        { type: "cylinder", position: [0.1, 0.1, -0.08], size: [0.035, 0.18], color: "#4a4a4a" }, // Front R
        { type: "cylinder", position: [-0.1, 0.1, 0.08], size: [0.035, 0.18], color: "#4a4a4a" }, // Back L
        { type: "cylinder", position: [-0.1, 0.1, -0.08], size: [0.035, 0.18], color: "#4a4a4a" }, // Back R
      ],
    },
    isBoss: false,
    unlockWave: 10,
  },

  // 13. Spider - Creepy crawler
  {
    type: EnemyType.Spider,
    name: "Spider",
    description: "A giant spider. Moves erratically.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 40,
      speed: 1.3,
      armor: 1,
      magicResistance: 0,
      bounty: 10,
      score: 18,
    },
    meshConfig: {
      baseShape: "insect",
      scale: 0.7,
      parts: [
        { type: "sphere", position: [0.08, 0.12, 0], size: [0.06], color: "#444444" }, // Head
        { type: "sphere", position: [-0.02, 0.1, 0], size: [0.1, 0.07, 0.08], color: "#3a3a3a" }, // Abdomen
        { type: "cylinder", position: [0.06, 0.08, 0.1], rotation: [1.2, 0, 0.4], size: [0.015, 0.12], color: "#4a4a4a" }, // Leg 1
        { type: "cylinder", position: [0.02, 0.08, 0.1], rotation: [1.0, 0, 0.2], size: [0.015, 0.12], color: "#4a4a4a" }, // Leg 2
        { type: "cylinder", position: [-0.02, 0.08, 0.1], rotation: [0.8, 0, -0.2], size: [0.015, 0.12], color: "#4a4a4a" }, // Leg 3
        { type: "cylinder", position: [-0.06, 0.08, 0.1], rotation: [0.6, 0, -0.4], size: [0.015, 0.12], color: "#4a4a4a" }, // Leg 4
        { type: "cylinder", position: [0.06, 0.08, -0.1], rotation: [-1.2, 0, 0.4], size: [0.015, 0.12], color: "#4a4a4a" }, // Leg 5
        { type: "cylinder", position: [0.02, 0.08, -0.1], rotation: [-1.0, 0, 0.2], size: [0.015, 0.12], color: "#4a4a4a" }, // Leg 6
        { type: "cylinder", position: [-0.02, 0.08, -0.1], rotation: [-0.8, 0, -0.2], size: [0.015, 0.12], color: "#4a4a4a" }, // Leg 7
        { type: "cylinder", position: [-0.06, 0.08, -0.1], rotation: [-0.6, 0, -0.4], size: [0.015, 0.12], color: "#4a4a4a" }, // Leg 8
      ],
    },
    isBoss: false,
    unlockWave: 4,
  },

  // 14. Giant Spider - Larger spider variant
  {
    type: EnemyType.GiantSpider,
    name: "Giant Spider",
    description: "A massive spider. Webs slow nearby towers.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 90,
      speed: 1.0,
      armor: 3,
      magicResistance: 2,
      bounty: 22,
      score: 35,
    },
    meshConfig: {
      baseShape: "insect",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0.12, 0.18, 0], size: [0.09], color: "#3a3a3a" }, // Head
        { type: "sphere", position: [-0.04, 0.15, 0], size: [0.15, 0.1, 0.12], color: "#333333" }, // Abdomen
        { type: "cylinder", position: [0.08, 0.12, 0.14], rotation: [1.2, 0, 0.4], size: [0.02, 0.18], color: "#404040" }, // Leg 1
        { type: "cylinder", position: [0.02, 0.12, 0.14], rotation: [1.0, 0, 0.2], size: [0.02, 0.18], color: "#404040" }, // Leg 2
        { type: "cylinder", position: [-0.04, 0.12, 0.14], rotation: [0.8, 0, -0.2], size: [0.02, 0.18], color: "#404040" }, // Leg 3
        { type: "cylinder", position: [-0.1, 0.12, 0.14], rotation: [0.6, 0, -0.4], size: [0.02, 0.18], color: "#404040" }, // Leg 4
        { type: "cylinder", position: [0.08, 0.12, -0.14], rotation: [-1.2, 0, 0.4], size: [0.02, 0.18], color: "#404040" }, // Leg 5
        { type: "cylinder", position: [0.02, 0.12, -0.14], rotation: [-1.0, 0, 0.2], size: [0.02, 0.18], color: "#404040" }, // Leg 6
        { type: "cylinder", position: [-0.04, 0.12, -0.14], rotation: [-0.8, 0, -0.2], size: [0.02, 0.18], color: "#404040" }, // Leg 7
        { type: "cylinder", position: [-0.1, 0.12, -0.14], rotation: [-0.6, 0, -0.4], size: [0.02, 0.18], color: "#404040" }, // Leg 8
      ],
    },
    isBoss: false,
    unlockWave: 12,
  },

  // 15. Beetle - Armored insect
  {
    type: EnemyType.Beetle,
    name: "Beetle",
    description: "An armored beetle. Hard shell reduces damage.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 60,
      speed: 0.7,
      armor: 6,
      magicResistance: 1,
      bounty: 12,
      score: 22,
    },
    meshConfig: {
      baseShape: "insect",
      scale: 0.6,
      parts: [
        { type: "sphere", position: [0.1, 0.08, 0], size: [0.06, 0.05, 0.05], color: "#555555" }, // Head
        { type: "sphere", position: [0, 0.1, 0], size: [0.12, 0.08, 0.1], color: "#4a4a4a", flatShading: true }, // Shell
        { type: "cylinder", position: [0.04, 0.04, 0.08], rotation: [1.0, 0, 0.3], size: [0.02, 0.08], color: "#505050" }, // Leg 1
        { type: "cylinder", position: [-0.02, 0.04, 0.08], rotation: [0.8, 0, 0], size: [0.02, 0.08], color: "#505050" }, // Leg 2
        { type: "cylinder", position: [-0.08, 0.04, 0.08], rotation: [0.6, 0, -0.3], size: [0.02, 0.08], color: "#505050" }, // Leg 3
        { type: "cylinder", position: [0.04, 0.04, -0.08], rotation: [-1.0, 0, 0.3], size: [0.02, 0.08], color: "#505050" }, // Leg 4
        { type: "cylinder", position: [-0.02, 0.04, -0.08], rotation: [-0.8, 0, 0], size: [0.02, 0.08], color: "#505050" }, // Leg 5
        { type: "cylinder", position: [-0.08, 0.04, -0.08], rotation: [-0.6, 0, -0.3], size: [0.02, 0.08], color: "#505050" }, // Leg 6
      ],
    },
    isBoss: false,
    unlockWave: 5,
  },

  // 16. Scarab Beetle - Golden armored variant
  {
    type: EnemyType.ScarabBeetle,
    name: "Scarab Beetle",
    description: "A sacred scarab beetle. Extremely resilient.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 110,
      speed: 0.6,
      armor: 10,
      magicResistance: 4,
      bounty: 20,
      score: 35,
    },
    meshConfig: {
      baseShape: "insect",
      scale: 0.75,
      parts: [
        { type: "sphere", position: [0.12, 0.1, 0], size: [0.07, 0.06, 0.06], color: "#888888" }, // Head
        { type: "sphere", position: [0, 0.12, 0], size: [0.14, 0.09, 0.12], color: "#999999", flatShading: true }, // Shell
        { type: "cylinder", position: [0.05, 0.05, 0.1], rotation: [1.0, 0, 0.3], size: [0.022, 0.1], color: "#777777" }, // Leg 1
        { type: "cylinder", position: [-0.02, 0.05, 0.1], rotation: [0.8, 0, 0], size: [0.022, 0.1], color: "#777777" }, // Leg 2
        { type: "cylinder", position: [-0.09, 0.05, 0.1], rotation: [0.6, 0, -0.3], size: [0.022, 0.1], color: "#777777" }, // Leg 3
        { type: "cylinder", position: [0.05, 0.05, -0.1], rotation: [-1.0, 0, 0.3], size: [0.022, 0.1], color: "#777777" }, // Leg 4
        { type: "cylinder", position: [-0.02, 0.05, -0.1], rotation: [-0.8, 0, 0], size: [0.022, 0.1], color: "#777777" }, // Leg 5
        { type: "cylinder", position: [-0.09, 0.05, -0.1], rotation: [-0.6, 0, -0.3], size: [0.022, 0.1], color: "#777777" }, // Leg 6
      ],
    },
    isBoss: false,
    unlockWave: 14,
  },

  // 17. Rat - Small and fast
  {
    type: EnemyType.Rat,
    name: "Rat",
    description: "A plague rat. Small and numerous.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 20,
      speed: 1.8,
      armor: 0,
      magicResistance: 0,
      bounty: 4,
      score: 8,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 0.4,
      parts: [
        { type: "sphere", position: [0.08, 0.06, 0], size: [0.05, 0.04, 0.04], color: "#5a5a5a" }, // Head
        { type: "cone", position: [0.12, 0.06, 0], rotation: [0, 0, -1.57], size: [0.02, 0.04], color: "#666666" }, // Nose
        { type: "sphere", position: [0, 0.06, 0], size: [0.08, 0.05, 0.05], color: "#555555" }, // Body
        { type: "cylinder", position: [-0.12, 0.06, 0], rotation: [0, 0, 1.4], size: [0.01, 0.12], color: "#666666" }, // Tail
        { type: "cylinder", position: [0.03, 0.03, 0.04], size: [0.015, 0.05], color: "#555555" }, // Leg FL
        { type: "cylinder", position: [0.03, 0.03, -0.04], size: [0.015, 0.05], color: "#555555" }, // Leg FR
        { type: "cylinder", position: [-0.04, 0.03, 0.04], size: [0.015, 0.05], color: "#555555" }, // Leg BL
        { type: "cylinder", position: [-0.04, 0.03, -0.04], size: [0.015, 0.05], color: "#555555" }, // Leg BR
      ],
    },
    isBoss: false,
    unlockWave: 2,
  },

  // 18. Giant Rat - Larger rat variant
  {
    type: EnemyType.GiantRat,
    name: "Giant Rat",
    description: "A massive sewer rat. Spreads disease.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 50,
      speed: 1.5,
      armor: 1,
      magicResistance: 1,
      bounty: 10,
      score: 18,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 0.7,
      parts: [
        { type: "sphere", position: [0.12, 0.1, 0], size: [0.08, 0.06, 0.06], color: "#4a4a4a" }, // Head
        { type: "cone", position: [0.18, 0.1, 0], rotation: [0, 0, -1.57], size: [0.03, 0.06], color: "#555555" }, // Nose
        { type: "sphere", position: [0, 0.1, 0], size: [0.12, 0.08, 0.08], color: "#444444" }, // Body
        { type: "cylinder", position: [-0.16, 0.1, 0], rotation: [0, 0, 1.4], size: [0.015, 0.18], color: "#555555" }, // Tail
        { type: "cylinder", position: [0.05, 0.05, 0.06], size: [0.025, 0.08], color: "#444444" }, // Leg FL
        { type: "cylinder", position: [0.05, 0.05, -0.06], size: [0.025, 0.08], color: "#444444" }, // Leg FR
        { type: "cylinder", position: [-0.06, 0.05, 0.06], size: [0.025, 0.08], color: "#444444" }, // Leg BL
        { type: "cylinder", position: [-0.06, 0.05, -0.06], size: [0.025, 0.08], color: "#444444" }, // Leg BR
      ],
    },
    isBoss: false,
    unlockWave: 7,
  },

  // 19. Slime - Blob creature
  {
    type: EnemyType.Slime,
    name: "Slime",
    description: "A gelatinous blob. Splits when damaged.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 35,
      speed: 0.8,
      armor: 0,
      magicResistance: 5,
      bounty: 8,
      score: 15,
    },
    specialAbility: {
      type: SpecialAbilityType.Split,
      cooldown: 0,
      strength: 2, // Splits into 2 smaller slimes
    },
    meshConfig: {
      baseShape: "blob",
      scale: 0.6,
      parts: [
        { type: "sphere", position: [0, 0.12, 0], size: [0.15, 0.12, 0.15], color: "#707070" }, // Body
        { type: "sphere", position: [0.05, 0.2, 0.03], size: [0.03], color: "#888888" }, // Eye L
        { type: "sphere", position: [0.05, 0.2, -0.03], size: [0.03], color: "#888888" }, // Eye R
      ],
    },
    isBoss: false,
    unlockWave: 3,
  },

  // 20. Slime King - Large slime
  {
    type: EnemyType.SlimeKing,
    name: "Slime King",
    description: "A massive slime wearing a crown. Spawns smaller slimes.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 150,
      speed: 0.5,
      armor: 2,
      magicResistance: 10,
      bounty: 30,
      score: 50,
    },
    specialAbility: {
      type: SpecialAbilityType.Summon,
      cooldown: 5000,
      strength: 1, // Summons 1 slime
    },
    meshConfig: {
      baseShape: "blob",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0, 0.18, 0], size: [0.25, 0.18, 0.25], color: "#606060" }, // Body
        { type: "sphere", position: [0.08, 0.32, 0.05], size: [0.04], color: "#808080" }, // Eye L
        { type: "sphere", position: [0.08, 0.32, -0.05], size: [0.04], color: "#808080" }, // Eye R
        { type: "cone", position: [0, 0.4, 0], size: [0.08, 0.12], color: "#999999" }, // Crown
        { type: "box", position: [0, 0.38, 0], size: [0.12, 0.03, 0.12], color: "#888888" }, // Crown base
      ],
    },
    isBoss: false,
    unlockWave: 15,
  },

  // 21. Mushroom - Walking fungus
  {
    type: EnemyType.Mushroom,
    name: "Mushroom",
    description: "An animated mushroom. Releases spores.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 45,
      speed: 0.7,
      armor: 1,
      magicResistance: 6,
      bounty: 10,
      score: 18,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.6,
      parts: [
        { type: "sphere", position: [0, 0.35, 0], size: [0.18, 0.1, 0.18], color: "#777777" }, // Cap
        { type: "cylinder", position: [0, 0.2, 0], size: [0.06, 0.2], color: "#888888" }, // Stem
        { type: "sphere", position: [0.05, 0.38, 0.08], size: [0.025], color: "#666666" }, // Spot 1
        { type: "sphere", position: [-0.06, 0.36, 0.05], size: [0.02], color: "#666666" }, // Spot 2
        { type: "cylinder", position: [-0.08, 0.12, 0], rotation: [0, 0, 0.5], size: [0.025, 0.1], color: "#888888" }, // Arm L
        { type: "cylinder", position: [0.08, 0.12, 0], rotation: [0, 0, -0.5], size: [0.025, 0.1], color: "#888888" }, // Arm R
      ],
    },
    isBoss: false,
    unlockWave: 6,
  },

  // 22. Mushroom Giant - Large mushroom
  {
    type: EnemyType.MushroomGiant,
    name: "Mushroom Giant",
    description: "A massive toxic mushroom. Poisons on contact.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 120,
      speed: 0.5,
      armor: 3,
      magicResistance: 12,
      bounty: 25,
      score: 40,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0, 0.55, 0], size: [0.28, 0.15, 0.28], color: "#666666" }, // Cap
        { type: "cylinder", position: [0, 0.3, 0], size: [0.1, 0.35], color: "#777777" }, // Stem
        { type: "sphere", position: [0.08, 0.6, 0.12], size: [0.04], color: "#555555" }, // Spot 1
        { type: "sphere", position: [-0.1, 0.58, 0.08], size: [0.03], color: "#555555" }, // Spot 2
        { type: "sphere", position: [0.05, 0.55, -0.1], size: [0.035], color: "#555555" }, // Spot 3
        { type: "cylinder", position: [-0.12, 0.2, 0], rotation: [0, 0, 0.4], size: [0.04, 0.15], color: "#777777" }, // Arm L
        { type: "cylinder", position: [0.12, 0.2, 0], rotation: [0, 0, -0.4], size: [0.04, 0.15], color: "#777777" }, // Arm R
      ],
    },
    isBoss: false,
    unlockWave: 16,
  },

  // 23. Golem - Living stone
  {
    type: EnemyType.Golem,
    name: "Golem",
    description: "A construct of stone. Slow but extremely durable.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 250,
      speed: 0.4,
      armor: 12,
      magicResistance: 8,
      bounty: 35,
      score: 55,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.2,
      parts: [
        { type: "box", position: [0, 0.85, 0], size: [0.18, 0.18, 0.16], color: "#666666", flatShading: true }, // Head
        { type: "box", position: [0, 0.55, 0], size: [0.3, 0.35, 0.2], color: "#555555", flatShading: true }, // Torso
        { type: "box", position: [-0.22, 0.5, 0], rotation: [0, 0, 0.2], size: [0.1, 0.28, 0.1], color: "#606060", flatShading: true }, // Arm L
        { type: "box", position: [0.22, 0.5, 0], rotation: [0, 0, -0.2], size: [0.1, 0.28, 0.1], color: "#606060", flatShading: true }, // Arm R
        { type: "box", position: [-0.09, 0.18, 0], size: [0.1, 0.32, 0.1], color: "#5a5a5a", flatShading: true }, // Leg L
        { type: "box", position: [0.09, 0.18, 0], size: [0.1, 0.32, 0.1], color: "#5a5a5a", flatShading: true }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 12,
  },

  // 24. Stone Golem - Larger golem
  {
    type: EnemyType.StoneGolem,
    name: "Stone Golem",
    description: "An ancient stone guardian. Nearly indestructible.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 400,
      speed: 0.3,
      armor: 18,
      magicResistance: 12,
      bounty: 50,
      score: 80,
    },
    specialAbility: {
      type: SpecialAbilityType.Armor,
      cooldown: 10000,
      duration: 3000,
      strength: 10, // +10 armor
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.5,
      parts: [
        { type: "box", position: [0, 1.0, 0], size: [0.22, 0.22, 0.2], color: "#555555", flatShading: true }, // Head
        { type: "box", position: [0, 0.65, 0], size: [0.38, 0.42, 0.25], color: "#4a4a4a", flatShading: true }, // Torso
        { type: "box", position: [-0.28, 0.6, 0], rotation: [0, 0, 0.15], size: [0.12, 0.35, 0.12], color: "#505050", flatShading: true }, // Arm L
        { type: "box", position: [0.28, 0.6, 0], rotation: [0, 0, -0.15], size: [0.12, 0.35, 0.12], color: "#505050", flatShading: true }, // Arm R
        { type: "box", position: [-0.11, 0.2, 0], size: [0.12, 0.38, 0.12], color: "#4a4a4a", flatShading: true }, // Leg L
        { type: "box", position: [0.11, 0.2, 0], size: [0.12, 0.38, 0.12], color: "#4a4a4a", flatShading: true }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 20,
  },

  // 25. Ghost - Ethereal enemy
  {
    type: EnemyType.Ghost,
    name: "Ghost",
    description: "A restless spirit. Can phase through attacks.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 40,
      speed: 1.0,
      armor: 0,
      magicResistance: 15,
      bounty: 15,
      score: 25,
    },
    specialAbility: {
      type: SpecialAbilityType.Phase,
      cooldown: 6000,
      duration: 2000,
    },
    meshConfig: {
      baseShape: "blob",
      scale: 0.8,
      parts: [
        { type: "sphere", position: [0, 0.4, 0], size: [0.12], color: "#cccccc" }, // Head
        { type: "sphere", position: [0.03, 0.42, 0.04], size: [0.025], color: "#333333" }, // Eye L
        { type: "sphere", position: [0.03, 0.42, -0.04], size: [0.025], color: "#333333" }, // Eye R
        { type: "cone", position: [0, 0.2, 0], size: [0.18, 0.35], color: "#bbbbbb" }, // Body/tail
      ],
    },
    isBoss: false,
    unlockWave: 8,
  },

  // 26. Wraith - Stronger ghost
  {
    type: EnemyType.Wraith,
    name: "Wraith",
    description: "A vengeful spirit. Drains life from towers.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 80,
      speed: 1.1,
      armor: 0,
      magicResistance: 20,
      bounty: 25,
      score: 40,
    },
    specialAbility: {
      type: SpecialAbilityType.Phase,
      cooldown: 4000,
      duration: 2500,
    },
    meshConfig: {
      baseShape: "blob",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0, 0.5, 0], size: [0.14], color: "#aaaaaa" }, // Head
        { type: "sphere", position: [0.04, 0.52, 0.05], size: [0.03], color: "#222222" }, // Eye L
        { type: "sphere", position: [0.04, 0.52, -0.05], size: [0.03], color: "#222222" }, // Eye R
        { type: "cone", position: [0, 0.25, 0], size: [0.22, 0.45], color: "#999999" }, // Body/tail
        { type: "cylinder", position: [-0.15, 0.4, 0], rotation: [0, 0, 0.8], size: [0.03, 0.15], color: "#aaaaaa" }, // Arm L
        { type: "cylinder", position: [0.15, 0.4, 0], rotation: [0, 0, -0.8], size: [0.03, 0.15], color: "#aaaaaa" }, // Arm R
      ],
    },
    isBoss: false,
    unlockWave: 18,
  },

  // 27. Imp - Small demon
  {
    type: EnemyType.Imp,
    name: "Imp",
    description: "A mischievous imp. Quick and annoying.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 30,
      speed: 1.5,
      armor: 1,
      magicResistance: 3,
      bounty: 8,
      score: 15,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.5,
      parts: [
        { type: "sphere", position: [0, 0.38, 0], size: [0.1], color: "#555555" }, // Head
        { type: "cone", position: [0.04, 0.45, 0.05], rotation: [0.3, 0, 0.5], size: [0.025, 0.06], color: "#666666" }, // Horn L
        { type: "cone", position: [0.04, 0.45, -0.05], rotation: [-0.3, 0, 0.5], size: [0.025, 0.06], color: "#666666" }, // Horn R
        { type: "box", position: [0, 0.24, 0], size: [0.08, 0.12, 0.06], color: "#4a4a4a" }, // Torso
        { type: "cylinder", position: [-0.06, 0.22, 0], rotation: [0, 0, 0.4], size: [0.02, 0.1], color: "#505050" }, // Arm L
        { type: "cylinder", position: [0.06, 0.22, 0], rotation: [0, 0, -0.4], size: [0.02, 0.1], color: "#505050" }, // Arm R
        { type: "cylinder", position: [-0.03, 0.08, 0], size: [0.025, 0.14], color: "#4a4a4a" }, // Leg L
        { type: "cylinder", position: [0.03, 0.08, 0], size: [0.025, 0.14], color: "#4a4a4a" }, // Leg R
        { type: "cone", position: [-0.08, 0.18, 0], rotation: [0, 0, 1.2], size: [0.02, 0.1], color: "#555555" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 5,
  },

  // 28. Fire Imp - Burning variant
  {
    type: EnemyType.ImpFire,
    name: "Fire Imp",
    description: "An imp wreathed in flames. Burns attackers.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 40,
      speed: 1.4,
      armor: 0,
      magicResistance: 8,
      bounty: 12,
      score: 22,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.55,
      parts: [
        { type: "sphere", position: [0, 0.4, 0], size: [0.11], color: "#888888" }, // Head
        { type: "cone", position: [0.05, 0.48, 0.055], rotation: [0.3, 0, 0.5], size: [0.028, 0.07], color: "#999999" }, // Horn L
        { type: "cone", position: [0.05, 0.48, -0.055], rotation: [-0.3, 0, 0.5], size: [0.028, 0.07], color: "#999999" }, // Horn R
        { type: "box", position: [0, 0.25, 0], size: [0.09, 0.13, 0.07], color: "#777777" }, // Torso
        { type: "cylinder", position: [-0.07, 0.24, 0], rotation: [0, 0, 0.4], size: [0.022, 0.11], color: "#888888" }, // Arm L
        { type: "cylinder", position: [0.07, 0.24, 0], rotation: [0, 0, -0.4], size: [0.022, 0.11], color: "#888888" }, // Arm R
        { type: "cylinder", position: [-0.035, 0.09, 0], size: [0.028, 0.15], color: "#777777" }, // Leg L
        { type: "cylinder", position: [0.035, 0.09, 0], size: [0.028, 0.15], color: "#777777" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 11,
  },

  // 29. Troll - Regenerating brute
  {
    type: EnemyType.Troll,
    name: "Troll",
    description: "A regenerating troll. Heals over time.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 180,
      speed: 0.6,
      armor: 4,
      magicResistance: 2,
      bounty: 25,
      score: 40,
    },
    specialAbility: {
      type: SpecialAbilityType.Regenerate,
      cooldown: 1000,
      strength: 5, // Heals 5 HP per second
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.1,
      parts: [
        { type: "sphere", position: [0, 0.75, 0], size: [0.14, 0.12, 0.12], color: "#5a5a5a" }, // Head
        { type: "cone", position: [0.08, 0.72, 0], rotation: [0, 0, -0.8], size: [0.06, 0.12], color: "#666666" }, // Nose
        { type: "box", position: [0, 0.48, 0], size: [0.24, 0.28, 0.16], color: "#505050" }, // Torso
        { type: "cylinder", position: [-0.18, 0.42, 0], rotation: [0, 0, 0.3], size: [0.055, 0.28], color: "#555555" }, // Arm L
        { type: "cylinder", position: [0.18, 0.42, 0], rotation: [0, 0, -0.3], size: [0.055, 0.28], color: "#555555" }, // Arm R
        { type: "cylinder", position: [-0.07, 0.16, 0], size: [0.06, 0.3], color: "#505050" }, // Leg L
        { type: "cylinder", position: [0.07, 0.16, 0], size: [0.06, 0.3], color: "#505050" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 10,
  },

  // 30. Bridge Troll - Larger troll
  {
    type: EnemyType.TrollBridge,
    name: "Bridge Troll",
    description: "A massive troll. Extremely tough and regenerates.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 300,
      speed: 0.45,
      armor: 7,
      magicResistance: 4,
      bounty: 40,
      score: 65,
    },
    specialAbility: {
      type: SpecialAbilityType.Regenerate,
      cooldown: 1000,
      strength: 10, // Heals 10 HP per second
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.4,
      parts: [
        { type: "sphere", position: [0, 0.9, 0], size: [0.18, 0.15, 0.15], color: "#4a4a4a" }, // Head
        { type: "cone", position: [0.1, 0.86, 0], rotation: [0, 0, -0.8], size: [0.08, 0.15], color: "#555555" }, // Nose
        { type: "box", position: [0, 0.58, 0], size: [0.32, 0.36, 0.2], color: "#444444" }, // Torso
        { type: "cylinder", position: [-0.24, 0.52, 0], rotation: [0, 0, 0.25], size: [0.07, 0.35], color: "#4a4a4a" }, // Arm L
        { type: "cylinder", position: [0.24, 0.52, 0], rotation: [0, 0, -0.25], size: [0.07, 0.35], color: "#4a4a4a" }, // Arm R
        { type: "cylinder", position: [-0.09, 0.19, 0], size: [0.075, 0.36], color: "#444444" }, // Leg L
        { type: "cylinder", position: [0.09, 0.19, 0], size: [0.075, 0.36], color: "#444444" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 22,
  },

  // 31. Bandit - Human enemy
  {
    type: EnemyType.Bandit,
    name: "Bandit",
    description: "A common bandit. Fast and evasive.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 55,
      speed: 1.3,
      armor: 2,
      magicResistance: 1,
      bounty: 12,
      score: 20,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.85,
      parts: [
        { type: "sphere", position: [0, 0.7, 0], size: [0.1], color: "#6a6a6a" }, // Head
        { type: "box", position: [0, 0.72, 0], size: [0.12, 0.04, 0.12], color: "#555555" }, // Hat
        { type: "box", position: [0, 0.46, 0], size: [0.14, 0.2, 0.08], color: "#505050" }, // Torso
        { type: "cylinder", position: [-0.1, 0.42, 0], rotation: [0, 0, 0.3], size: [0.03, 0.16], color: "#5a5a5a" }, // Arm L
        { type: "cylinder", position: [0.1, 0.42, 0], rotation: [0, 0, -0.3], size: [0.03, 0.16], color: "#5a5a5a" }, // Arm R
        { type: "cylinder", position: [-0.04, 0.15, 0], size: [0.035, 0.26], color: "#505050" }, // Leg L
        { type: "cylinder", position: [0.04, 0.15, 0], size: [0.035, 0.26], color: "#505050" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 4,
  },

  // 32. Bandit Leader - Stronger bandit
  {
    type: EnemyType.BanditLeader,
    name: "Bandit Leader",
    description: "Leader of a bandit gang. Boosts nearby allies.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 100,
      speed: 1.1,
      armor: 5,
      magicResistance: 3,
      bounty: 22,
      score: 38,
    },
    specialAbility: {
      type: SpecialAbilityType.Speed,
      cooldown: 8000,
      duration: 4000,
      strength: 0.3, // +30% speed to nearby allies
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.95,
      parts: [
        { type: "sphere", position: [0, 0.75, 0], size: [0.11], color: "#606060" }, // Head
        { type: "cone", position: [0, 0.82, 0], size: [0.08, 0.1], color: "#777777" }, // Hat
        { type: "box", position: [0, 0.48, 0], size: [0.16, 0.22, 0.1], color: "#4a4a4a" }, // Torso
        { type: "cylinder", position: [-0.12, 0.44, 0], rotation: [0, 0, 0.25], size: [0.035, 0.18], color: "#555555" }, // Arm L
        { type: "cylinder", position: [0.12, 0.44, 0], rotation: [0, 0, -0.4], size: [0.035, 0.18], color: "#555555" }, // Arm R
        { type: "cylinder", position: [0.18, 0.32, 0], rotation: [0, 0, -0.6], size: [0.015, 0.2], color: "#888888" }, // Sword
        { type: "cylinder", position: [-0.045, 0.16, 0], size: [0.04, 0.28], color: "#4a4a4a" }, // Leg L
        { type: "cylinder", position: [0.045, 0.16, 0], size: [0.04, 0.28], color: "#4a4a4a" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 13,
  },

  // 33. Minotaur - Bull-headed warrior
  {
    type: EnemyType.Minotaur,
    name: "Minotaur",
    description: "A bull-headed beast. Charges through defenses.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 200,
      speed: 0.9,
      armor: 8,
      magicResistance: 4,
      bounty: 35,
      score: 55,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.3,
      parts: [
        { type: "sphere", position: [0, 0.9, 0], size: [0.16, 0.14, 0.14], color: "#555555" }, // Head
        { type: "cone", position: [0.12, 0.88, 0], rotation: [0, 0, -1.2], size: [0.04, 0.12], color: "#666666" }, // Snout
        { type: "cone", position: [0.08, 0.98, 0.1], rotation: [0.6, 0, 0.3], size: [0.025, 0.12], color: "#777777" }, // Horn L
        { type: "cone", position: [0.08, 0.98, -0.1], rotation: [-0.6, 0, 0.3], size: [0.025, 0.12], color: "#777777" }, // Horn R
        { type: "box", position: [0, 0.58, 0], size: [0.28, 0.32, 0.18], color: "#4a4a4a" }, // Torso
        { type: "cylinder", position: [-0.2, 0.52, 0], rotation: [0, 0, 0.2], size: [0.055, 0.28], color: "#505050" }, // Arm L
        { type: "cylinder", position: [0.2, 0.52, 0], rotation: [0, 0, -0.2], size: [0.055, 0.28], color: "#505050" }, // Arm R
        { type: "cylinder", position: [-0.08, 0.19, 0], size: [0.06, 0.34], color: "#4a4a4a" }, // Leg L
        { type: "cylinder", position: [0.08, 0.19, 0], size: [0.06, 0.34], color: "#4a4a4a" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 16,
  },

  // 34. Centaur - Horse-bodied warrior
  {
    type: EnemyType.Centaur,
    name: "Centaur",
    description: "A swift horse-warrior. Moves quickly.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 120,
      speed: 1.5,
      armor: 4,
      magicResistance: 3,
      bounty: 25,
      score: 42,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 1.1,
      parts: [
        { type: "sphere", position: [0.2, 0.65, 0], size: [0.1], color: "#666666" }, // Human head
        { type: "box", position: [0.15, 0.48, 0], size: [0.12, 0.18, 0.08], color: "#5a5a5a" }, // Human torso
        { type: "cylinder", position: [0.08, 0.42, 0.08], rotation: [0.3, 0, 0.3], size: [0.025, 0.14], color: "#606060" }, // Arm L
        { type: "cylinder", position: [0.08, 0.42, -0.08], rotation: [-0.3, 0, 0.3], size: [0.025, 0.14], color: "#606060" }, // Arm R
        { type: "sphere", position: [-0.05, 0.32, 0], size: [0.18, 0.12, 0.1], color: "#555555" }, // Horse body
        { type: "cylinder", position: [0.08, 0.14, 0.08], size: [0.03, 0.26], color: "#5a5a5a" }, // Leg FL
        { type: "cylinder", position: [0.08, 0.14, -0.08], size: [0.03, 0.26], color: "#5a5a5a" }, // Leg FR
        { type: "cylinder", position: [-0.14, 0.14, 0.08], size: [0.03, 0.26], color: "#5a5a5a" }, // Leg BL
        { type: "cylinder", position: [-0.14, 0.14, -0.08], size: [0.03, 0.26], color: "#5a5a5a" }, // Leg BR
        { type: "cone", position: [-0.25, 0.3, 0], rotation: [0, 0, 1.4], size: [0.03, 0.15], color: "#666666" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 14,
  },

  // 35. Lizardman - Reptilian warrior
  {
    type: EnemyType.Lizardman,
    name: "Lizardman",
    description: "A cold-blooded warrior. Tough scales.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 90,
      speed: 1.0,
      armor: 6,
      magicResistance: 4,
      bounty: 18,
      score: 30,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.95,
      parts: [
        { type: "sphere", position: [0, 0.72, 0], size: [0.11, 0.1, 0.09], color: "#5a5a5a" }, // Head
        { type: "cone", position: [0.08, 0.72, 0], rotation: [0, 0, -1.57], size: [0.04, 0.08], color: "#666666" }, // Snout
        { type: "box", position: [0, 0.48, 0], size: [0.16, 0.22, 0.1], color: "#505050" }, // Torso
        { type: "cylinder", position: [-0.12, 0.44, 0], rotation: [0, 0, 0.25], size: [0.035, 0.18], color: "#555555" }, // Arm L
        { type: "cylinder", position: [0.12, 0.44, 0], rotation: [0, 0, -0.25], size: [0.035, 0.18], color: "#555555" }, // Arm R
        { type: "cylinder", position: [-0.045, 0.16, 0], size: [0.04, 0.28], color: "#505050" }, // Leg L
        { type: "cylinder", position: [0.045, 0.16, 0], size: [0.04, 0.28], color: "#505050" }, // Leg R
        { type: "cone", position: [-0.12, 0.25, 0], rotation: [0, 0, 1.3], size: [0.025, 0.18], color: "#5a5a5a" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 9,
  },

  // 36. Lizardman Shaman - Magic lizard
  {
    type: EnemyType.LizardmanShaman,
    name: "Lizardman Shaman",
    description: "A lizard sorcerer. Heals nearby allies.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 70,
      speed: 0.8,
      armor: 3,
      magicResistance: 10,
      bounty: 25,
      score: 42,
    },
    specialAbility: {
      type: SpecialAbilityType.Heal,
      cooldown: 5000,
      strength: 20, // Heals 20 HP
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.9,
      parts: [
        { type: "sphere", position: [0, 0.7, 0], size: [0.1, 0.09, 0.08], color: "#666666" }, // Head
        { type: "cone", position: [0.06, 0.7, 0], rotation: [0, 0, -1.57], size: [0.035, 0.06], color: "#777777" }, // Snout
        { type: "cone", position: [0, 0.78, 0], size: [0.06, 0.08], color: "#888888" }, // Headdress
        { type: "box", position: [0, 0.46, 0], size: [0.14, 0.2, 0.08], color: "#555555" }, // Torso
        { type: "cylinder", position: [-0.1, 0.42, 0], rotation: [0, 0, 0.5], size: [0.03, 0.16], color: "#606060" }, // Arm L
        { type: "cylinder", position: [-0.18, 0.28, 0], rotation: [0, 0, 0.2], size: [0.015, 0.22], color: "#999999" }, // Staff
        { type: "cylinder", position: [0.1, 0.42, 0], rotation: [0, 0, -0.3], size: [0.03, 0.16], color: "#606060" }, // Arm R
        { type: "cylinder", position: [-0.04, 0.15, 0], size: [0.035, 0.26], color: "#555555" }, // Leg L
        { type: "cylinder", position: [0.04, 0.15, 0], size: [0.035, 0.26], color: "#555555" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 17,
  },

  // 37. Scorpion - Poisonous arachnid
  {
    type: EnemyType.Scorpion,
    name: "Scorpion",
    description: "A venomous scorpion. Poisons on hit.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 50,
      speed: 1.1,
      armor: 4,
      magicResistance: 1,
      bounty: 14,
      score: 24,
    },
    meshConfig: {
      baseShape: "insect",
      scale: 0.7,
      parts: [
        { type: "sphere", position: [0.12, 0.08, 0], size: [0.06, 0.05, 0.06], color: "#5a5a5a" }, // Head
        { type: "sphere", position: [0, 0.08, 0], size: [0.1, 0.06, 0.08], color: "#505050" }, // Body
        { type: "sphere", position: [-0.12, 0.08, 0], size: [0.08, 0.05, 0.06], color: "#555555" }, // Abdomen
        { type: "sphere", position: [-0.18, 0.14, 0], size: [0.04], color: "#5a5a5a" }, // Tail 1
        { type: "sphere", position: [-0.22, 0.2, 0], size: [0.035], color: "#606060" }, // Tail 2
        { type: "cone", position: [-0.24, 0.26, 0], rotation: [0, 0, 0.3], size: [0.02, 0.05], color: "#777777" }, // Stinger
        { type: "cylinder", position: [0.1, 0.06, 0.08], rotation: [0.8, 0, 0.3], size: [0.015, 0.1], color: "#555555" }, // Leg 1
        { type: "cylinder", position: [0.04, 0.06, 0.08], rotation: [0.6, 0, 0.1], size: [0.015, 0.1], color: "#555555" }, // Leg 2
        { type: "cylinder", position: [-0.02, 0.06, 0.08], rotation: [0.4, 0, -0.1], size: [0.015, 0.1], color: "#555555" }, // Leg 3
        { type: "cylinder", position: [-0.08, 0.06, 0.08], rotation: [0.2, 0, -0.3], size: [0.015, 0.1], color: "#555555" }, // Leg 4
        { type: "cylinder", position: [0.1, 0.06, -0.08], rotation: [-0.8, 0, 0.3], size: [0.015, 0.1], color: "#555555" }, // Leg 5
        { type: "cylinder", position: [0.04, 0.06, -0.08], rotation: [-0.6, 0, 0.1], size: [0.015, 0.1], color: "#555555" }, // Leg 6
        { type: "cylinder", position: [-0.02, 0.06, -0.08], rotation: [-0.4, 0, -0.1], size: [0.015, 0.1], color: "#555555" }, // Leg 7
        { type: "cylinder", position: [-0.08, 0.06, -0.08], rotation: [-0.2, 0, -0.3], size: [0.015, 0.1], color: "#555555" }, // Leg 8
      ],
    },
    isBoss: false,
    unlockWave: 7,
  },

  // 38. Giant Scorpion - Large scorpion
  {
    type: EnemyType.GiantScorpion,
    name: "Giant Scorpion",
    description: "A massive scorpion. Deadly venom.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 130,
      speed: 0.8,
      armor: 8,
      magicResistance: 3,
      bounty: 28,
      score: 45,
    },
    meshConfig: {
      baseShape: "insect",
      scale: 1.1,
      parts: [
        { type: "sphere", position: [0.18, 0.12, 0], size: [0.09, 0.07, 0.08], color: "#4a4a4a" }, // Head
        { type: "sphere", position: [0, 0.12, 0], size: [0.15, 0.09, 0.12], color: "#444444" }, // Body
        { type: "sphere", position: [-0.18, 0.12, 0], size: [0.12, 0.08, 0.1], color: "#4a4a4a" }, // Abdomen
        { type: "sphere", position: [-0.28, 0.2, 0], size: [0.06], color: "#505050" }, // Tail 1
        { type: "sphere", position: [-0.34, 0.3, 0], size: [0.05], color: "#555555" }, // Tail 2
        { type: "cone", position: [-0.38, 0.4, 0], rotation: [0, 0, 0.3], size: [0.03, 0.08], color: "#666666" }, // Stinger
        { type: "cylinder", position: [0.14, 0.08, 0.12], rotation: [0.8, 0, 0.3], size: [0.025, 0.16], color: "#4a4a4a" }, // Leg 1
        { type: "cylinder", position: [0.06, 0.08, 0.12], rotation: [0.6, 0, 0.1], size: [0.025, 0.16], color: "#4a4a4a" }, // Leg 2
        { type: "cylinder", position: [-0.02, 0.08, 0.12], rotation: [0.4, 0, -0.1], size: [0.025, 0.16], color: "#4a4a4a" }, // Leg 3
        { type: "cylinder", position: [-0.1, 0.08, 0.12], rotation: [0.2, 0, -0.3], size: [0.025, 0.16], color: "#4a4a4a" }, // Leg 4
        { type: "cylinder", position: [0.14, 0.08, -0.12], rotation: [-0.8, 0, 0.3], size: [0.025, 0.16], color: "#4a4a4a" }, // Leg 5
        { type: "cylinder", position: [0.06, 0.08, -0.12], rotation: [-0.6, 0, 0.1], size: [0.025, 0.16], color: "#4a4a4a" }, // Leg 6
        { type: "cylinder", position: [-0.02, 0.08, -0.12], rotation: [-0.4, 0, -0.1], size: [0.025, 0.16], color: "#4a4a4a" }, // Leg 7
        { type: "cylinder", position: [-0.1, 0.08, -0.12], rotation: [-0.2, 0, -0.3], size: [0.025, 0.16], color: "#4a4a4a" }, // Leg 8
      ],
    },
    isBoss: false,
    unlockWave: 19,
  },

  // 39. Crab - Armored crustacean
  {
    type: EnemyType.Crab,
    name: "Crab",
    description: "An armored crab. Hard shell protects it.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 70,
      speed: 0.6,
      armor: 8,
      magicResistance: 2,
      bounty: 15,
      score: 25,
    },
    meshConfig: {
      baseShape: "insect",
      scale: 0.6,
      parts: [
        { type: "sphere", position: [0, 0.1, 0], size: [0.18, 0.08, 0.2], color: "#606060", flatShading: true }, // Shell
        { type: "sphere", position: [0.1, 0.12, 0.1], size: [0.03], color: "#777777" }, // Eye L
        { type: "sphere", position: [0.1, 0.12, -0.1], size: [0.03], color: "#777777" }, // Eye R
        { type: "box", position: [0.12, 0.06, 0.12], rotation: [0, 0.5, 0], size: [0.08, 0.04, 0.03], color: "#555555" }, // Claw L
        { type: "box", position: [0.12, 0.06, -0.12], rotation: [0, -0.5, 0], size: [0.08, 0.04, 0.03], color: "#555555" }, // Claw R
        { type: "cylinder", position: [-0.04, 0.04, 0.16], rotation: [1.2, 0, -0.3], size: [0.02, 0.1], color: "#5a5a5a" }, // Leg 1
        { type: "cylinder", position: [-0.1, 0.04, 0.14], rotation: [1.0, 0, -0.5], size: [0.02, 0.1], color: "#5a5a5a" }, // Leg 2
        { type: "cylinder", position: [-0.14, 0.04, 0.1], rotation: [0.8, 0, -0.7], size: [0.02, 0.1], color: "#5a5a5a" }, // Leg 3
        { type: "cylinder", position: [-0.04, 0.04, -0.16], rotation: [-1.2, 0, -0.3], size: [0.02, 0.1], color: "#5a5a5a" }, // Leg 4
        { type: "cylinder", position: [-0.1, 0.04, -0.14], rotation: [-1.0, 0, -0.5], size: [0.02, 0.1], color: "#5a5a5a" }, // Leg 5
        { type: "cylinder", position: [-0.14, 0.04, -0.1], rotation: [-0.8, 0, -0.7], size: [0.02, 0.1], color: "#5a5a5a" }, // Leg 6
      ],
    },
    isBoss: false,
    unlockWave: 8,
  },

  // 40. Giant Crab - Large crab
  {
    type: EnemyType.GiantCrab,
    name: "Giant Crab",
    description: "A massive armored crab. Nearly impenetrable.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 180,
      speed: 0.4,
      armor: 14,
      magicResistance: 5,
      bounty: 32,
      score: 52,
    },
    meshConfig: {
      baseShape: "insect",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0, 0.15, 0], size: [0.28, 0.12, 0.3], color: "#505050", flatShading: true }, // Shell
        { type: "sphere", position: [0.16, 0.18, 0.15], size: [0.04], color: "#666666" }, // Eye L
        { type: "sphere", position: [0.16, 0.18, -0.15], size: [0.04], color: "#666666" }, // Eye R
        { type: "box", position: [0.2, 0.1, 0.2], rotation: [0, 0.5, 0], size: [0.14, 0.06, 0.05], color: "#4a4a4a" }, // Claw L
        { type: "box", position: [0.2, 0.1, -0.2], rotation: [0, -0.5, 0], size: [0.14, 0.06, 0.05], color: "#4a4a4a" }, // Claw R
        { type: "cylinder", position: [-0.06, 0.06, 0.25], rotation: [1.2, 0, -0.3], size: [0.03, 0.16], color: "#555555" }, // Leg 1
        { type: "cylinder", position: [-0.15, 0.06, 0.22], rotation: [1.0, 0, -0.5], size: [0.03, 0.16], color: "#555555" }, // Leg 2
        { type: "cylinder", position: [-0.22, 0.06, 0.16], rotation: [0.8, 0, -0.7], size: [0.03, 0.16], color: "#555555" }, // Leg 3
        { type: "cylinder", position: [-0.06, 0.06, -0.25], rotation: [-1.2, 0, -0.3], size: [0.03, 0.16], color: "#555555" }, // Leg 4
        { type: "cylinder", position: [-0.15, 0.06, -0.22], rotation: [-1.0, 0, -0.5], size: [0.03, 0.16], color: "#555555" }, // Leg 5
        { type: "cylinder", position: [-0.22, 0.06, -0.16], rotation: [-0.8, 0, -0.7], size: [0.03, 0.16], color: "#555555" }, // Leg 6
      ],
    },
    isBoss: false,
    unlockWave: 21,
  },

  // 41. Boar - Wild pig
  {
    type: EnemyType.Boar,
    name: "Boar",
    description: "A wild boar. Charges forward recklessly.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 65,
      speed: 1.3,
      armor: 3,
      magicResistance: 1,
      bounty: 14,
      score: 24,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 0.7,
      parts: [
        { type: "sphere", position: [0.14, 0.16, 0], size: [0.1, 0.08, 0.08], color: "#5a5a5a" }, // Head
        { type: "cone", position: [0.22, 0.14, 0], rotation: [0, 0, -1.57], size: [0.04, 0.06], color: "#666666" }, // Snout
        { type: "cone", position: [0.2, 0.18, 0.04], rotation: [0.3, 0.5, -0.5], size: [0.015, 0.04], color: "#888888" }, // Tusk L
        { type: "cone", position: [0.2, 0.18, -0.04], rotation: [-0.3, -0.5, -0.5], size: [0.015, 0.04], color: "#888888" }, // Tusk R
        { type: "sphere", position: [0, 0.14, 0], size: [0.14, 0.1, 0.1], color: "#505050" }, // Body
        { type: "cylinder", position: [0.06, 0.06, 0.07], size: [0.03, 0.1], color: "#555555" }, // Leg FL
        { type: "cylinder", position: [0.06, 0.06, -0.07], size: [0.03, 0.1], color: "#555555" }, // Leg FR
        { type: "cylinder", position: [-0.08, 0.06, 0.07], size: [0.03, 0.1], color: "#555555" }, // Leg BL
        { type: "cylinder", position: [-0.08, 0.06, -0.07], size: [0.03, 0.1], color: "#555555" }, // Leg BR
      ],
    },
    isBoss: false,
    unlockWave: 6,
  },

  // 42. Wild Boar - Larger boar
  {
    type: EnemyType.WildBoar,
    name: "Wild Boar",
    description: "A massive wild boar. Unstoppable charge.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 140,
      speed: 1.1,
      armor: 6,
      magicResistance: 2,
      bounty: 26,
      score: 42,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0.18, 0.22, 0], size: [0.14, 0.11, 0.11], color: "#4a4a4a" }, // Head
        { type: "cone", position: [0.3, 0.2, 0], rotation: [0, 0, -1.57], size: [0.05, 0.08], color: "#555555" }, // Snout
        { type: "cone", position: [0.28, 0.26, 0.06], rotation: [0.3, 0.5, -0.5], size: [0.02, 0.06], color: "#777777" }, // Tusk L
        { type: "cone", position: [0.28, 0.26, -0.06], rotation: [-0.3, -0.5, -0.5], size: [0.02, 0.06], color: "#777777" }, // Tusk R
        { type: "sphere", position: [0, 0.2, 0], size: [0.2, 0.14, 0.14], color: "#444444" }, // Body
        { type: "cylinder", position: [0.08, 0.08, 0.1], size: [0.04, 0.14], color: "#4a4a4a" }, // Leg FL
        { type: "cylinder", position: [0.08, 0.08, -0.1], size: [0.04, 0.14], color: "#4a4a4a" }, // Leg FR
        { type: "cylinder", position: [-0.1, 0.08, 0.1], size: [0.04, 0.14], color: "#4a4a4a" }, // Leg BL
        { type: "cylinder", position: [-0.1, 0.08, -0.1], size: [0.04, 0.14], color: "#4a4a4a" }, // Leg BR
      ],
    },
    isBoss: false,
    unlockWave: 15,
  },

  // 43. Bear - Large predator
  {
    type: EnemyType.Bear,
    name: "Bear",
    description: "A fierce bear. Strong and resilient.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 160,
      speed: 0.9,
      armor: 5,
      magicResistance: 3,
      bounty: 28,
      score: 45,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0.2, 0.28, 0], size: [0.12, 0.1, 0.1], color: "#555555" }, // Head
        { type: "cone", position: [0.28, 0.26, 0], rotation: [0, 0, -1.57], size: [0.04, 0.06], color: "#666666" }, // Snout
        { type: "sphere", position: [0.18, 0.34, 0.06], size: [0.035], color: "#606060" }, // Ear L
        { type: "sphere", position: [0.18, 0.34, -0.06], size: [0.035], color: "#606060" }, // Ear R
        { type: "sphere", position: [0, 0.24, 0], size: [0.22, 0.16, 0.16], color: "#4a4a4a" }, // Body
        { type: "cylinder", position: [0.1, 0.1, 0.1], size: [0.045, 0.18], color: "#505050" }, // Leg FL
        { type: "cylinder", position: [0.1, 0.1, -0.1], size: [0.045, 0.18], color: "#505050" }, // Leg FR
        { type: "cylinder", position: [-0.1, 0.1, 0.1], size: [0.045, 0.18], color: "#505050" }, // Leg BL
        { type: "cylinder", position: [-0.1, 0.1, -0.1], size: [0.045, 0.18], color: "#505050" }, // Leg BR
      ],
    },
    isBoss: false,
    unlockWave: 11,
  },

  // 44. Dire Bear - Massive bear
  {
    type: EnemyType.DireBear,
    name: "Dire Bear",
    description: "A massive dire bear. Nearly unstoppable.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 280,
      speed: 0.7,
      armor: 9,
      magicResistance: 5,
      bounty: 45,
      score: 70,
    },
    meshConfig: {
      baseShape: "quadruped",
      scale: 1.4,
      parts: [
        { type: "sphere", position: [0.28, 0.38, 0], size: [0.16, 0.13, 0.13], color: "#444444" }, // Head
        { type: "cone", position: [0.4, 0.36, 0], rotation: [0, 0, -1.57], size: [0.06, 0.08], color: "#555555" }, // Snout
        { type: "sphere", position: [0.25, 0.46, 0.08], size: [0.045], color: "#505050" }, // Ear L
        { type: "sphere", position: [0.25, 0.46, -0.08], size: [0.045], color: "#505050" }, // Ear R
        { type: "sphere", position: [0, 0.32, 0], size: [0.3, 0.22, 0.22], color: "#3a3a3a" }, // Body
        { type: "cylinder", position: [0.14, 0.14, 0.14], size: [0.06, 0.26], color: "#444444" }, // Leg FL
        { type: "cylinder", position: [0.14, 0.14, -0.14], size: [0.06, 0.26], color: "#444444" }, // Leg FR
        { type: "cylinder", position: [-0.14, 0.14, 0.14], size: [0.06, 0.26], color: "#444444" }, // Leg BL
        { type: "cylinder", position: [-0.14, 0.14, -0.14], size: [0.06, 0.26], color: "#444444" }, // Leg BR
      ],
    },
    isBoss: false,
    unlockWave: 24,
  },

  // 45. Werewolf - Lycanthrope
  {
    type: EnemyType.Werewolf,
    name: "Werewolf",
    description: "A cursed werewolf. Fast and ferocious.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 130,
      speed: 1.6,
      armor: 4,
      magicResistance: 6,
      bounty: 30,
      score: 48,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.1,
      parts: [
        { type: "sphere", position: [0, 0.82, 0], size: [0.12, 0.1, 0.1], color: "#555555" }, // Head
        { type: "cone", position: [0.1, 0.8, 0], rotation: [0, 0, -1.2], size: [0.05, 0.1], color: "#666666" }, // Snout
        { type: "cone", position: [0.02, 0.9, 0.06], rotation: [0.3, 0, 0.2], size: [0.03, 0.06], color: "#606060" }, // Ear L
        { type: "cone", position: [0.02, 0.9, -0.06], rotation: [-0.3, 0, 0.2], size: [0.03, 0.06], color: "#606060" }, // Ear R
        { type: "box", position: [0, 0.55, 0], size: [0.2, 0.26, 0.12], color: "#4a4a4a" }, // Torso
        { type: "cylinder", position: [-0.14, 0.5, 0], rotation: [0, 0, 0.3], size: [0.04, 0.22], color: "#505050" }, // Arm L
        { type: "cylinder", position: [0.14, 0.5, 0], rotation: [0, 0, -0.3], size: [0.04, 0.22], color: "#505050" }, // Arm R
        { type: "cylinder", position: [-0.06, 0.18, 0], size: [0.05, 0.32], color: "#4a4a4a" }, // Leg L
        { type: "cylinder", position: [0.06, 0.18, 0], size: [0.05, 0.32], color: "#4a4a4a" }, // Leg R
        { type: "cone", position: [-0.1, 0.35, 0], rotation: [0, 0, 1.3], size: [0.03, 0.15], color: "#555555" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 18,
  },

  // 46. Mummy - Undead wrapped
  {
    type: EnemyType.Mummy,
    name: "Mummy",
    description: "An ancient mummy. Curses attackers.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 100,
      speed: 0.7,
      armor: 4,
      magicResistance: 12,
      bounty: 22,
      score: 36,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.9,
      parts: [
        { type: "sphere", position: [0, 0.72, 0], size: [0.11], color: "#888888" }, // Head
        { type: "box", position: [0, 0.48, 0], size: [0.14, 0.2, 0.08], color: "#999999" }, // Torso
        { type: "cylinder", position: [-0.1, 0.44, 0], rotation: [0, 0, 0.4], size: [0.03, 0.18], color: "#8a8a8a" }, // Arm L
        { type: "cylinder", position: [0.1, 0.44, 0], rotation: [0, 0, -0.4], size: [0.03, 0.18], color: "#8a8a8a" }, // Arm R
        { type: "cylinder", position: [-0.04, 0.15, 0], size: [0.035, 0.26], color: "#999999" }, // Leg L
        { type: "cylinder", position: [0.04, 0.15, 0], size: [0.035, 0.26], color: "#999999" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 12,
  },

  // 47. Ghoul - Undead feeder
  {
    type: EnemyType.Ghoul,
    name: "Ghoul",
    description: "A ravenous ghoul. Heals when it kills.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 75,
      speed: 1.2,
      armor: 2,
      magicResistance: 8,
      bounty: 18,
      score: 30,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.85,
      parts: [
        { type: "sphere", position: [0, 0.68, 0], size: [0.11], color: "#5a5a5a" }, // Head
        { type: "box", position: [0, 0.44, 0], size: [0.12, 0.18, 0.08], color: "#505050" }, // Torso
        { type: "cylinder", position: [-0.1, 0.4, 0], rotation: [0, 0, 0.5], size: [0.028, 0.18], color: "#555555" }, // Arm L
        { type: "cylinder", position: [0.1, 0.4, 0], rotation: [0, 0, -0.5], size: [0.028, 0.18], color: "#555555" }, // Arm R
        { type: "cylinder", position: [-0.04, 0.14, 0], size: [0.032, 0.24], color: "#505050" }, // Leg L
        { type: "cylinder", position: [0.04, 0.14, 0], size: [0.032, 0.24], color: "#505050" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 10,
  },

  // 48. Vampire - Blood drinker
  {
    type: EnemyType.Vampire,
    name: "Vampire",
    description: "An ancient vampire. Drains life force.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 110,
      speed: 1.3,
      armor: 3,
      magicResistance: 15,
      bounty: 35,
      score: 55,
    },
    specialAbility: {
      type: SpecialAbilityType.Regenerate,
      cooldown: 2000,
      strength: 8,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 0.95,
      parts: [
        { type: "sphere", position: [0, 0.76, 0], size: [0.1], color: "#777777" }, // Head
        { type: "box", position: [0, 0.5, 0], size: [0.14, 0.22, 0.08], color: "#333333" }, // Torso (cape)
        { type: "box", position: [-0.12, 0.4, 0.06], rotation: [0, 0.3, 0.5], size: [0.18, 0.25, 0.01], color: "#222222" }, // Cape L
        { type: "box", position: [0.12, 0.4, 0.06], rotation: [0, -0.3, -0.5], size: [0.18, 0.25, 0.01], color: "#222222" }, // Cape R
        { type: "cylinder", position: [-0.04, 0.16, 0], size: [0.035, 0.28], color: "#333333" }, // Leg L
        { type: "cylinder", position: [0.04, 0.16, 0], size: [0.035, 0.28], color: "#333333" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 20,
  },

  // 49. Ogre - Giant humanoid
  {
    type: EnemyType.Ogre,
    name: "Ogre",
    description: "A massive ogre. Slow but devastating.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 220,
      speed: 0.5,
      armor: 7,
      magicResistance: 3,
      bounty: 38,
      score: 60,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.3,
      parts: [
        { type: "sphere", position: [0, 0.9, 0], size: [0.16, 0.14, 0.14], color: "#5a5a5a" }, // Head
        { type: "box", position: [0, 0.58, 0], size: [0.28, 0.34, 0.18], color: "#505050" }, // Torso
        { type: "cylinder", position: [-0.2, 0.52, 0], rotation: [0, 0, 0.25], size: [0.06, 0.28], color: "#555555" }, // Arm L
        { type: "cylinder", position: [0.2, 0.52, 0], rotation: [0, 0, -0.35], size: [0.06, 0.28], color: "#555555" }, // Arm R
        { type: "cylinder", position: [0.26, 0.28, 0], rotation: [0, 0, -0.5], size: [0.04, 0.3], color: "#666666" }, // Club
        { type: "cylinder", position: [-0.08, 0.19, 0], size: [0.065, 0.34], color: "#505050" }, // Leg L
        { type: "cylinder", position: [0.08, 0.19, 0], size: [0.065, 0.34], color: "#505050" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 14,
  },

  // 50. Cyclops - One-eyed giant
  {
    type: EnemyType.Cyclops,
    name: "Cyclops",
    description: "A one-eyed giant. Immense strength.",
    category: EnemyCategory.Ground,
    baseStats: {
      maxHealth: 350,
      speed: 0.4,
      armor: 10,
      magicResistance: 5,
      bounty: 50,
      score: 80,
    },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.5,
      parts: [
        { type: "sphere", position: [0, 1.0, 0], size: [0.18, 0.16, 0.16], color: "#555555" }, // Head
        { type: "sphere", position: [0.1, 1.02, 0], size: [0.06], color: "#222222" }, // Eye
        { type: "box", position: [0, 0.65, 0], size: [0.32, 0.4, 0.2], color: "#4a4a4a" }, // Torso
        { type: "cylinder", position: [-0.24, 0.58, 0], rotation: [0, 0, 0.2], size: [0.07, 0.32], color: "#505050" }, // Arm L
        { type: "cylinder", position: [0.24, 0.58, 0], rotation: [0, 0, -0.2], size: [0.07, 0.32], color: "#505050" }, // Arm R
        { type: "cylinder", position: [-0.1, 0.2, 0], size: [0.08, 0.38], color: "#4a4a4a" }, // Leg L
        { type: "cylinder", position: [0.1, 0.2, 0], size: [0.08, 0.38], color: "#4a4a4a" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 23,
  },
];

// ============================================================================
// FLYING ENEMIES (30 total)
// ============================================================================

const FLYING_ENEMIES: EnemyDefinition[] = [
  // 51. Bat - Basic flyer
  {
    type: EnemyType.Bat,
    name: "Bat",
    description: "A common bat. Quick and erratic.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 25,
      speed: 1.8,
      armor: 0,
      magicResistance: 1,
      bounty: 8,
      score: 14,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.5,
      parts: [
        { type: "sphere", position: [0, 0.5, 0], size: [0.08, 0.06, 0.06], color: "#444444" }, // Body
        { type: "sphere", position: [0.06, 0.52, 0], size: [0.04], color: "#555555" }, // Head
        { type: "box", position: [0, 0.5, 0.1], rotation: [0.2, 0, 0.3], size: [0.12, 0.01, 0.1], color: "#333333" }, // Wing L
        { type: "box", position: [0, 0.5, -0.1], rotation: [-0.2, 0, 0.3], size: [0.12, 0.01, 0.1], color: "#333333" }, // Wing R
      ],
    },
    isBoss: false,
    unlockWave: 3,
  },

  // 52. Giant Bat - Larger bat
  {
    type: EnemyType.GiantBat,
    name: "Giant Bat",
    description: "A massive bat. Dive bombs targets.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 60,
      speed: 1.5,
      armor: 1,
      magicResistance: 2,
      bounty: 16,
      score: 28,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.8,
      parts: [
        { type: "sphere", position: [0, 0.6, 0], size: [0.12, 0.1, 0.1], color: "#3a3a3a" }, // Body
        { type: "sphere", position: [0.1, 0.64, 0], size: [0.06], color: "#444444" }, // Head
        { type: "cone", position: [0.05, 0.7, 0.04], rotation: [0.2, 0, 0.3], size: [0.03, 0.05], color: "#4a4a4a" }, // Ear L
        { type: "cone", position: [0.05, 0.7, -0.04], rotation: [-0.2, 0, 0.3], size: [0.03, 0.05], color: "#4a4a4a" }, // Ear R
        { type: "box", position: [0, 0.58, 0.16], rotation: [0.2, 0, 0.25], size: [0.18, 0.01, 0.15], color: "#333333" }, // Wing L
        { type: "box", position: [0, 0.58, -0.16], rotation: [-0.2, 0, 0.25], size: [0.18, 0.01, 0.15], color: "#333333" }, // Wing R
      ],
    },
    isBoss: false,
    unlockWave: 9,
  },

  // 53. Raven - Dark bird
  {
    type: EnemyType.Raven,
    name: "Raven",
    description: "An ominous raven. Fast flyer.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 30,
      speed: 2.0,
      armor: 0,
      magicResistance: 2,
      bounty: 10,
      score: 18,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.5,
      parts: [
        { type: "sphere", position: [0, 0.5, 0], size: [0.08, 0.06, 0.05], color: "#333333" }, // Body
        { type: "sphere", position: [0.06, 0.52, 0], size: [0.04], color: "#3a3a3a" }, // Head
        { type: "cone", position: [0.1, 0.52, 0], rotation: [0, 0, -1.57], size: [0.015, 0.04], color: "#555555" }, // Beak
        { type: "box", position: [-0.02, 0.5, 0.08], rotation: [0.1, 0, 0.2], size: [0.1, 0.01, 0.07], color: "#2a2a2a" }, // Wing L
        { type: "box", position: [-0.02, 0.5, -0.08], rotation: [-0.1, 0, 0.2], size: [0.1, 0.01, 0.07], color: "#2a2a2a" }, // Wing R
        { type: "cone", position: [-0.1, 0.48, 0], rotation: [0, 0, 1.3], size: [0.025, 0.06], color: "#333333" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 5,
  },

  // 54. Murder Crow - Aggressive bird
  {
    type: EnemyType.MurderCrow,
    name: "Murder Crow",
    description: "A vicious crow. Attacks in swarms.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 45,
      speed: 1.9,
      armor: 1,
      magicResistance: 3,
      bounty: 15,
      score: 26,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.6,
      parts: [
        { type: "sphere", position: [0, 0.55, 0], size: [0.1, 0.07, 0.06], color: "#2a2a2a" }, // Body
        { type: "sphere", position: [0.08, 0.58, 0], size: [0.05], color: "#333333" }, // Head
        { type: "cone", position: [0.13, 0.58, 0], rotation: [0, 0, -1.57], size: [0.02, 0.05], color: "#555555" }, // Beak
        { type: "box", position: [-0.02, 0.54, 0.1], rotation: [0.1, 0, 0.2], size: [0.12, 0.01, 0.09], color: "#222222" }, // Wing L
        { type: "box", position: [-0.02, 0.54, -0.1], rotation: [-0.1, 0, 0.2], size: [0.12, 0.01, 0.09], color: "#222222" }, // Wing R
        { type: "cone", position: [-0.12, 0.52, 0], rotation: [0, 0, 1.3], size: [0.03, 0.08], color: "#2a2a2a" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 11,
  },

  // 55. Wasp - Stinging insect
  {
    type: EnemyType.Wasp,
    name: "Wasp",
    description: "An angry wasp. Fast stinger.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 22,
      speed: 2.2,
      armor: 0,
      magicResistance: 0,
      bounty: 8,
      score: 14,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.4,
      parts: [
        { type: "sphere", position: [0, 0.5, 0], size: [0.06, 0.04, 0.04], color: "#555555" }, // Thorax
        { type: "sphere", position: [0.06, 0.5, 0], size: [0.035], color: "#666666" }, // Head
        { type: "sphere", position: [-0.06, 0.48, 0], size: [0.05, 0.035, 0.035], color: "#444444" }, // Abdomen
        { type: "cone", position: [-0.12, 0.46, 0], rotation: [0, 0, 1.57], size: [0.015, 0.04], color: "#777777" }, // Stinger
        { type: "box", position: [0, 0.54, 0.05], rotation: [0.3, 0, 0], size: [0.05, 0.005, 0.06], color: "#888888" }, // Wing L
        { type: "box", position: [0, 0.54, -0.05], rotation: [-0.3, 0, 0], size: [0.05, 0.005, 0.06], color: "#888888" }, // Wing R
      ],
    },
    isBoss: false,
    unlockWave: 4,
  },

  // 56. Giant Wasp - Large wasp
  {
    type: EnemyType.GiantWasp,
    name: "Giant Wasp",
    description: "A massive wasp. Deadly venom.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 55,
      speed: 1.8,
      armor: 2,
      magicResistance: 1,
      bounty: 18,
      score: 30,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.7,
      parts: [
        { type: "sphere", position: [0, 0.6, 0], size: [0.1, 0.07, 0.07], color: "#4a4a4a" }, // Thorax
        { type: "sphere", position: [0.1, 0.6, 0], size: [0.055], color: "#555555" }, // Head
        { type: "sphere", position: [-0.1, 0.56, 0], size: [0.08, 0.055, 0.055], color: "#3a3a3a" }, // Abdomen
        { type: "cone", position: [-0.2, 0.52, 0], rotation: [0, 0, 1.57], size: [0.025, 0.07], color: "#666666" }, // Stinger
        { type: "box", position: [0, 0.66, 0.09], rotation: [0.3, 0, 0], size: [0.08, 0.005, 0.1], color: "#777777" }, // Wing L
        { type: "box", position: [0, 0.66, -0.09], rotation: [-0.3, 0, 0], size: [0.08, 0.005, 0.1], color: "#777777" }, // Wing R
      ],
    },
    isBoss: false,
    unlockWave: 13,
  },

  // 57. Mosquito - Blood sucker
  {
    type: EnemyType.Mosquito,
    name: "Mosquito",
    description: "A giant mosquito. Drains life.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 20,
      speed: 2.3,
      armor: 0,
      magicResistance: 0,
      bounty: 7,
      score: 12,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.4,
      parts: [
        { type: "sphere", position: [0, 0.5, 0], size: [0.05, 0.03, 0.03], color: "#5a5a5a" }, // Body
        { type: "sphere", position: [0.04, 0.5, 0], size: [0.03], color: "#666666" }, // Head
        { type: "cylinder", position: [0.08, 0.49, 0], rotation: [0, 0, -1.57], size: [0.005, 0.05], color: "#777777" }, // Proboscis
        { type: "box", position: [0, 0.54, 0.04], rotation: [0.2, 0, 0], size: [0.04, 0.003, 0.05], color: "#888888" }, // Wing L
        { type: "box", position: [0, 0.54, -0.04], rotation: [-0.2, 0, 0], size: [0.04, 0.003, 0.05], color: "#888888" }, // Wing R
      ],
    },
    isBoss: false,
    unlockWave: 3,
  },

  // 58. Blood Mosquito - Vampire variant
  {
    type: EnemyType.BloodMosquito,
    name: "Blood Mosquito",
    description: "A bloated mosquito. Heals as it attacks.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 40,
      speed: 2.0,
      armor: 0,
      magicResistance: 2,
      bounty: 14,
      score: 24,
    },
    specialAbility: {
      type: SpecialAbilityType.Regenerate,
      cooldown: 3000,
      strength: 5,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.55,
      parts: [
        { type: "sphere", position: [0, 0.55, 0], size: [0.07, 0.05, 0.05], color: "#4a4a4a" }, // Body
        { type: "sphere", position: [0.06, 0.55, 0], size: [0.04], color: "#555555" }, // Head
        { type: "cylinder", position: [0.12, 0.54, 0], rotation: [0, 0, -1.57], size: [0.008, 0.07], color: "#666666" }, // Proboscis
        { type: "sphere", position: [-0.04, 0.52, 0], size: [0.05, 0.04, 0.04], color: "#555555" }, // Abdomen
        { type: "box", position: [0.02, 0.6, 0.06], rotation: [0.2, 0, 0], size: [0.06, 0.003, 0.07], color: "#777777" }, // Wing L
        { type: "box", position: [0.02, 0.6, -0.06], rotation: [-0.2, 0, 0], size: [0.06, 0.003, 0.07], color: "#777777" }, // Wing R
      ],
    },
    isBoss: false,
    unlockWave: 10,
  },

  // 59. Harpy - Bird woman
  {
    type: EnemyType.Harpy,
    name: "Harpy",
    description: "A shrieking harpy. Dive attacks.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 70,
      speed: 1.6,
      armor: 2,
      magicResistance: 4,
      bounty: 20,
      score: 34,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.9,
      parts: [
        { type: "sphere", position: [0, 0.7, 0], size: [0.1], color: "#777777" }, // Head
        { type: "box", position: [0, 0.5, 0], size: [0.1, 0.18, 0.08], color: "#666666" }, // Torso
        { type: "box", position: [0, 0.55, 0.15], rotation: [0.2, 0, 0.4], size: [0.2, 0.02, 0.12], color: "#555555" }, // Wing L
        { type: "box", position: [0, 0.55, -0.15], rotation: [-0.2, 0, 0.4], size: [0.2, 0.02, 0.12], color: "#555555" }, // Wing R
        { type: "cylinder", position: [-0.03, 0.32, 0.04], rotation: [0.3, 0, 0], size: [0.025, 0.15], color: "#5a5a5a" }, // Leg L
        { type: "cylinder", position: [-0.03, 0.32, -0.04], rotation: [-0.3, 0, 0], size: [0.025, 0.15], color: "#5a5a5a" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 12,
  },

  // 60. Harpy Queen - Elite harpy
  {
    type: EnemyType.HarpyQueen,
    name: "Harpy Queen",
    description: "Queen of the harpies. Commands her flock.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 140,
      speed: 1.4,
      armor: 4,
      magicResistance: 8,
      bounty: 38,
      score: 60,
    },
    specialAbility: {
      type: SpecialAbilityType.Summon,
      cooldown: 8000,
      strength: 2,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 1.1,
      parts: [
        { type: "sphere", position: [0, 0.8, 0], size: [0.12], color: "#888888" }, // Head
        { type: "cone", position: [0, 0.9, 0], size: [0.06, 0.08], color: "#999999" }, // Crown
        { type: "box", position: [0, 0.58, 0], size: [0.12, 0.22, 0.1], color: "#777777" }, // Torso
        { type: "box", position: [0, 0.64, 0.2], rotation: [0.2, 0, 0.35], size: [0.26, 0.02, 0.16], color: "#666666" }, // Wing L
        { type: "box", position: [0, 0.64, -0.2], rotation: [-0.2, 0, 0.35], size: [0.26, 0.02, 0.16], color: "#666666" }, // Wing R
        { type: "cylinder", position: [-0.04, 0.36, 0.05], rotation: [0.3, 0, 0], size: [0.03, 0.18], color: "#6a6a6a" }, // Leg L
        { type: "cylinder", position: [-0.04, 0.36, -0.05], rotation: [-0.3, 0, 0], size: [0.03, 0.18], color: "#6a6a6a" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 22,
  },

  // 61. Griffin - Lion-eagle
  {
    type: EnemyType.Griffin,
    name: "Griffin",
    description: "A majestic griffin. Powerful flyer.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 120,
      speed: 1.5,
      armor: 5,
      magicResistance: 5,
      bounty: 32,
      score: 52,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 1.2,
      parts: [
        { type: "sphere", position: [0.2, 0.75, 0], size: [0.1, 0.08, 0.08], color: "#888888" }, // Head
        { type: "cone", position: [0.28, 0.74, 0], rotation: [0, 0, -1.57], size: [0.03, 0.06], color: "#999999" }, // Beak
        { type: "sphere", position: [0, 0.65, 0], size: [0.18, 0.12, 0.12], color: "#777777" }, // Body
        { type: "box", position: [0, 0.72, 0.2], rotation: [0.15, 0, 0.3], size: [0.22, 0.02, 0.18], color: "#666666" }, // Wing L
        { type: "box", position: [0, 0.72, -0.2], rotation: [-0.15, 0, 0.3], size: [0.22, 0.02, 0.18], color: "#666666" }, // Wing R
        { type: "cylinder", position: [0.08, 0.5, 0.08], size: [0.035, 0.2], color: "#6a6a6a" }, // Leg FL
        { type: "cylinder", position: [0.08, 0.5, -0.08], size: [0.035, 0.2], color: "#6a6a6a" }, // Leg FR
        { type: "cylinder", position: [-0.1, 0.5, 0.08], size: [0.035, 0.2], color: "#6a6a6a" }, // Leg BL
        { type: "cylinder", position: [-0.1, 0.5, -0.08], size: [0.035, 0.2], color: "#6a6a6a" }, // Leg BR
        { type: "cone", position: [-0.2, 0.6, 0], rotation: [0, 0, 1.3], size: [0.04, 0.15], color: "#777777" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 18,
  },

  // 62. Gargoyle - Stone flyer
  {
    type: EnemyType.Gargoyle,
    name: "Gargoyle",
    description: "A living gargoyle. Stone skin.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 100,
      speed: 1.1,
      armor: 10,
      magicResistance: 6,
      bounty: 28,
      score: 45,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 1.0,
      parts: [
        { type: "sphere", position: [0, 0.75, 0], size: [0.12], color: "#5a5a5a", flatShading: true }, // Head
        { type: "cone", position: [0.05, 0.82, 0.06], rotation: [0.3, 0, 0.3], size: [0.025, 0.05], color: "#666666" }, // Horn L
        { type: "cone", position: [0.05, 0.82, -0.06], rotation: [-0.3, 0, 0.3], size: [0.025, 0.05], color: "#666666" }, // Horn R
        { type: "box", position: [0, 0.55, 0], size: [0.14, 0.2, 0.1], color: "#505050", flatShading: true }, // Torso
        { type: "box", position: [0, 0.6, 0.18], rotation: [0.2, 0, 0.5], size: [0.2, 0.02, 0.14], color: "#4a4a4a", flatShading: true }, // Wing L
        { type: "box", position: [0, 0.6, -0.18], rotation: [-0.2, 0, 0.5], size: [0.2, 0.02, 0.14], color: "#4a4a4a", flatShading: true }, // Wing R
        { type: "cylinder", position: [-0.04, 0.35, 0.05], size: [0.035, 0.18], color: "#555555" }, // Leg L
        { type: "cylinder", position: [-0.04, 0.35, -0.05], size: [0.035, 0.18], color: "#555555" }, // Leg R
      ],
    },
    isBoss: false,
    unlockWave: 16,
  },

  // 63. Flying Imp - Airborne imp
  {
    type: EnemyType.FlyingImp,
    name: "Flying Imp",
    description: "An imp with bat wings. Agile flyer.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 35,
      speed: 1.9,
      armor: 1,
      magicResistance: 4,
      bounty: 12,
      score: 20,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.55,
      parts: [
        { type: "sphere", position: [0, 0.55, 0], size: [0.08], color: "#555555" }, // Head
        { type: "cone", position: [0.03, 0.6, 0.04], rotation: [0.3, 0, 0.4], size: [0.02, 0.04], color: "#666666" }, // Horn L
        { type: "cone", position: [0.03, 0.6, -0.04], rotation: [-0.3, 0, 0.4], size: [0.02, 0.04], color: "#666666" }, // Horn R
        { type: "box", position: [0, 0.42, 0], size: [0.07, 0.1, 0.05], color: "#4a4a4a" }, // Torso
        { type: "box", position: [0, 0.48, 0.1], rotation: [0.2, 0, 0.3], size: [0.1, 0.01, 0.08], color: "#3a3a3a" }, // Wing L
        { type: "box", position: [0, 0.48, -0.1], rotation: [-0.2, 0, 0.3], size: [0.1, 0.01, 0.08], color: "#3a3a3a" }, // Wing R
        { type: "cone", position: [-0.06, 0.38, 0], rotation: [0, 0, 1.2], size: [0.015, 0.08], color: "#555555" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 7,
  },

  // 64. Demon Flyer - Larger flying demon
  {
    type: EnemyType.DemonFlyer,
    name: "Demon Flyer",
    description: "A flying demon. Spreads terror.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 90,
      speed: 1.5,
      armor: 4,
      magicResistance: 8,
      bounty: 28,
      score: 45,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.9,
      parts: [
        { type: "sphere", position: [0, 0.7, 0], size: [0.1], color: "#444444" }, // Head
        { type: "cone", position: [0.04, 0.78, 0.06], rotation: [0.3, 0, 0.3], size: [0.03, 0.08], color: "#555555" }, // Horn L
        { type: "cone", position: [0.04, 0.78, -0.06], rotation: [-0.3, 0, 0.3], size: [0.03, 0.08], color: "#555555" }, // Horn R
        { type: "box", position: [0, 0.52, 0], size: [0.12, 0.16, 0.08], color: "#3a3a3a" }, // Torso
        { type: "box", position: [0, 0.58, 0.15], rotation: [0.2, 0, 0.35], size: [0.18, 0.015, 0.12], color: "#333333" }, // Wing L
        { type: "box", position: [0, 0.58, -0.15], rotation: [-0.2, 0, 0.35], size: [0.18, 0.015, 0.12], color: "#333333" }, // Wing R
        { type: "cylinder", position: [-0.03, 0.35, 0.04], size: [0.03, 0.14], color: "#3a3a3a" }, // Leg L
        { type: "cylinder", position: [-0.03, 0.35, -0.04], size: [0.03, 0.14], color: "#3a3a3a" }, // Leg R
        { type: "cone", position: [-0.1, 0.42, 0], rotation: [0, 0, 1.3], size: [0.025, 0.12], color: "#444444" }, // Tail
      ],
    },
    isBoss: false,
    unlockWave: 17,
  },

  // 65. Pixie - Tiny fairy
  {
    type: EnemyType.Pixie,
    name: "Pixie",
    description: "A mischievous pixie. Very fast.",
    category: EnemyCategory.Flying,
    baseStats: {
      maxHealth: 18,
      speed: 2.5,
      armor: 0,
      magicResistance: 6,
      bounty: 10,
      score: 16,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 0.35,
      parts: [
        { type: "sphere", position: [0, 0.5, 0], size: [0.06], color: "#999999" }, // Head
        { type: "cylinder", position: [0, 0.42, 0], size: [0.025, 0.08], color: "#888888" }, // Body
        { type: "box", position: [0, 0.48, 0.06], rotation: [0.3, 0, 0.2], size: [0.06, 0.005, 0.05], color: "#bbbbbb" }, // Wing L
        { type: "box", position: [0, 0.48, -0.06], rotation: [-0.3, 0, 0.2], size: [0.06, 0.005, 0.05], color: "#bbbbbb" }, // Wing R
      ],
    },
    isBoss: false,
    unlockWave: 6,
  },

  // 66. Dark Pixie - Evil fairy
  {
    type: EnemyType.DarkPixie,
    name: "Dark Pixie",
    description: "A corrupted pixie. Drains magic.",
    category: EnemyCategory.Flying,
    baseStats: { maxHealth: 35, speed: 2.3, armor: 0, magicResistance: 10, bounty: 18, score: 30 },
    meshConfig: { baseShape: "flying", scale: 0.4, parts: [
      { type: "sphere", position: [0, 0.5, 0], size: [0.07], color: "#555555" },
      { type: "cylinder", position: [0, 0.42, 0], size: [0.028, 0.09], color: "#444444" },
      { type: "box", position: [0, 0.48, 0.07], rotation: [0.3, 0, 0.2], size: [0.07, 0.005, 0.06], color: "#666666" },
      { type: "box", position: [0, 0.48, -0.07], rotation: [-0.3, 0, 0.2], size: [0.07, 0.005, 0.06], color: "#666666" },
    ]},
    isBoss: false,
    unlockWave: 14,
  },

  // 67. Phoenix - Fire bird
  {
    type: EnemyType.Phoenix,
    name: "Phoenix",
    description: "A legendary phoenix. Resurrects once.",
    category: EnemyCategory.Flying,
    baseStats: { maxHealth: 80, speed: 1.7, armor: 2, magicResistance: 12, bounty: 35, score: 55 },
    specialAbility: { type: SpecialAbilityType.Resurrect, cooldown: 0, strength: 0.5 },
    meshConfig: { baseShape: "flying", scale: 1.0, parts: [
      { type: "sphere", position: [0.1, 0.7, 0], size: [0.08], color: "#999999" },
      { type: "sphere", position: [0, 0.62, 0], size: [0.12, 0.1, 0.1], color: "#888888" },
      { type: "box", position: [0, 0.68, 0.18], rotation: [0.2, 0, 0.35], size: [0.2, 0.02, 0.14], color: "#aaaaaa" },
      { type: "box", position: [0, 0.68, -0.18], rotation: [-0.2, 0, 0.35], size: [0.2, 0.02, 0.14], color: "#aaaaaa" },
      { type: "cone", position: [-0.15, 0.58, 0], rotation: [0, 0, 1.3], size: [0.05, 0.2], color: "#999999" },
    ]},
    isBoss: false,
    unlockWave: 21,
  },

  // 68. Cockatrice - Petrifying bird
  {
    type: EnemyType.Cockatrice,
    name: "Cockatrice",
    description: "A deadly cockatrice. Slows on hit.",
    category: EnemyCategory.Flying,
    baseStats: { maxHealth: 75, speed: 1.4, armor: 3, magicResistance: 5, bounty: 25, score: 40 },
    meshConfig: { baseShape: "flying", scale: 0.85, parts: [
      { type: "sphere", position: [0.1, 0.65, 0], size: [0.08], color: "#666666" },
      { type: "cone", position: [0.16, 0.65, 0], rotation: [0, 0, -1.57], size: [0.025, 0.05], color: "#777777" },
      { type: "sphere", position: [0, 0.58, 0], size: [0.12, 0.08, 0.08], color: "#555555" },
      { type: "box", position: [0, 0.62, 0.14], rotation: [0.2, 0, 0.3], size: [0.15, 0.015, 0.1], color: "#4a4a4a" },
      { type: "box", position: [0, 0.62, -0.14], rotation: [-0.2, 0, 0.3], size: [0.15, 0.015, 0.1], color: "#4a4a4a" },
      { type: "cone", position: [-0.12, 0.55, 0], rotation: [0, 0, 1.3], size: [0.04, 0.12], color: "#5a5a5a" },
    ]},
    isBoss: false,
    unlockWave: 15,
  },

  // 69. Wyvern - Two-legged dragon
  {
    type: EnemyType.Wyvern,
    name: "Wyvern",
    description: "A fierce wyvern. Powerful flyer.",
    category: EnemyCategory.Flying,
    baseStats: { maxHealth: 110, speed: 1.4, armor: 5, magicResistance: 6, bounty: 30, score: 48 },
    meshConfig: { baseShape: "flying", scale: 1.1, parts: [
      { type: "sphere", position: [0.2, 0.72, 0], size: [0.1, 0.08, 0.08], color: "#505050" },
      { type: "cone", position: [0.28, 0.7, 0], rotation: [0, 0, -1.57], size: [0.035, 0.08], color: "#5a5a5a" },
      { type: "sphere", position: [0, 0.65, 0], size: [0.16, 0.12, 0.1], color: "#444444" },
      { type: "box", position: [0.05, 0.72, 0.2], rotation: [0.15, 0, 0.3], size: [0.24, 0.02, 0.16], color: "#3a3a3a" },
      { type: "box", position: [0.05, 0.72, -0.2], rotation: [-0.15, 0, 0.3], size: [0.24, 0.02, 0.16], color: "#3a3a3a" },
      { type: "cylinder", position: [-0.06, 0.5, 0.06], size: [0.035, 0.2], color: "#4a4a4a" },
      { type: "cylinder", position: [-0.06, 0.5, -0.06], size: [0.035, 0.2], color: "#4a4a4a" },
      { type: "cone", position: [-0.2, 0.6, 0], rotation: [0, 0, 1.3], size: [0.04, 0.18], color: "#444444" },
    ]},
    isBoss: false,
    unlockWave: 19,
  },

  // 70. Poison Wyvern - Toxic wyvern
  {
    type: EnemyType.WyvernPoison,
    name: "Poison Wyvern",
    description: "A venomous wyvern. Deadly poison.",
    category: EnemyCategory.Flying,
    baseStats: { maxHealth: 100, speed: 1.5, armor: 4, magicResistance: 7, bounty: 32, score: 52 },
    meshConfig: { baseShape: "flying", scale: 1.1, parts: [
      { type: "sphere", position: [0.2, 0.72, 0], size: [0.1, 0.08, 0.08], color: "#606060" },
      { type: "cone", position: [0.28, 0.7, 0], rotation: [0, 0, -1.57], size: [0.035, 0.08], color: "#6a6a6a" },
      { type: "sphere", position: [0, 0.65, 0], size: [0.16, 0.12, 0.1], color: "#555555" },
      { type: "box", position: [0.05, 0.72, 0.2], rotation: [0.15, 0, 0.3], size: [0.24, 0.02, 0.16], color: "#4a4a4a" },
      { type: "box", position: [0.05, 0.72, -0.2], rotation: [-0.15, 0, 0.3], size: [0.24, 0.02, 0.16], color: "#4a4a4a" },
      { type: "cone", position: [-0.2, 0.6, 0], rotation: [0, 0, 1.3], size: [0.04, 0.18], color: "#555555" },
    ]},
    isBoss: false,
    unlockWave: 23,
  },

  // 71-80: Remaining flying enemies (compact)
  { type: EnemyType.DragonWhelp, name: "Dragon Whelp", description: "A young dragon. Still dangerous.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 85, speed: 1.6, armor: 4, magicResistance: 6, bounty: 28, score: 45 },
    meshConfig: { baseShape: "flying", scale: 0.9, parts: [
      { type: "sphere", position: [0.15, 0.65, 0], size: [0.1], color: "#555555" },
      { type: "sphere", position: [0, 0.58, 0], size: [0.14, 0.1, 0.1], color: "#4a4a4a" },
      { type: "box", position: [0, 0.64, 0.16], rotation: [0.15, 0, 0.3], size: [0.18, 0.02, 0.12], color: "#3a3a3a" },
      { type: "box", position: [0, 0.64, -0.16], rotation: [-0.15, 0, 0.3], size: [0.18, 0.02, 0.12], color: "#3a3a3a" },
    ]}, isBoss: false, unlockWave: 16 },

  { type: EnemyType.FrostDrake, name: "Frost Drake", description: "An ice drake. Freezes targets.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 95, speed: 1.3, armor: 5, magicResistance: 10, bounty: 32, score: 50 },
    meshConfig: { baseShape: "flying", scale: 1.0, parts: [
      { type: "sphere", position: [0.18, 0.7, 0], size: [0.11], color: "#aaaaaa" },
      { type: "sphere", position: [0, 0.62, 0], size: [0.16, 0.11, 0.11], color: "#999999" },
      { type: "box", position: [0, 0.68, 0.18], rotation: [0.15, 0, 0.32], size: [0.2, 0.02, 0.14], color: "#888888" },
      { type: "box", position: [0, 0.68, -0.18], rotation: [-0.15, 0, 0.32], size: [0.2, 0.02, 0.14], color: "#888888" },
    ]}, isBoss: false, unlockWave: 20 },

  { type: EnemyType.FireDrake, name: "Fire Drake", description: "A fire drake. Burns on contact.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 90, speed: 1.4, armor: 4, magicResistance: 8, bounty: 30, score: 48 },
    meshConfig: { baseShape: "flying", scale: 1.0, parts: [
      { type: "sphere", position: [0.18, 0.7, 0], size: [0.11], color: "#777777" },
      { type: "sphere", position: [0, 0.62, 0], size: [0.16, 0.11, 0.11], color: "#666666" },
      { type: "box", position: [0, 0.68, 0.18], rotation: [0.15, 0, 0.32], size: [0.2, 0.02, 0.14], color: "#555555" },
      { type: "box", position: [0, 0.68, -0.18], rotation: [-0.15, 0, 0.32], size: [0.2, 0.02, 0.14], color: "#555555" },
    ]}, isBoss: false, unlockWave: 19 },

  { type: EnemyType.Specter, name: "Specter", description: "A ghostly specter. Phases through.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 50, speed: 1.8, armor: 0, magicResistance: 18, bounty: 22, score: 36 },
    specialAbility: { type: SpecialAbilityType.Phase, cooldown: 5000, duration: 2000 },
    meshConfig: { baseShape: "flying", scale: 0.8, parts: [
      { type: "sphere", position: [0, 0.6, 0], size: [0.1], color: "#cccccc" },
      { type: "cone", position: [0, 0.4, 0], size: [0.14, 0.35], color: "#bbbbbb" },
    ]}, isBoss: false, unlockWave: 14 },

  { type: EnemyType.Banshee, name: "Banshee", description: "A wailing banshee. Terrifying scream.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 65, speed: 1.6, armor: 0, magicResistance: 15, bounty: 26, score: 42 },
    meshConfig: { baseShape: "flying", scale: 0.9, parts: [
      { type: "sphere", position: [0, 0.65, 0], size: [0.1], color: "#bbbbbb" },
      { type: "cone", position: [0, 0.42, 0], size: [0.16, 0.4], color: "#aaaaaa" },
      { type: "cylinder", position: [-0.08, 0.55, 0], rotation: [0, 0, 0.6], size: [0.025, 0.15], color: "#cccccc" },
      { type: "cylinder", position: [0.08, 0.55, 0], rotation: [0, 0, -0.6], size: [0.025, 0.15], color: "#cccccc" },
    ]}, isBoss: false, unlockWave: 17 },

  { type: EnemyType.FlyingSkull, name: "Flying Skull", description: "An animated skull. Fast flyer.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 30, speed: 2.0, armor: 2, magicResistance: 8, bounty: 12, score: 20 },
    meshConfig: { baseShape: "flying", scale: 0.5, parts: [
      { type: "sphere", position: [0, 0.5, 0], size: [0.12], color: "#dddddd" },
      { type: "sphere", position: [0.04, 0.52, 0.04], size: [0.025], color: "#222222" },
      { type: "sphere", position: [0.04, 0.52, -0.04], size: [0.025], color: "#222222" },
    ]}, isBoss: false, unlockWave: 8 },

  { type: EnemyType.GhostLantern, name: "Ghost Lantern", description: "A floating lantern. Guides lost souls.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 45, speed: 1.4, armor: 1, magicResistance: 12, bounty: 18, score: 30 },
    meshConfig: { baseShape: "flying", scale: 0.6, parts: [
      { type: "box", position: [0, 0.55, 0], size: [0.08, 0.12, 0.08], color: "#777777" },
      { type: "sphere", position: [0, 0.55, 0], size: [0.05], color: "#eeeeee" },
      { type: "cylinder", position: [0, 0.66, 0], size: [0.01, 0.06], color: "#666666" },
    ]}, isBoss: false, unlockWave: 11 },

  { type: EnemyType.EyeBeast, name: "Eye Beast", description: "A floating eye. Sees all.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 55, speed: 1.2, armor: 2, magicResistance: 10, bounty: 20, score: 34 },
    meshConfig: { baseShape: "flying", scale: 0.7, parts: [
      { type: "sphere", position: [0, 0.55, 0], size: [0.15], color: "#666666" },
      { type: "sphere", position: [0.08, 0.55, 0], size: [0.08], color: "#ffffff" },
      { type: "sphere", position: [0.1, 0.55, 0], size: [0.04], color: "#111111" },
    ]}, isBoss: false, unlockWave: 13 },

  { type: EnemyType.Moth, name: "Giant Moth", description: "A large moth. Attracted to light.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 28, speed: 1.9, armor: 0, magicResistance: 3, bounty: 9, score: 15 },
    meshConfig: { baseShape: "flying", scale: 0.5, parts: [
      { type: "sphere", position: [0, 0.5, 0], size: [0.06, 0.04, 0.04], color: "#7a7a7a" },
      { type: "sphere", position: [0.05, 0.5, 0], size: [0.035], color: "#888888" },
      { type: "box", position: [0, 0.52, 0.08], rotation: [0.3, 0, 0], size: [0.08, 0.005, 0.08], color: "#6a6a6a" },
      { type: "box", position: [0, 0.52, -0.08], rotation: [-0.3, 0, 0], size: [0.08, 0.005, 0.08], color: "#6a6a6a" },
    ]}, isBoss: false, unlockWave: 5 },

  { type: EnemyType.DeathMoth, name: "Death Moth", description: "A harbinger of death. Ominous presence.", category: EnemyCategory.Flying,
    baseStats: { maxHealth: 65, speed: 1.6, armor: 2, magicResistance: 8, bounty: 22, score: 36 },
    meshConfig: { baseShape: "flying", scale: 0.75, parts: [
      { type: "sphere", position: [0, 0.55, 0], size: [0.08, 0.06, 0.06], color: "#3a3a3a" },
      { type: "sphere", position: [0.07, 0.55, 0], size: [0.05], color: "#444444" },
      { type: "box", position: [0, 0.58, 0.12], rotation: [0.3, 0, 0], size: [0.12, 0.005, 0.12], color: "#333333" },
      { type: "box", position: [0, 0.58, -0.12], rotation: [-0.3, 0, 0], size: [0.12, 0.005, 0.12], color: "#333333" },
    ]}, isBoss: false, unlockWave: 18 },
];

// ============================================================================
// BOSS ENEMIES (20 total)
// ============================================================================

const BOSS_ENEMIES: EnemyDefinition[] = [
  // 81. Skeleton King - Undead lord
  {
    type: EnemyType.SkeletonKing,
    name: "Skeleton King",
    description: "The lord of undead. Commands legions of bones.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 1200,
      speed: 0.5,
      armor: 12,
      magicResistance: 8,
      bounty: 150,
      score: 300,
    },
    specialAbility: { type: SpecialAbilityType.Summon, cooldown: 8000, strength: 3 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.5,
      parts: [
        { type: "sphere", position: [0, 1.1, 0], size: [0.18], color: "#dddddd" }, // Skull
        { type: "sphere", position: [0.06, 1.15, 0.06], size: [0.04], color: "#222222" }, // Eye L
        { type: "sphere", position: [0.06, 1.15, -0.06], size: [0.04], color: "#222222" }, // Eye R
        { type: "cone", position: [0, 1.28, 0], size: [0.22, 0.15], color: "#888888" }, // Crown
        { type: "box", position: [0, 0.8, 0], size: [0.25, 0.35, 0.15], color: "#cccccc" }, // Ribcage
        { type: "cylinder", position: [-0.22, 0.7, 0], rotation: [0, 0, 0.4], size: [0.05, 0.28], color: "#dddddd" }, // Arm L
        { type: "cylinder", position: [0.22, 0.7, 0], rotation: [0, 0, -0.4], size: [0.05, 0.28], color: "#dddddd" }, // Arm R
        { type: "box", position: [0.35, 0.55, 0], size: [0.04, 0.5, 0.04], color: "#999999" }, // Sword
        { type: "cylinder", position: [-0.08, 0.35, 0], size: [0.06, 0.4], color: "#cccccc" }, // Leg L
        { type: "cylinder", position: [0.08, 0.35, 0], size: [0.06, 0.4], color: "#cccccc" }, // Leg R
      ],
    },
    isBoss: true,
    unlockWave: 10,
  },

  // 82. Zombie Lord - Master of the undead
  {
    type: EnemyType.ZombieLord,
    name: "Zombie Lord",
    description: "A massive zombie. Raises fallen enemies.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 1500,
      speed: 0.4,
      armor: 8,
      magicResistance: 6,
      bounty: 180,
      score: 350,
    },
    specialAbility: { type: SpecialAbilityType.Resurrect, cooldown: 12000, strength: 2 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.6,
      parts: [
        { type: "sphere", position: [0, 1.15, 0], size: [0.2], color: "#555555" }, // Head
        { type: "box", position: [0, 0.8, 0], size: [0.35, 0.4, 0.22], color: "#444444" }, // Torso
        { type: "cylinder", position: [-0.28, 0.65, 0], rotation: [0, 0, 0.5], size: [0.08, 0.35], color: "#4a4a4a" }, // Arm L
        { type: "cylinder", position: [0.28, 0.65, 0], rotation: [0, 0, -0.5], size: [0.08, 0.35], color: "#4a4a4a" }, // Arm R
        { type: "cylinder", position: [-0.1, 0.3, 0], size: [0.1, 0.45], color: "#555555" }, // Leg L
        { type: "cylinder", position: [0.1, 0.3, 0], size: [0.1, 0.45], color: "#555555" }, // Leg R
        { type: "sphere", position: [0, 0.85, 0.12], size: [0.08], color: "#3a3a3a" }, // Gut protrusion
      ],
    },
    isBoss: true,
    unlockWave: 15,
  },

  // 83. Goblin Chief - Leader of the goblin horde
  {
    type: EnemyType.GoblinChief,
    name: "Goblin Chief",
    description: "The cunning goblin leader. Buffs nearby goblins.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 900,
      speed: 0.7,
      armor: 10,
      magicResistance: 5,
      bounty: 120,
      score: 250,
    },
    specialAbility: { type: SpecialAbilityType.Speed, cooldown: 6000, duration: 3000, strength: 1.5 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.2,
      parts: [
        { type: "sphere", position: [0, 0.85, 0], size: [0.16], color: "#666666" }, // Head
        { type: "cone", position: [0.08, 0.88, 0.08], size: [0.08, 0.14], color: "#777777" }, // Ear L
        { type: "cone", position: [0.08, 0.88, -0.08], size: [0.08, 0.14], color: "#777777" }, // Ear R
        { type: "cone", position: [0.12, 0.83, 0], rotation: [0, 0, -1.57], size: [0.03, 0.06], color: "#888888" }, // Nose
        { type: "box", position: [0, 0.55, 0], size: [0.18, 0.25, 0.12], color: "#555555" }, // Torso
        { type: "cone", position: [0, 1.0, 0], size: [0.12, 0.18], color: "#999999" }, // Crown
        { type: "cylinder", position: [-0.16, 0.5, 0], rotation: [0, 0, 0.35], size: [0.05, 0.2], color: "#5a5a5a" }, // Arm L
        { type: "cylinder", position: [0.16, 0.5, 0], rotation: [0, 0, -0.35], size: [0.05, 0.2], color: "#5a5a5a" }, // Arm R
        { type: "cylinder", position: [-0.06, 0.2, 0], size: [0.06, 0.25], color: "#666666" }, // Leg L
        { type: "cylinder", position: [0.06, 0.2, 0], size: [0.06, 0.25], color: "#666666" }, // Leg R
      ],
    },
    isBoss: true,
    unlockWave: 8,
  },

  // 84. Orc Warlord - Brutal orc commander
  {
    type: EnemyType.OrcWarlord,
    name: "Orc Warlord",
    description: "A massive orc warrior. Devastating attacks.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 1800,
      speed: 0.45,
      armor: 18,
      magicResistance: 4,
      bounty: 200,
      score: 400,
    },
    specialAbility: { type: SpecialAbilityType.Armor, cooldown: 10000, duration: 5000, strength: 2.0 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.8,
      parts: [
        { type: "sphere", position: [0, 1.2, 0], size: [0.22], color: "#555555" }, // Head
        { type: "cone", position: [0.08, 1.15, 0], rotation: [0, 0, -0.5], size: [0.04, 0.08], color: "#dddddd" }, // Tusk L
        { type: "cone", position: [0.08, 1.15, 0], rotation: [0, 0, 0.5], size: [0.04, 0.08], color: "#dddddd" }, // Tusk R
        { type: "box", position: [0, 0.85, 0], size: [0.4, 0.45, 0.25], color: "#4a4a4a" }, // Torso
        { type: "sphere", position: [0, 0.95, 0.18], size: [0.18, 0.12, 0.1], color: "#666666" }, // Shoulder armor
        { type: "cylinder", position: [-0.32, 0.7, 0], rotation: [0, 0, 0.4], size: [0.1, 0.4], color: "#555555" }, // Arm L
        { type: "cylinder", position: [0.32, 0.7, 0], rotation: [0, 0, -0.4], size: [0.1, 0.4], color: "#555555" }, // Arm R
        { type: "box", position: [0.5, 0.6, 0], rotation: [0, 0, -0.2], size: [0.06, 0.5, 0.15], color: "#777777" }, // Axe
        { type: "cylinder", position: [-0.12, 0.3, 0], size: [0.12, 0.5], color: "#4a4a4a" }, // Leg L
        { type: "cylinder", position: [0.12, 0.3, 0], size: [0.12, 0.5], color: "#4a4a4a" }, // Leg R
      ],
    },
    isBoss: true,
    unlockWave: 20,
  },

  // 85. Spider Queen - Mother of all spiders
  {
    type: EnemyType.SpiderQueen,
    name: "Spider Queen",
    description: "The giant spider matriarch. Spawns spiderlings.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 1400,
      speed: 0.55,
      armor: 10,
      magicResistance: 8,
      bounty: 170,
      score: 340,
    },
    specialAbility: { type: SpecialAbilityType.Summon, cooldown: 7000, strength: 4 },
    meshConfig: {
      baseShape: "insect",
      scale: 1.7,
      parts: [
        { type: "sphere", position: [0.18, 0.5, 0], size: [0.14], color: "#3a3a3a" }, // Head
        { type: "sphere", position: [0.22, 0.54, 0.05], size: [0.04], color: "#ff3333" }, // Eye L
        { type: "sphere", position: [0.22, 0.54, -0.05], size: [0.04], color: "#ff3333" }, // Eye R
        { type: "sphere", position: [0, 0.45, 0], size: [0.22, 0.15, 0.18], color: "#333333" }, // Thorax
        { type: "sphere", position: [-0.3, 0.45, 0], size: [0.28, 0.2, 0.22], color: "#2a2a2a" }, // Abdomen
        { type: "cylinder", position: [0.1, 0.35, 0.2], rotation: [0.8, 0.3, 0], size: [0.03, 0.25], color: "#444444" }, // Leg 1
        { type: "cylinder", position: [0.05, 0.35, 0.22], rotation: [0.6, 0.5, 0], size: [0.03, 0.28], color: "#444444" }, // Leg 2
        { type: "cylinder", position: [-0.05, 0.35, 0.22], rotation: [0.4, 0.7, 0], size: [0.03, 0.28], color: "#444444" }, // Leg 3
        { type: "cylinder", position: [-0.15, 0.35, 0.2], rotation: [0.2, 0.9, 0], size: [0.03, 0.25], color: "#444444" }, // Leg 4
        { type: "cylinder", position: [0.1, 0.35, -0.2], rotation: [-0.8, -0.3, 0], size: [0.03, 0.25], color: "#444444" }, // Leg 5
        { type: "cylinder", position: [0.05, 0.35, -0.22], rotation: [-0.6, -0.5, 0], size: [0.03, 0.28], color: "#444444" }, // Leg 6
        { type: "cylinder", position: [-0.05, 0.35, -0.22], rotation: [-0.4, -0.7, 0], size: [0.03, 0.28], color: "#444444" }, // Leg 7
        { type: "cylinder", position: [-0.15, 0.35, -0.2], rotation: [-0.2, -0.9, 0], size: [0.03, 0.25], color: "#444444" }, // Leg 8
      ],
    },
    isBoss: true,
    unlockWave: 18,
  },

  // 86. Slime Emperor - Massive slime ruler
  {
    type: EnemyType.SlimeEmperor,
    name: "Slime Emperor",
    description: "A colossal slime. Splits into many smaller slimes.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 2000,
      speed: 0.35,
      armor: 5,
      magicResistance: 15,
      bounty: 220,
      score: 450,
    },
    specialAbility: { type: SpecialAbilityType.Split, cooldown: 0, strength: 4 },
    meshConfig: {
      baseShape: "blob",
      scale: 2.0,
      parts: [
        { type: "sphere", position: [0, 0.45, 0], size: [0.4, 0.35, 0.38], color: "#666666" }, // Main body
        { type: "sphere", position: [0.15, 0.55, 0.1], size: [0.1], color: "#555555" }, // Bump 1
        { type: "sphere", position: [-0.12, 0.5, -0.08], size: [0.12], color: "#555555" }, // Bump 2
        { type: "sphere", position: [0.12, 0.65, 0.08], size: [0.06], color: "#222222" }, // Eye L
        { type: "sphere", position: [0.12, 0.65, -0.08], size: [0.06], color: "#222222" }, // Eye R
        { type: "cone", position: [0, 0.75, 0], size: [0.15, 0.12], color: "#888888" }, // Crown
      ],
    },
    isBoss: true,
    unlockWave: 22,
  },

  // 87. Ancient Golem - Primordial stone construct
  {
    type: EnemyType.AncientGolem,
    name: "Ancient Golem",
    description: "A massive stone guardian. Nearly indestructible.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 2500,
      speed: 0.3,
      armor: 25,
      magicResistance: 12,
      bounty: 280,
      score: 550,
    },
    specialAbility: { type: SpecialAbilityType.Armor, cooldown: 15000, duration: 8000, strength: 3.0 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 2.2,
      parts: [
        { type: "dodecahedron", position: [0, 1.3, 0], size: [0.22], color: "#888888" }, // Head
        { type: "sphere", position: [0.1, 1.35, 0.08], size: [0.05], color: "#aaffaa" }, // Eye L
        { type: "sphere", position: [0.1, 1.35, -0.08], size: [0.05], color: "#aaffaa" }, // Eye R
        { type: "box", position: [0, 0.9, 0], size: [0.45, 0.5, 0.3], color: "#777777" }, // Torso
        { type: "dodecahedron", position: [0, 1.05, 0.2], size: [0.12], color: "#999999" }, // Shoulder L
        { type: "dodecahedron", position: [0, 1.05, -0.2], size: [0.12], color: "#999999" }, // Shoulder R
        { type: "box", position: [-0.35, 0.7, 0], rotation: [0, 0, 0.3], size: [0.14, 0.4, 0.14], color: "#666666" }, // Arm L
        { type: "box", position: [0.35, 0.7, 0], rotation: [0, 0, -0.3], size: [0.14, 0.4, 0.14], color: "#666666" }, // Arm R
        { type: "box", position: [-0.12, 0.3, 0], size: [0.15, 0.5, 0.15], color: "#777777" }, // Leg L
        { type: "box", position: [0.12, 0.3, 0], size: [0.15, 0.5, 0.15], color: "#777777" }, // Leg R
      ],
    },
    isBoss: true,
    unlockWave: 28,
  },

  // 88. Lich King - Master of dark magic
  {
    type: EnemyType.LichKing,
    name: "Lich King",
    description: "An undead sorcerer king. Raises and heals undead.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 1600,
      speed: 0.45,
      armor: 8,
      magicResistance: 25,
      bounty: 300,
      score: 600,
    },
    specialAbility: { type: SpecialAbilityType.Heal, cooldown: 5000, strength: 50 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.6,
      parts: [
        { type: "sphere", position: [0, 1.1, 0], size: [0.16], color: "#cccccc" }, // Skull
        { type: "sphere", position: [0.06, 1.14, 0.05], size: [0.035], color: "#44ffff" }, // Eye L
        { type: "sphere", position: [0.06, 1.14, -0.05], size: [0.035], color: "#44ffff" }, // Eye R
        { type: "cone", position: [0, 1.28, 0], size: [0.2, 0.2], color: "#555555" }, // Crown
        { type: "cone", position: [0, 0.7, 0], size: [0.28, 0.6], color: "#444444" }, // Robe
        { type: "cylinder", position: [-0.2, 0.8, 0], rotation: [0, 0, 0.5], size: [0.04, 0.25], color: "#dddddd" }, // Arm L
        { type: "cylinder", position: [0.2, 0.8, 0], rotation: [0, 0, -0.5], size: [0.04, 0.25], color: "#dddddd" }, // Arm R
        { type: "sphere", position: [0.32, 0.6, 0], size: [0.08], color: "#666666" }, // Staff orb
        { type: "cylinder", position: [0.32, 0.35, 0], size: [0.02, 0.4], color: "#555555" }, // Staff
      ],
    },
    isBoss: true,
    unlockWave: 35,
  },

  // 89. Vampire Lord - Master of the night
  {
    type: EnemyType.VampireLord,
    name: "Vampire Lord",
    description: "An ancient vampire. Heals from damage dealt.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 1400,
      speed: 0.7,
      armor: 10,
      magicResistance: 15,
      bounty: 250,
      score: 500,
    },
    specialAbility: { type: SpecialAbilityType.Regenerate, cooldown: 3000, strength: 30 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.5,
      parts: [
        { type: "sphere", position: [0, 1.05, 0], size: [0.14], color: "#aaaaaa" }, // Head
        { type: "sphere", position: [0.05, 1.08, 0.04], size: [0.03], color: "#ff0000" }, // Eye L
        { type: "sphere", position: [0.05, 1.08, -0.04], size: [0.03], color: "#ff0000" }, // Eye R
        { type: "cone", position: [0.06, 1.0, 0.02], rotation: [0.3, 0, 0], size: [0.015, 0.04], color: "#ffffff" }, // Fang L
        { type: "cone", position: [0.06, 1.0, -0.02], rotation: [-0.3, 0, 0], size: [0.015, 0.04], color: "#ffffff" }, // Fang R
        { type: "box", position: [0, 0.75, 0], size: [0.2, 0.3, 0.12], color: "#333333" }, // Torso
        { type: "box", position: [0, 0.8, 0.2], rotation: [0.5, 0, 0], size: [0.35, 0.25, 0.01], color: "#222222" }, // Cape L
        { type: "box", position: [0, 0.8, -0.2], rotation: [-0.5, 0, 0], size: [0.35, 0.25, 0.01], color: "#222222" }, // Cape R
        { type: "cylinder", position: [-0.16, 0.65, 0], rotation: [0, 0, 0.3], size: [0.04, 0.22], color: "#444444" }, // Arm L
        { type: "cylinder", position: [0.16, 0.65, 0], rotation: [0, 0, -0.3], size: [0.04, 0.22], color: "#444444" }, // Arm R
        { type: "cylinder", position: [-0.06, 0.3, 0], size: [0.05, 0.35], color: "#333333" }, // Leg L
        { type: "cylinder", position: [0.06, 0.3, 0], size: [0.05, 0.35], color: "#333333" }, // Leg R
      ],
    },
    isBoss: true,
    unlockWave: 30,
  },

  // 90. Werewolf Alpha - Pack leader
  {
    type: EnemyType.WerewolfAlpha,
    name: "Werewolf Alpha",
    description: "The alpha werewolf. Extremely fast and powerful.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 1300,
      speed: 0.85,
      armor: 12,
      magicResistance: 8,
      bounty: 200,
      score: 420,
    },
    specialAbility: { type: SpecialAbilityType.Speed, cooldown: 8000, duration: 4000, strength: 2.0 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.6,
      parts: [
        { type: "sphere", position: [0.08, 1.1, 0], size: [0.14, 0.12, 0.1], color: "#4a4a4a" }, // Head
        { type: "cone", position: [0.18, 1.08, 0], rotation: [0, 0, -1.57], size: [0.05, 0.1], color: "#555555" }, // Snout
        { type: "cone", position: [0.04, 1.2, 0.06], size: [0.04, 0.08], color: "#3a3a3a" }, // Ear L
        { type: "cone", position: [0.04, 1.2, -0.06], size: [0.04, 0.08], color: "#3a3a3a" }, // Ear R
        { type: "box", position: [0, 0.8, 0], size: [0.25, 0.35, 0.18], color: "#444444" }, // Torso
        { type: "cylinder", position: [-0.2, 0.7, 0], rotation: [0, 0, 0.4], size: [0.06, 0.3], color: "#4a4a4a" }, // Arm L
        { type: "cylinder", position: [0.2, 0.7, 0], rotation: [0, 0, -0.4], size: [0.06, 0.3], color: "#4a4a4a" }, // Arm R
        { type: "cylinder", position: [-0.08, 0.35, 0], size: [0.07, 0.4], color: "#444444" }, // Leg L
        { type: "cylinder", position: [0.08, 0.35, 0], size: [0.07, 0.4], color: "#444444" }, // Leg R
        { type: "cone", position: [-0.15, 0.6, 0], rotation: [0, 0, 2.5], size: [0.04, 0.2], color: "#3a3a3a" }, // Tail
      ],
    },
    isBoss: true,
    unlockWave: 25,
  },

  // 91. Red Dragon - Fire breathing terror
  {
    type: EnemyType.DragonRed,
    name: "Red Dragon",
    description: "A massive fire dragon. The ultimate boss.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 3500,
      speed: 0.5,
      armor: 20,
      magicResistance: 18,
      bounty: 500,
      score: 1000,
    },
    specialAbility: { type: SpecialAbilityType.Regenerate, cooldown: 4000, strength: 40 },
    meshConfig: {
      baseShape: "flying",
      scale: 2.5,
      parts: [
        { type: "sphere", position: [0.5, 0.8, 0], size: [0.22, 0.18, 0.16], color: "#666666" }, // Head
        { type: "cone", position: [0.7, 0.78, 0], rotation: [0, 0, -1.57], size: [0.08, 0.18], color: "#777777" }, // Snout
        { type: "cone", position: [0.45, 0.95, 0.08], size: [0.05, 0.12], color: "#555555" }, // Horn L
        { type: "cone", position: [0.45, 0.95, -0.08], size: [0.05, 0.12], color: "#555555" }, // Horn R
        { type: "sphere", position: [0, 0.7, 0], size: [0.45, 0.3, 0.28], color: "#555555" }, // Body
        { type: "cone", position: [-0.6, 0.65, 0], rotation: [0, 0, 1.57], size: [0.12, 0.5], color: "#4a4a4a" }, // Tail
        { type: "box", position: [0.1, 0.85, 0.5], rotation: [0.25, 0, 0.35], size: [0.5, 0.03, 0.35], color: "#444444" }, // Wing L
        { type: "box", position: [0.1, 0.85, -0.5], rotation: [-0.25, 0, 0.35], size: [0.5, 0.03, 0.35], color: "#444444" }, // Wing R
        { type: "cylinder", position: [0.15, 0.4, 0.15], size: [0.08, 0.3], color: "#555555" }, // Leg FL
        { type: "cylinder", position: [0.15, 0.4, -0.15], size: [0.08, 0.3], color: "#555555" }, // Leg FR
        { type: "cylinder", position: [-0.2, 0.4, 0.12], size: [0.07, 0.28], color: "#555555" }, // Leg BL
        { type: "cylinder", position: [-0.2, 0.4, -0.12], size: [0.07, 0.28], color: "#555555" }, // Leg BR
      ],
    },
    isBoss: true,
    unlockWave: 50,
  },

  // 92. Blue Dragon - Ice dragon
  {
    type: EnemyType.DragonBlue,
    name: "Blue Dragon",
    description: "An ice dragon. Freezes everything in its path.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 3200,
      speed: 0.55,
      armor: 18,
      magicResistance: 22,
      bounty: 480,
      score: 960,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 2.4,
      parts: [
        { type: "sphere", position: [0.48, 0.78, 0], size: [0.2, 0.16, 0.14], color: "#aaaaaa" }, // Head
        { type: "cone", position: [0.66, 0.76, 0], rotation: [0, 0, -1.57], size: [0.07, 0.16], color: "#bbbbbb" }, // Snout
        { type: "cone", position: [0.43, 0.92, 0.07], size: [0.04, 0.1], color: "#999999" }, // Horn L
        { type: "cone", position: [0.43, 0.92, -0.07], size: [0.04, 0.1], color: "#999999" }, // Horn R
        { type: "sphere", position: [0, 0.68, 0], size: [0.42, 0.28, 0.26], color: "#999999" }, // Body
        { type: "cone", position: [-0.55, 0.63, 0], rotation: [0, 0, 1.57], size: [0.1, 0.45], color: "#888888" }, // Tail
        { type: "box", position: [0.08, 0.82, 0.45], rotation: [0.25, 0, 0.35], size: [0.45, 0.025, 0.32], color: "#888888" }, // Wing L
        { type: "box", position: [0.08, 0.82, -0.45], rotation: [-0.25, 0, 0.35], size: [0.45, 0.025, 0.32], color: "#888888" }, // Wing R
      ],
    },
    isBoss: true,
    unlockWave: 45,
  },

  // 93. Green Dragon - Poison dragon
  {
    type: EnemyType.DragonGreen,
    name: "Green Dragon",
    description: "A poison dragon. Toxic breath weapon.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 2800,
      speed: 0.6,
      armor: 15,
      magicResistance: 20,
      bounty: 450,
      score: 900,
    },
    meshConfig: {
      baseShape: "flying",
      scale: 2.2,
      parts: [
        { type: "sphere", position: [0.45, 0.75, 0], size: [0.18, 0.14, 0.12], color: "#777777" }, // Head
        { type: "cone", position: [0.62, 0.73, 0], rotation: [0, 0, -1.57], size: [0.06, 0.14], color: "#888888" }, // Snout
        { type: "sphere", position: [0, 0.65, 0], size: [0.38, 0.25, 0.24], color: "#666666" }, // Body
        { type: "cone", position: [-0.5, 0.6, 0], rotation: [0, 0, 1.57], size: [0.09, 0.4], color: "#555555" }, // Tail
        { type: "box", position: [0.06, 0.78, 0.4], rotation: [0.25, 0, 0.35], size: [0.4, 0.02, 0.28], color: "#555555" }, // Wing L
        { type: "box", position: [0.06, 0.78, -0.4], rotation: [-0.25, 0, 0.35], size: [0.4, 0.02, 0.28], color: "#555555" }, // Wing R
      ],
    },
    isBoss: true,
    unlockWave: 40,
  },

  // 94. Black Dragon - Shadow dragon
  {
    type: EnemyType.DragonBlack,
    name: "Black Dragon",
    description: "A shadow dragon. Phases through attacks.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 2600,
      speed: 0.65,
      armor: 14,
      magicResistance: 24,
      bounty: 420,
      score: 850,
    },
    specialAbility: { type: SpecialAbilityType.Phase, cooldown: 6000, duration: 3000 },
    meshConfig: {
      baseShape: "flying",
      scale: 2.1,
      parts: [
        { type: "sphere", position: [0.42, 0.72, 0], size: [0.16, 0.12, 0.1], color: "#333333" }, // Head
        { type: "cone", position: [0.58, 0.7, 0], rotation: [0, 0, -1.57], size: [0.05, 0.12], color: "#444444" }, // Snout
        { type: "sphere", position: [0, 0.62, 0], size: [0.35, 0.22, 0.2], color: "#222222" }, // Body
        { type: "cone", position: [-0.45, 0.57, 0], rotation: [0, 0, 1.57], size: [0.08, 0.35], color: "#2a2a2a" }, // Tail
        { type: "box", position: [0.05, 0.75, 0.35], rotation: [0.25, 0, 0.35], size: [0.35, 0.018, 0.25], color: "#2a2a2a" }, // Wing L
        { type: "box", position: [0.05, 0.75, -0.35], rotation: [-0.25, 0, 0.35], size: [0.35, 0.018, 0.25], color: "#2a2a2a" }, // Wing R
      ],
    },
    isBoss: true,
    unlockWave: 42,
  },

  // 95. Hydra - Multi-headed serpent
  {
    type: EnemyType.Hydra,
    name: "Hydra",
    description: "A three-headed serpent. Cut one head, two grow back.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 3000,
      speed: 0.4,
      armor: 12,
      magicResistance: 10,
      bounty: 380,
      score: 780,
    },
    specialAbility: { type: SpecialAbilityType.Regenerate, cooldown: 2000, strength: 25 },
    meshConfig: {
      baseShape: "serpent",
      scale: 2.0,
      parts: [
        { type: "sphere", position: [0.3, 0.9, 0], size: [0.12], color: "#555555" }, // Head center
        { type: "sphere", position: [0.25, 0.85, 0.15], size: [0.1], color: "#555555" }, // Head L
        { type: "sphere", position: [0.25, 0.85, -0.15], size: [0.1], color: "#555555" }, // Head R
        { type: "cylinder", position: [0.15, 0.7, 0], rotation: [0.3, 0, 0.3], size: [0.06, 0.25], color: "#4a4a4a" }, // Neck center
        { type: "cylinder", position: [0.1, 0.65, 0.1], rotation: [0.5, 0.3, 0.3], size: [0.05, 0.22], color: "#4a4a4a" }, // Neck L
        { type: "cylinder", position: [0.1, 0.65, -0.1], rotation: [-0.5, -0.3, 0.3], size: [0.05, 0.22], color: "#4a4a4a" }, // Neck R
        { type: "sphere", position: [0, 0.45, 0], size: [0.3, 0.2, 0.22], color: "#444444" }, // Body
        { type: "cone", position: [-0.4, 0.4, 0], rotation: [0, 0, 1.4], size: [0.1, 0.35], color: "#3a3a3a" }, // Tail
      ],
    },
    isBoss: true,
    unlockWave: 38,
  },

  // 96. Cerberus - Three-headed hound
  {
    type: EnemyType.Cerberus,
    name: "Cerberus",
    description: "The three-headed guardian. Relentless pursuit.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 2200,
      speed: 0.75,
      armor: 14,
      magicResistance: 8,
      bounty: 320,
      score: 650,
    },
    specialAbility: { type: SpecialAbilityType.Speed, cooldown: 6000, duration: 3000, strength: 1.8 },
    meshConfig: {
      baseShape: "quadruped",
      scale: 1.8,
      parts: [
        { type: "sphere", position: [0.25, 0.75, 0], size: [0.12, 0.1, 0.08], color: "#3a3a3a" }, // Head center
        { type: "sphere", position: [0.2, 0.7, 0.12], size: [0.1, 0.08, 0.07], color: "#3a3a3a" }, // Head L
        { type: "sphere", position: [0.2, 0.7, -0.12], size: [0.1, 0.08, 0.07], color: "#3a3a3a" }, // Head R
        { type: "cone", position: [0.35, 0.73, 0], rotation: [0, 0, -1.57], size: [0.04, 0.1], color: "#444444" }, // Snout C
        { type: "cone", position: [0.28, 0.68, 0.12], rotation: [0.2, 0, -1.57], size: [0.03, 0.08], color: "#444444" }, // Snout L
        { type: "cone", position: [0.28, 0.68, -0.12], rotation: [-0.2, 0, -1.57], size: [0.03, 0.08], color: "#444444" }, // Snout R
        { type: "sphere", position: [0, 0.55, 0], size: [0.25, 0.18, 0.16], color: "#333333" }, // Body
        { type: "cylinder", position: [0.12, 0.35, 0.1], size: [0.05, 0.25], color: "#3a3a3a" }, // Leg FL
        { type: "cylinder", position: [0.12, 0.35, -0.1], size: [0.05, 0.25], color: "#3a3a3a" }, // Leg FR
        { type: "cylinder", position: [-0.12, 0.35, 0.08], size: [0.045, 0.25], color: "#3a3a3a" }, // Leg BL
        { type: "cylinder", position: [-0.12, 0.35, -0.08], size: [0.045, 0.25], color: "#3a3a3a" }, // Leg BR
        { type: "cone", position: [-0.25, 0.5, 0], rotation: [0, 0, 1.8], size: [0.04, 0.18], color: "#333333" }, // Tail
      ],
    },
    isBoss: true,
    unlockWave: 32,
  },

  // 97. Titan - Primordial giant
  {
    type: EnemyType.Titan,
    name: "Titan",
    description: "An ancient giant. Shakes the earth with each step.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 4000,
      speed: 0.25,
      armor: 30,
      magicResistance: 15,
      bounty: 550,
      score: 1100,
    },
    specialAbility: { type: SpecialAbilityType.Armor, cooldown: 12000, duration: 6000, strength: 2.5 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 3.0,
      parts: [
        { type: "sphere", position: [0, 1.7, 0], size: [0.25], color: "#777777" }, // Head
        { type: "sphere", position: [0.1, 1.75, 0.08], size: [0.05], color: "#ffff44" }, // Eye L
        { type: "sphere", position: [0.1, 1.75, -0.08], size: [0.05], color: "#ffff44" }, // Eye R
        { type: "box", position: [0, 1.2, 0], size: [0.55, 0.6, 0.35], color: "#666666" }, // Torso
        { type: "sphere", position: [0, 1.35, 0.25], size: [0.2], color: "#777777" }, // Shoulder L
        { type: "sphere", position: [0, 1.35, -0.25], size: [0.2], color: "#777777" }, // Shoulder R
        { type: "box", position: [-0.45, 0.95, 0], rotation: [0, 0, 0.4], size: [0.15, 0.5, 0.15], color: "#555555" }, // Arm L
        { type: "box", position: [0.45, 0.95, 0], rotation: [0, 0, -0.4], size: [0.15, 0.5, 0.15], color: "#555555" }, // Arm R
        { type: "box", position: [-0.15, 0.4, 0], size: [0.18, 0.6, 0.18], color: "#666666" }, // Leg L
        { type: "box", position: [0.15, 0.4, 0], size: [0.18, 0.6, 0.18], color: "#666666" }, // Leg R
      ],
    },
    isBoss: true,
    unlockWave: 48,
  },

  // 98. Necromancer - Master of death
  {
    type: EnemyType.Necromancer,
    name: "Necromancer",
    description: "A dark mage. Summons endless undead.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 1200,
      speed: 0.5,
      armor: 5,
      magicResistance: 20,
      bounty: 350,
      score: 700,
    },
    specialAbility: { type: SpecialAbilityType.Summon, cooldown: 4000, strength: 2 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.4,
      parts: [
        { type: "sphere", position: [0, 1.0, 0], size: [0.12], color: "#aaaaaa" }, // Head
        { type: "sphere", position: [0.04, 1.04, 0.03], size: [0.03], color: "#aa00aa" }, // Eye L
        { type: "sphere", position: [0.04, 1.04, -0.03], size: [0.03], color: "#aa00aa" }, // Eye R
        { type: "cone", position: [0, 1.15, 0], size: [0.15, 0.18], color: "#333333" }, // Hood
        { type: "cone", position: [0, 0.65, 0], size: [0.25, 0.55], color: "#222222" }, // Robe
        { type: "cylinder", position: [-0.18, 0.75, 0], rotation: [0, 0, 0.5], size: [0.03, 0.2], color: "#999999" }, // Arm L
        { type: "cylinder", position: [0.18, 0.75, 0], rotation: [0, 0, -0.5], size: [0.03, 0.2], color: "#999999" }, // Arm R
        { type: "sphere", position: [-0.28, 0.6, 0], size: [0.06], color: "#666666" }, // Orb
        { type: "cylinder", position: [0.28, 0.4, 0], size: [0.02, 0.35], color: "#444444" }, // Staff
        { type: "sphere", position: [0.28, 0.6, 0], size: [0.05], color: "#888888" }, // Staff gem
      ],
    },
    isBoss: true,
    unlockWave: 26,
  },

  // 99. Demon Lord - Lord of the abyss
  {
    type: EnemyType.DemonLord,
    name: "Demon Lord",
    description: "The lord of demons. Burns with hellfire.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 3800,
      speed: 0.45,
      armor: 22,
      magicResistance: 22,
      bounty: 600,
      score: 1200,
    },
    specialAbility: { type: SpecialAbilityType.Regenerate, cooldown: 3000, strength: 35 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 2.3,
      parts: [
        { type: "sphere", position: [0, 1.4, 0], size: [0.2], color: "#444444" }, // Head
        { type: "sphere", position: [0.08, 1.45, 0.06], size: [0.04], color: "#ff4400" }, // Eye L
        { type: "sphere", position: [0.08, 1.45, -0.06], size: [0.04], color: "#ff4400" }, // Eye R
        { type: "cone", position: [-0.08, 1.55, 0.1], rotation: [0.3, 0, 0.3], size: [0.04, 0.15], color: "#333333" }, // Horn L
        { type: "cone", position: [-0.08, 1.55, -0.1], rotation: [-0.3, 0, 0.3], size: [0.04, 0.15], color: "#333333" }, // Horn R
        { type: "box", position: [0, 1.05, 0], size: [0.4, 0.45, 0.28], color: "#3a3a3a" }, // Torso
        { type: "box", position: [0, 1.15, 0.45], rotation: [0.6, 0, 0], size: [0.4, 0.3, 0.02], color: "#2a2a2a" }, // Wing L
        { type: "box", position: [0, 1.15, -0.45], rotation: [-0.6, 0, 0], size: [0.4, 0.3, 0.02], color: "#2a2a2a" }, // Wing R
        { type: "cylinder", position: [-0.3, 0.85, 0], rotation: [0, 0, 0.4], size: [0.08, 0.35], color: "#444444" }, // Arm L
        { type: "cylinder", position: [0.3, 0.85, 0], rotation: [0, 0, -0.4], size: [0.08, 0.35], color: "#444444" }, // Arm R
        { type: "cylinder", position: [-0.1, 0.4, 0], size: [0.1, 0.5], color: "#3a3a3a" }, // Leg L
        { type: "cylinder", position: [0.1, 0.4, 0], size: [0.1, 0.5], color: "#3a3a3a" }, // Leg R
        { type: "cone", position: [-0.2, 0.7, 0], rotation: [0, 0, 2.0], size: [0.05, 0.3], color: "#333333" }, // Tail
      ],
    },
    isBoss: true,
    unlockWave: 49,
  },

  // 100. Death Knight - Fallen champion
  {
    type: EnemyType.DeathKnight,
    name: "Death Knight",
    description: "A fallen champion. Unstoppable warrior.",
    category: EnemyCategory.Boss,
    baseStats: {
      maxHealth: 2400,
      speed: 0.6,
      armor: 24,
      magicResistance: 16,
      bounty: 400,
      score: 800,
    },
    specialAbility: { type: SpecialAbilityType.Shield, cooldown: 10000, duration: 5000, strength: 0.5 },
    meshConfig: {
      baseShape: "humanoid",
      scale: 1.7,
      parts: [
        { type: "sphere", position: [0, 1.15, 0], size: [0.14], color: "#555555" }, // Helmet
        { type: "box", position: [0, 1.22, 0], size: [0.16, 0.06, 0.08], color: "#666666" }, // Visor
        { type: "sphere", position: [0.06, 1.18, 0.03], size: [0.02], color: "#ff0000" }, // Eye L
        { type: "sphere", position: [0.06, 1.18, -0.03], size: [0.02], color: "#ff0000" }, // Eye R
        { type: "box", position: [0, 0.85, 0], size: [0.28, 0.35, 0.18], color: "#444444" }, // Torso armor
        { type: "sphere", position: [0, 0.95, 0.12], size: [0.1], color: "#555555" }, // Shoulder L
        { type: "sphere", position: [0, 0.95, -0.12], size: [0.1], color: "#555555" }, // Shoulder R
        { type: "cylinder", position: [-0.2, 0.7, 0], rotation: [0, 0, 0.35], size: [0.055, 0.25], color: "#4a4a4a" }, // Arm L
        { type: "cylinder", position: [0.2, 0.7, 0], rotation: [0, 0, -0.35], size: [0.055, 0.25], color: "#4a4a4a" }, // Arm R
        { type: "box", position: [-0.32, 0.55, 0], size: [0.12, 0.02, 0.18], color: "#666666" }, // Shield
        { type: "box", position: [0.35, 0.6, 0], size: [0.03, 0.45, 0.03], color: "#888888" }, // Sword
        { type: "cylinder", position: [-0.08, 0.35, 0], size: [0.07, 0.4], color: "#444444" }, // Leg L
        { type: "cylinder", position: [0.08, 0.35, 0], size: [0.07, 0.4], color: "#444444" }, // Leg R
      ],
    },
    isBoss: true,
    unlockWave: 36,
  },
];

// ============================================================================
// COMBINED DATABASE
// ============================================================================

export const ENEMY_DATABASE: Map<EnemyType, EnemyDefinition> = new Map();

// Populate the database
[...GROUND_ENEMIES, ...FLYING_ENEMIES, ...BOSS_ENEMIES].forEach((enemy) => {
  ENEMY_DATABASE.set(enemy.type, enemy);
});

/**
 * Get enemy definition by type
 */
export function getEnemyDefinition(type: EnemyType): EnemyDefinition | undefined {
  return ENEMY_DATABASE.get(type);
}

/**
 * Get all enemies in a category
 */
export function getEnemiesByCategory(category: EnemyCategory): EnemyDefinition[] {
  return Array.from(ENEMY_DATABASE.values()).filter((e) => e.category === category);
}

/**
 * Get all enemies available at or before a given wave
 */
export function getEnemiesUnlockedAtWave(wave: number): EnemyDefinition[] {
  return Array.from(ENEMY_DATABASE.values()).filter(
    (e) => !e.unlockWave || e.unlockWave <= wave
  );
}

/**
 * Get all boss enemies
 */
export function getBossEnemies(): EnemyDefinition[] {
  return Array.from(ENEMY_DATABASE.values()).filter((e) => e.isBoss);
}
