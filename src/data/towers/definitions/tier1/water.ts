/**
 * Water Element - Tier 1 Base Towers
 * 5 towers (one per category: Damage, MagicDamage, PhysicalDamage, Buff, Debuff)
 */

import {
  TowerCategory,
  TowerRarity,
  BuffType,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

export const WATER_TIER1_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Water Damage Tower - Balanced damage dealer
  {
    id: createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
    type: "water_damage" as any,
    name: "Tidal Spout",
    description: "A flowing water tower that sprays enemies with high-pressure jets.",
    element: BaseElement.Water,
    category: TowerCategory.Damage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 22,
      attackSpeed: 1.1,
      range: 3.2,
      cost: 100,
      upgradeCost: 50,
      health: 95,
      armor: 4,
      magicPen: 0,
      armorPen: 0,
    },
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.0,
      height: 1.2,
      effectColor: "#1e90ff",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.18, 0.35], color: "#555555" },
        { type: "sphere", position: [0, 0.5, 0], size: [0.2], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.8, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#1e90ff",
          animated: { type: "bob", speed: 2 },
        },
      ],
    },
    mergeOutput: ["steam_damage_t2", "ice_damage_t2", "mist_damage_t2", "tempest_damage_t2"],
  },

  // 2. Water Magic Damage Tower - Magic specialist
  {
    id: createTowerId(BaseElement.Water, TowerCategory.MagicDamage, 1),
    type: "water_magic_damage" as any,
    name: "Aqua Prism",
    description: "Channels water magic that pierces through armor like a flowing stream.",
    element: BaseElement.Water,
    category: TowerCategory.MagicDamage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 18,
      attackSpeed: 1.0,
      range: 3.5,
      cost: 120,
      upgradeCost: 60,
      health: 75,
      armor: 3,
      magicPen: 6,
      armorPen: 0,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.0,
      height: 1.0,
      effectColor: "#00ced1",
      parts: [
        { type: "octahedron", position: [0, 0.25, 0], size: [0.18], color: "#555555" },
        {
          type: "octahedron",
          position: [0, 0.65, 0],
          size: [0.14],
          color: "#666666",
          emissive: "#00ced1",
          animated: { type: "rotate", speed: 0.8, axis: "y" },
        },
      ],
    },
    mergeOutput: ["steam_magic_damage_t2", "ice_magic_damage_t2", "mist_magic_damage_t2", "tempest_magic_damage_t2"],
  },

  // 3. Water Physical Damage Tower - Heavy hitter
  {
    id: createTowerId(BaseElement.Water, TowerCategory.PhysicalDamage, 1),
    type: "water_physical_damage" as any,
    name: "Hydro Ram",
    description: "Blasts enemies with concentrated water pressure that knocks them back.",
    element: BaseElement.Water,
    category: TowerCategory.PhysicalDamage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 32,
      attackSpeed: 0.75,
      range: 2.6,
      cost: 130,
      upgradeCost: 65,
      health: 110,
      armor: 6,
      magicPen: 0,
      armorPen: 2,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.0,
      height: 1.3,
      effectColor: "#1e90ff",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.25], color: "#555555" },
        { type: "box", position: [0, 0.3, 0], size: [0.2, 0.2, 0.2], color: "#606060" },
        { type: "cylinder", position: [0, 0.5, 0.1], rotation: [0.4, 0, 0], size: [0.08, 0.35], color: "#666666" },
        {
          type: "sphere",
          position: [0, 0.6, 0.3],
          size: [0.06],
          color: "#888888",
          emissive: "#1e90ff",
        },
      ],
    },
    mergeOutput: ["steam_physical_damage_t2", "ice_physical_damage_t2", "mist_physical_damage_t2", "tempest_physical_damage_t2"],
  },

  // 4. Water Buff Tower - Range aura
  {
    id: createTowerId(BaseElement.Water, TowerCategory.Buff, 1),
    type: "water_buff" as any,
    name: "Flowing Font",
    description: "Enhances nearby towers with the fluidity of water, increasing their range.",
    element: BaseElement.Water,
    category: TowerCategory.Buff,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 6,
      attackSpeed: 0.5,
      range: 4.0,
      cost: 150,
      upgradeCost: 75,
      health: 90,
      armor: 4,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Range,
      radius: 2.5,
      strength: 0.12,
      stackable: false,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.0,
      height: 1.0,
      effectColor: "#00bfff",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.15], color: "#555555" },
        { type: "cylinder", position: [0, 0.2, 0], size: [0.12, 0.3], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.6, 0],
          size: [0.18],
          color: "#777777",
          emissive: "#00bfff",
          animated: { type: "pulse", speed: 1.2 },
        },
        { type: "torus", position: [0, 0.1, 0], rotation: [1.57, 0, 0], size: [0.35, 0.02], color: "#1e90ff44" },
      ],
    },
    mergeOutput: ["steam_buff_t2", "ice_buff_t2", "mist_buff_t2", "tempest_buff_t2"],
  },

  // 5. Water Debuff Tower - Slow applier
  {
    id: createTowerId(BaseElement.Water, TowerCategory.Debuff, 1),
    type: "water_debuff" as any,
    name: "Riptide Snare",
    description: "Drenches enemies in viscous water, significantly slowing their movement.",
    element: BaseElement.Water,
    category: TowerCategory.Debuff,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 10,
      attackSpeed: 1.3,
      range: 3.0,
      cost: 110,
      upgradeCost: 55,
      health: 85,
      armor: 3,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Slow,
      chance: 0.7,
      duration: 2.5,
      strength: 0.35,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.0,
      height: 0.9,
      effectColor: "#1e90ff",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.08, 0.28], color: "#555555" },
        { type: "cylinder", position: [0, 0.15, 0], size: [0.15, 0.2], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.4, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#00ced1",
          animated: { type: "bob", speed: 1.5 },
        },
        {
          type: "sphere",
          position: [0.1, 0.35, 0.05],
          size: [0.05],
          color: "#888888",
          emissive: "#1e90ff",
          animated: { type: "bob", speed: 2 },
        },
        {
          type: "sphere",
          position: [-0.08, 0.38, -0.06],
          size: [0.04],
          color: "#888888",
          emissive: "#1e90ff",
          animated: { type: "bob", speed: 2.3 },
        },
      ],
    },
    mergeOutput: ["steam_debuff_t2", "ice_debuff_t2", "mist_debuff_t2", "tempest_debuff_t2"],
  },
];
