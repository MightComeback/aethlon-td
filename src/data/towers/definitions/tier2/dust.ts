/**
 * Dust Element - Tier 2 Towers (Earth + Air merge)
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

export const DUST_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Dust Damage Tower
  {
    id: createTowerId(MergedElementT2.Dust, TowerCategory.Damage, 2),
    type: "dust_damage" as any,
    name: "Sand Blaster",
    description: "Fires abrasive sand particles that erode enemy defenses.",
    element: MergedElementT2.Dust,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 40,
      attackSpeed: 1.15,
      range: 3.4,
      cost: 245,
      upgradeCost: 122,
      health: 140,
      armor: 9,
      magicPen: 2,
      armorPen: 4,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Air, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Dust, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["sandstorm_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.1,
      height: 1.3,
      effectColor: "#d2b48c",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.25, 0.2, 0.25], color: "#555555" },
        { type: "cone", position: [0, 0.35, 0], size: [0.18, 0.4], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.7, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#d2b48c",
          animated: { type: "rotate", speed: 3, axis: "y" },
        },
        {
          type: "sphere",
          position: [0.1, 0.55, 0.08],
          size: [0.04],
          color: "#888888",
          emissive: "#f5deb3",
          animated: { type: "bob", speed: 3 },
        },
      ],
    },
  },

  // 2. Dust Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Dust, TowerCategory.MagicDamage, 2),
    type: "dust_magic_damage" as any,
    name: "Desert Mirage",
    description: "Projects illusory dust magic that confuses and damages enemies.",
    element: MergedElementT2.Dust,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 34,
      attackSpeed: 1.1,
      range: 3.8,
      cost: 275,
      upgradeCost: 137,
      health: 115,
      armor: 7,
      magicPen: 9,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Air, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Dust, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["sandstorm_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.1,
      height: 1.2,
      effectColor: "#f5deb3",
      parts: [
        { type: "octahedron", position: [0, 0.2, 0], size: [0.15], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.5, 0],
          size: [0.12],
          color: "#666666",
          emissive: "#d2b48c",
          animated: { type: "rotate", speed: 1, axis: "y" },
        },
        {
          type: "sphere",
          position: [0, 0.75, 0],
          size: [0.07],
          color: "#888888",
          emissive: "#f5deb3",
          animated: { type: "bob", speed: 1.5 },
        },
      ],
    },
  },

  // 3. Dust Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Dust, TowerCategory.PhysicalDamage, 2),
    type: "dust_physical_damage" as any,
    name: "Gravel Cannon",
    description: "Launches compacted gravel projectiles with crushing force.",
    element: MergedElementT2.Dust,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 60,
      attackSpeed: 0.75,
      range: 2.9,
      cost: 295,
      upgradeCost: 147,
      health: 170,
      armor: 12,
      magicPen: 0,
      armorPen: 6,
      splashRadius: 0.6,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Air, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Dust, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["sandstorm_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.15,
      height: 1.4,
      effectColor: "#d2b48c",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.2, 0.28], color: "#555555" },
        { type: "box", position: [0, 0.25, 0], size: [0.22, 0.15, 0.22], color: "#606060" },
        { type: "cylinder", position: [0, 0.42, 0.1], rotation: [0.3, 0, 0], size: [0.1, 0.35], color: "#666666" },
        {
          type: "sphere",
          position: [0, 0.55, 0.28],
          size: [0.08],
          color: "#888888",
        },
      ],
    },
  },

  // 4. Dust Buff Tower
  {
    id: createTowerId(MergedElementT2.Dust, TowerCategory.Buff, 2),
    type: "dust_buff" as any,
    name: "Sandstone Pillar",
    description: "Channels earth-wind energy to enhance nearby towers' penetration.",
    element: MergedElementT2.Dust,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 10,
      attackSpeed: 0.45,
      range: 4.0,
      cost: 315,
      upgradeCost: 157,
      health: 165,
      armor: 13,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.ArmorPen,
      radius: 2.8,
      strength: 0.2,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Air, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Dust, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["sandstorm_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.15,
      height: 1.4,
      effectColor: "#f5deb3",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.15, 0.28], color: "#555555" },
        { type: "box", position: [0, 0.25, 0], size: [0.18, 0.5, 0.18], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.8, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#d2b48c",
          animated: { type: "pulse", speed: 1 },
        },
        { type: "torus", position: [0, 0.1, 0], rotation: [1.57, 0, 0], size: [0.38, 0.02], color: "#d2b48c44" },
      ],
    },
  },

  // 5. Dust Debuff Tower
  {
    id: createTowerId(MergedElementT2.Dust, TowerCategory.Debuff, 2),
    type: "dust_debuff" as any,
    name: "Choking Cloud",
    description: "Creates suffocating dust clouds that blind and weaken enemies.",
    element: MergedElementT2.Dust,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 16,
      attackSpeed: 1.2,
      range: 3.3,
      cost: 255,
      upgradeCost: 127,
      health: 130,
      armor: 8,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.ArmorShred,
      chance: 0.45,
      duration: 4,
      strength: 10,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Air, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Dust, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["sandstorm_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.1,
      height: 1.0,
      effectColor: "#d2b48c",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.25, 0.1, 0.25], color: "#555555" },
        {
          type: "sphere",
          position: [0, 0.25, 0],
          size: [0.15],
          color: "#666666",
          animated: { type: "pulse", speed: 1.5 },
        },
        {
          type: "sphere",
          position: [0, 0.5, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#f5deb3",
          animated: { type: "bob", speed: 2 },
        },
        {
          type: "sphere",
          position: [0.1, 0.35, 0.08],
          size: [0.05],
          color: "#888888",
          emissive: "#d2b48c",
          animated: { type: "bob", speed: 2.5 },
        },
      ],
    },
  },
];
