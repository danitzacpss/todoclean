// ===================================
// TODO CLEAN - HEADER COMPONENT
// Main navigation header with responsive menu
// ===================================

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  PhoneIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { SITE_CONFIG, NAVIGATION_ROUTES } from '@/utils/constants';
import { WhatsAppButton, PhoneButton } from '@/components/ui/Button';
import logoImage from '@/assets/images/logo.png';

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
        'sticky top-0 z-50 w-full transition-all duration-200',
        {
          'bg-white/95 backdrop-blur-sm shadow-sm': isScrolled,
          'bg-white': !isScrolled,
        }
      )}
      role="banner"
    >
      <div className="container mx-auto px-1 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
              aria-label="Todo Clean Chillán - Inicio"
            >
              {/* Logo */}
              <img
                src={logoImage}
                alt="Todo Clean - Servicio de Limpieza Profesional"
                className="h-16 w-auto"
              />
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
                      'font-medium transition-colors duration-200 hover:text-teal-600 focus:text-teal-600 focus:outline-none focus:underline',
                      {
                        'text-teal-600': location.pathname === route.path,
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
              className="p-2 rounded-md text-neutral-700 hover:text-teal-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {/* Hamburger Menu Icon with Animation */}
              <motion.div
                className="relative w-6 h-6"
                animate={isMenuOpen ? "open" : "closed"}
              >
                <motion.span
                  className="absolute left-0 block h-0.5 w-6 bg-current transform"
                  style={{ top: '6px' }}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 block h-0.5 w-6 bg-current transform"
                  style={{ top: '12px' }}
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 block h-0.5 w-6 bg-current transform"
                  style={{ top: '18px' }}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden absolute top-full left-2 right-2 w-auto bg-white shadow-2xl z-50 border-t border-neutral-200 rounded-b-2xl overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.3
              }}
            >
              <motion.nav
                className="py-6 px-6"
                role="navigation"
                aria-label="Navegación móvil"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {/* Navigation Links */}
                <motion.div 
                  className="space-y-2 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4 px-2">
                    <SparklesIcon className="w-5 h-5 text-teal-600" />
                    <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">
                      Navegación
                    </span>
                  </div>
                  
                  <ul className="space-y-1">
                    {NAVIGATION_ROUTES.slice(0, 6).map((route, index) => {
                      const getIcon = (routeName: string) => {
                        switch (routeName) {
                          case 'Inicio':
                            return <HomeIcon className="w-5 h-5" />;
                          case 'Servicios':
                            return <BuildingOfficeIcon className="w-5 h-5" />;
                          case 'Cobertura':
                            return <MapPinIcon className="w-5 h-5" />;
                          case 'Sobre Nosotros':
                            return <UserGroupIcon className="w-5 h-5" />;
                          case 'Contacto':
                            return <PhoneIcon className="w-5 h-5" />;
                          default:
                            return <SparklesIcon className="w-5 h-5" />;
                        }
                      };

                      return (
                        <motion.li 
                          key={route.path}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.2 + (index * 0.05), 
                            duration: 0.3,
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                        >
                          <Link
                            to={route.path}
                            className={clsx(
                              'group flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 relative overflow-hidden',
                              {
                                'text-white bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg shadow-teal-200': location.pathname === route.path,
                                'text-neutral-700 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:shadow-md': location.pathname !== route.path,
                              }
                            )}
                          >
                            {/* Background gradient animation */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                              initial={false}
                            />
                            
                            {/* Icon */}
                            <motion.div 
                              className={clsx(
                                'flex-shrink-0 transition-all duration-300',
                                {
                                  'text-white': location.pathname === route.path,
                                  'text-neutral-500 group-hover:text-teal-600': location.pathname !== route.path,
                                }
                              )}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {getIcon(route.name)}
                            </motion.div>
                            
                            {/* Text */}
                            <span className="relative z-10 font-semibold">
                              {route.name}
                            </span>
                            
                            {/* Active indicator */}
                            {location.pathname === route.path && (
                              <motion.div
                                className="absolute right-3 w-2 h-2 bg-white rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              />
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>

                {/* Mobile CTAs */}
                <motion.div 
                  className="space-y-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4 px-2">
                    <PhoneIcon className="w-5 h-5 text-teal-600" />
                    <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">
                      Contacto Directo
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <PhoneButton
                        fullWidth
                        size="md"
                        trackingSource="mobile-header"
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Llamar Ahora
                        </span>
                      </PhoneButton>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <WhatsAppButton
                        fullWidth
                        size="md"
                        message="¡Hola! Me interesa conocer más sobre sus servicios de limpieza."
                        trackingSource="mobile-header"
                        className="font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Contactar por WhatsApp
                      </WhatsAppButton>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Business Info */}
                <motion.div 
                  className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <ClockIcon className="w-5 h-5 text-teal-600" />
                      <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">
                        Horarios
                      </span>
                    </div>
                    
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                    >
                      <p className="text-sm text-neutral-600 mb-2">
                        Atención personalizada
                      </p>
                      <p className="font-bold text-lg text-neutral-900 mb-1">
                        {SITE_CONFIG.businessHours?.monday?.open || '08:00'} - {SITE_CONFIG.businessHours?.saturday?.close || '18:00'}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Lunes a Sábado
                      </p>
                    </motion.div>
                    
                    {/* Decorative elements */}
                    <div className="flex justify-center mt-4 space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-teal-300 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;