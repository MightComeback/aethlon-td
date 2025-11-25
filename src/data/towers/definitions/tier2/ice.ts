/**
 * Ice Element - Tier 2 Towers (Water + Earth merge)
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

export const ICE_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Ice Damage Tower
  {
    id: createTowerId(MergedElementT2.Ice, TowerCategory.Damage, 2),
    type: "ice_damage" as any,
    name: "Frost Spire",
    description: "Launches frozen projectiles that slow and damage enemies.",
    element: MergedElementT2.Ice,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 42,
      attackSpeed: 0.9,
      range: 3.3,
      cost: 250,
      upgradeCost: 125,
      health: 160,
      armor: 10,
      magicPen: 2,
      armorPen: 3,
    },
    statusEffect: {
      type: StatusEffectType.Slow,
      chance: 0.5,
      duration: 2,
      strength: 0.3,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Ice, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["blizzard_damage_t3", "aurora_damage_t3", "geyser_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.15,
      height: 1.4,
      effectColor: "#87ceeb",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.25, 0.2, 0.25], color: "#555555" },
        { type: "octahedron", position: [0, 0.4, 0], size: [0.18], color: "#606060" },
        {
          type: "octahedron",
          position: [0, 0.75, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#87ceeb",
          animated: { type: "rotate", speed: 0.8, axis: "y" },
        },
        {
          type: "cone",
          position: [0.1, 0.55, 0.08],
          rotation: [0, 0, 0.3],
          size: [0.04, 0.15],
          color: "#888888",
          emissive: "#e0ffff",
        },
      ],
    },
  },

  // 2. Ice Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Ice, TowerCategory.MagicDamage, 2),
    type: "ice_magic_damage" as any,
    name: "Glacial Prism",
    description: "Channels frozen magic that shatters enemy defenses.",
    element: MergedElementT2.Ice,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 36,
      attackSpeed: 0.85,
      range: 3.6,
      cost: 280,
      upgradeCost: 140,
      health: 130,
      armor: 8,
      magicPen: 10,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Earth, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Ice, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["blizzard_magic_damage_t3", "aurora_magic_damage_t3", "geyser_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.1,
      height: 1.3,
      effectColor: "#e0ffff",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.15, 0.2], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.45, 0],
          size: [0.16],
          color: "#666666",
          emissive: "#87ceeb",
          animated: { type: "rotate", speed: 0.6, axis: "y" },
        },
        {
          type: "octahedron",
          position: [0, 0.8, 0],
          size: [0.08],
          color: "#888888",
          emissive: "#e0ffff",
          animated: { type: "bob", speed: 1.2 },
        },
      ],
    },
  },

  // 3. Ice Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Ice, TowerCategory.PhysicalDamage, 2),
    type: "ice_physical_damage" as any,
    name: "Avalanche Engine",
    description: "Hurls massive ice boulders with crushing force.",
    element: MergedElementT2.Ice,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 68,
      attackSpeed: 0.6,
      range: 2.8,
      cost: 300,
      upgradeCost: 150,
      health: 190,
      armor: 14,
      magicPen: 0,
      armorPen: 5,
      splashRadius: 0.8,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Earth, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Ice, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["blizzard_physical_damage_t3", "aurora_physical_damage_t3", "geyser_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.2,
      height: 1.4,
      effectColor: "#87ceeb",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.25, 0.3], color: "#555555" },
        { type: "box", position: [0, 0.3, 0], size: [0.22, 0.2, 0.22], color: "#606060" },
        { type: "cylinder", position: [0, 0.5, 0.08], rotation: [0.3, 0, 0], size: [0.1, 0.35], color: "#666666" },
        {
          type: "sphere",
          position: [0, 0.65, 0.25],
          size: [0.1],
          color: "#888888",
          emissive: "#e0ffff",
        },
      ],
    },
  },

  // 4. Ice Buff Tower
  {
    id: createTowerId(MergedElementT2.Ice, TowerCategory.Buff, 2),
    type: "ice_buff" as any,
    name: "Permafrost Monolith",
    description: "Fortifies nearby towers with icy resilience, boosting armor and range.",
    element: MergedElementT2.Ice,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 10,
      attackSpeed: 0.45,
      range: 4.0,
      cost: 320,
      upgradeCost: 160,
      health: 200,
      armor: 16,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Range,
      radius: 3.0,
      strength: 0.18,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Earth, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Ice, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["blizzard_buff_t3", "aurora_buff_t3", "geyser_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.15,
      height: 1.4,
      effectColor: "#e0ffff",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.15, 0.28], color: "#555555" },
        { type: "box", position: [0, 0.25, 0], size: [0.2, 0.45, 0.2], color: "#606060" },
        {
          type: "octahedron",
          position: [0, 0.75, 0],
          size: [0.14],
          color: "#777777",
          emissive: "#87ceeb",
          animated: { type: "pulse", speed: 0.8 },
        },
        { type: "torus", position: [0, 0.1, 0], rotation: [1.57, 0, 0], size: [0.4, 0.02], color: "#87ceeb44" },
      ],
    },
  },

  // 5. Ice Debuff Tower
  {
    id: createTowerId(MergedElementT2.Ice, TowerCategory.Debuff, 2),
    type: "ice_debuff" as any,
    name: "Frostbite Trap",
    description: "Encases enemies in ice, freezing and slowing them severely.",
    element: MergedElementT2.Ice,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 18,
      attackSpeed: 0.95,
      range: 3.0,
      cost: 260,
      upgradeCost: 130,
      health: 150,
      armor: 10,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Freeze,
      chance: 0.25,
      duration: 1.5,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Earth, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Ice, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["blizzard_debuff_t3", "aurora_debuff_t3", "geyser_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.1,
      height: 1.1,
      effectColor: "#87ceeb",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.25, 0.1, 0.25], color: "#555555" },
        { type: "octahedron", position: [0, 0.3, 0], size: [0.15], color: "#606060" },
        {
          type: "octahedron",
          position: [0, 0.55, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#e0ffff",
          animated: { type: "pulse", speed: 1 },
        },
        {
          type: "cone",
          position: [0.08, 0.4, 0.06],
          rotation: [0, 0, 0.4],
          size: [0.03, 0.1],
          color: "#888888",
          emissive: "#87ceeb",
        },
      ],
    },
  },
];
