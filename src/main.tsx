// ===================================
// TODO CLEAN - MAIN ENTRY POINT
// React application entry point with providers
// ===================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Import main app component
import App from './App';

// Import global styles
import './styles/index.css';

// Import analytics initialization
import { initializeAnalytics, trackPerformanceMetrics } from './utils/analytics';

// ==========================================
// ANALYTICS & PERFORMANCE SETUP
// ==========================================

// Initialize analytics
initializeAnalytics();

// Track performance metrics after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Delay to ensure all metrics are available
    setTimeout(trackPerformanceMetrics, 1000);
  });
}

// ==========================================
// ERROR BOUNDARY
// ==========================================

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary:', error, errorInfo);
    
    // Track error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: true,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-neutral-50 px-4'>
          <div className='text-center max-w-md'>
            <div className='mb-8'>
              <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-error-100 flex items-center justify-center'>
                <svg
                  className='w-8 h-8 text-error-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <h1 className='text-2xl font-bold text-neutral-900 mb-2'>
                ¡Ups! Algo salió mal
              </h1>
              <p className='text-neutral-600 mb-6'>
                Ha ocurrido un error inesperado. Por favor recarga la página o contáctanos directamente.
              </p>
            </div>
            
            <div className='space-y-3'>
              <button
                onClick={() => window.location.reload()}
                className='w-full btn-base btn-primary'
              >
                Recargar página
              </button>
              
              <a
                href='https://wa.me/56926176543?text=Hola, tuve un problema técnico en la página web'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full btn-base btn-whatsapp'
              >
                Contactar por WhatsApp
              </a>
              
              <a
                href='tel:+56926176543'
                className='w-full btn-base btn-secondary'
              >
                Llamar ahora
              </a>
            </div>
            
            {import.meta.env.DEV && this.state.error && (
              <details className='mt-6 text-left'>
                <summary className='cursor-pointer text-sm text-neutral-500 hover:text-neutral-700'>
                  Detalles técnicos (solo en desarrollo)
                </summary>
                <pre className='mt-2 text-xs text-error-600 bg-error-50 p-2 rounded overflow-auto'>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ==========================================
// TOAST CONFIGURATION
// ==========================================

const toasterConfig = {
  duration: 4000,
  position: 'top-center' as const,
  gutter: 8,
  containerClassName: 'toast-container',
  toastOptions: {
    className: '',
    duration: 4000,
    style: {
      background: '#ffffff',
      color: '#1f2937',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '12px 16px',
      fontSize: '14px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    success: {
      iconTheme: {
        primary: '#10b981',
        secondary: '#ffffff',
      },
      style: {
        borderColor: '#10b981',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444',
        secondary: '#ffffff',
      },
      style: {
        borderColor: '#ef4444',
      },
    },
    loading: {
      iconTheme: {
        primary: '#f59e0b',
        secondary: '#ffffff',
      },
    },
  },
};

// ==========================================
// RENDER APPLICATION
// ==========================================

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
          <Toaster {...toasterConfig} />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// ==========================================
// SERVICE WORKER REGISTRATION (PWA)
// ==========================================

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Track successful service worker registration
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'sw_registered', {
            event_category: 'pwa',
            value: 1,
          });
        }
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
        
        // Track service worker registration failure
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'sw_registration_failed', {
            event_category: 'pwa',
            value: 1,
          });
        }
      });
  });
}

// ==========================================
// DEVELOPMENT HELPERS
// ==========================================

if (import.meta.env.DEV) {
  // Hot module replacement
  if (import.meta.hot) {
    import.meta.hot.accept();
  }
  
  // Development console info
  console.log('🧹 Todo Clean Chillán - Development Mode');
  console.log('📊 Analytics:', {
    GA: Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID),
    FB: Boolean(import.meta.env.VITE_FACEBOOK_PIXEL_ID),
  });
  
  // Expose utilities for debugging
  window.__TODO_CLEAN_DEBUG__ = {
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    buildDate: import.meta.env.VITE_BUILD_DATE,
    environment: import.meta.env.MODE,
  };
}

// ==========================================
// GLOBAL ERROR HANDLING
// ==========================================

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: event.error?.message || 'Unknown error',
      fatal: false,
    });
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: event.reason?.message || 'Unhandled promise rejection',
      fatal: false,
    });
  }
});

// ==========================================
// VIEWPORT WARNINGS
// ==========================================

if (typeof window !== 'undefined') {
  // Warn about very small viewports
  const checkViewport = () => {
    if (window.innerWidth < 320) {
      console.warn('⚠️ Viewport muy pequeño detectado. La experiencia podría ser limitada.');
    }
  };
  
  checkViewport();
  window.addEventListener('resize', checkViewport);
  
  // Check for landscape orientation on very small screens
  const checkOrientation = () => {
    if (window.innerHeight < 500 && window.innerWidth < 800) {
      console.info('📱 Pantalla pequeña en orientación horizontal detectada');
    }
  };
  
  checkOrientation();
  window.addEventListener('orientationchange', checkOrientation);
}