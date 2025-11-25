/**
 * Tower Category System
 * Defines the behavior and stat modifiers for each tower category
 */

import {
  TowerCategory,
  BuffType,
  type TowerStats,
} from "@/types/tower";
import { StatusEffectType } from "@/types/enemy";
import type { Element } from "@/types/element";
import { BaseElement } from "@/types/element";

/**
 * Category configuration
 */
export interface CategoryConfig {
  category: TowerCategory;
  displayName: string;
  description: string;
  damageType: "physical" | "magic" | "true" | "none";
  primaryStat: keyof TowerStats;
  baseStats: {
    damageMultiplier: number;
    attackSpeedMultiplier: number;
    rangeMultiplier: number;
    healthMultiplier: number;
  };
}

export const CATEGORY_CONFIGS: Record<TowerCategory, CategoryConfig> = {
  [TowerCategory.Damage]: {
    category: TowerCategory.Damage,
    displayName: "Damage",
    description: "Balanced damage dealers with mixed damage types.",
    damageType: "true",
    primaryStat: "damage",
    baseStats: {
      damageMultiplier: 1.0,
      attackSpeedMultiplier: 1.0,
      rangeMultiplier: 1.0,
      healthMultiplier: 1.0,
    },
  },

  [TowerCategory.MagicDamage]: {
    category: TowerCategory.MagicDamage,
    displayName: "Magic Damage",
    description: "Deals magic damage that ignores armor but is reduced by magic resistance.",
    damageType: "magic",
    primaryStat: "magicPen",
    baseStats: {
      damageMultiplier: 0.85,
      attackSpeedMultiplier: 0.9,
      rangeMultiplier: 1.2,
      healthMultiplier: 0.8,
    },
  },

  [TowerCategory.PhysicalDamage]: {
    category: TowerCategory.PhysicalDamage,
    displayName: "Physical Damage",
    description: "High base damage reduced by enemy armor.",
    damageType: "physical",
    primaryStat: "armorPen",
    baseStats: {
      damageMultiplier: 1.3,
      attackSpeedMultiplier: 0.8,
      rangeMultiplier: 0.9,
      healthMultiplier: 1.2,
    },
  },

  [TowerCategory.Buff]: {
    category: TowerCategory.Buff,
    displayName: "Buff",
    description: "Enhances nearby towers with auras and abilities.",
    damageType: "none",
    primaryStat: "range",
    baseStats: {
      damageMultiplier: 0.3,
      attackSpeedMultiplier: 0.5,
      rangeMultiplier: 1.5,
      healthMultiplier: 1.0,
    },
  },

  [TowerCategory.Debuff]: {
    category: TowerCategory.Debuff,
    displayName: "Debuff",
    description: "Applies status effects to weaken enemies.",
    damageType: "magic",
    primaryStat: "attackSpeed",
    baseStats: {
      damageMultiplier: 0.5,
      attackSpeedMultiplier: 1.3,
      rangeMultiplier: 1.1,
      healthMultiplier: 0.9,
    },
  },
};

/**
 * Default status effects by element (for debuff towers)
 */
export const ELEMENT_STATUS_EFFECTS: Map<Element, StatusEffectType> = new Map([
  [BaseElement.Fire, StatusEffectType.Burn],
  [BaseElement.Water, StatusEffectType.Slow],
  [BaseElement.Earth, StatusEffectType.Stun],
  [BaseElement.Air, StatusEffectType.Weaken],
  [BaseElement.Lightning, StatusEffectType.DamageAmp],
  // Merged elements can be added as needed
]);

/**
 * Default buff types by element (for buff towers)
 */
export const ELEMENT_BUFF_TYPES: Map<Element, BuffType> = new Map([
  [BaseElement.Fire, BuffType.Damage],
  [BaseElement.Water, BuffType.Range],
  [BaseElement.Earth, BuffType.ArmorPen],
  [BaseElement.Air, BuffType.AttackSpeed],
  [BaseElement.Lightning, BuffType.CritChance],
]);

/**
 * Get category configuration
 */
export function getCategoryConfig(category: TowerCategory): CategoryConfig {
  return CATEGORY_CONFIGS[category];
}

/**
 * Apply category stat modifiers to base stats
 */
export function applyCategoryModifiers(
  baseStats: TowerStats,
  category: TowerCategory
): TowerStats {
  const config = CATEGORY_CONFIGS[category];

  return {
    ...baseStats,
    damage: Math.round(baseStats.damage * config.baseStats.damageMultiplier),
    attackSpeed: baseStats.attackSpeed * config.baseStats.attackSpeedMultiplier,
    range: baseStats.range * config.baseStats.rangeMultiplier,
    health: Math.round(baseStats.health * config.baseStats.healthMultiplier),
  };
}

/**
 * Get default status effect for element (debuff towers)
 */
export function getElementStatusEffect(element: Element): StatusEffectType | null {
  return ELEMENT_STATUS_EFFECTS.get(element) || null;
}

/**
 * Get default buff type for element (buff towers)
 */
export function getElementBuffType(element: Element): BuffType | null {
  return ELEMENT_BUFF_TYPES.get(element) || null;
}

/**
 * Check if category deals damage
 */
export function isDamageCategory(category: TowerCategory): boolean {
  return (
    category === TowerCategory.Damage ||
    category === TowerCategory.MagicDamage ||
    category === TowerCategory.PhysicalDamage
  );
}

/**
 * Check if category is support role
 */
export function isSupportCategory(category: TowerCategory): boolean {
  return category === TowerCategory.Buff || category === TowerCategory.Debuff;
}
