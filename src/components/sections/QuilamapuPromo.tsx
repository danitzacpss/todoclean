// ===================================
// TODO CLEAN - QUILAMAPU PROMOTION
// Special promotion banner for Quilamapu area
// ===================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppButton } from '@/components/ui/Button';
import { WHATSAPP_MESSAGES } from '@/utils/constants';

// ==========================================
// MAIN COMPONENT
// ==========================================

const QuilamapuPromo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set promotion end date (example: 30 days from now)
  const promoEndDate = new Date();
  promoEndDate.setDate(promoEndDate.getDate() + 30);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = promoEndDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  // WhatsApp click is handled by the WhatsAppButton component itself

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/5 animate-pulse delay-1000"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-10 text-6xl opacity-20"
          >
            🏠
          </motion.div>
          <motion.div
            animate={{
              y: [20, -20, 20],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 right-10 text-4xl opacity-20"
          >
            ✨
          </motion.div>
        </div>

        <div className="container mx-auto px-1 sm:px-4 lg:px-8 py-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left Side - Promotion Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
              >
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-semibold">OFERTA ESPECIAL QUILAMAPU</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-3"
              >
                20% de Descuento
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl mb-4 text-red-100"
              >
                Exclusivo para residentes de Quilamapu
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm"
              >
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Sin costo de traslado
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Código: QUILA20
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Válido hasta fin de mes
                </span>
              </motion.div>
            </div>

            {/* Center - Countdown Timer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Termina en:</h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: 'Días', value: timeLeft.days },
                    { label: 'Hrs', value: timeLeft.hours },
                    { label: 'Min', value: timeLeft.minutes },
                    { label: 'Seg', value: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="bg-white/20 rounded-lg p-3">
                      <motion.div
                        key={unit.value}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl font-bold"
                      >
                        {unit.value.toString().padStart(2, '0')}
                      </motion.div>
                      <div className="text-xs text-red-100">{unit.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex-shrink-0 text-center lg:text-right"
            >
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <WhatsAppButton
                    size="lg"
                    message={WHATSAPP_MESSAGES.quilamapu}
                    trackingSource="quilamapu-promo"
                    className="bg-white text-red-600 hover:bg-red-50 font-bold shadow-xl"
                  >
                    Reclamar Descuento
                  </WhatsAppButton>
                </motion.div>

                <p className="text-sm text-red-100">
                  Menciona el código <strong>QUILA20</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          aria-label="Cerrar promoción"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-8 fill-current text-white"
          >
            <motion.path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default QuilamapuPromo;