import { Component, ComponentTypes } from "../core/Component";

/**
 * HealthComponent - Hit points and damage tracking.
 */
export class HealthComponent extends Component {
  readonly type = ComponentTypes.Health;

  public current: number;
  public max: number;
  public armor: number;
  public magicResistance: number;
  public invulnerable: boolean;

  constructor(
    maxHealth: number,
    armor: number = 0,
    magicResistance: number = 0
  ) {
    super();
    this.max = maxHealth;
    this.current = maxHealth;
    this.armor = armor;
    this.magicResistance = magicResistance;
    this.invulnerable = false;
  }

  /**
   * Get health as percentage (0-1)
   */
  get percentage(): number {
    return this.current / this.max;
  }

  /**
   * Check if dead
   */
  get isDead(): boolean {
    return this.current <= 0;
  }

  /**
   * Check if at full health
   */
  get isFullHealth(): boolean {
    return this.current >= this.max;
  }

  /**
   * Take damage with armor/resistance calculation
   */
  takeDamage(
    amount: number,
    isMagical: boolean = false,
    ignoreArmor: boolean = false
  ): number {
    if (this.invulnerable || amount <= 0) return 0;

    let actualDamage = amount;

    if (!ignoreArmor) {
      const resistance = isMagical ? this.magicResistance : this.armor;
      // Damage reduction formula: damage * (100 / (100 + resistance))
      actualDamage = amount * (100 / (100 + resistance));
    }

    actualDamage = Math.max(1, Math.floor(actualDamage)); // Minimum 1 damage
    this.current = Math.max(0, this.current - actualDamage);

    return actualDamage;
  }

  /**
   * Heal by amount
   */
  heal(amount: number): number {
    if (amount <= 0) return 0;

    const oldHealth = this.current;
    this.current = Math.min(this.max, this.current + amount);
    return this.current - oldHealth;
  }

  /**
   * Set to full health
   */
  fullHeal(): void {
    this.current = this.max;
  }

  clone(): HealthComponent {
    const component = new HealthComponent(
      this.max,
      this.armor,
      this.magicResistance
    );
    component.current = this.current;
    component.invulnerable = this.invulnerable;
    return component;
  }
}
