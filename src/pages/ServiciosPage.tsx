// ===================================
// TODO CLEAN - SERVICIOS PAGE
// Overview of all cleaning services with tabs navigation
// ===================================

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/utils/constants';
import ResidentialServices from '../components/sections/ResidentialServices';
import BusinessServices from '../components/sections/BusinessServices';

interface TabProps {
  id: 'residential' | 'business';
  label: string;
  description: string;
  icon: string;
}

const TABS: TabProps[] = [
  {
    id: 'residential',
    label: 'Servicios Residenciales',
    description: 'Limpieza profesional para tu hogar',
    icon: '🏠',
  },
  {
    id: 'business',
    label: 'Servicios Empresariales',
    description: 'Soluciones corporativas integrales',
    icon: '🏢',
  },
];

const ServiciosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'residential' | 'business'>('residential');

  return (
    <>
      <Helmet>
        <title>Servicios de Limpieza | Todo Clean Chillán</title>
        <meta
          name="description"
          content="Descubre todos nuestros servicios de limpieza profesional en Chillán. Residencial, empresarial, post-obra y más. Precios transparentes y calidad garantizada."
        />
        <meta name="keywords" content="servicios limpieza, residencial, empresarial, Chillán, precios, profesional" />
        <link rel="canonical" href={`${SITE_CONFIG.url}/servicios`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Servicios de Limpieza | Todo Clean Chillán" />
        <meta property="og:description" content="Servicios profesionales de limpieza residencial y empresarial con precios transparentes y calidad garantizada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_CONFIG.url}/servicios`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30">
        {/* Breadcrumbs */}
        <nav className="bg-white border-b border-neutral-200" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-neutral-600 hover:text-blue-600 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-neutral-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-900 font-medium">Servicios</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Nuestros Servicios de Limpieza
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Ofrecemos servicios profesionales de limpieza con estándares americanos, 
              precios desde $30.000 y garantía de satisfacción 100%.
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Precios Transparentes</h3>
                <p className="text-neutral-600 text-sm">Sin costos ocultos ni sorpresas</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Puntualidad Garantizada</h3>
                <p className="text-neutral-600 text-sm">Tu dinero de vuelta si llegamos tarde</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Servicio Eficiente</h3>
                <p className="text-neutral-600 text-sm">Limpieza completa en 3 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            {/* Sticky Tab Bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 mb-8 sticky top-20 z-10">
              <div className="flex flex-col md:flex-row">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 p-6 text-left transition-all duration-300 first:rounded-l-2xl last:rounded-r-2xl md:first:rounded-tr-none md:last:rounded-tl-none md:first:rounded-bl-2xl md:last:rounded-br-2xl ${
                      activeTab === tab.id
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                    aria-pressed={activeTab === tab.id}
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl">{tab.icon}</span>
                      <div>
                        <h3 className={`font-semibold text-lg mb-1 ${
                          activeTab === tab.id ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {tab.label}
                        </h3>
                        <p className={`text-sm ${
                          activeTab === tab.id ? 'text-teal-100' : 'text-neutral-500'
                        }`}>
                          {tab.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-96">
              {activeTab === 'residential' && (
                <div className="animate-in fade-in duration-500">
                  <ResidentialServices />
                </div>
              )}
              
              {activeTab === 'business' && (
                <div className="animate-in fade-in duration-500">
                  <BusinessServices />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section - Dynamic based on active tab */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          {activeTab === 'residential' ? (
            // Residential CTA
            <>
              {/* Background consistent with hero - subtle white background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white"></div>
              
              {/* Clean Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Minimal accent points */}
                <div className="absolute top-24 right-1/3 w-2 h-2 bg-cyan-500 rounded-full opacity-30"></div>
                <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-teal-500 rounded-full opacity-25"></div>
                <div className="absolute top-16 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-30"></div>
                
                {/* Enhanced geometric shapes - more visible */}
                <div className="absolute top-20 right-24 w-8 h-8 border-2 border-cyan-300 rounded opacity-50 rotate-12"></div>
                <div className="absolute bottom-28 left-24 w-10 h-10 border-2 border-teal-300 rounded-full opacity-40"></div>
                <div className="absolute top-1/4 right-20 w-6 h-6 border-2 border-blue-300 opacity-45 rotate-45"></div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Premium badge */}
                  <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 mb-6">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-cyan-700">Servicio Premium Garantizado</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    <span className="text-gray-900">¿Listo para experimentar</span>
                    <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                      la diferencia?
                    </span>
                  </h2>
                  
                  <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
                    Únete a más de 350 clientes satisfechos. Servicios desde $30.000 con limpieza completa en 3 horas.
                  </p>
                  
                  {/* CTA Buttons with enhanced design matching reference */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                      to="/cotizador"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      <span className="flex items-center gap-2">
                        ⚡ Calcular Precio
                      </span>
                    </Link>
                    
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de limpieza desde $30.000.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-cyan-600 hover:bg-cyan-50 text-cyan-700 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        💬 Contactar WhatsApp
                      </span>
                    </a>
                  </div>
                  
                  {/* Trust indicators with consistent design */}
                  <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
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
            </>
          ) : (
            // Business CTA - Matching the reference design exactly
            <>
              {/* Background with decorative elements like the reference */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
              
              {/* Decorative background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-100/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-teal-100/40 rounded-full blur-lg"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-100/20 rounded-full blur-md"></div>
                <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-cyan-50/50 rounded-full blur-lg"></div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Premium badge */}
                  <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 mb-6">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-cyan-700">Servicio Premium Garantizado</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    <span className="text-gray-900">Impulsa la Productividad de</span>
                    <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                      tu Empresa
                    </span>
                  </h2>
                  
                  <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
                    Optimiza el rendimiento de tu equipo con espacios de trabajo impecables. 
                    Nuestros servicios especializados garantizan un ambiente productivo y profesional.
                  </p>
                  
                  {/* CTA Buttons with enhanced design */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                      to="/cotizador"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      <span className="flex items-center gap-2">
                        Solicitar Cotización
                      </span>
                    </Link>
                    
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios empresariales de limpieza. ¿Podrían enviarme información detallada?')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-cyan-600 hover:bg-cyan-50 text-cyan-700 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        Contactar por WhatsApp
                      </span>
                    </a>
                  </div>
                  
                  {/* Business Trust indicators */}
                  <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
                    <div className="flex items-center gap-2 group">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                      <span className="text-sm font-medium">Visita comercial gratuita</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <div className="w-3 h-3 bg-teal-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                      <span className="text-sm font-medium">Propuesta personalizada</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <div className="w-3 h-3 bg-cyan-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                      <span className="text-sm font-medium">Contratos flexibles</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors z-20"
          aria-label="Volver arriba"
        >
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default ServiciosPage;