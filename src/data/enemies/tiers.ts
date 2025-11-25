import type { TierConfig, EnemyStats } from "@/types/enemy";

/**
 * Tier configurations for enemy scaling
 * Higher tiers have better stats and are visually distinguished by color shift
 */
export const TIER_CONFIGS: TierConfig[] = [
  {
    tier: 1,
    healthMultiplier: 1.0,
    speedMultiplier: 1.0,
    armorMultiplier: 1.0,
    bountyMultiplier: 1.0,
    colorShift: 0,
  },
  {
    tier: 2,
    healthMultiplier: 1.8,
    speedMultiplier: 1.1,
    armorMultiplier: 1.3,
    bountyMultiplier: 1.5,
    colorShift: 0.1,
  },
  {
    tier: 3,
    healthMultiplier: 3.0,
    speedMultiplier: 1.2,
    armorMultiplier: 1.6,
    bountyMultiplier: 2.2,
    colorShift: 0.2,
  },
  {
    tier: 4,
    healthMultiplier: 5.0,
    speedMultiplier: 1.3,
    armorMultiplier: 2.0,
    bountyMultiplier: 3.5,
    colorShift: 0.3,
  },
  {
    tier: 5,
    healthMultiplier: 8.0,
    speedMultiplier: 1.4,
    armorMultiplier: 2.5,
    bountyMultiplier: 5.0,
    colorShift: 0.4,
  },
];

/**
 * Get tier configuration by tier number (1-5)
 */
export function getTierConfig(tier: number): TierConfig {
  const config = TIER_CONFIGS[Math.max(0, Math.min(tier - 1, TIER_CONFIGS.length - 1))];
  return config ?? TIER_CONFIGS[0]!;
}

/**
 * Apply tier multipliers to base enemy stats
 */
export function applyTier(
  baseStats: Omit<EnemyStats, "health">,
  tier: number
): EnemyStats {
  const config = getTierConfig(tier);

  return {
    maxHealth: Math.round(baseStats.maxHealth * config.healthMultiplier),
    health: Math.round(baseStats.maxHealth * config.healthMultiplier),
    speed: baseStats.speed * config.speedMultiplier,
    armor: Math.round(baseStats.armor * config.armorMultiplier),
    magicResistance: Math.round(baseStats.magicResistance * config.armorMultiplier),
    bounty: Math.round(baseStats.bounty * config.bountyMultiplier),
    score: Math.round(baseStats.score * config.bountyMultiplier),
  };
}

/**
 * Parse a hex color string to RGB components (0-255)
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 128, g: 128, b: 128 };
  }
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
  };
}

/**
 * Convert RGB components (0-255) to hex string
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) =>
    Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Shift a grayscale color towards white (lighter) based on tier
 * Amount is 0-1 where 0.4 means 40% shift towards white
 */
export function shiftGrayscale(color: string, amount: number): string {
  const { r, g, b } = hexToRgb(color);

  // Shift towards white (255)
  const newR = r + (255 - r) * amount;
  const newG = g + (255 - g) * amount;
  const newB = b + (255 - b) * amount;

  return rgbToHex(newR, newG, newB);
}

/**
 * Get the color shift amount for a given tier
 */
export function getTierColorShift(tier: number): number {
  return getTierConfig(tier).colorShift;
}

/**
 * Get tier name for display
 */
export function getTierName(tier: number): string {
  const names = ["Common", "Uncommon", "Rare", "Elite", "Legendary"];
  return names[Math.max(0, Math.min(tier - 1, names.length - 1))] ?? "Common";
}

/**
 * Get tier color for UI display
 */
export function getTierDisplayColor(tier: number): string {
  const colors = ["#888888", "#aaaaaa", "#cccccc", "#dddddd", "#ffffff"];
  return colors[Math.max(0, Math.min(tier - 1, colors.length - 1))] ?? "#888888";
}
