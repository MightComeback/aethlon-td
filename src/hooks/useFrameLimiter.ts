import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useSettingsStore } from "@/stores/settingsStore";

/**
 * Component that applies frame limiting to the R3F canvas.
 * When FPS limit is set, it uses a timer to control render frequency.
 * Add this as a child of Canvas to enable FPS limiting.
 */
export function FrameLimiter() {
  const fpsLimit = useSettingsStore((s) => s.fpsLimit);
  const invalidate = useThree((s) => s.invalidate);
  const rafRef = useRef<number>(0);
  const lastFrameTime = useRef(performance.now());

  useEffect(() => {
    if (fpsLimit === 0) {
      // Unlimited - use continuous RAF
      const loop = () => {
        invalidate();
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    } else {
      // Limited - use throttled RAF
      const targetFrameTime = 1000 / fpsLimit;

      const loop = () => {
        const now = performance.now();
        const elapsed = now - lastFrameTime.current;

        if (elapsed >= targetFrameTime) {
          lastFrameTime.current = now - (elapsed % targetFrameTime);
          invalidate();
        }

        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [fpsLimit, invalidate]);

  return null;
}
