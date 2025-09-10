// ===================================
// TODO CLEAN - MAIN APP COMPONENT
// Root component with routing and global providers
// ===================================

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Import layout components
import Layout from './components/layout/Layout';
import Loading from './components/ui/Loading';

// Import context providers
import { AppProvider } from './contexts/AppContext';
import { CalculatorProvider } from './contexts/CalculatorContext';

// Import utilities
import { trackPageView } from './utils/analytics';
import { SITE_CONFIG, NAVIGATION_ROUTES } from './utils/constants';

// ==========================================
// LAZY LOADED PAGES
// ==========================================

// Main pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ServiciosPage = lazy(() => import('./pages/ServiciosPage'));
const ServiciosResidencialPage = lazy(() => import('./pages/ServiciosResidencialPage'));
const ServiciosEmpresarialPage = lazy(() => import('./pages/ServiciosEmpresarialPage'));
const CotizadorPage = lazy(() => import('./pages/CotizadorPage'));
const CoberturaPage = lazy(() => import('./pages/CoberturaPage'));
const SobreNosotrosPage = lazy(() => import('./pages/SobreNosotrosPage'));
const ContactoPage = lazy(() => import('./pages/ContactoPage'));

// Legal pages
const PoliticaPrivacidadPage = lazy(() => import('./pages/PoliticaPrivacidadPage'));
const TerminosCondicionesPage = lazy(() => import('./pages/TerminosCondicionesPage'));

// Error pages
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ==========================================
// ROUTE ANALYTICS TRACKER
// ==========================================

function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views with analytics
    trackPageView(location.pathname, document.title);
    
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update page focus for screen readers
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  }, [location.pathname]);

  return null;
}

// ==========================================
// LOADING FALLBACK COMPONENT
// ==========================================

function PageLoadingFallback() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50'>
      <div className='text-center'>
        <Loading size='lg' />
        <p className='mt-4 text-neutral-600 font-medium'>
          Cargando...
        </p>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

function App() {
  return (
    <AppProvider>
      <CalculatorProvider>
        <div className='App'>
          {/* Global SEO */}
          <Helmet>
            <html lang='es' />
            <meta charSet='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
            <meta name='theme-color' content='#2563eb' />
            <link rel='canonical' href={SITE_CONFIG.url} />
            
            {/* Preload critical resources */}
            <link rel='preload' href='/fonts/inter-var.woff2' as='font' type='font/woff2' crossOrigin='anonymous' />
            <link rel='preload' href='/fonts/open-sans-var.woff2' as='font' type='font/woff2' crossOrigin='anonymous' />
            
            {/* Preconnect to external domains for performance */}
            <link rel='preconnect' href='https://www.googletagmanager.com' />
            <link rel='preconnect' href='https://wa.me' />
            
            {/* DNS prefetch for external resources */}
            <link rel='dns-prefetch' href='//maps.googleapis.com' />
            <link rel='dns-prefetch' href='//fonts.googleapis.com' />
            <link rel='dns-prefetch' href='//fonts.gstatic.com' />
          </Helmet>

          {/* Route analytics tracker */}
          <RouteAnalytics />

          {/* Main application routes */}
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              {/* Main layout routes with Layout wrapper */}
              <Route element={<Layout />}>
                {/* Home page */}
                <Route path='/' element={<HomePage />} />
                
                {/* Services pages */}
                <Route path='servicios' element={<ServiciosPage />} />
                <Route path='servicios/residencial' element={<ServiciosResidencialPage />} />
                <Route path='servicios/empresarial' element={<ServiciosEmpresarialPage />} />
                
                {/* Calculator page - TEMPORARILY HIDDEN */}
                {/* <Route path='cotizador' element={<CotizadorPage />} /> */}
                
                {/* Coverage page */}
                <Route path='cobertura' element={<CoberturaPage />} />
                
                {/* About page */}
                <Route path='sobre-nosotros' element={<SobreNosotrosPage />} />
                
                {/* Contact page */}
                <Route path='contacto' element={<ContactoPage />} />
                
                {/* Legal pages */}
                <Route path='politica-privacidad' element={<PoliticaPrivacidadPage />} />
                <Route path='terminos-condiciones' element={<TerminosCondicionesPage />} />
              </Route>

              {/* 404 page - outside of layout for custom styling */}
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Suspense>

          {/* WhatsApp floating button - only on specific routes */}
          <WhatsAppFloat />

          {/* Accessibility improvements */}
          <div id='announcements' className='sr-only' aria-live='polite' aria-atomic='true'></div>
        </div>
      </CalculatorProvider>
    </AppProvider>
  );
}

// ==========================================
// WHATSAPP FLOATING BUTTON COMPONENT
// ==========================================

function WhatsAppFloat() {
  const location = useLocation();
  
  // Hide on certain pages where it might interfere
  const hiddenRoutes = ['/contacto', '/cotizador'];
  const shouldShow = !hiddenRoutes.includes(location.pathname);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a delay to avoid interfering with page load
    const timer = setTimeout(() => {
      setIsVisible(shouldShow);
    }, 2000);

    return () => clearTimeout(timer);
  }, [shouldShow]);

  if (!isVisible) return null;

  const handleWhatsAppClick = () => {
    // Track WhatsApp click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'floating_button',
        page_path: location.pathname,
      });
    }

    // Open WhatsApp
    const message = encodeURIComponent(
      '¡Hola! Me interesa conocer más sobre sus servicios de limpieza.'
    );
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className='whatsapp-float btn-whatsapp rounded-full p-4 shadow-xl animate-pulse-whatsapp hover:animate-none transition-all duration-300'
      aria-label='Contactar por WhatsApp'
      title='¿Necesitas ayuda? Escríbenos por WhatsApp'
    >
      <svg
        className='w-6 h-6'
        fill='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287' />
      </svg>
    </button>
  );
}

// ==========================================
// DEVELOPMENT HELPERS
// ==========================================

if (import.meta.env.DEV) {
  // Add route debugging information
  const routeInfo = NAVIGATION_ROUTES.map(route => ({
    name: route.name,
    path: route.path,
    component: `${route.name}Page`,
  }));
  
  console.log('🗺️ Available routes:', routeInfo);
}

export default App;