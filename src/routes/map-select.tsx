import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/services/database";
import { MapStorage } from "@/services/storage/MapStorage";
import { useMapStore } from "@/stores/mapStore";
import { useGameStore } from "@/stores/gameStore";
import { useWeatherStore } from "@/stores/weatherStore";
import type { MapMetadata } from "@/types/map";

export const Route = createFileRoute("/map-select")({
  component: MapSelectPage,
});

function MapSelectPage() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [maps, setMaps] = useState<MapMetadata[]>([]);
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const loadMap = useMapStore((s) => s.loadMap);
  const startGame = useGameStore((s) => s.startGame);
  const loadMapConfig = useWeatherStore((s) => s.loadMapConfig);

  // Initialize database
  useEffect(() => {
    db.initialize().then(() => {
      setIsDbReady(true);
    });
  }, []);

  // Load maps when db is ready
  useEffect(() => {
    if (isDbReady) {
      MapStorage.getAllMaps().then((allMaps) => {
        setMaps(allMaps);
      });
    }
  }, [isDbReady]);

  const handleSelectMap = async (mapId: string) => {
    setSelectedMapId(mapId);
    setIsLoading(true);

    // Load map into mapStore
    const success = await loadMap(mapId);

    if (success) {
      // Get the full map data from the store
      const mapData = useMapStore.getState().loadedMap;

      if (mapData) {
        // Initialize game state
        startGame(mapId, mapData);

        // Load weather configuration
        loadMapConfig(mapData.weather);

        // Navigate to play
        navigate({ to: "/play" });
      }
    } else {
      setIsLoading(false);
      setSelectedMapId(null);
    }
  };

  if (!isDbReady) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="pixel-panel p-6">
          <p className="font-pixel text-sm text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground-muted p-4">
        <Link to="/" className="pixel-button text-2xs">
          Back
        </Link>
        <h1 className="font-pixel text-lg text-foreground">Select Map</h1>
        <div className="w-16" /> {/* Spacer for alignment */}
      </div>

      {/* Map Grid */}
      <div className="flex-1 overflow-auto p-6">
        {maps.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="text-foreground-muted">No maps found</p>
            <Link to="/editor" className="pixel-button">
              Create a Map
            </Link>
          </div>
        ) : (
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {maps.map((map) => (
              <MapCard
                key={map.id}
                map={map}
                isSelected={selectedMapId === map.id}
                isLoading={isLoading && selectedMapId === map.id}
                onSelect={() => handleSelectMap(map.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface MapCardProps {
  map: MapMetadata;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: () => void;
}

function MapCard({ map, isSelected, isLoading, onSelect }: MapCardProps) {
  const formattedDate = new Date(map.createdAt).toLocaleDateString();

  return (
    <button
      onClick={onSelect}
      disabled={isLoading}
      className={`pixel-panel flex flex-col gap-2 p-4 text-left transition-all hover:bg-background-tertiary ${
        isSelected ? "ring-2 ring-accent-green" : ""
      } ${isLoading ? "opacity-50" : ""}`}
    >
      {/* Map preview placeholder */}
      <div className="flex h-24 w-full items-center justify-center bg-background-tertiary">
        <span className="font-pixel text-2xs text-foreground-muted">
          {map.width}x{map.height}
        </span>
      </div>

      {/* Map info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-pixel text-sm text-foreground">{map.name}</h3>
        <div className="flex items-center justify-between text-2xs text-foreground-muted">
          <span>{map.isCustom ? "Custom" : "Default"}</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="mt-2 text-center">
          <span className="font-pixel text-2xs text-accent-green">
            Loading...
          </span>
        </div>
      )}
    </button>
  );
}
