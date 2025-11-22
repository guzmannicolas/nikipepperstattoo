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
│       └── global.css
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Características Implementadas

- ✅ Diseño responsive con tema oscuro
- ✅ Navegación con menú móvil
- ✅ 4 páginas: Inicio, Galería, Sobre Mí, Contacto
- ✅ Formulario de newsletter
- ✅ Formulario de contacto
- ✅ Galería con filtros interactivos
- ✅ Integración de redes sociales

## Comandos de Desarrollo

- `npm run dev` - Servidor de desarrollo (localhost:4321)
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## Próximos Pasos

1. Agregar imágenes reales de tatuajes
2. Configurar servicio de email (Resend, Mailchimp, etc.)
3. Optimizar imágenes con Astro Image
4. Agregar analytics
5. Deploy a producción (Vercel, Netlify, etc.)
