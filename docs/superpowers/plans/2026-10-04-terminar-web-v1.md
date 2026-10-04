# Terminar la web v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar la landing publicable: formulario protegido contra builds sin clave, links reales, cero "pendiente" visible, equipo con glifos de marca y vista previa al compartir.

**Architecture:** Cambios de contenido/markup en `src/pages/index.astro` y `src/config.ts`, estilos nuevos solo en `public/vendor/css/overrides.css`, un edit mínimo y comentado a `public/vendor/js/main.js` (patrón documentado en CLAUDE.md), metadatos OG en `src/layouts/Base.astro`. Spec: `docs/superpowers/specs/2026-10-04-terminar-web-v1-design.md`.

**Tech Stack:** Astro 5 (estático), CSS/JS compilado de Agenio (Bootstrap, Swiper 8.0.7, jQuery), ImageMagick (`magick`) para assets, Chrome + `playwright-core` (en el scratchpad, no en el repo) para verificación visual.

**Convenciones de verificación:** el repo no tiene suite de tests. Cada task usa comprobaciones sobre el HTML generado (`npm run build` → `dist/`) como test: se corre antes del cambio (debe fallar) y después (debe pasar). El dev server (`npm run dev`, http://localhost:4321/) queda corriendo durante todo el trabajo para el preview del dueño.

---

## File Structure

| Archivo | Cambio | Responsabilidad |
|---|---|---|
| `src/pages/index.astro` | Modify | Guard de la clave, datos `TEAM`/`WORK_SLIDES`, markup de equipo/trabajos/contacto |
| `src/config.ts` | Modify | Instagram real, sin LinkedIn |
| `public/vendor/js/main.js` | Modify (~128-155) | Loop/autoplay de Trabajos solo con 2+ slides |
| `public/vendor/css/overrides.css` | Modify (append) | `.team-glyph` |
| `public/brand/glyphs/glyph-{rise,stairs,totem}.png` | Create | Glifos redimensionados (600px) |
| `public/og-image.jpg` | Create | Imagen OG 1200×630 |
| `astro.config.mjs` | Modify | `site` |
| `src/layouts/Base.astro` | Modify | Meta OG/Twitter |
| `.gitignore` | Modify | `fotos-nuevas/` |
| `CLAUDE.md` | Modify | Documentar todo lo anterior |

---

### Task 1: Guard de build para `PUBLIC_W3F_KEY`

**Files:**
- Modify: `src/pages/index.astro:12`

- [ ] **Step 1: Test que falla** — hoy un build "de Vercel" sin clave compila (no debería):

```bash
VERCEL=1 npm run build > /dev/null 2>&1; echo "exit=$?"
```
Expected ahora: `exit=0` (el test falla: queremos exit≠0).

- [ ] **Step 2: Implementar** — reemplazar la línea 12 por:

```js
const w3fKey = import.meta.env.PUBLIC_W3F_KEY ?? "";

// Without the key, Web3Forms can't route submissions to any inbox: the form
// still renders, but every request is rejected. That shipped unnoticed once
// (found live with access_key="" on 2026-10-04). Fail Vercel builds instead:
// a failed build keeps the previous deploy online, so this only blocks
// publishing a broken form, never takes the site down. Local builds without
// a .env are unaffected (VERCEL is only set on Vercel's build machines).
if (import.meta.env.VERCEL && !w3fKey) {
  throw new Error(
    "PUBLIC_W3F_KEY no está configurada en Vercel: el formulario de contacto no enviaría nada. " +
      "Agrégala en Vercel → Settings → Environment Variables y vuelve a desplegar (ver .env.example).",
  );
}
```

- [ ] **Step 3: El test pasa**

```bash
VERCEL=1 npm run build 2>&1 | grep -c "PUBLIC_W3F_KEY no está configurada"; VERCEL=1 npm run build > /dev/null 2>&1; echo "exit=$?"
```
Expected: `1` (o más) y `exit=1`. Si sale `exit=0`, Astro no expone `VERCEL` vía `import.meta.env` en este build: cambiar la condición a `process.env.VERCEL && !w3fKey` y repetir.

- [ ] **Step 4: Sin regresiones**

```bash
VERCEL=1 PUBLIC_W3F_KEY=dummy npm run build > /dev/null 2>&1; echo "con clave exit=$?"
npm run build > /dev/null 2>&1; echo "local exit=$?"
```
Expected: `con clave exit=0`, `local exit=0` (el segundo build sobrescribe `dist/` sin la clave dummy).

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "Fail Vercel builds when PUBLIC_W3F_KEY is missing"
```

---

### Task 2: Instagram real, sin LinkedIn, Instagram en Contacto

**Files:**
- Modify: `src/config.ts` (archivo completo)
- Modify: `src/pages/index.astro` (tarjetas de equipo `.social`, `<ul>` de `.get-in-touch`)

- [ ] **Step 1: Test que falla**

```bash
npm run build > /dev/null && grep -l "3nity.studio\|linkedin" dist/index.html dist/blog/index.html dist/blog/productos-a-gran-escala/index.html
```
Expected ahora: lista los 3 archivos.

- [ ] **Step 2: `src/config.ts` completo:**

```ts
// Site-wide contact details, centralized so they're consistent everywhere
// they're rendered (footer, contact form, meta tags).
const instagramHandle = "trinityve_";

export const site = {
  name: "3NITY",
  email: "3nityccs@gmail.com",
  instagram: `https://instagram.com/${instagramHandle}`,
  instagramHandle: `@${instagramHandle}`,
  // No LinkedIn: the previous URL was a placeholder, not a real page. Add it
  // back only if the studio creates one (see CLAUDE.md — qué NO hacer).
};
```

- [ ] **Step 3: Tarjetas de equipo** — en `index.astro`, el `<ul>` dentro de `.social` queda solo con Instagram:

```astro
                      <div class="social">
                        <ul>
                          <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="/vendor/images/team/instagram.svg" alt="" /></a></li>
                        </ul>
                      </div>
```

- [ ] **Step 4: Contacto** — el `<ul>` de `.get-in-touch` (mismo markup de Agenio, `flex-direction: column; gap: 20px`):

```astro
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramHandle}</a></li>
            </ul>
