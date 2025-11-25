import { Entity } from "./Entity";
import type { Component } from "./Component";

type EntityCallback = (entity: Entity) => void;
type ComponentCallback = (entity: Entity, componentType: string) => void;

/**
 * EntityManager - Manages all entities in the game world.
 * Provides efficient querying and lifecycle management.
 */
export class EntityManager {
  private entities: Map<string, Entity> = new Map();
  private entitiesByComponent: Map<string, Set<string>> = new Map();
  private entitiesByTag: Map<string, Set<string>> = new Map();

  // Event callbacks
  private onEntityAddedCallbacks: EntityCallback[] = [];
  private onEntityRemovedCallbacks: EntityCallback[] = [];
  private onComponentAddedCallbacks: ComponentCallback[] = [];
  private onComponentRemovedCallbacks: ComponentCallback[] = [];

  /**
   * Create a new entity
   */
  createEntity(id?: string): Entity {
    const entity = new Entity(id);
    this.addEntity(entity);
    return entity;
  }

  /**
   * Add an existing entity
   */
  addEntity(entity: Entity): void {
    this.entities.set(entity.id, entity);

    // Index by components
    for (const component of entity.getAllComponents()) {
      this.indexComponent(entity.id, component.type);
    }

    // Index by tags
    for (const tag of entity.getTags()) {
      this.indexTag(entity.id, tag);
    }

    // Notify listeners
    for (const callback of this.onEntityAddedCallbacks) {
      callback(entity);
    }
  }

  /**
   * Remove an entity
   */
  removeEntity(id: string): boolean {
    const entity = this.entities.get(id);
    if (!entity) return false;

    // Remove from component indexes
    for (const component of entity.getAllComponents()) {
      this.unindexComponent(id, component.type);
    }

    // Remove from tag indexes
    for (const tag of entity.getTags()) {
      this.unindexTag(id, tag);
    }

    // Notify listeners
    for (const callback of this.onEntityRemovedCallbacks) {
      callback(entity);
    }

    entity.destroy();
    return this.entities.delete(id);
  }

  /**
   * Get an entity by ID
   */
  getEntity(id: string): Entity | undefined {
    return this.entities.get(id);
  }

  /**
   * Get all entities
   */
  getAllEntities(): Entity[] {
    return Array.from(this.entities.values());
  }

  /**
   * Get all active entities
   */
  getActiveEntities(): Entity[] {
    return Array.from(this.entities.values()).filter((e) => e.active);
  }

  /**
   * Get entities with specific component type
   */
  getEntitiesWithComponent(componentType: string): Entity[] {
    const ids = this.entitiesByComponent.get(componentType);
    if (!ids) return [];

    return Array.from(ids)
      .map((id) => this.entities.get(id))
      .filter((e): e is Entity => e !== undefined && e.active);
  }

  /**
   * Get entities with all specified component types
   */
  getEntitiesWithComponents(...componentTypes: string[]): Entity[] {
    if (componentTypes.length === 0) return this.getActiveEntities();
    if (componentTypes.length === 1) return this.getEntitiesWithComponent(componentTypes[0]!);

    // Find the smallest set to start with for efficiency
    let smallest: Set<string> | undefined;
    for (const type of componentTypes) {
      const set = this.entitiesByComponent.get(type);
      if (!set || set.size === 0) return [];
      if (!smallest || set.size < smallest.size) {
        smallest = set;
      }
    }

    if (!smallest) return [];

    // Filter to entities that have all required components
    return Array.from(smallest)
      .map((id) => this.entities.get(id))
      .filter((e): e is Entity => {
        if (!e || !e.active) return false;
        return componentTypes.every((type) => e.hasComponent(type));
      });
  }

  /**
   * Get entities with a specific tag
   */
  getEntitiesWithTag(tag: string): Entity[] {
    const ids = this.entitiesByTag.get(tag);
    if (!ids) return [];

    return Array.from(ids)
      .map((id) => this.entities.get(id))
      .filter((e): e is Entity => e !== undefined && e.active);
  }

  /**
   * Add a component to an entity and update indexes
   */
  addComponentToEntity(entityId: string, component: Component): void {
    const entity = this.entities.get(entityId);
    if (!entity) return;

    entity.addComponent(component);
    this.indexComponent(entityId, component.type);

    for (const callback of this.onComponentAddedCallbacks) {
      callback(entity, component.type);
    }
  }

  /**
   * Remove a component from an entity and update indexes
   */
  removeComponentFromEntity(entityId: string, componentType: string): void {
    const entity = this.entities.get(entityId);
    if (!entity) return;

    if (entity.removeComponent(componentType)) {
      this.unindexComponent(entityId, componentType);

      for (const callback of this.onComponentRemovedCallbacks) {
        callback(entity, componentType);
      }
    }
  }

  /**
   * Register callback for entity added
   */
  onEntityAdded(callback: EntityCallback): void {
    this.onEntityAddedCallbacks.push(callback);
  }

  /**
   * Register callback for entity removed
   */
  onEntityRemoved(callback: EntityCallback): void {
    this.onEntityRemovedCallbacks.push(callback);
  }

  /**
   * Register callback for component added
   */
  onComponentAdded(callback: ComponentCallback): void {
    this.onComponentAddedCallbacks.push(callback);
  }

  /**
   * Register callback for component removed
   */
  onComponentRemoved(callback: ComponentCallback): void {
    this.onComponentRemovedCallbacks.push(callback);
  }

  /**
   * Clear all entities
   */
  clear(): void {
    for (const entity of this.entities.values()) {
      entity.destroy();
    }
    this.entities.clear();
    this.entitiesByComponent.clear();
    this.entitiesByTag.clear();
  }

  /**
   * Get entity count
   */
  get count(): number {
    return this.entities.size;
  }

  // Private indexing methods
  private indexComponent(entityId: string, componentType: string): void {
    let set = this.entitiesByComponent.get(componentType);
    if (!set) {
      set = new Set();
      this.entitiesByComponent.set(componentType, set);
    }
    set.add(entityId);
  }

  private unindexComponent(entityId: string, componentType: string): void {
    const set = this.entitiesByComponent.get(componentType);
    if (set) {
      set.delete(entityId);
    }
  }

  private indexTag(entityId: string, tag: string): void {
    let set = this.entitiesByTag.get(tag);
    if (!set) {
      set = new Set();
      this.entitiesByTag.set(tag, set);
    }
    set.add(entityId);
  }

  private unindexTag(entityId: string, tag: string): void {
    const set = this.entitiesByTag.get(tag);
    if (set) {
      set.delete(entityId);
    }
  }
}
