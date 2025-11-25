import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FPSPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface SettingsStore {
  // FPS Counter
  fpsEnabled: boolean;
  fpsPosition: FPSPosition;

  // Debug
  debugMode: boolean;

  // Actions
  setFpsEnabled: (enabled: boolean) => void;
  setFpsPosition: (position: FPSPosition) => void;
  setDebugMode: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      fpsEnabled: true,
      fpsPosition: "top-left",
      debugMode: false,

      setFpsEnabled: (enabled) => set({ fpsEnabled: enabled }),
      setFpsPosition: (position) => set({ fpsPosition: position }),
      setDebugMode: (enabled) => set({ debugMode: enabled }),
    }),
    {
      name: "aethlon-settings",
    }
  )
);
