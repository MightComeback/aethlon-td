import { createFileRoute } from "@tanstack/react-router";
import { GameView } from "@/components/game/GameView";

export const Route = createFileRoute("/play")({
  component: PlayPage,
});

function PlayPage() {
  return <GameView />;
}
