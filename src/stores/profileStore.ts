/**
 * Profile Store
 * Manages commander profile, stats tracking, and progression
 * Persisted to SQLite database
 */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CommanderStorage } from "@/services/storage";
import type { CommanderProfile, SessionStats } from "@/types/commander";
import { DEFAULT_SESSION_STATS, XP_REWARDS } from "@/types/commander";

interface ProfileStore {
  // Profile data (persisted to database)
  profile: CommanderProfile | null;
  isLoaded: boolean;
  isLoading: boolean;

  // Session stats (reset each game)
  sessionStats: SessionStats;

  // Dirty flag for batched saves
  isDirty: boolean;

  // Actions - Profile loading
  loadProfile: () => Promise<void>;
  createProfile: (name: string) => Promise<void>;

  // Actions - Session management
  startSession: () => void;
  endSession: (won: boolean) => Promise<void>;

  // Actions - Stats tracking (update in-memory, batch save)
  addKill: (bounty: number) => void;
  addDamage: (amount: number) => void;
  addTowerPlaced: (cost: number) => void;
  addTowerMerged: () => void;
  addCurrencyEarned: (amount: number) => void;
  addWaveCompleted: (waveNumber: number) => void;
  addPlayTime: (ms: number) => void;

  // Actions - XP and progression
  addXP: (amount: number) => void;

  // Actions - Persistence
  saveToDatabase: () => Promise<void>;
}

// Debounce timer for auto-save
let saveTimer: ReturnType<typeof setTimeout> | null = null;
const AUTO_SAVE_DELAY = 30000; // 30 seconds

function scheduleSave(store: ProfileStore) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    store.saveToDatabase();
  }, AUTO_SAVE_DELAY);
}

export const useProfileStore = create<ProfileStore>()(
  immer((set, get) => ({
    profile: null,
    isLoaded: false,
    isLoading: false,
    sessionStats: { ...DEFAULT_SESSION_STATS },
    isDirty: false,

    loadProfile: async () => {
      set((s) => {
        s.isLoading = true;
      });

      try {
        const profile = await CommanderStorage.getOrCreateProfile("Commander");
        set((s) => {
          s.profile = profile;
          s.isLoaded = true;
          s.isLoading = false;
        });
      } catch (error) {
        console.error("Failed to load commander profile:", error);
        set((s) => {
          s.isLoading = false;
        });
      }
    },

    createProfile: async (name: string) => {
      try {
        const profile = await CommanderStorage.createProfile(name);
        set((s) => {
          s.profile = profile;
          s.isLoaded = true;
        });
      } catch (error) {
        console.error("Failed to create commander profile:", error);
      }
    },

    startSession: () => {
      set((s) => {
        s.sessionStats = {
          ...DEFAULT_SESSION_STATS,
          startTime: Date.now(),
        };
        if (s.profile) {
          s.profile.stats.totalGamesPlayed += 1;
          s.isDirty = true;
        }
      });
      scheduleSave(get());
    },

    endSession: async (won: boolean) => {
      const { profile, sessionStats } = get();
      if (!profile) return;

      // Calculate session play time
      const playTime = Date.now() - sessionStats.startTime;

      set((s) => {
        if (!s.profile) return;

        // Add session stats to lifetime stats
        s.profile.stats.totalPlayTime += playTime;

        if (won) {
          s.profile.stats.totalGamesWon += 1;
          // Bonus XP for winning
          s.profile.progression.currentXP += XP_REWARDS.GAME_WIN;
        }

        s.isDirty = true;
      });

      // Force save at end of session
      await get().saveToDatabase();
    },

    addKill: (bounty: number) => {
      set((s) => {
        s.sessionStats.enemiesKilled += 1;
        if (s.profile) {
          s.profile.stats.totalEnemiesKilled += 1;
          s.profile.stats.totalCurrencyEarned += bounty;
          s.profile.progression.currentXP += XP_REWARDS.ENEMY_KILL;
          s.isDirty = true;
        }
      });
      scheduleSave(get());
    },

    addDamage: (amount: number) => {
      set((s) => {
        s.sessionStats.damageDealt += amount;
        if (s.profile) {
          s.profile.stats.totalDamageDealt += amount;
          s.isDirty = true;
        }
      });
      // Don't schedule save for damage (too frequent)
    },

    addTowerPlaced: (cost: number) => {
      set((s) => {
        s.sessionStats.towersPlaced += 1;
        s.sessionStats.currencySpent += cost;
        if (s.profile) {
          s.profile.stats.totalTowersPlaced += 1;
          s.profile.stats.totalCurrencySpent += cost;
          s.profile.progression.currentXP += XP_REWARDS.TOWER_PLACE;
          s.isDirty = true;
        }
      });
      scheduleSave(get());
    },

    addTowerMerged: () => {
      set((s) => {
        if (s.profile) {
          s.profile.stats.totalTowersMerged += 1;
          s.profile.progression.currentXP += XP_REWARDS.TOWER_MERGE;
          s.isDirty = true;
        }
      });
      scheduleSave(get());
    },

    addCurrencyEarned: (amount: number) => {
      set((s) => {
        s.sessionStats.currencyEarned += amount;
        if (s.profile) {
          s.profile.stats.totalCurrencyEarned += amount;
          s.isDirty = true;
        }
      });
      // Don't schedule save for currency (batched with other events)
    },

    addWaveCompleted: (waveNumber: number) => {
      set((s) => {
        s.sessionStats.wavesCompleted += 1;
        if (s.profile) {
          s.profile.stats.totalWavesCompleted += 1;
          s.profile.stats.longestSurvivalWave = Math.max(
            s.profile.stats.longestSurvivalWave,
            waveNumber
          );
          s.profile.progression.currentXP += XP_REWARDS.WAVE_COMPLETE;
          s.isDirty = true;
        }
      });
      scheduleSave(get());
    },

    addPlayTime: (ms: number) => {
      set((s) => {
        if (s.profile) {
          s.profile.stats.totalPlayTime += ms;
          s.isDirty = true;
        }
      });
      // Don't schedule save for play time (batched)
    },

    addXP: (amount: number) => {
      set((s) => {
        if (!s.profile) return;

        s.profile.progression.currentXP += amount;
        s.profile.stats.totalXPEarned += amount;

        // Handle level ups
        while (
          s.profile.progression.currentXP >=
          s.profile.progression.xpToNextLevel
        ) {
          s.profile.progression.currentXP -=
            s.profile.progression.xpToNextLevel;
          s.profile.progression.level += 1;
          s.profile.progression.xpToNextLevel = Math.floor(
            100 * Math.pow(1.5, s.profile.progression.level - 1)
          );
        }

        s.isDirty = true;
      });
      scheduleSave(get());
    },

    saveToDatabase: async () => {
      const { profile, isDirty } = get();
      if (!profile || !isDirty) return;

      try {
        await CommanderStorage.saveProfile(profile);
        set((s) => {
          s.isDirty = false;
        });
      } catch (error) {
        console.error("Failed to save commander profile:", error);
      }
    },
  }))
);

// Auto-save on window unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    const { profile, isDirty, saveToDatabase } = useProfileStore.getState();
    if (profile && isDirty) {
      // Synchronous save attempt (may not complete)
      saveToDatabase();
    }
  });
}
