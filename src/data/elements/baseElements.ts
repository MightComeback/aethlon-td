/**
 * Base Element Definitions
 * The 5 fundamental elements of the game
 */

import {
  BaseElement,
  ElementTier,
  type ElementDefinition,
} from "@/types/element";

/**
 * Base element configurations
 * Each has strengths and weaknesses in a rock-paper-scissors pattern
 */
export const BASE_ELEMENT_DEFINITIONS: Record<BaseElement, ElementDefinition> = {
  [BaseElement.Fire]: {
    id: BaseElement.Fire,
    name: "Fire",
    tier: ElementTier.Base,
    components: [],
    color: "#ff4500",
    secondaryColor: "#ffd700",
    icon: "fire",
    description: "The primal force of combustion and heat. Burns enemies over time.",
    strongAgainst: [BaseElement.Earth, BaseElement.Air],
    weakAgainst: [BaseElement.Water],
  },

  [BaseElement.Water]: {
    id: BaseElement.Water,
    name: "Water",
    tier: ElementTier.Base,
    components: [],
    color: "#1e90ff",
    secondaryColor: "#00ced1",
    icon: "water",
    description: "The flowing essence of life and adaptability. Extinguishes fire, slows enemies.",
    strongAgainst: [BaseElement.Fire],
    weakAgainst: [BaseElement.Lightning, BaseElement.Earth],
  },

  [BaseElement.Earth]: {
    id: BaseElement.Earth,
    name: "Earth",
    tier: ElementTier.Base,
    components: [],
    color: "#8b4513",
    secondaryColor: "#daa520",
    icon: "mountain",
    description: "Solid and unyielding. Grounds lightning, absorbs water.",
    strongAgainst: [BaseElement.Lightning, BaseElement.Water],
    weakAgainst: [BaseElement.Fire],
  },

  [BaseElement.Air]: {
    id: BaseElement.Air,
    name: "Air",
    tier: ElementTier.Base,
    components: [],
    color: "#87ceeb",
    secondaryColor: "#f0f8ff",
    icon: "wind",
    description: "Swift and elusive. Erodes earth, fans flames.",
    strongAgainst: [BaseElement.Earth],
    weakAgainst: [BaseElement.Fire, BaseElement.Lightning],
  },

  [BaseElement.Lightning]: {
    id: BaseElement.Lightning,
    name: "Lightning",
    tier: ElementTier.Base,
    components: [],
    color: "#ffff00",
    secondaryColor: "#ffffff",
    icon: "lightning-bolt",
    description: "Fast and devastating. Electrocutes water, ionizes air.",
    strongAgainst: [BaseElement.Water, BaseElement.Air],
    weakAgainst: [BaseElement.Earth],
  },
};

/**
 * Get base element definition
 */
export function getBaseElementDefinition(
  element: BaseElement
): ElementDefinition {
  return BASE_ELEMENT_DEFINITIONS[element];
}

/**
 * Get all base elements
 */
export function getAllBaseElements(): ElementDefinition[] {
  return Object.values(BASE_ELEMENT_DEFINITIONS);
}

/**
 * Check if an element is a base element
 */
export function isBaseElement(element: string): element is BaseElement {
  return Object.values(BaseElement).includes(element as BaseElement);
}
