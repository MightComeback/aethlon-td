import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FPSPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type FPSLimit = 0 | 30 | 60 | 120 | 144; // 0 = unlimited

interface SettingsStore {
  // FPS Counter
  fpsEnabled: boolean;
  fpsPosition: FPSPosition;
  fpsLimit: FPSLimit;

  // Actions
  setFpsEnabled: (enabled: boolean) => void;
  setFpsPosition: (position: FPSPosition) => void;
  setFpsLimit: (limit: FPSLimit) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      fpsEnabled: true,
      fpsPosition: "top-left",
      fpsLimit: 0,

      setFpsEnabled: (enabled) => set({ fpsEnabled: enabled }),
      setFpsPosition: (position) => set({ fpsPosition: position }),
      setFpsLimit: (limit) => set({ fpsLimit: limit }),
    }),
    {
      name: "aethlon-settings",
    }
  )
);
