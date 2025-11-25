/**
 * Commander Storage Service
 * Handles database operations for commander profile and stats
 */

import { db } from "../database";
import type { CommanderProfile, CommanderStats } from "@/types/commander";
import {
  DEFAULT_COMMANDER_STATS,
  DEFAULT_COMMANDER_PROGRESSION,
  getXPForLevel,
} from "@/types/commander";

interface CommanderRow {
  id: string;
  name: string;
  level: number;
  current_xp: number;
  xp_to_next_level: number;
  total_enemies_killed: number;
  total_damage_dealt: number;
  total_towers_placed: number;
  total_towers_merged: number;
  total_currency_spent: number;
  total_currency_earned: number;
  total_waves_completed: number;
  total_games_played: number;
  total_games_won: number;
  longest_survival_wave: number;
  total_xp_earned: number;
  total_play_time: number;
  created_at: number;
  last_played_at: number;
}

function rowToProfile(row: CommanderRow): CommanderProfile {
  return {
    id: row.id,
    name: row.name,
    progression: {
      level: row.level,
      currentXP: row.current_xp,
      xpToNextLevel: row.xp_to_next_level,
    },
    stats: {
      totalEnemiesKilled: row.total_enemies_killed,
      totalDamageDealt: row.total_damage_dealt,
      totalTowersPlaced: row.total_towers_placed,
      totalTowersMerged: row.total_towers_merged,
      totalCurrencySpent: row.total_currency_spent,
      totalCurrencyEarned: row.total_currency_earned,
      totalWavesCompleted: row.total_waves_completed,
      totalGamesPlayed: row.total_games_played,
      totalGamesWon: row.total_games_won,
      longestSurvivalWave: row.longest_survival_wave,
      totalXPEarned: row.total_xp_earned,
      totalPlayTime: row.total_play_time,
    },
    createdAt: row.created_at,
    lastPlayedAt: row.last_played_at,
  };
}

export class CommanderStorage {
  /**
   * Get the commander profile (only one exists per game)
   */
  static async getProfile(): Promise<CommanderProfile | null> {
    const row = db.queryOne<CommanderRow>(
      "SELECT * FROM commander_profile LIMIT 1"
    );

    if (!row) return null;
    return rowToProfile(row);
  }

