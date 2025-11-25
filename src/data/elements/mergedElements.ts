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
// TIER 2 MERGED ELEMENTS (10 total: 5C2 combinations)
// ============================================================================

export const MERGED_T2_DEFINITIONS: Record<MergedElementT2, ElementDefinition> = {
  [MergedElementT2.Steam]: {
    id: MergedElementT2.Steam,
    name: "Steam",
    tier: ElementTier.Merged2,
    components: [BaseElement.Fire, BaseElement.Water],
    color: "#b0c4de",
    secondaryColor: "#f0f8ff",
    icon: "cloud-steam",
    description: "Scalding vapor born of fire meeting water. Burns and slows simultaneously.",
    strongAgainst: [BaseElement.Fire, BaseElement.Air],
    weakAgainst: [BaseElement.Earth, BaseElement.Lightning],
  },

  [MergedElementT2.Lava]: {
    id: MergedElementT2.Lava,
    name: "Lava",
    tier: ElementTier.Merged2,
    components: [BaseElement.Fire, BaseElement.Earth],
    color: "#ff6347",
    secondaryColor: "#8b0000",
    icon: "volcano-lava",
    description: "Molten rock from the depths. Combines fire's burn with earth's resilience.",
    strongAgainst: [BaseElement.Earth, BaseElement.Air, BaseElement.Water],
    weakAgainst: [BaseElement.Water],
  },

  [MergedElementT2.Plasma]: {
    id: MergedElementT2.Plasma,
    name: "Plasma",
    tier: ElementTier.Merged2,
    components: [BaseElement.Fire, BaseElement.Air],
    color: "#ff69b4",
    secondaryColor: "#ff00ff",
    icon: "plasma",
    description: "Superheated ionized gas. Extremely high energy state.",
    strongAgainst: [BaseElement.Air, BaseElement.Earth],
    weakAgainst: [BaseElement.Water, BaseElement.Lightning],
  },

  [MergedElementT2.Storm]: {
    id: MergedElementT2.Storm,
    name: "Storm",
    tier: ElementTier.Merged2,
    components: [BaseElement.Fire, BaseElement.Lightning],
    color: "#483d8b",
    secondaryColor: "#ffd700",
    icon: "storm-cloud",
    description: "Raging tempest of fire and lightning. Chaotic destruction.",
    strongAgainst: [BaseElement.Air, BaseElement.Water, BaseElement.Earth],
    weakAgainst: [BaseElement.Earth],
  },

  [MergedElementT2.Ice]: {
    id: MergedElementT2.Ice,
    name: "Ice",
    tier: ElementTier.Merged2,
    components: [BaseElement.Water, BaseElement.Earth],
    color: "#87ceeb",
    secondaryColor: "#e0ffff",
    icon: "snowflake",
    description: "Frozen solid matter. Slows and immobilizes enemies.",
    strongAgainst: [BaseElement.Water, BaseElement.Earth],
    weakAgainst: [BaseElement.Fire, BaseElement.Lightning],
  },

  [MergedElementT2.Mist]: {
    id: MergedElementT2.Mist,
    name: "Mist",
    tier: ElementTier.Merged2,
    components: [BaseElement.Water, BaseElement.Air],
    color: "#d3d3d3",
    secondaryColor: "#f5f5f5",
    icon: "fog",
    description: "Obscuring fog. Reduces enemy accuracy and vision.",
    strongAgainst: [BaseElement.Fire, BaseElement.Earth],
    weakAgainst: [BaseElement.Air, BaseElement.Lightning],
  },

  [MergedElementT2.Tempest]: {
    id: MergedElementT2.Tempest,
    name: "Tempest",
    tier: ElementTier.Merged2,
    components: [BaseElement.Water, BaseElement.Lightning],
    color: "#4682b4",
    secondaryColor: "#ffff00",
    icon: "lightning-rain",
    description: "Thunderstorm's fury. Electric water strikes from above.",
    strongAgainst: [BaseElement.Fire, BaseElement.Air],
    weakAgainst: [BaseElement.Earth],
  },

  [MergedElementT2.Dust]: {
    id: MergedElementT2.Dust,
    name: "Dust",
    tier: ElementTier.Merged2,
    components: [BaseElement.Earth, BaseElement.Air],
    color: "#d2b48c",
    secondaryColor: "#f5deb3",
    icon: "dust-cloud",
    description: "Swirling particles. Blinds and chokes enemies.",
    strongAgainst: [BaseElement.Water, BaseElement.Air],
    weakAgainst: [BaseElement.Fire, BaseElement.Lightning],
  },

  [MergedElementT2.Crystal]: {
    id: MergedElementT2.Crystal,
    name: "Crystal",
    tier: ElementTier.Merged2,
    components: [BaseElement.Earth, BaseElement.Lightning],
    color: "#b19cd9",
    secondaryColor: "#dda0dd",
    icon: "crystal",
    description: "Crystallized energy. Shatters on impact with devastating effect.",
    strongAgainst: [BaseElement.Lightning, BaseElement.Water],
    weakAgainst: [BaseElement.Fire, BaseElement.Air],
  },

  [MergedElementT2.Thunder]: {
    id: MergedElementT2.Thunder,
    name: "Thunder",
    tier: ElementTier.Merged2,
    components: [BaseElement.Air, BaseElement.Lightning],
    color: "#4169e1",
    secondaryColor: "#ffff00",
    icon: "thunder",
    description: "Roaring thunder and lightning. Stuns with sonic and electric shock.",
    strongAgainst: [BaseElement.Air, BaseElement.Water],
    weakAgainst: [BaseElement.Earth],
  },
};

