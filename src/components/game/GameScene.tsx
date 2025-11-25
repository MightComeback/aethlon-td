import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { IsometricGrid } from "./IsometricGrid";
import {
  CommanderController,
  CommanderClickHandler,
} from "./commander";
import { useGameStore } from "@/stores/gameStore";
import { useEditorStore } from "@/stores/editorStore";

export function GameScene() {
  const groupRef = useRef<Group>(null);

  // Get map dimensions from editor store (or use defaults)
  const mapWidth = useEditorStore((s) => s.width) || 10;
  const mapHeight = useEditorStore((s) => s.height) || 10;

  // Initialize commander position
  const initCommander = useGameStore((s) => s.initCommander);

  useEffect(() => {
    // Initialize commander at center of map
    initCommander(mapWidth / 2, mapHeight / 2);
  }, [initCommander, mapWidth, mapHeight]);

  useFrame(() => {
    // Game loop updates will go here
  });

  return (
    <group ref={groupRef}>
      {/* Isometric rotation for 2.5D view */}
      <group rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
        <IsometricGrid width={mapWidth} height={mapHeight} />

        {/* Commander */}
        <CommanderController mapWidth={mapWidth} mapHeight={mapHeight} />

        {/* Click handler for commander movement */}
        <CommanderClickHandler mapWidth={mapWidth} mapHeight={mapHeight} />
      </group>
    </group>
  );
}
