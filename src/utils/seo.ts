// ===================================
// TODO CLEAN - SEO UTILITIES
// Optimización para motores de búsqueda
// ===================================

import { SITE_CONFIG, SERVICE_AREAS } from './constants';

// ==========================================
// SEO META GENERATION
// ==========================================

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'service';
  structuredData?: any;
  noIndex?: boolean;
}

// Generate page title with site name
export function generatePageTitle(pageTitle: string, includeCompany = true): string {
  const baseTitle = includeCompany ? `${pageTitle} | ${SITE_CONFIG.name}` : pageTitle;
  
  // Ensure title is within optimal length (50-60 characters)
  if (baseTitle.length > 60) {
    return pageTitle.length > 50 ? pageTitle.slice(0, 47) + '...' : pageTitle;
  }
  
  return baseTitle;
}

// Generate meta description with optimal length
export function generateDescription(description: string): string {
  // Optimal length is 150-160 characters
  if (description.length > 160) {
    return description.slice(0, 157) + '...';
  }
  
  return description;
}

// Generate keywords string
export function generateKeywords(...keywords: string[]): string {
  const baseKeywords = [
    'limpieza profesional',
    'limpieza Chillán',
    'servicios limpieza',
    'Todo Clean'
  ];
  
  const allKeywords = [...baseKeywords, ...keywords];
  return allKeywords.join(', ');
}

// Generate canonical URL
export function generateCanonical(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

// ==========================================
// STRUCTURED DATA GENERATORS
// ==========================================

// Local Business Schema
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.url,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chillán",
      "addressRegion": "Ñuble",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-36.6062",
      "longitude": "-72.1024"
    },
    "openingHours": [
      "Mo-Sa 08:00-20:00",
      "Su 09:00-18:00"
    ],
    "priceRange": "$$",
    "areaServed": SERVICE_AREAS.flatMap(area => 
      area.communes.map(commune => ({
        "@type": "City",
        "name": commune
      }))
    ),
    "serviceType": [
      "Limpieza residencial",
      "Limpieza comercial", 
      "Limpieza post-obra",
      "Limpieza profunda"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "125",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.google
    ]
  };
}

