/**
 * Element Utility Functions
 * Helper functions for element system
 */

import {
  BaseElement,
  MergedElementT2,
  MergedElementT3,
  ElementTier,
  type Element,
  type ElementDefinition,
} from "@/types/element";
import { BASE_ELEMENT_DEFINITIONS, isBaseElement } from "./baseElements";
import {
  getMergedElementDefinition,
  isTier2Element,
  isTier3Element,
} from "./mergedElements";

/**
 * Get complete element definition for any element
 */
export function getElementDefinition(
  element: Element
): ElementDefinition | undefined {
  if (isBaseElement(element)) {
    return BASE_ELEMENT_DEFINITIONS[element];
  }
  return getMergedElementDefinition(element as MergedElementT2 | MergedElementT3);
}

/**
 * Get all element definitions (base + merged)
 */
export function getAllElementDefinitions(): ElementDefinition[] {
  const base = Object.values(BASE_ELEMENT_DEFINITIONS);
  const tier2 = Object.values(MergedElementT2).map((e) =>
    getMergedElementDefinition(e)
  ).filter((d): d is ElementDefinition => d !== undefined);
  const tier3 = Object.values(MergedElementT3).map((e) =>
    getMergedElementDefinition(e)
  ).filter((d): d is ElementDefinition => d !== undefined);

  return [...base, ...tier2, ...tier3];
}

/**
 * Get the tier of an element
 */
export function getElementTier(element: Element): ElementTier {
  if (isBaseElement(element)) return ElementTier.Base;
  if (isTier2Element(element)) return ElementTier.Merged2;
  if (isTier3Element(element)) return ElementTier.Merged3;
  return ElementTier.Base; // fallback
}

/**
 * Get component elements (recursively breaks down to base elements)
 */
export function getElementComponents(element: Element): BaseElement[] {
  if (isBaseElement(element)) {
    return [element];
  }

  const definition = getMergedElementDefinition(
    element as MergedElementT2 | MergedElementT3
  );
  if (!definition || definition.components.length === 0) {
    return [];
  }

  const components: BaseElement[] = [];
  for (const component of definition.components) {
    components.push(...getElementComponents(component));
  }

  return components;
}

/**
 * Get primary color for an element
 */
export function getElementColor(element: Element): string {
  const definition = getElementDefinition(element);
  return definition?.color ?? "#888888";
}

/**
 * Get secondary color for an element
 */
export function getElementSecondaryColor(element: Element): string {
  const definition = getElementDefinition(element);
  return definition?.secondaryColor ?? definition?.color ?? "#888888";
}

/**
 * Get display name for an element
 */
export function getElementName(element: Element): string {
  const definition = getElementDefinition(element);
  return definition?.name ?? element;
}

/**
 * Get elements by tier
 */
export function getElementsByTier(tier: ElementTier): ElementDefinition[] {
  return getAllElementDefinitions().filter((def) => def.tier === tier);
}

/**
 * Get all elements that contain a specific base element
 */
export function getElementsContaining(baseElement: BaseElement): ElementDefinition[] {
  return getAllElementDefinitions().filter((def) => {
    const components = getElementComponents(def.id);
    return components.includes(baseElement);
  });
}

/**
 * Check if an element contains a specific base element
 */
export function elementContains(element: Element, baseElement: BaseElement): boolean {
  const components = getElementComponents(element);
  return components.includes(baseElement);
}

/**
 * Get element components (non-recursive, direct components only)
 */
export function getDirectComponents(element: Element): Element[] {
  const definition = getElementDefinition(element);
  return definition?.components || [];
}
