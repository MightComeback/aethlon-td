import { createFileRoute, Link } from "@tanstack/react-router";
import { useSettingsStore, type FPSPosition } from "@/stores/settingsStore";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

const positionLabels: Record<FPSPosition, string> = {
  "top-left": "Top Left",
  "top-right": "Top Right",
  "bottom-left": "Bottom Left",
  "bottom-right": "Bottom Right",
};

function SettingsPage() {
  const {
    fpsEnabled,
    fpsPosition,
    debugMode,
    setFpsEnabled,
    setFpsPosition,
    setDebugMode,
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
      <div className="pixel-panel w-96 p-6">
        {/* FPS Counter Section */}
        <div className="mb-6">
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
