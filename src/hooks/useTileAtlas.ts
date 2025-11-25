/**
 * Tile Atlas Texture Loading Hook
 * Loads and configures the tile atlas texture for pixel art rendering
 */

import * as THREE from "three";
import { useEffect, useState } from "react";
import { ATLAS_SIZE, TILE_PIXEL_SIZE } from "@/data/textures/tileAtlasConfig";
import { TileType } from "@/types/map";
import { BIOME_DEFINITIONS, DEFAULT_BIOME, type BiomeType } from "@/data/biomes/definitions";

// Get tile colors from current biome
function getTileColors(biome: BiomeType = DEFAULT_BIOME): Record<TileType, string> {
  const colors = BIOME_DEFINITIONS[biome].colors;
  return {
    [TileType.Ground]: colors.ground,
    [TileType.Path]: colors.path,
    [TileType.Water]: colors.water,
    [TileType.Blocked]: colors.blocked,
    [TileType.Spawn]: "#ffffff",
    [TileType.Exit]: "#ff4444",
  };
}

/**
 * Load the tile atlas texture from file
 * Configures for pixel art rendering (nearest neighbor filtering)
 */
export function useTileAtlas(): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Try to load the texture, fall back to generated if not found
    const loader = new THREE.TextureLoader();

    loader.load(
      "/textures/tile-atlas.png",
      (loadedTexture) => {
        configureTextureForPixelArt(loadedTexture);
        setTexture(loadedTexture);
      },
      undefined,
      () => {
        // Texture not found, generate one
        console.log("Tile atlas not found, generating procedurally...");
        const generatedTexture = generateTileAtlas();
        setTexture(generatedTexture);
      }
    );

    return () => {
      if (texture) {
        texture.dispose();
      }
    };
  }, []);

  return texture;
}

/**
 * Configure a texture for pixel art rendering
 */
function configureTextureForPixelArt(texture: THREE.Texture): void {
  // Nearest neighbor for crisp pixels
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestMipmapLinearFilter;

  // Generate mipmaps for LOD
  texture.generateMipmaps = true;

  // Prevent texture bleeding at edges
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // Correct color space
  texture.colorSpace = THREE.SRGBColorSpace;

  texture.needsUpdate = true;
}

/**
 * Generate a tile atlas texture procedurally
 * Creates base tiles and transition variants with marching squares
 */
export function generateTileAtlas(biome: BiomeType = DEFAULT_BIOME): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_SIZE;
  canvas.height = ATLAS_SIZE;

  const ctx = canvas.getContext("2d")!;

  // Fill with black background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);

  const TILE_COLORS = getTileColors(biome);

  const tileTypes: TileType[] = [
    TileType.Ground,
    TileType.Path,
    TileType.Water,
    TileType.Blocked,
    TileType.Spawn,
    TileType.Exit,
  ];

  // Row 0: Base tiles
  tileTypes.forEach((type, index) => {
    drawBaseTile(ctx, index, 0, TILE_COLORS[type]);
  });

  // Rows 1+: Transition tiles
  // Generate transitions between tile type pairs
  const transitionPairs: [TileType, TileType, number][] = [
    [TileType.Ground, TileType.Path, 1],
    [TileType.Ground, TileType.Water, 2],
    [TileType.Ground, TileType.Blocked, 3],
    [TileType.Ground, TileType.Spawn, 4],
    [TileType.Ground, TileType.Exit, 5],
    [TileType.Path, TileType.Water, 6],
    [TileType.Path, TileType.Blocked, 7],
    [TileType.Path, TileType.Spawn, 8],
    [TileType.Path, TileType.Exit, 9],
    [TileType.Water, TileType.Blocked, 10],
    [TileType.Exit, TileType.Spawn, 11],
  ];

  for (const [baseType, blendType, row] of transitionPairs) {
    const baseColor = TILE_COLORS[baseType];
    const blendColor = TILE_COLORS[blendType];

    // Generate 16 marching squares variants (columns 0-15)
    for (let marchingIndex = 0; marchingIndex < 16; marchingIndex++) {
      drawTransitionTile(ctx, marchingIndex, row, baseColor, blendColor, marchingIndex);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  configureTextureForPixelArt(texture);

  return texture;
}

/**
 * Draw a solid base tile at the specified atlas position
 */
function drawBaseTile(
  ctx: CanvasRenderingContext2D,
  col: number,
  row: number,
  color: string
): void {
  const x = col * TILE_PIXEL_SIZE;
  const y = row * TILE_PIXEL_SIZE;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, TILE_PIXEL_SIZE, TILE_PIXEL_SIZE);

  // Add subtle noise/dither for texture
  addPixelNoise(ctx, x, y, TILE_PIXEL_SIZE, color, 0.1);
}

