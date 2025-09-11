// ===================================
// TODO CLEAN - RANGE SLIDER COMPONENT
// Interactive slider with visual feedback
// ===================================

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  label?: string;
  unit?: string;
  formatValue?: (value: number) => string;
  className?: string;
  disabled?: boolean;
  showMarkers?: boolean;
  markers?: { value: number; label: string }[];
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  label,
  unit = '',
  formatValue,
  className,
  disabled = false,
  showMarkers = false,
  markers = [],
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  // Calculate percentage position
  // const percentage = ((value - min) / (max - min)) * 100;

  // Format display value
  const formattedValue = formatValue ? formatValue(value) : `${value}${unit}`;

  // Handle mouse/touch events
  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(true);
  }, [disabled]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(true);
  }, [disabled]);

  // Calculate value from position
  const calculateValueFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return value;

    const rect = sliderRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const newValue = min + (max - min) * Math.max(0, Math.min(1, position));
    return Math.round(newValue / step) * step;
  }, [min, max, step, value]);

  // Handle click on track
  const handleTrackClick = useCallback((event: React.MouseEvent) => {
    if (disabled || isDragging) return;
    const newValue = calculateValueFromPosition(event.clientX);
    onChange(newValue);
  }, [disabled, isDragging, calculateValueFromPosition, onChange]);

  // Mouse move handler
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      const newValue = calculateValueFromPosition(event.clientX);
      setDisplayValue(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onChange(displayValue);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        if (touch) {
          const newValue = calculateValueFromPosition(touch.clientX);
          setDisplayValue(newValue);
        }
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      onChange(displayValue);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, calculateValueFromPosition, onChange, displayValue]);

  // Sync display value with prop value when not dragging
  useEffect(() => {
    if (!isDragging) {
      setDisplayValue(value);
    }
  }, [value, isDragging]);

  const currentValue = isDragging ? displayValue : value;
  const currentPercentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      {/* Label */}
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-neutral-700">
            {label}
          </label>
          <span className="text-lg font-semibold text-primary-600">
            {isDragging ? formatValue?.(displayValue) || `${displayValue}${unit}` : formattedValue}
          </span>
        </div>
      )}

      {/* Slider container */}
      <div className="relative">
        {/* Track */}
        <div
          ref={sliderRef}
          className={cn(
            "relative h-2 bg-neutral-200 rounded-full cursor-pointer transition-colors",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "hover:bg-neutral-300"
          )}
          onClick={handleTrackClick}
        >
          {/* Progress fill */}
          <div
            className={cn(
              "absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-150",
              isDragging && "from-primary-600 to-primary-700"
            )}
            style={{ width: `${currentPercentage}%` }}
          />

          {/* Thumb */}
          <div
            ref={thumbRef}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-primary-500 rounded-full shadow-lg cursor-grab transition-all duration-150",
              isDragging && "scale-110 border-primary-600 cursor-grabbing shadow-xl",
              disabled && "opacity-50 cursor-not-allowed",
              !disabled && "hover:scale-105 hover:shadow-md"
            )}
            style={{ left: `calc(${currentPercentage}% - 12px)` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Inner dot */}
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full transition-colors",
              isDragging && "bg-primary-600"
            )} />
          </div>
        </div>

        {/* Markers */}
        {showMarkers && markers.length > 0 && (
          <div className="absolute top-full mt-2 w-full">
            {markers.map((marker, index) => {
              const markerPercentage = ((marker.value - min) / (max - min)) * 100;
              return (
                <div
                  key={index}
                  className="absolute -translate-x-1/2"
                  style={{ left: `${markerPercentage}%` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-neutral-400 mb-1" />
                    <span className="text-xs text-neutral-500 whitespace-nowrap">
                      {marker.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-1 text-xs text-neutral-500">
        <span>{formatValue?.(min) || `${min}${unit}`}</span>
        <span>{formatValue?.(max) || `${max}${unit}`}</span>
      </div>
    </div>
  );
};

export default RangeSlider;