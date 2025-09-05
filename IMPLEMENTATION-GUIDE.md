# Todo Clean - Guía de Implementación Completa

## 📋 Resumen Ejecutivo

Esta guía proporciona instrucciones detalladas para implementar el sistema de diseño completo de Todo Clean, desde la configuración inicial hasta el despliegue en producción. El sistema está diseñado para ser completamente funcional, accesible (WCAG 2.1 AA) y optimizado para conversión.

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ y npm/yarn/pnpm
- Conocimiento de HTML5, CSS3, JavaScript ES6+
- Familiaridad con CSS Custom Properties y CSS Grid/Flexbox
- (Opcional) React/Vue.js para componentes interactivos

### Instalación Base
```bash
# Clonar el proyecto
git clone <repository-url>
cd todoclean

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar desarrollo
npm run dev
```

### Estructura de Archivos
```
todoclean/
├── design-system/
│   ├── main.css                 # Archivo principal (importa todo)
│   ├── design-tokens.css        # Tokens y variables CSS
│   ├── animations.css           # Animaciones y transiciones
│   ├── accessibility-guide.css  # Guías WCAG AA
│   ├── interactions.css         # Microinteracciones
│   ├── components/              # Componentes UI
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   └── navigation.css
│   ├── layouts/                 # Layouts de páginas
│   │   ├── homepage.css
│   │   ├── services.css
│   │   ├── calculator.css
│   │   └── coverage.css
│   └── assets-specifications.md # Especificación de assets
├── src/
│   ├── pages/
│   ├── components/
│   ├── utils/
│   └── assets/
├── public/
│   └── assets/
├── tailwind.config.js           # Configuración Tailwind
├── postcss.config.js           # PostCSS config
├── vite.config.js              # Build config
└── package.json
```

---

## 🎨 Sistema de Diseño

### Implementación de Tokens de Diseño

#### 1. Importación del Sistema Completo
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo Clean - Limpieza Profesional</title>
  
  <!-- Critical CSS inlined -->
  <style>
    /* Critical above-the-fold styles */
    @import url('./design-system/main.css');
  </style>
  
  <!-- Non-critical CSS loaded asynchronously -->
  <link rel="preload" href="./design-system/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  
  <!-- Fallback for no-JS -->
  <noscript><link rel="stylesheet" href="./design-system/main.css"></noscript>
</head>
<body>
  <!-- Skip links for accessibility -->
  <div class="skip-links">
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
    <a href="#navigation" class="skip-link">Saltar a navegación</a>
  </div>
  
  <!-- Content here -->
</body>
</html>
```

#### 2. Uso de Variables CSS
```css
/* Usando el sistema de tokens */
.mi-componente {
  /* Colores semánticos */
  background-color: var(--color-primary-600);
  color: var(--color-neutral-0);
  
  /* Espaciado del sistema */
  padding: var(--space-4) var(--space-6);
  margin-bottom: var(--space-8);
  
  /* Tipografía */
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  
  /* Bordes y sombras */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  
  /* Transiciones */
  transition: var(--transition-base);
}

