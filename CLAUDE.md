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
