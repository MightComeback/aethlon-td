/**
 * Map Store
 * Manages loaded map data for game runtime (separate from editor state)
 */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { MapData, TileType } from "@/types/map";
import { MapStorage } from "@/services/storage/MapStorage";

interface MapStore {
  // State
  loadedMap: MapData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadMap: (mapId: string) => Promise<boolean>;
  loadMapFromData: (data: MapData) => void;
  unloadMap: () => void;

  // Helpers
  getWidth: () => number;
  getHeight: () => number;
  getTiles: () => TileType[][] | null;
  getHeightmap: () => number[][] | null;
  isWalkable: (x: number, y: number) => boolean;
}

export const useMapStore = create<MapStore>()(
  immer((set, get) => ({
    loadedMap: null,
    isLoading: false,
    error: null,

    loadMap: async (mapId) => {
      set({ isLoading: true, error: null });
      try {
        const map = await MapStorage.getMap(mapId);
        if (map) {
          set({ loadedMap: map, isLoading: false });
          return true;
        } else {
          set({ error: "Map not found", isLoading: false });
          return false;
        }
      } catch (e) {
        set({ error: String(e), isLoading: false });
        return false;
      }
    },

    loadMapFromData: (data) => {
      set({ loadedMap: data, isLoading: false, error: null });
    },

    unloadMap: () => {
      set({ loadedMap: null, error: null });
    },

    getWidth: () => get().loadedMap?.width ?? 0,
    getHeight: () => get().loadedMap?.height ?? 0,
    getTiles: () => get().loadedMap?.tiles ?? null,
    getHeightmap: () => get().loadedMap?.heightmap ?? null,

    isWalkable: (x, y) => {
      const map = get().loadedMap;
      if (!map) return false;
      if (x < 0 || x >= map.width || y < 0 || y >= map.height) return false;
      const tile = map.tiles[x]?.[y];
      // Water and Blocked tiles are not walkable
      return tile !== "water" && tile !== "blocked";
    },
  }))
);
