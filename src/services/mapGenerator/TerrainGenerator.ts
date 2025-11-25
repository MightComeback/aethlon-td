import type { SeededRandom } from "@/utils/SeededRandom";
import { TileType } from "@/types/map";
import { type Point, getNeighbors8, isInBounds } from "./PathGenerator";

/**
 * Build a set of tiles that should be excluded from obstacle placement
 * (path tiles + buffer around them, buffer scales with map size)
 */
export function buildExclusionZone(
  pathTiles: Point[],
  width: number,
  height: number,
  scaleFactor: number = 1
): Set<string> {
  const excluded = new Set<string>();
  // Buffer size scales with map size (1 for small, up to 6 for epic)
  const bufferSize = Math.max(1, Math.floor(scaleFactor / 4));

  for (const tile of pathTiles) {
    // Add the path tile itself and surrounding buffer
    for (let dx = -bufferSize; dx <= bufferSize; dx++) {
      for (let dy = -bufferSize; dy <= bufferSize; dy++) {
        const x = tile.x + dx;
        const y = tile.y + dy;
        if (isInBounds(x, y, width, height)) {
          excluded.add(`${x},${y}`);
        }
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
 * Cluster sizes scale with map size for larger rivers/lakes
 */
export function placeWaterClusters(
  rng: SeededRandom,
  tiles: TileType[][],
  available: Point[],
  width: number,
  height: number,
  coverage: number = 0.08,
  scaleFactor: number = 1
): Set<string> {
  const waterTiles = new Set<string>();
  const targetCount = Math.floor(available.length * coverage);
  let placedCount = 0;

  // Shuffle available tiles to pick random seed points
  const shuffled = [...available];
  rng.shuffle(shuffled);

  let seedIndex = 0;

  // Scale cluster sizes with map size
  // Small map: 3-8, Epic map: 30-150
  const minClusterSize = Math.floor(3 * scaleFactor);
  const maxClusterSize = Math.floor(8 * scaleFactor);

  while (placedCount < targetCount && seedIndex < shuffled.length) {
    const seed = shuffled[seedIndex]!;
    seedIndex++;

    // Skip if already water
    if (waterTiles.has(`${seed.x},${seed.y}`)) continue;

    // Grow a cluster from this seed (scaled size)
    const clusterSize = rng.nextInt(minClusterSize, maxClusterSize);
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
 * Cluster sizes scale with map size
 */
export function placeBlockedClusters(
  rng: SeededRandom,
  tiles: TileType[][],
  available: Point[],
  width: number,
  height: number,
  waterTiles: Set<string>,
  coverage: number = 0.05,
  scaleFactor: number = 1
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

  // Scale cluster sizes with map size
  // Small map: 2-5, Epic map: 20-100
  const minClusterSize = Math.floor(2 * scaleFactor);
  const maxClusterSize = Math.floor(5 * scaleFactor);

  while (placedCount < targetCount && seedIndex < shuffled.length) {
    const seed = shuffled[seedIndex]!;
    seedIndex++;

    if (blockedTiles.has(`${seed.x},${seed.y}`)) continue;

    // Scaled cluster size for blocked areas
    const clusterSize = rng.nextInt(minClusterSize, maxClusterSize);
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

interface MountainPeak {
  x: number;
  y: number;
  height: number;
  radius: number;
}

interface MountainPass {
  x: number;
  y: number;
  width: number;
}

/**
 * Generate heightmap using multi-layered noise with mountains and passes
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

  // 1. Base terrain layer - gentle rolling hills
  const baseLayer = generateBaseTerrainLayer(rng, width, height);

  // 2. Generate mountain peaks (2-6 peaks depending on map size)
  const peaks = generateMountainPeaks(rng, width, height, tiles);

  // 3. Generate mountain passes (corridors between peaks)
  const passes = generateMountainPasses(rng, width, height, peaks);

  // 4. Combine layers
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Start with base terrain
      let height = baseLayer[x]![y]!;

      // Add mountain influences
      let maxMountainInfluence = 0;
      for (const peak of peaks) {
        const influence = getMountainInfluence(x, y, peak);
        maxMountainInfluence = Math.max(maxMountainInfluence, influence);
      }

      // Reduce mountain height in passes
      let passReduction = 0;
      for (const pass of passes) {
        const passInfluence = getPassInfluence(x, y, pass);
        passReduction = Math.max(passReduction, passInfluence);
      }

      // Combine: base + mountains - passes
      height = height + maxMountainInfluence * (1 - passReduction * 0.7);

      // Clamp to reasonable range (0-10)
      heightmap[x]![y] = Math.max(0, Math.min(10, Math.round(height)));
    }
  }

  // 5. Apply tile-type modifiers
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
          // Paths are relatively flat but can have slight elevation
          heightmap[x]![y] = Math.min(heightmap[x]![y]!, 2);
          break;
        case TileType.Blocked:
          // Blocked areas are elevated
          heightmap[x]![y] = Math.max(heightmap[x]![y]!, 4);
          break;
      }
    }
  }

  return heightmap;
}

/**
 * Generate base terrain layer using multi-octave noise
 */
function generateBaseTerrainLayer(
  rng: SeededRandom,
  width: number,
  height: number
): number[][] {
  const layer: number[][] = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => 0)
  );

  // Create multiple octaves of noise for natural-looking terrain
  const octaves = [
    { interval: 8, amplitude: 1.5 },
    { interval: 16, amplitude: 1.0 },
    { interval: 32, amplitude: 0.5 },
  ];

  for (const octave of octaves) {
    const samplesX = Math.ceil(width / octave.interval) + 1;
    const samplesY = Math.ceil(height / octave.interval) + 1;

    // Generate random samples for this octave
    const samples: number[][] = Array.from({ length: samplesX }, () =>
      Array.from({ length: samplesY }, () => rng.nextFloat(-1, 1))
    );

    // Interpolate and add to layer
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const value = bilinearSample(samples, x, y, octave.interval, samplesX, samplesY);
        layer[x]![y] = layer[x]![y]! + value * octave.amplitude;
      }
    }
  }

  return layer;
}

/**
 * Bilinear sampling from a grid
 */
function bilinearSample(
  samples: number[][],
  x: number,
  y: number,
  interval: number,
  samplesX: number,
  samplesY: number
): number {
  const sampleX = x / interval;
  const sampleY = y / interval;

  const x0 = Math.floor(sampleX);
  const y0 = Math.floor(sampleY);
  const x1 = Math.min(x0 + 1, samplesX - 1);
  const y1 = Math.min(y0 + 1, samplesY - 1);

  const fx = sampleX - x0;
  const fy = sampleY - y0;

  const v00 = samples[x0]![y0]!;
  const v10 = samples[x1]![y0]!;
  const v01 = samples[x0]![y1]!;
  const v11 = samples[x1]![y1]!;

  const v0 = v00 * (1 - fx) + v10 * fx;
  const v1 = v01 * (1 - fx) + v11 * fx;
  return v0 * (1 - fy) + v1 * fy;
}

/**
 * Generate mountain peaks across the map
 */
function generateMountainPeaks(
  rng: SeededRandom,
  width: number,
  height: number,
  tiles: TileType[][]
): MountainPeak[] {
  const peaks: MountainPeak[] = [];

  // Number of peaks scales with map size
  const area = width * height;
  const peakDensity = 1 / 800; // 1 peak per 800 tiles
  const numPeaks = Math.max(2, Math.min(12, Math.floor(area * peakDensity)));

  // Generate peaks at semi-random locations, avoiding paths
  for (let i = 0; i < numPeaks; i++) {
    let attempts = 0;
    let validPeak = false;
    let px = 0, py = 0;

    // Try to find a valid location (not on path)
    while (!validPeak && attempts < 50) {
      px = rng.nextInt(Math.floor(width * 0.1), Math.floor(width * 0.9));
      py = rng.nextInt(Math.floor(height * 0.1), Math.floor(height * 0.9));

      // Check if too close to existing peaks
      let tooClose = false;
      for (const peak of peaks) {
        const dx = px - peak.x;
        const dy = py - peak.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < Math.min(width, height) * 0.15) {
          tooClose = true;
          break;
        }
      }

      if (!tooClose && tiles[px]![py] === TileType.Ground) {
        validPeak = true;
      }
      attempts++;
    }

    if (validPeak) {
      peaks.push({
        x: px,
        y: py,
        height: rng.nextFloat(5, 8),
        radius: rng.nextFloat(
          Math.min(width, height) * 0.1,
          Math.min(width, height) * 0.2
        ),
      });
    }
  }

  return peaks;
}

/**
 * Generate mountain passes between peaks
 */
function generateMountainPasses(
  rng: SeededRandom,
  width: number,
  height: number,
  peaks: MountainPeak[]
): MountainPass[] {
  const passes: MountainPass[] = [];

  if (peaks.length < 2) return passes;

  // Create passes between some peak pairs
  const numPasses = Math.max(1, Math.floor(peaks.length * 0.6));

  for (let i = 0; i < numPasses; i++) {
    // Pick two random peaks
    const peak1 = rng.pick(peaks);
    const peak2 = rng.pick(peaks.filter(p => p !== peak1));

    // Create a pass between them (midpoint)
    const midX = Math.floor((peak1.x + peak2.x) / 2);
    const midY = Math.floor((peak1.y + peak2.y) / 2);

    passes.push({
      x: midX,
      y: midY,
      width: rng.nextFloat(
        Math.min(width, height) * 0.08,
        Math.min(width, height) * 0.15
      ),
    });
  }

  return passes;
}

/**
 * Calculate mountain influence at a point using smooth falloff
 */
function getMountainInfluence(x: number, y: number, peak: MountainPeak): number {
  const dx = x - peak.x;
  const dy = y - peak.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > peak.radius) return 0;

  // Smooth falloff using cosine interpolation
  const t = distance / peak.radius;
  const falloff = (Math.cos(t * Math.PI) + 1) / 2; // 1 at center, 0 at edge

  return peak.height * falloff;
}

/**
 * Calculate pass influence (reduces mountain height)
 */
function getPassInfluence(x: number, y: number, pass: MountainPass): number {
  const dx = x - pass.x;
  const dy = y - pass.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > pass.width) return 0;

  // Smooth reduction
  const t = distance / pass.width;
  return (Math.cos(t * Math.PI) + 1) / 2; // 1 at center, 0 at edge
}
