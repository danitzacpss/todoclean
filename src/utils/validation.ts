// ===================================
// TODO CLEAN - VALIDATION UTILITIES
// Form validation using Zod schemas
// ===================================

import { z } from 'zod';
import { VALIDATION_RULES, ERROR_MESSAGES } from './constants';

// ==========================================
// BASE VALIDATION SCHEMAS
// ==========================================

// Chilean phone validation
const phoneSchema = z
  .string()
  .min(VALIDATION_RULES.PHONE_MIN_LENGTH, ERROR_MESSAGES.INVALID_PHONE)
  .max(VALIDATION_RULES.PHONE_MAX_LENGTH, ERROR_MESSAGES.INVALID_PHONE)
  .regex(VALIDATION_RULES.PHONE_PATTERN, ERROR_MESSAGES.INVALID_PHONE)
  .transform((val) => {
    // Normalize phone format
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.startsWith('56')) return cleaned;
    if (cleaned.startsWith('9')) return `56${cleaned}`;
    return `569${cleaned}`;
  });

// Email validation
const emailSchema = z
  .string()
  .email(ERROR_MESSAGES.INVALID_EMAIL)
  .max(254, 'Email demasiado largo')
  .toLowerCase();

// Name validation
const nameSchema = z
  .string()
  .min(VALIDATION_RULES.NAME_MIN_LENGTH, ERROR_MESSAGES.NAME_TOO_SHORT)
  .max(VALIDATION_RULES.NAME_MAX_LENGTH, ERROR_MESSAGES.NAME_TOO_LONG)
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios')
  .transform((val) => val.trim().replace(/\s+/g, ' '));

// Square meters validation
const squareMetersSchema = z
  .number()
  .min(VALIDATION_RULES.MIN_SQUARE_METERS, ERROR_MESSAGES.INVALID_SQUARE_METERS)
  .max(VALIDATION_RULES.MAX_SQUARE_METERS, ERROR_MESSAGES.INVALID_SQUARE_METERS);

// ==========================================
// CONTACT FORM SCHEMA
// ==========================================

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder los 1000 caracteres')
    .transform((val) => val.trim()),
  service: z
    .enum(['regular', 'profunda', 'postobra'])
    .optional(),
  preferredDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'La fecha no puede ser anterior a hoy'),
  source: z
    .enum(['website', 'whatsapp', 'referral', 'social'])
    .default('website'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ==========================================
// QUOTE FORM SCHEMA
// ==========================================

export const quoteFormSchema = z.object({
  // Step 1: Basic Info
  propertyType: z.enum(['casa', 'departamento', 'oficina', 'local']),
  squareMeters: squareMetersSchema,
  rooms: z
    .number()
    .min(1, 'Debe tener al menos 1 ambiente')
    .max(20, 'Máximo 20 ambientes'),
  
  // Step 2: Service Details
  serviceType: z.enum(['regular', 'profunda', 'postobra']),
  frequency: z.enum(['unica', 'semanal', 'quincenal', 'mensual']),
  extras: z
    .array(z.string())
    .default([])
    .refine((extras) => extras.length <= 10, 'Máximo 10 servicios extras'),
  preferredDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'La fecha no puede ser anterior a hoy'),
  
  // Step 3: Contact & Location
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema.optional(),
  address: z
    .string()
    .min(10, 'La dirección debe ser más específica')
    .max(200, 'Dirección demasiado larga')
    .transform((val) => val.trim()),
  zone: z.enum(['A', 'B', 'C']).optional(),
  notes: z
    .string()
    .max(500, 'Las notas no pueden exceder los 500 caracteres')
    .optional()
    .transform((val) => val?.trim()),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// ==========================================
// CALCULATOR FORM SCHEMA
// ==========================================

export const calculatorFormSchema = z.object({
  serviceType: z.enum(['regular', 'profunda', 'postobra']),
  propertyType: z.enum(['casa', 'departamento', 'oficina', 'local']),
  squareMeters: squareMetersSchema,
  rooms: z
    .number()
    .min(1, 'Mínimo 1 ambiente')
    .max(20, 'Máximo 20 ambientes'),
  frequency: z.enum(['unica', 'semanal', 'quincenal', 'mensual']),
  extras: z.array(z.string()).default([]),
  zone: z.enum(['A', 'B', 'C']).default('A'),
});

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;

// ==========================================
// NEWSLETTER SCHEMA
// ==========================================

export const newsletterSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  interests: z
    .array(z.string())
    .min(1, 'Selecciona al menos un interés')
    .default(['general']),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// ==========================================
// BUSINESS INQUIRY SCHEMA
// ==========================================

export const businessInquirySchema = z.object({
  companyName: z
    .string()
    .min(2, 'Nombre de empresa muy corto')
    .max(100, 'Nombre de empresa muy largo')
    .transform((val) => val.trim()),
  contactName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  serviceType: z.enum(['oficina', 'local']),
  frequency: z.enum(['semanal', 'quincenal', 'mensual']),
  squareMeters: squareMetersSchema,
  employees: z
    .number()
    .min(1, 'Mínimo 1 empleado')
    .max(1000, 'Para más de 1000 empleados, contáctanos directamente')
    .optional(),
  budget: z
    .number()
    .min(50000, 'Presupuesto mínimo $50.000')
    .optional(),
  message: z
    .string()
    .max(1000, 'El mensaje no puede exceder los 1000 caracteres')
    .optional()
    .transform((val) => val?.trim()),
});

export type BusinessInquiryData = z.infer<typeof businessInquirySchema>;

// ==========================================
// VALIDATION HELPER FUNCTIONS
// ==========================================

export function validateField<T>(
  schema: z.ZodSchema<T>,
  value: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(value);
  
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    const error = result.error.errors[0] || { message: 'Unknown validation error' };
    return { success: false, error: error.message };
  }
}

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    const errors: Record<string, string> = {};
    
    result.error.errors.forEach((error) => {
      const path = error.path.join('.');
      errors[path] = error.message;
    });
    
    return { success: false, errors };
  }
}

