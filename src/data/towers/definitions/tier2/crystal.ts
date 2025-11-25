/**
 * Crystal Element - Tier 2 Towers (Earth + Lightning merge)
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

export const CRYSTAL_TIER2_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Crystal Damage Tower
  {
    id: createTowerId(MergedElementT2.Crystal, TowerCategory.Damage, 2),
    type: "crystal_damage" as any,
    name: "Prism Obelisk",
    description: "Fires crystallized energy projectiles that shatter on impact.",
    element: MergedElementT2.Crystal,
    category: TowerCategory.Damage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 48,
      attackSpeed: 0.95,
      range: 3.4,
      cost: 270,
      upgradeCost: 135,
      health: 155,
      armor: 11,
      magicPen: 4,
      armorPen: 4,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT2.Crystal, TowerCategory.Damage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["mountain_damage_t3", "discharge_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.2,
      height: 1.5,
      effectColor: "#b19cd9",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.22, 0.18, 0.22], color: "#555555" },
        { type: "octahedron", position: [0, 0.35, 0], size: [0.2], color: "#606060" },
        {
          type: "octahedron",
          position: [0, 0.7, 0],
          size: [0.14],
          color: "#777777",
          emissive: "#b19cd9",
          animated: { type: "rotate", speed: 0.8, axis: "y" },
        },
        {
          type: "cone",
          position: [0, 0.95, 0],
          size: [0.05, 0.15],
          color: "#888888",
          emissive: "#dda0dd",
          animated: { type: "pulse", speed: 2 },
        },
      ],
    },
  },

  // 2. Crystal Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Crystal, TowerCategory.MagicDamage, 2),
    type: "crystal_magic_damage" as any,
    name: "Resonance Tower",
    description: "Channels harmonic crystal energy that pierces magical defenses.",
    element: MergedElementT2.Crystal,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 42,
      attackSpeed: 0.9,
      range: 3.6,
      cost: 300,
      upgradeCost: 150,
      health: 125,
      armor: 9,
      magicPen: 13,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Crystal, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["mountain_magic_damage_t3", "discharge_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.15,
      height: 1.4,
      effectColor: "#dda0dd",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.14, 0.18], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.4, 0],
          size: [0.16],
          color: "#666666",
          emissive: "#b19cd9",
          animated: { type: "rotate", speed: 0.6, axis: "y" },
        },
        {
          type: "octahedron",
          position: [0, 0.75, 0],
          size: [0.1],
          color: "#888888",
          emissive: "#dda0dd",
          animated: { type: "pulse", speed: 1.5 },
        },
      ],
    },
  },

  // 3. Crystal Physical Damage Tower
  {
    id: createTowerId(MergedElementT2.Crystal, TowerCategory.PhysicalDamage, 2),
    type: "crystal_physical_damage" as any,
    name: "Shard Launcher",
    description: "Launches razor-sharp crystal shards that pierce through armor.",
    element: MergedElementT2.Crystal,
    category: TowerCategory.PhysicalDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 65,
      attackSpeed: 0.7,
      range: 3.0,
      cost: 320,
      upgradeCost: 160,
      health: 180,
      armor: 14,
      magicPen: 0,
      armorPen: 8,
      critChance: 0.12,
      critMultiplier: 1.9,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Crystal, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["mountain_physical_damage_t3", "discharge_physical_damage_t3"],
    meshConfig: {
      baseShape: "tower",
      scale: 1.2,
      height: 1.5,
      effectColor: "#b19cd9",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.2, 0.28], color: "#555555" },
        { type: "octahedron", position: [0, 0.35, 0], size: [0.18], color: "#606060" },
        { type: "cylinder", position: [0, 0.55, 0.1], rotation: [0.3, 0, 0], size: [0.08, 0.35], color: "#666666" },
        {
          type: "octahedron",
          position: [0, 0.7, 0.28],
          size: [0.06],
          color: "#888888",
          emissive: "#dda0dd",
        },
      ],
    },
  },

  // 4. Crystal Buff Tower
  {
    id: createTowerId(MergedElementT2.Crystal, TowerCategory.Buff, 2),
    type: "crystal_buff" as any,
    name: "Harmonic Resonator",
    description: "Emits crystal frequencies that enhance nearby towers' critical strikes.",
    element: MergedElementT2.Crystal,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 12,
      attackSpeed: 0.5,
      range: 4.0,
      cost: 340,
      upgradeCost: 170,
      health: 170,
      armor: 14,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.CritChance,
      radius: 3.0,
      strength: 0.12,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Crystal, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["mountain_buff_t3", "discharge_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.2,
      height: 1.4,
      effectColor: "#dda0dd",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.26, 0.15, 0.26], color: "#555555" },
        { type: "octahedron", position: [0, 0.35, 0], size: [0.18], color: "#606060" },
        {
          type: "dodecahedron",
          position: [0, 0.65, 0],
          size: [0.14],
          color: "#777777",
          emissive: "#b19cd9",
          animated: { type: "pulse", speed: 1 },
        },
        {
          type: "torus",
          position: [0, 0.65, 0],
          rotation: [1.57, 0, 0],
          size: [0.28, 0.015],
          color: "#b19cd944",
          animated: { type: "rotate", speed: 0.8, axis: "y" },
        },
      ],
    },
  },

  // 5. Crystal Debuff Tower
  {
    id: createTowerId(MergedElementT2.Crystal, TowerCategory.Debuff, 2),
    type: "crystal_debuff" as any,
    name: "Fracture Field",
    description: "Creates resonance fields that shatter enemy armor over time.",
    element: MergedElementT2.Crystal,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 20,
      attackSpeed: 0.95,
      range: 3.2,
      cost: 280,
      upgradeCost: 140,
      health: 145,
      armor: 11,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.ArmorBreak,
      chance: 0.3,
      duration: 3,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Earth, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Lightning, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Crystal, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["mountain_debuff_t3", "discharge_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.15,
      height: 1.1,
      effectColor: "#b19cd9",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.24, 0.1, 0.24], color: "#555555" },
        { type: "octahedron", position: [0, 0.28, 0], size: [0.16], color: "#606060" },
        {
          type: "octahedron",
          position: [0, 0.55, 0],
          size: [0.1],
          color: "#777777",
          emissive: "#dda0dd",
          animated: { type: "rotate", speed: 1, axis: "y" },
        },
        {
          type: "cone",
          position: [0.1, 0.4, 0.08],
          rotation: [0, 0, 0.4],
          size: [0.03, 0.1],
          color: "#888888",
          emissive: "#b19cd9",
        },
      ],
    },
  },
];
