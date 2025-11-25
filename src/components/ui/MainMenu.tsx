import { Link } from "@tanstack/react-router";

export function MainMenu() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background">
      {/* Title */}
      <div className="mb-16 text-center">
        <h1 className="font-pixel text-4xl text-primary text-shadow-pixel mb-4">
          MIGHTY
        </h1>
        <h1 className="font-pixel text-5xl text-accent-gold text-shadow-pixel">
          DEFENSE
        </h1>
        <p className="mt-4 text-foreground-muted text-sm">
          A 2.5D Tower Defense Experience
        </p>
      </div>

      {/* Menu Buttons */}
      <nav className="flex flex-col gap-4 w-64">
        <MenuButton to="/play">Play</MenuButton>
        <MenuButton to="/editor">Map Editor</MenuButton>
        <MenuButton to="/collection" disabled>
          Collection
        </MenuButton>
        <MenuButton to="/settings" disabled>
          Settings
        </MenuButton>
      </nav>

      {/* Version */}
      <p className="absolute bottom-4 text-foreground-muted text-xs">
        v0.1.0 - Development Build
      </p>
    </div>
  );
}

interface MenuButtonProps {
  to: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function MenuButton({ to, children, disabled }: MenuButtonProps) {
  if (disabled) {
    return (
      <button
        disabled
        className="pixel-button w-full text-center opacity-50 cursor-not-allowed"
      >
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className="pixel-button w-full text-center block">
      {children}
    </Link>
  );
}
