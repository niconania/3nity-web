# Sección MakerWorld — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sección "¿Lo viste en MakerWorld? Te lo imprimimos" + campo de link en el formulario + FAQ, para que el visitante pida cotización de un modelo de MakerWorld.

**Architecture:** Markup literal de `wpr-why-choose-us-area` de Agenio en `src/pages/index.astro` (datos en constantes del frontmatter, como el resto de la página), script inline mínimo para preseleccionar el tipo de proyecto, ajustes solo en `overrides.css`. Spec: `docs/superpowers/specs/2026-10-04-makerworld-cotizacion-design.md`.

**Tech Stack:** Astro 5 estático, CSS/JS de Agenio, `playwright-core` + Chrome (scratchpad) para verificar.

---

### Task 1: Formulario — opción y campo de link

**Files:** Modify `src/pages/index.astro` (form `#contact-form`)

- [ ] **Step 1: Test que falla**
```bash
npm run build > /dev/null && grep -c 'value="makerworld"\|name="model_link"' dist/index.html
```
Expected: `0`.

- [ ] **Step 2:** En `#project_type`, antes de `<option value="otro">Otro</option>`:
```astro
                <option value="makerworld">Modelo de MakerWorld</option>
```

- [ ] **Step 3:** Antes de `<div class="single-input last">` (mensaje):
```astro
            <div class="single-input">
              <label for="model_link">/LINK DEL MODELO (OPCIONAL)</label>
              <input type="text" inputmode="url" id="model_link" name="model_link" placeholder="Pega el link de MakerWorld u otra página" autocomplete="url" />
            </div>
```

- [ ] **Step 4: El test pasa** — mismo comando. Expected: `2`.

- [ ] **Step 5: Commit** `Add MakerWorld project type and optional model link field to the quote form`

### Task 2: Sección `#makerworld` + preselección

**Files:** Modify `src/pages/index.astro` (constantes + sección entre `wpr testimonials area end` y `wpr faq area start` + `<script>`)

- [ ] **Step 1: Test que falla**
```bash
npm run build > /dev/null && grep -c 'id="makerworld"' dist/index.html
```
Expected: `0`.

- [ ] **Step 2: Constantes** (después de `FAQS`):
```js
// "Lo viste en MakerWorld" (Agenio's "THE DIFFERENCE" section). The studio
// checks each model's license before quoting — see CLAUDE.md.
const MAKERWORLD_COLLECTION = "https://makerworld.com/es/collections/36855492-explore-what-you-can-do";
const MAKERWORLD_YOU = ["Copia el link de su página", "Pégalo en el formulario"];
const MAKERWORLD_US = ["Revisamos la licencia del modelo", "Te cotizamos por correo en 24–48 h", "Lo imprimimos y coordinamos la entrega"];
```

- [ ] **Step 3: Sección** (markup de `index.html` de Agenio, rutas a `/vendor/images/`):
```astro
  <!-- wpr why choose us area start (repurposed: MakerWorld → quote, see CLAUDE.md) -->
  <section id="makerworld" class="wpr-why-choose-us-area mb--16">
    <div class="container">
      <div class="section-inner bg-white border-1">
        <div class="bottom-shape-area square-dot">
          <img src="/vendor/images/about/shape-02.svg" alt="" />
          <span class="square-shape top-left"></span>
          <span class="square-shape bottom-left"></span>
          <span class="square-shape top-right"></span>
          <span class="square-shape bottom-right"></span>
        </div>
        <div class="wpr-content-area border-1">
          <div class="row justify-content-center">
            <div class="col-xl-8 col-lg-10">
              <div class="content-inner">
                <div class="section-title-area center-style">
                  <p class="sub-title">PRINT ANY MODEL</p>
                  <h2 class="section-title second-font font-semi-bold text-normal wpr-text-anime-style-1">¿Lo viste en MakerWorld? Te lo imprimimos</h2>
                </div>
                <div class="row g-5">
                  <div class="col-lg-6 col-md-6">
                    <div class="why-choose-wrapper ml-auto">
                      <div class="wrapper-header">
                        <h3 class="title second-font font-semi-bold text-normal">Tú <span>eliges</span></h3>
                        <img src="/vendor/images/why-choose/grid.svg" alt="" class="shape" />
                      </div>
                      <ul class="wrapper-list">
                        <li><img src="/vendor/images/why-choose/check-01.svg" alt="" />Elige un modelo en <a href={MAKERWORLD_COLLECTION} target="_blank" rel="noopener noreferrer">MakerWorld</a></li>
                        {MAKERWORLD_YOU.map((item) => (
                          <li><img src="/vendor/images/why-choose/check-01.svg" alt="" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="why-choose-wrapper">
                      <div class="wrapper-header two">
                        <div class="logo">3nity<sup>™</sup></div>
                        <img src="/vendor/images/why-choose/grid.svg" alt="" class="shape" />
                      </div>
                      <ul class="wrapper-list two">
                        {MAKERWORLD_US.map((item) => (
                          <li><img src="/vendor/images/why-choose/check-02.svg" alt="" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="bottom-button-area">
                  <a href="#contact" class="wpr-btn btn-primary" data-quote-makerworld>Cotizar un modelo</a>
                  <p class="desc makerworld-ideas">¿Sin ideas? <a href={MAKERWORLD_COLLECTION} target="_blank" rel="noopener noreferrer">Explora lo que se puede imprimir en MakerWorld ↗</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-shape-area square-dot">
          <img src="/vendor/images/about/shape-02.svg" alt="" />
          <span class="square-shape top-left"></span>
          <span class="square-shape bottom-left"></span>
          <span class="square-shape top-right"></span>
          <span class="square-shape bottom-right"></span>
        </div>
      </div>
    </div>
  </section>
  <!-- wpr why choose us area end -->
```

