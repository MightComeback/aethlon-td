/**
 * Element Merge Recipes
 * Defines how elements combine to create new elements
 */

import {
  BaseElement,
  MergedElementT2,
  MergedElementT3,
  ElementTier,
  type Element,
  type ElementMergeRecipe,
} from "@/types/element";
import { getElementDefinition } from "./utils";

// ============================================================================
// TIER 2 MERGE RECIPES (Base + Base)
// ============================================================================

const TIER2_RECIPES: ElementMergeRecipe[] = [
  // Fire combinations
  {
    inputs: [BaseElement.Fire, BaseElement.Water],
    output: MergedElementT2.Steam,
    tier: ElementTier.Merged2,
  },
  {
    inputs: [BaseElement.Fire, BaseElement.Earth],
    output: MergedElementT2.Lava,
    tier: ElementTier.Merged2,
  },
  {
    inputs: [BaseElement.Fire, BaseElement.Air],
    output: MergedElementT2.Plasma,
    tier: ElementTier.Merged2,
  },
  {
    inputs: [BaseElement.Fire, BaseElement.Lightning],
    output: MergedElementT2.Storm,
    tier: ElementTier.Merged2,
  },

  // Water combinations (excluding Fire which is above)
  {
    inputs: [BaseElement.Water, BaseElement.Earth],
    output: MergedElementT2.Ice,
    tier: ElementTier.Merged2,
  },
  {
    inputs: [BaseElement.Water, BaseElement.Air],
    output: MergedElementT2.Mist,
    tier: ElementTier.Merged2,
  },
  {
    inputs: [BaseElement.Water, BaseElement.Lightning],
    output: MergedElementT2.Tempest,
    tier: ElementTier.Merged2,
  },

  // Earth combinations (excluding Fire, Water which are above)
  {
    inputs: [BaseElement.Earth, BaseElement.Air],
    output: MergedElementT2.Dust,
    tier: ElementTier.Merged2,
  },
  {
    inputs: [BaseElement.Earth, BaseElement.Lightning],
    output: MergedElementT2.Crystal,
    tier: ElementTier.Merged2,
  },

  // Air + Lightning (last combination)
  {
    inputs: [BaseElement.Air, BaseElement.Lightning],
    output: MergedElementT2.Thunder,
    tier: ElementTier.Merged2,
  },
];

// ============================================================================
// TIER 3 MERGE RECIPES (Mastery Paths + Cross-Element)
// ============================================================================

const TIER3_RECIPES: ElementMergeRecipe[] = [
  // Fire Mastery Paths
  {
    inputs: [MergedElementT2.Lava, BaseElement.Fire],
    output: MergedElementT3.Volcano,
    tier: ElementTier.Merged3,
    isSpecial: true, // Mastery paths are special
  },
  {
    inputs: [MergedElementT2.Plasma, BaseElement.Fire],
    output: MergedElementT3.Inferno,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },

  // Water Mastery Paths
  {
    inputs: [MergedElementT2.Steam, BaseElement.Water],
    output: MergedElementT3.Tsunami,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },
  {
    inputs: [MergedElementT2.Ice, BaseElement.Water],
    output: MergedElementT3.Blizzard,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },

  // Earth Mastery Paths
  {
    inputs: [MergedElementT2.Lava, BaseElement.Earth],
    output: MergedElementT3.Earthquake,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },
  {
    inputs: [MergedElementT2.Crystal, BaseElement.Earth],
    output: MergedElementT3.Mountain,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },

  // Air Mastery Paths
  {
    inputs: [MergedElementT2.Thunder, BaseElement.Air],
    output: MergedElementT3.Hurricane,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },
  {
    inputs: [MergedElementT2.Mist, BaseElement.Air],
    output: MergedElementT3.Cyclone,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },

  // Lightning Mastery Paths
  {
    inputs: [MergedElementT2.Storm, BaseElement.Lightning],
    output: MergedElementT3.Supercell,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },
  {
    inputs: [MergedElementT2.Crystal, BaseElement.Lightning],
    output: MergedElementT3.Discharge,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },

  // Cross-Element Combinations
  {
    inputs: [MergedElementT2.Ice, MergedElementT2.Thunder],
    output: MergedElementT3.Aurora,
    tier: ElementTier.Merged3,
    isSpecial: true, // Legendary cross-element
  },
  {
    inputs: [MergedElementT2.Dust, MergedElementT2.Storm],
    output: MergedElementT3.Sandstorm,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },
  {
    inputs: [MergedElementT2.Steam, MergedElementT2.Ice],
    output: MergedElementT3.Geyser,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },
  {
    inputs: [MergedElementT2.Tempest, MergedElementT2.Mist],
    output: MergedElementT3.Monsoon,
    tier: ElementTier.Merged3,
    isSpecial: true,
  },
  {
    inputs: [MergedElementT3.Volcano, MergedElementT2.Crystal],
    output: MergedElementT3.Meteor,
    tier: ElementTier.Merged3,
    isSpecial: true, // Ultimate legendary
  },
];

