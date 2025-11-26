/**
 * WeatherIndicator Component
 * HUD display showing current weather and active modifiers
 */

import { useWeatherStore } from "@/stores/weatherStore";
import { useWeatherElementEffects } from "@/hooks/useWeatherModifiers";
import { WeatherType } from "@/types/weather";
import { getWeatherDefinition } from "@/data/weather";
import {
  IconSun,
  IconCloudRain,
  IconCloudRainHeavy,
  IconCloudLightning,
  IconSnowflake,
} from "@/components/ui/PixelIcon";
import type { ReactNode } from "react";

// Weather icons
const WEATHER_ICONS: Record<WeatherType, (size: number) => ReactNode> = {
  [WeatherType.Sunny]: (size) => <IconSun size={size} />,
  [WeatherType.Rainy]: (size) => <IconCloudRain size={size} />,
  [WeatherType.HeavyRain]: (size) => <IconCloudRainHeavy size={size} />,
  [WeatherType.Thunderstorm]: (size) => <IconCloudLightning size={size} />,
  [WeatherType.Snowy]: (size) => <IconSnowflake size={size} />,
};

interface WeatherIndicatorProps {
  showModifiers?: boolean;
  compact?: boolean;
}

export function WeatherIndicator({
  showModifiers = true,
  compact = false,
}: WeatherIndicatorProps) {
  const currentWeather = useWeatherStore((s) => s.current);
  const isTransitioning = useWeatherStore((s) => s.isTransitioning);
  const transition = useWeatherStore((s) => s.transition);
  const lightning = useWeatherStore((s) => s.lightning);
  const getRangeMultiplier = useWeatherStore((s) => s.getRangeMultiplier);
  const getEnemySpeedMultiplier = useWeatherStore(
    (s) => s.getEnemySpeedMultiplier
  );

  const elementEffects = useWeatherElementEffects();
  const weatherDef = getWeatherDefinition(currentWeather);

  const rangeMultiplier = getRangeMultiplier();
  const speedMultiplier = getEnemySpeedMultiplier();

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded bg-background-secondary ${
          lightning.active ? "animate-pulse bg-white/20" : ""
        }`}
        title={weatherDef.name}
      >
        <span>{WEATHER_ICONS[currentWeather](18)}</span>
        {isTransitioning && transition && (
          <span className="text-xs text-foreground-muted">&rarr;</span>
        )}
        {isTransitioning && transition && (
          <span className="opacity-50">
            {WEATHER_ICONS[transition.to](18)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`pixel-panel p-2 min-w-32 ${
        lightning.active ? "ring-2 ring-white/50" : ""
      }`}
    >
      {/* Weather Header */}
      <div className="flex items-center gap-2 mb-2">
        <span>{WEATHER_ICONS[currentWeather](20)}</span>
        <div className="flex-1">
          <div className="text-sm font-medium">{weatherDef.name}</div>
          {isTransitioning && transition && (
            <div className="text-2xs text-foreground-muted flex items-center gap-1">
              <span>Changing to</span>
              <span>{WEATHER_ICONS[transition.to](12)}</span>
              <span>
                {getWeatherDefinition(transition.to).name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Active Modifiers */}
      {showModifiers && (
        <div className="space-y-1 border-t border-border-muted pt-2">
          {/* Range modifier */}
          {rangeMultiplier !== 1 && (
            <div className="flex justify-between text-2xs">
              <span className="text-foreground-muted">Range</span>
              <span
                className={
                  rangeMultiplier < 1 ? "text-red-400" : "text-green-400"
                }
              >
                {rangeMultiplier < 1 ? "" : "+"}
                {Math.round((rangeMultiplier - 1) * 100)}%
              </span>
            </div>
          )}

          {/* Enemy speed modifier */}
          {speedMultiplier !== 1 && (
            <div className="flex justify-between text-2xs">
              <span className="text-foreground-muted">Enemy Speed</span>
              <span
                className={
                  speedMultiplier < 1 ? "text-green-400" : "text-red-400"
                }
              >
                {speedMultiplier < 1 ? "" : "+"}
                {Math.round((speedMultiplier - 1) * 100)}%
              </span>
            </div>
          )}

          {/* Element bonuses */}
          {elementEffects.length > 0 && (
            <div className="space-y-0.5">
              {elementEffects.slice(0, 3).map(({ element, multiplier, isBonus }) => (
                <div key={element} className="flex justify-between text-2xs">
                  <span className="text-foreground-muted capitalize">
                    {element}
                  </span>
                  <span className={isBonus ? "text-green-400" : "text-red-400"}>
                    {isBonus ? "+" : ""}
                    {Math.round((multiplier - 1) * 100)}%
                  </span>
                </div>
              ))}
              {elementEffects.length > 3 && (
                <div className="text-2xs text-foreground-muted">
                  +{elementEffects.length - 3} more...
                </div>
              )}
            </div>
          )}

          {/* No modifiers message */}
          {rangeMultiplier === 1 &&
            speedMultiplier === 1 &&
            elementEffects.length === 0 && (
              <div className="text-2xs text-foreground-muted text-center">
                No active modifiers
              </div>
            )}
        </div>
      )}
    </div>
  );
}
