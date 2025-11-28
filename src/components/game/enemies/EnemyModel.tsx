/**
 * EnemyModel - 3D Model-based Enemy Renderer
 *
 * Renders enemies using loaded GLB/GLTF models with stylized materials.
 * Falls back to procedural geometry if model is not available.
 */

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useModel, useAnimationUpdate } from '@/hooks/useModel';
import type { EnemyDefinition } from '@/types/enemy';
import { EnemyMesh } from './EnemyMesh';

export type EnemyAnimationState =
  | 'idle'
  | 'walk'
  | 'run'
  | 'fly'
  | 'attack'
  | 'hit'
  | 'death';

export interface EnemyModelProps {
  definition: EnemyDefinition;
  position?: [number, number, number];
  rotation?: [number, number, number];
  /** Enemy tier for visual scaling/coloring */
  tier?: number;
  /** Current animation state */
  animationState?: EnemyAnimationState;
  /** Health percentage 0-1 */
  healthPercent?: number;
  /** Movement speed factor (affects animation speed) */
  speedFactor?: number;
  /** Is enemy affected by slow/freeze effects */
  isSlowed?: boolean;
  /** Is enemy stunned */
  isStunned?: boolean;
  /** Is enemy burning */
  isBurning?: boolean;
  /** Is enemy poisoned */
  isPoisoned?: boolean;
  /** Override scale */
  scale?: number;
}

/**
 * Get model name from enemy definition
 */
function getEnemyModelName(definition: EnemyDefinition): string {
  // Use the enemy type directly as the model name
  return definition.type.toLowerCase();
}

/**
 * Get status effect color tint
 */
function getStatusEffectColor(
  isBurning?: boolean,
  isPoisoned?: boolean,
  isSlowed?: boolean
): THREE.Color | null {
  if (isBurning) return new THREE.Color(0xff4400);
  if (isPoisoned) return new THREE.Color(0x44ff00);
  if (isSlowed) return new THREE.Color(0x4488ff);
  return null;
}

/**
 * Enemy model component with GLTF model loading
 */
export function EnemyModel({
  definition,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  tier = 1,
  animationState = 'idle',
  healthPercent = 1,
  speedFactor = 1,
  isSlowed = false,
  isStunned = false,
  isBurning = false,
  isPoisoned = false,
  scale: scaleOverride,
}: EnemyModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const modelName = getEnemyModelName(definition);

  // Load 3D model
  const {
    object,
    mixer,
    actions,
    isLoading,
    error,
    playAnimation,
    dimensions,
  } = useModel({
    category: 'enemies',
    name: modelName,
    withAnimations: true,
    materialOverrides: {
      toonBands: 4,
      rimPower: 3,
    },
  });

  // Update animation mixer
  useAnimationUpdate(mixer);

  // Handle animation state changes
  useEffect(() => {
    if (!object || actions.size === 0) return;

    // Determine which animation to play
    let animName = animationState;

    // Flying enemies use 'fly' instead of 'walk'
    if (animationState === 'walk' && definition.category === 'flying') {
      animName = 'fly';
    }

    // Check if animation exists
    if (!actions.has(animName)) {
      // Fallback animations
      if (animName === 'run' && actions.has('walk')) animName = 'walk';
      else if (animName === 'fly' && actions.has('idle')) animName = 'idle';
      else if (actions.has('idle')) animName = 'idle';
    }

    if (actions.has(animName)) {
      playAnimation(animName, {
        loop: ['death', 'hit', 'attack'].includes(animName)
          ? THREE.LoopOnce
          : THREE.LoopRepeat,
        timeScale: animName === 'walk' || animName === 'run' ? speedFactor : 1,
        clampWhenFinished: animName === 'death',
      });
    }
  }, [object, actions, animationState, definition.category, speedFactor, playAnimation]);

  // Status effect visuals
  const statusColor = getStatusEffectColor(isBurning, isPoisoned, isSlowed);

  useEffect(() => {
    if (!object) return;

    object.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;

        // Apply status effect color
        if (statusColor) {
          material.emissive = statusColor;
          material.emissiveIntensity = 0.3;
        } else if (!isStunned) {
          material.emissiveIntensity = 0;
        }

        // Stun effect - gray out
        if (isStunned) {
          material.emissive = new THREE.Color(0x888888);
          material.emissiveIntensity = 0.5;
        }
      }
    });
  }, [object, statusColor, isStunned]);

  // Idle/movement animations
  useFrame((state) => {
    if (!groupRef.current) return;

    // Flying enemies bob up and down
    if (definition.category === 'flying' && !isStunned) {
      const bob = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.position.y = position[1] + bob + 0.5; // Flying height offset
    }

    // Stun shake
    if (isStunned) {
      const shake = Math.sin(state.clock.elapsedTime * 20) * 0.02;
      groupRef.current.position.x = position[0] + shake;
    }

    // Burning particle effect timing (handled by particle system)
    // Poison drip timing (handled by particle system)
  });

  // Calculate scale based on tier and definition
  const baseScale = scaleOverride ?? definition.meshConfig?.scale ?? 1;
  const tierScale = 1 + (tier - 1) * 0.1; // Slightly larger for higher tiers
  const finalScale = baseScale * tierScale;

  // If loading or error, show fallback procedural mesh
  if (isLoading || error || !object) {
    return (
      <group
        ref={groupRef}
        position={position}
        rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2])}
      >
        <EnemyMesh
          definition={definition}
          tier={tier}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          animate={animationState !== 'death'}
          healthPercent={healthPercent}
        />
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

      {/* Health bar */}
      {healthPercent < 1 && healthPercent > 0 && (
        <group position={[0, (dimensions?.y ?? 1) * 0.5 + 0.3, 0]}>
          {/* Background */}
          <mesh>
            <planeGeometry args={[0.5, 0.06]} />
            <meshBasicMaterial color="#222222" transparent opacity={0.8} />
          </mesh>
          {/* Health fill */}
          <mesh position={[(healthPercent - 1) * 0.25, 0, 0.001]}>
            <planeGeometry args={[0.48 * healthPercent, 0.04]} />
            <meshBasicMaterial
              color={
                healthPercent > 0.5
                  ? '#00ff00'
                  : healthPercent > 0.25
                    ? '#ffff00'
                    : '#ff0000'
              }
            />
          </mesh>
        </group>
      )}

      {/* Status effect indicators */}
      {(isBurning || isPoisoned || isSlowed || isStunned) && (
        <StatusEffectIndicator
          position={[0, (dimensions?.y ?? 1) * 0.5 + 0.5, 0]}
          isBurning={isBurning}
          isPoisoned={isPoisoned}
          isSlowed={isSlowed}
          isStunned={isStunned}
        />
      )}
    </group>
  );
}

