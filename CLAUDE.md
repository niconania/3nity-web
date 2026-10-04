# CLAUDE.md — 3NITY Web

## Qué es este proyecto
Landing page de presentación de **3NITY**, estudio de diseño e impresión 3D en Venezuela
(3 socios: Sara A. Oliviero, José S. Moreno, Nicola A. Nania — "3 friends & 1 machine").
Objetivo de conversión: que el visitante envíe una solicitud de cotización por el
**formulario de contacto → llega por correo**. No se muestran precios (se cotiza en privado).

## Stack
- **Astro 5** (output estático, sin SSR). La landing sigue siendo una sola
  página (`src/pages/index.astro`); desde 2026-08-07 el sitio también tiene
  un módulo de blog real y multipágina (`/blog`, `/blog/[slug]`) — ver
  "Módulo de blog" más abajo.
- Deploy: Cloudflare Pages / Vercel (estático) — en producción, Vercel
  (`https://3nity-web.vercel.app/`), deploy automático al pushear a `main`.
- Formulario: Web3Forms (POST vía fetch + honeypot antispam). El access key vive en
  variable de entorno pública `PUBLIC_W3F_KEY` (ver `.env.example`). **En Vercel es
  obligatoria**: `index.astro` hace fallar el build si corre en Vercel sin la clave
  (2026-10-04 — la web estuvo publicada con `access_key` vacío y ningún envío
  llegaba). Un build fallido deja online el deploy anterior; builds locales sin
  `.env` compilan igual.
- `site` en `astro.config.mjs` = URL de producción; `Base.astro` lo usa para
  `og:image` (`public/og-image.jpg`, 1200×630, hecha del wordmark de marca) y
  `og:url`. Actualizarlo si llega dominio propio.

## Sistema visual — v3: puerto literal del template Agenio
El usuario probó dos direcciones intermedias (reinterpretar el look de Agenio con
tokens propios, luego con las fuentes/colores exactos de Agenio) y en ambas sintió
que el resultado no se parecía lo suficiente. La decisión final fue explícita:
**"repliquen el código, el diseño, la arquitectura... que 3NITY se adapte a esa
página, no la página a 3NITY."**

Esto significa que el sitio ya **no** usa un design system propio en Astro — usa
el CSS/JS real y compilado del template comprado **Agenio** (licencia del
estudio, vendedor wordpressriver.com), con el contenido de 3NITY puesto encima.
No hay tokens `--tn-*` ni componentes `.astro` reutilizables por sección; hay
**una página, con las clases y la hoja de estilos reales de Agenio.**

### Dónde vive cada cosa
- `public/vendor/css/style.css` — el CSS compilado real de Agenio (~19k líneas), **sin tocar**.
- `public/vendor/css/vendor/bootstrap.min.css`, `animate.css` — vendor de Agenio, sin tocar.
- `public/vendor/css/plugins/*.css` — swiper, fontawesome, nice-select, aos, odometer, metismenu.
- `public/vendor/css/overrides.css` — **el único CSS nuestro**:
  1. `.photo-placeholder` — Agenio dimensiona `.image-area` a partir del `<img>` real;
     como no tenemos las fotos de stock del template (ver licencias abajo), estos
     divs necesitan su propio `aspect-ratio` en vez de heredar altura de una imagen
     que no existe.
  2. El tamaño de fuente del titular del Hero (Agenio está afinado para palabras
     cortas en inglés a 120px fijos; nuestro copy en español es más largo).
  3. El glifo +/- del accordion de FAQ (Agenio lo pone en "Font Awsome 6 Pro" —
     typo suyo, y además es un tier de pago que no tenemos).
  4. **Fuentes de marca** (2026-07-19): Agenio's `style.css` nunca cargaba
     Space Grotesk/Urbanist de verdad (solo `var(--font-primary)`/
     `var(--font-secondary)` como string, sin `@font-face` ni link a Google
     Fonts en ningún lado — caía en `sans-serif` silenciosamente). Redefinimos
     esas mismas dos variables a **Montech V.02** (fuente principal, todo el
     sitio) y añadimos `@font-face` reales para Montech (7 pesos),
     **Clesmont** (reservada al hero `<h1>` y al `<h2>` del CTA — los únicos
     dos `.section-title` sin la clase `.second-font` que Agenio ya usa para
     marcar "este título va en la fuente secundaria/suave") y **That That New
     Pixel** (corte itálico, solo el wordmark `.logo`). Los archivos viven en
     `public/fonts/`, copiados de `.claude/skills/3nity-design/fonts/` (ver
     nota abajo — esa carpeta ya no es la fuente de verdad del diseño, pero
     sigue siendo el repositorio real de los archivos de fuente con licencia).
