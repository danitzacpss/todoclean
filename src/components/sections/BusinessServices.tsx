// ===================================
// TODO CLEAN - BUSINESS SERVICES SECTION
// Complete business services section with corporate plans and benefits
// ===================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/utils/constants';

// interface BusinessPlan {
//   id: string;
//   name: string;
//   price: number;
//   yearlyPrice: number;
//   frequency: string;
//   hoursPerVisit: string;
//   supplies: string;
//   discount: string;
//   popular?: boolean;
//   features: string[];
// }

interface Testimonial {
  id: string;
  company: string;
  person: string;
  role: string;
  content: string;
  rating: number;
  logo?: string;
}

/* const BUSINESS_PLANS: BusinessPlan[] = [
  {
    id: 'basic',
    name: 'BÁSICO',
    price: 80000,
    yearlyPrice: 80000 * 12,
    frequency: '1x semana',
    hoursPerVisit: '3 horas',
    supplies: 'Primer mes incluido',
    discount: '',
    features: [
      'Limpieza semanal programada',
      'Productos básicos incluidos',
      'Baños y cocinas corporativas',
      'Aspirado y trapeado',
      'Vaciado de papeleras',
      'Reporte mensual básico',
    ],
  },
  {
    id: 'professional',
    name: 'PROFESIONAL',
    price: 150000,
    yearlyPrice: Math.round(150000 * 12 * 0.9),
    frequency: '2x semana',
    hoursPerVisit: '4 horas',
    supplies: 'Siempre incluidos',
    discount: '-10%',
    popular: true,
    features: [
      'Todo lo del plan Básico',
      'Limpieza bi-semanal',
      'Productos premium incluidos',
      'Desinfección de superficies',
      'Limpieza de ventanas interiores',
      'Coordinador dedicado',
      'Reporte detallado mensual',
      'Soporte prioritario',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 280000,
    yearlyPrice: Math.round(280000 * 12 * 0.8),
    frequency: 'Diaria',
    hoursPerVisit: 'Flexible',
    supplies: 'Premium siempre',
    discount: '-20%',
    features: [
      'Todo lo del plan Profesional',
      'Limpieza diaria personalizada',
      'Productos ecológicos premium',
      'Limpieza profunda mensual',
      'Mantenimiento de plantas',
      'Servicio de emergencia 24/7',
      'Gerente de cuenta dedicado',
      'Dashboard en tiempo real',
      'SLA garantizado',
    ],
  },
]; */

const BUSINESS_BENEFITS = [
  {
    icon: '📄',
    title: 'Facturación Consolidada',
    description: 'Una sola factura mensual con todos los servicios detallados y respaldo tributario completo.',
  },
  {
    icon: '📊',
    title: 'Auditorías de Calidad',
    description: 'Supervisiones mensuales con checklist detallado y plan de mejora continua.',
  },
  {
    icon: '🏥',
    title: 'Certificado COVID-19',
    description: 'Protocolos sanitarios certificados y documentación para auditorías de seguridad.',
  },
];

const BUSINESS_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    company: 'Clínica Dental Sonrisa',
    person: 'Dr. Carlos Mendez',
    role: 'Director Médico',
    content: 'La desinfección y limpieza especializada de Todo Clean nos ha permitido mantener los más altos estándares sanitarios. Su protocolo COVID-19 es impecable.',
    rating: 5,
  },
  {
    id: '2',
    company: 'Estudio Jurídico & Asociados',
    person: 'María José Rivera',
    role: 'Socia Directora',
    content: 'Llevamos 2 años con su servicio profesional. La puntualidad y calidad es excepcional. Nuestros clientes siempre comentan lo impecable de nuestras oficinas.',
    rating: 5,
  },
  {
    id: '3',
    company: 'RestauranteBella Vista',
    person: 'José Luis Torres',
    role: 'Gerente General',
    content: 'El plan premium nos permite mantener la limpieza diaria que exige SEREMI. Su equipo especializado en restaurantes es fundamental para nuestro funcionamiento.',
    rating: 5,
  },
];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const BUSINESS_FAQS: FAQItem[] = [
  {
    id: '1',
    question: '¿Pueden adaptarse a nuestros horarios de funcionamiento?',
    answer: 'Absolutamente. Trabajamos en horarios flexibles incluyendo madrugadas, fines de semana y feriados. Nos adaptamos a su operación sin interrumpir la productividad.',
  },
  {
    id: '2',
    question: '¿Qué protocolos de seguridad manejan?',
    answer: 'Todo nuestro personal tiene antecedentes al día, capacitación en protocolos COVID-19, y manejo de información confidencial. Incluimos seguro de responsabilidad civil.',
  },
  {
    id: '3',
    question: '¿Cómo funciona el sistema de facturación?',
    answer: 'Emitimos una factura mensual consolidada con detalle de servicios, fechas y personal asignado. Aceptamos transferencia, cheques y pagos programados.',
  },
  {
    id: '4',
    question: '¿Ofrecen servicios especializados por industria?',
    answer: 'Sí, tenemos protocolos específicos para clínicas, restaurantes, oficinas, retail y otros. Cada industria requiere productos y procedimientos particulares.',
  },
];

