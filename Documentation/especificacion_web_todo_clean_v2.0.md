# Especificación Web Todo Clean v2.0 — Optimizada
> Documento funcional mejorado con estrategia UX/UI optimizada para conversión

---

## 🎯 OBJETIVOS Y MÉTRICAS DE ÉXITO

### Objetivos Primarios
- **Generar 100+ leads calificados mensuales** (residencial + empresarial)
- **Tasa de conversión objetivo: 5-8%** de visitantes a clientes
- **Reducir consultas de precio en 60%** mediante transparencia
- **Posicionamiento SEO local Top 3** para "limpieza Chillán"

### KPIs Principales
- Tasa de conversión por canal (WhatsApp/Form/Teléfono)
- Tiempo promedio para cotización: <2 minutos
- Bounce rate objetivo: <40%
- Mobile engagement: >60% del tráfico
- Customer Acquisition Cost (CAC) objetivo: <$15.000 CLP

---

## 🗺️ CUSTOMER JOURNEY Y ARQUITECTURA

### Journey Map Optimizado

```
1. AWARENESS → 2. CONSIDERATION → 3. DECISION → 4. ACTION → 5. RETENTION

1. AWARENESS
   - SEO local: "limpieza Chillán"
   - Google My Business optimizado
   - Social media local
   - Referidos con incentivos

2. CONSIDERATION  
   - Landing diferenciada (residencial/empresarial)
   - Calculadora de precios instantánea
   - Testimonios y casos de éxito
   - Comparador vs competencia

3. DECISION
   - Garantía de satisfacción visible
   - Proceso transparente de 3 pasos
   - Chat en vivo/WhatsApp Business
   - Urgencia: "Agenda disponible limitada"

4. ACTION
   - Cotización en <30 segundos
   - Confirmación inmediata
   - Recordatorio pre-servicio
   - Pago online opcional

5. RETENTION
   - Follow-up post-servicio
   - Programa de referidos (20% descuento)
   - Plan recurrente con descuento
   - Newsletter con tips de limpieza
```

### Arquitectura de Información

```
HOME
├── Hero + Cotizador Rápido
├── Servicios (cards interactivas)
├── ¿Por Qué Todo Clean? (diferenciadores)
├── Testimonios (carrusel)
├── Proceso (3 pasos visuales)
└── CTA Flotante WhatsApp

SERVICIOS
├── Residencial
│   ├── Limpieza Regular (desde $35.000)
│   ├── Limpieza Profunda (desde $55.000)
│   └── Post-Obra/Mudanza (desde $80.000)
└── Empresarial
    ├── Oficinas (planes desde $80.000/mes)
    ├── Locales Comerciales
    └── Edificios/Condominios

COTIZADOR
├── Paso 1: Tipo de servicio
├── Paso 2: Detalles (m2, frecuencia)
├── Paso 3: Precio instantáneo + Agendar
└── Confirmación con opciones de pago

COBERTURA
├── Mapa interactivo
├── Lista de comunas con tiempos
└── Calculador de recargo por distancia
```

---

## 📱 PÁGINAS Y CONTENIDO OPTIMIZADO

### 1. HOME — Landing de Alta Conversión

#### Hero Section
```
Headline: "Tu Hogar Impecable en 3 Horas"
Subheadline: "Limpieza profesional con estándares americanos. 
             Puntualidad garantizada o tu dinero de vuelta"

CTA Principal: [COTIZAR EN 30 SEGUNDOS] → Calculadora
CTA Secundario: [WhatsApp Directo] → Chat prellenado

Trust Badges:
✓ +500 hogares atendidos
✓ 4.8★ en Google Reviews  
✓ Respuesta en <2 horas
✓ 100% Satisfacción garantizada
```

#### Calculadora de Precios Instantánea (Above the fold)
```javascript
// Componente interactivo en Hero
Calculator = {
  step1: "¿Qué necesitas limpiar?" 
         [Casa/Depto] [Oficina] [Post-Obra],
  
  step2: "¿Cuántos m2 aproximados?"
         [<50] [50-100] [100-150] [>150],
  
  step3: "¿Con qué frecuencia?"
         [Una vez] [Semanal] [Quincenal] [Mensual],
  
  result: "Tu precio estimado: $XX.XXX CLP"
          [AGENDAR AHORA] [PERSONALIZAR]
}
```

