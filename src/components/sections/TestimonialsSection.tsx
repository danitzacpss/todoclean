// ===================================
// TODO CLEAN - TESTIMONIALS SECTION
// Interactive testimonials carousel
// ===================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '@/utils/constants';
import type { Testimonial } from '@/types';

// ==========================================
// INTERFACES
// ==========================================

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

// ==========================================
// TESTIMONIAL CARD COMPONENT
// ==========================================

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  isActive,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-neutral-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 ${
        isActive ? 'shadow-2xl ring-2 ring-accent-200' : ''
      }`}
    >
      {/* Quote Icon */}
      <div className="text-accent-400 text-4xl mb-4">"</div>

      {/* Comment */}
      <blockquote className="text-neutral-700 text-lg leading-relaxed mb-6 italic">
        {testimonial.comment}
      </blockquote>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {renderStars(testimonial.rating)}
      </div>

      {/* Author Info */}
      <div className="flex items-center">
        {testimonial.photo ? (
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
            onError={(e) => {
              // Fallback to initials if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLDivElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback Avatar with Initials */}
        <div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-semibold mr-4"
          style={{ display: testimonial.photo ? 'none' : 'flex' }}
        >
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div>
          <div className="font-semibold text-neutral-900 flex items-center">
            {testimonial.name}
            {testimonial.verified && (
              <span className="ml-2 text-blue-500" title="Cliente verificado">
                ✓
              </span>
            )}
          </div>
          <div className="text-neutral-600 text-sm">
            {testimonial.location} • {testimonial.service === 'regular' ? 'Limpieza Regular' :
             testimonial.service === 'profunda' ? 'Limpieza Profunda' : 'Limpieza Post-Obra'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    setAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  // Get visible testimonials (current + 2 adjacent for desktop)
  const getVisibleTestimonials = () => {
    const testimonials = [];
    const length = TESTIMONIALS.length;
    
    // Check if we're in browser environment
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    
    // For mobile, show only current
    if (isMobile) {
      return [TESTIMONIALS[currentIndex]];
    }
    
    // For desktop, show 3 testimonials
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + length) % length;
      testimonials.push(TESTIMONIALS[index]);
    }
    
    return testimonials;
  };

  return (
    <section className="py-20 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Testimonios Reales
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-4">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Más de 500 familias confían en Todo Clean para mantener sus hogares impecables
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Testimonials */}
          <div className="relative max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {typeof window !== 'undefined' && window.innerWidth >= 768 ? (
                // Desktop: Show 3 testimonials
                <motion.div
                  key={`desktop-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-3 gap-8 min-h-[400px]"
                >
                  {getVisibleTestimonials().map((testimonial, index) => {
                    if (!testimonial) return null;
                    return (
                      <TestimonialCard
                        key={`${testimonial.id}-${currentIndex}-${index}`}
                        testimonial={testimonial}
                        isActive={index === 1} // Center testimonial is active
                      />
                    );
                  })}
                </motion.div>
              ) : (
                // Mobile: Show 1 testimonial
                 <motion.div
                   key={`mobile-${currentIndex}`}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5 }}
                   className="grid md:grid-cols-3 gap-8 min-h-[400px]"
                 >
                   <div className="md:col-span-3">
                     {(() => {
                       const testimonial = TESTIMONIALS[currentIndex] || TESTIMONIALS[0];
                       if (!testimonial) return null;
                       return (
                         <TestimonialCard
                           key={`${testimonial.id}-mobile`}
                           testimonial={testimonial}
                           isActive={true}
                         />
                       );
                     })()}
                   </div>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-6">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-neutral-600 hover:text-accent-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-accent-500 scale-125'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-neutral-600 hover:text-accent-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              {autoPlay ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Auto-play activado
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-neutral-400 rounded-full mr-2"></span>
                  Auto-play pausado
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              4.8 de 5 estrellas
            </h3>
            <p className="text-neutral-600 mb-4">
              Basado en +100 reseñas verificadas
            </p>
            <a
              href="https://g.page/todo-clean-chillan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Ver en Google Reviews
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;