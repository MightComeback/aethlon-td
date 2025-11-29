/**
 * Object Sprite Definitions
 * Pixel art sprites for world objects (trees, rocks, bushes, etc.)
 * These render as billboards in the 2.5D world
 */

import type { SpriteData } from "@/utils/pixelArt";

// Shorthand aliases for nature palette
const _ = "_" as const;
const dG = "darkGreen" as const;
const G = "green" as const;
const lG = "lightGreen" as const;
const pG = "paleGreen" as const;
const dB = "darkBrown" as const;
const B = "brown" as const;
const lB = "lightBrown" as const;
// const T = "tan" as const; // available for future use
const gr = "gray" as const;
const lGr = "lightGray" as const;
const bk = "black" as const;
const wh = "white" as const;

/**
 * Pine Tree - 16x24 pixels
 */
export const PINE_TREE: SpriteData<"nature"> = [
  [_, _, _, _, _, _, _, dG, dG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, dG, G,  G,  dG, _, _, _, _, _, _],
  [_, _, _, _, _, dG, G,  lG, lG, G,  dG, _, _, _, _, _],
  [_, _, _, _, dG, G,  G,  lG, G,  G,  G,  dG, _, _, _, _],
  [_, _, _, dG, G,  lG, G,  G,  G,  lG, G,  G,  dG, _, _, _],
  [_, _, dG, G,  G,  G,  lG, lG, lG, G,  G,  G,  dG, _, _, _],
  [_, _, _, dG, G,  G,  G,  G,  G,  G,  G,  dG, _, _, _, _],
  [_, _, _, _, dG, G,  lG, lG, lG, G,  dG, _, _, _, _, _],
  [_, _, _, dG, G,  G,  G,  G,  G,  G,  G,  dG, _, _, _, _],
  [_, _, dG, G,  lG, G,  G,  G,  G,  lG, G,  G,  dG, _, _, _],
  [_, dG, G,  G,  G,  lG, lG, lG, lG, G,  G,  G,  dG, _, _, _],
  [_, _, dG, G,  G,  G,  G,  G,  G,  G,  G,  dG, _, _, _, _],
  [_, _, _, dG, G,  G,  lG, lG, G,  G,  dG, _, _, _, _, _],
  [_, _, dG, G,  G,  G,  G,  G,  G,  G,  G,  dG, _, _, _, _],
  [_, dG, G,  lG, G,  G,  G,  G,  G,  G,  lG, G,  dG, _, _, _],
  [dG, G,  G,  G,  lG, G,  G,  G,  lG, G,  G,  G,  dG, _, _, _],
  [_, dG, G,  G,  G,  G,  G,  G,  G,  G,  G,  dG, _, _, _, _],
  [_, _, dG, dG, G,  G,  G,  G,  G,  dG, dG, _, _, _, _, _],
  [_, _, _, _, _, _, dB, B,  B,  dB, _, _, _, _, _, _],
  [_, _, _, _, _, _, dB, B,  B,  dB, _, _, _, _, _, _],
  [_, _, _, _, _, _, dB, B,  B,  dB, _, _, _, _, _, _],
  [_, _, _, _, _, _, dB, B,  B,  dB, _, _, _, _, _, _],
  [_, _, _, _, _, dB, dB, B,  B,  dB, dB, _, _, _, _, _],
  [_, _, _, _, _, _, dB, dB, dB, dB, _, _, _, _, _, _],
];

/**
 * Oak Tree - rounder, fuller tree 20x24
 */
