/**
 * WebGPU Canvas Component
 *
 * Provides WebGPU rendering with automatic fallback to WebGL.
 * Uses Three.js WebGPURenderer when available.
 */

import { useRef, useEffect, useState, useCallback, createContext, useContext, ReactNode } from 'react';
import * as THREE from 'three';
// @ts-expect-error - WebGPURenderer types not fully available
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

export type RendererType = 'webgpu' | 'webgl';

export interface WebGPUContextValue {
  renderer: THREE.WebGLRenderer | typeof WebGPURenderer | null;
  rendererType: RendererType;
  scene: THREE.Scene;
  camera: THREE.Camera | null;
  setCamera: (camera: THREE.Camera) => void;
  isWebGPUAvailable: boolean;
  canvas: HTMLCanvasElement | null;
}

const WebGPUContext = createContext<WebGPUContextValue | null>(null);

export function useWebGPU() {
  const ctx = useContext(WebGPUContext);
  if (!ctx) {
    throw new Error('useWebGPU must be used within WebGPUCanvas');
  }
  return ctx;
}

export interface WebGPUCanvasProps {
  children?: ReactNode;
  /** Force WebGL even if WebGPU is available */
  forceWebGL?: boolean;
  /** Device pixel ratio */
  dpr?: number;
  /** Enable shadows */
  shadows?: boolean | 'soft' | 'basic';
  /** Antialias */
  antialias?: boolean;
  /** Background color */
  background?: THREE.ColorRepresentation;
  /** Called when renderer is ready */
  onCreated?: (ctx: WebGPUContextValue) => void;
  /** Class name for canvas container */
  className?: string;
  /** Style for canvas container */
  style?: React.CSSProperties;
}

/**
 * Check if WebGPU is available in the browser
 */
async function checkWebGPUSupport(): Promise<boolean> {
  if (!navigator.gpu) {
    return false;
  }

  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      return false;
    }

    const device = await adapter.requestDevice();
    device.destroy();
    return true;
  } catch {
    return false;
  }
}

/**
 * WebGPU-enabled Canvas component with automatic fallback
 */
export function WebGPUCanvas({
  children,
  forceWebGL = false,
  dpr = 1,
  shadows = true,
  antialias = true,
  background = 0x1a1a2e,
  onCreated,
  className = '',
  style = {},
}: WebGPUCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | typeof WebGPURenderer | null>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.Camera | null>(null);
  const frameIdRef = useRef<number>(0);

  const [isReady, setIsReady] = useState(false);
  const [rendererType, setRendererType] = useState<RendererType>('webgl');
  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(false);

  const setCamera = useCallback((camera: THREE.Camera) => {
    cameraRef.current = camera;
  }, []);

  // Initialize renderer
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let canvas: HTMLCanvasElement;
    let renderer: THREE.WebGLRenderer | typeof WebGPURenderer;
    let mounted = true;

    async function initRenderer() {
      // Create canvas
      canvas = document.createElement('canvas');
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      container.appendChild(canvas);
      canvasRef.current = canvas;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Check WebGPU support
      const webgpuSupported = !forceWebGL && await checkWebGPUSupport();

      if (!mounted) {
        canvas.remove();
        return;
      }

      setIsWebGPUAvailable(webgpuSupported);

      if (webgpuSupported) {
        // Use WebGPU
        try {
          renderer = new WebGPURenderer({
            canvas,
            antialias,
            powerPreference: 'high-performance',
          });
          await renderer.init();

          if (!mounted) {
            renderer.dispose();
            canvas.remove();
            return;
          }

          setRendererType('webgpu');
          console.log('Using WebGPU renderer');
        } catch (error) {
          console.warn('WebGPU initialization failed, falling back to WebGL:', error);
          // Fall through to WebGL
          renderer = new THREE.WebGLRenderer({
            canvas,
            antialias,
            powerPreference: 'high-performance',
          });
          setRendererType('webgl');
        }
      } else {
        // Use WebGL
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias,
          powerPreference: 'high-performance',
        });
        setRendererType('webgl');
        console.log('Using WebGL renderer');
      }

      // Configure renderer
      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);

      // Shadow configuration
      if (shadows && 'shadowMap' in renderer) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = shadows === 'soft'
          ? THREE.PCFSoftShadowMap
          : THREE.PCFShadowMap;
      }

      // Output encoding
      if ('outputColorSpace' in renderer) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }

      // Tone mapping
      if ('toneMapping' in renderer) {
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
      }

      rendererRef.current = renderer;

      // Set background
      sceneRef.current.background = new THREE.Color(background);

      setIsReady(true);

      // Notify parent
      if (onCreated) {
        onCreated({
          renderer,
          rendererType: webgpuSupported ? 'webgpu' : 'webgl',
          scene: sceneRef.current,
          camera: cameraRef.current,
          setCamera,
          isWebGPUAvailable: webgpuSupported,
          canvas,
        });
      }
    }

    initRenderer();

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current || !containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      rendererRef.current.setSize(width, height);

      if (cameraRef.current) {
        if ('aspect' in cameraRef.current) {
          (cameraRef.current as THREE.PerspectiveCamera).aspect = width / height;
          (cameraRef.current as THREE.PerspectiveCamera).updateProjectionMatrix();
        } else if ('left' in cameraRef.current) {
          // Orthographic camera - maintain size relative to viewport
          const cam = cameraRef.current as THREE.OrthographicCamera;
          const aspect = width / height;
          const frustumSize = 10; // Base size
          cam.left = -frustumSize * aspect;
          cam.right = frustumSize * aspect;
          cam.top = frustumSize;
          cam.bottom = -frustumSize;
          cam.updateProjectionMatrix();
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      mounted = false;
      resizeObserver.disconnect();

      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.remove();
      }
    };
  }, [forceWebGL, dpr, shadows, antialias, background, onCreated, setCamera]);

  // Render loop
  useEffect(() => {
    if (!isReady || !rendererRef.current) return;

    const renderer = rendererRef.current;
    const scene = sceneRef.current;

    function animate() {
      frameIdRef.current = requestAnimationFrame(animate);

      if (cameraRef.current) {
        renderer.render(scene, cameraRef.current);
      }
    }

    animate();

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [isReady]);

  const contextValue: WebGPUContextValue = {
    renderer: rendererRef.current,
    rendererType,
    scene: sceneRef.current,
    camera: cameraRef.current,
    setCamera,
    isWebGPUAvailable,
    canvas: canvasRef.current,
  };

  return (
    <WebGPUContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={className}
        style={{ width: '100%', height: '100%', ...style }}
      >
        {isReady && children}
      </div>
    </WebGPUContext.Provider>
  );
}

/**
 * Hook to add objects to the WebGPU scene
 */
export function useScene() {
  const { scene } = useWebGPU();
  return scene;
}

/**
 * Hook to get the current renderer
 */
export function useRenderer() {
  const { renderer, rendererType } = useWebGPU();
  return { renderer, rendererType };
}

/**
 * Hook for render loop callback (similar to useFrame in R3F)
 */
export function useRenderLoop(callback: (delta: number) => void) {
  const lastTimeRef = useRef(performance.now());
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let frameId: number;

    function loop() {
      frameId = requestAnimationFrame(loop);
      const now = performance.now();
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      callbackRef.current(delta);
    }

    loop();

    return () => cancelAnimationFrame(frameId);
  }, []);
}

export default WebGPUCanvas;
