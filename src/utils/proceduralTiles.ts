/**
 * Procedural Tile Generator
 * Creates detailed 256x256 pixel art tiles with natural variation
 * Inspired by Heroes of Hammerwatch style
 */

import { PALETTES } from "./pixelArt";

const TILE_SIZE = 256;

// Color helpers
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function lerpColor(
  c1: [number, number, number],
  c2: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ];
}

// Seeded random for reproducible tiles
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Simple noise function
function noise2D(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

// Fractal noise for more organic patterns
function fractalNoise(x: number, y: number, seed: number, octaves: number = 4): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += noise2D(x * frequency, y * frequency, seed + i * 100) * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / maxValue;
}

/**
 * Generate a detailed grass tile
 */
export function generateGrassTile(seed: number = 0): ImageData {
  const data = new Uint8ClampedArray(TILE_SIZE * TILE_SIZE * 4);
  const rand = seededRandom(seed);
  const p = PALETTES.nature;

  // Pre-convert colors
  const colors = {
    darkest: hexToRgb(p.grassDarkest),
    dark: hexToRgb(p.grassDark),
    base: hexToRgb(p.grass),
    mid: hexToRgb(p.grassMid),
    light: hexToRgb(p.grassLight),
    highlight: hexToRgb(p.grassHighlight),
    yellow: hexToRgb(p.grassYellow),
  };

  // First pass: base grass color with noise
  for (let y = 0; y < TILE_SIZE; y++) {
    for (let x = 0; x < TILE_SIZE; x++) {
      const idx = (y * TILE_SIZE + x) * 4;

      // Multi-octave noise for natural variation
      const n = fractalNoise(x / 32, y / 32, seed, 4);

      // Choose base color based on noise
      let color: [number, number, number];
      if (n < 0.3) {
        color = lerpColor(colors.darkest, colors.dark, n / 0.3);
      } else if (n < 0.5) {
        color = lerpColor(colors.dark, colors.base, (n - 0.3) / 0.2);
      } else if (n < 0.7) {
        color = lerpColor(colors.base, colors.mid, (n - 0.5) / 0.2);
      } else {
        color = lerpColor(colors.mid, colors.light, (n - 0.7) / 0.3);
      }

      data[idx] = color[0];
      data[idx + 1] = color[1];
      data[idx + 2] = color[2];
      data[idx + 3] = 255;
    }
  }

  // Second pass: add grass blade details
  const numBlades = 800;
  for (let i = 0; i < numBlades; i++) {
    const bladeX = Math.floor(rand() * TILE_SIZE);
    const bladeY = Math.floor(rand() * TILE_SIZE);
    const bladeHeight = Math.floor(rand() * 6) + 3;
    const bladeColor = rand() > 0.7 ? colors.highlight : rand() > 0.5 ? colors.light : colors.mid;

    // Draw blade (vertical line with slight curve)
    const curve = (rand() - 0.5) * 2;
    for (let h = 0; h < bladeHeight; h++) {
      const px = Math.floor(bladeX + curve * h * 0.3);
      const py = bladeY - h;
      if (px >= 0 && px < TILE_SIZE && py >= 0 && py < TILE_SIZE) {
        const idx = (py * TILE_SIZE + px) * 4;
        // Blend with existing color
        const t = h / bladeHeight; // Lighter at tip
        const tipColor = rand() > 0.3 ? colors.highlight : colors.yellow;
        const finalColor = lerpColor(bladeColor, tipColor, t * 0.5);
        data[idx] = finalColor[0];
        data[idx + 1] = finalColor[1];
        data[idx + 2] = finalColor[2];
      }
    }
  }

  // Third pass: add small flower/detail dots
  const numDots = 40;
  for (let i = 0; i < numDots; i++) {
    const dotX = Math.floor(rand() * TILE_SIZE);
    const dotY = Math.floor(rand() * TILE_SIZE);
    const idx = (dotY * TILE_SIZE + dotX) * 4;

    // Random tiny flowers - yellow, white, or red dots
    const flowerType = rand();
    if (flowerType < 0.5) {
      // Yellow flower
      data[idx] = 255;
      data[idx + 1] = 220;
      data[idx + 2] = 80;
    } else if (flowerType < 0.8) {
      // White flower
      data[idx] = 240;
      data[idx + 1] = 240;
      data[idx + 2] = 230;
    } else {
      // Red flower
      data[idx] = 200;
      data[idx + 1] = 60;
      data[idx + 2] = 60;
    }
  }

  return new ImageData(data, TILE_SIZE, TILE_SIZE);
}

