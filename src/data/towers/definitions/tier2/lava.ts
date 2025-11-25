/**
 * Lava Element - Tier 2 Towers (Fire + Earth merge)
 * Starting with Damage category as example path
 */

import {
  TowerCategory,
  TowerRarity,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { MergedElementT2, BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

// ============================================================================
// LAVA TIER 2 TOWERS (Fire + Earth fusion)
// ============================================================================

export const LAVA_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // Lava Damage Tower (example merge path)
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
      id: "merge_fire_damage_t1_earth_damage_t1",
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Lava, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["volcano_damage_t3", "earthquake_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.2,
      height: 1.5,
      effectColor: "#ff6600",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.3], color: "#444444" }, // Rocky base
        { type: "cylinder", position: [0, 0.35, 0], size: [0.18, 0.5], color: "#555555" }, // Rock column
        { type: "sphere", position: [0, 0.75, 0], size: [0.2], color: "#666666" }, // Lava chamber
        {
          type: "sphere",
          position: [0, 0.95, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#ff4400",
          animated: { type: "pulse", speed: 1.5 },
        }, // Lava orb
        // Lava drips
        {
          type: "sphere",
          position: [0.15, 0.6, 0],
          size: [0.04],
          color: "#888888",
          emissive: "#ff2200",
          animated: { type: "bob", speed: 2 },
        },
        {
          type: "sphere",
          position: [-0.12, 0.55, 0.1],
          size: [0.03],
          color: "#888888",
          emissive: "#ff3300",
          animated: { type: "bob", speed: 2.5 },
        },
      ],
    },
  },

  // Additional Lava towers (other categories) can be added here
  // Following same pattern for MagicDamage, PhysicalDamage, Buff, Debuff
];
