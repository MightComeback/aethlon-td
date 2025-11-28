import { CSSProperties, useMemo } from 'react';

export type ResourceType = 'gold' | 'gems' | 'lives' | 'mana' | 'xp' | 'wave';

export interface ResourceBadgeProps {
  /** Resource type */
  type: ResourceType;
  /** Resource value */
  value: number;
  /** Max value (for showing as fraction or bar) */
  maxValue?: number;
  /** Show as bar instead of text */
  showBar?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Show change animation */
  animate?: boolean;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Resource icon and color configuration
 */
const RESOURCE_CONFIG: Record<
  ResourceType,
  {
    icon: string;
    color: string;
    bgColor: string;
    label: string;
  }
> = {
  gold: {
    icon: '🪙',
    color: '#ffd700',
    bgColor: 'rgba(255, 215, 0, 0.2)',
    label: 'Gold',
  },
  gems: {
    icon: '💎',
    color: '#88ddff',
    bgColor: 'rgba(136, 221, 255, 0.2)',
    label: 'Gems',
  },
  lives: {
    icon: '❤️',
    color: '#ff4444',
    bgColor: 'rgba(255, 68, 68, 0.2)',
    label: 'Lives',
  },
  mana: {
    icon: '✨',
    color: '#aa88ff',
    bgColor: 'rgba(170, 136, 255, 0.2)',
    label: 'Mana',
  },
  xp: {
    icon: '⭐',
    color: '#88ff88',
    bgColor: 'rgba(136, 255, 136, 0.2)',
    label: 'XP',
  },
  wave: {
    icon: '🌊',
    color: '#4488ff',
    bgColor: 'rgba(68, 136, 255, 0.2)',
    label: 'Wave',
  },
};

const SIZE_CONFIG = {
  small: {
    fontSize: '12px',
    iconSize: '14px',
    padding: '2px 6px',
    gap: '4px',
    minWidth: '48px',
  },
  medium: {
    fontSize: '14px',
    iconSize: '18px',
    padding: '4px 10px',
    gap: '6px',
    minWidth: '64px',
  },
  large: {
    fontSize: '18px',
    iconSize: '24px',
    padding: '6px 14px',
    gap: '8px',
    minWidth: '80px',
  },
};

/**
 * Displays a resource type with icon and value
 */
export function ResourceBadge({
  type,
  value,
  maxValue,
  showBar = false,
  size = 'medium',
  animate = false,
  className = '',
  style = {},
}: ResourceBadgeProps) {
  const config = RESOURCE_CONFIG[type];
  const sizeConfig = SIZE_CONFIG[size];

  const formattedValue = useMemo(() => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  }, [value]);

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: sizeConfig.gap,
    padding: sizeConfig.padding,
    backgroundColor: config.bgColor,
    borderRadius: '4px',
    border: `1px solid ${config.color}40`,
    minWidth: sizeConfig.minWidth,
    fontFamily: '"Crimson Text", Georgia, serif',
    ...style,
  };

  const iconStyle: CSSProperties = {
    fontSize: sizeConfig.iconSize,
    lineHeight: 1,
  };

  const valueStyle: CSSProperties = {
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: config.color,
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
    transition: animate ? 'all 0.3s ease' : undefined,
  };

  const barContainerStyle: CSSProperties = {
    flex: 1,
    height: size === 'small' ? 6 : size === 'medium' ? 8 : 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '2px',
    overflow: 'hidden',
  };

  const barFillStyle: CSSProperties = {
    height: '100%',
    width: maxValue ? `${(value / maxValue) * 100}%` : '100%',
    backgroundColor: config.color,
    transition: animate ? 'width 0.3s ease' : undefined,
    boxShadow: `0 0 4px ${config.color}`,
  };

  return (
    <div className={`resource-badge resource-badge--${type} ${className}`} style={containerStyle}>
      <span className="resource-badge__icon" style={iconStyle} role="img" aria-label={config.label}>
        {config.icon}
      </span>
      {showBar && maxValue ? (
        <div className="resource-badge__bar" style={barContainerStyle}>
          <div className="resource-badge__bar-fill" style={barFillStyle} />
        </div>
      ) : null}
      <span className="resource-badge__value" style={valueStyle}>
        {maxValue && !showBar ? `${formattedValue}/${maxValue}` : formattedValue}
      </span>
    </div>
  );
}

/**
 * Resource bar showing multiple resources
 */
export interface ResourceBarProps {
  resources: Array<{
    type: ResourceType;
    value: number;
    maxValue?: number;
  }>;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: CSSProperties;
}

export function ResourceBar({
  resources,
  size = 'medium',
  className = '',
  style = {},
}: ResourceBarProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...style,
  };

  return (
    <div className={`resource-bar ${className}`} style={containerStyle}>
      {resources.map((resource) => (
        <ResourceBadge
          key={resource.type}
          type={resource.type}
          value={resource.value}
          maxValue={resource.maxValue}
          size={size}
          animate
        />
      ))}
    </div>
  );
}

/**
 * Compact resource display with just icon and value
 */
export function CompactResource({
  type,
  value,
  size = 'small',
}: {
  type: ResourceType;
  value: number;
  size?: 'small' | 'medium';
}) {
  const config = RESOURCE_CONFIG[type];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        color: config.color,
        fontSize: size === 'small' ? '12px' : '14px',
      }}
    >
      <span role="img" aria-label={config.label}>
        {config.icon}
      </span>
      {value}
    </span>
  );
}

export default ResourceBadge;