// Service Schema
export function generateServiceSchema(serviceName: string, description: string, price?: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url
    },
    "areaServed": SERVICE_AREAS.flatMap(area => 
      area.communes.map(commune => ({
        "@type": "City",
        "name": commune
      }))
    ),
    "serviceType": "Cleaning Service",
    ...(price && {
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "CLP",
        "availability": "https://schema.org/InStock"
      }
    })
  };
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Article Schema (for blog posts or detailed pages)
export function generateArticleSchema(
  title: string,
  description: string,
  publishDate: string,
  modifiedDate?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": SITE_CONFIG.name
    },
    "publisher": {
      "@type": "Organization", 
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.url}/logo.png`
      }
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate || publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": SITE_CONFIG.url
    }
  };
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// ==========================================
// PAGE-SPECIFIC SEO DATA
// ==========================================

export const SEO_PAGES = {
  home: {
    title: "Todo Clean Chillán - Limpieza Profesional con Estándares Americanos",
    description: "Servicios de limpieza profesional en Chillán. Puntualidad garantizada, estándares americanos, personal verificado. Cotiza gratis online.",
    keywords: generateKeywords(
      "limpieza hogar",
      "limpieza oficina", 
      "limpieza post obra",
      "cotizador online",
      "puntualidad garantizada"
    ),
    structuredData: [generateLocalBusinessSchema()]
  },
  
  servicios: {
    title: "Servicios de Limpieza Profesional",
    description: "Descubre todos nuestros servicios: limpieza regular, profunda, post-obra y empresarial. Precios transparentes desde $35.000.",
    keywords: generateKeywords(
      "servicios limpieza",
      "limpieza regular",
      "limpieza profunda",
      "post obra",
      "empresarial"
    )
  },
  
  residencial: {
    title: "Limpieza Residencial - Hogares Impecables",
    description: "Servicios de limpieza para hogares en Chillán. Limpieza regular desde $35.000, profunda desde $55.000. Personal verificado.",
    keywords: generateKeywords(
      "limpieza casa",
      "limpieza departamento",
      "limpieza hogar",
      "servicio domestico"
    )
  },
  
  empresarial: {
    title: "Limpieza Empresarial y Oficinas",
    description: "Servicios profesionales para empresas y oficinas. Planes flexibles, facturación consolidada, limpieza nocturna disponible.",
    keywords: generateKeywords(
      "limpieza oficina",
      "limpieza empresarial",
      "limpieza comercial",
      "limpieza nocturna"
    )
  },
  
  cotizador: {
    title: "Cotizador Online - Precio Instantáneo",
    description: "Calcula el precio de tu limpieza al instante. Cotizador gratuito con precios transparentes y sin sorpresas.",
    keywords: generateKeywords(
      "cotizador limpieza",
      "precio limpieza",
      "calculadora online",
      "cotizar gratis"
    )
  },
  
  cobertura: {
    title: "Cobertura de Servicios - Zonas Atendidas", 
    description: "Revisa si atendemos tu zona en Chillán y comunas cercanas. Mapa de cobertura, recargos por distancia y tiempos de respuesta.",
    keywords: generateKeywords(
      "cobertura Chillán",
      "zonas servicio",
      "comunas atendidas",
      "recargos distancia"
    )
  },
  
  sobreNosotros: {
    title: "Sobre Nosotros - Nuestra Historia",
    description: "Conoce la historia de Todo Clean Chillán. Fundados en 2023, +500 servicios realizados, 4.8/5 estrellas. Equipo profesional verificado.",
    keywords: generateKeywords(
      "historia empresa",
      "equipo profesional",
      "certificaciones",
      "experiencia"
    )
  },
  
  contacto: {
    title: "Contacto - WhatsApp +56 9 2617 6543",
    description: "Contáctanos para servicios de limpieza profesional. WhatsApp directo, formulario online, respuesta en menos de 2 horas.",
    keywords: generateKeywords(
      "contacto limpieza",
      "whatsapp limpieza",
      "telefono contacto"
    )
  },
  
  faqs: {
    title: "Preguntas Frecuentes - Dudas Resueltas",
    description: "Respuestas a las preguntas más comunes sobre nuestros servicios de limpieza. Precios, horarios, cobertura y más.",
    keywords: generateKeywords(
      "preguntas frecuentes",
      "dudas limpieza",
      "faq servicios"
    )
  }
} as const;

// ==========================================
// SEO VALIDATION HELPERS
// ==========================================

// Validate title length
export function validateTitle(title: string): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  if (title.length < 30) {
    issues.push('Title too short (minimum 30 characters recommended)');
  }
  
  if (title.length > 60) {
    issues.push('Title too long (maximum 60 characters recommended)');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

// Validate description length
export function validateDescription(description: string): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  if (description.length < 120) {
    issues.push('Description too short (minimum 120 characters recommended)');
  }
  
  if (description.length > 160) {
    issues.push('Description too long (maximum 160 characters recommended)');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

// Generate sitemap data
export function generateSitemapData() {
  const baseUrl = SITE_CONFIG.url;
  
  return {
    pages: [
      { url: baseUrl, priority: 1.0, changefreq: 'weekly' },
      { url: `${baseUrl}/servicios`, priority: 0.9, changefreq: 'monthly' },
      { url: `${baseUrl}/servicios/residencial`, priority: 0.9, changefreq: 'monthly' },
      { url: `${baseUrl}/servicios/empresarial`, priority: 0.8, changefreq: 'monthly' },
      { url: `${baseUrl}/cotizador`, priority: 0.9, changefreq: 'weekly' },
      { url: `${baseUrl}/cobertura`, priority: 0.7, changefreq: 'monthly' },
      { url: `${baseUrl}/sobre-nosotros`, priority: 0.6, changefreq: 'yearly' },
      { url: `${baseUrl}/contacto`, priority: 0.8, changefreq: 'monthly' },
      { url: `${baseUrl}/preguntas-frecuentes`, priority: 0.7, changefreq: 'monthly' },
    ],
    lastmod: new Date().toISOString().split('T')[0]
  };
}

// ==========================================
// PERFORMANCE OPTIMIZATION HELPERS
// ==========================================

// Generate preconnect links for external resources
export function generatePreconnectLinks(): Array<{ href: string; crossorigin?: boolean }> {
  return [
    { href: 'https://fonts.googleapis.com', crossorigin: true },
    { href: 'https://fonts.gstatic.com', crossorigin: true },
    { href: 'https://www.google-analytics.com' },
    { href: 'https://api.whatsapp.com' }
  ];
}

// Generate preload links for critical resources
export function generatePreloadLinks(): Array<{ href: string; as: string; type?: string }> {
  return [
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
    { href: '/css/critical.css', as: 'style' },
    { href: '/images/hero-bg.webp', as: 'image' }
  ];
}

// Generate critical CSS for above-the-fold content
export function generateCriticalCSS(): string {
  return `
    /* Critical CSS for above-the-fold content */
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.6;color:#1f2937}
    .container{max-width:1200px;margin:0 auto;padding:0 1rem}
    .btn-primary{background:#3b82f6;color:white;padding:0.75rem 1.5rem;border-radius:0.5rem;text-decoration:none;display:inline-block}
    .hero{background:linear-gradient(135deg,#1e40af,#3b82f6);color:white;padding:4rem 0;text-align:center}
    .hero h1{font-size:2.5rem;font-weight:bold;margin-bottom:1rem}
  `;
}

export default {
  generatePageTitle,
  generateDescription,
  generateKeywords,
  generateCanonical,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  SEO_PAGES,
  validateTitle,
  validateDescription
};