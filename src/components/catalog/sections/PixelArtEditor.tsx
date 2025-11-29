/**
 * Pixel Art Editor
 * Interactive editor for creating and editing pixel art sprites
 * Outputs sprite data compatible with the game's pixel art system
 */

import { useState, useCallback, useMemo } from "react";
import { PALETTES, type PaletteKey } from "@/utils/pixelArt";

// Grid sizes
const GRID_SIZES = [8, 16, 24, 32] as const;
type GridSize = (typeof GRID_SIZES)[number];

// Calculate pixel size based on grid size (to fit in editor area)
function getPixelSize(gridSize: GridSize): number {
  const maxEditorSize = 512;
  return Math.floor(maxEditorSize / gridSize);
}

interface PixelArtEditorProps {
  initialSprite?: string[][];
  initialPalette?: PaletteKey;
}

export function PixelArtEditor({
  initialSprite,
  initialPalette = "nature",
}: PixelArtEditorProps) {
  // Editor state
  const [gridSize, setGridSize] = useState<GridSize>(16);
  const [palette, setPalette] = useState<PaletteKey>(initialPalette);
  const [selectedColor, setSelectedColor] = useState<string>("grass");
  const [isErasing, setIsErasing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [copied, setCopied] = useState(false);

  // Sprite data - 2D array of color keys or "_" for transparent
  const [pixels, setPixels] = useState<string[][]>(() => {
    if (initialSprite) return initialSprite;
    return Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill("_"));
  });

  // Get palette colors
  const paletteColors = useMemo(() => PALETTES[palette], [palette]);
  const colorKeys = useMemo(
    () => Object.keys(paletteColors).filter((k) => k !== "transparent"),
    [paletteColors]
  );

  // Pixel size for rendering
  const pixelSize = getPixelSize(gridSize);

  // Handle grid size change
  const handleGridSizeChange = useCallback((newSize: GridSize) => {
    setGridSize(newSize);
    setPixels(
      Array(newSize)
        .fill(null)
        .map(() => Array(newSize).fill("_"))
    );
  }, []);

  // Handle pixel paint
  const paintPixel = useCallback(
    (x: number, y: number) => {
      setPixels((prev) => {
        const newPixels = prev.map((row) => [...row]);
        if (newPixels[y]) {
          newPixels[y][x] = isErasing ? "_" : selectedColor;
        }
        return newPixels;
      });
    },
    [selectedColor, isErasing]
  );

  // Mouse handlers
  const handleMouseDown = useCallback(
    (x: number, y: number) => {
      setIsDrawing(true);
      paintPixel(x, y);
    },
    [paintPixel]
  );

  const handleMouseMove = useCallback(
    (x: number, y: number) => {
      if (isDrawing) {
        paintPixel(x, y);
      }
    },
    [isDrawing, paintPixel]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    setPixels(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill("_"))
    );
  }, [gridSize]);

  // Fill canvas with selected color
  const fillCanvas = useCallback(() => {
    setPixels(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(selectedColor))
    );
  }, [gridSize, selectedColor]);

  // Export as code
  const exportAsCode = useCallback(() => {
    // Generate TypeScript-compatible sprite data
    const lines = pixels.map((row) => {
      const cells = row.map((cell) => {
        if (cell === "_") return "_";
        // Use shorthand if possible
        return cell;
      });
      return `  [${cells.map((c) => `"${c}"`).join(", ")}],`;
    });

    const code = `const SPRITE: SpriteData<"${palette}"> = [\n${lines.join("\n")}\n];`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [pixels, palette]);

  // Get hex color from palette key
  const getHexColor = useCallback(
    (colorKey: string): string => {
      if (colorKey === "_") return "transparent";
      const color = paletteColors[colorKey as keyof typeof paletteColors];
      return typeof color === "string" ? color : "#ff00ff"; // Fallback magenta
    },
    [paletteColors]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-xl text-accent-gold">Pixel Art Editor</h2>
        <p className="text-sm text-foreground-muted">
          Create sprites for objects and tiles
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left sidebar - Tools */}
        <div className="flex flex-col gap-4 w-48">
          {/* Grid size */}
          <div className="bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">
              Grid Size
            </label>
            <div className="flex gap-1">
              {GRID_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => handleGridSizeChange(size)}
                  className={`flex-1 px-2 py-1 text-xs rounded ${
                    gridSize === size
                      ? "bg-primary text-foreground"
                      : "bg-background-tertiary text-foreground-muted hover:bg-background"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Palette selection */}
          <div className="bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">
              Palette
            </label>
            <select
              value={palette}
              onChange={(e) => setPalette(e.target.value as PaletteKey)}
              className="w-full bg-background-tertiary text-foreground text-sm p-2 rounded"
            >
              {Object.keys(PALETTES).map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Tools */}
          <div className="bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">
              Tools
            </label>
            <div className="flex gap-1">
              <button
                onClick={() => setIsErasing(false)}
                className={`flex-1 px-3 py-2 text-xs rounded ${
                  !isErasing
                    ? "bg-primary text-foreground"
                    : "bg-background-tertiary text-foreground-muted hover:bg-background"
                }`}
              >
                Draw
              </button>
              <button
                onClick={() => setIsErasing(true)}
                className={`flex-1 px-3 py-2 text-xs rounded ${
                  isErasing
                    ? "bg-primary text-foreground"
                    : "bg-background-tertiary text-foreground-muted hover:bg-background"
                }`}
              >
                Erase
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">
              Actions
            </label>
            <div className="flex flex-col gap-1">
              <button
                onClick={clearCanvas}
                className="w-full px-3 py-2 text-xs rounded bg-background-tertiary text-foreground-muted hover:bg-background hover:text-foreground"
              >
                Clear
              </button>
              <button
                onClick={fillCanvas}
                className="w-full px-3 py-2 text-xs rounded bg-background-tertiary text-foreground-muted hover:bg-background hover:text-foreground"
              >
                Fill with Color
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="w-full px-3 py-2 text-xs rounded bg-background-tertiary text-foreground-muted hover:bg-background hover:text-foreground"
              >
                {showGrid ? "Hide Grid" : "Show Grid"}
              </button>
            </div>
          </div>

          {/* Export */}
          <button
            onClick={exportAsCode}
            className="w-full px-3 py-3 text-sm rounded bg-accent-gold text-background font-bold hover:bg-accent-gold/80"
          >
            {copied ? "Copied!" : "Copy as Code"}
          </button>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <div
            className="relative bg-[#1a1a1a] rounded-lg overflow-hidden"
            style={{
              width: gridSize * pixelSize,
              height: gridSize * pixelSize,
            }}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            {/* Checkerboard background for transparency */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #2a2a2a 25%, transparent 25%),
                  linear-gradient(-45deg, #2a2a2a 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #2a2a2a 75%),
                  linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)
                `,
                backgroundSize: `${pixelSize}px ${pixelSize}px`,
                backgroundPosition: `0 0, 0 ${pixelSize / 2}px, ${pixelSize / 2}px -${pixelSize / 2}px, -${pixelSize / 2}px 0px`,
              }}
            />

            {/* Pixels */}
            {pixels.map((row, y) =>
              row.map((colorKey, x) => (
                <div
                  key={`${x}-${y}`}
                  className="absolute cursor-crosshair"
                  style={{
                    left: x * pixelSize,
                    top: y * pixelSize,
                    width: pixelSize,
                    height: pixelSize,
                    backgroundColor:
                      colorKey === "_" ? "transparent" : getHexColor(colorKey),
                    border: showGrid ? "1px solid rgba(255,255,255,0.1)" : "none",
                    boxSizing: "border-box",
                  }}
                  onMouseDown={() => handleMouseDown(x, y)}
                  onMouseMove={() => handleMouseMove(x, y)}
                />
              ))
            )}
          </div>

          {/* Preview */}
          <div className="flex gap-4 items-center">
            <span className="text-xs text-foreground-muted">Preview:</span>
            {[1, 2, 4].map((scale) => (
              <div
                key={scale}
                className="bg-[#1a1a1a] rounded p-1"
                title={`${scale}x`}
              >
                <canvas
                  ref={(canvas) => {
                    if (!canvas) return;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;

                    canvas.width = gridSize * scale;
                    canvas.height = gridSize * scale;
                    ctx.imageSmoothingEnabled = false;

                    // Draw pixels
                    pixels.forEach((row, y) => {
                      row.forEach((colorKey, x) => {
                        if (colorKey === "_") return;
                        ctx.fillStyle = getHexColor(colorKey);
                        ctx.fillRect(x * scale, y * scale, scale, scale);
                      });
                    });
                  }}
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar - Color palette */}
        <div className="w-48">
          <div className="bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">
              Colors
            </label>
            <div className="grid grid-cols-4 gap-1">
              {/* Transparent */}
              <button
                onClick={() => {
                  setSelectedColor("_");
                  setIsErasing(true);
                }}
                className={`aspect-square rounded relative overflow-hidden ${
                  selectedColor === "_" && isErasing
                    ? "ring-2 ring-white"
                    : "hover:ring-1 hover:ring-white/50"
                }`}
                title="Transparent (Erase)"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, #444 25%, transparent 25%),
                    linear-gradient(-45deg, #444 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #444 75%),
                    linear-gradient(-45deg, transparent 75%, #444 75%)
                  `,
                  backgroundSize: "8px 8px",
                  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                  backgroundColor: "#222",
                }}
              />

              {/* Palette colors */}
              {colorKeys.map((colorKey) => (
                <button
                  key={colorKey}
                  onClick={() => {
                    setSelectedColor(colorKey);
                    setIsErasing(false);
                  }}
                  className={`aspect-square rounded ${
                    selectedColor === colorKey && !isErasing
                      ? "ring-2 ring-white"
                      : "hover:ring-1 hover:ring-white/50"
                  }`}
                  style={{ backgroundColor: getHexColor(colorKey) }}
                  title={colorKey}
                />
              ))}
            </div>

            {/* Selected color info */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded"
                  style={{
                    backgroundColor: isErasing
                      ? "transparent"
                      : getHexColor(selectedColor),
                    backgroundImage: isErasing
                      ? `linear-gradient(45deg, #444 25%, transparent 25%),
                         linear-gradient(-45deg, #444 25%, transparent 25%),
                         linear-gradient(45deg, transparent 75%, #444 75%),
                         linear-gradient(-45deg, transparent 75%, #444 75%)`
                      : "none",
                    backgroundSize: "8px 8px",
                  }}
                />
                <div>
                  <div className="text-xs text-foreground">
                    {isErasing ? "Eraser" : selectedColor}
                  </div>
                  <div className="text-xs text-foreground-muted">
                    {isErasing ? "transparent" : getHexColor(selectedColor)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard shortcuts */}
          <div className="mt-4 bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">
              Tips
            </label>
            <ul className="text-xs text-foreground-muted space-y-1">
              <li>Click & drag to draw</li>
              <li>Use Erase tool for transparent</li>
              <li>Copy code to use in game</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
