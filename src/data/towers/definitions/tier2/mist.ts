/**
 * Mist Element - Tier 2 Towers (Water + Air merge)
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

export const MIST_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Mist Damage Tower
  {
    id: createTowerId(MergedElementT2.Mist, TowerCategory.Damage, 2),
    type: "mist_damage" as any,
    name: "Fog Weaver",
    description: "Creates obscuring mist that damages enemies passing through.",
    element: MergedElementT2.Mist,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 38,
      attackSpeed: 1.2,
      range: 3.8,
      cost: 240,
      upgradeCost: 120,
      health: 115,
      armor: 5,
      magicPen: 4,
      armorPen: 2,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Air, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Mist, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["cyclone_damage_t3", "monsoon_damage_t3"],
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.1,
      height: 1.3,
      effectColor: "#d3d3d3",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.16, 0.3], color: "#555555" },
        { type: "sphere", position: [0, 0.45, 0], size: [0.18], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.75, 0],
          size: [0.12],
          color: "#888888",
          emissive: "#d3d3d3",
          animated: { type: "pulse", speed: 1.5 },
        },
        {
          type: "sphere",
          position: [0.12, 0.6, 0.08],
          size: [0.06],
          color: "#aaaaaa",
          emissive: "#f5f5f5",
          animated: { type: "bob", speed: 2 },
        },
      ],
    },
  },

  // 2. Mist Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Mist, TowerCategory.MagicDamage, 2),
    type: "mist_magic_damage" as any,
    name: "Vapor Sage",
    description: "Conjures ethereal mist magic that phases through defenses.",
    element: MergedElementT2.Mist,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 32,
      attackSpeed: 1.15,
      range: 4.2,
      cost: 270,
      upgradeCost: 135,
      health: 95,
      armor: 4,
      magicPen: 11,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Air, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Mist, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["cyclone_magic_damage_t3", "monsoon_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.1,
      height: 1.2,
      effectColor: "#f5f5f5",
      parts: [
        { type: "octahedron", position: [0, 0.2, 0], size: [0.14], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.5, 0],
          size: [0.12],
          color: "#666666",
          emissive: "#d3d3d3",
          animated: { type: "rotate", speed: 0.7, axis: "y" },
        },
        {
          type: "sphere",
          position: [0, 0.75, 0],
          size: [0.08],
          color: "#888888",
          emissive: "#f5f5f5",
          animated: { type: "bob", speed: 1.2 },
        },
      ],
    },
  },

  // 3. Mist Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Mist, TowerCategory.PhysicalDamage, 2),
    type: "mist_physical_damage" as any,
    name: "Condensation Blaster",
    description: "Fires concentrated water droplets at high velocity.",
    element: MergedElementT2.Mist,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 55,
      attackSpeed: 0.95,
      range: 3.2,
      cost: 290,
      upgradeCost: 145,
      health: 130,
      armor: 7,
      magicPen: 0,
      armorPen: 4,
      critChance: 0.1,
      critMultiplier: 1.7,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Air, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Mist, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["cyclone_physical_damage_t3", "monsoon_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.15,
      height: 1.4,
      effectColor: "#d3d3d3",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.2, 0.22], color: "#555555" },
        { type: "box", position: [0, 0.25, 0], size: [0.18, 0.18, 0.18], color: "#606060" },
        { type: "cylinder", position: [0, 0.45, 0.08], rotation: [0.25, 0, 0], size: [0.08, 0.35], color: "#666666" },
        {
          type: "sphere",
          position: [0, 0.6, 0.28],
          size: [0.05],
          color: "#888888",
          emissive: "#f5f5f5",
        },
      ],
    },
  },

  // 4. Mist Buff Tower
  {
    id: createTowerId(MergedElementT2.Mist, TowerCategory.Buff, 2),
    type: "mist_buff" as any,
    name: "Shroud Generator",
    description: "Cloaks nearby towers in protective mist, increasing their evasion.",
    element: MergedElementT2.Mist,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 10,
      attackSpeed: 0.5,
      range: 4.5,
      cost: 310,
      upgradeCost: 155,
      health: 110,
      armor: 5,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Range,
      radius: 3.5,
      strength: 0.15,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Air, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Mist, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["cyclone_buff_t3", "monsoon_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.1,
      height: 1.2,
      effectColor: "#f5f5f5",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.12], color: "#555555" },
        { type: "cylinder", position: [0, 0.15, 0], size: [0.08, 0.35], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.6, 0],
          size: [0.16],
          color: "#777777",
          emissive: "#d3d3d3",
          animated: { type: "pulse", speed: 1 },
        },
        { type: "torus", position: [0, 0.6, 0], rotation: [1.57, 0, 0], size: [0.25, 0.015], color: "#d3d3d344" },
      ],
    },
  },

  // 5. Mist Debuff Tower
  {
    id: createTowerId(MergedElementT2.Mist, TowerCategory.Debuff, 2),
    type: "mist_debuff" as any,
    name: "Confusion Cloud",
    description: "Creates disorienting fog that weakens and slows enemies.",
    element: MergedElementT2.Mist,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 16,
      attackSpeed: 1.25,
      range: 3.5,
      cost: 250,
      upgradeCost: 125,
      health: 100,
      armor: 4,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Weaken,
      chance: 0.55,
      duration: 3.5,
      strength: 0.3,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Water, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Air, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Mist, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["cyclone_debuff_t3", "monsoon_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.05,
      height: 0.9,
      effectColor: "#d3d3d3",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.18, 0.1], color: "#555555" },
        {
          type: "sphere",
          position: [0, 0.25, 0],
          size: [0.14],
          color: "#666666",
          animated: { type: "pulse", speed: 1.2 },
        },
        {
          type: "sphere",
          position: [0, 0.5, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#f5f5f5",
          animated: { type: "bob", speed: 1.5 },
        },
        {
          type: "sphere",
          position: [0.1, 0.35, 0.08],
          size: [0.05],
          color: "#888888",
          emissive: "#d3d3d3",
          animated: { type: "bob", speed: 2 },
        },
      ],
    },
  },
];