// ============================================================================
// COMBINED RECIPES
// ============================================================================

export const ALL_ELEMENT_RECIPES: ElementMergeRecipe[] = [
  ...TIER2_RECIPES,
  ...TIER3_RECIPES,
];

// Create lookup maps for efficient queries
const RECIPE_MAP = new Map<string, ElementMergeRecipe>();
const BY_OUTPUT = new Map<Element, ElementMergeRecipe>();
const BY_INPUT = new Map<Element, ElementMergeRecipe[]>();

// Populate lookup maps
for (const recipe of ALL_ELEMENT_RECIPES) {
  // Order-independent key
  const key = createRecipeKey(recipe.inputs[0], recipe.inputs[1]);
  RECIPE_MAP.set(key, recipe);

  // By output
  BY_OUTPUT.set(recipe.output, recipe);

  // By input (both directions)
  const input1Recipes = BY_INPUT.get(recipe.inputs[0]) || [];
  input1Recipes.push(recipe);
  BY_INPUT.set(recipe.inputs[0], input1Recipes);

  const input2Recipes = BY_INPUT.get(recipe.inputs[1]) || [];
  input2Recipes.push(recipe);
  BY_INPUT.set(recipe.inputs[1], input2Recipes);
}

/**
 * Create order-independent recipe key
 */
function createRecipeKey(a: Element, b: Element): string {
  const sorted = [a, b].sort();
  return `${sorted[0]}_${sorted[1]}`;
}

// ============================================================================
// QUERY FUNCTIONS
// ============================================================================

/**
 * Find merge recipe for two elements
 */
export function findElementMerge(a: Element, b: Element): ElementMergeRecipe | null {
  const key = createRecipeKey(a, b);
  return RECIPE_MAP.get(key) || null;
}

/**
 * Get the recipe that creates a specific element
 */
export function getRecipeForElement(element: Element): ElementMergeRecipe | undefined {
  return BY_OUTPUT.get(element);
}

/**
 * Get all recipes that use a specific element as input
 */
export function getRecipesUsing(element: Element): ElementMergeRecipe[] {
  return BY_INPUT.get(element) || [];
}

/**
 * Get all possible merges for an element
 */
export function getPossibleMerges(element: Element): Array<{
  recipe: ElementMergeRecipe;
  otherInput: Element;
}> {
  const recipes = getRecipesUsing(element);
  return recipes.map((recipe) => ({
    recipe,
    otherInput: recipe.inputs[0] === element ? recipe.inputs[1] : recipe.inputs[0],
  }));
}

/**
 * Get merge path from base elements to a target element
 */
export function getMergePathTo(target: Element): ElementMergeRecipe[] {
  const path: ElementMergeRecipe[] = [];

  function findPath(element: Element): void {
    const recipe = BY_OUTPUT.get(element);
    if (recipe) {
      path.unshift(recipe);
      // Recursively find paths for inputs
      findPath(recipe.inputs[0]);
      if (recipe.inputs[0] !== recipe.inputs[1]) {
        findPath(recipe.inputs[1]);
      }
    }
  }

  findPath(target);
  return path;
}

/**
 * Check if two elements can be merged
 */
export function canMergeElements(a: Element, b: Element): boolean {
  return findElementMerge(a, b) !== null;
}

/**
 * Get the result of merging two elements
 */
export function getMergeResult(a: Element, b: Element): Element | null {
  const recipe = findElementMerge(a, b);
  return recipe?.output || null;
}

/**
 * Get all Tier 2 recipes
 */
export function getTier2Recipes(): ElementMergeRecipe[] {
  return TIER2_RECIPES;
}

/**
 * Get all Tier 3 recipes
 */
export function getTier3Recipes(): ElementMergeRecipe[] {
  return TIER3_RECIPES;
}

/**
 * Get recipes by tier
 */
export function getRecipesByTier(tier: ElementTier): ElementMergeRecipe[] {
  return ALL_ELEMENT_RECIPES.filter((r) => r.tier === tier);
}

/**
 * Get element components (non-recursive, direct components only)
 */
export function getDirectComponents(element: Element): Element[] {
  const definition = getElementDefinition(element);
  return definition?.components || [];
}
