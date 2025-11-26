import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { GameView } from "@/components/game/GameView";
import { useMapStore } from "@/stores/mapStore";

export const Route = createFileRoute("/play")({
  component: PlayPage,
});

function PlayPage() {
  const loadedMap = useMapStore((s) => s.loadedMap);
  const navigate = useNavigate();

  // Redirect to map select if no map is loaded
  useEffect(() => {
    if (!loadedMap) {
      navigate({ to: "/map-select" });
    }
  }, [loadedMap, navigate]);

  // Show loading while redirecting
  if (!loadedMap) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="pixel-panel p-6">
          <p className="font-pixel text-sm text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <GameView />;
}