/**
 * Generate a detailed dirt/path tile
 */
export function generateDirtTile(seed: number = 0): ImageData {
  const data = new Uint8ClampedArray(TILE_SIZE * TILE_SIZE * 4);
  const rand = seededRandom(seed);
  const p = PALETTES.nature;

  const colors = {
    darkest: hexToRgb(p.dirtDarkest),
    dark: hexToRgb(p.dirtDark),
    base: hexToRgb(p.dirt),
    mid: hexToRgb(p.dirtMid),
    light: hexToRgb(p.dirtLight),
    highlight: hexToRgb(p.dirtHighlight),
  };

  // Base dirt with noise
  for (let y = 0; y < TILE_SIZE; y++) {
    for (let x = 0; x < TILE_SIZE; x++) {
      const idx = (y * TILE_SIZE + x) * 4;

      const n = fractalNoise(x / 24, y / 24, seed, 3);

      let color: [number, number, number];
      if (n < 0.25) {
        color = lerpColor(colors.darkest, colors.dark, n / 0.25);
      } else if (n < 0.45) {
        color = lerpColor(colors.dark, colors.base, (n - 0.25) / 0.2);
      } else if (n < 0.65) {
        color = lerpColor(colors.base, colors.mid, (n - 0.45) / 0.2);
      } else if (n < 0.85) {
        color = lerpColor(colors.mid, colors.light, (n - 0.65) / 0.2);
      } else {
        color = lerpColor(colors.light, colors.highlight, (n - 0.85) / 0.15);
      }

      data[idx] = color[0];
      data[idx + 1] = color[1];
      data[idx + 2] = color[2];
      data[idx + 3] = 255;
    }
  }

  // Add pebbles and texture details
  const numPebbles = 60;
  for (let i = 0; i < numPebbles; i++) {
    const px = Math.floor(rand() * TILE_SIZE);
    const py = Math.floor(rand() * TILE_SIZE);
    const size = Math.floor(rand() * 3) + 1;
    const isDark = rand() > 0.5;
    const pebbleColor = isDark ? colors.dark : colors.light;

    for (let dy = -size; dy <= size; dy++) {
      for (let dx = -size; dx <= size; dx++) {
        if (dx * dx + dy * dy <= size * size) {
          const nx = px + dx;
          const ny = py + dy;
          if (nx >= 0 && nx < TILE_SIZE && ny >= 0 && ny < TILE_SIZE) {
            const idx = (ny * TILE_SIZE + nx) * 4;
            data[idx] = pebbleColor[0];
            data[idx + 1] = pebbleColor[1];
            data[idx + 2] = pebbleColor[2];
          }
        }
      }
    }
  }

  // Add some grass tufts at edges (sparse)
  const grassColors = {
    dark: hexToRgb(p.grassDark),
    base: hexToRgb(p.grass),
  };

  const numGrassTufts = 30;
  for (let i = 0; i < numGrassTufts; i++) {
    const tx = Math.floor(rand() * TILE_SIZE);
    const ty = Math.floor(rand() * TILE_SIZE);

    for (let h = 0; h < 4; h++) {
      const py = ty - h;
      if (py >= 0 && py < TILE_SIZE && tx >= 0 && tx < TILE_SIZE) {
        const idx = (py * TILE_SIZE + tx) * 4;
        const color = h < 2 ? grassColors.dark : grassColors.base;
        data[idx] = color[0];
        data[idx + 1] = color[1];
        data[idx + 2] = color[2];
      }
    }
  }

  return new ImageData(data, TILE_SIZE, TILE_SIZE);
}

/**
 * Generate a detailed water tile
 */