.mi-componente:hover {
  background-color: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

#### 3. Integración con Tailwind CSS
```html
<!-- Usando clases de Tailwind customizadas -->
<button class="btn-base btn-primary touch-target">
  Cotizar Ahora
</button>

<div class="card-base card-interactive card-service">
  <h3 class="text-2xl font-heading font-bold text-primary-600">
    Limpieza Regular
  </h3>
  <p class="text-secondary">
    Desde $35.000 CLP
  </p>
</div>
```

---

## 🧩 Implementación de Componentes

### Botones
```html
<!-- Botón principal (CTA) -->
<button class="btn-base btn-primary btn-lg" type="button">
  <svg class="icon-lg" aria-hidden="true"><!-- WhatsApp icon --></svg>
  Cotizar por WhatsApp
</button>

<!-- Botón secundario -->
<button class="btn-base btn-secondary" type="button">
  Ver más servicios
</button>

<!-- Botón WhatsApp flotante -->
<a 
  href="https://wa.me/56926176543?text=Hola!%20Necesito%20una%20cotización%20para%20limpieza"
  class="whatsapp-float-btn btn-whatsapp btn-fab"
  aria-label="Contactar por WhatsApp"
  target="_blank"
  rel="noopener"
>
  <svg aria-hidden="true"><!-- WhatsApp icon --></svg>
  <span class="whatsapp-tooltip">¿Necesitas ayuda?</span>
</a>
```

### Cards de Servicios
```html
<div class="service-card card-interactive" role="article">
  <div class="card-service-header">
    <div class="service-icon" aria-hidden="true">
      <svg><!-- Service icon --></svg>
    </div>
    <h3 class="service-title">Limpieza Regular</h3>
  </div>
  
  <div class="card-service-price">
    <span class="price-from">Desde</span>
    <span class="price-amount">$35.000</span>
    <span class="price-currency">CLP</span>
  </div>
  
  <ul class="card-service-features">
    <li>3-4 horas de limpieza completa</li>
    <li>Aspirado y trapeado profundo</li>
    <li>Desinfección de baños</li>
    <li>Limpieza de cocina básica</li>
  </ul>
  
  <div class="card-service-cta">
    <button class="btn-base btn-primary btn-full">
      Seleccionar servicio
    </button>
  </div>
</div>
```

### Formularios Accesibles
```html
<form class="form calculator-form" method="post" novalidate>
  <div class="form-group-accessible">
    <label for="service-type" class="form-label form-required">
      Tipo de servicio
    </label>
    <select 
      id="service-type"
      name="service-type"
      class="form-input form-select"
      required
      aria-describedby="service-type-help"
      aria-invalid="false"
    >
      <option value="">Selecciona un servicio</option>
      <option value="regular">Limpieza Regular</option>
      <option value="profunda">Limpieza Profunda</option>
      <option value="post-obra">Post-Obra</option>
    </select>
    <div id="service-type-help" class="form-help-text">
      Elige el tipo de limpieza que necesitas
    </div>
    <div id="service-type-error" class="form-error-message" role="alert" style="display: none;">
      Por favor selecciona un tipo de servicio
    </div>
  </div>
  
  <div class="form-group-accessible">
    <label for="property-size" class="form-label">
      Tamaño de la propiedad (metros cuadrados)
    </label>
    <div class="form-input-group">
      <input 
        type="range"
        id="property-size"
        name="property-size"
        class="form-range"
        min="20"
        max="500"
        value="100"
        aria-describedby="size-display size-labels"
      >
      <div id="size-display" class="size-display" aria-live="polite">
        100 m²
      </div>
      <div id="size-labels" class="form-range-labels">
        <span>20 m²</span>
        <span>500 m²</span>
      </div>
    </div>
  </div>
  
  <button type="submit" class="btn-base btn-primary btn-lg btn-full">
    <span class="btn-text">Calcular precio</span>
    <div class="btn-loading-spinner" style="display: none;">
      <div class="loading-spinner"></div>
    </div>
  </button>
</form>
```

---

## 📱 Implementación Responsive

### Breakpoints y Media Queries
```css
/* Mobile First Approach */
.responsive-component {
  /* Base: Mobile (320px-639px) */
  padding: var(--space-4);
  font-size: var(--font-size-base);
  
  /* Tablet Portrait (640px+) */
  @media (min-width: 640px) {
    padding: var(--space-6);
    font-size: var(--font-size-lg);
  }
  
  /* Tablet Landscape (768px+) */
  @media (min-width: 768px) {
    padding: var(--space-8);
  }
  
  /* Desktop (1024px+) */
  @media (min-width: 1024px) {
    padding: var(--space-10);
    font-size: var(--font-size-xl);
  }
  
  /* Large Desktop (1280px+) */
  @media (min-width: 1280px) {
    padding: var(--space-12);
  }
}
```

### Grid Layouts Responsive
```html
<!-- Homepage Hero Section -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <!-- Text content -->
      <div class="hero-text animate-on-scroll">
        <div class="hero-badge">
          <svg aria-hidden="true"><!-- Star icon --></svg>
          +500 hogares atendidos
        </div>
        <h1 class="hero-headline">
          Tu Hogar <span class="highlight">Impecable</span> en 3 Horas
        </h1>
        <p class="hero-subheadline">
          Limpieza profesional con estándares americanos. 
          Puntualidad garantizada o tu dinero de vuelta.
        </p>
        <div class="hero-actions">
          <a href="#cotizador" class="btn-base btn-primary btn-lg">
            Cotizar en 30 segundos
          </a>
          <a href="https://wa.me/56926176543" class="btn-base btn-whatsapp btn-lg">
            WhatsApp directo
          </a>
        </div>
        <div class="hero-trust-badges">
          <div class="trust-badge">
            <svg aria-hidden="true"><!-- Check icon --></svg>
            4.8★ en Google Reviews
          </div>
          <div class="trust-badge">
            <svg aria-hidden="true"><!-- Clock icon --></svg>
            Respuesta en &lt;2 horas
          </div>
          <div class="trust-badge">
            <svg aria-hidden="true"><!-- Shield icon --></svg>
            100% Satisfacción garantizada
          </div>
        </div>
      </div>
      
      <!-- Calculator -->
      <div class="hero-calculator animate-on-scroll">
        <!-- Calculator implementation -->
      </div>
    </div>
  </div>
</section>
```

---

## ♿ Implementación de Accesibilidad

### WCAG 2.1 AA Compliance

#### 1. Estructura Semántica
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo Clean - Limpieza Profesional en Chillán</title>
  <meta name="description" content="Servicio de limpieza profesional en Chillán con estándares americanos. Cotiza en línea y agenda tu servicio. 100% garantizado.">
</head>
<body>
  <!-- Skip navigation -->
  <div class="skip-links">
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
  </div>
  
  <!-- Header with landmark -->
  <header role="banner" class="header">
    <nav role="navigation" aria-label="Navegación principal">
      <!-- Navigation implementation -->
    </nav>
  </header>
  
  <!-- Main content -->
  <main id="main-content" role="main">
    <h1>Limpieza Profesional para tu Hogar</h1>
    <!-- Content sections with proper heading hierarchy -->
  </main>
  
  <!-- Footer -->
  <footer role="contentinfo" class="footer">
    <!-- Footer content -->
  </footer>
  
  <!-- Live regions for dynamic content -->
  <div aria-live="polite" aria-atomic="true" class="sr-live-polite"></div>
  <div aria-live="assertive" aria-atomic="true" class="sr-live-assertive"></div>
</body>
</html>
```

#### 2. Formularios Accesibles
```html
<form class="form-accessible" method="post" novalidate>
  <fieldset class="form-fieldset">
    <legend class="form-legend">Información del servicio</legend>
    
    <div class="form-group-accessible">
      <label for="email" class="form-label">
        Correo electrónico
        <span class="form-required" aria-label="obligatorio">*</span>
      </label>
      <input 
        type="email"
        id="email"
        name="email"
        class="form-input"
        required
        aria-describedby="email-help email-error"
        aria-invalid="false"
        autocomplete="email"
      >
      <div id="email-help" class="form-help-text">
        Te enviaremos la cotización a este correo
      </div>
      <div id="email-error" class="form-error-message" role="alert" style="display: none;">
        Por favor ingresa un correo electrónico válido
      </div>
    </div>
  </fieldset>
  
  <div class="form-actions">
    <button type="submit" class="btn-base btn-primary focus-primary">
      <span class="btn-text">Enviar cotización</span>
      <span class="sr-only"> por correo electrónico</span>
    </button>
  </div>
</form>
```

#### 3. Navegación por Teclado
```javascript
// Manejo de navegación por teclado
class KeyboardNavigation {
  constructor() {
    this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.init();
  }
  
  init() {
    // Trap focus in modals
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Improve focus visibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });
  }
  
  handleKeyDown(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal[aria-hidden="false"]');
      if (openModal) {
        this.closeModal(openModal);
      }
    }
    
    // Enter and Space activate buttons
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target;
      if (target.getAttribute('role') === 'button' && !target.disabled) {
        e.preventDefault();
        target.click();
      }
    }
  }
  
  trapFocus(element) {
    const focusableEls = element.querySelectorAll(this.focusableElements);
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
}