```

- [ ] **Step 5: El test pasa**

```bash
npm run build > /dev/null
grep -l "3nity.studio\|linkedin" dist/index.html dist/blog/index.html dist/blog/productos-a-gran-escala/index.html; echo "(nada arriba = OK)"
grep -o "instagram.com/trinityve_" dist/index.html | wc -l
grep -o "instagram.com/trinityve_" dist/blog/index.html | wc -l
grep -o ">@trinityve_<" dist/index.html | wc -l
```
Expected: ningún archivo listado; `5` en home (3 tarjetas + contacto + footer); `1` en el blog (footer); `1` para el handle visible.

- [ ] **Step 6: Commit**

```bash
git add src/config.ts src/pages/index.astro
git commit -m "Use the real Instagram (@trinityve_), drop placeholder LinkedIn, add Instagram to Contact"
```

---

### Task 3: Trabajos destacados — solo piezas reales

**Files:**
- Modify: `src/pages/index.astro` (`WORK_SLIDES`, slides de imagen, `.swiper-navigation`)
- Modify: `public/vendor/js/main.js:128-155`

- [ ] **Step 1: Test que falla**

```bash
npm run build > /dev/null; grep -o "Pieza / 0\|Foto pendiente" dist/index.html | wc -l; grep -c "swiper-btn-next" dist/index.html
```
Expected ahora: `15` (5 slides × "Pieza / 0N" en imagen y en título + 5 × "Foto pendiente") y `1` navegación.

- [ ] **Step 2: `WORK_SLIDES`** — reemplazar la constante completa por:

```js
// Only real pieces with real photos (CLAUDE.md: no fabricated content). To
// add one, compress the original to public/work/featured/trabajo-0N.webp
// (1280x960, ≤200KB) and append an entry here; blogSlug is optional.
const WORK_SLIDES: { title: string; desc: string; photo: string; blogSlug?: string }[] = [
  {
    title: "Productos a gran escala",
    desc: "CLIENTE — JMEDICAL & FILLMED. Modelamos, imprimimos y rotulamos envases referenciales a sus productos estrella.",
    photo: "trabajo-01.webp",
    blogSlug: "productos-a-gran-escala",
  },
];
```

- [ ] **Step 3: Slides de imagen** — sin rama placeholder (toda entrada tiene foto):

```astro
            {WORK_SLIDES.map((w) => (
              <div class="swiper-slide">
                <div class="image-area">
                  <img src={`/work/featured/${w.photo}`} alt={w.title} />
                </div>
              </div>
            ))}
