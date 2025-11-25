/**
 * Steam Element - Tier 2 Towers (Fire + Water merge)
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

export const STEAM_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Steam Damage Tower
  {
    id: createTowerId(MergedElementT2.Steam, TowerCategory.Damage, 2),
    type: "steam_damage" as any,
    name: "Vapor Engine",
    description: "Releases pressurized steam blasts that burn and slow enemies.",
    element: MergedElementT2.Steam,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 45,
      attackSpeed: 1.05,
      range: 3.4,
      cost: 250,
      upgradeCost: 125,
      health: 140,
      armor: 8,
      magicPen: 3,
      armorPen: 2,
    },
    statusEffect: {
      type: StatusEffectType.Slow,
      chance: 0.3,
      duration: 1.5,
      strength: 0.2,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Steam, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["tsunami_damage_t3", "geyser_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.15,
      height: 1.4,
      effectColor: "#b0c4de",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.2, 0.3], color: "#555555" },
        { type: "cylinder", position: [0, 0.35, 0], size: [0.16, 0.4], color: "#606060" },
        { type: "sphere", position: [0, 0.7, 0], size: [0.18], color: "#666666" },
        {
          type: "sphere",
          position: [0, 0.95, 0],
          size: [0.1],
          color: "#888888",
          emissive: "#b0c4de",
          animated: { type: "pulse", speed: 2 },
        },
        {
          type: "sphere",
          position: [0.1, 0.85, 0.05],
          size: [0.05],
          color: "#aaaaaa",
          emissive: "#f0f8ff",
          animated: { type: "bob", speed: 3 },
        },
      ],
    },
  },

  // 2. Steam Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Steam, TowerCategory.MagicDamage, 2),
    type: "steam_magic_damage" as any,
    name: "Mist Channeler",
    description: "Conjures scalding mist that bypasses physical defenses.",
    element: MergedElementT2.Steam,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 38,
      attackSpeed: 0.95,
      range: 3.8,
      cost: 280,
      upgradeCost: 140,
      health: 115,
      armor: 5,
      magicPen: 10,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Water, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Steam, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["tsunami_magic_damage_t3", "geyser_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.1,
      height: 1.3,
      effectColor: "#f0f8ff",
      parts: [
        { type: "octahedron", position: [0, 0.25, 0], size: [0.18], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.6, 0],
          size: [0.14],
          color: "#666666",
          emissive: "#b0c4de",
          animated: { type: "rotate", speed: 1, axis: "y" },
        },
        {
          type: "sphere",
          position: [0, 0.85, 0],
          size: [0.08],
          color: "#888888",
          emissive: "#f0f8ff",
          animated: { type: "bob", speed: 1.5 },
        },
      ],
    },
  },

  // 3. Steam Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Steam, TowerCategory.PhysicalDamage, 2),
    type: "steam_physical_damage" as any,
    name: "Pressure Cannon",
    description: "Fires superheated water jets that deal massive physical damage.",
    element: MergedElementT2.Steam,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 65,
      attackSpeed: 0.7,
      range: 3.0,
      cost: 300,
      upgradeCost: 150,
      health: 165,
      armor: 10,
      magicPen: 0,
      armorPen: 5,
      splashRadius: 0.5,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Water, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Steam, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["tsunami_physical_damage_t3", "geyser_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.2,
      height: 1.5,
      effectColor: "#b0c4de",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.25], color: "#555555" },
        { type: "box", position: [0, 0.3, 0], size: [0.2, 0.2, 0.2], color: "#606060" },
        { type: "cylinder", position: [0, 0.5, 0.1], rotation: [0.3, 0, 0], size: [0.1, 0.4], color: "#666666" },
        {
          type: "sphere",
          position: [0, 0.65, 0.35],
          size: [0.06],
          color: "#888888",
          emissive: "#f0f8ff",
        },
      ],
    },
  },

  // 4. Steam Buff Tower
  {
    id: createTowerId(MergedElementT2.Steam, TowerCategory.Buff, 2),
    type: "steam_buff" as any,
    name: "Thermal Vent",
    description: "Releases warm vapor that energizes nearby towers, boosting damage and range.",
    element: MergedElementT2.Steam,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 12,
      attackSpeed: 0.5,
      range: 4.5,
      cost: 320,
      upgradeCost: 160,
      health: 130,
      armor: 7,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Damage,
      radius: 3.0,
      strength: 0.2,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Water, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Steam, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["tsunami_buff_t3", "geyser_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.1,
      height: 1.2,
      effectColor: "#f0f8ff",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.25, 0.15], color: "#555555" },
        { type: "cylinder", position: [0, 0.2, 0], size: [0.1, 0.4], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.7, 0],
          size: [0.18],
          color: "#777777",
          emissive: "#b0c4de",
          animated: { type: "pulse", speed: 1.2 },
        },
        { type: "torus", position: [0, 0.1, 0], rotation: [1.57, 0, 0], size: [0.4, 0.02], color: "#b0c4de44" },
      ],
    },
  },

  // 5. Steam Debuff Tower
  {
    id: createTowerId(MergedElementT2.Steam, TowerCategory.Debuff, 2),
    type: "steam_debuff" as any,
    name: "Scalding Geyser",
    description: "Blasts enemies with scalding steam, burning and slowing them.",
    element: MergedElementT2.Steam,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 20,
      attackSpeed: 1.1,
      range: 3.2,
      cost: 260,
      upgradeCost: 130,
      health: 120,
      armor: 6,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.5,
      duration: 3,
      strength: 8,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Water, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Steam, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["tsunami_debuff_t3", "geyser_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.1,
      height: 1.0,
      effectColor: "#b0c4de",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.2, 0.12], color: "#555555" },
        { type: "cone", position: [0, 0.2, 0], size: [0.15, 0.25], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.5, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#f0f8ff",
          animated: { type: "bob", speed: 2 },
        },
        {
          type: "sphere",
          position: [0.08, 0.6, 0.05],
          size: [0.05],
          color: "#888888",
          emissive: "#b0c4de",
          animated: { type: "bob", speed: 2.5 },
        },
      ],
    },
  },
];
