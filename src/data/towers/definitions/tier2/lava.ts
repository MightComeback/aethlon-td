/**
 * Lava Element - Tier 2 Towers (Fire + Earth merge)
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
    mergeOutput: ["volcano_damage_t3", "earthquake_damage_t3"],
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

  // 2. Lava Magic Damage Tower
  {
    id: createTowerId(MergedElementT2.Lava, TowerCategory.MagicDamage, 2),
    type: "lava_magic_damage" as any,
    name: "Magma Focus",
    description: "Channels magmatic energy that melts through magical resistance.",
    element: MergedElementT2.Lava,
    category: TowerCategory.MagicDamage,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 44,
      attackSpeed: 0.8,
      range: 3.4,
      cost: 280,
      upgradeCost: 140,
      health: 150,
      armor: 10,
      magicPen: 11,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.MagicDamage, 1),
        createTowerId(BaseElement.Earth, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Lava, TowerCategory.MagicDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["volcano_magic_damage_t3", "earthquake_magic_damage_t3"],
    meshConfig: {
      baseShape: "crystal",
      scale: 1.15,
      height: 1.4,
      effectColor: "#ff4500",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.22, 0.18, 0.22], color: "#444444" },
        { type: "octahedron", position: [0, 0.35, 0], size: [0.18], color: "#555555" },
        {
          type: "dodecahedron",
          position: [0, 0.65, 0],
          size: [0.12],
          color: "#666666",
          emissive: "#ff4500",
          animated: { type: "rotate", speed: 0.8, axis: "y" },
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
        createTowerId(BaseElement.Fire, TowerCategory.PhysicalDamage, 1),
        createTowerId(BaseElement.Earth, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT2.Lava, TowerCategory.PhysicalDamage, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["volcano_physical_damage_t3", "earthquake_physical_damage_t3"],
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

  // 4. Lava Buff Tower
  {
    id: createTowerId(MergedElementT2.Lava, TowerCategory.Buff, 2),
    type: "lava_buff" as any,
    name: "Volcanic Heart",
    description: "Radiates molten energy that empowers nearby towers with increased damage.",
    element: MergedElementT2.Lava,
    category: TowerCategory.Buff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 14,
      attackSpeed: 0.5,
      range: 4.0,
      cost: 330,
      upgradeCost: 165,
      health: 175,
      armor: 13,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Damage,
      radius: 3.0,
      strength: 0.22,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Buff, 1),
        createTowerId(BaseElement.Earth, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT2.Lava, TowerCategory.Buff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["volcano_buff_t3", "earthquake_buff_t3"],
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.2,
      height: 1.4,
      effectColor: "#ff4500",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.15, 0.28], color: "#444444" },
        { type: "cylinder", position: [0, 0.2, 0], size: [0.12, 0.4], color: "#555555" },
        {
          type: "sphere",
          position: [0, 0.7, 0],
          size: [0.18],
          color: "#666666",
          emissive: "#ff4400",
          animated: { type: "pulse", speed: 1.2 },
        },
        { type: "torus", position: [0, 0.1, 0], rotation: [1.57, 0, 0], size: [0.4, 0.025], color: "#ff440044" },
      ],
    },
  },

  // 5. Lava Debuff Tower
  {
    id: createTowerId(MergedElementT2.Lava, TowerCategory.Debuff, 2),
    type: "lava_debuff" as any,
    name: "Burning Ground",
    description: "Creates pools of lava that burn enemies and melt their armor.",
    element: MergedElementT2.Lava,
    category: TowerCategory.Debuff,
    tier: 2,
    rarity: TowerRarity.Uncommon,
    baseStats: {
      damage: 22,
      attackSpeed: 0.95,
      range: 3.0,
      cost: 270,
      upgradeCost: 135,
      health: 160,
      armor: 11,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.6,
      duration: 4,
      strength: 10,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(BaseElement.Fire, TowerCategory.Debuff, 1),
        createTowerId(BaseElement.Earth, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT2.Lava, TowerCategory.Debuff, 2),
      tier: 2,
      rarity: TowerRarity.Uncommon,
    },
    mergeOutput: ["volcano_debuff_t3", "earthquake_debuff_t3"],
    meshConfig: {
      baseShape: "statue",
      scale: 1.15,
      height: 1.1,
      effectColor: "#ff6347",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.1, 0.28], color: "#444444" },
        { type: "cone", position: [0, 0.2, 0], size: [0.18, 0.35], color: "#555555" },
        {
          type: "sphere",
          position: [0, 0.55, 0],
          size: [0.12],
          color: "#666666",
          emissive: "#ff4400",
          animated: { type: "pulse", speed: 1.5 },
        },
        {
          type: "sphere",
          position: [0.1, 0.4, 0.08],
          size: [0.04],
          color: "#888888",
          emissive: "#ff2200",
          animated: { type: "bob", speed: 2 },
        },
      ],
    },
  },
];