  /**
   * Create a new commander profile
   */
  static async createProfile(name: string): Promise<CommanderProfile> {
    const id = crypto.randomUUID();
    const now = Date.now();

    db.run(
      `INSERT INTO commander_profile (
        id, name, level, current_xp, xp_to_next_level,
        total_enemies_killed, total_damage_dealt, total_towers_placed,
        total_towers_merged, total_currency_spent, total_currency_earned,
        total_waves_completed, total_games_played, total_games_won,
        longest_survival_wave, total_xp_earned, total_play_time,
        created_at, last_played_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        name,
        DEFAULT_COMMANDER_PROGRESSION.level,
        DEFAULT_COMMANDER_PROGRESSION.currentXP,
        DEFAULT_COMMANDER_PROGRESSION.xpToNextLevel,
        DEFAULT_COMMANDER_STATS.totalEnemiesKilled,
        DEFAULT_COMMANDER_STATS.totalDamageDealt,
        DEFAULT_COMMANDER_STATS.totalTowersPlaced,
        DEFAULT_COMMANDER_STATS.totalTowersMerged,
        DEFAULT_COMMANDER_STATS.totalCurrencySpent,
        DEFAULT_COMMANDER_STATS.totalCurrencyEarned,
        DEFAULT_COMMANDER_STATS.totalWavesCompleted,
        DEFAULT_COMMANDER_STATS.totalGamesPlayed,
        DEFAULT_COMMANDER_STATS.totalGamesWon,
        DEFAULT_COMMANDER_STATS.longestSurvivalWave,
        DEFAULT_COMMANDER_STATS.totalXPEarned,
        DEFAULT_COMMANDER_STATS.totalPlayTime,
        now,
        now,
      ]
    );

    return {
      id,
      name,
      stats: { ...DEFAULT_COMMANDER_STATS },
      progression: { ...DEFAULT_COMMANDER_PROGRESSION },
      createdAt: now,
      lastPlayedAt: now,
    };
  }

  /**
   * Save the full commander profile
   */
  static async saveProfile(profile: CommanderProfile): Promise<void> {
    const now = Date.now();

    db.run(
      `UPDATE commander_profile SET
        name = ?,
        level = ?,
        current_xp = ?,
        xp_to_next_level = ?,
        total_enemies_killed = ?,
        total_damage_dealt = ?,
        total_towers_placed = ?,
        total_towers_merged = ?,
        total_currency_spent = ?,
        total_currency_earned = ?,
        total_waves_completed = ?,
        total_games_played = ?,
        total_games_won = ?,
        longest_survival_wave = ?,
        total_xp_earned = ?,
        total_play_time = ?,
        last_played_at = ?
      WHERE id = ?`,
      [
        profile.name,
        profile.progression.level,
        profile.progression.currentXP,
        profile.progression.xpToNextLevel,
        profile.stats.totalEnemiesKilled,
        profile.stats.totalDamageDealt,
        profile.stats.totalTowersPlaced,
        profile.stats.totalTowersMerged,
        profile.stats.totalCurrencySpent,
        profile.stats.totalCurrencyEarned,
        profile.stats.totalWavesCompleted,
        profile.stats.totalGamesPlayed,
        profile.stats.totalGamesWon,
        profile.stats.longestSurvivalWave,
        profile.stats.totalXPEarned,
        profile.stats.totalPlayTime,
        now,
        profile.id,
      ]
    );
  }

  /**
   * Update specific stats (incremental update)
   */
  static async updateStats(
    id: string,
    stats: Partial<CommanderStats>
  ): Promise<void> {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (stats.totalEnemiesKilled !== undefined) {
      fields.push("total_enemies_killed = total_enemies_killed + ?");
      values.push(stats.totalEnemiesKilled);
    }
    if (stats.totalDamageDealt !== undefined) {
      fields.push("total_damage_dealt = total_damage_dealt + ?");
      values.push(stats.totalDamageDealt);
    }
    if (stats.totalTowersPlaced !== undefined) {
      fields.push("total_towers_placed = total_towers_placed + ?");
      values.push(stats.totalTowersPlaced);
    }
    if (stats.totalTowersMerged !== undefined) {
      fields.push("total_towers_merged = total_towers_merged + ?");
      values.push(stats.totalTowersMerged);
    }
    if (stats.totalCurrencySpent !== undefined) {
      fields.push("total_currency_spent = total_currency_spent + ?");
      values.push(stats.totalCurrencySpent);
    }
    if (stats.totalCurrencyEarned !== undefined) {
      fields.push("total_currency_earned = total_currency_earned + ?");
      values.push(stats.totalCurrencyEarned);
    }
    if (stats.totalWavesCompleted !== undefined) {
      fields.push("total_waves_completed = total_waves_completed + ?");
      values.push(stats.totalWavesCompleted);
    }
    if (stats.totalGamesPlayed !== undefined) {
      fields.push("total_games_played = total_games_played + ?");
      values.push(stats.totalGamesPlayed);
    }
    if (stats.totalGamesWon !== undefined) {
      fields.push("total_games_won = total_games_won + ?");
      values.push(stats.totalGamesWon);
    }
    if (stats.totalXPEarned !== undefined) {
      fields.push("total_xp_earned = total_xp_earned + ?");
      values.push(stats.totalXPEarned);
    }
    if (stats.totalPlayTime !== undefined) {
      fields.push("total_play_time = total_play_time + ?");
      values.push(stats.totalPlayTime);
    }

    if (fields.length === 0) return;

    fields.push("last_played_at = ?");
    values.push(Date.now());
    values.push(id);

    db.run(
      `UPDATE commander_profile SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
  }

  /**
   * Update longest survival wave if new record
   */
  static async updateLongestWave(id: string, wave: number): Promise<void> {
    db.run(
      `UPDATE commander_profile
       SET longest_survival_wave = MAX(longest_survival_wave, ?),
           last_played_at = ?
       WHERE id = ?`,
      [wave, Date.now(), id]
    );
  }

  /**
   * Add XP and handle level ups
   */
  static async addXP(
    id: string,
    amount: number
  ): Promise<{ level: number; currentXP: number; leveledUp: boolean }> {
    const profile = await this.getProfile();
    if (!profile) throw new Error("No commander profile found");

    let { level, currentXP, xpToNextLevel } = profile.progression;
    currentXP += amount;
    let leveledUp = false;

    // Handle level ups
    while (currentXP >= xpToNextLevel) {
      currentXP -= xpToNextLevel;
      level++;
      xpToNextLevel = getXPForLevel(level);
      leveledUp = true;
    }

    db.run(
      `UPDATE commander_profile
       SET current_xp = ?, level = ?, xp_to_next_level = ?,
           total_xp_earned = total_xp_earned + ?, last_played_at = ?
       WHERE id = ?`,
      [currentXP, level, xpToNextLevel, amount, Date.now(), id]
    );

    return { level, currentXP, leveledUp };
  }

  /**
   * Get or create profile (ensures one always exists)
   */
  static async getOrCreateProfile(
    defaultName: string = "Commander"
  ): Promise<CommanderProfile> {
    const existing = await this.getProfile();
    if (existing) return existing;
    return this.createProfile(defaultName);
  }
}
