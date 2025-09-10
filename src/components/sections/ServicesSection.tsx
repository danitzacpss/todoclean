// ===================================
// TODO CLEAN - SERVICES SECTION
// Interactive services cards with pricing
// ===================================

import React from 'react';
import { motion } from 'framer-motion';
import { SERVICE_PRICING, WHATSAPP_MESSAGES } from '@/utils/constants';
import { getPriceRange, formatPrice } from '@/utils/pricing';
import { WhatsAppButton } from '@/components/ui/Button';
import type { ServiceType } from '@/types';

// ==========================================
// INTERFACES
// ==========================================

interface ServiceCardProps {
  serviceType: ServiceType;
  title: string;
  description: string;
  features: string[];
  icon: string;
  popular?: boolean;
  index: number;
  price: number;
  period: string;
}

// ==========================================
// COMPONENT DATA
// ==========================================

const SERVICES_DATA = [
  {
    serviceType: 'regular' as ServiceType,
    title: 'Plan Mensual',
    description: 'Plan de Aseo Profesional - 1 vez por semana',
    features: [
      'Aseo profundo semanal (3 hrs)',
      'Kit de insumos básicos (solo primer mes)',
      'Profesionalismo y puntualidad',
      'Planes flexibles',
      'Soporte telefónico',
    ],
    icon: '📅',
    price: 99000,
    period: 'Mensual',
  },
  {
    serviceType: 'profunda' as ServiceType,
    title: 'Plan Trimestral',
    description: 'Plan de Aseo Profesional - 1 vez por semana',
    features: [
      'Aseo profundo semanal (3 hrs)',
      'Kit de insumos básicos (solo primer mes)',
      'Profesionalismo y puntualidad',
      'Planes flexibles',
      'Descuento por trimestre',
      'Soporte prioritario',
    ],
    icon: '📊',
    popular: true,
    price: 89000,
    period: 'Trimestral',
  },
  {
    serviceType: 'postobra' as ServiceType,
    title: 'Plan Anual',
    description: 'Plan de Aseo Profesional - 1 vez por semana',
    features: [
      'Aseo profundo semanal (3 hrs)',
      'Kit de insumos básicos (solo primer mes)',
      'Profesionalismo y puntualidad',
      'Planes flexibles',
      'Máximo descuento anual',
      'Soporte VIP y flexibilidad total',
    ],
    icon: '⏰',
    price: 80000,
    period: 'Anual',
  },
];

// ==========================================
// SERVICE CARD COMPONENT
// ==========================================

const ServiceCard: React.FC<ServiceCardProps> = ({
  serviceType,
  title,
  description,
  features,
  icon,
  popular = false,
  index,
  price,
  period,
}) => {
  // WhatsApp click is handled by the WhatsAppButton component itself

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-2xl shadow-xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
        popular
          ? 'border-accent-400 ring-4 ring-accent-400/20'
          : 'border-neutral-200 hover:border-accent-300'
      }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Más Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-2 mb-1">
          <span className="text-sm text-neutral-500 font-medium uppercase tracking-wide">desde</span>
          <span className="text-3xl font-bold text-neutral-900">
            ${price.toLocaleString('es-CL').replace(/,/g, '.')}
          </span>
        </div>
        <div className="text-neutral-500">
          Mensual
        </div>
        <div className="text-sm text-accent-600 font-semibold mt-2">
          3 horas de limpieza profunda
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        <h4 className="font-semibold text-neutral-900 flex items-center">
          <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
          Incluye:
        </h4>
        <ul className="space-y-2">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start text-sm text-neutral-700">
              <span className="text-accent-500 mr-2 mt-0.5">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <WhatsAppButton
          size="lg"
          message={`¡Hola! Me interesa el ${title} de $${price.toLocaleString('es-CL').replace(/,/g, '.')} CLP mensual. ¿Podrían darme más información?`}
          trackingSource={`services-${serviceType}`}
          className="w-full"
        >
          Contratar {title}
        </WhatsAppButton>
        
        {/* Temporalmente oculto
        <button
          onClick={() => window.location.href = `/servicios/${serviceType}`}
          className="w-full text-center text-sm text-neutral-600 hover:text-accent-600 transition-colors underline"
        >
          Ver detalles completos
        </button>
        */}
      </div>

      {/* Duration Badge */}
      <div className="absolute top-4 right-4">
        <div className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs font-medium">
          3h semanales
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const ServicesSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-neutral-50/80 to-neutral-50 overflow-hidden">
      {/* Elementos decorativos sutiles pero visibles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Pequeños acentos celestes visibles */}
        <div className="absolute top-20 left-10 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-30"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-blue-400 rounded-full opacity-25"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-30"></div>
        
        {/* Elementos geométricos más visibles */}
        <div className="absolute top-1/3 right-10 w-8 h-8 border-2 border-cyan-300 rounded opacity-50 rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-10 h-10 border-2 border-blue-300 rounded-full opacity-40"></div>
        <div className="absolute top-16 left-1/3 w-6 h-6 border-2 border-teal-300 opacity-45 rotate-12"></div>
      </div>
      <div className="container mx-auto px-1 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-4">
              Plan de Aseo Profesional
            </h2>
            <div className="text-xl text-neutral-600 max-w-full sm:max-w-2xl mx-auto">
              <p>Tu espacio limpio, fresco y listo para rendir ✨</p>
              <p>1 vez por semana - 3 horas de limpieza profunda</p>
            </div>
            <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-xl mx-auto">
              <p className="text-sm text-accent-700">
                <span className="font-semibold">Kit de insumos básicos incluye:</span> escoba, cloro, jabón y pala
                <br />
                <span className="text-accent-600">*Solo durante el primer mes de contrato</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES_DATA.map((service, index) => (
          <ServiceCard
            key={service.serviceType}
            serviceType={service.serviceType}
            title={service.title}
            description={service.description}
            features={service.features}
            icon={service.icon}
            popular={service.popular || false}
            index={index}
            price={service.price}
            period={service.period}
          />
        ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full sm:max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              ¡Contrata hoy mismo tu plan y deja tu espacio impecable con Todo Clean!
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-neutral-700">
                <span className="text-accent-500">✉️</span>
                <a href="mailto:todocleanchillan@gmail.com" className="hover:text-accent-600 transition-colors">
                  todocleanchillan@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <span className="text-accent-500">📞</span>
                <a href="tel:+56926176543" className="hover:text-accent-600 transition-colors">
                  +56 9 2617 6543
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;