import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QualityLevel } from "@/types/weather";

export type FPSPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface SettingsStore {
  // FPS Counter
  fpsEnabled: boolean;
  fpsPosition: FPSPosition;

  // Debug
  debugMode: boolean;

  // Graphics Quality
  graphicsQuality: QualityLevel;
  autoDetectQuality: boolean;

  // Actions
  setFpsEnabled: (enabled: boolean) => void;
  setFpsPosition: (position: FPSPosition) => void;
  setDebugMode: (enabled: boolean) => void;
  setGraphicsQuality: (quality: QualityLevel) => void;
  setAutoDetectQuality: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      fpsEnabled: true,
      fpsPosition: "top-left",
      debugMode: false,
      graphicsQuality: "high",
      autoDetectQuality: true,

      setFpsEnabled: (enabled) => set({ fpsEnabled: enabled }),
      setFpsPosition: (position) => set({ fpsPosition: position }),
      setDebugMode: (enabled) => set({ debugMode: enabled }),
      setGraphicsQuality: (quality) => set({ graphicsQuality: quality }),
      setAutoDetectQuality: (enabled) => set({ autoDetectQuality: enabled }),
    }),
    {
      name: "aethlon-settings",
    }
  )
);
