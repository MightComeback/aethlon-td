import { createFileRoute } from "@tanstack/react-router";
import { MapEditor } from "@/components/editor/MapEditor";
import { db } from "@/services/database";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/editor")({
  component: EditorPage,
});

function EditorPage() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    db.initialize().then(() => {
      setIsDbReady(true);
    });
  }, []);

  if (!isDbReady) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="pixel-panel p-6">
          <p className="font-pixel text-foreground text-sm">Loading editor...</p>
        </div>
      </div>
    );
  }

  return <MapEditor />;
}
