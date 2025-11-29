/**
 * Pixel Art Generator Utility
 * Generates pixel art sprites as ImageData or Canvas textures
 * Designed for LLM-friendly sprite definitions
 */

// Common color palettes for consistent art style
export const PALETTES = {
  // Nature palette (grass, trees, dirt)
  nature: {
    transparent: "transparent",
    black: "#1a1c2c",
    darkBrown: "#41362a",
    brown: "#5d4e37",
    lightBrown: "#8a7056",
    tan: "#c2a67a",
    darkGreen: "#1e4d2b",
    green: "#2d6e3f",
    lightGreen: "#4da65a",
    paleGreen: "#8fce7e",
    darkBlue: "#1b3b5a",
    blue: "#2d5a87",
    lightBlue: "#5b8bb4",
    paleBlue: "#9ecae1",
    gray: "#5a5a6e",
    lightGray: "#8b8b9e",
    white: "#e8e8eb",
  },

  // Stone/dungeon palette
  stone: {
    transparent: "transparent",
    black: "#1a1c2c",
    darkGray: "#333344",
    gray: "#555566",
    mediumGray: "#777788",
    lightGray: "#999aab",
    paleGray: "#bbbccd",
    white: "#ddddef",
    darkBrown: "#3d2b1f",
    brown: "#5c4333",
    rust: "#8b5a3c",
  },

  // Fantasy/magic palette
  fantasy: {
    transparent: "transparent",
    black: "#1a1c2c",
    purple: "#5d3a7a",
    magenta: "#9b4dca",
    pink: "#e056a0",
    red: "#c93038",
    orange: "#e87b2c",
    yellow: "#f7d854",
    gold: "#daa520",
    cyan: "#4fc1c9",
    teal: "#2a9d8f",
  },
} as const;

export type PaletteKey = keyof typeof PALETTES;
export type ColorKey<P extends PaletteKey> = keyof (typeof PALETTES)[P];

/**
 * Sprite definition - a 2D array of color keys
 * Use "_" for transparent pixels
 */
export type SpriteData<P extends PaletteKey> = (ColorKey<P> | "_")[][];

/**
 * Animation definition - multiple frames
 */
export interface AnimationDef<P extends PaletteKey> {
  frames: SpriteData<P>[];
  frameTime: number; // ms per frame
  loop: boolean;
}

/**
 * Convert sprite data to ImageData
 */
export function spriteToImageData<P extends PaletteKey>(
  sprite: SpriteData<P>,
  palette: P,
  scale: number = 1
): ImageData {
  const height = sprite.length;
  const width = sprite[0]?.length ?? 0;
  const colors = PALETTES[palette];

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  const data = new Uint8ClampedArray(scaledWidth * scaledHeight * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const colorKey = sprite[y]?.[x];
      if (!colorKey || colorKey === "_") continue;

      const colorHex = colors[colorKey as keyof typeof colors];
      if (!colorHex || colorHex === "transparent") continue;

      const { r, g, b } = hexToRgb(colorHex as string);

      // Fill scaled pixels
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          const idx = ((y * scale + sy) * scaledWidth + (x * scale + sx)) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
    }
  }

  return new ImageData(data, scaledWidth, scaledHeight);
}

/**
 * Convert sprite data to Canvas
 */
