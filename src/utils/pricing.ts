// ===================================
// TODO CLEAN - PRICING UTILITIES
// Business logic for price calculations
// ===================================

import type { 
  PriceCalculation, 
  ServiceType, 
  PropertyType, 
  FrequencyType,
  ZoneType 
} from '@/types';

import { 
  SERVICE_PRICING, 
  FREQUENCY_DISCOUNTS, 
  EXTRA_SERVICES, 
  SERVICE_AREAS 
} from './constants';

// ==========================================
// CORE PRICING CALCULATION
// ==========================================

export function calculatePrice(params: {
  serviceType: ServiceType;
  propertyType: PropertyType;
  squareMeters: number;
  rooms: number;
  frequency: FrequencyType;
  extras: string[];
  zone?: ZoneType;
}): PriceCalculation {
  const { 
    serviceType, 
    propertyType, 
    squareMeters, 
    rooms, 
    frequency, 
    extras, 
    zone = 'A' 
  } = params;

  // Get base service pricing
  const servicePricing = SERVICE_PRICING[serviceType];
  if (!servicePricing) {
    throw new Error(`Invalid service type: ${serviceType}`);
  }

  // Calculate base price: base + (sqm * price per sqm)
  const basePrice = servicePricing.basePrice + (squareMeters * servicePricing.pricePerSqm);

  // Apply property type multiplier
  const propertyMultiplier = getPropertyMultiplier(propertyType);
  const adjustedBasePrice = basePrice * propertyMultiplier;

  // Apply frequency discount
  const frequencyDiscount = FREQUENCY_DISCOUNTS[frequency]?.discount || 0;
  const discountAmount = adjustedBasePrice * frequencyDiscount;

  // Calculate zone surcharge
  const serviceArea = SERVICE_AREAS.find(area => area.zone === zone);
  const zoneCharge = serviceArea?.surcharge || 0;

  // Calculate extras total
  const extrasTotal = extras.reduce((total, extraId) => {
    const extra = EXTRA_SERVICES.find(e => e.id === extraId);
    return total + (extra?.price || 0);
  }, 0);

  // Calculate final total
  const subtotal = adjustedBasePrice - discountAmount + zoneCharge + extrasTotal;
  const totalPrice = Math.round(subtotal);

  // Estimate hours based on service type and extras
  const estimatedHours = estimateServiceHours(serviceType, squareMeters, rooms, extras.length);

  return {
    serviceType,
    propertyType,
    squareMeters,
    rooms,
    frequency,
    extras,
    zone,
    basePrice: adjustedBasePrice,
    frequencyDiscount: discountAmount,
    zoneCharge,
    extrasTotal,
    totalPrice,
    estimatedHours,
  };
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function getPropertyMultiplier(propertyType: PropertyType): number {
  const multipliers = {
    casa: 1.0,
    departamento: 0.9, // Usually easier to clean
    oficina: 1.1, // Commercial cleaning standards
    local: 1.2, // More demanding cleaning
  };

  return multipliers[propertyType] || 1.0;
}

function estimateServiceHours(
  serviceType: ServiceType, 
  squareMeters: number, 
  rooms: number, 
  extrasCount: number
): number {
  const servicePricing = SERVICE_PRICING[serviceType];
  
  // Base hours from service type
  let hours = servicePricing.minHours;
  
  // Add time based on square meters (every 50 sqm adds ~0.5 hours)
  const extraSqmHours = Math.max(0, (squareMeters - 50) / 50) * 0.5;
  hours += extraSqmHours;
  
  // Add time based on rooms (each extra room adds ~0.25 hours)
  const extraRoomHours = Math.max(0, (rooms - 3)) * 0.25;
  hours += extraRoomHours;
  
  // Add time for extras (each extra adds ~0.3 hours on average)
  const extrasHours = extrasCount * 0.3;
  hours += extrasHours;
  
  // Round to nearest 0.5 and cap at service maximum
  const roundedHours = Math.round(hours * 2) / 2;
  return Math.min(roundedHours, servicePricing.maxHours + 2);
}

// ==========================================
// PRICING VALIDATION
// ==========================================

export function validatePricingParams(params: {
  serviceType: ServiceType;
  propertyType: PropertyType;
  squareMeters: number;
  rooms: number;
  frequency: FrequencyType;
  zone?: ZoneType;
}): string[] {
  const errors: string[] = [];
  
  const { serviceType, propertyType, squareMeters, rooms, frequency, zone } = params;
  
  // Validate service type
  if (!SERVICE_PRICING[serviceType]) {
    errors.push(`Tipo de servicio inválido: ${serviceType}`);
  }
  
  // Validate property type
  const validPropertyTypes = ['casa', 'departamento', 'oficina', 'local'];
  if (!validPropertyTypes.includes(propertyType)) {
    errors.push(`Tipo de propiedad inválido: ${propertyType}`);
  }
  
  // Validate square meters
  if (squareMeters < 20 || squareMeters > 1000) {
    errors.push('Los metros cuadrados deben estar entre 20 y 1000');
  }
  
  // Validate rooms
  if (rooms < 1 || rooms > 20) {
    errors.push('El número de ambientes debe estar entre 1 y 20');
  }
  
  // Validate frequency
  if (!FREQUENCY_DISCOUNTS[frequency]) {
    errors.push(`Frecuencia inválida: ${frequency}`);
  }
  
  // Validate zone
  if (zone && !SERVICE_AREAS.find(area => area.zone === zone)) {
    errors.push(`Zona de servicio inválida: ${zone}`);
  }
  
  return errors;
}

// ==========================================
// PRICING FORMATTERS
// ==========================================

export function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-CL')}`;
}

