/**
 * Tempest Element - Tier 2 Towers (Water + Lightning merge)
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

export const TEMPEST_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Tempest Damage Tower
  {
    id: createTowerId(MergedElementT2.Tempest, TowerCategory.Damage, 2),
    type: "tempest_damage" as any,
    name: "Lightning Rain",
    description: "Calls down electrified rain that damages and shocks enemies.",
    element: MergedElementT2.Tempest,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 46,
      attackSpeed: 1.1,
      range: 3.5,
      cost: 265,
      upgradeCost: 132,
      health: 120,
      armor: 6,
      magicPen: 5,
      armorPen: 3,
    },
    statusEffect: {
      type: StatusEffectType.Stun,
      chance: 0.15,
      duration: 0.5,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Tempest, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["monsoon_damage_t3"],
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.15,
      height: 1.5,
      effectColor: "#4682b4",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.18, 0.35], color: "#555555" },
        { type: "cone", position: [0, 0.4, 0], size: [0.14, 0.45], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.8, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#4682b4",
          animated: { type: "pulse", speed: 2.5 },
        },
        {
          type: "cone",
          position: [0, 0.95, 0],
          size: [0.05, 0.15],
          color: "#888888",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 5 },
        },
      ],
    },
  },

  // 2. Tempest Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Tempest, TowerCategory.MagicDamage, 2),
    type: "tempest_magic_damage" as any,
    name: "Storm Caller",
    description: "Invokes thunderstorm magic with devastating effect.",
    element: MergedElementT2.Tempest,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 40,
      attackSpeed: 1.0,
      range: 3.8,
      cost: 295,
      upgradeCost: 147,
      health: 100,
      armor: 5,
      magicPen: 12,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Tempest, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["monsoon_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.1,
      height: 1.3,
      effectColor: "#ffff00",
      parts: [
        { type: "octahedron", position: [0, 0.2, 0], size: [0.16], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.55, 0],
          size: [0.14],
          color: "#666666",
          emissive: "#4682b4",
          animated: { type: "rotate", speed: 1.2, axis: "y" },
        },
        {
          type: "cone",
          position: [0, 0.8, 0],
          size: [0.05, 0.15],
          color: "#888888",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 4 },
        },
      ],
    },
  },

  // 3. Tempest Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Tempest, TowerCategory.PhysicalDamage, 2),
    type: "tempest_physical_damage" as any,
    name: "Thunderbolt Launcher",
    description: "Fires electrified water bolts with stunning impact.",
    element: MergedElementT2.Tempest,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 62,
      attackSpeed: 0.8,
      range: 3.0,
      cost: 315,
      upgradeCost: 157,
      health: 140,
      armor: 8,
      magicPen: 0,
      armorPen: 6,
    },
    statusEffect: {
      type: StatusEffectType.Stun,
      chance: 0.2,
      duration: 0.7,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Tempest, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["monsoon_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.2,
      height: 1.5,
      effectColor: "#4682b4",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.25], color: "#555555" },
        { type: "box", position: [0, 0.3, 0], size: [0.18, 0.2, 0.18], color: "#606060" },
        { type: "cylinder", position: [0, 0.5, 0.08], rotation: [0.25, 0, 0], size: [0.1, 0.4], color: "#666666" },
        {
          type: "cone",
          position: [0, 0.7, 0.3],
          rotation: [0.25, 0, 0],
          size: [0.06, 0.12],
          color: "#888888",
          emissive: "#ffff00",
        },
      ],
    },
  },

  // 4. Tempest Buff Tower
  {
    id: createTowerId(MergedElementT2.Tempest, TowerCategory.Buff, 2),
    type: "tempest_buff" as any,
    name: "Storm Eye",
    description: "Creates a calm eye in the storm, greatly enhancing nearby towers.",
    element: MergedElementT2.Tempest,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 12,
      attackSpeed: 0.5,
      range: 4.2,
      cost: 335,
      upgradeCost: 167,
      health: 125,
      armor: 7,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Damage,
      radius: 3.0,
      strength: 0.22,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Tempest, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["monsoon_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.15,
      height: 1.3,
      effectColor: "#4682b4",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.24, 0.12], color: "#555555" },
        { type: "cylinder", position: [0, 0.15, 0], size: [0.1, 0.4], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.65, 0],
          size: [0.16],
          color: "#777777",
          emissive: "#4682b4",
          animated: { type: "pulse", speed: 1.5 },
        },
        {
          type: "torus",
          position: [0, 0.65, 0],
          rotation: [1.57, 0, 0],
          size: [0.3, 0.02],
          color: "#ffff0044",
          animated: { type: "rotate", speed: 2, axis: "y" },
        },
      ],
    },
  },

  // 5. Tempest Debuff Tower
  {
    id: createTowerId(MergedElementT2.Tempest, TowerCategory.Debuff, 2),
    type: "tempest_debuff" as any,
    name: "Drowning Surge",
    description: "Engulfs enemies in electrified water, slowing and shocking them.",
    element: MergedElementT2.Tempest,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 20,
      attackSpeed: 1.05,
      range: 3.2,
      cost: 275,
      upgradeCost: 137,
      health: 115,
      armor: 6,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Slow,
      chance: 0.6,
      duration: 2.5,
      strength: 0.35,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Tempest, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["monsoon_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.1,
      height: 1.0,
      effectColor: "#4682b4",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.18, 0.1], color: "#555555" },
        { type: "sphere", position: [0, 0.25, 0], size: [0.15], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.5, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#4682b4",
          animated: { type: "pulse", speed: 2 },
        },
        {
          type: "cone",
          position: [0, 0.65, 0],
          size: [0.04, 0.1],
          color: "#888888",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 4 },
        },
      ],
    },
  },
];
