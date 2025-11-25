import initSqlJs, { type Database } from "sql.js";
import { openDB, type IDBPDatabase } from "idb";
import {
  CREATE_TABLES_SQL,
  DEFAULT_SETTINGS,
  INITIAL_TOWER_UNLOCKS,
  SCHEMA_VERSION,
} from "./schema";
import { createDefaultMaps } from "./defaultMaps";

const DB_NAME = "aethlon";
const IDB_STORE = "sqlite-data";
const IDB_KEY = "database";

interface DatabaseStore {
  [IDB_STORE]: {
    key: string;
    value: Uint8Array;
  };
}

export class DatabaseService {
  private static instance: DatabaseService | null = null;
  private db: Database | null = null;
  private idb: IDBPDatabase<DatabaseStore> | null = null;
  private initialized = false;
  private saveTimeout: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize sql.js
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });

      // Open IndexedDB for persistence
      this.idb = await openDB<DatabaseStore>(DB_NAME, 1, {
        upgrade(db) {
          db.createObjectStore(IDB_STORE);
        },
      });

      // Try to load existing database
      const savedData = await this.idb.get(IDB_STORE, IDB_KEY);
      if (savedData) {
        this.db = new SQL.Database(savedData);
        await this.checkMigrations();
      } else {
        this.db = new SQL.Database();
        await this.createSchema();
        await this.insertDefaults();
      }

      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }

  private async createSchema(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    this.db.run(CREATE_TABLES_SQL);
  }

  private async checkMigrations(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    const result = this.db.exec("SELECT version FROM schema_version LIMIT 1");
    const currentVersion = result[0]?.values[0]?.[0] as number ?? 0;

    if (currentVersion < SCHEMA_VERSION) {
      // Run migrations here when needed
      console.log(`Migrating from version ${currentVersion} to ${SCHEMA_VERSION}`);
      this.db.run(`UPDATE schema_version SET version = ${SCHEMA_VERSION}`);
    }
  }

  private async insertDefaults(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    // Insert default settings
    const settingsStmt = this.db.prepare(
      "INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)"
    );
    for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
      settingsStmt.run([key, value]);
    }
    settingsStmt.free();

    // Insert initial tower unlocks
    const towerStmt = this.db.prepare(
      "INSERT OR IGNORE INTO tower_unlocks (id, tower_type, unlocked_at) VALUES (?, ?, ?)"
    );
    const now = Date.now();
    for (const towerType of INITIAL_TOWER_UNLOCKS) {
      towerStmt.run([crypto.randomUUID(), towerType, now]);
    }
    towerStmt.free();

    // Create default player profile
    this.db.run(
      `INSERT OR IGNORE INTO player_profile (id, name, xp, level, created_at, last_played_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), "Player", 0, 1, now, now]
    );

    // Insert default maps
    const defaultMaps = createDefaultMaps();
    const mapStmt = this.db.prepare(
      `INSERT OR IGNORE INTO maps (id, name, width, height, data, is_custom, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const map of defaultMaps) {
      mapStmt.run([
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
        map.isCustom ? 1 : 0,
        map.createdAt,
        map.updatedAt,
      ]);
    }
    mapStmt.free();

    await this.save();
  }

  async save(): Promise<void> {
    if (!this.db || !this.idb) return;

    // Debounce saves
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(async () => {
      if (!this.db || !this.idb) return;
      const data = this.db.export();
      await this.idb.put(IDB_STORE, data, IDB_KEY);
    }, 100);
  }

  // Query methods
  run(sql: string, params: unknown[] = []): void {
    if (!this.db) throw new Error("Database not initialized");
    this.db.run(sql, params);
    this.save();
  }

  query<T>(sql: string, params: unknown[] = []): T[] {
    if (!this.db) throw new Error("Database not initialized");
    const stmt = this.db.prepare(sql);
    if (params.length > 0) {
      stmt.bind(params);
    }
    const results: T[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as T);
    }
    stmt.free();
    return results;
  }

  queryOne<T>(sql: string, params: unknown[] = []): T | null {
    const results = this.query<T>(sql, params);
    return results[0] ?? null;
  }

  // Utility method to close database
  close(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    this.initialized = false;
  }
}

// Singleton export
export const db = DatabaseService.getInstance();
