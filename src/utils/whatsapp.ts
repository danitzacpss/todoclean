// ===================================
// TODO CLEAN - WHATSAPP UTILITIES
// WhatsApp Business integration utilities
// ===================================

import type { ServiceType, PriceCalculation, ContactFormData } from '@/types';
import { SITE_CONFIG, WHATSAPP_MESSAGES } from './constants';
import { formatPrice, generateQuoteSummary } from './pricing';

// ==========================================
// WHATSAPP URL GENERATION
// ==========================================

export function generateWhatsAppURL(message: string, phone?: string): string {
  const whatsappPhone = phone || SITE_CONFIG.whatsapp;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
}

// ==========================================
// MESSAGE TEMPLATES
// ==========================================

export function createGeneralInquiryMessage(): string {
  return WHATSAPP_MESSAGES.general;
}

export function createServiceInquiryMessage(serviceType: ServiceType): string {
  const serviceNames = {
    regular: 'limpieza regular',
    profunda: 'limpieza profunda',
    postobra: 'limpieza post-obra',
  };
  
  return WHATSAPP_MESSAGES.service(serviceNames[serviceType]);
}

export function createCalculatorMessage(calculation: PriceCalculation): string {
  const summary = generateQuoteSummary(calculation);
  
  const serviceNames = {
    regular: 'limpieza regular',
    profunda: 'limpieza profunda', 
    postobra: 'limpieza post-obra',
  };

  const details = [
    `📍 Área: ${calculation.squareMeters}m²`,
    `🏠 Ambientes: ${calculation.rooms}`,
    `⏰ Frecuencia: ${calculation.frequency}`,
    `⌚ Duración estimada: ${summary.estimatedDuration}`,
  ];

  if (calculation.extras.length > 0) {
    details.push(`✨ Extras: ${calculation.extras.length} servicios adicionales`);
  }

  if (calculation.frequencyDiscount > 0) {
    details.push(`💰 Descuento: ${formatPrice(calculation.frequencyDiscount)}`);
  }

  const detailsText = details.join('\n');
  
  return WHATSAPP_MESSAGES.calculator(
    serviceNames[calculation.serviceType],
    calculation.totalPrice,
    detailsText
  );
}

export function createQuilamapuMessage(): string {
  return WHATSAPP_MESSAGES.quilamapu;
}

export function createContactFormMessage(formData: ContactFormData): string {
  const serviceText = formData.service 
    ? ` sobre ${formData.service}` 
    : '';
    
  let message = `¡Hola! Soy ${formData.name}${serviceText}.\n\n`;
  message += `📧 Email: ${formData.email}\n`;
  message += `📱 Teléfono: ${formData.phone}\n\n`;
  message += `Mensaje: ${formData.message}\n\n`;
  
  if (formData.preferredDate) {
    message += `📅 Fecha preferida: ${formData.preferredDate}\n`;
  }
  
  message += '¿Podrían contactarme para coordinar?';
  
  return message;
}

export function createEmergencyMessage(): string {
  return WHATSAPP_MESSAGES.emergency;
}

export function createQuoteRequestMessage(
  service: ServiceType,
  area: string,
  urgency: 'normal' | 'urgent' = 'normal'
): string {
  const serviceNames = {
    regular: 'limpieza regular',
    profunda: 'limpieza profunda',
    postobra: 'limpieza post-obra',
  };

  let message = `¡Hola! Necesito una cotización para ${serviceNames[service]}.\n\n`;
  message += `📍 Ubicación: ${area}\n`;
  
  if (urgency === 'urgent') {
    message += `⚡ URGENTE: Necesito el servicio lo antes posible\n`;
  }
  
  message += '\n¿Podrían enviarme más información y disponibilidad?';
  
  return message;
}

// ==========================================
// SPECIALIZED MESSAGE BUILDERS
// ==========================================

export function createBusinessInquiryMessage(params: {
  companyName: string;
  serviceType: 'oficina' | 'local';
  frequency: 'semanal' | 'quincenal' | 'mensual';
  area: string;
  employees?: number;
}): string {
  const { companyName, serviceType, frequency, area, employees } = params;
  
  let message = `¡Hola! Soy de ${companyName} y necesitamos servicios de limpieza comercial.\n\n`;
  message += `🏢 Tipo: ${serviceType === 'oficina' ? 'Oficina' : 'Local comercial'}\n`;
  message += `📅 Frecuencia: ${frequency}\n`;
  message += `📍 Ubicación: ${area}\n`;
  
  if (employees) {
    message += `👥 Empleados: ${employees} personas\n`;
  }
  
  message += '\n¿Podrían enviarme información sobre sus planes empresariales?';
  
  return message;
}

