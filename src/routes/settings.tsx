import { createFileRoute, Link } from "@tanstack/react-router";
import { useSettingsStore, type FPSPosition } from "@/stores/settingsStore";
import type { QualityLevel } from "@/types/weather";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

const positionLabels: Record<FPSPosition, string> = {
  "top-left": "Top Left",
  "top-right": "Top Right",
  "bottom-left": "Bottom Left",
  "bottom-right": "Bottom Right",
};

const qualityLabels: Record<QualityLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  ultra: "Ultra",
};

const qualityDescriptions: Record<QualityLevel, string> = {
  low: "Basic graphics, best performance",
  medium: "Balanced quality and performance",
  high: "Enhanced graphics with post-processing",
  ultra: "Maximum quality, requires powerful hardware",
};

function SettingsPage() {
  const {
    fpsEnabled,
    fpsPosition,
    debugMode,
    graphicsQuality,
    autoDetectQuality,
    setFpsEnabled,
    setFpsPosition,
    setDebugMode,
    setGraphicsQuality,
    setAutoDetectQuality,
  } = useSettingsStore();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background">
      {/* Title */}
      <div className="mb-12 text-center">
        <h1 className="font-pixel text-4xl text-accent-gold text-shadow-pixel">
          SETTINGS
        </h1>
      </div>

      {/* Settings Panel */}
      <div className="pixel-panel w-[600px] p-6 max-h-[80vh] overflow-y-auto">
        {/* Graphics Quality Section */}
        <div className="mb-6">
          <h2 className="font-pixel text-sm text-foreground mb-4">
            Graphics Quality
          </h2>

          {/* Auto-Detect Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-foreground-muted">Auto-Detect Quality</span>
              <p className="text-2xs text-foreground-muted/60">
                Automatically adjust based on hardware
              </p>
            </div>
            <button
              onClick={() => setAutoDetectQuality(!autoDetectQuality)}
              className={`pixel-button text-2xs ${
                autoDetectQuality ? "bg-accent-green" : ""
              }`}
            >
              {autoDetectQuality ? "ON" : "OFF"}
            </button>
          </div>

          {/* Quality Level Selector */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-foreground-muted">Quality Level</span>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(qualityLabels) as QualityLevel[]).map((quality) => (
                <button
                  key={quality}
                  onClick={() => setGraphicsQuality(quality)}
                  disabled={autoDetectQuality}
                  className={`pixel-button text-2xs ${
                    graphicsQuality === quality ? "bg-accent-green" : ""
                  } ${autoDetectQuality ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {qualityLabels[quality]}
                </button>
              ))}
            </div>
            {!autoDetectQuality && (
              <p className="text-2xs text-foreground-muted/60 mt-2">
                {qualityDescriptions[graphicsQuality]}
              </p>
            )}
          </div>

          {/* Graphics Features Info */}
          <div className="mt-4 p-3 bg-background/50 rounded border border-foreground-muted/20">
            <h3 className="text-2xs text-foreground mb-2 font-pixel">Current Features:</h3>
            <ul className="text-2xs text-foreground-muted space-y-1">
              <li>• Shadows: {graphicsQuality === "low" ? "Basic" : graphicsQuality === "medium" ? "PCF" : graphicsQuality === "high" ? "High Quality" : "Ultra Soft"}</li>
              <li>• Lightning Bolts: Enabled</li>
              <li>• Weather Particles: {graphicsQuality === "low" ? "30%" : graphicsQuality === "medium" ? "50%" : graphicsQuality === "high" ? "75%" : "100%"}</li>
              <li>• Post-Processing: {graphicsQuality === "high" || graphicsQuality === "ultra" ? "Enabled" : "Disabled"}</li>
              {(graphicsQuality === "high" || graphicsQuality === "ultra") && (
                <>
                  <li className="ml-4">• Bloom Effects</li>
                  <li className="ml-4">• Ambient Occlusion (SSAO)</li>
                  <li className="ml-4">• Tone Mapping</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* FPS Counter Section */}
        <div className="mb-6 pt-4 border-t border-foreground-muted/20">
          <h2 className="font-pixel text-sm text-foreground mb-4">
            FPS Counter
          </h2>

          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-foreground-muted">Show FPS</span>
            <button
              onClick={() => setFpsEnabled(!fpsEnabled)}
              className={`pixel-button text-2xs ${
                fpsEnabled ? "bg-accent-green" : ""
              }`}
            >
              {fpsEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Position Selector */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-foreground-muted">Position</span>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(positionLabels) as FPSPosition[]).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setFpsPosition(pos)}
                  disabled={!fpsEnabled}
                  className={`pixel-button text-2xs ${
                    fpsPosition === pos ? "bg-accent-green" : ""
                  } ${!fpsEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {positionLabels[pos]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Debug Section */}
        <div className="pt-4 border-t border-foreground-muted/20">
          <h2 className="font-pixel text-sm text-foreground mb-4">
            Developer
          </h2>

          {/* Debug Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-foreground-muted">Debug Mode</span>
              <p className="text-2xs text-foreground-muted/60">
                Shows detailed debug info overlay
              </p>
            </div>
            <button
              onClick={() => setDebugMode(!debugMode)}
              className={`pixel-button text-2xs ${
                debugMode ? "bg-warning" : ""
              }`}
            >
              {debugMode ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <Link to="/" className="pixel-button mt-8">
        Back to Menu
      </Link>
    </div>
  );
}
