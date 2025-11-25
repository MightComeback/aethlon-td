import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TileType, type Waypoint, type MapData } from "@/types/map";

// Editor tool types - defined here to avoid circular imports
export type EditorTool =
  | "select"
  | "paint"
  | "erase"
  | "path"
  | "waypoint"
  | "fill"
  | "height_raise"
  | "height_lower"
  | "object_place"
  | "object_remove";

// Object types that can be placed on the map
export type PlaceableObjectType =
  // Trees
  | "tree_pine"
  | "tree_oak"
  | "tree_birch"
  | "tree_willow"
  | "tree_dead"
  | "tree_pine_snow"
  // Rocks & Terrain
  | "rock"
  | "ice_crystal"
  | "rock_volcanic"
  // Plants
  | "bush"
  | "grass"
  | "flower"
  | "sunflower"
  | "cactus"
  | "mushroom"
  | "cattail"
  // Structures
  | "tower_base"
  | "fence"
  | "house"
  | "well"
  | "windmill"
  | "hay_bale"
  | "log"
  | "stump"
  | "cabin"
  | "tent"
  | "grave"
  | "lantern"
  | "snowman"
  | "igloo"
  // Decorations
  | "pottery"
  | "bones"
  | "skull"
  | "obelisk"
  | "fire_pit"
  | "snow_pile"
  | "lily_pad";

// Placed object instance
export interface PlacedObject {
  id: string;
  type: PlaceableObjectType;
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
}

// Camera state for 3D view
export interface EditorCameraState {
  azimuth: number; // horizontal rotation (Y-axis)
  polar: number;   // vertical tilt (X-axis)
  zoom: number;
}

interface EditorStore {
  // Map dimensions
  width: number;
  height: number;

  // Tile data
  tiles: TileType[][];
  heightmap: number[][]; // Height value for each tile (0-5 range)
  objects: PlacedObject[]; // Placed 3D objects
  waypoints: Waypoint[];
  spawnPoints: Array<{ x: number; y: number }>;
  exitPoints: Array<{ x: number; y: number }>;

  // Editor state
  currentTool: EditorTool;
  selectedTileType: TileType;
  selectedObjectType: PlaceableObjectType;
  isModified: boolean;
  mapName: string;

  // Camera state
  camera: EditorCameraState;

  // Selection state
  selectedTile: { x: number; y: number } | null;
  hoveredTile: { x: number; y: number } | null;

  // History for undo/redo
  history: TileType[][][];
  historyIndex: number;

  // Actions
  setTool: (tool: EditorTool) => void;
  setSelectedTileType: (type: TileType) => void;
  setSelectedObjectType: (type: PlaceableObjectType) => void;
  setTile: (x: number, y: number, type: TileType) => void;
  setHeight: (x: number, y: number, height: number) => void;
  adjustHeight: (x: number, y: number, delta: number) => void;
  setMapSize: (width: number, height: number) => void;
  setMapName: (name: string) => void;

  // Camera actions
  setCamera: (camera: EditorCameraState) => void;

  // Selection actions
  setSelectedTile: (tile: { x: number; y: number } | null) => void;
  setHoveredTile: (tile: { x: number; y: number } | null) => void;

  // Object actions
  placeObject: (x: number, y: number) => void;
  removeObject: (id: string) => void;
  removeObjectAt: (x: number, y: number) => void;
  clearObjects: () => void;

  // Waypoint actions
  addWaypoint: (x: number, y: number) => void;
  removeWaypoint: (index: number) => void;
  clearWaypoints: () => void;

  // Map actions
  newMap: (width?: number, height?: number) => void;
  loadMap: (data: MapData) => void;
  getMapData: () => MapData;

  // History actions
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
}

function createEmptyTiles(width: number, height: number): TileType[][] {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => TileType.Ground)
  );
}

function createEmptyHeightmap(width: number, height: number): number[][] {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => 0)
  );
}

const HEIGHT_MIN = 0;
const HEIGHT_MAX = 5;

const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 15;