// ==========================================
// PHONE NUMBER UTILITIES
// ==========================================

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  // Chilean mobile format: +56 9 XXXX XXXX
  if (cleaned.startsWith('569') && cleaned.length === 11) {
    return `+56 9 ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }
  
  // Chilean landline format: +56 XX XXX XXXX
  if (cleaned.startsWith('56') && cleaned.length === 10) {
    return `+56 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
}

export function isValidChileanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Mobile: 569XXXXXXXX (11 digits)
  if (cleaned.startsWith('569') && cleaned.length === 11) {
    return true;
  }
  
  // Landline: 56XXXXXXXXX (10 digits, area code)
  if (cleaned.startsWith('56') && cleaned.length === 10) {
    const areaCode = cleaned.slice(2, 4);
    const validAreaCodes = ['32', '33', '34', '35', '41', '42', '43', '45', '51', '52', '55', '57', '58', '61', '63', '64', '65', '67', '71', '72', '73', '74', '75'];
    return validAreaCodes.includes(areaCode);
  }
  
  return false;
}

// ==========================================
// EMAIL VALIDATION UTILITIES
// ==========================================

export function isBusinessEmail(email: string): boolean {
  const businessDomains = [
    'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 
    'live.com', 'icloud.com', 'aol.com'
  ];
  
  const domain = email.toLowerCase().split('@')[1] || '';
  return !businessDomains.includes(domain);
}

export function suggestEmailCorrection(email: string): string | null {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return null;
  
  const suggestions: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmail.co': 'gmail.com',
    'hotmial.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
  };
  
  if (suggestions[domain]) {
    return email.replace(domain, suggestions[domain]);
  }
  
  return null;
}

// ==========================================
// ADDRESS VALIDATION
// ==========================================

export function validateChileanAddress(address: string): {
  isValid: boolean;
  suggestions?: string[];
  issues?: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Basic length check
  if (address.length < 10) {
    issues.push('La dirección es muy corta');
    suggestions.push('Incluye nombre de calle y número');
  }
  
  // Check for street number
  if (!/\d/.test(address)) {
    issues.push('Falta el número de la dirección');
    suggestions.push('Agrega el número de la calle o edificio');
  }
  
  // Check for common Chilean address patterns
  const hasStreetType = /\b(calle|avenida|av\.|pasaje|pje\.|camino)\b/i.test(address);
  if (!hasStreetType) {
    suggestions.push('Considera agregar el tipo de vía (Av., Calle, Pasaje, etc.)');
  }
  
  // Check for Chillán-specific areas
  const chillanAreas = [
    'quilamapu', 'las termas', 'centro', 'chillán viejo', 
    'san carlos', 'coihueco', 'bulnes'
  ];
  
  const hasLocalArea = chillanAreas.some(area => 
    address.toLowerCase().includes(area)
  );
  
  if (!hasLocalArea) {
    suggestions.push('Especifica el sector o comuna (ej: Centro, Quilamapu, etc.)');
  }
  
  return {
    isValid: issues.length === 0,
    ...(issues.length > 0 && { issues }),
    ...(suggestions.length > 0 && { suggestions }),
  };
}

// ==========================================
// FORM FIELD VALIDATORS
// ==========================================

export const fieldValidators = {
  name: (value: string) => validateField(nameSchema, value),
  email: (value: string) => validateField(emailSchema, value),
  phone: (value: string) => validateField(phoneSchema, value),
  squareMeters: (value: number) => validateField(squareMetersSchema, value),
  
  // Custom validators
  address: (value: string) => {
    if (!value || value.length < 10) {
      return { success: false, error: 'La dirección debe ser más específica' };
    }
    
    const validation = validateChileanAddress(value);
    if (!validation.isValid && validation.issues) {
      return { success: false, error: validation.issues[0] };
    }
    
    return { success: true, data: value.trim() };
  },
  
  message: (value: string) => {
    if (!value || value.trim().length < 10) {
      return { success: false, error: 'El mensaje debe tener al menos 10 caracteres' };
    }
    
    if (value.length > 1000) {
      return { success: false, error: 'El mensaje es demasiado largo' };
    }
    
    return { success: true, data: value.trim() };
  },
};

// ==========================================
// SANITIZATION UTILITIES
// ==========================================

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potential XSS characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}

export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
}