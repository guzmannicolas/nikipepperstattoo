# Project Brief — Niki Peppers Portfolio

## Información General

**Nombre del Proyecto:** Project Niki - Tattoo Portfolio
**Cliente/Artista:** Niki Peppers  
**Tipo de Proyecto:** Portfolio Visual / Sitio Web Personal  
**Estado:** En desarrollo activo  
**URL Producción:** [Pendiente]  
**Repositorio:** [Path actual]



---

## Objetivo Principal

Crear una **galería visual de alto impacto** con **carga ultra-rápida** que muestre el trabajo de Niki Peppers en 3 disciplinas:

1. **Tatuajes** (Trabajo principal)
2. **Cerámicas** (Trabajo artístico secundario)
3. **Obras fotográficas** (Proyectos especiales)

### KPIs de Éxito
- Lighthouse Score: **95+** en Performance
- LCP (Largest Contentful Paint): **< 2.5s**
- CLS (Cumulative Layout Shift): **< 0.1**
- Tasa de rebote: **< 40%**
- Tiempo promedio en galería: **> 2 minutos**

---

## Audiencia / Usuarios

### Perfil Primario
- **Potenciales clientes de tatuajes**
- Edad: 18-45 años
- Interés en arte corporal, diseño, cultura visual
- Dispositivo principal: **60% móvil**, 40% desktop

### Perfil Secundario
- Coleccionistas de arte / cerámica
- Galerías y espacios culturales
- Prensa y medios especializados

---

## Páginas Principales

```
/                   Home (Hero + Featured Work + About Preview)
/tattoos            Galería de tatuajes (filtrable por categoría)
/ceramics           Galería de cerámicas
/works              Obras fotográficas (proyectos especiales)
/biography          Sobre la artista
/faqs               Preguntas frecuentes
/contact            Formulario de contacto + redes sociales
/murals             [Futura] Murales y arte urbano

/es/*               Versiones en español (duplicadas)
```

---

## Stack Técnico (Referencia)

Ver detalles completos en `.ai/global/tech-stack.md`

**Core:**
- Astro 5 (SSG)
- Tailwind CSS 4
- TypeScript
- React 19 (solo componentes interactivos)

**Optimizaciones:**
- Imágenes en formato AVIF
- Lazy loading agresivo
- Code splitting por ruta
- Zero JavaScript en páginas estáticas

---

## Estructura de Datos

### Archivos JSON (Fuente de Verdad)

#### `src/data/tattoos.json`
```json
[
  {
    "id": "botanical-rose-01",
    "title": "Rosa Botánica",
    "category": "botanical",
    "image": "/images/tattoos/botanical/rose-01.avif",
    "date": "2025-01-15",
    "featured": true
  }
]
```

**Categorías:** `botanical`, `animals`, `fineline`, `colour`, `otros`

#### `src/data/ceramics.json`
```json
[
  {
    "id": "chrysanthemum-bowl",
    "title": "Chrysanthemum Bowl",
    "images": {
      "inside": "/assets/ceramics/Chrysanthemum bowl - Inside view.avif",
      "side": "/assets/ceramics/Chrysanthemum bowl - Side view.avif"
    },
    "description": "Pieza única inspirada en patrones florales japoneses",
    "year": 2024
  }
]
```

#### `src/data/works.json`
```json
[
  {
    "id": "echoes-from-the-deep",
    "title": "Echoes from the Deep",
    "description": "Serie fotográfica sobre memoria y trauma",
    "images": [
      "/assets/works/echoes_from_the_deep/the-origin.avif",
      "/assets/works/echoes_from_the_deep/mind-and-body.avif"
    ],
    "year": 2023
  }
]
```

---

## Internacionalización (i18n)

### Idiomas Soportados
- **Inglés** (default) — `/`
- **Español** — `/es/`

### Archivos de Traducción
- `src/i18n/en.json`
- `src/i18n/es.json`

