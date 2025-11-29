/**
 * Pixel Art Editor
 * Interactive editor for creating and editing pixel art sprites
 * Outputs sprite data compatible with the game's pixel art system
 */

import { useState, useCallback, useMemo } from "react";

// Grid sizes - support up to 256x256
const GRID_SIZES = [16, 32, 64, 128, 256] as const;
type GridSize = (typeof GRID_SIZES)[number];

// Calculate pixel size based on grid size (to fit in editor area)
function getPixelSize(gridSize: GridSize): number {
  const maxEditorSize = 512;
  return Math.max(1, Math.floor(maxEditorSize / gridSize));
}

// Comprehensive color palette organized by category
const COLOR_CATEGORIES: Record<string, Record<string, string>> = {
  // Greens - for grass, foliage, nature
  Greens: {
    greenDarkest: "#0d2818",
    greenDarker: "#1a3d16",
    greenDark: "#2d5a1e",
    green: "#4a8c2a",
    greenMid: "#5fa035",
    greenLight: "#7cb844",
    greenLighter: "#9fd05a",
    greenLightest: "#c4e066",
    greenPale: "#d8f0a0",
    // Teal/cyan greens
    tealDark: "#1a4a4a",
    teal: "#2a7a6a",
    tealLight: "#4aaa8a",
    // Olive/yellow greens
    oliveDark: "#3a4a1a",
    olive: "#5a6a2a",
    oliveLight: "#7a8a4a",
  },

  // Browns - for dirt, wood, bark
  Browns: {
    brownDarkest: "#1a0a00",
    brownDarker: "#2a1a0a",
    brownDark: "#3d2a14",
    brown: "#5c4022",
    brownMid: "#7a5a36",
    brownLight: "#9a7a52",
    brownLighter: "#b89a70",
    brownLightest: "#d4ba90",
    brownPale: "#e8d8c0",
    // Red browns
    rustDark: "#4a2a1a",
    rust: "#6a3a2a",
    rustLight: "#8a5a4a",
    // Tan/beige
    tanDark: "#8a7a5a",
    tan: "#a89a7a",
    tanLight: "#c8ba9a",
  },

  // Blues - for water, sky, ice
  Blues: {
    blueDarkest: "#0a1020",
    blueDarker: "#0a1a2e",
    blueDark: "#1a3050",
    blue: "#2a5080",
    blueMid: "#3a70a0",
    blueLight: "#5090c0",
    blueLighter: "#70b0e0",
    blueLightest: "#a0d0f0",
    bluePale: "#c0e8ff",
    // Cyan
    cyanDark: "#0a4050",
    cyan: "#2080a0",
    cyanLight: "#40b0d0",
    // Navy/deep
    navyDark: "#0a0a30",
    navy: "#1a1a50",
    navyLight: "#3a3a80",
  },

  // Grays - for stone, metal
  Grays: {
    black: "#0a0a0a",
    grayDarkest: "#1a1a1a",
    grayDarker: "#2a2a30",
    grayDark: "#3a3a44",
    gray: "#5a5a66",
    grayMid: "#7a7a88",
    grayLight: "#9a9aaa",
    grayLighter: "#babac0",
    grayLightest: "#dadae0",
    white: "#f0f0f0",
    // Warm grays
    warmGrayDark: "#4a4440",
    warmGray: "#6a6460",
    warmGrayLight: "#8a8480",
    // Cool grays
    coolGrayDark: "#3a4048",
    coolGray: "#5a6068",
    coolGrayLight: "#7a8088",
  },

  // Reds - for danger, fire, blood
  Reds: {
    redDarkest: "#2a0a0a",
    redDarker: "#4a1010",
    redDark: "#6a1a1a",
    red: "#8a2a2a",
    redMid: "#aa3a3a",
    redLight: "#ca5a5a",
    redLighter: "#e07a7a",
    redLightest: "#f0a0a0",
    // Crimson/blood
    crimsonDark: "#5a0a1a",
    crimson: "#8a1a3a",
    crimsonLight: "#ba3a5a",
    // Pink
    pinkDark: "#8a3a5a",
    pink: "#c05a8a",
    pinkLight: "#e08ab0",
  },

  // Oranges - for fire, warmth
  Oranges: {
    orangeDarkest: "#3a1a00",
    orangeDarker: "#5a2a00",
    orangeDark: "#8a4a10",
    orange: "#c07020",
    orangeMid: "#e09030",
    orangeLight: "#f0b050",
    orangeLighter: "#ffd070",
    orangeLightest: "#ffe8a0",
    // Burnt orange
    burntDark: "#5a3010",
    burnt: "#7a4a20",
    burntLight: "#9a6a40",
  },

  // Yellows - for gold, light, sand
  Yellows: {
    yellowDarkest: "#3a3a00",
    yellowDarker: "#5a5a10",
    yellowDark: "#7a7a20",
    yellow: "#b0b030",
    yellowMid: "#d0d050",
    yellowLight: "#e8e870",
    yellowLighter: "#f8f8a0",
    yellowLightest: "#ffffc0",
    // Gold
    goldDark: "#6a5a1a",
    gold: "#a08a2a",
    goldLight: "#d0ba5a",
    goldBright: "#f0da7a",
  },

  // Purples - for magic, night
  Purples: {
    purpleDarkest: "#1a0a2a",
    purpleDarker: "#2a1040",
    purpleDark: "#3a1a5a",
    purple: "#5a2a8a",
    purpleMid: "#7a4aaa",
    purpleLight: "#9a6aca",
    purpleLighter: "#ba8aea",
    purpleLightest: "#dab0ff",
    // Magenta
    magentaDark: "#5a1a4a",
    magenta: "#8a3a7a",
    magentaLight: "#ba5aaa",
    // Violet
    violetDark: "#2a1a4a",
    violet: "#4a3a7a",
    violetLight: "#7a6aaa",
  },

  // Skin tones
  Skin: {
    skinDark1: "#3a2a20",
    skinDark2: "#5a4030",
    skinDark3: "#7a5a40",
    skinMid1: "#9a7a5a",
    skinMid2: "#ba9a7a",
    skinMid3: "#d0b090",
    skinLight1: "#e0c8a8",
    skinLight2: "#f0dcc0",
    skinLight3: "#ffe8d8",
    skinPale: "#fff0e8",
  },

  // Special/Effects
  Special: {
    // Glow colors
    glowRed: "#ff4040",
    glowOrange: "#ff8020",
    glowYellow: "#ffff40",
    glowGreen: "#40ff40",
    glowCyan: "#40ffff",
    glowBlue: "#4040ff",
    glowPurple: "#a040ff",
    glowPink: "#ff40a0",
    glowWhite: "#ffffff",
    // Shadow
    shadowLight: "rgba(0,0,0,0.3)",
    shadowMid: "rgba(0,0,0,0.5)",
    shadowDark: "rgba(0,0,0,0.7)",
  },
};

