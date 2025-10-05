// ===================================
// TODO CLEAN - AIRBNB SERVICES SECTION
// Specialized cleaning services for Airbnb and short-term rentals
// ===================================

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/utils/constants';

interface AirbnbPricing {
  name: string;
  size: string;
  price: number;
  duration: string;
  features: string[];
}

const AIRBNB_PRICING: AirbnbPricing[] = [
  {
    name: 'Cabaña Básica',
    size: 'Hasta 40m²',
    price: 15000,
    duration: '1 hora',
    features: [
      'Cambio de ropa de cama',
      'Limpieza de baños',
      'Cocina básica',
      'Aspirado general',
      'Reposición de amenities',
    ],
  },
  {
    name: 'Departamento Estándar',
    size: '40-70m²',
    price: 25000,
    duration: '1.5 horas',
    features: [
      'Todo lo de Cabaña Básica',
      'Limpieza de todas las habitaciones',
      'Cocina completa',
      'Ventanas interiores',
      'Terrazas/balcones',
    ],
  },
  {
    name: 'Casa Completa',
    size: '70-120m²',
    price: 35000,
    duration: '2 horas',
    features: [
      'Todo lo de Departamento',
      'Múltiples habitaciones',
      'Áreas comunes',
      'Jardín/patio',
      'Check de inventario',
    ],
  },
  {
    name: 'Propiedad Premium',
    size: '>120m²',
    price: 50000,
    duration: '3 horas',
    features: [
      'Todo lo de Casa Completa',
      'Limpieza profunda',
      'Áreas especiales',
      'Reporte fotográfico',
      'Servicio urgente disponible',
    ],
  },
];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const AIRBNB_FAQS: FAQItem[] = [
  {
    id: '1',
    question: '¿Cuánto tiempo toma la limpieza entre huéspedes?',
    answer: 'Dependiendo del tamaño: Cabaña básica 1 hora, Departamento 1.5 horas, Casa 2 horas, Premium 3 horas. Garantizamos puntualidad para tu próximo check-in.',
  },
  {
    id: '2',
    question: '¿Pueden coordinarse con mi calendario de Airbnb?',
    answer: 'Sí, nos sincronizamos con tu calendario de reservas. Te avisamos cuando hay un checkout programado y coordinamos la limpieza antes del próximo check-in.',
  },
  {
    id: '3',
    question: '¿Qué pasa si encuentran daños o faltantes?',
    answer: 'Enviamos reporte fotográfico inmediato con cualquier novedad encontrada. Así puedes gestionar reclamos con Airbnb de forma oportuna.',
  },
  {
    id: '4',
    question: '¿Ofrecen servicio urgente o de último minuto?',
    answer: 'Sí, con 3 horas de anticipación podemos atender emergencias (sujeto a disponibilidad). Servicio urgente tiene un recargo del 30%.',
  },
];

const AirbnbServices: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const handleWhatsAppContact = (propertyType: string, price: number) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa el servicio de limpieza Airbnb para ${propertyType} ($${price.toLocaleString('es-CL')}). ¿Podrían darme más información?`
    );
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="space-y-16">
      {/* Hero Section - Modern Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
        <div className="grid md:grid-cols-5 gap-0 items-stretch min-h-[450px]">
          {/* Left: Image - 2 columns */}
          <div className="md:col-span-2 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=800&fit=crop"
              alt="Limpieza Airbnb profesional"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-50/30"></div>
          </div>

          {/* Right: Content - 3 columns */}
          <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
              Servicios Airbnb
            </h1>

            {/* Description */}
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed max-w-2xl">
              Limpieza express profesional entre huéspedes. Garantizamos tu propiedad impecable
              para cada check-in, con reportes fotográficos y coordinación con tu calendario.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">1h</div>
                <div className="text-xs text-neutral-600">Express</div>
              </div>
              <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100 shadow-sm">
                <div className="text-2xl font-bold text-pink-600">100%</div>
                <div className="text-xs text-neutral-600">Puntual</div>
              </div>
              <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-xs text-neutral-600">Disponible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Precios por Tipo de Propiedad
          </h2>
          <p className="text-lg text-neutral-600">
            Limpieza express entre huéspedes con garantía de puntualidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AIRBNB_PRICING.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 overflow-hidden group hover:shadow-xl"
            >
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 border-b border-purple-100">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {property.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-4">{property.size}</p>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-purple-600">
                    ${property.price.toLocaleString('es-CL')}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-2">
                  Duración: {property.duration}
                </p>
              </div>

              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {property.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-neutral-700">
                      <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleWhatsAppContact(property.name, property.price)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform group-hover:scale-105"
                >
                  Contratar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Servicios Adicionales Airbnb
          </h2>
          <p className="text-lg text-neutral-600">
            Complementa tu servicio de limpieza con estos extras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: 'Check de Inventario',
              price: 5000,
              description: 'Verificación completa de amenities y elementos',
              icon: '📋'
            },
            {
              name: 'Reporte Fotográfico',
              price: 3000,
              description: 'Fotos del estado post-limpieza',
              icon: '📸'
            },
            {
              name: 'Servicio Urgente',
              price: 10000,
              description: 'Atención en menos de 3 horas (+30% adicional)',
              icon: '⚡'
            },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{service.icon}</span>
                <div>
                  <h3 className="font-semibold text-neutral-900">{service.name}</h3>
                  <p className="text-sm text-neutral-600">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-purple-600">
                  ${service.price.toLocaleString('es-CL')}
                </span>
                <button
                  onClick={() => {
                    const message = encodeURIComponent(
                      `¡Hola! Me interesa cotizar el servicio de ${service.name} para mi Airbnb.`
                    );
                    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`, '_blank');
                  }}
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Cotizar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Preguntas Frecuentes Airbnb
          </h2>
          <p className="text-lg text-neutral-600">
            Respuestas sobre nuestro servicio especializado
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {AIRBNB_FAQS.map((faq) => (
            <div key={faq.id} className="bg-white border border-purple-100 rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple-50 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                aria-expanded={openFAQ === faq.id}
              >
                <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-purple-500 transition-transform duration-200 ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openFAQ === faq.id && (
                <div className="px-6 pb-4 text-neutral-600 border-t border-purple-100 bg-purple-50/30">
                  <div className="pt-4">{faq.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AirbnbServices;
