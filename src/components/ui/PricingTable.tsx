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
  unica: number;
  mensual: number;
  trimestral: number;
  anual: number;
  popular?: boolean;
}

interface PricingTableProps {
  className?: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    size: 'Pequeño',
    range: '<50m²',
    unica: 30000,
    mensual: 99000,
    trimestral: 89000,
    anual: 80000,
  },
  {
    size: 'Mediano',
    range: '50-100m²',
    unica: 35000,
    mensual: 115500,
    trimestral: 103950,
    anual: 93500,
    popular: true,
  },
  {
    size: 'Grande',
    range: '100-150m²',
    unica: 40000,
    mensual: 132000,
    trimestral: 118800,
    anual: 106800,
  },
  {
    size: 'Extra Grande',
    range: '>150m²',
    unica: 45000,
    mensual: 148500,
    trimestral: 133650,
    anual: 120150,
  },
];

const FREQUENCY_TYPES = [
  {
    id: 'unica',
    name: 'Una Vez',
    description: 'Sin compromiso',
    duration: '3-4 horas',
    color: 'bg-gray-500',
  },
  {
    id: 'mensual',
    name: 'Mensual',
    description: '+ de 17% descuento',
    duration: 'Precio por mes',
    color: 'bg-blue-500',
  },
  {
    id: 'trimestral',
    name: 'Trimestral',
    description: '+ de 25% descuento',
    duration: 'Precio por mes',
    color: 'bg-green-500',
  },
  {
    id: 'anual',
    name: 'Anual',
    description: '+ de 33% descuento',
    duration: 'Precio por mes',
    color: 'bg-orange-500',
  },
];

const PricingTable: React.FC<PricingTableProps> = ({ className = '' }) => {
  const handleWhatsAppContact = (frequencyType: string, size: string) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa contratar el plan ${frequencyType} para un espacio ${size.toLowerCase()}. ¿Podrían darme más información y disponibilidad?`
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
          Precios Transparentes por Frecuencia
        </h2>
        <p className="text-lg text-neutral-600 max-w-full sm:max-w-2xl mx-auto">
          Precios claros sin sorpresas. Todos nuestros planes incluyen productos, 
          herramientas y garantía de satisfacción.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Tabla de precios por frecuencia">
            <thead>
              <tr className="bg-gradient-to-r from-teal-50 to-cyan-50">
                <th className="px-6 py-4 text-left" scope="col">
                  <div className="font-semibold text-neutral-900">Tamaño del Espacio</div>
                  <div className="text-sm text-neutral-600">Metros cuadrados</div>
                </th>
                {FREQUENCY_TYPES.map((frequency) => (
                  <th key={frequency.id} className="px-6 py-4 text-center" scope="col">
                    <div className="font-semibold text-neutral-900">{frequency.name}</div>
                    <div className={`text-sm font-medium ${
                      frequency.id === 'mensual' ? 'text-teal-600' : 'text-neutral-600'
                    }`}>
                      {frequency.id === 'mensual' ? '+15% de ahorro' : 
                       frequency.id === 'trimestral' ? '+25% de ahorro' :
                       frequency.id === 'anual' ? '+30% de ahorro' :
                       frequency.description}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {PRICING_TIERS.map((tier, index) => (
                <tr 
                  key={tier.range} 
                  className={`hover:bg-neutral-50 transition-colors ${
                    tier.popular ? 'bg-teal-50/30' : ''
                  }`}
                >
                  <td className="px-6 py-6">
                    <div className="font-semibold text-neutral-900">{tier.size}</div>
                    <div className="text-sm text-neutral-600">{tier.range}</div>
                    {tier.popular && (
                      <div className="inline-flex items-center mt-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                        Más Popular
                      </div>
                    )}
                  </td>
                  
                  {FREQUENCY_TYPES.map((frequency) => {
                    const price = tier[frequency.id as keyof Pick<PricingTier, 'unica' | 'mensual' | 'trimestral' | 'anual'>];
                    const isQuote = price === 0;
                    
                    return (
                      <td key={frequency.id} className="px-6 py-6 text-center">
                        <div className="text-lg font-bold text-neutral-900">
                          {isQuote ? 'Cotizar' : formatPrice(price)}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {frequency.id === 'unica' ? 'servicio único' : 'por mes'}
                        </div>
                        {frequency.id !== 'unica' && (
                          <div className="text-xs text-teal-600 font-medium mt-1">
                            1 limpieza/semana
                          </div>
                        )}
                        <button
                          onClick={() => handleWhatsAppContact(frequency.name, tier.size)}
                          className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                        >
                          Contratar
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="bg-gradient-to-r from-neutral-50 to-teal-50 px-6 py-4 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neutral-600">
              <span className="font-medium">Incluye:</span> Productos profesionales, herramientas, personal capacitado y garantía de satisfacción
            </div>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/56926176543?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de limpieza residencial y obtener una cotización personalizada.')}`}
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

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-6">
        {PRICING_TIERS.map((tier) => (
          <div 
            key={tier.range} 
            className={`bg-white rounded-xl shadow-xl border overflow-hidden ${
              tier.popular 
                ? 'border-teal-200 ring-2 ring-teal-100' 
                : 'border-neutral-200'
            }`}
          >
            {/* Card Header */}
            <div className={`px-6 py-4 bg-gradient-to-r ${
              tier.popular ? 'from-teal-50 to-cyan-50' : 'from-neutral-50 to-neutral-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{tier.size}</h3>
                  <p className="text-sm text-neutral-600">{tier.range}</p>
                </div>
                {tier.popular && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                    Más Popular
                  </span>
                )}
              </div>
            </div>

            {/* Frequencies */}
            <div className="p-6 space-y-4">
              {FREQUENCY_TYPES.map((frequency) => {
                const price = tier[frequency.id as keyof Pick<PricingTier, 'unica' | 'mensual' | 'trimestral' | 'anual'>];
                const isQuote = price === 0;
                
                return (
                  <div key={frequency.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className={`font-medium ${
                        frequency.id === 'mensual' ? 'text-teal-600' : 'text-neutral-900'
                      }`}>
                        {frequency.name}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {frequency.id === 'mensual' ? '+15% de ahorro' : 
                         frequency.id === 'trimestral' ? '+25% de ahorro' :
                         frequency.id === 'anual' ? '+30% de ahorro' :
                         frequency.description}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold mb-1 text-neutral-900">
                        {isQuote ? 'Cotizar' : formatPrice(price)}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {frequency.id === 'unica' ? 'servicio único' : 'por mes'}
                      </div>
                      {frequency.id !== 'unica' && (
                        <div className="text-xs text-teal-600 font-medium">
                          1 limpieza/semana
                        </div>
                      )}
                      <button
                        onClick={() => handleWhatsAppContact(frequency.name, tier.size)}
                        className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded-md hover:bg-teal-700 transition-colors"
                      >
                        Contratar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Notice - Hidden */}
      {/* <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
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
                <strong>Descuentos por frecuencia:</strong> Mensual +17% • Trimestral +25% • Anual +33%
              </p>
              <Link
                to="/cotizador"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2v14a2 2 0 002 2z" />
                </svg>
                Calcular Precio Personalizado
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PricingTable;