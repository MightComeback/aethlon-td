/**
 * Tile Sprite Definitions
 * 16x16 pixel art tiles for the game world
 */

import type { SpriteData } from "@/utils/pixelArt";

// Shorthand aliases for readability
// Nature palette colors
// Transparent is represented as "_" directly in sprite arrays
const dG = "darkGreen" as const;
const G = "green" as const;
const lG = "lightGreen" as const;
const pG = "paleGreen" as const;
const dB = "darkBrown" as const;
const B = "brown" as const;
const lB = "lightBrown" as const;
const T = "tan" as const;
const bl = "blue" as const;
const lBl = "lightBlue" as const;
const pBl = "paleBlue" as const;
const gr = "gray" as const;
const lGr = "lightGray" as const;
const bk = "black" as const;

/**
 * Grass tile - base ground
 */
export const GRASS_TILE: SpriteData<"nature"> = [
  [G,  G,  G,  lG, G,  G,  dG, G,  G,  lG, G,  G,  G,  dG, G,  G ],
  [G,  lG, G,  G,  G,  dG, G,  G,  lG, G,  G,  G,  lG, G,  G,  dG],
  [dG, G,  G,  G,  lG, G,  G,  G,  G,  G,  dG, G,  G,  G,  lG, G ],
  [G,  G,  dG, G,  G,  G,  pG, lG, G,  G,  G,  lG, G,  G,  G,  G ],
  [G,  lG, G,  G,  G,  lG, lG, G,  G,  dG, G,  G,  G,  dG, G,  lG],
  [G,  G,  G,  dG, G,  G,  G,  G,  lG, G,  G,  G,  lG, G,  G,  G ],
  [dG, G,  G,  G,  G,  G,  dG, G,  G,  G,  G,  dG, G,  G,  G,  dG],
  [G,  G,  lG, G,  lG, G,  G,  G,  G,  lG, G,  G,  G,  G,  lG, G ],
  [G,  G,  G,  G,  G,  G,  G,  dG, G,  G,  G,  G,  dG, G,  G,  G ],
  [lG, G,  dG, G,  G,  dG, G,  G,  G,  G,  lG, G,  G,  G,  G,  lG],
  [G,  G,  G,  G,  lG, G,  G,  lG, G,  G,  G,  G,  G,  lG, G,  G ],
  [G,  lG, G,  G,  G,  G,  G,  G,  G,  dG, G,  G,  G,  G,  G,  dG],
  [dG, G,  G,  lG, G,  dG, G,  G,  G,  G,  G,  lG, G,  G,  G,  G ],
  [G,  G,  G,  G,  G,  G,  G,  G,  lG, G,  G,  G,  G,  dG, G,  G ],
  [G,  dG, G,  G,  G,  lG, dG, G,  G,  G,  G,  G,  G,  G,  lG, G ],
  [G,  G,  lG, G,  G,  G,  G,  G,  dG, G,  lG, G,  dG, G,  G,  G ],
];

/**
 * Dirt tile - path base
 */
export const DIRT_TILE: SpriteData<"nature"> = [
  [B,  B,  lB, B,  B,  dB, B,  B,  lB, B,  B,  B,  dB, B,  B,  lB],
  [B,  dB, B,  B,  B,  B,  lB, B,  B,  B,  dB, B,  B,  B,  lB, B ],
  [lB, B,  B,  B,  dB, B,  B,  B,  B,  lB, B,  B,  B,  B,  B,  B ],
  [B,  B,  B,  lB, B,  B,  B,  T,  lB, B,  B,  B,  dB, B,  B,  dB],
  [B,  lB, dB, B,  B,  B,  lB, lB, B,  B,  B,  lB, B,  B,  B,  B ],
  [dB, B,  B,  B,  B,  B,  B,  B,  B,  dB, B,  B,  B,  B,  lB, B ],
  [B,  B,  B,  B,  lB, dB, B,  B,  B,  B,  B,  B,  dB, B,  B,  B ],
  [B,  dB, B,  B,  B,  B,  B,  B,  lB, B,  B,  B,  B,  B,  B,  dB],
  [lB, B,  B,  dB, B,  B,  B,  B,  B,  B,  dB, B,  B,  lB, B,  B ],
  [B,  B,  B,  B,  B,  lB, B,  dB, B,  B,  B,  B,  B,  B,  B,  B ],
  [B,  B,  lB, B,  B,  B,  B,  B,  B,  B,  B,  lB, dB, B,  B,  lB],
  [dB, B,  B,  B,  dB, B,  B,  B,  B,  lB, B,  B,  B,  B,  B,  B ],
  [B,  B,  B,  B,  B,  B,  lB, B,  B,  B,  B,  B,  B,  B,  dB, B ],
  [B,  lB, B,  B,  B,  B,  B,  B,  dB, B,  B,  B,  lB, B,  B,  B ],
  [B,  B,  B,  dB, B,  lB, B,  B,  B,  B,  B,  dB, B,  B,  B,  B ],
  [lB, B,  B,  B,  B,  B,  B,  B,  B,  lB, B,  B,  B,  B,  lB, dB],
];