- `public/vendor/js/` — jQuery, Bootstrap JS, Swiper, GSAP+ScrollTrigger, WOW.js,
  odometer, metismenu — los plugins reales de Agenio, cargados como `<script
  is:inline>` en `src/layouts/Base.astro`, en el mismo orden que el template original.
- `public/vendor/images/` — solo los SVG decorativos/de layout de Agenio (flechas,
  formas, iconos). **No** se copiaron las fotos de stock (`.webp`/`.jpg` de
  team/testimonials/portfolio/about/banner) — ver licencias.
- `src/layouts/Base.astro` — carga las hojas de estilo y scripts de Agenio en el
  `<head>`/final del `<body>`, en el mismo orden que `index.html` original.
- `src/pages/index.astro` — el contenido real: la estructura HTML de Agenio
  (`wpr-banner-area`, `wpr-about-area`, `wpr-services-area`, etc.) con el copy,
  las secciones y los datos de 3NITY puestos donde iban los de Agenio.

### Excepciones deliberadas frente al HTML original de Agenio
- **Licencias**: no se usaron las fotos de stock del template (solo SVG/iconos,
  que sí son parte legítima del código del template). Donde Agenio pone una foto,
  aquí hay un `.photo-placeholder` con "FOTO PENDIENTE" hasta que 3NITY entregue
  fotos reales (`public/work/`, ≤200KB, AVIF/WebP).
  - **Excepción — Proceso (2026-07-20)**: las 3 tarjetas de `wpr-working-process`
    (Idea/Cotización/Entrega) ya tienen video real del taller, no placeholder.
    Fuente en `public/videos/process/{idea,cotizacion,entrega}.mp4` (+ su
    `-poster.jpg`), comprimido con `ffmpeg` desde el original (960px de ancho,
    H.264 CRF 23–26, sin audio, `+faststart`) — de ~103MB los 3 originales a
    ~11.8MB. `<video autoplay muted loop playsinline preload="metadata">`,
    igual que Agenio dimensiona `.image-area` desde una imagen real (ver punto
    de arriba), ahora que el `<video>` tiene su propio tamaño intrínseco ya no
    hace falta el hack de `aspect-ratio` — solo el reset `img{max-width:100%;
    height:auto}` de Agenio no cubre `<video>`, así que ese reset se repite a
    mano en `overrides.css` para `.working-process-wrapper .image-area video`.
  - **Equipo — glifos de marca (2026-10-04)**: sin retratos todavía, las 3
    tarjetas de `#team` muestran un glifo píxel de 3NITY sobre el color de
    cada socio (`.team-glyph` en `overrides.css`, PNGs en
    `public/brand/glyphs/`, copiados de `.claude/skills/3nity-design/brand/`):
    Sara/magenta, José/lima, Nicola/cobalto — mismas parejas que los 3
    carteles de marca. Placeholder de marca, no contenido inventado; se
    reemplaza por `<img>` cuando haya fotos.
  - **Trabajos destacados — solo piezas reales (2026-10-04)**: se quitaron las
    slides "Pieza / 0N — Foto pendiente". Para agregar una pieza: el original
    va en `fotos-nuevas/` (gitignored), se comprime a
    `public/work/featured/trabajo-0N.webp` (1280×960, ≤200KB) y se agrega una
    entrada a `WORK_SLIDES`. Con 1 sola slide no se renderizan las flechas y
    `main.js` desactiva loop/autoplay (ver abajo). `trabajo-02.webp`
    (Polytech) salió del post de Instagram del estudio porque no había
    original: la versión embebible del post
    (`instagram.com/p/<código>/embed/captioned/`, pedida con User-Agent
    `facebookexternalhit/1.1`) trae en su JSON (`contextJSON`) las fotos y
    videos del carrusel a la resolución que guarda Instagram (~1080px) y el
    texto del post. Los archivos quedaron en `fotos-nuevas/polytech/`. Es un
    recorte de 692px de la foto de producto dentro del collage: reemplazar
    por el original si aparece.
- **SplitText de GSAP** (usado en el efecto de scroll de "Our Vision") es un
  plugin de pago de Club GreenSock, licenciado al autor del template, no a
  nosotros. Se sustituyó por `public/vendor/js/splittext-shim.js`, que
  reimplementa la misma API mínima sobre **SplitType** (MIT, ya bundleado en
  `vendor/js/vendor/split-type.js`). Debe cargar después de `split-type.js` y
  antes de `main.js`.
- **`contact-form.js`** original apunta a un `mailer.php` que no existe (es un
  sitio estático). Se reemplazó por `public/vendor/js/contact-form-web3forms.js`,
  que intercepta el mismo `#contact-form`/`#form-messages` pero hace `fetch` a
  Web3Forms.
