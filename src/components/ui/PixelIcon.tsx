/**
 * Pixel Art Icon System
 * 16x16 pixel icons rendered as SVGs for crisp scaling
 */

import { type ReactNode } from "react";

interface PixelIconProps {
  size?: number;
  color?: string;
  className?: string;
}

type IconComponent = (props: PixelIconProps) => ReactNode;

// Helper to create pixel grid paths
function createPixelPath(pixels: [number, number][]): string {
  return pixels.map(([x, y]) => `M${x},${y}h1v1h-1z`).join("");
}

// ============================================================================
// TOOL ICONS
// ============================================================================

export const IconSelect: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Mouse pointer / cursor */}
    <path d={createPixelPath([
      [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
      [4, 2], [4, 10], [4, 11],
      [5, 3], [5, 7], [5, 11], [5, 12],
      [6, 4], [6, 7], [6, 8], [6, 12], [6, 13],
      [7, 5], [7, 8], [7, 9], [7, 13],
      [8, 6], [8, 9], [8, 10],
      [9, 10], [9, 11],
      [10, 11], [10, 12],
      [11, 12],
    ])} />
  </svg>
);

export const IconPaint: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Paintbrush */}
    <path d={createPixelPath([
      // Brush tip
      [2, 12], [2, 13],
      [3, 11], [3, 12], [3, 13], [3, 14],
      [4, 10], [4, 11], [4, 12], [4, 13],
      [5, 9], [5, 10], [5, 11],
      // Handle
      [6, 8], [6, 9],
      [7, 7], [7, 8],
      [8, 6], [8, 7],
      [9, 5], [9, 6],
      [10, 4], [10, 5],
      [11, 3], [11, 4],
      // Ferrule
      [12, 2], [12, 3],
      [13, 1], [13, 2],
    ])} />
  </svg>
);

export const IconErase: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Eraser */}
    <path d={createPixelPath([
      // Eraser body
      [2, 10], [2, 11], [2, 12],
      [3, 9], [3, 10], [3, 11], [3, 12], [3, 13],
      [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [4, 13],
      [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12],
      [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11],
      [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10],
      [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9],
      [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
      [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7],
      [11, 2], [11, 3], [11, 4], [11, 5], [11, 6],
      [12, 2], [12, 3], [12, 4], [12, 5],
      [13, 3], [13, 4],
    ])} />
  </svg>
);

export const IconPath: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Path/Route with dots */}
    <path d={createPixelPath([
      // Start dot
      [1, 13], [1, 14], [2, 13], [2, 14],
      // Path line
      [3, 12], [4, 11], [5, 10], [6, 9],
      [7, 8], [8, 7], [9, 6],
      [10, 5], [10, 6],
      [11, 4], [11, 5],
      [12, 3], [12, 4],
      // End dot
      [13, 1], [13, 2], [14, 1], [14, 2],
    ])} />
  </svg>
);

export const IconWaypoint: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Map pin */}
    <path d={createPixelPath([
      // Pin head
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [6, 4], [9, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [6, 5], [9, 5], [10, 5], [11, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      // Pin point
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11],
      [7, 12],
      [7, 13],
    ])} />
  </svg>
);

export const IconFill: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Paint bucket */}
    <path d={createPixelPath([
      // Bucket
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
      [2, 7], [3, 7], [9, 7], [10, 7],
      [2, 8], [3, 8], [9, 8], [10, 8],
      [2, 9], [3, 9], [9, 9], [10, 9],
      [2, 10], [3, 10], [9, 10], [10, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11],
      // Pour
      [11, 8], [12, 9], [13, 10], [13, 11], [12, 12], [11, 12],
      // Handle
      [5, 4], [6, 3], [7, 3], [8, 4],
    ])} />
  </svg>
);

export const IconEyedropper: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Eyedropper/Pipette */}
    <path d={createPixelPath([
      // Tip
      [2, 13], [3, 12], [4, 11],
      // Body
      [5, 10], [5, 9],
      [6, 9], [6, 8],
      [7, 8], [7, 7],
      [8, 7], [8, 6],
      [9, 6], [9, 5],
      [10, 5], [10, 4],
      // Bulb
      [11, 3], [11, 4],
      [12, 2], [12, 3], [12, 4],
      [13, 1], [13, 2], [13, 3],
      [14, 2],
    ])} />
  </svg>
);

// ============================================================================
// TILE TYPE ICONS
// ============================================================================

export const IconTileGround: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Grass/Ground tile */}
    <path d={createPixelPath([
      // Grass blades
      [3, 6], [3, 7],
      [5, 5], [5, 6], [5, 7],
      [7, 4], [7, 5], [7, 6], [7, 7],
      [9, 5], [9, 6], [9, 7],
      [11, 6], [11, 7],
      [13, 5], [13, 6], [13, 7],
      // Ground
      [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
      [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9],
      [2, 10], [3, 10], [6, 10], [7, 10], [10, 10], [11, 10], [13, 10],
    ])} />
  </svg>
);

export const IconTilePath: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Dirt path */}
    <path d={createPixelPath([
      // Road surface
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      // Texture dots
      [5, 6], [9, 7], [6, 9], [11, 8],
    ])} />
  </svg>
);

