/**
 * WeatherPanel Component
 * Editor UI for configuring map weather settings
 */

import { useEditorStore } from "@/stores/editorStore";
import { WeatherType } from "@/types/weather";
import { getAllWeatherDefinitions } from "@/data/weather";
import {
  IconSun,
  IconCloudRain,
  IconCloudRainHeavy,
  IconCloudLightning,
  IconSnowflake,
} from "@/components/ui/PixelIcon";
import type { ReactNode } from "react";

// Weather icons mapping
const WEATHER_ICONS: Record<WeatherType, (size: number) => ReactNode> = {
  [WeatherType.Sunny]: (size) => <IconSun size={size} />,
  [WeatherType.Rainy]: (size) => <IconCloudRain size={size} />,
  [WeatherType.HeavyRain]: (size) => <IconCloudRainHeavy size={size} />,
  [WeatherType.Thunderstorm]: (size) => <IconCloudLightning size={size} />,
  [WeatherType.Snowy]: (size) => <IconSnowflake size={size} />,
};

export function WeatherPanel() {
  const weatherConfig = useEditorStore((s) => s.weatherConfig);
  const setWeatherConfig = useEditorStore((s) => s.setWeatherConfig);

  const weatherDefs = getAllWeatherDefinitions();

  const handleWeatherChange = (type: WeatherType) => {
    setWeatherConfig({
      ...weatherConfig,
      defaultWeather: type,
    });
  };

  const handleDynamicToggle = () => {
    setWeatherConfig({
      ...weatherConfig,
      dynamicWeather: {
        ...weatherConfig.dynamicWeather,
        enabled: !weatherConfig.dynamicWeather.enabled,
      },
    });
  };

  const handleAllowedTypeToggle = (type: WeatherType) => {
    const allowed = weatherConfig.dynamicWeather.allowedTypes;
    const isAllowed = allowed.includes(type);

    setWeatherConfig({
      ...weatherConfig,
      dynamicWeather: {
        ...weatherConfig.dynamicWeather,
        allowedTypes: isAllowed
          ? allowed.filter((t) => t !== type)
          : [...allowed, type],
      },
    });
  };

  const handleIntervalChange = (value: string, index: 0 | 1) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;

    const interval: [number, number] = [
      ...weatherConfig.dynamicWeather.changeInterval,
    ] as [number, number];
    interval[index] = Math.max(10, Math.min(600, num));

    // Ensure min <= max
    if (index === 0 && interval[0] > interval[1]) {
      interval[1] = interval[0];
    } else if (index === 1 && interval[1] < interval[0]) {
      interval[0] = interval[1];
    }

    setWeatherConfig({
      ...weatherConfig,
      dynamicWeather: {
        ...weatherConfig.dynamicWeather,
        changeInterval: interval,
      },
    });
  };

  return (
    <div className="space-y-3">
      {/* Default Weather Selection */}
      <div className="space-y-1">
        <label className="text-3xs text-foreground-muted">Default Weather</label>
        <div className="grid grid-cols-5 gap-1">
          {weatherDefs.map((def) => (
            <button
              key={def.type}
              onClick={() => handleWeatherChange(def.type)}
              className={`p-1.5 rounded text-sm transition-colors ${
                weatherConfig.defaultWeather === def.type
                  ? "bg-accent-blue text-white"
                  : "bg-background-secondary hover:bg-background-tertiary"
              }`}
              title={def.name}
            >
              {WEATHER_ICONS[def.type](14)}
            </button>
          ))}
        </div>
        <div className="text-3xs text-center text-foreground-muted">
          {weatherDefs.find((d) => d.type === weatherConfig.defaultWeather)?.name}
        </div>
      </div>

      {/* Dynamic Weather Toggle */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={weatherConfig.dynamicWeather.enabled}
            onChange={handleDynamicToggle}
            className="w-3 h-3"
          />
          <span className="text-3xs">Dynamic Weather</span>
        </label>

        {/* Dynamic Weather Options */}
        {weatherConfig.dynamicWeather.enabled && (
          <div className="pl-4 space-y-2 border-l border-border-muted">
            {/* Allowed Types */}
            <div className="space-y-1">
              <label className="text-3xs text-foreground-muted">
                Allowed Types
              </label>
              <div className="flex flex-wrap gap-1">
                {weatherDefs.map((def) => (
                  <button
                    key={def.type}
                    onClick={() => handleAllowedTypeToggle(def.type)}
                    className={`px-1.5 py-0.5 rounded text-2xs ${
                      weatherConfig.dynamicWeather.allowedTypes.includes(
                        def.type
                      )
                        ? "bg-accent-green text-white"
                        : "bg-background-secondary text-foreground-muted"
                    }`}
                    title={def.name}
                  >
                    {WEATHER_ICONS[def.type](12)}
                  </button>
                ))}
              </div>
            </div>

            {/* Change Interval */}
            <div className="space-y-1">
              <label className="text-3xs text-foreground-muted">
                Change Interval (sec)
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={weatherConfig.dynamicWeather.changeInterval[0]}
                  onChange={(e) => handleIntervalChange(e.target.value, 0)}
                  className="w-14 px-1 py-0.5 text-2xs bg-background-secondary rounded"
                  min={10}
                  max={600}
                />
                <span className="text-3xs text-foreground-muted">to</span>
                <input
                  type="number"
                  value={weatherConfig.dynamicWeather.changeInterval[1]}
                  onChange={(e) => handleIntervalChange(e.target.value, 1)}
                  className="w-14 px-1 py-0.5 text-2xs bg-background-secondary rounded"
                  min={10}
                  max={600}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weather Info */}
      <div className="text-3xs text-foreground-muted border-t border-border-muted pt-2">
        <p>
          {weatherConfig.dynamicWeather.enabled
            ? `Weather will change every ${weatherConfig.dynamicWeather.changeInterval[0]}-${weatherConfig.dynamicWeather.changeInterval[1]}s`
            : "Weather will stay fixed at the default"}
        </p>
      </div>
    </div>
  );
}