- **Landing de una sola página, salvo el blog**: Agenio trae `about.html`,
  `service.html`, `work.html`, `contact.html` como páginas separadas — ese
  contenido se consolidó en secciones con anchors (`#about`, `#services`,
  `#trabajos`, `#team`, `#contact`) dentro de `index.astro` (decisión
  original del proyecto, sigue vigente). La excepción es `blog-*.html`:
  desde 2026-08-07 el blog **sí** es multipágina real (`/blog`,
  `/blog/[slug]`) — decisión explícita del dueño del proyecto que revierte
  lo que este mismo archivo decía antes ("no agregar blog"). Ver "Módulo
  de blog" más abajo.
- **Secciones omitidas** (sin contenido real que poner ahí, no fabricar): el
  carrusel de logos de clientes, "The Difference"/"Why Choose Us" (×2), y
  "Pricing Plans" (3NITY nunca muestra precios en la web, ver arriba). Awards +
  Testimonials de Agenio se fusionaron en **un solo carrusel** (`#trabajos`,
  reusa `testimonials-image-slider`/`testimonials-content-slider`) mostrando
  piezas propias en vez de premios o citas de clientes que no tenemos.
- **Wordmark**: el logo de Agenio (`assets/images/logo/01.svg`) se reemplazó por
  el texto `3nity™`. Desde 2026-07-19 sí usa la fuente píxel de la identidad
  3NITY (`That That New Pixel`, corte itálico) — ver "Fuentes de marca" arriba.
- **`main.js` — hand-edits al JS de Agenio (2026-07-21, 2026-10-04)**: el swiper
  `.testimonials-image-slider` de "Trabajos destacados" traía `autoplay:
  {delay: 1000}` — pasaba de foto cada 1 segundo, insuficiente para leer el
  título/descripción de cada pieza. Es un valor de configuración inline
  dentro de la llamada a `new Swiper(...)`, no una regla de CSS que se pueda
  sobreescribir desde `overrides.css` ni algo expuesto globalmente para
  reconfigurar desde otro script — se cambió a mano a `delay: 5000` (línea
  ~142), con un comentario in-situ marcando el valor original de Agenio.
  Segundo edit (2026-10-04), en ese mismo bloque: `loop`/`autoplay` de los
  dos swipers de Trabajos solo se activan con 2+ slides (`hasMultipleWorks`)
  — con una sola pieza, el loop de Swiper 8 clona la slide y el autoplay
  deslizaba la foto hacia su propia copia cada 5s. Son las únicas líneas de
  `main.js` que no son copia literal del template; cualquier otro ajuste de
  comportamiento de JS debería seguir el mismo patrón (edit mínimo,
  comentado, documentado acá) en vez de acumularse silenciosamente.

### Módulo de blog (2026-08-07)
Un artículo por trabajo real, enlazado desde "Trabajos destacados". Sigue
siendo 100% estático — no es un CMS, es una content collection de Astro
versionada en el repo:
- `src/content.config.ts` — define la colección `blog` (loader `glob` sobre
  `src/content/blog/*.md`, schema `title`/`excerpt`/`publishDate`/`cover`
  opcional). `cover` es un path público (`/work/...`), mismo patrón que
  `photo` en `SERVICES`/`WORK_SLIDES` de `index.astro` — no usa el pipeline
  de assets de Astro.
- `src/content/blog/*.md` — un archivo por artículo. Para agregar el
  próximo: nuevo `.md` con ese frontmatter + cuerpo en Markdown, y (si
  corresponde a un `WORK_SLIDES` real) agregarle `blogSlug: "<nombre-del-
  archivo-sin-extensión>"` a su entrada en `index.astro` para que aparezca
  el link "Leer el caso completo" en Trabajos destacados. **No crear
  artículos para trabajos sin foto/contenido real** — mismo criterio de
  "no fabricar contenido" que rige el resto del sitio (ver "Qué NO hacer").
- `src/pages/blog/index.astro` (listado) y `src/pages/blog/[slug].astro`
  (artículo) — markup/clases reales de `blog-standard.html`/
  `blog-single.html` del ZIP original de Agenio, confirmadas contra
  `style.css` antes de usarlas (varias clases de esos dos HTML —
  `.link1`, `fw-semibold`, `text-secondary`, `text-white-64` — no están
  definidas en ningún CSS del template, ni siquiera en el original; se
  omitieron en vez de copiarlas).