#### Sección Servicios — Cards Interactivas
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ LIMPIEZA        │ │ LIMPIEZA        │ │ POST-OBRA Y     │
│ REGULAR         │ │ PROFUNDA        │ │ MUDANZA         │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ Desde $35.000   │ │ Desde $55.000   │ │ Desde $80.000   │
│ • 3-4 horas     │ │ • 4-6 horas     │ │ • 6-8 horas     │
│ • Mantención    │ │ • Desinfección  │ │ • Escombros     │
│ • Ideal semanal │ │ • Detailing     │ │ • Sanitización  │
│                 │ │                 │ │                 │
│ [VER DETALLES]  │ │ [VER DETALLES]  │ │ [VER DETALLES]  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

#### Diferenciadores — ¿Por Qué Todo Clean?
```
🏆 ESTÁNDARES AMERICANOS        ⚡ RAPIDEZ GARANTIZADA
   Metodología certificada          3 horas promedio
   Productos eco-friendly           Sin retrasos

🔒 100% CONFIABLE               📱 GESTIÓN DIGITAL
   Personal verificado              WhatsApp Business
   Seguro incluido                  Facturación electrónica
```

#### Social Proof — Testimonios Reales
```
Carrusel con 5 testimonios verificados:
[Foto] "Excelente servicio, puntuales y prolijos" 
       - María González, Quilamapu ★★★★★

[Foto] "Mi oficina queda impecable cada semana"
       - Juan Pérez, Centro Chillán ★★★★★

[Link: Ver todas las reseñas en Google →]
```

#### Proceso Simple — 3 Pasos Visuales
```
1️⃣ COTIZA           2️⃣ AGENDA           3️⃣ RELÁJATE
   En 30 segundos       Elige tu horario      Nosotros limpiamos
   Sin compromiso       Confirmación SMS       Pago post-servicio
```

#### Promoción Quilamapu — Banner Destacado
```
🎉 VECINOS DE QUILAMAPU: 20% DESCUENTO PRIMERA LIMPIEZA
   Válido hasta 31/12/2024 • Cupos limitados
   [RECLAMAR DESCUENTO] → WhatsApp con código QUILA20
```

---

### 2. SERVICIOS — Páginas Detalladas por Segmento

#### 2.1 Servicios Residenciales

##### Tabla de Precios Transparente
```markdown
| Servicio | <50m² | 50-100m² | 100-150m² | >150m² |
|----------|-------|----------|-----------|--------|
| Regular (3hrs) | $35.000 | $45.000 | $55.000 | Cotizar |
| Profunda (5hrs) | $55.000 | $70.000 | $85.000 | Cotizar |
| Post-obra | $80.000 | $100.000 | $120.000 | Cotizar |

* Precios incluyen insumos básicos
* Frecuencia semanal: -15% descuento
* Frecuencia quincenal: -10% descuento
```

##### ¿Qué Incluye Cada Servicio?
```
LIMPIEZA REGULAR               LIMPIEZA PROFUNDA
✓ Aspirado/barrido             ✓ Todo lo regular +
✓ Trapeado                     ✓ Limpieza de ventanas
✓ Desinfección baños           ✓ Electrodomésticos por dentro
✓ Cocina básica                ✓ Zócalos y marcos
✓ Cambio de sábanas            ✓ Debajo de muebles
✓ Orden general                ✓ Desinfección profunda
```

##### FAQs Específicas del Servicio
- ¿Traen sus propios productos? Sí, incluidos en el precio
- ¿Debo estar presente? No es necesario, sistema de llaves
- ¿Puedo personalizar? Sí, ajustamos según tus necesidades

#### 2.2 Servicios Empresariales

