/**
 * 3D Objects for the Map Editor
 * Low-poly/voxel style objects with colored variants
 */

import { useMemo } from "react";
import * as THREE from "three";

interface ObjectProps {
  position: [number, number, number];
  scale?: number;
  color?: string; // Optional color override
}

// ============================================
// TREES
// ============================================

/**
 * Pine Tree - Triangular/conical shape
 */
export function PineTree({ position, scale = 1, color }: ObjectProps) {
  const trunkColor = "#5d4037";
  const foliageBase = color || "#2e7d32";
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 6]} />
        <meshStandardMaterial color={trunkColor} />
      </mesh>
      {/* Bottom layer */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.35, 0.4, 6]} />
        <meshStandardMaterial color={foliageBase} />
      </mesh>
      {/* Middle layer */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.28, 0.35, 6]} />
        <meshStandardMaterial color="#388e3c" />
      </mesh>
      {/* Top layer */}
      <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.18, 0.3, 6]} />
        <meshStandardMaterial color="#43a047" />
      </mesh>
    </group>
  );
}

/**
 * Oak Tree - Rounded canopy
 */
export function OakTree({ position, scale = 1, color }: ObjectProps) {
  const trunkColor = "#5d4037";
  const foliageBase = color || "#388e3c";
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 6]} />
        <meshStandardMaterial color={trunkColor} />
      </mesh>
      {/* Canopy - multiple spheres */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.35, 8, 6]} />
        <meshStandardMaterial color={foliageBase} />
      </mesh>
      <mesh position={[0.15, 0.5, 0.1]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>
      <mesh position={[-0.12, 0.5, -0.08]} castShadow receiveShadow>
        <sphereGeometry args={[0.22, 8, 6]} />
        <meshStandardMaterial color="#43a047" />
      </mesh>
    </group>
  );
}

/**
 * Birch Tree - White bark with green leaves
 */
export function BirchTree({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* White trunk with black marks */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.6, 6]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      {/* Sparse foliage */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#8bc34a" />
      </mesh>
      <mesh position={[0.12, 0.7, 0.05]} castShadow receiveShadow>
        <sphereGeometry args={[0.18, 6, 5]} />
        <meshStandardMaterial color="#9ccc65" />
      </mesh>
    </group>
  );
}

/**
 * Willow Tree - Drooping branches
 */
export function WillowTree({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.5, 6]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Drooping foliage cones */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.2,
            0.45,
            Math.sin((angle * Math.PI) / 180) * 0.2,
          ]}
          rotation={[0.3, 0, (angle * Math.PI) / 180]}
        >
          <coneGeometry args={[0.12, 0.5, 5]} />
          <meshStandardMaterial color="#558b2f" />
        </mesh>
      ))}
      {/* Top */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 6, 5]} />
        <meshStandardMaterial color="#689f38" />
      </mesh>
    </group>
  );
}

/**
 * Dead Tree - Bare branches
 */
export function DeadTree({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Main trunk */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.5, 5]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Branches */}
      <mesh position={[0.1, 0.45, 0]} rotation={[0, 0, -0.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.03, 0.25, 4]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>
      <mesh position={[-0.08, 0.4, 0.05]} rotation={[0.2, 0, 0.6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.2, 4]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>
    </group>
  );
}

/**
 * Snow-covered Pine Tree
 */
export function PineTreeSnow({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Snow-covered layers */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.35, 0.4, 6]} />
        <meshStandardMaterial color="#e8f5e9" />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.28, 0.35, 6]} />
        <meshStandardMaterial color="#f1f8e9" />
      </mesh>
      <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.18, 0.3, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// ============================================
// ROCKS & TERRAIN
// ============================================

/**
 * Rock - Irregular boulder shape
 */
export function Rock({ position, scale = 1, color }: ObjectProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.DodecahedronGeometry(0.2, 0);
    const positions = geo.attributes.position;
    if (positions) {
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        if (y < 0) {
          positions.setY(i, y * 0.5);
        }
        positions.setX(i, positions.getX(i) * (0.9 + Math.random() * 0.2));
        positions.setZ(i, positions.getZ(i) * (0.9 + Math.random() * 0.2));
      }
      geo.computeVertexNormals();
    }
    return geo;
  }, []);

  return (
    <group position={position} scale={scale}>
      <mesh geometry={geometry} position={[0, 0.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color || "#78909c"} flatShading />
      </mesh>
    </group>
  );
}

