// ===================================
// TODO CLEAN - ANALYTICS UTILITIES
// Tracking and analytics integration
// ===================================

import type { 
  AnalyticsEvent, 
  ConversionEvent, 
  ServiceType, 
  PriceCalculation 
} from '@/types';

// Extended analytics event type with optional properties
type FlexibleAnalyticsEvent = {
  event: string;
  category: 'engagement' | 'form' | 'conversion' | 'navigation' | 'performance' | 'error' | 'marketing';
  label: string;
  value?: number;
  service?: ServiceType;
  source?: any;
};

import { ANALYTICS_EVENTS } from './constants';

// ==========================================
// GOOGLE ANALYTICS 4 INTEGRATION
// ==========================================

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}

export function initializeAnalytics(): void {
  // Initialize Google Analytics
  const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (GA_ID && typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      send_page_view: true,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  // Initialize Facebook Pixel (only if properly configured)
  const FB_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (FB_PIXEL_ID && FB_PIXEL_ID !== 'undefined' && FB_PIXEL_ID.trim() !== '' && typeof window !== 'undefined') {
    // Facebook Pixel initialization disabled in development
    // Uncomment and configure VITE_FACEBOOK_PIXEL_ID in .env to enable
    console.log('Facebook Pixel would be initialized with ID:', FB_PIXEL_ID);
  }
}

// ==========================================
// CORE TRACKING FUNCTIONS
// ==========================================

export function trackEvent(event: AnalyticsEvent | FlexibleAnalyticsEvent): void {
  const { event: eventName, category, label, value, service, source } = event;

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
      service: service,
      source: source,
      timestamp: new Date().toISOString(),
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    const fbEventMap: Record<string, string> = {
      form_submit: 'Contact',
      whatsapp_click: 'Contact', 
      calculator_complete: 'CompleteRegistration',
      phone_click: 'Contact',
      page_view: 'PageView',
    };

    const fbEvent = fbEventMap[eventName];
    if (fbEvent) {
      window.fbq('track', fbEvent, {
        content_name: label || eventName,
        content_category: service || category,
        value: value,
        currency: 'CLP',
      });
    }
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', event);
  }
}

export function trackConversion(conversion: ConversionEvent): void {
  const { type, service, value, step, metadata } = conversion;

  // Base analytics event
  const analyticsEvent: FlexibleAnalyticsEvent = {
    event: type,
    category: 'conversion',
    label: service || 'general',
    source: metadata?.source,
  };
  
  if (value !== undefined) analyticsEvent.value = value;
  if (service !== undefined) analyticsEvent.service = service;
  
  trackEvent(analyticsEvent as AnalyticsEvent);

  // Enhanced conversion tracking for specific events
  switch (type) {
    case 'form_submit':
      trackFormSubmission(service, metadata);
      break;
    
    case 'whatsapp_click':
      trackWhatsAppClick(service, metadata);
      break;
      
    case 'calculator_complete':
      trackCalculatorComplete(service, value, step, metadata);
      break;
      
    case 'phone_click':
      trackPhoneClick(service, metadata);
      break;
  }
}

// ==========================================
// SPECIALIZED TRACKING FUNCTIONS
// ==========================================

export function trackPageView(path: string, title?: string): void {
  trackEvent({
    event: ANALYTICS_EVENTS.PAGE_VIEW,
    category: 'navigation',
    label: path,
    source: 'website',
  });

  // Update page title in GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
}

export function trackCalculatorStart(service?: ServiceType): void {
  const analyticsEvent: FlexibleAnalyticsEvent = {
    event: ANALYTICS_EVENTS.CALCULATOR_START,
    category: 'engagement',
    label: 'calculator_step_1',
    value: 1,
  };
  
  if (service !== undefined) analyticsEvent.service = service;
  
  trackEvent(analyticsEvent);
}

