# Sección MakerWorld — "Lo viste en MakerWorld, te lo imprimimos"

Fecha: 2026-10-04 · Rama: `terminar-web-v1` · Aprobado por el dueño del proyecto en sesión.

## Objetivo

Darle al visitante sin idea ni archivo propio un camino concreto para pedir
cotización: elegir un modelo en MakerWorld y mandar el link por el
formulario. Todo MakerWorld funciona como catálogo sin copiar modelos ni
fotos de terceros a la web.

## Decisiones

- **Link → cotización** (elegido frente a "catálogo con fotos" y "subir
  diseños propios a MakerWorld"): no copia contenido ajeno, no requiere
  mantenimiento, cero riesgo de licencias en la web misma.
- **Exploración vía la colección del estudio**:
  `https://makerworld.com/es/collections/36855492-explore-what-you-can-do`
  (provista por el dueño). Reemplaza los links de búsqueda por palabra clave
  del borrador: MakerWorld bloquea el acceso automatizado (Cloudflare 403),
  así que esos URLs no se podían verificar, y una colección curada lleva a
  modelos elegidos por el estudio en vez de a resultados al azar.
- **Licencias**: la mayoría de los modelos de MakerWorld usan la Standard
  Digital File License, que prohíbe vender impresiones. El estudio revisa la
  licencia de cada link antes de cotizar; solo imprime para la venta modelos
  CC BY, CC BY-SA, CC0 o con permiso del autor. Se dice en la sección, en el
  FAQ y en CLAUDE.md.

## Diseño

### Sección (`#makerworld`, entre Trabajos destacados y FAQ)
Markup real de "THE DIFFERENCE" de Agenio (`wpr-why-choose-us-area`, del
`index.html` original en `03_BIBLIOTECA/Plantillas/main-files/agenio/`),
CSS e íconos ya presentes en `public/vendor/`:
- `sub-title`: PRINT ANY MODEL · título (`wpr-text-anime-style-1`):
  "¿Lo viste en MakerWorld? Te lo imprimimos".
- Tarjeta 1 (`why-choose-wrapper ml-auto`), título "Tú <span>eliges</span>",
  `check-01`: "Elige un modelo en MakerWorld" (MakerWorld → colección) ·
  "Copia el link de su página" · "Pégalo en el formulario".
- Tarjeta 2 (`wrapper-header two`), en vez del logo `<img>` de Agenio el
  wordmark de texto `3nity™` (`.logo`, fuente píxel), `check-02`:
  "Revisamos la licencia del modelo" · "Te cotizamos por correo en 24–48 h"
  · "Lo imprimimos y coordinamos la entrega".
- `bottom-button-area`: un solo botón de Agenio, "Cotizar un modelo"
  (`#contact`), que además preselecciona "Modelo de MakerWorld" en el
  formulario (script inline, sin foco para no abrir el teclado en móvil a
  mitad del scroll). Debajo, línea de texto: "¿Sin ideas? Explora lo que se
  puede imprimir en MakerWorld ↗" → colección, nueva pestaña.
  (Un segundo `.wpr-btn` no encaja: la regla de Agenio para este botón le
  pone sombras internas oscuras pensadas para `btn-primary`.)

### Formulario
- `#project_type`: nueva opción `makerworld` → "Modelo de MakerWorld"
  (antes de "Otro").
- Campo nuevo opcional antes del mensaje: `/LINK DEL MODELO (OPCIONAL)`,
  `name="model_link"`, `type="text" inputmode="url"` (un `type="url"`
  bloquearía el envío si pegan el link sin `https://`). Web3Forms lo manda
  en el mismo correo.

### FAQ
"¿Pueden imprimir un modelo que vi en MakerWorld?" → "Sí, pega el link en
el formulario. Antes de cotizar revisamos la licencia del modelo. Si el
autor permite imprimirlo para la venta, te lo cotizamos. Si no, te
proponemos una alternativa o diseñamos una pieza propia."

### CSS (`overrides.css`)
- El título usa el split-text de Agenio (chars en x:50px hasta animar):
  agregar `.wpr-why-choose-us-area` al `overflow-x: clip` que ya tiene
  Servicios, o reaparece el scroll horizontal en teléfonos ≤375px.
- Tamaño del wordmark en la tarjeta 2 si hace falta (ajuste visual).

## Fuera de alcance
Catálogo con fotos, perfil propio en MakerWorld, item en el menú del header.

## Verificación
- Build OK; HTML: sección con `id="makerworld"`, link a la colección con
  `target="_blank"`, opción `makerworld`, campo `model_link`, FAQ nueva.
- Navegador: clic en "Cotizar un modelo" → `#project_type` = `makerworld`
  y la vista llega a `#contact`; sin scroll horizontal en 320–1440px; sin
  errores de consola; capturas desktop/móvil.