/**
 * Ice Crystal
 */
export function IceCrystal({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#b3e5fc" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.1, 0.12, 0.05]} rotation={[0.3, 0.5, 0]} castShadow receiveShadow>
        <octahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial color="#81d4fa" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Volcanic Rock
 */
export function VolcanicRock({ position, scale = 1 }: ObjectProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.DodecahedronGeometry(0.22, 0);
    const positions = geo.attributes.position;
    if (positions) {
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        if (y < 0) positions.setY(i, y * 0.4);
        positions.setX(i, positions.getX(i) * (0.85 + Math.random() * 0.3));
        positions.setZ(i, positions.getZ(i) * (0.85 + Math.random() * 0.3));
      }
      geo.computeVertexNormals();
    }
    return geo;
  }, []);

  return (
    <group position={position} scale={scale}>
      <mesh geometry={geometry} position={[0, 0.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#37474f" flatShading />
      </mesh>
      {/* Lava glow spots */}
      <mesh position={[0.05, 0.08, 0.08]} castShadow receiveShadow>
        <sphereGeometry args={[0.03, 4, 4]} />
        <meshStandardMaterial color="#ff5722" emissive="#ff5722" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// ============================================
// PLANTS & VEGETATION
// ============================================

/**
 * Bush - Low rounded shrub
 */
export function Bush({ position, scale = 1, color }: ObjectProps) {
  const bushColor = color || "#43a047";
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.18, 8, 6]} />
        <meshStandardMaterial color={bushColor} />
      </mesh>
      <mesh position={[0.1, 0.1, 0.08]} castShadow receiveShadow>
        <sphereGeometry args={[0.12, 6, 5]} />
        <meshStandardMaterial color="#388e3c" />
      </mesh>
      <mesh position={[-0.08, 0.1, -0.06]} castShadow receiveShadow>
        <sphereGeometry args={[0.1, 6, 5]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>
    </group>
  );
}

/**
 * Grass Tuft - Small grass patch
 */
export function GrassTuft({ position, scale = 1, color }: ObjectProps) {
  const grassColor = color || "#7cb342";
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.1]} castShadow receiveShadow>
        <coneGeometry args={[0.02, 0.16, 4]} />
        <meshStandardMaterial color={grassColor} />
      </mesh>
      <mesh position={[0.03, 0.07, 0.02]} rotation={[0, 0.5, -0.15]} castShadow receiveShadow>
        <coneGeometry args={[0.015, 0.14, 4]} />
        <meshStandardMaterial color="#8bc34a" />
      </mesh>
      <mesh position={[-0.02, 0.06, -0.01]} rotation={[0, -0.3, 0.2]} castShadow receiveShadow>
        <coneGeometry args={[0.018, 0.12, 4]} />
        <meshStandardMaterial color="#689f38" />
      </mesh>
    </group>
  );
}

/**
 * Flower - Simple flower with petals
 */
export function Flower({ position, scale = 1, color }: ObjectProps) {
  const petalColor = color || "#f06292";
  return (
    <group position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.01, 0.015, 0.16, 4]} />
        <meshStandardMaterial color="#558b2f" />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#ffeb3b" />
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
          <meshStandardMaterial color={petalColor} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Sunflower - Tall yellow flower
 */
export function Sunflower({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.4, 4]} />
        <meshStandardMaterial color="#558b2f" />
      </mesh>
      {/* Leaf */}
      <mesh position={[0.08, 0.15, 0]} rotation={[0, 0, -0.5]} castShadow receiveShadow>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshStandardMaterial color="#7cb342" />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.1,
            0.42,
            Math.sin((angle * Math.PI) / 180) * 0.1,
          ]}
          rotation={[Math.PI / 2, 0, (angle * Math.PI) / 180]}
        >
          <coneGeometry args={[0.02, 0.08, 4]} />
          <meshStandardMaterial color="#fdd835" />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Cactus - Desert plant
 */
