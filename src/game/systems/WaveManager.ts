/**
 * Wave Manager System
 * Manages wave progression and enemy spawning
 */

import type { WaveConfig, MapWaveOverride, EnemyType } from "@/types/enemy";
import { getWaveForMap, generateSpawnEvents, type SpawnEvent } from "@/data/waves/waveUtils";

export type SpawnCallback = (
  enemyType: EnemyType,
  tier: number,
  spawnPoint?: number
) => void;

export class WaveManager {
  private mapId: string;
  private waveOverrides?: MapWaveOverride;
  private currentWave: number = 0;
  private currentWaveConfig: WaveConfig | null = null;
  private spawnEvents: SpawnEvent[] = [];
  private nextSpawnIndex: number = 0;
  private waveStartTime: number = 0;
  private isWaveActive: boolean = false;

  constructor(mapId: string, waveOverrides?: MapWaveOverride) {
    this.mapId = mapId;
    this.waveOverrides = waveOverrides;
  }

  /**
   * Start a new wave
   */
  startWave(waveNumber: number): void {
    this.currentWave = waveNumber;
    this.currentWaveConfig = getWaveForMap(
      this.mapId,
      waveNumber,
      this.waveOverrides
    );

    if (!this.currentWaveConfig) {
      throw new Error(`No wave configuration found for wave ${waveNumber}`);
    }

    this.spawnEvents = generateSpawnEvents(this.currentWaveConfig);
    this.nextSpawnIndex = 0;
    this.waveStartTime = performance.now();
    this.isWaveActive = true;

    console.log(
      `Wave ${waveNumber} started with ${this.spawnEvents.length} spawn events`
    );
  }

  /**
   * Update wave manager (call this in game loop)
   */
  update(deltaTime: number, spawnCallback: SpawnCallback): void {
    if (!this.isWaveActive || !this.currentWaveConfig) return;

    const elapsed = performance.now() - this.waveStartTime;

    // Process all spawn events that should have happened by now
    while (this.nextSpawnIndex < this.spawnEvents.length) {
      const event = this.spawnEvents[this.nextSpawnIndex]!;

      if (event.time <= elapsed) {
        spawnCallback(event.enemyType, event.tier, event.spawnPoint);
        this.nextSpawnIndex++;
      } else {
        break; // Stop when we hit a future event
      }
    }

    // Check if all spawns are complete
    if (this.nextSpawnIndex >= this.spawnEvents.length) {
      this.isWaveActive = false;
    }
  }

  /**
   * Check if the wave is complete (all enemies spawned)
   */
  isComplete(): boolean {
    return !this.isWaveActive && this.nextSpawnIndex >= this.spawnEvents.length;
  }

  /**
   * Get the current wave configuration
   */
  getCurrentWaveConfig(): WaveConfig | null {
    return this.currentWaveConfig;
  }

  /**
   * Get wave progress (0-1)
   */
  getProgress(): number {
    if (this.spawnEvents.length === 0) return 0;
    return this.nextSpawnIndex / this.spawnEvents.length;
  }

  /**
   * Get the current wave number
   */
  getCurrentWaveNumber(): number {
    return this.currentWave;
  }

  /**
   * Check if a wave is currently active
   */
  isActive(): boolean {
    return this.isWaveActive;
  }

  /**
   * Get time elapsed since wave start (in ms)
   */
  getElapsedTime(): number {
    if (!this.isWaveActive) return 0;
    return performance.now() - this.waveStartTime;
  }

  /**
   * Get total wave count for this map
   */
  getTotalWaves(): number {
    if (this.waveOverrides?.replaceGlobal) {
      return this.waveOverrides.metadata?.totalWaves ?? this.waveOverrides.waves.length;
    }
    return 50; // Default global wave count
  }

  /**
   * Reset the wave manager
   */
  reset(): void {
    this.currentWave = 0;
    this.currentWaveConfig = null;
    this.spawnEvents = [];
    this.nextSpawnIndex = 0;
    this.waveStartTime = 0;
    this.isWaveActive = false;
  }

  /**
   * Get the next wave number (or null if no more waves)
   */
  getNextWaveNumber(): number | null {
    const totalWaves = this.getTotalWaves();
    const nextWave = this.currentWave + 1;
    return nextWave <= totalWaves ? nextWave : null;
  }

  /**
   * Check if there are more waves available
   */
  hasMoreWaves(): boolean {
    return this.getNextWaveNumber() !== null;
  }
}