export function generateWaterTile(seed: number = 0): ImageData {
  const data = new Uint8ClampedArray(TILE_SIZE * TILE_SIZE * 4);
  const p = PALETTES.nature;

  const colors = {
    darkest: hexToRgb(p.waterDarkest),
    dark: hexToRgb(p.waterDark),
    base: hexToRgb(p.water),
    mid: hexToRgb(p.waterMid),
    light: hexToRgb(p.waterLight),
    highlight: hexToRgb(p.waterHighlight),
  };

  // Water with wave pattern
  for (let y = 0; y < TILE_SIZE; y++) {
    for (let x = 0; x < TILE_SIZE; x++) {
      const idx = (y * TILE_SIZE + x) * 4;

      // Create wave pattern
      const wave1 = Math.sin((x + y * 0.5) / 16) * 0.5 + 0.5;
      const wave2 = Math.sin((x * 0.7 - y * 0.3) / 12) * 0.5 + 0.5;
      const n = (wave1 + wave2 + fractalNoise(x / 40, y / 40, seed, 2)) / 3;

      let color: [number, number, number];
      if (n < 0.3) {
        color = lerpColor(colors.darkest, colors.dark, n / 0.3);
      } else if (n < 0.5) {
        color = lerpColor(colors.dark, colors.base, (n - 0.3) / 0.2);
      } else if (n < 0.7) {
        color = lerpColor(colors.base, colors.mid, (n - 0.5) / 0.2);
      } else if (n < 0.85) {
        color = lerpColor(colors.mid, colors.light, (n - 0.7) / 0.15);
      } else {
        color = lerpColor(colors.light, colors.highlight, (n - 0.85) / 0.15);
      }

      data[idx] = color[0];
      data[idx + 1] = color[1];
      data[idx + 2] = color[2];
      data[idx + 3] = 255;
    }
  }

  return new ImageData(data, TILE_SIZE, TILE_SIZE);
}

/**
 * Generate a stone/blocked tile
 */
export function generateStoneTile(seed: number = 0): ImageData {
  const data = new Uint8ClampedArray(TILE_SIZE * TILE_SIZE * 4);
  const rand = seededRandom(seed);
  const p = PALETTES.nature;

  const colors = {
    darkest: hexToRgb(p.stoneDarkest),
    dark: hexToRgb(p.stoneDark),
    base: hexToRgb(p.stone),
    mid: hexToRgb(p.stoneMid),
    light: hexToRgb(p.stoneLight),
    highlight: hexToRgb(p.stoneHighlight),
  };

  // Base stone with noise
  for (let y = 0; y < TILE_SIZE; y++) {
    for (let x = 0; x < TILE_SIZE; x++) {
      const idx = (y * TILE_SIZE + x) * 4;

      const n = fractalNoise(x / 20, y / 20, seed, 3);

      let color: [number, number, number];
      if (n < 0.3) {
        color = lerpColor(colors.darkest, colors.dark, n / 0.3);
      } else if (n < 0.5) {
        color = lerpColor(colors.dark, colors.base, (n - 0.3) / 0.2);
      } else if (n < 0.7) {
        color = lerpColor(colors.base, colors.mid, (n - 0.5) / 0.2);
      } else {
        color = lerpColor(colors.mid, colors.light, (n - 0.7) / 0.3);
      }

      data[idx] = color[0];
      data[idx + 1] = color[1];
      data[idx + 2] = color[2];
      data[idx + 3] = 255;
    }
  }

  // Add cracks
  const numCracks = 8;
  for (let i = 0; i < numCracks; i++) {
    let cx = Math.floor(rand() * TILE_SIZE);
    let cy = Math.floor(rand() * TILE_SIZE);
    const length = Math.floor(rand() * 30) + 10;

    for (let j = 0; j < length; j++) {
      if (cx >= 0 && cx < TILE_SIZE && cy >= 0 && cy < TILE_SIZE) {
        const idx = (cy * TILE_SIZE + cx) * 4;
        data[idx] = colors.darkest[0];
        data[idx + 1] = colors.darkest[1];
        data[idx + 2] = colors.darkest[2];
      }
      cx += Math.floor(rand() * 3) - 1;
      cy += Math.floor(rand() * 3) - 1;
    }
  }

  return new ImageData(data, TILE_SIZE, TILE_SIZE);
}

/**
 * Generate spawn tile (dark red/crimson)
 */
