// ===================================
// TODO CLEAN - ADDRESS VALIDATOR COMPONENT
// Validates address and determines service zone coverage
// ===================================

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import type { ZoneType } from '@/types';
import { SERVICE_AREAS } from '@/utils/constants';
import { formatPrice } from '@/utils/pricing';

interface AddressValidatorProps {
  value: string;
  onChange: (address: string) => void;
  onZoneChange: (zone: ZoneType | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const AddressValidator: React.FC<AddressValidatorProps> = ({
  value,
  onChange,
  onZoneChange,
  label = 'Dirección del servicio',
  placeholder = 'Ingresa tu dirección completa',
  required = false,
  error,
  className,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [detectedZone, setDetectedZone] = useState<ZoneType | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Common addresses/areas for suggestions
  const commonAreas = [
    'Centro, Chillán',
    'Las Termas, Chillán',
    'Quilamapu, Chillán',
    'Chillán Viejo',
    'San Carlos',
    'Coihueco',
    'Ñiquén',
    'Bulnes',
    'Quillón',
    'San Ignacio',
    'El Carmen',
    'Pemuco',
  ];

  // Zone detection based on address keywords
  const detectZone = (address: string): ZoneType | null => {
    if (!address || address.length < 3) return null;
    
    const addressLower = address.toLowerCase();
    
    // Zone A (Centro) - highest priority areas
    const zoneAKeywords = ['centro', 'las termas', 'quilamapu', 'chillán centro', 'plaza de armas', 'libertad', 'constitución'];
    if (zoneAKeywords.some(keyword => addressLower.includes(keyword))) {
      return 'A';
    }
    
    // Zone B (Intermedia)
    const zoneBKeywords = ['chillán viejo', 'san carlos', 'coihueco', 'ñiquén', 'viejo'];
    if (zoneBKeywords.some(keyword => addressLower.includes(keyword))) {
      return 'B';
    }
    
    // Zone C (Extendida)
    const zoneCKeywords = ['bulnes', 'quillón', 'san ignacio', 'el carmen', 'pemuco'];
    if (zoneCKeywords.some(keyword => addressLower.includes(keyword))) {
      return 'C';
    }
    
    // Default to Zone A if contains "chillán" but no specific zone
    if (addressLower.includes('chillán')) {
      return 'A';
    }
    
    return null;
  };

  // Generate suggestions based on input
  const generateSuggestions = (input: string): string[] => {
    if (!input || input.length < 2) return [];
    
    const inputLower = input.toLowerCase();
    return commonAreas
      .filter(area => area.toLowerCase().includes(inputLower))
      .slice(0, 5);
  };

  // Handle address change
  const handleAddressChange = (newAddress: string) => {
    onChange(newAddress);
    setIsValidating(true);
    
    // Generate suggestions
    const newSuggestions = generateSuggestions(newAddress);
    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0);
    
    // Detect zone after a short delay
    setTimeout(() => {
      const zone = detectZone(newAddress);
      setDetectedZone(zone);
      onZoneChange(zone);
      setIsValidating(false);
    }, 500);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    handleAddressChange(suggestion);
    setShowSuggestions(false);
  };

  // Clear suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    
    if (showSuggestions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
    return undefined;
  }, [showSuggestions]);

  const getZoneInfo = (zone: ZoneType | null) => {
    if (!zone) return null;
    return SERVICE_AREAS.find(area => area.zone === zone);
  };

  const zoneInfo = getZoneInfo(detectedZone);

  return (
    <div className={cn('relative w-full', className)}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full px-3 py-2 pr-10 border border-neutral-300 rounded-lg shadow-sm',
            'focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
            'placeholder:text-neutral-400',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
        />
        
        {/* Loading indicator */}
        {isValidating && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
          </div>
        )}
        
        {/* Zone indicator */}
        {!isValidating && detectedZone && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: zoneInfo?.color }}
              title={`Zona ${detectedZone}: ${zoneInfo?.name}`}
            />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-300 rounded-lg shadow-lg">
          <div className="py-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-neutral-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {suggestion}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zone information */}
      {detectedZone && zoneInfo && (
        <div className="mt-3 p-3 rounded-lg border" style={{ 
          borderColor: zoneInfo.color, 
          backgroundColor: `${zoneInfo.color}15` 
        }}>
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: zoneInfo.color }}
              />
              <div>
                <h4 className="text-sm font-medium text-neutral-900">
                  {zoneInfo.name} (Zona {detectedZone})
                </h4>
                <p className="text-xs text-neutral-600">
                  Tiempo de respuesta: {zoneInfo.responseTime}
                </p>
              </div>
            </div>
            
            {zoneInfo.surcharge > 0 && (
              <div className="text-right">
                <div className="text-sm font-medium text-neutral-900">
                  +{formatPrice(zoneInfo.surcharge)}
                </div>
                <div className="text-xs text-neutral-500">recargo</div>
              </div>
            )}
          </div>
          
          {zoneInfo.surcharge === 0 && (
            <div className="mt-2 flex items-center text-green-700">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Sin recargo por zona</span>
            </div>
          )}
        </div>
      )}

      {/* No coverage warning */}
      {value.length > 5 && !detectedZone && !isValidating && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-amber-800">
                Zona no reconocida
              </h4>
              <p className="text-xs text-amber-700 mt-1">
                No pudimos determinar tu zona automáticamente. Por favor verifica que la dirección esté en nuestra área de cobertura (Chillán y alrededores).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Coverage areas help */}
      <div className="mt-3">
        <button
          type="button"
          className="text-xs text-primary-600 hover:text-primary-700 underline"
          onClick={() => {
            // This could open a modal or navigate to coverage page
            window.open('/cobertura', '_blank');
          }}
        >
          Ver todas las zonas de cobertura
        </button>
      </div>
    </div>
  );
};

export default AddressValidator;