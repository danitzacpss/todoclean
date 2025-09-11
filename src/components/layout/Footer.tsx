// ===================================
// TODO CLEAN - FOOTER COMPONENT
// Site footer with links, contact info, and legal pages
// ===================================

import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, NAVIGATION_ROUTES } from '@/utils/constants';
import { WhatsAppButton, PhoneButton } from '@/components/ui/Button';

// ==========================================
// FOOTER COMPONENT
// ==========================================

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      <div className="container mx-auto px-1 sm:px-4 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                {/* Logo */}
                <img
                  src="/logo.png"
                  alt="Todo Clean - Servicio de Limpieza Profesional"
                  className="h-16 w-auto flex-shrink-0"
                />
                <div>
                  <div className="text-lg font-semibold text-white mb-1">
                    Todo Clean Chillán
                  </div>
                  <div className="text-sm text-primary-400">
                    Servicios Profesionales de Limpieza
                  </div>
                </div>
              </div>

              <p className="text-neutral-400 mb-6 max-w-md">
                Transformamos tu hogar con estándares americanos de limpieza. 
                Puntualidad garantizada, 100% de satisfacción y el mejor servicio 
                en la región del Ñuble.
              </p>

              {/* Contact buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <WhatsAppButton
                  size="sm"
                  message="¡Hola! Me interesa conocer más sobre sus servicios de limpieza."
                  trackingSource="footer"
                >
                  WhatsApp
                </WhatsAppButton>
                <PhoneButton
                  size="sm"
                  trackingSource="footer"
                >
                  {SITE_CONFIG.phone}
                </PhoneButton>
              </div>

            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Navegación</h4>
              <ul className="space-y-2">
                {NAVIGATION_ROUTES.slice(0, 6).map((route) => (
                  <li key={route.path}>
                    <Link
                      to={route.path}
                      className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none focus:underline"
                      onClick={() => {
                        // Scroll to top after navigation
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services & Business Hours */}
            <div>
              <h4 className="font-semibold text-white mb-4">Servicios</h4>
              <ul className="space-y-2 mb-6">
                <li>
                  <a
                    href="/servicios"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none focus:underline"
                    onClick={() => {
                      // Scroll to top after navigation
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }}
                  >
                    Servicios Residenciales
                  </a>
                </li>
                <li>
                  <a
                    href="/servicios"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none focus:underline"
                    onClick={() => {
                      // Scroll to top after navigation
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }}
                  >
                    Servicios Empresariales
                  </a>
                </li>
              </ul>

              {/* Business hours */}
              <div className="text-sm">
                <h4 className="font-semibold text-white mb-2">Horarios de Atención</h4>
                <p className="text-neutral-400">
                  Lunes a Sábado: {SITE_CONFIG.businessHours?.monday?.open || '9:00'} - {SITE_CONFIG.businessHours?.saturday?.close || '18:00'}
                </p>
                <p className="text-neutral-400">
                  Domingo: {SITE_CONFIG.businessHours?.sunday?.open || '10:00'} - {SITE_CONFIG.businessHours?.sunday?.close || '16:00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-neutral-400">
              <p>
                © {currentYear} Todo Clean Chillán. Todos los derechos reservados.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {SITE_CONFIG.social.instagram && (
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none"
                  aria-label="Síguenos en Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}

              {SITE_CONFIG.social.google && (
                <a
                  href={SITE_CONFIG.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none"
                  aria-label="Visita nuestro perfil de Google"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Built with */}
            <div className="text-xs text-neutral-500">
              Sitio web profesional para servicios de limpieza
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;