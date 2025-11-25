import type { SeededRandom } from "@/utils/SeededRandom";
import { TileType, type PlacedObject } from "@/types/map";
import type { PlaceableObjectType } from "@/stores/editorStore";
import { type Point, getNeighbors, isInBounds } from "./PathGenerator";

// Object types and their weights for random selection
const OBJECT_WEIGHTS: { type: PlaceableObjectType; weight: number }[] = [
  { type: "tree_pine", weight: 0.20 },
  { type: "tree_oak", weight: 0.20 },
  { type: "rock", weight: 0.20 },
  { type: "bush", weight: 0.18 },
  { type: "grass", weight: 0.15 },
  { type: "flower", weight: 0.07 },
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
 * Select a random object type using weighted probabilities
 */
function selectObjectType(rng: SeededRandom): PlaceableObjectType {
  const types = OBJECT_WEIGHTS.map((o) => o.type);
  const weights = OBJECT_WEIGHTS.map((o) => o.weight);
  return rng.weightedPick(types, weights);
}

/**
 * Place decorative objects on the map
 */
export function placeObjects(
  rng: SeededRandom,
  tiles: TileType[][],
  width: number,
  height: number,
  density: number = 0.10
): PlacedObject[] {
  const objects: PlacedObject[] = [];
  const validTiles = getValidObjectTiles(tiles, width, height);

  // Calculate number of objects to place
  const objectCount = Math.floor(validTiles.length * density);

  // Shuffle and pick tiles
  rng.shuffle(validTiles);
  const selectedTiles = validTiles.slice(0, objectCount);

  for (const tile of selectedTiles) {
    const type = selectObjectType(rng);

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
