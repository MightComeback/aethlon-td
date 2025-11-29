/**
 * Tile Sprite Definitions
 * 16x16 pixel art tiles for the game world
 */

import type { SpriteData } from "@/utils/pixelArt";

// Nature palette shorthand - GRASS (greens)
const gD = "grassDark" as const;
const g = "grass" as const;
const gM = "grassMid" as const;
const gL = "grassLight" as const;
const gH = "grassHighlight" as const;

// Nature palette shorthand - DIRT (browns)
const dD = "dirtDark" as const;
const d = "dirt" as const;
const dM = "dirtMid" as const;
const dL = "dirtLight" as const;

// Nature palette shorthand - WATER (blues)
const wD = "waterDark" as const;
const w = "water" as const;
const wM = "waterMid" as const;
const wL = "waterLight" as const;
const wH = "waterHighlight" as const;

// Nature palette shorthand - STONE (grays)
const sD = "stoneDark" as const;
const s = "stone" as const;
const sM = "stoneMid" as const;
const sL = "stoneLight" as const;

// Fantasy palette shorthand - SPAWN (reds)
const spD = "spawnDark" as const;
const sp = "spawn" as const;
const spM = "spawnMid" as const;
const spL = "spawnLight" as const;

// Fantasy palette shorthand - EXIT (golds)
const exD = "exitDark" as const;
const ex = "exit" as const;
const exM = "exitMid" as const;
const exL = "exitLight" as const;
const exH = "exitHighlight" as const;

/**
 * Grass tile - lush green ground with subtle variation
 */
export const GRASS_TILE: SpriteData<"nature"> = [
  [g,  gM, g,  g,  gM, g,  g,  gL, g,  g,  gM, g,  g,  g,  gM, g ],
  [g,  g,  g,  gL, g,  g,  g,  g,  g,  gM, g,  g,  gL, g,  g,  g ],
  [gM, g,  g,  g,  g,  gD, g,  g,  g,  g,  g,  g,  g,  gM, g,  gD],
  [g,  g,  gD, g,  g,  g,  gM, g,  gL, g,  gD, g,  g,  g,  g,  g ],
  [g,  gL, g,  g,  g,  g,  g,  g,  g,  g,  g,  gM, g,  g,  gL, g ],
  [g,  g,  g,  gM, g,  gL, g,  gD, g,  g,  g,  g,  g,  gD, g,  g ],
  [gD, g,  g,  g,  g,  g,  g,  g,  g,  gL, g,  g,  g,  g,  g,  gM],
  [g,  g,  gM, g,  gD, g,  g,  g,  g,  g,  g,  gD, g,  gM, g,  g ],
  [g,  g,  g,  g,  g,  g,  gM, g,  gD, g,  g,  g,  g,  g,  g,  g ],
  [gM, g,  gD, g,  g,  g,  g,  g,  g,  g,  gM, g,  gL, g,  gD, g ],
  [g,  g,  g,  g,  gL, g,  g,  gL, g,  g,  g,  g,  g,  g,  g,  g ],
  [g,  gL, g,  g,  g,  g,  gD, g,  g,  gM, g,  g,  gD, g,  gM, g ],
  [gD, g,  g,  gM, g,  g,  g,  g,  g,  g,  g,  g,  g,  g,  g,  gD],
  [g,  g,  g,  g,  g,  gM, g,  gD, g,  g,  gL, g,  gM, g,  g,  g ],
  [g,  gM, g,  gD, g,  g,  g,  g,  g,  g,  g,  g,  g,  gD, g,  g ],
  [g,  g,  g,  g,  g,  g,  gL, g,  gM, g,  gD, g,  g,  g,  gL, g ],
];

/**
 * Dirt tile - brown earthy path
 */
