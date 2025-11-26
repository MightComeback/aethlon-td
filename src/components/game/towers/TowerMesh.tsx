/**
 * Universal Tower Mesh Renderer
 * Renders any tower based on its mesh configuration
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ExtendedTowerDefinition, TowerMeshPart } from "@/types/tower";
import { getElementColor } from "@/data/elements";

interface MeshPartProps {
  part: TowerMeshPart;
  elementColor: string;
}

/**
 * Renders a single tower mesh part (primitive shape)
 */
function TowerMeshPartComponent({ part, elementColor }: MeshPartProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Apply element color tint to grayscale base
  const color = useMemo(() => {
    // Mix grayscale with element color (60% gray, 40% element)
    const gray = parseInt(part.color.slice(1), 16);
    const elem = parseInt(elementColor.slice(1), 16);

    const grayR = (gray >> 16) & 0xff;
    const grayG = (gray >> 8) & 0xff;
    const grayB = gray & 0xff;

    const elemR = (elem >> 16) & 0xff;
    const elemG = (elem >> 8) & 0xff;
    const elemB = elem & 0xff;

    const r = Math.round(grayR * 0.6 + elemR * 0.4);
    const g = Math.round(grayG * 0.6 + elemG * 0.4);
    const b = Math.round(grayB * 0.6 + elemB * 0.4);

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }, [part.color, elementColor]);

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
        if (part.size.length === 1) {
          return new THREE.SphereGeometry(part.size[0], 8, 6);
        } else {
          const geo = new THREE.SphereGeometry(1, 8, 6);
          geo.scale(part.size[0] ?? 1, part.size[1] ?? part.size[0] ?? 1, part.size[2] ?? part.size[0] ?? 1);
          return geo;
        }

      case "box":
        return new THREE.BoxGeometry(
          part.size[0] ?? 0.1,
          part.size[1] ?? 0.1,
          part.size[2] ?? 0.1
        );

      case "cylinder":
        if (part.size.length === 2) {
          return new THREE.CylinderGeometry(part.size[0], part.size[0], part.size[1], 8);
        } else {
          return new THREE.CylinderGeometry(part.size[0], part.size[1], part.size[2], 8);
        }

      case "cone":
        return new THREE.ConeGeometry(part.size[0], part.size[1], 8);

      case "dodecahedron":
        return new THREE.DodecahedronGeometry(part.size[0], 0);

      case "torus":
        return new THREE.TorusGeometry(part.size[0] ?? 0.2, part.size[1] ?? 0.05, 8, 12);

      case "octahedron":
        return new THREE.OctahedronGeometry(part.size[0] ?? 0.2, 0);

      default:
        return new THREE.SphereGeometry(0.1, 8, 6);
    }
  }, [part.type, part.size]);

  // Animation
  useFrame((state) => {
    if (!part.animated || !meshRef.current) return;

    switch (part.animated.type) {
      case "rotate":
        if (part.animated.axis === "x") {
          meshRef.current.rotation.x += part.animated.speed * 0.01;
        } else if (part.animated.axis === "z") {
          meshRef.current.rotation.z += part.animated.speed * 0.01;
        } else {
          meshRef.current.rotation.y += part.animated.speed * 0.01;
        }
        break;

      case "bob":
        const bobOffset = Math.sin(state.clock.elapsedTime * part.animated.speed) * 0.05;
        meshRef.current.position.y = part.position[1] + bobOffset;
        break;

      case "pulse":
        const scale = 1 + Math.sin(state.clock.elapsedTime * part.animated.speed) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
        break;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={part.position}
      rotation={rotation}
      geometry={geometry}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        emissive={part.emissive || "#000000"}
        emissiveIntensity={part.emissive ? 0.5 : 0}
        flatShading={part.flatShading ?? true}
      />
    </mesh>
  );
}

interface TowerMeshProps {
  definition: ExtendedTowerDefinition;
  position?: [number, number, number];
  rotation?: [number, number, number];
  animate?: boolean;
}

/**
 * Universal tower mesh renderer
 * Renders any tower type based on its mesh configuration
 */
export function TowerMesh({
  definition,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animate = true,
}: TowerMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const elementColor = getElementColor(definition.element);

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2])}
      scale={definition.meshConfig.scale}
    >
      {definition.meshConfig.parts.map((part, index) => (
        <TowerMeshPartComponent
          key={index}
          part={animate ? part : { ...part, animated: undefined }}
          elementColor={elementColor}
        />
      ))}
    </group>
  );
}

/**
 * Preview version for UI/catalog (static, no animations)
 */
export function TowerMeshPreview({
  definition,
  scale = 1,
}: {
  definition: ExtendedTowerDefinition;
  scale?: number;
}) {
  const elementColor = getElementColor(definition.element);

  return (
    <group scale={definition.meshConfig.scale * scale}>
      {definition.meshConfig.parts.map((part, index) => (
        <TowerMeshPartComponent
          key={index}
          part={{ ...part, animated: undefined }}
          elementColor={elementColor}
        />
      ))}
    </group>
  );
}

export default TowerMesh;
