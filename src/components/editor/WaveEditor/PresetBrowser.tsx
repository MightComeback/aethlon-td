/**
 * Preset Browser
 * Display and apply wave presets
 */

import { useState } from "react";
import { useEditorStore } from "@/stores/editorStore";
import type { WavePreset } from "@/types/wavePreset";
import {
  ALL_WAVE_PRESETS,
  getPresetsByCategory,
} from "@/data/waves/presets";
import { PixelIcon, IconStar } from "@/components/ui/PixelIcon";

export function PresetBrowser() {
  const { applyPreset } = useEditorStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter presets
  const filteredPresets = ALL_WAVE_PRESETS.filter((preset) => {
    // Category filter
    if (selectedCategory !== "all" && preset.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        preset.name.toLowerCase().includes(query) ||
        preset.description.toLowerCase().includes(query) ||
        preset.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  const handleApplyPreset = (preset: WavePreset) => {
    const confirm = window.confirm(
      `Apply "${preset.name}" preset?\n\nThis will ${
        preset.suggestedMode === "replace"
          ? "replace all waves"
          : "add custom waves"
      } (${preset.waveCount} waves).`
    );

    if (confirm) {
      applyPreset(preset);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search presets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white text-sm pixel-text focus:border-blue-500 outline-none"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white text-sm pixel-text focus:border-blue-500 outline-none"
        >
          <option value="all">All Categories</option>
          <option value="difficulty">Difficulty</option>
          <option value="theme">Themes</option>
          <option value="special">Special Modes</option>
        </select>
      </div>

      {/* Category Sections */}
      <div className="space-y-6">
        {["difficulty", "theme", "special"].map((category) => {
          const categoryPresets = getPresetsByCategory(
            category as WavePreset["category"]
          ).filter((p) =>
            selectedCategory === "all" || selectedCategory === category
              ? filteredPresets.includes(p)
              : false
          );

          if (categoryPresets.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-sm font-bold text-gray-300 pixel-text uppercase mb-3">
                {category === "difficulty" && "Difficulty Presets"}
                {category === "theme" && "Themed Waves"}
                {category === "special" && "Special Modes"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryPresets.map((preset) => (
                  <PresetCard
                    key={preset.id}
                    preset={preset}
                    onApply={handleApplyPreset}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filteredPresets.length === 0 && (
          <div className="text-center py-12 text-gray-500 pixel-text">
            No presets found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

function PresetCard({
  preset,
  onApply,
}: {
  preset: WavePreset;
  onApply: (preset: WavePreset) => void;
}) {
  // Render star icons for difficulty rating
  const difficultyStars = Array.from({ length: preset.difficultyRating }, (_, i) => (
    <IconStar key={i} size={10} className="text-yellow-400" />
  ));

  return (
    <div className="pixel-panel bg-gray-800 border-2 border-gray-700 p-4 hover:border-blue-500 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <PixelIcon icon={preset.icon} size={20} className="text-blue-400" />
          <h4 className="font-bold text-white pixel-text">{preset.name}</h4>
        </div>
        <span className="flex gap-0.5" title="Difficulty">
          {difficultyStars}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
        {preset.description}
      </p>

      <div className="flex items-center justify-between text-2xs text-gray-500 mb-3">
        <span>{preset.waveCount} waves</span>
        <span className="capitalize">{preset.category}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {preset.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-gray-700 text-2xs text-gray-400 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => onApply(preset)}
        className="w-full pixel-button px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white"
      >
        Apply Preset
      </button>
    </div>
  );
}