/**
 * Draw a transition tile with marching squares blending
 *
 * Marching index bits:
 *   N(1)
 * W(8) X E(2)
 *   S(4)
 */
function drawTransitionTile(
  ctx: CanvasRenderingContext2D,
  col: number,
  row: number,
  baseColor: string,
  blendColor: string,
  marchingIndex: number
): void {
  const x = col * TILE_PIXEL_SIZE;
  const y = row * TILE_PIXEL_SIZE;

  // First fill with base color
  ctx.fillStyle = baseColor;
  ctx.fillRect(x, y, TILE_PIXEL_SIZE, TILE_PIXEL_SIZE);

  // Parse marching index bits
  const hasNorth = (marchingIndex & 1) !== 0;
  const hasEast = (marchingIndex & 2) !== 0;
  const hasSouth = (marchingIndex & 4) !== 0;
  const hasWest = (marchingIndex & 8) !== 0;

  const blendWidth = Math.floor(TILE_PIXEL_SIZE * 0.35); // 35% blend zone

  // Draw gradient blends for each active edge
  if (hasNorth) {
    drawEdgeGradient(ctx, x, y, TILE_PIXEL_SIZE, blendWidth, baseColor, blendColor, "north");
  }
  if (hasSouth) {
    drawEdgeGradient(ctx, x, y + TILE_PIXEL_SIZE - blendWidth, TILE_PIXEL_SIZE, blendWidth, baseColor, blendColor, "south");
  }
  if (hasWest) {
    drawEdgeGradient(ctx, x, y, blendWidth, TILE_PIXEL_SIZE, baseColor, blendColor, "west");
  }
  if (hasEast) {
    drawEdgeGradient(ctx, x + TILE_PIXEL_SIZE - blendWidth, y, blendWidth, TILE_PIXEL_SIZE, baseColor, blendColor, "east");
  }

  // Add subtle noise for texture
  addPixelNoise(ctx, x, y, TILE_PIXEL_SIZE, baseColor, 0.08);
}

/**
 * Draw a gradient blend at an edge
 */
function drawEdgeGradient(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  baseColor: string,
  blendColor: string,
  direction: "north" | "south" | "east" | "west"
): void {
  const baseRGB = hexToRGB(baseColor);
  const blendRGB = hexToRGB(blendColor);

  // Draw pixel by pixel for dithered gradient effect
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      // Calculate blend factor based on direction
      let factor: number;

      switch (direction) {
        case "north":
          factor = 1 - (py / height);
          break;
        case "south":
          factor = py / height;
          break;
        case "west":
          factor = 1 - (px / width);
          break;
        case "east":
          factor = px / width;
          break;
      }

      // Apply smoothstep for nicer falloff
      factor = smoothstep(0, 1, factor);

      // Dithering: add noise to factor for pixel art effect
      const noise = (Math.random() - 0.5) * 0.2;
      const ditheredFactor = Math.max(0, Math.min(1, factor + noise));

      // Interpolate color
      const r = Math.round(baseRGB.r + (blendRGB.r - baseRGB.r) * ditheredFactor);
      const g = Math.round(baseRGB.g + (blendRGB.g - baseRGB.g) * ditheredFactor);
      const b = Math.round(baseRGB.b + (blendRGB.b - baseRGB.b) * ditheredFactor);

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x + px, y + py, 1, 1);
    }
  }
}

/**
 * Add subtle pixel noise to a tile for texture
 */
function addPixelNoise(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  baseColor: string,
  intensity: number
): void {
  const baseRGB = hexToRGB(baseColor);

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      // Random chance to modify pixel
      if (Math.random() < 0.3) {
        const variation = (Math.random() - 0.5) * 2 * intensity * 255;
        const r = Math.max(0, Math.min(255, baseRGB.r + variation));
        const g = Math.max(0, Math.min(255, baseRGB.g + variation));
        const b = Math.max(0, Math.min(255, baseRGB.b + variation));

        ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        ctx.fillRect(x + px, y + py, 1, 1);
      }
    }
  }
}

/**
 * Convert hex color to RGB object
 */
function hexToRGB(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1] ?? "0", 16),
    g: parseInt(result[2] ?? "0", 16),
    b: parseInt(result[3] ?? "0", 16),
  };
}

/**
 * Smoothstep interpolation
 */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
