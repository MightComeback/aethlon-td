/**
 * Hook for uploading GLB models in debug mode
 * Uses File System Access API when available, falls back to download
 */

import { useCallback, useState } from "react";
import { useSettingsStore } from "@/stores/settingsStore";

export type ModelCategory = "objects" | "structures" | "enemies" | "towers" | "commanders";

interface UseModelUploadOptions {
  category: ModelCategory;
  onSuccess?: (modelId: string) => void;
  onError?: (error: string) => void;
}

interface UseModelUploadReturn {
  isDebugMode: boolean;
  isUploading: boolean;
  uploadModel: (modelId: string) => void;
  hasModel: (modelId: string) => boolean;
}

// Track which models have been uploaded this session
const uploadedModels = new Set<string>();

export function useModelUpload(options: UseModelUploadOptions): UseModelUploadReturn {
  const { category, onSuccess, onError } = options;
  const debugMode = useSettingsStore((s) => s.debugMode);
  const [isUploading, setIsUploading] = useState(false);

  const getTargetPath = (modelId: string) => {
    return `public/assets/models/${category}/${modelId}.glb`;
  };

  const uploadModel = useCallback(
    async (modelId: string) => {
      if (!debugMode) return;

      // Create file input
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".glb,.gltf";

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
          // Try File System Access API first (Chrome/Edge)
          if ("showDirectoryPicker" in window) {
            try {
              // @ts-expect-error - File System Access API
              const dirHandle = await window.showDirectoryPicker({
                id: "aethlon-models",
                mode: "readwrite",
                startIn: "downloads",
              });

              // Navigate to target folder
              const publicDir = await dirHandle.getDirectoryHandle("public", { create: true });
              const assetsDir = await publicDir.getDirectoryHandle("assets", { create: true });
              const modelsDir = await assetsDir.getDirectoryHandle("models", { create: true });
              const categoryDir = await modelsDir.getDirectoryHandle(category, { create: true });

              // Write the file
              const fileHandle = await categoryDir.getFileHandle(`${modelId}.glb`, { create: true });
              const writable = await (fileHandle as any).createWritable();
              await writable.write(file);
              await writable.close();

              uploadedModels.add(`${category}/${modelId}`);
              onSuccess?.(modelId);
            } catch (fsError) {
              // User cancelled or API not supported, fall back to download
              downloadFallback(file, modelId);
            }
          } else {
            // Fallback: Download with instructions
            downloadFallback(file, modelId);
          }
        } catch (error) {
          onError?.(error instanceof Error ? error.message : "Upload failed");
        } finally {
          setIsUploading(false);
        }
      };

      input.click();
    },
    [debugMode, category, onSuccess, onError]
  );

  const downloadFallback = (file: File, modelId: string) => {
    // Rename file and trigger download
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${modelId}.glb`;
    a.click();
    URL.revokeObjectURL(url);

    // Show instructions
    const targetPath = getTargetPath(modelId);
    alert(`File downloaded as ${modelId}.glb\n\nPlease move it to:\n${targetPath}`);

    uploadedModels.add(`${category}/${modelId}`);
    onSuccess?.(modelId);
  };

  const hasModel = useCallback(
    (modelId: string) => {
      return uploadedModels.has(`${category}/${modelId}`);
    },
    [category]
  );

  return {
    isDebugMode: debugMode,
    isUploading,
    uploadModel,
    hasModel,
  };
}
