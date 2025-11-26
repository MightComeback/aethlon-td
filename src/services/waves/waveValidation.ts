/**
 * Wave Validation System
 * Validates wave configurations for errors and provides warnings
 */

import type { WaveConfig, WaveGroup, MapWaveOverride } from "@/types/enemy";
import { getEnemyDefinition } from "@/data/enemies";
import { estimateWaveDuration, getWaveMaxTier } from "@/data/waves/waveUtils";

export interface ValidationError {
  waveNumber?: number;
  groupIndex?: number;
  message: string;
  severity: "error" | "warning";
  field?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface WaveStatistics {
  totalEnemies: number;
  averageDifficulty: number;
  estimatedDuration: number; // in seconds
  totalGoldEarned: number;
  bossWaveCount: number;
  flyingWaveCount: number;
}

// ============================================================================
// Validation Rules
// ============================================================================

/**
 * Validate a single wave configuration
 */
export function validateWave(wave: WaveConfig, spawnPointCount: number = 1): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Rule: Wave must have at least one group
  if (wave.groups.length === 0) {
    errors.push({
      waveNumber: wave.waveNumber,
      message: "Wave has no enemy groups",
      severity: "error",
      field: "groups",
    });
  }

  // Validate each group
  wave.groups.forEach((group, index) => {
    const groupErrors = validateWaveGroup(group, wave.waveNumber, index, spawnPointCount);
    errors.push(...groupErrors.filter((e) => e.severity === "error"));
    warnings.push(...groupErrors.filter((e) => e.severity === "warning"));
  });

  // Rule: Boss wave should have bonus reward
  if (wave.isBossWave && wave.bonusReward === 0) {
    warnings.push({
      waveNumber: wave.waveNumber,
      message: "Boss wave should have bonus reward",
      severity: "warning",
      field: "bonusReward",
    });
  }

  // Rule: Check difficulty progression (if this is not wave 1)
  if (wave.waveNumber > 1 && wave.difficulty < wave.waveNumber * 0.5) {
    warnings.push({
      waveNumber: wave.waveNumber,
      message: `Difficulty (${wave.difficulty}) may be too low for wave ${wave.waveNumber}`,
      severity: "warning",
      field: "difficulty",
    });
  }

