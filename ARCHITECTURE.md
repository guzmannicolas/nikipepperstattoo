# Arquitectura Técnica — Niki Peppers Portfolio

> Documento de traspaso para replicar este entorno en un proyecto nuevo.  
> Generado: 2026-02-25 | Basado en el estado real del repositorio.

---

## 1. Tech Stack — Versiones Exactas

| Tecnología | Versión instalada | Rol |
|---|---|---|
| **Node.js** | 22.20.0 | Runtime |
| **npm** | 10.9.3 | Package manager |
| **Astro** | 5.16.0 | Framework (SSG) |
| **@astrojs/react** | 4.4.2 | Integración React → Astro Islands |
| **React** | 19.2.0 | Componentes interactivos (islands) |
| **React DOM** | 19.2.0 | Renderizado client-side |
| **Tailwind CSS** | 4.1.17 | Utility-first CSS |
| **@tailwindcss/vite** | 4.1.17 | Plugin Vite para Tailwind v4 |
| **Framer Motion** | 12.23.25 | Animaciones declarativas (React) |
| **PhotoSwipe** | 5.4.4 | Lightbox de imágenes |
| **TypeScript** | strict (via `astro/tsconfigs/strict`) | Tipado |
| **Husky** | 9.1.7 | Git hooks |
| **@commitlint/cli** | 19.8.1 | Validación de commits |
| **astro-i18next** | 1.0.0-beta.21 | Solo CLI/scaffolding (runtime es custom) |

### Configuración clave

```js
// astro.config.mjs
export default defineConfig({
  output: 'static',           // SSG puro, sin serverless functions
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false }  // EN = /, ES = /es/
  },
  vite: { plugins: [tailwindcss()] },        // Tailwind v4 via Vite plugin
  integrations: [react()],
});
```