- [ ] **Step 4: Script** (junto a los otros `<script>` al final):
```astro
<script>
  // "Cotizar un modelo" (MakerWorld section): preselect the project type so
  // the visitor lands on a form already set up for a model link. No focus():
  // on phones it would pop the keyboard mid smooth-scroll.
  document.querySelectorAll("[data-quote-makerworld]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const select = document.getElementById("project_type") as HTMLSelectElement | null;
      if (select) select.value = "makerworld";
    });
  });
</script>
```

- [ ] **Step 5: El test pasa** — `grep -c 'id="makerworld"' dist/index.html` → `1`; `grep -o 'collections/36855492[^"]*" target="_blank"' dist/index.html | wc -l` → `2`.

- [ ] **Step 6: Commit** `Add MakerWorld section (Agenio's "The Difference" layout) linking to the studio collection`

### Task 3: FAQ

**Files:** Modify `src/pages/index.astro` (`FAQS`)

- [ ] **Step 1:** Agregar al final de `FAQS`:
```js
  { q: "¿Pueden imprimir un modelo que vi en MakerWorld?", a: "Sí, pega el link en el formulario. Antes de cotizar revisamos la licencia del modelo. Si el autor permite imprimirlo para la venta, te lo cotizamos. Si no, te proponemos una alternativa o diseñamos una pieza propia." },
```
- [ ] **Step 2:** `npm run build > /dev/null && grep -c "vi en MakerWorld" dist/index.html` → `1`.
- [ ] **Step 3: Commit** `Add MakerWorld licensing question to the FAQ`

### Task 4: CSS + verificación visual

**Files:** Modify `public/vendor/css/overrides.css`

- [ ] **Step 1: Test que falla** — `node hscroll.mjs` (scratchpad) a 320/360/375: esperado overflow > 0 por el split-text del título nuevo.
- [ ] **Step 2:** Cambiar el selector del clip existente `.wpr-services-area {` por `.wpr-services-area,\n.wpr-why-choose-us-area {` y actualizar su comentario (ahora son dos secciones con split-text).
- [ ] **Step 3:** Capturas desktop/móvil de `#makerworld`; ajustar en `overrides.css` solo lo que se vea mal (tamaño del wordmark en `.wrapper-header.two .logo`, espaciado/estilo de `.makerworld-ideas`, links dentro de `.wrapper-list`).
- [ ] **Step 4: El test pasa** — `node hscroll.mjs`: overflow 0 en los 8 anchos; clic en "Cotizar un modelo" → `#project_type.value === "makerworld"` y `#contact` en pantalla; sin errores de consola.
- [ ] **Step 5: Commit** `Style the MakerWorld section and clip its split-text overflow`

### Task 5: CLAUDE.md

- [ ] **Step 1:** En "Secciones omitidas": "The Difference" ya no está omitida (ahora es `#makerworld`); describir la sección, la colección, el campo `model_link` y la regla de licencias (SDFL no se vende; CC BY / CC BY-SA / CC0 / permiso del autor sí).
- [ ] **Step 2: Commit** `Document the MakerWorld section and licensing rule`

### Task 6: Verificación final
- [ ] `bash checks.sh`, `node hscroll.mjs`, `node verify.mjs`, `node pages.mjs` (scratchpad): todo en verde; `git status` limpio.
