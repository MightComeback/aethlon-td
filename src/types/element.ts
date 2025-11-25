/**
 * Element System Types
 * Defines the elemental affinity system with rock-paper-scissors effectiveness
 */

// ============================================================================
// Element Enums
// ============================================================================

/**
 * Base elements (Tier 1)
 */
export enum BaseElement {
  Fire = "fire",
  Water = "water",
  Earth = "earth",
  Air = "air",
  Lightning = "lightning",
}

/**
 * Merged elements from two base elements (Tier 2)
 */
export enum MergedElementT2 {
  Steam = "steam", // Fire + Water
  Lava = "lava", // Fire + Earth
  Plasma = "plasma", // Fire + Air
  Storm = "storm", // Fire + Lightning
  Ice = "ice", // Water + Earth
  Mist = "mist", // Water + Air
  Tempest = "tempest", // Water + Lightning
  Dust = "dust", // Earth + Air
  Crystal = "crystal", // Earth + Lightning
  Thunder = "thunder", // Air + Lightning
}

/**
 * Advanced elements from complex combinations (Tier 3)
 */
export enum MergedElementT3 {
  Volcano = "volcano", // Lava + Fire (Fire mastery)
  Inferno = "inferno", // Plasma + Fire
  Tsunami = "tsunami", // Steam + Water (Water mastery)
  Blizzard = "blizzard", // Ice + Water
  Earthquake = "earthquake", // Lava + Earth (Earth mastery)
  Mountain = "mountain", // Crystal + Earth
  Hurricane = "hurricane", // Thunder + Air (Air mastery)
  Cyclone = "cyclone", // Mist + Air
  Supercell = "supercell", // Storm + Lightning (Lightning mastery)
  Discharge = "discharge", // Crystal + Lightning
  Aurora = "aurora", // Ice + Thunder (cross-element)
  Sandstorm = "sandstorm", // Dust + Storm
  Geyser = "geyser", // Steam + Ice
  Monsoon = "monsoon", // Tempest + Mist
  Meteor = "meteor", // Volcano + Crystal
}

/**
 * Unified element type
 */
export type Element = BaseElement | MergedElementT2 | MergedElementT3;

/**
 * Element tier classification
 */
export enum ElementTier {
  Base = 1,
  Merged2 = 2,
  Merged3 = 3,
}

// ============================================================================
// Element Configuration
// ============================================================================

/**
 * Complete definition of an element
 */
export interface ElementDefinition {
  /** Unique element identifier */
  id: Element;

  /** Display name */
  name: string;

  /** Element tier (1 = base, 2 = merged, 3 = advanced) */
  tier: ElementTier;

  /** Component elements that make this (empty for base) */
  components: Element[];

  /** Primary color for visuals (grayscale will be tinted) */
  color: string;

  /** Secondary color for gradients/effects */
  secondaryColor?: string;

  /** Icon identifier for UI */
  icon: string;

  /** Description for tooltip */
  description: string;

  /** Elements this is strong against (2x damage) */
  strongAgainst: Element[];

  /** Elements this is weak against (0.5x damage) */
  weakAgainst: Element[];
}

/**
 * Element affinity configuration for entities
 */
export interface ElementAffinity {
  /** Primary element (null = neutral) */
  primaryElement: Element | null;

  /** Secondary element for dual-element entities */
  secondaryElement?: Element | null;

  /** Base resistance to elemental damage (0-100%) */
  elementalResistance: number;

  /** Specific element this entity is immune to */
  elementImmunity?: Element;

  /** Specific element this entity is weak to (additional multiplier) */
  elementWeakness?: Element;
}

// ============================================================================
// Effectiveness System
// ============================================================================

/**
 * Damage effectiveness multipliers
 */
export type EffectivenessValue = 0.5 | 0.75 | 1.0 | 1.25 | 1.5 | 2.0;

/**
 * Element merge recipe
 */
export interface ElementMergeRecipe {
  /** Input elements (order-independent) */
  inputs: [Element, Element];

  /** Output element */
  output: Element;

  /** Result tier */
  tier: ElementTier;

  /** Special recipe (for legendaries) */
  isSpecial?: boolean;
}

/**
 * Damage calculation result with element info
 */
export interface ElementalDamageResult {
  /** Base damage before modifiers */
  baseDamage: number;

  /** Element effectiveness multiplier */
  elementMultiplier: number;

  /** Tier bonus multiplier */
  tierBonus: number;

  /** Final damage after all modifiers */
  finalDamage: number;

  /** Whether attack was super effective */
  isEffective: boolean;

  /** Whether attack was resisted */
  isResisted: boolean;

  /** Attacker element */
  attackerElement: Element | null;

  /** Defender element */
  defenderElement: Element | null;
}
