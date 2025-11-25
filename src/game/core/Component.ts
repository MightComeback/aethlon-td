import type { Entity } from "./Entity";

/**
 * Component - Pure data container attached to an Entity.
 * Components should not contain logic, only data.
 */
export abstract class Component {
  /**
   * Unique type identifier for this component class
   */
  abstract readonly type: string;

  /**
   * Reference to the entity this component is attached to
   */
  public entity: Entity | null = null;

  /**
   * Clone this component's data
   */
  abstract clone(): Component;
}

// Component type names as constants for type safety
export const ComponentTypes = {
  Transform: "transform",
  Sprite: "sprite",
  Health: "health",
  Movement: "movement",
  Attack: "attack",
  Tower: "tower",
  Enemy: "enemy",
  Projectile: "projectile",
  StatusEffects: "status_effects",
  Selectable: "selectable",
  Collider: "collider",
} as const;

export type ComponentType = (typeof ComponentTypes)[keyof typeof ComponentTypes];
