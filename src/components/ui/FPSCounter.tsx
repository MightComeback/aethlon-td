import { useEffect, useRef, useState } from "react";
import { useSettingsStore, type FPSPosition } from "@/stores/settingsStore";
import { useDebugStore } from "@/stores/debugStore";

const positionClasses: Record<FPSPosition, string> = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2",
};

export function FPSCounter() {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafRef = useRef<number>(0);

  const { fpsEnabled, fpsPosition, debugMode } = useSettingsStore();
  const debugInfo = useDebugStore();

  useEffect(() => {
    const tick = () => {
      frameCount.current++;
      const now = performance.now();

      if (now - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = now;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!fpsEnabled) {
    return null;
  }

  return (
    <div
      className={`fixed z-50 font-mono text-xs bg-background/90 px-2 py-1 rounded ${positionClasses[fpsPosition]}`}
    >
      <div className="text-foreground-muted">{fps} FPS</div>

      {debugMode && (
        <div className="mt-1 pt-1 border-t border-foreground-muted/30 text-2xs space-y-0.5">
          <div className="text-accent-green">-- Debug --</div>
          {Object.entries(debugInfo.customData).map(([key, value]) => (
            <div key={key}>
              {key}: {String(value)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