export function generateSpawnTile(seed: number = 0): ImageData {
  const data = new Uint8ClampedArray(TILE_SIZE * TILE_SIZE * 4);
  const p = PALETTES.fantasy;

  const colors = {
    darkest: hexToRgb(p.spawnDark),
    dark: hexToRgb(p.spawn),
    mid: hexToRgb(p.spawnMid),
    light: hexToRgb(p.spawnLight),
  };

  for (let y = 0; y < TILE_SIZE; y++) {
    for (let x = 0; x < TILE_SIZE; x++) {
      const idx = (y * TILE_SIZE + x) * 4;

      const n = fractalNoise(x / 24, y / 24, seed, 3);

      // Pulsing pattern from center
      const cx = x - TILE_SIZE / 2;
      const cy = y - TILE_SIZE / 2;
      const dist = Math.sqrt(cx * cx + cy * cy) / (TILE_SIZE / 2);
      const pulse = Math.sin(dist * 8 + n * 4) * 0.2 + 0.5;

      let color: [number, number, number];
      const combined = (n + pulse) / 2;
      if (combined < 0.35) {
        color = lerpColor(colors.darkest, colors.dark, combined / 0.35);
      } else if (combined < 0.6) {
        color = lerpColor(colors.dark, colors.mid, (combined - 0.35) / 0.25);
      } else {
        color = lerpColor(colors.mid, colors.light, (combined - 0.6) / 0.4);
      }

      data[idx] = color[0];
      data[idx + 1] = color[1];
      data[idx + 2] = color[2];
      data[idx + 3] = 255;
    }
  }

  return new ImageData(data, TILE_SIZE, TILE_SIZE);
}

/**
 * Generate exit tile (golden)
 */
export function generateExitTile(seed: number = 0): ImageData {
  const data = new Uint8ClampedArray(TILE_SIZE * TILE_SIZE * 4);
  const p = PALETTES.fantasy;

  const colors = {
    darkest: hexToRgb(p.exitDark),
    dark: hexToRgb(p.exit),
    mid: hexToRgb(p.exitMid),
    light: hexToRgb(p.exitLight),
    highlight: hexToRgb(p.exitHighlight),
  };

  for (let y = 0; y < TILE_SIZE; y++) {
    for (let x = 0; x < TILE_SIZE; x++) {
      const idx = (y * TILE_SIZE + x) * 4;

      const n = fractalNoise(x / 24, y / 24, seed, 3);

      // Radial glow from center
      const cx = x - TILE_SIZE / 2;
      const cy = y - TILE_SIZE / 2;
      const dist = Math.sqrt(cx * cx + cy * cy) / (TILE_SIZE / 2);
      const glow = 1 - Math.min(1, dist);

      let color: [number, number, number];
      const combined = (n + glow) / 2;
      if (combined < 0.25) {
        color = lerpColor(colors.darkest, colors.dark, combined / 0.25);
      } else if (combined < 0.45) {
        color = lerpColor(colors.dark, colors.mid, (combined - 0.25) / 0.2);
      } else if (combined < 0.65) {
        color = lerpColor(colors.mid, colors.light, (combined - 0.45) / 0.2);
      } else {
        color = lerpColor(colors.light, colors.highlight, (combined - 0.65) / 0.35);
      }

      data[idx] = color[0];
      data[idx + 1] = color[1];
      data[idx + 2] = color[2];
      data[idx + 3] = 255;
    }
  }

  return new ImageData(data, TILE_SIZE, TILE_SIZE);
}

/**
 * Create a canvas from ImageData
 */
export function imageDataToCanvas(imageData: ImageData): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Generate all tile types and return as canvases
 */
export function generateAllTiles(seed: number = 42): {
  grass: HTMLCanvasElement;
  dirt: HTMLCanvasElement;
  water: HTMLCanvasElement;
  stone: HTMLCanvasElement;
  spawn: HTMLCanvasElement;
  exit: HTMLCanvasElement;
} {
  return {
    grass: imageDataToCanvas(generateGrassTile(seed)),
    dirt: imageDataToCanvas(generateDirtTile(seed + 1)),
    water: imageDataToCanvas(generateWaterTile(seed + 2)),
    stone: imageDataToCanvas(generateStoneTile(seed + 3)),
    spawn: imageDataToCanvas(generateSpawnTile(seed + 4)),
    exit: imageDataToCanvas(generateExitTile(seed + 5)),
  };
}

export const PROCEDURAL_TILE_SIZE = TILE_SIZE;
