/**
 * Commander Profile & Stats Types
 * Handles player character, stats tracking, and progression
 */

// ============================================================================
// Stats Tracking
// ============================================================================

export interface CommanderStats {
  // Combat tracking (towers' contribution)
  totalEnemiesKilled: number;
  totalDamageDealt: number;

  // Building stats
  totalTowersPlaced: number;
  totalTowersMerged: number;
  totalCurrencySpent: number;
  totalCurrencyEarned: number;

  // Wave/Game stats
  totalWavesCompleted: number;
  totalGamesPlayed: number;
  totalGamesWon: number;
  longestSurvivalWave: number;

  // Progression
  totalXPEarned: number;
  totalPlayTime: number; // milliseconds
}

export const DEFAULT_COMMANDER_STATS: CommanderStats = {
  totalEnemiesKilled: 0,
  totalDamageDealt: 0,
  totalTowersPlaced: 0,
  totalTowersMerged: 0,
  totalCurrencySpent: 0,
  totalCurrencyEarned: 0,
  totalWavesCompleted: 0,
  totalGamesPlayed: 0,
  totalGamesWon: 0,
  longestSurvivalWave: 0,
  totalXPEarned: 0,
  totalPlayTime: 0,
};

// ============================================================================
// Progression System
// ============================================================================

export interface CommanderProgression {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
}

export const DEFAULT_COMMANDER_PROGRESSION: CommanderProgression = {
  level: 1,
  currentXP: 0,
  xpToNextLevel: 100,
};

/**
 * Calculate XP required for a given level
 * Uses exponential growth: 100 * 1.5^(level-1)
 */
export function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

/**
 * XP rewards for various actions
 */
export const XP_REWARDS = {
  ENEMY_KILL: 5,
  BOSS_KILL: 25,
  WAVE_COMPLETE: 50,
  GAME_WIN: 200,
  TOWER_PLACE: 2,
  TOWER_MERGE: 10,
} as const;

// ============================================================================
// Profile (Persistent Data)
// ============================================================================

export interface CommanderProfile {
  id: string;
  name: string;
  stats: CommanderStats;
  progression: CommanderProgression;
  createdAt: number;
  lastPlayedAt: number;
}

// ============================================================================
// Runtime State (In-Game)
// ============================================================================

export interface CommanderPosition {
  x: number;
  y: number;
}

export interface CommanderState {
  position: CommanderPosition;
  targetPosition: CommanderPosition | null;
  isMoving: boolean;
  facing: number; // rotation in radians
  speed: number; // tiles per second
}

export const DEFAULT_COMMANDER_STATE: CommanderState = {
  position: { x: 0, y: 0 },
  targetPosition: null,
  isMoving: false,
  facing: 0,
  speed: 3, // 3 tiles per second
};

// ============================================================================
// Session Stats (Reset each game)
// ============================================================================

export interface SessionStats {
  enemiesKilled: number;
  damageDealt: number;
  towersPlaced: number;
  currencySpent: number;
  currencyEarned: number;
  wavesCompleted: number;
  startTime: number;
}

export const DEFAULT_SESSION_STATS: SessionStats = {
  enemiesKilled: 0,
  damageDealt: 0,
  towersPlaced: 0,
  currencySpent: 0,
  currencyEarned: 0,
  wavesCompleted: 0,
  startTime: 0,
};
