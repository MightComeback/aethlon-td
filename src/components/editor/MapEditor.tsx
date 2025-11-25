import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Suspense, useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { EditorGrid } from "./EditorGrid";
import { EditorToolbar } from "./EditorToolbar";
import { TilePalette } from "./TilePalette";
import { EditorCameraController, CameraControlsUI } from "./CameraControls";
import { VirtualCursor } from "./VirtualCursor";
import { MapBrowser } from "./MapBrowser";
import { GenerateMapDialog } from "./GenerateMapDialog";
import { useEditorStore } from "@/stores/editorStore";
import { MapStorage } from "@/services/storage/MapStorage";
import { FrameLimiter } from "@/hooks/useFrameLimiter";
import type { MapMetadata, MapData } from "@/types/map";
import {
  IconBack,
  IconPlay,
  IconSave,
  IconFolder,
  IconDice,
} from "@/components/ui/PixelIcon";

// Map size presets
const SIZE_PRESETS = [
  { label: "Small", width: 15, height: 10 },
  { label: "Medium", width: 20, height: 15 },
  { label: "Large", width: 30, height: 20 },
  { label: "Wide", width: 40, height: 15 },
];

// Tools that require brush/drawing interactions (disable camera rotation)
const DRAWING_TOOLS = ["paint", "erase", "path", "fill", "height_raise", "height_lower"];

