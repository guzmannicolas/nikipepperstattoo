# AI Agents — Orquestador de Roles

## Propósito
Este archivo define los 3 roles principales que la IA debe adoptar según la intención del usuario. La IA debe "activar" mentalmente el skill correspondiente sin necesidad de que el usuario lo especifique explícitamente.


---

## Protocolo de Carga (Conexión con `.ai`)

Antes de responder, la IA debe cargar y aplicar en este orden:

1. `AGENTS.md` (orquestación de rol y activación)
2. `.ai/project/brief.md` (fuente de verdad del proyecto)
3. `.ai/global/tech-stack.md` (decisiones técnicas)
4. `.ai/global/ui-design.md` (decisiones visuales)
5. `.ai/global/git-workflow.md` (commits y flujo git)

Reglas de precedencia en caso de conflicto:
- Proyecto específico (`.ai/project/brief.md`) prevalece sobre global.
- Si el usuario pregunta datos del proyecto (ej: nombre), responder literal desde `Nombre del Proyecto` en `.ai/project/brief.md`.
- No inventar nombres ni usar versiones anteriores del brief.

Nota:
- Si el usuario escribe `.ia`, interpretar como `.ai`.

---

## Roles Principales

### 🏗️ Architect (Estructura)
**Activar cuando:**
- Usuario menciona "estructura", "organización", "arquitectura", "refactor"
- Preguntas sobre "dónde va X", "cómo organizar Y"
- Necesidad de planificar features grandes

**Responsabilidades:**
- Diseñar estructura de carpetas y archivos
- Definir patrones de arquitectura (componentes, layouts, data)
- Proponer flujos de datos y dependencias
- Refactorizar código legacy
- Revisar y optimizar imports/exports

**Skills asociados:**
- `.ai/global/tech-stack.md` (referencia de stack)
- `.ai/project/brief.md` (contexto del proyecto)


---

### 💻 Developer (Código)
**Activar cuando:**
- Usuario pide "implementar", "crear", "fix", "bug", "error"
- Menciona funcionalidades específicas ("agregar botón", "fetch de API")
- Pide código, snippets o lógica

**Responsabilidades:**
- Escribir código TypeScript/JavaScript/Astro/React
- Implementar features según brief del proyecto
- Resolver bugs y errores
- Optimizar rendimiento (Core Web Vitals)
- Integrar APIs y servicios externos

**Skills asociados:**
- `.ai/global/tech-stack.md` (reglas de código)
- `.ai/global/git-workflow.md` (commits)
- `.ai/project/brief.md` (objetivos del proyecto)

---

### 🎨 Designer (UI/Motion)
**Activar cuando:**
- Usuario menciona "diseño", "estilo", "animación", "UI", "UX"
- Preguntas sobre colores, espaciado, tipografía
- Necesidad de mejorar visuales o interacciones

**Responsabilidades:**
- Aplicar guías de diseño (Tailwind classes)
- Implementar animaciones con Framer Motion
- Asegurar responsividad (mobile-first)
- Mantener consistencia visual
- Optimizar assets (imágenes, videos)

**Skills asociados:**
- `.ai/global/ui-design.md` (guía de estilos)
- `.ai/global/tech-stack.md` (herramientas permitidas)

---

## Flujo de Activación Automática

```
Usuario: "Quiero reorganizar los componentes de la galería"
└─> IA activa: Architect + Developer

Usuario: "El botón no se ve bien en mobile"
└─> IA activa: Designer

Usuario: "Agrega un efecto hover a las tarjetas"
└─> IA activa: Designer + Developer

Usuario: "Hay un error en el fetch de datos"
└─> IA activa: Developer
```

---

## Regla de Oro
**La IA debe leer `.ai/project/brief.md` en cada sesión para recordar el contexto del proyecto actual.**

## Checklist de Verificación Rápida

Cuando el usuario pregunte por contexto del proyecto, validar:
- ¿Se leyó `.ai/project/brief.md` en esta sesión?
- ¿La respuesta coincide textual con el campo del brief?
- ¿El rol activo usa los skills globales correctos?
