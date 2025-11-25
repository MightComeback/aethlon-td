import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useProfileStore } from "@/stores/profileStore";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const profile = useProfileStore((s) => s.profile);
  const isLoaded = useProfileStore((s) => s.isLoaded);
  const isLoading = useProfileStore((s) => s.isLoading);
  const loadProfile = useProfileStore((s) => s.loadProfile);

  // Load profile on mount
  useEffect(() => {
    if (!isLoaded && !isLoading) {
      loadProfile();
    }
  }, [isLoaded, isLoading, loadProfile]);

  if (isLoading || !isLoaded) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-background">
        <div className="font-pixel text-xl text-foreground-muted">
          Loading Profile...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-background">
        <div className="font-pixel text-xl text-foreground-muted mb-8">
          No Profile Found
        </div>
        <Link to="/" className="pixel-button">
          Back to Menu
        </Link>
      </div>
    );
  }

  const { progression, stats } = profile;
  const xpProgress = (progression.currentXP / progression.xpToNextLevel) * 100;

  // Format play time
  const formatPlayTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  // Format large numbers
  const formatNumber = (n: number): string => {
    if (n >= 1000000) {
      return `${(n / 1000000).toFixed(1)}M`;
    }
    if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}K`;
    }
    return n.toLocaleString();
  };

  const winRate =
    stats.totalGamesPlayed > 0
      ? Math.round((stats.totalGamesWon / stats.totalGamesPlayed) * 100)
      : 0;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background p-8">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="font-pixel text-4xl text-accent-gold text-shadow-pixel">
          COMMANDER PROFILE
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 max-w-4xl w-full">
        {/* Left Panel - Profile Info */}
        <div className="pixel-panel flex-1 p-6">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-accent-blue to-accent-blue/50 flex items-center justify-center border-2 border-foreground-muted/30">
              <span className="font-pixel text-4xl text-white">C</span>
            </div>
            <div className="flex-1">
              <h2 className="font-pixel text-2xl text-foreground">
                {profile.name}
              </h2>
              <div className="text-sm text-accent-gold font-pixel">
                Level {progression.level}
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-foreground-muted mb-1">
              <span>Experience</span>
              <span>
                {progression.currentXP} / {progression.xpToNextLevel} XP
              </span>
            </div>
            <div className="h-4 bg-background-elevated rounded-sm border border-foreground-muted/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-green to-accent-green/70 transition-all duration-300"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="text-xs text-foreground-muted/60 mt-1">
              Total XP Earned: {formatNumber(stats.totalXPEarned)}
            </div>
          </div>

          {/* Play Time */}
          <div className="pt-4 border-t border-foreground-muted/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground-muted">Total Play Time</span>
              <span className="font-pixel text-lg text-foreground">
                {formatPlayTime(stats.totalPlayTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel - Stats */}
        <div className="pixel-panel flex-1 p-6">
          <h3 className="font-pixel text-sm text-foreground mb-4">
            COMBAT STATS
          </h3>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatBox
              label="Enemies Killed"
              value={formatNumber(stats.totalEnemiesKilled)}
              color="text-error"
            />
            <StatBox
              label="Total Damage"
              value={formatNumber(stats.totalDamageDealt)}
              color="text-warning"
            />
            <StatBox
              label="Towers Built"
              value={formatNumber(stats.totalTowersPlaced)}
              color="text-accent-blue"
            />
            <StatBox
              label="Towers Merged"
              value={formatNumber(stats.totalTowersMerged)}
              color="text-accent-purple"
            />
          </div>

          <h3 className="font-pixel text-sm text-foreground mb-4 pt-4 border-t border-foreground-muted/20">
            GAME STATS
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatBox
              label="Waves Cleared"
              value={stats.totalWavesCompleted.toString()}
              color="text-accent-green"
            />
            <StatBox
              label="Best Wave"
              value={stats.longestSurvivalWave.toString()}
              color="text-accent-gold"
            />
            <StatBox
              label="Games Played"
              value={stats.totalGamesPlayed.toString()}
              color="text-foreground"
            />
            <StatBox
              label="Games Won"
              value={stats.totalGamesWon.toString()}
              color="text-accent-green"
            />
          </div>

          {/* Win Rate */}
          <div className="pt-4 border-t border-foreground-muted/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground-muted">Win Rate</span>
              <span
                className={`font-pixel text-xl ${
                  winRate >= 50 ? "text-accent-green" : "text-warning"
                }`}
              >
                {winRate}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Economy Stats */}
      <div className="pixel-panel max-w-4xl w-full mt-6 p-6">
        <h3 className="font-pixel text-sm text-foreground mb-4">
          ECONOMY
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <StatBox
            label="Currency Earned"
            value={formatNumber(stats.totalCurrencyEarned)}
            color="text-accent-gold"
            small
          />
          <StatBox
            label="Currency Spent"
            value={formatNumber(stats.totalCurrencySpent)}
            color="text-warning"
            small
          />
          <StatBox
            label="Net Profit"
            value={formatNumber(stats.totalCurrencyEarned - stats.totalCurrencySpent)}
            color={
              stats.totalCurrencyEarned >= stats.totalCurrencySpent
                ? "text-accent-green"
                : "text-error"
            }
            small
          />
          <StatBox
            label="Avg Per Game"
            value={
              stats.totalGamesPlayed > 0
                ? formatNumber(
                    Math.round(stats.totalCurrencyEarned / stats.totalGamesPlayed)
                  )
                : "0"
            }
            color="text-foreground"
            small
          />
        </div>
      </div>

      {/* Back Button */}
      <Link to="/" className="pixel-button mt-8">
        Back to Menu
      </Link>
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  color?: string;
  small?: boolean;
}

function StatBox({ label, value, color = "text-foreground", small }: StatBoxProps) {
  return (
    <div className="bg-background-elevated/50 rounded-sm p-3 border border-foreground-muted/20">
      <div className={`font-pixel ${small ? "text-lg" : "text-2xl"} ${color}`}>
        {value}
      </div>
      <div className="text-xs text-foreground-muted">{label}</div>
    </div>
  );
}
