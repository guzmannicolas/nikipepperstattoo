# Niki Peppers Tattoo - Sitio Web

Sitio web profesional para una artista del tatuaje, construido con tecnologías modernas.

## 🚀 Stack Tecnológico

- **Astro** - Framework web ultrarrápido para sitios de contenido
- **Tailwind CSS** - Framework de CSS utility-first
- **TypeScript** - JavaScript con tipos para mejor desarrollo
- **React** - Para componentes interactivos cuando sea necesario

## 📁 Estructura del Proyecto

```
/
├── public/             # Archivos estáticos (imágenes, favicon, etc.)
├── src/
│   ├── layouts/
│   │   └── Layout.astro    # Layout principal con navegación y footer
│   ├── pages/
│   │   ├── index.astro     # Página de inicio
│   │   ├── galeria.astro   # Galería de trabajos
│   │   ├── sobre-mi.astro  # Información sobre la artista
│   │   └── contacto.astro  # Formulario de contacto
│   └── styles/
│       └── global.css      # Estilos globales y configuración de Tailwind
├── astro.config.mjs    # Configuración de Astro
├── package.json
└── tsconfig.json
```

## 🧞 Comandos Disponibles

| Comando                | Acción                                         |
| :--------------------- | :--------------------------------------------- |
| `npm install`          | Instala las dependencias                       |
| `npm run dev`          | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`        | Construye el sitio para producción en `./dist/` |
| `npm run preview`      | Vista previa del build de producción localmente |

# Niki Peppers Tattoo — Proyecto web

Este repositorio contiene el sitio web profesional de Niki Peppers (artista del tatuaje). A continuación encontrarás el contexto del proyecto, la estructura actualizada, las decisiones técnicas, cómo ejecutar el proyecto y notas detalladas sobre cambios recientes y puntos de atención.

---

## Resumen (rápido)

- Framework: Astro 5
- Estilos: Tailwind CSS
- Tipado: TypeScript
- UI reusables: React (integrado con `@astrojs/react` cuando hace falta)
- Lightbox: PhotoSwipe (local, paquete `photoswipe`)
- i18n: archivos de traducción en `src/i18n` y generación opcional con `astro-i18next` CLI

---

## Estructura principal (actualizada)

```
/
├── astro.config.mjs
├── package.json
├── package-lock.json
├── README.md
├── public/                    # Recursos públicos (favicon, archivos estáticos)
├── src/
│   ├── assets/                # Imágenes importadas y procesadas por Astro
│   ├── components/
│   │   ├── buttons/
│   │   │   ├── FilterButtons.astro
│   │   │   └── LoadMore.astro
│   │   ├── calltoaction/
│   │   │   └── CTASection.astro
│   │   ├── ui/
│   │   │   └── Gallery.astro
│   │   └── ...
│   ├── data/                   # JSON con metadatos de galerías (tattoos.json, ceramics.json)
│   ├── i18n/                   # `en.json`, `es.json` y helper `utils.ts`
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/                  # Páginas (incluye carpetas por idioma, p. ej. `es/`)
└──
```

---

## Comandos (desarrollo)

- Instalar dependencias:

```powershell
npm install
```

- Levantar servidor de desarrollo:

```powershell
npm run dev
```

- Build para producción:

```powershell
npm run build
```

- Preview del build:

```powershell
npm run preview
```

---

## Puntos técnicos importantes — Contexto y cambios recientes

Este proyecto ha sido refactorizado para usar galerías basadas en datos (JSON) y componentes reutilizables. Aquí detallo lo más importante:

- Data-driven galleries:
   - `src/data/ceramics.json` y `src/data/tattoos.json` contienen metadatos por ítem (ruta, alt, categorías, etc.).
   - Las páginas (`src/pages/tattoos.astro`, `src/pages/ceramics.astro`) importan los JSON y un `assetMap` para resolver imports desde `src/assets` (para que Astro los procese y optimice).

- Componentes clave:
   - `src/components/ui/Gallery.astro`: componente genérico que renderiza la grid, provee el lightbox (PhotoSwipe) y hook para filtros + load-more.
   - `src/components/buttons/FilterButtons.astro`: componente que renderiza botones de filtro por página; recibe `buttons` prop para permitir reutilización entre páginas.
   - `src/components/buttons/LoadMore.astro`: botón y lógica para revelar más elementos.

- Lightbox:
   - Se usa `photoswipe` como dependencia local; el componente inicializa `photoswipe/lightbox` y `photoswipe` para la funcionalidad de modal.

- i18n y traducciones:
   - Las traducciones están en `src/i18n/en.json` y `src/i18n/es.json`.
   - Se agregó un archivo de configuración mínimo `astro-i18next.config.cjs` para poder usar `npx astro-i18next generate` si deseas generar páginas estáticas por idioma.
   - Nota: `astro-i18next` no estaba listado inicialmente en `package.json`. Puedes instalarlo como devDependency para uso continuo:

```powershell
npm install -D astro-i18next
```

- Cambios de depuración y correcciones aplicadas:
   - Eliminé llamadas globales a `changeLanguage(...)` importadas desde `i18next` en los archivos de página: usaremos `getLangFromUrl` y `useTranslations` (locales en `src/i18n`) en lugar de invocar la API de `i18next` directamente desde las páginas. Esto evitó errores de `i18next` no inicializado.
   - `FilterButtons.astro`: ahora renderiza `<button type="button">` con atributo `data-value` y `aria-pressed`; acepta `active` en los datos para marcar el estado inicial.
   - `Gallery.astro`: añadí un fallback para localizar su `root` cuando `document.currentScript` es `null` (scripts de módulo pueden ejecutarse de forma asíncrona), y normalicé el matching de categorías a minúsculas para que los filtros funcionen sin sensibilidad a mayúsculas. Esto asegura que el listener de filtros se adjunte incluso cuando el script se ejecuta fuera de contexto.

---

## Cómo funcionan los filtros (uso del componente reutilizable)

- `FilterButtons.astro` recibe un array `buttons` con objetos: `{ label, value, active? }`. Ejemplo:

```js
const buttons = [
   { label: 'All', value: 'all', active: true },
   { label: 'Botanical', value: 'botanical' },
   { label: 'Animals', value: 'animals' }
];
```

- Cada página pasa sus botones personalizados al slot `filters` o permite que `Gallery.astro` genere los botones por defecto a partir de las categorías encontradas en `items`.

- Reutilización: cada página define sus botones según su dominio (por ejemplo, `ceramics` puede usar `Functional`, `Decorative`, etc.).

---

## Cómo probar (manual)

1. Instala dependencias: `npm install`.
2. Levanta el server de desarrollo: `npm run dev`.
3. Abre el navegador en `http://localhost:4321`.
4. Navega a `/tattoos` o `/ceramics` y en la galería prueba los botones de filtro.

