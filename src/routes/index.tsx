import { createFileRoute } from "@tanstack/react-router";
import { MainMenu } from "@/components/ui/MainMenu";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <MainMenu />;
}