export function formatPriceWithCurrency(price: number): string {
  return `$${price.toLocaleString('es-CL')} CLP`;
}

export function formatDiscount(discount: number): string {
  return `${Math.round(discount * 100)}%`;
}

export function formatHours(hours: number): string {
  if (hours === 1) return '1 hora';
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours === Math.floor(hours)) return `${hours} horas`;
  return `${hours.toFixed(1).replace('.', ',')} horas`;
}

// ==========================================
// PRICE COMPARISON UTILITIES
// ==========================================

export function calculateSavings(
  regularPrice: number, 
  discountedPrice: number
): {
  savings: number;
  savingsPercentage: number;
  formattedSavings: string;
  formattedPercentage: string;
} {
  const savings = regularPrice - discountedPrice;
  const savingsPercentage = savings / regularPrice;
  
  return {
    savings,
    savingsPercentage,
    formattedSavings: formatPrice(savings),
    formattedPercentage: formatDiscount(savingsPercentage),
  };
}

export function getFrequencyComparison(
  basePrice: number, 
  serviceType: ServiceType
): Array<{
  frequency: FrequencyType;
  price: number;
  formattedPrice: string;
  discount: number;
  formattedDiscount: string;
  savings: number;
  recommended?: boolean;
}> {
  return Object.entries(FREQUENCY_DISCOUNTS).map(([freq, data]) => {
    const frequency = freq as FrequencyType;
    const discountAmount = basePrice * data.discount;
    const finalPrice = basePrice - discountAmount;
    
    return {
      frequency,
      price: finalPrice,
      formattedPrice: formatPrice(finalPrice),
      discount: data.discount,
      formattedDiscount: formatDiscount(data.discount),
      savings: discountAmount,
      recommended: frequency === 'quincenal', // Most popular option
    };
  });
}

// ==========================================
// SERVICE RECOMMENDATIONS
// ==========================================

export function getServiceRecommendations(
  propertyType: PropertyType,
  squareMeters: number,
  lastServiceDate?: Date
): {
  recommendedService: ServiceType;
  recommendedFrequency: FrequencyType;
  reasoning: string;
} {
  // Determine recommended service based on property and usage
  let recommendedService: ServiceType;
  let recommendedFrequency: FrequencyType;
  let reasoning: string;

  // Service type recommendation
  if (!lastServiceDate || isMoreThanMonthsAgo(lastServiceDate, 3)) {
    recommendedService = 'profunda';
    reasoning = 'Recomendamos limpieza profunda para un primer servicio o después de mucho tiempo.';
  } else if (propertyType === 'oficina' || propertyType === 'local') {
    recommendedService = 'regular';
    reasoning = 'Para espacios comerciales recomendamos limpieza regular frecuente.';
  } else {
    recommendedService = 'regular';
    reasoning = 'Limpieza regular es perfecta para el mantenimiento de tu hogar.';
  }

  // Frequency recommendation
  if (propertyType === 'oficina' || propertyType === 'local') {
    recommendedFrequency = 'semanal';
  } else if (squareMeters > 150) {
    recommendedFrequency = 'quincenal';
  } else if (squareMeters < 60) {
    recommendedFrequency = 'quincenal';
  } else {
    recommendedFrequency = 'quincenal'; // Most popular
  }

  return {
    recommendedService,
    recommendedFrequency,
    reasoning,
  };
}

function isMoreThanMonthsAgo(date: Date, months: number): boolean {
  const monthsAgo = new Date();
  monthsAgo.setMonth(monthsAgo.getMonth() - months);
  return date < monthsAgo;
}

