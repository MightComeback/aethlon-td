/**
 * Element Effectiveness System
 * Rock-paper-scissors damage multipliers for element interactions
 */

import {
  BaseElement,
  type Element,
  type EffectivenessValue,
  type ElementalDamageResult,
} from "@/types/element";
import { getElementComponents, getElementTier } from "./utils";

// ============================================================================
// BASE ELEMENT EFFECTIVENESS MATRIX
// ============================================================================

/**
 * Base effectiveness matrix for rock-paper-scissors pattern
 * Matrix where ATTACKER[DEFENDER] = multiplier
 *
 * Pattern:
 * - Fire > Earth, Air (burns/melts) | < Water, Lightning
 * - Water > Fire (extinguishes) | < Earth, Air, Lightning
 * - Earth > Lightning, Water (grounds/absorbs) | < Fire, Air
 * - Air > Earth (erodes) | < Fire, Lightning
 * - Lightning > Water, Air (conducts/ionizes) | < Earth
 */
export const BASE_EFFECTIVENESS: Record<
  BaseElement,
  Record<BaseElement, EffectivenessValue>
> = {
  [BaseElement.Fire]: {
    [BaseElement.Fire]: 1.0,
    [BaseElement.Water]: 0.5, // Water resists Fire
    [BaseElement.Earth]: 2.0, // Fire melts/burns Earth
    [BaseElement.Air]: 2.0, // Fire consumes Air (oxygen)
    [BaseElement.Lightning]: 0.5, // Lightning superheats Fire
  },

  [BaseElement.Water]: {
    [BaseElement.Fire]: 2.0, // Water extinguishes Fire
    [BaseElement.Water]: 1.0,
    [BaseElement.Earth]: 0.5, // Earth absorbs Water
    [BaseElement.Air]: 0.5, // Air evaporates Water
    [BaseElement.Lightning]: 2.0, // Water conducts/shorts Lightning
  },

  [BaseElement.Earth]: {
    [BaseElement.Fire]: 0.5, // Fire melts Earth
    [BaseElement.Water]: 2.0, // Earth absorbs Water
    [BaseElement.Earth]: 1.0,
    [BaseElement.Air]: 0.5, // Air erodes Earth
    [BaseElement.Lightning]: 2.0, // Earth grounds Lightning
  },

  [BaseElement.Air]: {
    [BaseElement.Fire]: 0.5, // Fire consumes Air
    [BaseElement.Water]: 2.0, // Air evaporates Water
    [BaseElement.Earth]: 2.0, // Air erodes Earth
    [BaseElement.Air]: 1.0,
    [BaseElement.Lightning]: 0.5, // Lightning ionizes Air
  },

  [BaseElement.Lightning]: {
    [BaseElement.Fire]: 2.0, // Lightning superheats Fire
    [BaseElement.Water]: 0.5, // Water shorts Lightning
    [BaseElement.Earth]: 0.5, // Earth grounds Lightning
    [BaseElement.Air]: 2.0, // Lightning ionizes Air
    [BaseElement.Lightning]: 1.0,
  },
};

// ============================================================================
// EFFECTIVENESS CALCULATION
// ============================================================================

/**
 * Calculate effectiveness between any two elements
 * For merged elements, averages the effectiveness of components
 */
export function calculateEffectiveness(
  attacker: Element,
  defender: Element
): number {
  const attackerComponents = getElementComponents(attacker);
  const defenderComponents = getElementComponents(defender);

  let totalMultiplier = 0;
  let count = 0;

  for (const attackComp of attackerComponents) {
    for (const defendComp of defenderComponents) {
      totalMultiplier += BASE_EFFECTIVENESS[attackComp][defendComp];
      count++;
    }
  }

  // Average and apply tier bonus
  const avgMultiplier = totalMultiplier / count;
  const tierBonus = getTierBonus(attacker, defender);

  return clampEffectiveness(avgMultiplier * tierBonus);
}

/**
 * Tier bonus: higher tier attackers get slight advantage
 */
function getTierBonus(attacker: Element, defender: Element): number {
  const attackerTier = getElementTier(attacker);
  const defenderTier = getElementTier(defender);
  const tierDiff = attackerTier - defenderTier;

  // +5% per tier difference (capped at ±10%)
  return 1.0 + Math.max(-0.1, Math.min(0.1, tierDiff * 0.05));
}

/**
 * Clamp effectiveness to discrete values
 */
function clampEffectiveness(value: number): EffectivenessValue {
  if (value <= 0.625) return 0.5;
  if (value <= 0.875) return 0.75;
  if (value <= 1.125) return 1.0;
  if (value <= 1.375) return 1.25;
  if (value <= 1.75) return 1.5;
  return 2.0;
}

/**
 * Calculate complete elemental damage result
 */
export function calculateElementalDamage(
  baseDamage: number,
  attackerElement: Element | null,
  defenderElement: Element | null
): ElementalDamageResult {
  // No element interaction if either is null
  if (!attackerElement || !defenderElement) {
    const multiplier = attackerElement && !defenderElement ? 1.1 : 1.0;
    return {
      baseDamage,
      elementMultiplier: multiplier,
      tierBonus: 1.0,
      finalDamage: Math.floor(baseDamage * multiplier),
      isEffective: multiplier > 1.0,
      isResisted: multiplier < 1.0,
      attackerElement,
      defenderElement,
    };
  }

  // Calculate effectiveness
  const effectiveness = calculateEffectiveness(attackerElement, defenderElement);
  const tierBonus = getTierBonus(attackerElement, defenderElement);

  return {
    baseDamage,
    elementMultiplier: effectiveness,
    tierBonus,
    finalDamage: Math.floor(baseDamage * effectiveness),
    isEffective: effectiveness > 1.0,
    isResisted: effectiveness < 1.0,
    attackerElement,
    defenderElement,
  };
}

/**
 * Get effectiveness display string
 */
export function getEffectivenessDisplay(multiplier: number): string {
  if (multiplier >= 2.0) return "Super Effective!";
  if (multiplier >= 1.5) return "Very Effective";
  if (multiplier >= 1.25) return "Effective";
  if (multiplier <= 0.5) return "Not Effective...";
  if (multiplier <= 0.75) return "Resisted";
  return "Normal";
}

/**
 * Get effectiveness color for UI
 */
export function getEffectivenessColor(multiplier: number): string {
  if (multiplier >= 2.0) return "#4caf50"; // Green
  if (multiplier >= 1.25) return "#8bc34a"; // Light green
  if (multiplier <= 0.5) return "#f44336"; // Red
  if (multiplier <= 0.75) return "#ff9800"; // Orange
  return "#9e9e9e"; // Gray
}