export function Cactus({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 8]} />
        <meshStandardMaterial color="#66bb6a" />
      </mesh>
      {/* Arms */}
      <mesh position={[0.12, 0.22, 0]} rotation={[0, 0, -0.8]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.2, 6]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
      <mesh position={[-0.1, 0.18, 0]} rotation={[0, 0, 0.9]} castShadow receiveShadow>
        <cylinderGeometry args={[0.035, 0.045, 0.15, 6]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
    </group>
  );
}

/**
 * Mushroom - Forest fungus
 */
export function Mushroom({ position, scale = 1, color }: ObjectProps) {
  const capColor = color || "#d32f2f";
  return (
    <group position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.12, 6]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.08, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={capColor} />
      </mesh>
      {/* Spots */}
      <mesh position={[0.03, 0.16, 0.02]} castShadow receiveShadow>
        <sphereGeometry args={[0.015, 4, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

/**
 * Cattail - Swamp plant
 */
export function Cattail({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Stems */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.01, 0.015, 0.4, 4]} />
        <meshStandardMaterial color="#8bc34a" />
      </mesh>
      <mesh position={[0.03, 0.18, 0.02]} castShadow receiveShadow>
        <cylinderGeometry args={[0.008, 0.012, 0.36, 4]} />
        <meshStandardMaterial color="#9ccc65" />
      </mesh>
      {/* Brown tops */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.025, 0.02, 0.08, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      <mesh position={[0.03, 0.34, 0.02]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.015, 0.06, 6]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
    </group>
  );
}

// ============================================
// STRUCTURES
// ============================================

/**
 * Tower Base - For tower placement spots
 */
export function TowerBase({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.45, 0.1, 8]} />
        <meshStandardMaterial color="#795548" />
      </mesh>
      <mesh position={[0, 0.11, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.35, 0.02, 8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}

/**
 * Fence - Wooden fence segment
 */
export function Fence({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Posts */}
      <mesh position={[-0.2, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      <mesh position={[0.2, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Rails */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.04, 0.03]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.04, 0.03]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}

/**
 * House - Small cottage
 */
export function House({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Base */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.38, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.42, 0.25, 4]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.1, 0.21]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.18, 0.02]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Window */}
      <mesh position={[0.15, 0.18, 0.21]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#81d4fa" />
      </mesh>
    </group>
  );
}

/**
 * Well - Stone well
 */
export function Well({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Base cylinder */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.2, 8]} />
        <meshStandardMaterial color="#78909c" />
      </mesh>
      {/* Water inside */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 8]} />
        <meshStandardMaterial color="#1e88e5" />
      </mesh>
      {/* Roof posts */}
      <mesh position={[-0.15, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      <mesh position={[0.15, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.52, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.22, 0.12, 4]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
    </group>
  );
}

/**
 * Windmill - Countryside windmill
 */
export function Windmill({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Tower */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.18, 0.6, 6]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.15, 0.15, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Blades */}
      {[0, 90, 180, 270].map((angle, i) => (
        <mesh
          key={i}
          position={[0, 0.45, 0.13]}
          rotation={[0, 0, (angle * Math.PI) / 180]}
        >
          <boxGeometry args={[0.04, 0.35, 0.02]} />
          <meshStandardMaterial color="#8d6e63" />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Hay Bale - Farm decoration
 */
export function HayBale({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 12]} />
        <meshStandardMaterial color="#fdd835" />
      </mesh>
    </group>
  );
}

/**
 * Log - Fallen tree log
 */
export function Log({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Rings on end */}
      <mesh position={[0.2, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.01, 8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}

/**
 * Stump - Tree stump
 */
export function Stump({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.16, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Top rings */}
      <mesh position={[0, 0.165, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.01, 8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}

/**
 * Cabin - Forest cabin
 */
export function Cabin({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Log walls */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.3, 0.45]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.08, 0.5]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.08, 0.4]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.1, 0.23]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.2, 0.02]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
    </group>
  );
}

/**
 * Tent - Desert/camping tent
 */
export function Tent({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.3, 0.3, 4]} />
        <meshStandardMaterial color="#fff8e1" />
      </mesh>
      {/* Door flap */}
      <mesh position={[0.15, 0.08, 0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.15, 0.02]} />
        <meshStandardMaterial color="#ffe082" />
      </mesh>
    </group>
  );
}

