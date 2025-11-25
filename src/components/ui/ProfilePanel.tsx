/**
 * Profile Panel
 * Displays commander profile, stats, and progression
 */

import { useProfileStore } from "@/stores/profileStore";

interface ProfilePanelProps {
  compact?: boolean;
}

export function ProfilePanel({ compact = false }: ProfilePanelProps) {
  const profile = useProfileStore((s) => s.profile);
  const isLoaded = useProfileStore((s) => s.isLoaded);

  if (!isLoaded || !profile) {
    return (
      <div className="profile-panel loading">
        <span>Loading profile...</span>
      </div>
    );
  }

  const { progression, stats } = profile;
  const xpProgress = (progression.currentXP / progression.xpToNextLevel) * 100;

  // Format play time
  const formatPlayTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Format large numbers
  const formatNumber = (n: number): string => {
    if (n >= 1000000) {
      return `${(n / 1000000).toFixed(1)}M`;
    }
    if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}K`;
    }
    return n.toString();
  };

  if (compact) {
    return (
      <div className="profile-panel compact">
        <div className="profile-header">
          <span className="profile-name">{profile.name}</span>
          <span className="profile-level">Lv.{progression.level}</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpProgress}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-panel">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-icon">C</div>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">{profile.name}</h3>
          <div className="profile-level">Level {progression.level}</div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="xp-section">
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpProgress}%` }} />
        </div>
        <div className="xp-text">
          {progression.currentXP} / {progression.xpToNextLevel} XP
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{formatNumber(stats.totalEnemiesKilled)}</span>
          <span className="stat-label">Enemies</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(stats.totalDamageDealt)}</span>
          <span className="stat-label">Damage</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.totalWavesCompleted}</span>
          <span className="stat-label">Waves</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.totalGamesWon}</span>
          <span className="stat-label">Wins</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.totalTowersPlaced}</span>
          <span className="stat-label">Towers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatPlayTime(stats.totalPlayTime)}</span>
          <span className="stat-label">Play Time</span>
        </div>
      </div>

      {/* Records */}
      <div className="records-section">
        <h4>Records</h4>
        <div className="record-item">
          <span>Longest Wave:</span>
          <span>{stats.longestSurvivalWave}</span>
        </div>
        <div className="record-item">
          <span>Games Played:</span>
          <span>{stats.totalGamesPlayed}</span>
        </div>
        <div className="record-item">
          <span>Win Rate:</span>
          <span>
            {stats.totalGamesPlayed > 0
              ? Math.round((stats.totalGamesWon / stats.totalGamesPlayed) * 100)
              : 0}
            %
          </span>
        </div>
      </div>

      <style>{`
        .profile-panel {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #333;
          border-radius: 8px;
          padding: 16px;
          color: #fff;
          font-family: system-ui, -apple-system, sans-serif;
          min-width: 240px;
        }

        .profile-panel.compact {
          padding: 8px 12px;
          min-width: auto;
        }

        .profile-panel.loading {
          opacity: 0.7;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .compact .profile-header {
          margin-bottom: 4px;
          gap: 8px;
        }

        .profile-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3182ce, #2c5282);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-icon {
          font-size: 24px;
          font-weight: bold;
          color: white;
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 16px;
          font-weight: bold;
          margin: 0;
        }

        .profile-level {
          font-size: 12px;
          color: #a0aec0;
        }

        .compact .profile-level {
          background: #3182ce;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          color: white;
        }

        .xp-section {
          margin-bottom: 16px;
        }

        .xp-bar {
          height: 6px;
          background: #2d3748;
          border-radius: 3px;
          overflow: hidden;
        }

        .compact .xp-bar {
          height: 4px;
        }

        .xp-fill {
          height: 100%;
          background: linear-gradient(90deg, #48bb78, #38a169);
          transition: width 0.3s ease;
        }

        .xp-text {
          font-size: 11px;
          color: #a0aec0;
          text-align: right;
          margin-top: 4px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
        }

        .stat-label {
          display: block;
          font-size: 10px;
          color: #718096;
          text-transform: uppercase;
        }

        .records-section h4 {
          font-size: 12px;
          color: #a0aec0;
          margin: 0 0 8px 0;
          text-transform: uppercase;
        }

        .record-item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding: 4px 0;
          border-bottom: 1px solid #2d3748;
        }

        .record-item:last-child {
          border-bottom: none;
        }

        .record-item span:first-child {
          color: #a0aec0;
        }

        .record-item span:last-child {
          color: #fff;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

export default ProfilePanel;
