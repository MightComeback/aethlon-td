/**
 * TowerModel - 3D Model-based Tower Renderer
 *
 * Renders towers using loaded GLB/GLTF models with stylized materials.
 * Falls back to procedural geometry if model is not available.
 */

import { useRef, useEffect, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useModel, useAnimationUpdate } from '@/hooks/useModel';
import { getElementColor } from '@/data/elements';
import type { ExtendedTowerDefinition } from '@/types/tower';
import { TowerMesh } from './TowerMesh';

export interface TowerModelProps {
  definition: ExtendedTowerDefinition;
  position?: [number, number, number];
  rotation?: [number, number, number];
  /** Current animation state */
  animationState?: 'idle' | 'attack' | 'build' | 'special';
  /** Is the tower selected */
  isSelected?: boolean;
  /** Is the tower being placed (ghost mode) */
  isGhost?: boolean;
  /** Override scale */
  scale?: number;
}

/**
 * Get model name from tower definition
 */
function getTowerModelName(definition: ExtendedTowerDefinition): string {
  const element = definition.element.toLowerCase();
  const tier = definition.tier || 1;

  // Check for merged element towers
  const mergedElements = ['lava', 'ice', 'storm', 'magma', 'plasma'];
  if (mergedElements.includes(element)) {
    return `${element}_tower`;
  }

  // Standard element towers
  return `${element}_tower_tier${tier}`;
}

/**
 * Tower model component with GLTF model loading
 */
export function TowerModel({
  definition,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animationState = 'idle',
  isSelected = false,
  isGhost = false,
  scale: scaleOverride,
}: TowerModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const modelName = getTowerModelName(definition);
  const elementColor = useMemo(() => new THREE.Color(getElementColor(definition.element)), [definition.element]);

  // Load 3D model
  const {
    object,
    mixer,
    actions,
    isLoading,
    error,
    playAnimation,
  } = useModel({
    category: 'towers',
    name: modelName,
    withAnimations: true,
    materialOverrides: {
      color: elementColor,
      toonBands: 3,
      rimColor: elementColor,
      rimPower: isSelected ? 3 : 2,
    },
  });

  // Update animation mixer
  useAnimationUpdate(mixer);

  // Handle animation state changes
  useEffect(() => {
    if (!object || actions.size === 0) return;

    // Play appropriate animation based on state
    const animName = animationState;
    if (actions.has(animName)) {
      playAnimation(animName, {
        loop: animationState === 'attack' ? THREE.LoopOnce : THREE.LoopRepeat,
        clampWhenFinished: animationState === 'attack',
      });
    } else if (actions.has('idle')) {
      playAnimation('idle');
    }
  }, [object, actions, animationState, playAnimation]);

  // Ghost mode animation
  useFrame((state) => {
    if (!groupRef.current) return;

    if (isGhost) {
      // Floating/bobbing effect for ghost towers
      const bob = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      groupRef.current.position.y = position[1] + bob;
    }
  });

  // Calculate scale
  const finalScale = scaleOverride ?? definition.meshConfig?.scale ?? 1;

  // Ghost mode material adjustments
  const ghostOpacity = isGhost ? 0.5 : 1;

  // Apply ghost effect to loaded model
  useEffect(() => {
    if (!object) return;

    object.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.transparent = isGhost;
        material.opacity = ghostOpacity;
      }
    });
  }, [object, isGhost, ghostOpacity]);

  // Selection highlight effect
  useEffect(() => {
    if (!object) return;

    object.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        if (isSelected) {
          material.emissive = elementColor;
          material.emissiveIntensity = 0.3;
        } else {
          material.emissiveIntensity = 0;
        }
      }
    });
  }, [object, isSelected, elementColor]);

  // If loading or error, show fallback procedural mesh
  if (isLoading || error || !object) {
    return (
      <group
        ref={groupRef}
        position={position}
        rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2])}
      >
        <TowerMesh
          definition={definition}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          animate={animationState === 'idle'}
        />
        {isGhost && (
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.8, 1, 32]} />
            <meshBasicMaterial
              color={elementColor}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    );
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2])}
      scale={finalScale}
    >
      <primitive object={object} />

      {/* Selection ring */}
      {isSelected && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.1, 32]} />
          <meshBasicMaterial
            color={elementColor}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Range indicator (shown when selected) */}
      {isSelected && definition.baseStats?.range && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[definition.baseStats.range - 0.1, definition.baseStats.range, 64]} />
          <meshBasicMaterial
            color={elementColor}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Ghost placement ring */}
      {isGhost && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.9, 32]} />
          <meshBasicMaterial
            color={elementColor}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Preview version for catalogs/UI
 */
export function TowerModelPreview({
  definition,
  scale = 1,
  autoRotate = false,
}: {
  definition: ExtendedTowerDefinition;
  scale?: number;
  autoRotate?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const modelName = getTowerModelName(definition);
  const elementColor = useMemo(() => new THREE.Color(getElementColor(definition.element)), [definition.element]);

  const { object, isLoading, error } = useModel({
    category: 'towers',
    name: modelName,
    withAnimations: false,
    materialOverrides: {
      color: elementColor,
      toonBands: 3,
    },
  });

  // Auto rotation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  // Fallback to procedural mesh
  if (isLoading || error || !object) {
    return (
      <group ref={groupRef} scale={scale}>
        <TowerMesh
          definition={definition}
          animate={false}
        />
      </group>
    );
  }

  return (
    <group ref={groupRef} scale={scale * (definition.meshConfig?.scale ?? 1)}>
      <primitive object={object} />
    </group>
  );
}

/**
 * Wrapper with Suspense for async model loading
 */
export function TowerModelAsync(props: TowerModelProps) {
  return (
    <Suspense
      fallback={
        <TowerMesh
          definition={props.definition}
          position={props.position}
          rotation={props.rotation}
          animate={props.animationState === 'idle'}
        />
      }
    >
      <TowerModel {...props} />
    </Suspense>
  );
}

export default TowerModel;