export const OAK_TREE: SpriteData<"nature"> = [
  [_, _, _, _, _, _, _, _, dG, dG, dG, dG, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dG, G,  G,  G,  G,  dG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, dG, G,  lG, lG, lG, G,  G,  dG, _, _, _, _, _, _],
  [_, _, _, _, _, dG, G,  lG, pG, pG, lG, lG, G,  G,  dG, _, _, _, _, _],
  [_, _, _, _, dG, G,  lG, pG, lG, lG, pG, lG, G,  G,  dG, _, _, _, _, _],
  [_, _, _, dG, G,  G,  lG, lG, G,  G,  lG, lG, G,  G,  G,  dG, _, _, _, _],
  [_, _, dG, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  dG, _, _, _],
  [_, dG, G,  lG, G,  G,  lG, lG, G,  G,  lG, lG, G,  G,  lG, G,  G,  dG, _, _],
  [_, dG, G,  G,  lG, lG, pG, lG, lG, lG, lG, pG, lG, lG, G,  G,  G,  dG, _, _],
  [dG, G,  G,  G,  lG, pG, pG, pG, lG, lG, pG, pG, pG, lG, G,  G,  G,  G,  dG, _],
  [dG, G,  lG, G,  G,  lG, pG, lG, G,  G,  lG, pG, lG, G,  G,  lG, G,  G,  dG, _],
  [dG, G,  G,  G,  G,  G,  lG, G,  G,  G,  G,  lG, G,  G,  G,  G,  G,  G,  dG, _],
  [_, dG, G,  G,  lG, G,  G,  G,  G,  G,  G,  G,  G,  lG, G,  G,  G,  dG, _, _],
  [_, dG, G,  G,  G,  G,  G,  G,  lG, lG, G,  G,  G,  G,  G,  G,  G,  dG, _, _],
  [_, _, dG, G,  G,  G,  lG, lG, G,  G,  lG, lG, G,  G,  G,  G,  dG, _, _, _],
  [_, _, dG, dG, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  dG, dG, _, _, _, _],
  [_, _, _, dG, dG, G,  G,  G,  G,  G,  G,  G,  G,  dG, dG, _, _, _, _, _],
  [_, _, _, _, dG, dG, dG, G,  G,  G,  G,  dG, dG, dG, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dB, B,  B,  B,  dB, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dB, B,  lB, B,  dB, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dB, B,  B,  B,  dB, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, dB, dB, B,  B,  dB, dB, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, dB, dB, B,  B,  dB, dB, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dB, dB, dB, dB, _, _, _, _, _, _, _, _, _],
];

/**
 * Bush - small decorative 12x8
 */
export const BUSH: SpriteData<"nature"> = [
  [_, _, _, _, dG, dG, dG, dG, _, _, _, _],
  [_, _, _, dG, G,  lG, lG, G,  dG, _, _, _],
  [_, _, dG, G,  lG, pG, pG, lG, G,  dG, _, _],
  [_, dG, G,  lG, pG, lG, lG, pG, lG, G,  dG, _],
  [dG, G,  G,  lG, lG, G,  G,  lG, lG, G,  G,  dG],
  [dG, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  dG],
  [_, dG, G,  G,  G,  G,  G,  G,  G,  G,  dG, _],
  [_, _, dG, dG, dG, dG, dG, dG, dG, dG, _, _],
];

/**
 * Rock - medium decorative 10x8
 */
export const ROCK: SpriteData<"nature"> = [
  [_, _, _, _, gr, gr, gr, _, _, _],
  [_, _, _, gr, lGr,lGr,gr, gr, _, _],
  [_, _, gr, lGr,wh, lGr,lGr,gr, gr, _],
  [_, gr, lGr,lGr,lGr,lGr,gr, gr, gr, _],
  [gr, lGr,lGr,gr, gr, gr, gr, bk, gr, gr],
  [gr, gr, gr, gr, bk, gr, gr, gr, gr, gr],
  [_, gr, gr, gr, gr, gr, gr, gr, gr, _],
  [_, _, gr, bk, gr, gr, bk, gr, _, _],
];

/**
 * Small Rock - tiny decorative 6x4
 */
export const SMALL_ROCK: SpriteData<"nature"> = [
  [_, _, gr, gr, _, _],
  [_, gr, lGr,lGr,gr, _],
  [gr, lGr,gr, gr, gr, gr],
  [_, gr, gr, gr, gr, _],
];

