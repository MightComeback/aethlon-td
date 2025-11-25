export enum TileType {
  Ground = "ground",
  Path = "path",
  Water = "water",
  Blocked = "blocked",
  Spawn = "spawn",
  Exit = "exit",
}

export interface Tile {
  type: TileType;
  x: number;
  y: number;
}

export interface Waypoint {
  x: number;
  y: number;
  order: number;
}

// Placeable 3D object on the map
export interface PlacedObject {
  id: string;
  type: string; // e.g., "tree_pine", "rock", "bush"
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
}

export interface MapData {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: TileType[][];
  heightmap?: number[][]; // Optional for backwards compatibility
  waypoints: Waypoint[];
  spawnPoints: Array<{ x: number; y: number }>;
  exitPoints: Array<{ x: number; y: number }>;
  objects?: PlacedObject[]; // Optional for backwards compatibility
  createdAt: number;
  updatedAt: number;
  isCustom: boolean;
}

export interface MapMetadata {
  id: string;
  name: string;
  width: number;
  height: number;
  difficulty: number;
  isCustom: boolean;
  createdAt: number;
}
