# Organización de Imágenes de Tatuajes

## Estructura de Carpetas

```
public/images/tattoos/
├── botanical/     - Tatuajes botánicos (flores, plantas, hojas)
├── colour/        - Tatuajes a color
├── fineline/      - Tatuajes de línea fina
├── animals/       - Tatuajes de animales
└── otros/         - Otros estilos que no encajen en las categorías anteriores
```

## Cómo Organizar tus Imágenes

### 1. Nombra tus archivos de forma descriptiva
Usa nombres claros y en minúsculas con guiones:
```
botanical-rose-01.jpg
colour-butterfly-02.jpg
fineline-mandala-03.jpg
animals-wolf-01.jpg
otros-geometric-01.jpg
```

### 2. Formatos recomendados
- **JPG/JPEG** para fotos de tatuajes (mejor calidad)
- **WebP** para optimización web (más ligero)
- **PNG** solo si necesitas transparencia

### 3. Tamaño recomendado
- **Ancho:** 800-1200px
- **Alto:** 800-1200px (preferiblemente cuadrado para la galería)
- **Peso:** Máximo 500KB por imagen

### 4. Ejemplo de organización

**botanical/** (Tatuajes botánicos)
```
botanical-rose-forearm.jpg
botanical-sunflower-shoulder.jpg
botanical-lotus-back.jpg
botanical-wildflowers-thigh.jpg
```

**colour/** (Tatuajes a color)
```
colour-watercolor-bird.jpg
colour-neotraditional-snake.jpg
colour-realistic-portrait.jpg
```

**fineline/** (Línea fina)
```
fineline-geometric-mandala.jpg
fineline-delicate-flowers.jpg
fineline-minimalist-moon.jpg
```

**animals/** (Animales)
```
animals-lion-realistic.jpg
animals-butterfly-detailed.jpg
animals-wolf-portrait.jpg
```

**otros/** (Otros estilos)
```
otros-tribal-pattern.jpg
otros-geometric-abstract.jpg
otros-dotwork-design.jpg
```

## Múltiples Categorías

Si un tatuaje pertenece a **más de una categoría** (por ejemplo, un pájaro con flores):

1. **Sube la imagen a la carpeta principal** (la categoría más relevante):
   ```
   animals/bird-with-flowers.jpg  ← Archivo físico aquí
   ```

2. **En el código HTML**, define múltiples categorías:
   ```html
   <div data-categories="animals,botanical">
     <img src="/images/tattoos/animals/bird-with-flowers.jpg">
   </div>
   ```

3. **El filtro mostrará** la imagen cuando selecciones "Animals" O "Botanical"

**Ejemplos de combinaciones comunes:**
- `botanical,animals` - Animales con flores/plantas
- `botanical,colour` - Flores a todo color
- `fineline,botanical` - Flores en línea fina
- `animals,colour` - Animales a color

## Notas Importantes

- Todas las imágenes deben estar optimizadas antes de subirlas
- Mantén la calidad alta pero el tamaño de archivo bajo
- Usa nombres descriptivos para facilitar la búsqueda
- Las imágenes se mostrarán en formato cuadrado en la galería
- Cada imagen física va en UNA sola carpeta (la categoría principal)
- Las múltiples categorías se definen en el código HTML, no duplicando archivos
