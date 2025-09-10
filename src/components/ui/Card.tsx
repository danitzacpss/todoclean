// ===================================
// TODO CLEAN - CARD COMPONENT
// Flexible card component for content display
// ===================================

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { CardProps } from '@/types';

// ==========================================
// MAIN CARD COMPONENT
// ==========================================

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, onClick, ...props }, ref) => {
    // Base card classes
    const baseClasses = 'card-base';

    // Variant classes
    const variantClasses = {
      default: 'border border-neutral-200',
      interactive: 'card-interactive cursor-pointer hover:shadow-lg',
      service: 'card-service border-2',
      testimonial: 'bg-neutral-50 border border-neutral-200',
    };

    // Interactive behavior
    const interactiveClasses = onClick ? 'cursor-pointer' : '';

    // Combine classes
    const cardClasses = clsx(
      baseClasses,
      variantClasses[variant],
      interactiveClasses,
      className
    );

    // Handle keyboard interaction for clickable cards
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    };

    const Element = onClick ? 'div' : 'div';

    return (
      <Element
        ref={ref}
        className={cardClasses}
        onClick={onClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Card.displayName = 'Card';

// ==========================================
// CARD SUB-COMPONENTS
// ==========================================

// Card Header
export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
  }
>(({ title, subtitle, action, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('card-header mb-4 pb-4 border-b border-neutral-200', className)}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-600">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="ml-4 flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

// Card Content
export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('card-content', className)}
      {...props}
    />
  );
});

CardContent.displayName = 'CardContent';

// Card Footer
export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('card-footer mt-4 pt-4 border-t border-neutral-200', className)}
      {...props}
    />
  );
});

CardFooter.displayName = 'CardFooter';

// ==========================================
// SPECIALIZED CARD COMPONENTS
// ==========================================

// Service Card - for displaying cleaning services
export const ServiceCard = forwardRef<
  HTMLDivElement,
  {
    title: string;
    price: string;
    duration: string;
    features: string[];
    popular?: boolean;
    onSelect?: () => void;
    className?: string;
  }
>(({ title, price, duration, features, popular = false, onSelect, className }, ref) => {
  const cardProps: any = {
    ref,
    variant: "service" as const,
    className: clsx(
      'relative overflow-hidden',
      {
        'ring-2 ring-primary-500 border-primary-500': popular,
      },
      className
    )
  };

  if (onSelect) {
    cardProps.onClick = onSelect;
  }

  return (
    <Card {...cardProps}>
      {popular && (
        <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
          Más Popular
        </div>
      )}

      <CardHeader>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-primary-600">{price}</span>
          <span className="text-sm text-neutral-600">desde</span>
        </div>
        <p className="text-sm text-neutral-600">{duration} de servicio</p>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-neutral-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      {onSelect && (
        <CardFooter>
          <button className="w-full btn-base btn-primary">
            Ver Detalles
          </button>
        </CardFooter>
      )}
    </Card>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Testimonial Card
export const TestimonialCard = forwardRef<
  HTMLDivElement,
  {
    name: string;
    location: string;
    rating: number;
    comment: string;
    photo?: string;
    verified?: boolean;
    className?: string;
  }
>(({ name, location, rating, comment, photo, verified = false, className }, ref) => {
  return (
    <Card
      ref={ref}
      variant="testimonial"
      className={clsx('h-full', className)}
    >
      <CardContent className="space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={clsx(
                'w-4 h-4',
                i < rating ? 'text-accent-500' : 'text-neutral-300'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Comment */}
        <blockquote className="text-neutral-700 italic">
          "{comment}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          {photo ? (
            <img
              src={photo}
              alt={`Foto de ${name}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-neutral-300 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-neutral-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-neutral-900 truncate">{name}</p>
              {verified && (
                <svg
                  className="w-4 h-4 text-secondary-600 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-label="Cliente verificado"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <p className="text-sm text-neutral-600 truncate">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

// Stats Card
export const StatsCard = forwardRef<
  HTMLDivElement,
  {
    value: string | number;
    label: string;
    icon?: React.ReactNode;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    className?: string;
  }
>(({ value, label, icon, trend, className }, ref) => {
  return (
    <Card
      ref={ref}
      className={clsx('text-center', className)}
    >
      <CardContent className="space-y-2">
        {icon && (
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-3">
            {icon}
          </div>
        )}
        
        <div className="text-3xl font-bold text-neutral-900">
          {typeof value === 'number' ? value.toLocaleString().replace(/,/g, '.') : value}
        </div>
        
        <div className="text-sm text-neutral-600">
          {label}
        </div>

        {trend && (
          <div
            className={clsx(
              'flex items-center justify-center gap-1 text-xs font-medium',
              trend.isPositive ? 'text-secondary-600' : 'text-error-600'
            )}
          >
            <svg
              className={clsx(
                'w-3 h-3',
                trend.isPositive ? 'rotate-0' : 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            {Math.abs(trend.value)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
});

StatsCard.displayName = 'StatsCard';

export { Card };
export default Card;