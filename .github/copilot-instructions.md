# Niki Peppers Tattoo - Proyecto Web

Este es un sitio web profesional para una artista del tatuaje construido con Astro, Tailwind CSS, TypeScript y React.

## Stack Tecnológico

- **Astro 5** - Framework web moderno
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Tipado estático
- **React 19** - Componentes interactivos

## Estructura del Proyecto

```
/
├── .github/
│   └── copilot-instructions.md
├── public/
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── galeria.astro
│   │   ├── sobre-mi.astro
│   │   └── contacto.astro
│   └── styles/
````instructions
# Niki Peppers Tattoo — Instrucciones para agentes (Copilot)

Breve: este repositorio es un sitio web construido con Astro + Tailwind + TypeScript + React. Aquí hay lo esencial para que un agente (o Copilot) sea productivo inmediatamente.

Arquitectura y «por qué» (rápido):
- Frontend estático y componentes UI en `src/components` (Astro + React). Las páginas están en `src/pages` y el layout principal en `src/layouts/Layout.astro`.
- Contenido y datos dirigidos desde JSON en `src/data` (`tattoos.json`, `ceramics.json`, `works.json`) — la galería y páginas se construyen a partir de esos archivos.
- Assets: imágenes y vídeos en `src/assets` y `public/images` (optimizar en build con Astro Image si se añade).
- I18n: `src/i18n/en.json` y `src/i18n/es.json` contienen las cadenas; la integración está en `src/i18n/utils.ts` y usa `astro-i18next`.

Comandos importantes (desde la raíz del repo):
- `npm run dev` — Servidor de desarrollo (Astro). Usa para pruebas locales.
- `npm run build` — Produce build de producción.
- `npm run preview` — Previsualiza el build.

Patrones y convenciones del proyecto (con ejemplos concretos):
- Componentes visuales: modifica o crea componentes en `src/components/*` y se exportan a las páginas. Ej: actualizar la navegación en `src/components/Navigation.astro`.
- Secciones de página: las secciones reutilizables están en `src/components/sections/` (ej. `HeroSection.astro`, `FeaturedWork.astro`). Para cambiar una página, edita `src/pages/*.astro` o la sección correspondiente.
- Datos dirigidos por JSON: para añadir/editar trabajos o tatuajes, actualiza `src/data/tattoos.json` y las páginas que lo consumen (`src/pages/tattoos.astro`).
- Estilos: usa `src/styles/global.css` + utilidades Tailwind. Evita añadir CSS global fuera de `global.css` salvo casos puntuales.

Integraciones y seguridad:
- No almacenar claves secretas en el repo. Usa variables de entorno en el entorno de despliegue o funciones/Edge para operaciones con credenciales.
- Para llamadas a APIs (p. ej. Supabase o servicios de email), implementar un endpoint servidor/Edge (no exponer `service_role` en cliente). Revisa `src/middleware.ts` para patrones de middleware/servidor.

Flujos de trabajo para agentes:
- Hacer cambios en rama propia, abrir PR para revisión humana.
- Para cambios en assets grandes (imágenes), añadir primero una referencia en `src/data` y subir assets a `public/images`.
- Para pruebas rápidas: correr `npm run dev` y abrir `http://localhost:4321`.

Dónde mirar primero (prioridad para entender el repo):
- `src/pages/index.astro` — estructura de la home.
- `src/layouts/Layout.astro` — envoltorio global (meta, header, footer).
- `src/components/Navigation.astro` — navegación y menú móvil.
- `src/components/sections/*` — patrones usados en la mayoría de páginas.
- `src/data/*.json` — fuente de verdad para contenidos dinámicos.
- `src/i18n/*.json` y `src/i18n/utils.ts` — manejo de traducciones.

Limitaciones detectables por lectura de código:
- No hay tests automáticos en el repo; validar manualmente en `dev` antes de merge.
- Algunas dependencias de build (Astro, plugins) pueden requerir Node >=16/18 — prueba local si hay errores.

Ejemplo de tarea para un agente:
- "Actualizar el título del héroe en la home": editar `src/components/sections/HeroSection.astro`, correr `npm run dev`, verificar en `http://localhost:4321`.

Si algo no está claro o faltan archivos que deba conocer (p. ej. funciones server/Edge o scripts de deploy), pídemelo y actualizo estas instrucciones.

Referencias rápidas:
- Scripts: `package.json` (dev/build/preview).
- Datos: `src/data/*.json`.
- Páginas: `src/pages/*.astro`.
- Componentes: `src/components/**`.

````
