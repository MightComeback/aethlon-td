/**
 * Tile Material Store
 * Holds a reference to the tile shader material for weather system integration
 */

import { create } from "zustand";
import * as THREE from "three";

interface TileMaterialStore {
  material: THREE.ShaderMaterial | null;
  setMaterial: (material: THREE.ShaderMaterial | null) => void;
}

export const useTileMaterialStore = create<TileMaterialStore>((set) => ({
  material: null,
  setMaterial: (material) => set({ material }),
}));