export function createReferralMessage(referredBy: string): string {
  return `¡Hola! Me refirió ${referredBy} y me interesa conocer sus servicios de limpieza. ¿Tienen algún descuento por referidos?`;
}

export function createComplaintMessage(params: {
  serviceDate: string;
  issue: string;
  name: string;
}): string {
  const { serviceDate, issue, name } = params;
  
  let message = `Hola, soy ${name}. Tuve un servicio el ${serviceDate} y necesito reportar lo siguiente:\n\n`;
  message += `❗ Inconveniente: ${issue}\n\n`;
  message += 'Me gustaría que puedan revisar esta situación. Gracias.';
  
  return message;
}

// ==========================================
// WHATSAPP LINK GENERATORS
// ==========================================

export function getGeneralWhatsAppLink(): string {
  return generateWhatsAppURL(createGeneralInquiryMessage());
}

export function getServiceWhatsAppLink(serviceType: ServiceType): string {
  return generateWhatsAppURL(createServiceInquiryMessage(serviceType));
}

export function getCalculatorWhatsAppLink(calculation: PriceCalculation): string {
  return generateWhatsAppURL(createCalculatorMessage(calculation));
}

export function getQuilamapuWhatsAppLink(): string {
  return generateWhatsAppURL(createQuilamapuMessage());
}

export function getContactFormWhatsAppLink(formData: ContactFormData): string {
  return generateWhatsAppURL(createContactFormMessage(formData));
}

export function getEmergencyWhatsAppLink(): string {
  return generateWhatsAppURL(createEmergencyMessage());
}

// ==========================================
// WHATSAPP TRACKING UTILITIES
// ==========================================

export function trackWhatsAppClick(source: string, service?: ServiceType): void {
  // Track with Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: source,
      service: service || 'general',
      value: 1,
    });
  }

  // Track with Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact', {
      content_name: `WhatsApp Click - ${source}`,
      content_category: service || 'general',
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('WhatsApp click tracked:', { source, service });
  }
}

export function openWhatsAppWithTracking(
  url: string, 
  source: string, 
  service?: ServiceType
): void {
  trackWhatsAppClick(source, service);
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ==========================================
// WHATSAPP BUSINESS FEATURES
// ==========================================

export function isWhatsAppBusinessAvailable(): boolean {
  // Check if it's business hours
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Business hours: Monday-Saturday 8AM-8PM, Sunday 9AM-6PM
  if (day === 0) { // Sunday
    return hour >= 9 && hour < 18;
  } else if (day >= 1 && day <= 6) { // Monday-Saturday
    return hour >= 8 && hour < 20;
  }
  
  return false;
}

export function getWhatsAppStatusMessage(): string {
  if (isWhatsAppBusinessAvailable()) {
    return '🟢 En línea - Respuesta inmediata';
  } else {
    return '🟡 Fuera de horario - Te responderemos pronto';
  }
}

export function getEstimatedResponseTime(): string {
  if (isWhatsAppBusinessAvailable()) {
    return 'Respuesta en minutos';
  } else {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 20 || hour < 8) {
      return 'Respuesta mañana por la mañana';
    } else {
      return 'Respuesta en algunas horas';
    }
  }
}

// ==========================================
// WHATSAPP COMPONENT HELPERS
// ==========================================

export interface WhatsAppButtonProps {
  message: string;
  source: string;
  service?: ServiceType;
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'floating' | 'inline' | 'icon';
}