### Reglas
- Mantener keys consistentes entre ambos archivos
- Usar `t()` helper para todas las cadenas de texto
- URLs deben reflejar el idioma (`/tattoos` vs `/es/tattoos`)

---

## Componentes Clave

### `src/components/Navigation.astro`
Header global con menú responsive

### `src/components/sections/HeroSection.astro`
Hero de la home con título animado y CTA

### `src/components/sections/FeaturedWork.astro`
Muestra trabajos destacados (marcados con `featured: true` en JSON)

### `src/components/Gallery.astro`
Grid de imágenes con lazy loading

### `src/components/ui/GalleryPlus.astro`
Galería con filtros por categoría

---

## Estilo Visual

Ver detalles completos en `.ai/global/ui-design.md`

### Características
- **Minimalismo**: Espacios en blanco generosos, tipografía clara
- **Geek Culture**: Detalles sutiles (monospace fonts, grid patterns)
- **Paleta**: Neutros (`neutral-50` a `neutral-900`) + azul de acento (`blue-500`)
- **Geometría**: `rounded-2xl` en tarjetas, `overflow-hidden` obligatorio

### Animaciones
- Hover en tarjetas: `hover:scale-105`
- Fade in al scroll: Framer Motion con `whileInView`
- Transiciones: Máximo 500ms de duración

---

## Limitaciones Técnicas

### Performance Budget
- JavaScript total: **< 100KB** (gzipped)
- Imágenes por página: Máximo 20 visibles inicialmente
- Tiempo de carga inicial: **< 3 segundos** en 3G

### Compatibilidad
- Navegadores modernos (últimas 2 versiones)
- No soporte para IE11
- Progressive enhancement para navegadores sin JavaScript

---

## Roadmap de Features

### ✅ Implementado
- [x] Estructura base del proyecto
- [x] Sistema de navegación bilingüe
- [x] Galerías de tatuajes y cerámicas
- [x] Sección About
- [x] Optimización de imágenes

### 🚧 En Progreso
- [ ] Formulario de contacto (integración con servicio externo)
- [ ] Filtros interactivos en galería de tatuajes
- [ ] Sistema de newsletter

### 📋 Futuro
- [ ] Blog/Diary de procesos creativos
- [ ] Tienda online (cerámicas)
- [ ] Galería de murales
- [ ] Login para clientes (ver diseños privados)

---

## Flujo de Trabajo Típico

### Agregar un Nuevo Tatuaje
1. Subir imagen a `public/images/tattoos/[categoria]/`
2. Optimizar a formato AVIF (Squoosh, Sharp, etc.)
3. Agregar entrada en `src/data/tattoos.json`
4. Commit: `feat(gallery): add new botanical tattoo`

### Actualizar Diseño de un Componente
1. Editar componente en `src/components/`
2. Verificar responsive design (`md:`, `lg:`)
3. Probar en `npm run dev`
4. Commit: `style(ui): improve card hover effect`

### Cambiar Textos (i18n)
1. Editar `src/i18n/en.json` y `src/i18n/es.json`
2. Verificar que keys coincidan
3. Commit: `docs(i18n): update hero section copy`

---

## Contacto y Recursos

### Redes Sociales de Niki Peppers
- Instagram: [@nikipepperstattoo]
- Email: [nikipepperstattoo@gmail.com]

### Referencias de Diseño (Inspiración)
- **Tattoo Artists:** 
  - Dr. Woo (minimalismo)
  - Pony Reinhardt (botanical)
- **Portfolios:**
  - Awwwards — Photography category
  - Sitios de estudios de tatuajes premium

---

## Notas Importantes para la IA

1. **Siempre consultar este brief** al inicio de cada sesión
2. **Priorizar performance** sobre efectos visuales complejos
3. **Mantener consistencia** con `.ai/global/ui-design.md`
4. **Commits semánticos** según `.ai/global/git-workflow.md`
5. **Mobile-first** en todos los diseños

---

**Última actualización:** 2026-02-13  
**Versión del brief:** 1.0
