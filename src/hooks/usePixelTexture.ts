import * as THREE from "three";
import { useMemo } from "react";

// Generate a simple noise texture for pixel art look
function generateNoiseTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const val = 230 + Math.random() * 25; // 230-255 range (subtle noise)
    data[i] = val;     // R
    data[i + 1] = val; // G
    data[i + 2] = val; // B
    data[i + 3] = 255; // A
  }

  ctx.putImageData(imageData, 0, 0);

  // Add some "scratches" or pixel details
  ctx.fillStyle = "#e0e0e0";
  for (let i = 0; i < 40; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const w = Math.floor(Math.random() * 3) + 1;
    const h = Math.floor(Math.random() * 3) + 1;
    ctx.fillRect(x, y, w, h);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  
  return texture;
}

// Global singleton texture to save memory
let globalNoiseTexture: THREE.Texture | null = null;

export function usePixelTexture() {
  const texture = useMemo(() => {
    if (!globalNoiseTexture) {
      globalNoiseTexture = generateNoiseTexture();
    }
    return globalNoiseTexture;
  }, []);

  return texture;
}

