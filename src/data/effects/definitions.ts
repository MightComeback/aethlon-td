/**
 * Effect Definitions
 * Comprehensive configuration for all status effects in the game
 */

import {
  StatusEffectType,
  EffectCategory,
  EffectTrigger,
  StackingBehavior,
  type EffectDefinition,
} from "@/types/effects";

// ============================================================================
// DAMAGE OVER TIME EFFECTS
// ============================================================================

const DOT_EFFECTS: EffectDefinition[] = [
  {
    type: StatusEffectType.Burn,
    name: "Burning",
    description: "Takes fire damage over time",
    category: EffectCategory.DamageOverTime,
    isBeneficial: false,
    triggers: [EffectTrigger.OnTick],
    stackingBehavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
    defaultDuration: 3,
    tickInterval: 0.5,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#ff6b35",
    icon: "flame",
    displayPriority: 10,
  },
  {
    type: StatusEffectType.Poison,
    name: "Poisoned",
    description: "Takes poison damage over time. Stacks up to 5 times.",
    category: EffectCategory.DamageOverTime,
    isBeneficial: false,
    triggers: [EffectTrigger.OnTick],
    stackingBehavior: StackingBehavior.StackIntensity,
    maxStacks: 5,
    defaultDuration: 5,
    tickInterval: 1,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#7cb342",
    icon: "skull",
    displayPriority: 11,
  },
  {
    type: StatusEffectType.Bleed,
    name: "Bleeding",
    description: "Takes physical damage over time. Stacks heavily.",
    category: EffectCategory.DamageOverTime,
    isBeneficial: false,
    triggers: [EffectTrigger.OnTick],
    stackingBehavior: StackingBehavior.StackIntensity,
    maxStacks: 10,
    defaultDuration: 4,
    tickInterval: 0.5,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#c62828",
    icon: "droplet",
    displayPriority: 12,
  },
  {
    type: StatusEffectType.Corrode,
    name: "Corroding",
    description: "Armor-ignoring damage over time",
    category: EffectCategory.DamageOverTime,
    isBeneficial: false,
    triggers: [EffectTrigger.OnTick],
    stackingBehavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
    defaultDuration: 4,
    tickInterval: 0.5,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#9e9d24",
    icon: "acid",
    displayPriority: 13,
  },
];

// ============================================================================
// CROWD CONTROL EFFECTS
// ============================================================================

const CC_EFFECTS: EffectDefinition[] = [
  {
    type: StatusEffectType.Slow,
    name: "Slowed",
    description: "Movement speed reduced",
    category: EffectCategory.CrowdControl,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.HighestWins,
    maxStacks: 1,
    defaultDuration: 2,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#42a5f5",
    icon: "snail",
    displayPriority: 1,
  },
  {
    type: StatusEffectType.Freeze,
    name: "Frozen",
    description: "Completely immobilized by ice",
    category: EffectCategory.CrowdControl,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
    defaultDuration: 1.5,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: false, // Bosses immune to freeze
    color: "#90caf9",
    icon: "snowflake",
    displayPriority: 0,
  },
  {
    type: StatusEffectType.Stun,
    name: "Stunned",
    description: "Cannot move or act",
    category: EffectCategory.CrowdControl,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
    defaultDuration: 1,
    tickInterval: 0,
    isDispellable: false,
    affectsFlying: true,
    affectsBosses: false,
    color: "#ffc107",
    icon: "zap",
    displayPriority: 0,
  },
  {
    type: StatusEffectType.Root,
    name: "Rooted",
    description: "Cannot move but can still be targeted",
    category: EffectCategory.CrowdControl,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
    defaultDuration: 2,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: false, // Flying units ignore roots
    affectsBosses: true,
    color: "#8d6e63",
    icon: "anchor",
    displayPriority: 2,
  },
  {
    type: StatusEffectType.Cripple,
    name: "Crippled",
    description: "Progressive slow that gets worse over time",
    category: EffectCategory.CrowdControl,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.StackIntensity,
    maxStacks: 3,
    defaultDuration: 4,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#5d4037",
    icon: "broken-leg",
    displayPriority: 3,
  },
  {
    type: StatusEffectType.Silence,
    name: "Silenced",
    description: "Cannot use special abilities",
    category: EffectCategory.CrowdControl,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
    defaultDuration: 3,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#9575cd",
    icon: "mute",
    displayPriority: 4,
  },
];

// ============================================================================
// ARMOR & STAT MODIFIER EFFECTS
// ============================================================================

