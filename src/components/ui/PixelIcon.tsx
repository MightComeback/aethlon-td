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
} as const;

export type PixelIconName = keyof typeof PixelIcons;
