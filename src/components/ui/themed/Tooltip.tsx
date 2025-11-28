import { useState, useRef, useEffect, CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface TooltipProps {
  /** Content to show in tooltip */
  content: ReactNode;
  /** Element that triggers tooltip */
  children: ReactNode;
  /** Tooltip position */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delay?: number;
  /** Additional class name */
  className?: string;
  /** Tooltip style variant */
  variant?: 'default' | 'dark' | 'gold';
  /** Max width of tooltip */
  maxWidth?: number;
  /** Disable tooltip */
  disabled?: boolean;
}

const TOOLTIP_VARIANTS: Record<string, CSSProperties> = {
  default: {
    backgroundColor: 'rgba(30, 25, 20, 0.95)',
    border: '1px solid #5a4636',
    color: '#f5e6d3',
  },
  dark: {
    backgroundColor: 'rgba(20, 20, 25, 0.95)',
    border: '1px solid #333',
    color: '#ddd',
  },
  gold: {
    backgroundColor: 'rgba(40, 35, 20, 0.95)',
    border: '1px solid #daa520',
    color: '#ffd700',
  },
};

/**
 * Themed tooltip component
 */
export function Tooltip({
  content,
  children,
  position = 'auto',
  delay = 200,
  className = '',
  variant = 'default',
  maxWidth = 250,
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [actualPosition, setActualPosition] = useState<Exclude<TooltipPosition, 'auto'>>('top');
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Calculate position when visible
  useEffect(() => {
    if (!isVisible || !triggerRef.current) return;

    const trigger = triggerRef.current;
    const rect = trigger.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Determine best position
    let pos = position;
    if (pos === 'auto') {
      const spaceTop = rect.top;
      const spaceBottom = window.innerHeight - rect.bottom;
      const spaceLeft = rect.left;
      const spaceRight = window.innerWidth - rect.right;

      if (spaceTop > spaceBottom && spaceTop > 100) {
        pos = 'top';
      } else if (spaceBottom > 100) {
        pos = 'bottom';
      } else if (spaceRight > spaceLeft) {
        pos = 'right';
      } else {
        pos = 'left';
      }
    }

    setActualPosition(pos);

    // Calculate coordinates based on position
    let x = rect.left + scrollX + rect.width / 2;
    let y = rect.top + scrollY;

    switch (pos) {
      case 'top':
        y = rect.top + scrollY - 8;
        break;
      case 'bottom':
        y = rect.bottom + scrollY + 8;
        break;
      case 'left':
        x = rect.left + scrollX - 8;
        y = rect.top + scrollY + rect.height / 2;
        break;
      case 'right':
        x = rect.right + scrollX + 8;
        y = rect.top + scrollY + rect.height / 2;
        break;
    }

    setCoords({ x, y });
  }, [isVisible, position]);

  const tooltipStyle: CSSProperties = {
    position: 'absolute',
    zIndex: 10000,
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '13px',
    fontFamily: '"Crimson Text", Georgia, serif',
    lineHeight: 1.4,
    maxWidth,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    pointerEvents: 'none',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.15s ease',
    ...TOOLTIP_VARIANTS[variant],
    // Position adjustments
    ...(actualPosition === 'top' && {
      left: coords.x,
      top: coords.y,
      transform: 'translate(-50%, -100%)',
    }),
    ...(actualPosition === 'bottom' && {
      left: coords.x,
      top: coords.y,
      transform: 'translate(-50%, 0)',
    }),
    ...(actualPosition === 'left' && {
      left: coords.x,
      top: coords.y,
      transform: 'translate(-100%, -50%)',
    }),
    ...(actualPosition === 'right' && {
      left: coords.x,
      top: coords.y,
      transform: 'translate(0, -50%)',
    }),
  };

  // Arrow style
  const variantBg = TOOLTIP_VARIANTS[variant]?.backgroundColor ?? 'rgba(30, 25, 20, 0.95)';
  const arrowStyle: CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    ...(actualPosition === 'top' && {
      bottom: -6,
      left: '50%',
      transform: 'translateX(-50%)',
      borderWidth: '6px 6px 0 6px',
      borderColor: `${variantBg} transparent transparent transparent`,
    }),
    ...(actualPosition === 'bottom' && {
      top: -6,
      left: '50%',
      transform: 'translateX(-50%)',
      borderWidth: '0 6px 6px 6px',
      borderColor: `transparent transparent ${variantBg} transparent`,
    }),
    ...(actualPosition === 'left' && {
      right: -6,
      top: '50%',
      transform: 'translateY(-50%)',
      borderWidth: '6px 0 6px 6px',
      borderColor: `transparent transparent transparent ${variantBg}`,
    }),
    ...(actualPosition === 'right' && {
      left: -6,
      top: '50%',
      transform: 'translateY(-50%)',
      borderWidth: '6px 6px 6px 0',
      borderColor: `transparent ${variantBg} transparent transparent`,
    }),
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`tooltip tooltip--${variant} ${className}`}
            style={tooltipStyle}
            role="tooltip"
          >
            {content}
            <div style={arrowStyle} />
          </div>,
          document.body
        )}
    </>
  );
}

/**
 * Info tooltip with title and description
 */
export interface InfoTooltipProps {
  title: string;
  description: string;
  stats?: Array<{ label: string; value: string | number }>;
  children: ReactNode;
  variant?: 'default' | 'dark' | 'gold';
}

export function InfoTooltip({
  title,
  description,
  stats,
  children,
  variant = 'default',
}: InfoTooltipProps) {
  const content = (
    <div style={{ minWidth: 150 }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: '14px',
          marginBottom: '4px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '4px',
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: stats ? '8px' : 0 }}>
        {description}
      </div>
      {stats && stats.length > 0 && (
        <div style={{ fontSize: '12px' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2px 0',
              }}
            >
              <span style={{ opacity: 0.7 }}>{stat.label}:</span>
              <span style={{ fontWeight: 600 }}>{stat.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Tooltip content={content} variant={variant} maxWidth={300}>
      {children}
    </Tooltip>
  );
}

export default Tooltip;
