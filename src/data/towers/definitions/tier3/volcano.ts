/**
 * Volcano Element - Tier 3 Towers (Lava + Fire mastery)
 * Ultimate Fire element specialization
 */

import {
  TowerCategory,
  TowerRarity,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { MergedElementT2, MergedElementT3, BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

// ============================================================================
// VOLCANO TIER 3 TOWERS (Lava + Fire mastery path)
// ============================================================================

export const VOLCANO_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // Volcano Damage Tower - Ultimate Fire Mastery
  {
    id: createTowerId(MergedElementT3.Volcano, TowerCategory.Damage, 3),
    type: "volcano_damage" as any,
    name: "Volcanic Fury",
    description:
      "The ultimate expression of fire power. Erupts periodically, devastating all nearby enemies.",
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
      description:
        "Erupts violently, dealing 300% damage to all enemies in range and applying burn.",
      cooldown: 15000, // 15 seconds
      duration: 2000,
      strength: 3.0, // 300% damage
      type: "active",
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.8,
      duration: 5,
      strength: 15,
    },
    mergeRecipe: {
      id: "merge_lava_damage_t2_fire_damage_t1",
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
        // Mountain base
        { type: "cone", position: [0, 0, 0], size: [0.35, 0.6], color: "#3a3a3a" },
        { type: "cone", position: [0, 0.5, 0], size: [0.28, 0.5], color: "#444444" },
        { type: "cone", position: [0, 0.9, 0], size: [0.22, 0.4], color: "#4a4a4a" },
        // Crater rim
        {
          type: "torus",
          position: [0, 1.25, 0],
          rotation: [1.57, 0, 0],
          size: [0.18, 0.04],
          color: "#333333",
        },
        // Lava pool
        {
          type: "cylinder",
          position: [0, 1.2, 0],
          size: [0.14, 0.08],
          color: "#666666",
          emissive: "#ff4400",
          animated: { type: "pulse", speed: 1 },
        },
        // Lava spouts
        {
          type: "sphere",
          position: [0, 1.4, 0],
          size: [0.1],
          color: "#888888",
          emissive: "#ff6600",
          animated: { type: "bob", speed: 3 },
        },
        {
          type: "sphere",
          position: [0.08, 1.35, 0.05],
          size: [0.05],
          color: "#888888",
          emissive: "#ff4400",
          animated: { type: "bob", speed: 4 },
        },
        {
          type: "sphere",
          position: [-0.06, 1.32, -0.06],
          size: [0.04],
          color: "#888888",
          emissive: "#ff2200",
          animated: { type: "bob", speed: 3.5 },
        },
        // Smoke effect (dark spheres)
        {
          type: "sphere",
          position: [0.05, 1.6, 0],
          size: [0.08],
          color: "#333333",
          animated: { type: "bob", speed: 0.5 },
        },
        {
          type: "sphere",
          position: [-0.03, 1.75, 0.03],
          size: [0.06],
          color: "#444444",
          animated: { type: "bob", speed: 0.7 },
        },
      ],
    },
  },

  // Additional Volcano towers (other categories) can be added here
];
