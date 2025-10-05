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
// BUSINESS PRICING TABLE (EXACT MATCH)
// ==========================================

function calculateBusinessPrice(params: {
  serviceType: ServiceType;
  squareMeters: number;
  rooms: number;
  frequency: FrequencyType;
  extras: string[];
  zone?: ZoneType;
}): PriceCalculation {
  const { squareMeters, frequency, extras, zone = 'A' } = params;

  // Business pricing table calculated from base prices using residential logic
  // Base prices: Pequeña $35k, Mediana $40k, Grande $55k, Corporativa $70k
  // Proportions from residential: Mensual 3.3x, Trimestral 2.97x, Anual 2.67x
  const businessPrices = {
    // Pequeña: Hasta 50m²
    pequena: {
      anual: Math.round(35000 * 2.67), // 93,450
      trimestral: Math.round(35000 * 2.97), // 103,950
      mensual: Math.round(35000 * 3.3), // 115,500
      unica: 35000
    },
    // Mediana: 50-150m²
    mediana: {
      anual: Math.round(40000 * 2.67), // 106,800
      trimestral: Math.round(40000 * 2.97), // 118,800
      mensual: Math.round(40000 * 3.3), // 132,000
      unica: 40000
    },
    // Grande: 150-200m²
    grande: {
      anual: Math.round(55000 * 2.67), // 146,850
      trimestral: Math.round(55000 * 2.97), // 163,350
      mensual: Math.round(55000 * 3.3), // 181,500
      unica: 55000
    },
    // Corporativa: Más de 200m²
    corporativa: {
      anual: Math.round(70000 * 2.67), // 186,900
      trimestral: Math.round(70000 * 2.97), // 207,900
      mensual: Math.round(70000 * 3.3), // 231,000
      unica: 70000
    }
  };

  // Determine office size category
  let sizeCategory: keyof typeof businessPrices;
  if (squareMeters <= 50) {
    sizeCategory = 'pequena';
  } else if (squareMeters <= 150) {
    sizeCategory = 'mediana';
  } else if (squareMeters <= 200) {
    sizeCategory = 'grande';
  } else {
    sizeCategory = 'corporativa';
  }

  // Map frequency to business table frequency
  let businessFrequency: keyof typeof businessPrices.pequena;
  switch (frequency) {
    case 'unica':
      businessFrequency = 'unica';
      break;
    case 'mensual':
      businessFrequency = 'mensual';
      break;
    case 'trimestral':
      businessFrequency = 'trimestral';
      break;
    case 'anual':
      businessFrequency = 'anual';
      break;
    default:
      businessFrequency = 'mensual';
  }

  // Get base price from business table
  const basePrice = businessPrices[sizeCategory][businessFrequency];

  // Calculate extras
  let extrasTotal = 0;
  extras.forEach(extraId => {
    const extra = EXTRA_SERVICES.find(e => e.id === extraId);
    if (extra) {
      extrasTotal += extra.price;
    }
  });

  // Apply zone surcharge
  const zoneInfo = SERVICE_AREAS.find(area => area.zone === zone);
  const zoneSurcharge = zoneInfo?.surcharge || 0;

  const finalPrice = basePrice + extrasTotal + zoneSurcharge;

  // Estimate hours based on office size
  let estimatedHours: number;
  switch (sizeCategory) {
    case 'pequena':
      estimatedHours = 3;
      break;
    case 'mediana':
      estimatedHours = 4;
      break;
    case 'grande':
      estimatedHours = 6;
      break;
    case 'corporativa':
      estimatedHours = 8;
      break;
  }

  return {
    serviceType: params.serviceType,
    propertyType: 'oficina',
    squareMeters,
    rooms: params.rooms,
    frequency,
    extras,
    zone,
    basePrice,
    frequencyDiscount: 0, // Business prices already include frequency discounts
    zoneCharge: zoneSurcharge,
    extrasTotal,
    totalPrice: finalPrice,
    estimatedHours
  };
}

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

  // Special pricing for offices - use business table prices
  if (propertyType === 'oficina') {
    return calculateBusinessPrice({
      serviceType,
      squareMeters,
      rooms,
      frequency,
      extras,
      zone
    });
  }

  // Get base service pricing
  const servicePricing = SERVICE_PRICING[serviceType];
  if (!servicePricing) {
    throw new Error(`Invalid service type: ${serviceType}`);
  }

  // Calculate base price with new logic
  // For spaces under 50m2, use base price. For larger spaces, add per sqm charge
  let basePrice;
  if (squareMeters <= 50) {
    basePrice = servicePricing.basePrice;
  } else {
    const extraMeters = squareMeters - 50;
    basePrice = servicePricing.basePrice + (extraMeters * servicePricing.pricePerSqm);
  }

  // Apply property type multiplier
  const propertyMultiplier = getPropertyMultiplier(propertyType);
  const adjustedBasePrice = basePrice * propertyMultiplier;

  // Special pricing logic for frequency-based pricing
  // Base prices: Una vez $30k, Mensual $99k, Trimestral $89k, Anual $80k
  let finalPrice;
  if (frequency === 'unica') {
    finalPrice = adjustedBasePrice;
  } else {
    // For subscription plans, calculate based on target monthly prices
    // Precios objetivo para espacios <50m² según especificaciones
    const targetPrices = {
      mensual: 99000,   // Precio mensual para espacios <50m²
      trimestral: 89000, // Precio mensual trimestral para espacios <50m²
      anual: 80000      // Precio mensual anual para espacios <50m²
    };
    
    const targetPrice = targetPrices[frequency as keyof typeof targetPrices];
    if (targetPrice) {
      if (squareMeters <= 50) {
        // For base size, use target price
        finalPrice = targetPrice;
      } else {
        // For larger spaces, calculate based on one-time price ranges with same proportions
        let oneTimePrice;
        if (squareMeters <= 100) {
          oneTimePrice = 40000; // 50-100m²
        } else if (squareMeters <= 150) {
          oneTimePrice = 55000; // 100-150m²
        } else {
          oneTimePrice = 65000; // >150m²
        }
        
        // Apply same proportion as <50m² (mensual: 3.3x, trimestral: 2.97x, anual: 2.67x)
        const baseOneTimePrice = 30000; // <50m² one-time price
        const proportion = targetPrice / baseOneTimePrice;
        finalPrice = oneTimePrice * proportion;
      }
    } else {
      // Fallback to base calculation
      const sizeFactor = squareMeters <= 50 ? 1 : (squareMeters / 50);
      finalPrice = adjustedBasePrice * sizeFactor;
    }
  }

  // Legacy discount calculation for display purposes
  // const frequencyDiscount = FREQUENCY_DISCOUNTS[frequency]?.discount || 0;
  const discountAmount = frequency === 'unica' ? 0 : (adjustedBasePrice - finalPrice);

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
    airbnb: 1.0, // Same as casa
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
  return `$${price.toLocaleString('es-CL').replace(/,/g, '.')}`;
}

