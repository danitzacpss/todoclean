// ===================================
// TODO CLEAN - HEADER COMPONENT
// Main navigation header with responsive menu
// ===================================

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { SITE_CONFIG, NAVIGATION_ROUTES } from '@/utils/constants';
import Button, { WhatsAppButton, PhoneButton } from '@/components/ui/Button';

// ==========================================
// HEADER COMPONENT
// ==========================================

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as HTMLElement;
        const header = document.querySelector('header');
        if (header && !header.contains(target)) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 w-full transition-all duration-200',
        {
          'bg-white/95 backdrop-blur-sm shadow-sm': isScrolled,
          'bg-white': !isScrolled,
        }
      )}
      role="banner"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
              aria-label="Todo Clean Chillán - Inicio"
            >
              {/* Logo Icon */}
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                TC
              </div>
              
              {/* Logo Text */}
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-xl text-neutral-900">
                  Todo Clean
                </div>
                <div className="text-xs text-primary-600 font-medium -mt-1">
                  Chillán
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block" role="navigation" aria-label="Navegación principal">
            <ul className="flex items-center space-x-8">
              {NAVIGATION_ROUTES.slice(0, 6).map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className={clsx(
                      'font-medium transition-colors duration-200 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:underline',
                      {
                        'text-primary-600': location.pathname === route.path,
                        'text-neutral-700': location.pathname !== route.path,
                      }
                    )}
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <PhoneButton
              size="sm"
              trackingSource="header"
              className="text-sm"
            >
              <span className="hidden xl:inline">Llamar</span>
            </PhoneButton>
            
            <WhatsAppButton
              size="sm"
              message="¡Hola! Me interesa conocer más sobre sus servicios de limpieza."
              trackingSource="header"
              className="text-sm"
            >
              <span className="hidden xl:inline">WhatsApp</span>
            </WhatsAppButton>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {/* Menu icon */}
              <svg
                className={clsx('w-6 h-6 transition-transform duration-200', {
                  'rotate-90': isMenuOpen,
                })}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={clsx(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            {
              'max-h-screen opacity-100': isMenuOpen,
              'max-h-0 opacity-0': !isMenuOpen,
            }
          )}
        >
          <nav
            className="py-4 border-t border-neutral-200"
            role="navigation"
            aria-label="Navegación móvil"
          >
            {/* Navigation Links */}
            <ul className="space-y-1">
              {NAVIGATION_ROUTES.slice(0, 6).map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className={clsx(
                      'block px-4 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-neutral-100 hover:text-primary-600 focus:bg-neutral-100 focus:text-primary-600 focus:outline-none',
                      {
                        'text-primary-600 bg-primary-50': location.pathname === route.path,
                        'text-neutral-700': location.pathname !== route.path,
                      }
                    )}
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTAs */}
            <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
              <PhoneButton
                fullWidth
                size="md"
                trackingSource="mobile-header"
              >
                Llamar Ahora
              </PhoneButton>
              
              <WhatsAppButton
                fullWidth
                size="md"
                message="¡Hola! Me interesa conocer más sobre sus servicios de limpieza."
                trackingSource="mobile-header"
              >
                Contactar por WhatsApp
              </WhatsAppButton>
            </div>

            {/* Business Info */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="px-4 text-center">
                <p className="text-sm text-neutral-600 mb-2">
                  Atención personalizada
                </p>
                <p className="font-medium text-neutral-900">
                  {SITE_CONFIG.businessHours.monday.open} - {SITE_CONFIG.businessHours.saturday.close}
                </p>
                <p className="text-sm text-neutral-600">
                  Lunes a Sábado
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;