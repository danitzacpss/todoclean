# Todo Clean - Assets & Resources Specifications

## 📋 Resumen Ejecutivo

Este documento especifica todos los assets digitales, recursos visuales y multimedia necesarios para la implementación completa del sitio web Todo Clean, siguiendo las especificaciones del documento v2.0.

---

## 🎨 Sistema de Iconos

### Iconos de Servicios
**Formato**: SVG | **Tamaño base**: 24x24px | **Variantes**: 16px, 20px, 32px, 40px

#### Servicios Residenciales
```
🏠 limpieza-regular.svg
   - Icono de casa con brillo/limpieza
   - Colores: Primary #2563eb, Secondary #10b981
   - Uso: Cards de servicios, navegación

🔍 limpieza-profunda.svg
   - Lupa con casa/detalle
   - Colores: Primary #2563eb, Accent #f59e0b
   - Uso: Cards de servicios, proceso detallado

🏗️ post-obra.svg
   - Casa con casco de construcción
   - Colores: Warning #f59e0b, Neutral #6b7280
   - Uso: Servicios especializados

🏢 oficinas.svg
   - Edificio corporativo limpio
   - Colores: Primary #2563eb, Professional tones
   - Uso: Servicios empresariales
```

#### Iconos de Proceso
```
📝 cotizar.svg
   - Calculadora o documento con checkmark
   - Colores: Accent #f59e0b

📅 agendar.svg
   - Calendario con reloj
   - Colores: Primary #2563eb

😌 relajar.svg
   - Persona relajada o checkmark grande
   - Colores: Secondary #10b981
```

#### Iconos de Beneficios
```
⭐ calidad.svg
   - Estrella con brillo
   - Colores: Accent #f59e0b

🔒 confianza.svg
   - Escudo con checkmark
   - Colores: Primary #2563eb

⚡ rapidez.svg
   - Rayo o cronómetro
   - Colores: Secondary #10b981

📱 digital.svg
   - Smartphone con app
   - Colores: Primary #2563eb
```

### Iconos de Interface
**Formato**: SVG | **Stroke-width**: 2px | **Style**: Outline

```
📞 phone.svg - Teléfono
📧 email.svg - Email
📍 location.svg - Ubicación
💬 chat.svg - Chat/WhatsApp
🔍 search.svg - Búsqueda
📋 menu.svg - Menú hamburguesa
❌ close.svg - Cerrar
▶️ play.svg - Reproducir
⏸️ pause.svg - Pausar
◀️ arrow-left.svg - Flecha izquierda
▶️ arrow-right.svg - Flecha derecha
🔺 arrow-up.svg - Flecha arriba
🔻 arrow-down.svg - Flecha abajo
✅ check.svg - Check/Confirmación
❌ error.svg - Error/Alerta
ℹ️ info.svg - Información
⚠️ warning.svg - Advertencia
⭐ star.svg - Estrella (rating)
👤 user.svg - Usuario
🏠 home.svg - Inicio
📄 document.svg - Documento
📷 camera.svg - Cámara
📁 folder.svg - Carpeta
🔗 link.svg - Enlace
📤 upload.svg - Subir
📥 download.svg - Descargar
🔄 refresh.svg - Actualizar
⚙️ settings.svg - Configuración
```

### Especificaciones Técnicas de Iconos
```css
/* Propiedades base para iconos SVG */
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 2;
  stroke: currentColor;
  fill: none;
  vertical-align: middle;
}

/* Variantes de tamaño */
.icon-xs { width: 12px; height: 12px; }
.icon-sm { width: 16px; height: 16px; }
.icon-base { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }
.icon-2xl { width: 40px; height: 40px; }
```

---

## 📸 Imágenes y Fotografía

### Fotografías de Servicios
**Formato**: WebP (fallback: JPG) | **Calidad**: 80-90%

#### Hero Section
```
hero-limpieza-main.webp
- Resolución: 1920x1080px (16:9)
- Peso: <200KB optimizado
- Contenido: Profesional de Todo Clean limpiando cocina moderna
- Estilo: Luz natural, colores vibrantes, composición 2/3
- Alt text: "Profesional de Todo Clean realizando limpieza profunda en cocina moderna"

hero-limpieza-mobile.webp
- Resolución: 768x1024px (3:4)
- Peso: <150KB optimizado
- Versión mobile del hero
```

#### Servicios Específicos
```
servicio-regular-1.webp
- Resolución: 800x600px (4:3)
- Peso: <100KB
- Contenido: Sala de estar siendo aspirada
- Alt text: "Aspirado profesional de alfombra en sala de estar"

servicio-regular-2.webp
- Resolución: 800x600px
- Contenido: Baño después de limpieza
- Alt text: "Baño impecable después de limpieza profesional"

servicio-profundo-1.webp
- Resolución: 800x600px
- Contenido: Limpieza detallada de electrodomésticos
- Alt text: "Limpieza profunda de electrodomésticos de cocina"

servicio-profundo-2.webp
- Resolución: 800x600px
- Contenido: Ventanas siendo limpiadas
- Alt text: "Limpieza profesional de ventanas con vista cristalina"

post-obra-1.webp
- Resolución: 800x600px
- Contenido: Limpieza post-construcción
- Alt text: "Limpieza especializada post-obra en departamento nuevo"
```

