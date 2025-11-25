import { create } from "zustand";

interface DebugInfo {
  // Frame limiter debug
  frameLimiterActive: boolean;
  targetFps: number;
  actualFps: number;
  frameTime: number;
  skippedFrames: number;
  renderedFrames: number;
  lastAdvanceTime: number;

  // R3F debug
  r3fFrameloop: string;
  r3fClock: number;

  // General
  customData: Record<string, string | number | boolean>;
}

interface DebugStore extends DebugInfo {
  // Actions
  setFrameLimiterDebug: (data: Partial<DebugInfo>) => void;
  setCustomData: (key: string, value: string | number | boolean) => void;
  reset: () => void;
}

const initialState: DebugInfo = {
  frameLimiterActive: false,
  targetFps: 0,
  actualFps: 0,
  frameTime: 0,
  skippedFrames: 0,
  renderedFrames: 0,
  lastAdvanceTime: 0,
  r3fFrameloop: "unknown",
  r3fClock: 0,
  customData: {},
};

export const useDebugStore = create<DebugStore>((set) => ({
  ...initialState,

  setFrameLimiterDebug: (data) => set((state) => ({ ...state, ...data })),

  setCustomData: (key, value) =>
    set((state) => ({
      customData: { ...state.customData, [key]: value },
    })),

  reset: () => set(initialState),
}));
