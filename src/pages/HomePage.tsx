// ===================================
// TODO CLEAN - HOMEPAGE COMPONENT
// Main landing page with all sections
// ===================================

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '@/utils/constants';
import Button, { WhatsAppButton } from '@/components/ui/Button';
import PriceCalculator from '@/components/sections/PriceCalculator';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyTodoClean from '@/components/sections/WhyTodoClean';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import QuilamapuPromo from '@/components/sections/QuilamapuPromo';

// ==========================================
// HOMEPAGE COMPONENT
// ==========================================

const HomePage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Todo Clean Chillán | Servicios Profesionales de Limpieza</title>
        <meta
          name="description"
          content="Tu hogar impecable en 3 horas. Limpieza profesional con estándares americanos en Chillán. Puntualidad garantizada o tu dinero de vuelta. ¡Cotiza gratis!"
        />
        <meta
          name="keywords"
          content="limpieza Chillán, servicio limpieza, limpieza profesional, aseo domicilio, limpieza oficinas, todo clean"
        />
        <link rel="canonical" href={SITE_CONFIG.url} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/10" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="py-20 lg:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Tu Hogar Impecable
                <span className="block text-accent-400">en 3 Horas</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-2xl mx-auto leading-relaxed">
                Limpieza profesional con estándares americanos. 
                <span className="block font-semibold text-white mt-2">
                  Puntualidad garantizada o tu dinero de vuelta
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white shadow-xl"
                >
                  Cotizar en 30 Segundos
                </Button>
                
                <WhatsAppButton
                  size="lg"
                  message="¡Hola! Me interesa conocer más sobre sus servicios de limpieza."
                  trackingSource="hero"
                  className="shadow-xl"
                >
                  WhatsApp Directo
                </WhatsAppButton>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">+500 hogares</div>
                  <div className="text-xs text-primary-200">atendidos</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">4.8★ Rating</div>
                  <div className="text-xs text-primary-200">Google Reviews</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">Respuesta</div>
                  <div className="text-xs text-primary-200">&lt;2 horas</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">100% Garantía</div>
                  <div className="text-xs text-primary-200">satisfacción</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quilamapu Promotion Banner */}
      <QuilamapuPromo />

      {/* Price Calculator */}
      <div data-section="calculator">
        <PriceCalculator />
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* Why Todo Clean */}
      <WhyTodoClean />

      {/* Process Section */}
      <ProcessSection />

      {/* Testimonials */}
      <TestimonialsSection />

      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para un hogar impecable?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Obtén tu cotización gratuita en menos de 30 segundos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-accent-500 hover:bg-accent-600"
            >
              Cotizar Ahora
            </Button>
            <WhatsAppButton
              size="lg"
              message="¡Hola! Quiero obtener una cotización para mi hogar."
              trackingSource="cta-final"
            >
              WhatsApp Directo
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;