```jsonc
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

---

## 2. Estructura de Carpetas

```
📁 raíz
├── AGENTS.md                    # Orquestación de roles para agentes AI
├── ARCHITECTURE.md              # Este documento
├── astro.config.mjs             # Config Astro
├── commitlint.config.cjs        # Conventional Commits
├── package.json
├── tsconfig.json
├── vercel.json                  # Build config para Vercel (static)
│
├── .ai/                         # Contexto para agentes AI
│   ├── global/
│   │   ├── tech-stack.md
│   │   ├── ui-design.md
│   │   └── git-workflow.md
│   └── project/
│       └── brief.md             # Fuente de verdad del proyecto
│
├── .github/
│   └── copilot-instructions.md  # Instrucciones para GitHub Copilot
│
├── .husky/
│   └── commit-msg               # Hook: commitlint
│
├── public/                      # Assets estáticos sin optimización
│   ├── images/
│   │   ├── home/                # Hero backgrounds
│   │   ├── tattoos/             # Fotos de tatuajes (ref. desde JSON)
│   │   └── ceramics/            # Fotos de cerámicas (ref. desde JSON)
│   └── videos/
│
└── src/
    ├── middleware.ts             # No-op (requerido por Astro, sin lógica)
    │
    ├── assets/                  # Imágenes procesadas por Astro (optimizadas)
    │   ├── ceramics/            # .avif — usados vía import estático
    │   ├── home/                # Foto artista
    │   ├── tattoos/             # Subcarpetas: animals/, botanical/, colour/, fineline/, otros/
    │   └── works/               # Subcarpetas por serie fotográfica
    │
    ├── components/
    │   ├── Navigation.astro     # Navbar flotante + language switcher
    │   ├── Footer.astro         # Footer global
    │   ├── animation/
    │   │   └── loading/
    │   │       └── LoadingSplash.astro
    │   ├── buttons/
    │   │   ├── FilterButtons.astro    # Botones de filtro por categoría
    │   │   └── LoadMore.astro         # Botón "cargar más"
    │   ├── calltoaction/
    │   │   ├── CTASection.astro       # Call-to-action genérico
    │   │   └── CrossPromo.astro       # Promoción cruzada entre secciones
    │   ├── sections/
    │   │   ├── HeroTitlePages.astro   # Hero reutilizable (páginas internas)
    │   │   ├── ceramics/
    │   │   │   └── AboutCeramicsSection.astro
    │   │   ├── faqs/
    │   │   │   └── FAQList.astro
    │   │   ├── index/                 # Secciones del Home
    │   │   │   ├── HeroSection.astro           → HeroSectionLogic.tsx
    │   │   │   ├── FeaturedWork.astro          → FeaturedWorkLogic.tsx
    │   │   │   ├── AboutArtistSection.astro    → AboutArtistSectionLogic.tsx
    │   │   │   ├── AboutPreviewSection.astro   → AboutPreviewSectionLogic.tsx
    │   │   │   ├── StylesSection.astro         → StylesSectionLogic.tsx
    │   │   │   └── NewsletterSection.astro     (solo Astro)
    │   │   └── works/
    │   │       └── AboutSeriesSection.astro
    │   └── ui/
    │       ├── Gallery.astro          # Grid genérico + PhotoSwipe + filtros
    │       └── GalleryPlus.astro      # Variante extendida
    │
    ├── data/                    # Fuente de contenido (JSON)
    │   ├── tattoos.json         # { items: [{ id, slug, title:{en,es}, images, category }] }
    │   ├── ceramics.json        # { items: [{ id, slug, title:{en,es}, images, category }] }
    │   └── works.json           # [{ id, title:{en,es}, series, image, year }]
    │
    ├── hooks/
    │   └── useBreakpoint.ts     # Hook React para responsive
    │
    ├── i18n/
    │   ├── en.json              # 398 líneas — keys idénticas a es.json
    │   ├── es.json              # 398 líneas
    │   └── utils.ts             # getLangFromUrl(), useTranslations(), languages
    │
    ├── layouts/
    │   └── Layout.astro         # Shell HTML + ViewTransitions + redirect script
    │
    ├── pages/                   # EN (default, sin prefijo)
    │   ├── index.astro
    │   ├── tattoos.astro
    │   ├── ceramics.astro
    │   ├── works.astro
    │   ├── murals.astro
    │   ├── biography.astro
    │   ├── faqs.astro
    │   ├── contact.astro
    │   └── es/                  # ES (prefijo /es/)
    │       ├── index.astro
    │       ├── tattoos.astro
    │       ├── ceramics.astro
    │       ├── works.astro
    │       ├── murals.astro
    │       ├── biography.astro
    │       ├── faqs.astro
    │       └── contact.astro
    │
    └── styles/
        └── global.css           # Tailwind v4 import + CSS variables + animaciones
