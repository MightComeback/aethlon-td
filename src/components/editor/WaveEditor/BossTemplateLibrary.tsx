/**
 * Boss Template Library
 * Pre-configured boss encounters for quick wave building
 */

import { useState } from "react";
import { useEditorStore } from "@/stores/editorStore";
import type { BossTemplate } from "@/types/wavePreset";
import { ALL_BOSS_TEMPLATES } from "@/data/waves/presets";
import { getEnemyDefinition } from "@/data/enemies";
import { PixelIcon, IconStar } from "@/components/ui/PixelIcon";

export function BossTemplateLibrary() {
  const { updateWave, selectedWaveNumber } = useEditorStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPattern, setSelectedPattern] = useState<string>("all");

  // Filter templates
  const filteredTemplates = ALL_BOSS_TEMPLATES.filter((template) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !template.name.toLowerCase().includes(query) &&
        !template.description.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Pattern filter
    if (selectedPattern !== "all" && template.pattern !== selectedPattern) {
      return false;
    }

    return true;
  });

  const handleApplyTemplate = (template: BossTemplate) => {
    let targetWave = selectedWaveNumber ?? template.recommendedWave;

    // Prompt for wave number if not selected
    if (!selectedWaveNumber) {
      const input = window.prompt(
        `Apply "${template.name}" to which wave number?`,
        template.recommendedWave.toString()
      );

      if (!input) return;
      targetWave = parseInt(input, 10);

      if (isNaN(targetWave) || targetWave < 1) {
        alert("Invalid wave number");
        return;
      }
    }

    // Apply the template
    updateWave(targetWave, {
      ...template.waveConfig,
      waveNumber: targetWave,
      id: `custom-wave-${targetWave}`,
    });

    alert(`Boss encounter applied to wave ${targetWave}!`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <p className="text-gray-400 mb-4 pixel-text text-sm">
          Pre-configured boss encounters. Click to apply to a wave.
        </p>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search boss encounters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white text-sm pixel-text focus:border-blue-500 outline-none"
          />
          <select
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white text-sm pixel-text focus:border-blue-500 outline-none"
          >
            <option value="all">All Patterns</option>
            <option value="solo">Solo Assault</option>
            <option value="army">Army Leader</option>
            <option value="elite">Elite Guard</option>
            <option value="phased">Phased Attack</option>
            <option value="multi">Multi-Boss</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filteredTemplates.map((template) => (
          <BossTemplateCard
            key={template.id}
            template={template}
            onApply={handleApplyTemplate}
          />
        ))}

        {filteredTemplates.length === 0 && (
          <div className="col-span-2 text-center py-12 text-gray-500 pixel-text">
            No boss templates found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

function BossTemplateCard({
  template,
  onApply,
}: {
  template: BossTemplate;
  onApply: (template: BossTemplate) => void;
}) {
  const bossDefinition = getEnemyDefinition(template.bossType);
  // Render star icons for difficulty rating
  const starCount = Math.min(5, Math.ceil(template.difficulty / 20));
  const difficultyStars = Array.from({ length: starCount }, (_, i) => (
    <IconStar key={i} size={10} className="text-yellow-400" />
  ));

  return (
    <div className="pixel-panel bg-gray-800 border-2 border-gray-700 p-4 hover:border-yellow-500 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <PixelIcon icon="crown" size={18} className="text-yellow-400" />
          <div>
            <h4 className="font-bold text-white pixel-text text-sm">
              {template.name}
            </h4>
            <p className="text-2xs text-gray-500 pixel-text">
              {bossDefinition?.name ?? template.bossType}
            </p>
          </div>
        </div>
        <span className="flex gap-0.5" title="Difficulty">
          {difficultyStars}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
        {template.description}
      </p>

      {/* Composition Preview */}
      <div className="space-y-1 text-2xs text-gray-500 mb-3">
        {template.waveConfig.groups.map((group, index) => {
          const def = getEnemyDefinition(group.enemyType);
          const isBoss = def?.isBoss;
          return (
            <div key={index} className={isBoss ? "text-yellow-400" : ""}>
              • {group.count}x {def?.name ?? group.enemyType} (T{group.tier})
            </div>
          );
        })}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-2xs text-gray-600 mb-3 border-t border-gray-700 pt-2">
        <span>Recommended: Wave {template.recommendedWave}</span>
        <span className="capitalize">{template.pattern}</span>
      </div>

      <button
        onClick={() => onApply(template)}
        className="w-full pixel-button px-3 py-2 text-sm bg-yellow-600 hover:bg-yellow-500 text-white"
      >
        Apply Template
      </button>
    </div>
  );
}