export const IconTileWater: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Water waves */}
    <path d={createPixelPath([
      // Wave 1
      [1, 5], [2, 4], [3, 4], [4, 5], [5, 5], [6, 4], [7, 4], [8, 5], [9, 5], [10, 4], [11, 4], [12, 5], [13, 5], [14, 4],
      // Wave 2
      [1, 8], [2, 7], [3, 7], [4, 8], [5, 8], [6, 7], [7, 7], [8, 8], [9, 8], [10, 7], [11, 7], [12, 8], [13, 8], [14, 7],
      // Wave 3
      [1, 11], [2, 10], [3, 10], [4, 11], [5, 11], [6, 10], [7, 10], [8, 11], [9, 11], [10, 10], [11, 10], [12, 11], [13, 11], [14, 10],
    ])} />
  </svg>
);

export const IconTileBlocked: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* X mark / blocked */}
    <path d={createPixelPath([
      // X shape
      [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12],
      [12, 3], [11, 4], [10, 5], [9, 6], [8, 7], [7, 8], [6, 9], [5, 10], [4, 11], [3, 12],
      // Thicker lines
      [4, 3], [3, 4], [5, 4], [4, 5], [6, 5], [5, 6], [7, 6], [6, 7], [8, 7], [7, 8], [9, 8], [8, 9], [10, 9], [9, 10], [11, 10], [10, 11], [12, 11], [11, 12],
      [11, 3], [12, 4], [10, 4], [11, 5], [9, 5], [10, 6], [8, 6], [9, 7], [7, 7], [8, 8], [6, 8], [7, 9], [5, 9], [6, 10], [4, 10], [5, 11], [3, 11], [4, 12],
    ])} />
  </svg>
);

export const IconTileSpawn: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Spawn portal / circle with dot */}
    <path d={createPixelPath([
      // Outer ring
      [6, 2], [7, 2], [8, 2], [9, 2],
      [4, 3], [5, 3], [10, 3], [11, 3],
      [3, 4], [12, 4],
      [2, 5], [13, 5],
      [2, 6], [13, 6],
      [2, 7], [13, 7],
      [2, 8], [13, 8],
      [2, 9], [13, 9],
      [2, 10], [13, 10],
      [3, 11], [12, 11],
      [4, 12], [5, 12], [10, 12], [11, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
      // Center dot
      [7, 7], [8, 7], [7, 8], [8, 8],
    ])} />
  </svg>
);

export const IconTileExit: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Flag */}
    <path d={createPixelPath([
      // Pole
      [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13],
      // Flag
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
      // Base
      [2, 13], [4, 13],
    ])} />
  </svg>
);

// ============================================================================
// OBJECT ICONS
// ============================================================================

export const IconTreePine: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Pine tree */}
    <path d={createPixelPath([
      // Top
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      // Middle
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      // Bottom
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      // Trunk
      [7, 12], [8, 12],
      [7, 13], [8, 13],
      [7, 14], [8, 14],
    ])} />
  </svg>
);

export const IconTreeOak: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Oak/deciduous tree */}
    <path d={createPixelPath([
      // Canopy
      [6, 1], [7, 1], [8, 1], [9, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Trunk
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
      [6, 14], [7, 14], [8, 14], [9, 14],
    ])} />
  </svg>
);

export const IconRock: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Rock */}
    <path d={createPixelPath([
      [6, 4], [7, 4], [8, 4], [9, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ])} />
  </svg>
);

export const IconBush: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Bush */}
    <path d={createPixelPath([
      [6, 5], [7, 5], [8, 5], [9, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ])} />
  </svg>
);

export const IconGrass: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Grass blades */}
    <path d={createPixelPath([
      // Left blade
      [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12],
      [2, 5], [4, 7],
      // Middle blade
      [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12],
      [8, 4], [8, 5], [6, 6],
      // Right blade
      [11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [11, 12],
      [12, 4], [10, 6],
      // Base ground
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
    ])} />
  </svg>
);

export const IconFlower: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Flower with petals */}
    <path d={createPixelPath([
      // Top petal
      [7, 2], [8, 2], [7, 3], [8, 3],
      // Left petal
      [5, 4], [5, 5], [6, 4], [6, 5],
      // Right petal
      [9, 4], [9, 5], [10, 4], [10, 5],
      // Center
      [7, 4], [8, 4], [7, 5], [8, 5],
      // Bottom petals
      [5, 6], [6, 6], [9, 6], [10, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      // Stem
      [7, 8], [8, 8], [7, 9], [8, 9], [7, 10], [8, 10], [7, 11], [8, 11], [7, 12], [8, 12],
      // Leaves
      [5, 10], [6, 10], [9, 10], [10, 10],
      // Ground
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
    ])} />
  </svg>
);

export const IconTowerBase: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Tower base/platform */}
    <path d={createPixelPath([
      // Top platform rim
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [3, 6], [4, 6], [11, 6], [12, 6],
      // Inner platform
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      // Base
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10],
      // Ground shadow
      [1, 11], [2, 11], [3, 11], [12, 11], [13, 11], [14, 11],
    ])} />
  </svg>
);

// ============================================================================
// HEIGHT EDITING ICONS
// ============================================================================

export const IconHeightRaise: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Mountain/terrain with up arrow */}
    <path d={createPixelPath([
      // Up arrow
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [9, 3], [10, 3],
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      // Terrain layers
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12],
      [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13],
    ])} />
  </svg>
);

