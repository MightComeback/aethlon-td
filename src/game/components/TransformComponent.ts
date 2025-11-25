import { Component, ComponentTypes } from "../core/Component";

/**
 * TransformComponent - Position, rotation, and scale in game world.
 */
export class TransformComponent extends Component {
  readonly type = ComponentTypes.Transform;

  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0,
    public rotation: number = 0,
    public scaleX: number = 1,
    public scaleY: number = 1
  ) {
    super();
  }

  /**
   * Set position
   */
  setPosition(x: number, y: number, z: number = 0): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Translate by delta
   */
  translate(dx: number, dy: number, dz: number = 0): this {
    this.x += dx;
    this.y += dy;
    this.z += dz;
    return this;
  }

  /**
   * Get distance to another transform
   */
  distanceTo(other: TransformComponent): number {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Get distance squared (faster for comparisons)
   */
  distanceToSquared(other: TransformComponent): number {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return dx * dx + dy * dy;
  }

  clone(): TransformComponent {
    return new TransformComponent(
      this.x,
      this.y,
      this.z,
      this.rotation,
      this.scaleX,
      this.scaleY
    );
  }
}
