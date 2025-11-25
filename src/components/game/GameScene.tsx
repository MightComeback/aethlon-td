import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { IsometricGrid } from "./IsometricGrid";

export function GameScene() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    // Game loop updates will go here
  });

  return (
    <group ref={groupRef}>
      {/* Isometric rotation for 2.5D view */}
      <group rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
        <IsometricGrid width={10} height={10} />
      </group>
    </group>
  );
}
