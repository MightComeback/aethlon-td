/**
 * Merged Element Definitions
 * Elements created from combining base or other merged elements
 */

import {
  BaseElement,
  MergedElementT2,
  MergedElementT3,
  ElementTier,
  type ElementDefinition,
} from "@/types/element";

// ============================================================================
// TIER 2 MERGED ELEMENTS (5 total: Primary mastery paths)
// ============================================================================

export const MERGED_T2_DEFINITIONS: Record<MergedElementT2, ElementDefinition> = {
  [MergedElementT2.Lava]: {
    id: MergedElementT2.Lava,
    name: "Lava",
    tier: ElementTier.Merged2,
    components: [BaseElement.Fire, BaseElement.Earth],
    color: "#ff6347",
    secondaryColor: "#8b0000",
    icon: "volcano-lava",
    description: "Molten rock from the depths. Fire mastery path.",
    strongAgainst: [BaseElement.Air, BaseElement.Earth],
    weakAgainst: [BaseElement.Water],
  },

  [MergedElementT2.Ice]: {
    id: MergedElementT2.Ice,
    name: "Ice",
    tier: ElementTier.Merged2,
    components: [BaseElement.Water, BaseElement.Earth],
    color: "#87ceeb",
    secondaryColor: "#e0ffff",
    icon: "snowflake",
    description: "Frozen solid matter. Water mastery path.",
    strongAgainst: [BaseElement.Fire, BaseElement.Water],
    weakAgainst: [BaseElement.Air, BaseElement.Lightning],
  },

  [MergedElementT2.Storm]: {
    id: MergedElementT2.Storm,
    name: "Storm",
    tier: ElementTier.Merged2,
    components: [BaseElement.Air, BaseElement.Lightning],
    color: "#4169e1",
    secondaryColor: "#ffff00",
    icon: "storm-cloud",
    description: "Thunder and wind combined. Air mastery path.",
    strongAgainst: [BaseElement.Earth, BaseElement.Water],
    weakAgainst: [BaseElement.Fire],
  },

  [MergedElementT2.Magma]: {
    id: MergedElementT2.Magma,
    name: "Magma",
    tier: ElementTier.Merged2,
    components: [BaseElement.Earth, BaseElement.Lightning],
    color: "#b19cd9",
    secondaryColor: "#daa520",
    icon: "crystal",
    description: "Electrified earth and stone. Earth mastery path.",
    strongAgainst: [BaseElement.Water, BaseElement.Lightning],
    weakAgainst: [BaseElement.Air],
  },

  [MergedElementT2.Plasma]: {
    id: MergedElementT2.Plasma,
    name: "Plasma",
    tier: ElementTier.Merged2,
    components: [BaseElement.Fire, BaseElement.Air],
    color: "#ff69b4",
    secondaryColor: "#ff00ff",
    icon: "plasma",
    description: "Superheated ionized gas. Balanced fusion.",
    strongAgainst: [BaseElement.Air, BaseElement.Earth],
    weakAgainst: [BaseElement.Water],
  },
};

// ============================================================================
// TIER 3 ADVANCED ELEMENTS (5 total: Ultimate mastery)
// ============================================================================

export const MERGED_T3_DEFINITIONS: Record<MergedElementT3, ElementDefinition> = {
  [MergedElementT3.Volcano]: {
    id: MergedElementT3.Volcano,
    name: "Volcano",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Lava, BaseElement.Fire],
    color: "#dc143c",
    secondaryColor: "#2f4f4f",
    icon: "volcano",
    description: "Explosive eruption of molten fury. Ultimate Fire mastery.",
    strongAgainst: [BaseElement.Air, BaseElement.Earth],
    weakAgainst: [BaseElement.Water],
  },

  [MergedElementT3.Glacier]: {
    id: MergedElementT3.Glacier,
    name: "Glacier",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Ice, BaseElement.Water],
    color: "#e0ffff",
    secondaryColor: "#b0e0e6",
    icon: "snowstorm",
    description: "Ancient frozen mass. Ultimate Water mastery.",
    strongAgainst: [BaseElement.Fire, BaseElement.Air],
    weakAgainst: [BaseElement.Earth],
  },

  [MergedElementT3.Hurricane]: {
    id: MergedElementT3.Hurricane,
    name: "Hurricane",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Storm, BaseElement.Air],
    color: "#708090",
    secondaryColor: "#f0f8ff",
    icon: "hurricane",
    description: "Devastating windstorm. Ultimate Air mastery.",
    strongAgainst: [BaseElement.Earth, BaseElement.Water],
    weakAgainst: [BaseElement.Fire],
  },

  [MergedElementT3.Mountain]: {
    id: MergedElementT3.Mountain,
    name: "Mountain",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Magma, BaseElement.Earth],
    color: "#696969",
    secondaryColor: "#a9a9a9",
    icon: "mountain-peak",
    description: "Immovable peak of stone and crystal. Ultimate Earth mastery.",
    strongAgainst: [BaseElement.Water, BaseElement.Lightning],
    weakAgainst: [BaseElement.Air],
  },

  [MergedElementT3.Supercell]: {
    id: MergedElementT3.Supercell,
    name: "Supercell",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Storm, BaseElement.Lightning],
    color: "#191970",
    secondaryColor: "#ffff00",
    icon: "supercell",
    description: "Mega thunderstorm. Ultimate Lightning mastery.",
    strongAgainst: [BaseElement.Water, BaseElement.Air],
    weakAgainst: [BaseElement.Earth],
  },
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Get all Tier 2 element definitions
 */
export function getAllTier2Elements(): ElementDefinition[] {
  return Object.values(MERGED_T2_DEFINITIONS);
}

/**
 * Get all Tier 3 element definitions
 */
export function getAllTier3Elements(): ElementDefinition[] {
  return Object.values(MERGED_T3_DEFINITIONS);
}

/**
 * Get merged element definition by ID
 */
export function getMergedElementDefinition(
  element: MergedElementT2 | MergedElementT3
): ElementDefinition | undefined {
  if (Object.values(MergedElementT2).includes(element as MergedElementT2)) {
    return MERGED_T2_DEFINITIONS[element as MergedElementT2];
  }
  if (Object.values(MergedElementT3).includes(element as MergedElementT3)) {
    return MERGED_T3_DEFINITIONS[element as MergedElementT3];
  }
  return undefined;
}

/**
 * Check if an element is Tier 2
 */
export function isTier2Element(element: string): element is MergedElementT2 {
  return Object.values(MergedElementT2).includes(element as MergedElementT2);
}

/**
 * Check if an element is Tier 3
 */
export function isTier3Element(element: string): element is MergedElementT3 {
  return Object.values(MergedElementT3).includes(element as MergedElementT3);
}