export function getWhatsAppButtonProps(props: WhatsAppButtonProps) {
  const { message, source, service, className = '', size = 'md', variant = 'inline' } = props;
  
  const baseClasses = 'btn-whatsapp focus:outline-none focus:ring-2 focus:ring-whatsapp focus:ring-offset-2';
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base', 
    lg: 'px-6 py-3 text-lg',
  };
  const variantClasses = {
    floating: 'fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg animate-pulse-slow',
    inline: 'inline-flex items-center justify-center rounded-lg',
    icon: 'rounded-full p-3',
  };

  return {
    href: generateWhatsAppURL(message),
    target: '_blank',
    rel: 'noopener noreferrer',
    className: `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim(),
    onClick: () => trackWhatsAppClick(source, service),
    'aria-label': 'Contactar por WhatsApp',
  };
}

// ==========================================
// MESSAGE VALIDATION
// ==========================================

// ==========================================
// ADVANCED MESSAGE GENERATOR
// ==========================================

export function generateWhatsAppMessage(params: {
  type: 'calculator' | 'contact' | 'service' | 'general';
  serviceType?: ServiceType;
  calculation?: PriceCalculation;
  customerData?: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  customMessage?: string;
}): string {
  const { type, serviceType, calculation, customerData, customMessage } = params;

  switch (type) {
    case 'calculator':
      if (!calculation || !customerData) {
        throw new Error('Calculator message requires calculation and customer data');
      }
      return createCalculatorMessageWithCustomer(calculation, customerData);

    case 'contact':
      if (!customerData) {
        throw new Error('Contact message requires customer data');
      }
      return createCustomerContactMessage(customerData, serviceType, customMessage);

    case 'service':
      if (!serviceType) {
        throw new Error('Service message requires service type');
      }
      return createServiceInquiryMessage(serviceType);

    case 'general':
    default:
      return customMessage || createGeneralInquiryMessage();
  }
}

function createCalculatorMessageWithCustomer(
  calculation: PriceCalculation,
  customerData: { name: string; phone: string; email?: string; address?: string }
): string {
  const summary = generateQuoteSummary(calculation);
  
  const serviceNames = {
    regular: 'Limpieza Regular',
    profunda: 'Limpieza Profunda',
    postobra: 'Limpieza Post-Obra',
  };

  const frequencyNames = {
    unica: 'Una vez',
    mensual: 'Mensual',
    trimestral: 'Trimestral',
    anual: 'Anual',
  };

  let message = `¡Hola! Soy ${customerData.name} y acabo de usar su calculadora de precios.\n\n`;
  message += `🧹 **${serviceNames[calculation.serviceType]}**\n`;
  message += `📍 Área: ${calculation.squareMeters}m²\n`;
  message += `🏠 Ambientes: ${calculation.rooms}\n`;
  message += `📅 Frecuencia: ${frequencyNames[calculation.frequency]}\n`;
  
  if (calculation.extras.length > 0) {
    message += `✨ Servicios extra: ${calculation.extras.length} adicionales\n`;
  }
  
  message += `⏰ Duración estimada: ${summary.estimatedDuration}\n\n`;
  
  if (calculation.frequencyDiscount > 0) {
    message += `💰 Descuento por frecuencia: ${formatPrice(calculation.frequencyDiscount)}\n`;
  }
  
  message += `💵 **TOTAL: ${formatPrice(calculation.totalPrice)}**\n\n`;
  
  message += `📱 Mi teléfono: ${customerData.phone}\n`;
  
  if (customerData.email) {
    message += `📧 Email: ${customerData.email}\n`;
  }
  
  if (customerData.address) {
    message += `📍 Dirección: ${customerData.address}\n`;
  }
  
  message += `\n¿Podrían contactarme para coordinar el servicio? ¡Muchas gracias!`;
  
  return message;
}

function createCustomerContactMessage(
  customerData: { name: string; phone: string; email?: string; address?: string },
  serviceType?: ServiceType,
  customMessage?: string
): string {
  const serviceNames = {
    regular: 'limpieza regular',
    profunda: 'limpieza profunda',
    postobra: 'limpieza post-obra',
  };

  let message = `¡Hola! Soy ${customerData.name}`;
  
  if (serviceType) {
    message += ` y me interesa el servicio de ${serviceNames[serviceType]}`;
  } else {
    message += ` y me interesan sus servicios de limpieza`;
  }
  
  message += `.\n\n📱 Mi teléfono: ${customerData.phone}\n`;
  
  if (customerData.email) {
    message += `📧 Email: ${customerData.email}\n`;
  }
  
  if (customerData.address) {
    message += `📍 Dirección: ${customerData.address}\n`;
  }
  
  if (customMessage) {
    message += `\n💬 Mensaje adicional:\n${customMessage}\n`;
  }
  
  message += `\n¿Podrían contactarme para coordinar? ¡Gracias!`;
  
  return message;
}

export function validateWhatsAppMessage(message: string): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check message length (WhatsApp has a 65,536 character limit)
  if (message.length === 0) {
    errors.push('El mensaje no puede estar vacío');
  } else if (message.length > 4000) {
    warnings.push('Mensaje muy largo - considera acortarlo');
  } else if (message.length > 65000) {
    errors.push('El mensaje excede el límite de WhatsApp');
  }

  // Check for potentially problematic characters
  if (message.includes('http://') && !message.includes('https://')) {
    warnings.push('Considera usar HTTPS en los enlaces');
  }

  // Check for spam-like patterns
  const spamPatterns = [
    /(.)\1{10,}/, // Repeated characters
    /[A-Z]{20,}/, // Too much uppercase
    /(gratis|free|descuento|oferta).{0,20}(urgente|ahora|ya)/gi, // Spam-like urgency
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(message)) {
      warnings.push('El mensaje podría parecer spam - revisa el contenido');
      break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}