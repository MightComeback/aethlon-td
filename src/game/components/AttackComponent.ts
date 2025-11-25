import { Component, ComponentTypes } from "../core/Component";
import { TargetingMode } from "@/types/tower";

/**
 * AttackComponent - Attack stats and targeting for towers.
 */
export class AttackComponent extends Component {
  readonly type = ComponentTypes.Attack;

  public damage: number;
  public attackSpeed: number; // attacks per second
  public range: number;
  public targetingMode: TargetingMode;
  public isMagical: boolean;
  public ignoresArmor: boolean;

  // Cooldown tracking
  public cooldown: number; // time until next attack
  public currentTargetId: string | null;

  // Special effects
  public splashRadius: number;
  public chainCount: number;
  public pierceCount: number;
  public slowAmount: number;
  public slowDuration: number;
  public burnDamage: number;
  public burnDuration: number;

  constructor(
    damage: number,
    attackSpeed: number,
    range: number,
    targetingMode: TargetingMode = TargetingMode.First
  ) {
    super();
    this.damage = damage;
    this.attackSpeed = attackSpeed;
    this.range = range;
    this.targetingMode = targetingMode;
    this.isMagical = false;
    this.ignoresArmor = false;
    this.cooldown = 0;
    this.currentTargetId = null;

    // Special effects defaults
    this.splashRadius = 0;
    this.chainCount = 0;
    this.pierceCount = 0;
    this.slowAmount = 0;
    this.slowDuration = 0;
    this.burnDamage = 0;
    this.burnDuration = 0;
  }

  /**
   * Get attack interval in seconds
   */
  get attackInterval(): number {
    return 1 / this.attackSpeed;
  }

  /**
   * Check if can attack
   */
  get canAttack(): boolean {
    return this.cooldown <= 0;
  }

  /**
   * Reset cooldown after attack
   */
  resetCooldown(): void {
    this.cooldown = this.attackInterval;
  }

  /**
   * Update cooldown
   */
  updateCooldown(deltaTime: number): void {
    if (this.cooldown > 0) {
      this.cooldown = Math.max(0, this.cooldown - deltaTime);
    }
  }

  /**
   * Check if a point is in range
   */
  isInRange(distance: number): boolean {
    return distance <= this.range;
  }

  clone(): AttackComponent {
    const component = new AttackComponent(
      this.damage,
      this.attackSpeed,
      this.range,
      this.targetingMode
    );
    component.isMagical = this.isMagical;
    component.ignoresArmor = this.ignoresArmor;
    component.splashRadius = this.splashRadius;
    component.chainCount = this.chainCount;
    component.pierceCount = this.pierceCount;
    component.slowAmount = this.slowAmount;
    component.slowDuration = this.slowDuration;
    component.burnDamage = this.burnDamage;
    component.burnDuration = this.burnDuration;
    return component;
  }
}
