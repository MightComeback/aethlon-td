/**
 * PixelSprite Component
 * Renders a pixel art sprite as a billboard (always faces camera)
 * Used for objects, characters, and decorations in the 2.5D world
 */

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  spriteToCanvas,
  type SpriteData,
  type PaletteKey,
} from "@/utils/pixelArt";

interface PixelSpriteProps<P extends PaletteKey> {
  /** Sprite pixel data */
  sprite: SpriteData<P>;
  /** Color palette to use */
  palette: P;
  /** Position in world space [x, y, z] */
  position?: [number, number, number];
  /** Scale multiplier (default 1) */
  scale?: number;
  /** Pixel scale (how many screen pixels per sprite pixel, default 1) */
  pixelScale?: number;
  /** Whether to billboard (always face camera) */
  billboard?: boolean;
  /** Y-axis only billboarding (rotate around Y only) */
  billboardY?: boolean;
  /** Anchor point: 'bottom' | 'center' (default 'bottom') */
  anchor?: "bottom" | "center";
  /** Cast shadow */
  castShadow?: boolean;
  /** Receive shadow */
  receiveShadow?: boolean;
  /** Render order for layering */
  renderOrder?: number;
  /** Optional onClick handler */
  onClick?: () => void;
}

export function PixelSprite<P extends PaletteKey>({
  sprite,
  palette,
  position = [0, 0, 0],
  scale = 1,
  pixelScale = 1,
  billboard = true,
  billboardY = true,
  anchor = "bottom",
  castShadow = false,
  receiveShadow = false,
  renderOrder = 0,
  onClick,
}: PixelSpriteProps<P>) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Create texture from sprite data
  const texture = useMemo(() => {
    const canvas = spriteToCanvas(sprite, palette, pixelScale);
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }, [sprite, palette, pixelScale]);

  // Calculate dimensions
  const dimensions = useMemo(() => {
    const height = sprite.length * pixelScale;
    const width = (sprite[0]?.length ?? 0) * pixelScale;
    // Convert pixels to world units (adjust this ratio as needed)
    const worldScale = 0.05 * scale;
    return {
      width: width * worldScale,
      height: height * worldScale,
    };
  }, [sprite, pixelScale, scale]);

  // Calculate Y offset based on anchor
  const yOffset = anchor === "bottom" ? dimensions.height / 2 : 0;

  // Billboard effect
  useFrame(() => {
    if (!meshRef.current || !billboard) return;

    if (billboardY) {
      // Y-axis only billboarding (sprite stays upright)
      const cameraPos = camera.position.clone();
      cameraPos.y = meshRef.current.position.y;
      meshRef.current.lookAt(cameraPos);
    } else {
      // Full billboarding (always faces camera exactly)
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  // Cleanup texture on unmount
  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[1] + yOffset, position[2]]}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      renderOrder={renderOrder}
      onClick={onClick}
    >
      <planeGeometry args={[dimensions.width, dimensions.height]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Animated pixel sprite with multiple frames
 */
interface AnimatedPixelSpriteProps<P extends PaletteKey>
  extends Omit<PixelSpriteProps<P>, "sprite"> {
  /** Animation frames */
  frames: SpriteData<P>[];
  /** Milliseconds per frame */
  frameTime?: number;
  /** Whether to loop the animation */
  loop?: boolean;
  /** Whether the animation is playing */
  playing?: boolean;
  /** Callback when animation completes (if not looping) */
  onComplete?: () => void;
}

export function AnimatedPixelSprite<P extends PaletteKey>({
  frames,
  frameTime = 100,
  loop = true,
  playing = true,
  onComplete,
  ...spriteProps
}: AnimatedPixelSpriteProps<P>) {
  const frameIndexRef = useRef(0);
  const timeAccumRef = useRef(0);
  const currentFrameRef = useRef(frames[0]);

  useFrame((_, delta) => {
    if (!playing || frames.length <= 1) return;

    timeAccumRef.current += delta * 1000;

    if (timeAccumRef.current >= frameTime) {
      timeAccumRef.current = 0;
      frameIndexRef.current++;

      if (frameIndexRef.current >= frames.length) {
        if (loop) {
          frameIndexRef.current = 0;
        } else {
          frameIndexRef.current = frames.length - 1;
          onComplete?.();
          return;
        }
      }

      currentFrameRef.current = frames[frameIndexRef.current];
    }
  });

  // Use the first frame if no current frame
  const currentSprite = currentFrameRef.current ?? frames[0];
  if (!currentSprite) return null;

  return <PixelSprite {...spriteProps} sprite={currentSprite} />;
}

/**
 * Instanced pixel sprites for performance (many identical sprites)
 */
interface InstancedPixelSpritesProps<P extends PaletteKey> {
  sprite: SpriteData<P>;
  palette: P;
  positions: [number, number, number][];
  scale?: number;
  pixelScale?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export function InstancedPixelSprites<P extends PaletteKey>({
  sprite,
  palette,
  positions,
  scale = 1,
  pixelScale = 1,
  castShadow = false,
  receiveShadow = false,
}: InstancedPixelSpritesProps<P>) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();

  // Create texture
  const texture = useMemo(() => {
    const canvas = spriteToCanvas(sprite, palette, pixelScale);
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }, [sprite, palette, pixelScale]);

  // Calculate dimensions
  const dimensions = useMemo(() => {
    const height = sprite.length * pixelScale;
    const width = (sprite[0]?.length ?? 0) * pixelScale;
    const worldScale = 0.05 * scale;
    return {
      width: width * worldScale,
      height: height * worldScale,
    };
  }, [sprite, pixelScale, scale]);

  // Update instance matrices
  useEffect(() => {
    if (!meshRef.current) return;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scaleVec = new THREE.Vector3(1, 1, 1);

    positions.forEach((pos, i) => {
      position.set(pos[0], pos[1] + dimensions.height / 2, pos[2]);
      matrix.compose(position, quaternion, scaleVec);
      meshRef.current!.setMatrixAt(i, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dimensions.height]);

  // Billboard all instances
  useFrame(() => {
    if (!meshRef.current) return;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scaleVec = new THREE.Vector3(1, 1, 1);

    // Get camera rotation (Y-axis only)
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);
    cameraDir.y = 0;
    cameraDir.normalize();

    const angle = Math.atan2(cameraDir.x, cameraDir.z);
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle + Math.PI);

    positions.forEach((pos, i) => {
      position.set(pos[0], pos[1] + dimensions.height / 2, pos[2]);
      matrix.compose(position, quaternion, scaleVec);
      meshRef.current!.setMatrixAt(i, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Cleanup
  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, positions.length]}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      <planeGeometry args={[dimensions.width, dimensions.height]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.5}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