#### Testimoniales
```
cliente-maria-gonzalez.webp
- Resolución: 200x200px (1:1)
- Peso: <30KB
- Contenido: Foto profesional de cliente satisfecha
- Alt text: "María González, clienta satisfecha de Quilamapu"

cliente-juan-perez.webp
- Resolución: 200x200px
- Contenido: Foto profesional de cliente empresarial
- Alt text: "Juan Pérez, dueño de oficina en centro de Chillán"

[5 fotos más de testimoniales siguiendo el mismo patrón]
```

#### Equipo y Empresa
```
equipo-todo-clean.webp
- Resolución: 1200x800px
- Peso: <150KB
- Contenido: Equipo de profesionales uniformados
- Alt text: "Equipo profesional de Todo Clean con uniformes y equipos"

van-todo-clean.webp
- Resolución: 1000x750px
- Contenido: Vehículo corporativo con branding
- Alt text: "Vehículo Todo Clean equipado para servicios de limpieza"
```

### Imágenes de Proceso
```
proceso-cotizacion.webp
- Resolución: 600x400px
- Contenido: Persona usando calculadora en tablet
- Alt text: "Cliente realizando cotización online en dispositivo móvil"

proceso-agenda.webp
- Resolución: 600x400px
- Contenido: Calendario digital con horarios disponibles
- Alt text: "Selección de horario disponible en calendario digital"

proceso-servicio.webp
- Resolución: 600x400px
- Contenido: Profesional realizando limpieza
- Alt text: "Profesional Todo Clean realizando servicio de limpieza"
```

### Especificaciones de Optimización
```html
<!-- Implementación responsive con picture element -->
<picture>
  <source media="(min-width: 1024px)" srcset="hero-limpieza-main.webp" type="image/webp">
  <source media="(min-width: 1024px)" srcset="hero-limpieza-main.jpg" type="image/jpeg">
  <source media="(max-width: 1023px)" srcset="hero-limpieza-mobile.webp" type="image/webp">
  <source media="(max-width: 1023px)" srcset="hero-limpieza-mobile.jpg" type="image/jpeg">
  <img 
    src="hero-limpieza-main.jpg" 
    alt="Profesional de Todo Clean realizando limpieza profunda en cocina moderna"
    loading="lazy"
    width="1920"
    height="1080"
  >
</picture>
```

---

## 🗺️ Mapa Interactivo de Cobertura

### SVG del Mapa de Chillán y Alrededores
```
mapa-cobertura-chillan.svg
- Formato: SVG optimizado
- Dimensiones: Escalable (viewBox proporcional)
- Peso: <50KB
- Capas:
  * Zona A (Verde): Chillán Centro, Las Termas, Quilamapu
  * Zona B (Amarillo): Chillán Viejo, San Carlos, Coihueco  
  * Zona C (Naranja): Bulnes, Quillón, San Ignacio
  * Carreteras principales
  * Etiquetas de comunas
```

#### Especificación Técnica del Mapa
```css
/* Colores de zonas */
.zona-a { fill: var(--color-secondary-500); }
.zona-b { fill: var(--color-warning-500); }
.zona-c { fill: var(--color-error-500); }

/* Estados interactivos */
.zona:hover { 
  opacity: 0.8; 
  stroke: var(--color-neutral-900);
  stroke-width: 2px;
}

.zona:focus {
  outline: 3px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

---

## 🎬 Assets Multimedia

### Videos (Opcional - Futuro)
```
video-proceso-limpieza.mp4
- Resolución: 1920x1080px (Full HD)
- Duración: 60-90 segundos
- Formato: MP4 (H.264)
- Peso: <10MB
- Contenido: Time-lapse de proceso de limpieza completo
- Subtítulos: Incluidos (SRT)
- Thumbnail: video-proceso-thumbnail.webp (1280x720px)
```

### Animaciones Lottie (Opcional)
```
loading-animation.json
- Peso: <20KB
- Duración: 2 segundos loop
- Contenido: Icono de limpieza animado

success-animation.json
- Peso: <15KB
- Duración: 1.5 segundos
- Contenido: Checkmark animado para confirmaciones
```

---

## 💼 Recursos de Marca

### Logo y Branding
```
logo-todo-clean-principal.svg
- Versiones: Horizontal, vertical, isotipo
- Colores: Full color, monocromático, blanco
- Formatos: SVG, PNG (alta resolución)
- Espaciado mínimo: 2x altura de texto

logo-todo-clean-horizontal.svg
- Uso: Header, documentos, presentaciones
- Dimensiones mínimas: 120px ancho

logo-todo-clean-vertical.svg
- Uso: Espacios cuadrados, redes sociales
- Dimensiones mínimas: 80px ancho

