/**
 * Discharge Element - Tier 3 Towers (Crystal + Lightning mastery)
 * Crystallized lightning power
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

export const DISCHARGE_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Discharge Damage Tower
  {
    id: createTowerId(MergedElementT3.Discharge, TowerCategory.Damage, 3),
    type: "discharge_damage" as any,
    name: "Crystal Lightning Spire",
    description: "Fires crystallized lightning that pierces through multiple enemies.",
    element: MergedElementT3.Discharge,
    category: TowerCategory.Damage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 88,
      attackSpeed: 1.0,
      range: 3.8,
      cost: 660,
      upgradeCost: 330,
      health: 250,
      armor: 16,
      magicPen: 10,
      armorPen: 10,
      critChance: 0.18,
      critMultiplier: 2.1,
    },
    ability: {
      id: "crystalline_discharge",
      name: "Crystalline Discharge",
      description: "Releases a burst of crystal lightning that damages all enemies in range.",
      cooldown: 14000,
      duration: 1000,
      strength: 2.5,
      type: "active",
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Crystal, TowerCategory.Damage, 2),
        createTowerId(BaseElement.Lightning, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Discharge, TowerCategory.Damage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.5,
      height: 1.9,
      effectColor: "#9370db",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.2, 0.28], color: "#3a3a3a" },
        { type: "octahedron", position: [0, 0.4, 0], size: [0.22], color: "#444444" },
        { type: "octahedron", position: [0, 0.8, 0], size: [0.16], color: "#555555", emissive: "#b19cd9", animated: { type: "rotate", speed: 1, axis: "y" } },
        { type: "cone", position: [0, 1.1, 0], size: [0.06, 0.2], color: "#888888", emissive: "#ffff00", animated: { type: "pulse", speed: 4 } },
        { type: "sphere", position: [0.12, 0.6, 0.08], size: [0.04], color: "#aaaaaa", emissive: "#dda0dd", animated: { type: "pulse", speed: 5 } },
      ],
    },
  },

  // 2. Discharge Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Discharge, TowerCategory.MagicDamage, 3),
    type: "discharge_magic_damage" as any,
    name: "Prismatic Conduit",
    description: "Channels pure crystal-lightning magic that shatters resistance.",
    element: MergedElementT3.Discharge,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 75,
      attackSpeed: 0.9,
      range: 4.0,
      cost: 710,
      upgradeCost: 355,
      health: 220,
      armor: 13,
      magicPen: 24,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Crystal, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Lightning, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Discharge, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.45,
      height: 1.8,
      effectColor: "#dda0dd",
      parts: [
        { type: "octahedron", position: [0, 0.25, 0], size: [0.2], color: "#3a3a3a" },
        { type: "dodecahedron", position: [0, 0.6, 0], size: [0.18], color: "#444444", emissive: "#b19cd9", animated: { type: "rotate", speed: 0.8, axis: "y" } },
        { type: "octahedron", position: [0, 0.95, 0], size: [0.1], color: "#888888", emissive: "#dda0dd", animated: { type: "pulse", speed: 2 } },
      ],
    },
  },

  // 3. Discharge Physical Damage Tower
  {
    id: createTowerId(MergedElementT3.Discharge, TowerCategory.PhysicalDamage, 3),
    type: "discharge_physical_damage" as any,
    name: "Crystal Railgun",
    description: "Fires crystallized lightning projectiles with extreme armor penetration.",
    element: MergedElementT3.Discharge,
    category: TowerCategory.PhysicalDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 118,
      attackSpeed: 0.65,
      range: 3.5,
      cost: 760,
      upgradeCost: 380,
      health: 280,
      armor: 18,
      magicPen: 0,
      armorPen: 20,
      critChance: 0.22,
      critMultiplier: 2.4,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Crystal, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Lightning, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Discharge, TowerCategory.PhysicalDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.5,
      height: 1.9,
      effectColor: "#9370db",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.22, 0.3], color: "#3a3a3a" },
        { type: "octahedron", position: [0, 0.35, 0], size: [0.2], color: "#444444" },
        { type: "cylinder", position: [0, 0.6, 0.1], rotation: [0.2, 0, 0], size: [0.06, 0.55], color: "#555555" },
        { type: "octahedron", position: [0, 0.9, 0.4], size: [0.06], color: "#888888", emissive: "#ffff00" },
      ],
    },
  },

  // 4. Discharge Buff Tower
  {
    id: createTowerId(MergedElementT3.Discharge, TowerCategory.Buff, 3),
    type: "discharge_buff" as any,
    name: "Resonance Matrix",
    description: "Emits harmonic crystal frequencies that greatly enhance critical damage.",
    element: MergedElementT3.Discharge,
    category: TowerCategory.Buff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 20,
      attackSpeed: 0.45,
      range: 4.5,
      cost: 780,
      upgradeCost: 390,
      health: 260,
      armor: 16,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.CritChance,
      radius: 4.0,
      strength: 0.18,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Crystal, TowerCategory.Buff, 2),
        createTowerId(BaseElement.Lightning, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT3.Discharge, TowerCategory.Buff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.45,
      height: 1.8,
      effectColor: "#dda0dd",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.18, 0.3], color: "#3a3a3a" },
        { type: "octahedron", position: [0, 0.4, 0], size: [0.2], color: "#444444" },
        { type: "dodecahedron", position: [0, 0.75, 0], size: [0.15], color: "#555555", emissive: "#b19cd9", animated: { type: "pulse", speed: 1 } },
        { type: "torus", position: [0, 0.75, 0], rotation: [1.57, 0, 0], size: [0.3, 0.02], color: "#b19cd944", animated: { type: "rotate", speed: 1, axis: "y" } },
      ],
    },
  },

  // 5. Discharge Debuff Tower
  {
    id: createTowerId(MergedElementT3.Discharge, TowerCategory.Debuff, 3),
    type: "discharge_debuff" as any,
    name: "Shattering Field",
    description: "Creates crystal resonance fields that break enemy armor completely.",
    element: MergedElementT3.Discharge,
    category: TowerCategory.Debuff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 38,
      attackSpeed: 0.85,
      range: 3.5,
      cost: 740,
      upgradeCost: 370,
      health: 240,
      armor: 15,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.ArmorBreak,
      chance: 0.45,
      duration: 4,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Crystal, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Lightning, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT3.Discharge, TowerCategory.Debuff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.4,
      height: 1.5,
      effectColor: "#9370db",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.28, 0.12, 0.28], color: "#3a3a3a" },
        { type: "octahedron", position: [0, 0.3, 0], size: [0.18], color: "#444444" },
        { type: "octahedron", position: [0, 0.6, 0], size: [0.12], color: "#555555", emissive: "#b19cd9", animated: { type: "rotate", speed: 1, axis: "y" } },
        { type: "cone", position: [0, 0.8, 0], size: [0.05, 0.12], color: "#888888", emissive: "#ffff00", animated: { type: "pulse", speed: 4 } },
      ],
    },
  },
];