```

- [ ] **Step 4: Flechas solo con 2+ slides** — envolver el bloque existente `<div class="swiper-navigation">…</div>` de `#trabajos` (sin cambiar su interior):

```astro
        {WORK_SLIDES.length > 1 && (
          <div class="swiper-navigation">
            <div class="swiper-btn swiper-btn-prev">
              <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6094 0L0.859375 13.75L0 14.6484L0.859375 15.5469L14.6094 29.2969L16.4062 27.5L3.55469 14.6484L16.4062 1.79688L14.6094 0Z" fill="#F9FAFB"></path></svg>
            </div>
            <div class="swiper-btn swiper-btn-next">
              <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.79688 0L0 1.79688L12.8516 14.6484L0 27.5L1.79688 29.2969L15.5469 15.5469L16.4062 14.6484L15.5469 13.75L1.79688 0Z" fill="#F9FAFB"></path></svg>
            </div>
          </div>
        )}
```

- [ ] **Step 5: `main.js`** — en el `$(document).ready` de Trabajos (línea ~128), reemplazar la creación de ambos swipers por:

```js
        // 3NITY: with a single featured piece, Swiper 8's loop mode clones
        // that one slide and autoplay keeps sliding the photo into its own
        // copy every 5s. Loop/autoplay only with 2+ slides (2026-10-04, see
        // CLAUDE.md).
        var hasMultipleWorks = $(".testimonials-image-slider .swiper-slide").length > 1;

        var imageSwiper = new Swiper(".testimonials-image-slider", {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 0,
          speed: 1800,
          loop: hasMultipleWorks,
          autoplay: hasMultipleWorks ? {
            delay: 5000, // 3NITY: Agenio ships 1000ms, too fast to read a caption (2026-07-21)
            disableOnInteraction: false
          } : false,
          navigation: {
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
          },
        });

        var contentSwiper = new Swiper(".testimonials-content-slider", {
          slidesPerView: 1,
          spaceBetween: 0,
          effect: 'fade',
          speed: 1800,
          loop: hasMultipleWorks,
          autoplay: false,
          fadeEffect: {
            crossFade: true
          }
        });
```
(El bloque `controller.control` de abajo queda igual.)

- [ ] **Step 6: El test pasa**

```bash
npm run build > /dev/null; grep -o "Pieza / 0\|Foto pendiente" dist/index.html | wc -l; grep -c "swiper-btn-next" dist/index.html
```
Expected: `0` y `0`. El comportamiento del swiper (sin clones, sin autoplay) se verifica en el navegador en la Task 7.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro public/vendor/js/main.js
git commit -m "Show only real featured work; no arrows/loop/autoplay with a single piece"
```

---

### Task 4: Equipo con glifos de marca

**Files:**
- Create: `public/brand/glyphs/glyph-rise.png`, `glyph-stairs.png`, `glyph-totem.png`
- Modify: `src/pages/index.astro` (`TEAM`, `.image-area` de las tarjetas)
- Modify: `public/vendor/css/overrides.css` (append)

- [ ] **Step 1: Test que falla**

```bash
npm run build > /dev/null; grep -o "FOTO PENDIENTE" dist/index.html | wc -l
```
Expected ahora: `3`.

- [ ] **Step 2: Assets** (PNG con alfa, glifo `rgb(30,31,30)`; 600px es de sobra para tarjetas de ~450px):

```bash
mkdir -p public/brand/glyphs
for g in rise stairs totem; do
  magick ".claude/skills/3nity-design/brand/glyph-$g.png" -resize 600x600 -strip "public/brand/glyphs/glyph-$g.png"
