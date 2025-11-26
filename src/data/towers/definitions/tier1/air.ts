/**
 * Air Element - Tier 1 Base Towers
 * 5 towers (one per category: Damage, MagicDamage, PhysicalDamage, Buff, Debuff)
 */

import {
  TowerCategory,
  TowerRarity,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { BaseElement } from "@/types/element";
import { createTowerId } from "../../mergeGraph";

export const AIR_TIER1_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Air Damage Tower - Fast attack speed
  {
    id: createTowerId(BaseElement.Air, TowerCategory.Damage, 1),
    type: "air_damage" as any,
    name: "Gale Spire",
    description: "A swift tower with enhanced attack speed that fires rapid wind blades at enemies.",
    element: BaseElement.Air,
    category: TowerCategory.Damage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 15,
      attackSpeed: 1.25,
      range: 3.5,
      cost: 100,
      upgradeCost: 50,
      health: 80,
      armor: 2,
      magicPen: 0,
      armorPen: 0,
    },
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.0,
      height: 1.3,
      effectColor: "#87ceeb",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.2, 0.4], color: "#555555" },
        { type: "cone", position: [0, 0.35, 0], size: [0.15, 0.5], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.8, 0],
          size: [0.08],
          color: "#888888",
          emissive: "#87ceeb",
          animated: { type: "rotate", speed: 3, axis: "y" },
        },
        {
          type: "cone",
          position: [0.12, 0.6, 0],
          rotation: [0, 0, 0.5],
          size: [0.03, 0.12],
          color: "#777777",
          animated: { type: "rotate", speed: 4, axis: "y" },
        },
      ],
    },
    mergeOutput: [
      "plasma_magic_damage_t2",
      "plasma_damage_t2",
      "storm_magic_damage_t2",
      "storm_debuff_t2",
    ],
  },
];