/**
 * Status effect visual indicator
 */
function StatusEffectIndicator({
  position,
  isBurning,
  isPoisoned,
  isSlowed,
  isStunned,
}: {
  position: [number, number, number];
  isBurning?: boolean;
  isPoisoned?: boolean;
  isSlowed?: boolean;
  isStunned?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    // Rotate status indicator
    ref.current.rotation.y = state.clock.elapsedTime * 2;
  });

  const indicators: Array<{ color: string; offset: number }> = [];
  if (isBurning) indicators.push({ color: '#ff4400', offset: 0 });
  if (isPoisoned) indicators.push({ color: '#44ff00', offset: 0.15 });
  if (isSlowed) indicators.push({ color: '#4488ff', offset: 0.3 });
  if (isStunned) indicators.push({ color: '#ffff00', offset: 0.45 });

  return (
    <group ref={ref} position={position}>
      {indicators.map((ind, i) => (
        <mesh
          key={i}
          position={[Math.sin(ind.offset * Math.PI * 2) * 0.2, 0, Math.cos(ind.offset * Math.PI * 2) * 0.2]}
        >
          <sphereGeometry args={[0.08, 8, 6]} />
          <meshBasicMaterial color={ind.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Preview version for catalogs/UI
 */
export function EnemyModelPreview({
  definition,
  tier = 1,
  scale = 1,
  autoRotate = false,
}: {
  definition: EnemyDefinition;
  tier?: number;
  scale?: number;
  autoRotate?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const modelName = getEnemyModelName(definition);

  const { object, isLoading, error } = useModel({
    category: 'enemies',
    name: modelName,
    withAnimations: false,
    materialOverrides: {
      toonBands: 4,
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
        <EnemyMesh definition={definition} tier={tier} animate={false} />
      </group>
    );
  }

  const tierScale = 1 + (tier - 1) * 0.1;

  return (
    <group ref={groupRef} scale={scale * (definition.meshConfig?.scale ?? 1) * tierScale}>
      <primitive object={object} />
    </group>
  );
}

export default EnemyModel;
