import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useSettingsStore } from "@/stores/settingsStore";

/**
 * Component that applies frame limiting to the R3F canvas.
 * Uses advance() for precise frame control with frameloop="never".
 */
export function FrameLimiter() {
  const fpsLimit = useSettingsStore((s) => s.fpsLimit);
  const { advance, clock } = useThree();
  const rafRef = useRef<number>(0);
  const lastFrameTime = useRef(0);

  useEffect(() => {
    // Reset clock on mount
    clock.start();
    lastFrameTime.current = performance.now();

    const loop = (now: number) => {
      if (fpsLimit === 0) {
        // Unlimited - render every frame
        advance(now / 1000);
      } else {
        // Limited - only render when enough time has passed
        const targetFrameTime = 1000 / fpsLimit;
        const elapsed = now - lastFrameTime.current;

        if (elapsed >= targetFrameTime) {
          lastFrameTime.current = now - (elapsed % targetFrameTime);
          advance(now / 1000);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [fpsLimit, advance, clock]);

  return null;
}
