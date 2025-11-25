/**
 * 3D Objects for the Map Editor
 * Low-poly/voxel style objects - Black and white theme
 */

import { useMemo } from "react";
import * as THREE from "three";

interface ObjectProps {
  position: [number, number, number];
  scale?: number;
}

/**
 * Pine Tree - Triangular/conical shape
 */
export function PineTree({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 6]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Bottom layer */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.35, 0.4, 6]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      {/* Middle layer */}
      <mesh position={[0, 0.65, 0]}>
        <coneGeometry args={[0.28, 0.35, 6]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      {/* Top layer */}
      <mesh position={[0, 0.88, 0]}>
        <coneGeometry args={[0.18, 0.3, 6]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>
    </group>
  );
}

/**
 * Oak Tree - Rounded canopy
 */
export function OakTree({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 6]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Canopy - multiple spheres for a fuller look */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.35, 8, 6]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[0.15, 0.5, 0.1]}>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[-0.12, 0.5, -0.08]}>
        <sphereGeometry args={[0.22, 8, 6]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  );
}

/**
 * Rock - Irregular boulder shape
 */
export function Rock({ position, scale = 1 }: ObjectProps) {
  // Create a slightly irregular geometry using vertices
  const geometry = useMemo(() => {
    const geo = new THREE.DodecahedronGeometry(0.2, 0);
    // Slightly randomize vertices for more natural look
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      // Flatten bottom
      if (y < 0) {
        positions.setY(i, y * 0.5);
      }
      // Add slight randomness
      positions.setX(i, x * (0.9 + Math.random() * 0.2));
      positions.setZ(i, z * (0.9 + Math.random() * 0.2));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group position={position} scale={scale}>
      <mesh geometry={geometry} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#888888" flatShading />
      </mesh>
    </group>
  );
}

/**
 * Bush - Low rounded shrub
 */
export function Bush({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.18, 8, 6]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      {/* Side bumps */}
      <mesh position={[0.1, 0.1, 0.08]}>
        <sphereGeometry args={[0.12, 6, 5]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[-0.08, 0.1, -0.06]}>
        <sphereGeometry args={[0.1, 6, 5]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
}

/**
 * Grass Tuft - Small grass patch
 */
export function GrassTuft({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Multiple grass blades */}
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.1]}>
        <coneGeometry args={[0.02, 0.16, 4]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0.03, 0.07, 0.02]} rotation={[0, 0.5, -0.15]}>
        <coneGeometry args={[0.015, 0.14, 4]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>
      <mesh position={[-0.02, 0.06, -0.01]} rotation={[0, -0.3, 0.2]}>
        <coneGeometry args={[0.018, 0.12, 4]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  );
}

/**
 * Flower - Simple flower with petals
 */
export function Flower({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.01, 0.015, 0.16, 4]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.04,
            0.18,
            Math.sin((angle * Math.PI) / 180) * 0.04,
          ]}
          rotation={[Math.PI / 2, 0, (angle * Math.PI) / 180]}
        >
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Tower Base - For tower placement spots
 */
export function TowerBase({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Base platform */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.1, 8]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      {/* Inner ring */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.02, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  );
}
