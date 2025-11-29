/**
 * Object Sprite Definitions
 * Pixel art sprites for world objects (trees, rocks, bushes, etc.)
 * These render as billboards in the 2.5D world
 */

import type { SpriteData } from "@/utils/pixelArt";

// Shorthand aliases for nature palette
const _ = "_" as const;
// Greens (foliage)
const gD = "grassDark" as const;
const g = "grass" as const;
const gL = "grassLight" as const;
const gH = "grassHighlight" as const;
// Browns (wood/bark)
const dD = "dirtDark" as const;
const d = "dirt" as const;
const dM = "dirtMid" as const;
// Grays (stone)
const sD = "stoneDark" as const;
const s = "stone" as const;
const sM = "stoneMid" as const;
const sL = "stoneLight" as const;
// Basic
const bk = "black" as const;
const wh = "white" as const;

/**
 * Pine Tree - 16x24 pixels
 */
export const PINE_TREE: SpriteData<"nature"> = [
  [_, _, _, _, _, _, _, gD, gD, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, gD, g,  g,  gD, _, _, _, _, _, _],
  [_, _, _, _, _, gD, g,  gL, gL, g,  gD, _, _, _, _, _],
  [_, _, _, _, gD, g,  g,  gL, g,  g,  g,  gD, _, _, _, _],
  [_, _, _, gD, g,  gL, g,  g,  g,  gL, g,  g,  gD, _, _, _],
  [_, _, gD, g,  g,  g,  gL, gL, gL, g,  g,  g,  gD, _, _, _],
  [_, _, _, gD, g,  g,  g,  g,  g,  g,  g,  gD, _, _, _, _],
  [_, _, _, _, gD, g,  gL, gL, gL, g,  gD, _, _, _, _, _],
  [_, _, _, gD, g,  g,  g,  g,  g,  g,  g,  gD, _, _, _, _],
  [_, _, gD, g,  gL, g,  g,  g,  g,  gL, g,  g,  gD, _, _, _],
  [_, gD, g,  g,  g,  gL, gL, gL, gL, g,  g,  g,  gD, _, _, _],
  [_, _, gD, g,  g,  g,  g,  g,  g,  g,  g,  gD, _, _, _, _],
  [_, _, _, gD, g,  g,  gL, gL, g,  g,  gD, _, _, _, _, _],
  [_, _, gD, g,  g,  g,  g,  g,  g,  g,  g,  gD, _, _, _, _],
  [_, gD, g,  gL, g,  g,  g,  g,  g,  g,  gL, g,  gD, _, _, _],
  [gD, g,  g,  g,  gL, g,  g,  g,  gL, g,  g,  g,  gD, _, _, _],
  [_, gD, g,  g,  g,  g,  g,  g,  g,  g,  g,  gD, _, _, _, _],
  [_, _, gD, gD, g,  g,  g,  g,  g,  gD, gD, _, _, _, _, _],
  [_, _, _, _, _, _, dD, d,  d,  dD, _, _, _, _, _, _],
  [_, _, _, _, _, _, dD, d,  d,  dD, _, _, _, _, _, _],
  [_, _, _, _, _, _, dD, d,  d,  dD, _, _, _, _, _, _],
  [_, _, _, _, _, _, dD, d,  d,  dD, _, _, _, _, _, _],
  [_, _, _, _, _, dD, dD, d,  d,  dD, dD, _, _, _, _, _],
  [_, _, _, _, _, _, dD, dD, dD, dD, _, _, _, _, _, _],
];

/**
 * Oak Tree - rounder, fuller tree 20x24
 */
