---
name: 3nity-design
description: Use this skill to generate well-branded interfaces and assets for 3NITY, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `preview/`, `ui_kits/`).

3NITY is a 3-person experimental design + 3D-print studio. Visual grammar
(v2, adapted from the licensed Agenio agency template — see `CLAUDE.md`):
- **Editorial agency layout**: chips/eyebrows, ghost numbers, rounded cards,
  scroll-reveal text, infinite marquee, carousel — Tetris corner masses survive
  from v1 since Agenio uses a near-identical corner-block motif.
- **Lime #98FF03 / Black #1F1F25 / Cream #F3F4F6** as the dominant triad (Agenio's
  exact values); magenta #DC0073 and cobalt #1B2CC1 remain as 3NITY-only
  founder-swatch accents, not part of Agenio's palette.
- **Two type families**: Space Grotesk (display/headings), Urbanist
  (body/labels/metadata) — both self-hosted, real files, not substitutions.
  That That New Pixel is the third, reserved exclusively for the `3nity`
  wordmark and small decorative accents — never functional text.
- **Rounded corners, soft shadows, smooth motion** — the opposite of the
  original brutalist system. `--r-soft`/`--r-pill` by default.
- **ALL CAPS chips/labels only** with tracking; long body copy and headlines
  run sentence-case. Bilingual (Spanish + English) throughout.
- **No emoji, no icon libraries** (no Font Awesome/Lucide/Heroicons). Pixel
  mascots and the three circular punctuation glyphs (solid / striped / cross)
  cover any decorative-glyph need.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and import `colors_and_type.css`. Build static HTML files. Use the components in `ui_kits/posters/` and `ui_kits/burnon/` as starting points.

If working on production code, read the rules in `README.md` and lift the tokens from `colors_and_type.css` directly.

If the user invokes this skill without any other guidance, ask them what they want to build or design (poster? app screen? slide?), ask 4–8 questions about audience, surface, and tone, then act as an expert designer who outputs HTML artifacts or production code, depending on the need.

Licensed originals (Clesmont, Montech V.02, That That New Pixel) live in `fonts/` and are wired up via `@font-face` in `colors_and_type.css`. In production, load them from `/public/fonts/` (see `CLAUDE.md`), not from within this skill folder.
