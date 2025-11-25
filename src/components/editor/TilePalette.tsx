import { useEditorStore } from "@/stores/editorStore";
import { TileType } from "@/types/map";

const TILE_OPTIONS: Array<{ type: TileType; label: string; color: string }> = [
  { type: TileType.Ground, label: "Ground", color: "#4ecca3" },
  { type: TileType.Path, label: "Path", color: "#8b7355" },
  { type: TileType.Water, label: "Water", color: "#00d9ff" },
  { type: TileType.Blocked, label: "Blocked", color: "#444444" },
  { type: TileType.Spawn, label: "Spawn", color: "#e94560" },
  { type: TileType.Exit, label: "Exit", color: "#ffd700" },
];

export function TilePalette() {
  const { selectedTileType, setSelectedTileType } = useEditorStore();

  return (
    <div className="pixel-panel w-24">
      <h3 className="font-pixel text-2xs text-foreground mb-3">Tiles</h3>
      <div className="flex flex-col gap-2">
        {TILE_OPTIONS.map(({ type, label, color }) => (
          <button
            key={type}
            onClick={() => setSelectedTileType(type)}
            className={`flex items-center gap-2 p-2 transition-colors ${
              selectedTileType === type
                ? "bg-primary"
                : "hover:bg-background-tertiary"
            }`}
          >
            <div
              className="h-4 w-4 border border-foreground-muted"
              style={{ backgroundColor: color }}
            />
            <span className="text-2xs text-foreground-muted">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