/**
 * Flower - red 6x8
 */
export const FLOWER_RED: SpriteData<"fantasy"> = [
  [_, _, "red", "red", _, _],
  [_, "red", "yellow", "yellow", "red", _],
  ["red", "yellow", "orange", "orange", "yellow", "red"],
  [_, "red", "yellow", "yellow", "red", _],
  [_, _, "red", "red", _, _],
  [_, _, "teal", "teal", _, _],
  [_, _, "teal", "teal", _, _],
  [_, _, "teal", "teal", _, _],
];

/**
 * Flower - purple 6x8
 */
export const FLOWER_PURPLE: SpriteData<"fantasy"> = [
  [_, _, "purple", "purple", _, _],
  [_, "purple", "magenta", "magenta", "purple", _],
  ["purple", "magenta", "pink", "pink", "magenta", "purple"],
  [_, "purple", "magenta", "magenta", "purple", _],
  [_, _, "purple", "purple", _, _],
  [_, _, "teal", "teal", _, _],
  [_, _, "teal", "teal", _, _],
  [_, _, "teal", "teal", _, _],
];

/**
 * Grass tuft - small decoration 8x6
 */
export const GRASS_TUFT: SpriteData<"nature"> = [
  [_, _, lG, _, _, lG, _, _],
  [_, lG, G,  lG, lG, G,  lG, _],
  [_, G,  G,  G,  G,  G,  G,  _],
  [lG, G,  dG, G,  G,  dG, G,  lG],
  [G,  dG, dG, G,  G,  dG, dG, G],
  [_, dG, dG, dG, dG, dG, dG, _],
];

/**
 * Wooden fence post 4x12
 */
export const FENCE_POST: SpriteData<"nature"> = [
  [_, dB, B,  _],
  [dB, B,  lB, dB],
  [dB, B,  lB, dB],
  [dB, B,  B,  dB],
  [dB, B,  B,  dB],
  [dB, B,  B,  dB],
  [dB, B,  B,  dB],
  [dB, B,  B,  dB],
  [dB, B,  B,  dB],
  [dB, B,  B,  dB],
  [dB, B,  B,  dB],
  [dB, dB, dB, dB],
];

/**
 * Wooden fence horizontal section 16x6
 */
export const FENCE_HORIZONTAL: SpriteData<"nature"> = [
  [dB, B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  dB],
  [dB, lB, lB, B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  lB, lB, dB],
  [dB, B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  dB],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [dB, B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  B,  dB],
  [dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB],
];

/**
 * Torch/Lamp post 6x16
 */
export const TORCH: SpriteData<"fantasy"> = [
  [_, _, "yellow", "yellow", _, _],
  [_, "yellow", "orange", "orange", "yellow", _],
  [_, "orange", "red", "red", "orange", _],
  [_, _, "orange", "orange", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, _, "black", "black", _, _],
  [_, "black", "black", "black", "black", _],
  [_, "black", "black", "black", "black", _],
];

// Export all objects
export const OBJECTS = {
  pineTree: PINE_TREE,
  oakTree: OAK_TREE,
  bush: BUSH,
  rock: ROCK,
  smallRock: SMALL_ROCK,
  flowerRed: FLOWER_RED,
  flowerPurple: FLOWER_PURPLE,
  grassTuft: GRASS_TUFT,
  fencePost: FENCE_POST,
  fenceHorizontal: FENCE_HORIZONTAL,
  torch: TORCH,
} as const;

// Palette mapping for each object
export const OBJECT_PALETTES: Record<keyof typeof OBJECTS, "nature" | "fantasy" | "stone"> = {
  pineTree: "nature",
  oakTree: "nature",
  bush: "nature",
  rock: "nature",
  smallRock: "nature",
  flowerRed: "fantasy",
  flowerPurple: "fantasy",
  grassTuft: "nature",
  fencePost: "nature",
  fenceHorizontal: "nature",
  torch: "fantasy",
};
