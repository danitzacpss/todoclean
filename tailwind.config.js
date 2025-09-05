/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Color System
      colors: {
        // Primary - Trust & Professionalism (Blue)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',  // Main Primary
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          DEFAULT: '#2563eb',
        },
        // Secondary - Cleanliness & Fresh (Green)
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',  // Main Secondary
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
          DEFAULT: '#10b981',
        },
        // Accent - CTA & Actions (Amber/Orange)
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Main Accent
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
          DEFAULT: '#f59e0b',
        },
        // WhatsApp Brand
        whatsapp: {
          DEFAULT: '#25d366',
          dark: '#128c7e',
          light: '#dcf8c6',
        },
        // Extended Neutrals
        neutral: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Semantic Colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          DEFAULT: '#22c55e',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          DEFAULT: '#f59e0b',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          DEFAULT: '#ef4444',
        },
        info: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          DEFAULT: '#3b82f6',
        },
      },
      
      // Typography
      fontFamily: {
        'heading': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'body': ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'mono': ['JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'monospace'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.5' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5' }],      // 16px
        'lg': ['1.125rem', { lineHeight: '1.5' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.4' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '1.3' }],   // 30px (mobile), scales up
        '4xl': ['2.25rem', { lineHeight: '1.2' }],    // 36px (mobile), scales up
        '5xl': ['3rem', { lineHeight: '1.1' }],       // 48px (mobile), scales up
        '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px (mobile), scales up
        // Responsive variants will be handled by CSS custom properties
      },
      
      // Spacing (8px base system)
      spacing: {
        '0.5': '0.125rem',   // 2px
        '1.5': '0.375rem',   // 6px
        '2.5': '0.625rem',   // 10px
        '3.5': '0.875rem',   // 14px
        '7': '1.75rem',      // 28px
        '9': '2.25rem',      // 36px
        '11': '2.75rem',     // 44px - minimum touch target
        '13': '3.25rem',     // 52px
        '15': '3.75rem',     // 60px
        '17': '4.25rem',     // 68px
        '18': '4.5rem',      // 72px
        '19': '4.75rem',     // 76px
        '21': '5.25rem',     // 84px
        '22': '5.5rem',      // 88px
        '88': '22rem',       // 352px
        '104': '26rem',      // 416px
        '112': '28rem',      // 448px
        '128': '32rem',      // 512px
        '144': '36rem',      // 576px
      },
      
      // Border Radius
      borderRadius: {
        'xs': '0.125rem',    // 2px
        'sm': '0.25rem',     // 4px
        'base': '0.375rem',  // 6px
        'DEFAULT': '0.5rem', // 8px
        'lg': '0.75rem',     // 12px
        'xl': '1rem',        // 16px
        '2xl': '1.25rem',    // 20px
        '3xl': '1.5rem',     // 24px
      },
      
      // Box Shadows
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '2xl': '0 50px 100px -20px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        // Colored shadows
        'primary': '0 4px 14px rgba(37, 99, 235, 0.25)',
        'secondary': '0 4px 14px rgba(16, 185, 129, 0.25)',
        'accent': '0 4px 14px rgba(245, 158, 11, 0.25)',
        'whatsapp': '0 4px 14px rgba(37, 211, 102, 0.25)',
      },
      
      // Animations & Transitions
      transitionDuration: {
        '75': '75ms',
        '400': '400ms',
        '600': '600ms',
        '2000': '2000ms',
      },
      
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      
      // Z-Index Scale
      zIndex: {
        'hide': '-1',
        'auto': 'auto',
        'base': '0',
        'docked': '10',
        'dropdown': '1000',
        'sticky': '1100',
        'banner': '1200',
        'overlay': '1300',
        'modal': '1400',
        'popover': '1500',
        'tooltip': '1600',
        'toast': '1700',
      },
      
      // Container Sizes
      maxWidth: {
        'xs': '20rem',       // 320px
        'sm': '24rem',       // 384px
        'md': '28rem',       // 448px
        'lg': '32rem',       // 512px
        'xl': '36rem',       // 576px
        '2xl': '42rem',      // 672px
        '3xl': '48rem',      // 768px
        '4xl': '56rem',      // 896px
        '5xl': '64rem',      // 1024px
        '6xl': '72rem',      // 1152px
        '7xl': '80rem',      // 1280px
        'full': '100%',
        'min': 'min-content',
        'max': 'max-content',
        'prose': '65ch',     // Optimal reading width
      },
      
      // Backdrop Blur
      backdropBlur: {
        'xs': '2px',
      },
      
      // Aspect Ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      
      // Grid Template Columns
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
        'card-grid': 'repeat(auto-fit, minmax(300px, 1fr))',
        'service-grid': 'repeat(auto-fit, minmax(280px, 1fr))',
      },
      
      // Screen Sizes (Mobile First)
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Custom breakpoints
        'mobile': {'max': '639px'},
        'tablet': {'min': '640px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
        // Height-based breakpoints for mobile
        'short': {'raw': '(max-height: 700px)'},
        'tall': {'raw': '(min-height: 800px)'},
      },
    },
  },
  plugins: [
    // Forms Plugin
    require('@tailwindcss/forms')({
      strategy: 'class', // Use class-based strategy for better control
    }),
    
    // Typography Plugin
    require('@tailwindcss/typography'),
    
    // Aspect Ratio Plugin
    require('@tailwindcss/aspect-ratio'),
    
    // Container Queries Plugin
    require('@tailwindcss/container-queries'),
    
    // Custom Plugin for Todo Clean specific utilities
    function({ addUtilities, addComponents, theme }) {
      // Touch Target Utilities
      addUtilities({
        '.touch-target': {
          minWidth: '44px',
          minHeight: '44px',
        },
        '.touch-target-comfortable': {
          minWidth: '48px',
          minHeight: '48px',
        },
        '.touch-target-large': {
          minWidth: '56px',
          minHeight: '56px',
        },
      });
      
      // Focus Utilities
      addUtilities({
        '.focus-ring': {
          '&:focus-visible': {
            outline: '3px solid theme("colors.primary.500")',
            outlineOffset: '2px',
          },
        },
        '.focus-ring-accent': {
          '&:focus-visible': {
            outline: '3px solid theme("colors.accent.500")',
            outlineOffset: '2px',
          },
        },
      });
      
      // Button Components
      addComponents({
        '.btn-base': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontWeight: '600',
          lineHeight: '1',
          textAlign: 'center',
          textDecoration: 'none',
          borderRadius: '0.5rem',
          minHeight: '44px',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          transition: 'background-color 150ms cubic-bezier(0, 0, 0.2, 1), border-color 150ms cubic-bezier(0, 0, 0.2, 1), color 150ms cubic-bezier(0, 0, 0.2, 1), transform 150ms cubic-bezier(0, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0, 0, 0.2, 1)',
          '&:focus-visible': {
            outline: '3px solid theme("colors.primary.500")',
            outlineOffset: '2px',
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
            pointerEvents: 'none',
          },
        },
        
        '.btn-primary': {
          backgroundColor: theme('colors.accent.500'),
          color: theme('colors.white'),
          boxShadow: theme('boxShadow.accent'),
          '&:hover': {
            backgroundColor: theme('colors.accent.600'),
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.lg'),
          },
          '&:active': {
            transform: 'translateY(0)',
            backgroundColor: theme('colors.accent.700'),
          },
        },
        
        '.btn-secondary': {
          backgroundColor: theme('colors.white'),
          color: theme('colors.primary.600'),
          border: `2px solid ${theme('colors.primary.600')}`,
          '&:hover': {
            backgroundColor: theme('colors.primary.50'),
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.md'),
          },
          '&:active': {
            transform: 'translateY(0)',
            backgroundColor: theme('colors.primary.100'),
          },
        },
        
        '.btn-whatsapp': {
          backgroundColor: theme('colors.whatsapp.DEFAULT'),
          color: theme('colors.white'),
          boxShadow: theme('boxShadow.whatsapp'),
          '&:hover': {
            backgroundColor: theme('colors.whatsapp.dark'),
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.lg'),
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        
        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.neutral.700'),
          '&:hover': {
            backgroundColor: theme('colors.neutral.100'),
            color: theme('colors.neutral.900'),
          },
          '&:active': {
            backgroundColor: theme('colors.neutral.200'),
          },
        },
      });
      
      // Card Components
      addComponents({
        '.card-base': {
          backgroundColor: theme('colors.white'),
          borderRadius: '0.75rem',
          boxShadow: theme('boxShadow.sm'),
          padding: '1.5rem',
          transition: 'transform 200ms cubic-bezier(0, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0, 0, 0.2, 1)',
        },
        
        '.card-interactive': {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.lg'),
          },
        },
        
        '.card-service': {
          border: `1px solid ${theme('colors.neutral.200')}`,
          '&:hover': {
            borderColor: theme('colors.primary.300'),
          },
        },
      });
      
      // Form Components
      addComponents({
        '.form-input': {
          backgroundColor: theme('colors.white'),
          border: `2px solid ${theme('colors.neutral.300')}`,
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          lineHeight: '1.5',
          minHeight: '44px',
          transition: 'border-color 150ms cubic-bezier(0, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0, 0, 0.2, 1)',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary.500'),
            boxShadow: `0 0 0 3px ${theme('colors.primary.200')}`,
          },
          '&:invalid': {
            borderColor: theme('colors.error.500'),
          },
          '&::placeholder': {
            color: theme('colors.neutral.500'),
          },
        },
        
        '.form-label': {
          fontSize: '0.875rem',
          fontWeight: '500',
          color: theme('colors.neutral.700'),
          marginBottom: '0.5rem',
          display: 'block',
        },
        
        '.form-error': {
          fontSize: '0.875rem',
          color: theme('colors.error.600'),
          marginTop: '0.25rem',
        },
      });
    },
  ],
  // Add safelist for dynamic classes
  safelist: [
    'animate-pulse-slow',
    'animate-bounce-slow',
    'animate-fade-in',
    'animate-fade-in-up',
    'animate-slide-in-right',
    'animate-scale-in',
    'animate-float',
  ],
};