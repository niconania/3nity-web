# Terminar la web v1 — publicar con lo que es real

Fecha: 2026-10-04 · Rama: `terminar-web-v1` · Aprobado por el dueño del proyecto en sesión.

## Objetivo

Dejar la landing publicable hoy: formulario funcionando, ningún texto
"pendiente" visible, links reales. Las fotos nuevas de trabajos entran
después como contenido, sin rediseño.

## Diagnóstico de partida (2026-10-04)

- La web publicada (`https://3nity-web.vercel.app/`) se compiló sin
  `PUBLIC_W3F_KEY`: el `<input name="access_key">` sale con `value` vacío,
  así que Web3Forms no puede enrutar ningún envío. El formulario es el
  único objetivo de conversión del sitio.
- `src/config.ts`: Instagram (`instagram.com/3nity.studio`) y LinkedIn
  (`linkedin.com/company/3nity`) son placeholders. El Instagram real es
  `@trinityve_` ("Servicio de impresión 3D", 9 posts).
- "Trabajos destacados": 5 de 6 slides son `Pieza / 0N` + "Foto pendiente".
- Equipo: las 3 tarjetas muestran "FOTO PENDIENTE".
- Sin `og:image`: el link compartido por WhatsApp/Instagram no trae imagen.
- No hay fotos buenas todavía. Instagram no expone las fotos sin login, y
  la versión pública de un post (og:image) es un recorte cuadrado de 640px:
  insuficiente para el carrusel (4:3, hasta 1280px de ancho). Las fotos
  nuevas tienen que venir de los archivos originales.

## Diseño

### 1. Formulario
- **Dueño del proyecto (fuera del repo):** generar la access key en
  web3forms.com con `3nityccs@gmail.com`, cargarla en Vercel como
  `PUBLIC_W3F_KEY` (Production + Preview + Development) y redeployar.
- **Guard de build:** si el build corre en Vercel (`process.env.VERCEL`) y
  la clave está vacía, el build falla con un mensaje que dice exactamente
  qué falta y dónde configurarlo. Un build fallido en Vercel deja online el
  deploy anterior, así que nunca tumba el sitio; solo impide publicar un
  formulario roto en silencio. Builds locales sin `.env` siguen funcionando.

### 2. Links reales
- `site.instagram` → `https://instagram.com/trinityve_` (footer + tarjetas
  de equipo, todas las páginas vía `src/config.ts`).
- Bloque Contacto: segunda línea `@trinityve_` → Instagram, debajo del
  correo, en el mismo `<ul>` de Agenio.
- LinkedIn: se elimina (de `config.ts` y del ícono en tarjetas de equipo).
  Se vuelve a agregar si el estudio crea una página real.

### 3. Trabajos destacados
- Se eliminan las 5 slides placeholder; queda solo "Productos a gran
  escala" (JMEDICAL & FILLMED).
- Con menos de 2 slides no se renderiza `.swiper-navigation` (flechas sin
  efecto). Swiper ignora `navigation.nextEl/prevEl` inexistentes.
- Piezas nuevas: originales en `fotos-nuevas/` (raíz del repo) → WebP
  1280×960, ≤200KB, en `public/work/featured/`, una entrada nueva en
  `WORK_SLIDES` con título + descripción. Trabajo futuro, fuera de esta rama.

### 4. Equipo con glifos de marca
Placeholder de marca en vez de "FOTO PENDIENTE": color de socio + glifo
píxel (los 3 glifos de `.claude/skills/3nity-design/brand/`, PNG con alfa),
mismas combinaciones que los 3 carteles de marca (`billboards-tryptic.png`):

| Socio | Rol | Fondo | Glifo |
|---|---|---|---|
| Sara A. Oliviero | CMO (Marketing) | magenta `#DC0073` | `glyph-rise`, negro |
| José S. Moreno | CFO (Numbers) | lima `#98FF03` (= `--color-primary` de Agenio) | `glyph-stairs`, negro |
| Nicola A. Nania | CTO (Design) | cobalto `#1B2CC1` | `glyph-totem`, crema |

Magenta y cobalto ya están marcados como "founder swatch" de Sara y Nicola
en `colors_and_type.css`. Cuando haya fotos reales, el glifo se reemplaza
por `<img>` en la misma `.image-area`.

### 5. Vista previa al compartir
- `public/og-image.jpg` 1200×630 a partir de `public/brand/wordmark-3nity-green.png`
  (lima, wordmark 3NITY + los 3 glifos).
- `site: "https://3nity-web.vercel.app"` en `astro.config.mjs`; en
  `Base.astro`: `og:image` (URL absoluta), `og:image:width/height/alt`,
  `og:url`, `twitter:card=summary_large_image`.

### 6. Documentación
CLAUDE.md: guard del formulario, glifos de equipo como placeholder de
marca, `site` en `astro.config.mjs` (actualizar si llega dominio propio),
flujo para agregar piezas a Trabajos destacados.

## Fuera de alcance
Fotos nuevas (cuando existan), dominio propio, más artículos de blog,
WhatsApp/otros canales.

## Publicación
Todo en la rama `terminar-web-v1`. Antes de mergear a `main` (deploy
automático en Vercel): verificación local (build + capturas desktop/móvil)
y OK explícito del dueño. Orden: primero la clave en Vercel, después el
merge — si no, el guard del punto 1 frena el deploy (comportamiento
buscado).

## Verificación
- `npm run build` sin errores (local, sin clave).
- Guard: `VERCEL=1 npm run build` sin clave → falla con el mensaje; con
  `VERCEL=1 PUBLIC_W3F_KEY=x` → compila.
- HTML generado: ningún "PENDIENTE"/"Pieza / 0" en `/`; Instagram real en
  todas las páginas; sin LinkedIn; `og:image` absoluta presente.
- Capturas desktop + móvil de Equipo, Trabajos y Contacto.
