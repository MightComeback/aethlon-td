import { TileType, type MapData } from "@/types/map";

function createTileGrid(
  width: number,
  height: number,
  defaultTile: TileType = TileType.Ground
): TileType[][] {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => defaultTile)
  );
}

function createHeightmap(width: number, height: number): number[][] {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => 0)
  );
}

// Helper to set a path on the tile grid
function setPath(
  tiles: TileType[][],
  path: Array<{ x: number; y: number }>
): void {
  for (const { x, y } of path) {
    if (tiles[x] && tiles[x][y] !== undefined) {
      tiles[x][y] = TileType.Path;
    }
  }
}

// Helper to set tile at position
function setTile(
  tiles: TileType[][],
  x: number,
  y: number,
  type: TileType
): void {
  if (tiles[x] && tiles[x][y] !== undefined) {
    tiles[x][y] = type;
  }
}

// ============================================================================
// DEFAULT MAPS
// ============================================================================

export function createDefaultMaps(): MapData[] {
  const now = Date.now();

  // Map 1: Forest Path - Simple beginner map
  const forestPath = createForestPathMap(now);

  // Map 2: River Crossing - Intermediate map
  const riverCrossing = createRiverCrossingMap(now);

  // Map 3: Mountain Pass - Advanced map
  const mountainPass = createMountainPassMap(now);

  return [forestPath, riverCrossing, mountainPass];
}

