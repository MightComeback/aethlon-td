/**
 * Tsunami Element - Tier 3 Towers (Steam + Water mastery)
 * Ultimate Water element specialization
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

export const TSUNAMI_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Tsunami Damage Tower
  {
    id: createTowerId(MergedElementT3.Tsunami, TowerCategory.Damage, 3),
    type: "tsunami_damage" as any,
    name: "Tidal Fortress",
    description: "Commands massive tidal waves that sweep away all enemies.",
    element: MergedElementT3.Tsunami,
    category: TowerCategory.Damage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 82,
      attackSpeed: 0.85,
      range: 3.8,
      cost: 610,
      upgradeCost: 305,
      health: 260,
      armor: 15,
      magicPen: 5,
      armorPen: 5,
      splashRadius: 1.6,
    },
    ability: {
      id: "tidal_wave",
      name: "Tidal Wave",
      description: "Summons a massive wave that knocks back and damages all enemies.",
      cooldown: 16000,
      duration: 2500,
      strength: 2.5,
      type: "active",
    },
    statusEffect: {
      type: StatusEffectType.Slow,
      chance: 0.65,
      duration: 3,
      strength: 0.4,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Steam, TowerCategory.Damage, 2),
        createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Tsunami, TowerCategory.Damage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.45,
      height: 1.9,
      effectColor: "#006994",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.24, 0.35], color: "#3a3a3a" },
        { type: "sphere", position: [0, 0.5, 0], size: [0.22], color: "#444444" },
        { type: "sphere", position: [0, 0.85, 0], size: [0.16], color: "#555555", emissive: "#006994", animated: { type: "bob", speed: 1.5 } },
        { type: "sphere", position: [0, 1.1, 0], size: [0.1], color: "#888888", emissive: "#00bfff", animated: { type: "pulse", speed: 2 } },
        { type: "sphere", position: [0.12, 0.7, 0.08], size: [0.05], color: "#aaaaaa", emissive: "#00bfff", animated: { type: "bob", speed: 2.5 } },
      ],
    },
  },

  // 2. Tsunami Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Tsunami, TowerCategory.MagicDamage, 3),
    type: "tsunami_magic_damage" as any,
    name: "Abyssal Conduit",
    description: "Channels deep ocean magic with overwhelming force.",
    element: MergedElementT3.Tsunami,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 70,
      attackSpeed: 0.8,
      range: 4.0,
      cost: 660,
      upgradeCost: 330,
      health: 220,
      armor: 12,
      magicPen: 18,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Steam, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Water, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Tsunami, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.4,
      height: 1.7,
      effectColor: "#00bfff",
      parts: [
        { type: "octahedron", position: [0, 0.25, 0], size: [0.2], color: "#3a3a3a" },
        { type: "dodecahedron", position: [0, 0.6, 0], size: [0.16], color: "#444444", emissive: "#006994", animated: { type: "rotate", speed: 0.8, axis: "y" } },
        { type: "sphere", position: [0, 0.95, 0], size: [0.1], color: "#888888", emissive: "#00bfff", animated: { type: "bob", speed: 1.5 } },
      ],
    },
  },

  // 3. Tsunami Physical Damage Tower
  {
    id: createTowerId(MergedElementT3.Tsunami, TowerCategory.PhysicalDamage, 3),
    type: "tsunami_physical_damage" as any,
    name: "Hydro Devastator",
    description: "Fires concentrated water blasts with crushing pressure.",
    element: MergedElementT3.Tsunami,
    category: TowerCategory.PhysicalDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 108,
      attackSpeed: 0.6,
      range: 3.3,
      cost: 710,
      upgradeCost: 355,
      health: 290,
      armor: 18,
      magicPen: 0,
      armorPen: 12,
      splashRadius: 1.2,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Steam, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Water, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Tsunami, TowerCategory.PhysicalDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.5,
      height: 1.8,
      effectColor: "#006994",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.26, 0.3], color: "#3a3a3a" },
        { type: "box", position: [0, 0.35, 0], size: [0.22, 0.22, 0.22], color: "#444444" },
        { type: "cylinder", position: [0, 0.6, 0.1], rotation: [0.3, 0, 0], size: [0.1, 0.45], color: "#555555" },
        { type: "sphere", position: [0, 0.8, 0.35], size: [0.08], color: "#888888", emissive: "#00bfff" },
      ],
    },
  },

  // 4. Tsunami Buff Tower
  {
    id: createTowerId(MergedElementT3.Tsunami, TowerCategory.Buff, 3),
    type: "tsunami_buff" as any,
    name: "Oceanic Sanctuary",
    description: "Creates calming waters that enhance nearby towers' damage and range.",
    element: MergedElementT3.Tsunami,
    category: TowerCategory.Buff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 18,
      attackSpeed: 0.4,
      range: 4.5,
      cost: 730,
      upgradeCost: 365,
      health: 250,
      armor: 14,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Damage,
      radius: 4.0,
      strength: 0.28,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Steam, TowerCategory.Buff, 2),
        createTowerId(BaseElement.Water, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT3.Tsunami, TowerCategory.Buff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.4,
      height: 1.6,
      effectColor: "#00bfff",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.28, 0.15], color: "#3a3a3a" },
        { type: "cylinder", position: [0, 0.2, 0], size: [0.12, 0.45], color: "#444444" },
        { type: "sphere", position: [0, 0.75, 0], size: [0.2], color: "#555555", emissive: "#006994", animated: { type: "pulse", speed: 1 } },
        { type: "torus", position: [0, 0.1, 0], rotation: [1.57, 0, 0], size: [0.45, 0.025], color: "#00bfff44" },
      ],
    },
  },

  // 5. Tsunami Debuff Tower
  {
    id: createTowerId(MergedElementT3.Tsunami, TowerCategory.Debuff, 3),
    type: "tsunami_debuff" as any,
    name: "Drowning Depths",
    description: "Engulfs enemies in crushing water pressure, severely slowing and weakening them.",
    element: MergedElementT3.Tsunami,
    category: TowerCategory.Debuff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 35,
      attackSpeed: 0.9,
      range: 3.5,
      cost: 690,
      upgradeCost: 345,
      health: 240,
      armor: 13,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Slow,
      chance: 0.8,
      duration: 4,
      strength: 0.55,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Steam, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Water, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT3.Tsunami, TowerCategory.Debuff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.35,
      height: 1.4,
      effectColor: "#006994",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.12], color: "#3a3a3a" },
        { type: "sphere", position: [0, 0.28, 0], size: [0.18], color: "#444444" },
        { type: "sphere", position: [0, 0.55, 0], size: [0.12], color: "#555555", emissive: "#006994", animated: { type: "pulse", speed: 1.5 } },
        { type: "sphere", position: [0.1, 0.4, 0.08], size: [0.05], color: "#888888", emissive: "#00bfff", animated: { type: "bob", speed: 2 } },
      ],
    },
  },
];
