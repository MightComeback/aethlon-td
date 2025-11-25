import { useEffect, useState, useCallback } from "react";
import { useEditorStore, type PlaceableObjectType } from "@/stores/editorStore";
import { OBJECT_METADATA } from "./EditorObjects";

interface CursorPosition {
  x: number;
  y: number;
}

/**
 * Virtual cursor that shows selected object preview near the mouse
 */
export function VirtualCursor() {
  const { currentTool, selectedObjectType } = useEditorStore();
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Only show virtual cursor when placing objects
  const showCursor = currentTool === "object_place" || currentTool === "object_remove";

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (showCursor) {
      document.body.classList.add("cursor-hidden");
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseenter", handleMouseEnter);
      window.addEventListener("mouseleave", handleMouseLeave);
      setIsVisible(true);
    } else {
      document.body.classList.remove("cursor-hidden");
      setIsVisible(false);
    }

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showCursor, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (!showCursor || !isVisible) {
    return null;
  }

  const objectInfo = OBJECT_METADATA[selectedObjectType];
  const isRemoveMode = currentTool === "object_remove";

  return (
    <div
      className="virtual-cursor"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {/* Cursor dot */}
      <div className="virtual-cursor-dot" />

      {/* Preview label */}
      <div className="virtual-cursor-preview">
        {isRemoveMode ? (
          <span className="text-danger">- Remove</span>
        ) : (
          <span style={{ color: objectInfo?.color || "#fff" }}>
            + {objectInfo?.label || selectedObjectType}
          </span>
        )}
      </div>
    </div>
  );
}
