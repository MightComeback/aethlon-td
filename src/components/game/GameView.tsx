import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";
import { GameScene } from "./GameScene";
import { GameHUD } from "./GameHUD";

export function GameView() {
  return (
    <div className="relative h-full w-full">
      {/* Three.js Canvas */}
      <Canvas
        className="absolute inset-0"
        gl={{ antialias: false, alpha: false }}
        dpr={1}
      >
        <color attach="background" args={["#1a1a2e"]} />
        <OrthographicCamera
          makeDefault
          position={[0, 10, 10]}
          zoom={50}
          near={0.1}
          far={1000}
        />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <GameScene />
        </Suspense>
      </Canvas>

      {/* HUD Overlay */}
      <GameHUD />
    </div>
  );
}