// Initialize keyboard navigation
new KeyboardNavigation();
```

---

## 🎭 Animaciones e Interacciones

### Scroll-Based Animations
```javascript
// Intersection Observer for scroll animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '-10% 0px'
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.observerOptions
    );
    
    this.init();
  }
  
  init() {
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => this.observer.observe(el));
    
    // Staggered animations
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const children = container.querySelectorAll('.animate-on-scroll');
      children.forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Unobserve after animation to improve performance
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Initialize scroll animations
new ScrollAnimations();
```

### Counter Animation
```javascript
class CounterAnimation {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = target;
    this.duration = duration;
    this.start = 0;
  }
  
  animate() {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(this.start + (this.target - this.start) * easeOutCubic);
      
      this.element.textContent = this.formatNumber(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.element.textContent = this.formatNumber(this.target);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  formatNumber(num) {
    return num.toLocaleString('es-CL');
  }
}

// Initialize counter animations
document.querySelectorAll('.counter-animation').forEach(el => {
  const target = parseInt(el.dataset.target);
  const counter = new CounterAnimation(el, target);
  
  // Trigger animation when element comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counter.animate();
        observer.unobserve(el);
      }
    });
  });
  
  observer.observe(el);
});
```

---

## 🧮 Calculadora de Precios

### Implementación JavaScript
```javascript
class PriceCalculator {
  constructor() {
    this.form = document.querySelector('.calculator-form');
    this.steps = document.querySelectorAll('.calculator-step');
    this.currentStep = 0;
    this.formData = {
      serviceType: '',
      propertySize: 100,
      rooms: '',
      frequency: 'unica',
      extras: []
    };
    
    this.basePrices = {
      regular: { base: 35000, perM2: 500 },
      profunda: { base: 55000, perM2: 700 },
      postObra: { base: 80000, perM2: 1000 }
    };
    
    this.discounts = {
      semanal: 0.15,
      quincenal: 0.10,
      mensual: 0.05,
      unica: 0
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateProgressBar();
  }
  
  bindEvents() {
    // Service type selection
    document.querySelectorAll('.service-type-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.selectServiceType(card.dataset.service);
      });
    });
    
    // Property size slider
    const sizeSlider = document.querySelector('#property-size');
    if (sizeSlider) {
      sizeSlider.addEventListener('input', (e) => {
        this.updatePropertySize(parseInt(e.target.value));
      });
    }
    
    // Frequency selection
    document.querySelectorAll('.frequency-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.selectFrequency(card.dataset.frequency);
      });
    });
    
    // Extras checkboxes
    document.querySelectorAll('.extra-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.toggleExtra(e.target.value, e.target.checked);
      });
    });
    
    // Navigation buttons
    document.querySelector('.btn-next')?.addEventListener('click', () => {
      this.nextStep();
    });
    
    document.querySelector('.btn-prev')?.addEventListener('click', () => {
      this.prevStep();
    });
    
    // Form submission
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.calculateFinalPrice();
    });
  }
  
  selectServiceType(serviceType) {
    this.formData.serviceType = serviceType;
    
    // Update UI
    document.querySelectorAll('.service-type-card').forEach(card => {
      card.classList.remove('card-selected');
    });
    
    document.querySelector(`[data-service="${serviceType}"]`)
      .classList.add('card-selected');
    
    this.updatePrice();
    
    // Auto-advance to next step after selection
    setTimeout(() => this.nextStep(), 500);
  }
  
  updatePropertySize(size) {
    this.formData.propertySize = size;
    
    // Update display
    document.querySelector('.size-display').textContent = `${size} m²`;
    
    this.updatePrice();
  }
  
  selectFrequency(frequency) {
    this.formData.frequency = frequency;
    
    // Update UI
    document.querySelectorAll('.frequency-card').forEach(card => {
      card.classList.remove('card-selected');
    });
    
    document.querySelector(`[data-frequency="${frequency}"]`)
      .classList.add('card-selected');
    
    this.updatePrice();
  }
  
  toggleExtra(extra, checked) {
    if (checked) {
      this.formData.extras.push(extra);
    } else {
      this.formData.extras = this.formData.extras.filter(e => e !== extra);
    }
    
    this.updatePrice();
  }
  
  updatePrice() {
    if (!this.formData.serviceType) return;
    
    const basePrice = this.basePrices[this.formData.serviceType];
    let price = basePrice.base + (this.formData.propertySize * basePrice.perM2);
    
    // Apply frequency discount
    const discount = this.discounts[this.formData.frequency];
    price *= (1 - discount);
    
    // Add extras
    price += this.formData.extras.length * 5000;
    
    // Update UI
    this.displayPrice(Math.round(price));
  }
  
  displayPrice(price) {
    const priceElements = document.querySelectorAll('.price-display');
    priceElements.forEach(el => {
      el.textContent = this.formatCurrency(price);
      el.classList.add('price-update');
      setTimeout(() => el.classList.remove('price-update'), 800);
    });
    
    // Update live region for screen readers
    const liveRegion = document.querySelector('.sr-live-polite');
    if (liveRegion) {
      liveRegion.textContent = `Precio actualizado: ${this.formatCurrency(price)}`;
    }
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  }
  
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.steps[this.currentStep].classList.remove('step-active');
      this.currentStep++;
      this.steps[this.currentStep].classList.add('step-active');
      this.updateProgressBar();
    }
  }
  
  prevStep() {
    if (this.currentStep > 0) {
      this.steps[this.currentStep].classList.remove('step-active');
      this.currentStep--;
      this.steps[this.currentStep].classList.add('step-active');
      this.updateProgressBar();
    }
  }
  
  updateProgressBar() {
    const progress = ((this.currentStep + 1) / this.steps.length) * 100;
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    
    // Update step indicators
    document.querySelectorAll('.progress-step').forEach((step, index) => {
      step.classList.remove('step-active', 'step-completed');
      if (index === this.currentStep) {
        step.classList.add('step-active');
      } else if (index < this.currentStep) {
        step.classList.add('step-completed');
      }
    });
  }
  
  calculateFinalPrice() {
    this.updatePrice();
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-calculate');
    submitBtn.classList.add('btn-loading');
    
    // Simulate API call
    setTimeout(() => {
      submitBtn.classList.remove('btn-loading');
      this.showResults();
    }, 1500);
  }
  
  showResults() {
    // Hide calculator, show results
    document.querySelector('.calculator-wizard').style.display = 'none';
    document.querySelector('.calculator-result').style.display = 'block';
    
    // Trigger success animation
    document.querySelector('.result-card').classList.add('animate-scale-in');
    
    // Track conversion
    this.trackConversion();
  }
  
  trackConversion() {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_completion', {
        event_category: 'engagement',
        event_label: this.formData.serviceType,
        value: this.getCurrentPrice()
      });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: this.formData.serviceType,
        value: this.getCurrentPrice(),
        currency: 'CLP'
      });
    }
  }
  
  getCurrentPrice() {
    // Return current calculated price
    const priceElement = document.querySelector('.price-display');
    return parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
  }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PriceCalculator();
});
```

---

## 📊 Analytics y Tracking

### Google Analytics 4 Implementation
```javascript
// Google Analytics 4 configuration
class Analytics {
  constructor() {
    this.gaId = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID
    this.init();
  }
  