export const DIRT_TILE: SpriteData<"nature"> = [
  [d,  d,  dM, d,  d,  dD, d,  d,  dM, d,  d,  d,  dD, d,  d,  dM],
  [d,  dD, d,  d,  d,  d,  dM, d,  d,  d,  dD, d,  d,  d,  dM, d ],
  [dM, d,  d,  d,  dD, d,  d,  d,  d,  dM, d,  d,  d,  d,  d,  d ],
  [d,  d,  d,  dM, d,  d,  d,  dL, dM, d,  d,  d,  dD, d,  d,  dD],
  [d,  dM, dD, d,  d,  d,  dM, dM, d,  d,  d,  dM, d,  d,  d,  d ],
  [dD, d,  d,  d,  d,  d,  d,  d,  d,  dD, d,  d,  d,  d,  dM, d ],
  [d,  d,  d,  d,  dM, dD, d,  d,  d,  d,  d,  d,  dD, d,  d,  d ],
  [d,  dD, d,  d,  d,  d,  d,  d,  dM, d,  d,  d,  d,  d,  d,  dD],
  [dM, d,  d,  dD, d,  d,  d,  d,  d,  d,  dD, d,  d,  dM, d,  d ],
  [d,  d,  d,  d,  d,  dM, d,  dD, d,  d,  d,  d,  d,  d,  d,  d ],
  [d,  d,  dM, d,  d,  d,  d,  d,  d,  d,  d,  dM, dD, d,  d,  dM],
  [dD, d,  d,  d,  dD, d,  d,  d,  d,  dM, d,  d,  d,  d,  d,  d ],
  [d,  d,  d,  d,  d,  d,  dM, d,  d,  d,  d,  d,  d,  d,  dD, d ],
  [d,  dM, d,  d,  d,  d,  d,  d,  dD, d,  d,  d,  dM, d,  d,  d ],
  [d,  d,  d,  dD, d,  dM, d,  d,  d,  d,  d,  dD, d,  d,  d,  d ],
  [dM, d,  d,  d,  d,  d,  d,  d,  d,  dM, d,  d,  d,  d,  dM, dD],
];

/**
 * Stone tile - gray cobblestone
 */
export const STONE_TILE: SpriteData<"nature"> = [
  [s,  s,  sM, s,  s,  s,  sD, s,  s,  sM, s,  s,  s,  s,  sD, s ],
  [s,  sM, s,  s,  s,  s,  s,  s,  s,  s,  s,  sM, s,  s,  s,  s ],
  [sD, s,  s,  s,  s,  sD, s,  sM, s,  s,  s,  s,  s,  s,  s,  sD],
  [s,  s,  s,  sM, s,  s,  s,  s,  s,  sD, s,  s,  s,  sM, s,  s ],
  [s,  s,  sD, s,  s,  s,  s,  s,  s,  s,  s,  s,  sD, s,  s,  s ],
  [s,  sM, s,  s,  s,  s,  sM, s,  s,  s,  sM, s,  s,  s,  s,  s ],
  [sD, s,  s,  s,  sD, s,  s,  s,  s,  s,  s,  s,  s,  sD, s,  sM],
  [s,  s,  s,  s,  s,  s,  s,  sD, s,  sM, s,  s,  s,  s,  s,  s ],
  [s,  s,  sM, s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  sD, s ],
  [s,  sD, s,  s,  s,  sM, sD, s,  s,  s,  sD, s,  sM, s,  s,  s ],
  [sM, s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s ],
  [s,  s,  s,  sD, s,  s,  s,  s,  sM, s,  s,  s,  sD, s,  s,  sD],
  [s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  sM, s ],
  [sD, s,  sM, s,  s,  sD, s,  s,  s,  sD, s,  s,  s,  s,  s,  s ],
  [s,  s,  s,  s,  s,  s,  s,  sM, s,  s,  s,  sM, sD, s,  s,  s ],
  [s,  sD, s,  s,  sM, s,  s,  s,  s,  s,  s,  s,  s,  s,  s,  sD],
];

/**
 * Water tile - animated frame 1
 */
export const WATER_TILE_1: SpriteData<"nature"> = [
  [w,  w,  wM, w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  w,  wM, w ],
  [w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w ],
  [w,  w,  w,  w,  wM, w,  w,  w,  w,  w,  w,  w,  w,  wM, w,  w ],
  [wM, w,  w,  w,  w,  w,  w,  wL, wM, w,  w,  w,  w,  w,  w,  wM],
  [w,  w,  w,  wM, w,  w,  wM, wL, w,  w,  wM, w,  w,  w,  w,  w ],
  [w,  wM, w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  wM, w,  w,  w ],
  [w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  w,  w,  w,  w,  w,  wM],
  [w,  w,  wM, w,  w,  w,  w,  w,  wM, w,  w,  wM, w,  w,  w,  w ],
  [wM, w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  wM, w ],
  [w,  w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w,  w,  w ],
  [w,  wM, w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  w ],
  [w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  wM],
  [w,  w,  w,  wM, w,  w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  w ],
  [wM, w,  w,  w,  w,  wM, w,  w,  wM, w,  w,  w,  w,  wM, w,  w ],
  [w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w ],
  [w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  wM, w ],
];

/**
 * Water tile - animated frame 2
 */