export const IconHeightLower: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Terrain with down arrow */}
    <path d={createPixelPath([
      // Down arrow
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [7, 3], [8, 3],
      [5, 4], [6, 4], [9, 4], [10, 4],
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6],
      // Terrain (lower)
      [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11],
      [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12],
      [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13],
    ])} />
  </svg>
);

// ============================================================================
// UI ICONS
// ============================================================================

export const IconRotateCW: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Rotate clockwise arrow */}
    <path d={createPixelPath([
      // Arrow head
      [12, 3], [13, 4], [14, 5],
      [11, 4], [12, 4],
      [10, 5], [11, 5], [12, 5],
      // Arc
      [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      [5, 3], [6, 3], [12, 3],
      [4, 4], [13, 4],
      [3, 5], [3, 6],
      [2, 7], [2, 8],
      [3, 9], [3, 10],
      [4, 11],
      [5, 12], [6, 12],
      [7, 13], [8, 13], [9, 13],
    ])} />
  </svg>
);

export const IconRotateCCW: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Rotate counter-clockwise arrow */}
    <path d={createPixelPath([
      // Arrow head
      [3, 3], [2, 4], [1, 5],
      [3, 4], [4, 4],
      [3, 5], [4, 5], [5, 5],
      // Arc
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2],
      [3, 3], [9, 3], [10, 3],
      [2, 4], [11, 4],
      [12, 5], [12, 6],
      [13, 7], [13, 8],
      [12, 9], [12, 10],
      [11, 11],
      [9, 12], [10, 12],
      [6, 13], [7, 13], [8, 13],
    ])} />
  </svg>
);

export const IconZoomIn: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Magnifying glass with + */}
    <path d={createPixelPath([
      // Glass circle
      [5, 1], [6, 1], [7, 1], [8, 1],
      [3, 2], [4, 2], [9, 2], [10, 2],
      [2, 3], [11, 3],
      [1, 4], [12, 4],
      [1, 5], [6, 5], [7, 5], [12, 5],
      [1, 6], [5, 6], [6, 6], [7, 6], [8, 6], [12, 6],
      [1, 7], [6, 7], [7, 7], [12, 7],
      [1, 8], [12, 8],
      [2, 9], [11, 9],
      [3, 10], [4, 10], [9, 10], [10, 10],
      [5, 11], [6, 11], [7, 11], [8, 11],
      // Handle
      [10, 11], [11, 12], [12, 13], [13, 14],
    ])} />
  </svg>
);

export const IconZoomOut: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Magnifying glass with - */}
    <path d={createPixelPath([
      // Glass circle
      [5, 1], [6, 1], [7, 1], [8, 1],
      [3, 2], [4, 2], [9, 2], [10, 2],
      [2, 3], [11, 3],
      [1, 4], [12, 4],
      [1, 5], [12, 5],
      [1, 6], [5, 6], [6, 6], [7, 6], [8, 6], [12, 6],
      [1, 7], [12, 7],
      [1, 8], [12, 8],
      [2, 9], [11, 9],
      [3, 10], [4, 10], [9, 10], [10, 10],
      [5, 11], [6, 11], [7, 11], [8, 11],
      // Handle
      [10, 11], [11, 12], [12, 13], [13, 14],
    ])} />
  </svg>
);

export const IconSave: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Floppy disk */}
    <path d={createPixelPath([
      // Outer frame
      [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],
      [2, 2], [5, 2], [10, 2], [13, 2],
      [2, 3], [5, 3], [10, 3], [13, 3],
      [2, 4], [5, 4], [10, 4], [13, 4],
      [2, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [13, 5],
      [2, 6], [13, 6],
      [2, 7], [13, 7],
      [2, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [13, 8],
      [2, 9], [5, 9], [10, 9], [13, 9],
      [2, 10], [5, 10], [10, 10], [13, 10],
      [2, 11], [5, 11], [10, 11], [13, 11],
      [2, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [13, 12],
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
    ])} />
  </svg>
);

export const IconPlay: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Play triangle */}
    <path d={createPixelPath([
      [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [4, 13],
      [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12],
      [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11],
      [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10],
      [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
      [9, 6], [9, 7], [9, 8], [9, 9],
      [10, 6], [10, 7], [10, 8], [10, 9],
      [11, 7], [11, 8],
      [12, 7], [12, 8],
    ])} />
  </svg>
);

export const IconUndo: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Undo arrow */}
    <path d={createPixelPath([
      // Arrow head
      [2, 5], [3, 4], [4, 3],
      [3, 5], [4, 5],
      [4, 6], [5, 6], [6, 6],
      // Curved part
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
      [10, 5], [11, 5],
      [12, 6], [12, 7],
      [12, 8], [12, 9],
      [11, 10], [11, 11],
      [10, 12],
      [8, 13], [9, 13],
      [5, 13], [6, 13], [7, 13],
    ])} />
  </svg>
);

export const IconRedo: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Redo arrow */}
    <path d={createPixelPath([
      // Arrow head
      [13, 5], [12, 4], [11, 3],
      [11, 5], [12, 5],
      [9, 6], [10, 6], [11, 6],
      // Curved part
      [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [4, 5], [5, 5],
      [3, 6], [3, 7],
      [3, 8], [3, 9],
      [4, 10], [4, 11],
      [5, 12],
      [6, 13], [7, 13],
      [8, 13], [9, 13], [10, 13],
    ])} />
  </svg>
);

