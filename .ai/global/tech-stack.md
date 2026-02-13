# Tech Stack Global — Stack Sagrado

## Filosofía
**Priorizar código ligero y performante.**  
Cada decisión técnica debe justificarse en términos de:
- ⚡ Performance (Core Web Vitals)
- 📦 Bundle size
- 🔧 Mantenibilidad

---

## Stack Principal

### Astro 5+ (Framework Base)
**Por qué:** Zero JavaScript por defecto, Islands Architecture, build times rápidos.

**Reglas:**
- Usar `.astro` para páginas y componentes estáticos
- Hidratar componentes React solo cuando sea necesario (`client:load`, `client:visible`)
- Aprovechar Static Site Generation (SSG) siempre que sea posible
- Optimizar imágenes con `astro:assets` (formato AVIF/WebP)

**Comandos clave:**
```bash
npm run dev       # Desarrollo local
npm run build     # Build optimizado
npm run preview   # Vista previa del build
```

---

### Tailwind CSS 4 (Estilos)
**Por qué:** Utility-first, sin CSS runtime, purge automático.

**Reglas:**
- NO crear archivos CSS custom salvo `global.css`
- Usar clases de Tailwind directamente en componentes
- Aprovechar `@apply` solo para patrones muy repetitivos
- Mantener `tailwind.config` minimalista
- Usar variantes responsive (`md:`, `lg:`) en vez de media queries manuales

**Patrones permitidos:**
```astro
<!-- ✅ Correcto -->
<div class="rounded-2xl overflow-hidden bg-neutral-900">

<!-- ❌ Incorrecto -->
<div class="custom-card"></div>
<style>.custom-card { border-radius: 16px; }</style>
```

---

### TypeScript (Tipado)
**Por qué:** Menos bugs, mejor DX, autocomplete en IDE.

**Reglas:**
- Usar tipado estricto (`strict: true` en `tsconfig.json`)
- Definir interfaces para props de componentes React
- Tipar datos de `src/data/*.json` explícitamente
- Evitar `any` — usar `unknown` si es necesario

**Ejemplo:**
```typescript
interface TattooItem {
  id: string;
  title: string;
  image: string;
  category: 'botanical' | 'animals' | 'fineline' | 'colour';
}
```

---

### React 19 (Interactividad)
**Por qué:** Componentes interactivos cuando Astro no es suficiente.

**Reglas:**
- Usar solo para componentes que requieren estado o eventos complejos
- Preferir React Server Components cuando Astro 5+ lo soporte
- Mantener componentes pequeños y composables
- Evitar efectos (`useEffect`) innecesarios

**Cuándo usar React vs Astro:**
```
Astro:  Header, Footer, Secciones estáticas, Galerías
React:  Filtros interactivos, Modales, Formularios complejos
```

---

### Framer Motion (Animaciones)
**Por qué:** Animaciones declarativas, tree-shakeable, performante.

**Reglas:**
- Usar solo para animaciones que mejoren UX (no decorativas)
- Preferir `layout` animations sobre `animate`
- Lazy load Framer Motion (`client:visible` en Astro)
- Respectar `prefers-reduced-motion`

**Ejemplo minimalista:**
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Contenido
</motion.div>
```

---

## Herramientas Auxiliares

### Astro I18next (Internacionalización)
- Archivos de traducción en `src/i18n/[lang].json`
- Rutas duplicadas en `src/pages/` y `src/pages/es/`
- Mantener keys de traducción consistentes

### Husky + Commitlint
- Validar commits con Conventional Commits
- Ejecutar linters pre-commit

---

## Decisiones de Performance

### Imágenes
- Formato: AVIF (primero), WebP (fallback), JPEG (último recurso)
- Herramienta: `astro:assets` con `<Image>` component
- Lazy loading por defecto (`loading="lazy"`)

### JavaScript
- Minimizar bundle client-side
- Code splitting por ruta (Astro lo hace automáticamente)
- Evitar librerías pesadas (moment.js ❌, date-fns ✅)

### Fonts
- Usar `font-display: swap`
- Subset de caracteres solo necesarios
- Considerar system fonts cuando sea apropiado

---

## Stack Prohibido

❌ **jQuery** — Usar vanilla JS o React  
❌ **Bootstrap** — Usamos Tailwind  
❌ **Sass/SCSS** — Tailwind + CSS variables es suficiente  
❌ **Lodash completo** — Usar funciones nativas de ES6+ o importar solo lo necesario  

---

## Comando de Referencia Rápida

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build + Preview
npm run build && npm run preview

# Linting (si está configurado)
npm run lint
```
