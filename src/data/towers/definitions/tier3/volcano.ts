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
        createTowerId(MergedElementT2.Lava, TowerCategory.Damage, 2),
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
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
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
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
];