logo-todo-clean-isotipo.svg
- Uso: Favicon, app icon, watermarks
- Dimensiones mínimas: 32px
```

### Favicon Package
```
favicon.ico (32x32, 16x16)
favicon-16x16.png
favicon-32x32.png
apple-touch-icon.png (180x180)
android-chrome-192x192.png
android-chrome-512x512.png
site.webmanifest
browserconfig.xml
```

---

## 📱 Assets para Redes Sociales

### Open Graph Images
```
og-homepage.webp
- Resolución: 1200x630px (1.91:1)
- Peso: <100KB
- Contenido: Logo + mensaje principal + servicio destacado

og-servicios.webp
- Resolución: 1200x630px
- Contenido: Collage de servicios + logo

og-cotizador.webp
- Resolución: 1200x630px
- Contenido: Calculadora + precios + CTA
```

### Social Media Assets
```
instagram-post-template.psd
- Resolución: 1080x1080px
- Capas editables para posts frecuentes
- Brand guidelines integradas

instagram-stories-template.psd
- Resolución: 1080x1920px (9:16)
- Plantillas para promociones

facebook-cover.webp
- Resolución: 820x312px
- Diseño corporativo con información de contacto
```

---

## 🔧 Especificaciones Técnicas

### Compresión y Optimización
```javascript
// Configuración recomendada para build tools
const imageConfig = {
  webp: {
    quality: 85,
    method: 6,
    autoFilter: true
  },
  jpg: {
    quality: 80,
    progressive: true,
    mozjpeg: true
  },
  png: {
    quality: [0.8, 0.9],
    optimizationLevel: 7
  },
  svg: {
    removeViewBox: false,
    removeDimensions: true,
    cleanupAttrs: true
  }
};
```

### Lazy Loading Implementation
```html
<!-- Implementación con Intersection Observer -->
<img 
  src="placeholder.jpg" 
  data-src="imagen-real.webp"
  class="lazy-load"
  alt="Descripción accesible"
  width="800"
  height="600"
  loading="lazy"
>
```

### Critical Images
```html
<!-- Imágenes críticas (above the fold) -->
<img 
  src="hero-image.webp"
  alt="Descripción del hero"
  fetchpriority="high"
  loading="eager"
>
```

---

## 📋 Checklist de Assets

### ✅ Básicos (MVP)
- [ ] Logo principal (SVG + PNG)
- [ ] Favicon package completo
- [ ] 3 iconos de servicios principales
- [ ] 10 iconos de interface básicos
- [ ] 1 imagen hero optimizada
- [ ] 3 imágenes de servicios
- [ ] Mapa SVG de cobertura
- [ ] Open Graph image principal

### ✅ Completos (Fase 2)
- [ ] Set completo de iconos (40+)
- [ ] Galería de servicios (15 imágenes)
- [ ] 5 fotos de testimoniales reales
- [ ] 2 imágenes de equipo/empresa
- [ ] 6 imágenes de proceso
- [ ] Assets para redes sociales
- [ ] Plantillas editables

### ✅ Avanzados (Fase 3)
- [ ] Video promocional
- [ ] Animaciones Lottie
- [ ] Assets adicionales de marca
- [ ] Recursos para campañas
- [ ] Templates para marketing

---

## 🎯 Consideraciones de Performance

### Métricas Objetivo
```
Total asset size: <2MB initial load
Hero image: <200KB
Service images: <100KB each
Icons: <2KB each SVG
Total fonts: <200KB
```

### CDN Configuration
```javascript
// Headers recomendados para assets
const assetHeaders = {
  'Cache-Control': 'public, max-age=31536000', // 1 año para assets con hash
  'Content-Encoding': 'gzip',
  'Vary': 'Accept-Encoding',
  'X-Content-Type-Options': 'nosniff'
};
```

### Progressive Enhancement
```css
/* Fallbacks para navegadores legacy */
.hero-bg {
  background-image: url('hero.jpg'); /* Fallback */
  background-image: url('hero.webp'); /* Moderna */
}

/* Support detection */
.webp .hero-bg {
  background-image: url('hero.webp');
}
```

---

## 📞 Proceso de Creación y Aprobación

### Flujo de Trabajo
1. **Briefing**: Especificaciones detalladas por asset
2. **Conceptualización**: Bocetos y propuestas iniciales  
3. **Creación**: Diseño en formatos nativos (AI, PSD, Sketch)
4. **Optimización**: Exportación y compresión para web
5. **Testing**: Verificación en múltiples dispositivos y navegadores
6. **Implementación**: Integración en el sistema de assets
7. **QA**: Revisión de performance y accesibilidad

### Entregables por Asset
- Archivo fuente editable (.ai, .psd, .sketch)
- Versiones optimizadas para web (.webp, .svg)
- Fallbacks para compatibilidad (.jpg, .png)
- Documentación de uso y especificaciones
- Guía de implementación técnica

---

Este documento garantiza la creación de todos los assets necesarios para una implementación completa y optimizada del sitio web Todo Clean, manteniendo la consistencia visual y la excelencia técnica en todos los elementos gráficos.