/**
 * Stone tile - for paths and structures
 */
export const STONE_TILE: SpriteData<"nature"> = [
  [gr, gr, lGr,gr, gr, gr, bk, gr, gr, lGr,gr, gr, gr, gr, bk, gr],
  [gr, lGr,gr, gr, gr, gr, gr, gr, gr, gr, gr, lGr,gr, gr, gr, gr],
  [bk, gr, gr, gr, gr, bk, gr, lGr,gr, gr, gr, gr, gr, gr, gr, bk],
  [gr, gr, gr, lGr,gr, gr, gr, gr, gr, bk, gr, gr, gr, lGr,gr, gr],
  [gr, gr, bk, gr, gr, gr, gr, gr, gr, gr, gr, gr, bk, gr, gr, gr],
  [gr, lGr,gr, gr, gr, gr, lGr,gr, gr, gr, lGr,gr, gr, gr, gr, gr],
  [bk, gr, gr, gr, bk, gr, gr, gr, gr, gr, gr, gr, gr, bk, gr, lGr],
  [gr, gr, gr, gr, gr, gr, gr, bk, gr, lGr,gr, gr, gr, gr, gr, gr],
  [gr, gr, lGr,gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, bk, gr],
  [gr, bk, gr, gr, gr, lGr,bk, gr, gr, gr, bk, gr, lGr,gr, gr, gr],
  [lGr,gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr],
  [gr, gr, gr, bk, gr, gr, gr, gr, lGr,gr, gr, gr, bk, gr, gr, bk],
  [gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, lGr,gr],
  [bk, gr, lGr,gr, gr, bk, gr, gr, gr, bk, gr, gr, gr, gr, gr, gr],
  [gr, gr, gr, gr, gr, gr, gr, lGr,gr, gr, gr, lGr,bk, gr, gr, gr],
  [gr, bk, gr, gr, lGr,gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, bk],
];

/**
 * Water tile - animated (frame 1)
 */
export const WATER_TILE_1: SpriteData<"nature"> = [
  [bl, bl, lBl,bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl, lBl,bl],
  [bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl],
  [bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl, bl, bl, lBl,bl, bl],
  [lBl,bl, bl, bl, bl, bl, bl, pBl,lBl,bl, bl, bl, bl, bl, bl, lBl],
  [bl, bl, bl, lBl,bl, bl, lBl,lBl,bl, bl, lBl,bl, bl, bl, bl, bl],
  [bl, lBl,bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, lBl,bl, bl, bl],
  [bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl, bl, bl, bl, lBl],
  [bl, bl, lBl,bl, bl, bl, bl, bl, lBl,bl, bl, lBl,bl, bl, bl, bl],
  [lBl,bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, lBl,bl],
  [bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl],
  [bl, lBl,bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl],
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, lBl],
  [bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl],
  [lBl,bl, bl, bl, bl, lBl,bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl],
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
  [bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl, lBl,bl],
];

/**
 * Water tile - animated (frame 2)
 */
