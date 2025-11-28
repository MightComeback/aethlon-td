import React, { useMemo, CSSProperties } from 'react';

export interface NineSliceConfig {
  /** Path to the 9-slice image */
  imagePath: string;
  /** Border sizes [top, right, bottom, left] in pixels */
  borders: [number, number, number, number];
  /** Whether to tile the center or stretch */
  tileCenter?: boolean;
  /** Whether to tile the edges or stretch */
  tileEdges?: boolean;
}

export interface NineSlicePanelProps {
  /** 9-slice configuration */
  config: NineSliceConfig;
  /** Panel width */
  width?: string | number;
  /** Panel height */
  height?: string | number;
  /** Min width */
  minWidth?: string | number;
  /** Min height */
  minHeight?: string | number;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Children content */
  children?: React.ReactNode;
  /** Padding inside the panel (defaults to border sizes) */
  padding?: string | number | [number, number, number, number];
  /** Click handler */
  onClick?: () => void;
}

/**
 * Preset 9-slice configurations for common UI panels
 */
export const PANEL_PRESETS: Record<string, NineSliceConfig> = {
  wood: {
    imagePath: '/assets/ui/frames/panel_wood.png',
    borders: [16, 16, 16, 16],
    tileCenter: true,
    tileEdges: false,
  },
  gold: {
    imagePath: '/assets/ui/frames/panel_gold.png',
    borders: [20, 20, 20, 20],
    tileCenter: false,
    tileEdges: false,
  },
  stone: {
    imagePath: '/assets/ui/frames/panel_stone.png',
    borders: [12, 12, 12, 12],
    tileCenter: true,
    tileEdges: true,
  },
  dark: {
    imagePath: '/assets/ui/frames/panel_dark.png',
    borders: [8, 8, 8, 8],
    tileCenter: false,
    tileEdges: false,
  },
  tooltip: {
    imagePath: '/assets/ui/frames/tooltip.png',
    borders: [6, 6, 6, 6],
    tileCenter: false,
    tileEdges: false,
  },
};

/**
 * CSS-based 9-slice panel component
 * Uses border-image for efficient rendering
 */
export function NineSlicePanel({
  config,
  width = 'auto',
  height = 'auto',
  minWidth,
  minHeight,
  className = '',
  style = {},
  children,
  padding,
  onClick,
}: NineSlicePanelProps) {
  const [top, right, bottom, left] = config.borders;

  // Calculate padding
  const paddingStyle = useMemo(() => {
    if (padding === undefined) {
      return `${top}px ${right}px ${bottom}px ${left}px`;
    }
    if (typeof padding === 'number') {
      return `${padding}px`;
    }
    if (Array.isArray(padding)) {
      return `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`;
    }
    return padding;
  }, [padding, top, right, bottom, left]);

  const panelStyle: CSSProperties = useMemo(
    () => ({
      width,
      height,
      minWidth,
      minHeight,
      padding: paddingStyle,
      boxSizing: 'border-box',
      // 9-slice via border-image
      borderStyle: 'solid',
      borderWidth: `${top}px ${right}px ${bottom}px ${left}px`,
      borderImage: `url(${config.imagePath}) ${top} ${right} ${bottom} ${left} ${
        config.tileEdges ? 'repeat' : 'stretch'
      }`,
      // Fallback background for center
      backgroundImage: config.tileCenter
        ? `url(${config.imagePath})`
        : undefined,
      backgroundPosition: config.tileCenter ? 'center' : undefined,
      backgroundRepeat: config.tileCenter ? 'repeat' : undefined,
      backgroundClip: 'padding-box',
      cursor: onClick ? 'pointer' : undefined,
      ...style,
    }),
    [config, width, height, minWidth, minHeight, paddingStyle, onClick, style, top, right, bottom, left]
  );

  return (
    <div className={`nine-slice-panel ${className}`} style={panelStyle} onClick={onClick}>
      {children}
    </div>
  );
}

/**
 * Convenience component for wood-framed panels
 */
export function WoodPanel(props: Omit<NineSlicePanelProps, 'config'>) {
  return <NineSlicePanel {...props} config={PANEL_PRESETS.wood!} />;
}

/**
 * Convenience component for gold-framed panels
 */
export function GoldPanel(props: Omit<NineSlicePanelProps, 'config'>) {
  return <NineSlicePanel {...props} config={PANEL_PRESETS.gold!} />;
}

/**
 * Convenience component for stone-framed panels
 */
export function StonePanel(props: Omit<NineSlicePanelProps, 'config'>) {
  return <NineSlicePanel {...props} config={PANEL_PRESETS.stone!} />;
}

/**
 * Convenience component for tooltip panels
 */
export function TooltipPanel(props: Omit<NineSlicePanelProps, 'config'>) {
  return <NineSlicePanel {...props} config={PANEL_PRESETS.tooltip!} />;
}

export default NineSlicePanel;
