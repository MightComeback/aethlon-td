import { db } from "../database";
import type { MapProgress, PlayerProfile } from "@/types/game";

export class ProgressStorage {
  // Player Profile
  static async getProfile(): Promise<PlayerProfile | null> {
    const row = db.queryOne<{
      id: string;
      name: string;
      xp: number;
      level: number;
      created_at: number;
      last_played_at: number;
    }>("SELECT * FROM player_profile LIMIT 1");

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      xp: row.xp,
      level: row.level,
      createdAt: row.created_at,
      lastPlayedAt: row.last_played_at,
    };
  }

  static async updateProfile(updates: Partial<PlayerProfile>): Promise<void> {
    const profile = await this.getProfile();
    if (!profile) return;

    const fields: string[] = [];
    const values: unknown[] = [];

    if (updates.name !== undefined) {
      fields.push("name = ?");
      values.push(updates.name);
    }
    if (updates.xp !== undefined) {
      fields.push("xp = ?");
      values.push(updates.xp);
    }
    if (updates.level !== undefined) {
      fields.push("level = ?");
      values.push(updates.level);
    }

    fields.push("last_played_at = ?");
    values.push(Date.now());
    values.push(profile.id);

    db.run(`UPDATE player_profile SET ${fields.join(", ")} WHERE id = ?`, values);
  }

  static async addXP(amount: number): Promise<{ newXP: number; newLevel: number }> {
    const profile = await this.getProfile();
    if (!profile) throw new Error("No profile found");

    const newXP = profile.xp + amount;
    const xpPerLevel = 1000; // XP needed per level
    const newLevel = Math.floor(newXP / xpPerLevel) + 1;

    await this.updateProfile({ xp: newXP, level: newLevel });
    return { newXP, newLevel };
  }

  // Map Progress
  static async getMapProgress(mapId: string): Promise<MapProgress | null> {
    const row = db.queryOne<{
      map_id: string;
      completed: number;
      high_score: number;
      stars: number;
      best_time: number;
      attempts: number;
    }>("SELECT * FROM map_progress WHERE map_id = ?", [mapId]);

    if (!row) return null;

    return {
      mapId: row.map_id,
      completed: row.completed === 1,
      highScore: row.high_score,
      stars: row.stars,
      bestTime: row.best_time,
      attempts: row.attempts,
    };
  }

  static async getAllMapProgress(): Promise<MapProgress[]> {
    const rows = db.query<{
      map_id: string;
      completed: number;
      high_score: number;
      stars: number;
      best_time: number;
      attempts: number;
    }>("SELECT * FROM map_progress");

    return rows.map((row) => ({
      mapId: row.map_id,
      completed: row.completed === 1,
      highScore: row.high_score,
      stars: row.stars,
      bestTime: row.best_time,
      attempts: row.attempts,
    }));
  }

  static async updateMapProgress(
    mapId: string,
    score: number,
    stars: number,
    time: number,
    completed: boolean
  ): Promise<void> {
    const existing = await this.getMapProgress(mapId);
    const now = Date.now();

    if (!existing) {
      db.run(
        `INSERT INTO map_progress (id, map_id, completed, high_score, stars, best_time, attempts, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [crypto.randomUUID(), mapId, completed ? 1 : 0, score, stars, time, 1, now]
      );
    } else {
      const newHighScore = Math.max(existing.highScore, score);
      const newStars = Math.max(existing.stars, stars);
      const newBestTime = existing.bestTime === 0 ? time : Math.min(existing.bestTime, time);
      const newCompleted = existing.completed || completed;

      db.run(
        `UPDATE map_progress
         SET completed = ?, high_score = ?, stars = ?, best_time = ?, attempts = attempts + 1, updated_at = ?
         WHERE map_id = ?`,
        [newCompleted ? 1 : 0, newHighScore, newStars, newBestTime, now, mapId]
      );
    }
  }

  // Tower Unlocks
  static async getUnlockedTowers(): Promise<string[]> {
    const rows = db.query<{ tower_type: string }>(
      "SELECT tower_type FROM tower_unlocks"
    );
    return rows.map((row) => row.tower_type);
  }

  static async unlockTower(towerType: string): Promise<void> {
    db.run(
      `INSERT OR IGNORE INTO tower_unlocks (id, tower_type, unlocked_at)
       VALUES (?, ?, ?)`,
      [crypto.randomUUID(), towerType, Date.now()]
    );
  }

  static async isTowerUnlocked(towerType: string): Promise<boolean> {
    const row = db.queryOne<{ tower_type: string }>(
      "SELECT tower_type FROM tower_unlocks WHERE tower_type = ?",
      [towerType]
    );
    return row !== null;
  }
}
