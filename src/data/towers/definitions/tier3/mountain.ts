/**
 * Mountain Element - Tier 3 Towers (Crystal + Earth mastery)
 * Ultimate defensive Earth specialization
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

export const MOUNTAIN_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 3. Mountain Physical Damage Tower
  {
    id: createTowerId(MergedElementT3.Mountain, TowerCategory.PhysicalDamage, 3),
    type: "mountain_physical_damage" as any,
    name: "Colossus Catapult",
    description: "Hurls massive crystallized boulders with catastrophic force.",
    element: MergedElementT3.Mountain,
    category: TowerCategory.PhysicalDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 145,
      attackSpeed: 0.35,
      range: 2.8,
      cost: 750,
      upgradeCost: 375,
      health: 480,
      armor: 38,
      magicPen: 0,
      armorPen: 14,
      splashRadius: 2.0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Magma, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Mountain, TowerCategory.PhysicalDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.6,
      height: 2.0,
      effectColor: "#696969",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.4, 0.6], color: "#3a3a3a" },
        { type: "box", position: [0, 0.55, 0], size: [0.3, 0.25, 0.3], color: "#444444" },
        { type: "cylinder", position: [0, 0.8, 0.15], rotation: [0.45, 0, 0], size: [0.14, 0.5], color: "#555555" },
        { type: "octahedron", position: [0, 1.1, 0.48], size: [0.12], color: "#888888" },
      ],
    },
  },

  // 4. Mountain Buff Tower
  {
    id: createTowerId(MergedElementT3.Mountain, TowerCategory.Buff, 3),
    type: "mountain_buff" as any,
    name: "Adamantine Citadel",
    description: "Provides unbreakable fortification, greatly boosting armor penetration.",
    element: MergedElementT3.Mountain,
    category: TowerCategory.Buff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 15,
      attackSpeed: 0.3,
      range: 4.0,
      cost: 770,
      upgradeCost: 385,
      health: 520,
      armor: 42,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.ArmorPen,
      radius: 4.0,
      strength: 0.35,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Magma, TowerCategory.Buff, 2),
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Mountain, TowerCategory.Buff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.55,
      height: 2.0,
      effectColor: "#a9a9a9",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.38, 0.55], color: "#3a3a3a" },
        { type: "box", position: [0, 0.5, 0], size: [0.26, 0.6, 0.26], color: "#444444" },
        { type: "box", position: [0, 1.0, 0], size: [0.3, 0.12, 0.3], color: "#555555" },
        { type: "octahedron", position: [0, 1.25, 0], size: [0.16], color: "#666666", emissive: "#b19cd9", animated: { type: "pulse", speed: 0.6 } },
        { type: "torus", position: [0, 0.25, 0], rotation: [1.57, 0, 0], size: [0.55, 0.03], color: "#69696944" },
      ],
    },
  },
];