  init() {
    // Load gtag script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    script.async = true;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', this.gaId, {
      page_title: document.title,
      page_location: window.location.href
    });
    
    window.gtag = gtag;
    
    this.setupTracking();
  }
  
  setupTracking() {
    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      const formId = form.id || form.className;
      
      gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: formId,
        form_id: formId
      });
    });
    
    // Track button clicks
    document.addEventListener('click', (e) => {
      const button = e.target.closest('button, .btn-base, a[href^="https://wa.me"]');
      if (button) {
        const buttonText = button.textContent.trim();
        const buttonType = button.classList.contains('btn-primary') ? 'primary' : 
                          button.classList.contains('btn-whatsapp') ? 'whatsapp' : 'secondary';
        
        gtag('event', 'button_click', {
          event_category: 'engagement',
          event_label: buttonText,
          button_type: buttonType
        });
        
        // Track WhatsApp clicks specifically
        if (button.href && button.href.includes('wa.me')) {
          gtag('event', 'whatsapp_click', {
            event_category: 'contact',
            event_label: 'whatsapp_button',
            contact_method: 'whatsapp'
          });
        }
      }
    });
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Track page engagement time
    this.trackEngagementTime();
  }
  
  trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set();
    
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercent);
      
      milestones.forEach(milestone => {
        if (maxScroll >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: `${milestone}%`,
            scroll_depth: milestone
          });
        }
      });
    };
    
    let timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(trackScroll, 100);
    });
  }
  
  trackEngagementTime() {
    let startTime = Date.now();
    let isActive = true;
    let totalTime = 0;
    
    // Track when user becomes inactive
    const events = ['mouseout', 'blur', 'visibilitychange'];
    const onInactive = () => {
      if (isActive) {
        totalTime += Date.now() - startTime;
        isActive = false;
      }
    };
    
    const onActive = () => {
      if (!isActive) {
        startTime = Date.now();
        isActive = true;
      }
    };
    
    events.forEach(event => {
      document.addEventListener(event, onInactive);
    });
    
    document.addEventListener('mouseover', onActive);
    document.addEventListener('focus', onActive);
    
    // Send engagement time on page unload
    window.addEventListener('beforeunload', () => {
      if (isActive) {
        totalTime += Date.now() - startTime;
      }
      
      const engagementTime = Math.round(totalTime / 1000);
      
      gtag('event', 'page_engagement', {
        event_category: 'engagement',
        event_label: 'time_on_page',
        engagement_time: engagementTime
      });
    });
  }
  
  // Custom event tracking methods
  trackConversion(type, value, currency = 'CLP') {
    gtag('event', 'conversion', {
      event_category: 'conversion',
      event_label: type,
      value: value,
      currency: currency
    });
  }
  
  trackLead(source, value) {
    gtag('event', 'generate_lead', {
      event_category: 'lead',
      event_label: source,
      value: value,
      currency: 'CLP'
    });
  }
}

