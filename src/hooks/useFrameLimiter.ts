import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useSettingsStore } from "@/stores/settingsStore";
import { useDebugStore } from "@/stores/debugStore";

/**
 * Component that applies frame limiting to the R3F canvas.
 * Uses advance() for precise frame control with frameloop="never".
 */
export function FrameLimiter() {
  const fpsLimit = useSettingsStore((s) => s.fpsLimit);
  const debugMode = useSettingsStore((s) => s.debugMode);
  const setDebug = useDebugStore((s) => s.setFrameLimiterDebug);

  const { advance, clock, gl } = useThree();
  const rafRef = useRef<number>(0);
  const lastFrameTime = useRef(0);
  const renderedFrames = useRef(0);
  const skippedFrames = useRef(0);

  // Track actual render FPS (not RAF FPS)
  const renderFpsCounter = useRef({ frames: 0, lastTime: performance.now(), fps: 0 });

  useEffect(() => {
    console.log("[FrameLimiter] Mounted", {
      fpsLimit,
      hasAdvance: typeof advance === "function",
      hasClock: !!clock,
      hasGl: !!gl,
    });

    clock.start();
    lastFrameTime.current = performance.now();
    renderedFrames.current = 0;
    skippedFrames.current = 0;

    const loop = (now: number) => {
      const targetFrameTime = fpsLimit === 0 ? 0 : 1000 / fpsLimit;
      const elapsed = now - lastFrameTime.current;

      let shouldRender = false;

      if (fpsLimit === 0) {
        // Unlimited - render every frame
        shouldRender = true;
      } else {
        // Limited - only render when enough time has passed
        if (elapsed >= targetFrameTime) {
          lastFrameTime.current = now - (elapsed % targetFrameTime);
          shouldRender = true;
        }
      }

      if (shouldRender) {
        renderedFrames.current++;
        renderFpsCounter.current.frames++;

        try {
          advance(now / 1000);
        } catch (e) {
          console.error("[FrameLimiter] advance() error:", e);
        }
      } else {
        skippedFrames.current++;
      }

      // Calculate actual render FPS every second
      if (now - renderFpsCounter.current.lastTime >= 1000) {
        renderFpsCounter.current.fps = renderFpsCounter.current.frames;
        renderFpsCounter.current.frames = 0;
        renderFpsCounter.current.lastTime = now;

        if (debugMode) {
          console.log("[FrameLimiter] Stats", {
            actualRenderFps: renderFpsCounter.current.fps,
            targetFps: fpsLimit || "unlimited",
            totalRendered: renderedFrames.current,
            totalSkipped: skippedFrames.current,
          });
        }
      }

      // Update debug store
      setDebug({
        frameLimiterActive: true,
        targetFps: fpsLimit,
        actualFps: renderFpsCounter.current.fps,
        frameTime: elapsed,
        skippedFrames: skippedFrames.current,
        renderedFrames: renderedFrames.current,
        lastAdvanceTime: now,
        r3fClock: clock.elapsedTime,
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      console.log("[FrameLimiter] Unmounting");
      cancelAnimationFrame(rafRef.current);
      setDebug({ frameLimiterActive: false });
    };
  }, [fpsLimit, debugMode, advance, clock, gl, setDebug]);

  return null;
}