export function MapEditor() {
  const {
    camera,
    setCamera,
    mapName,
    setMapName,
    isModified,
    width,
    height,
    setMapSize,
    spawnPoints,
    exitPoints,
    waypoints,
    currentTool,
    getMapData,
    loadMap,
    newMap,
  } = useEditorStore();

  // Disable camera rotation when using drawing tools
  const enableCameraRotate = !DRAWING_TOOLS.includes(currentTool);

  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [customWidth, setCustomWidth] = useState(width);
  const [customHeight, setCustomHeight] = useState(height);
  const [showMapBrowser, setShowMapBrowser] = useState(false);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentMapId, setCurrentMapId] = useState<string | null>(null);
  const [savedMaps, setSavedMaps] = useState<MapMetadata[]>([]);

  // Load saved maps list
  const refreshMapList = useCallback(async () => {
    const maps = await MapStorage.getAllMaps();
    setSavedMaps(maps);
  }, []);

  useEffect(() => {
    refreshMapList();
  }, [refreshMapList]);

  // Save map handler
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const mapData = getMapData();
      // If editing existing map, preserve the ID
      if (currentMapId) {
        mapData.id = currentMapId;
      }
      await MapStorage.saveMap(mapData);
      setCurrentMapId(mapData.id);
      // Reset modified state in store
      useEditorStore.setState({ isModified: false });
      await refreshMapList();
    } catch (error) {
      console.error("Failed to save map:", error);
    } finally {
      setIsSaving(false);
    }
  }, [getMapData, currentMapId, refreshMapList]);

  // Load map handler
  const handleLoadMap = useCallback(async (id: string) => {
    const mapData = await MapStorage.getMap(id);
    if (mapData) {
      loadMap(mapData);
      setCurrentMapId(id);
      setShowMapBrowser(false);
    }
  }, [loadMap]);

  // New map handler
  const handleNewMap = useCallback(() => {
    newMap();
    setCurrentMapId(null);
    setShowMapBrowser(false);
  }, [newMap]);

  // Delete map handler
  const handleDeleteMap = useCallback(async (id: string) => {
    await MapStorage.deleteMap(id);
    await refreshMapList();
    // If we deleted the current map, clear the ID
    if (currentMapId === id) {
      setCurrentMapId(null);
    }
  }, [currentMapId, refreshMapList]);

  // Generate map handler
  const handleGenerateMap = useCallback((mapData: MapData) => {
    loadMap(mapData);
    setCurrentMapId(null); // New unsaved map
    setShowGenerateDialog(false);
  }, [loadMap]);

  // Keyboard shortcut for save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  // Calculate some stats
  const tileCount = width * height;
  const hasSpawn = spawnPoints.length > 0;
  const hasExit = exitPoints.length > 0;
  const waypointCount = waypoints.length;

  const handleSizeChange = (newWidth: number, newHeight: number) => {
    setMapSize(newWidth, newHeight);
    setCustomWidth(newWidth);
    setCustomHeight(newHeight);
    setShowSizeDialog(false);
  };

  return (
    <div className="relative h-full w-full">
      {/* Virtual Cursor */}
      <VirtualCursor />

      {/* Three.js Canvas */}
      <Canvas
        className="absolute inset-0"
        gl={{ antialias: false, alpha: false }}
        dpr={1}
        frameloop="never"
      >
        <FrameLimiter />
        <color attach="background" args={["#0a0a0a"]} />
        <OrthographicCamera
          makeDefault
          position={[0, 20, 20]}
          zoom={camera.zoom}
          near={0.1}
          far={1000}
        />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.6} />
        <EditorCameraController state={camera} onStateChange={setCamera} enableRotate={enableCameraRotate} />
        <Suspense fallback={null}>
          <EditorGrid />
        </Suspense>
      </Canvas>

      {/* Editor UI Overlay */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top Toolbar */}
        <div className="pointer-events-auto absolute left-0 right-0 top-0 flex items-center justify-between gap-3 p-3">
          {/* Left: Back button */}
          <Link
            to="/"
            className="pixel-button flex items-center gap-2 text-2xs py-2 px-3"
          >
            <IconBack size={12} />
            <span className="hidden sm:inline">Back</span>
          </Link>

          {/* Center: Toolbar + Map name */}
          <div className="flex items-center gap-3">
            <EditorToolbar />

            {/* Map name input - wider */}
            <div className="pixel-panel py-1.5 px-3 flex items-center gap-2">
              <input
                type="text"
                value={mapName}
                onChange={(e) => setMapName(e.target.value)}
                className="bg-transparent font-pixel text-2xs text-foreground w-40 outline-none"
                placeholder="Enter map name..."
              />
              {isModified && (
                <span className="text-warning text-sm font-bold" title="Unsaved changes">
                  *
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Generate button */}
            <button
              className="pixel-button flex items-center gap-2 text-2xs py-2 px-3"
              title="Generate Random Map"
              onClick={() => setShowGenerateDialog(true)}
            >
              <IconDice size={12} />
              <span className="hidden sm:inline">Generate</span>
            </button>

            {/* Load button */}
            <button
              className="pixel-button flex items-center gap-2 text-2xs py-2 px-3"
              title="Load Map"
              onClick={() => setShowMapBrowser(true)}
            >
              <IconFolder size={12} />
              <span className="hidden sm:inline">Load</span>
            </button>

            {/* Test button */}
            <button
              className="pixel-button flex items-center gap-2 text-2xs py-2 px-3"
              title="Test Play (F5)"
            >
              <IconPlay size={12} />
              <span className="hidden sm:inline">Test</span>
            </button>

            {/* Save button */}
            <button
              className="pixel-button flex items-center gap-2 text-2xs py-2 px-3 bg-accent-green"
              title="Save (Ctrl+S)"
              onClick={handleSave}
              disabled={isSaving}
            >
              <IconSave size={12} />
              <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Left: Tile Palette */}
        <div className="pointer-events-auto absolute left-3 top-20 bottom-3 flex flex-col gap-3">
          <TilePalette />
        </div>

        {/* Right: Properties & Camera Controls */}
        <div className="pointer-events-auto absolute right-3 top-20 flex flex-col gap-3 max-h-[calc(100vh-6rem)] overflow-y-auto">
          {/* Camera Controls */}
          <CameraControlsUI state={camera} onStateChange={setCamera} />

          {/* Map Size Panel */}
          <div className="pixel-panel w-48">
            <div className="flex items-center justify-between mb-3">
              <span className="font-pixel text-3xs text-foreground-muted/50 uppercase tracking-wide">
                Map Size
              </span>
              <button
                onClick={() => setShowSizeDialog(!showSizeDialog)}
                className="font-pixel text-3xs text-primary hover:text-primary-hover"
              >
                {showSizeDialog ? "Close" : "Edit"}
              </button>
            </div>

            <div className="text-2xs text-foreground mb-2">
              <span className="text-foreground-muted">Current: </span>
              <span className="font-pixel">{width} x {height}</span>
              <span className="text-foreground-muted ml-1">({tileCount} tiles)</span>
            </div>

            {showSizeDialog && (
              <div className="mt-3 pt-3 border-t border-border space-y-3">
                {/* Presets */}
                <div className="grid grid-cols-2 gap-1">
                  {SIZE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => handleSizeChange(preset.width, preset.height)}
                      className={`font-pixel text-3xs py-1.5 transition-colors ${
                        width === preset.width && height === preset.height
                          ? "bg-primary text-foreground"
                          : "bg-background-tertiary text-foreground-muted hover:bg-primary/50"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Custom size inputs */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-3xs text-foreground-muted w-8">W:</label>
                    <input
                      type="number"
                      min={5}
                      max={50}
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Number(e.target.value))}
                      className="flex-1 bg-background-tertiary text-foreground text-2xs px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-3xs text-foreground-muted w-8">H:</label>
                    <input
                      type="number"
                      min={5}
                      max={50}
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Number(e.target.value))}
                      className="flex-1 bg-background-tertiary text-foreground text-2xs px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <button
                    onClick={() => handleSizeChange(customWidth, customHeight)}
                    className="pixel-button text-3xs w-full py-1"
                  >
                    Apply Size
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Properties Panel */}
          <div className="pixel-panel w-48">
            <span className="font-pixel text-3xs text-foreground-muted/50 uppercase tracking-wide">
              Status
            </span>
            <div className="space-y-2 text-2xs mt-3">
              <div className="flex justify-between text-foreground-muted">
                <span>Spawn:</span>
                <span className={hasSpawn ? "text-accent-green" : "text-danger"}>
                  {hasSpawn ? "Set" : "Missing"}
                </span>
              </div>
              <div className="flex justify-between text-foreground-muted">
                <span>Exit:</span>
                <span className={hasExit ? "text-accent-green" : "text-danger"}>
                  {hasExit ? "Set" : "Missing"}
                </span>
              </div>
              <div className="flex justify-between text-foreground-muted">
                <span>Waypoints:</span>
                <span className="text-foreground">{waypointCount}</span>
              </div>

              <div className="border-t border-border my-2 pt-2" />

              {/* Validation */}
              <div className="space-y-1">
                <ValidationItem label="Spawn point" valid={hasSpawn} />
                <ValidationItem label="Exit point" valid={hasExit} />
                <ValidationItem label="Path defined" valid={waypointCount >= 2} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Status bar */}
        <div className="pointer-events-auto absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="pixel-panel py-1.5 px-4">
            <p className="font-pixel text-3xs text-foreground-muted">
              <span className="text-foreground">Left-drag</span> rotate &nbsp;|&nbsp;
              <span className="text-foreground">Right-drag</span> pan &nbsp;|&nbsp;
              <span className="text-foreground">Scroll</span> zoom &nbsp;|&nbsp;
              <span className="text-foreground">P</span> paint &nbsp;|&nbsp;
              <span className="text-foreground">H/J</span> height
            </p>
          </div>
        </div>
      </div>

      {/* Map Browser Modal */}
      {showMapBrowser && (
        <MapBrowser
          maps={savedMaps}
          currentMapId={currentMapId}
          onClose={() => setShowMapBrowser(false)}
          onLoadMap={handleLoadMap}
          onNewMap={handleNewMap}
          onDeleteMap={handleDeleteMap}
        />
      )}

      {/* Generate Map Dialog */}
      {showGenerateDialog && (
        <GenerateMapDialog
          onClose={() => setShowGenerateDialog(false)}
          onGenerate={handleGenerateMap}
        />
      )}
    </div>
  );
}

function ValidationItem({ label, valid }: { label: string; valid: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2 h-2 flex-shrink-0 ${valid ? "bg-accent-green" : "bg-danger"}`}
      />
      <span className={`text-2xs ${valid ? "text-foreground-muted" : "text-danger"}`}>
        {label}
      </span>
    </div>
  );
}