// ============================================================================
// TIER 3 ADVANCED ELEMENTS (15 total)
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
    description: "Explosive eruption of molten fury. Fire element mastery.",
    strongAgainst: [BaseElement.Earth, BaseElement.Air, BaseElement.Water],
    weakAgainst: [BaseElement.Water],
  },

  [MergedElementT3.Inferno]: {
    id: MergedElementT3.Inferno,
    name: "Inferno",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Plasma, BaseElement.Fire],
    color: "#ff4500",
    secondaryColor: "#ff1493",
    icon: "inferno",
    description: "Raging plasma inferno. Incinerates everything.",
    strongAgainst: [BaseElement.Air, BaseElement.Earth],
    weakAgainst: [BaseElement.Water],
  },

  [MergedElementT3.Tsunami]: {
    id: MergedElementT3.Tsunami,
    name: "Tsunami",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Steam, BaseElement.Water],
    color: "#006994",
    secondaryColor: "#00bfff",
    icon: "wave",
    description: "Massive tidal wave. Water element mastery.",
    strongAgainst: [BaseElement.Fire, BaseElement.Earth],
    weakAgainst: [BaseElement.Lightning],
  },

  [MergedElementT3.Blizzard]: {
    id: MergedElementT3.Blizzard,
    name: "Blizzard",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Ice, BaseElement.Water],
    color: "#e0ffff",
    secondaryColor: "#b0e0e6",
    icon: "snowstorm",
    description: "Freezing arctic storm. Completely immobilizes enemies.",
    strongAgainst: [BaseElement.Water, BaseElement.Earth, BaseElement.Air],
    weakAgainst: [BaseElement.Fire],
  },

  [MergedElementT3.Earthquake]: {
    id: MergedElementT3.Earthquake,
    name: "Earthquake",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Lava, BaseElement.Earth],
    color: "#654321",
    secondaryColor: "#d2691e",
    icon: "earthquake",
    description: "Seismic devastation. Earth element mastery.",
    strongAgainst: [BaseElement.Earth, BaseElement.Lightning, BaseElement.Water],
    weakAgainst: [BaseElement.Air],
  },

  [MergedElementT3.Mountain]: {
    id: MergedElementT3.Mountain,
    name: "Mountain",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Crystal, BaseElement.Earth],
    color: "#696969",
    secondaryColor: "#a9a9a9",
    icon: "mountain-peak",
    description: "Immovable crystalline mass. Maximum physical and magical resistance.",
    strongAgainst: [BaseElement.Earth, BaseElement.Lightning],
    weakAgainst: [BaseElement.Water],
  },

  [MergedElementT3.Hurricane]: {
    id: MergedElementT3.Hurricane,
    name: "Hurricane",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Thunder, BaseElement.Air],
    color: "#708090",
    secondaryColor: "#f0f8ff",
    icon: "hurricane",
    description: "Devastating windstorm. Air element mastery.",
    strongAgainst: [BaseElement.Air, BaseElement.Earth, BaseElement.Water],
    weakAgainst: [BaseElement.Fire],
  },

  [MergedElementT3.Cyclone]: {
    id: MergedElementT3.Cyclone,
    name: "Cyclone",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Mist, BaseElement.Air],
    color: "#b0c4de",
    secondaryColor: "#fffafa",
    icon: "tornado",
    description: "Spiraling vortex of wind and moisture. Scatters enemies.",
    strongAgainst: [BaseElement.Air, BaseElement.Water, BaseElement.Earth],
    weakAgainst: [BaseElement.Lightning],
  },

  [MergedElementT3.Supercell]: {
    id: MergedElementT3.Supercell,
    name: "Supercell",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Storm, BaseElement.Lightning],
    color: "#191970",
    secondaryColor: "#ffff00",
    icon: "supercell",
    description: "Mega thunderstorm. Lightning element mastery.",
    strongAgainst: [BaseElement.Lightning, BaseElement.Water, BaseElement.Air],
    weakAgainst: [BaseElement.Earth],
  },

  [MergedElementT3.Discharge]: {
    id: MergedElementT3.Discharge,
    name: "Discharge",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Crystal, BaseElement.Lightning],
    color: "#9370db",
    secondaryColor: "#ffff00",
    icon: "electric-crystal",
    description: "Crystallized lightning. Chain lightning with piercing strikes.",
    strongAgainst: [BaseElement.Lightning, BaseElement.Air, BaseElement.Water],
    weakAgainst: [BaseElement.Earth],
  },

  [MergedElementT3.Aurora]: {
    id: MergedElementT3.Aurora,
    name: "Aurora",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Ice, MergedElementT2.Thunder],
    color: "#00ffff",
    secondaryColor: "#ff00ff",
    icon: "aurora",
    description: "Polar lights of ice and electricity. Freezes and shocks.",
    strongAgainst: [BaseElement.Water, BaseElement.Air],
    weakAgainst: [BaseElement.Fire, BaseElement.Earth],
  },

  [MergedElementT3.Sandstorm]: {
    id: MergedElementT3.Sandstorm,
    name: "Sandstorm",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Dust, MergedElementT2.Storm],
    color: "#edc9af",
    secondaryColor: "#ff8c00",
    icon: "sandstorm",
    description: "Scorching desert wind. Blinds and erodes armor.",
    strongAgainst: [BaseElement.Air, BaseElement.Fire],
    weakAgainst: [BaseElement.Water],
  },

  [MergedElementT3.Geyser]: {
    id: MergedElementT3.Geyser,
    name: "Geyser",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Steam, MergedElementT2.Ice],
    color: "#add8e6",
    secondaryColor: "#fffafa",
    icon: "geyser",
    description: "Erupting hot spring. Alternates between burning and freezing.",
    strongAgainst: [BaseElement.Fire, BaseElement.Water],
    weakAgainst: [BaseElement.Lightning],
  },

  [MergedElementT3.Monsoon]: {
    id: MergedElementT3.Monsoon,
    name: "Monsoon",
    tier: ElementTier.Merged3,
    components: [MergedElementT2.Tempest, MergedElementT2.Mist],
    color: "#2f4f4f",
    secondaryColor: "#87ceeb",
    icon: "monsoon",
    description: "Torrential rainstorm with lightning. Floods the battlefield.",
    strongAgainst: [BaseElement.Fire, BaseElement.Earth],
    weakAgainst: [BaseElement.Lightning],
  },

  [MergedElementT3.Meteor]: {
    id: MergedElementT3.Meteor,
    name: "Meteor",
    tier: ElementTier.Merged3,
    components: [MergedElementT3.Volcano, MergedElementT2.Crystal],
    color: "#ff4500",
    secondaryColor: "#dda0dd",
    icon: "meteor",
    description: "Crystallized volcanic projectile from the sky. Devastating impact.",
    strongAgainst: [BaseElement.Earth, BaseElement.Air, BaseElement.Lightning],
    weakAgainst: [BaseElement.Water],
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