```

### Convención de nombrado

| Tipo | Ejemplo | Regla |
|---|---|---|
| Página Astro | `tattoos.astro` | kebab-case, singular o plural según ruta |
| Componente Astro | `HeroTitlePages.astro` | PascalCase |
| Componente React | `HeroSectionLogic.tsx` | PascalCase + sufijo `Logic` |
| Datos JSON | `tattoos.json` | kebab-case plural |
| Assets | `blue-flower-tattoo-green-leaves-forearm.avif` | kebab-case descriptivo |

---

## 3. Lógica de Localización (i18n)

### Arquitectura general

```
┌─────────────────────────────────────────────────────┐
│  Usuario entra a nikipeppers.com/                   │
│                                                     │
│  Layout.astro <script is:inline>                    │
│  ├── Lee localStorage('preferred-language')         │
│  ├── Lee cookie('preferred-language')               │
│  ├── Detecta navigator.language                     │
│  └── Redirige a /es/ o se queda en / (EN)           │
│                                                     │
│  Navigation.astro (language switcher)               │
│  └── onclick: guarda en localStorage + cookie       │
│                                                     │
│  Cada página usa:                                   │
│  const lang = getLangFromUrl(Astro.url);             │
│  const t = useTranslations(lang);                   │
│  → t('nav.tattoos') resuelve del JSON correcto      │
└─────────────────────────────────────────────────────┘
```

### Rutas

- **Inglés** (default): `/`, `/tattoos`, `/works`, `/ceramics`, etc.
- **Español**: `/es/`, `/es/tattoos`, `/es/works`, `/es/ceramics`, etc.
- `prefixDefaultLocale: false` → inglés no lleva prefijo.
- Las páginas en español son archivos duplicados en `src/pages/es/`.

### Detección de idioma (solo en ruta `/`)

```js
// Layout.astro — <script is:inline>
(function() {
  if (window.location.pathname !== '/') return;

  // 1. localStorage (seteado por language switcher)
  var saved = localStorage.getItem('preferred-language');

  // 2. Cookie (seteado por language switcher)
  if (!saved) {
    var match = document.cookie.match(/preferred-language=([^;]+)/);
    if (match) saved = match[1];
  }

  // 3. Browser language
  if (!saved) {
    var browserLang = (navigator.language || '').toLowerCase();
    saved = browserLang.startsWith('es') ? 'es' : 'en';
  }

  // Guarda en ambos stores y redirige
  localStorage.setItem('preferred-language', saved);
  document.cookie = 'preferred-language=' + saved + '; path=/; max-age=31536000';

  if (saved === 'es') window.location.replace('/es/');
  // Si 'en', se queda en / (ya es la home en inglés)
})();
```

### Función `t()` — resolución de traducciones

```ts
// src/i18n/utils.ts
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];
    for (const k of keys) { value = value?.[k]; }
    return value || key;  // Fallback: devuelve la key como string
  }
}
```

### Datos bilingües en JSON

```json
// tattoos.json / ceramics.json
"title": { "en": "Chrysanthemum Bowl", "es": "Bowl Crisantemo" }
```

Se accede con `item.title[lang]` directamente en los componentes.

### Language switcher (Navigation.astro)

```astro
<a
  href={l === "en" ? currentPath : `/${l}${currentPath}`}
  onclick={`localStorage.setItem('preferred-language','${l}');
            document.cookie = 'preferred-language=${l}; path=/; max-age=31536000'`}
>
  {l.toUpperCase()}
</a>
```

**Importante:** el middleware `src/middleware.ts` es un passthrough (no-op). Toda la lógica de idioma es client-side.

---

## 4. Workflow de Despliegue

### Plataforma: Vercel (Static)

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Flujo Git → Deploy

```
                    ┌──────────────┐
                    │   Desarrollo │
                    │   (local)    │
                    └──────┬───────┘
                           │
                    git push origin dev
                           │
                    ┌──────▼───────┐
                    │   dev branch │──── Vercel Preview Deploy (automático)
                    └──────┬───────┘     URL: nikipepperstattoo-git-dev-*.vercel.app
                           │
              git checkout main
              git rebase dev
              git push origin main
                           │
                    ┌──────▼───────┐
                    │  main branch │──── Vercel Production Deploy (automático)
                    └──────────────┘     URL: nikipeppers.com
```

### Branches

| Branch | Entorno | Deploy |
|---|---|---|
| `dev` | Preview | Automático al push |
| `main` | Production | Automático al push |

### Deploy manual (forzar cache limpia)

```bash
npx vercel deploy --prod --force
```

### Commits (Conventional Commits)

```
feat(gallery): add lazy loading to tattoo images
fix(i18n): client-side language redirect respects user preference
chore(deps): update Astro to v5.16.0
style(ui): improve card hover effect
refactor(components): split HeroSection into smaller components
docs(ai): update brief with CrossPromo improvements
```

Forzado por Husky hook `commit-msg` → commitlint con `@commitlint/config-conventional`.

### Lecciones aprendidas (deploy)

1. **NO usar `@astrojs/vercel` con `output: 'static'`**. Vercel auto-detecta el paquete y crea serverless functions, causando error 500 (`Cannot find module dist/server/entry.mjs`).
2. **Siempre forzar rebuild** (`--force`) después de cambiar entre server/static, porque Vercel cachea el build anterior.
3. El `middleware.ts` debe ser no-op en modo estático. Cualquier lógica de redirect va en `vercel.json` (server-side) o en `<script is:inline>` (client-side).

---

## 5. Patrones de Componentes

### Patrón "Astro Wrapper → React Island"

```
┌─ HeroSection.astro ─────────────────────┐
│  const lang = Astro.props.lang;          │
│  const t = Astro.props.t;                │
│  const title = t('home.title');          │
│  import heroImg from '…/file.avif';      │
│                                          │
│  <HeroSectionLogic                       │
│    client:load                           │
│    title={title}                         │
│    heroSrc={heroImg.src}                 │
│  />                                      │
└──────────────────────────────────────────┘
         │
         ▼