export const useEditorStore = create<EditorStore>()(
  immer((set, get) => ({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    tiles: createEmptyTiles(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    heightmap: createEmptyHeightmap(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    waypoints: [],
    spawnPoints: [],
    exitPoints: [],
    objects: [],
    currentTool: "paint",
    selectedTileType: TileType.Ground,
    selectedObjectType: "tree_pine" as PlaceableObjectType,
    isModified: false,
    mapName: "Untitled Map",
    camera: { azimuth: 0, polar: Math.PI / 4, zoom: 50 }, // 45° default tilt
    selectedTile: null,
    hoveredTile: null,
    history: [],
    historyIndex: -1,

    setTool: (tool) =>
      set((s) => {
        s.currentTool = tool;
      }),

    setSelectedTileType: (type) =>
      set((s) => {
        s.selectedTileType = type;
      }),

    setSelectedObjectType: (type) =>
      set((s) => {
        s.selectedObjectType = type;
      }),

    setCamera: (camera) =>
      set((s) => {
        s.camera = camera;
      }),

    setSelectedTile: (tile) =>
      set((s) => {
        s.selectedTile = tile;
      }),

    setHoveredTile: (tile) =>
      set((s) => {
        s.hoveredTile = tile;
      }),

    setTile: (x, y, type) =>
      set((s) => {
        if (x >= 0 && x < s.width && y >= 0 && y < s.height) {
          // Handle special tiles
          if (type === TileType.Spawn) {
            // Remove from other spawn points if exists
            s.tiles.forEach((row, rx) => {
              row.forEach((tile, ry) => {
                if (tile === TileType.Spawn && (rx !== x || ry !== y)) {
                  s.tiles[rx]![ry] = TileType.Ground;
                }
              });
            });
            s.spawnPoints = [{ x, y }];
          } else if (type === TileType.Exit) {
            // Remove from other exit points if exists
            s.tiles.forEach((row, rx) => {
              row.forEach((tile, ry) => {
                if (tile === TileType.Exit && (rx !== x || ry !== y)) {
                  s.tiles[rx]![ry] = TileType.Ground;
                }
              });
            });
            s.exitPoints = [{ x, y }];
          }

          s.tiles[x]![y] = type;
          s.isModified = true;
        }
      }),

    setHeight: (x, y, height) =>
      set((s) => {
        if (x >= 0 && x < s.width && y >= 0 && y < s.height) {
          const clampedHeight = Math.max(HEIGHT_MIN, Math.min(HEIGHT_MAX, height));
          s.heightmap[x]![y] = clampedHeight;
          s.isModified = true;
        }
      }),

    adjustHeight: (x, y, delta) =>
      set((s) => {
        if (x >= 0 && x < s.width && y >= 0 && y < s.height) {
          const currentHeight = s.heightmap[x]![y] ?? 0;
          const newHeight = Math.max(HEIGHT_MIN, Math.min(HEIGHT_MAX, currentHeight + delta));
          s.heightmap[x]![y] = newHeight;
          s.isModified = true;
        }
      }),

    setMapSize: (width, height) =>
      set((s) => {
        const newTiles = createEmptyTiles(width, height);
        const newHeightmap = createEmptyHeightmap(width, height);
        // Copy existing tiles and heights where possible
        for (let x = 0; x < Math.min(width, s.width); x++) {
          for (let y = 0; y < Math.min(height, s.height); y++) {
            newTiles[x]![y] = s.tiles[x]![y]!;
            newHeightmap[x]![y] = s.heightmap[x]![y] ?? 0;
          }
        }
        s.width = width;
        s.height = height;
        s.tiles = newTiles;
        s.heightmap = newHeightmap;
        s.isModified = true;
      }),

    setMapName: (name) =>
      set((s) => {
        s.mapName = name;
        s.isModified = true;
      }),

    addWaypoint: (x, y) =>
      set((s) => {
        s.waypoints.push({
          x,
          y,
          order: s.waypoints.length,
        });
        s.isModified = true;
      }),

    removeWaypoint: (index) =>
      set((s) => {
        s.waypoints.splice(index, 1);
        // Reorder remaining waypoints
        s.waypoints.forEach((wp, i) => {
          wp.order = i;
        });
        s.isModified = true;
      }),

    clearWaypoints: () =>
      set((s) => {
        s.waypoints = [];
        s.isModified = true;
      }),

    placeObject: (x, y) =>
      set((s) => {
        if (x >= 0 && x < s.width && y >= 0 && y < s.height) {
          // Check if there's already an object at this position
          const existingIndex = s.objects.findIndex(
            (obj) => Math.floor(obj.x) === x && Math.floor(obj.y) === y
          );
          if (existingIndex !== -1) {
            // Replace existing object
            s.objects[existingIndex] = {
              id: crypto.randomUUID(),
              type: s.selectedObjectType,
              x,
              y,
              scale: 1,
              rotation: 0,
            };
          } else {
            // Add new object
            s.objects.push({
              id: crypto.randomUUID(),
              type: s.selectedObjectType,
              x,
              y,
              scale: 1,
              rotation: 0,
            });
          }
          s.isModified = true;
        }
      }),

    removeObject: (id) =>
      set((s) => {
        const index = s.objects.findIndex((obj) => obj.id === id);
        if (index !== -1) {
          s.objects.splice(index, 1);
          s.isModified = true;
        }
      }),

    removeObjectAt: (x, y) =>
      set((s) => {
        const index = s.objects.findIndex(
          (obj) => Math.floor(obj.x) === x && Math.floor(obj.y) === y
        );
        if (index !== -1) {
          s.objects.splice(index, 1);
          s.isModified = true;
        }
      }),

    clearObjects: () =>
      set((s) => {
        s.objects = [];
        s.isModified = true;
      }),

    newMap: (width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) =>
      set((s) => {
        s.width = width;
        s.height = height;
        s.tiles = createEmptyTiles(width, height);
        s.heightmap = createEmptyHeightmap(width, height);
        s.waypoints = [];
        s.spawnPoints = [];
        s.exitPoints = [];
        s.objects = [];
        s.mapName = "Untitled Map";
        s.isModified = false;
        s.history = [];
        s.historyIndex = -1;
      }),

    loadMap: (data) =>
      set((s) => {
        s.width = data.width;
        s.height = data.height;
        s.tiles = data.tiles;
        s.heightmap = data.heightmap ?? createEmptyHeightmap(data.width, data.height);
        s.waypoints = data.waypoints;
        s.spawnPoints = data.spawnPoints;
        s.exitPoints = data.exitPoints;
        s.objects = data.objects ?? [];
        s.mapName = data.name;
        s.isModified = false;
        s.history = [];
        s.historyIndex = -1;
      }),

    getMapData: () => {
      const s = get();
      return {
        id: crypto.randomUUID(),
        name: s.mapName,
        width: s.width,
        height: s.height,
        tiles: s.tiles,
        heightmap: s.heightmap,
        waypoints: s.waypoints,
        spawnPoints: s.spawnPoints,
        exitPoints: s.exitPoints,
        objects: s.objects,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isCustom: true,
      };
    },

    saveToHistory: () =>
      set((s) => {
        // Remove any redo history
        s.history = s.history.slice(0, s.historyIndex + 1);
        // Add current state
        s.history.push(JSON.parse(JSON.stringify(s.tiles)));
        s.historyIndex = s.history.length - 1;
        // Limit history size
        if (s.history.length > 50) {
          s.history.shift();
          s.historyIndex--;
        }
      }),

    undo: () =>
      set((s) => {
        if (s.historyIndex > 0) {
          s.historyIndex--;
          s.tiles = JSON.parse(JSON.stringify(s.history[s.historyIndex]));
          s.isModified = true;
        }
      }),

    redo: () =>
      set((s) => {
        if (s.historyIndex < s.history.length - 1) {
          s.historyIndex++;
          s.tiles = JSON.parse(JSON.stringify(s.history[s.historyIndex]));
          s.isModified = true;
        }
      }),
  }))
);
