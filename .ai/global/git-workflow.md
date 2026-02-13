# Git Workflow — Flujo de Trabajo y Commits

## Filosofía
**Commits atómicos, mensajes descriptivos, historial limpio.**

Historia del proyecto debe contar una narrativa clara, no un caos de "fix", "update", "test".

---

## Conventional Commits

### Formato Estándar
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types Permitidos

```
feat:     Nueva funcionalidad
fix:      Corrección de bug
docs:     Solo documentación
style:    Formato (no afecta código)
refactor: Refactorización (no cambia funcionalidad)
perf:     Mejora de performance
test:     Agregar tests
chore:    Tareas de mantenimiento (deps, config)
ci:       Cambios en CI/CD
build:    Cambios en build system
```

### Scopes Sugeridos (Proyecto Actual)

```
(ui)         Componentes visuales
(gallery)    Sistema de galerías
(i18n)       Internacionalización
(data)       Archivos JSON de contenido
(config)     Archivos de configuración
(deps)       Dependencias
(a11y)       Accesibilidad
```

---

## Ejemplos de Commits

### ✅ Buenos Commits

```bash
# Feat
feat(gallery): add lazy loading to tattoo images
feat(ui): implement hero section with Framer Motion

# Fix
fix(navigation): mobile menu not closing on route change
fix(data): correct image paths in ceramics.json

# Refactor
refactor(components): split HeroSection into smaller components
refactor(styles): migrate inline styles to Tailwind classes

# Docs
docs(readme): add installation instructions
docs(ai): create tech-stack guidelines

# Chore
chore(deps): update Astro to v5.1.2
chore(config): add .vscode to gitignore
```

### ❌ Malos Commits (Evitar)

```bash
# ❌ Demasiado vago
git commit -m "update"
git commit -m "fix stuff"

# ❌ Sin type
git commit -m "added new button"

# ❌ Múltiples cambios no relacionados
git commit -m "feat: add gallery and fix navigation and update deps"
```

---

## Husky — Validación Automática

### Hooks Configurados

#### Pre-commit
Ejecuta antes de cada commit:
```bash
# Valida formato de código
npm run lint

# Valida tipos TypeScript
npm run type-check
```

#### Commit-msg
Valida el mensaje del commit:
```bash
# Fuerza Conventional Commits
npx commitlint --edit $1
```

### Bypass (Solo Emergencias)
```bash
# ⚠️ Usar solo en casos excepcionales
git commit --no-verify -m "hotfix: critical production bug"
```

---

## Branching Strategy

### Ramas Principales

```
main        Producción (siempre estable)
develop     Desarrollo (integración continua)
```

### Ramas de Feature

```bash
# Crear feature branch
git checkout -b feat/gallery-filters

# Trabajo normal
git add .
git commit -m "feat(gallery): add category filter buttons"

# Actualizar con develop periódicamente
git pull origin develop --rebase

# Merge a develop (via Pull Request preferiblemente)
```

### Nomenclatura de Ramas

```
feat/<nombre>       Nueva funcionalidad
fix/<nombre>        Corrección de bug
refactor/<nombre>   Refactorización
docs/<nombre>       Documentación
chore/<nombre>      Tareas de mantenimiento
```

**Ejemplos:**
```bash
feat/hero-animations
fix/mobile-navigation
refactor/gallery-component
docs/setup-instructions
chore/update-dependencies
```

---

## Pull Requests (PRs)

### Template de PR

```markdown
## Descripción
<!-- Explica qué hace este PR y por qué -->

## Tipo de Cambio
- [ ] feat: Nueva funcionalidad
- [ ] fix: Corrección de bug
- [ ] refactor: Refactorización
- [ ] docs: Documentación
- [ ] chore: Mantenimiento

## Checklist
- [ ] Probado localmente (`npm run dev`)
- [ ] Build exitoso (`npm run build`)
- [ ] No hay errores de TypeScript
- [ ] Commits siguen Conventional Commits
- [ ] Screenshots (si aplica)

## Screenshots
<!-- Si hay cambios visuales, agregar capturas -->
```

---

## Comandos Útiles

### Reescribir Último Commit
```bash
# Si olvidaste algo
git add archivo-olvidado.ts
git commit --amend --no-edit

# Si quieres cambiar el mensaje
git commit --amend -m "feat(ui): add hero section with animation"
```

### Rebase Interactivo (Limpiar Historial)
```bash
# Ver últimos 3 commits
git rebase -i HEAD~3

# Opciones:
# pick   = usar commit
# reword = cambiar mensaje
# squash = fusionar con anterior
# drop   = eliminar commit
```

### Reset Suave (Deshacer Commits Locales)
```bash
# Deshacer último commit pero mantener cambios
git reset --soft HEAD~1
```

---

## Reglas de Oro

1. **1 commit = 1 cambio lógico**  
   No mezclar refactor con nuevas features.

2. **Commits frecuentes**  
   Mejor 5 commits pequeños que 1 gigante.

3. **Mensajes en imperativo**  
   "add feature" no "added feature" ni "adding feature".

4. **No subir secretos**  
   Revisar `.gitignore` antes de cada commit.

5. **Pull antes de Push**  
   Evitar conflictos innecesarios.

---

## Configuración de Commitlint

Archivo: `commitlint.config.cjs`

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build'
      ]
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['upper-case']],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72]
  }
};
```

---

## Recursos

- **Conventional Commits:** https://www.conventionalcommits.org/
- **Commitlint:** https://commitlint.js.org/
- **Husky:** https://typicode.github.io/husky/
