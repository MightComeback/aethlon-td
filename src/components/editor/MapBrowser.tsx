import { IconClose, IconPlus, IconTrash } from "@/components/ui/PixelIcon";
import type { MapMetadata } from "@/types/map";

interface MapBrowserProps {
  maps: MapMetadata[];
  currentMapId: string | null;
  onClose: () => void;
  onLoadMap: (id: string) => void;
  onNewMap: () => void;
  onDeleteMap: (id: string) => void;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function MapBrowser({
  maps,
  currentMapId,
  onClose,
  onLoadMap,
  onNewMap,
  onDeleteMap,
}: MapBrowserProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="pixel-panel w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
          <h2 className="font-pixel text-sm text-foreground">Maps</h2>
          <button
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <IconClose size={16} />
          </button>
        </div>

        {/* New Map Button */}
        <button
          onClick={onNewMap}
          className="pixel-button flex items-center justify-center gap-2 text-2xs py-2 px-3 mb-3 w-full bg-accent-green"
        >
          <IconPlus size={12} />
          <span>New Map</span>
        </button>

        {/* Maps List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {maps.length === 0 ? (
            <div className="text-center py-8 text-foreground-muted text-2xs">
              No saved maps yet. Create your first map!
            </div>
          ) : (
            <div className="space-y-2">
              {maps.map((map) => (
                <div
                  key={map.id}
                  className={`pixel-panel-inner flex items-center justify-between p-2 cursor-pointer transition-colors ${
                    currentMapId === map.id
                      ? "bg-primary/20 border-primary"
                      : "hover:bg-background-tertiary"
                  }`}
                  onClick={() => onLoadMap(map.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-2xs text-foreground truncate">
                        {map.name}
                      </span>
                      {currentMapId === map.id && (
                        <span className="text-3xs text-primary">(current)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-3xs text-foreground-muted mt-1">
                      <span>{map.width} x {map.height}</span>
                      <span>{formatDate(map.createdAt)}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete "${map.name}"?`)) {
                        onDeleteMap(map.id);
                      }
                    }}
                    className="p-1.5 text-foreground-muted hover:text-danger transition-colors"
                    title="Delete map"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-3 mt-3">
          <p className="text-3xs text-foreground-muted text-center">
            {maps.length} map{maps.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </div>
    </div>
  );
}