- **Se omitieron deliberadamente**: comentarios, buscador y newsletter del
  sidebar de Agenio (formularios estáticos sin backend en el HTML
  original — mismo criterio que ya aplicó este proyecto con
  `contact-form.js`/`mailer.php` y con el glifo de FAQ: no shippear algo
  que aparenta funcionar y no funciona), y los íconos de meta
  autor/fecha (`.icon-user-solid` etc. viven en `assets/fonts/custom-
  font.css` del ZIP de Agenio — fuente `icomoon` que **no está portada**
  a `public/vendor/`; la fila de meta va en texto plano en vez de sumar
  otra fuente de íconos).
- `src/components/SiteHeader.astro`, `SiteFooter.astro`, `SiteCta.astro` —
  el header/footer/CTA de Agenio, extraídos de `index.astro` a
  componentes compartidos para no duplicarlos en `/blog`. Prop `base`
  (`""` en home, `"/"` en cualquier otra página) resuelve los anchors de
  sección: `#trabajos` en home, `/#trabajos` fuera de home. Es seguro:
  `main.js` solo intercepta `a[href^="#"]` para el smooth-scroll de
  Agenio (`onepage`), así que `/#trabajos` navega normal.

### Si vas a tocar el HTML/CSS/JS de esta página
- **Antes de nada**, mira `public/vendor/css/style.css` y `index.html` original
  (si el usuario vuelve a traer el ZIP de Agenio) para encontrar la clase/regla
  real — no inventes una clase nueva si Agenio ya tiene una para eso.
- Los cambios de estilo van en `public/vendor/css/overrides.css`, **nunca**
  editando `style.css`/`bootstrap.min.css` directamente (para poder diferenciar
  "lo que trae el template" de "lo que ajustamos nosotros").
- No agregues Tailwind, CSS-in-JS, ni un segundo sistema de diseño en paralelo —
  ya hay uno (el de Agenio) y duplicarlo generaría inconsistencia.
- Si algo no se ve bien, sospecha primero de un **`.image-area` sin `<img>`**
  (Agenio dimensiona por la imagen real) antes de asumir que el CSS de Agenio
  está roto.

## Convenciones de código
- `<script>` de vendor van con `is:inline` en `Base.astro` — si no, Astro/Vite
  intenta procesarlos como ESM y rompe el patrón `(function($){...})(jQuery)`.
- HTML semántico + `lang="es"`. Meta OG básica en `Base.astro`.
- Lighthouse: dado que ahora cargamos jQuery + Bootstrap + Swiper + GSAP +
  varios plugins más (~500KB+ de CSS/JS), **el objetivo de 95+ en Performance ya
  no aplica tal cual** — es la contrapartida directa de haber pedido el código
  literal del template en vez de una reimplementación ligera. Vale la pena
  correr Lighthouse igual para tener una referencia, pero no bloquear merges por eso.
- Accesibilidad: mantener labels/alt reales; Bootstrap ya trae bastante de esto,
  pero revisa el contraste del contenido que reemplazamos.

## Qué NO hacer
- No agregar CMS, carrito, precios ni cotizador público (futuras fases). El
  blog (`/blog`) sí existe desde 2026-08-07 — ver "Módulo de blog" — pero
  sigue sin CMS: son archivos Markdown versionados en el repo, no un panel
  de administración.
- No crear artículos de blog para trabajos sin foto/contenido real (ver
  "Módulo de blog") — mismo criterio de no fabricar contenido de abajo.
- No usar las fotos de stock de Agenio en producción — son solo para la demo del
  vendedor. Placeholders hasta tener fotos reales de 3NITY.
- No usar SplitText de GSAP directamente (sin el shim) — problema de licencia,
  no técnico.
- No usar placeholders lorem ipsum en el copy final: el copy real de 3NITY vive
  directamente en `index.astro`.
- El design system anterior (`.claude/skills/3nity-design/`, tokens `--tn-*`,
  paleta/layout/componentes) **ya no es la fuente de verdad de la landing** —
  queda como archivo histórico/de referencia de marca, no como sistema activo.
  No lo actualices pensando que alimenta el sitio; no lo hace. **Excepción**:
  los archivos de fuente en `.claude/skills/3nity-design/fonts/` (Montech V.02,
  Clesmont, That That New Pixel) sí están en uso — copiados a `public/fonts/`
  y cargados vía `@font-face` en `overrides.css` (ver arriba). Si el usuario
  trae cortes/pesos nuevos de esas fuentes, van en esa misma carpeta origen.
  Lo mismo con los glifos de `brand/`: copiados a `public/brand/glyphs/`
  para las tarjetas de Equipo (ver "Equipo — glifos de marca").
- No poner links de redes inventados: solo cuentas reales (Instagram:
  `@trinityve_`, en `src/config.ts`). LinkedIn se quitó porque era un
  placeholder; se agrega solo si el estudio crea una página real.
