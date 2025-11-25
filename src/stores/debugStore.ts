import { create } from "zustand";

interface DebugStore {
  // Custom debug data that can be set from anywhere
  customData: Record<string, string | number | boolean>;

  // Actions
  set: (key: string, value: string | number | boolean) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export const useDebugStore = create<DebugStore>((set) => ({
  customData: {},

  set: (key, value) =>
    set((state) => ({
      customData: { ...state.customData, [key]: value },
    })),

  remove: (key) =>
    set((state) => {
      const { [key]: _, ...rest } = state.customData;
      return { customData: rest };
    }),

  clear: () => set({ customData: {} }),
}));
