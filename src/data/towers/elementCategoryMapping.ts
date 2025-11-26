/**
 * Element-to-Category Mapping Configuration
 * Single source of truth for which categories each element produces
 */

import { BaseElement, MergedElementT2, MergedElementT3 } from "@/types/element";
import { TowerCategory } from "@/types/tower";

/**
 * T1 Base Elements - All produce Damage category with unique passives
 */
export const T1_CATEGORIES: Record<BaseElement, TowerCategory[]> = {
  [BaseElement.Fire]: [TowerCategory.Damage],
  [BaseElement.Water]: [TowerCategory.Damage],
  [BaseElement.Earth]: [TowerCategory.Damage],
  [BaseElement.Air]: [TowerCategory.Damage],
  [BaseElement.Lightning]: [TowerCategory.Damage],
};

/**
 * T2 Merged Elements - Each produces 2 categories based on element synergy
 */
export const T2_CATEGORIES: Record<MergedElementT2, TowerCategory[]> = {
  [MergedElementT2.Lava]: [TowerCategory.PhysicalDamage, TowerCategory.Damage],
  [MergedElementT2.Ice]: [TowerCategory.Debuff, TowerCategory.PhysicalDamage],
  [MergedElementT2.Storm]: [TowerCategory.MagicDamage, TowerCategory.Debuff],
  [MergedElementT2.Magma]: [TowerCategory.PhysicalDamage, TowerCategory.Buff],
  [MergedElementT2.Plasma]: [TowerCategory.MagicDamage, TowerCategory.Damage],
};

/**
 * T3 Advanced Elements - Each produces 2 categories representing mastery
 */
export const T3_CATEGORIES: Record<MergedElementT3, TowerCategory[]> = {
  [MergedElementT3.Volcano]: [TowerCategory.PhysicalDamage, TowerCategory.MagicDamage],
  [MergedElementT3.Glacier]: [TowerCategory.Debuff, TowerCategory.Buff],
  [MergedElementT3.Hurricane]: [TowerCategory.MagicDamage, TowerCategory.Debuff],
  [MergedElementT3.Mountain]: [TowerCategory.Buff, TowerCategory.PhysicalDamage],
  [MergedElementT3.Supercell]: [TowerCategory.Damage, TowerCategory.MagicDamage],
};

/**
 * T1 Passive stat bonuses (applied to base Damage towers)
 */
export const T1_PASSIVES = {
  [BaseElement.Fire]: { critChance: 0.15, critMultiplier: 2.0 },
  [BaseElement.Water]: { armorPen: 8 },
  [BaseElement.Earth]: { splashRadius: 1.0 },
  [BaseElement.Air]: { attackSpeed: 1.25 },
  [BaseElement.Lightning]: { range: 3.6 },
};

/**
 * Category distribution across all 25 towers:
 * - Damage: 8 towers (5 T1 + 2 T2 + 1 T3)
 * - MagicDamage: 5 towers (2 T2 + 3 T3)
 * - PhysicalDamage: 5 towers (3 T2 + 2 T3)
 * - Buff: 3 towers (1 T2 + 2 T3)
 * - Debuff: 4 towers (2 T2 + 2 T3)
 */
