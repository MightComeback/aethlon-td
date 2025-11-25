/**
 * Inferno Element - Tier 3 Towers (Plasma + Fire mastery)
 * Pure destructive fire power
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

export const INFERNO_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Inferno Damage Tower
  {
    id: createTowerId(MergedElementT3.Inferno, TowerCategory.Damage, 3),
    type: "inferno_damage" as any,
    name: "Hellfire Spire",
    description: "Rages with unquenchable plasma fire that incinerates everything.",
    element: MergedElementT3.Inferno,
    category: TowerCategory.Damage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 110,
      attackSpeed: 1.0,
      range: 3.6,
      cost: 640,
      upgradeCost: 320,
      health: 240,
      armor: 14,
      magicPen: 10,
      armorPen: 10,
      critChance: 0.18,
      critMultiplier: 2.1,
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.7,
      duration: 4,
      strength: 18,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Plasma, TowerCategory.Damage, 2),
        createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Inferno, TowerCategory.Damage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.45,
      height: 1.9,
      effectColor: "#ff4500",
      parts: [
        { type: "cone", position: [0, 0, 0], size: [0.25, 0.5], color: "#3a3a3a" },
        { type: "cylinder", position: [0, 0.5, 0], size: [0.16, 0.6], color: "#444444" },
        { type: "sphere", position: [0, 1.0, 0], size: [0.18], color: "#555555", emissive: "#ff4500", animated: { type: "pulse", speed: 2 } },
        { type: "cone", position: [0, 1.25, 0], size: [0.1, 0.25], color: "#888888", emissive: "#ff1493", animated: { type: "pulse", speed: 3 } },
        { type: "torus", position: [0, 1.0, 0], rotation: [1.57, 0, 0], size: [0.28, 0.02], color: "#ff149344", animated: { type: "rotate", speed: 3, axis: "y" } },
      ],
    },
  },

  // 2. Inferno Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Inferno, TowerCategory.MagicDamage, 3),
    type: "inferno_magic_damage" as any,
    name: "Plasma Core Reactor",
    description: "Projects pure plasma magic that disintegrates magical resistance.",
    element: MergedElementT3.Inferno,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 95,
      attackSpeed: 0.9,
      range: 4.0,
      cost: 690,
      upgradeCost: 345,
      health: 200,
      armor: 10,
      magicPen: 24,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Plasma, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Fire, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Inferno, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.4,
      height: 1.7,
      effectColor: "#ff00ff",
      parts: [
        { type: "octahedron", position: [0, 0.25, 0], size: [0.2], color: "#444444" },
        { type: "dodecahedron", position: [0, 0.65, 0], size: [0.18], color: "#555555", emissive: "#ff69b4", animated: { type: "rotate", speed: 1.5, axis: "y" } },
        { type: "sphere", position: [0, 1.0, 0], size: [0.12], color: "#888888", emissive: "#ff00ff", animated: { type: "pulse", speed: 2.5 } },
      ],
    },
  },

  // 3. Inferno Physical Damage Tower
  {
    id: createTowerId(MergedElementT3.Inferno, TowerCategory.PhysicalDamage, 3),
    type: "inferno_physical_damage" as any,
    name: "Plasma Siege Cannon",
    description: "Fires superheated plasma projectiles with devastating penetration.",
    element: MergedElementT3.Inferno,
    category: TowerCategory.PhysicalDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 135,
      attackSpeed: 0.6,
      range: 3.4,
      cost: 740,
      upgradeCost: 370,
      health: 260,
      armor: 15,
      magicPen: 0,
      armorPen: 16,
      critChance: 0.2,
      critMultiplier: 2.3,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Plasma, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Fire, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Inferno, TowerCategory.PhysicalDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.5,
      height: 1.9,
      effectColor: "#ff4500",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.24, 0.3], color: "#3a3a3a" },
        { type: "box", position: [0, 0.35, 0], size: [0.22, 0.25, 0.22], color: "#444444" },
        { type: "cylinder", position: [0, 0.6, 0.1], rotation: [0.2, 0, 0], size: [0.1, 0.55], color: "#555555" },
        { type: "cone", position: [0, 0.9, 0.38], rotation: [0.2, 0, 0], size: [0.07, 0.15], color: "#888888", emissive: "#ff00ff" },
      ],
    },
  },

  // 4. Inferno Buff Tower
  {
    id: createTowerId(MergedElementT3.Inferno, TowerCategory.Buff, 3),
    type: "inferno_buff" as any,
    name: "Plasma Amplifier",
    description: "Supercharges nearby towers with plasma energy, massively boosting attack speed.",
    element: MergedElementT3.Inferno,
    category: TowerCategory.Buff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 28,
      attackSpeed: 0.5,
      range: 4.5,
      cost: 760,
      upgradeCost: 380,
      health: 220,
      armor: 12,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.AttackSpeed,
      radius: 4.0,
      strength: 0.4,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Plasma, TowerCategory.Buff, 2),
        createTowerId(BaseElement.Fire, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT3.Inferno, TowerCategory.Buff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.4,
      height: 1.6,
      effectColor: "#ff00ff",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.26, 0.15], color: "#3a3a3a" },
        { type: "cylinder", position: [0, 0.2, 0], size: [0.1, 0.45], color: "#444444" },
        { type: "sphere", position: [0, 0.75, 0], size: [0.2], color: "#555555", emissive: "#ff69b4", animated: { type: "pulse", speed: 1.5 } },
        { type: "torus", position: [0, 0.75, 0], rotation: [1.57, 0, 0], size: [0.35, 0.02], color: "#ff00ff44", animated: { type: "rotate", speed: 2, axis: "y" } },
      ],
    },
  },

  // 5. Inferno Debuff Tower
  {
    id: createTowerId(MergedElementT3.Inferno, TowerCategory.Debuff, 3),
    type: "inferno_debuff" as any,
    name: "Immolation Field",
    description: "Creates zones of plasma fire that devastate and amplify damage to enemies.",
    element: MergedElementT3.Inferno,
    category: TowerCategory.Debuff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 50,
      attackSpeed: 0.95,
      range: 3.6,
      cost: 720,
      upgradeCost: 360,
      health: 210,
      armor: 11,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.DamageAmp,
      chance: 0.6,
      duration: 4,
      strength: 0.35,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Plasma, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Fire, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT3.Inferno, TowerCategory.Debuff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.35,
      height: 1.4,
      effectColor: "#ff4500",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.22, 0.12], color: "#3a3a3a" },
        { type: "torus", position: [0, 0.25, 0], rotation: [1.57, 0, 0], size: [0.18, 0.04], color: "#444444", animated: { type: "rotate", speed: 2, axis: "y" } },
        { type: "sphere", position: [0, 0.5, 0], size: [0.14], color: "#555555", emissive: "#ff69b4", animated: { type: "pulse", speed: 2 } },
        { type: "cone", position: [0, 0.7, 0], size: [0.06, 0.15], color: "#888888", emissive: "#ff00ff", animated: { type: "pulse", speed: 3 } },
      ],
    },
  },
];
