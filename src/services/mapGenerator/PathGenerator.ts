import type { SeededRandom } from "@/utils/SeededRandom";
import type { Waypoint } from "@/types/map";

export interface Point {
  x: number;
  y: number;
}

export interface PathResult {
  pathTiles: Point[];
  waypoints: Waypoint[];
  spawn: Point;
  exit: Point;
}

/**
 * Generate a path from spawn to exit using control points and Bresenham lines.
 * Guarantees 100% connectivity with no diagonal jumps.
 * Path width scales with map size for larger maps.
 */
export function generatePath(
  rng: SeededRandom,
  width: number,
  height: number,
  scaleFactor: number = 1
): PathResult {
  // Calculate path width based on scale (1 for small maps, up to 12 for epic)
  const pathWidth = Math.max(1, Math.floor(scaleFactor / 2));

  // 1. Place spawn on left edge (Y in middle 60% of height)
  const marginY = Math.floor(height * 0.2);
  const spawnY = rng.nextInt(marginY, height - marginY - 1);
  const spawn: Point = { x: 0, y: spawnY };

  // 2. Place exit on right edge
  const exitY = rng.nextInt(marginY, height - marginY - 1);
  const exit: Point = { x: width - 1, y: exitY };

  // 3. Generate control points for interesting path shape
  // More control points on larger maps for more interesting paths
  const baseControlPoints = rng.nextInt(2, 4);
  const extraControlPoints = Math.floor(scaleFactor / 5);
  const numControlPoints = baseControlPoints + extraControlPoints;
  const controlPoints: Point[] = [spawn];

  for (let i = 1; i <= numControlPoints; i++) {
    // X positions evenly distributed with some randomness
    const baseX = Math.floor((i / (numControlPoints + 1)) * width);
    const xOffset = rng.nextInt(-2, 2) * Math.ceil(scaleFactor / 2);
    const x = Math.max(1, Math.min(width - 2, baseX + xOffset));

    // Y alternates between upper and lower regions for S-curves
    const isUpper = i % 2 === 1;
    const regionStart = isUpper ? 1 : Math.floor(height * 0.5);
    const regionEnd = isUpper ? Math.floor(height * 0.5) : height - 2;
    const y = rng.nextInt(regionStart, regionEnd);

    controlPoints.push({ x, y });
  }

  controlPoints.push(exit);

  // 4. Connect control points using Bresenham line algorithm
  const pathTiles: Point[] = [];
  const visited = new Set<string>();

  for (let i = 0; i < controlPoints.length - 1; i++) {
    const from = controlPoints[i]!;
    const to = controlPoints[i + 1]!;
    const lineTiles = bresenhamLine(from, to);

    for (const tile of lineTiles) {
      // Add the center tile and expand for path width
      const expandedTiles = expandPath(tile, pathWidth, width, height);
      for (const expanded of expandedTiles) {
        const key = `${expanded.x},${expanded.y}`;
        if (!visited.has(key)) {
          visited.add(key);
          pathTiles.push(expanded);
        }
      }
    }
  }

  // 5. Convert control points to waypoints (key points for enemy movement)
  // Only use spawn, control points, and exit - not every path tile
  const waypoints: Waypoint[] = controlPoints.map((p, i) => ({
    x: p.x,
    y: p.y,
    order: i,
  }));

  return { pathTiles, waypoints, spawn, exit };
}

/**
 * Expand a single path tile into a wider path
 */
function expandPath(center: Point, width: number, mapWidth: number, mapHeight: number): Point[] {
  if (width <= 1) return [center];

  const tiles: Point[] = [];
  const halfWidth = Math.floor(width / 2);

  for (let dx = -halfWidth; dx <= halfWidth; dx++) {
    for (let dy = -halfWidth; dy <= halfWidth; dy++) {
      const x = center.x + dx;
      const y = center.y + dy;
      if (isInBounds(x, y, mapWidth, mapHeight)) {
        tiles.push({ x, y });
      }
    }
  }

  return tiles;
}

/**
 * Bresenham's line algorithm for 4-connected path (no diagonals).
 * Returns array of points from start to end.
 */
function bresenhamLine(from: Point, to: Point): Point[] {
  const points: Point[] = [];
  let x = from.x;
  let y = from.y;
  const dx = Math.abs(to.x - x);
  const dy = Math.abs(to.y - y);
  const sx = x < to.x ? 1 : -1;
  const sy = y < to.y ? 1 : -1;

  // Modified Bresenham for 4-connectivity (no diagonals)
  if (dx > dy) {
    // Primarily horizontal
    let err = dx / 2;
    while (x !== to.x) {
      points.push({ x, y });
      err -= dy;
      if (err < 0) {
        y += sy;
        points.push({ x, y }); // Add vertical step
        err += dx;
      }
      x += sx;
    }
  } else {
    // Primarily vertical
    let err = dy / 2;
    while (y !== to.y) {
      points.push({ x, y });
      err -= dx;
      if (err < 0) {
        x += sx;
        points.push({ x, y }); // Add horizontal step
        err += dy;
      }
      y += sy;
    }
  }

  points.push({ x: to.x, y: to.y });
  return points;
}

/**
 * Check if a point is within map bounds
 */
export function isInBounds(x: number, y: number, width: number, height: number): boolean {
  return x >= 0 && x < width && y >= 0 && y < height;
}

/**
 * Get all 4-directional neighbors of a point
 */
export function getNeighbors(p: Point): Point[] {
  return [
    { x: p.x - 1, y: p.y },
    { x: p.x + 1, y: p.y },
    { x: p.x, y: p.y - 1 },
    { x: p.x, y: p.y + 1 },
  ];
}

/**
 * Get all 8-directional neighbors of a point (including diagonals)
 */
export function getNeighbors8(p: Point): Point[] {
  return [
    { x: p.x - 1, y: p.y },
    { x: p.x + 1, y: p.y },
    { x: p.x, y: p.y - 1 },
    { x: p.x, y: p.y + 1 },
    { x: p.x - 1, y: p.y - 1 },
    { x: p.x + 1, y: p.y - 1 },
    { x: p.x - 1, y: p.y + 1 },
    { x: p.x + 1, y: p.y + 1 },
  ];
}
