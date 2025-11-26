/**
 * Simple Wave Editor
 * Visual editor for building individual waves
 */

import { useState, useEffect } from "react";
import { useEditorStore } from "@/stores/editorStore";
import type { SimpleEnemyGroup } from "@/types/wavePreset";
import { EnemyType, EnemyCategory } from "@/types/enemy";
import { getEnemyDefinition, ENEMY_DATABASE } from "@/data/enemies";
import { simpleToFullWaveConfig, suggestTier, suggestEnemyCount } from "@/services/waves/autoCalculation";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { estimateWaveDuration, getDifficultyRating } from "@/data/waves/waveUtils";

interface SimpleWaveEditorProps {
  waveNumber: number;
  onClose: () => void;
  onSave: () => void;
}

export function SimpleWaveEditor({ waveNumber, onClose, onSave }: SimpleWaveEditorProps) {
  const { waveConfig, updateWave, mapId } = useEditorStore();

  // Find existing wave or create empty
  const existingWave = waveConfig?.waves.find((w) => w.waveNumber === waveNumber);

  const [groups, setGroups] = useState<SimpleEnemyGroup[]>(() => {
    if (existingWave) {
      return existingWave.groups.map((g) => ({
        enemyType: g.enemyType,
        count: g.count,
        tier: g.tier,
      }));
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EnemyCategory | "all">("all");

  // Calculate wave preview
  const previewWave = simpleToFullWaveConfig(
    { waveNumber, groups },
    mapId ?? "preview"
  );
  const duration = estimateWaveDuration(previewWave);
  const difficultyRating = getDifficultyRating(previewWave.difficulty);

  const handleAddGroup = (enemyType: EnemyType) => {
    const { recommended } = suggestEnemyCount(waveNumber, false);
    const tier = suggestTier(waveNumber);

    setGroups([
      ...groups,
      {
        enemyType,
        count: recommended,
        tier,
      },
    ]);
  };

  const handleUpdateGroup = (index: number, updates: Partial<SimpleEnemyGroup>) => {
    const newGroups = [...groups];
    newGroups[index] = { ...newGroups[index]!, ...updates };
    setGroups(newGroups);
  };

  const handleRemoveGroup = (index: number) => {
    setGroups(groups.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const fullWave = simpleToFullWaveConfig({ waveNumber, groups }, mapId ?? "custom");
    updateWave(waveNumber, fullWave);
    onSave();
  };

  // Get all enemy types for selection
  const allEnemies = Array.from(ENEMY_DATABASE.values()).filter((enemy) => {
    // Category filter
    if (selectedCategory !== "all" && enemy.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        enemy.name.toLowerCase().includes(query) ||
        enemy.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-6xl h-[90vh] pixel-panel bg-gray-900 border-4 border-gray-700 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-gray-700 bg-gray-800">
          <h2 className="text-xl font-bold text-white pixel-text">
            Edit Wave {waveNumber}
          </h2>
          <button
            onClick={onClose}
            className="pixel-button-sm p-2 hover:bg-red-600"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Enemy Selection */}
          <div className="w-1/2 border-r-4 border-gray-700 flex flex-col">
            <div className="p-4 border-b-2 border-gray-700">
              <h3 className="text-sm font-bold text-white pixel-text mb-3">
                Select Enemies
              </h3>

              {/* Search */}
              <input
                type="text"
                placeholder="Search enemies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border-2 border-gray-700 text-white text-sm pixel-text mb-2"
              />

              {/* Category Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1 text-xs pixel-text ${
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory(EnemyCategory.Ground)}
                  className={`px-3 py-1 text-xs pixel-text ${
                    selectedCategory === EnemyCategory.Ground
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  Ground
                </button>
                <button
                  onClick={() => setSelectedCategory(EnemyCategory.Flying)}
                  className={`px-3 py-1 text-xs pixel-text ${
                    selectedCategory === EnemyCategory.Flying
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  Flying
                </button>
                <button
                  onClick={() => setSelectedCategory(EnemyCategory.Boss)}
                  className={`px-3 py-1 text-xs pixel-text ${
                    selectedCategory === EnemyCategory.Boss
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  Boss
                </button>
              </div>
            </div>

            {/* Enemy Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-2">
                {allEnemies.map((enemy) => (
                  <button
                    key={enemy.type}
                    onClick={() => handleAddGroup(enemy.type)}
                    className="pixel-panel p-3 bg-gray-800 border-2 border-gray-700 hover:border-blue-500 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {enemy.isBoss && (
                        <PixelIcon icon="crown" size={12} className="text-yellow-400" />
                      )}
                      <span className="text-sm font-bold text-white pixel-text">
                        {enemy.name}
                      </span>
                    </div>
                    <p className="text-2xs text-gray-500 line-clamp-1">
                      {enemy.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Wave Composition */}
          <div className="w-1/2 flex flex-col">
            <div className="p-4 border-b-2 border-gray-700">
              <h3 className="text-sm font-bold text-white pixel-text mb-3">
                Wave Composition
              </h3>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Enemies:</span>
                  <span className="ml-2 text-white font-bold">
                    {groups.reduce((sum, g) => sum + g.count, 0)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Difficulty:</span>
                  <span className="ml-2 text-white font-bold">{difficultyRating}</span>
                </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <span className="ml-2 text-white font-bold">
                    ~{Math.round(duration / 1000)}s
                  </span>
                </div>
              </div>
            </div>

            {/* Groups List */}
            <div className="flex-1 overflow-y-auto p-4">
              {groups.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <p className="text-gray-500 pixel-text mb-2">No enemies added</p>
                    <p className="text-xs text-gray-600">
                      Click an enemy on the left to add it
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {groups.map((group, index) => {
                    const definition = getEnemyDefinition(group.enemyType);
                    return (
                      <div
                        key={index}
                        className="pixel-panel p-3 bg-gray-800 border-2 border-gray-700"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {definition?.isBoss && (
                              <PixelIcon icon="crown" size={14} className="text-yellow-400" />
                            )}
                            <span className="text-sm font-bold text-white pixel-text">
                              {definition?.name ?? group.enemyType}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveGroup(index)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            ×
                          </button>
                        </div>

                        {/* Count Slider */}
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-2xs text-gray-400 pixel-text">Count</label>
                            <span className="text-xs text-white pixel-text">{group.count}</span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={definition?.isBoss ? 3 : 50}
                            value={group.count}
                            onChange={(e) =>
                              handleUpdateGroup(index, { count: Number(e.target.value) })
                            }
                            className="w-full"
                          />
                        </div>

                        {/* Tier Selector */}
                        <div>
                          <label className="text-2xs text-gray-400 pixel-text mb-1 block">
                            Tier
                          </label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((tier) => (
                              <button
                                key={tier}
                                onClick={() => handleUpdateGroup(index, { tier })}
                                className={`flex-1 px-2 py-1 text-xs pixel-text ${
                                  group.tier === tier
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                                }`}
                              >
                                T{tier}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t-4 border-gray-700 bg-gray-800">
          <div className="text-xs text-gray-400 pixel-text">
            {previewWave.isBossWave && (
              <span className="text-yellow-400">Boss Wave • </span>
            )}
            Bonus: +{previewWave.bonusReward} gold
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="pixel-button px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="pixel-button px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500"
              disabled={groups.length === 0}
            >
              Save Wave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