/**
 * Grave - Cemetery headstone
 */
export function Grave({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Base */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.06, 0.1]} />
        <meshStandardMaterial color="#78909c" />
      </mesh>
      {/* Headstone */}
      <mesh position={[0, 0.15, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.2, 0.04]} />
        <meshStandardMaterial color="#90a4ae" />
      </mesh>
    </group>
  );
}

/**
 * Lantern - Decorative light
 */
export function Lantern({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Post */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.3, 6]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      {/* Lamp */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.1, 0.08]} />
        <meshStandardMaterial color="#ffcc02" emissive="#ffcc02" emissiveIntensity={0.3} />
      </mesh>
      {/* Top */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.06, 0.06, 4]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
    </group>
  );
}

/**
 * Snowman - Winter decoration
 */
export function Snowman({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Bottom */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Middle */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.09, 8, 6]} />
        <meshStandardMaterial color="#fafafa" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.07, 8, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Carrot nose */}
      <mesh position={[0, 0.4, 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.02, 0.08, 6]} />
        <meshStandardMaterial color="#ff9800" />
      </mesh>
      {/* Hat */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
    </group>
  );
}

/**
 * Igloo - Ice house
 */
export function Igloo({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e3f2fd" />
      </mesh>
      {/* Entrance */}
      <mesh position={[0, 0.08, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 6, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#bbdefb" />
      </mesh>
    </group>
  );
}

// ============================================
// DECORATIONS
// ============================================

/**
 * Pottery - Desert clay pot
 */
export function Pottery({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.16, 8]} />
        <meshStandardMaterial color="#d7ccc8" />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.04, 8]} />
        <meshStandardMaterial color="#bcaaa4" />
      </mesh>
    </group>
  );
}

/**
 * Bones - Skeleton remains
 */
export function Bones({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.02, 0]} rotation={[0, 0.3, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.015, 0.02, 0.15, 4]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      <mesh position={[0.05, 0.02, 0.03]} rotation={[0.2, -0.5, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.012, 0.018, 0.12, 4]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  );
}

/**
 * Skull - Desert/swamp decoration
 */
export function Skull({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.06, 6, 5]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, 0.02, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.03, 0.04]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </group>
  );
}

/**
 * Obelisk - Ancient monument
 */
export function Obelisk({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#a1887f" />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.08, 0.1, 4]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}

/**
 * Fire Pit - Volcanic/camping fire
 */
export function FirePit({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Stones circle */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.12, 0.04, 6, 8]} />
        <meshStandardMaterial color="#616161" />
      </mesh>
      {/* Fire */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.08, 0.15, 6]} />
        <meshStandardMaterial color="#ff5722" emissive="#ff5722" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.03, 0.08, 0.02]} castShadow receiveShadow>
        <coneGeometry args={[0.05, 0.1, 5]} />
        <meshStandardMaterial color="#ffab00" emissive="#ffab00" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Snow Pile - Winter decoration
 */
export function SnowPile({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, 0.04, 0.05]} castShadow receiveShadow>
        <sphereGeometry args={[0.08, 5, 3, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fafafa" />
      </mesh>
    </group>
  );
}

/**
 * Lily Pad - Swamp water decoration
 */
export function LilyPad({ position, scale = 1 }: ObjectProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <circleGeometry args={[0.12, 8]} />
        <meshStandardMaterial color="#66bb6a" side={THREE.DoubleSide} />
      </mesh>
      {/* Flower */}
      <mesh position={[0.03, 0.04, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#f48fb1" />
      </mesh>
    </group>
  );
}

// ============================================
// MULTI-TILE STRUCTURES
// ============================================

interface StructureProps {
  position: [number, number, number];
  scale?: number;
  footprint?: [number, number]; // [width, height] in tiles
}

/**
 * Large House - 2x2 multi-tile structure
 */
export function LargeHouse({ position, scale = 1, footprint = [2, 2] }: StructureProps) {
  const [w, h] = footprint;
  const tileSize = 0.95;
  const width = w * tileSize;
  const depth = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Base walls */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.5, depth]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.6, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[width * 0.8, 0.4, 4]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.15, depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[0.2, 0.3, 0.05]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Windows */}
      <mesh position={[width / 3, 0.28, depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#81d4fa" />
      </mesh>
      <mesh position={[-width / 3, 0.28, depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#81d4fa" />
      </mesh>
    </group>
  );
}

/**
 * Farmhouse - 2x3 structure
 */
export function Farmhouse({ position, scale = 1, footprint = [2, 3] }: StructureProps) {
  const [w, h] = footprint;
  const tileSize = 0.95;
  const width = w * tileSize;
  const depth = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Main building */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.6, depth]} />
        <meshStandardMaterial color="#d7ccc8" />
      </mesh>
      {/* Roof peak */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.1, depth]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Porch */}
      <mesh position={[0, 0.1, depth / 2 + 0.25]} castShadow>
        <boxGeometry args={[width * 0.6, 0.05, 0.4]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}