export function spriteToCanvas<P extends PaletteKey>(
  sprite: SpriteData<P>,
  palette: P,
  scale: number = 1
): HTMLCanvasElement {
  const imageData = spriteToImageData(sprite, palette, scale);
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Convert sprite data to Data URL (for use as texture src)
 */
export function spriteToDataURL<P extends PaletteKey>(
  sprite: SpriteData<P>,
  palette: P,
  scale: number = 1
): string {
  return spriteToCanvas(sprite, palette, scale).toDataURL();
}

/**
 * Create a tile with optional variations using noise
 */
export function generateTileVariation<P extends PaletteKey>(
  baseSprite: SpriteData<P>,
  variationColors: [ColorKey<P>, ColorKey<P>][],
  seed: number = Math.random()
): SpriteData<P> {
  const result: SpriteData<P> = [];

  for (let y = 0; y < baseSprite.length; y++) {
    const row: (ColorKey<P> | "_")[] = [];
    for (let x = 0; x < (baseSprite[y]?.length ?? 0); x++) {
      const pixel = baseSprite[y]?.[x];
      if (!pixel) {
        row.push("_");
        continue;
      }

      // Check if this pixel should be varied
      let finalPixel = pixel;
      for (const [from, to] of variationColors) {
        if (pixel === from) {
          // Simple noise based on position and seed
          const noise = Math.sin(x * 12.9898 + y * 78.233 + seed * 43758.5453) * 0.5 + 0.5;
          if (noise > 0.5) {
            finalPixel = to;
          }
          break;
        }
      }
      row.push(finalPixel);
    }
    result.push(row);
  }

  return result;
}

/**
 * Combine multiple sprites into a sprite sheet
 */
export function createSpriteSheet<P extends PaletteKey>(
  sprites: SpriteData<P>[],
  palette: P,
  columns: number,
  scale: number = 1
): HTMLCanvasElement {
  if (sprites.length === 0) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas;
  }

  const spriteHeight = sprites[0]!.length * scale;
  const spriteWidth = (sprites[0]![0]?.length ?? 0) * scale;
  const rows = Math.ceil(sprites.length / columns);

  const canvas = document.createElement("canvas");
  canvas.width = columns * spriteWidth;
  canvas.height = rows * spriteHeight;
  const ctx = canvas.getContext("2d")!;

  sprites.forEach((sprite, i) => {
    const x = (i % columns) * spriteWidth;
    const y = Math.floor(i / columns) * spriteHeight;
    const spriteCanvas = spriteToCanvas(sprite, palette, scale);
    ctx.drawImage(spriteCanvas, x, y);
  });

  return canvas;
}

/**
 * Generate auto-tile data for seamless transitions
 * Returns 16 tile variations for all edge combinations
 */
export function generateAutoTileSet<P extends PaletteKey>(
  baseTile: SpriteData<P>,
  edgeColor: ColorKey<P>,
  cornerSize: number = 4
): SpriteData<P>[] {
  const size = baseTile.length;
  const tiles: SpriteData<P>[] = [];

  // Generate all 16 combinations (4 bits: top, right, bottom, left)
  for (let mask = 0; mask < 16; mask++) {
    const hasTop = (mask & 1) !== 0;
    const hasRight = (mask & 2) !== 0;
    const hasBottom = (mask & 4) !== 0;
    const hasLeft = (mask & 8) !== 0;

    const tile: SpriteData<P> = [];
    for (let y = 0; y < size; y++) {
      const row: (ColorKey<P> | "_")[] = [];
      for (let x = 0; x < size; x++) {
        const basePixel = baseTile[y]?.[x] ?? "_";

        // Check if this pixel is on an edge that should be modified
        const isTopEdge = y < cornerSize && !hasTop;
        const isBottomEdge = y >= size - cornerSize && !hasBottom;
        const isLeftEdge = x < cornerSize && !hasLeft;
        const isRightEdge = x >= size - cornerSize && !hasRight;

        if (isTopEdge || isBottomEdge || isLeftEdge || isRightEdge) {
          row.push(edgeColor);
        } else {
          row.push(basePixel);
        }
      }
      tile.push(row);
    }
    tiles.push(tile);
  }

  return tiles;
}

// Utility: hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

/**
 * Mirror sprite horizontally
 */
export function mirrorHorizontal<P extends PaletteKey>(
  sprite: SpriteData<P>
): SpriteData<P> {
  return sprite.map((row) => [...row].reverse());
}

/**
 * Mirror sprite vertically
 */
export function mirrorVertical<P extends PaletteKey>(
  sprite: SpriteData<P>
): SpriteData<P> {
  return [...sprite].reverse();
}

/**
 * Rotate sprite 90 degrees clockwise
 */
export function rotate90<P extends PaletteKey>(
  sprite: SpriteData<P>
): SpriteData<P> {
  const height = sprite.length;
  const width = sprite[0]?.length ?? 0;
  const result: SpriteData<P> = [];

  for (let x = 0; x < width; x++) {
    const row: (ColorKey<P> | "_")[] = [];
    for (let y = height - 1; y >= 0; y--) {
      row.push(sprite[y]?.[x] ?? "_");
    }
    result.push(row);
  }

  return result;
}
