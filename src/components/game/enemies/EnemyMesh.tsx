/**
 * Universal Enemy Mesh Renderer
 * Renders any enemy based on its mesh configuration
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { EnemyDefinition, MeshPart } from "@/types/enemy";
import { shiftGrayscale, getTierColorShift } from "@/data/enemies/tiers";

interface MeshPartProps {
  part: MeshPart;
  colorShift: number;
}

/**
 * Renders a single mesh part (primitive shape)
 */
function MeshPartComponent({ part, colorShift }: MeshPartProps) {
  const color = useMemo(
    () => shiftGrayscale(part.color, colorShift),
    [part.color, colorShift]
  );

  const rotation = useMemo(
    () =>
      part.rotation
        ? new THREE.Euler(part.rotation[0], part.rotation[1], part.rotation[2])
        : undefined,
    [part.rotation]
  );

  const geometry = useMemo(() => {
    switch (part.type) {
      case "sphere":
        // size can be [radius] or [radiusX, radiusY, radiusZ]
        if (part.size.length === 1) {
          return new THREE.SphereGeometry(part.size[0], 8, 6);
        } else {
          // Scaled sphere for ellipsoid
          const geo = new THREE.SphereGeometry(1, 8, 6);
          geo.scale(
            part.size[0] ?? 1,
            part.size[1] ?? part.size[0] ?? 1,
            part.size[2] ?? part.size[0] ?? 1
          );
          return geo;
        }

      case "box":
        // size is [width, height, depth]
        return new THREE.BoxGeometry(
          part.size[0] ?? 0.1,
          part.size[1] ?? 0.1,
          part.size[2] ?? 0.1
        );

      case "cylinder":
        // size is [radius, height] or [radiusTop, radiusBottom, height]
        if (part.size.length === 2) {
          return new THREE.CylinderGeometry(
            part.size[0],
            part.size[0],
            part.size[1],
            8
          );
        } else {
          return new THREE.CylinderGeometry(
            part.size[0],
            part.size[1],
            part.size[2],
            8
          );
        }

      case "cone":
        // size is [radius, height]
        return new THREE.ConeGeometry(part.size[0], part.size[1], 8);

      case "dodecahedron":
        return new THREE.DodecahedronGeometry(part.size[0], 0);

      default:
        return new THREE.SphereGeometry(0.1, 8, 6);
    }
  }, [part.type, part.size]);

  return (
    <mesh
      position={part.position}
      rotation={rotation}
      geometry={geometry}
      castShadow
    >
      <meshStandardMaterial
        color={color}
        flatShading={part.flatShading ?? true}
      />
    </mesh>
  );
}

interface EnemyMeshProps {
  definition: EnemyDefinition;
  tier?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  animate?: boolean;
  healthPercent?: number;
}

/**
 * Universal enemy mesh renderer
 * Renders any enemy type based on its mesh configuration
 */
export function EnemyMesh({
  definition,
  tier = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animate = true,
  healthPercent = 1,
}: EnemyMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const colorShift = getTierColorShift(tier);

  // Simple idle animation - bobbing
  useFrame((state) => {
    if (!animate || !groupRef.current) return;

    // Subtle bobbing motion
    const bob = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    groupRef.current.position.y = position[1] + bob;

    // Slight rotation for flying enemies
    if (definition.meshConfig.baseShape === "flying") {
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Damage flash effect based on health
  const damageColor = useMemo(() => {
    if (healthPercent > 0.5) return null;
    if (healthPercent > 0.25) return "#ff6666";
    return "#ff0000";
  }, [healthPercent]);

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2])}
      scale={definition.meshConfig.scale}
    >
      {definition.meshConfig.parts.map((part, index) => (
        <MeshPartComponent
          key={index}
          part={part}
          colorShift={colorShift}
        />
      ))}

      {/* Health bar for damaged enemies */}
      {healthPercent < 1 && (
        <group position={[0, definition.meshConfig.scale * 0.5 + 0.2, 0]}>
          {/* Background */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.4, 0.05]} />
            <meshBasicMaterial color="#333333" />
          </mesh>
          {/* Health fill */}
          <mesh position={[(healthPercent - 1) * 0.2, 0, 0.001]}>
            <planeGeometry args={[0.4 * healthPercent, 0.04]} />
            <meshBasicMaterial color={damageColor ?? "#00ff00"} />
          </mesh>
        </group>
      )}
    </group>
  );
}

/**
 * Preview version without animations (for UI/menus)
 */
export function EnemyMeshPreview({
  definition,
  tier = 1,
  scale = 1,
}: {
  definition: EnemyDefinition;
  tier?: number;
  scale?: number;
}) {
  const colorShift = getTierColorShift(tier);

  return (
    <group scale={definition.meshConfig.scale * scale}>
      {definition.meshConfig.parts.map((part, index) => (
        <MeshPartComponent
          key={index}
          part={part}
          colorShift={colorShift}
        />
      ))}
    </group>
  );
}

export default EnemyMesh;
