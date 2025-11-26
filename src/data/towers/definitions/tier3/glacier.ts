/**
 * Glacier Element - Tier 3 Towers (Ice + Water mastery)
 * Ultimate Water element specialization
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

export const GLACIER_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 4. Glacier Buff Tower
  {
    id: createTowerId(MergedElementT3.Glacier, TowerCategory.Buff, 3),
    type: "glacier_buff" as any,
    name: "Permafrost Sanctuary",
    description: "Creates a zone of extreme cold that enhances nearby towers' range.",
    element: MergedElementT3.Glacier,
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
        createTowerId(MergedElementT2.Ice, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Glacier, TowerCategory.Buff, 3),
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

  // 5. Glacier Debuff Tower
  {
    id: createTowerId(MergedElementT3.Glacier, TowerCategory.Debuff, 3),
    type: "glacier_debuff" as any,
    name: "Absolute Zero",
    description: "Generates temperatures so cold enemies are completely frozen.",
    element: MergedElementT3.Glacier,
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
        createTowerId(BaseElement.Water, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Glacier, TowerCategory.Debuff, 3),
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
