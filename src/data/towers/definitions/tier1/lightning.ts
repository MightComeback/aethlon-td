/**
 * Lightning Element - Tier 1 Base Towers
 * 5 towers (one per category: Damage, MagicDamage, PhysicalDamage, Buff, Debuff)
 */

import {
  TowerCategory,
  TowerRarity,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { BaseElement } from "@/types/element";
import { createTowerId } from "../../mergeGraph";

export const LIGHTNING_TIER1_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Lightning Damage Tower - Chain lightning
  {
    id: createTowerId(BaseElement.Lightning, TowerCategory.Damage, 1),
    type: "lightning_damage" as any,
    name: "Spark Pylon",
    description: "Releases bolts of lightning with extended range that can chain between nearby enemies.",
    element: BaseElement.Lightning,
    category: TowerCategory.Damage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 20,
      attackSpeed: 1.2,
      range: 3.6,
      cost: 100,
      upgradeCost: 50,
      health: 85,
      armor: 3,
      magicPen: 2,
      armorPen: 0,
    },
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.0,
      height: 1.4,
      effectColor: "#ffff00",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.2, 0.15, 0.2], color: "#555555" },
        { type: "cylinder", position: [0, 0.2, 0], size: [0.1, 0.5], color: "#606060" },
        { type: "sphere", position: [0, 0.65, 0], size: [0.12], color: "#666666" },
        {
          type: "cone",
          position: [0, 0.85, 0],
          size: [0.06, 0.2],
          color: "#888888",
          emissive: "#ffff00",
          animated: { type: "pulse", speed: 4 },
        },
        {
          type: "sphere",
          position: [0.1, 0.5, 0.1],
          size: [0.03],
          color: "#888888",
          emissive: "#ffffff",
          animated: { type: "pulse", speed: 5 },
        },
      ],
    },
    mergeOutput: [
      "storm_magic_damage_t2",
      "storm_debuff_t2",
      "magma_physical_damage_t2",
      "magma_buff_t2",
    ],
  },
];