// Initialize analytics
new Analytics();
```

---

## 🚢 Despliegue y Optimización

### Build Process
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:css": "stylelint 'src/**/*.css' 'design-system/**/*.css'",
    "test": "jest",
    "test:a11y": "pa11y http://localhost:3000",
    "optimize:images": "imagemin src/assets/images/* --out-dir=public/assets/images",
    "generate:icons": "svgr src/assets/icons --out-dir=src/components/icons",
    "deploy": "npm run build && npm run deploy:netlify"
  }
}
```

### Performance Optimization Checklist
```bash
# Critical CSS extraction
npm install critical --save-dev

# Image optimization
npm install imagemin imagemin-webp imagemin-mozjpeg --save-dev

# Bundle analysis
npm install webpack-bundle-analyzer --save-dev

# Lighthouse CI
npm install @lhci/cli --save-dev
```

### Deployment Configuration

#### Netlify (_redirects)
```
# Redirect all WhatsApp links
/whatsapp https://wa.me/56926176543?text=Hola!%20Necesito%20información%20sobre%20los%20servicios%20de%20limpieza 302

# SPA fallback
/*    /index.html   200

# Security headers
/assets/*
  Cache-Control: public, max-age=31536000, immutable
  
/*.css
  Cache-Control: public, max-age=31536000, immutable
  
/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

#### Vercel (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 🧪 Testing y QA

### Accessibility Testing
```javascript
// Automated accessibility tests
const { axeCheck, createReport } = require('axe-playwright');