// Get all colors as flat list for export
function getAllColors(): Record<string, string> {
  const all: Record<string, string> = {};
  for (const category of Object.values(COLOR_CATEGORIES)) {
    Object.assign(all, category);
  }
  return all;
}

export function PixelArtEditor() {
  // Editor state
  const [gridSize, setGridSize] = useState<GridSize>(64);
  const [selectedColor, setSelectedColor] = useState<string>("green");
  const [selectedColorHex, setSelectedColorHex] = useState<string>("#4a8c2a");
  const [isErasing, setIsErasing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [copied, setCopied] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Greens");
  const [customColor, setCustomColor] = useState("#4a8c2a");

  // Sprite data - 2D array of color keys or "_" for transparent
  const [pixels, setPixels] = useState<string[][]>(() =>
    Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill("_"))
  );

  // All colors flattened
  const allColors = useMemo(() => getAllColors(), []);

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

  // Select color from palette
  const selectColor = useCallback((name: string, hex: string) => {
    setSelectedColor(name);
    setSelectedColorHex(hex);
    setIsErasing(false);
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
    // Build color map for used colors
    const usedColors = new Set<string>();
    pixels.forEach((row) => row.forEach((c) => { if (c !== "_") usedColors.add(c); }));

    // Generate shorthand aliases
    const aliases: string[] = [];
    const aliasMap: Record<string, string> = { "_": "_" };
    let aliasIndex = 0;

    usedColors.forEach((colorName) => {
      const alias = `c${aliasIndex++}`;
      aliasMap[colorName] = alias;
      const hex = allColors[colorName] || "#ff00ff";
      aliases.push(`const ${alias} = "${colorName}"; // ${hex}`);
    });

    // Generate sprite data
    const lines = pixels.map((row) => {
      const cells = row.map((cell) => aliasMap[cell] || `"${cell}"`);
      return `  [${cells.join(",")}],`;
    });

    const code = `// Color aliases
${aliases.join("\n")}

const SPRITE = [
${lines.join("\n")}
];`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [pixels, allColors]);

  // Get hex color from color name
  const getHexColor = useCallback(
    (colorName: string): string => {
      if (colorName === "_") return "transparent";
      return allColors[colorName] || "#ff00ff";
    },
    [allColors]
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-xl text-accent-gold">Pixel Art Editor</h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-foreground-muted">Grid:</span>
          {GRID_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => handleGridSizeChange(size)}
              className={`px-2 py-1 text-xs rounded ${
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

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Left sidebar - Color Categories */}
        <div className="w-56 flex flex-col gap-2 overflow-y-auto">
          {/* Tools */}
          <div className="bg-background-secondary rounded-lg p-2 flex gap-1">
            <button
              onClick={() => setIsErasing(false)}
              className={`flex-1 px-2 py-1 text-xs rounded ${
                !isErasing
                  ? "bg-primary text-foreground"
                  : "bg-background-tertiary text-foreground-muted"
              }`}
            >
              Draw
            </button>
            <button
              onClick={() => setIsErasing(true)}
              className={`flex-1 px-2 py-1 text-xs rounded ${
                isErasing
                  ? "bg-primary text-foreground"
                  : "bg-background-tertiary text-foreground-muted"
              }`}
            >
              Erase
            </button>
            <button
              onClick={clearCanvas}
              className="flex-1 px-2 py-1 text-xs rounded bg-background-tertiary text-foreground-muted hover:bg-red-900"
            >
              Clear
            </button>
          </div>

          {/* Custom color picker */}
          <div className="bg-background-secondary rounded-lg p-2">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="flex-1 bg-background-tertiary text-foreground text-xs p-1 rounded font-mono"
              />
              <button
                onClick={() => selectColor(`custom_${customColor}`, customColor)}
                className="px-2 py-1 text-xs bg-primary text-foreground rounded"
              >
                Use
              </button>
            </div>
          </div>

          {/* Color categories */}
          {Object.entries(COLOR_CATEGORIES).map(([categoryName, colors]) => (
            <div key={categoryName} className="bg-background-secondary rounded-lg overflow-hidden">
              <button
                onClick={() =>
                  setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
                }
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-background-tertiary"
              >
                <div className="flex items-center gap-2">
                  {/* Category color preview */}
                  <div className="flex gap-0.5">
                    {Object.values(colors).slice(0, 5).map((hex, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-foreground">{categoryName}</span>
                </div>
                <span className="text-xs text-foreground-muted">
                  {expandedCategory === categoryName ? "−" : "+"}
                </span>
              </button>

              {expandedCategory === categoryName && (
                <div className="px-2 pb-2 grid grid-cols-5 gap-1">
                  {Object.entries(colors).map(([name, hex]) => (
                    <button
                      key={name}
                      onClick={() => selectColor(name, hex)}
                      className={`aspect-square rounded ${
                        selectedColor === name
                          ? "ring-2 ring-white scale-110"
                          : "hover:ring-1 hover:ring-white/50"
                      }`}
                      style={{ backgroundColor: hex }}
                      title={`${name}\n${hex}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col items-center gap-2 min-h-0">
          {/* Current color indicator */}
          <div className="flex items-center gap-3 bg-background-secondary rounded-lg px-3 py-1">
            <div
              className="w-6 h-6 rounded border border-white/20"
              style={{
                backgroundColor: isErasing ? "transparent" : selectedColorHex,
                backgroundImage: isErasing
                  ? `linear-gradient(45deg, #444 25%, transparent 25%),
                     linear-gradient(-45deg, #444 25%, transparent 25%),
                     linear-gradient(45deg, transparent 75%, #444 75%),
                     linear-gradient(-45deg, transparent 75%, #444 75%)`
                  : "none",
                backgroundSize: "6px 6px",
              }}
            />
            <span className="text-sm text-foreground">
              {isErasing ? "Eraser" : selectedColor}
            </span>
            <span className="text-xs text-foreground-muted font-mono">
              {isErasing ? "transparent" : selectedColorHex}
            </span>
          </div>

          {/* Canvas container with scroll */}
          <div
            className="flex-1 overflow-auto bg-[#0a0a0a] rounded-lg p-2"
            style={{ maxHeight: "calc(100vh - 280px)" }}
          >
            <div
              className="relative"
              style={{
                width: gridSize * pixelSize,
                height: gridSize * pixelSize,
                minWidth: gridSize * pixelSize,
                minHeight: gridSize * pixelSize,
              }}
              onMouseLeave={handleMouseUp}
              onMouseUp={handleMouseUp}
            >
              {/* Checkerboard background for transparency */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
                    linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
                    linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)
                  `,
                  backgroundSize: `${Math.max(pixelSize * 2, 8)}px ${Math.max(pixelSize * 2, 8)}px`,
                  backgroundPosition: `0 0, 0 ${Math.max(pixelSize, 4)}px, ${Math.max(pixelSize, 4)}px -${Math.max(pixelSize, 4)}px, -${Math.max(pixelSize, 4)}px 0px`,
                  backgroundColor: "#121212",
                }}
              />

              {/* Pixels */}
              {pixels.map((row, y) =>
                row.map((colorKey, x) => (
                  <div
                    key={`${x}-${y}`}
                    className="absolute"
                    style={{
                      left: x * pixelSize,
                      top: y * pixelSize,
                      width: pixelSize,
                      height: pixelSize,
                      backgroundColor:
                        colorKey === "_" ? "transparent" : getHexColor(colorKey),
                      outline: showGrid && pixelSize > 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      cursor: "crosshair",
                    }}
                    onMouseDown={() => handleMouseDown(x, y)}
                    onMouseMove={() => handleMouseMove(x, y)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-3 py-1 text-xs rounded ${
                showGrid
                  ? "bg-primary text-foreground"
                  : "bg-background-tertiary text-foreground-muted"
              }`}
            >
              Grid
            </button>
            <button
              onClick={fillCanvas}
              className="px-3 py-1 text-xs rounded bg-background-tertiary text-foreground-muted hover:bg-background"
            >
              Fill All
            </button>
            <button
              onClick={exportAsCode}
              className="px-4 py-1 text-sm rounded bg-accent-gold text-background font-bold hover:bg-accent-gold/80"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>

        {/* Right sidebar - Preview */}
        <div className="w-48 flex flex-col gap-2">
          <div className="bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">Preview</label>
            <div className="flex flex-col gap-2 items-center">
              {[1, 2, 4].map((scale) => (
                <div
                  key={scale}
                  className="bg-[#0a0a0a] rounded p-1"
                  title={`${scale}x`}
                >
                  <canvas
                    ref={(canvas) => {
                      if (!canvas) return;
                      const ctx = canvas.getContext("2d");
                      if (!ctx) return;

                      const size = Math.min(gridSize, 64); // Limit preview size
                      canvas.width = size * scale;
                      canvas.height = size * scale;
                      ctx.imageSmoothingEnabled = false;
                      ctx.clearRect(0, 0, canvas.width, canvas.height);

                      // Draw pixels (sample if grid is large)
                      const step = Math.max(1, Math.floor(gridSize / size));
                      for (let y = 0; y < size; y++) {
                        for (let x = 0; x < size; x++) {
                          const srcY = Math.min(y * step, gridSize - 1);
                          const srcX = Math.min(x * step, gridSize - 1);
                          const colorKey = pixels[srcY]?.[srcX];
                          if (colorKey && colorKey !== "_") {
                            ctx.fillStyle = getHexColor(colorKey);
                            ctx.fillRect(x * scale, y * scale, scale, scale);
                          }
                        }
                      }
                    }}
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">Info</label>
            <div className="text-xs text-foreground-muted space-y-1">
              <div>Size: {gridSize}x{gridSize}</div>
              <div>Pixels: {gridSize * gridSize}</div>
              <div>
                Used: {new Set(pixels.flat().filter((c) => c !== "_")).size} colors
              </div>
            </div>
          </div>

          <div className="bg-background-secondary rounded-lg p-3">
            <label className="block text-xs text-foreground-muted mb-2">Tips</label>
            <ul className="text-xs text-foreground-muted space-y-1">
              <li>• Click category to expand</li>
              <li>• Drag to paint multiple</li>
              <li>• Use color picker for custom</li>
              <li>• Copy code to paste in files</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