export const IconBack: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Left arrow */}
    <path d={createPixelPath([
      [7, 2], [6, 3], [5, 4], [4, 5], [3, 6], [2, 7], [3, 8], [4, 9], [5, 10], [6, 11], [7, 12],
      [8, 3], [7, 4], [6, 5], [5, 6], [4, 7], [5, 8], [6, 9], [7, 10], [8, 11],
      // Line
      [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
    ])} />
  </svg>
);

export const IconFolder: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Folder */}
    <path d={createPixelPath([
      // Tab
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
      [2, 4], [7, 4],
      // Body
      [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5],
      [1, 6], [14, 6],
      [1, 7], [14, 7],
      [1, 8], [14, 8],
      [1, 9], [14, 9],
      [1, 10], [14, 10],
      [1, 11], [14, 11],
      [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12],
    ])} />
  </svg>
);

export const IconTrash: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Trash can */}
    <path d={createPixelPath([
      // Lid
      [5, 2], [6, 2], [9, 2], [10, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      // Body
      [4, 4], [11, 4],
      [4, 5], [6, 5], [8, 5], [10, 5], [11, 5],
      [4, 6], [6, 6], [8, 6], [10, 6], [11, 6],
      [4, 7], [6, 7], [8, 7], [10, 7], [11, 7],
      [4, 8], [6, 8], [8, 8], [10, 8], [11, 8],
      [4, 9], [6, 9], [8, 9], [10, 9], [11, 9],
      [4, 10], [6, 10], [8, 10], [10, 10], [11, 10],
      [4, 11], [6, 11], [8, 11], [10, 11], [11, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ])} />
  </svg>
);

export const IconPlus: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Plus sign */}
    <path d={createPixelPath([
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ])} />
  </svg>
);

export const IconClose: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* X close */}
    <path d={createPixelPath([
      [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12],
      [4, 3], [5, 4], [6, 5], [7, 6], [8, 7], [9, 8], [10, 9], [11, 10], [12, 11],
      [12, 3], [11, 4], [10, 5], [9, 6], [8, 7], [7, 8], [6, 9], [5, 10], [4, 11], [3, 12],
      [11, 3], [10, 4], [9, 5], [8, 6], [7, 7], [6, 8], [5, 9], [4, 10], [3, 11],
    ])} />
  </svg>
);

export const IconDice: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Dice / Random */}
    <path d={createPixelPath([
      // Outer frame
      [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
      [2, 3], [13, 3],
      [2, 4], [13, 4],
      [2, 5], [13, 5],
      [2, 6], [13, 6],
      [2, 7], [13, 7],
      [2, 8], [13, 8],
      [2, 9], [13, 9],
      [2, 10], [13, 10],
      [2, 11], [13, 11],
      [2, 12], [13, 12],
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
      // Dots (1-6 dice pattern showing 5)
      [4, 4], [5, 4], [4, 5], [5, 5],       // Top-left dot
      [10, 4], [11, 4], [10, 5], [11, 5],   // Top-right dot
      [7, 7], [8, 7], [7, 8], [8, 8],       // Center dot
      [4, 10], [5, 10], [4, 11], [5, 11],   // Bottom-left dot
      [10, 10], [11, 10], [10, 11], [11, 11], // Bottom-right dot
    ])} />
  </svg>
);

// ============================================================================
// STRUCTURE ICONS (Multi-Tile Buildings)
// ============================================================================

export const IconLargeHouse: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Roof
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      // Walls
      [5, 5], [6, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Door
      [7, 7], [8, 7], [7, 8], [8, 8],
    ])} />
  </svg>
);

export const IconFarmhouse: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Main building
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 6], [11, 6],
      [4, 7], [11, 7],
      [4, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      // Roof
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      // Door
      [7, 7], [8, 7], [7, 8], [8, 8],
    ])} />
  </svg>
);

export const IconBarn: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Barn doors symbol
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      // Main structure
      [4, 5], [5, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      // Center line (barn doors)
      [7, 6], [8, 6], [7, 7], [8, 7], [7, 8], [8, 8],
    ])} />
  </svg>
);

export const IconWindmillStructure: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Tower
      [7, 6], [8, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Roof
      [7, 5], [8, 5],
      // Blades (cross pattern)
      [7, 2], [8, 2], [7, 3], [8, 3], [7, 4], [8, 4], // Top
      [4, 7], [5, 7], [10, 7], [11, 7], // Sides
    ])} />
  </svg>
);

export const IconMarket: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Awning
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [12, 6],
      // Posts
      [4, 7], [4, 8], [4, 9],
      [11, 7], [11, 8], [11, 9],
      // Counter
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
    ])} />
  </svg>
);

export const IconInn: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Building
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 6], [11, 6],
      [4, 7], [11, 7],
      [4, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      // Roof
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [7, 3], [8, 3],
      // Hanging sign
      [12, 6], [13, 6], [12, 7], [13, 7],
    ])} />
  </svg>
);