const STAT_MODIFIER_EFFECTS: EffectDefinition[] = [
  {
    type: StatusEffectType.ArmorShred,
    name: "Armor Shred",
    description: "Armor reduced. Stacks up to 5 times.",
    category: EffectCategory.StatModifier,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.StackIntensity,
    maxStacks: 5,
    defaultDuration: 4,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#ff7043",
    icon: "shield-off",
    displayPriority: 20,
  },
  {
    type: StatusEffectType.ArmorBreak,
    name: "Armor Broken",
    description: "Armor completely disabled",
    category: EffectCategory.StatModifier,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.RefreshDuration,
    maxStacks: 1,
    defaultDuration: 3,
    tickInterval: 0,
    isDispellable: false,
    affectsFlying: true,
    affectsBosses: true,
    color: "#d84315",
    icon: "shield-x",
    displayPriority: 19,
  },
  {
    type: StatusEffectType.MagicVulnerable,
    name: "Magic Vulnerability",
    description: "Magic resistance reduced. Stacks.",
    category: EffectCategory.StatModifier,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.StackIntensity,
    maxStacks: 3,
    defaultDuration: 4,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#ab47bc",
    icon: "crystal-crack",
    displayPriority: 21,
  },
  {
    type: StatusEffectType.DamageAmp,
    name: "Vulnerable",
    description: "Takes increased damage from all sources",
    category: EffectCategory.StatModifier,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.StackIntensity,
    maxStacks: 3,
    defaultDuration: 4,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#e91e63",
    icon: "target",
    displayPriority: 22,
  },
  {
    type: StatusEffectType.PhysicalVulnerable,
    name: "Physically Vulnerable",
    description: "Takes increased physical damage",
    category: EffectCategory.StatModifier,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.HighestWins,
    maxStacks: 1,
    defaultDuration: 3,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#f44336",
    icon: "sword-crack",
    displayPriority: 23,
  },
  {
    type: StatusEffectType.Exposed,
    name: "Exposed",
    description: "Next hit deals bonus damage (consumed on hit)",
    category: EffectCategory.StatModifier,
    isBeneficial: false,
    triggers: [EffectTrigger.OnDamageTaken],
    stackingBehavior: StackingBehavior.Unique,
    maxStacks: 1,
    defaultDuration: 5,
    tickInterval: 0,
    isDispellable: false,
    affectsFlying: true,
    affectsBosses: true,
    color: "#ff5722",
    icon: "crosshair",
    displayPriority: 24,
  },
  {
    type: StatusEffectType.Weaken,
    name: "Weakened",
    description: "Damage output reduced",
    category: EffectCategory.StatModifier,
    isBeneficial: false,
    triggers: [EffectTrigger.Passive],
    stackingBehavior: StackingBehavior.HighestWins,
    maxStacks: 1,
    defaultDuration: 3,
    tickInterval: 0,
    isDispellable: true,
    affectsFlying: true,
    affectsBosses: true,
    color: "#757575",
    icon: "broken-sword",
    displayPriority: 25,
  },
];

// ============================================================================
// DEATH TRIGGER EFFECTS
// ============================================================================

const DEATH_TRIGGER_EFFECTS: EffectDefinition[] = [
  {
    type: StatusEffectType.Marked,
    name: "Marked for Death",
    description: "Explodes on death, damaging nearby enemies. Stacks increase explosion size.",
    category: EffectCategory.DeathTrigger,
    isBeneficial: false,
    triggers: [EffectTrigger.OnDeath],
    stackingBehavior: StackingBehavior.StackIntensity,
    maxStacks: 3,
    defaultDuration: 10,
    tickInterval: 0,
    isDispellable: false,
    affectsFlying: true,
    affectsBosses: true,
    color: "#9c27b0",
    icon: "crosshair-explosion",
    displayPriority: 30,
  },
  {
    type: StatusEffectType.Contagion,
    name: "Contagion",
    description: "Spreads all active effects to nearby enemies on death",
    category: EffectCategory.DeathTrigger,
    isBeneficial: false,
    triggers: [EffectTrigger.OnDeath],
    stackingBehavior: StackingBehavior.Unique,
    maxStacks: 1,
    defaultDuration: 8,
    tickInterval: 0,
    isDispellable: false,
    affectsFlying: true,
    affectsBosses: true,
    color: "#4caf50",
    icon: "virus",
    displayPriority: 31,
  },
  {
    type: StatusEffectType.SoulHarvest,
    name: "Soul Harvest",
    description: "Grants bonus currency and score on death. Stacks increase reward.",
    category: EffectCategory.DeathTrigger,
    isBeneficial: false, // Bad for enemy, good for player
    triggers: [EffectTrigger.OnDeath],
    stackingBehavior: StackingBehavior.StackIntensity,
    maxStacks: 5,
    defaultDuration: 15,
    tickInterval: 0,
    isDispellable: false,
    affectsFlying: true,
    affectsBosses: true,
    color: "#673ab7",
    icon: "gem",
    displayPriority: 32,
  },
];

// ============================================================================
// COMBINED DATABASE
// ============================================================================

const ALL_EFFECT_DEFINITIONS: EffectDefinition[] = [
  ...DOT_EFFECTS,
  ...CC_EFFECTS,
  ...STAT_MODIFIER_EFFECTS,
  ...DEATH_TRIGGER_EFFECTS,
];

// Create lookup map for O(1) access
const EFFECT_DEFINITION_MAP = new Map<StatusEffectType, EffectDefinition>(
  ALL_EFFECT_DEFINITIONS.map((def) => [def.type, def])
);

/**
 * Get effect definition by type
 */
export function getEffectDefinition(
  type: StatusEffectType
): EffectDefinition | undefined {
  return EFFECT_DEFINITION_MAP.get(type);
}

/**
 * Get all effect definitions
 */
export function getAllEffectDefinitions(): EffectDefinition[] {
  return ALL_EFFECT_DEFINITIONS;
}

/**
 * Get effects by category
 */
export function getEffectsByCategory(
  category: EffectCategory
): EffectDefinition[] {
  return ALL_EFFECT_DEFINITIONS.filter((def) => def.category === category);
}

/**
 * Get all DoT effects
 */
export function getDotEffects(): EffectDefinition[] {
  return DOT_EFFECTS;
}

/**
 * Get all crowd control effects
 */
export function getCCEffects(): EffectDefinition[] {
  return CC_EFFECTS;
}

/**
 * Get all stat modifier effects
 */
export function getStatModifierEffects(): EffectDefinition[] {
  return STAT_MODIFIER_EFFECTS;
}

/**
 * Get all death trigger effects
 */
export function getDeathTriggerEffects(): EffectDefinition[] {
  return DEATH_TRIGGER_EFFECTS;
}
