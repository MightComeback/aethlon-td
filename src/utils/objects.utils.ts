import {
  // Trees
  PineTree,
  OakTree,
  BirchTree,
  WillowTree,
  DeadTree,
  PineTreeSnow,
  // Rocks & Terrain
  Rock,
  IceCrystal,
  VolcanicRock,
  // Plants
  Bush,
  GrassTuft,
  Flower,
  Sunflower,
  Cactus,
  Mushroom,
  Cattail,
  // Structures
  TowerBase,
  Fence,
  House,
  Well,
  Windmill,
  HayBale,
  Log,
  Stump,
  Cabin,
  Tent,
  Grave,
  Lantern,
  Snowman,
  Igloo,
  // Decorations
  Pottery,
  Bones,
  Skull,
  Obelisk,
  FirePit,
  SnowPile,
  LilyPad,
} from "@/components/editor/EditorObjects";

// Object type mapping for easy instantiation
export const OBJECT_COMPONENTS = {
  // Trees
  tree_pine: PineTree,
  tree_oak: OakTree,
  tree_birch: BirchTree,
  tree_willow: WillowTree,
  tree_dead: DeadTree,
  tree_pine_snow: PineTreeSnow,
  // Rocks
  rock: Rock,
  ice_crystal: IceCrystal,
  rock_volcanic: VolcanicRock,
  // Plants
  bush: Bush,
  grass: GrassTuft,
  flower: Flower,
  sunflower: Sunflower,
  cactus: Cactus,
  mushroom: Mushroom,
  cattail: Cattail,
  // Structures
  tower_base: TowerBase,
  fence: Fence,
  house: House,
  well: Well,
  windmill: Windmill,
  hay_bale: HayBale,
  log: Log,
  stump: Stump,
  cabin: Cabin,
  tent: Tent,
  grave: Grave,
  lantern: Lantern,
  snowman: Snowman,
  igloo: Igloo,
  // Decorations
  pottery: Pottery,
  bones: Bones,
  skull: Skull,
  obelisk: Obelisk,
  fire_pit: FirePit,
  snow_pile: SnowPile,
  lily_pad: LilyPad,
} as const;

export type EditorObjectType = keyof typeof OBJECT_COMPONENTS;

// Object metadata for UI with colors
export const OBJECT_METADATA: Record<EditorObjectType, { label: string; color: string; category: string }> = {
  // Trees - Greens
  tree_pine: { label: "Pine Tree", color: "#2e7d32", category: "trees" },
  tree_oak: { label: "Oak Tree", color: "#388e3c", category: "trees" },
  tree_birch: { label: "Birch Tree", color: "#8bc34a", category: "trees" },
  tree_willow: { label: "Willow Tree", color: "#558b2f", category: "trees" },
  tree_dead: { label: "Dead Tree", color: "#5d4037", category: "trees" },
  tree_pine_snow: { label: "Snowy Pine", color: "#e8f5e9", category: "trees" },
  // Rocks - Grays
  rock: { label: "Rock", color: "#78909c", category: "terrain" },
  ice_crystal: { label: "Ice Crystal", color: "#b3e5fc", category: "terrain" },
  rock_volcanic: { label: "Volcanic Rock", color: "#37474f", category: "terrain" },
  // Plants - Various
  bush: { label: "Bush", color: "#43a047", category: "plants" },
  grass: { label: "Grass", color: "#7cb342", category: "plants" },
  flower: { label: "Flower", color: "#f06292", category: "plants" },
  sunflower: { label: "Sunflower", color: "#fdd835", category: "plants" },
  cactus: { label: "Cactus", color: "#66bb6a", category: "plants" },
  mushroom: { label: "Mushroom", color: "#d32f2f", category: "plants" },
  cattail: { label: "Cattail", color: "#8bc34a", category: "plants" },
  // Structures - Browns
  tower_base: { label: "Tower Spot", color: "#795548", category: "structures" },
  fence: { label: "Fence", color: "#6d4c41", category: "structures" },
  house: { label: "House", color: "#efebe9", category: "structures" },
  well: { label: "Well", color: "#78909c", category: "structures" },
  windmill: { label: "Windmill", color: "#efebe9", category: "structures" },
  hay_bale: { label: "Hay Bale", color: "#fdd835", category: "structures" },
  log: { label: "Log", color: "#5d4037", category: "structures" },
  stump: { label: "Stump", color: "#5d4037", category: "structures" },
  cabin: { label: "Cabin", color: "#6d4c41", category: "structures" },
  tent: { label: "Tent", color: "#fff8e1", category: "structures" },
  grave: { label: "Grave", color: "#90a4ae", category: "structures" },
  lantern: { label: "Lantern", color: "#ffcc02", category: "structures" },
  snowman: { label: "Snowman", color: "#ffffff", category: "structures" },
  igloo: { label: "Igloo", color: "#e3f2fd", category: "structures" },
  // Decorations
  pottery: { label: "Pottery", color: "#d7ccc8", category: "decorations" },
  bones: { label: "Bones", color: "#efebe9", category: "decorations" },
  skull: { label: "Skull", color: "#efebe9", category: "decorations" },
  obelisk: { label: "Obelisk", color: "#a1887f", category: "decorations" },
  fire_pit: { label: "Fire Pit", color: "#ff5722", category: "decorations" },
  snow_pile: { label: "Snow Pile", color: "#ffffff", category: "decorations" },
  lily_pad: { label: "Lily Pad", color: "#66bb6a", category: "decorations" },
};

// Get objects by category
export function getObjectsByCategory(category: string): EditorObjectType[] {
  return (Object.entries(OBJECT_METADATA) as [EditorObjectType, { category: string }][])
    .filter(([_, meta]) => meta.category === category)
    .map(([type]) => type);
}

// All categories
export const OBJECT_CATEGORIES = ["trees", "terrain", "plants", "structures", "decorations"] as const;
