// ===================================
// TODO CLEAN - CONSTANTS
// Business logic constants and configuration
// ===================================

import type { 
  ServicePricing, 
  FrequencyDiscount, 
  ExtraService, 
  ServiceArea,
  SiteConfig 
} from '@/types';

// ==========================================
// BUSINESS INFORMATION
// ==========================================

export const SITE_CONFIG: SiteConfig = {
  name: 'Todo Clean Chillán',
  description: 'Servicios profesionales de limpieza en Chillán con estándares americanos. Puntualidad garantizada o tu dinero de vuelta.',
  url: 'https://todoclean.cl',
  ogImage: '/og-image.jpg',
  phone: '+56926176543',
  email: 'todocleanchillan@gmail.com',
  whatsapp: '56926176543',
  address: 'Chillán, Región del Ñuble, Chile',
  social: {
    instagram: 'https://instagram.com/todo_cleanchillan',
    google: 'https://g.page/todo-clean-chillan',
  },
  businessHours: {
    monday: { open: '08:00', close: '20:00' },
    tuesday: { open: '08:00', close: '20:00' },
    wednesday: { open: '08:00', close: '20:00' },
    thursday: { open: '08:00', close: '20:00' },
    friday: { open: '08:00', close: '20:00' },
    saturday: { open: '08:00', close: '20:00' },
    sunday: { open: '09:00', close: '18:00' },
  },
  coverage: [] // Will be populated below
};

// ==========================================
// PRICING STRUCTURE
// ==========================================

export const SERVICE_PRICING: ServicePricing = {
  regular: {
    basePrice: 35000,
    pricePerSqm: 500,
    minHours: 3,
    maxHours: 4,
    description: 'Limpieza de mantención semanal o quincenal',
    includes: [
      'Aspirado y barrido completo',
      'Trapeado de todos los pisos',
      'Desinfección de baños',
      'Limpieza básica de cocina',
      'Cambio de sábanas',
      'Orden general de espacios',
    ],
  },
  profunda: {
    basePrice: 55000,
    pricePerSqm: 700,
    minHours: 4,
    maxHours: 6,
    description: 'Limpieza detallada y desinfección completa',
    includes: [
      'Todo lo incluido en limpieza regular',
      'Limpieza de ventanas interiores',
      'Electrodomésticos por dentro',
      'Zócalos y marcos de puertas',
      'Debajo de muebles móviles',
      'Desinfección profunda',
      'Limpieza de luminarias',
    ],
  },
  postobra: {
    basePrice: 80000,
    pricePerSqm: 1000,
    minHours: 6,
    maxHours: 8,
    description: 'Limpieza post-construcción y mudanzas',
    includes: [
      'Retiro de escombros y basura',
      'Aspirado de polvo de construcción',
      'Limpieza de ventanas completa',
      'Sanitización total',
      'Limpieza de residuos pegajosos',
      'Desinfección con productos especiales',
      'Preparación para habitabilidad',
    ],
  },
};

// ==========================================
// FREQUENCY DISCOUNTS
// ==========================================

export const FREQUENCY_DISCOUNTS: FrequencyDiscount = {
  unica: {
    discount: 0,
    label: 'Una vez',
    description: 'Servicio único sin compromiso',
  },
  semanal: {
    discount: 0.15,
    label: 'Semanal',
    description: '15% descuento - Mantén tu hogar siempre limpio',
  },
  quincenal: {
    discount: 0.10,
    label: 'Quincenal',
    description: '10% descuento - Equilibrio perfecto',
  },
  mensual: {
    discount: 0.05,
    label: 'Mensual', 
    description: '5% descuento - Limpieza profunda mensual',
  },
};

// ==========================================
// EXTRA SERVICES
// ==========================================