/**
 * Barn - 3x2 structure
 */
export function Barn({ position, scale = 1, footprint = [3, 2] }: StructureProps) {
  const [w, h] = footprint;
  const tileSize = 0.95;
  const width = w * tileSize;
  const depth = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Main structure */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.7, depth]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Gambrel roof */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.1, 0.15, depth + 0.1]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Barn doors */}
      <mesh position={[0, 0.25, depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[0.4, 0.5, 0.05]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Hayloft window */}
      <mesh position={[0, 0.6, depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
    </group>
  );
}

/**
 * Windmill Structure - 2x2 with rotating blades
 */
export function WindmillStructure({ position, scale = 1, footprint = [2, 2] }: StructureProps) {
  const [w] = footprint;
  const tileSize = 0.95;
  const baseWidth = w * tileSize * 0.7;

  return (
    <group position={position} scale={scale}>
      {/* Tower - wider base */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[baseWidth * 0.4, baseWidth * 0.6, 0.8, 8]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
        <coneGeometry args={[baseWidth * 0.5, 0.25, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Blades (4-part cross) */}
      {[0, 90, 180, 270].map((angle, i) => (
        <mesh
          key={i}
          position={[0, 0.6, baseWidth * 0.45]}
          rotation={[0, 0, (angle * Math.PI) / 180]}
        >
          <boxGeometry args={[0.08, 0.6, 0.04]} />
          <meshStandardMaterial color="#8d6e63" />
        </mesh>
      ))}
      {/* Door */}
      <mesh position={[0, 0.2, baseWidth * 0.6 + 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.3, 0.05]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
    </group>
  );
}

/**
 * Market Stall - 2x1 structure
 */
export function MarketStall({ position, scale = 1, footprint = [2, 1] }: StructureProps) {
  const [w, h] = footprint;
  const tileSize = 0.95;
  const width = w * tileSize;
  const depth = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Counter */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.3, depth]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Awning posts */}
      <mesh position={[-width / 3, 0.35, -depth / 3]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      <mesh position={[width / 3, 0.35, -depth / 3]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Awning */}
      <mesh position={[0, 0.58, -depth / 4]} castShadow>
        <boxGeometry args={[width + 0.2, 0.05, depth * 0.8]} />
        <meshStandardMaterial color="#fdd835" />
      </mesh>
    </group>
  );
}

/**
 * Inn - 3x2 structure with sign
 */
export function Inn({ position, scale = 1, footprint = [3, 2] }: StructureProps) {
  const [w, h] = footprint;
  const tileSize = 0.95;
  const width = w * tileSize;
  const depth = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Main building */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.6, depth]} />
        <meshStandardMaterial color="#795548" />
      </mesh>
      {/* Sloped roof */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.15, 0.1, depth + 0.15]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>
      {/* Sign post */}
      <mesh position={[width / 2 + 0.15, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Hanging sign */}
      <mesh position={[width / 2 + 0.3, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.15, 0.05]} />
        <meshStandardMaterial color="#fdd835" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.18, depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[0.25, 0.35, 0.05]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
    </group>
  );
}

/**
 * Blacksmith - 2x2 structure with chimney
 */