##### Planes Corporativos — Tabla Comparativa
```markdown
| Característica | BÁSICO | PROFESIONAL | PREMIUM |
|----------------|--------|-------------|---------|
| Frecuencia | 1x semana | 2x semana | Diaria |
| Horas por visita | 3 | 4 | Flexible |
| Insumos incluidos | Primer mes | Siempre | Premium |
| Reposición consumibles | No | Básicos | Completo |
| Supervisor dedicado | No | Sí | Sí |
| Precio mensual | $80.000 | $150.000 | $280.000 |
| Ahorro anual | - | -10% | -20% |
```

##### Beneficios para Empresas
- Facturación mensual consolidada
- Portal empresarial para gestión
- Reemplazo garantizado de personal
- Auditorías de calidad mensuales
- Certificado de limpieza COVID-19

---

### 3. COTIZADOR INTELIGENTE — Página Dedicada

#### Wizard de Cotización (3 pasos)
```javascript
// PASO 1: Información Básica
form_step1: {
  tipo_inmueble: ["Casa", "Departamento", "Oficina", "Local"],
  metros_cuadrados: [slider: 20-500m²],
  numero_ambientes: ["1-2", "3-4", "5-6", "7+"]
}

// PASO 2: Detalles del Servicio  
form_step2: {
  tipo_limpieza: ["Regular", "Profunda", "Post-obra"],
  frecuencia: ["Una vez", "Semanal", "Quincenal", "Mensual"],
  extras: ["Ventanas", "Terraza", "Garage", "Refrigerador"],
  fecha_deseada: [calendario]
}

// PASO 3: Resultado y Contacto
result: {
  precio_base: "$45.000",
  descuento_frecuencia: "-$6.750 (15%)",
  extras: "+$10.000",
  TOTAL: "$48.250",
  
  cta: ["AGENDAR AHORA", "AJUSTAR COTIZACIÓN", "GUARDAR Y PENSAR"]
}
```

---

### 4. COBERTURA — Mapa Interactivo

#### Componente de Mapa
```javascript
// Mapa interactivo con zonas
MapComponent: {
  zones: {
    zone_A: {
      comunas: ["Chillán Centro", "Las Termas", "Quilamapu"],
      color: "green",
      recargo: "$0",
      tiempo_respuesta: "24 horas"
    },
    zone_B: {
      comunas: ["Chillán Viejo", "San Carlos", "Coihueco"],
      color: "yellow", 
      recargo: "+$5.000",
      tiempo_respuesta: "48 horas"
    },
    zone_C: {
      comunas: ["Bulnes", "Quillón", "San Ignacio"],
      color: "orange",
      recargo: "+$10.000", 
      tiempo_respuesta: "72 horas"
    }
  },
  
  search: "Ingresa tu dirección para ver disponibilidad"
}
```

---

### 5. SOBRE NOSOTROS — Trust Building

#### Contenido de Confianza
```
NUESTRA HISTORIA
Fundados en 2023, nacimos de la frustración con servicios 
impuntuales y poco profesionales. Implementamos metodología
americana de limpieza certificada.

NUESTRO EQUIPO
[Fotos del equipo con nombres]
• 12 profesionales capacitados
• Verificación de antecedentes
• Uniformados e identificados
• Capacitación continua

CERTIFICACIONES Y GARANTÍAS
✓ Seguro de responsabilidad civil
✓ Protocolo COVID-19 certificado
✓ Productos eco-friendly certificados
✓ Garantía 100% satisfacción o devolución

NÚMEROS QUE HABLAN
📊 +500 servicios completados
⭐ 4.8/5 rating promedio
⏱️ 98% puntualidad
🔄 85% clientes recurrentes
```

---

## 🎨 DISEÑO Y EXPERIENCIA DE USUARIO

### Sistema de Diseño

#### Paleta de Colores
```css
:root {
  --primary: #2563EB;      /* Azul confianza */
  --secondary: #10B981;    /* Verde limpieza */
  --accent: #F59E0B;       /* Amarillo CTA */
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --background: #FFFFFF;
  --surface: #F9FAFB;
  --error: #EF4444;
  --success: #10B981;
}
```

