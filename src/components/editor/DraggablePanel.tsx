import { ReactNode, useState, useRef, useEffect } from "react";

interface DraggablePanelProps {
  title: string;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultCollapsed?: boolean;
  className?: string;
  width?: string;
}

export function DraggablePanel({
  title,
  children,
  defaultPosition = { x: 0, y: 0 },
  defaultCollapsed = false,
  className = "",
  width,
}: DraggablePanelProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!panelRef.current) return;

    const rect = panelRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!panelRef.current) return;

      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      // Keep panel within viewport bounds
      const panelRect = panelRef.current.getBoundingClientRect();
      const maxX = viewport.width - panelRect.width;
      const maxY = viewport.height - panelRect.height;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={panelRef}
      className={className}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        userSelect: "none",
        width: width || "auto",
        zIndex: isDragging ? 1000 : 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header - Separate from content */}
      <div
        className="pixel-panel flex items-center justify-between cursor-grab active:cursor-grabbing bg-background border-b border-border"
        onMouseDown={handleMouseDown}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <span className="font-pixel text-3xs text-foreground-muted/50 uppercase tracking-wide">
          {title}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed(!collapsed);
          }}
          className="font-pixel text-2xs text-primary hover:text-primary-hover px-2 py-0.5 bg-background-secondary hover:bg-background-tertiary transition-colors"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "+" : "−"}
        </button>
      </div>

      {/* Content - Separate scrollable container */}
      {!collapsed && (
        <div
          className="pixel-panel"
          style={{
            maxHeight: "calc(100vh - 6rem)",
            overflowY: "auto",
            marginTop: "2px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