  // Rule: Very long wave duration
  const duration = estimateWaveDuration(wave);
  if (duration > 180000) {
    // 3 minutes
    warnings.push({
      waveNumber: wave.waveNumber,
      message: `Wave duration is very long (${Math.round(duration / 1000)}s)`,
      severity: "warning",
      field: "duration",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a wave group
 */
function validateWaveGroup(
  group: WaveGroup,
  waveNumber: number,
  groupIndex: number,
  spawnPointCount: number
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Rule: Enemy type must be valid
  const definition = getEnemyDefinition(group.enemyType);
  if (!definition) {
    errors.push({
      waveNumber,
      groupIndex,
      message: `Invalid enemy type: ${group.enemyType}`,
      severity: "error",
      field: "enemyType",
    });
    return errors; // Can't validate further without definition
  }

  // Rule: Tier must be 1-5
  if (group.tier < 1 || group.tier > 5) {
    errors.push({
      waveNumber,
      groupIndex,
      message: `Invalid tier ${group.tier} (must be 1-5)`,
      severity: "error",
      field: "tier",
    });
  }

  // Rule: Count must be positive
  if (group.count <= 0) {
    errors.push({
      waveNumber,
      groupIndex,
      message: "Enemy count must be positive",
      severity: "error",
      field: "count",
    });
  }

  // Warning: Very high enemy count
  if (group.count > 100) {
    errors.push({
      waveNumber,
      groupIndex,
      message: `Very high enemy count (${group.count})`,
      severity: "warning",
      field: "count",
    });
  }

  // Rule: Spawn delay must be reasonable
  if (group.spawnDelay < 100) {
    errors.push({
      waveNumber,
      groupIndex,
      message: "Spawn delay too short (< 100ms)",
      severity: "warning",
      field: "spawnDelay",
    });
  }

  if (group.spawnDelay > 10000) {
    errors.push({
      waveNumber,
      groupIndex,
      message: "Spawn delay very long (> 10s)",
      severity: "warning",
      field: "spawnDelay",
    });
  }

  // Rule: Spawn point must be valid
  if (group.spawnPoint !== undefined && group.spawnPoint >= spawnPointCount) {
    errors.push({
      waveNumber,
      groupIndex,
      message: `Spawn point ${group.spawnPoint} doesn't exist (only ${spawnPointCount} available)`,
      severity: "error",
      field: "spawnPoint",
    });
  }

  // Warning: High tier early game
  const expectedMaxTier = Math.ceil(waveNumber / 10);
  if (group.tier > expectedMaxTier + 1) {
    errors.push({
      waveNumber,
      groupIndex,
      message: `Tier ${group.tier} may be too high for wave ${waveNumber}`,
      severity: "warning",
      field: "tier",
    });
  }

  return errors;
}

/**
 * Validate an entire wave sequence
 */
export function validateWaveSequence(
  waves: WaveConfig[],
  spawnPointCount: number = 1
): ValidationResult {
  const allErrors: ValidationError[] = [];
  const allWarnings: ValidationError[] = [];

  // Validate each wave individually
  waves.forEach((wave) => {
    const result = validateWave(wave, spawnPointCount);
    allErrors.push(...result.errors);
    allWarnings.push(...result.warnings);
  });

  // Check wave number sequence
  const sortedWaves = [...waves].sort((a, b) => a.waveNumber - b.waveNumber);
  for (let i = 0; i < sortedWaves.length - 1; i++) {
    const current = sortedWaves[i]!;
    const next = sortedWaves[i + 1]!;

    // Warning: Difficulty spike
    const diffIncrease = next.difficulty - current.difficulty;
    if (diffIncrease > 25) {
      allWarnings.push({
        waveNumber: next.waveNumber,
        message: `Large difficulty spike from wave ${current.waveNumber} (+${diffIncrease})`,
        severity: "warning",
        field: "difficulty",
      });
    }

    // Warning: Difficulty decrease
    if (next.difficulty < current.difficulty * 0.8) {
      allWarnings.push({
        waveNumber: next.waveNumber,
        message: `Difficulty decreased from wave ${current.waveNumber}`,
        severity: "warning",
        field: "difficulty",
      });
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}

/**
 * Validate MapWaveOverride configuration
 */
export function validateMapWaveOverride(
  override: MapWaveOverride,
  spawnPointCount: number = 1
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Rule: Must have at least one wave
  if (override.waves.length === 0) {
    errors.push({
      message: "Wave configuration has no waves",
      severity: "error",
    });
    return { isValid: false, errors, warnings };
  }

  // Rule: In replace mode, wave numbers should be sequential starting from 1
  if (override.replaceGlobal) {
    const waveNumbers = override.waves.map((w) => w.waveNumber).sort((a, b) => a - b);

    // Check for gaps
    for (let i = 1; i <= waveNumbers.length; i++) {
      if (!waveNumbers.includes(i)) {
        warnings.push({
          message: `Missing wave ${i} in replace mode (waves should be sequential)`,
          severity: "warning",
        });
      }
    }

    // Warning: Very few waves in replace mode
    if (override.waves.length < 10) {
      warnings.push({
        message: `Only ${override.waves.length} waves in replace mode (recommended: 20+)`,
        severity: "warning",
      });
    }
  }

  // Validate wave sequence
  const sequenceResult = validateWaveSequence(override.waves, spawnPointCount);
  errors.push(...sequenceResult.errors);
  warnings.push(...sequenceResult.warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Calculate statistics for a wave sequence
 */
export function calculateWaveStatistics(waves: WaveConfig[]): WaveStatistics {
  let totalEnemies = 0;
  let totalDifficulty = 0;
  let totalDuration = 0;
  let totalGold = 0;
  let bossWaveCount = 0;
  let flyingWaveCount = 0;

  waves.forEach((wave) => {
    // Count enemies
    const waveEnemies = wave.groups.reduce((sum, g) => sum + g.count, 0);
    totalEnemies += waveEnemies;

    // Sum difficulty
    totalDifficulty += wave.difficulty;

    // Estimate duration
    totalDuration += estimateWaveDuration(wave);

    // Calculate gold earned
    wave.groups.forEach((group) => {
      const definition = getEnemyDefinition(group.enemyType);
      if (definition) {
        const bounty = definition.baseStats.bounty * group.tier * group.count;
        totalGold += bounty;
      }
    });
    totalGold += wave.bonusReward;

    // Count boss waves
    if (wave.isBossWave) {
      bossWaveCount++;
    }

    // Check for flying enemies
    const hasFlying = wave.groups.some((g) => {
      const def = getEnemyDefinition(g.enemyType);
      return def?.category === "flying";
    });
    if (hasFlying) {
      flyingWaveCount++;
    }
  });

  return {
    totalEnemies,
    averageDifficulty: waves.length > 0 ? totalDifficulty / waves.length : 0,
    estimatedDuration: totalDuration / 1000, // Convert to seconds
    totalGoldEarned: totalGold,
    bossWaveCount,
    flyingWaveCount,
  };
}

/**
 * Check if wave configuration is balanced
 * Returns recommendations for improving balance
 */
export function checkBalance(waves: WaveConfig[]): {
  isBalanced: boolean;
  recommendations: string[];
} {
  const recommendations: string[] = [];
  let isBalanced = true;

  if (waves.length === 0) {
    return { isBalanced: false, recommendations: ["Add at least one wave"] };
  }

  const stats = calculateWaveStatistics(waves);

  // Check average difficulty
  if (stats.averageDifficulty < 10) {
    recommendations.push("Waves may be too easy overall");
    isBalanced = false;
  } else if (stats.averageDifficulty > 60) {
    recommendations.push("Waves may be too difficult overall");
    isBalanced = false;
  }

  // Check boss wave frequency
  const bossFrequency = stats.bossWaveCount / waves.length;
  if (bossFrequency > 0.3) {
    recommendations.push("Too many boss waves (recommended: 10-20% of waves)");
  } else if (bossFrequency < 0.05 && waves.length > 20) {
    recommendations.push("Consider adding more boss waves");
  }

  // Check for flying enemies
  if (stats.flyingWaveCount === 0 && waves.length > 10) {
    recommendations.push("No flying enemies - consider adding some for variety");
  }

  // Check gold progression
  const expectedGold = waves.length * 100; // Rough estimate
  if (stats.totalGoldEarned < expectedGold * 0.5) {
    recommendations.push("Low gold rewards - players may struggle to afford upgrades");
    isBalanced = false;
  }

  return { isBalanced, recommendations };
}
