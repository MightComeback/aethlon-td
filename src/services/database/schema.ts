// SQL schema definitions for the game database

export const SCHEMA_VERSION = 1;

export const CREATE_TABLES_SQL = `
-- Player profile table
CREATE TABLE IF NOT EXISTS player_profile (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  last_played_at INTEGER NOT NULL
);

-- Game progress per map
CREATE TABLE IF NOT EXISTS map_progress (
  id TEXT PRIMARY KEY,
  map_id TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  high_score INTEGER DEFAULT 0,
  stars INTEGER DEFAULT 0,
  best_time INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  updated_at INTEGER NOT NULL,
  UNIQUE(map_id)
);

-- Custom maps created in editor
CREATE TABLE IF NOT EXISTS maps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  data TEXT NOT NULL,
  is_custom INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Tower unlocks
CREATE TABLE IF NOT EXISTS tower_unlocks (
  id TEXT PRIMARY KEY,
  tower_type TEXT NOT NULL,
  unlocked_at INTEGER NOT NULL,
  UNIQUE(tower_type)
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  achievement_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  unlocked_at INTEGER,
  UNIQUE(achievement_id)
);

-- Game settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Save states for resuming games
CREATE TABLE IF NOT EXISTS save_states (
  id TEXT PRIMARY KEY,
  map_id TEXT NOT NULL,
  state_data TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

-- Schema version tracking
CREATE TABLE IF NOT EXISTS schema_version (
  version INTEGER PRIMARY KEY
);

-- Insert initial schema version
INSERT OR IGNORE INTO schema_version (version) VALUES (${SCHEMA_VERSION});
`;

export const DEFAULT_SETTINGS = {
  musicVolume: "0.7",
  sfxVolume: "0.8",
  showDamageNumbers: "true",
  showRangeIndicators: "true",
  autoStartWaves: "false",
  confirmTowerSell: "true",
};

export const INITIAL_TOWER_UNLOCKS = ["arrow", "cannon", "magic"];
