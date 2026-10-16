# nikipepperstattoo — instrucciones para Claude

## Git

- Siempre pushear a **main** directamente (no crear PRs salvo que el usuario lo pida explícitamente).
- Repositorio: `guzmannicolas/nikipepperstattoo`
- Usuario GitHub: `guzmannicolas`

## Proyecto

- Site: https://nikipeppers.com
- Framework: Astro 5 (SSG estático), desplegado en Vercel
- Package manager: **pnpm**
- Idiomas: EN (default, sin prefijo) y ES (`/es/`)

## Contenido (CMS)

- Tattoos, works, ceramics y murals se editan en el CMS: https://cms.nicoguzmandev.com (Directus, en el VPS).
- `scripts/fetch-cms.mjs` corre antes de `pnpm dev` / `pnpm build` y genera `src/data/{tattoos,works,ceramics,murals}.json` y `src/assets/{tattoos,works,ceramics,murals}/` (gitignored, no editar a mano).
- Requiere `DIRECTUS_URL` y `DIRECTUS_TOKEN` (variables de Vercel, o `.env` local — ver `.env.example`).
- Las imágenes de la home / cross-promo salen de `src/lib/portfolio.ts`: primero los items marcados "featured" en el CMS, después el orden del CMS.
- Categorías (estilos de tattoo, tipos de cerámica, series de works): se crean en el CMS (Categories, nombre/descripción EN/ES, "show in filters"). Se generan en `src/data/categories.json` y se leen con `src/lib/categories.ts` (botones de filtro, "About the series", cards de estilos de la home).
- Niki publica desde el CMS con el botón "Publish website" (dispara el deploy hook de Vercel).

## Formulario de contacto

- `src/components/contact/`: `ContactPage.astro` (la página, usada por `/contact` y `/es/contact`), `ContactForm.astro` (las preguntas de cada servicio están como datos en `QUESTIONS`; los textos en i18n `contact.form`) y `contact-form.ts` (lógica del navegador).
- No hay backend propio: el navegador envía al endpoint compartido del CMS `https://cms.nicoguzmandev.com/contact-form/nikipeppers.com`, que guarda la consulta en el panel de Niki (Consultas) y le manda un email. Contrato y cómo activarlo: `~/cms/docs/features/contact-form.md`.
- Las fotos se achican en el navegador (máx. 2000 px, JPEG) antes de enviarse. Turnstile con `action: "contact"`, se resetea después de cada intento (los tokens son de un solo uso).
- `?service=tattoos|works|ceramics|murals` abre el formulario con ese servicio elegido (lo usan los botones de `CTASection`).
- Pruebas locales: `CONTACT_FORM_URL` y `PUBLIC_TURNSTILE_SITE_KEY` (ver `.env.example`) apuntan a un cliente de prueba con las claves de test de Cloudflare.
