type EventCallback<T = unknown> = (data: T) => void;

interface EventSubscription {
  unsubscribe: () => void;
}

/**
 * EventBus - Centralized event system for game-wide communication.
 * Enables loose coupling between systems.
 */
export class EventBus {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private onceListeners: Map<string, Set<EventCallback>> = new Map();

  /**
   * Subscribe to an event
   */
  on<T = unknown>(event: string, callback: EventCallback<T>): EventSubscription {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(callback as EventCallback);

    return {
      unsubscribe: () => {
        set?.delete(callback as EventCallback);
      },
    };
  }

  /**
   * Subscribe to an event once
   */
  once<T = unknown>(event: string, callback: EventCallback<T>): EventSubscription {
    let set = this.onceListeners.get(event);
    if (!set) {
      set = new Set();
      this.onceListeners.set(event, set);
    }
    set.add(callback as EventCallback);

    return {
      unsubscribe: () => {
        set?.delete(callback as EventCallback);
      },
    };
  }

  /**
   * Unsubscribe from an event
   */
  off<T = unknown>(event: string, callback: EventCallback<T>): void {
    this.listeners.get(event)?.delete(callback as EventCallback);
    this.onceListeners.get(event)?.delete(callback as EventCallback);
  }

  /**
   * Emit an event
   */
  emit<T = unknown>(event: string, data?: T): void {
    // Regular listeners
    const listeners = this.listeners.get(event);
    if (listeners) {
      for (const callback of listeners) {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for "${event}":`, error);
        }
      }
    }

    // Once listeners
    const onceListeners = this.onceListeners.get(event);
    if (onceListeners) {
      for (const callback of onceListeners) {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in once listener for "${event}":`, error);
        }
      }
      this.onceListeners.delete(event);
    }
  }

  /**
   * Clear all listeners for an event
   */
  clear(event: string): void {
    this.listeners.delete(event);
    this.onceListeners.delete(event);
  }

  /**
   * Clear all listeners
   */
  clearAll(): void {
    this.listeners.clear();
    this.onceListeners.clear();
  }

  /**
   * Check if an event has listeners
   */
  hasListeners(event: string): boolean {
    const listeners = this.listeners.get(event);
    const onceListeners = this.onceListeners.get(event);
    return (listeners?.size ?? 0) > 0 || (onceListeners?.size ?? 0) > 0;
  }
}

// Game Event Types
export const GameEvents = {
  // Game State
  GAME_START: "game:start",
  GAME_PAUSE: "game:pause",
  GAME_RESUME: "game:resume",
  GAME_VICTORY: "game:victory",
  GAME_DEFEAT: "game:defeat",

  // Waves
  WAVE_START: "wave:start",
  WAVE_COMPLETE: "wave:complete",
  WAVE_SPAWN: "wave:spawn",

  // Enemies
  ENEMY_SPAWN: "enemy:spawn",
  ENEMY_DAMAGE: "enemy:damage",
  ENEMY_DEATH: "enemy:death",
  ENEMY_REACH_EXIT: "enemy:reach_exit",

  // Towers
  TOWER_PLACE: "tower:place",
  TOWER_SELL: "tower:sell",
  TOWER_UPGRADE: "tower:upgrade",
  TOWER_MERGE: "tower:merge",
  TOWER_ATTACK: "tower:attack",
  TOWER_SELECT: "tower:select",

  // Projectiles
  PROJECTILE_SPAWN: "projectile:spawn",
  PROJECTILE_HIT: "projectile:hit",

  // Economy
  CURRENCY_CHANGE: "currency:change",
  SCORE_CHANGE: "score:change",
  LIVES_CHANGE: "lives:change",

  // UI
  UI_TOWER_SELECTED: "ui:tower_selected",
  UI_TILE_HOVER: "ui:tile_hover",
  UI_TILE_CLICK: "ui:tile_click",
} as const;

export type GameEventType = (typeof GameEvents)[keyof typeof GameEvents];

// Singleton instance
export const eventBus = new EventBus();
