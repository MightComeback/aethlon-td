import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FPSCounter } from "@/components/ui/FPSCounter";
import { useAppInit } from "@/hooks/useAppInit";
import "../styles/globals.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aethlon" },
      { name: "description", content: "Aethlon - A 2.5D tower defense game" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppContent />
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}

function AppContent() {
  const { isReady, error } = useAppInit();

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-pixel text-2xl text-error mb-4">
            Initialization Error
          </h1>
          <p className="text-foreground-muted">{error}</p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-pixel text-2xl text-accent-gold text-shadow-pixel mb-4">
            AETHLON
          </h1>
          <p className="text-foreground-muted animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FPSCounter />
      <div id="root" className="h-full w-full">
        <Outlet />
      </div>
    </>
  );
}
