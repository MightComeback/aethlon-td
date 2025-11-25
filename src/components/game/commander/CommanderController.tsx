/**
 * Commander Controller
 * Handles commander movement interpolation and renders the mesh
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/stores/gameStore";
import { CommanderMesh } from "./CommanderMesh";

interface CommanderControllerProps {
  mapWidth: number;
  mapHeight: number;
}

export function CommanderController({
  mapWidth,
  mapHeight,
}: CommanderControllerProps) {
  const groupRef = useRef<THREE.Group>(null);

  const commander = useGameStore((s) => s.commander);
  const updateCommanderPosition = useGameStore((s) => s.updateCommanderPosition);
  const isPaused = useGameStore((s) => s.isPaused);

  // Update movement each frame
  useFrame((_, delta) => {
    if (isPaused) return;

    // Update commander position in store
    if (commander.isMoving) {
      updateCommanderPosition(delta);
    }

    // Smooth rotation interpolation
    if (groupRef.current) {
      const targetRotation = commander.facing;
      const currentRotation = groupRef.current.rotation.y;

      // Calculate shortest rotation direction
      let diff = targetRotation - currentRotation;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;

      // Smooth interpolation
      groupRef.current.rotation.y += diff * Math.min(delta * 10, 1);
    }
  });

  // Convert grid position to world position
  // Grid (0,0) is top-left, world (0,0,0) is center
  const worldX = commander.position.x - mapWidth / 2 + 0.5;
  const worldZ = commander.position.y - mapHeight / 2 + 0.5;

  return (
    <group ref={groupRef} position={[worldX, 0.3, worldZ]}>
      <CommanderMesh isMoving={commander.isMoving} isSelected={true} />

      {/* Target indicator when moving */}
      {commander.targetPosition && commander.isMoving && (
        <TargetIndicator
          targetX={commander.targetPosition.x - mapWidth / 2 + 0.5 - worldX}
          targetZ={commander.targetPosition.y - mapHeight / 2 + 0.5 - worldZ}
        />
      )}
    </group>
  );
}

/**
 * Visual indicator for movement target
 */
function TargetIndicator({ targetX, targetZ }: { targetX: number; targetZ: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;

    // Pulsing animation
    const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    ringRef.current.scale.set(scale, scale, 1);

    // Rotating animation
    ringRef.current.rotation.z += 0.02;
  });

  return (
    <mesh
      ref={ringRef}
      position={[targetX, -0.28, targetZ]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[0.15, 0.2, 6]} />
      <meshBasicMaterial color="#48bb78" transparent opacity={0.6} />
    </mesh>
  );
}

export default CommanderController;
