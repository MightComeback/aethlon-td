/**
 * Volcano Element - Tier 3 Towers (Lava + Fire mastery)
 * Ultimate Fire element specialization
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

export const VOLCANO_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Volcano Damage Tower
  {
    id: createTowerId(MergedElementT3.Volcano, TowerCategory.Damage, 3),
    type: "volcano_damage" as any,
    name: "Volcanic Fury",
    description: "The ultimate expression of fire power. Erupts periodically, devastating all nearby enemies.",
    element: MergedElementT3.Volcano,
    category: TowerCategory.Damage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 100,
      attackSpeed: 0.7,
      range: 3.5,
      cost: 600,
      upgradeCost: 300,
      health: 300,
      armor: 20,
      magicPen: 8,
      armorPen: 12,
      splashRadius: 1.5,
      critChance: 0.15,
      critMultiplier: 2.0,
    },
    ability: {
      id: "volcanic_eruption",
      name: "Volcanic Eruption",
      description: "Erupts violently, dealing 300% damage to all enemies in range.",
      cooldown: 15000,
      duration: 2000,
      strength: 3.0,
      type: "active",
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.8,
      duration: 5,
      strength: 15,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.Damage, 2),
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Volcano, TowerCategory.Damage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.5,
      height: 2.0,
      effectColor: "#ff2200",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.35, 0.6], color: "#3a3a3a" },
        { type: "cone", position: [0, 0.5, 0], size: [0.28, 0.5], color: "#444444" },
        { type: "cone", position: [0, 0.9, 0], size: [0.22, 0.4], color: "#4a4a4a" },
        { type: "torus", position: [0, 1.25, 0], rotation: [1.57, 0, 0], size: [0.18, 0.04], color: "#333333" },
        { type: "cylinder", position: [0, 1.2, 0], size: [0.14, 0.08], color: "#666666", emissive: "#ff4400", animated: { type: "pulse", speed: 1 } },
        { type: "sphere", position: [0, 1.4, 0], size: [0.1], color: "#888888", emissive: "#ff6600", animated: { type: "bob", speed: 3 } },
      ],
    },
  },

  // 2. Volcano Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Volcano, TowerCategory.MagicDamage, 3),
    type: "volcano_magic_damage" as any,
    name: "Pyroclastic Conduit",
    description: "Channels volcanic magic that incinerates magical resistance.",
    element: MergedElementT3.Volcano,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 85,
      attackSpeed: 0.65,
      range: 3.8,
      cost: 650,
      upgradeCost: 325,
      health: 260,
      armor: 17,
      magicPen: 20,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Fire, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Volcano, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.4,
      height: 1.8,
      effectColor: "#ff4500",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.28, 0.5], color: "#3a3a3a" },
        { type: "octahedron", position: [0, 0.6, 0], size: [0.22], color: "#444444" },
        { type: "dodecahedron", position: [0, 1.0, 0], size: [0.16], color: "#555555", emissive: "#ff4500", animated: { type: "rotate", speed: 1, axis: "y" } },
        { type: "sphere", position: [0, 1.3, 0], size: [0.1], color: "#888888", emissive: "#ff2200", animated: { type: "pulse", speed: 2 } },
      ],
    },
  },

  // 3. Volcano Physical Damage Tower
  {
    id: createTowerId(MergedElementT3.Volcano, TowerCategory.PhysicalDamage, 3),
    type: "volcano_physical_damage" as any,
    name: "Magma Siege Engine",
    description: "Launches massive volcanic boulders with catastrophic damage.",
    element: MergedElementT3.Volcano,
    category: TowerCategory.PhysicalDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 140,
      attackSpeed: 0.45,
      range: 3.2,
      cost: 700,
      upgradeCost: 350,
      health: 350,
      armor: 25,
      magicPen: 0,
      armorPen: 15,
      splashRadius: 1.8,
      critChance: 0.2,
      critMultiplier: 2.2,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Fire, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Volcano, TowerCategory.PhysicalDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.5,
      height: 2.0,
      effectColor: "#ff6347",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.35, 0.5], color: "#3a3a3a" },
        { type: "box", position: [0, 0.45, 0], size: [0.28, 0.25, 0.28], color: "#444444" },
        { type: "cylinder", position: [0, 0.7, 0.15], rotation: [0.4, 0, 0], size: [0.14, 0.5], color: "#555555" },
        { type: "sphere", position: [0, 0.95, 0.45], size: [0.12], color: "#888888", emissive: "#ff4400" },
      ],
    },
  },

  // 4. Volcano Buff Tower
  {
    id: createTowerId(MergedElementT3.Volcano, TowerCategory.Buff, 3),
    type: "volcano_buff" as any,
    name: "Molten Throne",
    description: "Radiates intense volcanic energy, massively boosting nearby tower damage.",
    element: MergedElementT3.Volcano,
    category: TowerCategory.Buff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 25,
      attackSpeed: 0.4,
      range: 4.5,
      cost: 720,
      upgradeCost: 360,
      health: 320,
      armor: 22,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Damage,
      radius: 4.0,
      strength: 0.35,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.Buff, 2),
        createTowerId(BaseElement.Fire, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT3.Volcano, TowerCategory.Buff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.4,
      height: 1.8,
      effectColor: "#ff4500",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.32, 0.45], color: "#3a3a3a" },
        { type: "cylinder", position: [0, 0.4, 0], size: [0.15, 0.5], color: "#444444" },
        { type: "sphere", position: [0, 1.0, 0], size: [0.22], color: "#555555", emissive: "#ff4400", animated: { type: "pulse", speed: 1 } },
        { type: "torus", position: [0, 0.2, 0], rotation: [1.57, 0, 0], size: [0.5, 0.03], color: "#ff440044" },
      ],
    },
  },

  // 5. Volcano Debuff Tower
  {
    id: createTowerId(MergedElementT3.Volcano, TowerCategory.Debuff, 3),
    type: "volcano_debuff" as any,
    name: "Pyroclastic Vents",
    description: "Releases superheated gases that devastate enemy armor and burn them.",
    element: MergedElementT3.Volcano,
    category: TowerCategory.Debuff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 45,
      attackSpeed: 0.75,
      range: 3.5,
      cost: 680,
      upgradeCost: 340,
      health: 290,
      armor: 19,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.9,
      duration: 6,
      strength: 20,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Fire, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT3.Volcano, TowerCategory.Debuff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.4,
      height: 1.6,
      effectColor: "#ff2200",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.3, 0.4], color: "#3a3a3a" },
        { type: "cone", position: [0, 0.35, 0], size: [0.22, 0.35], color: "#444444" },
        { type: "sphere", position: [0, 0.7, 0], size: [0.15], color: "#555555", emissive: "#ff4400", animated: { type: "pulse", speed: 1.5 } },
        { type: "sphere", position: [0.12, 0.55, 0.08], size: [0.06], color: "#888888", emissive: "#ff2200", animated: { type: "bob", speed: 2.5 } },
        { type: "sphere", position: [-0.1, 0.6, -0.06], size: [0.05], color: "#888888", emissive: "#ff3300", animated: { type: "bob", speed: 3 } },
      ],
    },
  },
];
