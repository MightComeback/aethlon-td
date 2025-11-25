import { SeededRandom, generateSeed } from "@/utils/SeededRandom";
import { TileType, type MapData } from "@/types/map";
import { generatePath } from "./PathGenerator";
import {
  buildExclusionZone,
  getAvailableTiles,
  placeWaterClusters,
  placeBlockedClusters,
  generateHeightmap,
} from "./TerrainGenerator";
import { placeObjects } from "./ObjectPlacer";

export interface GeneratorConfig {
  seed?: string;
  width?: number;
  height?: number;
}

export interface GeneratedMap {
  mapData: MapData;
  seed: string;
}

// Default map sizes
const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 15;

/**
 * Create an empty tile grid initialized to Ground
 */
function createTileGrid(width: number, height: number): TileType[][] {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => TileType.Ground)
  );
}

/**
 * Apply path tiles to the grid
 */
function applyPathToGrid(
  tiles: TileType[][],
  pathTiles: Array<{ x: number; y: number }>,
  spawn: { x: number; y: number },
  exit: { x: number; y: number }
): void {
  // Set all path tiles
  for (const tile of pathTiles) {
    tiles[tile.x]![tile.y] = TileType.Path;
  }

  // Set spawn and exit (overwrite path)
  tiles[spawn.x]![spawn.y] = TileType.Spawn;
  tiles[exit.x]![exit.y] = TileType.Exit;
}

/**
 * Generate a complete, playable map from a seed.
 * Same seed + same dimensions = identical map output.
 */
export function generateMap(config: GeneratorConfig = {}): GeneratedMap {
  // Use provided seed or generate one
  const seed = config.seed || generateSeed();
  const width = config.width || DEFAULT_WIDTH;
  const height = config.height || DEFAULT_HEIGHT;

  // Validate dimensions
  const clampedWidth = Math.max(10, Math.min(50, width));
  const clampedHeight = Math.max(8, Math.min(30, height));

  // Initialize RNG with seed
  const rng = new SeededRandom(seed);

  // 1. Create empty tile grid
  const tiles = createTileGrid(clampedWidth, clampedHeight);

  // 2. Generate path with spawn and exit
  const { pathTiles, waypoints, spawn, exit } = generatePath(
    rng,
    clampedWidth,
    clampedHeight
  );

  // 3. Apply path to tile grid
  applyPathToGrid(tiles, pathTiles, spawn, exit);

  // 4. Build exclusion zone around path
  const excluded = buildExclusionZone(pathTiles, clampedWidth, clampedHeight);

  // 5. Get tiles available for obstacles
  const available = getAvailableTiles(clampedWidth, clampedHeight, excluded);

  // 6. Place water clusters (5-12% coverage)
  const waterCoverage = 0.05 + rng.next() * 0.07;
  const waterTiles = placeWaterClusters(
    rng,
    tiles,
    available,
    clampedWidth,
    clampedHeight,
    waterCoverage
  );

  // 7. Place blocked clusters (3-8% coverage)
  const blockedCoverage = 0.03 + rng.next() * 0.05;
  placeBlockedClusters(
    rng,
    tiles,
    available,
    clampedWidth,
    clampedHeight,
    waterTiles,
    blockedCoverage
  );

  // 8. Generate heightmap
  const heightmap = generateHeightmap(rng, tiles, clampedWidth, clampedHeight);

  // 9. Place decorative objects (8-12% density)
  const objectDensity = 0.08 + rng.next() * 0.04;
  const objects = placeObjects(
    rng,
    tiles,
    clampedWidth,
    clampedHeight,
    objectDensity
  );

  // 10. Build MapData
  const now = Date.now();
  const mapData: MapData = {
    id: crypto.randomUUID(),
    name: `Generated (${seed})`,
    width: clampedWidth,
    height: clampedHeight,
    tiles,
    heightmap,
    waypoints,
    spawnPoints: [spawn],
    exitPoints: [exit],
    objects,
    createdAt: now,
    updatedAt: now,
    isCustom: true,
  };

  return { mapData, seed };
}

// Re-export seed generator for convenience
export { generateSeed };
