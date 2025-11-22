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

## 🎨 Características

### Páginas Implementadas

- **Inicio** - Hero section, estilos de tatuaje, formulario newsletter, preview de "Sobre Mí"
- **Galería** - Grid de trabajos con filtros por categoría (Realismo, Tradicional, Fineline, Color)
- **Sobre Mí** - Información sobre la artista, especialidades, filosofía de trabajo
- **Contacto** - Formulario de consultas, información de contacto, horarios de atención

### Funcionalidades

- ✅ Diseño responsive (mobile-first)
- ✅ Navegación con menú móvil
- ✅ Formulario de newsletter
- ✅ Formulario de contacto
- ✅ Filtros interactivos en galería
- ✅ Integración con redes sociales
- ✅ Animaciones y transiciones suaves
- ✅ Optimizado para SEO

### Diseño

- **Tema oscuro** con paleta de colores neutros y acentos en rosa/morado
- **Tipografía moderna** y legible
- **Iconos SVG** para mejor rendimiento
- **Efectos hover** y transiciones fluidas

## 🔧 Personalización

### Colores

Los colores principales están definidos en Tailwind CSS:
- `pink-500` - Color principal de marca
- `purple-500` - Color secundario
- `neutral-950/900/800` - Fondos oscuros

### Contenido Placeholder

Actualmente el sitio tiene contenido placeholder en:
- Imágenes de galería
- Fotos de perfil
- Enlaces de redes sociales
- Información de contacto

**Para personalizar:**
1. Reemplaza las imágenes en `/public/`
2. Actualiza los enlaces de redes sociales en `Layout.astro` y `contacto.astro`
3. Modifica textos en cada página según necesidades
4. Agrega imágenes reales de tatuajes en `galeria.astro`

## 📧 Integración de Newsletter y Formularios

Los formularios actualmente muestran alertas. Para implementar funcionalidad real:

### Opciones recomendadas:

1. **Resend** - Para envío de emails
   ```bash
   npm install resend
   ```

2. **Mailchimp** - Para gestión de newsletter
   ```bash
   npm install @mailchimp/mailchimp_marketing
   ```

3. **Formspree** - Servicio simple para formularios
   - Solo agrega el endpoint en el formulario

4. **API Routes de Astro** - Crear endpoints propios en `/src/pages/api/`

## 🚀 Deployment

Este proyecto se puede deployar fácilmente en:

- **Vercel** - `npm run build` → Deploy
- **Netlify** - Conectar repositorio Git
- **GitHub Pages** - Con GitHub Actions
- **Cloudflare Pages** - Deploy directo desde repo

### Configuración recomendada:

```bash
# Build Command
npm run build

# Output Directory
dist
```

## 📝 Próximos Pasos Sugeridos

1. **Agregar imágenes reales** de tatuajes
2. **Configurar servicio de email** para formularios
3. **Optimizar imágenes** con Astro Image
4. **Agregar analytics** (Google Analytics, Plausible, etc.)
5. **Implementar galería lightbox** para ver imágenes en grande
6. **Agregar sistema de reservas** si es necesario
7. **Configurar dominio personalizado**
8. **Agregar más páginas** (FAQ, Cuidados post-tatuaje, etc.)

## 🤝 Soporte

Para más información sobre las tecnologías usadas:
- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)

---

Desarrollado con ❤️ para Niki Pepper Tattoo