export const EXTRA_SERVICES: ExtraService[] = [
  {
    id: 'ventanas-exteriores',
    name: 'Ventanas Exteriores',
    price: 8000,
    description: 'Limpieza completa de ventanas por fuera',
    estimatedTime: 45,
    category: 'exterior',
  },
  {
    id: 'terraza-balcon',
    name: 'Terraza/Balcón',
    price: 12000,
    description: 'Barrido, lavado y ordenamiento',
    estimatedTime: 60,
    category: 'exterior',
  },
  {
    id: 'garage',
    name: 'Garage/Bodega',
    price: 15000,
    description: 'Barrido, orden y limpieza básica',
    estimatedTime: 45,
    category: 'exterior',
  },
  {
    id: 'refrigerador',
    name: 'Interior Refrigerador',
    price: 10000,
    description: 'Limpieza y desinfección completa',
    estimatedTime: 30,
    category: 'appliances',
  },
  {
    id: 'horno',
    name: 'Horno/Microondas',
    price: 8000,
    description: 'Desengrase y limpieza profunda',
    estimatedTime: 30,
    category: 'appliances',
  },
  {
    id: 'closets',
    name: 'Interior Closets',
    price: 12000,
    description: 'Aspirado, orden y limpieza interior',
    estimatedTime: 45,
    category: 'interior',
  },
  {
    id: 'alfombras',
    name: 'Shampoo Alfombras',
    price: 15000,
    description: 'Limpieza profunda con productos especializados',
    estimatedTime: 60,
    category: 'interior',
  },
];

// ==========================================
// SERVICE AREAS & COVERAGE
// ==========================================

export const SERVICE_AREAS: ServiceArea[] = [
  {
    zone: 'A',
    name: 'Zona Centro',
    communes: [
      'Chillán Centro',
      'Las Termas',
      'Quilamapu',
      'Chillán Viejo (centro)',
    ],
    surcharge: 0,
    responseTime: '24 horas',
    color: '#22c55e', // green
    coordinates: [
      [-36.595, -72.115],
      [-36.585, -72.085],
      [-36.615, -72.075],
      [-36.625, -72.105],
    ],
  },
  {
    zone: 'B',
    name: 'Zona Intermedia', 
    communes: [
      'Chillán Viejo (periferia)',
      'San Carlos',
      'Coihueco',
      'Ñiquén',
    ],
    surcharge: 5000,
    responseTime: '48 horas',
    color: '#f59e0b', // amber
    coordinates: [
      [-36.575, -72.125],
      [-36.565, -72.065],
      [-36.635, -72.055],
      [-36.645, -72.115],
    ],
  },
  {
    zone: 'C',
    name: 'Zona Extendida',
    communes: [
      'Bulnes',
      'Quillón',
      'San Ignacio',
      'El Carmen',
      'Pemuco',
    ],
    surcharge: 10000,
    responseTime: '72 horas',
    color: '#f97316', // orange
    coordinates: [
      [-36.555, -72.135],
      [-36.545, -72.045],
      [-36.655, -72.035],
      [-36.665, -72.125],
    ],
  },
];

// Update SITE_CONFIG with coverage
SITE_CONFIG.coverage = SERVICE_AREAS;

// ==========================================
// WHATSAPP MESSAGES
// ==========================================

