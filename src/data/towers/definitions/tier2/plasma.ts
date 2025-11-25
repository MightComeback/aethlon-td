/**
 * Plasma Element - Tier 2 Towers (Fire + Air merge)
 * 5 towers across all categories
 */

import {
  TowerCategory,
  TowerRarity,
  BuffType,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { MergedElementT2, BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

export const PLASMA_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Plasma Damage Tower
  {
    id: createTowerId(MergedElementT2.Plasma, TowerCategory.Damage, 2),
    type: "plasma_damage" as any,
    name: "Ion Spire",
    description: "Projects superheated plasma that melts through all defenses.",
    element: MergedElementT2.Plasma,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 52,
      attackSpeed: 1.3,
      range: 3.6,
      cost: 260,
      upgradeCost: 130,
      health: 110,
      armor: 5,
      magicPen: 5,
      armorPen: 5,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Air, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Plasma, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["inferno_damage_t3"],
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.15,
      height: 1.5,
      effectColor: "#ff69b4",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.18, 0.4], color: "#555555" },
        { type: "cylinder", position: [0, 0.4, 0], size: [0.12, 0.5], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.85, 0],
          size: [0.12],
          color: "#777777",
          emissive: "#ff69b4",
          animated: { type: "pulse", speed: 3 },
        },
        {
          type: "torus",
          position: [0, 0.85, 0],
          rotation: [1.57, 0, 0],
          size: [0.2, 0.015],
          color: "#ff00ff44",
          animated: { type: "rotate", speed: 4, axis: "y" },
        },
      ],
    },
  },

  // 2. Plasma Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Plasma, TowerCategory.MagicDamage, 2),
    type: "plasma_magic_damage" as any,
    name: "Arcane Reactor",
    description: "Unleashes pure magical energy in plasma form.",
    element: MergedElementT2.Plasma,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 42,
      attackSpeed: 1.2,
      range: 4.0,
      cost: 290,
      upgradeCost: 145,
      health: 95,
      armor: 4,
      magicPen: 12,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Air, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Plasma, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["inferno_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.1,
      height: 1.3,
      effectColor: "#ff00ff",
      parts: [
        { type: "octahedron", position: [0, 0.2, 0], size: [0.16], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.55, 0],
          size: [0.14],
          color: "#666666",
          emissive: "#ff69b4",
          animated: { type: "rotate", speed: 2, axis: "y" },
        },
        {
          type: "sphere",
          position: [0, 0.8, 0],
          size: [0.08],
          color: "#888888",
          emissive: "#ff00ff",
          animated: { type: "pulse", speed: 4 },
        },
      ],
    },
  },

  // 3. Plasma Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Plasma, TowerCategory.PhysicalDamage, 2),
    type: "plasma_physical_damage" as any,
    name: "Fusion Lance",
    description: "Fires concentrated plasma bolts with extreme velocity.",
    element: MergedElementT2.Plasma,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 70,
      attackSpeed: 0.85,
      range: 3.2,
      cost: 310,
      upgradeCost: 155,
      health: 130,
      armor: 7,
      magicPen: 0,
      armorPen: 8,
      critChance: 0.12,
      critMultiplier: 1.9,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Air, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Plasma, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["inferno_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.2,
      height: 1.5,
      effectColor: "#ff69b4",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.2, 0.25], color: "#555555" },
        { type: "box", position: [0, 0.3, 0], size: [0.18, 0.22, 0.18], color: "#606060" },
        { type: "cylinder", position: [0, 0.55, 0.08], rotation: [0.2, 0, 0], size: [0.08, 0.45], color: "#666666" },
        {
          type: "cone",
          position: [0, 0.8, 0.25],
          rotation: [0.2, 0, 0],
          size: [0.05, 0.12],
          color: "#888888",
          emissive: "#ff00ff",
        },
      ],
    },
  },

  // 4. Plasma Buff Tower
  {
    id: createTowerId(MergedElementT2.Plasma, TowerCategory.Buff, 2),
    type: "plasma_buff" as any,
    name: "Energy Nexus",
    description: "Radiates plasma energy that supercharges nearby towers.",
    element: MergedElementT2.Plasma,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 15,
      attackSpeed: 0.6,
      range: 4.5,
      cost: 330,
      upgradeCost: 165,
      health: 105,
      armor: 5,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.AttackSpeed,
      radius: 3.0,
      strength: 0.25,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Air, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Plasma, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["inferno_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.15,
      height: 1.2,
      effectColor: "#ff00ff",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.12], color: "#555555" },
        { type: "cylinder", position: [0, 0.15, 0], size: [0.08, 0.35], color: "#606060" },
        {
          type: "sphere",
          position: [0, 0.6, 0],
          size: [0.15],
          color: "#777777",
          emissive: "#ff69b4",
          animated: { type: "pulse", speed: 2 },
        },
        {
          type: "torus",
          position: [0, 0.6, 0],
          rotation: [1.57, 0, 0],
          size: [0.3, 0.015],
          color: "#ff00ff44",
          animated: { type: "rotate", speed: 2, axis: "y" },
        },
      ],
    },
  },

  // 5. Plasma Debuff Tower
  {
    id: createTowerId(MergedElementT2.Plasma, TowerCategory.Debuff, 2),
    type: "plasma_debuff" as any,
    name: "Ionization Field",
    description: "Creates an ionizing field that makes enemies vulnerable to all damage.",
    element: MergedElementT2.Plasma,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 22,
      attackSpeed: 1.25,
      range: 3.4,
      cost: 270,
      upgradeCost: 135,
      health: 100,
      armor: 4,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.DamageAmp,
      chance: 0.45,
      duration: 3.5,
      strength: 0.2,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Air, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Plasma, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["inferno_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.1,
      height: 1.0,
      effectColor: "#ff69b4",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.18, 0.1], color: "#555555" },
        {
          type: "torus",
          position: [0, 0.25, 0],
          rotation: [1.57, 0, 0],
          size: [0.14, 0.03],
          color: "#666666",
          animated: { type: "rotate", speed: 3, axis: "y" },
        },
        {
          type: "sphere",
          position: [0, 0.45, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#ff00ff",
          animated: { type: "pulse", speed: 3.5 },
        },
      ],
    },
  },
];
