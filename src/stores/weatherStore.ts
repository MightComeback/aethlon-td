/**
 * Weather Store
 * Manages weather state, transitions, and lightning
 */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  WeatherType,
  LightningState,
  MapWeatherConfig,
  WeatherTransition,
  WeatherVisuals,
  WeatherLighting,
  WeatherGameplayModifiers,
} from "@/types/weather";
import { getWeatherDefinition, getRandomWeatherType } from "@/data/weather";
import { eventBus, WeatherEvents } from "@/game/core/EventBus";

// Helper to interpolate numbers
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Helper to interpolate hex colors
function lerpColor(colorA: string, colorB: string, t: number): string {
  const parseHex = (hex: string) => {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
    };
  };

  const a = parseHex(colorA);
  const b = parseHex(colorB);

  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bl = Math.round(lerp(a.b, b.b, t));

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}

// Interpolate visuals between two weather states
function interpolateVisuals(
  from: WeatherVisuals,
  to: WeatherVisuals,
  t: number
): WeatherVisuals {
  return {
    particleType: t < 0.5 ? from.particleType : to.particleType,
    particleDensity: lerp(from.particleDensity, to.particleDensity, t),
    particleSpeed: lerp(from.particleSpeed, to.particleSpeed, t),
    particleSize: lerp(from.particleSize, to.particleSize, t),
    particleColor: lerpColor(from.particleColor, to.particleColor, t),
    particleOpacity: lerp(from.particleOpacity, to.particleOpacity, t),
    screenDarkening: lerp(from.screenDarkening, to.screenDarkening, t),
    screenTint: to.screenTint ?? from.screenTint,
    screenTintStrength: lerp(
      from.screenTintStrength ?? 0,
      to.screenTintStrength ?? 0,
      t
    ),
    fogDensity: lerp(from.fogDensity, to.fogDensity, t),
    fogColor: lerpColor(from.fogColor, to.fogColor, t),
  };
}

// Interpolate lighting between two weather states
function interpolateLighting(
  from: WeatherLighting,
  to: WeatherLighting,
  t: number
): WeatherLighting {
  return {
    ambientColor: lerpColor(from.ambientColor, to.ambientColor, t),
    ambientIntensity: lerp(from.ambientIntensity, to.ambientIntensity, t),
    directionalColor: lerpColor(from.directionalColor, to.directionalColor, t),
    directionalIntensity: lerp(
      from.directionalIntensity,
      to.directionalIntensity,
      t
    ),
    directionalPosition: [
      lerp(from.directionalPosition[0], to.directionalPosition[0], t),
      lerp(from.directionalPosition[1], to.directionalPosition[1], t),
      lerp(from.directionalPosition[2], to.directionalPosition[2], t),
    ],
    flashIntensity: to.flashIntensity,
    flashColor: to.flashColor,
  };
}

// Interpolate gameplay modifiers
function interpolateModifiers(
  from: WeatherGameplayModifiers,
  to: WeatherGameplayModifiers,
  t: number
): WeatherGameplayModifiers {
  const result: WeatherGameplayModifiers = {};

  // Range multiplier
  const fromRange = from.rangeMultiplier ?? 1;
  const toRange = to.rangeMultiplier ?? 1;
  result.rangeMultiplier = lerp(fromRange, toRange, t);

  // Enemy speed multiplier
  const fromSpeed = from.enemySpeedMultiplier ?? 1;
  const toSpeed = to.enemySpeedMultiplier ?? 1;
  result.enemySpeedMultiplier = lerp(fromSpeed, toSpeed, t);

  // Element bonuses - merge keys from both
  const allElements = new Set([
    ...Object.keys(from.elementBonuses ?? {}),
    ...Object.keys(to.elementBonuses ?? {}),
  ]);

  if (allElements.size > 0) {
    result.elementBonuses = {};
    for (const element of allElements) {
      const fromBonus = from.elementBonuses?.[element] ?? 1;
      const toBonus = to.elementBonuses?.[element] ?? 1;
      result.elementBonuses[element] = lerp(fromBonus, toBonus, t);
    }
  }

  return result;
}

const DEFAULT_LIGHTNING: LightningState = {
  active: false,
  intensity: 0,
  boltVisible: false,
  strikePosition: null,
  nextStrikeTime: 0,
  lastStrikeTime: 0,
};

interface WeatherStore {
  // Current state
  current: WeatherType;
  intensity: number; // 0-1, affects particle density

