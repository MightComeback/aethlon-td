import type { SeededRandom } from "@/utils/SeededRandom";
import { TileType, type PlacedObject } from "@/types/map";
import { type Point, getNeighbors, isInBounds } from "./PathGenerator";
import {
  BIOME_DEFINITIONS,
  DEFAULT_BIOME,
  type BiomeType,
  type BiomeObjectWeight,
} from "@/data/biomes/definitions";

// Default grassland weights (fallback)
const DEFAULT_OBJECT_WEIGHTS: BiomeObjectWeight[] = [
  { type: "tree_pine", weight: 0.2 },
  { type: "tree_oak", weight: 0.2 },
  { type: "rock", weight: 0.15 },
  { type: "bush", weight: 0.15 },
  { type: "grass", weight: 0.15 },
  { type: "flower", weight: 0.1 },
  { type: "fence", weight: 0.03 },
  { type: "house", weight: 0.02 },
];

/**
 * Check if a tile is adjacent to path (any 4-directional neighbor is path/spawn/exit)
 */
function isAdjacentToPath(
  x: number,
  y: number,
  tiles: TileType[][],
  width: number,
  height: number
): boolean {
  const neighbors = getNeighbors({ x, y });

  for (const n of neighbors) {
    if (!isInBounds(n.x, n.y, width, height)) continue;

    const tileType = tiles[n.x]![n.y];
    if (
      tileType === TileType.Path ||
      tileType === TileType.Spawn ||
      tileType === TileType.Exit
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Get valid tiles for object placement
 * - Must be Ground tile
 * - Must NOT be adjacent to path (leave room for towers)
 */
function getValidObjectTiles(
  tiles: TileType[][],
  width: number,
  height: number
): Point[] {
  const valid: Point[] = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (tiles[x]![y] !== TileType.Ground) continue;
      if (isAdjacentToPath(x, y, tiles, width, height)) continue;
      valid.push({ x, y });
    }
  }

  return valid;
}

/**
 * Select a random object type using weighted probabilities for a biome
 */
function selectObjectType(
  rng: SeededRandom,
  biome: BiomeType = DEFAULT_BIOME
): string {
  const biomeData = BIOME_DEFINITIONS[biome];
  const weights = biomeData?.objectWeights || DEFAULT_OBJECT_WEIGHTS;

  const types = weights.map((o) => o.type);
  const weightValues = weights.map((o) => o.weight);

  return rng.weightedPick(types, weightValues);
}

/**
 * Place decorative objects on the map
 * Now supports biome-aware object placement
 */
export function placeObjects(
  rng: SeededRandom,
  tiles: TileType[][],
  width: number,
  height: number,
  density?: number,
  biome: BiomeType = DEFAULT_BIOME
): PlacedObject[] {
  const objects: PlacedObject[] = [];
  const validTiles = getValidObjectTiles(tiles, width, height);

  // Use biome-specific density if not provided
  const biomeData = BIOME_DEFINITIONS[biome];
  const effectiveDensity = density ?? biomeData?.objectDensity ?? 0.1;

  // Calculate number of objects to place
  const objectCount = Math.floor(validTiles.length * effectiveDensity);

  // Shuffle and pick tiles
  rng.shuffle(validTiles);
  const selectedTiles = validTiles.slice(0, objectCount);

  // Track structure placement to avoid clustering
  const structureTiles = new Set<string>();

  for (const tile of selectedTiles) {
    const type = selectObjectType(rng, biome);

    // For structures (houses, windmills, etc.), ensure spacing
    const isStructure = [
      "house",
      "windmill",
      "cabin",
      "well",
      "tent",
      "igloo",
      "obelisk",
    ].includes(type);

    if (isStructure) {
      // Check if any structure is within 3 tiles
      let tooClose = false;
      for (let dx = -3; dx <= 3; dx++) {
        for (let dy = -3; dy <= 3; dy++) {
          if (structureTiles.has(`${tile.x + dx},${tile.y + dy}`)) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) break;
      }
      if (tooClose) continue;
      structureTiles.add(`${tile.x},${tile.y}`);
    }

    objects.push({
      id: `gen-${tile.x}-${tile.y}`,
      type,
      x: tile.x,
      y: tile.y,
      scale: rng.nextFloat(0.85, 1.15),
      rotation: rng.nextFloat(0, Math.PI * 2),
    });
  }

  return objects;
}

/**
 * Get biome-specific object weights
 */
export function getBiomeObjectWeights(biome: BiomeType): BiomeObjectWeight[] {
  return BIOME_DEFINITIONS[biome]?.objectWeights || DEFAULT_OBJECT_WEIGHTS;
}
