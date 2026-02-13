# UI Design System — Guía de Estilos Global

## Filosofía de Diseño
**Minimalista · Geek Culture · Performance-first**

Inspiración: Portfolios modernos, Dribbble top shots, pero con carga ultra-rápida.

---

## Paleta de Colores

### Colores Neutrales (Base)
```css
--neutral-50:  #fafafa  /* Fondos claros */
--neutral-100: #f5f5f5  /* Fondos secundarios */
--neutral-200: #e5e5e5  /* Bordes sutiles */
--neutral-300: #d4d4d4  /* Bordes */
--neutral-400: #a3a3a3  /* Textos secundarios */
--neutral-500: #737373  /* Textos terciarios */
--neutral-600: #525252  /* Textos */
--neutral-700: #404040  /* Textos importantes */
--neutral-800: #262626  /* Fondos oscuros */
--neutral-900: #171717  /* Fondos muy oscuros */
```

### Colores de Acento (Uso Moderado)
```css
--accent-primary: #3b82f6    /* Azul (CTAs, links) */
--accent-success: #10b981    /* Verde (confirmaciones) */
--accent-warning: #f59e0b    /* Amarillo (advertencias) */
--accent-error:   #ef4444    /* Rojo (errores) */
```

**Regla:** Máximo 2 colores de acento por página. El foco debe estar en el contenido (tatuajes, cerámicas, obras).

---

## Tipografía

### Escala de Tamaños (Tailwind)
```
text-xs:   0.75rem   (12px)  // Pequeños detalles
text-sm:   0.875rem  (14px)  // Textos secundarios
text-base: 1rem      (16px)  // Cuerpo de texto
text-lg:   1.125rem  (18px)  // Destacados
text-xl:   1.25rem   (20px)  // Subtítulos
text-2xl:  1.5rem    (24px)  // Títulos H3
text-3xl:  1.875rem  (30px)  // Títulos H2
text-4xl:  2.25rem   (36px)  // Títulos H1
text-5xl:  3rem      (48px)  // Hero titles
```

### Pesos
```
font-light:     300  // Textos largos
font-normal:    400  // Default
font-medium:    500  // Botones, labels
font-semibold:  600  // Títulos
font-bold:      700  // Énfasis fuerte
```

**Regla:** Limitar a 2-3 pesos por página.

---

## Espaciado y Layout

### Sistema de Espaciado (Tailwind)
```
p-2:  0.5rem   (8px)
p-4:  1rem     (16px)   // Espaciado estándar
p-6:  1.5rem   (24px)
p-8:  2rem     (32px)   // Secciones
p-12: 3rem     (48px)
p-16: 4rem     (64px)   // Márgenes grandes
```

### Grid y Flex
```astro
<!-- Grid de Galerías -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Flex para componentes inline -->
<div class="flex items-center gap-4">
```

---

## Componentes Visuales

### Tarjetas (Cards)
Patrón estándar:
```astro
<div class="rounded-2xl overflow-hidden bg-neutral-900 hover:scale-105 transition-transform">
  <img src="..." alt="..." class="w-full h-64 object-cover" />
  <div class="p-6">
    <h3 class="text-xl font-semibold">Título</h3>
    <p class="text-neutral-400 text-sm">Descripción</p>
  </div>
</div>
```

**Reglas:**
- Siempre `rounded-2xl` en tarjetas
- Siempre `overflow-hidden` para que imágenes respeten border-radius
- Hover sutil (`hover:scale-105` o `hover:shadow-lg`)

---

### Botones

#### Primario (CTA)
```astro
<button class="px-6 py-3 bg-accent-primary text-white rounded-full font-medium hover:bg-blue-600 transition-colors">
  Ver Portafolio
</button>
```

#### Secundario
```astro
<button class="px-6 py-3 border border-neutral-300 rounded-full font-medium hover:bg-neutral-100 transition-colors">
  Cancelar
</button>
```

#### Ghost
```astro
<button class="px-4 py-2 text-neutral-700 hover:text-neutral-900 transition-colors">
  Más Info
</button>
```

**Regla:** Máximo 1 botón primario visible por sección.

---

### Animaciones y Transiciones

#### Transiciones Básicas
```css
transition-colors   // Hover en botones/links
transition-transform // Hover en tarjetas
transition-opacity  // Fade in/out
```

#### Framer Motion (Componentes Complejos)
```tsx
// Fade in al scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

**Reglas:**
- Duración máxima: 500ms (evitar animaciones lentas)
- Respetar `prefers-reduced-motion`
- No animar más de 3 elementos simultáneamente

---

## Imágenes y Media

### Aspect Ratios Estándar
```
aspect-square    // 1:1 (thumbnails de galería)
aspect-video     // 16:9 (videos, banners)
aspect-[4/3]     // 4:3 (fotos de trabajos)
```

### Optimización
```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/photo.avif';
---

<Image
  src={myImage}
  alt="Descripción"
  width={800}
  height={600}
  loading="lazy"
  class="rounded-2xl"
/>
```

---

## Responsividad

### Breakpoints (Tailwind)
```
sm:  640px   // Móviles grandes
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops
2xl: 1536px  // Pantallas grandes
```

### Mobile-First
```astro
<!-- ✅ Correcto: Mobile primero, desktop después -->
<div class="text-2xl md:text-4xl lg:text-5xl">

<!-- ❌ Incorrecto: Desktop primero -->
<div class="text-5xl md:text-2xl">
```

---

## Geek Culture — Detalles Especiales

### Easter Eggs Sutiles
- Cursor custom en hover de elementos importantes
- Glitch effect en títulos principales (CSS o SVG)
- Código Morse en footers (solo visual, no funcional)

### Referencias Permitidas
- Pixelart mínimo en loaders
- Monospace fonts en secciones técnicas
- Grid patterns en fondos (muy sutiles, opacidad baja)

**Regla:** Estos detalles NO deben afectar performance ni accesibilidad.

---

## Accesibilidad (A11y)

### Checklist Obligatorio
- [ ] Contraste mínimo 4.5:1 para texto normal
- [ ] Contraste mínimo 3:1 para texto grande
- [ ] Focus visible en elementos interactivos
- [ ] Alt text descriptivo en todas las imágenes
- [ ] Landmarks semánticos (`<header>`, `<nav>`, `<main>`, `<footer>`)

### Focus States
```astro
<a class="focus:ring-2 focus:ring-accent-primary focus:outline-none">
  Link
</a>
```

---

## Ejemplo de Sección Completa

```astro
<section class="py-16 px-4 md:px-8 bg-neutral-50">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      Featured Works
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {works.map(work => (
        <div class="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
          <img
            src={work.image}
            alt={work.title}
            class="w-full h-64 object-cover"
            loading="lazy"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{work.title}</h3>
            <p class="text-neutral-600 text-sm">{work.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Recursos de Inspiración

- **Awwwards** — Diseños ganadores (adapt para performance)
- **Dribbble** — UI patterns modernos
- **Codrops** — Efectos CSS experimentales (usar con moderación)
- **Refactoring UI** — Libro de referencia para decisiones de diseño

**Recordatorio:** Inspirarse, no copiar. Adaptar siempre a nuestro stack y performance budget.
