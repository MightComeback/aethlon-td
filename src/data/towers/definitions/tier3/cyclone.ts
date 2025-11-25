/**
 * Cyclone Element - Tier 3 Towers (Mist + Air mastery)
 * Spiraling wind and mist power
 */

import {
  TowerCategory,
  TowerRarity,
  BuffType,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { MergedElementT2, MergedElementT3, BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

export const CYCLONE_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Cyclone Damage Tower
  {
    id: createTowerId(MergedElementT3.Cyclone, TowerCategory.Damage, 3),
    type: "cyclone_damage" as any,
    name: "Vortex Spire",
    description: "Creates devastating cyclones that scatter and damage enemies.",
    element: MergedElementT3.Cyclone,
    category: TowerCategory.Damage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 72,
      attackSpeed: 1.25,
      range: 3.8,
      cost: 590,
      upgradeCost: 295,
      health: 190,
      armor: 8,
      magicPen: 5,
      armorPen: 5,
      critChance: 0.16,
      critMultiplier: 1.9,
    },
    ability: {
      id: "tornado",
      name: "Tornado",
      description: "Spawns a tornado that pulls enemies together and damages them.",
      cooldown: 15000,
      duration: 3000,
      strength: 2.0,
      type: "active",
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Mist, TowerCategory.Damage, 2),
        createTowerId(BaseElement.Air, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Cyclone, TowerCategory.Damage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.4,
      height: 1.8,
      effectColor: "#b0c4de",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.25, 0.4], color: "#3a3a3a" },
        { type: "cylinder", position: [0, 0.4, 0], size: [0.14, 0.5], color: "#444444" },
        { type: "sphere", position: [0, 0.85, 0], size: [0.14], color: "#555555", emissive: "#b0c4de", animated: { type: "rotate", speed: 4, axis: "y" } },
        { type: "torus", position: [0, 0.85, 0], rotation: [1.57, 0, 0], size: [0.25, 0.02], color: "#fffafa44", animated: { type: "rotate", speed: 5, axis: "y" } },
        { type: "cone", position: [0, 1.1, 0], size: [0.06, 0.15], color: "#888888", emissive: "#fffafa", animated: { type: "rotate", speed: 6, axis: "y" } },
      ],
    },
  },

  // 2. Cyclone Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Cyclone, TowerCategory.MagicDamage, 3),
    type: "cyclone_magic_damage" as any,
    name: "Mistweave Focus",
    description: "Channels swirling mist magic that confuses and damages enemies.",
    element: MergedElementT3.Cyclone,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 62,
      attackSpeed: 1.15,
      range: 4.2,
      cost: 640,
      upgradeCost: 320,
      health: 165,
      armor: 6,
      magicPen: 18,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Mist, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Air, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Cyclone, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.35,
      height: 1.6,
      effectColor: "#fffafa",
      parts: [
        { type: "octahedron", position: [0, 0.2, 0], size: [0.16], color: "#3a3a3a" },
        { type: "dodecahedron", position: [0, 0.55, 0], size: [0.14], color: "#444444", emissive: "#b0c4de", animated: { type: "rotate", speed: 1.2, axis: "y" } },
        { type: "sphere", position: [0, 0.85, 0], size: [0.1], color: "#888888", emissive: "#fffafa", animated: { type: "pulse", speed: 2 } },
      ],
    },
  },

  // 3. Cyclone Physical Damage Tower
  {
    id: createTowerId(MergedElementT3.Cyclone, TowerCategory.PhysicalDamage, 3),
    type: "cyclone_physical_damage" as any,
    name: "Wind Shear Cannon",
    description: "Fires concentrated wind blades at extreme speeds.",
    element: MergedElementT3.Cyclone,
    category: TowerCategory.PhysicalDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 95,
      attackSpeed: 0.9,
      range: 3.5,
      cost: 690,
      upgradeCost: 345,
      health: 200,
      armor: 10,
      magicPen: 0,
      armorPen: 12,
      critChance: 0.2,
      critMultiplier: 2.1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Mist, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Air, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Cyclone, TowerCategory.PhysicalDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.4,
      height: 1.7,
      effectColor: "#b0c4de",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.24, 0.35], color: "#3a3a3a" },
        { type: "cylinder", position: [0, 0.35, 0], size: [0.14, 0.28], color: "#444444" },
        { type: "cylinder", position: [0, 0.6, 0.1], rotation: [0.2, 0, 0], size: [0.07, 0.45], color: "#555555" },
        { type: "cone", position: [0, 0.85, 0.35], rotation: [0.2, 0, 0], size: [0.04, 0.12], color: "#888888", emissive: "#fffafa", animated: { type: "rotate", speed: 8, axis: "z" } },
      ],
    },
  },

  // 4. Cyclone Buff Tower
  {
    id: createTowerId(MergedElementT3.Cyclone, TowerCategory.Buff, 3),
    type: "cyclone_buff" as any,
    name: "Wind's Eye",
    description: "Creates a calm eye in the storm that greatly enhances nearby towers' range.",
    element: MergedElementT3.Cyclone,
    category: TowerCategory.Buff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 15,
      attackSpeed: 0.5,
      range: 4.8,
      cost: 710,
      upgradeCost: 355,
      health: 175,
      armor: 7,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Range,
      radius: 4.5,
      strength: 0.32,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Mist, TowerCategory.Buff, 2),
        createTowerId(BaseElement.Air, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT3.Cyclone, TowerCategory.Buff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.35,
      height: 1.5,
      effectColor: "#fffafa",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.26, 0.3], color: "#3a3a3a" },
        { type: "cylinder", position: [0, 0.3, 0], size: [0.1, 0.4], color: "#444444" },
        { type: "sphere", position: [0, 0.8, 0], size: [0.16], color: "#555555", emissive: "#b0c4de", animated: { type: "rotate", speed: 2, axis: "y" } },
        { type: "torus", position: [0, 0.8, 0], rotation: [1.57, 0, 0], size: [0.32, 0.015], color: "#fffafa44", animated: { type: "rotate", speed: 3, axis: "y" } },
      ],
    },
  },

  // 5. Cyclone Debuff Tower
  {
    id: createTowerId(MergedElementT3.Cyclone, TowerCategory.Debuff, 3),
    type: "cyclone_debuff" as any,
    name: "Disorientation Field",
    description: "Creates swirling mist that heavily weakens and slows enemies.",
    element: MergedElementT3.Cyclone,
    category: TowerCategory.Debuff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 32,
      attackSpeed: 1.1,
      range: 3.8,
      cost: 670,
      upgradeCost: 335,
      health: 180,
      armor: 8,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Weaken,
      chance: 0.7,
      duration: 4.5,
      strength: 0.45,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Mist, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Air, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT3.Cyclone, TowerCategory.Debuff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.3,
      height: 1.3,
      effectColor: "#b0c4de",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.2, 0.1], color: "#3a3a3a" },
        { type: "torus", position: [0, 0.22, 0], rotation: [1.57, 0, 0], size: [0.16, 0.035], color: "#444444", animated: { type: "rotate", speed: 2, axis: "y" } },
        { type: "sphere", position: [0, 0.45, 0], size: [0.12], color: "#555555", emissive: "#b0c4de", animated: { type: "pulse", speed: 1.5 } },
        { type: "torus", position: [0, 0.6, 0], rotation: [1.57, 0, 0], size: [0.1, 0.025], color: "#888888", emissive: "#fffafa", animated: { type: "rotate", speed: -3, axis: "y" } },
      ],
    },
  },
];
