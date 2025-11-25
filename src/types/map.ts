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

export interface MapData {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: TileType[][];
  waypoints: Waypoint[];
  spawnPoints: Array<{ x: number; y: number }>;
  exitPoints: Array<{ x: number; y: number }>;
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
