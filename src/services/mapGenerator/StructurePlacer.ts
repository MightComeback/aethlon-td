/**
 * Structure Placer
 * Handles placement of multi-tile structures during map generation
 */

import type { SeededRandom } from "@/utils/SeededRandom";
import { TileType, type PlacedObject } from "@/types/map";
import { type Point, isInBounds, getNeighbors } from "./PathGenerator";
import {
  STRUCTURE_DEFINITIONS,
  getStructuresForBiome,
} from "@/data/structures/definitions";
import type { BiomeType } from "@/data/biomes/definitions";

/**
 * Check if a structure can be placed at position
 * Validates all footprint tiles are valid for placement
 */
export function canPlaceStructure(
  x: number,
  y: number,
  footprint: [number, number],
  tiles: TileType[][],
  occupied: Set<string>,
  width: number,
  height: number,
  requireGround: boolean = true
): boolean {
  const [w, h] = footprint;

  for (let dx = 0; dx < w; dx++) {
    for (let dy = 0; dy < h; dy++) {
      const tx = x + dx;
      const ty = y + dy;

      // Check bounds
      if (!isInBounds(tx, ty, width, height)) return false;

      // Check if already occupied
      if (occupied.has(`${tx},${ty}`)) return false;

      // Check tile type if required
      if (requireGround) {
        const tileType = tiles[tx]?.[ty];
        if (tileType !== TileType.Ground) return false;
      }
    }
  }

  return true;
}

/**
 * Mark structure footprint as occupied
 */
export function markOccupied(
  x: number,
  y: number,
  footprint: [number, number],
  occupied: Set<string>
): void {
  const [w, h] = footprint;
  for (let dx = 0; dx < w; dx++) {
    for (let dy = 0; dy < h; dy++) {
      occupied.add(`${x + dx},${y + dy}`);
    }
  }
}

/**
 * Find tiles adjacent to path for village placement
 */
function findPathAdjacentTiles(
  tiles: TileType[][],
  width: number,
  height: number
): Point[] {
  const adjacent: Point[] = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (tiles[x]?.[y] !== TileType.Ground) continue;

      // Check if any neighbor is path
      const neighbors = getNeighbors({ x, y });
      const hasPathNeighbor = neighbors.some((n) => {
        if (!isInBounds(n.x, n.y, width, height)) return false;
        const type = tiles[n.x]?.[n.y];
        return type === TileType.Path || type === TileType.Spawn || type === TileType.Exit;
      });

      if (hasPathNeighbor) {
        adjacent.push({ x, y });
      }
    }
  }

  return adjacent;
}

/**
 * Place a village cluster of structures
 * Returns placed structures
 */
export function placeVillage(
  rng: SeededRandom,
  tiles: TileType[][],
  width: number,
  height: number,
  biome: BiomeType,
  occupied: Set<string>
): PlacedObject[] {
  const structures: PlacedObject[] = [];
  const pathAdjacentTiles = findPathAdjacentTiles(tiles, width, height);

  if (pathAdjacentTiles.length === 0) return structures;

  // Select village center
  const centerIndex = Math.floor(rng.next() * pathAdjacentTiles.length);
  const center = pathAdjacentTiles[centerIndex];
  if (!center) return structures;

  // Get available structures for biome
  const availableStructures = getStructuresForBiome(biome).filter(
    (s) => s.category === "building" || s.category === "village"
  );

  if (availableStructures.length === 0) return structures;

  // Place 3-7 buildings in village
  const buildingCount = 3 + Math.floor(rng.next() * 5);
  const maxAttempts = buildingCount * 10;
  let attempts = 0;

  while (structures.length < buildingCount && attempts < maxAttempts) {
    attempts++;

    // Select random structure weighted by rarity
    const types = availableStructures.map((s) => s.id);
    const weights = availableStructures.map((s) => s.rarity);
    const structureId = rng.weightedPick(types, weights);
    const definition = STRUCTURE_DEFINITIONS[structureId];
    if (!definition) continue;

    // Find placement near center (within 8-tile radius)
    const angle = rng.next() * Math.PI * 2;
    const distance = rng.nextFloat(2, 8);
    const px = Math.round(center.x + Math.cos(angle) * distance);
    const py = Math.round(center.y + Math.sin(angle) * distance);

    // Validate placement
    if (!canPlaceStructure(
      px,
      py,
      definition.footprint,
      tiles,
      occupied,
      width,
      height,
      true
    )) {
      continue;
    }

    // Check distance from other structures (min 2-tile spacing)
    let tooClose = false;
    for (const existing of structures) {
      const dist = Math.hypot(existing.x - px, existing.y - py);
      if (dist < 3) {
        tooClose = true;
        break;
      }
    }
    if (tooClose) continue;

    // Place structure
    markOccupied(px, py, definition.footprint, occupied);
    structures.push({
      id: `village-${px}-${py}`,
      type: structureId,
      x: px,
      y: py,
      scale: 1,
      rotation: 0,
      footprint: definition.footprint,
    });
  }

  return structures;
}

