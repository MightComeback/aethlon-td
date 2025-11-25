/**
 * Tower Merge Graph
 * Handles tower merging and recipe management
 */

import {
  TowerCategory,
  TowerRarity,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { BaseElement, type Element } from "@/types/element";
import { findElementMerge } from "@/data/elements";

/**
 * Merge recipe for towers
 */
export interface TowerMergeRecipe {
  id: string;
  inputs: [string, string]; // Tower IDs
  output: string; // Output tower ID
  tier: number;
  rarity: TowerRarity;
  discovered: boolean;
  additionalCost?: number;
}

/**
 * Tower merge graph for efficient lookups
 */
export interface TowerMergeGraph {
  recipes: Map<string, TowerMergeRecipe>;
  byOutput: Map<string, TowerMergeRecipe>;
  byInput: Map<string, TowerMergeRecipe[]>;
  byTier: Map<number, TowerMergeRecipe[]>;
  byCategory: Map<TowerCategory, TowerMergeRecipe[]>;
}

/**
 * Create tower ID from element, category, and tier
 */
export function createTowerId(
  element: Element,
  category: TowerCategory,
  tier: number
): string {
  return `${element}_${category}_t${tier}`;
}

/**
 * Parse tower ID into components
 */
export function parseTowerId(id: string): {
  element: string;
  category: string;
  tier: number;
} | null {
  const match = id.match(/^(.+)_(.+)_t(\d+)$/);
  if (!match) return null;

  return {
    element: match[1]!,
    category: match[2]!,
    tier: parseInt(match[3]!, 10),
  };
}

/**
 * Create recipe ID from inputs (order-independent)
 */
function createRecipeId(input1: string, input2: string): string {
  const sorted = [input1, input2].sort();
  return `merge_${sorted[0]}_${sorted[1]}`;
}

/**
 * Generate all tower merge recipes
 * This generates recipes dynamically based on element merge rules
 */
export function generateAllTowerRecipes(): TowerMergeRecipe[] {
  const recipes: TowerMergeRecipe[] = [];

  const BASE_ELEMENTS = Object.values(BaseElement);
  const CATEGORIES = Object.values(TowerCategory);

  // Generate Tier 2 recipes (Base + Base in same category)
  for (const category of CATEGORIES) {
    for (let i = 0; i < BASE_ELEMENTS.length; i++) {
      for (let j = i + 1; j < BASE_ELEMENTS.length; j++) {
        const elem1 = BASE_ELEMENTS[i]!;
        const elem2 = BASE_ELEMENTS[j]!;

        // Check if these elements can merge
        const elementMerge = findElementMerge(elem1, elem2);
        if (!elementMerge) continue;

        const input1 = createTowerId(elem1, category, 1);
        const input2 = createTowerId(elem2, category, 1);
        const output = createTowerId(elementMerge.output, category, 2);

        recipes.push({
          id: createRecipeId(input1, input2),
          inputs: [input1, input2],
          output,
          tier: 2,
          rarity: TowerRarity.Uncommon,
          discovered: false,
        });
      }
    }
  }

  // Tier 3 recipes can be added here (T2 + T1 mastery paths)
  // These would be generated based on element T3 recipes

  return recipes;
}

/**
 * Build the complete merge graph
 */
export function buildTowerMergeGraph(
  allTowerDefinitions: ExtendedTowerDefinition[]
): TowerMergeGraph {
  const recipes = new Map<string, TowerMergeRecipe>();
  const byOutput = new Map<string, TowerMergeRecipe>();
  const byInput = new Map<string, TowerMergeRecipe[]>();
  const byTier = new Map<number, TowerMergeRecipe[]>();
  const byCategory = new Map<TowerCategory, TowerMergeRecipe[]>();

  // Collect all merge recipes from definitions
  for (const tower of allTowerDefinitions) {
    if (tower.mergeRecipe) {
      const recipeId =
        tower.mergeRecipe.id ||
        createRecipeId(tower.mergeRecipe.inputs[0], tower.mergeRecipe.inputs[1]);

      const recipe: TowerMergeRecipe = {
        id: recipeId,
        inputs: tower.mergeRecipe.inputs,
        output: tower.mergeRecipe.output,
        tier: tower.mergeRecipe.tier,
        rarity: tower.mergeRecipe.rarity,
        discovered: false,
      };

      recipes.set(recipe.id, recipe);
      byOutput.set(recipe.output, recipe);

      // Index by inputs
      for (const input of recipe.inputs) {
        const existing = byInput.get(input) || [];
        existing.push(recipe);
        byInput.set(input, existing);
      }

      // Index by tier
      const tierRecipes = byTier.get(recipe.tier) || [];
      tierRecipes.push(recipe);
      byTier.set(recipe.tier, tierRecipes);

      // Index by category
      const categoryRecipes = byCategory.get(tower.category) || [];
      categoryRecipes.push(recipe);
      byCategory.set(tower.category, categoryRecipes);
    }
  }

  return { recipes, byOutput, byInput, byTier, byCategory };
}

/**
 * Find a merge recipe for two towers
 */
export function findRecipe(
  towerId1: string,
  towerId2: string,
  graph: TowerMergeGraph
): TowerMergeRecipe | null {
  const recipeId = createRecipeId(towerId1, towerId2);
  return graph.recipes.get(recipeId) || null;
}

/**
 * Get all recipes that use a specific tower as input
 */
export function getRecipesUsing(
  towerId: string,
  graph: TowerMergeGraph
): TowerMergeRecipe[] {
  return graph.byInput.get(towerId) || [];
}

/**
 * Get the recipe that creates a specific tower
 */
export function getRecipeForTower(
  towerId: string,
  graph: TowerMergeGraph
): TowerMergeRecipe | undefined {
  return graph.byOutput.get(towerId);
}

/**
 * Get merge path from base towers to a target tower
 */
export function getMergePathTo(
  targetId: string,
  graph: TowerMergeGraph
): TowerMergeRecipe[] {
  const path: TowerMergeRecipe[] = [];

  function findPath(id: string, visited: Set<string> = new Set()): void {
    if (visited.has(id)) return; // Prevent infinite loops
    visited.add(id);

    const recipe = graph.byOutput.get(id);
    if (recipe) {
      path.unshift(recipe);
      // Recursively find paths for inputs
      findPath(recipe.inputs[0], visited);
      if (recipe.inputs[0] !== recipe.inputs[1]) {
        findPath(recipe.inputs[1], visited);
      }
    }
  }

  findPath(targetId);
  return path;
}

/**
 * Get all possible merges for a tower
 */
export function getPossibleMerges(
  towerId: string,
  graph: TowerMergeGraph,
  availableTowerIds: string[]
): Array<{
  recipe: TowerMergeRecipe;
  otherInputId: string;
}> {
  const recipes = getRecipesUsing(towerId, graph);
  const results: Array<{
    recipe: TowerMergeRecipe;
    otherInputId: string;
  }> = [];

  for (const recipe of recipes) {
    const otherInputId =
      recipe.inputs[0] === towerId ? recipe.inputs[1] : recipe.inputs[0];

    // Only include if player has the other tower
    if (availableTowerIds.includes(otherInputId)) {
      results.push({ recipe, otherInputId });
    }
  }

  return results;
}

/**
 * Check if two towers can be merged
 */
export function canMergeTowers(
  towerId1: string,
  towerId2: string,
  graph: TowerMergeGraph
): boolean {
  return findRecipe(towerId1, towerId2, graph) !== null;
}

/**
 * Get all recipes by tier
 */
export function getRecipesByTier(
  tier: number,
  graph: TowerMergeGraph
): TowerMergeRecipe[] {
  return graph.byTier.get(tier) || [];
}

/**
 * Get all recipes by category
 */
export function getRecipesByCategory(
  category: TowerCategory,
  graph: TowerMergeGraph
): TowerMergeRecipe[] {
  return graph.byCategory.get(category) || [];
}
