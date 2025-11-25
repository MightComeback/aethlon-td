import { useEffect } from "react";
import { useEditorStore, type EditorTool } from "@/stores/editorStore";
import {
  IconSelect,
  IconPaint,
  IconErase,
  IconPath,
  IconWaypoint,
  IconFill,
  IconHeightRaise,
  IconHeightLower,
  IconUndo,
  IconRedo,
  type PixelIconName,
} from "@/components/ui/PixelIcon";

interface ToolConfig {
  tool: EditorTool;
  label: string;
  shortcut: string;
  icon: PixelIconName;
}

const TOOLS: ToolConfig[] = [
  { tool: "select", label: "Select", shortcut: "S", icon: "select" },
  { tool: "paint", label: "Paint", shortcut: "P", icon: "paint" },
  { tool: "erase", label: "Erase", shortcut: "E", icon: "erase" },
  { tool: "path", label: "Path", shortcut: "L", icon: "path" },
  { tool: "waypoint", label: "Waypoint", shortcut: "W", icon: "waypoint" },
  { tool: "fill", label: "Fill", shortcut: "F", icon: "fill" },
  { tool: "height_raise", label: "Raise", shortcut: "H", icon: "height_raise" },
  { tool: "height_lower", label: "Lower", shortcut: "J", icon: "height_lower" },
];

const TOOL_ICONS: Record<EditorTool, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  select: IconSelect,
  paint: IconPaint,
  erase: IconErase,
  path: IconPath,
  waypoint: IconWaypoint,
  fill: IconFill,
  height_raise: IconHeightRaise,
  height_lower: IconHeightLower,
};

export function EditorToolbar() {
  const { currentTool, setTool, undo, redo, historyIndex, history } =
    useEditorStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Undo/Redo
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          return;
        }
        if (e.key === "y") {
          e.preventDefault();
          redo();
          return;
        }
      }

      // Tool shortcuts
      const key = e.key.toUpperCase();
      const toolConfig = TOOLS.find((t) => t.shortcut === key);
      if (toolConfig) {
        setTool(toolConfig.tool);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTool, undo, redo]);

  return (
    <div className="pixel-panel flex items-center gap-1 py-1 px-2">
      {/* Tool buttons */}
      <div className="flex items-center gap-1">
        {TOOLS.map((config) => (
          <ToolButton
            key={config.tool}
            {...config}
            isActive={currentTool === config.tool}
            onClick={() => setTool(config.tool)}
          />
        ))}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-border mx-2" />

      {/* History buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`pixel-button-icon ${!canUndo ? "opacity-30" : ""}`}
          title="Undo (Ctrl+Z)"
        >
          <IconUndo size={16} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`pixel-button-icon ${!canRedo ? "opacity-30" : ""}`}
          title="Redo (Ctrl+Y)"
        >
          <IconRedo size={16} />
        </button>
      </div>
    </div>
  );
}

interface ToolButtonProps extends ToolConfig {
  isActive: boolean;
  onClick: () => void;
}

function ToolButton({
  tool,
  label,
  shortcut,
  isActive,
  onClick,
}: ToolButtonProps) {
  const Icon = TOOL_ICONS[tool];

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-8 h-8 transition-colors ${
        isActive
          ? "bg-primary text-foreground"
          : "hover:bg-background-tertiary text-foreground-muted"
      }`}
      title={`${label} (${shortcut})`}
    >
      <Icon size={16} />
      {/* Shortcut indicator */}
      <span className="absolute bottom-0 right-0.5 font-pixel text-3xs opacity-50">
        {shortcut}
      </span>
    </button>
  );
}
