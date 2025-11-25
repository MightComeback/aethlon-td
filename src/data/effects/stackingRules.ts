/**
 * Effect Stacking Rules
 * Defines how each effect type stacks when applied multiple times
 */

import { StatusEffectType, StackingBehavior, type StackingRule } from "@/types/effects";

/**
 * Stacking configuration per effect type
 */
export const EFFECT_STACKING_RULES: Record<StatusEffectType, StackingRule> = {
  // ============================================================================
  // DAMAGE OVER TIME
  // ============================================================================

  [StatusEffectType.Burn]: {
    behavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
  },

  [StatusEffectType.Poison]: {
    behavior: StackingBehavior.StackIntensity,
    maxStacks: 5,
    stackMultiplier: 1.0, // Each stack adds 100% base damage
    intensityCap: 5.0,
  },

  [StatusEffectType.Bleed]: {
    behavior: StackingBehavior.StackIntensity,
    maxStacks: 10,
    stackMultiplier: 0.5, // Each stack adds 50%
    intensityCap: 6.0,
  },

  [StatusEffectType.Corrode]: {
    behavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
  },

  // ============================================================================
  // MOVEMENT EFFECTS
  // ============================================================================

  [StatusEffectType.Slow]: {
    behavior: StackingBehavior.HighestWins,
    maxStacks: 1,
  },

  [StatusEffectType.Freeze]: {
    behavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
  },

  [StatusEffectType.Stun]: {
    behavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
  },

  [StatusEffectType.Root]: {
    behavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
  },

  [StatusEffectType.Cripple]: {
    behavior: StackingBehavior.StackIntensity,
    maxStacks: 3,
    stackMultiplier: 1.5, // Gets progressively worse
    intensityCap: 0.9, // Max 90% slow
  },

  // ============================================================================
  // ARMOR EFFECTS
  // ============================================================================

  [StatusEffectType.ArmorShred]: {
    behavior: StackingBehavior.StackIntensity,
    maxStacks: 5,
    stackMultiplier: 1.0,
    intensityCap: 100, // Max 100 armor reduction
  },

  [StatusEffectType.ArmorBreak]: {
    behavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
  },

  [StatusEffectType.MagicVulnerable]: {
    behavior: StackingBehavior.StackIntensity,
    maxStacks: 3,
    stackMultiplier: 1.0,
    intensityCap: 75, // Max 75% resistance reduction
  },

  // ============================================================================
  // DEATH TRIGGERS
  // ============================================================================

  [StatusEffectType.Marked]: {
    behavior: StackingBehavior.StackIntensity, // More stacks = bigger explosion
    maxStacks: 3,
    stackMultiplier: 0.5,
    intensityCap: 2.0,
  },

  [StatusEffectType.Contagion]: {
    behavior: StackingBehavior.Unique,
    maxStacks: 1,
  },

  [StatusEffectType.SoulHarvest]: {
    behavior: StackingBehavior.StackIntensity,
    maxStacks: 5,
    stackMultiplier: 0.25, // +25% bonus per stack
    intensityCap: 2.25,
  },

  // ============================================================================
  // DAMAGE AMPLIFICATION
  // ============================================================================

  [StatusEffectType.DamageAmp]: {
    behavior: StackingBehavior.StackIntensity,
    maxStacks: 3,
    stackMultiplier: 1.0,
    intensityCap: 3.0, // Max 3x damage taken
  },

  [StatusEffectType.PhysicalVulnerable]: {
    behavior: StackingBehavior.HighestWins,
    maxStacks: 1,
  },

  [StatusEffectType.Exposed]: {
    behavior: StackingBehavior.Unique, // Consumed on damage
    maxStacks: 1,
  },

  // ============================================================================
  // CROWD CONTROL
  // ============================================================================

  [StatusEffectType.Silence]: {
    behavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
  },

  [StatusEffectType.Weaken]: {
    behavior: StackingBehavior.HighestWins,
    maxStacks: 1,
  },
};

/**
 * Get stacking rule for an effect type
 */
export function getStackingRule(type: StatusEffectType): StackingRule | undefined {
  return EFFECT_STACKING_RULES[type];
}

/**
 * Calculate effective strength based on stacks
 */
export function calculateEffectiveStrength(
  baseStrength: number,
  stacks: number,
  type: StatusEffectType
): number {
  const rule = EFFECT_STACKING_RULES[type];
  if (!rule) return baseStrength;

  if (rule.behavior === StackingBehavior.StackIntensity && rule.stackMultiplier) {
    const multiplier = 1 + (stacks - 1) * rule.stackMultiplier;
    const capped = Math.min(multiplier, rule.intensityCap ?? Infinity);
    return baseStrength * capped;
  }

  return baseStrength;
}

/**
 * Check if an effect can stack further
 */
export function canStack(type: StatusEffectType, currentStacks: number): boolean {
  const rule = EFFECT_STACKING_RULES[type];
  if (!rule) return false;
  return currentStacks < rule.maxStacks;
}
