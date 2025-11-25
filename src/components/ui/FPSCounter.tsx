import { useEffect, useRef, useState } from "react";
import { useSettingsStore, type FPSPosition } from "@/stores/settingsStore";

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

  const { fpsEnabled, fpsPosition } = useSettingsStore();

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
      className={`fixed z-50 font-mono text-xs text-foreground-muted bg-background/80 px-2 py-1 rounded ${positionClasses[fpsPosition]}`}
    >
      {fps} FPS
    </div>
  );
}