export const IconBlacksmith: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Building
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [10, 7],
      [5, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Roof
      [6, 5], [7, 5], [8, 5], [9, 5],
      // Chimney
      [8, 3], [9, 3], [8, 4], [9, 4],
      // Anvil (front)
      [6, 10], [7, 10], [8, 10],
    ])} />
  </svg>
);

export const IconChurch: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Cross on top
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [7, 3], [8, 3],
      // Steeple
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      // Main building
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [10, 7],
      [5, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ])} />
  </svg>
);

export const IconBridge: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Bridge deck
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      // Arch
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [7, 6], [8, 6],
      // Rails
      [3, 7], [12, 7],
      // Support posts
      [5, 9], [5, 10],
      [10, 9], [10, 10],
    ])} />
  </svg>
);

export const IconPier: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Deck planks
      [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
      [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10],
      [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
      [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10],
      // Posts
      [6, 11], [6, 12],
      [9, 11], [9, 12],
    ])} />
  </svg>
);

export const IconWall: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Stone blocks
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
      [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [5, 7], [7, 7], [9, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [5, 9], [7, 9], [9, 9], [11, 9], [12, 9],
    ])} />
  </svg>
);

export const IconGate: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    <path d={createPixelPath([
      // Posts
      [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9],
      [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9],
      // Gate doors (vertical planks)
      [6, 5], [6, 6], [6, 7], [6, 8],
      [7, 5], [7, 6], [7, 7], [7, 8],
      [8, 5], [8, 6], [8, 7], [8, 8],
      [9, 5], [9, 6], [9, 7], [9, 8],
      // Crossbeam
      [6, 6], [7, 6], [8, 6], [9, 6],
    ])} />
  </svg>
);

// ============================================================================
// WEATHER ICONS
// ============================================================================

export const IconSun: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Sun with rays */}
    <path d={createPixelPath([
      // Center circle
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      // Rays
      [7, 1], [8, 1], [7, 2], [8, 2], // Top
      [7, 13], [8, 13], [7, 14], [8, 14], // Bottom
      [1, 7], [2, 7], [1, 8], [2, 8], // Left
      [13, 7], [14, 7], [13, 8], [14, 8], // Right
      // Diagonal rays
      [3, 3], [4, 4], // Top-left
      [11, 3], [12, 4], // Top-right
      [3, 12], [4, 11], // Bottom-left
      [11, 12], [12, 11], // Bottom-right
    ])} />
  </svg>
);

export const IconCloudRain: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Cloud with rain */}
    <path d={createPixelPath([
      // Cloud
      [5, 3], [6, 3], [7, 3], [8, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [2, 5], [3, 5], [10, 5], [11, 5], [12, 5],
      [2, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      // Rain drops
      [4, 9], [4, 10],
      [7, 10], [7, 11],
      [10, 9], [10, 10],
      [5, 12], [5, 13],
      [9, 12], [9, 13],
    ])} />
  </svg>
);

export const IconCloudRainHeavy: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Cloud with heavy rain */}
    <path d={createPixelPath([
      // Cloud
      [5, 2], [6, 2], [7, 2], [8, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [2, 4], [3, 4], [10, 4], [11, 4], [12, 4],
      [2, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      // Heavy rain drops
      [3, 8], [3, 9], [3, 10],
      [5, 9], [5, 10], [5, 11],
      [7, 8], [7, 9], [7, 10],
      [9, 9], [9, 10], [9, 11],
      [11, 8], [11, 9], [11, 10],
      [4, 12], [4, 13],
      [8, 12], [8, 13],
      [12, 12], [12, 13],
    ])} />
  </svg>
);

export const IconCloudLightning: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Cloud with lightning */}
    <path d={createPixelPath([
      // Cloud
      [5, 2], [6, 2], [7, 2], [8, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [2, 4], [3, 4], [10, 4], [11, 4], [12, 4],
      [2, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      // Lightning bolt
      [8, 7], [9, 7],
      [7, 8], [8, 8],
      [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [7, 10], [8, 10],
      [6, 11], [7, 11],
      [5, 12], [6, 12],
      [6, 13],
    ])} />
  </svg>
);

export const IconSnowflake: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Snowflake */}
    <path d={createPixelPath([
      // Vertical line
      [7, 1], [8, 1], [7, 2], [8, 2], [7, 3], [8, 3],
      [7, 4], [8, 4], [7, 5], [8, 5], [7, 6], [8, 6],
      [7, 9], [8, 9], [7, 10], [8, 10], [7, 11], [8, 11],
      [7, 12], [8, 12], [7, 13], [8, 13], [7, 14], [8, 14],
      // Horizontal line
      [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
      [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8],
      [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
      [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
      // Center
      [7, 7], [8, 7], [7, 8], [8, 8],
      // Diagonal branches
      [4, 4], [5, 5], [10, 5], [11, 4],
      [4, 11], [5, 10], [10, 10], [11, 11],
    ])} />
  </svg>
);

// ============================================================================
// ELEMENT ICONS
// ============================================================================

export const IconFire: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Fire flame */}
    <path d={createPixelPath([
      // Main flame
      [7, 1], [8, 1],
      [7, 2], [8, 2], [9, 2],
      [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ])} />
  </svg>
);

export const IconWater: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Water droplet */}
    <path d={createPixelPath([
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [7, 13], [8, 13],
    ])} />
  </svg>
);

