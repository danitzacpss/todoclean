import React from 'react';
import { cn } from '@/utils/cn';

// ==========================================
// BASIC SKELETON COMPONENT
// ==========================================

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'shimmer' | 'wave';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  rounded = 'md',
  variant = 'default'
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const variantClasses = {
    default: 'animate-pulse bg-neutral-200',
    shimmer: 'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%]',
    wave: 'bg-neutral-200 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        variantClasses[variant],
        roundedClasses[rounded],
        className
      )}
      style={style}
      role="presentation"
      aria-hidden="true"
    />
  );
};

// ==========================================
// SPECIALIZED SKELETON COMPONENTS
// ==========================================

// Page skeleton for full page loading
export const PageSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-6 p-6', className)}>
    {/* Header skeleton */}
    <div className="space-y-2">
      <Skeleton height="40px" width="60%" />
      <Skeleton height="20px" width="80%" />
    </div>
    
    {/* Content blocks */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton height="200px" />
          <Skeleton height="24px" width="90%" />
          <Skeleton height="16px" width="70%" />
          <Skeleton height="16px" width="50%" />
        </div>
      ))}
    </div>
  </div>
);

// Card skeleton
export const CardSkeleton: React.FC<{ 
  className?: string;
  showImage?: boolean;
  rows?: number;
}> = ({ 
  className, 
  showImage = false, 
  rows = 3 
}) => (
  <div className={cn('p-6 space-y-4', className)}>
    {showImage && <Skeleton height="200px" />}
    <div className="space-y-2">
      <Skeleton height="24px" width="80%" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height="16px" width={`${100 - i * 10}%`} />
      ))}
    </div>
  </div>
);

// Form skeleton
export const FormSkeleton: React.FC<{ 
  className?: string;
  fields?: number;
}> = ({ 
  className, 
  fields = 5 
}) => (
  <div className={cn('space-y-6', className)}>
    <div className="space-y-2">
      <Skeleton height="32px" width="40%" />
      <Skeleton height="20px" width="80%" />
    </div>
    
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton height="20px" width="30%" />
        <Skeleton height="44px" />
      </div>
    ))}
    
    <Skeleton height="48px" width="200px" />
  </div>
);

// Service card skeleton
export const ServiceCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <div className="flex items-center space-x-3">
      <Skeleton width="48px" height="48px" rounded="lg" />
      <div className="flex-1">
        <Skeleton height="20px" width="70%" />
        <Skeleton height="16px" width="50%" className="mt-1" />
      </div>
    </div>
    
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton width="16px" height="16px" rounded="full" />
          <Skeleton height="16px" width={`${90 - i * 10}%`} />
        </div>
      ))}
    </div>
    
    <div className="flex justify-between items-center">
      <Skeleton height="24px" width="80px" />
      <Skeleton height="36px" width="120px" />
    </div>
  </div>
);

// Testimonial skeleton
export const TestimonialSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <div className="flex items-center space-x-4">
      <Skeleton width="48px" height="48px" rounded="full" />
      <div className="flex-1">
        <Skeleton height="18px" width="60%" />
        <Skeleton height="14px" width="40%" className="mt-1" />
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} width="16px" height="16px" />
        ))}
      </div>
    </div>
    
    <div className="space-y-2">
      <Skeleton height="16px" />
      <Skeleton height="16px" width="90%" />
      <Skeleton height="16px" width="70%" />
    </div>
  </div>
);

// Navigation skeleton
export const NavigationSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('flex items-center justify-between p-4', className)}>
    <Skeleton width="120px" height="32px" />
    <div className="hidden md:flex space-x-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} width="80px" height="20px" />
      ))}
    </div>
    <div className="flex space-x-2">
      <Skeleton width="100px" height="36px" />
      <Skeleton width="36px" height="36px" />
    </div>
  </div>
);

// Price calculator skeleton
export const CalculatorSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-6', className)}>
    {/* Header */}
    <div className="text-center space-y-2">
      <Skeleton height="32px" width="60%" className="mx-auto" />
      <Skeleton height="20px" width="80%" className="mx-auto" />
    </div>
    
    {/* Steps */}
    <div className="flex justify-center space-x-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton width="32px" height="32px" rounded="full" />
          <Skeleton width="80px" height="16px" />
        </div>
      ))}
    </div>
    
    {/* Form content */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton height="20px" width="40%" />
            <Skeleton height="44px" />
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <Skeleton height="200px" />
        <div className="space-y-2">
          <Skeleton height="24px" width="60%" />
          <Skeleton height="20px" width="80%" />
        </div>
      </div>
    </div>
    
    {/* Actions */}
    <div className="flex justify-between">
      <Skeleton width="100px" height="44px" />
      <Skeleton width="120px" height="44px" />
    </div>
  </div>
);

// FAQ skeleton
export const FAQSkeleton: React.FC<{ 
  className?: string;
  items?: number;
}> = ({ 
  className, 
  items = 6 
}) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="border border-neutral-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <Skeleton height="20px" width="70%" />
          <Skeleton width="20px" height="20px" />
        </div>
      </div>
    ))}
  </div>
);

// Coverage map skeleton
export const CoverageMapSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-6', className)}>
    {/* Search bar */}
    <div className="max-w-full sm:max-w-2xl mx-auto">
      <Skeleton height="44px" />
    </div>
    
    {/* Map */}
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <Skeleton height="400px" />
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Skeleton width="32px" height="32px" rounded="full" />
              <Skeleton height="20px" width="40%" />
            </div>
            <div className="space-y-2">
              <Skeleton height="16px" width="80%" />
              <Skeleton height="16px" width="60%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Contact form skeleton
export const ContactFormSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('grid lg:grid-cols-2 gap-8', className)}>
    <FormSkeleton fields={6} />
    
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-start space-x-4 p-4 border border-neutral-200 rounded-lg">
          <Skeleton width="48px" height="48px" rounded="lg" />
          <div className="flex-1 space-y-2">
            <Skeleton height="18px" width="60%" />
            <Skeleton height="16px" width="80%" />
            <Skeleton height="14px" width="50%" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;