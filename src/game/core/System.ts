import type { Entity } from "./Entity";
import type { EntityManager } from "./EntityManager";

/**
 * System - Contains logic that operates on entities with specific components.
 * Systems are where all game logic lives.
 */
export abstract class System {
  /**
   * Unique identifier for this system
   */
  abstract readonly name: string;

  /**
   * Component types this system requires on entities
   */
  abstract readonly requiredComponents: string[];

  /**
   * Priority for execution order (lower runs first)
   */
  priority = 0;

  /**
   * Whether this system is currently active
   */
  enabled = true;

  /**
   * Reference to the entity manager
   */
  protected entityManager: EntityManager | null = null;

  /**
   * Set the entity manager reference
   */
  setEntityManager(manager: EntityManager): void {
    this.entityManager = manager;
  }

  /**
   * Called once when the system is added
   */
  initialize(): void {}

  /**
   * Called every frame with delta time
   */
  abstract update(deltaTime: number): void;

  /**
   * Get entities that match this system's requirements
   */
  protected getEntities(): Entity[] {
    if (!this.entityManager) return [];
    return this.entityManager.getEntitiesWithComponents(...this.requiredComponents);
  }

  /**
   * Called when the system is removed
   */
  destroy(): void {
    this.entityManager = null;
  }
}

/**
 * Reactive System - Responds to entity/component changes
 */
export abstract class ReactiveSystem extends System {
  /**
   * Called when a matching entity is added
   */
  onEntityAdded?(entity: Entity): void;

  /**
   * Called when a matching entity is removed
   */
  onEntityRemoved?(entity: Entity): void;

  /**
   * Called when a component is added to a matching entity
   */
  onComponentAdded?(entity: Entity, componentType: string): void;

  /**
   * Called when a component is removed from a matching entity
   */
  onComponentRemoved?(entity: Entity, componentType: string): void;
}
