import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { GameState, type Tower, type Enemy } from "@/types";

interface GameStore {
  // Session state
  gameState: GameState;
  lives: number;
  maxLives: number;
  currency: number;
  score: number;
  wave: number;
  maxWaves: number;
  speed: number;
  isPaused: boolean;
  elapsedTime: number;

  // Entities
  towers: Tower[];
  enemies: Enemy[];

  // Selected
  selectedTowerId: string | null;

  // Actions
  setGameState: (state: GameState) => void;
  setSpeed: (speed: number) => void;
  togglePause: () => void;
  addCurrency: (amount: number) => void;
  spendCurrency: (amount: number) => boolean;
  loseLife: (amount?: number) => void;
  addScore: (amount: number) => void;
  nextWave: () => void;

  // Tower actions
  addTower: (tower: Tower) => void;
  removeTower: (id: string) => void;
  selectTower: (id: string | null) => void;
  upgradeTower: (id: string, path: "A" | "B") => void;

  // Enemy actions
  addEnemy: (enemy: Enemy) => void;
  removeEnemy: (id: string) => void;
  damageEnemy: (id: string, damage: number) => void;

  // Game flow
  startGame: (mapId: string, waves: number) => void;
  resetGame: () => void;
}

const initialState = {
  gameState: GameState.Ready,
  lives: 20,
  maxLives: 20,
  currency: 200,
  score: 0,
  wave: 0,
  maxWaves: 10,
  speed: 1,
  isPaused: false,
  elapsedTime: 0,
  towers: [],
  enemies: [],
  selectedTowerId: null,
};

export const useGameStore = create<GameStore>()(
  immer((set, get) => ({
    ...initialState,

    setGameState: (state) =>
      set((s) => {
        s.gameState = state;
      }),

    setSpeed: (speed) =>
      set((s) => {
        s.speed = Math.max(1, Math.min(3, speed));
      }),

    togglePause: () =>
      set((s) => {
        s.isPaused = !s.isPaused;
      }),

    addCurrency: (amount) =>
      set((s) => {
        s.currency += amount;
      }),

    spendCurrency: (amount) => {
      const { currency } = get();
      if (currency >= amount) {
        set((s) => {
          s.currency -= amount;
        });
        return true;
      }
      return false;
    },

    loseLife: (amount = 1) =>
      set((s) => {
        s.lives = Math.max(0, s.lives - amount);
        if (s.lives === 0) {
          s.gameState = GameState.Defeat;
        }
      }),

    addScore: (amount) =>
      set((s) => {
        s.score += amount;
      }),

    nextWave: () =>
      set((s) => {
        if (s.wave < s.maxWaves) {
          s.wave += 1;
          s.gameState = GameState.Playing;
        } else {
          s.gameState = GameState.Victory;
        }
      }),

    addTower: (tower) =>
      set((s) => {
        s.towers.push(tower);
      }),

    removeTower: (id) =>
      set((s) => {
        s.towers = s.towers.filter((t) => t.id !== id);
        if (s.selectedTowerId === id) {
          s.selectedTowerId = null;
        }
      }),

    selectTower: (id) =>
      set((s) => {
        s.selectedTowerId = id;
      }),

    upgradeTower: (id, path) =>
      set((s) => {
        const tower = s.towers.find((t) => t.id === id);
        if (tower) {
          if (path === "A") {
            tower.upgradeLevel.pathA += 1;
          } else {
            tower.upgradeLevel.pathB += 1;
          }
        }
      }),

    addEnemy: (enemy) =>
      set((s) => {
        s.enemies.push(enemy);
      }),

    removeEnemy: (id) =>
      set((s) => {
        s.enemies = s.enemies.filter((e) => e.id !== id);
      }),

    damageEnemy: (id, damage) =>
      set((s) => {
        const enemy = s.enemies.find((e) => e.id === id);
        if (enemy) {
          enemy.stats.health -= damage;
        }
      }),

    startGame: (mapId, waves) =>
      set((s) => {
        Object.assign(s, {
          ...initialState,
          maxWaves: waves,
          gameState: GameState.Ready,
        });
      }),

    resetGame: () =>
      set((s) => {
        Object.assign(s, initialState);
      }),
  }))
);
