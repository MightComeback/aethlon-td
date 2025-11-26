import { db } from "../database";
import type { MapData, MapMetadata } from "@/types/map";

export class MapStorage {
  static async saveMap(map: MapData): Promise<void> {
    const now = Date.now();

    // Serialize weather config if present
    const weatherJson = map.weather ? JSON.stringify(map.weather) : null;

    // Serialize wave config if present
    const waveConfigJson = map.waveOverrides ? JSON.stringify(map.waveOverrides) : null;

    db.run(
      `INSERT OR REPLACE INTO maps (id, name, width, height, data, weather, wave_config, is_custom, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        map.id,
        map.name,
        map.width,
        map.height,
        JSON.stringify({
          tiles: map.tiles,
          heightmap: map.heightmap,
          waypoints: map.waypoints,
          spawnPoints: map.spawnPoints,
          exitPoints: map.exitPoints,
          objects: map.objects,
        }),
        weatherJson,
        waveConfigJson,
        map.isCustom ? 1 : 0,
        map.createdAt || now,
        now,
      ]
    );
  }

  static async getMap(id: string): Promise<MapData | null> {
    const row = db.queryOne<{
      id: string;
      name: string;
      width: number;
      height: number;
      data: string;
      weather?: string;
      wave_config?: string;
      is_custom: number;
      created_at: number;
      updated_at: number;
    }>("SELECT * FROM maps WHERE id = ?", [id]);

    if (!row) return null;

    const data = JSON.parse(row.data);

    // Parse weather config if present
    const weather = row.weather ? JSON.parse(row.weather) : undefined;

    // Parse wave config if present
    const waveOverrides = row.wave_config ? JSON.parse(row.wave_config) : undefined;

    return {
      id: row.id,
      name: row.name,
      width: row.width,
      height: row.height,
      tiles: data.tiles,
      heightmap: data.heightmap,
      waypoints: data.waypoints,
      spawnPoints: data.spawnPoints,
      exitPoints: data.exitPoints,
      objects: data.objects,
      weather,
      waveOverrides,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      isCustom: row.is_custom === 1,
    };
  }

  static async getAllMaps(): Promise<MapMetadata[]> {
    const rows = db.query<{
      id: string;
      name: string;
      width: number;
      height: number;
      is_custom: number;
      created_at: number;
    }>("SELECT id, name, width, height, is_custom, created_at FROM maps ORDER BY created_at DESC");

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      width: row.width,
      height: row.height,
      difficulty: 1, // Could calculate from wave data
      isCustom: row.is_custom === 1,
      createdAt: row.created_at,
    }));
  }

  static async getCustomMaps(): Promise<MapMetadata[]> {
    const rows = db.query<{
      id: string;
      name: string;
      width: number;
      height: number;
      created_at: number;
    }>(
      "SELECT id, name, width, height, created_at FROM maps WHERE is_custom = 1 ORDER BY created_at DESC"
    );

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      width: row.width,
      height: row.height,
      difficulty: 1,
      isCustom: true,
      createdAt: row.created_at,
    }));
  }

  static async deleteMap(id: string): Promise<void> {
    db.run("DELETE FROM maps WHERE id = ?", [id]);
  }

  static async exportMap(id: string): Promise<string | null> {
    const map = await this.getMap(id);
    if (!map) return null;
    return JSON.stringify(map, null, 2);
  }

  static async importMap(json: string): Promise<MapData> {
    const data = JSON.parse(json) as MapData;
    // Generate new ID to avoid conflicts
    data.id = crypto.randomUUID();
    data.createdAt = Date.now();
    data.updatedAt = Date.now();
    data.isCustom = true;
    await this.saveMap(data);
    return data;
  }
}