export const WATER_TILE_2: SpriteData<"nature"> = [
  [bl, lBl,bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl],
  [bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl],
  [lBl,bl, bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl, bl, bl],
  [bl, bl, bl, bl, lBl,bl, pBl,lBl,bl, bl, bl, lBl,bl, bl, bl, bl],
  [bl, bl, lBl,bl, bl, bl, lBl,bl, bl, lBl,bl, bl, bl, bl, lBl,bl],
  [bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl, bl, lBl,bl, bl],
  [lBl,bl, bl, bl, bl, bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl],
  [bl, bl, bl, lBl,bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl, lBl,bl],
  [bl, lBl,bl, bl, bl, bl, bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl],
  [bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl, bl, bl, bl, lBl],
  [bl, bl, lBl,bl, bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl],
  [lBl,bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
  [bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl, bl, lBl],
  [bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl, lBl,bl, bl, bl, bl],
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, lBl,bl, bl],
  [lBl,bl, bl, lBl,bl, bl, bl, lBl,bl, bl, bl, bl, bl, bl, bl, lBl],
];

/**
 * Spawn point tile (red tinted)
 */
export const SPAWN_TILE: SpriteData<"fantasy"> = [
  ["red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red"],
  ["red","orange","red","red","red","red","orange","red","red","red","red","orange","red","red","red","red"],
  ["red","red","red","red","orange","red","red","red","red","orange","red","red","red","red","orange","red"],
  ["red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red"],
  ["red","red","orange","red","red","red","red","red","orange","red","red","red","red","red","red","red"],
  ["red","red","red","red","red","orange","red","red","red","red","red","red","orange","red","red","red"],
  ["red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red"],
  ["orange","red","red","red","red","red","red","orange","red","red","red","red","red","red","orange","red"],
  ["red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red"],
  ["red","red","red","orange","red","red","red","red","red","red","orange","red","red","red","red","red"],
  ["red","red","red","red","red","red","red","red","orange","red","red","red","red","red","red","red"],
  ["red","orange","red","red","red","red","red","red","red","red","red","red","red","orange","red","red"],
  ["red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red"],
  ["red","red","red","red","red","orange","red","red","red","red","red","red","orange","red","red","red"],
  ["red","red","orange","red","red","red","red","red","red","orange","red","red","red","red","red","red"],
  ["red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","orange"],
];

/**
 * Exit/goal tile (gold tinted)
 */
export const EXIT_TILE: SpriteData<"fantasy"> = [
  ["gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold"],
  ["gold","yellow","gold","gold","gold","gold","yellow","gold","gold","gold","gold","yellow","gold","gold","gold","gold"],
  ["gold","gold","gold","gold","yellow","gold","gold","gold","gold","yellow","gold","gold","gold","gold","yellow","gold"],
  ["gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold"],
  ["gold","gold","yellow","gold","gold","gold","gold","gold","yellow","gold","gold","gold","gold","gold","gold","gold"],
  ["gold","gold","gold","gold","gold","yellow","gold","gold","gold","gold","gold","gold","yellow","gold","gold","gold"],
  ["gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold"],
  ["yellow","gold","gold","gold","gold","gold","gold","yellow","gold","gold","gold","gold","gold","gold","yellow","gold"],
  ["gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold"],
  ["gold","gold","gold","yellow","gold","gold","gold","gold","gold","gold","yellow","gold","gold","gold","gold","gold"],
  ["gold","gold","gold","gold","gold","gold","gold","gold","yellow","gold","gold","gold","gold","gold","gold","gold"],
  ["gold","yellow","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","yellow","gold","gold"],
  ["gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold"],
  ["gold","gold","gold","gold","gold","yellow","gold","gold","gold","gold","gold","gold","yellow","gold","gold","gold"],
  ["gold","gold","yellow","gold","gold","gold","gold","gold","gold","yellow","gold","gold","gold","gold","gold","gold"],
  ["gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","gold","yellow"],
];

// Export all tiles
export const TILES = {
  grass: GRASS_TILE,
  dirt: DIRT_TILE,
  stone: STONE_TILE,
  water: [WATER_TILE_1, WATER_TILE_2],
  spawn: SPAWN_TILE,
  exit: EXIT_TILE,
} as const;
