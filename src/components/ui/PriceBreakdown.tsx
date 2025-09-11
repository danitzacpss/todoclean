// ===================================
// TODO CLEAN - PRICE BREAKDOWN COMPONENT
// Detailed price breakdown with visual elements
// ===================================

import React from 'react';
import { cn } from '@/utils/cn';
import type { PriceCalculation } from '@/types';
import { formatPrice, formatDiscount, formatHours } from '@/utils/pricing';
import { EXTRA_SERVICES, SERVICE_PRICING, FREQUENCY_DISCOUNTS, SERVICE_AREAS } from '@/utils/constants';

interface PriceBreakdownProps {
  calculation: PriceCalculation;
  showDetails?: boolean;
  compact?: boolean;
  className?: string;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  calculation,
  showDetails = true,
  compact = false,
  className,
}) => {
  const servicePricing = SERVICE_PRICING[calculation.serviceType];
  const frequencyData = FREQUENCY_DISCOUNTS[calculation.frequency];
  const serviceArea = SERVICE_AREAS.find(area => area.zone === calculation.zone);
  
  // Get selected extra services
  const selectedExtras = EXTRA_SERVICES.filter(extra => 
    calculation.extras.includes(extra.id)
  );

  // Calculate subtotal before discounts
  const subtotalBeforeDiscount = calculation.basePrice + calculation.extrasTotal + calculation.zoneCharge;

  const serviceNames = {
    regular: 'Limpieza Regular',
    profunda: 'Limpieza Profunda',
    postobra: 'Limpieza Post-Obra',
  };

  const propertyNames = {
    casa: 'Casa',
    departamento: 'Departamento', 
    oficina: 'Oficina',
    local: 'Local Comercial',
  };

  if (compact) {
    return (
      <div className={cn('bg-white rounded-lg border border-neutral-200 p-4', className)}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-neutral-700">
              {serviceNames[calculation.serviceType]}
            </h4>
            <p className="text-xs text-neutral-500">
              {calculation.squareMeters}m² • {frequencyData.label}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary-600">
              {formatPrice(calculation.totalPrice)}
            </div>
            {calculation.frequencyDiscount > 0 && (
              <div className="text-xs text-green-600">
                Ahorro: {formatPrice(calculation.frequencyDiscount)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-neutral-200 shadow-sm', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 rounded-t-xl border-b border-primary-200">
        <h3 className="text-lg font-semibold text-primary-800 mb-1">
          Resumen de Cotización
        </h3>
        <p className="text-sm text-primary-600">
          {serviceNames[calculation.serviceType]} • {propertyNames[calculation.propertyType]}
        </p>
      </div>

      <div className="p-6">
        {/* Service details */}
        {showDetails && (
          <div className="mb-6 pb-6 border-b border-neutral-200">
            <h4 className="text-sm font-medium text-neutral-700 mb-3">Detalles del Servicio</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neutral-500">Área:</span>
                <span className="ml-2 font-medium">{calculation.squareMeters} m²</span>
              </div>
              <div>
                <span className="text-neutral-500">Ambientes:</span>
                <span className="ml-2 font-medium">{calculation.rooms}</span>
              </div>
              <div>
                <span className="text-neutral-500">Frecuencia:</span>
                <span className="ml-2 font-medium">{frequencyData.label}</span>
              </div>
              <div>
                <span className="text-neutral-500">Duración:</span>
                <span className="ml-2 font-medium">{formatHours(calculation.estimatedHours)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Price breakdown */}
        <div className="space-y-3 mb-6">
          {/* Base service */}
          <div className="flex justify-between items-center py-2">
            <div>
              <span className="text-sm font-medium text-neutral-700">
                {serviceNames[calculation.serviceType]}
              </span>
              <p className="text-xs text-neutral-500">
                Base: {formatPrice(servicePricing.basePrice)} + {calculation.squareMeters}m² × ${servicePricing.pricePerSqm}/m²
              </p>
            </div>
            <span className="font-medium text-neutral-900">
              {formatPrice(calculation.basePrice)}
            </span>
          </div>

          {/* Zone charge */}
          {calculation.zoneCharge > 0 && serviceArea && (
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm font-medium text-neutral-700">
                  Recargo zona {serviceArea.name}
                </span>
                <p className="text-xs text-neutral-500">
                  Tiempo de respuesta: {serviceArea.responseTime}
                </p>
              </div>
              <span className="font-medium text-neutral-900">
                + {formatPrice(calculation.zoneCharge)}
              </span>
            </div>
          )}

          {/* Extra services */}
          {selectedExtras.length > 0 && (
            <div className="py-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-700">
                  Servicios Adicionales
                </span>
                <span className="font-medium text-neutral-900">
                  + {formatPrice(calculation.extrasTotal)}
                </span>
              </div>
              <div className="ml-4 space-y-1">
                {selectedExtras.map((extra) => (
                  <div key={extra.id} className="flex justify-between text-xs text-neutral-600">
                    <span>{extra.name}</span>
                    <span>{formatPrice(extra.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtotal before discount */}
          {calculation.frequencyDiscount > 0 && (
            <div className="flex justify-between items-center py-2 border-t border-neutral-200">
              <span className="text-sm text-neutral-600">Subtotal</span>
              <span className="text-neutral-600">
                {formatPrice(subtotalBeforeDiscount)}
              </span>
            </div>
          )}

          {/* Frequency discount */}
          {calculation.frequencyDiscount > 0 && (
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm font-medium text-green-700">
                  Descuento por frecuencia
                </span>
                <p className="text-xs text-green-600">
                  {frequencyData.description} ({formatDiscount(frequencyData.discount)})
                </p>
              </div>
              <span className="font-medium text-green-700">
                - {formatPrice(calculation.frequencyDiscount)}
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="border-t-2 border-neutral-200 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold text-neutral-900">Total</span>
              <p className="text-xs text-neutral-500">
                Incluye productos y materiales
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {formatPrice(calculation.totalPrice)}
              </div>
              <div className="text-xs text-neutral-500">CLP</div>
              {calculation.frequency !== 'unica' && (
                <div className="text-xs text-neutral-400 mt-1">
                  Precio mensual • 1 limpieza semanal
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Savings highlight */}
        {calculation.frequencyDiscount > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-800">
                ¡Ahorras {formatPrice(calculation.frequencyDiscount)} con servicio {frequencyData.label.toLowerCase()}!
              </span>
            </div>
          </div>
        )}

        {/* What's included */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <h4 className="text-sm font-medium text-neutral-700 mb-3">
              Incluye en el servicio:
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {servicePricing.includes.map((item, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-neutral-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceBreakdown;