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
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  TC
                </div>
                <div>
                  <div className="font-heading font-bold text-xl text-white">
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

              {/* Business hours */}
              <div className="text-sm">
                <h4 className="font-semibold text-white mb-2">Horarios de Atención</h4>
                <p className="text-neutral-400">
                  Lunes a Sábado: {SITE_CONFIG.businessHours.monday.open} - {SITE_CONFIG.businessHours.saturday.close}
                </p>
                <p className="text-neutral-400">
                  Domingo: {SITE_CONFIG.businessHours.sunday.open} - {SITE_CONFIG.businessHours.sunday.close}
                </p>
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
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services & Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Servicios</h4>
              <ul className="space-y-2 mb-6">
                <li>
                  <Link
                    to="/servicios/residencial"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none focus:underline"
                  >
                    Limpieza Residencial
                  </Link>
                </li>
                <li>
                  <Link
                    to="/servicios/empresarial"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none focus:underline"
                  >
                    Limpieza Empresarial
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cotizador"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none focus:underline"
                  >
                    Cotizador Online
                  </Link>
                </li>
              </ul>

              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/politica-privacidad"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none focus:underline"
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terminos-condiciones"
                    className="text-neutral-400 hover:text-white transition-colors duration-200 focus:text-white focus:outline-none focus:underline"
                  >
                    Términos y Condiciones
                  </Link>
                </li>
              </ul>
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
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.342-1.297-.894-.808-1.297-1.953-1.297-3.342V8.547c0-1.297.49-2.448 1.297-3.342C6.001 4.311 7.152 3.908 8.449 3.908h3.802c1.297 0 2.448.49 3.342 1.297.894.808 1.297 1.953 1.297 3.342v3.802c0 1.297-.49 2.448-1.297 3.342-.894.894-2.045 1.297-3.342 1.297H8.449z"/>
                    <path d="M12.049 7.435c-2.534 0-4.614 2.08-4.614 4.614s2.08 4.614 4.614 4.614 4.614-2.08 4.614-4.614-2.08-4.614-4.614-4.614zm0 6.55c-1.071 0-1.936-.865-1.936-1.936s.865-1.936 1.936-1.936 1.936.865 1.936 1.936-.865 1.936-1.936 1.936z"/>
                    <path d="M16.967 6.302c-.593 0-1.071.478-1.071 1.071s.478 1.071 1.071 1.071 1.071-.478 1.071-1.071-.478-1.071-1.071-1.071z"/>
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