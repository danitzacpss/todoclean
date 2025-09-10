// ===================================
// TODO CLEAN - PRICING TABLE COMPONENT
// Responsive pricing table for residential services
// ===================================

import React from 'react';
import { formatPrice } from '@/utils/pricing';
import { Link } from 'react-router-dom';

interface PricingTier {
  size: string;
  range: string;
  regular: number;
  deep: number;
  postConstruction: number;
  popular?: boolean;
}

interface PricingTableProps {
  className?: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    size: 'Pequeño',
    range: '<50m²',
    regular: 35000,
    deep: 55000,
    postConstruction: 80000,
  },
  {
    size: 'Mediano',
    range: '50-100m²',
    regular: 45000,
    deep: 70000,
    postConstruction: 100000,
    popular: true,
  },
  {
    size: 'Grande',
    range: '100-150m²',
    regular: 55000,
    deep: 85000,
    postConstruction: 120000,
  },
  {
    size: 'Extra Grande',
    range: '>150m²',
    regular: 0, // Cotizar
    deep: 0, // Cotizar
    postConstruction: 0, // Cotizar
  },
];

const SERVICE_TYPES = [
  {
    id: 'regular',
    name: 'Limpieza Regular',
    description: 'Mantención semanal/quincenal',
    duration: '3-4 horas',
    color: 'bg-blue-500',
  },
  {
    id: 'deep',
    name: 'Limpieza Profunda',
    description: 'Detallada y desinfección',
    duration: '4-6 horas',
    color: 'bg-green-500',
  },
  {
    id: 'postConstruction',
    name: 'Post-Obra',
    description: 'Después de construcción',
    duration: '3 horas',
    color: 'bg-orange-500',
  },
];

const PricingTable: React.FC<PricingTableProps> = ({ className = '' }) => {
  const handleWhatsAppContact = (serviceType: string, size: string) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa el servicio de ${serviceType} para un espacio ${size.toLowerCase()}. ¿Podrían darme más información y disponibilidad?`
    );
    window.open(
      `https://wa.me/56926176543?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Precios Transparentes por Servicio
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Precios claros sin sorpresas. Todos nuestros servicios incluyen productos, 
          herramientas y garantía de satisfacción.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Tabla de precios por tipo de servicio">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900" scope="col">
                  Tamaño del Espacio
                </th>
                {SERVICE_TYPES.map((service) => (
                  <th key={service.id} className="px-6 py-4 text-center text-sm font-semibold text-neutral-900" scope="col">
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-3 h-3 ${service.color} rounded-full mb-2`}
                        aria-hidden="true"
                      />
                      <span>{service.name}</span>
                      <span className="text-xs text-neutral-500 font-normal mt-1">
                        {service.duration}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {PRICING_TIERS.map((tier, index) => (
                <tr 
                  key={tier.range} 
                  className={`hover:bg-neutral-50 transition-colors ${
                    tier.popular ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <th className="px-6 py-4" scope="row">
                    <div className="flex items-center">
                      <div>
                        <div className="font-semibold text-neutral-900 flex items-center">
                          {tier.size}
                          {tier.popular && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Más Popular
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-neutral-500">{tier.range}</div>
                      </div>
                    </div>
                  </th>
                  
                  {SERVICE_TYPES.map((service) => {
                    const price = tier[service.id as keyof Pick<PricingTier, 'regular' | 'deep' | 'postConstruction'>];
                    const isQuote = price === 0;
                    
                    return (
                      <td key={service.id} className="px-6 py-4 text-center">
                        <div className="space-y-2">
                          <div className="text-xl font-bold text-neutral-900">
                            {isQuote ? 'Cotizar' : (
                              <div className="flex items-baseline justify-center gap-1">
                                <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">desde</span>
                                <span>{formatPrice(price)}</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleWhatsAppContact(service.name, tier.size)}
                            className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              tier.popular
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                            aria-label={`${isQuote ? 'Solicitar cotización' : 'Contratar'} servicio de ${service.name} para espacio ${tier.size.toLowerCase()}`}
                          >
                            {isQuote ? 'Solicitar Cotización' : 'Contratar'}
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-6">
        {PRICING_TIERS.map((tier) => (
          <div 
            key={tier.range} 
            className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden ${
              tier.popular 
                ? 'border-blue-200 ring-2 ring-blue-100' 
                : 'border-neutral-200'
            }`}
          >
            {/* Card Header */}
            <div className={`px-6 py-4 ${tier.popular ? 'bg-blue-50' : 'bg-neutral-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{tier.size}</h3>
                  <p className="text-sm text-neutral-600">{tier.range}</p>
                </div>
                {tier.popular && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Más Popular
                  </span>
                )}
              </div>
            </div>

            {/* Services */}
            <div className="p-6 space-y-4">
              {SERVICE_TYPES.map((service) => {
                const price = tier[service.id as keyof Pick<PricingTier, 'regular' | 'deep' | 'postConstruction'>];
                const isQuote = price === 0;
                
                return (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${service.color} rounded-full`} />
                      <div>
                        <div className="font-medium text-neutral-900">{service.name}</div>
                        <div className="text-xs text-neutral-500">{service.duration}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-neutral-900 mb-1">
                        {isQuote ? 'Cotizar' : (
                          <div className="flex items-baseline justify-end gap-1">
                            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">desde</span>
                            <span>{formatPrice(price)}</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleWhatsAppContact(service.name, tier.size)}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        {isQuote ? 'Cotizar' : 'Contratar'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">¿Qué incluyen nuestros precios?</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Todos los productos de limpieza eco-friendly</li>
              <li>• Herramientas y equipos profesionales</li>
              <li>• Personal capacitado con antecedentes verificados</li>
              <li>• Garantía de satisfacción 100%</li>
              <li>• Seguro de responsabilidad civil incluido</li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-amber-200">
              <p className="text-sm text-amber-700 mb-3">
                <strong>Descuentos por frecuencia:</strong> Semanal 15% • Quincenal 10% • Mensual 5%
              </p>
              <Link
                to="/cotizador"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2v14a2 2 0 002 2z" />
                </svg>
                Calcular con Descuentos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;