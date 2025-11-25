import { useState } from "react";
import { IconClose, IconDice } from "@/components/ui/PixelIcon";
import { generateMap, generateSeed } from "@/services/mapGenerator";
import type { MapData } from "@/types/map";

// Map size presets
const SIZE_PRESETS = [
  { label: "Small", width: 20, height: 15 },
  { label: "Medium", width: 30, height: 20 },
  { label: "Large", width: 50, height: 35 },
  { label: "Huge", width: 80, height: 50 },
] as const;

interface GenerateMapDialogProps {
  onClose: () => void;
  onGenerate: (mapData: MapData) => void;
}

export function GenerateMapDialog({
  onClose,
  onGenerate,
}: GenerateMapDialogProps) {
  const [seed, setSeed] = useState(() => generateSeed());
  const [selectedPreset, setSelectedPreset] = useState(1); // Default to Medium
  const [isGenerating, setIsGenerating] = useState(false);

  const currentSize = SIZE_PRESETS[selectedPreset]!;

  const handleRandomSeed = () => {
    setSeed(generateSeed());
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    // Use setTimeout to allow UI to update before generation
    setTimeout(() => {
      try {
        const { mapData } = generateMap({
          seed,
          width: currentSize.width,
          height: currentSize.height,
        });
        onGenerate(mapData);
      } catch (error) {
        console.error("Failed to generate map:", error);
        setIsGenerating(false);
      }
    }, 10);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="pixel-panel w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
          <h2 className="font-pixel text-sm text-foreground">Generate Random Map</h2>
          <button
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <IconClose size={16} />
          </button>
        </div>

        {/* Seed Input */}
        <div className="mb-4">
          <label className="font-pixel text-3xs text-foreground-muted/50 uppercase tracking-wide block mb-2">
            Seed
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              className="flex-1 bg-background-tertiary text-foreground font-pixel text-2xs px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter seed..."
            />
            <button
              onClick={handleRandomSeed}
              className="pixel-button px-3 py-2 text-2xs"
              title="Random Seed"
            >
              <IconDice size={14} />
            </button>
          </div>
          <p className="text-3xs text-foreground-muted mt-1">
            Same seed = same map. Share seeds to share maps!
          </p>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <label className="font-pixel text-3xs text-foreground-muted/50 uppercase tracking-wide block mb-2">
            Map Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {SIZE_PRESETS.map((preset, index) => (
              <button
                key={preset.label}
                onClick={() => setSelectedPreset(index)}
                className={`font-pixel text-3xs py-2 px-2 transition-colors ${
                  selectedPreset === index
                    ? "bg-primary text-foreground"
                    : "bg-background-tertiary text-foreground-muted hover:bg-primary/50"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <p className="text-3xs text-foreground-muted mt-2">
            {currentSize.width} x {currentSize.height} tiles ({currentSize.width * currentSize.height} total)
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-3 border-t border-border">
          <button
            onClick={onClose}
            className="pixel-button flex-1 text-2xs py-2"
            disabled={isGenerating}
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="pixel-button flex-1 text-2xs py-2 bg-accent-green"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
