/**
 * Commander Mesh Component
 * Renders the commander avatar as a simple humanoid figure
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CommanderMeshProps {
  isMoving: boolean;
  isSelected?: boolean;
}

export function CommanderMesh({ isMoving, isSelected = false }: CommanderMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const capeRef = useRef<THREE.Mesh>(null);

  // Commander color scheme
  const colors = useMemo(
    () => ({
      body: "#4a5568", // Gray-600
      head: "#e2e8f0", // Gray-200
      cape: "#3182ce", // Blue-500
      feet: "#2d3748", // Gray-700
      selection: "#48bb78", // Green-400
    }),
    []
  );

  // Animation
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Idle bobbing animation
    const bobAmount = isMoving ? 0.08 : 0.03;
    const bobSpeed = isMoving ? 8 : 2;
    groupRef.current.position.y = Math.sin(time * bobSpeed) * bobAmount;

    // Walking sway when moving
    if (isMoving && bodyRef.current) {
      bodyRef.current.rotation.z = Math.sin(time * 8) * 0.1;
    } else if (bodyRef.current) {
      bodyRef.current.rotation.z = 0;
    }

    // Cape flutter
    if (capeRef.current) {
      const flutterSpeed = isMoving ? 6 : 2;
      const flutterAmount = isMoving ? 0.3 : 0.1;
      capeRef.current.rotation.x = 0.2 + Math.sin(time * flutterSpeed) * flutterAmount;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.35, 0.4, 24]} />
          <meshBasicMaterial color={colors.selection} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Base shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.25, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>

      {/* Body group */}
      <group ref={bodyRef}>
        {/* Feet/base */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.15, 0.15, 8]} />
          <meshStandardMaterial color={colors.feet} flatShading />
        </mesh>

        {/* Body/torso */}
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.35, 0.15]} />
          <meshStandardMaterial color={colors.body} flatShading />
        </mesh>

        {/* Shoulders */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.1, 0.15]} />
          <meshStandardMaterial color={colors.body} flatShading />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.08, 6]} />
          <meshStandardMaterial color={colors.head} flatShading />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.1, 8, 6]} />
          <meshStandardMaterial color={colors.head} flatShading />
        </mesh>

        {/* Cape */}
        <mesh ref={capeRef} position={[0, 0.35, 0.1]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.4, 0.03]} />
          <meshStandardMaterial
            color={colors.cape}
            flatShading
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Cape clasp */}
        <mesh position={[0, 0.48, 0.08]} castShadow receiveShadow>
          <octahedronGeometry args={[0.03, 0]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

export default CommanderMesh;
