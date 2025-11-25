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
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 6]} />
        <meshStandardMaterial color={trunkColor} />
      </mesh>
      {/* Bottom layer */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.35, 0.4, 6]} />
        <meshStandardMaterial color={foliageBase} />
      </mesh>
      {/* Middle layer */}
      <mesh position={[0, 0.65, 0]}>
        <coneGeometry args={[0.28, 0.35, 6]} />
        <meshStandardMaterial color="#388e3c" />
      </mesh>
      {/* Top layer */}
      <mesh position={[0, 0.88, 0]}>
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
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 6]} />
        <meshStandardMaterial color={trunkColor} />
      </mesh>
      {/* Canopy - multiple spheres */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.35, 8, 6]} />
        <meshStandardMaterial color={foliageBase} />
      </mesh>
      <mesh position={[0.15, 0.5, 0.1]}>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>
      <mesh position={[-0.12, 0.5, -0.08]}>
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
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.6, 6]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      {/* Sparse foliage */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#8bc34a" />
      </mesh>
      <mesh position={[0.12, 0.7, 0.05]}>
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
      <mesh position={[0, 0.25, 0]}>
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
      <mesh position={[0, 0.6, 0]}>
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
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.5, 5]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Branches */}
      <mesh position={[0.1, 0.45, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.02, 0.03, 0.25, 4]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>
      <mesh position={[-0.08, 0.4, 0.05]} rotation={[0.2, 0, 0.6]}>
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
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Snow-covered layers */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.35, 0.4, 6]} />
        <meshStandardMaterial color="#e8f5e9" />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <coneGeometry args={[0.28, 0.35, 6]} />
        <meshStandardMaterial color="#f1f8e9" />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
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
      <mesh geometry={geometry} position={[0, 0.1, 0]}>
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
      <mesh position={[0, 0.2, 0]}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#b3e5fc" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.1, 0.12, 0.05]} rotation={[0.3, 0.5, 0]}>
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
      <mesh geometry={geometry} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#37474f" flatShading />
      </mesh>
      {/* Lava glow spots */}
      <mesh position={[0.05, 0.08, 0.08]}>
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
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.18, 8, 6]} />
        <meshStandardMaterial color={bushColor} />
      </mesh>
      <mesh position={[0.1, 0.1, 0.08]}>
        <sphereGeometry args={[0.12, 6, 5]} />
        <meshStandardMaterial color="#388e3c" />
      </mesh>
      <mesh position={[-0.08, 0.1, -0.06]}>
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
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.1]}>
        <coneGeometry args={[0.02, 0.16, 4]} />
        <meshStandardMaterial color={grassColor} />
      </mesh>
      <mesh position={[0.03, 0.07, 0.02]} rotation={[0, 0.5, -0.15]}>
        <coneGeometry args={[0.015, 0.14, 4]} />
        <meshStandardMaterial color="#8bc34a" />
      </mesh>
      <mesh position={[-0.02, 0.06, -0.01]} rotation={[0, -0.3, 0.2]}>
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
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.01, 0.015, 0.16, 4]} />
        <meshStandardMaterial color="#558b2f" />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.18, 0]}>
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
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.4, 4]} />
        <meshStandardMaterial color="#558b2f" />
      </mesh>
      {/* Leaf */}
      <mesh position={[0.08, 0.15, 0]} rotation={[0, 0, -0.5]}>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshStandardMaterial color="#7cb342" />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.42, 0]}>
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
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 8]} />
        <meshStandardMaterial color="#66bb6a" />
      </mesh>
      {/* Arms */}
      <mesh position={[0.12, 0.22, 0]} rotation={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2, 6]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
      <mesh position={[-0.1, 0.18, 0]} rotation={[0, 0, 0.9]}>
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
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.12, 6]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.08, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={capColor} />
      </mesh>
      {/* Spots */}
      <mesh position={[0.03, 0.16, 0.02]}>
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
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.01, 0.015, 0.4, 4]} />
        <meshStandardMaterial color="#8bc34a" />
      </mesh>
      <mesh position={[0.03, 0.18, 0.02]}>
        <cylinderGeometry args={[0.008, 0.012, 0.36, 4]} />
        <meshStandardMaterial color="#9ccc65" />
      </mesh>
      {/* Brown tops */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.025, 0.02, 0.08, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      <mesh position={[0.03, 0.34, 0.02]}>
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
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.1, 8]} />
        <meshStandardMaterial color="#795548" />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
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
      <mesh position={[-0.2, 0.15, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      <mesh position={[0.2, 0.15, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Rails */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.45, 0.04, 0.03]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
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
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.38, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.42, 0.25, 4]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.1, 0.21]}>
        <boxGeometry args={[0.1, 0.18, 0.02]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Window */}
      <mesh position={[0.15, 0.18, 0.21]}>
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
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.2, 8]} />
        <meshStandardMaterial color="#78909c" />
      </mesh>
      {/* Water inside */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 8]} />
        <meshStandardMaterial color="#1e88e5" />
      </mesh>
      {/* Roof posts */}
      <mesh position={[-0.15, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      <mesh position={[0.15, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.52, 0]} rotation={[0, Math.PI / 4, 0]}>
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
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.6, 6]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.65, 0]}>
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
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
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
      <mesh position={[0, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Rings on end */}
      <mesh position={[0.2, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
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
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.16, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Top rings */}
      <mesh position={[0, 0.165, 0]}>
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
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.55, 0.3, 0.45]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.5]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.4]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.1, 0.23]}>
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
      <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.3, 0.3, 4]} />
        <meshStandardMaterial color="#fff8e1" />
      </mesh>
      {/* Door flap */}
      <mesh position={[0.15, 0.08, 0.15]}>
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
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[0.18, 0.06, 0.1]} />
        <meshStandardMaterial color="#78909c" />
      </mesh>
      {/* Headstone */}
      <mesh position={[0, 0.15, -0.02]}>
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
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.3, 6]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      {/* Lamp */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[0.08, 0.1, 0.08]} />
        <meshStandardMaterial color="#ffcc02" emissive="#ffcc02" emissiveIntensity={0.3} />
      </mesh>
      {/* Top */}
      <mesh position={[0, 0.4, 0]}>
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
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Middle */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.09, 8, 6]} />
        <meshStandardMaterial color="#fafafa" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.07, 8, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Carrot nose */}
      <mesh position={[0, 0.4, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.02, 0.08, 6]} />
        <meshStandardMaterial color="#ff9800" />
      </mesh>
      {/* Hat */}
      <mesh position={[0, 0.5, 0]}>
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
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.25, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e3f2fd" />
      </mesh>
      {/* Entrance */}
      <mesh position={[0, 0.08, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
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
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.16, 8]} />
        <meshStandardMaterial color="#d7ccc8" />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
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
      <mesh position={[0, 0.02, 0]} rotation={[0, 0.3, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.02, 0.15, 4]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      <mesh position={[0.05, 0.02, 0.03]} rotation={[0.2, -0.5, Math.PI / 2]}>
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
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.06, 6, 5]} />
        <meshStandardMaterial color="#efebe9" />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, 0.02, 0.04]}>
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
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#a1887f" />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
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
      <mesh position={[0, 0.03, 0]}>
        <torusGeometry args={[0.12, 0.04, 6, 8]} />
        <meshStandardMaterial color="#616161" />
      </mesh>
      {/* Fire */}
      <mesh position={[0, 0.1, 0]}>
        <coneGeometry args={[0.08, 0.15, 6]} />
        <meshStandardMaterial color="#ff5722" emissive="#ff5722" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.03, 0.08, 0.02]}>
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
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.15, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, 0.04, 0.05]}>
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
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 8]} />
        <meshStandardMaterial color="#66bb6a" side={THREE.DoubleSide} />
      </mesh>
      {/* Flower */}
      <mesh position={[0.03, 0.04, 0]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#f48fb1" />
      </mesh>
    </group>
  );
}
