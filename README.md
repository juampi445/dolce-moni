# Dolce Moni

Landing artesanal para Dolce Moni — repostería por encargo en Adolfo Gonzales Chaves.

Hecha en **Next.js (App Router) + TypeScript + SCSS + GSAP**. Sin backend, sin base de datos, sin pasarela de pagos. El único canal de conversión es WhatsApp.

## Empezar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # producción
npm run start    # servir build
```

Requiere Node 20+.

## Estructura

```
src/
  app/                 # App Router (layout, page, globals)
  assets/images/       # Logo (referencia local)
  components/
    hero/              # Hero principal
    layout/            # Header sticky + Footer
    motion/            # Reveal (GSAP + ScrollTrigger)
    order/             # Selector de pedido (contexto + panel + FAB)
    productos/         # Sección, card, carrusel/placeholder de imagen
    sections/          # Cómo pedir, Mayoristas, Contacto
    ui/                # WhatsAppButton compartido
  data/
    productos.json     # ← Fuente de verdad del catálogo
  lib/
    config.ts          # Datos del negocio (WhatsApp, Instagram, zona)
    productos.ts       # Carga + validación tipada del JSON
    whatsapp.ts        # buildWhatsAppLink + plantillas de mensajes
  styles/
    _tokens.scss       # ← Paleta y tipografía (todos los tokens en :root)
    _variables.scss    # Breakpoints en SCSS
    _mixins.scss       # container, focus-ring, breakpoints
    _buttons.scss      # Botones utilitarios globales (btn-ghost-lg, btn-link)
  types/
    producto.ts        # interface Producto + Categoria
public/
  logo-muffin.svg
  assets/productos/    # ← Acá van las fotos de productos
```

## Cómo agregar / editar productos

Todo vive en `src/data/productos.json`. Cada entrada respeta el esquema definido en `src/types/producto.ts`:

```jsonc
{
  "id": "alfajores-maicena",          // slug único
  "nombre": "Alfajores de maicena",
  "categoria": "Clásicos",            // "Clásicos" | "Tartas" | "Budines"
  "descripcionBreve": "...",          // 1 línea para la card
  "descripcion": "...",               // texto largo apetitoso
  "precio": 5000,
  "precioFormateado": "$5.000",
  "moneda": "ARS",
  "unidad": "docena",                 // o null
  "imagenes": ["/assets/productos/alfajores-maicena-1.jpg"],
  "alt": "Texto descriptivo accesible",
  "destacado": false,                 // true → resalta en el catálogo
  "variantes": null,                  // o array de strings
  "incluye": null,                    // o array de strings
  "disponible": true,
  "orden": 10                         // menor = aparece antes
}
```

## Imágenes

Las fotos viven en **`public/assets/productos/`** y se referencian desde el JSON como rutas absolutas (`/assets/productos/...`).

### Reemplazar la foto de un producto existente

1. Crear la carpeta `public/assets/productos/` si no existe.
2. Dejar caer el archivo con el nombre que figura en `imagenes[]` del producto.
3. La card lo toma automáticamente al recargar.

### Agregar varias imágenes a un producto

```json
"imagenes": [
  "/assets/productos/tarta-frutal-1.jpg",
  "/assets/productos/tarta-frutal-2.jpg",
  "/assets/productos/tarta-frutal-3.jpg"
]
```

- 1 imagen → la card la muestra estática.
- 2+ imágenes → autoplay con crossfade suave (3.5 s, pausa al hover, respeta `prefers-reduced-motion`) e indicadores discretos abajo.

Si un archivo todavía no existe, la card muestra un placeholder elegante con el ícono de muffin — no rompe el layout. Sumar fotos reales después es solo "dejar caer los archivos".

### Tamaños recomendados

- Relación 4:5 (vertical).
- Ancho mínimo 1200 px para que se vea bien en pantallas grandes.
- JPG/WebP de buena compresión.

## Cómo cambiar la paleta de color

Toda la paleta vive en **un único archivo**: `src/styles/_tokens.scss`. Las variables son **semánticas** (`--color-accent`, `--color-bg`, etc.) y ningún componente referencia colores hardcodeados.

```scss
// src/styles/_tokens.scss
:root {
  --color-bg:                oklch(0.985 0.008 70);
  --color-surface:           oklch(0.975 0.012 65);
  --color-text:              oklch(0.235 0.018 50);
  --color-accent:            oklch(0.605 0.155 38);   // ← editá esto
  --color-accent-hover:      oklch(0.545 0.165 38);
  --color-accent-contrast:   oklch(0.985 0.008 70);
  --color-accent-soft:       oklch(0.935 0.040 50);
  // ...
}
```

Recomendaciones para el swap:
1. Editar **solo** los triples OKLCH del bloque `:root`. No tocar los nombres ni las referencias `var(--…)` en los componentes.
2. Verificar contraste **AA** (mínimo 4.5:1 para texto normal) entre `--color-text` y `--color-bg`, y entre `--color-accent-contrast` y `--color-accent`.
3. La paleta usa **OKLCH** (perceptualmente uniforme) — para mover el tono, cambiá el tercer número (hue). Para subir/bajar saturación, el segundo (chroma).

Esa es toda la cirugía. La regla 60/30/10 ya está estructurada en los tokens:
- **60%** superficies neutras (`--color-bg`, `--color-surface`, `--color-surface-sunken`).
- **30%** texto y bordes (`--color-text`, `--color-text-muted`, `--color-border`).
- **10%** acento (`--color-accent*`) reservado para CTAs, badges, focos visuales.

## Cómo cambiar la tipografía

`src/app/layout.tsx` carga las fuentes con `next/font/google` y las expone como CSS variables (`--font-fraunces`, `--font-hanken`). `src/styles/_tokens.scss` las consume como `--font-display` y `--font-sans`. Cambiá los `next/font/google` imports si querés otra familia — el resto del proyecto no necesita tocarse.

## Contacto / configuración del negocio

Datos editables en **`src/lib/config.ts`**: número de WhatsApp, handle de Instagram, zona, anticipación, etc.

```ts
export const CONTACT = {
  whatsappNumber: "5492983569503",   // formato internacional, sin signos
  whatsappDisplay: "+54 9 2983 56-9503",
  instagram: "dolce.monii",
  instagramUrl: "https://instagram.com/dolce.monii",
};
```

## Decisiones de producto importantes

- **Solo precios de consumidor final.** La sección de mayoristas no muestra precios; invita a consultar por WhatsApp.
- **Mínimo 3 días de anticipación** comunicado de forma cálida en la sección "Cómo pedir".
- **Selector de pedido en memoria** (React state) — no se persiste en el navegador. La confirmación final siempre es manual por WhatsApp; no calcula envíos ni cobra.

## Accesibilidad y SEO

- `lang="es-AR"`, etiquetas semánticas, foco visible, `aria-label` en botones de icono, contraste AA garantizado por los tokens.
- Metadata + Open Graph + Twitter card en `layout.tsx`.
- JSON-LD `Bakery` / `LocalBusiness` con datos de contacto y zona, generado en `layout.tsx`.
- `prefers-reduced-motion` respetado por GSAP y por las transiciones CSS.

## Problemas comunes

**500 al levantar el dev:**
```powershell
# en otra terminal
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
npm run dev
```
Normalmente pasa después de un Ctrl+C agresivo o cuando los archivos cambian mientras Next compila.