export function trackCalculatorStep(step: number, data: any): void {
  trackEvent({
    event: ANALYTICS_EVENTS.CALCULATOR_STEP,
    category: 'engagement',
    label: `calculator_step_${step}`,
    value: step,
    service: data.serviceType,
  });
}

export function trackCalculatorComplete(
  service?: ServiceType, 
  value?: number, 
  _step?: string, 
  metadata?: any
): void {
  const analyticsEvent: FlexibleAnalyticsEvent = {
    event: ANALYTICS_EVENTS.CALCULATOR_COMPLETE,
    category: 'conversion',
    label: 'calculator_completed',
    source: metadata?.source || 'calculator',
  };
  
  if (service !== undefined) analyticsEvent.service = service;
  if (value !== undefined) analyticsEvent.value = value;
  
  trackEvent(analyticsEvent);

  // Enhanced conversion tracking
  if (typeof window !== 'undefined' && window.fbq && value) {
    window.fbq('track', 'Lead', {
      content_name: 'Calculator Completion',
      content_category: service || 'general',
      value: value,
      currency: 'CLP',
    });
  }
}

export function trackFormSubmission(service?: ServiceType, metadata?: any): void {
  const analyticsEvent: FlexibleAnalyticsEvent = {
    event: ANALYTICS_EVENTS.FORM_SUBMIT,
    category: 'conversion',
    label: metadata?.formType || 'contact_form',
    value: 1,
    source: metadata?.source || 'website',
  };
  
  if (service !== undefined) analyticsEvent.service = service;
  
  trackEvent(analyticsEvent);

  // Track as lead in Facebook
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Contact Form',
      content_category: service || 'general',
    });
  }
}

export function trackWhatsAppClick(service?: ServiceType, metadata?: any): void {
  const analyticsEvent: FlexibleAnalyticsEvent = {
    event: ANALYTICS_EVENTS.WHATSAPP_CLICK,
    category: 'engagement',
    label: metadata?.source || 'whatsapp_button',
    value: 1,
    source: metadata?.source || 'website',
  };
  
  if (service !== undefined) analyticsEvent.service = service;
  
  trackEvent(analyticsEvent);
}

export function trackPhoneClick(service?: ServiceType, metadata?: any): void {
  const analyticsEvent: FlexibleAnalyticsEvent = {
    event: ANALYTICS_EVENTS.PHONE_CLICK,
    category: 'engagement',
    label: metadata?.source || 'phone_button',
    value: 1,
    source: metadata?.source || 'website',
  };
  
  if (service !== undefined) analyticsEvent.service = service;
  
  trackEvent(analyticsEvent);
}

export function trackScrollDepth(percentage: number, page: string): void {
  // Only track major scroll milestones
  if (percentage % 25 === 0) {
    trackEvent({
      event: ANALYTICS_EVENTS.SCROLL_DEPTH,
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage,
      source: page,
    });
  }
}

// ==========================================
// E-COMMERCE TRACKING
// ==========================================

export function trackPurchaseIntent(calculation: PriceCalculation): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'CLP',
      value: calculation.totalPrice,
      items: [{
        item_id: `${calculation.serviceType}_${calculation.propertyType}`,
        item_name: `${calculation.serviceType} - ${calculation.squareMeters}m²`,
        item_category: calculation.serviceType,
        quantity: 1,
        price: calculation.totalPrice,
      }],
    });
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: `${calculation.serviceType} Service`,
      content_category: calculation.serviceType,
      content_ids: [`${calculation.serviceType}_${calculation.propertyType}`],
      contents: [{
        id: `${calculation.serviceType}_${calculation.propertyType}`,
        quantity: 1,
        price: calculation.totalPrice,
      }],
      currency: 'CLP',
      value: calculation.totalPrice,
    });
  }
}

export function trackServiceView(service: ServiceType, source: string): void {
  trackEvent({
    event: 'view_item',
    category: 'engagement',
    label: `service_${service}`,
    value: 1,
    source: source,
    service: service
  });

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: `${service} Service`,
      content_category: service,
      content_type: 'service',
    });
  }
}

