import { Bush, Flower, GrassTuft, OakTree, PineTree, Rock, TowerBase } from "@/components/editor/EditorObjects";

// Object type mapping for easy instantiation
export const OBJECT_COMPONENTS = {
  tree_pine: PineTree,
  tree_oak: OakTree,
  rock: Rock,
  bush: Bush,
  grass: GrassTuft,
  flower: Flower,
  tower_base: TowerBase,
} as const;

export type EditorObjectType = keyof typeof OBJECT_COMPONENTS;

// Object metadata for UI - B&W colors
export const OBJECT_METADATA: Record<EditorObjectType, { label: string; color: string }> = {
  tree_pine: { label: "Pine Tree", color: "#888888" },
  tree_oak: { label: "Oak Tree", color: "#555555" },
  rock: { label: "Rock", color: "#888888" },
  bush: { label: "Bush", color: "#555555" },
  grass: { label: "Grass", color: "#888888" },
  flower: { label: "Flower", color: "#cccccc" },
  tower_base: { label: "Tower Spot", color: "#444444" },
};
