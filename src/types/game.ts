import type { MapData } from "./map";
import type { Tower } from "./tower";
import type { Enemy, Wave } from "./enemy";

export enum GameState {
  Loading = "loading",
  Ready = "ready",
  Playing = "playing",
  Paused = "paused",
  WaveComplete = "wave_complete",
  Victory = "victory",
  Defeat = "defeat",
}

export interface GameSession {
  id: string;
  mapId: string;
  state: GameState;
  lives: number;
  maxLives: number;
  currency: number;
  score: number;
  currentWave: number;
  totalWaves: number;
  speed: number;
  startedAt: number;
  elapsedTime: number;
}

export interface GameSnapshot {
  session: GameSession;
  towers: Tower[];
  enemies: Enemy[];
  currentWave: Wave | null;
}

export interface PlayerProfile {
  id: string;
  name: string;
  xp: number;
  level: number;
  createdAt: number;
  lastPlayedAt: number;
}

export interface MapProgress {
  mapId: string;
  completed: boolean;
  highScore: number;
  stars: number; // 0-3
  bestTime: number;
  attempts: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
  progress: number;
  target: number;
}

export interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  showDamageNumbers: boolean;
  showRangeIndicators: boolean;
  autoStartWaves: boolean;
  confirmTowerSell: boolean;
}
