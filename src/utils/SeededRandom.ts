/**
 * Seeded pseudo-random number generator using Mulberry32 algorithm.
 * Provides deterministic random number generation from a seed value.
 */
export class SeededRandom {
  private state: number;

  constructor(seed: string | number) {
    this.state = typeof seed === "string" ? this.hashString(seed) : seed >>> 0;
    if (this.state === 0) this.state = 1;
  }

  /**
   * Hash a string to a 32-bit integer for seeding
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash) || 1;
  }

  /**
   * Generate next random number in [0, 1)
   * Core Mulberry32 algorithm
   */
  next(): number {
    this.state |= 0;
    this.state = (this.state + 0x6d2b79f5) | 0;
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Generate random integer in [min, max] (inclusive)
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generate random float in [min, max)
   */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Generate random boolean with given probability of true
   */
  nextBool(probability = 0.5): boolean {
    return this.next() < probability;
  }

  /**
   * Shuffle array in place using Fisher-Yates algorithm
   */
  shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [array[i], array[j]] = [array[j]!, array[i]!];
    }
    return array;
  }

  /**
   * Pick a random element from array
   */
  pick<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)]!;
  }

  /**
   * Pick a random element using weighted probabilities
   * @param items Array of items
   * @param weights Array of weights (must sum to any positive number)
   */
  weightedPick<T>(items: T[], weights: number[]): T {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = this.next() * totalWeight;

    for (let i = 0; i < items.length; i++) {
      random -= weights[i]!;
      if (random <= 0) {
        return items[i]!;
      }
    }

    return items[items.length - 1]!;
  }
}

/**
 * Generate a random seed string
 */
export function generateSeed(): string {
  return `map-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
