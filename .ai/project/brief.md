# Project Brief — Niki Peppers Portfolio

## Información General

**Nombre del Proyecto:** Project Niki - Tattoo Portfolio
**Cliente/Artista:** Niki Peppers  
**Tipo de Proyecto:** Portfolio Visual / Sitio Web Personal  
**Estado:** En desarrollo activo  
**URL Producción:** nikipeppers.com (Vercel)  
**Repositorio:** c:\xampp\htdocs\nikipepperstattoo

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
/murals             Murales y arte urbano

/es/*               Versiones en español (duplicadas)
```

---

## Stack Técnico (Referencia)

Ver detalles completos en `.ai/global/tech-stack.md`

**Core:**
- Astro 5 (SSG, output: static)
- Tailwind CSS 4
- TypeScript
- React 19 (solo componentes interactivos — islands)

**Optimizaciones:**
- Imágenes procesadas por Astro en build (WebP/AVIF)
- Assets en `src/assets/` → optimizados; `public/` → sin optimización
- Lazy loading agresivo
- Code splitting por ruta

---

## Estructura de Datos

### Archivos JSON (Fuente de Verdad)

#### `src/data/tattoos.json`
```json
{
  "items": [
    {
      "id": 1,
      "slug": "koi-fish-with-water-lilies",
      "title": { "en": "Koi Fish with Water Lilies", "es": "Pez Koi con Nenúfares" },
      "description": "",
      "price": "",
      "images": [
        {
          "filename": "Koi Fish with Water Lilies",
          "path": "/src/assets/tattoos/koi-fish-tattoo-lily-pads-water-lilies.jpeg",
          "alt": "Koi Fish with Water Lilies"
        }
      ],
      "category": "animals, colour",
      "category_es": "animales, color"
    }
  ]
}
```
**Categorías disponibles:** `botanical`, `animals`, `fineline`, `colour`, `otros`  
**Nota:** una imagen puede tener múltiples categorías (comma-separated). Las imágenes viven en `src/assets/tattoos/` (estructura flat, sin subcarpetas).

#### `src/data/ceramics.json`
```json
{
  "items": [
    {
      "id": 1,
      "slug": "mateta-pisces",
      "title": { "en": "\"Mateta\" Pisces", "es": "\"Mateta\" Piscis" },
      "description": "Gray clay. 10 cm.",
      "price": "USD40",
      "images": [
        {
          "filename": "Mateta Pisces - Back",
          "path": "/src/assets/ceramics/Mateta Pisces - Back.avif",
          "alt": "Mateta Pisces - Back"
        }
      ],
      "category": "decorative",
      "category_es": "decorativo"
    }
  ]
}
```
**Categorías:** `functional`, `decorative`, `sculptural`  
**Imágenes en:** `src/assets/ceramics/` — acepta `.avif`, `.jpg`, `.jpeg`, `.png`

#### `src/data/works.json`
```json
[
  {
    "id": "river-rose-or-lily",
    "title": { "en": "River Rose or Lily", "es": "Rosa de Río o Lirio" },
    "series": "echoes",
    "technique": "Mixed technique",
    "technique_es": "Técnica mixta",
    "dimensions": "21x29,7cm",
    "year": 2024,
    "image": "/src/assets/works/echoes_from_the_deep/river-rose-or-lily.avif",
    "price": "USD 150"
  }
]
```
**Nota:** array raíz (sin wrapper `items`). Series: `echoes`, `childhood`, `amid_gestures`, `on_demand`.  
**Imágenes en:** `src/assets/works/{serie}/`

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
- La detección de idioma es **client-side** en `Layout.astro` (localStorage → cookie → navigator.language)

---

## Componentes Clave

### `src/components/Navigation.astro`
Header global con menú responsive + language switcher. Guarda preferencia en localStorage y cookie.

### `src/components/Footer.astro`
Footer global con CTA banner, links, redes sociales reales (IG: nikipepperstattoo, FB: niki.teper), email, ubicación.

### `src/components/sections/index/`
Secciones del Home: Hero, FeaturedWork, AboutArtist, AboutPreview, StylesSection (carousel mobile).

### `src/components/ui/Gallery.astro`
Grid de imágenes con PhotoSwipe lightbox, filtros por categoría, load more.

### `src/components/ui/GalleryPlus.astro`
Variante de Gallery con campos extra (technique, dimensions, year) — usada en Works.

---

## Estilo Visual

Ver detalles completos en `.ai/global/ui-design.md`

### Características
- **Minimalismo**: Espacios en blanco generosos, tipografía clara
- **Paleta**: Neutros (`neutral-50` a `neutral-950`) + **verde de acento** (`green-500` / `--color-accent`)
- **Tipografía**: Serif para títulos y marca, sans-serif para cuerpo
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

---

## Roadmap de Features

### ✅ Implementado
- [x] Estructura base del proyecto
- [x] Sistema de navegación bilingüe con detección client-side
- [x] Galerías de tatuajes, cerámicas y obras con filtros interactivos
- [x] Galería de murales
- [x] PhotoSwipe lightbox en todas las galerías
- [x] Sección About (artista + preview)
- [x] Footer premium con redes sociales reales y CTA
- [x] Imágenes optimizadas via `import.meta.glob` + Astro assets
- [x] Script `tools/add-images.mjs` para agregar imágenes nuevas sin tocar código
- [x] CrossPromo component con selección aleatoria de secciones
- [x] Carousel infinito mobile en StylesSection

### 📋 Futuro
- [ ] Formulario de contacto (integración con servicio externo)
- [ ] Sistema de newsletter
- [ ] Blog/Diary de procesos creativos
- [ ] Tienda online (cerámicas)
- [ ] Login para clientes (ver diseños privados)

---

## Flujo de Trabajo — Agregar Imágenes Nuevas

```
1. Copiar fotos a la carpeta correcta:
     src/assets/tattoos/          ← tattoos (jpg/jpeg/png/avif)
     src/assets/ceramics/         ← cerámicas (jpg/jpeg/png/avif)
     src/assets/works/{serie}/    ← obras

2. Correr: node tools/add-images.mjs
   → Detecta archivos nuevos, genera entradas JSON, pide confirmación

3. Editar el JSON para completar:
     tattoos  → category, category_es, title.es
     ceramics → description, price, title.es, category
     works    → title.es, technique_es, dimensions, year, price

4. npm run build  →  verificar

5. git add . && git commit -m "feat(content): agregar nuevas fotos"
   git push origin dev
```

---

## Contacto y Recursos

### Redes Sociales de Niki Peppers
- Instagram: [@nikipepperstattoo](https://instagram.com/nikipepperstattoo)
- Facebook: [niki.teper](https://facebook.com/niki.teper)
- Email: nikipepperstattoo@gmail.com

---

## Notas Importantes para la IA

1. **Siempre consultar este brief** al inicio de cada sesión
2. **Priorizar performance** sobre efectos visuales complejos
3. **Mantener consistencia** con `.ai/global/ui-design.md`
4. **Commits semánticos** según `.ai/global/git-workflow.md`
5. **Mobile-first** en todos los diseños
6. El color de acento es **green-500**, no blue

---

**Última actualización:** 2026-02-25  
**Versión del brief:** 2.0