┌─ HeroSectionLogic.tsx ──────────────────┐
│  Recibe solo strings/primitivos          │
│  Usa Framer Motion para animaciones      │
│  NO importa imágenes (recibe URLs)       │
│  NO accede a i18n (recibe textos)        │
└──────────────────────────────────────────┘
```

**Regla:** los `.tsx` nunca importan imágenes ni acceden a `t()`. Todo se resuelve en el wrapper `.astro`.

### Directivas de hidratación usadas

| Directiva | Uso | Componente ejemplo |
|---|---|---|
| `client:load` | Se necesita inmediatamente (hero, featured) | `HeroSectionLogic`, `FeaturedWorkLogic` |
| `client:visible` | Se carga al hacer scroll | `AboutPreviewSectionLogic`, `AboutArtistSectionLogic` |

### Gallery — Componente genérico reutilizable

```astro
<Gallery
  items={filteredItems}
  id="tattoo-gallery"
  showInitialCount={6}
  loadMoreLabel={t('tattoos.loadMore')}
>
  <FilterButtons slot="filters" ... />
</Gallery>
```

- Grid responsive: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- PhotoSwipe lightbox inicializado en `<script>` con `astro:page-load`
- Slot `filters` para inyectar botones de filtro personalizados
- Load more con JS vanilla (toggle de clase `hidden`)

---

## 6. Manejo de Imágenes

### Tres estrategias coexistentes

| Estrategia | Ubicación origen | Optimización | Uso |
|---|---|---|---|
| **`import { Image } from 'astro:assets'`** | `src/assets/` | Sí (build time, AVIF/WebP) | Footer logo, splash, about |
| **Import estático + `.src`** | `src/assets/` | Sí (resuelto por Vite) | Props a React islands |
| **`import.meta.glob` (eager)** | `src/assets/works/` | Sí | Galería de obras (paths desde JSON) |
| **Public directory** | `public/images/` | No | Tattoos, ceramics (paths en JSON) |

### Formatos

- **AVIF**: formato principal en `src/assets/`
- **JPEG/JPG**: tattoos en `public/images/`
- **WebP**: generado por Astro en build para assets importados
- **PNG**: solo logo y assets estáticos de UI

---

## 7. Mejoras Pendientes

### TypeScript

| Problema | Dónde | Solución propuesta |
|---|---|---|
| `useTranslations` retorna `any` | `src/i18n/utils.ts` | Tipar el retorno con un tipo recursivo basado en las keys del JSON |
| Props de React como `string` genérico | `*Logic.tsx` | Definir interfaces explícitas: `interface HeroProps { title: string; ctaPrimary: string; ... }` |
| `works.json` tiene schema diferente | `src/data/works.json` | Unificar a `{ items: [...] }` como tattoos y ceramics |
| No hay tipos compartidos para data items | `src/data/` | Crear `src/types/data.ts` con `TattooItem`, `CeramicItem`, `WorkItem` |

### Imágenes

| Problema | Impacto | Solución propuesta |
|---|---|---|
| Tattoos en `public/images/` sin optimización | LCP alto, bandwidth | Mover a `src/assets/tattoos/` y usar `astro:assets` con `<Image>` |
| Ceramics en `public/images/` sin optimización | Igual | Mover a `src/assets/ceramics/` |
| No hay `sizes` attribute en `<img>` | Descargas innecesarias en mobile | Agregar `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` |
| No hay placeholder/blur-up | CLS durante carga | Usar `placeholder="blur"` de Astro Image o generar LQIP |

### Localización

| Problema | Impacto | Solución propuesta |
|---|---|---|
| Páginas duplicadas manualmente (`pages/` y `pages/es/`) | Mantenimiento costoso | Migrar a ruta dinámica `pages/[lang]/[...slug].astro` o usar `getStaticPaths` |
| `astro-i18next` instalado pero no usado en runtime | Bundle innecesario | Remover de devDependencies o migrar `utils.ts` a usarlo |
| Sin fallback de traducción a idioma por defecto | Keys faltantes muestran la key | Implementar fallback chain: `es → en → key` |
| Flash visible al redirigir en `/` | UX | Considerar un splash o skeleton durante la detección |

### Estilos

| Problema | Dónde | Solución propuesta |
|---|---|---|
| CSS custom en `global.css` para marquee, scrollbar | `src/styles/global.css` | Evaluar si se puede lograr con utilidades Tailwind v4 |
| `filter: invert(1)` hardcodeado para logos | `global.css` | Usar variantes Tailwind: `class="invert"` |
| Navbar scroll/hide usa JS imperativo | `Navigation.astro` | Evaluar `IntersectionObserver` o CSS `scroll-timeline` |

### Performance

| Problema | Impacto | Solución propuesta |
|---|---|---|
| `client:load` en HeroSection (186KB React bundle) | FCP | Evaluar si el hero puede ser solo CSS/Astro con `transition:animate` |
| PhotoSwipe se importa en toda Gallery | Bundle per-page | Lazy import solo al primer click en imagen |
| No hay `<link rel="preload">` para hero images | LCP | Agregar preload en Layout para la imagen hero |
| Framer Motion es pesado (~37KB gzip) | Total JS | Evaluar `motion` (lite) si Framer Motion lo soporta, o CSS animations para entradas simples |

### Arquitectura

| Problema | Impacto | Solución propuesta |
|---|---|---|
| No hay testing | Regresiones | Agregar Playwright para E2E y/o Vitest para unit |
| No hay lint (ESLint/Biome) pre-commit | Calidad | Agregar Biome + lint-staged en hook pre-commit |
| `middleware.ts` es no-op | Confusión | Eliminar o documentar claramente que es placeholder |
| No hay sitemap ni robots.txt | SEO | Agregar `@astrojs/sitemap` integration |
| No hay Open Graph / meta tags dinámicos | Compartir en redes | Extender Layout props con `og:image`, `og:title` |

---

## 8. Comandos de Referencia

```bash
# Desarrollo
npm run dev              # Servidor local con HMR

