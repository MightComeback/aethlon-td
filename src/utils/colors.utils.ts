import { TileType } from "@/types/map";
import { BIOME_DEFINITIONS, DEFAULT_BIOME, type BiomeType } from "@/data/biomes/definitions";

export function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount));
  const b = Math.min(255, Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00ff) * (1 - amount)));
  const b = Math.max(0, Math.floor((num & 0x0000ff) * (1 - amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function interpolateColor(hex1: string, hex2: string, t: number): string {
  const num1 = parseInt(hex1.slice(1), 16);
  const num2 = parseInt(hex2.slice(1), 16);

  const r1 = num1 >> 16, g1 = (num1 >> 8) & 0xff, b1 = num1 & 0xff;
  const r2 = num2 >> 16, g2 = (num2 >> 8) & 0xff, b2 = num2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function floodFill(
  startX: number,
  startY: number,
  tiles: TileType[][],
  fillType: TileType,
  setTile: (x: number, y: number, type: TileType) => void,
  width: number,
  height: number
) {
  const targetType = tiles[startX]?.[startY];
  if (targetType === undefined || targetType === fillType) return;

  const stack: Array<[number, number]> = [[startX, startY]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    const key = `${x},${y}`;

    if (visited.has(key)) continue;
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    if (tiles[x]?.[y] !== targetType) continue;

    visited.add(key);
    setTile(x, y, fillType);

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
}

// Current active biome (can be changed at runtime)
let currentBiome: BiomeType = DEFAULT_BIOME;

export function setCurrentBiome(biome: BiomeType): void {
  currentBiome = biome;
}

export function getCurrentBiome(): BiomeType {
  return currentBiome;
}

export function getTileColor(type: TileType, isHovered: boolean, biome?: BiomeType): string {
  const activeBiome = biome || currentBiome;
  const biomeColors = BIOME_DEFINITIONS[activeBiome].colors;

  // Map tile types to biome colors
  const baseColors: Record<TileType, string> = {
    [TileType.Ground]: biomeColors.ground,
    [TileType.Path]: biomeColors.path,
    [TileType.Water]: biomeColors.water,
    [TileType.Blocked]: biomeColors.blocked,
    [TileType.Spawn]: "#ffffff", // Always white for visibility
    [TileType.Exit]: "#ff4444", // Always red for visibility
  };

  const color = baseColors[type] || biomeColors.ground;

  if (isHovered) {
    return lightenColor(color, 0.3);
  }

  return color;
}

/**
 * Get all tile colors for current biome
 */
export function getBiomeTileColors(biome?: BiomeType): Record<TileType, string> {
  const activeBiome = biome || currentBiome;
  const biomeColors = BIOME_DEFINITIONS[activeBiome].colors;

  return {
    [TileType.Ground]: biomeColors.ground,
    [TileType.Path]: biomeColors.path,
    [TileType.Water]: biomeColors.water,
    [TileType.Blocked]: biomeColors.blocked,
    [TileType.Spawn]: "#ffffff",
    [TileType.Exit]: "#ff4444",
  };
}




