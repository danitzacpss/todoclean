// ===================================
// TODO CLEAN - TYPESCRIPT TYPES
// Core type definitions for the app
// ===================================

// ==========================================
// PRICING & CALCULATOR TYPES
// ==========================================

export type ServiceType = 'regular' | 'profunda' | 'postobra';
export type PropertyType = 'casa' | 'departamento' | 'oficina' | 'local';
export type FrequencyType = 'unica' | 'semanal' | 'quincenal' | 'mensual';
export type ZoneType = 'A' | 'B' | 'C';

export interface PriceCalculation {
  serviceType: ServiceType;
  propertyType: PropertyType;
  squareMeters: number;
  rooms: number;
  frequency: FrequencyType;
  extras: string[];
  zone?: ZoneType;
  basePrice: number;
  frequencyDiscount: number;
  zoneCharge: number;
  extrasTotal: number;
  totalPrice: number;
  estimatedHours: number;
}

export interface ServicePricing {
  [key in ServiceType]: {
    basePrice: number;
    pricePerSqm: number;
    minHours: number;
    maxHours: number;
    description: string;
    includes: string[];
  };
}

export interface FrequencyDiscount {
  [key in FrequencyType]: {
    discount: number;
    label: string;
    description: string;
  };
}

export interface ExtraService {
  id: string;
  name: string;
  price: number;
  description: string;
  estimatedTime: number;
  category: 'interior' | 'exterior' | 'appliances';
}

// ==========================================
// FORM TYPES
// ==========================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: ServiceType;
  preferredDate?: string;
  source?: 'website' | 'whatsapp' | 'referral' | 'social';
}

export interface QuoteFormData {
  // Step 1: Basic Info
  propertyType: PropertyType;
  squareMeters: number;
  rooms: number;
  
  // Step 2: Service Details
  serviceType: ServiceType;
  frequency: FrequencyType;
  extras: string[];
  preferredDate?: string;
  
  // Step 3: Contact & Location
  name: string;
  phone: string;
  email?: string;
  address: string;
  zone?: ZoneType;
  notes?: string;
  
  // Calculated fields
  calculation?: PriceCalculation;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
  interests: string[];
}

// ==========================================
// BUSINESS TYPES
// ==========================================

export interface ServiceArea {
  zone: ZoneType;
  name: string;
  communes: string[];
  surcharge: number;
  responseTime: string; // e.g., "24 horas"
  color: string;
  coordinates?: [number, number][];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: ServiceType;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  photo?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  experience: number; // years
  specialties: string[];
}

export interface CompanyStats {
  servicesCompleted: number;
  happyClients: number;
  averageRating: number;
  responseTime: string;
  repeatCustomers: number;
}

// ==========================================
// CONTENT TYPES
// ==========================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'service' | 'booking';
  popular: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedDate: string;
  author: string;
  tags: string[];
  featuredImage?: string;
  readTime: number; // minutes
  seoTitle?: string;
  seoDescription?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
  terms: string[];
  targetArea?: string;
  code?: string;
  active: boolean;
}

// ==========================================
// UI COMPONENT TYPES
// ==========================================

export type ButtonVariant = 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export type CardVariant = 'default' | 'interactive' | 'service' | 'testimonial';

export interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

export interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
}

// ==========================================
// LOADING & ERROR TYPES
// ==========================================

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  data?: any;
}

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'shimmer' | 'wave';
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: {
    componentStack: string;
  } | null;
  errorId: string;
}

// ==========================================
// ANALYTICS & TRACKING TYPES
// ==========================================

export interface AnalyticsEvent {
  event: string;
  category: 'engagement' | 'conversion' | 'navigation' | 'form';
  label?: string;
  value?: number;
  service?: ServiceType;
  source?: string;
}

export interface ConversionEvent {
  type: 'form_submit' | 'whatsapp_click' | 'calculator_complete' | 'phone_click';
  service?: ServiceType;
  value?: number;
  step?: string;
  metadata?: Record<string, any>;
}

// ==========================================
// API TYPES
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EmailServiceResponse {
  messageId: string;
  status: 'sent' | 'failed';
  error?: string;
}

export interface WhatsAppMessage {
  service: ServiceType;
  message: string;
  phone: string;
  source: string;
  metadata?: Record<string, any>;
}

// ==========================================
// UTILITY TYPES
// ==========================================

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: Status;
  error: string | null;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// ==========================================
// CONFIGURATION TYPES
// ==========================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  social: {
    instagram?: string;
    facebook?: string;
    google?: string;
  };
  businessHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  coverage: ServiceArea[];
}

export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  VITE_SITE_URL: string;
  VITE_ANALYTICS_ID?: string;
  VITE_FACEBOOK_PIXEL_ID?: string;
  VITE_FORMSPREE_ENDPOINT?: string;
  VITE_MAPS_API_KEY?: string;
}

// ==========================================
// ERROR TYPES
// ==========================================

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

// ==========================================
// HOOK TYPES
// ==========================================

export interface UseLocalStorageOptions {
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
}

export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: any; // Zod schema
  onSubmit: (values: T) => Promise<void> | void;
}

// ==========================================
// CONTEXT TYPES
// ==========================================

export interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user?: any; // Future user authentication
  config: SiteConfig;
}

export interface CalculatorContextType {
  currentStep: number;
  formData: Partial<QuoteFormData>;
  calculation: PriceCalculation | null;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetCalculator: () => void;
  calculatePrice: () => void;
}

// ==========================================
// ROUTER TYPES
// ==========================================

export interface RouteMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}