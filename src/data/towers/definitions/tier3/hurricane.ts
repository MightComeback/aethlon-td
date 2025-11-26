/**
 * Hurricane Element - Tier 3 Towers (Thunder + Air mastery)
 * Ultimate Air element specialization
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

export const HURRICANE_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 2. Hurricane Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Hurricane, TowerCategory.MagicDamage, 3),
    type: "hurricane_magic_damage" as any,
    name: "Tempest Conduit",
    description: "Channels pure storm magic with overwhelming force.",
    element: MergedElementT3.Hurricane,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 68,
      attackSpeed: 1.2,
      range: 4.2,
      cost: 650,
      upgradeCost: 325,
      health: 170,
      armor: 8,
      magicPen: 20,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Storm, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Air, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Hurricane, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.4,
      height: 1.7,
      effectColor: "#f0f8ff",
      parts: [
        { type: "octahedron", position: [0, 0.25, 0], size: [0.18], color: "#3a3a3a" },
        { type: "dodecahedron", position: [0, 0.6, 0], size: [0.16], color: "#444444", emissive: "#708090", animated: { type: "rotate", speed: 1.5, axis: "y" } },
        { type: "sphere", position: [0, 0.95, 0], size: [0.1], color: "#888888", emissive: "#f0f8ff", animated: { type: "pulse", speed: 2.5 } },
      ],
    },
  },

  // 5. Hurricane Debuff Tower
  {
    id: createTowerId(MergedElementT3.Hurricane, TowerCategory.Debuff, 3),
    type: "hurricane_debuff" as any,
    name: "Vortex Generator",
    description: "Creates powerful vortexes that slow and weaken enemies.",
    element: MergedElementT3.Hurricane,
    category: TowerCategory.Debuff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 38,
      attackSpeed: 1.1,
      range: 3.8,
      cost: 680,
      upgradeCost: 340,
      health: 190,
      armor: 10,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Weaken,
      chance: 0.6,
      duration: 4,
      strength: 0.4,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Storm, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Air, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Hurricane, TowerCategory.Debuff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.35,
      height: 1.4,
      effectColor: "#708090",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.12], color: "#3a3a3a" },
        { type: "torus", position: [0, 0.25, 0], rotation: [1.57, 0, 0], size: [0.18, 0.04], color: "#444444", animated: { type: "rotate", speed: 2, axis: "y" } },
        { type: "torus", position: [0, 0.45, 0], rotation: [1.57, 0, 0], size: [0.14, 0.035], color: "#555555", emissive: "#708090", animated: { type: "rotate", speed: -3, axis: "y" } },
        { type: "sphere", position: [0, 0.65, 0], size: [0.1], color: "#888888", emissive: "#f0f8ff", animated: { type: "pulse", speed: 2 } },
      ],
    },
  },
];
