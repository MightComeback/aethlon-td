/**
 * Wave Editor Dialog
 * Main container for the wave configuration interface
 */

import { useState, useEffect } from "react";
import { useEditorStore } from "@/stores/editorStore";
import { validateMapWaveOverride } from "@/services/waves/waveValidation";
import { IconX } from "@/components/ui/PixelIcon";
import { PresetBrowser } from "./PresetBrowser";
import { WaveList } from "./WaveList";
import { BossTemplateLibrary } from "./BossTemplateLibrary";

interface WaveEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "presets" | "waves" | "bosses";

export function WaveEditorDialog({ isOpen, onClose }: WaveEditorDialogProps) {
  const {
    waveConfig,
    waveEditorMode,
    setWaveEditorMode,
    spawnPoints,
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState<TabType>("presets");
  const [hasChanges, setHasChanges] = useState(false);

  // Validate wave config when it changes
  const validationResult = waveConfig
    ? validateMapWaveOverride(waveConfig, spawnPoints.length)
    : null;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleClose = () => {
    if (hasChanges) {
      const confirm = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirm) return;
    }
    onClose();
  };

  const handleApply = () => {
    setHasChanges(false);
    onClose();
  };

  const handleReset = () => {
    const confirm = window.confirm(
      "Reset to global waves? This will remove all custom wave configurations."
    );
    if (confirm) {
      useEditorStore.getState().clearWaveConfig();
      setHasChanges(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-5xl h-[85vh] pixel-panel bg-gray-900 border-4 border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-gray-700 bg-gray-800">
          <h2 className="text-xl font-bold text-white pixel-text">
            Wave Configuration
          </h2>
          <button
            onClick={handleClose}
            className="pixel-button-sm p-2 hover:bg-red-600"
            title="Close (Esc)"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Mode Selection */}
        <div className="p-4 border-b-4 border-gray-700 bg-gray-850">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 pixel-text">Mode:</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="wave-mode"
                checked={waveEditorMode === "selective"}
                onChange={() => setWaveEditorMode("selective")}
                className="w-4 h-4"
              />
              <span className="text-sm text-white pixel-text">
                Global + Overrides
              </span>
              <span className="text-xs text-gray-500">
                (Override specific waves)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="wave-mode"
                checked={waveEditorMode === "replace"}
                onChange={() => setWaveEditorMode("replace")}
                className="w-4 h-4"
              />
              <span className="text-sm text-white pixel-text">
                Custom Sequence
              </span>
              <span className="text-xs text-gray-500">
                (Replace all global waves)
              </span>
            </label>
          </div>

          {/* Validation Status */}
          {validationResult && (
            <div className="mt-2">
              {validationResult.errors.length > 0 && (
                <div className="text-xs text-red-400 pixel-text">
                  [!] {validationResult.errors.length} error(s) found
                </div>
              )}
              {validationResult.warnings.length > 0 && (
                <div className="text-xs text-yellow-400 pixel-text">
                  [!] {validationResult.warnings.length} warning(s)
                </div>
              )}
              {validationResult.isValid &&
                validationResult.warnings.length === 0 && (
                  <div className="text-xs text-green-400 pixel-text">
                    [OK] Configuration valid
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b-4 border-gray-700 bg-gray-800">
          <button
            onClick={() => setActiveTab("presets")}
            className={`px-6 py-3 text-sm font-bold pixel-text transition-colors ${
              activeTab === "presets"
                ? "bg-gray-700 text-white border-b-4 border-blue-500"
                : "text-gray-400 hover:text-white hover:bg-gray-750"
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => setActiveTab("waves")}
            className={`px-6 py-3 text-sm font-bold pixel-text transition-colors ${
              activeTab === "waves"
                ? "bg-gray-700 text-white border-b-4 border-blue-500"
                : "text-gray-400 hover:text-white hover:bg-gray-750"
            }`}
          >
            Wave List
            {waveConfig && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-600 rounded">
                {waveConfig.waves.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("bosses")}
            className={`px-6 py-3 text-sm font-bold pixel-text transition-colors ${
              activeTab === "bosses"
                ? "bg-gray-700 text-white border-b-4 border-blue-500"
                : "text-gray-400 hover:text-white hover:bg-gray-750"
            }`}
          >
            Boss Library
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900" style={{ height: "calc(85vh - 280px)" }}>
          {activeTab === "presets" && <PresetBrowser />}

          {activeTab === "waves" && <WaveList />}

          {activeTab === "bosses" && <BossTemplateLibrary />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t-4 border-gray-700 bg-gray-800">
          <div className="flex items-center gap-2">
            {waveConfig && (
              <button
                onClick={handleReset}
                className="pixel-button px-4 py-2 text-sm bg-red-700 hover:bg-red-600"
              >
                Reset to Global
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="pixel-button px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="pixel-button px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
