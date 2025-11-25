/**
 * Storm Element - Tier 2 Towers (Fire + Lightning merge)
 * 5 towers across all categories
 */

import {
  TowerCategory,
  TowerRarity,
  BuffType,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { MergedElementT2, BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

export const STORM_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Storm Damage Tower
  {
    id: createTowerId(MergedElementT2.Storm, TowerCategory.Damage, 2),
    type: "storm_damage" as any,
    name: "Tempest Core",
    description: "Unleashes chaotic storms of fire and lightning.",
    element: MergedElementT2.Storm,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 48,
      attackSpeed: 1.15,
      range: 3.5,
      cost: 270,
      upgradeCost: 135,
      health: 125,
      armor: 6,
      magicPen: 4,
      armorPen: 3,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Storm, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["supercell_damage_t3", "sandstorm_damage_t3"],
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.15,
      height: 1.5,
      effectColor: "#483d8b",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.2, 0.35], color: "#555555" },
        { type: "cone", position: [0, 0.4, 0], size: [0.16, 0.5], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.85, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 4 },
        },
        {
          type: "cone",
          position: [0.1, 0.7, 0],
          rotation: [0, 0, 0.5],
          size: [0.04, 0.12],
          color: "#888888",
          emissive: "#ff4500",
          animated: { type: "pulse", speed: 5 },
        },
      ],
    },
  },

  // 2. Storm Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Storm, TowerCategory.MagicDamage, 2),
    type: "storm_magic_damage" as any,
    name: "Chaos Conduit",
    description: "Channels the raw magical energy of storms.",
    element: MergedElementT2.Storm,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 40,
      attackSpeed: 1.1,
      range: 3.8,
      cost: 300,
      upgradeCost: 150,
      health: 105,
      armor: 5,
      magicPen: 11,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Storm, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["supercell_magic_damage_t3", "sandstorm_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.1,
      height: 1.3,
      effectColor: "#ffd700",
      parts: [
        { type: "octahedron", position: [0, 0.2, 0], size: [0.16], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.55, 0],
          size: [0.13],
          color: "#666666",
          emissive: "#483d8b",
          animated: { type: "rotate", speed: 1.5, axis: "y" },
        },
        {
          type: "cone",
          position: [0, 0.78, 0],
          size: [0.05, 0.15],
          color: "#888888",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 5 },
        },
      ],
    },
  },

  // 3. Storm Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Storm, TowerCategory.PhysicalDamage, 2),
    type: "storm_physical_damage" as any,
    name: "Thunder Forge",
    description: "Launches electrified fire projectiles with devastating impact.",
    element: MergedElementT2.Storm,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 72,
      attackSpeed: 0.75,
      range: 2.9,
      cost: 320,
      upgradeCost: 160,
      health: 145,
      armor: 9,
      magicPen: 0,
      armorPen: 6,
      splashRadius: 0.7,
    },
    statusEffect: {
      type: StatusEffectType.Stun,
      chance: 0.15,
      duration: 0.6,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Storm, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["supercell_physical_damage_t3", "sandstorm_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.2,
      height: 1.5,
      effectColor: "#ff4500",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.25], color: "#555555" },
        { type: "box", position: [0, 0.3, 0], size: [0.2, 0.2, 0.2], color: "#606060" },
        { type: "cylinder", position: [0, 0.5, 0], size: [0.1, 0.35], color: "#666666" },
        {
          type: "sphere",
          position: [0, 0.85, 0],
          size: [0.1],
          color: "#888888",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 3 },
        },
      ],
    },
  },

  // 4. Storm Buff Tower
  {
    id: createTowerId(MergedElementT2.Storm, TowerCategory.Buff, 2),
    type: "storm_buff" as any,
    name: "Fury Beacon",
    description: "Inspires nearby towers with storm's fury, boosting damage and crit.",
    element: MergedElementT2.Storm,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 14,
      attackSpeed: 0.55,
      range: 4.2,
      cost: 340,
      upgradeCost: 170,
      health: 115,
      armor: 6,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.CritChance,
      radius: 3.0,
      strength: 0.15,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Storm, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["supercell_buff_t3", "sandstorm_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.15,
      height: 1.3,
      effectColor: "#ffd700",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.12], color: "#555555" },
        { type: "cylinder", position: [0, 0.15, 0], size: [0.08, 0.45], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.7, 0],
          size: [0.14],
          color: "#777777",
          emissive: "#ff4500",
          animated: { type: "pulse", speed: 2 },
        },
        {
          type: "cone",
          position: [0, 0.9, 0],
          size: [0.06, 0.12],
          color: "#888888",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 4 },
        },
      ],
    },
  },

  // 5. Storm Debuff Tower
  {
    id: createTowerId(MergedElementT2.Storm, TowerCategory.Debuff, 2),
    type: "storm_debuff" as any,
    name: "Chaos Trap",
    description: "Creates zones of chaotic storm energy that burn and stun enemies.",
    element: MergedElementT2.Storm,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 24,
      attackSpeed: 1.1,
      range: 3.2,
      cost: 280,
      upgradeCost: 140,
      health: 110,
      armor: 5,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.55,
      duration: 3,
      strength: 10,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Storm, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["supercell_debuff_t3", "sandstorm_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.1,
      height: 1.0,
      effectColor: "#483d8b",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.25, 0.1, 0.25], color: "#555555" },
        { type: "cone", position: [0, 0.2, 0], size: [0.15, 0.3], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.5, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#ff4500",
          animated: { type: "pulse", speed: 3 },
        },
        {
          type: "cone",
          position: [0, 0.65, 0],
          size: [0.04, 0.1],
          color: "#888888",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 5 },
        },
      ],
    },
  },
];
