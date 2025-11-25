import type { Component } from "./Component";

/**
 * Entity - A unique identifier with a collection of components.
 * Entities are lightweight containers that gain behavior through their components.
 */
export class Entity {
  public readonly id: string;
  private components: Map<string, Component> = new Map();
  private tags: Set<string> = new Set();
  public active = true;

  constructor(id?: string) {
    this.id = id ?? crypto.randomUUID();
  }

  /**
   * Add a component to this entity
   */
  addComponent<T extends Component>(component: T): this {
    this.components.set(component.type, component);
    component.entity = this;
    return this;
  }

  /**
   * Remove a component by type
   */
  removeComponent(type: string): boolean {
    const component = this.components.get(type);
    if (component) {
      component.entity = null;
      return this.components.delete(type);
    }
    return false;
  }

  /**
   * Get a component by type
   */
  getComponent<T extends Component>(type: string): T | undefined {
    return this.components.get(type) as T | undefined;
  }

  /**
   * Check if entity has a component type
   */
  hasComponent(type: string): boolean {
    return this.components.has(type);
  }

  /**
   * Check if entity has all specified component types
   */
  hasComponents(...types: string[]): boolean {
    return types.every((type) => this.components.has(type));
  }

  /**
   * Get all components
   */
  getAllComponents(): Component[] {
    return Array.from(this.components.values());
  }

  /**
   * Add a tag for filtering
   */
  addTag(tag: string): this {
    this.tags.add(tag);
    return this;
  }

  /**
   * Remove a tag
   */
  removeTag(tag: string): boolean {
    return this.tags.delete(tag);
  }

  /**
   * Check if entity has a tag
   */
  hasTag(tag: string): boolean {
    return this.tags.has(tag);
  }

  /**
   * Get all tags
   */
  getTags(): string[] {
    return Array.from(this.tags);
  }

  /**
   * Destroy this entity and clean up components
   */
  destroy(): void {
    for (const component of this.components.values()) {
      component.entity = null;
    }
    this.components.clear();
    this.tags.clear();
    this.active = false;
  }
}