export const WHATSAPP_MESSAGES = {
  general: '¡Hola! Me interesa conocer más sobre sus servicios de limpieza.',
  
  calculator: (service: string, price: number, details: string) => 
    `¡Hola! Acabo de usar su calculadora de precios y me interesa el servicio de ${service}. 

Detalles de mi cotización:
${details}
Precio estimado: $${price.toLocaleString()} CLP

¿Podríamos coordinar una visita?`,

  quilamapu: '¡Hola! Soy de Quilamapu y me interesa el descuento del 20% con el código QUILA20. ¿Podrían darme más información?',
  
  service: (serviceType: string) => 
    `¡Hola! Me interesa el servicio de ${serviceType}. ¿Podrían enviarme más información y disponibilidad?`,

  contact: (name: string, service?: string) => 
    `¡Hola! Soy ${name} y me interesa ${service ? `el servicio de ${service}` : 'sus servicios de limpieza'}. ¿Podrían contactarme para coordinar?`,

  emergency: '¡Hola! Necesito un servicio de limpieza urgente. ¿Tienen disponibilidad para hoy o mañana?',

  // Residential Services Messages
  residential: {
    general: '¡Hola! Me interesa conocer más sobre sus servicios de limpieza residencial.',
    regular: (size: string) => 
      `¡Hola! Me interesa el servicio de Limpieza Regular para un espacio ${size.toLowerCase()}. ¿Podrían darme más información y disponibilidad?`,
    deep: (size: string) => 
      `¡Hola! Me interesa el servicio de Limpieza Profunda para un espacio ${size.toLowerCase()}. ¿Podrían darme más información y disponibilidad?`,
    postConstruction: (size: string) => 
      `¡Hola! Me interesa el servicio de Limpieza Post-Obra para un espacio ${size.toLowerCase()}. ¿Podrían darme más información y disponibilidad?`,
    pricing: '¡Hola! Me interesa conocer sus precios transparentes para servicios residenciales. ¿Podrían enviarme información detallada?',
    compare: 'Hola, me gustaría que me ayuden a elegir el servicio de limpieza más adecuado para mi hogar.',
    extraService: (serviceName: string) => 
      `¡Hola! Me interesa agregar el servicio de ${serviceName} a mi limpieza.`,
    frequencyDiscount: '¡Hola! Me interesa conocer más sobre los descuentos por frecuencia para servicios regulares.',
  },

  // Business Services Messages  
  business: {
    general: '¡Hola! Soy gerente/administrador de una empresa y me interesa conocer sus servicios corporativos.',
    basicPlan: '¡Hola! Me interesa el plan BÁSICO para mi empresa. ¿Podrían darme más información y agendar una visita para cotización personalizada?',
    professionalPlan: '¡Hola! Me interesa el plan PROFESIONAL para mi empresa. ¿Podrían darme más información y agendar una visita para cotización personalizada?',
    premiumPlan: '¡Hola! Me interesa el plan PREMIUM para mi empresa. ¿Podrían darme más información y agendar una visita para cotización personalizada?',
    customPlan: '¡Hola! Necesito una propuesta corporativa personalizada para mi empresa.',
    commercial: '¡Hola! Soy gerente/administrador de una empresa y me interesa agendar una visita comercial para una cotización personalizada.',
    proposal: '¡Hola! Me interesa recibir una propuesta comercial detallada para servicios empresariales.',
    benefits: '¡Hola! Me interesa conocer más sobre los beneficios exclusivos para empresas como facturación consolidada y portal web.',
    industry: (industryType: string) => 
      `¡Hola! Tengo ${industryType} y me interesa conocer sus protocolos especializados para mi industria.`,
  },

  // Service-specific messages
  serviceSpecific: {
    advice: 'Hola, me gustaría que me ayuden a elegir el servicio de limpieza más adecuado para mi hogar.',
    questions: '¡Hola! Tengo algunas preguntas sobre sus servicios residenciales.',
    businessQuestions: '¡Hola! Tengo consultas sobre sus servicios empresariales y me gustaría hablar con un especialista.',
    schedule: '¡Hola! Me interesa agendar un servicio de limpieza. ¿Cuál es su disponibilidad?',
    coverage: (zone: string) => 
      `¡Hola! Vivo en ${zone} y me gustaría saber si tienen cobertura en mi zona y cuáles son los costos de traslado.`,
  },
};

