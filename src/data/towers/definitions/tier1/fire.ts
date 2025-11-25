/**
 * Fire Element - Tier 1 Base Towers
 * 5 towers (one per category: Damage, MagicDamage, PhysicalDamage, Buff, Debuff)
 */

import {
  TowerCategory,
  TowerRarity,
  BuffType,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

// ============================================================================
// FIRE TIER 1 TOWERS
// ============================================================================

export const FIRE_TIER1_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Fire Damage Tower - Balanced damage dealer
  {
    id: createTowerId(BaseElement.Fire, TowerCategory.Damage, 1),
    type: "fire_damage" as any,
    name: "Flame Spire",
    description: "A basic fire tower that deals balanced damage to all enemies.",
    element: BaseElement.Fire,
    category: TowerCategory.Damage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 25,
      attackSpeed: 1.0,
      range: 3.0,
      cost: 100,
      upgradeCost: 50,
      health: 100,
      armor: 5,
      magicPen: 0,
      armorPen: 0,
    },
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.0,
      height: 1.2,
      effectColor: "#ff4400",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.15, 0.4], color: "#555555" }, // Base
        { type: "cone", position: [0, 0.4, 0], size: [0.12, 0.6], color: "#666666" }, // Spire
        {
          type: "sphere",
          position: [0, 0.9, 0],
          size: [0.08],
          color: "#777777",
          emissive: "#ff4400",
          animated: { type: "pulse", speed: 2 },
        }, // Flame orb
      ],
    },
    mergeOutput: ["steam_damage_t2", "lava_damage_t2", "plasma_damage_t2", "storm_damage_t2"],
  },

  // 2. Fire Magic Damage Tower - Magic specialist
  {
    id: createTowerId(BaseElement.Fire, TowerCategory.MagicDamage, 1),
    type: "fire_magic_damage" as any,
    name: "Arcane Pyre",
    description: "Channels fire magic that bypasses physical armor.",
    element: BaseElement.Fire,
    category: TowerCategory.MagicDamage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 20,
      attackSpeed: 0.9,
      range: 3.5,
      cost: 120,
      upgradeCost: 60,
      health: 80,
      armor: 3,
      magicPen: 5,
      armorPen: 0,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.0,
      height: 1.0,
      effectColor: "#ff6600",
      parts: [
        { type: "octahedron", position: [0, 0.3, 0], size: [0.2], color: "#666666" }, // Crystal base
        {
          type: "dodecahedron",
          position: [0, 0.7, 0],
          size: [0.15],
          color: "#777777",
          emissive: "#ff6600",
          animated: { type: "rotate", speed: 1, axis: "y" },
        }, // Floating crystal
      ],
    },
    mergeOutput: ["steam_magic_damage_t2", "lava_magic_damage_t2", "plasma_magic_damage_t2", "storm_magic_damage_t2"],
  },

  // 3. Fire Physical Damage Tower - Heavy hitter
  {
    id: createTowerId(BaseElement.Fire, TowerCategory.PhysicalDamage, 1),
    type: "fire_physical_damage" as any,
    name: "Magma Cannon",
    description: "Launches superheated rocks that deal heavy physical damage.",
    element: BaseElement.Fire,
    category: TowerCategory.PhysicalDamage,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 35,
      attackSpeed: 0.7,
      range: 2.8,
      cost: 130,
      upgradeCost: 65,
      health: 120,
      armor: 8,
      magicPen: 0,
      armorPen: 3,
      splashRadius: 0.5,
    },
    meshConfig: {
      baseShape: "tower",
      scale: 1.0,
      height: 1.4,
      effectColor: "#ff4400",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.2, 0.3], color: "#555555" }, // Base platform
        { type: "box", position: [0, 0.2, 0], size: [0.25, 0.15, 0.2], color: "#606060" }, // Body
        {
          type: "cylinder",
          position: [0, 0.35, 0],
          rotation: [0.3, 0, 0],
          size: [0.1, 0.4],
          color: "#666666",
        }, // Cannon barrel
        {
          type: "sphere",
          position: [0, 0.55, 0.2],
          size: [0.06],
          color: "#888888",
          emissive: "#ff2200",
        }, // Projectile ready
      ],
    },
    mergeOutput: ["steam_physical_damage_t2", "lava_physical_damage_t2", "plasma_physical_damage_t2", "storm_physical_damage_t2"],
  },

  // 4. Fire Buff Tower - Damage aura
  {
    id: createTowerId(BaseElement.Fire, TowerCategory.Buff, 1),
    type: "fire_buff" as any,
    name: "Blazing Beacon",
    description: "Inspires nearby towers with fiery passion, increasing their damage.",
    element: BaseElement.Fire,
    category: TowerCategory.Buff,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 8,
      attackSpeed: 0.5,
      range: 4.0,
      cost: 150,
      upgradeCost: 75,
      health: 100,
      armor: 5,
      magicPen: 0,
      armorPen: 0,
    },
    buff: {
      type: BuffType.Damage,
      radius: 2.5,
      strength: 0.15, // +15% damage
      stackable: false,
    },
    meshConfig: {
      baseShape: "pedestal",
      scale: 1.0,
      height: 1.1,
      effectColor: "#ff8800",
      parts: [
        { type: "cylinder", position: [0, 0, 0], size: [0.25, 0.2], color: "#555555" }, // Base
        { type: "cylinder", position: [0, 0.3, 0], size: [0.08, 0.5], color: "#666666" }, // Pole
        {
          type: "sphere",
          position: [0, 0.7, 0],
          size: [0.15],
          color: "#888888",
          emissive: "#ff8800",
          animated: { type: "bob", speed: 1.5 },
        }, // Beacon flame
        // Aura ring (visual indicator)
        {
          type: "torus",
          position: [0, 0.1, 0],
          rotation: [1.57, 0, 0],
          size: [0.4, 0.02],
          color: "#ff440044",
        },
      ],
    },
    mergeOutput: ["steam_buff_t2", "lava_buff_t2", "plasma_buff_t2", "storm_buff_t2"],
  },

  // 5. Fire Debuff Tower - Burn applier
  {
    id: createTowerId(BaseElement.Fire, TowerCategory.Debuff, 1),
    type: "fire_debuff" as any,
    name: "Ember Trap",
    description: "Sets enemies ablaze, dealing damage over time.",
    element: BaseElement.Fire,
    category: TowerCategory.Debuff,
    tier: 1,
    rarity: TowerRarity.Common,
    baseStats: {
      damage: 12,
      attackSpeed: 1.2,
      range: 3.2,
      cost: 110,
      upgradeCost: 55,
      health: 90,
      armor: 4,
      magicPen: 0,
      armorPen: 0,
    },
    statusEffect: {
      type: StatusEffectType.Burn,
      chance: 0.6, // 60% chance to apply
      duration: 3, // 3 seconds
      strength: 5, // 5 damage per tick
    },
    meshConfig: {
      baseShape: "statue",
      scale: 1.0,
      height: 0.8,
      effectColor: "#ff4400",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.3, 0.1, 0.3], color: "#555555" }, // Platform
        {
          type: "cone",
          position: [-0.1, 0.15, -0.1],
          size: [0.06, 0.2],
          color: "#666666",
          emissive: "#ff2200",
        }, // Ember 1
        {
          type: "cone",
          position: [0.1, 0.12, 0.05],
          size: [0.05, 0.15],
          color: "#666666",
          emissive: "#ff3300",
        }, // Ember 2
        {
          type: "cone",
          position: [0, 0.18, 0.1],
          size: [0.07, 0.22],
          color: "#666666",
          emissive: "#ff4400",
        }, // Ember 3
      ],
    },
    mergeOutput: ["steam_debuff_t2", "lava_debuff_t2", "plasma_debuff_t2", "storm_debuff_t2"],
  },
];