export const WATER_TILE_2: SpriteData<"nature"> = [
  [w,  wM, w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w,  wM],
  [w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w ],
  [wM, w,  w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  w,  w,  w,  w ],
  [w,  w,  w,  w,  wM, w,  wL, wM, w,  w,  w,  wM, w,  w,  w,  w ],
  [w,  w,  wM, w,  w,  w,  wM, w,  w,  wM, w,  w,  w,  w,  wM, w ],
  [w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  w,  w,  w,  wM, w,  w ],
  [wM, w,  w,  w,  w,  w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  w ],
  [w,  w,  w,  wM, w,  w,  w,  wM, w,  w,  w,  w,  w,  w,  wM, w ],
  [w,  wM, w,  w,  w,  w,  w,  w,  w,  w,  w,  wM, w,  w,  w,  w ],
  [w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  w,  w,  w,  w,  w,  wM],
  [w,  w,  wM, w,  w,  w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w ],
  [wM, w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w ],
  [w,  w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w,  w,  wM],
  [w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  w,  w ],
  [w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  w,  wM, w,  w ],
  [wM, w,  w,  wM, w,  w,  w,  wM, w,  w,  w,  w,  wM, w,  w,  wM],
];

/**
 * Spawn tile - dark red danger zone
 */
export const SPAWN_TILE: SpriteData<"fantasy"> = [
  [sp, sp, spM,sp, sp, sp, spD,sp, sp, spM,sp, sp, sp, sp, spD,sp],
  [sp, spM,sp, sp, sp, sp, sp, sp, sp, sp, sp, spM,sp, sp, sp, sp],
  [spD,sp, sp, sp, sp, spD,sp, spM,sp, sp, sp, sp, sp, sp, sp, spD],
  [sp, sp, sp, spM,sp, sp, sp, sp, sp, spD,sp, sp, sp, spM,sp, sp],
  [sp, sp, spD,sp, sp, sp, sp, sp, sp, sp, sp, sp, spD,sp, sp, sp],
  [sp, spM,sp, sp, sp, sp, spM,sp, sp, sp, spM,sp, sp, sp, sp, sp],
  [spD,sp, sp, sp, spD,sp, sp, sp, sp, sp, sp, sp, sp, spD,sp, spM],
  [sp, sp, sp, sp, sp, sp, sp, spD,sp, spM,sp, sp, sp, sp, sp, sp],
  [sp, sp, spM,sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, spD,sp],
  [sp, spD,sp, sp, sp, spM,spD,sp, sp, sp, spD,sp, spM,sp, sp, sp],
  [spM,sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp],
  [sp, sp, sp, spD,sp, sp, sp, sp, spM,sp, sp, sp, spD,sp, sp, spD],
  [sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, spM,sp],
  [spD,sp, spM,sp, sp, spD,sp, sp, sp, spD,sp, sp, sp, sp, sp, sp],
  [sp, sp, sp, sp, sp, sp, sp, spM,sp, sp, sp, spM,spD,sp, sp, sp],
  [sp, spD,sp, sp, spM,sp, sp, sp, sp, sp, sp, sp, sp, sp, sp, spD],
];

/**
 * Exit tile - golden goal
 */
export const EXIT_TILE: SpriteData<"fantasy"> = [
  [ex, ex, exM,ex, ex, ex, exD,ex, ex, exM,ex, ex, ex, ex, exD,ex],
  [ex, exM,ex, ex, ex, ex, ex, ex, ex, ex, ex, exM,ex, ex, ex, ex],
  [exD,ex, ex, ex, ex, exD,ex, exL,ex, ex, ex, ex, ex, ex, ex, exD],
  [ex, ex, ex, exM,ex, ex, ex, ex, ex, exD,ex, ex, ex, exM,ex, ex],
  [ex, ex, exD,ex, ex, ex, exL,exL,ex, ex, ex, ex, exD,ex, ex, ex],
  [ex, exM,ex, ex, ex, ex, exL,exH,exL,ex, exM,ex, ex, ex, ex, ex],
  [exD,ex, ex, ex, exD,ex, ex, exL,ex, ex, ex, ex, ex, exD,ex, exM],
  [ex, ex, ex, ex, ex, ex, ex, exD,ex, exM,ex, ex, ex, ex, ex, ex],
  [ex, ex, exM,ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, exD,ex],
  [ex, exD,ex, ex, ex, exM,exD,ex, ex, ex, exD,ex, exM,ex, ex, ex],
  [exM,ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex],
  [ex, ex, ex, exD,ex, ex, ex, ex, exM,ex, ex, ex, exD,ex, ex, exD],
  [ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, exM,ex],
  [exD,ex, exM,ex, ex, exD,ex, ex, ex, exD,ex, ex, ex, ex, ex, ex],
  [ex, ex, ex, ex, ex, ex, ex, exM,ex, ex, ex, exM,exD,ex, ex, ex],
  [ex, exD,ex, ex, exM,ex, ex, ex, ex, ex, ex, ex, ex, ex, ex, exD],
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
