import { useEditorStore } from "@/stores/editorStore";

export type EditorTool = "paint" | "erase" | "select" | "path";

export function EditorToolbar() {
  const { currentTool, setTool } = useEditorStore();

  return (
    <div className="pixel-panel flex items-center gap-2 py-2 px-4">
      <ToolButton
        tool="select"
        label="Select"
        icon="S"
        current={currentTool}
        onClick={setTool}
      />
      <ToolButton
        tool="paint"
        label="Paint"
        icon="P"
        current={currentTool}
        onClick={setTool}
      />
      <ToolButton
        tool="erase"
        label="Erase"
        icon="E"
        current={currentTool}
        onClick={setTool}
      />
      <ToolButton
        tool="path"
        label="Path"
        icon="L"
        current={currentTool}
        onClick={setTool}
      />
    </div>
  );
}

interface ToolButtonProps {
  tool: EditorTool;
  label: string;
  icon: string;
  current: EditorTool;
  onClick: (tool: EditorTool) => void;
}

function ToolButton({ tool, label, icon, current, onClick }: ToolButtonProps) {
  const isActive = tool === current;

  return (
    <button
      onClick={() => onClick(tool)}
      className={`flex flex-col items-center p-2 transition-colors ${
        isActive
          ? "bg-primary text-foreground"
          : "hover:bg-background-tertiary text-foreground-muted"
      }`}
      title={label}
    >
      <span className="font-pixel text-xs">{icon}</span>
    </button>
  );
}
