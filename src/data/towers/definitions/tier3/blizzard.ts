/**
 * Blizzard Element - Tier 3 Towers (Ice + Water mastery)
 * Ultimate Ice element specialization
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

export const BLIZZARD_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Blizzard Damage Tower
  {
    id: createTowerId(MergedElementT3.Blizzard, TowerCategory.Damage, 3),
    type: "blizzard_damage" as any,
    name: "Arctic Fortress",
    description: "Unleashes devastating blizzards that freeze and shatter enemies.",
    element: MergedElementT3.Blizzard,
    category: TowerCategory.Damage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 85,
      attackSpeed: 0.75,
      range: 3.8,
      cost: 620,
      upgradeCost: 310,
      health: 280,
      armor: 18,
      magicPen: 6,
      armorPen: 6,
      splashRadius: 1.4,
    },
    ability: {
      id: "arctic_storm",
      name: "Arctic Storm",
      description: "Creates an ice storm that freezes all enemies for 3 seconds.",
      cooldown: 20000,
      duration: 3000,
      strength: 1,
      type: "active",
    },
    statusEffect: {
      type: StatusEffectType.Slow,
      chance: 0.75,
      duration: 3,
      strength: 0.5,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Ice, TowerCategory.Damage, 2),
        createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Blizzard, TowerCategory.Damage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.5,
      height: 1.9,
      effectColor: "#e0ffff",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.2, 0.3], color: "#3a3a3a" },
        { type: "octahedron", position: [0, 0.4, 0], size: [0.24], color: "#444444" },
        { type: "octahedron", position: [0, 0.8, 0], size: [0.18], color: "#555555", emissive: "#87ceeb", animated: { type: "rotate", speed: 0.5, axis: "y" } },
        { type: "octahedron", position: [0, 1.15, 0], size: [0.1], color: "#888888", emissive: "#e0ffff", animated: { type: "bob", speed: 1 } },
        { type: "cone", position: [0.15, 0.6, 0.1], rotation: [0, 0, 0.4], size: [0.04, 0.15], color: "#aaaaaa", emissive: "#e0ffff" },
      ],
    },
  },

  // 2. Blizzard Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Blizzard, TowerCategory.MagicDamage, 3),
    type: "blizzard_magic_damage" as any,
    name: "Frostweave Spire",
    description: "Channels ultimate ice magic that shatters magical resistance.",
    element: MergedElementT3.Blizzard,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 72,
      attackSpeed: 0.7,
      range: 4.0,
      cost: 670,
      upgradeCost: 335,
      health: 240,
      armor: 14,
      magicPen: 18,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Ice, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Water, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Blizzard, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.4,
      height: 1.7,
      effectColor: "#87ceeb",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.18, 0.2], color: "#3a3a3a" },
        { type: "dodecahedron", position: [0, 0.45, 0], size: [0.2], color: "#444444", emissive: "#87ceeb", animated: { type: "rotate", speed: 0.6, axis: "y" } },
        { type: "octahedron", position: [0, 0.85, 0], size: [0.12], color: "#888888", emissive: "#e0ffff", animated: { type: "pulse", speed: 1 } },
      ],
    },
  },

  // 3. Blizzard Physical Damage Tower
  {
    id: createTowerId(MergedElementT3.Blizzard, TowerCategory.PhysicalDamage, 3),
    type: "blizzard_physical_damage" as any,
    name: "Glacier Catapult",
    description: "Launches massive ice boulders that shatter on impact.",
    element: MergedElementT3.Blizzard,
    category: TowerCategory.PhysicalDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 115,
      attackSpeed: 0.5,
      range: 3.2,
      cost: 720,
      upgradeCost: 360,
      health: 320,
      armor: 22,
      magicPen: 0,
      armorPen: 12,
      splashRadius: 1.5,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Ice, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Water, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Blizzard, TowerCategory.PhysicalDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.5,
      height: 1.8,
      effectColor: "#e0ffff",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.35, 0.25, 0.35], color: "#3a3a3a" },
        { type: "box", position: [0, 0.3, 0], size: [0.25, 0.2, 0.25], color: "#444444" },
        { type: "cylinder", position: [0, 0.55, 0.12], rotation: [0.35, 0, 0], size: [0.12, 0.45], color: "#555555" },
        { type: "octahedron", position: [0, 0.75, 0.38], size: [0.1], color: "#888888", emissive: "#e0ffff" },
      ],
    },
  },

  // 4. Blizzard Buff Tower
  {
    id: createTowerId(MergedElementT3.Blizzard, TowerCategory.Buff, 3),
    type: "blizzard_buff" as any,
    name: "Permafrost Sanctuary",
    description: "Creates a zone of extreme cold that enhances nearby towers' range.",
    element: MergedElementT3.Blizzard,
    category: TowerCategory.Buff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 18,
      attackSpeed: 0.4,
      range: 4.5,
      cost: 740,
      upgradeCost: 370,
      health: 300,
      armor: 20,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Range,
      radius: 4.0,
      strength: 0.3,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Ice, TowerCategory.Buff, 2),
        createTowerId(BaseElement.Water, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT3.Blizzard, TowerCategory.Buff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.45,
      height: 1.8,
      effectColor: "#87ceeb",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.32, 0.18, 0.32], color: "#3a3a3a" },
        { type: "box", position: [0, 0.25, 0], size: [0.22, 0.5, 0.22], color: "#444444" },
        { type: "octahedron", position: [0, 0.85, 0], size: [0.18], color: "#555555", emissive: "#87ceeb", animated: { type: "pulse", speed: 0.8 } },
        { type: "torus", position: [0, 0.15, 0], rotation: [1.57, 0, 0], size: [0.5, 0.025], color: "#e0ffff44" },
      ],
    },
  },

  // 5. Blizzard Debuff Tower
  {
    id: createTowerId(MergedElementT3.Blizzard, TowerCategory.Debuff, 3),
    type: "blizzard_debuff" as any,
    name: "Absolute Zero",
    description: "Generates temperatures so cold enemies are completely frozen.",
    element: MergedElementT3.Blizzard,
    category: TowerCategory.Debuff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 35,
      attackSpeed: 0.7,
      range: 3.5,
      cost: 700,
      upgradeCost: 350,
      health: 270,
      armor: 17,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Freeze,
      chance: 0.45,
      duration: 2.5,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Ice, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Water, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT3.Blizzard, TowerCategory.Debuff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.4,
      height: 1.5,
      effectColor: "#e0ffff",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.12, 0.28], color: "#3a3a3a" },
        { type: "octahedron", position: [0, 0.3, 0], size: [0.18], color: "#444444" },
        { type: "octahedron", position: [0, 0.6, 0], size: [0.12], color: "#555555", emissive: "#87ceeb", animated: { type: "pulse", speed: 0.8 } },
        { type: "sphere", position: [0, 0.85, 0], size: [0.08], color: "#888888", emissive: "#e0ffff", animated: { type: "bob", speed: 1.2 } },
      ],
    },
  },
];
