import type { SeededRandom } from "@/utils/SeededRandom";
import { TileType } from "@/types/map";
import { type Point, getNeighbors8, isInBounds } from "./PathGenerator";

/**
 * Build a set of tiles that should be excluded from obstacle placement
 * (path tiles + 1-tile buffer around them)
 */
export function buildExclusionZone(
  pathTiles: Point[],
  width: number,
  height: number
): Set<string> {
  const excluded = new Set<string>();

  for (const tile of pathTiles) {
    // Add the path tile itself
    excluded.add(`${tile.x},${tile.y}`);

    // Add all 8-directional neighbors as buffer
    for (const neighbor of getNeighbors8(tile)) {
      if (isInBounds(neighbor.x, neighbor.y, width, height)) {
        excluded.add(`${neighbor.x},${neighbor.y}`);
      }
    }
  }

  return excluded;
}

/**
 * Get all available tiles for obstacle placement
 */
export function getAvailableTiles(
  width: number,
  height: number,
  excluded: Set<string>
): Point[] {
  const available: Point[] = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const key = `${x},${y}`;
      if (!excluded.has(key)) {
        available.push({ x, y });
      }
    }
  }

  return available;
}

/**
 * Place water clusters on the map
 * Uses flood-fill from seed points to create organic shapes
 */
export function placeWaterClusters(
  rng: SeededRandom,
  tiles: TileType[][],
  available: Point[],
  width: number,
  height: number,
  coverage: number = 0.08
): Set<string> {
  const waterTiles = new Set<string>();
  const targetCount = Math.floor(available.length * coverage);
  let placedCount = 0;

  // Shuffle available tiles to pick random seed points
  const shuffled = [...available];
  rng.shuffle(shuffled);

  let seedIndex = 0;

  while (placedCount < targetCount && seedIndex < shuffled.length) {
    const seed = shuffled[seedIndex]!;
    seedIndex++;

    // Skip if already water
    if (waterTiles.has(`${seed.x},${seed.y}`)) continue;

    // Grow a cluster from this seed
    const clusterSize = rng.nextInt(3, 8);
    const cluster = growCluster(
      rng,
      seed,
      clusterSize,
      width,
      height,
      waterTiles,
      tiles
    );

    for (const tile of cluster) {
      const key = `${tile.x},${tile.y}`;
      if (!waterTiles.has(key)) {
        waterTiles.add(key);
        tiles[tile.x]![tile.y] = TileType.Water;
        placedCount++;
      }
    }
  }

  return waterTiles;
}

/**
 * Place blocked (rock/cliff) clusters on the map
 */
export function placeBlockedClusters(
  rng: SeededRandom,
  tiles: TileType[][],
  available: Point[],
  width: number,
  height: number,
  waterTiles: Set<string>,
  coverage: number = 0.05
): Set<string> {
  const blockedTiles = new Set<string>();

  // Filter out water tiles from available
  const remainingAvailable = available.filter(
    (p) => !waterTiles.has(`${p.x},${p.y}`)
  );

  const targetCount = Math.floor(remainingAvailable.length * coverage);
  let placedCount = 0;

  const shuffled = [...remainingAvailable];
  rng.shuffle(shuffled);

  let seedIndex = 0;

  while (placedCount < targetCount && seedIndex < shuffled.length) {
    const seed = shuffled[seedIndex]!;
    seedIndex++;

    if (blockedTiles.has(`${seed.x},${seed.y}`)) continue;

    // Smaller clusters for blocked areas
    const clusterSize = rng.nextInt(2, 5);
    const cluster = growCluster(
      rng,
      seed,
      clusterSize,
      width,
      height,
      new Set([...waterTiles, ...blockedTiles]),
      tiles
    );

    for (const tile of cluster) {
      const key = `${tile.x},${tile.y}`;
      if (!blockedTiles.has(key) && !waterTiles.has(key)) {
        blockedTiles.add(key);
        tiles[tile.x]![tile.y] = TileType.Blocked;
        placedCount++;
      }
    }
  }

  return blockedTiles;
}

/**
 * Grow a cluster from a seed point using flood-fill
 */
function growCluster(
  rng: SeededRandom,
  seed: Point,
  maxSize: number,
  width: number,
  height: number,
  occupied: Set<string>,
  tiles: TileType[][]
): Point[] {
  const cluster: Point[] = [seed];
  const inCluster = new Set<string>([`${seed.x},${seed.y}`]);

  while (cluster.length < maxSize) {
    // Get all valid expansion candidates
    const candidates: Point[] = [];

    for (const tile of cluster) {
      for (const neighbor of getNeighbors8(tile)) {
        if (!isInBounds(neighbor.x, neighbor.y, width, height)) continue;

        const key = `${neighbor.x},${neighbor.y}`;
        if (inCluster.has(key)) continue;
        if (occupied.has(key)) continue;

        // Only expand into ground tiles
        if (tiles[neighbor.x]![neighbor.y] !== TileType.Ground) continue;

        candidates.push(neighbor);
      }
    }

    if (candidates.length === 0) break;

    // Pick a random candidate
    const chosen = rng.pick(candidates);
    cluster.push(chosen);
    inCluster.add(`${chosen.x},${chosen.y}`);
  }

  return cluster;
}

/**
 * Generate heightmap using grid-sampled interpolation
 */
export function generateHeightmap(
  rng: SeededRandom,
  tiles: TileType[][],
  width: number,
  height: number
): number[][] {
  const heightmap: number[][] = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => 0)
  );

  // 1. Create low-resolution sample grid (every 4 tiles)
  const sampleInterval = 4;
  const samplesX = Math.ceil(width / sampleInterval) + 1;
  const samplesY = Math.ceil(height / sampleInterval) + 1;

  const samples: number[][] = Array.from({ length: samplesX }, () =>
    Array.from({ length: samplesY }, () => rng.nextInt(0, 3))
  );

  // 2. Bilinear interpolate to full resolution
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const sampleX = x / sampleInterval;
      const sampleY = y / sampleInterval;

      const x0 = Math.floor(sampleX);
      const y0 = Math.floor(sampleY);
      const x1 = Math.min(x0 + 1, samplesX - 1);
      const y1 = Math.min(y0 + 1, samplesY - 1);

      const fx = sampleX - x0;
      const fy = sampleY - y0;

      // Bilinear interpolation
      const v00 = samples[x0]![y0]!;
      const v10 = samples[x1]![y0]!;
      const v01 = samples[x0]![y1]!;
      const v11 = samples[x1]![y1]!;

      const v0 = v00 * (1 - fx) + v10 * fx;
      const v1 = v01 * (1 - fx) + v11 * fx;
      const value = v0 * (1 - fy) + v1 * fy;

      heightmap[x]![y] = Math.round(value);
    }
  }

  // 3. Apply tile-type modifiers
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const tileType = tiles[x]![y];

      switch (tileType) {
        case TileType.Water:
          heightmap[x]![y] = 0;
          break;
        case TileType.Path:
        case TileType.Spawn:
        case TileType.Exit:
          heightmap[x]![y] = Math.min(heightmap[x]![y]!, 1);
          break;
        case TileType.Blocked:
          heightmap[x]![y] = Math.max(heightmap[x]![y]!, 3);
          break;
      }
    }
  }

  return heightmap;
}
