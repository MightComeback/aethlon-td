import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { GameState, type Tower, type Enemy } from "@/types";
import type { CommanderState } from "@/types/commander";
import type { MapWaveOverride } from "@/types/enemy";
import type { MapData } from "@/types/map";
import { DEFAULT_COMMANDER_STATE } from "@/types/commander";

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

  // Map configuration
  mapId: string | null;
  waveOverrides?: MapWaveOverride;

  // Entities
  towers: Tower[];
  enemies: Enemy[];

  // Selected
  selectedTowerId: string | null;

  // Commander
  commander: CommanderState;

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
  startGame: (mapId: string, mapData?: MapData) => void;
  resetGame: () => void;

  // Commander actions
  initCommander: (x: number, y: number) => void;
  setCommanderTarget: (x: number, y: number) => void;
  updateCommanderPosition: (deltaTime: number) => void;
  clearCommanderTarget: () => void;
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
  mapId: null as string | null,
  waveOverrides: undefined as MapWaveOverride | undefined,
  towers: [] as Tower[],
  enemies: [] as Enemy[],
  selectedTowerId: null as string | null,
  commander: { ...DEFAULT_COMMANDER_STATE },
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

    startGame: (mapId, mapData) =>
      set((s) => {
        // Load wave configuration from map data
        const waveOverrides = mapData?.waveOverrides;

        // Calculate max waves
        let maxWaves = 50; // Default global waves
        if (waveOverrides?.replaceGlobal) {
          maxWaves = waveOverrides.metadata?.totalWaves ?? waveOverrides.waves.length;
        } else if (waveOverrides) {
          // In selective mode, check if custom waves extend beyond 50
          const maxCustomWave = Math.max(
            ...waveOverrides.waves.map((w) => w.waveNumber),
            0
          );
          maxWaves = Math.max(50, maxCustomWave);
        }

        Object.assign(s, {
          ...initialState,
          mapId,
          waveOverrides,
          maxWaves,
          gameState: GameState.Ready,
        });
      }),

    resetGame: () =>
      set((s) => {
        Object.assign(s, initialState);
      }),

    // Commander actions
    initCommander: (x, y) =>
      set((s) => {
        s.commander = {
          ...DEFAULT_COMMANDER_STATE,
          position: { x, y },
        };
      }),

    setCommanderTarget: (x, y) =>
      set((s) => {
        s.commander.targetPosition = { x, y };
        s.commander.isMoving = true;
      }),

    updateCommanderPosition: (deltaTime) =>
      set((s) => {
        const { commander } = s;
        if (!commander.targetPosition || !commander.isMoving) return;

        const dx = commander.targetPosition.x - commander.position.x;
        const dy = commander.targetPosition.y - commander.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if arrived at destination
        if (distance < 0.1) {
          commander.position = { ...commander.targetPosition };
          commander.targetPosition = null;
          commander.isMoving = false;
          return;
        }

        // Move toward target
        const moveDistance = commander.speed * deltaTime;
        const ratio = Math.min(moveDistance / distance, 1);

        commander.position.x += dx * ratio;
        commander.position.y += dy * ratio;
        commander.facing = Math.atan2(dy, dx);
      }),

    clearCommanderTarget: () =>
      set((s) => {
        s.commander.targetPosition = null;
        s.commander.isMoving = false;
      }),
  }))
);
