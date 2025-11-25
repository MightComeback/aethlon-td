/**
 * Earthquake Element - Tier 3 Towers (Lava + Earth mastery)
 * Ultimate Earth element specialization
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

export const EARTHQUAKE_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Earthquake Damage Tower
  {
    id: createTowerId(MergedElementT3.Earthquake, TowerCategory.Damage, 3),
    type: "earthquake_damage" as any,
    name: "Seismic Citadel",
    description: "Generates devastating earthquakes that damage and stun all enemies in range.",
    element: MergedElementT3.Earthquake,
    category: TowerCategory.Damage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 90,
      attackSpeed: 0.6,
      range: 3.4,
      cost: 620,
      upgradeCost: 310,
      health: 380,
      armor: 28,
      magicPen: 5,
      armorPen: 15,
      splashRadius: 2.0,
    },
    ability: {
      id: "tectonic_shift",
      name: "Tectonic Shift",
      description: "Creates a massive earthquake stunning all enemies for 2 seconds.",
      cooldown: 18000,
      duration: 2000,
      strength: 1,
      type: "active",
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.Damage, 2),
        createTowerId(BaseElement.Earth, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Earthquake, TowerCategory.Damage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.5,
      height: 1.9,
      effectColor: "#654321",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.4, 0.25, 0.4], color: "#3a3a3a" },
        { type: "box", position: [0, 0.3, 0], size: [0.32, 0.35, 0.32], color: "#444444" },
        { type: "box", position: [0, 0.6, 0], size: [0.26, 0.3, 0.26], color: "#4a4a4a" },
        { type: "box", position: [0, 0.88, 0], size: [0.3, 0.08, 0.3], color: "#555555" },
        { type: "sphere", position: [0, 1.05, 0], size: [0.14], color: "#666666", emissive: "#d2691e", animated: { type: "pulse", speed: 0.8 } },
      ],
    },
  },

  // 2. Earthquake Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Earthquake, TowerCategory.MagicDamage, 3),
    type: "earthquake_magic_damage" as any,
    name: "Geomantic Focus",
    description: "Channels earth's magical energy through seismic resonance.",
    element: MergedElementT3.Earthquake,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 78,
      attackSpeed: 0.55,
      range: 3.6,
      cost: 670,
      upgradeCost: 335,
      health: 320,
      armor: 22,
      magicPen: 18,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Earth, TowerCategory.MagicDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Earthquake, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.4,
      height: 1.7,
      effectColor: "#d2691e",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.2, 0.3], color: "#3a3a3a" },
        { type: "octahedron", position: [0, 0.4, 0], size: [0.22], color: "#444444" },
        { type: "dodecahedron", position: [0, 0.8, 0], size: [0.16], color: "#555555", emissive: "#654321", animated: { type: "rotate", speed: 0.6, axis: "y" } },
        { type: "sphere", position: [0, 1.1, 0], size: [0.1], color: "#888888", emissive: "#d2691e", animated: { type: "pulse", speed: 1.2 } },
      ],
    },
  },

  // 3. Earthquake Physical Damage Tower
  {
    id: createTowerId(MergedElementT3.Earthquake, TowerCategory.PhysicalDamage, 3),
    type: "earthquake_physical_damage" as any,
    name: "Tectonic Crusher",
    description: "Launches massive earth pillars that devastate enemy formations.",
    element: MergedElementT3.Earthquake,
    category: TowerCategory.PhysicalDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 130,
      attackSpeed: 0.4,
      range: 3.0,
      cost: 720,
      upgradeCost: 360,
      health: 420,
      armor: 32,
      magicPen: 0,
      armorPen: 18,
      splashRadius: 1.6,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.PhysicalDamage, 2),
        createTowerId(BaseElement.Earth, TowerCategory.PhysicalDamage, 1),
      ],
      output: createTowerId(MergedElementT3.Earthquake, TowerCategory.PhysicalDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.55,
      height: 2.0,
      effectColor: "#654321",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.4, 0.3, 0.4], color: "#3a3a3a" },
        { type: "box", position: [0, 0.35, 0], size: [0.3, 0.25, 0.3], color: "#444444" },
        { type: "cylinder", position: [0, 0.6, 0.12], rotation: [0.4, 0, 0], size: [0.14, 0.55], color: "#555555" },
        { type: "box", position: [0, 0.85, 0.4], size: [0.15, 0.15, 0.15], color: "#666666" },
      ],
    },
  },

  // 4. Earthquake Buff Tower
  {
    id: createTowerId(MergedElementT3.Earthquake, TowerCategory.Buff, 3),
    type: "earthquake_buff" as any,
    name: "Granite Fortress",
    description: "Provides unshakeable foundation, greatly boosting nearby towers' armor penetration.",
    element: MergedElementT3.Earthquake,
    category: TowerCategory.Buff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 20,
      attackSpeed: 0.35,
      range: 4.2,
      cost: 740,
      upgradeCost: 370,
      health: 450,
      armor: 35,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.ArmorPen,
      radius: 4.0,
      strength: 0.35,
      stackable: false,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.Buff, 2),
        createTowerId(BaseElement.Earth, TowerCategory.Buff, 1),
      ],
      output: createTowerId(MergedElementT3.Earthquake, TowerCategory.Buff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.5,
      height: 1.8,
      effectColor: "#d2691e",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.38, 0.2, 0.38], color: "#3a3a3a" },
        { type: "box", position: [0, 0.28, 0], size: [0.28, 0.55, 0.28], color: "#444444" },
        { type: "box", position: [0, 0.75, 0], size: [0.32, 0.12, 0.32], color: "#555555" },
        { type: "sphere", position: [0, 0.98, 0], size: [0.16], color: "#666666", emissive: "#654321", animated: { type: "pulse", speed: 0.8 } },
        { type: "torus", position: [0, 0.15, 0], rotation: [1.57, 0, 0], size: [0.5, 0.03], color: "#65432144" },
      ],
    },
  },

  // 5. Earthquake Debuff Tower
  {
    id: createTowerId(MergedElementT3.Earthquake, TowerCategory.Debuff, 3),
    type: "earthquake_debuff" as any,
    name: "Fault Line Generator",
    description: "Creates seismic fissures that shatter enemy armor and root them in place.",
    element: MergedElementT3.Earthquake,
    category: TowerCategory.Debuff,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 40,
      attackSpeed: 0.65,
      range: 3.3,
      cost: 700,
      upgradeCost: 350,
      health: 360,
      armor: 26,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Root,
      chance: 0.4,
      duration: 2,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Lava, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Earth, TowerCategory.Debuff, 1),
      ],
      output: createTowerId(MergedElementT3.Earthquake, TowerCategory.Debuff, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.4,
      height: 1.5,
      effectColor: "#654321",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.35, 0.12, 0.35], color: "#3a3a3a" },
        { type: "box", position: [0, 0.18, 0], size: [0.25, 0.35, 0.25], color: "#444444" },
        { type: "cone", position: [0, 0.5, 0], size: [0.18, 0.35], color: "#555555" },
        { type: "sphere", position: [0, 0.85, 0], size: [0.12], color: "#666666", emissive: "#d2691e", animated: { type: "pulse", speed: 1 } },
      ],
    },
  },
];