  // Transition state
  transition: WeatherTransition | null;
  isTransitioning: boolean;

  // Lightning state
  lightning: LightningState;

  // Dynamic weather
  dynamicEnabled: boolean;
  nextChangeTime: number;
  allowedTypes: WeatherType[];
  changeInterval: [number, number];

  // Effective (interpolated) values
  effectiveVisuals: WeatherVisuals;
  effectiveLighting: WeatherLighting;
  effectiveModifiers: WeatherGameplayModifiers;

  // Actions
  setWeather: (type: WeatherType, immediate?: boolean) => void;
  setIntensity: (intensity: number) => void;
  updateTransition: (deltaTime: number) => void;
  triggerLightning: (position?: [number, number]) => void;
  updateLightning: (deltaTime: number) => void;
  loadMapConfig: (config?: MapWeatherConfig) => void;
  checkDynamicWeather: (elapsedTime: number) => void;
  reset: () => void;

  // Getters
  getCurrentModifiers: () => WeatherGameplayModifiers;
  getElementDamageMultiplier: (element: string) => number;
  getRangeMultiplier: () => number;
  getEnemySpeedMultiplier: () => number;
}

const sunnyDef = getWeatherDefinition(WeatherType.Sunny);

export const useWeatherStore = create<WeatherStore>()(
  immer((set, get) => ({
    // Initial state
    current: WeatherType.Sunny,
    intensity: 1,
    transition: null,
    isTransitioning: false,
    lightning: { ...DEFAULT_LIGHTNING },
    dynamicEnabled: false,
    nextChangeTime: 0,
    allowedTypes: Object.values(WeatherType),
    changeInterval: [60, 180],
    effectiveVisuals: { ...sunnyDef.visuals },
    effectiveLighting: { ...sunnyDef.lighting },
    effectiveModifiers: { ...sunnyDef.modifiers },

    setWeather: (type, immediate = false) => {
      const state = get();
      if (type === state.current && !state.isTransitioning) return;

      const toDef = getWeatherDefinition(type);

      if (immediate) {
        set((s) => {
          s.current = type;
          s.transition = null;
          s.isTransitioning = false;
          s.effectiveVisuals = { ...toDef.visuals };
          s.effectiveLighting = { ...toDef.lighting };
          s.effectiveModifiers = { ...toDef.modifiers };

          // Reset lightning for thunderstorm
          if (type === WeatherType.Thunderstorm) {
            s.lightning = {
              ...DEFAULT_LIGHTNING,
              nextStrikeTime: Date.now() + 2000 + Math.random() * 3000,
            };
          } else {
            s.lightning = { ...DEFAULT_LIGHTNING };
          }
        });

        eventBus.emit(WeatherEvents.WEATHER_CHANGE, {
          from: state.current,
          to: type,
          immediate: true,
        });
      } else {
        set((s) => {
          s.transition = {
            from: s.current,
            to: type,
            progress: 0,
            duration: toDef.transitionDuration,
            startTime: Date.now(),
          };
          s.isTransitioning = true;
        });

        eventBus.emit(WeatherEvents.WEATHER_TRANSITION_START, {
          from: state.current,
          to: type,
          duration: toDef.transitionDuration,
        });
      }
    },

    setIntensity: (intensity) => {
      set((s) => {
        s.intensity = Math.max(0, Math.min(1, intensity));
      });
    },

    updateTransition: (deltaTime) => {
      const state = get();
      if (!state.isTransitioning || !state.transition) return;

      const newProgress =
        state.transition.progress + deltaTime / state.transition.duration;

      if (newProgress >= 1) {
        // Transition complete
        const toDef = getWeatherDefinition(state.transition.to);

        set((s) => {
          s.current = s.transition!.to;
          s.transition = null;
          s.isTransitioning = false;
          s.effectiveVisuals = { ...toDef.visuals };
          s.effectiveLighting = { ...toDef.lighting };
          s.effectiveModifiers = { ...toDef.modifiers };

          // Initialize lightning for thunderstorm
          if (s.current === WeatherType.Thunderstorm) {
            s.lightning = {
              ...DEFAULT_LIGHTNING,
              nextStrikeTime: Date.now() + 2000 + Math.random() * 3000,
            };
          }
        });

        eventBus.emit(WeatherEvents.WEATHER_TRANSITION_COMPLETE, {
          weather: state.transition.to,
        });
      } else {
        // Interpolate values
        const fromDef = getWeatherDefinition(state.transition.from);
        const toDef = getWeatherDefinition(state.transition.to);
        const t = newProgress;

        set((s) => {
          s.transition!.progress = newProgress;
          s.effectiveVisuals = interpolateVisuals(
            fromDef.visuals,
            toDef.visuals,
            t
          );
          s.effectiveLighting = interpolateLighting(
            fromDef.lighting,
            toDef.lighting,
            t
          );
          s.effectiveModifiers = interpolateModifiers(
            fromDef.modifiers,
            toDef.modifiers,
            t
          );
        });
      }
    },

    triggerLightning: (position) => {
      const state = get();
      if (state.current !== WeatherType.Thunderstorm) return;

      const strikePos: [number, number] = position ?? [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
      ];

      set((s) => {
        s.lightning = {
          active: true,
          intensity: 1,
          boltVisible: true,
          strikePosition: strikePos,
          nextStrikeTime: Date.now() + 5000 + Math.random() * 10000,
          lastStrikeTime: Date.now(),
        };
      });

      eventBus.emit(WeatherEvents.LIGHTNING_STRIKE, {
        position: strikePos,
        intensity: 1,
      });
    },

    updateLightning: (deltaTime) => {
      const state = get();
      if (state.current !== WeatherType.Thunderstorm) return;

      const now = Date.now();

      // Check for new strike
      if (now >= state.lightning.nextStrikeTime && !state.lightning.active) {
        get().triggerLightning();
        return;
      }

      // Decay active lightning
      if (state.lightning.active) {
        const decayRate = 0.85;
        const newIntensity = state.lightning.intensity * Math.pow(decayRate, deltaTime * 60);

        if (newIntensity < 0.01) {
          set((s) => {
            s.lightning.active = false;
            s.lightning.intensity = 0;
            s.lightning.boltVisible = false;
          });
        } else {
          set((s) => {
            s.lightning.intensity = newIntensity;
            // Bolt visible only for first 150ms
            s.lightning.boltVisible = now - s.lightning.lastStrikeTime < 150;
          });
        }
      }
    },

    loadMapConfig: (config) => {
      if (!config) {
        get().reset();
        return;
      }

      set((s) => {
        s.dynamicEnabled = config.dynamicWeather.enabled;
        s.allowedTypes = config.dynamicWeather.allowedTypes;
        s.changeInterval = config.dynamicWeather.changeInterval;
        s.nextChangeTime =
          Date.now() +
          (config.dynamicWeather.changeInterval[0] +
            Math.random() *
              (config.dynamicWeather.changeInterval[1] -
                config.dynamicWeather.changeInterval[0])) *
            1000;
      });

      get().setWeather(config.defaultWeather, true);
    },

    checkDynamicWeather: (_elapsedTime) => {
      const state = get();
      if (!state.dynamicEnabled) return;

      const now = Date.now();
      if (now < state.nextChangeTime) return;
      if (state.isTransitioning) return;

      // Pick a new random weather type
      const newType = getRandomWeatherType(
        state.allowedTypes.filter((t) => t !== state.current)
      );

      if (newType !== state.current) {
        get().setWeather(newType, false);
      }

      // Schedule next change
      const [min, max] = state.changeInterval;
      set((s) => {
        s.nextChangeTime = now + (min + Math.random() * (max - min)) * 1000;
      });
    },

    reset: () => {
      const sunnyDef = getWeatherDefinition(WeatherType.Sunny);
      set((s) => {
        s.current = WeatherType.Sunny;
        s.intensity = 1;
        s.transition = null;
        s.isTransitioning = false;
        s.lightning = { ...DEFAULT_LIGHTNING };
        s.dynamicEnabled = false;
        s.nextChangeTime = 0;
        s.allowedTypes = Object.values(WeatherType);
        s.changeInterval = [60, 180];
        s.effectiveVisuals = { ...sunnyDef.visuals };
        s.effectiveLighting = { ...sunnyDef.lighting };
        s.effectiveModifiers = { ...sunnyDef.modifiers };
      });
    },

    // Getters
    getCurrentModifiers: () => get().effectiveModifiers,

    getElementDamageMultiplier: (element) => {
      return get().effectiveModifiers.elementBonuses?.[element] ?? 1;
    },

    getRangeMultiplier: () => {
      return get().effectiveModifiers.rangeMultiplier ?? 1;
    },

    getEnemySpeedMultiplier: () => {
      return get().effectiveModifiers.enemySpeedMultiplier ?? 1;
    },
  }))
);