Si un filtro no actúa al hacer click:

- Abre DevTools → Console y busca errores.
- Revisa que el botón tiene `data-value="..."` y que el contenedor `section.gallery-component` tiene el mismo `id` que el valor usado por el script. (El `Gallery` crea `id` por prop `id` o `gallery`).
- Comprueba que los elementos `.gallery-item` tienen `data-categories` con valores separados por coma. Ejemplo: `data-categories="botanical,animals"`.
- Si necesitas trazas, agrega un `console.log` dentro del listener en `src/components/ui/Gallery.astro` para ver clicks y valores.

---

## Notas sobre `astro-i18next` y generación de páginas i18n

- Se añadió un archivo `astro-i18next.config.cjs` mínimo para que `npx astro-i18next generate` funcione. Sin embargo, si vas a usarlo frecuentemente, instala `astro-i18next` localmente:

```powershell
npm install -D astro-i18next
```

- El comando usado localmente durante el trabajo fue:

```powershell
npx astro-i18next generate --config ./astro-i18next.config.cjs
```

- Advertencia: el generador escribe en `src/pages`. Si ya tienes traducciones y páginas dentro de `src/pages/es/`, revisa los cambios antes de aceptar cualquier sobrescritura.

---

## Problemas conocidos y próximos pasos

- El servidor de desarrollo mostró `Exit Code: 1` en iteraciones anteriores a causa de llamadas a `i18next` sin inicializar. Esto se solucionó eliminando esas llamadas y usando los utilitarios locales.
- Si los filtros siguen sin responder, normalmente es porque el listener no se adjuntó — las correcciones introducidas en `Gallery.astro` buscan el `root` por id si `document.currentScript` es `null`. Si sigues viendo el problema, dime y:
   - instrumentaré el listener con logs para ver si los clicks son detectados,
   - o añadiré una pequeña función delegada global para manejar clics en `.filter-btn` (opción robusta cuando el árbol DOM cambia por SPA navigation).

---

## Contacto / soporte

Si quieres que continúe con alguna tarea específica, por ejemplo:

- Ejecutar `npm run dev` y depurar en vivo
- Añadir logs para verificar el click handler de filtros
- Forzar un enfoque delegado global para filtros
- Revisar los archivos generados por `astro-i18next` y hacer un diff

Dime cuál prefieres y lo hago.

---

Desarrollado con ❤️ para Niki Pepper Tattoo
