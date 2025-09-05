// ===================================
// TODO CLEAN - LOADING COMPONENT
// Flexible loading spinner component
// ===================================

import React from 'react';
import clsx from 'clsx';

// ==========================================
// COMPONENT PROPS
// ==========================================

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'bars' | 'pulse';
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'neutral';
  text?: string;
  className?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

// ==========================================
// MAIN COMPONENT
// ==========================================

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  className,
  fullScreen = false,
  overlay = false,
}) => {
  // Size classes for different loading indicators
  const sizeClasses = {
    sm: {
      spinner: 'w-4 h-4',
      container: 'gap-2',
      text: 'text-sm',
    },
    md: {
      spinner: 'w-6 h-6',
      container: 'gap-3',
      text: 'text-base',
    },
    lg: {
      spinner: 'w-8 h-8',
      container: 'gap-4',
      text: 'text-lg',
    },
    xl: {
      spinner: 'w-12 h-12',
      container: 'gap-4',
      text: 'text-xl',
    },
  };

  // Color classes
  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    accent: 'text-accent-600',
    white: 'text-white',
    neutral: 'text-neutral-600',
  };

  // Base container classes
  const containerClasses = clsx(
    'flex items-center justify-center',
    sizeClasses[size].container,
    {
      'fixed inset-0 z-50': fullScreen,
      'absolute inset-0 z-10': overlay && !fullScreen,
      'bg-white/80 backdrop-blur-sm': (fullScreen || overlay),
    },
    className
  );

  // Render different loading variants
  const renderLoadingIndicator = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div
            className={clsx(
              'animate-spin rounded-full border-2 border-current border-t-transparent',
              sizeClasses[size].spinner,
              colorClasses[color]
            )}
            role="status"
            aria-label="Cargando"
          />
        );

      case 'dots':
        return (
          <div className={clsx('flex space-x-1', colorClasses[color])}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={clsx(
                  'rounded-full bg-current animate-bounce',
                  size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5'
                )}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1s',
                }}
              />
            ))}
          </div>
        );

      case 'bars':
        return (
          <div className={clsx('flex items-end space-x-1', colorClasses[color])}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={clsx(
                  'bg-current animate-pulse',
                  size === 'sm' ? 'w-1 h-6' : size === 'lg' ? 'w-2 h-10' : 'w-1.5 h-8'
                )}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.2s',
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div
            className={clsx(
              'rounded-full bg-current animate-pulse',
              sizeClasses[size].spinner,
              colorClasses[color]
            )}
            role="status"
            aria-label="Cargando"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={containerClasses}>
      {renderLoadingIndicator()}
      
      {text && (
        <span
          className={clsx(
            'font-medium',
            sizeClasses[size].text,
            colorClasses[color]
          )}
          aria-live="polite"
        >
          {text}
        </span>
      )}
    </div>
  );
};

// ==========================================
// SPECIALIZED LOADING COMPONENTS
// ==========================================

// Full screen loading overlay
export const LoadingOverlay: React.FC<Omit<LoadingProps, 'fullScreen' | 'overlay'>> = (props) => (
  <Loading {...props} fullScreen />
);

// Inline loading spinner
export const LoadingInline: React.FC<Omit<LoadingProps, 'fullScreen' | 'overlay'>> = (props) => (
  <Loading {...props} size="sm" />
);

// Loading skeleton for content placeholders
export const LoadingSkeleton: React.FC<{
  className?: string;
  rows?: number;
  avatar?: boolean;
}> = ({ className, rows = 3, avatar = false }) => (
  <div className={clsx('animate-pulse space-y-4', className)}>
    {avatar && (
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-neutral-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-1/4" />
          <div className="h-3 bg-neutral-200 rounded w-1/2" />
        </div>
      </div>
    )}
    
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded" />
          <div className="h-4 bg-neutral-200 rounded w-5/6" />
        </div>
      ))}
    </div>
  </div>
);

// Button loading state
export const ButtonLoading: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}> = ({ size = 'md', color = 'white' }) => (
  <div className="flex items-center justify-center">
    <div
      className={clsx(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        {
          'w-4 h-4': size === 'sm',
          'w-5 h-5': size === 'md', 
          'w-6 h-6': size === 'lg',
        },
        color === 'white' ? 'text-white' : 'text-primary-600'
      )}
    />
  </div>
);

export default Loading;