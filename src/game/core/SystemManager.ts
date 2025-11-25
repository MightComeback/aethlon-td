import type { System, ReactiveSystem } from "./System";
import type { EntityManager } from "./EntityManager";
import type { Entity } from "./Entity";

/**
 * SystemManager - Manages and orchestrates all game systems.
 */
export class SystemManager {
  private systems: Map<string, System> = new Map();
  private sortedSystems: System[] = [];
  private entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
    this.setupEntityCallbacks();
  }

  /**
   * Add a system
   */
  addSystem(system: System): void {
    if (this.systems.has(system.name)) {
      console.warn(`System "${system.name}" already exists, replacing...`);
      this.removeSystem(system.name);
    }

    system.setEntityManager(this.entityManager);
    this.systems.set(system.name, system);
    system.initialize();
    this.sortSystems();
  }

  /**
   * Remove a system
   */
  removeSystem(name: string): boolean {
    const system = this.systems.get(name);
    if (!system) return false;

    system.destroy();
    this.systems.delete(name);
    this.sortSystems();
    return true;
  }

  /**
   * Get a system by name
   */
  getSystem<T extends System>(name: string): T | undefined {
    return this.systems.get(name) as T | undefined;
  }

  /**
   * Enable/disable a system
   */
  setSystemEnabled(name: string, enabled: boolean): void {
    const system = this.systems.get(name);
    if (system) {
      system.enabled = enabled;
    }
  }

  /**
   * Update all enabled systems
   */
  update(deltaTime: number): void {
    for (const system of this.sortedSystems) {
      if (system.enabled) {
        system.update(deltaTime);
      }
    }
  }

  /**
   * Get all systems
   */
  getAllSystems(): System[] {
    return this.sortedSystems;
  }

  /**
   * Clear all systems
   */
  clear(): void {
    for (const system of this.systems.values()) {
      system.destroy();
    }
    this.systems.clear();
    this.sortedSystems = [];
  }

  /**
   * Sort systems by priority
   */
  private sortSystems(): void {
    this.sortedSystems = Array.from(this.systems.values()).sort(
      (a, b) => a.priority - b.priority
    );
  }

  /**
   * Setup callbacks for reactive systems
   */
  private setupEntityCallbacks(): void {
    this.entityManager.onEntityAdded((entity) => {
      this.notifyEntityAdded(entity);
    });

    this.entityManager.onEntityRemoved((entity) => {
      this.notifyEntityRemoved(entity);
    });

    this.entityManager.onComponentAdded((entity, componentType) => {
      this.notifyComponentAdded(entity, componentType);
    });

    this.entityManager.onComponentRemoved((entity, componentType) => {
      this.notifyComponentRemoved(entity, componentType);
    });
  }

  private notifyEntityAdded(entity: Entity): void {
    for (const system of this.sortedSystems) {
      if (this.isReactiveSystem(system) && system.onEntityAdded) {
        if (this.entityMatchesSystem(entity, system)) {
          system.onEntityAdded(entity);
        }
      }
    }
  }

  private notifyEntityRemoved(entity: Entity): void {
    for (const system of this.sortedSystems) {
      if (this.isReactiveSystem(system) && system.onEntityRemoved) {
        if (this.entityMatchesSystem(entity, system)) {
          system.onEntityRemoved(entity);
        }
      }
    }
  }

  private notifyComponentAdded(entity: Entity, componentType: string): void {
    for (const system of this.sortedSystems) {
      if (this.isReactiveSystem(system) && system.onComponentAdded) {
        if (this.entityMatchesSystem(entity, system)) {
          system.onComponentAdded(entity, componentType);
        }
      }
    }
  }

  private notifyComponentRemoved(entity: Entity, componentType: string): void {
    for (const system of this.sortedSystems) {
      if (this.isReactiveSystem(system) && system.onComponentRemoved) {
        if (this.entityMatchesSystem(entity, system)) {
          system.onComponentRemoved(entity, componentType);
        }
      }
    }
  }

  private isReactiveSystem(system: System): system is ReactiveSystem {
    return (
      "onEntityAdded" in system ||
      "onEntityRemoved" in system ||
      "onComponentAdded" in system ||
      "onComponentRemoved" in system
    );
  }

  private entityMatchesSystem(entity: Entity, system: System): boolean {
    return system.requiredComponents.every((type) => entity.hasComponent(type));
  }
}
