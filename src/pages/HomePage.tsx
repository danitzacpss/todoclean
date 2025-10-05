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
import AirbnbPromo from '@/components/sections/AirbnbPromo';
import PartyCleanupPromo from '@/components/sections/PartyCleanupPromo';
import EmergencyCleanPromo from '@/components/sections/EmergencyCleanPromo';
import DeepCleanPromo from '@/components/sections/DeepCleanPromo';
import logoImage from '@/assets/images/logo.png';

// ==========================================
// HOMEPAGE COMPONENT
// ==========================================

const HomePage: React.FC = () => {
  const handleCotizarClick = () => {
    const calculatorSection = document.getElementById('price-calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
      <section className="relative bg-white overflow-hidden">
        {/* Logo Watermark */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 opacity-30 hover:opacity-50 transition-opacity duration-300">
          <img
            src={logoImage}
            alt="Todo Clean"
            className="h-12 sm:h-16 w-auto"
          />
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle color accents - responsive positioning */}
          <div className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-cyan-100/40 rounded-full blur-2xl" />
          <div className="absolute bottom-32 left-8 sm:left-20 w-20 sm:w-24 h-20 sm:h-24 bg-teal-100/30 rounded-full blur-xl" />
          <div className="absolute top-40 right-1/4 sm:right-1/3 w-12 sm:w-16 h-12 sm:h-16 bg-cyan-200/20 rounded-full blur-lg" />

          {/* Geometric details - hidden on mobile for cleaner look */}
          <div className="hidden sm:block absolute top-16 right-20 w-8 h-8 border border-cyan-300/30 rotate-45" />
          <div className="hidden sm:block absolute bottom-20 left-32 w-4 h-4 bg-teal-400/40 rounded-full" />
          <div className="absolute top-1/3 left-8 sm:left-16 w-2 h-2 bg-cyan-500/60 rounded-full" />
        </div>

        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <div className="text-center lg:text-left">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-cyan-700">Servicio Premium</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-8 leading-tight">
                <span className="block text-gray-900">Tu Hogar</span>
                <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                  Impecable
                </span>
                <span className="block text-gray-700 text-3xl md:text-4xl lg:text-5xl mt-2">
                  en 3 Horas
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                Transformamos tu hogar con
                <span className="block font-bold text-gray-900 mt-1">
                  estándares americanos de limpieza
                </span>
                <span className="block text-base text-cyan-600 mt-2 font-medium">
                  ✨ Puntualidad garantizada o tu dinero de vuelta
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center lg:justify-start mb-12">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCotizarClick}
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                >
                  <span className="flex items-center gap-2">
                    ⚡ Cotizar en 30 Segundos
                  </span>
                </Button>
                
                <WhatsAppButton
                  size="lg"
                  message="¡Hola! Me interesa conocer más sobre sus servicios de limpieza premium."
                  trackingSource="hero"
                  className="bg-white border-2 border-cyan-600 hover:bg-cyan-50 text-cyan-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    💬 WhatsApp Directo
                  </span>
                </WhatsAppButton>
              </div>

              {/* Trust Badges - better mobile layout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="group">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 text-center hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 group-hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-gray-900">+500</div>
                    <div className="text-sm text-gray-600">Hogares</div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 text-center hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 group-hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-gray-900">4.8★</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 text-center hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 group-hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-gray-900">&lt;2h</div>
                    <div className="text-sm text-gray-600">Respuesta</div>
                  </div>
                </div>
                
                <div className="group">
                   <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 text-center hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 group-hover:scale-105">
                     <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                       <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <div className="text-lg font-bold text-gray-900">100%</div>
                     <div className="text-sm text-gray-600">Garantía</div>
                   </div>
                 </div>
               </div>
             </div>

            {/* Image Column */}
             <div className="relative">
               {/* Main Hero Image */}
               <div className="relative">
                 <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                   <img 
                     src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                     alt="Profesional de limpieza trabajando en hogar moderno" 
                     className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                   />
                   
                   {/* Overlay with gradient */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                   
                   {/* Content overlay */}
                   <div className="absolute bottom-6 left-6 text-white">
                     <h3 className="font-bold text-xl mb-1">Limpieza Premium</h3>
                     <p className="text-gray-200 text-sm">Estándares americanos</p>
                   </div>
                   
                   {/* Floating badge */}
                   <div className="absolute top-6 left-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full text-base font-bold shadow-xl border-2 border-white/30 backdrop-blur-sm">
                     ✨ Garantizado
                   </div>
                 </div>
                 
                 {/* Gallery thumbnails */}
                 <div className="mt-6 grid grid-cols-3 gap-4">
                   <div className="relative overflow-hidden rounded-xl shadow-lg group">
                     <img 
                       src="https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                       alt="Limpieza profesional de oficinas" 
                       className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                   </div>
                   
                   <div className="relative overflow-hidden rounded-xl shadow-lg group">
                     <img 
                       src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                       alt="Productos de limpieza ecológicos" 
                       className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                   </div>
                   
                   <div className="relative overflow-hidden rounded-xl shadow-lg group">
                     <img 
                       src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                       alt="Equipo de limpieza profesional" 
                       className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                   </div>
                 </div>
                 
                 {/* Decorative elements */}
                 <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500/20 rounded-full" />
                 <div className="absolute top-1/4 -left-2 w-4 h-4 bg-teal-400/30 rounded-full" />
                 <div className="absolute bottom-1/3 -right-2 w-6 h-6 bg-cyan-400/25 rounded-full" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Quilamapu Promotion Banner */}
      <QuilamapuPromo />

      {/* Airbnb Promotion Banner */}
      <AirbnbPromo />

      {/* Services Section */}
      <ServicesSection />

      {/* Party Cleanup Promo */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <PartyCleanupPromo />
        </div>
      </section>

      {/* Price Calculator */}
      <div data-section="calculator">
        <div id="price-calculator">
          <PriceCalculator />
        </div>
      </div>

      {/* Why Todo Clean */}
      <WhyTodoClean />

      {/* Process Section */}
      <ProcessSection />

      {/* Testimonials */}
      <TestimonialsSection />

      <section className="relative py-16 lg:py-20 overflow-hidden">
        {/* Background consistent with hero - subtle white background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white"></div>
        
        {/* Clean Decorative Elements */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {/* Minimal accent points - responsive positioning */}
           <div className="absolute top-24 right-1/4 sm:right-1/3 w-2 h-2 bg-cyan-500 rounded-full opacity-30"></div>
           <div className="absolute bottom-40 left-1/6 sm:left-1/4 w-1.5 h-1.5 bg-teal-500 rounded-full opacity-25"></div>
           <div className="absolute top-16 left-8 sm:left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-30"></div>
           
           {/* Enhanced geometric shapes - hidden on mobile for cleaner look */}
           <div className="hidden sm:block absolute top-20 right-24 w-8 h-8 border-2 border-cyan-300 rounded opacity-50 rotate-12"></div>
           <div className="hidden sm:block absolute bottom-28 left-24 w-10 h-10 border-2 border-teal-300 rounded-full opacity-40"></div>
           <div className="hidden md:block absolute top-1/4 right-20 w-6 h-6 border-2 border-blue-300 opacity-45 rotate-45"></div>
         </div>
        
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-full sm:max-w-4xl lg:max-w-6xl mx-auto text-center">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-cyan-700">Servicio Premium Garantizado</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              ¿Listo para un 
              <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                Hogar Impecable?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-full sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
              Obtén tu cotización gratuita en menos de 30 segundos
            </p>
            
            <p className="text-base text-cyan-600 mb-10 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto font-medium">
              ✨ Únete a los +500 hogares que ya disfrutan de un hogar impecable sin esfuerzo
            </p>
            
            {/* CTA Buttons with enhanced design */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-12">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCotizarClick}
                className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
              >
                <span className="flex items-center gap-2">
                  ⚡ Cotizar en 30 Segundos
                </span>
              </Button>
              
              <WhatsAppButton
                size="lg"
                message="¡Hola! Quiero obtener una cotización para mi hogar."
                trackingSource="cta-final"
                className="bg-white border-2 border-cyan-600 hover:bg-cyan-50 text-cyan-700 shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  💬 WhatsApp Directo
                </span>
              </WhatsAppButton>
            </div>
            
            {/* Trust indicators with consistent design - better mobile spacing */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 text-gray-600">
              <div className="flex items-center gap-2 group">
                <div className="w-3 h-3 bg-cyan-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-sm font-medium">Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="w-3 h-3 bg-teal-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-sm font-medium">Cotización gratuita</span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="w-3 h-3 bg-cyan-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-sm font-medium">Respuesta inmediata</span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="w-3 h-3 bg-teal-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-sm font-medium">Garantía 100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;