/**
 * Tower Tier System
 * Tier scaling and rarity configuration for towers
 */

import {
  TowerRarity,
  type TowerTierConfig,
  type TowerStats,
} from "@/types/tower";

/**
 * Tier configurations for tower scaling
 * Tier 1 = Base, Tier 2 = Merged, Tier 3 = Advanced
 */
export const TOWER_TIER_CONFIGS: TowerTierConfig[] = [
  {
    tier: 1,
    statMultiplier: 1.0,
    costMultiplier: 1.0,
    minRarity: TowerRarity.Common,
    colorSaturation: 0.6,
  },
  {
    tier: 2,
    statMultiplier: 1.8,
    costMultiplier: 2.5,
    minRarity: TowerRarity.Uncommon,
    colorSaturation: 0.75,
  },
  {
    tier: 3,
    statMultiplier: 3.2,
    costMultiplier: 5.0,
    minRarity: TowerRarity.Rare,
    colorSaturation: 0.9,
  },
];

/**
 * Get tier configuration (safe bounds)
 */
export function getTierConfig(tier: number): TowerTierConfig {
  const index = Math.max(0, Math.min(tier - 1, TOWER_TIER_CONFIGS.length - 1));
  return TOWER_TIER_CONFIGS[index]!;
}

/**
 * Apply tier scaling to base stats
 */
export function applyTierScaling(baseStats: TowerStats, tier: number): TowerStats {
  const config = getTierConfig(tier);

  return {
    ...baseStats,
    damage: Math.round(baseStats.damage * config.statMultiplier),
    health: Math.round(baseStats.health * config.statMultiplier),
    armor: Math.round(baseStats.armor * config.statMultiplier),
    range: baseStats.range * (1 + (tier - 1) * 0.1),
    cost: Math.round(baseStats.cost * config.costMultiplier),
    upgradeCost: Math.round(baseStats.upgradeCost * config.costMultiplier),
    // Penetration stats scale slightly
    magicPen: Math.round(baseStats.magicPen * (1 + (tier - 1) * 0.3)),
    armorPen: Math.round(baseStats.armorPen * (1 + (tier - 1) * 0.3)),
  };
}

/**
 * Get rarity from tier and special recipe status
 */
export function getRarityFromTier(
  tier: number,
  isSpecial: boolean = false
): TowerRarity {
  const rarities: TowerRarity[][] = [
    [TowerRarity.Common, TowerRarity.Uncommon],
    [TowerRarity.Uncommon, TowerRarity.Rare],
    [TowerRarity.Rare, TowerRarity.Epic, TowerRarity.Legendary],
  ];

  const tierRarities = rarities[Math.min(tier - 1, 2)] || rarities[0]!;

  if (isSpecial && tierRarities.length > 1) {
    return tierRarities[tierRarities.length - 1]!;
  }

  return tierRarities[0]!;
}

/**
 * Get tier name for display
 */
export function getTierName(tier: number): string {
  const names = ["Base", "Merged", "Advanced"];
  return names[Math.max(0, Math.min(tier - 1, names.length - 1))] ?? "Base";
}

/**
 * Get rarity color for UI
 */
export function getRarityColor(rarity: TowerRarity): string {
  const colors: Record<TowerRarity, string> = {
    [TowerRarity.Common]: "#888888",
    [TowerRarity.Uncommon]: "#4caf50",
    [TowerRarity.Rare]: "#2196f3",
    [TowerRarity.Epic]: "#9c27b0",
    [TowerRarity.Legendary]: "#ff9800",
  };
  return colors[rarity];
}

/**
 * Get tier display color
 */
export function getTierDisplayColor(tier: number): string {
  const colors = ["#888888", "#aaaaaa", "#cccccc"];
  return colors[Math.max(0, Math.min(tier - 1, colors.length - 1))] ?? "#888888";
}