// ==========================================
// QUOTE SUMMARY UTILITIES
// ==========================================

export function generateQuoteSummary(calculation: PriceCalculation): {
  title: string;
  subtitle: string;
  details: string[];
  highlights: string[];
  estimatedDuration: string;
} {
  const serviceNames = {
    regular: 'Limpieza Regular',
    profunda: 'Limpieza Profunda', 
    postobra: 'Limpieza Post-Obra',
  };

  const frequencyNames = {
    unica: 'servicio único',
    semanal: 'servicio semanal',
    quincenal: 'servicio quincenal',
    mensual: 'servicio mensual',
  };

  const title = serviceNames[calculation.serviceType];
  const subtitle = `${calculation.squareMeters}m² • ${frequencyNames[calculation.frequency]}`;

  const details = [
    `Tipo de servicio: ${serviceNames[calculation.serviceType]}`,
    `Área: ${calculation.squareMeters} metros cuadrados`,
    `Ambientes: ${calculation.rooms}`,
    `Frecuencia: ${FREQUENCY_DISCOUNTS[calculation.frequency].label}`,
  ];

  if (calculation.zone && calculation.zone !== 'A') {
    const area = SERVICE_AREAS.find(a => a.zone === calculation.zone);
    details.push(`Zona de servicio: ${area?.name} (+${formatPrice(calculation.zoneCharge)})`);
  }

  if (calculation.extras.length > 0) {
    const extraNames = calculation.extras
      .map(id => EXTRA_SERVICES.find(e => e.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    details.push(`Servicios extra: ${extraNames}`);
  }

  const highlights = [];
  
  if (calculation.frequencyDiscount > 0) {
    highlights.push(
      `Ahorro por frecuencia: ${formatPrice(calculation.frequencyDiscount)}`
    );
  }

  highlights.push(
    `Duración estimada: ${formatHours(calculation.estimatedHours)}`
  );

  const estimatedDuration = formatHours(calculation.estimatedHours);

  return {
    title,
    subtitle,
    details,
    highlights,
    estimatedDuration,
  };
}

// ==========================================
// PROMOTIONAL PRICING
// ==========================================

export function applyPromoCode(
  calculation: PriceCalculation,
  promoCode: string
): PriceCalculation & { promoApplied?: { code: string; discount: number; description: string } } {
  const promos: Record<string, { discount: number; description: string; zones?: ZoneType[] }> = {
    'QUILA20': {
      discount: 0.20,
      description: 'Descuento especial Quilamapu 20%',
      zones: ['A'], // Only applies to zone A
    },
    'PRIMERA15': {
      discount: 0.15,
      description: 'Descuento primera limpieza 15%',
    },
    'VERANO10': {
      discount: 0.10,
      description: 'Descuento de verano 10%',
    },
  };

  const promo = promos[promoCode.toUpperCase()];
  
  if (!promo) {
    return calculation;
  }

  // Check if promo applies to current zone
  if (promo.zones && calculation.zone && !promo.zones.includes(calculation.zone)) {
    return calculation;
  }

  // Apply additional discount to base price (not on top of frequency discount)
  const promoDiscountAmount = calculation.basePrice * promo.discount;
  const newTotalPrice = Math.round(calculation.totalPrice - promoDiscountAmount);

  return {
    ...calculation,
    totalPrice: newTotalPrice,
    promoApplied: {
      code: promoCode.toUpperCase(),
      discount: promoDiscountAmount,
      description: promo.description,
    },
  };
}

// ==========================================
// PRICE ESTIMATION FOR RANGES
// ==========================================

export function getPriceRange(
  serviceType: ServiceType,
  frequency: FrequencyType = 'unica'
): { min: number; max: number; formatted: string } {
  const servicePricing = SERVICE_PRICING[serviceType];
  const frequencyData = FREQUENCY_DISCOUNTS[frequency];
  
  // Calculate for minimum scenario (small apartment)
  const minCalculation = calculatePrice({
    serviceType,
    propertyType: 'departamento',
    squareMeters: 40,
    rooms: 2,
    frequency,
    extras: [],
    zone: 'A',
  });

  // Calculate for maximum scenario (large house with extras)
  const maxCalculation = calculatePrice({
    serviceType,
    propertyType: 'casa', 
    squareMeters: 200,
    rooms: 8,
    frequency,
    extras: ['ventanas-exteriores', 'terraza-balcon'],
    zone: 'C',
  });

  return {
    min: minCalculation.totalPrice,
    max: maxCalculation.totalPrice,
    formatted: `${formatPrice(minCalculation.totalPrice)} - ${formatPrice(maxCalculation.totalPrice)}`,
  };
}