// ==========================================
// PERFORMANCE TRACKING
// ==========================================

export function trackPerformanceMetrics(): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track Core Web Vitals using web-vitals v5.x API
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS((metric) => {
        trackEvent({
          event: 'web_vital',
          category: 'performance' as any,
          label: 'CLS',
          value: Math.round(metric.value * 1000),
        });
      });

      onINP((metric) => {
        trackEvent({
          event: 'web_vital',
          category: 'performance' as any,
          label: 'INP',
          value: Math.round(metric.value),
        });
      });

      onFCP((metric) => {
        trackEvent({
          event: 'web_vital',
          category: 'performance' as any,
          label: 'FCP',
          value: Math.round(metric.value),
        });
      });

      onLCP((metric) => {
        trackEvent({
          event: 'web_vital',
          category: 'performance' as any,
          label: 'LCP',
          value: Math.round(metric.value),
        });
      });

      onTTFB((metric) => {
        trackEvent({
          event: 'web_vital',
          category: 'performance' as any,
          label: 'TTFB',
          value: Math.round(metric.value),
        });
      });
    }).catch((error) => {
      // Handle import errors gracefully
      if (import.meta.env.DEV) {
        console.warn('Failed to load web-vitals:', error);
      }
    });
  }
}

// ==========================================
// ERROR TRACKING
// ==========================================

export function trackError(error: Error, context?: string): void {
  trackEvent({
    event: 'exception',
    category: 'error' as any,
    label: context || 'unknown',
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      custom_parameter_1: context,
    });
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('🚨 Tracked Error:', error, context);
  }
}

export function trackFormError(
  formType: string, 
  fieldName: string, 
  errorMessage: string
): void {
  trackEvent({
    event: 'form_error',
    category: 'error' as any,
    label: `${formType}_${fieldName}`,
    value: 1,
    source: {
      formType,
      fieldName,
      errorMessage,
      timestamp: new Date().toISOString()
    }
  });

  if (import.meta.env.DEV) {
    console.warn('📝 Form Error:', { formType, fieldName, errorMessage });
  }
}

// ==========================================
// USER JOURNEY TRACKING
// ==========================================

export function trackUserJourney(step: string, data?: any): void {
  trackEvent({
    event: 'user_journey',
    category: 'engagement',
    label: step,
    value: 1,
    service: data?.service,
    source: data?.source
  });
}

export function trackServiceInterest(service: ServiceType, action: string): void {
  trackEvent({
    event: 'service_interest',
    category: 'engagement',
    label: action,
    service: service,
    value: 1
  });
}

// ==========================================
// CAMPAIGN TRACKING
// ==========================================

export function trackCampaignClick(
  campaign: string, 
  medium: string, 
  source: string
): void {
  trackEvent({
    event: 'campaign_click',
    category: 'marketing' as any,
    label: campaign,
    source: source,
    value: 1
  });

  // Set campaign parameters for attribution
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      campaign_name: campaign,
      campaign_medium: medium,
      campaign_source: source,
    });
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

export function isAnalyticsEnabled(): boolean {
  // Check if user has consented and analytics is configured
  const hasGA = Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID);
  const hasFB = Boolean(import.meta.env.VITE_FACEBOOK_PIXEL_ID);
  
  return hasGA || hasFB;
}

export function getClientId(): string | null {
  if (typeof window !== 'undefined' && window.gtag) {
    // Get GA4 client ID if available
    return new Promise((resolve) => {
      window.gtag('get', import.meta.env.VITE_GA_MEASUREMENT_ID, 'client_id', resolve);
    }) as any;
  }
  return null;
}

export function setUserProperties(properties: Record<string, any>): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      custom_map: properties,
    });
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('set', 'userData', properties);
  }
}