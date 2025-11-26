/**
 * Lava Element - Tier 2 Towers (Fire + Earth merge)
 * 5 towers across all categories
 */

import {
  TowerCategory,
  TowerRarity,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { MergedElementT2, BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

export const LAVA_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Lava Damage Tower
  {
    id: createTowerId(MergedElementT2.Lava, TowerCategory.Damage, 2),
    type: "lava_damage" as any,
    name: "Molten Core",
    description: "A fusion of fire and earth that unleashes devastating molten attacks.",
    element: MergedElementT2.Lava,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 50,
      attackSpeed: 0.85,
      range: 3.2,
      cost: 250,
      upgradeCost: 125,
      health: 180,
      armor: 12,
      magicPen: 3,
      armorPen: 5,
      splashRadius: 0.8,
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.4,
      duration: 2.5,
      strength: 8,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Lava, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["volcano_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.2,
      height: 1.5,
      effectColor: "#ff6600",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.3], color: "#444444" },
        { type: "cylinder", position: [0, 0.35, 0], size: [0.18, 0.5], color: "#555555" },
        { type: "sphere", position: [0, 0.75, 0], size: [0.2], color: "#666666" },
        {
          type: "sphere",
          position: [0, 0.95, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#ff4400",
          animated: { type: "pulse", speed: 1.5 },
        },
        {
          type: "sphere",
          position: [0.15, 0.6, 0],
          size: [0.04],
          color: "#888888",
          emissive: "#ff2200",
          animated: { type: "bob", speed: 2 },
        },
      ],
    },
  },


  // 3. Lava Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Lava, TowerCategory.PhysicalDamage, 2),
    type: "lava_physical_damage" as any,
    name: "Eruption Cannon",
    description: "Fires molten rock projectiles with devastating area damage.",
    element: MergedElementT2.Lava,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 70,
      attackSpeed: 0.6,
      range: 2.8,
      cost: 310,
      upgradeCost: 155,
      health: 200,
      armor: 15,
      magicPen: 0,
      armorPen: 7,
      splashRadius: 1.0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Lava, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["volcano_magic_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.25,
      height: 1.5,
      effectColor: "#ff6347",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.22, 0.3], color: "#444444" },
        { type: "box", position: [0, 0.25, 0], size: [0.22, 0.18, 0.22], color: "#555555" },
        { type: "cylinder", position: [0, 0.45, 0.1], rotation: [0.35, 0, 0], size: [0.12, 0.4], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.6, 0.32],
          size: [0.08],
          color: "#888888",
          emissive: "#ff4400",
        },
      ],
    },
  },

];
