import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, MapControls } from "@react-three/drei";
import { Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { EditorGrid } from "./EditorGrid";
import { EditorToolbar } from "./EditorToolbar";
import { TilePalette } from "./TilePalette";

export function MapEditor() {
  return (
    <div className="relative h-full w-full">
      {/* Three.js Canvas */}
      <Canvas
        className="absolute inset-0"
        gl={{ antialias: false, alpha: false }}
        dpr={1}
      >
        <color attach="background" args={["#0f0f1a"]} />
        <OrthographicCamera
          makeDefault
          position={[0, 20, 20]}
          zoom={40}
          near={0.1}
          far={1000}
        />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.6} />
        <MapControls enableRotate={false} />
        <Suspense fallback={null}>
          <EditorGrid />
        </Suspense>
      </Canvas>

      {/* Editor UI Overlay */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top Toolbar */}
        <div className="pointer-events-auto absolute left-0 right-0 top-0 flex items-center justify-between p-4">
          <Link to="/" className="pixel-button text-2xs">
            Back
          </Link>
          <EditorToolbar />
          <div className="flex gap-2">
            <button className="pixel-button text-2xs">Test</button>
            <button className="pixel-button text-2xs bg-accent-green">Save</button>
          </div>
        </div>

        {/* Left: Tile Palette */}
        <div className="pointer-events-auto absolute left-4 top-20 bottom-4">
          <TilePalette />
        </div>

        {/* Right: Properties Panel (placeholder) */}
        <div className="pointer-events-auto absolute right-4 top-20 w-64">
          <div className="pixel-panel">
            <h3 className="font-pixel text-xs text-foreground mb-4">Properties</h3>
            <div className="space-y-2 text-sm text-foreground-muted">
              <div className="flex justify-between">
                <span>Map Size:</span>
                <span>20 x 15</span>
              </div>
              <div className="flex justify-between">
                <span>Tile Count:</span>
                <span>300</span>
              </div>
              <div className="flex justify-between">
                <span>Spawn Points:</span>
                <span>1</span>
              </div>
              <div className="flex justify-between">
                <span>Exit Points:</span>
                <span>1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
