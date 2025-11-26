/**
 * Weather Type Definitions
 * Data-driven configuration for all weather types
 */

import { WeatherType, WeatherDefinition } from "@/types/weather";

export const WEATHER_DEFINITIONS: Record<WeatherType, WeatherDefinition> = {
  [WeatherType.Sunny]: {
    type: WeatherType.Sunny,
    name: "Sunny",
    description: "Clear skies with bright sunlight",
    icon: "sun",
    visuals: {
      particleDensity: 0,
      particleSpeed: 0,
      particleSize: 0,
      particleColor: "#ffffff",
      particleOpacity: 0,
      screenDarkening: 0,
      fogDensity: 0,
      fogColor: "#ffffff",
    },
    lighting: {
      ambientColor: "#ffffff",
      ambientIntensity: 0.6,
      directionalColor: "#fff5e6",
      directionalIntensity: 0.8,
      directionalPosition: [15, 25, 12],
    },
    modifiers: {},
    transitionDuration: 3,
  },

  [WeatherType.Rainy]: {
    type: WeatherType.Rainy,
    name: "Rainy",
    description: "Light rain showers dampen the battlefield",
    icon: "cloud-rain",
    visuals: {
      particleType: "rain",
      particleDensity: 1,
      particleSpeed: 15,
      particleSize: 0.02,
      particleColor: "#6699cc",
      particleOpacity: 0.5,
      screenDarkening: 0.15,
      screenTint: "#4a6a8a",
      screenTintStrength: 0.1,
      fogDensity: 0.1,
      fogColor: "#8899aa",
    },
    lighting: {
      ambientColor: "#aabbcc",
      ambientIntensity: 0.3,
      directionalColor: "#8899aa",
      directionalIntensity: 0.2,
      directionalPosition: [15, 25, 12],
    },
    modifiers: {
      elementBonuses: {
        water: 1.2, // +20% water damage
        fire: 0.8, // -20% fire damage
      },
    },
    transitionDuration: 4,
  },

  [WeatherType.HeavyRain]: {
    type: WeatherType.HeavyRain,
    name: "Heavy Rain",
    description: "Torrential downpour reduces visibility",
    icon: "cloud-rain-heavy",
    visuals: {
      particleType: "rain",
      particleDensity: 2.5,
      particleSpeed: 20,
      particleSize: 0.025,
      particleColor: "#5588bb",
      particleOpacity: 0.6,
      screenDarkening: 0.3,
      screenTint: "#3a5a7a",
      screenTintStrength: 0.2,
      fogDensity: 0.25,
      fogColor: "#667788",
    },
    lighting: {
      ambientColor: "#8899aa",
      ambientIntensity: 0.2,
      directionalColor: "#667788",
      directionalIntensity: 0.1,
      directionalPosition: [15, 25, 12],
    },
    modifiers: {
      rangeMultiplier: 0.8, // -20% tower range
      elementBonuses: {
        water: 1.3, // +30% water damage
        fire: 0.6, // -40% fire damage
      },
    },
    transitionDuration: 3,
  },

  [WeatherType.Thunderstorm]: {
    type: WeatherType.Thunderstorm,
    name: "Thunderstorm",
    description: "Lightning illuminates the darkened battlefield",
    icon: "cloud-lightning",
    visuals: {
      particleType: "rain",
      particleDensity: 3,
      particleSpeed: 22,
      particleSize: 0.028,
      particleColor: "#4477aa",
      particleOpacity: 0.7,
      screenDarkening: 0.7, // Very dark
      screenTint: "#1a2433",
      screenTintStrength: 0.4,
      fogDensity: 0.35,
      fogColor: "#445566",
    },
    lighting: {
      ambientColor: "#2d3a4d",
      ambientIntensity: 0.1, // Near-black
      directionalColor: "#4a5a6d",
      directionalIntensity: 0.05,
      directionalPosition: [15, 25, 12],
      flashIntensity: 2.0, // Bright lightning flash
      flashColor: "#e6f0ff",
    },
    modifiers: {
      rangeMultiplier: 0.6, // -40% tower range (visibility)
      enemySpeedMultiplier: 0.9, // -10% enemy speed (slowed by storm)
      elementBonuses: {
        lightning: 1.6, // +60% lightning damage
        water: 1.2, // +20% water damage
        fire: 0.6, // -40% fire damage
      },
    },
    transitionDuration: 5,
    validBiomes: ["grassland", "forest", "swamp"],
  },

  [WeatherType.Snowy]: {
    type: WeatherType.Snowy,
    name: "Snowy",
    description: "Gentle snowfall blankets the battlefield",
    icon: "snowflake",
    visuals: {
      particleType: "snow",
      particleDensity: 1.5,
      particleSpeed: 3,
      particleSize: 0.04,
      particleColor: "#ffffff",
      particleOpacity: 0.8,
      screenDarkening: 0.05,
      screenTint: "#cce0ff",
      screenTintStrength: 0.15,
      fogDensity: 0.2,
      fogColor: "#ddeeff",
    },
    lighting: {
      ambientColor: "#ddeeff",
      ambientIntensity: 0.45,
      directionalColor: "#ccddee",
      directionalIntensity: 0.3,
      directionalPosition: [15, 25, 12],
    },
    modifiers: {
      enemySpeedMultiplier: 0.9, // -10% enemy speed (slowed by cold)
      elementBonuses: {
        ice: 1.4, // +40% ice damage
        water: 1.1, // +10% water damage
        fire: 0.7, // -30% fire damage
      },
    },
    transitionDuration: 6,
    validBiomes: ["tundra", "forest", "grassland"],
  },
};

/**
 * Get a weather definition by type
 */
export function getWeatherDefinition(type: WeatherType): WeatherDefinition {
  return WEATHER_DEFINITIONS[type];
}

/**
 * Get all weather definitions as an array
 */
export function getAllWeatherDefinitions(): WeatherDefinition[] {
  return Object.values(WEATHER_DEFINITIONS);
}

/**
 * Get weather types valid for a specific biome
 */
export function getWeatherTypesForBiome(biome: string): WeatherType[] {
  return Object.values(WEATHER_DEFINITIONS)
    .filter((def) => !def.validBiomes || def.validBiomes.includes(biome))
    .map((def) => def.type);
}

/**
 * Get a random weather type, optionally filtered by biome
 */
export function getRandomWeatherType(
  allowedTypes?: WeatherType[],
  biome?: string
): WeatherType {
  let types = allowedTypes ?? Object.values(WeatherType);

  if (biome) {
    const biomeTypes = getWeatherTypesForBiome(biome);
    types = types.filter((t) => biomeTypes.includes(t));
  }

  if (types.length === 0) {
    return WeatherType.Sunny;
  }

  const selected = types[Math.floor(Math.random() * types.length)];
  return selected ?? WeatherType.Sunny;
}