#### Tipografía
```css
--font-heading: 'Inter', sans-serif;     /* Moderno y legible */
--font-body: 'Open Sans', sans-serif;    /* Amigable */
--font-mono: 'JetBrains Mono', monospace; /* Precios */

/* Escala tipográfica mobile-first */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 1.875rem; /* 30px */
```

#### Componentes UI Clave

##### Botones
```css
.btn-primary {
  background: var(--accent);
  padding: 16px 32px;
  font-weight: 600;
  border-radius: 8px;
  min-height: 48px; /* Touch-friendly */
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.25);
}

.btn-whatsapp {
  background: #25D366;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  animation: pulse 2s infinite;
}
```

##### Cards de Servicio
```css
.service-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}
```

---

## ♿ ACCESIBILIDAD WCAG 2.1 AA

### Requerimientos Obligatorios

#### 1. Contraste de Color
- Texto normal: ratio mínimo 4.5:1
- Texto grande (>18px): ratio mínimo 3:1
- Elementos interactivos: ratio mínimo 3:1

#### 2. Navegación por Teclado
```javascript
// Todos los elementos interactivos accesibles
tabIndex: {
  skipLink: 0,
  menuItems: 0,
  buttons: 0,
  formInputs: 0,
  links: 0
}

// Focus visible personalizado
:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}
```

#### 3. Screen Readers
```html
<!-- Estructura semántica correcta -->
<header role="banner">
  <nav role="navigation" aria-label="Menú principal">
    
<main role="main">
  <h1>Único H1 por página</h1>
  <section aria-labelledby="servicios">
    <h2 id="servicios">Nuestros Servicios</h2>
    
<!-- Alt text descriptivo -->
<img src="limpieza.jpg" 
     alt="Profesional de Todo Clean limpiando cocina con productos eco-friendly">

<!-- ARIA labels para iconos -->
<button aria-label="Abrir chat de WhatsApp">
  <svg aria-hidden="true">...</svg>
</button>
```

#### 4. Formularios Accesibles
```html
<label for="nombre">Nombre completo *</label>
<input id="nombre" 
       type="text" 
       required 
       aria-required="true"
       aria-describedby="nombre-error">
<span id="nombre-error" role="alert">Este campo es obligatorio</span>
```

---

## 📱 ESPECIFICACIONES MOBILE-FIRST

### Breakpoints Responsive
```css
/* Mobile First Approach */
/* Base: 320px - 640px (Mobile) */
/* sm: 640px+ (Tablet Portrait) */
/* md: 768px+ (Tablet Landscape) */
/* lg: 1024px+ (Desktop) */
/* xl: 1280px+ (Desktop Large) */
```

### Optimizaciones Mobile

#### Touch Targets
- Mínimo 44x44px para todos los elementos interactivos
- Espaciado mínimo 8px entre targets
- Botón WhatsApp: 56x56px mínimo

#### Performance Mobile
```javascript
performance_targets: {
  first_contentful_paint: "<1.8s",
  largest_contentful_paint: "<2.5s", 
  cumulative_layout_shift: "<0.1",
  first_input_delay: "<100ms",
  time_to_interactive: "<3.8s"
}

// Lazy loading de imágenes
<img loading="lazy" src="servicio.jpg">

// Critical CSS inline
<style>/* Critical above-fold styles */</style>
```

#### Formulario Mobile Optimizado
```html
<!-- Teclados específicos -->
<input type="tel" inputmode="numeric" pattern="[0-9]*">
<input type="email" autocomplete="email">

<!-- Autocompletado para mejor UX -->
<input name="address" autocomplete="street-address">
```

---

## 🔧 FUNCIONALIDADES TÉCNICAS

### 1. WhatsApp Business API Integration
```javascript
// Enlaces con mensajes prellenados dinámicos
const whatsappLink = (service, plan) => {
  const baseURL = "https://wa.me/56926176543";
  const messages = {
    cotizacion: `Hola! Necesito una cotización para ${service}`,
    quilamapu: `Hola! Soy de Quilamapu, quiero mi 20% descuento (QUILA20)`,
    oficinas: `Hola! Me interesa el plan ${plan} para oficinas`
  };
  return `${baseURL}?text=${encodeURIComponent(messages[service])}`;
}
```

