import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TileType, type Waypoint, type MapData } from "@/types/map";
import type { EditorTool } from "@/components/editor/EditorToolbar";

interface EditorStore {
  // Map dimensions
  width: number;
  height: number;

  // Tile data
  tiles: TileType[][];
  waypoints: Waypoint[];
  spawnPoints: Array<{ x: number; y: number }>;
  exitPoints: Array<{ x: number; y: number }>;

  // Editor state
  currentTool: EditorTool;
  selectedTileType: TileType;
  isModified: boolean;
  mapName: string;

  // History for undo/redo
  history: TileType[][][];
  historyIndex: number;

  // Actions
  setTool: (tool: EditorTool) => void;
  setSelectedTileType: (type: TileType) => void;
  setTile: (x: number, y: number, type: TileType) => void;
  setMapSize: (width: number, height: number) => void;
  setMapName: (name: string) => void;

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

const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 15;

export const useEditorStore = create<EditorStore>()(
  immer((set, get) => ({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    tiles: createEmptyTiles(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    waypoints: [],
    spawnPoints: [],
    exitPoints: [],
    currentTool: "paint",
    selectedTileType: TileType.Ground,
    isModified: false,
    mapName: "Untitled Map",
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

    setMapSize: (width, height) =>
      set((s) => {
        const newTiles = createEmptyTiles(width, height);
        // Copy existing tiles where possible
        for (let x = 0; x < Math.min(width, s.width); x++) {
          for (let y = 0; y < Math.min(height, s.height); y++) {
            newTiles[x]![y] = s.tiles[x]![y]!;
          }
        }
        s.width = width;
        s.height = height;
        s.tiles = newTiles;
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

    newMap: (width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) =>
      set((s) => {
        s.width = width;
        s.height = height;
        s.tiles = createEmptyTiles(width, height);
        s.waypoints = [];
        s.spawnPoints = [];
        s.exitPoints = [];
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
        s.waypoints = data.waypoints;
        s.spawnPoints = data.spawnPoints;
        s.exitPoints = data.exitPoints;
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
        waypoints: s.waypoints,
        spawnPoints: s.spawnPoints,
        exitPoints: s.exitPoints,
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
