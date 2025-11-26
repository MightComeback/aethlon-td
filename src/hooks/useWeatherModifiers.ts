/**
 * useWeatherModifiers Hook
 * Provides convenient access to weather-based gameplay modifiers
 * Use this hook in tower and enemy systems to apply weather effects
 */

import { useWeatherStore } from "@/stores/weatherStore";
import { WeatherType } from "@/types/weather";

export interface WeatherModifiers {
  // Current weather info
  currentWeather: WeatherType;
  isThunderstorm: boolean;

  // Modifier values
  rangeMultiplier: number;
  enemySpeedMultiplier: number;

  // Element-specific multipliers
  getElementDamageMultiplier: (element: string) => number;

  // Convenience methods
  applyRangeModifier: (baseRange: number) => number;
  applySpeedModifier: (baseSpeed: number) => number;
  applyDamageModifier: (baseDamage: number, element: string) => number;
}

/**
 * Hook to access weather-based gameplay modifiers
 * @returns WeatherModifiers object with all modifier values and helper methods
 */
export function useWeatherModifiers(): WeatherModifiers {
  const currentWeather = useWeatherStore((s) => s.current);
  const getElementDamageMultiplier = useWeatherStore(
    (s) => s.getElementDamageMultiplier
  );
  const getRangeMultiplier = useWeatherStore((s) => s.getRangeMultiplier);
  const getEnemySpeedMultiplier = useWeatherStore(
    (s) => s.getEnemySpeedMultiplier
  );

  const rangeMultiplier = getRangeMultiplier();
  const enemySpeedMultiplier = getEnemySpeedMultiplier();

  return {
    currentWeather,
    isThunderstorm: currentWeather === WeatherType.Thunderstorm,

    rangeMultiplier,
    enemySpeedMultiplier,

    getElementDamageMultiplier,

    applyRangeModifier: (baseRange: number) => baseRange * rangeMultiplier,

    applySpeedModifier: (baseSpeed: number) => baseSpeed * enemySpeedMultiplier,

    applyDamageModifier: (baseDamage: number, element: string) =>
      baseDamage * getElementDamageMultiplier(element),
  };
}

/**
 * Non-hook version for use in game systems (outside React components)
 * Gets the current weather modifiers from the store directly
 */
export function getWeatherModifiers(): {
  rangeMultiplier: number;
  enemySpeedMultiplier: number;
  getElementDamageMultiplier: (element: string) => number;
} {
  const state = useWeatherStore.getState();

  return {
    rangeMultiplier: state.effectiveModifiers.rangeMultiplier ?? 1,
    enemySpeedMultiplier: state.effectiveModifiers.enemySpeedMultiplier ?? 1,
    getElementDamageMultiplier: (element: string) =>
      state.effectiveModifiers.elementBonuses?.[element] ?? 1,
  };
}

/**
 * Check if weather is affecting visibility (for thunderstorm mechanics)
 * Returns true during lightning flash, false otherwise
 */
export function useWeatherVisibility(): {
  isVisible: boolean;
  visibility: number; // 0-1, where 1 is fully visible
} {
  const currentWeather = useWeatherStore((s) => s.current);
  const lightning = useWeatherStore((s) => s.lightning);
  const effectiveVisuals = useWeatherStore((s) => s.effectiveVisuals);

  // During thunderstorm, visibility is low except during lightning
  if (currentWeather === WeatherType.Thunderstorm) {
    const baseVisibility = 1 - effectiveVisuals.screenDarkening;
    const flashBoost = lightning.active ? lightning.intensity : 0;
    const visibility = Math.min(1, baseVisibility + flashBoost);

    return {
      isVisible: visibility > 0.3,
      visibility,
    };
  }

  // Normal visibility for other weather
  return {
    isVisible: true,
    visibility: 1 - effectiveVisuals.screenDarkening * 0.5,
  };
}

/**
 * Get all active element bonuses/penalties
 * Useful for UI display
 */
export function useWeatherElementEffects(): Array<{
  element: string;
  multiplier: number;
  isBonus: boolean;
}> {
  const effectiveModifiers = useWeatherStore((s) => s.effectiveModifiers);

  const elementBonuses = effectiveModifiers.elementBonuses ?? {};

  return Object.entries(elementBonuses)
    .filter(([_, mult]) => mult !== 1)
    .map(([element, multiplier]) => ({
      element,
      multiplier,
      isBonus: multiplier > 1,
    }))
    .sort((a, b) => b.multiplier - a.multiplier);
}