export const IconMountain: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Mountain peak */}
    <path d={createPixelPath([
      // Peak
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
      // Base
      [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9],
      [1, 10], [2, 10], [3, 10], [4, 10], [11, 10], [12, 10], [13, 10], [14, 10],
    ])} />
  </svg>
);

export const IconWind: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Wind swirls */}
    <path d={createPixelPath([
      // Top wind line
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [11, 4], [12, 4],
      [12, 5], [11, 6],
      // Middle wind line
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      // Bottom wind line
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10],
      [10, 11], [11, 11],
      [11, 12], [10, 13],
    ])} />
  </svg>
);

export const IconLightningBolt: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Lightning bolt */}
    <path d={createPixelPath([
      [8, 1], [9, 1], [10, 1],
      [7, 2], [8, 2], [9, 2],
      [6, 3], [7, 3], [8, 3],
      [5, 4], [6, 4], [7, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [7, 8], [8, 8], [9, 8],
      [7, 9], [8, 9], [9, 9], [10, 9],
      [8, 10], [9, 10], [10, 10],
      [9, 11], [10, 11],
      [10, 12], [11, 12],
      [11, 13],
    ])} />
  </svg>
);

export const IconVolcano: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Volcano with eruption */}
    <path d={createPixelPath([
      // Eruption
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [7, 3], [8, 3],
      // Crater
      [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 5], [10, 5],
      // Mountain body
      [4, 6], [11, 6],
      [3, 7], [12, 7],
      [2, 8], [13, 8],
      [1, 9], [14, 9],
      [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10],
    ])} />
  </svg>
);

export const IconCrystal: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Crystal gem */}
    <path d={createPixelPath([
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ])} />
  </svg>
);

export const IconStormCloud: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Storm cloud */}
    <path d={createPixelPath([
      // Cloud
      [5, 3], [6, 3], [7, 3], [8, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [2, 5], [3, 5], [10, 5], [11, 5], [12, 5],
      [2, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      // Lightning bolt
      [7, 9], [8, 9],
      [6, 10], [7, 10],
      [7, 11], [8, 11],
      [8, 12], [9, 12],
    ])} />
  </svg>
);

export const IconHurricane: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Hurricane spiral */}
    <path d={createPixelPath([
      // Outer spiral
      [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [11, 3], [12, 3],
      [3, 4], [13, 4],
      [2, 5], [2, 6], [13, 5],
      [2, 7], [12, 6],
      // Inner spiral
      [3, 8], [11, 7],
      [4, 9], [10, 8],
      [5, 10], [6, 10], [9, 9], [10, 9],
      [7, 11], [8, 11], [9, 10],
      // Center eye
      [7, 7], [8, 7], [7, 8], [8, 8],
      // Continuation
      [5, 12], [6, 12], [7, 12],
      [3, 13], [4, 13],
    ])} />
  </svg>
);

// ============================================================================
// DIFFICULTY & MODE ICONS
// ============================================================================

export const IconStar: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Star */}
    <path d={createPixelPath([
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [9, 9], [10, 9], [11, 9],
      [3, 10], [4, 10], [5, 10], [10, 10], [11, 10], [12, 10],
      [2, 11], [3, 11], [4, 11], [11, 11], [12, 11], [13, 11],
      [1, 12], [2, 12], [3, 12], [12, 12], [13, 12], [14, 12],
    ])} />
  </svg>
);

export const IconCrown: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Crown */}
    <path d={createPixelPath([
      // Points
      [2, 3], [3, 3],
      [7, 2], [8, 2],
      [12, 3], [13, 3],
      // Body
      [2, 4], [3, 4], [7, 3], [8, 3], [12, 4], [13, 4],
      [2, 5], [3, 5], [6, 4], [7, 4], [8, 4], [9, 4], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 5], [6, 5], [9, 5], [10, 5], [11, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 7], [8, 7], [9, 7], [10, 8], [11, 8], [12, 8], [13, 8],
      // Base band
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
    ])} />
  </svg>
);

export const IconInfinity: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Infinity symbol */}
    <path d={createPixelPath([
      // Left loop
      [2, 6], [3, 6], [4, 6],
      [1, 7], [5, 7],
      [1, 8], [5, 8],
      [2, 9], [3, 9], [4, 9],
      // Right loop
      [11, 6], [12, 6], [13, 6],
      [10, 7], [14, 7],
      [10, 8], [14, 8],
      [11, 9], [12, 9], [13, 9],
      // Center cross
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
    ])} />
  </svg>
);

export const IconBook: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Open book */}
    <path d={createPixelPath([
      // Left page
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
      [2, 4], [7, 4],
      [2, 5], [4, 5], [5, 5], [6, 5], [7, 5],
      [2, 6], [7, 6],
      [2, 7], [4, 7], [5, 7], [6, 7], [7, 7],
      [2, 8], [7, 8],
      [2, 9], [4, 9], [5, 9], [6, 9], [7, 9],
      [2, 10], [7, 10],
      [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11],
      // Right page
      [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3],
      [8, 4], [13, 4],
      [8, 5], [9, 5], [10, 5], [11, 5], [13, 5],
      [8, 6], [13, 6],
      [8, 7], [9, 7], [10, 7], [11, 7], [13, 7],
      [8, 8], [13, 8],
      [8, 9], [9, 9], [10, 9], [11, 9], [13, 9],
      [8, 10], [13, 10],
      [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      // Spine
      [7, 12], [8, 12],
    ])} />
  </svg>
);

