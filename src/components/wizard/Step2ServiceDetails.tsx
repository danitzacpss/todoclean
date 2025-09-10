// ===================================
// TODO CLEAN - STEP 2 SERVICE DETAILS
// Service type, frequency, extras, and date selection
// ===================================

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import DatePicker from '@/components/ui/DatePicker';
import type { ServiceType, FrequencyType, QuoteFormData, ExtraService } from '@/types';
import { SERVICE_PRICING, FREQUENCY_DISCOUNTS, EXTRA_SERVICES } from '@/utils/constants';
import { formatPrice, formatDiscount, formatHours } from '@/utils/pricing';

interface Step2ServiceDetailsProps {
  formData: Partial<QuoteFormData>;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  errors: Record<string, string>;
  className?: string;
}

const Step2ServiceDetails: React.FC<Step2ServiceDetailsProps> = ({
  formData,
  updateFormData,
  errors,
  className,
}) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const serviceTypes: Array<{
    id: ServiceType;
    name: string;
    description: string;
    icon: string;
    popular?: boolean;
    recommended?: boolean;
  }> = [
    {
      id: 'regular',
      name: 'Limpieza Regular',
      description: 'Mantenimiento semanal o quincenal',
      icon: '🧹',
      popular: true,
    },
    {
      id: 'profunda',
      name: 'Limpieza Profunda',
      description: 'Limpieza detallada y completa',
      icon: '✨',
      recommended: true,
    },
    {
      id: 'postobra',
      name: 'Limpieza Post-Obra',
      description: 'Para después de construcciones',
      icon: '🏗️',
    },
  ];

  // Validation
  const validateField = (field: string, value: any) => {
    const newErrors = { ...localErrors };
    
    switch (field) {
      case 'serviceType':
        if (!value) {
          newErrors.serviceType = 'Selecciona el tipo de servicio';
        } else {
          delete newErrors.serviceType;
        }
        break;
        
      case 'frequency':
        if (!value) {
          newErrors.frequency = 'Selecciona la frecuencia del servicio';
        } else {
          delete newErrors.frequency;
        }
        break;
    }
    
    setLocalErrors(newErrors);
  };

  // Handle service type change
  const handleServiceTypeChange = (serviceType: ServiceType) => {
    updateFormData({ serviceType });
    validateField('serviceType', serviceType);
  };

  // Handle frequency change
  const handleFrequencyChange = (frequency: FrequencyType) => {
    updateFormData({ frequency });
    validateField('frequency', frequency);
  };

  // Handle extras change
  const handleExtrasChange = (extraId: string) => {
    const currentExtras = formData.extras || [];
    const newExtras = currentExtras.includes(extraId)
      ? currentExtras.filter(id => id !== extraId)
      : [...currentExtras, extraId];
    
    updateFormData({ extras: newExtras });
  };

  // Handle date change
  const handleDateChange = (preferredDate: string) => {
    updateFormData({ preferredDate });
  };

  // Calculate estimated base price for preview
  const getEstimatedPrice = (serviceType: ServiceType, frequency: FrequencyType) => {
    if (!formData.squareMeters) return null;
    
    const servicePricing = SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING];
    if (!servicePricing) return null;
    
    const basePrice = servicePricing.basePrice + (formData.squareMeters * servicePricing.pricePerSqm);
    const frequencyData = FREQUENCY_DISCOUNTS[frequency as keyof typeof FREQUENCY_DISCOUNTS];
    const discount = frequencyData?.discount || 0;
    const finalPrice = basePrice - (basePrice * discount);
    
    return Math.round(finalPrice);
  };

  // Group extra services by category
  const extrasByCategory = EXTRA_SERVICES.reduce((acc, extra) => {
    if (!acc[extra.category]) {
      acc[extra.category] = [];
    }
    acc[extra.category]!.push(extra);
    return acc;
  }, {} as Record<string, ExtraService[]>);

  const categoryNames = {
    interior: 'Interior',
    exterior: 'Exterior',
    appliances: 'Electrodomésticos',
  };

  const allErrors = { ...localErrors, ...errors };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Detalles del Servicio
        </h2>
        <p className="text-neutral-600">
          Elige el tipo de limpieza y frecuencia que mejor se adapte a tus necesidades
        </p>
      </div>

      {/* Service Type Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-4">
          ¿Qué tipo de servicio necesitas? *
        </label>
        <div className="space-y-3">
          {serviceTypes.map((service) => {
            const isSelected = formData.serviceType === service.id;
            const servicePricing = SERVICE_PRICING[service.id as keyof typeof SERVICE_PRICING];
            const estimatedPrice = formData.squareMeters ? 
              getEstimatedPrice(service.id, formData.frequency || 'mensual') : null;
            
            return (
              <div
                key={service.id}
                className={cn(
                  'relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                  'hover:shadow-md hover:scale-[1.02]',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300',
                  allErrors.serviceType && 'border-red-300'
                )}
                onClick={() => handleServiceTypeChange(service.id)}
              >
                {/* Badges */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{service.icon}</span>
                    {service.popular && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        Popular
                      </span>
                    )}
                    {service.recommended && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        Recomendado
                      </span>
                    )}
                  </div>
                  {estimatedPrice && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary-600">
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-xs text-primary-400 font-medium uppercase tracking-wide">desde</span>
                          <span>{formatPrice(estimatedPrice)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-neutral-500">aprox.</div>
                    </div>
                  )}
                </div>

                {/* Service info */}
                <div className="mb-3">
                  <h3 className={cn(
                    'text-lg font-semibold mb-1',
                    isSelected ? 'text-primary-700' : 'text-neutral-900'
                  )}>
                    {service.name}
                  </h3>
                  <p className={cn(
                    'text-sm mb-2',
                    isSelected ? 'text-primary-600' : 'text-neutral-600'
                  )}>
                    {service.description}
                  </p>
                  <div className="text-xs text-neutral-500">
                    Duración: {servicePricing ? formatHours(servicePricing.minHours) : ''} - {servicePricing ? formatHours(servicePricing.maxHours) : ''}
                  </div>
                </div>

                {/* What's included preview */}
                {servicePricing && (
                  <div className="text-xs text-neutral-600">
                    <span className="font-medium">Incluye:</span>
                    <span className="ml-1">
                      {servicePricing.includes.slice(0, 2).join(', ')}
                      {servicePricing.includes.length > 2 && `, +${servicePricing.includes.length - 2} más`}
                    </span>
                  </div>
                )}

                {/* Selection indicator */}
                <div className={cn(
                  'absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all',
                  isSelected 
                    ? 'bg-primary-500 border-primary-500' 
                    : 'border-neutral-300'
                )}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {allErrors.serviceType && (
          <p className="mt-2 text-sm text-red-600">{allErrors.serviceType}</p>
        )}
      </div>

      {/* Frequency Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-4">
          ¿Con qué frecuencia necesitas el servicio? *
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(FREQUENCY_DISCOUNTS).map(([freq, data]) => {
            const frequency = freq as FrequencyType;
            const isSelected = formData.frequency === frequency;
            const hasDiscount = data.discount > 0;
            const estimatedPrice = formData.serviceType && formData.squareMeters ? 
              getEstimatedPrice(formData.serviceType, frequency) : null;
            
            return (
              <button
                key={frequency}
                type="button"
                onClick={() => handleFrequencyChange(frequency)}
                className={cn(
                  'p-4 rounded-xl border-2 text-center transition-all duration-200',
                  'hover:scale-105 hover:shadow-md',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300',
                  allErrors.frequency && 'border-red-300'
                )}
              >
                <div className={cn(
                  'text-lg font-semibold mb-1',
                  isSelected ? 'text-primary-700' : 'text-neutral-900'
                )}>
                  {data.label}
                </div>
                {hasDiscount && (
                  <div className="text-green-600 text-sm font-medium mb-1">
                    {formatDiscount(data.discount)} dto.
                  </div>
                )}
                {estimatedPrice && (
                  <div className={cn(
                    'text-sm font-medium',
                    isSelected ? 'text-primary-600' : 'text-neutral-600'
                  )}>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs opacity-75 font-medium uppercase tracking-wide">desde</span>
                      <span>{formatPrice(estimatedPrice)}</span>
                    </div>
                  </div>
                )}
                <div className={cn(
                  'text-xs mt-1',
                  isSelected ? 'text-primary-600' : 'text-neutral-500'
                )}>
                  {data.description.split(' - ')[0]}
                </div>
              </button>
            );
          })}
        </div>
        {allErrors.frequency && (
          <p className="mt-2 text-sm text-red-600">{allErrors.frequency}</p>
        )}
      </div>

      {/* Extra Services */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-4">
          Servicios adicionales (opcionales)
        </label>
        <p className="text-sm text-neutral-600 mb-4">
          Selecciona los servicios extra que necesites para tu limpieza
        </p>
        
        {Object.entries(extrasByCategory).map(([category, extras]) => (
          <div key={category} className="mb-6">
            <h4 className="text-sm font-medium text-neutral-700 mb-3">
              {categoryNames[category as keyof typeof categoryNames]}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {extras.map((extra) => {
                const isSelected = (formData.extras || []).includes(extra.id);
                
                return (
                  <div
                    key={extra.id}
                    className={cn(
                      'p-3 rounded-lg border cursor-pointer transition-all duration-200',
                      'hover:shadow-sm hover:scale-[1.02]',
                      isSelected
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    )}
                    onClick={() => handleExtrasChange(extra.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={cn(
                          'w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all',
                          isSelected 
                            ? 'bg-primary-500 border-primary-500' 
                            : 'border-neutral-300'
                        )}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className={cn(
                            'text-sm font-medium',
                            isSelected ? 'text-primary-700' : 'text-neutral-900'
                          )}>
                            {extra.name}
                          </div>
                          <div className={cn(
                            'text-xs',
                            isSelected ? 'text-primary-600' : 'text-neutral-500'
                          )}>
                            {extra.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={cn(
                          'text-sm font-medium',
                          isSelected ? 'text-primary-700' : 'text-neutral-700'
                        )}>
                          {formatPrice(extra.price)}
                        </div>
                        <div className="text-xs text-neutral-500">
                          ~{extra.estimatedTime}min
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Preferred Date */}
      <div>
        <DatePicker
          value={formData.preferredDate || ''}
          onChange={handleDateChange}
          label="¿Cuándo te gustaría agendar? (opcional)"
          placeholder="Selecciona una fecha preferida"
          {...(allErrors.preferredDate && { error: allErrors.preferredDate })}
        />
        <p className="mt-1 text-xs text-neutral-500">
          Si no seleccionas fecha, nos contactaremos contigo para coordinar
        </p>
      </div>

      {/* Progress indicator */}
      <div className="bg-neutral-50 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Progreso del formulario:</span>
          <span className="font-medium text-primary-600">
            {[formData.serviceType, formData.frequency].filter(Boolean).length} / 2 completado
          </span>
        </div>
        <div className="mt-2 w-full bg-neutral-200 rounded-full h-1">
          <div 
            className="bg-primary-500 h-1 rounded-full transition-all duration-300"
            style={{ 
              width: `${([formData.serviceType, formData.frequency].filter(Boolean).length / 2) * 100}%` 
            }}
          />
        </div>
        
        {/* Selected extras summary */}
        {(formData.extras || []).length > 0 && (
          <div className="mt-3 pt-3 border-t border-neutral-200">
            <div className="text-xs text-neutral-600 mb-1">Servicios extra seleccionados:</div>
            <div className="flex flex-wrap gap-1">
              {(formData.extras || []).map((extraId) => {
                const extra = EXTRA_SERVICES.find(e => e.id === extraId);
                return extra ? (
                  <span key={extraId} className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                    {extra.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2ServiceDetails;