# Build
npm run build            # Build estático → dist/
npm run preview          # Preview del build local

# Deploy
npx vercel deploy --prod --force   # Deploy manual forzando cache limpia

# Git
git push origin dev      # → Preview deploy
git checkout main && git rebase dev && git push origin main  # → Production
```

---

## 9. Checklist para Replicar el Entorno

```bash
# 1. Crear proyecto
npm create astro@latest nuevo-proyecto -- --template minimal

# 2. Instalar dependencias exactas
npm install astro@5.16.0 @astrojs/react@4.4.2 react@19.2.0 react-dom@19.2.0
npm install tailwindcss@4.1.17 @tailwindcss/vite@4.1.17
npm install framer-motion@12.23.25 photoswipe@5.4.4
npm install -D husky@9.1.7 @commitlint/cli@19.8.1 @commitlint/config-conventional@19.4.0

# 3. Configurar
# - Copiar astro.config.mjs (output: static, i18n, react, tailwind vite plugin)
# - Copiar tsconfig.json (strict + react-jsx)
# - Copiar commitlint.config.cjs
# - Copiar vercel.json (buildCommand + outputDirectory)
# - npx husky init && echo 'npx commitlint --edit "$1"' > .husky/commit-msg

# 4. Estructura
# - Crear src/i18n/{en,es}.json + utils.ts
# - Crear src/layouts/Layout.astro con ViewTransitions + redirect script
# - Crear src/pages/ + src/pages/es/ (duplicados por idioma)
# - Crear src/data/ con JSONs de contenido
# - Crear src/styles/global.css con @import "tailwindcss"

# 5. Vincular a Vercel
npx vercel link
npx vercel deploy --prod
```

---

*Última actualización: 2026-02-25*