export const IconBee: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Bee */}
    <path d={createPixelPath([
      // Wings
      [3, 4], [4, 4], [5, 4],
      [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5],
      [10, 5], [11, 5], [12, 5],
      // Body
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [9, 7], [10, 7], // Stripes
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [9, 9], [10, 9], // Stripes
      [6, 10], [7, 10], [8, 10], [9, 10],
      // Stinger
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      // Antennae
      [6, 3], [9, 3],
      [5, 2], [10, 2],
    ])} />
  </svg>
);

export const IconGem: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Gem/Diamond */}
    <path d={createPixelPath([
      // Top facet
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      // Middle
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      // Bottom facets
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ])} />
  </svg>
);

export const IconSkull: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Skull */}
    <path d={createPixelPath([
      // Top of skull
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      // Eyes
      [3, 5], [4, 5], [7, 5], [8, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [7, 6], [8, 6], [11, 6], [12, 6],
      // Cheeks
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Nose
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      // Jaw
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Teeth
      [5, 10], [6, 10], [9, 10], [10, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
    ])} />
  </svg>
);

export const IconTarget: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Target/Crosshair */}
    <path d={createPixelPath([
      // Outer ring
      [6, 2], [7, 2], [8, 2], [9, 2],
      [4, 3], [5, 3], [10, 3], [11, 3],
      [3, 4], [12, 4],
      [2, 5], [13, 5],
      [2, 6], [13, 6],
      [2, 7], [13, 7],
      [2, 8], [13, 8],
      [2, 9], [13, 9],
      [2, 10], [13, 10],
      [3, 11], [12, 11],
      [4, 12], [5, 12], [10, 12], [11, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
      // Inner dot
      [7, 7], [8, 7], [7, 8], [8, 8],
      // Crosshairs
      [7, 4], [8, 4], [7, 5], [8, 5],
      [7, 10], [8, 10], [7, 11], [8, 11],
      [4, 7], [5, 7], [4, 8], [5, 8],
      [10, 7], [11, 7], [10, 8], [11, 8],
    ])} />
  </svg>
);

export const IconShield: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Shield */}
    <path d={createPixelPath([
      [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [7, 12], [8, 12],
    ])} />
  </svg>
);

export const IconAnchor: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Anchor */}
    <path d={createPixelPath([
      // Ring at top
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [10, 2],
      [5, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      // Shaft
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      // Cross bar
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Continue shaft
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      // Bottom hooks
      [3, 10], [4, 10],
      [3, 11], [4, 11],
      [4, 12], [5, 12], [6, 12],
      [11, 10], [12, 10],
      [11, 11], [12, 11],
      [9, 12], [10, 12], [11, 12],
    ])} />
  </svg>
);

export const IconSnail: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Snail */}
    <path d={createPixelPath([
      // Shell
      [8, 3], [9, 3], [10, 3],
      [7, 4], [11, 4],
      [6, 5], [8, 5], [9, 5], [12, 5],
      [6, 6], [8, 6], [12, 6],
      [6, 7], [8, 7], [9, 7], [12, 7],
      [7, 8], [11, 8],
      [8, 9], [9, 9], [10, 9],
      // Body
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10],
      // Eye stalks
      [3, 7], [3, 8],
      [5, 7], [5, 8],
    ])} />
  </svg>
);

export const IconExplosion: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Explosion */}
    <path d={createPixelPath([
      // Center
      [7, 6], [8, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [7, 9], [8, 9],
      // Rays
      [7, 2], [8, 2], [7, 3], [8, 3], [7, 4], [8, 4], // Top
      [7, 11], [8, 11], [7, 12], [8, 12], [7, 13], [8, 13], // Bottom
      [2, 7], [3, 7], [4, 7], [2, 8], [3, 8], [4, 8], // Left
      [11, 7], [12, 7], [13, 7], [11, 8], [12, 8], [13, 8], // Right
      // Diagonal rays
      [3, 3], [4, 4], [5, 5],
      [10, 5], [11, 4], [12, 3],
      [3, 12], [4, 11], [5, 10],
      [10, 10], [11, 11], [12, 12],
    ])} />
  </svg>
);

export const IconVirus: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Virus */}
    <path d={createPixelPath([
      // Core
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      // Spikes
      [7, 2], [8, 2], [7, 3], [8, 3],
      [7, 12], [8, 12], [7, 13], [8, 13],
      [2, 7], [3, 7], [2, 8], [3, 8],
      [12, 7], [13, 7], [12, 8], [13, 8],
      // Diagonal spikes
      [3, 4], [4, 5],
      [11, 5], [12, 4],
      [3, 11], [4, 10],
      [11, 10], [12, 11],
    ])} />
  </svg>
);

export const IconBone: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Bone */}
    <path d={createPixelPath([
      // Left end
      [2, 4], [3, 4],
      [1, 5], [2, 5], [3, 5], [4, 5],
      [2, 6], [3, 6], [4, 6], [5, 6],
      // Shaft
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      // Right end
      [10, 9], [11, 9], [12, 9], [13, 9],
      [11, 10], [12, 10], [13, 10], [14, 10],
      [12, 11], [13, 11],
      // Additional knobs
      [2, 7], [3, 7],
      [1, 8], [2, 8], [3, 8], [4, 8],
      [2, 9], [3, 9],
      [12, 4], [13, 4],
      [11, 5], [12, 5], [13, 5], [14, 5],
      [12, 6], [13, 6],
    ])} />
  </svg>
);

