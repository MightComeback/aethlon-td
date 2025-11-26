/**
 * Wave Preset Type Definitions
 * Defines types for wave presets, templates, and configurations
 */

import type { WaveConfig, EnemyType } from "./enemy";

export type PresetCategory = "difficulty" | "theme" | "special" | "boss";

export interface PresetOptions {
  startWave?: number; // Which wave number to start at
  difficultyMultiplier?: number; // Scale difficulty (0.5 - 2.0)
}

export interface WavePreset {
  id: string;
  name: string;
  description: string;
  category: PresetCategory;
  icon: string; // Emoji or icon identifier
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  waveCount: number;
  suggestedMode: "replace" | "selective";
  tags: string[]; // For search/filtering
  generateWaves: (options?: PresetOptions) => WaveConfig[];
}

export interface BossTemplate {
  id: string;
  bossType: EnemyType;
  name: string;
  description: string;
  recommendedWave: number;
  difficulty: number;
  pattern: "solo" | "army" | "elite" | "phased" | "multi";
  waveConfig: WaveConfig;
}

export interface SimpleEnemyGroup {
  enemyType: EnemyType;
  count: number;
  tier: number;
  // spawnDelay and startDelay are auto-calculated, not stored
}

export interface SimpleWaveConfig {
  waveNumber: number;
  groups: SimpleEnemyGroup[];
  // isBossWave, bonusReward, difficulty are auto-calculated
  // spawnDelay and startDelay are added during conversion
}