### 2. Sistema de Cotización
```javascript
// Calculadora de precios con lógica
const calculatePrice = (params) => {
  const { type, size, frequency, extras } = params;
  
  // Precios base por m²
  const basePrices = {
    regular: { base: 35000, perM2: 500 },
    profunda: { base: 55000, perM2: 700 },
    postobra: { base: 80000, perM2: 1000 }
  };
  
  // Descuentos por frecuencia
  const discounts = {
    semanal: 0.15,
    quincenal: 0.10,
    mensual: 0.05,
    unica: 0
  };
  
  let price = basePrices[type].base + (size * basePrices[type].perM2);
  price *= (1 - discounts[frequency]);
  price += extras.length * 5000;
  
  return price;
}
```

### 3. Formulario con Validación y Envío
```javascript
// Integración con servicio de email
const handleFormSubmit = async (formData) => {
  // Validación frontend
  if (!validateForm(formData)) return;
  
  // Envío via Formspree/EmailJS/SendGrid
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Tracking de conversión
      gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: formData.service
      });
      
      // Confirmación visual
      showSuccess('¡Mensaje enviado! Responderemos en menos de 2 horas');
      
      // Auto-respuesta
      sendAutoReply(formData.email);
    }
  } catch (error) {
    showError('Error al enviar. Por favor usa WhatsApp');
  }
}
```

### 4. Analytics y Tracking
```javascript
// Google Analytics 4 + Meta Pixel
const tracking = {
  pageView: (page) => {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: page
    });
    fbq('track', 'PageView');
  },
  
  leadGenerated: (value, service) => {
    gtag('event', 'generate_lead', {
      currency: 'CLP',
      value: value,
      service: service
    });
    fbq('track', 'Lead', {
      value: value,
      currency: 'CLP'
    });
  },
  
  whatsappClick: (message) => {
    gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: message
    });
  }
}
```

### 5. Schema Markup para SEO Local
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Todo Clean Chillán",
  "image": "https://todoclean.cl/logo.jpg",
  "telephone": "+56926176543",
  "email": "todocleanchillan@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Chillán",
    "addressRegion": "Ñuble",
    "addressCountry": "CL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -36.6066,
    "longitude": -72.1034
  },
  "url": "https://todoclean.cl",
  "sameAs": ["https://instagram.com/todo_cleanchillan"],
  "openingHours": "Mo-Sa 08:00-20:00",
  "priceRange": "$35.000-$120.000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
