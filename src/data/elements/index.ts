/**
 * Element System Exports
 * Central exports for element definitions, effectiveness, and merge system
 */

// Base elements
export {
  BASE_ELEMENT_DEFINITIONS,
  getBaseElementDefinition,
  getAllBaseElements,
  isBaseElement,
} from "./baseElements";

// Merged elements
export {
  MERGED_T2_DEFINITIONS,
  MERGED_T3_DEFINITIONS,
  getAllTier2Elements,
  getAllTier3Elements,
  getMergedElementDefinition,
  isTier2Element,
  isTier3Element,
} from "./mergedElements";

// Effectiveness system
export {
  BASE_EFFECTIVENESS,
  calculateEffectiveness,
  calculateElementalDamage,
  getEffectivenessDisplay,
  getEffectivenessColor,
} from "./effectiveness";

// Merge recipes
export {
  ALL_ELEMENT_RECIPES,
  findElementMerge,
  getRecipeForElement,
  getRecipesUsing,
  getPossibleMerges,
  getMergePathTo,
  canMergeElements,
  getMergeResult,
  getTier2Recipes,
  getTier3Recipes,
  getRecipesByTier,
} from "./mergeRecipes";

// Utilities
export {
  getElementDefinition,
  getAllElementDefinitions,
  getElementTier,
  getElementComponents,
  getElementColor,
  getElementSecondaryColor,
  getElementName,
  getElementsByTier,
  getElementsContaining,
  elementContains,
  getDirectComponents,
} from "./utils";

// Re-export types for convenience
export type {
  Element,
  ElementDefinition,
  ElementAffinity,
  ElementMergeRecipe,
  ElementalDamageResult,
  EffectivenessValue,
} from "@/types/element";

export {
  BaseElement,
  MergedElementT2,
  MergedElementT3,
  ElementTier,
} from "@/types/element";
