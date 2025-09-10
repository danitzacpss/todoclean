// ===================================
// TODO CLEAN - COTIZADOR PAGE
// Advanced quote calculator with step-by-step wizard
// ===================================

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import QuoteWizard from '@/components/wizard/QuoteWizard';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { trackCalculatorStart } from '@/utils/analytics';

const CotizadorPage: React.FC = () => {
  // Track page visit
  React.useEffect(() => {
    trackCalculatorStart();
  }, []);

  const handleWizardComplete = () => {
    // Handle wizard completion
    console.log('Quote wizard completed successfully!');
    
    // You could navigate to a thank you page or show a success message
    // For now, we'll just scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Calculadora de Precios - Cotización Detallada | Todo Clean Chillán</title>
        <meta name="description" content="Calcula el precio exacto de tu servicio de limpieza con nuestra calculadora avanzada. Cotización paso a paso con precios transparentes y sin sorpresas." />
        <meta name="keywords" content="calculadora precios limpieza, cotización limpieza Chillán, presupuesto limpieza profesional, precios servicios limpieza" />
        <link rel="canonical" href="https://todoclean.cl/cotizador" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Calculadora de Precios - Todo Clean Chillán" />
        <meta property="og:description" content="Obtén una cotización detallada y transparente para tu servicio de limpieza profesional en Chillán" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://todoclean.cl/cotizador" />
        <meta property="og:image" content="https://todoclean.cl/og-calculator.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calculadora de Precios - Todo Clean Chillán" />
        <meta name="twitter:description" content="Calcula el precio exacto de tu servicio de limpieza paso a paso" />
        <meta name="twitter:image" content="https://todoclean.cl/og-calculator.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calculadora de Precios Todo Clean",
            "description": "Calculadora avanzada para cotizar servicios de limpieza profesional",
            "url": "https://todoclean.cl/cotizador",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "description": "Cotización gratuita y sin compromiso",
              "price": "0",
              "priceCurrency": "CLP"
            },
            "provider": {
              "@type": "LocalBusiness",
              "name": "Todo Clean Chillán",
              "telephone": "+56926176543",
              "url": "https://todoclean.cl"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-neutral-50">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                Calculadora de Precios
                <span className="block text-primary-600 mt-2">Avanzada</span>
              </h1>
              <p className="text-xl text-neutral-600 max-w-full sm:max-w-3xl mx-auto mb-8">
                Obtén una cotización detallada y transparente para tu servicio de limpieza. 
                Proceso paso a paso, precios claros y sin sorpresas.
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center text-neutral-600">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cotización en 3 pasos
                </div>
                <div className="flex items-center text-neutral-600">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Precios transparentes
                </div>
                <div className="flex items-center text-neutral-600">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sin compromiso
                </div>
                <div className="flex items-center text-neutral-600">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Contacto inmediato
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8">
            <CalculatorProvider>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <QuoteWizard onComplete={handleWizardComplete} />
              </motion.div>
            </CalculatorProvider>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white border-t border-neutral-200">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                ¿Por qué usar nuestra calculadora?
              </h2>
              <p className="text-neutral-600 max-w-full sm:max-w-2xl mx-auto">
                Desarrollada especialmente para ofrecerte la cotización más precisa y transparente del mercado
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Precisión Garantizada',
                  description: 'Algoritmo que considera todos los factores: tamaño, tipo de propiedad, frecuencia y extras.'
                },
                {
                  icon: '💰',
                  title: 'Precios Transparentes',
                  description: 'Desglose completo del precio. Sin costos ocultos ni sorpresas al final.'
                },
                {
                  icon: '⚡',
                  title: 'Respuesta Inmediata',
                  description: 'Obtén tu cotización al instante y agenda tu servicio en segundos.'
                },
                {
                  icon: '🛡️',
                  title: 'Datos Seguros',
                  description: 'Tu información está protegida. Solo la usamos para contactarte.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-primary-800 mb-6">
                Más de 500 clientes satisfechos confían en nosotros
              </h2>
              <div className="flex flex-wrap justify-center gap-8 text-primary-700">
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-sm">Calificación promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">Servicios completados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-sm">Clientes recurrentes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">2h</div>
                  <div className="text-sm">Tiempo de respuesta</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                ¿Tienes preguntas?
              </h2>
              <p className="text-neutral-600 mb-8 max-w-full sm:max-w-2xl mx-auto">
                Nuestro equipo está disponible para ayudarte con cualquier consulta sobre nuestros servicios o tu cotización
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/56926176543?text=Hola,%20tengo%20preguntas%20sobre%20la%20calculadora%20de%20precios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.549 4.090 1.595 5.904L0 24l6.335-1.652c1.746.943 3.71 1.444 5.682 1.444C18.597 24 24 18.633 24 11.987 24 5.367 18.597.001 12.017.001zm5.951 16.847c-.272.762-1.344 1.392-2.177 1.584-.576.133-1.328.24-3.848-.802-2.719-1.123-4.49-3.902-4.627-4.083-.137-.181-1.124-1.479-1.124-2.818 0-1.339.7-1.996 1.006-2.267.272-.24.653-.361 1.124-.361.137 0 .272 0 .396.016.272.016.651-.104.998.762.361.897 1.228 2.993 1.339 3.212.111.218.184.468.037.76-.147.273-.22.437-.401.67-.181.232-.383.518-.548.697-.181.197-.37.408-.159.803.211.396.938 1.548 2.014 2.506 1.386 1.232 2.55 1.61 2.914 1.79.361.181.576.152.789-.091.211-.242.911-1.066 1.154-1.433.242-.366.484-.305.817-.183.331.122 2.122 1.002 2.485 1.184.361.181.606.272.697.426.091.152.091.881-.181 1.643z"/>
                  </svg>
                  Preguntas por WhatsApp
                </a>
                <a
                  href="tel:+56926176543"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Llamar ahora
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CotizadorPage;