</script>
```

---

## 📊 MÉTRICAS Y TESTING

### A/B Testing Prioritario
1. **CTA Principal**: "Cotizar" vs "Cotización Gratis" vs "Ver Precios"
2. **Precio**: Mostrar desde el inicio vs revelación progresiva
3. **Formulario**: Campos mínimos vs completo
4. **WhatsApp**: Flotante vs integrado en contenido

### Herramientas de Medición
- Google Analytics 4: Comportamiento y conversiones
- Hotjar/Clarity: Heatmaps y grabaciones
- Google Optimize: A/B testing
- PageSpeed Insights: Performance
- Search Console: SEO y búsquedas

### KPIs de Seguimiento Semanal
```javascript
weekly_metrics: {
  traffic: {
    users: "Total visitantes únicos",
    sessions: "Sesiones totales",
    bounce_rate: "Tasa de rebote",
    avg_session: "Duración promedio"
  },
  
  conversion: {
    form_submits: "Formularios enviados",
    whatsapp_clicks: "Clicks WhatsApp",
    calculator_completions: "Cotizaciones completadas",
    conversion_rate: "% visitante a lead"
  },
  
  engagement: {
    pages_per_session: "Páginas por sesión",
    scroll_depth: "Profundidad de scroll",
    interaction_rate: "Tasa de interacción",
    return_visitors: "Visitantes recurrentes"
  }
}
```

---

## 🚀 ROADMAP DE IMPLEMENTACIÓN

### FASE 1: MVP Fundacional (Semanas 1-4)
**Objetivo: Lanzar sitio funcional con conversión básica**

#### Semana 1-2: Setup y Desarrollo Base
- [ ] Setup proyecto (Vite + React + TailwindCSS)
- [ ] Componentes base y sistema de diseño
- [ ] Homepage con hero y servicios
- [ ] Integración WhatsApp básica
- [ ] Mobile responsive

#### Semana 3-4: Funcionalidades Core
- [ ] Calculadora de precios funcional
- [ ] Formulario de contacto con validación
- [ ] Páginas de servicios con precios
- [ ] SEO básico y meta tags
- [ ] Analytics setup

**Entregable: Sitio funcional con 3% conversión mínima**

### FASE 2: Optimización Conversión (Semanas 5-8)
**Objetivo: Mejorar conversión a 5-6%**

#### Semana 5-6: Trust y Social Proof
- [ ] Integración testimonios reales
- [ ] Google Reviews widget
- [ ] Casos de éxito con fotos
- [ ] Garantías visibles
- [ ] Certificaciones y badges

#### Semana 7-8: UX Avanzada
- [ ] A/B testing CTAs principales
- [ ] Optimización formularios
- [ ] Chat bot básico
- [ ] Email automation setup
- [ ] Retargeting pixels

**Entregable: 5%+ conversión, 100+ leads/mes**

### FASE 3: Automatización y Escala (Semanas 9-12)
**Objetivo: Automatizar procesos y escalar**

#### Semana 9-10: Sistema de Reservas
- [ ] Calendario de disponibilidad
- [ ] Confirmación automática
- [ ] Recordatorios SMS/Email
- [ ] Portal cliente básico
- [ ] Pagos online

#### Semana 11-12: Growth Features
- [ ] Programa de referidos
- [ ] Landing pages segmentadas
- [ ] Blog con contenido SEO
- [ ] Email marketing campaigns
- [ ] Reviews automation

**Entregable: Sistema automatizado, 150+ leads/mes**

---

## 📋 CHECKLIST PRE-LANZAMIENTO

### Técnico
- [ ] Performance: Core Web Vitals verde
- [ ] Responsive: Tested 320px - 1920px
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge
- [ ] Forms: Validación y confirmación funcionando
- [ ] WhatsApp: Links con mensajes correctos
- [ ] Analytics: GA4 + Meta Pixel instalados
- [ ] SEO: Sitemap, robots.txt, meta tags
- [ ] SSL: Certificado activo
- [ ] Backup: Sistema de respaldo configurado

### Contenido
- [ ] Textos: Revisados sin errores
- [ ] Imágenes: Optimizadas <100kb
- [ ] Precios: Actualizados y correctos
- [ ] Testimonios: Reales con permisos
- [ ] Legal: Política privacidad y términos

### Accesibilidad
- [ ] Contraste: WCAG AA compliant
- [ ] Keyboard: Navegación completa
- [ ] Screen reader: Tested con NVDA
- [ ] Alt texts: Todas las imágenes
- [ ] Focus states: Visibles

### Marketing
- [ ] Google My Business: Configurado
- [ ] Social media: Perfiles actualizados
- [ ] Email templates: Listos
- [ ] WhatsApp Business: Configurado
- [ ] Campaigns: Lanzamiento preparado

---

## 🎯 RESULTADOS ESPERADOS

### Mes 1 Post-Lanzamiento
- 2,000 visitantes únicos
- 100 leads generados (5% conversión)
- 20 clientes nuevos (20% cierre)
- $1,600,000 CLP facturación

### Mes 3 Post-Optimización  
- 5,000 visitantes únicos
- 300 leads generados (6% conversión)
- 75 clientes nuevos (25% cierre)
- $5,000,000 CLP facturación

### Mes 6 Con Automatización
- 10,000 visitantes únicos
- 800 leads generados (8% conversión)
- 200 clientes nuevos (25% cierre)
- 50% clientes recurrentes
- $15,000,000 CLP facturación

---

**Documento preparado por:** Equipo UX/Development Todo Clean
**Versión:** 2.0
**Fecha:** Diciembre 2024
**Estado:** Listo para implementación