export function Blacksmith({ position, scale = 1, footprint = [2, 2] }: StructureProps) {
  const [w, h] = footprint;
  const tileSize = 0.95;
  const width = w * tileSize;
  const depth = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Stone building */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.5, depth]} />
        <meshStandardMaterial color="#546e7a" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      {/* Chimney */}
      <mesh position={[width / 3, 0.75, -depth / 4]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 6]} />
        <meshStandardMaterial color="#263238" />
      </mesh>
      {/* Smoke (particle effect placeholder) */}
      <mesh position={[width / 3, 0.95, -depth / 4]} castShadow>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshStandardMaterial color="#757575" transparent opacity={0.5} />
      </mesh>
      {/* Anvil outside */}
      <mesh position={[width / 2 + 0.3, 0.08, 0]} castShadow>
        <boxGeometry args={[0.12, 0.15, 0.08]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
    </group>
  );
}

/**
 * Church - 2x3 tall structure with cross
 */
export function Church({ position, scale = 1, footprint = [2, 3] }: StructureProps) {
  const [w, h] = footprint;
  const tileSize = 0.95;
  const width = w * tileSize;
  const depth = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Base */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.7, depth]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.75, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[width * 0.75, 0.3, 4]} />
        <meshStandardMaterial color="#616161" />
      </mesh>
      {/* Tower/steeple */}
      <mesh position={[0, 1.0, -depth / 3]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.5, 6]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      <mesh position={[0, 1.32, -depth / 3]} castShadow>
        <coneGeometry args={[0.2, 0.3, 6]} />
        <meshStandardMaterial color="#757575" />
      </mesh>
      {/* Cross on top */}
      <mesh position={[0, 1.55, -depth / 3]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.03]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      <mesh position={[0, 1.6, -depth / 3]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.03]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
    </group>
  );
}

/**
 * Bridge - 1x3 horizontal structure
 */
export function Bridge({ position, scale = 1, footprint = [1, 3] }: StructureProps) {
  const [, h] = footprint;
  const tileSize = 0.95;
  const length = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Bridge deck */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.08, length]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Side rails */}
      <mesh position={[0.35, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.2, length]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      <mesh position={[-0.35, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.2, length]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Support posts */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.2, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
    </group>
  );
}

/**
 * Pier - 2x4 structure extending into water
 */
export function Pier({ position, scale = 1, footprint = [2, 4] }: StructureProps) {
  const [w, h] = footprint;
  const tileSize = 0.95;
  const width = w * tileSize;
  const length = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Main deck */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.1, length]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Wooden planks (texture detail) */}
      {[-0.3, -0.1, 0.1, 0.3].map((offset, i) => (
        <mesh key={i} position={[offset, 0.11, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.01, length]} />
          <meshStandardMaterial color="#5d4037" />
        </mesh>
      ))}
      {/* Support posts in water */}
      {[-length / 3, 0, length / 3].map((z, i) => (
        <group key={i}>
          <mesh position={[width / 3, -0.15, z]} castShadow>
            <cylinderGeometry args={[0.05, 0.06, 0.3, 6]} />
            <meshStandardMaterial color="#4e342e" />
          </mesh>
          <mesh position={[-width / 3, -0.15, z]} castShadow>
            <cylinderGeometry args={[0.05, 0.06, 0.3, 6]} />
            <meshStandardMaterial color="#4e342e" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Stone Wall - 1x1 chainable segment
 */
export function StoneWall({ position, scale = 1 }: StructureProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.3, 0.2]} />
        <meshStandardMaterial color="#78909c" />
      </mesh>
      {/* Stone detail */}
      <mesh position={[0.15, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.15, 0.22]} />
        <meshStandardMaterial color="#90a4ae" />
      </mesh>
      <mesh position={[-0.2, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.18, 0.22]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
    </group>
  );
}

/**
 * Gate - 1x2 structure
 */
export function Gate({ position, scale = 1, footprint = [1, 2] }: StructureProps) {
  const [, h] = footprint;
  const tileSize = 0.95;
  const depth = h * tileSize;

  return (
    <group position={position} scale={scale}>
      {/* Posts */}
      <mesh position={[0, 0.25, -depth / 2 + 0.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      <mesh position={[0, 0.25, depth / 2 - 0.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Gate doors */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.35, depth - 0.3]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Crossbeam */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.08, depth - 0.15]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}
