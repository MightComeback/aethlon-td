import { createFileRoute } from "@tanstack/react-router";
import { MapEditor } from "@/components/editor/MapEditor";

export const Route = createFileRoute("/editor")({
  component: EditorPage,
});

function EditorPage() {
  return <MapEditor />;
}
