// ===================================
// TODO CLEAN - BUTTON COMPONENT
// Flexible button component with variants and states
// ===================================

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { ButtonProps } from '@/types';
import { ButtonLoading } from './Loading';

// ==========================================
// MAIN BUTTON COMPONENT
// ==========================================

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base button classes
    const baseClasses = 'btn-base focus-ring inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none';

    // Variant classes
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      whatsapp: 'btn-whatsapp',
      ghost: 'btn-ghost',
      outline: 'border-2 border-current bg-transparent hover:bg-current hover:text-white focus:bg-current focus:text-white',
    };

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm min-h-[36px]',
      md: 'px-4 py-2 text-base min-h-[44px]',
      lg: 'px-6 py-3 text-lg min-h-[52px]',
      xl: 'px-8 py-4 text-xl min-h-[60px]',
    };

    // Full width classes
    const widthClasses = fullWidth ? 'w-full' : '';

    // Combine all classes
    const buttonClasses = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClasses,
      {
        'pointer-events-none': loading,
      },
      className
    );

    // Handle loading state content
    const content = loading ? (
      <div className="flex items-center justify-center gap-2">
        <ButtonLoading size={size === 'sm' ? 'sm' : size === 'lg' || size === 'xl' ? 'lg' : 'md'} />
        <span>Cargando...</span>
      </div>
    ) : (
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </div>
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ==========================================
// SPECIALIZED BUTTON COMPONENTS
// ==========================================

// WhatsApp button with pre-configured styles and tracking
export const WhatsAppButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'> & {
    message?: string;
    phone?: string;
    trackingSource?: string;
  }
>(({ message, phone, trackingSource = 'button', onClick, children, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track WhatsApp click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: trackingSource,
      });
    }

    // Open WhatsApp if message provided
    if (message) {
      const whatsappPhone = phone || '56926176543';
      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      ref={ref}
      variant="whatsapp"
      onClick={handleClick}
      icon={
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
        </svg>
      }
      {...props}
    >
      {children || 'WhatsApp'}
    </Button>
  );
});

WhatsAppButton.displayName = 'WhatsAppButton';

// Phone button with tracking
export const PhoneButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'> & {
    phone?: string;
    trackingSource?: string;
  }
>(({ phone = '+56926176543', trackingSource = 'button', onClick, children, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track phone click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: trackingSource,
      });
    }

    // Open phone dialer
    window.location.href = `tel:${phone}`;

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      ref={ref}
      variant="secondary"
      onClick={handleClick}
      icon={
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      }
      {...props}
    >
      {children || 'Llamar'}
    </Button>
  );
});

PhoneButton.displayName = 'PhoneButton';

// Link button that looks like a button but behaves like a link
export const LinkButton = forwardRef<
  HTMLAnchorElement,
  Omit<ButtonProps, 'onClick'> & {
    href: string;
    target?: string;
    rel?: string;
  }
>(({ href, target, rel, variant = 'primary', size = 'md', className, children, ...props }, ref) => {
  const baseClasses = 'btn-base focus-ring inline-flex items-center justify-center font-semibold transition-all duration-200 no-underline';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    whatsapp: 'btn-whatsapp',
    ghost: 'btn-ghost',
    outline: 'border-2 border-current bg-transparent hover:bg-current hover:text-white focus:bg-current focus:text-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
    xl: 'px-8 py-4 text-xl min-h-[60px]',
  };

  const linkClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
      className={linkClasses}
      {...props}
    >
      {children}
    </a>
  );
});

LinkButton.displayName = 'LinkButton';

// Icon button for compact spaces
export const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'children'> & {
    icon: React.ReactNode;
    'aria-label': string;
  }
>(({ icon, size = 'md', variant = 'ghost', className, ...props }, ref) => {
  const sizeClasses = {
    sm: 'p-1.5 min-w-[32px] min-h-[32px]',
    md: 'p-2 min-w-[40px] min-h-[40px]',
    lg: 'p-3 min-w-[48px] min-h-[48px]',
    xl: 'p-4 min-w-[56px] min-h-[56px]',
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={clsx('rounded-full', sizeClasses[size], className)}
      {...props}
    >
      {icon}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

export { Button };
export default Button;