const BusinessServices: React.FC = () => {
  // const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  // const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const handleWhatsAppContact = (frequencyType: string, officeSize: string) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa contratar el plan ${frequencyType} para una oficina ${officeSize.toLowerCase()}. ¿Podrían darme más información y disponibilidad?`
    );
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  // const handlePlanSelect = (planId: string) => {
  //   const plan = BUSINESS_PLANS.find(p => p.id === planId);
  //   if (plan) {
  //     const message = encodeURIComponent(
  //       `¡Hola! Me interesa el plan ${plan.name} para mi empresa. ¿Podrían darme más información y agendar una visita para cotización personalizada?`
  //     );
  //     window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`, '_blank');
  //   }
  // };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-neutral-900 mb-6">
          Servicios Empresariales
        </h1>
        
        <p className="text-xl text-neutral-600 max-w-full sm:max-w-3xl mx-auto mb-8">
          Soluciones integrales de limpieza para empresas, oficinas, clínicas y locales comerciales. 
          Mantenga su espacio profesional con estándares de excelencia.
        </p>

        {/* Enterprise Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-full sm:max-w-4xl mx-auto">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-neutral-600">Empresas Activas</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">99.5%</div>
            <div className="text-sm text-neutral-600">Uptime Garantizado</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-amber-600">24/7</div>
            <div className="text-sm text-neutral-600">Soporte Disponible</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">2h</div>
            <div className="text-sm text-neutral-600">Tiempo de Respuesta</div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Tabla de Precios Empresariales
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Precios transparentes según el tamaño de tu oficina y frecuencia de servicio
          </p>
        </div>

        {/* Business Pricing Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-teal-50 to-cyan-50">
                  <th className="px-6 py-4 text-left">
                    <div className="font-semibold text-neutral-900">Tamaño de Oficina</div>
                    <div className="text-sm text-neutral-600">Metros cuadrados</div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="font-semibold text-neutral-900">Una Vez</div>
                    <div className="text-sm text-neutral-600">Sin compromiso</div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="font-semibold text-neutral-900">Mensual</div>
                    <div className="text-sm text-teal-600 font-medium">+15% de ahorro</div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="font-semibold text-neutral-900">Trimestral</div>
                    <div className="text-sm text-neutral-600">+25% de ahorro</div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="font-semibold text-neutral-900">Anual</div>
                    <div className="text-sm text-neutral-600">+30% de ahorro</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="font-semibold text-neutral-900">Pequeña</div>
                    <div className="text-sm text-neutral-600">Hasta 50m²</div>
                    <div className="text-xs text-neutral-500 mt-1">1-5 empleados</div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$35.000</div>
                    <div className="text-xs text-neutral-500">servicio único</div>
                    <button 
                      onClick={() => handleWhatsAppContact('una vez', 'Pequeña')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$115.500</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('mensual', 'Pequeña')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$103.950</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('trimestral', 'Pequeña')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$93.450</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('anual', 'Pequeña')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors bg-teal-50/30">
                  <td className="px-6 py-6">
                    <div className="font-semibold text-neutral-900">Mediana</div>
                    <div className="text-sm text-neutral-600">50-150m²</div>
                    <div className="text-xs text-neutral-500 mt-1">6-15 empleados</div>
                    <div className="inline-flex items-center mt-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                      Más Popular
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$40.000</div>
                    <div className="text-xs text-neutral-500">servicio único</div>
                    <button 
                      onClick={() => handleWhatsAppContact('una vez', 'Mediana')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$132.000</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('mensual', 'Mediana')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$118.800</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('trimestral', 'Mediana')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$106.800</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('anual', 'Mediana')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="font-semibold text-neutral-900">Grande</div>
                    <div className="text-sm text-neutral-600">150-300m²</div>
                    <div className="text-xs text-neutral-500 mt-1">16-30 empleados</div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$45.000</div>
                    <div className="text-xs text-neutral-500">servicio único</div>
                    <button 
                      onClick={() => handleWhatsAppContact('una vez', 'Grande')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$148.500</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('mensual', 'Grande')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$133.650</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('trimestral', 'Grande')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$120.150</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('anual', 'Grande')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="font-semibold text-neutral-900">Corporativa</div>
                    <div className="text-sm text-neutral-600">Más de 300m²</div>
                    <div className="text-xs text-neutral-500 mt-1">30+ empleados</div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$50.000</div>
                    <div className="text-xs text-neutral-500">servicio único</div>
                    <button 
                      onClick={() => handleWhatsAppContact('una vez', 'Corporativa')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$165.000</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('mensual', 'Corporativa')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$148.500</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('trimestral', 'Corporativa')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-bold text-neutral-900">$133.500</div>
                    <div className="text-xs text-neutral-500">por mes</div>
                    <div className="text-xs text-teal-600 font-medium">1 limpieza/semana</div>
                    <button 
                      onClick={() => handleWhatsAppContact('anual', 'Corporativa')}
                      className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                    >
                      Contratar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="bg-gradient-to-r from-neutral-50 to-teal-50 px-6 py-4 border-t border-neutral-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-neutral-600">
                <span className="font-medium">Incluye:</span> Personal capacitado, productos profesionales, seguro de responsabilidad civil
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios empresariales y obtener una cotización personalizada.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white border border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Business Services */}
        <section className="bg-gradient-to-r from-neutral-50 to-teal-50/50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Servicios Adicionales Empresariales
            </h2>
            <p className="text-lg text-neutral-600">
              Complementa tu limpieza corporativa con estos servicios especializados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Limpieza Post-Obra',
                price: 25000,
                description: 'Remoción de polvo y residuos',
                icon: '🏗️'
              },
              {
                name: 'Desinfección COVID-19',
                price: 15000,
                description: 'Protocolo sanitario certificado',
                icon: '🦠'
              },
              {
                name: 'Limpieza de Alfombras',
                price: 8000,
                description: 'Shampoo profesional por m²',
                icon: '🏢'
              },
              {
                name: 'Ventanas Exteriores',
                price: 12000,
                description: 'Limpieza completa por fuera',
                icon: '🪟'
              },
              {
                name: 'Encerado de Pisos',
                price: 18000,
                description: 'Tratamiento y brillo profesional',
                icon: '✨'
              },
              {
                name: 'Limpieza de Cocina Industrial',
                price: 35000,
                description: 'Desengrase y sanitización',
                icon: '🍽️'
              },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{service.icon}</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{service.name}</h3>
                    <p className="text-sm text-neutral-600">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">desde</span>
                    <span className="text-lg font-bold text-teal-600">
                      ${service.price.toLocaleString().replace(/,/g, '.')}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      const message = encodeURIComponent(
                        `¡Hola! Me interesa agregar el servicio de ${service.name} a mi limpieza empresarial.`
                      );
                      window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`, '_blank');
                    }}
                    className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Plans Grid section has been hidden */}

        {/* Enterprise Contact */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            ¿Necesitas un plan personalizado?
          </h3>
          <p className="text-neutral-600 mb-6">
            Para empresas con más de 100 empleados o requerimientos especiales, 
            creamos propuestas a medida con descuentos corporativos adicionales.
          </p>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Necesito una propuesta corporativa personalizada para mi empresa.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
            </svg>
            Hablar con Experto
          </a>
        </div>
      </section>

      {/* Business Benefits */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Beneficios Exclusivos para Empresas
          </h2>
          <p className="text-lg text-neutral-600">
            Servicios diseñados específicamente para el entorno corporativo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BUSINESS_BENEFITS.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-50 rounded-2xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Lo Que Dicen Nuestros Clientes Corporativos
          </h2>
          <p className="text-lg text-neutral-600">
            Empresas locales que confían en nuestro servicio profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BUSINESS_TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Content */}
              <p className="text-neutral-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="border-t border-neutral-100 pt-4">
                <div className="font-semibold text-neutral-900">
                  {testimonial.person}
                </div>
                <div className="text-sm text-neutral-600">
                  {testimonial.role}
                </div>
                <div className="text-sm font-medium text-blue-600">
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section id="preguntas-frecuentes" className="mt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Preguntas Frecuentes Empresariales
          </h2>
          <p className="text-lg text-neutral-600">
            Respuestas a las consultas más comunes de nuestros clientes corporativos
          </p>
        </div>

        <div className="max-w-full sm:max-w-4xl mx-auto space-y-4">
          {BUSINESS_FAQS.map((faq) => (
            <div key={faq.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                aria-expanded={openFAQ === faq.id}
              >
                <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${
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
                <div className="px-6 pb-4 text-neutral-600 border-t border-neutral-100 bg-neutral-50">
                  <div className="pt-4">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Bottom CTA */}
        <div className="text-center mt-8 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            ¿No encuentras respuesta a tu pregunta?
          </h3>
          <p className="text-neutral-600 mb-4">
            Nuestro equipo está listo para ayudarte con cualquier consulta específica.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Tengo algunas preguntas sobre sus servicios empresariales.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
              </svg>
              Preguntar por WhatsApp
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-neutral-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Formulario de Contacto
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA - Hidden as requested */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          ¡Impulsa la Productividad de tu Empresa!
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-full sm:max-w-2xl mx-auto">
          Un entorno limpio y profesional mejora la moral del equipo, 
          impresiona a los clientes y reduce las enfermedades laborales.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Soy gerente/administrador de una empresa y me interesa conocer sus servicios corporativos. ¿Podrían agendar una visita para una cotización personalizada?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l2 2 4-4" />
            </svg>
            Agendar Visita Comercial
          </a>
          
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa recibir una propuesta comercial detallada para servicios empresariales.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
            </svg>
            Solicitar Propuesta
          </a>
        </div>
      </section> */}
    </div>
  );
};

export default BusinessServices;