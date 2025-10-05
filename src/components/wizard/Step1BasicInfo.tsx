// ===================================
// TODO CLEAN - STEP 1 BASIC INFO
// Property type, square meters, and rooms selection
// ===================================

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import RangeSlider from '@/components/ui/RangeSlider';
import type { PropertyType, QuoteFormData } from '@/types';
import { PROPERTY_TYPES, ROOM_RANGES, VALIDATION_RULES } from '@/utils/constants';

interface Step1BasicInfoProps {
  formData: Partial<QuoteFormData>;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  errors: Record<string, string>;
  className?: string;
}

const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({
  formData,
  updateFormData,
  errors,
  className,
}) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Validation function
  const validateField = (field: string, value: any) => {
    const newErrors = { ...localErrors };
    
    switch (field) {
      case 'propertyType':
        if (!value) {
          newErrors.propertyType = 'Selecciona el tipo de propiedad';
        } else {
          delete newErrors.propertyType;
        }
        break;
        
      case 'squareMeters':
        if (!value || value < VALIDATION_RULES.MIN_SQUARE_METERS || value > VALIDATION_RULES.MAX_SQUARE_METERS) {
          newErrors.squareMeters = `Los metros cuadrados deben estar entre ${VALIDATION_RULES.MIN_SQUARE_METERS} y ${VALIDATION_RULES.MAX_SQUARE_METERS}`;
        } else {
          delete newErrors.squareMeters;
        }
        break;
        
      case 'rooms':
        if (!value || value < 1) {
          newErrors.rooms = 'Selecciona el número de ambientes';
        } else {
          delete newErrors.rooms;
        }
        break;
    }
    
    setLocalErrors(newErrors);
  };

  // Handle property type selection
  const handlePropertyTypeChange = (propertyType: PropertyType) => {
    updateFormData({ propertyType });
    validateField('propertyType', propertyType);
    
    // Suggest default square meters based on property type
    if (!formData.squareMeters || formData.squareMeters === 75) {
      const defaultSqm = {
        departamento: 60,
        casa: 120,
        oficina: 80,
        local: 100,
        airbnb: 75,
      };
      updateFormData({ propertyType, squareMeters: defaultSqm[propertyType] });
    }
  };

  // Handle square meters change
  const handleSquareMetersChange = (squareMeters: number) => {
    updateFormData({ squareMeters });
    validateField('squareMeters', squareMeters);
    
    // Auto-suggest rooms based on square meters
    let suggestedRooms = formData.rooms || 3;
    if (squareMeters < 50) suggestedRooms = 2;
    else if (squareMeters < 80) suggestedRooms = 3;
    else if (squareMeters < 120) suggestedRooms = 4;
    else if (squareMeters < 200) suggestedRooms = 6;
    else suggestedRooms = 8;
    
    if (!formData.rooms || Math.abs(formData.rooms - suggestedRooms) > 2) {
      updateFormData({ squareMeters, rooms: suggestedRooms });
    }
  };

  // Handle rooms change
  const handleRoomsChange = (rooms: number) => {
    updateFormData({ rooms });
    validateField('rooms', rooms);
  };

  // Combined errors from props and local validation
  const allErrors = { ...localErrors, ...errors };

  // Slider markers for common sizes
  const squareMetersMarkers = [
    { value: 50, label: '50m²' },
    { value: 100, label: '100m²' },
    { value: 150, label: '150m²' },
    { value: 200, label: '200m²' },
  ];

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Información Básica
        </h2>
        <p className="text-neutral-600">
          Cuéntanos sobre tu propiedad para calcular el precio más exacto
        </p>
      </div>

      {/* Property Type Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-4">
          ¿Qué tipo de propiedad necesita limpieza? *
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PROPERTY_TYPES.map((type) => {
            const isSelected = formData.propertyType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handlePropertyTypeChange(type.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all duration-200 group',
                  'hover:scale-105 hover:shadow-md',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300',
                  allErrors.propertyType && 'border-red-300'
                )}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className={cn(
                  'text-sm font-medium transition-colors',
                  isSelected ? 'text-primary-700' : 'text-neutral-700'
                )}>
                  {type.name}
                </div>
                <div className={cn(
                  'text-xs transition-colors',
                  isSelected ? 'text-primary-600' : 'text-neutral-500'
                )}>
                  {type.description}
                </div>
              </button>
            );
          })}
        </div>
        {allErrors.propertyType && (
          <p className="mt-2 text-sm text-red-600">{allErrors.propertyType}</p>
        )}
      </div>

      {/* Square Meters Slider */}
      <div>
        <RangeSlider
          min={20}
          max={500}
          value={formData.squareMeters || 75}
          onChange={handleSquareMetersChange}
          step={5}
          label="¿Cuántos metros cuadrados tiene? *"
          unit="m²"
          showMarkers={true}
          markers={squareMetersMarkers}
          className="mb-4"
        />
        
        {/* Quick size buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-neutral-600 mr-2">Tamaños comunes:</span>
          {[60, 80, 120, 150, 200].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSquareMetersChange(size)}
              className={cn(
                'px-3 py-1 text-xs rounded-full border transition-all',
                formData.squareMeters === size
                  ? 'bg-primary-100 border-primary-300 text-primary-700'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300'
              )}
            >
              {size}m²
            </button>
          ))}
        </div>
        
        {allErrors.squareMeters && (
          <p className="mt-2 text-sm text-red-600">{allErrors.squareMeters}</p>
        )}
      </div>

      {/* Rooms Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-4">
          ¿Cuántos ambientes tiene? *
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {ROOM_RANGES.map((range) => {
            const isSelected = formData.rooms === range.value;
            return (
              <button
                key={range.value}
                type="button"
                onClick={() => handleRoomsChange(range.value)}
                className={cn(
                  'p-4 rounded-xl border-2 text-center transition-all duration-200',
                  'hover:scale-105 hover:shadow-md',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300',
                  allErrors.rooms && 'border-red-300'
                )}
              >
                <div className={cn(
                  'text-xl font-bold mb-1',
                  isSelected ? 'text-primary-600' : 'text-neutral-700'
                )}>
                  {range.value}
                </div>
                <div className={cn(
                  'text-sm',
                  isSelected ? 'text-primary-600' : 'text-neutral-500'
                )}>
                  {range.label}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Custom rooms input */}
        <div className="mt-4 flex items-center space-x-3">
          <span className="text-sm text-neutral-600">O especifica:</span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleRoomsChange(Math.max(1, (formData.rooms || 3) - 1))}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="20"
              value={formData.rooms || 3}
              onChange={(e) => handleRoomsChange(parseInt(e.target.value) || 1)}
              className="w-16 text-center px-2 py-1 border border-neutral-300 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={() => handleRoomsChange(Math.min(20, (formData.rooms || 3) + 1))}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-neutral-500">ambientes</span>
        </div>
        
        {allErrors.rooms && (
          <p className="mt-2 text-sm text-red-600">{allErrors.rooms}</p>
        )}
      </div>

      {/* Progress indicator */}
      <div className="bg-neutral-50 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Progreso del formulario:</span>
          <span className="font-medium text-primary-600">
            {[formData.propertyType, formData.squareMeters, formData.rooms].filter(Boolean).length} / 3 completado
          </span>
        </div>
        <div className="mt-2 w-full bg-neutral-200 rounded-full h-1">
          <div 
            className="bg-primary-500 h-1 rounded-full transition-all duration-300"
            style={{ 
              width: `${([formData.propertyType, formData.squareMeters, formData.rooms].filter(Boolean).length / 3) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;