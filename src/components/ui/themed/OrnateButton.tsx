import React, { useState, useMemo, CSSProperties } from 'react';

export type ButtonVariant = 'wood' | 'gold' | 'stone' | 'red' | 'green';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface OrnateButtonProps {
  /** Button text */
  children: React.ReactNode;
  /** Button variant/style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Icon to show before text */
  icon?: React.ReactNode;
  /** Icon to show after text */
  iconRight?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button style configurations
 */
const BUTTON_STYLES: Record<
  ButtonVariant,
  {
    background: string;
    backgroundHover: string;
    backgroundActive: string;
    border: string;
    borderHover: string;
    text: string;
    textShadow: string;
    boxShadow: string;
  }
> = {
  wood: {
    background: 'linear-gradient(180deg, #8b7355 0%, #6b5344 50%, #5a4636 100%)',
    backgroundHover: 'linear-gradient(180deg, #9b8365 0%, #7b6354 50%, #6a5646 100%)',
    backgroundActive: 'linear-gradient(180deg, #5a4636 0%, #6b5344 50%, #8b7355 100%)',
    border: '2px solid #4a3626',
    borderHover: '2px solid #5a4636',
    text: '#f5e6d3',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
  },
  gold: {
    background: 'linear-gradient(180deg, #ffd700 0%, #daa520 50%, #b8860b 100%)',
    backgroundHover: 'linear-gradient(180deg, #ffe033 0%, #eab530 50%, #c8961b 100%)',
    backgroundActive: 'linear-gradient(180deg, #b8860b 0%, #daa520 50%, #ffd700 100%)',
    border: '2px solid #8b6914',
    borderHover: '2px solid #9b7924',
    text: '#3a2a0a',
    textShadow: '0 1px 0 rgba(255,255,255,0.3)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
  },
  stone: {
    background: 'linear-gradient(180deg, #7a7a7a 0%, #5a5a5a 50%, #4a4a4a 100%)',
    backgroundHover: 'linear-gradient(180deg, #8a8a8a 0%, #6a6a6a 50%, #5a5a5a 100%)',
    backgroundActive: 'linear-gradient(180deg, #4a4a4a 0%, #5a5a5a 50%, #7a7a7a 100%)',
    border: '2px solid #3a3a3a',
    borderHover: '2px solid #4a4a4a',
    text: '#e0e0e0',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
  },
  red: {
    background: 'linear-gradient(180deg, #c44 0%, #a33 50%, #822 100%)',
    backgroundHover: 'linear-gradient(180deg, #d55 0%, #b44 50%, #933 100%)',
    backgroundActive: 'linear-gradient(180deg, #822 0%, #a33 50%, #c44 100%)',
    border: '2px solid #611',
    borderHover: '2px solid #722',
    text: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  green: {
    background: 'linear-gradient(180deg, #4a4 0%, #383 50%, #272 100%)',
    backgroundHover: 'linear-gradient(180deg, #5b5 0%, #494 50%, #383 100%)',
    backgroundActive: 'linear-gradient(180deg, #272 0%, #383 50%, #4a4 100%)',
    border: '2px solid #161',
    borderHover: '2px solid #272',
    text: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
};

/**
 * Button size configurations
 */
const SIZE_STYLES: Record<ButtonSize, CSSProperties> = {
  small: {
    padding: '6px 12px',
    fontSize: '12px',
    minHeight: '28px',
  },
  medium: {
    padding: '10px 20px',
    fontSize: '14px',
    minHeight: '36px',
  },
  large: {
    padding: '14px 28px',
    fontSize: '16px',
    minHeight: '44px',
  },
};

/**
 * Ornate themed button with hover/active states
 */
export function OrnateButton({
  children,
  variant = 'wood',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconRight,
  onClick,
  className = '',
  style = {},
  type = 'button',
}: OrnateButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const variantStyle = BUTTON_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];

  const buttonStyle: CSSProperties = useMemo(
    () => ({
      // Base styles
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? '100%' : undefined,
      fontFamily: '"Crimson Text", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '0.5px',
      textTransform: 'uppercase' as const,
      borderRadius: '4px',
      transition: 'all 0.15s ease',
      userSelect: 'none' as const,
      // Variant styles
      background: isActive
        ? variantStyle.backgroundActive
        : isHovered
        ? variantStyle.backgroundHover
        : variantStyle.background,
      border: isHovered ? variantStyle.borderHover : variantStyle.border,
      color: variantStyle.text,
      textShadow: variantStyle.textShadow,
      boxShadow: isActive ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : variantStyle.boxShadow,
      transform: isActive ? 'translateY(1px)' : undefined,
      // Size styles
      ...sizeStyle,
      // Custom styles
      ...style,
    }),
    [variantStyle, sizeStyle, isHovered, isActive, disabled, loading, fullWidth, style]
  );

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={`ornate-button ornate-button--${variant} ornate-button--${size} ${className}`}
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      disabled={disabled || loading}
    >
      {loading ? (
        <LoadingSpinner size={size} />
      ) : (
        <>
          {icon && <span className="ornate-button__icon">{icon}</span>}
          <span className="ornate-button__text">{children}</span>
          {iconRight && <span className="ornate-button__icon-right">{iconRight}</span>}
        </>
      )}
    </button>
  );
}

/**
 * Simple loading spinner
 */
function LoadingSpinner({ size }: { size: ButtonSize }) {
  const spinnerSize = size === 'small' ? 12 : size === 'medium' ? 16 : 20;

  return (
    <svg
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      style={{
        animation: 'spin 1s linear infinite',
      }}
    >
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeDasharray="32"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Icon button variant (square, just icon)
 */
export interface IconButtonProps {
  icon: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
}

export function IconButton({
  icon,
  variant = 'wood',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  title,
}: IconButtonProps) {
  const iconSize = size === 'small' ? 28 : size === 'medium' ? 36 : 44;

  return (
    <OrnateButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={`ornate-icon-button ${className}`}
      style={{
        width: iconSize,
        height: iconSize,
        padding: 0,
        minHeight: iconSize,
      }}
    >
      <span title={title}>{icon}</span>
    </OrnateButton>
  );
}

export default OrnateButton;