export const IconMute: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Mute/Speaker off */}
    <path d={createPixelPath([
      // Speaker
      [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
      [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
      [5, 4], [5, 5], [5, 10], [5, 11],
      [6, 3], [6, 4], [6, 11], [6, 12],
      [7, 2], [7, 3], [7, 12], [7, 13],
      // X mark
      [10, 5], [11, 6], [12, 7], [13, 8],
      [10, 10], [11, 9], [12, 8], [13, 7],
      [11, 5], [12, 6],
      [11, 10], [12, 9],
    ])} />
  </svg>
);

export const IconSword: IconComponent = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
    style={{ imageRendering: "pixelated" }}
  >
    {/* Sword */}
    <path d={createPixelPath([
      // Blade tip
      [12, 1], [13, 1],
      [11, 2], [12, 2], [13, 2],
      [10, 3], [11, 3], [12, 3],
      [9, 4], [10, 4], [11, 4],
      [8, 5], [9, 5], [10, 5],
      [7, 6], [8, 6], [9, 6],
      // Guard
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
      // Handle
      [4, 9], [5, 9],
      [3, 10], [4, 10],
      [2, 11], [3, 11],
      // Pommel
      [1, 12], [2, 12],
      [1, 13], [2, 13],
    ])} />
  </svg>
);

// ============================================================================
// ICON MAP FOR DYNAMIC ACCESS
// ============================================================================

export const PixelIcons = {
  // Tools
  select: IconSelect,
  paint: IconPaint,
  erase: IconErase,
  path: IconPath,
  waypoint: IconWaypoint,
  fill: IconFill,
  eyedropper: IconEyedropper,
  height_raise: IconHeightRaise,
  height_lower: IconHeightLower,

  // Tiles
  tileGround: IconTileGround,
  tilePath: IconTilePath,
  tileWater: IconTileWater,
  tileBlocked: IconTileBlocked,
  tileSpawn: IconTileSpawn,
  tileExit: IconTileExit,

  // Objects
  treePine: IconTreePine,
  treeOak: IconTreeOak,
  rock: IconRock,
  bush: IconBush,
  grass: IconGrass,
  flower: IconFlower,
  towerBase: IconTowerBase,

  // Structures (Multi-Tile)
  largeHouse: IconLargeHouse,
  farmhouse: IconFarmhouse,
  barn: IconBarn,
  windmillStructure: IconWindmillStructure,
  market: IconMarket,
  inn: IconInn,
  blacksmith: IconBlacksmith,
  church: IconChurch,
  bridge: IconBridge,
  pier: IconPier,
  wall: IconWall,
  gate: IconGate,

  // UI
  rotateCW: IconRotateCW,
  rotateCCW: IconRotateCCW,
  zoomIn: IconZoomIn,
  zoomOut: IconZoomOut,
  save: IconSave,
  play: IconPlay,
  undo: IconUndo,
  redo: IconRedo,
  back: IconBack,
  folder: IconFolder,
  trash: IconTrash,
  plus: IconPlus,
  close: IconClose,
  dice: IconDice,

  // Weather
  sun: IconSun,
  "cloud-rain": IconCloudRain,
  "cloud-rain-heavy": IconCloudRainHeavy,
  "cloud-lightning": IconCloudLightning,
  snowflake: IconSnowflake,

  // Elements
  fire: IconFire,
  water: IconWater,
  mountain: IconMountain,
  wind: IconWind,
  "lightning-bolt": IconLightningBolt,
  volcano: IconVolcano,
  crystal: IconCrystal,
  "storm-cloud": IconStormCloud,
  hurricane: IconHurricane,

  // Difficulty & Mode
  star: IconStar,
  crown: IconCrown,
  infinity: IconInfinity,
  book: IconBook,
  bee: IconBee,
  gem: IconGem,

  // Status Effects
  skull: IconSkull,
  target: IconTarget,
  shield: IconShield,
  anchor: IconAnchor,
  snail: IconSnail,
  explosion: IconExplosion,
  virus: IconVirus,
  bone: IconBone,
  mute: IconMute,
  sword: IconSword,
  wave: IconWind, // Use wind icon as wave substitute
  plane: IconWind, // Use wind icon as flying substitute
} as const;

export type PixelIconName = keyof typeof PixelIcons;

// Generic PixelIcon component for dynamic icon rendering
interface DynamicIconProps {
  icon: PixelIconName | string;
  size?: number;
  color?: string;
  className?: string;
}

export function PixelIcon({ icon, size = 16, color, className }: DynamicIconProps) {
  const IconComponent = PixelIcons[icon as PixelIconName];

  if (!IconComponent) {
    // Fallback to a simple square if icon not found
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color || "currentColor"}
        className={className}
      >
        <rect x="6" y="6" width="12" height="12" strokeWidth="2" />
      </svg>
    );
  }

  return <IconComponent size={size} color={color} className={className} />;
}

// Alias for compatibility
export { IconClose as IconX };
