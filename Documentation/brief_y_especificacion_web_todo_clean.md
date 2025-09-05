# Especificación Web — Todo Clean (Etapa 1)

> Documento funcional para desarrollo de página web. **Sólo contempla la etapa 1**: sitio informativo, profesional, orientado a clientes particulares y empresas. Objetivo: presentar los servicios y permitir contacto por WhatsApp y formulario.

---

## PÁGINAS Y CONTENIDO

### 1. Home
**Objetivo:** dar visibilidad a la propuesta de valor y llevar al contacto (WhatsApp o formulario).

**Contiene:**
- **Header** con logo, menú principal (Servicios, Cobertura, FAQs, Quiénes somos, Contacto).
- **Hero principal**:
  - Título: “Limpieza rápida, precisa y puntual.”
  - Subtítulo: “Inspirado en los estándares americanos.”
  - CTA: botón a WhatsApp + botón a contacto.
  - Imagen: de limpieza real o stock premium.
- **Tarjetas de servicios** (resumen de los 3 principales con icono y texto corto):
  - Limpieza regular / profunda
  - Limpieza post-obra / mudanza
  - Oficinas
- **Bloque de beneficios (4 ítems con íconos):** rapidez, puntualidad, profesionalismo, atención personalizada.
- **Bloque PROMO Quilamapu** (con diseño del flyer):
  - Mensaje: “Vecinos de Quilamapu, 20% de descuento”.
  - CTA: botón WhatsApp con mensaje prellenado.
- **Mini bloque plan de oficinas**:
  - Título: “Tu oficina limpia y lista para rendir.”
  - Precios mensual / trimestral / anual.
  - CTA: “Contratar plan oficinas”.
- **Cobertura resumida:** “Atendemos en Ñuble y alrededores — Ver comunas”.
- **Mini FAQs (3 preguntas)**.
- **Footer resumen**: contacto, redes, enlaces legales.

---

### 2. Servicios$1

**Plan para Oficinas y Locales** (tomado del material gráfico):

- **Título del plan:** Plan de Aseo Profesional 1 vez por semana
- **Descripción:** 3 horas de limpieza profunda semanal. Incluye insumos el primer mes (escoba, cloro, jabón, pala).
- **Tabla de precios:**
  - 🗓️ Mensual: **$99.000 CLP**
  - 📅 Trimestral: **$89.000 CLP** por mes
  - ⏱️ Anual: **$80.000 CLP** por mes

- CTA: botón "Contratar plan oficinas" enlazado a WhatsApp con mensaje prellenado: 
  “Hola, me interesa el Plan de Aseo Profesional 1 vez por semana (3 hrs) — plan: mensual/trimestral/anual. plan=oficinas”

---
**Objetivo:** mostrar las zonas/comunas que Todo Clean atiende.

**Contiene:**
- Lista de comunas o mapa simple (opcional).
- Texto sobre recargos por distancia (si aplica).
- CTA: “¿Tu zona no aparece? Escríbenos”.

---

### 4. Quiénes somos
**Objetivo:** transmitir confianza a través de la misión, visión y filosofía.

**Contiene:**
- Misión: estilo americano, rapidez y puntualidad.
- Visión: ser reconocidos como los mejores en limpieza moderna.
- Imagen del equipo o proceso de limpieza.
- CTA final a contacto.

---

### 5. FAQs
**Objetivo:** resolver dudas frecuentes y evitar fricción en el contacto.

**Estructura:** lista desplegable (acordeón).

**Preguntas sugeridas:**
- ¿Qué incluye la limpieza profunda vs. regular?
- ¿Debo estar en casa durante la limpieza?
- ¿Llevan sus propios insumos?
- ¿Cómo reprogramo/cancelo?
- ¿Emiten boleta?

---

### 6. Contacto
**Objetivo:** canalizar leads por WhatsApp o formulario.

**Contiene:**
- Formulario:
  - Nombre (obligatorio)
  - Correo electrónico (obligatorio)
  - Teléfono (opcional)
  - Mensaje (obligatorio)
- Feedback visual: “enviando” / “mensaje enviado” / “error”.
- Información de contacto directa:
  - WhatsApp (botón)
  - Correo: todocleanchillan@gmail.com
  - Teléfono: +56 9 2617 6543
  - Instagram: @todo_cleanchillan

---

### 7. Footer (común)
- Logo pequeño
- Enlaces: Servicios / Cobertura / FAQs / Contacto / Legales
- Contacto: WhatsApp, correo, redes
- Texto legal mínimo: “© 2025 Todo Clean.”

---

## FUNCIONALIDADES CLAVE

- **Botón flotante de WhatsApp:** siempre visible. Mensaje prellenado personalizado según sección.
- **Formulario:** funcional en escritorio y móvil. Simple y directo.
- **CTA desde cada servicio:** enlaza directo a WhatsApp con texto personalizado.
- **Página responsive:** se adapta bien a celular y escritorio.

---

## CONTENIDO A ENTREGAR (CLIENTE / DISEÑO)
- Texto breve para cada servicio (lo adaptamos del flyer si no se entrega).
- Lista de comunas cubiertas.
- 8–10 FAQs escritas.
- Logo en SVG o PNG.
- Fotos propias (mínimo 6): equipo, limpieza, antes/después.
- Política de Privacidad (redactable en base a uso de formulario).

---

## CONSIDERACIONES TÉCNICAS (RESUMIDAS)
- Sitio estático con hosting moderno (Netlify/Vercel).
- Formulario con envío por email transaccional (SendGrid u otro).
- WhatsApp: enlaces con mensaje prellenado y tracking opcional.
- SEO base, sitemap.xml, responsive, accesibilidad mínima (AA).

---

**Fin de especificación etapa 1**.

