import { useRef, useEffect, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import {
  IconRotateCW,
  IconRotateCCW,
  IconZoomIn,
  IconZoomOut,
} from "@/components/ui/PixelIcon";

const ZOOM_MIN = 3;
const ZOOM_MAX = 150;
const ZOOM_STEP = 10;

// Polar angle constraints (vertical tilt)
const POLAR_MIN = Math.PI / 8;   // ~22.5° from top
const POLAR_MAX = Math.PI / 2.2; // ~82° from top (near horizontal)
const POLAR_DEFAULT = Math.PI / 4; // 45° default

// Camera state for 3D view
export interface EditorCameraState {
  azimuth: number; // horizontal rotation (Y-axis)
  polar: number;   // vertical tilt (X-axis)
  zoom: number;
}

interface CameraControlsProps {
  state: EditorCameraState;
  onStateChange: (state: EditorCameraState) => void;
}

interface EditorCameraControllerProps extends CameraControlsProps {
  enableRotate?: boolean;
}

/**
 * 3D Camera Controls Component (inside Canvas)
 * Handles OrbitControls with full 3D rotation (azimuth + polar)
 */
export function EditorCameraController({
  state,
  onStateChange,
  enableRotate = true,
}: EditorCameraControllerProps) {
  const controlsRef = useRef<OrbitControlsType>(null);
  const { camera } = useThree();
  const lastState = useRef({ azimuth: state.azimuth, polar: state.polar });

  // Sync camera state when external state changes
  useEffect(() => {
    if (controlsRef.current) {
      if (Math.abs(state.azimuth - lastState.current.azimuth) > 0.01) {
        controlsRef.current.setAzimuthalAngle(state.azimuth);
        lastState.current.azimuth = state.azimuth;
      }
      if (Math.abs(state.polar - lastState.current.polar) > 0.01) {
        controlsRef.current.setPolarAngle(state.polar);
        lastState.current.polar = state.polar;
      }
    }
    if ("zoom" in camera) {
      camera.zoom = state.zoom;
      camera.updateProjectionMatrix();
    }
  }, [state.azimuth, state.polar, state.zoom, camera]);

  // Handle changes from OrbitControls (user interaction)
  const handleChange = useCallback(() => {
    if (controlsRef.current) {
      const azimuth = controlsRef.current.getAzimuthalAngle();
      const polar = controlsRef.current.getPolarAngle();
      const zoomValue = "zoom" in camera ? camera.zoom : state.zoom;
      const clampedZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoomValue));

      // Only update if values changed significantly
      const azimuthChanged = Math.abs(azimuth - state.azimuth) > 0.01;
      const polarChanged = Math.abs(polar - state.polar) > 0.01;
      const zoomChanged = Math.abs(clampedZoom - state.zoom) > 0.5;

      if (azimuthChanged || polarChanged || zoomChanged) {
        lastState.current = { azimuth, polar };
        onStateChange({ azimuth, polar, zoom: clampedZoom });
      }
    }
  }, [camera, state, onStateChange]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableRotate={enableRotate}
      enablePan={true}
      enableZoom={true}
      minZoom={ZOOM_MIN}
      maxZoom={ZOOM_MAX}
      rotateSpeed={0.5}
      panSpeed={0.8}
      zoomSpeed={0.5}
      // Constrain vertical tilt but allow full horizontal rotation
      minPolarAngle={POLAR_MIN}
      maxPolarAngle={POLAR_MAX}
      minAzimuthAngle={-Infinity}
      maxAzimuthAngle={Infinity}
      onChange={handleChange}
      mouseButtons={{
        LEFT: enableRotate ? 0 : -1, // Rotate only when enabled, -1 disables
        MIDDLE: 1, // Dolly/Zoom
        RIGHT: 2, // Pan
      }}
    />
  );
}

/**
 * UI Controls Component (outside Canvas)
 * Provides buttons for rotation, tilt and zoom
 */