export const OAK_TREE: SpriteData<"nature"> = [
  [_, _, _, _, _, _, _, _, gD, gD, gD, gD, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, gD, g,  g,  g,  g,  gD, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, gD, g,  gL, gL, gL, g,  g,  gD, _, _, _, _, _, _],
  [_, _, _, _, _, gD, g,  gL, gH, gH, gL, gL, g,  g,  gD, _, _, _, _, _],
  [_, _, _, _, gD, g,  gL, gH, gL, gL, gH, gL, g,  g,  gD, _, _, _, _, _],
  [_, _, _, gD, g,  g,  gL, gL, g,  g,  gL, gL, g,  g,  g,  gD, _, _, _, _],
  [_, _, gD, g,  g,  g,  g,  g,  g,  g,  g,  g,  g,  g,  g,  g,  gD, _, _, _],
  [_, gD, g,  gL, g,  g,  gL, gL, g,  g,  gL, gL, g,  g,  gL, g,  g,  gD, _, _],
  [_, gD, g,  g,  gL, gL, gH, gL, gL, gL, gL, gH, gL, gL, g,  g,  g,  gD, _, _],
  [gD, g,  g,  g,  gL, gH, gH, gH, gL, gL, gH, gH, gH, gL, g,  g,  g,  g,  gD, _],
  [gD, g,  gL, g,  g,  gL, gH, gL, g,  g,  gL, gH, gL, g,  g,  gL, g,  g,  gD, _],
  [gD, g,  g,  g,  g,  g,  gL, g,  g,  g,  g,  gL, g,  g,  g,  g,  g,  g,  gD, _],
  [_, gD, g,  g,  gL, g,  g,  g,  g,  g,  g,  g,  g,  gL, g,  g,  g,  gD, _, _],
  [_, gD, g,  g,  g,  g,  g,  g,  gL, gL, g,  g,  g,  g,  g,  g,  g,  gD, _, _],
  [_, _, gD, g,  g,  g,  gL, gL, g,  g,  gL, gL, g,  g,  g,  g,  gD, _, _, _],
  [_, _, gD, gD, g,  g,  g,  g,  g,  g,  g,  g,  g,  g,  gD, gD, _, _, _, _],
  [_, _, _, gD, gD, g,  g,  g,  g,  g,  g,  g,  g,  gD, gD, _, _, _, _, _],
  [_, _, _, _, gD, gD, gD, g,  g,  g,  g,  gD, gD, gD, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dD, d,  d,  d,  dD, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dD, d,  dM, d,  dD, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dD, d,  d,  d,  dD, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, dD, dD, d,  d,  dD, dD, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, dD, dD, d,  d,  dD, dD, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, dD, dD, dD, dD, _, _, _, _, _, _, _, _, _],
];

/**
 * Bush - small decorative 12x8
 */
export const BUSH: SpriteData<"nature"> = [
  [_, _, _, _, gD, gD, gD, gD, _, _, _, _],
  [_, _, _, gD, g,  gL, gL, g,  gD, _, _, _],
  [_, _, gD, g,  gL, gH, gH, gL, g,  gD, _, _],
  [_, gD, g,  gL, gH, gL, gL, gH, gL, g,  gD, _],
  [gD, g,  g,  gL, gL, g,  g,  gL, gL, g,  g,  gD],
  [gD, g,  g,  g,  g,  g,  g,  g,  g,  g,  g,  gD],
  [_, gD, g,  g,  g,  g,  g,  g,  g,  g,  gD, _],
  [_, _, gD, gD, gD, gD, gD, gD, gD, gD, _, _],
];

/**
 * Rock - medium decorative 10x8
 */
export const ROCK: SpriteData<"nature"> = [
  [_, _, _, _, s,  s,  s,  _, _, _],
  [_, _, _, s,  sL, sL, s,  s,  _, _],
  [_, _, s,  sL, wh, sL, sL, s,  s,  _],
  [_, s,  sL, sL, sL, sL, s,  s,  s,  _],
  [s,  sL, sL, s,  s,  s,  s,  sD, s,  s],
  [s,  s,  s,  s,  sD, s,  s,  s,  s,  s],
  [_, s,  s,  s,  s,  s,  s,  s,  s,  _],
  [_, _, s,  sD, s,  s,  sD, s,  _, _],
];

/**
 * Small Rock - tiny decorative 6x4
 */
export const SMALL_ROCK: SpriteData<"nature"> = [
  [_, _, s,  s,  _, _],
  [_, s,  sL, sL, s,  _],
  [s,  sL, s,  s,  s,  s],
  [_, s,  s,  s,  s,  _],
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
  [_, _, gL, _, _, gL, _, _],
  [_, gL, g,  gL, gL, g,  gL, _],
  [_, g,  g,  g,  g,  g,  g,  _],
  [gL, g,  gD, g,  g,  gD, g,  gL],
  [g,  gD, gD, g,  g,  gD, gD, g],
  [_, gD, gD, gD, gD, gD, gD, _],
];

/**
 * Wooden fence post 4x12
 */
export const FENCE_POST: SpriteData<"nature"> = [
  [_, dD, d,  _],
  [dD, d,  dM, dD],
  [dD, d,  dM, dD],
  [dD, d,  d,  dD],
  [dD, d,  d,  dD],
  [dD, d,  d,  dD],
  [dD, d,  d,  dD],
  [dD, d,  d,  dD],
  [dD, d,  d,  dD],
  [dD, d,  d,  dD],
  [dD, d,  d,  dD],
  [dD, dD, dD, dD],
];

/**
 * Wooden fence horizontal section 16x6
 */
export const FENCE_HORIZONTAL: SpriteData<"nature"> = [
  [dD, d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  dD],
  [dD, dM, dM, d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  dM, dM, dD],
  [dD, d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  dD],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [dD, d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  d,  dD],
  [dD, dD, dD, dD, dD, dD, dD, dD, dD, dD, dD, dD, dD, dD, dD, dD],
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