export function formatPriceWithCurrency(price: number): string {
  return `$${price.toLocaleString('es-CL').replace(/,/g, '.')} CLP`;
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
  _serviceType: ServiceType
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
      recommended: frequency === 'mensual', // Most popular option
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
    recommendedFrequency = 'mensual';
  } else if (squareMeters > 150) {
    recommendedFrequency = 'trimestral';
  } else if (squareMeters < 60) {
    recommendedFrequency = 'mensual';
  } else {
    recommendedFrequency = 'mensual'; // Most popular
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
    mensual: 'precio por mes (1 limpieza semanal por 1 mes)',
    trimestral: 'precio por mes (1 limpieza semanal por 3 meses)',
    anual: 'precio por mes (1 limpieza semanal por 1 año)',
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
  // const servicePricing = SERVICE_PRICING[serviceType];
  // const frequencyData = FREQUENCY_DISCOUNTS[frequency];
  
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

// ==========================================
// AIRBNB PRICING CALCULATION
// ==========================================

/**
 * Calculate Airbnb cleaning service price based on property size
 * Airbnb services are express cleaning between guests (1-3 hours)
 * Pricing based on AirbnbServices.tsx pricing table
 */
export function calculateAirbnbPrice(params: {
  squareMeters: number;
  extras?: string[];
  zone?: ZoneType;
}): PriceCalculation {
  const { squareMeters, extras = [], zone = 'A' } = params;

  // Airbnb pricing table - express service pricing
  let basePrice: number;
  let estimatedHours: number;

  if (squareMeters <= 40) {
    basePrice = 15000; // Cabaña Básica
    estimatedHours = 1;
  } else if (squareMeters <= 70) {
    basePrice = 25000; // Departamento Estándar
    estimatedHours = 1.5;
  } else if (squareMeters <= 120) {
    basePrice = 35000; // Casa Completa
    estimatedHours = 2;
  } else {
    basePrice = 50000; // Propiedad Premium
    estimatedHours = 3;
  }

  // Calculate extras (like inventory check, photo report)
  let extrasTotal = 0;
  extras.forEach(extraId => {
    const extra = EXTRA_SERVICES.find(e => e.id === extraId);
    if (extra) {
      extrasTotal += extra.price;
    }
  });

  // Apply zone surcharge
  const zoneInfo = SERVICE_AREAS.find(area => area.zone === zone);
  const zoneSurcharge = zoneInfo?.surcharge || 0;

  const finalPrice = basePrice + extrasTotal + zoneSurcharge;

  return {
    serviceType: 'regular', // Airbnb uses regular service type
    propertyType: 'casa', // Airbnb properties treated as residential
    squareMeters,
    rooms: Math.ceil(squareMeters / 25), // Estimate rooms
    frequency: 'unica', // Airbnb is always one-time service
    extras,
    zone,
    basePrice,
    frequencyDiscount: 0, // No frequency discounts for Airbnb
    zoneCharge: zoneSurcharge,
    extrasTotal,
    totalPrice: finalPrice,
    estimatedHours,
  };
}