/**
 * Place bridges over water along paths
 */
export function placeBridges(
  rng: SeededRandom,
  tiles: TileType[][],
  pathTiles: Point[],
  width: number,
  height: number,
  occupied: Set<string>
): PlacedObject[] {
  const bridges: PlacedObject[] = [];
  const bridgeDef = STRUCTURE_DEFINITIONS["bridge"];
  if (!bridgeDef) return bridges;

  // Find path tiles on water
  for (const tile of pathTiles) {
    const tileType = tiles[tile.x]?.[tile.y];
    if (tileType !== TileType.Water) continue;

    // Check neighbors to determine bridge orientation
    const neighbors = getNeighbors(tile);
    let horizontal = false;
    let vertical = false;

    for (const n of neighbors) {
      if (!isInBounds(n.x, n.y, width, height)) continue;
      const nType = tiles[n.x]?.[n.y];
      if (nType === TileType.Path || nType === TileType.Water) {
        if (n.x !== tile.x) horizontal = true;
        if (n.y !== tile.y) vertical = true;
      }
    }

    // Skip if not a crossing
    if (!horizontal && !vertical) continue;

    // Orient bridge
    const footprint: [number, number] = horizontal ? [3, 1] : [1, 3];

    // Try to place centered on water tile
    const anchorX = horizontal ? tile.x - 1 : tile.x;
    const anchorY = vertical ? tile.y - 1 : tile.y;

    if (
      canPlaceStructure(
        anchorX,
        anchorY,
        footprint,
        tiles,
        occupied,
        width,
        height,
        false // Don't require ground - bridges go over water
      )
    ) {
      markOccupied(anchorX, anchorY, footprint, occupied);
      bridges.push({
        id: `bridge-${anchorX}-${anchorY}`,
        type: "bridge",
        x: anchorX,
        y: anchorY,
        scale: 1,
        rotation: horizontal ? Math.PI / 2 : 0,
        footprint,
      });
    }
  }

  return bridges;
}

/**
 * Place structures across the map
 * Main entry point for structure generation
 */
export function placeStructures(
  rng: SeededRandom,
  tiles: TileType[][],
  pathTiles: Point[],
  width: number,
  height: number,
  biome: BiomeType,
  scaleFactor: number
): PlacedObject[] {
  const structures: PlacedObject[] = [];
  const occupied = new Set<string>();

  // 1. Place bridges over water (infrastructure)
  const bridges = placeBridges(rng, tiles, pathTiles, width, height, occupied);
  structures.push(...bridges);

  // 2. Place villages (1-3 depending on map size)
  const villageCount = Math.max(1, Math.floor(scaleFactor * 0.6));
  for (let i = 0; i < villageCount; i++) {
    const village = placeVillage(rng, tiles, width, height, biome, occupied);
    structures.push(...village);
  }

  // 3. Place scattered structures (piers, walls, etc.)
  const scatteredCount = Math.floor(scaleFactor * 2);
  const scatteredStructures = getStructuresForBiome(biome).filter(
    (s) => s.category === "infrastructure" && s.id !== "bridge"
  );

  for (let i = 0; i < scatteredCount; i++) {
    if (scatteredStructures.length === 0) break;

    const types = scatteredStructures.map((s) => s.id);
    const weights = scatteredStructures.map((s) => s.rarity);
    const structureId = rng.weightedPick(types, weights);
    const definition = STRUCTURE_DEFINITIONS[structureId];
    if (!definition) continue;

    // Try to place randomly
    const maxAttempts = 20;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const px = Math.floor(rng.next() * width);
      const py = Math.floor(rng.next() * height);

      if (
        canPlaceStructure(
          px,
          py,
          definition.footprint,
          tiles,
          occupied,
          width,
          height,
          true
        )
      ) {
        markOccupied(px, py, definition.footprint, occupied);
        structures.push({
          id: `struct-${px}-${py}`,
          type: structureId,
          x: px,
          y: py,
          scale: 1,
          rotation: rng.nextFloat(0, Math.PI * 2),
          footprint: definition.footprint,
        });
        break;
      }
    }
  }

  return structures;
}

/**
 * Get all occupied tiles from placed structures
 */
export function getOccupiedTiles(structures: PlacedObject[]): Set<string> {
  const occupied = new Set<string>();

  for (const structure of structures) {
    if (!structure.footprint) continue;

    const [w, h] = structure.footprint;
    for (let dx = 0; dx < w; dx++) {
      for (let dy = 0; dy < h; dy++) {
        occupied.add(`${structure.x + dx},${structure.y + dy}`);
      }
    }
  }

  return occupied;
}