// ==========================================
// TESTIMONIALS DATA
// ==========================================

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'María González',
    location: 'Quilamapu',
    service: 'regular' as const,
    rating: 5,
    comment: 'Excelente servicio, muy puntuales y prolijos. Mi casa queda impecable cada semana. Totalmente recomendados.',
    date: '2024-01-15',
    verified: true,
    photo: '/testimonials/maria-gonzalez.jpg',
  },
  {
    id: '2', 
    name: 'Juan Pérez',
    location: 'Centro Chillán',
    service: 'profunda' as const,
    rating: 5,
    comment: 'Contraté el servicio profundo y superaron mis expectativas. Llegaron con todos sus implementos y dejaron todo brillando.',
    date: '2024-01-08',
    verified: true,
    photo: '/testimonials/juan-perez.jpg',
  },
  {
    id: '3',
    name: 'Ana Morales',
    location: 'Las Termas',
    service: 'postobra' as const,
    rating: 5,
    comment: 'Después de remodelar mi cocina, Todo Clean me dejó todo listo para usar. Muy profesionales y detallistas.',
    date: '2024-01-22',
    verified: true,
    photo: '/testimonials/ana-morales.jpg',
  },
  {
    id: '4',
    name: 'Roberto Silva',
    location: 'San Carlos',
    service: 'regular' as const,
    rating: 5,
    comment: 'Llevamos 6 meses con el servicio quincenal. Siempre llegan a la hora acordada y hacen un trabajo impecable.',
    date: '2024-01-30',
    verified: true,
  },
  {
    id: '5',
    name: 'Carmen López',
    location: 'Chillán Viejo',
    service: 'profunda' as const,
    rating: 5,
    comment: 'Limpieza de fin de año increíble. Hasta limpiaron lugares que yo ni sabía que existían. 100% recomendados.',
    date: '2024-01-12',
    verified: true,
  },
];

// ==========================================
// COMPANY STATS
// ==========================================

export const COMPANY_STATS = {
  servicesCompleted: 500,
  happyClients: 350,
  averageRating: 4.8,
  responseTime: '2 horas',
  repeatCustomers: 85,
};

// ==========================================
// FAQ DATA
// ==========================================

export const FAQ_DATA = [
  {
    id: '1',
    question: '¿Traen sus propios productos de limpieza?',
    answer: 'Sí, incluimos todos los productos profesionales eco-friendly en nuestros servicios. Solo necesitas tener agua disponible.',
    category: 'service' as const,
    popular: true,
  },
  {
    id: '2',
    question: '¿Debo estar presente durante la limpieza?',
    answer: 'No es necesario. Manejamos un sistema de llaves seguro y nuestro personal está completamente verificado con antecedentes al día.',
    category: 'service' as const,
    popular: true,
  },
  {
    id: '3',
    question: '¿Qué pasa si no quedo conforme con el servicio?',
    answer: 'Ofrecemos garantía 100% de satisfacción. Si no quedas conforme, regresamos sin costo adicional o devolvemos tu dinero.',
    category: 'service' as const,
    popular: true,
  },
  {
    id: '4',
    question: '¿Con cuánta anticipación debo agendar?',
    answer: 'Recomendamos agendar con 24-48 horas de anticipación, pero también atendemos emergencias el mismo día según disponibilidad.',
    category: 'booking' as const,
    popular: false,
  },
  {
    id: '5',
    question: '¿Puedo modificar o cancelar mi servicio?',
    answer: 'Puedes modificar o cancelar hasta 2 horas antes del servicio sin penalización. Después de ese tiempo se aplica el 50% del valor.',
    category: 'booking' as const,
    popular: false,
  },
  {
    id: '6',
    question: '¿Los precios incluyen materiales?',
    answer: 'Sí, todos nuestros precios incluyen productos de limpieza profesionales, herramientas y el primer mes de consumibles básicos.',
    category: 'pricing' as const,
    popular: true,
  },
  {
    id: '7',
    question: '¿Hacen limpieza de alfombras y cortinas?',
    answer: 'Sí, ofrecemos shampoo de alfombras y limpieza de cortinas como servicios adicionales. Consulta precios en nuestra calculadora.',
    category: 'service' as const,
    popular: false,
  },
  {
    id: '8',
    question: '¿Están asegurados?',
    answer: 'Sí, contamos con seguro de responsabilidad civil que cubre cualquier eventual daño durante el servicio.',
    category: 'general' as const,
    popular: false,
  },
];

// ==========================================
// NAVIGATION ROUTES
// ==========================================

