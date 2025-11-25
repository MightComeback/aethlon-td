import { Component, ComponentTypes } from "../core/Component";

/**
 * MovementComponent - Movement speed and path following.
 */
export class MovementComponent extends Component {
  readonly type = ComponentTypes.Movement;

  public speed: number;
  public baseSpeed: number;
  public currentWaypointIndex: number;
  public pathProgress: number; // 0-1 progress along entire path

  // Modifiers
  public speedMultiplier: number;
  public isStunned: boolean;

  constructor(speed: number) {
    super();
    this.speed = speed;
    this.baseSpeed = speed;
    this.currentWaypointIndex = 0;
    this.pathProgress = 0;
    this.speedMultiplier = 1;
    this.isStunned = false;
  }

  /**
   * Get effective speed after modifiers
   */
  get effectiveSpeed(): number {
    if (this.isStunned) return 0;
    return this.speed * this.speedMultiplier;
  }

  /**
   * Apply slow effect
   */
  applySlow(multiplier: number): void {
    this.speedMultiplier = Math.max(0.1, Math.min(1, multiplier));
  }

  /**
   * Reset speed to normal
   */
  resetSpeed(): void {
    this.speedMultiplier = 1;
    this.speed = this.baseSpeed;
  }

  /**
   * Stun (stop movement)
   */
  stun(): void {
    this.isStunned = true;
  }

  /**
   * Remove stun
   */
  unstun(): void {
    this.isStunned = false;
  }

  clone(): MovementComponent {
    const component = new MovementComponent(this.baseSpeed);
    component.speed = this.speed;
    component.currentWaypointIndex = this.currentWaypointIndex;
    component.pathProgress = this.pathProgress;
    component.speedMultiplier = this.speedMultiplier;
    component.isStunned = this.isStunned;
    return component;
  }
}
