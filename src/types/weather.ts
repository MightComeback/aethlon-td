/**
 * Weather System Type Definitions
 */

export enum WeatherType {
  Sunny = "sunny",
  Rainy = "rainy",
  HeavyRain = "heavy_rain",
  Thunderstorm = "thunderstorm",
  Snowy = "snowy",
}

export type QualityLevel = "low" | "medium" | "high" | "ultra";

// Visual configuration for a weather type
export interface WeatherVisuals {
  particleType?: "rain" | "snow";
  particleDensity: number; // Base particle count multiplier
  particleSpeed: number; // Fall speed
  particleSize: number; // Particle scale
  particleColor: string; // Hex color
  particleOpacity: number; // 0-1
  screenDarkening: number; // 0-1, how much to darken the scene
  screenTint?: string; // Optional hex color tint
  screenTintStrength?: number; // 0-1
  fogDensity: number; // 0-1
  fogColor: string; // Hex color
}

// Lighting configuration for a weather type
export interface WeatherLighting {
  ambientColor: string;
  ambientIntensity: number;
  directionalColor: string;
  directionalIntensity: number;
  directionalPosition: [number, number, number];
  flashIntensity?: number; // For thunderstorm lightning flash
  flashColor?: string;
}

// Gameplay modifiers applied during weather
export interface WeatherGameplayModifiers {
  rangeMultiplier?: number; // Tower range modifier
  enemySpeedMultiplier?: number; // Enemy movement speed modifier
  elementBonuses?: Record<string, number>; // Element -> damage multiplier
}

// Complete weather definition
export interface WeatherDefinition {
  type: WeatherType;
  name: string;
  description: string;
  icon: string;
  visuals: WeatherVisuals;
  lighting: WeatherLighting;
  modifiers: WeatherGameplayModifiers;
  transitionDuration: number; // Seconds to transition to this weather
  validBiomes?: string[]; // If set, only valid for these biomes
}

// Lightning bolt state
export interface LightningState {
  active: boolean;
  intensity: number; // 0-1, decays over time
  boltVisible: boolean; // True if zoomed in enough for bolt geometry
  strikePosition: [number, number] | null; // Map coordinates
  nextStrikeTime: number; // Timestamp for next strike
  lastStrikeTime: number;
}

// Map-specific weather configuration
export interface MapWeatherConfig {
  defaultWeather: WeatherType;
  defaultIntensity?: number; // 0-1, affects particle density
  dynamicWeather: {
    enabled: boolean;
    changeInterval: [number, number]; // [min, max] seconds between changes
    allowedTypes: WeatherType[];
    transitionDuration: number; // Seconds for weather transitions
  };
}

// Quality preset configuration
export interface WeatherQualityPreset {
  particleMultiplier: number; // 0-1, scales particle count
  maxRainParticles: number;
  maxSnowParticles: number;
  lightningBolts: boolean; // Whether to render bolt geometry
  postProcessing: boolean; // Whether to use post-processing effects
  fogQuality: "simple" | "volumetric";

  // Shadow settings
  shadowsEnabled: boolean;
  shadowMapSize: number; // 512, 1024, 2048, 4096
  shadowMapType: "basic" | "pcf" | "pcfsoft" | "vsm";
  shadowRadius: number;
  shadowBias: number;
  shadowNormalBias: number;

  // Post-processing effects (expanded from boolean)
  bloomEnabled: boolean;
  ssaoEnabled: boolean;
  toneMappingEnabled: boolean;
}

// Weather transition state
export interface WeatherTransition {
  from: WeatherType;
  to: WeatherType;
  progress: number; // 0-1
  duration: number; // Total transition time in seconds
  startTime: number; // Timestamp when transition started
}

// Interpolated values during transitions
export interface EffectiveWeatherState {
  visuals: WeatherVisuals;
  lighting: WeatherLighting;
  modifiers: WeatherGameplayModifiers;
}

// Event payloads
export interface WeatherChangeEvent {
  from: WeatherType;
  to: WeatherType;
  immediate: boolean;
}

export interface WeatherTransitionEvent {
  from: WeatherType;
  to: WeatherType;
  duration: number;
}

export interface LightningStrikeEvent {
  position: [number, number];
  intensity: number;
}
