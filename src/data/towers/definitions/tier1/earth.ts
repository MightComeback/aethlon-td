/**
 * Earth Element - Tier 1 Base Towers
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

export const EARTH_TIER1_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Earth Damage Tower - High health and armor
  {
    id: createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
    type: "earth_damage" as any,
    name: "Stone Bastion",
    description: "A sturdy earth tower that hurls rocks at enemies.",
    element: BaseElement.Earth,
    category: TowerCategory.Damage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 22,
      attackSpeed: 0.8,
      range: 2.8,
      cost: 100,
      upgradeCost: 50,
      health: 150,
      armor: 12,
      magicPen: 0,
      armorPen: 2,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.0,
      height: 1.3,
      effectColor: "#8b4513",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.3, 0.3], color: "#444444" },
        { type: "box", position: [0, 0.4, 0], size: [0.22, 0.35, 0.22], color: "#555555" },
        { type: "box", position: [0, 0.7, 0], size: [0.25, 0.1, 0.25], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.85, 0],
          size: [0.12],
          color: "#666666",
          animated: { type: "bob", speed: 0.8 },
        },
      ],
    },
    mergeOutput: ["lava_damage_t2", "ice_damage_t2", "dust_damage_t2", "crystal_damage_t2"],
  },

  // 2. Earth Magic Damage Tower - Geomancy specialist
  {
    id: createTowerId(BaseElement.Earth, TowerCategory.MagicDamage, 1),
    type: "earth_magic_damage" as any,
    name: "Geode Shrine",
    description: "Channels earth magic through crystalline formations.",
    element: BaseElement.Earth,
    category: TowerCategory.MagicDamage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 18,
      attackSpeed: 0.85,
      range: 3.2,
      cost: 120,
      upgradeCost: 60,
      health: 120,
      armor: 8,
      magicPen: 5,
      armorPen: 0,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.0,
      height: 1.1,
      effectColor: "#daa520",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.25, 0.15, 0.25], color: "#444444" },
        { type: "octahedron", position: [0, 0.35, 0], size: [0.15], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.6, 0],
          size: [0.12],
          color: "#666666",
          emissive: "#daa520",
          animated: { type: "rotate", speed: 0.5, axis: "y" },
        },
      ],
    },
    mergeOutput: ["lava_magic_damage_t2", "ice_magic_damage_t2", "dust_magic_damage_t2", "crystal_magic_damage_t2"],
  },

  // 3. Earth Physical Damage Tower - Armor shredder
  {
    id: createTowerId(BaseElement.Earth, TowerCategory.PhysicalDamage, 1),
    type: "earth_physical_damage" as any,
    name: "Boulder Catapult",
    description: "Launches massive boulders that crush through enemy armor.",
    element: BaseElement.Earth,
    category: TowerCategory.PhysicalDamage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 40,
      attackSpeed: 0.55,
      range: 2.5,
      cost: 130,
      upgradeCost: 65,
      health: 160,
      armor: 15,
      magicPen: 0,
      armorPen: 6,
      splashRadius: 0.6,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.0,
      height: 1.2,
      effectColor: "#8b4513",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.35, 0.2, 0.35], color: "#444444" },
        { type: "box", position: [0, 0.25, 0], size: [0.25, 0.15, 0.25], color: "#555555" },
        { type: "cylinder", position: [0, 0.4, 0], rotation: [0.3, 0, 0], size: [0.08, 0.35], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.55, 0.15],
          size: [0.1],
          color: "#666666",
        },
      ],
    },
    mergeOutput: ["lava_physical_damage_t2", "ice_physical_damage_t2", "dust_physical_damage_t2", "crystal_physical_damage_t2"],
  },

  // 4. Earth Buff Tower - Armor aura
  {
    id: createTowerId(BaseElement.Earth, TowerCategory.Buff, 1),
    type: "earth_buff" as any,
    name: "Stone Sentinel",
    description: "Fortifies nearby towers with earthen resilience, increasing their armor.",
    element: BaseElement.Earth,
    category: TowerCategory.Buff,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 5,
      attackSpeed: 0.4,
      range: 3.5,
      cost: 150,
      upgradeCost: 75,
      health: 180,
      armor: 18,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.ArmorPen,
      radius: 2.5,
      strength: 0.2,
      stackable: false,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.0,
      height: 1.3,
      effectColor: "#daa520",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.2, 0.3], color: "#444444" },
        { type: "box", position: [0, 0.3, 0], size: [0.2, 0.4, 0.2], color: "#555555" },
        { type: "box", position: [0, 0.65, 0], size: [0.25, 0.1, 0.25], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.85, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#daa520",
          animated: { type: "pulse", speed: 0.8 },
        },
        { type: "torus", position: [0, 0.15, 0], rotation: [1.57, 0, 0], size: [0.4, 0.02], color: "#8b451344" },
      ],
    },
    mergeOutput: ["lava_buff_t2", "ice_buff_t2", "dust_buff_t2", "crystal_buff_t2"],
  },

  // 5. Earth Debuff Tower - Armor shred applier
  {
    id: createTowerId(BaseElement.Earth, TowerCategory.Debuff, 1),
    type: "earth_debuff" as any,
    name: "Quake Spire",
    description: "Causes tremors that crack enemy armor, reducing their defenses.",
    element: BaseElement.Earth,
    category: TowerCategory.Debuff,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 12,
      attackSpeed: 0.9,
      range: 2.8,
      cost: 110,
      upgradeCost: 55,
      health: 130,
      armor: 10,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.ArmorShred,
      chance: 0.5,
      duration: 4,
      strength: 8,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.0,
      height: 1.0,
      effectColor: "#8b4513",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.1, 0.3], color: "#444444" },
        { type: "cone", position: [0, 0.2, 0], size: [0.18, 0.3], color: "#555555" },
        { type: "cone", position: [0, 0.45, 0], size: [0.12, 0.25], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.7, 0],
          size: [0.08],
          color: "#777777",
          emissive: "#daa520",
          animated: { type: "bob", speed: 1.2 },
        },
      ],
    },
    mergeOutput: ["lava_debuff_t2", "ice_debuff_t2", "dust_debuff_t2", "crystal_debuff_t2"],
  },
];