done
ls -la public/brand/glyphs
```
Expected: 3 archivos, pocos KB cada uno.

- [ ] **Step 3: `TEAM`** — reemplazar la constante por:

```js
// Brand glyph on each founder's brand color instead of a photo until real
// portraits exist — same pairings as the brand's 3 billboards
// (billboards-tryptic.png): magenta/Marketing, lime/Numbers, cobalt/Design.
const TEAM = [
  { name: "Sara A. Oliviero", role: "Chief Marketing Officer", glyph: "glyph-rise", color: "magenta" },
  { name: "José S. Moreno", role: "Chief Financial Officer", glyph: "glyph-stairs", color: "lime" },
  { name: "Nicola A. Nania", role: "Chief Technology Officer", glyph: "glyph-totem", color: "cobalt" },
];
```

- [ ] **Step 4: Markup** — el `.image-area` de cada tarjeta:

```astro
                    <div class="image-area">
                      <div class={`team-glyph team-glyph--${m.color}`}>
                        <img src={`/brand/glyphs/${m.glyph}.png`} alt="" />
                      </div>
                    </div>
```
(`alt=""`: decorativo, el nombre está justo debajo.)

- [ ] **Step 5: CSS** — al final de `overrides.css`:

```css
/* Team cards (2026-10-04): no portraits yet, so instead of a grey "FOTO
   PENDIENTE" box each founder gets a brand glyph on their brand color —
   same pairings as the 3 billboards in the brand kit (magenta/Marketing,
   lime/Numbers, cobalt/Design; magenta and cobalt are also tagged as Sara's
   and Nicola's founder swatches in colors_and_type.css). Square, like the
   photo it stands in for. Agenio's .author-area is an absolutely positioned
   white card over the bottom of the image (bottom:16px), so the extra bottom
   padding centers the glyph in the space above that card instead of under
   it. Swap .team-glyph for an <img> once real photos exist. */
