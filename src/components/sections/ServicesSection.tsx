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
}

// ==========================================
// COMPONENT DATA
// ==========================================

const SERVICES_DATA = [
  {
    serviceType: 'regular' as ServiceType,
    title: 'Limpieza Regular',
    description: 'Perfecta para el mantenimiento semanal o quincenal de tu hogar',
    features: [
      'Aspirado y barrido completo',
      'Trapeado de todos los pisos',
      'Desinfección de baños',
      'Limpieza básica de cocina',
      'Cambio de sábanas',
      'Orden general de espacios',
    ],
    icon: '✨',
  },
  {
    serviceType: 'profunda' as ServiceType,
    title: 'Limpieza Profunda',
    description: 'Limpieza detallada ideal para ocasiones especiales',
    features: [
      'Todo lo incluido en limpieza regular',
      'Limpieza de ventanas interiores',
      'Electrodomésticos por dentro',
      'Zócalos y marcos de puertas',
      'Debajo de muebles móviles',
      'Desinfección profunda',
      'Limpieza de luminarias',
    ],
    icon: '⭐',
    popular: true,
  },
  {
    serviceType: 'postobra' as ServiceType,
    title: 'Limpieza Post-Obra',
    description: 'Especializada para después de construcciones y remodelaciones',
    features: [
      'Retiro de escombros y basura',
      'Aspirado de polvo de construcción',
      'Limpieza de ventanas completa',
      'Sanitización total',
      'Limpieza de residuos pegajosos',
      'Desinfección con productos especiales',
      'Preparación para habitabilidad',
    ],
    icon: '🔨',
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
}) => {
  const priceRange = getPriceRange(serviceType);
  
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
        <div className="text-3xl font-bold text-neutral-900 mb-1">
          Desde {formatPrice(priceRange.min)}
        </div>
        <div className="text-neutral-500">
          hasta {formatPrice(priceRange.max)} CLP
        </div>
        <div className="text-sm text-accent-600 font-semibold mt-2">
          Incluye materiales y herramientas
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
          message={WHATSAPP_MESSAGES.service(title.toLowerCase())}
          trackingSource={`services-${serviceType}`}
          className="w-full"
        >
          Cotizar {title}
        </WhatsAppButton>
        
        <button
          onClick={() => window.location.href = `/servicios/${serviceType}`}
          className="w-full text-center text-sm text-neutral-600 hover:text-accent-600 transition-colors underline"
        >
          Ver detalles completos
        </button>
      </div>

      {/* Duration Badge */}
      <div className="absolute top-4 right-4">
        <div className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs font-medium">
          {SERVICE_PRICING[serviceType]?.minHours || 3}-{SERVICE_PRICING[serviceType]?.maxHours || 6}h
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
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Servicios profesionales de limpieza adaptados a tus necesidades específicas
            </p>
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
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              ¿No estás seguro cuál elegir?
            </h3>
            <p className="text-neutral-600 mb-6">
              Nuestro equipo te ayudará a elegir el servicio perfecto para tu hogar
            </p>
            <WhatsAppButton
              size="lg"
              message="¡Hola! Necesito ayuda para elegir el servicio de limpieza más adecuado para mi hogar."
              trackingSource="services-help"
              className="mx-auto"
            >
              Hablar con un Experto
            </WhatsAppButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;