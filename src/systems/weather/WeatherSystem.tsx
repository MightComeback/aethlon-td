/**
 * WeatherSystem Component
 * Main orchestrator for the weather system
 * Manages weather state, transitions, and child components
 */

import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useWeatherStore } from "@/stores/weatherStore";
import { WeatherLighting } from "./WeatherLighting";
import { WeatherParticles } from "./WeatherParticles";
import { LightningSystem } from "./LightningSystem";
import type { MapWeatherConfig } from "@/types/weather";

interface WeatherSystemProps {
  mapWeatherConfig?: MapWeatherConfig;
  mapWidth?: number;
  mapHeight?: number;
  enabled?: boolean;
}

export function WeatherSystem({
  mapWeatherConfig,
  mapWidth = 100,
  mapHeight = 100,
  enabled = true,
}: WeatherSystemProps) {
  const loadMapConfig = useWeatherStore((s) => s.loadMapConfig);
  const checkDynamicWeather = useWeatherStore((s) => s.checkDynamicWeather);
  const reset = useWeatherStore((s) => s.reset);

  // Load map weather config on mount or change
  useEffect(() => {
    if (enabled && mapWeatherConfig) {
      loadMapConfig(mapWeatherConfig);
    } else if (enabled) {
      // Default weather config if none provided
      loadMapConfig(undefined);
    }

    return () => {
      reset();
    };
  }, [enabled, mapWeatherConfig, loadMapConfig, reset]);

  // Check for dynamic weather changes
  useFrame((state) => {
    if (!enabled) return;
    checkDynamicWeather(state.clock.elapsedTime);
  });

  if (!enabled) {
    return null;
  }

  return (
    <>
      <WeatherLighting />
      <WeatherParticles mapWidth={mapWidth} mapHeight={mapHeight} />
      <LightningSystem mapWidth={mapWidth} mapHeight={mapHeight} />
    </>
  );
}

// Re-export for convenience
export { WeatherLighting } from "./WeatherLighting";
export { WeatherParticles } from "./WeatherParticles";
export { LightningSystem } from "./LightningSystem";
