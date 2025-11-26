/**
 * Wave List
 * Display and manage individual waves
 */

import { useEditorStore } from "@/stores/editorStore";
import { GLOBAL_WAVES } from "@/data/waves/globalWaves";
import { getEnemyDefinition } from "@/data/enemies";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { getDifficultyRating } from "@/data/waves/waveUtils";

export function WaveList() {
  const { waveConfig, waveEditorMode, mapId, removeWave } = useEditorStore();

  // Determine which waves to display
  const displayWaves = waveEditorMode === "replace"
    ? waveConfig?.waves.sort((a, b) => a.waveNumber - b.waveNumber) ?? []
    : GLOBAL_WAVES.map((globalWave) => {
        // Check if there's a custom override
        const override = waveConfig?.waves.find(
          (w) => w.waveNumber === globalWave.waveNumber
        );
        return override ?? globalWave;
      });

  const handleEditWave = (waveNumber: number) => {
    // TODO: Open SimpleWaveEditor
    console.log("Edit wave", waveNumber);
  };

  const handleCopyWave = (waveNumber: number) => {
    const wave = displayWaves.find((w) => w.waveNumber === waveNumber);
    if (!wave) return;

    const newWaveNumber = displayWaves.length + 1;
    useEditorStore.getState().updateWave(newWaveNumber, {
      ...wave,
      id: `${mapId}-wave-${newWaveNumber}`,
      waveNumber: newWaveNumber,
    });
  };

  const handleDeleteWave = (waveNumber: number) => {
    const confirm = window.confirm(
      `Delete custom wave ${waveNumber}?\n\nThis will revert to the global wave ${waveNumber}.`
    );
    if (confirm) {
      removeWave(waveNumber);
    }
  };

  const handleAddWave = () => {
    const newWaveNumber = (waveConfig?.waves.length ?? 0) + 1;
    useEditorStore.getState().setSelectedWaveNumber(newWaveNumber);
    // TODO: Open SimpleWaveEditor
    console.log("Add wave", newWaveNumber);
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400 pixel-text">
          {waveEditorMode === "replace" ? (
            <span>Custom wave sequence ({displayWaves.length} waves)</span>
          ) : (
            <span>
              Showing 50 global waves
              {waveConfig && waveConfig.waves.length > 0 && (
                <> ({waveConfig.waves.length} customized)</>
              )}
            </span>
          )}
        </div>

        {waveEditorMode === "replace" && (
          <button
            onClick={handleAddWave}
            className="pixel-button px-3 py-2 text-sm bg-green-600 hover:bg-green-500"
          >
            + Add Wave
          </button>
        )}
      </div>

      {/* Wave List */}
      <div className="space-y-2">
        {displayWaves.map((wave) => {
          const isCustom = waveConfig?.waves.some(
            (w) => w.waveNumber === wave.waveNumber
          );
          const difficultyRating = getDifficultyRating(wave.difficulty);

          return (
            <WaveListItem
              key={`wave-${wave.waveNumber}`}
              wave={wave}
              isCustom={isCustom ?? false}
              difficultyRating={difficultyRating}
              onEdit={() => handleEditWave(wave.waveNumber)}
              onCopy={() => handleCopyWave(wave.waveNumber)}
              onDelete={
                isCustom ? () => handleDeleteWave(wave.waveNumber) : undefined
              }
            />
          );
        })}

        {displayWaves.length === 0 && (
          <div className="p-12 text-center text-gray-500 pixel-text">
            <p className="mb-4">No waves configured.</p>
            <button
              onClick={handleAddWave}
              className="pixel-button px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white"
            >
              Add First Wave
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface WaveListItemProps {
  wave: any;
  isCustom: boolean;
  difficultyRating: string;
  onEdit: () => void;
  onCopy: () => void;
  onDelete?: () => void;
}

function WaveListItem({
  wave,
  isCustom,
  difficultyRating,
  onEdit,
  onCopy,
  onDelete,
}: WaveListItemProps) {
  const difficultyColors: Record<string, string> = {
    Easy: "text-green-400",
    Normal: "text-yellow-400",
    Hard: "text-orange-400",
    "Very Hard": "text-red-400",
    Extreme: "text-purple-400",
  };

  const totalEnemies = wave.groups.reduce(
    (sum: number, group: any) => sum + group.count,
    0
  );

  const hasFlying = wave.groups.some((group: any) => {
    const def = getEnemyDefinition(group.enemyType);
    return def?.category === "flying";
  });

  return (
    <div
      className={`pixel-panel p-3 border-2 ${
        isCustom ? "border-blue-500 bg-gray-800" : "border-gray-700 bg-gray-850"
      } hover:border-blue-400 transition-colors`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Wave Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-white pixel-text">
              Wave {wave.waveNumber}
            </span>
            {wave.isBossWave && (
              <PixelIcon icon="crown" size={14} className="text-yellow-400" />
            )}
            {hasFlying && (
              <PixelIcon icon="plane" size={14} className="text-blue-400" />
            )}
            {isCustom && (
              <span className="px-2 py-0.5 bg-blue-600 text-2xs text-white rounded">
                Custom
              </span>
            )}
            <span
              className={`text-xs font-bold pixel-text ${
                difficultyColors[difficultyRating] ?? "text-gray-400"
              }`}
            >
              {difficultyRating}
            </span>
          </div>

          {/* Enemy Composition */}
          <div className="space-y-1 text-xs text-gray-400 pixel-text">
            {wave.groups.map((group: any, index: number) => {
              const def = getEnemyDefinition(group.enemyType);
              return (
                <div key={index} className="flex items-center gap-2">
                  <span>•</span>
                  <span>
                    {group.count}x {def?.name ?? group.enemyType}
                  </span>
                  <span className="text-gray-600">(Tier {group.tier})</span>
                </div>
              );
            })}
          </div>

          {/* Wave Stats */}
          <div className="flex items-center gap-4 mt-2 text-2xs text-gray-500">
            <span>Total: {totalEnemies} enemies</span>
            {wave.bonusReward > 0 && (
              <span className="text-yellow-600">+{wave.bonusReward} gold</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1 ml-4">
          <button
            onClick={onEdit}
            className="pixel-button-sm px-2 py-1 text-2xs bg-gray-700 hover:bg-blue-600"
            title="Edit Wave"
          >
            Edit
          </button>
          <button
            onClick={onCopy}
            className="pixel-button-sm px-2 py-1 text-2xs bg-gray-700 hover:bg-green-600"
            title="Copy Wave"
          >
            Copy
          </button>
          {onDelete && (
            <button
              onClick={onDelete}
              className="pixel-button-sm px-2 py-1 text-2xs bg-gray-700 hover:bg-red-600"
              title="Delete Custom Wave"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