.team-glyph {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14% 14% 36%;
}
.team-glyph img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.team-glyph--magenta { background: #DC0073; }
.team-glyph--lime { background: var(--color-primary); }
.team-glyph--cobalt { background: #1B2CC1; }
/* The glyph PNGs are near-black; black on cobalt barely reads, so the cobalt
   card shows it in cream, as on the brand's cobalt billboard. */
.team-glyph--cobalt img { filter: invert(1) brightness(1.1); }
```

- [ ] **Step 6: El test pasa**

```bash
npm run build > /dev/null; grep -o "FOTO PENDIENTE" dist/index.html | wc -l; grep -o "team-glyph--[a-z]*" dist/index.html | sort | uniq -c
```
Expected: `0`; una vez cada uno `team-glyph--cobalt`, `--lime`, `--magenta`. Ajuste visual (tamaño/posición del glifo) en la Task 7.

- [ ] **Step 7: Commit**

```bash
git add public/brand/glyphs src/pages/index.astro public/vendor/css/overrides.css
git commit -m "Replace team photo placeholders with brand glyphs on founder colors"
```

---

### Task 5: Vista previa al compartir (`og:image`)

**Files:**
- Create: `public/og-image.jpg`
- Modify: `astro.config.mjs`, `src/layouts/Base.astro`

- [ ] **Step 1: Test que falla**

```bash
npm run build > /dev/null; grep -c 'og:image' dist/index.html
```
Expected ahora: `0`.

- [ ] **Step 2: Imagen** — el wordmark tiene alfa: aplanar sobre su propio lima `#A7EA21` (muestreado en 100,100), escalar a 1200×675 y recortar al centro a 1200×630 (el glifo superior y la fila inferior quedan dentro):

```bash
magick public/brand/wordmark-3nity-green.png -background "#A7EA21" -alpha remove -alpha off \
  -resize 1200x675 -gravity center -extent 1200x630 -strip -quality 85 public/og-image.jpg
sips -g pixelWidth -g pixelHeight public/og-image.jpg | tail -2; ls -la public/og-image.jpg
```
Expected: `1200` × `630`, muy por debajo de 300KB (límite práctico de WhatsApp).

- [ ] **Step 3: `astro.config.mjs` completo:**

```js
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Production URL: Base.astro builds absolute og:image/og:url from it.
  // Update it if the site moves to its own domain.
  site: 'https://3nity-web.vercel.app',
});
```

- [ ] **Step 4: `Base.astro`** — en el frontmatter, después del destructuring de props:

```js
const ogImage = new URL("/og-image.jpg", Astro.site).href;
const pageUrl = new URL(Astro.url.pathname, Astro.site).href;
```
y en el `<head>`, justo después de `<meta property="og:locale" content="es_VE" />`:

```html
    <meta property="og:url" content={pageUrl} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="3NITY — estudio de diseño e impresión 3D" />
    <meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 5: El test pasa**

```bash
npm run build > /dev/null
grep -o '<meta property="og:image" content="[^"]*"' dist/index.html
grep -o '<meta property="og:url" content="[^"]*"' dist/index.html dist/blog/productos-a-gran-escala/index.html
```
Expected: `https://3nity-web.vercel.app/og-image.jpg`; og:url `https://3nity-web.vercel.app/` en home y la ruta del artículo en el blog.

- [ ] **Step 6: Commit**

```bash
git add public/og-image.jpg astro.config.mjs src/layouts/Base.astro
git commit -m "Add og:image share preview (brand wordmark) and site URL"
```

---

### Task 6: `.gitignore` + CLAUDE.md

**Files:**
- Modify: `.gitignore`, `CLAUDE.md`

- [ ] **Step 1: `.gitignore`** — agregar al final:

```
# original photos to compress for the site — only the WebP in public/work/ is versioned
fotos-nuevas/
```

- [ ] **Step 2: CLAUDE.md, Stack** — reemplazar el bullet de Formulario:

Old:
```
- Formulario: Web3Forms (POST vía fetch + honeypot antispam). El access key vive en
  variable de entorno pública `PUBLIC_W3F_KEY` (ver `.env.example`).
```
New:
```
- Formulario: Web3Forms (POST vía fetch + honeypot antispam). El access key vive en
  variable de entorno pública `PUBLIC_W3F_KEY` (ver `.env.example`). **En Vercel es
  obligatoria**: `index.astro` hace fallar el build si corre en Vercel sin la clave
  (2026-10-04 — la web estuvo publicada con `access_key` vacío y ningún envío
  llegaba). Un build fallido deja online el deploy anterior; builds locales sin
  `.env` compilan igual.
- `site` en `astro.config.mjs` = URL de producción; `Base.astro` lo usa para
  `og:image` (`public/og-image.jpg`, 1200×630, hecha del wordmark de marca) y
  `og:url`. Actualizarlo si llega dominio propio.
```

- [ ] **Step 3: CLAUDE.md, Excepciones → Licencias** — después del sub-bullet "Excepción — Proceso (2026-07-20)" (termina en "…`.working-process-wrapper .image-area video`."), agregar:

```
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
    `main.js` desactiva loop/autoplay (ver abajo).
```

- [ ] **Step 4: CLAUDE.md, bullet de `main.js`** — reemplazar el bullet completo:

Old: el bullet que empieza con "- **`main.js` — único hand-edit al JS de Agenio (2026-07-21)**:" y termina con "silenciosamente."

New:
```
- **`main.js` — hand-edits al JS de Agenio (2026-07-21, 2026-10-04)**: el swiper
  `.testimonials-image-slider` de "Trabajos destacados" traía `autoplay:
  {delay: 1000}` — pasaba de foto cada 1 segundo, insuficiente para leer el
  título/descripción de cada pieza. Es un valor de configuración inline
  dentro de la llamada a `new Swiper(...)`, no una regla de CSS que se pueda
  sobreescribir desde `overrides.css` ni algo expuesto globalmente para
  reconfigurar desde otro script — se cambió a mano a `delay: 5000` (línea
  ~140), con un comentario in-situ marcando el valor original de Agenio.
  Segundo edit (2026-10-04), en ese mismo bloque: `loop`/`autoplay` de los
  dos swipers de Trabajos solo se activan con 2+ slides (`hasMultipleWorks`)
  — con una sola pieza, el loop de Swiper 8 clona la slide y el autoplay
  deslizaba la foto hacia su propia copia cada 5s. Son las únicas líneas de
  `main.js` que no son copia literal del template; cualquier otro ajuste de
  comportamiento de JS debería seguir el mismo patrón (edit mínimo,
  comentado, documentado acá) en vez de acumularse silenciosamente.
```

- [ ] **Step 5: CLAUDE.md, Qué NO hacer** — agregar al final de la lista:

```
- No poner links de redes inventados: solo cuentas reales (Instagram:
  `@trinityve_`, en `src/config.ts`). LinkedIn se quitó porque era un
  placeholder; se agrega solo si el estudio crea una página real.
```

- [ ] **Step 6: Commit**

```bash
git add .gitignore CLAUDE.md
git commit -m "Document form guard, team glyphs, real-only featured work; ignore fotos-nuevas/"
```

---

### Task 7: Verificación final (navegador real)

**Files:** ninguno del repo (script en el scratchpad).

- [ ] **Step 1: Build limpio + greps de todo lo anterior**

```bash
npm run build 2>&1 | tail -3
grep -o "FOTO PENDIENTE\|Pieza / 0\|Foto pendiente\|3nity.studio\|linkedin" dist/index.html dist/blog/index.html dist/blog/productos-a-gran-escala/index.html | wc -l
```
Expected: `Complete!` y `0`.

- [ ] **Step 2: Herramienta** — en el scratchpad (`$S`), sin tocar el repo:

```bash
cd "$S" && npm init -y > /dev/null && npm i playwright-core@1 --silent
```

- [ ] **Step 3: Script** `$S/verify.mjs` (contra el dev server en :4321):

```js
import { chromium } from "playwright-core";

const OUT = process.argv[2];
const browser = await chromium.launch({ channel: "chrome" });
for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  const problems = [];
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") problems.push(`console: ${m.text()}`); });
  await page.goto("http://localhost:4321/", { waitUntil: "load" });
  await page.waitForTimeout(1500);
  for (const id of ["team", "trabajos", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500); // WOW.js fade-ins
    await page.locator(`#${id}`).screenshot({ path: `${OUT}/${name}-${id}.png` });
  }
  const read = () => page.evaluate(() => {
    const s = document.querySelector(".testimonials-image-slider").swiper;
    return { slides: s.slides.length, loop: s.params.loop, autoplayRunning: !!(s.autoplay && s.autoplay.running), active: s.activeIndex };
  });
  const before = await read();
  await page.waitForTimeout(6500); // > autoplay delay
  const after = await read();
  console.log(name, JSON.stringify({ before, activeAfter: after.active, problems }));
  await page.close();
}
await browser.close();
```

- [ ] **Step 4: Correr y revisar**

```bash
cd "$S" && node verify.mjs "$S"
```
Expected por viewport: `slides: 1`, `loop: false`, `autoplayRunning: false`, `active === activeAfter`, `problems: []`. Mirar las 6 capturas: glifos legibles y por encima de la tarjeta blanca del nombre, `@trinityve_` en Contacto, Trabajos con una sola pieza y sin flechas. Si el glifo queda tapado o descentrado, ajustar el `padding` de `.team-glyph` en `overrides.css`, volver a capturar y hacer commit del ajuste.

- [ ] **Step 5: Estado final**

```bash
git status --short; git log --oneline main..HEAD
```
Expected: árbol limpio; commits de las Tasks 1–6 (+ ajuste visual si hubo) sobre `main`. **No mergear ni pushear** sin OK explícito del dueño, y solo después de que la clave esté en Vercel.
