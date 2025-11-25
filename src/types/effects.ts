/**
 * Effect and Debuff System Types
 * Comprehensive status effect system for tower-enemy interactions
 */

import { StatusEffectType } from "./enemy";

// Re-export StatusEffectType for convenience
export { StatusEffectType } from "./enemy";

// ============================================================================
// Effect Behaviors and Categories
// ============================================================================

/**
 * How multiple instances of the same effect interact
 */
export enum StackingBehavior {
  /** New application refreshes duration only */
  RefreshDuration = "refresh_duration",
  /** Stacks increase intensity up to a cap */
  StackIntensity = "stack_intensity",
  /** Each instance tracked separately */
  Independent = "independent",
  /** Higher strength replaces lower */
  HighestWins = "highest_wins",
  /** Cannot have multiple instances */
  Unique = "unique",
}

/**
 * When the effect applies its behavior
 */
export enum EffectTrigger {
  /** Every tick (continuous) */
  OnTick = "on_tick",
  /** When effect is first applied */
  OnApply = "on_apply",
  /** When effect expires naturally */
  OnExpire = "on_expire",
  /** When the affected entity dies */
  OnDeath = "on_death",
  /** When entity takes damage */
  OnDamageTaken = "on_damage_taken",
  /** Continuous stat modifier (no tick) */
  Passive = "passive",
}

/**
 * Category for UI grouping and processing priority
 */
export enum EffectCategory {
  DamageOverTime = "dot",
  CrowdControl = "cc",
  StatModifier = "stat_mod",
  DeathTrigger = "death_trigger",
  Buff = "buff",
  Debuff = "debuff",
}

// ============================================================================
// Effect Definitions
// ============================================================================

/**
 * Defines how an effect behaves - this is the "template"
 */
export interface EffectDefinition {
  /** Unique identifier matching StatusEffectType */
  type: StatusEffectType;

  /** Display name for UI */
  name: string;

  /** Tooltip description */
  description: string;

  /** Effect category for processing */
  category: EffectCategory;

  /** Whether this is beneficial (buff) or harmful (debuff) */
  isBeneficial: boolean;

  /** When this effect triggers */
  triggers: EffectTrigger[];

  /** How multiple instances interact */
  stackingBehavior: StackingBehavior;

  /** Maximum stacks (for StackIntensity behavior) */
  maxStacks: number;

  /** Default duration in seconds (can be overridden on application) */
  defaultDuration: number;

  /** Tick interval in seconds (for OnTick effects) */
  tickInterval: number;

  /** Can this effect be cleansed/dispelled? */
  isDispellable: boolean;

  /** Can this effect be applied to flying enemies? */
  affectsFlying: boolean;

  /** Can this effect be applied to bosses? */
  affectsBosses: boolean;

  /** Visual indicator color (hex) */
  color: string;

  /** Icon identifier for UI */
  icon: string;

  /** Priority for display order (lower = first) */
  displayPriority: number;
}

/**
 * Runtime instance of an effect on an entity
 */
export interface ActiveEffect {
  /** Reference to the definition type */
  type: StatusEffectType;

  /** Remaining duration in seconds */
  remainingDuration: number;

  /** Original duration for percentage calculations */
  totalDuration: number;

  /** Current strength/intensity value */
  strength: number;

  /** Current stack count */
  stacks: number;

  /** Time since last tick */
  tickAccumulator: number;

  /** Tower ID that applied this effect */
  sourceId: string;

  /** Unique instance ID (for Independent stacking) */
  instanceId: string;

  /** Timestamp when applied (for sorting/debugging) */
  appliedAt: number;
}

/**
 * Parameters for applying an effect
 */
export interface EffectApplication {
  type: StatusEffectType;
  duration?: number; // Override default
  strength: number; // Effect-specific value (damage, slow %, etc.)
  sourceId: string; // Tower that applied it
}

/**
 * Stacking rule configuration
 */
export interface StackingRule {
  behavior: StackingBehavior;
  maxStacks: number;
  /** For StackIntensity: how strength scales with stacks */
  stackMultiplier?: number;
  /** For StackIntensity: intensity cap as multiplier of base */
  intensityCap?: number;
}
