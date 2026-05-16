# Agregar imágenes al proyecto

Proceso para agregar imágenes nuevas al portfolio de Niki Peppers.

## Pasos

**1. El usuario sube las imágenes a `src/assets/addimage/` y hace git push.**

**2. Confirmar qué son las imágenes:**
- ¿Sección? (`tattoos`, `ceramics`, `works`, `murals`)
- ¿Subcategoría/carpeta destino?
  - Tattoos: `botanical` / `animals` / `coverups`
  - Ceramics: `decorative` / `functional` / `sculptural`
  - Works: `echoes_from_the_deep` / `amid_gestures,_gazes_and_shared_memories` / `childhood` / `on_demand` / `painting` / (nueva serie)
- ¿Título EN y ES?
- ¿Técnica EN y ES?
- ¿Dimensiones?
- ¿Año?
- ¿Precio? (dejar vacío `""` si no corresponde)

**3. Hacer git pull para ver los archivos:**
```bash
git pull
ls src/assets/addimage/
```

**4. Convertir a AVIF y mover a la subcarpeta correcta:**
```js
// Correr con: node --input-type=module
import sharp from './node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js';
import { unlink } from 'fs/promises';

const files = [
  { src: 'src/assets/addimage/NOMBRE.JPG', dest: 'src/assets/works/SERIE/slug-del-titulo.avif' },
];

for (const { src, dest } of files) {
  await sharp(src).avif({ quality: 72 }).toFile(dest);
  await unlink(src);
  console.log(`✓ ${src} → ${dest}`);
}
```

**5. Agregar entradas al JSON correspondiente** (`src/data/tattoos.json`, `ceramics.json` o `works.json`).

Ejemplo para `works.json`:
```json
{
  "id": "slug-del-titulo",
  "title": { "en": "Title EN", "es": "Título ES" },
  "series": "painting",
  "technique": "Oil",
  "technique_es": "Óleo",
  "dimensions": "",
  "year": 2026,
  "image": "/src/assets/works/painting/slug-del-titulo.avif",
  "price": ""
}
```

Ejemplo para `tattoos.json`:
```json
{
  "id": 12,
  "slug": "slug-del-titulo",
  "title": { "en": "Title EN", "es": "Título ES" },
  "description": "",
  "price": "",
  "images": [
    {
      "filename": "Title EN",
      "path": "/src/assets/tattoos/botanical/slug-del-titulo.avif",
      "alt": "Title EN"
    }
  ],
  "category": "botanical, colour",
  "category_es": "botánico, color"
}
```

**6. Si es una serie/categoría nueva en works:**
- Crear la carpeta en `src/assets/works/nueva-serie/`
- Agregar el filtro en `src/pages/works.astro` y `src/pages/es/works.astro`
- Agregar la traducción en `src/i18n/en.json` y `src/i18n/es.json` bajo `artworks.filters`

**7. Validar el JSON antes de commitear:**
```bash
node -e "JSON.parse(require('fs').readFileSync('src/data/works.json','utf8')); console.log('ok')"
```

**8. Commit y push:**
```bash
git add src/assets/ src/data/ src/i18n/ src/pages/
git commit -m "feat: add [descripción]"
git push
```

## Estructura de carpetas actual

```
src/assets/
├── addimage/          ← drop nuevas imágenes acá
├── tattoos/
│   ├── botanical/
│   ├── animals/
│   └── coverups/
├── ceramics/
│   ├── decorative/
│   ├── functional/
│   └── sculptural/
├── works/
│   ├── echoes_from_the_deep/
│   ├── amid_gestures,_gazes_and_shared_memories/
│   ├── childhood/
│   ├── on_demand/
│   └── painting/
├── murals/
└── home/
```

## Notas importantes

- Formato: siempre AVIF, calidad 72
- Nombres de archivo: kebab-case, sin espacios ni mayúsculas (excepto ceramics que mantiene nombres originales por compatibilidad)
- Los componentes `CrossPromo`, `StylesSection` y `FeaturedWork` usan `import.meta.glob` — no necesitan modificación al agregar imágenes
- Las galerías (tattoos, ceramics, works) también usan glob — solo necesitan la entrada en el JSON
- Siempre validar el JSON con `node -e` antes de hacer push para evitar errores de build en Vercel
