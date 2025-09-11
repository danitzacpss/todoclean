// ===================================
// TODO CLEAN - DATE PICKER COMPONENT
// Custom date picker for service scheduling
// ===================================

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  className?: string;
  error?: string;
  required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value = '',
  onChange,
  label,
  placeholder = 'Selecciona una fecha',
  disabled = false,
  minDate,
  maxDate,
  className,
  error,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Calculate min and max dates
  const today = new Date();
  const defaultMinDate = new Date();
  defaultMinDate.setDate(today.getDate() + 1); // Tomorrow as minimum
  
  const defaultMaxDate = new Date();
  defaultMaxDate.setDate(today.getDate() + 60); // 2 months ahead as maximum

  const minDateString = minDate || defaultMinDate.toISOString().split('T')[0];
  const maxDateString = maxDate || defaultMaxDate.toISOString().split('T')[0];

  // Format display value
  useEffect(() => {
    if (value) {
      try {
        const date = new Date(value);
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'America/Santiago'
        };
        const formatter = new Intl.DateTimeFormat('es-CL', options);
        setDisplayValue(formatter.format(date));
      } catch (error) {
        setDisplayValue(value);
      }
    } else {
      setDisplayValue('');
    }
  }, [value]);

  // Handle date selection
  const handleDateSelect = (selectedDate: string) => {
    onChange(selectedDate);
    setIsOpen(false);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Generate quick date options
  const generateQuickOptions = () => {
    const options = [];
    const startDate = new Date(minDateString || new Date());
    
    // Next 14 days
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      if (date <= new Date(maxDateString || '2030-12-31')) {
        options.push(date);
      }
    }
    
    return options;
  };

  const quickOptions = generateQuickOptions();

  // Get relative day name
  const getRelativeDayName = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    if (date.toDateString() === today.toDateString()) return 'Hoy';
    if (date.toDateString() === tomorrow.toDateString()) return 'Mañana';
    if (date.toDateString() === dayAfterTomorrow.toDateString()) return 'Pasado mañana';
    
    return date.toLocaleDateString('es-CL', { weekday: 'long' });
  };

  // Format option display
  const formatOptionDisplay = (date: Date) => {
    const dayName = getRelativeDayName(date);
    const dateString = date.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short'
    });
    
    return `${dayName}, ${dateString}`;
  };

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input trigger */}
      <div
        className={cn(
          'relative w-full px-3 py-2 text-left bg-white border border-neutral-300 rounded-lg shadow-sm cursor-pointer transition-colors',
          'hover:border-neutral-400 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500',
          disabled && 'opacity-50 cursor-not-allowed hover:border-neutral-300',
          error && 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500',
          isOpen && 'border-primary-500 ring-1 ring-primary-500'
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={cn(
          'block truncate',
          displayValue ? 'text-neutral-900' : 'text-neutral-500'
        )}>
          {displayValue || placeholder}
        </span>
        
        {/* Calendar icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className={cn(
              'h-5 w-5 text-neutral-400 transition-transform',
              isOpen && 'rotate-180'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-300 rounded-lg shadow-lg">
          {/* Quick options */}
          <div className="p-2">
            <div className="text-xs font-medium text-neutral-500 mb-2">Fechas disponibles</div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {quickOptions.map((date, index) => {
                const dateString = date.toISOString().split('T')[0];
                const isSelected = value === dateString;
                
                return (
                  <button
                    key={index}
                    type="button"
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                      isSelected 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    )}
                    onClick={() => dateString && handleDateSelect(dateString)}
                  >
                    {formatOptionDisplay(date)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Native date input as fallback */}
          <div className="border-t border-neutral-200 p-2">
            <input
              ref={inputRef}
              type="date"
              min={minDateString}
              max={maxDateString}
              value={value}
              onChange={(e) => handleDateSelect(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="O selecciona una fecha específica"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;