export function CameraControlsUI({
  state,
  onStateChange,
}: CameraControlsProps) {
  const rotate = useCallback((delta: number) => {
    onStateChange({ ...state, azimuth: state.azimuth + delta });
  }, [state, onStateChange]);

  const snapToAngle = useCallback((degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    onStateChange({ ...state, azimuth: radians });
  }, [state, onStateChange]);

  const zoomIn = useCallback(() => {
    const newZoom = Math.min(ZOOM_MAX, state.zoom + ZOOM_STEP);
    onStateChange({ ...state, zoom: newZoom });
  }, [state, onStateChange]);

  const zoomOut = useCallback(() => {
    const newZoom = Math.max(ZOOM_MIN, state.zoom - ZOOM_STEP);
    onStateChange({ ...state, zoom: newZoom });
  }, [state, onStateChange]);

  const resetView = useCallback(() => {
    onStateChange({ azimuth: 0, polar: POLAR_DEFAULT, zoom: 50 });
  }, [onStateChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "r":
          if (e.shiftKey) {
            rotate(-Math.PI / 8); // Rotate CCW
          } else {
            rotate(Math.PI / 8); // Rotate CW
          }
          break;
        case "=":
        case "+":
          zoomIn();
          break;
        case "-":
          zoomOut();
          break;
        case " ":
          e.preventDefault();
          resetView();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rotate, zoomIn, zoomOut, resetView]);

  // Calculate rotation display (0-360°)
  const rotationDegrees = Math.round(((state.azimuth * 180) / Math.PI + 360) % 360);

  return (
    <div className="pixel-panel flex flex-col gap-2 p-2">
      {/* Title */}
      <span className="font-pixel text-3xs text-foreground-muted/50 uppercase tracking-wide">
        Camera
      </span>

      {/* Rotation controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => rotate(-Math.PI / 4)}
          className="pixel-button-icon"
          title="Rotate CCW 45° (Shift+R)"
        >
          <IconRotateCCW size={16} />
        </button>
        <span className="font-pixel text-2xs text-foreground-muted w-12 text-center">
          {rotationDegrees}°
        </span>
        <button
          onClick={() => rotate(Math.PI / 4)}
          className="pixel-button-icon"
          title="Rotate CW 45° (R)"
        >
          <IconRotateCW size={16} />
        </button>
      </div>

      {/* Quick rotation presets */}
      <div className="grid grid-cols-4 gap-1">
        {[0, 90, 180, 270].map((deg) => (
          <button
            key={deg}
            onClick={() => snapToAngle(deg)}
            className={`font-pixel text-3xs py-1 transition-colors ${
              Math.abs(rotationDegrees - deg) < 10
                ? "bg-primary text-foreground"
                : "bg-background-tertiary text-foreground-muted hover:bg-primary/50"
            }`}
          >
            {deg}°
          </button>
        ))}
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-1 mt-1">
        <button
          onClick={zoomOut}
          className="pixel-button-icon"
          title="Zoom Out (-)"
        >
          <IconZoomOut size={16} />
        </button>
        <div className="flex-1 mx-1">
          <input
            type="range"
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            value={state.zoom}
            onChange={(e) =>
              onStateChange({ ...state, zoom: Number(e.target.value) })
            }
            className="w-full h-2 bg-background-tertiary appearance-none cursor-pointer accent-primary"
          />
        </div>
        <button
          onClick={zoomIn}
          className="pixel-button-icon"
          title="Zoom In (+)"
        >
          <IconZoomIn size={16} />
        </button>
      </div>

      {/* Reset button */}
      <button
        onClick={resetView}
        className="pixel-button text-2xs w-full py-1.5"
        title="Reset View (Space)"
      >
        Reset View
      </button>

      {/* Hint */}
      <p className="text-3xs text-foreground-muted/50 text-center">
        Left-drag to rotate
      </p>
    </div>
  );
}

export { ZOOM_MIN, ZOOM_MAX };