function createForestPathMap(timestamp: number): MapData {
  const width = 15;
  const height = 10;
  const tiles = createTileGrid(width, height);
  const heightmap = createHeightmap(width, height);

  // Create a simple S-curve path
  const path = [
    { x: 0, y: 5 },
    { x: 1, y: 5 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 4, y: 4 },
    { x: 4, y: 3 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
    { x: 7, y: 2 },
    { x: 8, y: 2 },
    { x: 9, y: 2 },
    { x: 10, y: 2 },
    { x: 10, y: 3 },
    { x: 10, y: 4 },
    { x: 10, y: 5 },
    { x: 10, y: 6 },
    { x: 10, y: 7 },
    { x: 11, y: 7 },
    { x: 12, y: 7 },
    { x: 13, y: 7 },
    { x: 14, y: 7 },
  ];

  setPath(tiles, path);
  setTile(tiles, 0, 5, TileType.Spawn);
  setTile(tiles, 14, 7, TileType.Exit);

  // Add some water features
  setTile(tiles, 7, 6, TileType.Water);
  setTile(tiles, 7, 7, TileType.Water);
  setTile(tiles, 8, 7, TileType.Water);

  // Add some blocked areas (rocks)
  setTile(tiles, 2, 8, TileType.Blocked);
  setTile(tiles, 12, 3, TileType.Blocked);

  return {
    id: "default-forest-path",
    name: "Forest Path",
    width,
    height,
    tiles,
    heightmap,
    waypoints: path.map((p, i) => ({ ...p, order: i })),
    spawnPoints: [{ x: 0, y: 5 }],
    exitPoints: [{ x: 14, y: 7 }],
    objects: [
      { id: "tree1", type: "tree_pine", x: 1, y: 1, scale: 1, rotation: 0 },
      { id: "tree2", type: "tree_pine", x: 3, y: 8, scale: 1, rotation: 0 },
      { id: "tree3", type: "tree_oak", x: 7, y: 0, scale: 1, rotation: 0 },
      { id: "tree4", type: "tree_oak", x: 12, y: 1, scale: 1, rotation: 0 },
      { id: "bush1", type: "bush", x: 6, y: 5, scale: 1, rotation: 0 },
      { id: "rock1", type: "rock", x: 2, y: 8, scale: 1, rotation: 0 },
    ],
    createdAt: timestamp,
    updatedAt: timestamp,
    isCustom: false,
  };
}

function createRiverCrossingMap(timestamp: number): MapData {
  const width = 20;
  const height = 12;
  const tiles = createTileGrid(width, height);
  const heightmap = createHeightmap(width, height);

  // Create river down the middle
  for (let y = 0; y < height; y++) {
    setTile(tiles, 9, y, TileType.Water);
    setTile(tiles, 10, y, TileType.Water);
  }

  // Create a winding path that crosses the river
  const path = [
    { x: 0, y: 6 },
    { x: 1, y: 6 },
    { x: 2, y: 6 },
    { x: 2, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 5, y: 4 },
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
    { x: 5, y: 8 },
    { x: 6, y: 8 },
    { x: 7, y: 8 },
    { x: 8, y: 8 },
    { x: 9, y: 8 }, // Bridge over river
    { x: 10, y: 8 }, // Bridge over river
    { x: 11, y: 8 },
    { x: 12, y: 8 },
    { x: 13, y: 8 },
    { x: 14, y: 8 },
    { x: 14, y: 7 },
    { x: 14, y: 6 },
    { x: 14, y: 5 },
    { x: 15, y: 5 },
    { x: 16, y: 5 },
    { x: 17, y: 5 },
    { x: 17, y: 4 },
    { x: 17, y: 3 },
    { x: 18, y: 3 },
    { x: 19, y: 3 },
  ];

  setPath(tiles, path);
  setTile(tiles, 0, 6, TileType.Spawn);
  setTile(tiles, 19, 3, TileType.Exit);

  // Add some blocked areas
  setTile(tiles, 3, 1, TileType.Blocked);
  setTile(tiles, 16, 9, TileType.Blocked);

  return {
    id: "default-river-crossing",
    name: "River Crossing",
    width,
    height,
    tiles,
    heightmap,
    waypoints: path.map((p, i) => ({ ...p, order: i })),
    spawnPoints: [{ x: 0, y: 6 }],
    exitPoints: [{ x: 19, y: 3 }],
    objects: [
      { id: "tree1", type: "tree_pine", x: 1, y: 1, scale: 1, rotation: 0 },
      { id: "tree2", type: "tree_pine", x: 4, y: 10, scale: 1, rotation: 0 },
      { id: "tree3", type: "tree_oak", x: 15, y: 1, scale: 1, rotation: 0 },
      { id: "tree4", type: "tree_oak", x: 18, y: 10, scale: 1, rotation: 0 },
      { id: "rock1", type: "rock", x: 3, y: 1, scale: 1, rotation: 0 },
      { id: "rock2", type: "rock", x: 16, y: 9, scale: 1, rotation: 0 },
    ],
    createdAt: timestamp,
    updatedAt: timestamp,
    isCustom: false,
  };
}

function createMountainPassMap(timestamp: number): MapData {
  const width = 25;
  const height = 15;
  const tiles = createTileGrid(width, height);
  const heightmap = createHeightmap(width, height);

  // Create mountain ridges (blocked areas)
  for (let x = 5; x < 8; x++) {
    for (let y = 0; y < 5; y++) {
      setTile(tiles, x, y, TileType.Blocked);
      heightmap[x]![y] = 3;
    }
  }
  for (let x = 17; x < 20; x++) {
    for (let y = 10; y < 15; y++) {
      setTile(tiles, x, y, TileType.Blocked);
      heightmap[x]![y] = 3;
    }
  }

  // Add some elevated terrain
  for (let x = 10; x < 15; x++) {
    for (let y = 5; y < 10; y++) {
      heightmap[x]![y] = 1;
    }
  }

  // Create a complex winding path
  const path = [
    { x: 0, y: 7 },
    { x: 1, y: 7 },
    { x: 2, y: 7 },
    { x: 3, y: 7 },
    { x: 3, y: 8 },
    { x: 3, y: 9 },
    { x: 3, y: 10 },
    { x: 4, y: 10 },
    { x: 5, y: 10 },
    { x: 6, y: 10 },
    { x: 7, y: 10 },
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 9, y: 9 },
    { x: 9, y: 8 },
    { x: 9, y: 7 },
    { x: 10, y: 7 },
    { x: 11, y: 7 },
    { x: 12, y: 7 },
    { x: 13, y: 7 },
    { x: 14, y: 7 },
    { x: 15, y: 7 },
    { x: 15, y: 6 },
    { x: 15, y: 5 },
    { x: 15, y: 4 },
    { x: 16, y: 4 },
    { x: 17, y: 4 },
    { x: 18, y: 4 },
    { x: 19, y: 4 },
    { x: 20, y: 4 },
    { x: 21, y: 4 },
    { x: 21, y: 5 },
    { x: 21, y: 6 },
    { x: 21, y: 7 },
    { x: 22, y: 7 },
    { x: 23, y: 7 },
    { x: 24, y: 7 },
  ];

  setPath(tiles, path);
  setTile(tiles, 0, 7, TileType.Spawn);
  setTile(tiles, 24, 7, TileType.Exit);

  // Add water pool
  for (let x = 1; x < 4; x++) {
    for (let y = 12; y < 14; y++) {
      setTile(tiles, x, y, TileType.Water);
    }
  }

  return {
    id: "default-mountain-pass",
    name: "Mountain Pass",
    width,
    height,
    tiles,
    heightmap,
    waypoints: path.map((p, i) => ({ ...p, order: i })),
    spawnPoints: [{ x: 0, y: 7 }],
    exitPoints: [{ x: 24, y: 7 }],
    objects: [
      { id: "tree1", type: "tree_pine", x: 0, y: 0, scale: 1, rotation: 0 },
      { id: "tree2", type: "tree_pine", x: 1, y: 2, scale: 1, rotation: 0 },
      { id: "tree3", type: "tree_pine", x: 23, y: 0, scale: 1, rotation: 0 },
      { id: "tree4", type: "tree_pine", x: 22, y: 12, scale: 1, rotation: 0 },
      { id: "rock1", type: "rock", x: 6, y: 1, scale: 1.5, rotation: 0 },
      { id: "rock2", type: "rock", x: 18, y: 12, scale: 1.5, rotation: 0 },
    ],
    createdAt: timestamp,
    updatedAt: timestamp,
    isCustom: false,
  };
}