export const NAVIGATION_ROUTES = [
  {
    name: 'Inicio',
    path: '/',
    description: 'Página principal con calculadora de precios',
  },
  {
    name: 'Servicios', 
    path: '/servicios',
    description: 'Todos nuestros servicios de limpieza',
    children: [
      {
        name: 'Residencial',
        path: '/servicios/residencial',
        description: 'Servicios para hogares',
      },
      {
        name: 'Empresarial',
        path: '/servicios/empresarial', 
        description: 'Servicios para empresas y oficinas',
      },
    ],
  },
  {
    name: 'Cotizador',
    path: '/cotizador',
    description: 'Calculadora detallada de precios paso a paso',
  },
  {
    name: 'Cobertura',
    path: '/cobertura',
    description: 'Zonas de servicio y mapa de cobertura',
  },
  {
    name: 'Sobre Nosotros',
    path: '/sobre-nosotros',
    description: 'Nuestra historia, equipo y certificaciones',
  },
  {
    name: 'Contacto',
    path: '/contacto',
    description: 'Formulario de contacto y información',
  },
];

// ==========================================
// ANALYTICS EVENTS
// ==========================================

export const ANALYTICS_EVENTS = {
  // Page Views
  PAGE_VIEW: 'page_view',
  
  // Engagement
  CALCULATOR_START: 'calculator_start',
  CALCULATOR_COMPLETE: 'calculator_complete',
  CALCULATOR_STEP: 'calculator_step',
  
  // Conversions
  WHATSAPP_CLICK: 'whatsapp_click',
  PHONE_CLICK: 'phone_click', 
  FORM_SUBMIT: 'form_submit',
  QUOTE_REQUEST: 'quote_request',
  
  // User Actions
  SCROLL_DEPTH: 'scroll_depth',
  VIDEO_PLAY: 'video_play',
  DOWNLOAD: 'download',
  SHARE: 'share',
  
  // Errors
  FORM_ERROR: 'form_error',
  CALCULATION_ERROR: 'calculation_error',
} as const;

// ==========================================
// UTILITY CONSTANTS
// ==========================================

export const SQUARE_METER_RANGES = [
  { label: 'Menos de 50m²', value: 40, min: 20, max: 49 },
  { label: '50 - 100m²', value: 75, min: 50, max: 100 },
  { label: '100 - 150m²', value: 125, min: 101, max: 150 },
  { label: '150 - 200m²', value: 175, min: 151, max: 200 },
  { label: 'Más de 200m²', value: 250, min: 201, max: 500 },
];

export const ROOM_RANGES = [
  { label: '1-2 ambientes', value: 2 },
  { label: '3-4 ambientes', value: 4 }, 
  { label: '5-6 ambientes', value: 6 },
  { label: '7+ ambientes', value: 8 },
];

export const PROPERTY_TYPES = [
  { 
    id: 'casa' as const,
    name: 'Casa',
    description: 'Casa independiente o pareada',
    icon: '🏠'
  },
  {
    id: 'departamento' as const,
    name: 'Departamento', 
    description: 'Departamento en edificio',
    icon: '🏢'
  },
  {
    id: 'oficina' as const,
    name: 'Oficina',
    description: 'Espacio de trabajo comercial',
    icon: '🏢'
  },
  {
    id: 'local' as const,
    name: 'Local Comercial',
    description: 'Tienda o local comercial',
    icon: '🏪'
  },
];

// ==========================================
// FORM VALIDATION CONSTANTS
// ==========================================

export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_MIN_LENGTH: 9,
  PHONE_MAX_LENGTH: 12,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^(\+?56)?[2-9]\d{8}$/,
  MIN_SQUARE_METERS: 20,
  MAX_SQUARE_METERS: 1000,
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es obligatorio',
  INVALID_EMAIL: 'Ingresa un email válido',
  INVALID_PHONE: 'Ingresa un teléfono válido (formato chileno)',
  NAME_TOO_SHORT: 'El nombre debe tener al menos 2 caracteres',
  NAME_TOO_LONG: 'El nombre no puede exceder los 50 caracteres',
  INVALID_SQUARE_METERS: 'Los metros cuadrados deben estar entre 20 y 1000',
  CALCULATION_ERROR: 'Error al calcular el precio. Por favor intenta nuevamente.',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
  FORM_SUBMISSION_ERROR: 'Error al enviar el formulario. Por favor usa WhatsApp como alternativa.',
};