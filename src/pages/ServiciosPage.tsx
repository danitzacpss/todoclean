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
              precios transparentes y garantía de satisfacción 100%.
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
                <h3 className="font-semibold text-neutral-900 mb-2">Servicio Rápido</h3>
                <p className="text-neutral-600 text-sm">Respuesta en menos de 24 horas</p>
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
                        ? 'bg-blue-600 text-white shadow-lg'
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
                          activeTab === tab.id ? 'text-blue-100' : 'text-neutral-500'
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

        {/* Bottom CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para experimentar la diferencia?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a más de 350 clientes satisfechos que confían en nuestros servicios.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cotizador"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calcular Precio
              </Link>
              
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de limpieza.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
                </svg>
                Contactar WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
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