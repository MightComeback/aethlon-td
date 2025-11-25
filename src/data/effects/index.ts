/**
 * Effect System Exports
 * Central exports for effect definitions and utilities
 */

// Effect definitions
export {
  getEffectDefinition,
  getAllEffectDefinitions,
  getEffectsByCategory,
  getDotEffects,
  getCCEffects,
  getStatModifierEffects,
  getDeathTriggerEffects,
} from "./definitions";

// Stacking rules
export {
  EFFECT_STACKING_RULES,
  getStackingRule,
  calculateEffectiveStrength,
  canStack,
} from "./stackingRules";

// Re-export types for convenience
export type {
  EffectDefinition,
  ActiveEffect,
  EffectApplication,
  StackingRule,
} from "@/types/effects";

export {
  StatusEffectType,
  StackingBehavior,
  EffectTrigger,
  EffectCategory,
} from "@/types/effects";

// Re-export from enemy types for convenience
export { StatusEffectType as StatusType } from "@/types/enemy";