describe('Accessibility Tests', () => {
  test('Homepage should be accessible', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await axeCheck(page);
    createReport(accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  
  test('Calculator should be accessible', async ({ page }) => {
    await page.goto('/cotizador');
    const accessibilityScanResults = await axeCheck(page);
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

### Performance Testing
```javascript
// Lighthouse CI configuration
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/servicios'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### Cross-Browser Testing Matrix
```yaml
# Browser testing configuration
browsers:
  - name: "Chrome Latest"
    version: "latest"
  - name: "Firefox Latest"
    version: "latest"
  - name: "Safari Latest"
    version: "latest"
  - name: "Edge Latest"
    version: "latest"
  - name: "Chrome Mobile"
    device: "iPhone 12"
  - name: "Safari Mobile"
    device: "iPhone 12"

viewports:
  - name: "Mobile"
    width: 375
    height: 667
  - name: "Tablet"
    width: 768
    height: 1024
  - name: "Desktop"
    width: 1920
    height: 1080
```

---

## 📋 Checklist de Lanzamiento

### Pre-Launch Checklist

#### ✅ Funcionalidad Core
- [ ] Calculadora de precios funcionando correctamente
- [ ] Formularios enviando datos correctamente
- [ ] Links de WhatsApp con mensajes prellenados
- [ ] Navegación responsive funcionando
- [ ] Todas las páginas cargando sin errores

#### ✅ Performance
- [ ] Lighthouse Score > 90 en todas las métricas
- [ ] Imágenes optimizadas (WebP + fallbacks)
- [ ] CSS y JS minificados
- [ ] Critical CSS inlined
- [ ] Lazy loading implementado

#### ✅ SEO
- [ ] Meta tags en todas las páginas
- [ ] Schema markup implementado
- [ ] Sitemap.xml generado
- [ ] Robots.txt configurado
- [ ] URLs amigables para SEO

#### ✅ Accesibilidad
- [ ] WCAG 2.1 AA compliance verificado
- [ ] Navegación por teclado funcional
- [ ] Lectores de pantalla compatibles
- [ ] Contraste de colores verificado
- [ ] Alt texts en todas las imágenes

#### ✅ Analytics
- [ ] Google Analytics 4 configurado
- [ ] Conversión tracking funcionando
- [ ] Event tracking implementado
- [ ] Heat mapping configurado (opcional)

#### ✅ Seguridad
- [ ] Headers de seguridad configurados
- [ ] HTTPS habilitado
- [ ] Formularios con protección CSRF
- [ ] Validación de datos implementada

---

## 🎯 Próximos Pasos

### Fase 1: MVP (Semanas 1-4)
1. Implementar estructura base HTML/CSS
2. Configurar formularios y calculadora
3. Integrar WhatsApp Business API
4. Testing básico de funcionalidad
5. Deploy inicial

### Fase 2: Optimización (Semanas 5-8)
1. Implementar animaciones avanzadas
2. Optimizar performance
3. A/B testing de CTAs
4. Integrar testimoniales reales
5. SEO avanzado

### Fase 3: Escala (Semanas 9-12)
1. Dashboard de administración
2. Sistema de reservas avanzado
3. Integración pagos online
4. Programa de referidos
5. Analytics avanzado

---

## 📞 Soporte y Mantenimiento

### Documentación Adicional
- [Guía de Componentes](./components-guide.md)
- [Especificación de Assets](./design-system/assets-specifications.md)
- [API Documentation](./api-docs.md)
- [Troubleshooting Guide](./troubleshooting.md)

### Contacto Técnico
Para soporte técnico o consultas sobre implementación, contactar al equipo de desarrollo con la documentación completa del sistema de diseño.

---

**Documento de Implementación Todo Clean v2.0**  
**Fecha**: Diciembre 2024  
**Estado**: Listo para desarrollo