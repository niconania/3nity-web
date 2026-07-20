# 3NITY — Design System

> *A system, a visual experiment in evolution, material, and perception.*

3NITY is a 3-person contemporary design studio offering 3D printing, modeling, prototyping and experimental product work. Their niches are home goods, architecture, full-scale products, and POP material. Founders (encoded into the color system as named swatches): **José S. Moreno**, **Sara A. Oliviero**, **Nicola A. Nania**.

The brand operates on the tension between **digital-pixelated** (8-bit retro-tech) and **organic-photographic** (high-contrast editorial). Every piece is treated as a fragment of an ongoing visual experiment, never as conventional advertising.

**Tagline / manifesto fragments**
- "Nace de un impulso, de solucionar sin tener que pedirlo."
- "Buscamos crear cosas que las personas no quieren, sino que las necesitan."
- "3 friends & 1 machine."
- Identity: 3NITY · System: 09° · Aesthetic: Brutalist Minimalism

---

## Sources

- `uploads/3nity.pdf` — referenced in the brief but **not present in the filesystem** (only PNG board assets were uploaded). Flag → please re-upload if it contains additional rules.
- 11 PNG boards from the brand book (color board, type board, manifesto, posters, isotype variants, billboards). All copied into `assets/`.

---

## Index

- `README.md` — this file. Brand context, content rules, visual foundations, iconography, manifest.
- `SKILL.md` — agent skill manifest (cross-compatible with Claude Code Agent Skills).
- `colors_and_type.css` — CSS variables for color, type, spacing, radii, shadows, motion. Import this first.
- `assets/` — original brand boards, logos, and reference imagery.
- `preview/` — small HTML cards used by the Design System tab. One concept per card.
- `ui_kits/`
  - `posters/` — the brand's primary surface: editorial pixel-tetris posters (1080×1920 vertical billboards, 1920×1080 horizontals, 1×1 social).
  - `burnon/` — BurnOn, a fitness app product mock referenced in the brief (mobile, dark theme).
- `slides/` — *omitted* (no deck template was provided).

---

## Content fundamentals

### Voice
- **Bilingual.** Spanish for poetic / manifesto copy, English for technical / metadata. Mix freely on the same piece.
- **Manifesto-first.** Short declarative sentences. No selling, no exclamation marks. Each statement could be a wall stencil.
- **Meta-digital.** Copy refers back to itself: *"a system in evolution"*, *"identity: 3nity / system: 09°"*. The work knows it's the work.
- **First-person plural ("we / nosotros") rare.** Voice is impersonal/observational, like a lab report. *"3NITY nace de un impulso"* — the brand acts on its own.
- **No emoji. Ever.** Emoji breaks the bitmap/editorial grammar. Use the pixel isotype, circular glyphs, or unicode arrows instead.

### Casing & punctuation
- **ALL CAPS** for everything in mono (Montech V.02 / JetBrains Mono): metadata, labels, project codes, billboard copy.
- **Title case** is rare. Display headlines are CAPS too.
- Project metadata uses slash separators: `3NITY / 09°`, `IDENTITY: 3NITY / SYSTEM: 09°`.
- Numbers are content. `09°`, `N.°44FF02`, `RGB 68, 255, 02` — leading zeros, the `°` symbol, and HEX/RGB strings are part of the visual language.

### Sample copy
- Headline: **"GOOD IDEAS START WITH A GOOD TEAM"**
- Headline: **"DON'T BE A SILLY SWIM REELS"** *(intentional surrealism)*
- Tagline (under wordmark): **"3 FRIENDS & 1 MACHINE"**
- Metadata block:
  ```
  HERO SHOT
  EDITORIAL          3NITY / 09°
  HIGH-END LUXURY VISUAL EXPERIMENT
  ```
- Lab annotation: `PRINT LIKE US IN 3 STEPS`, `MODELING`, `PROTOTYPES`, `MUST-HAVE 3D SERVICES`.

---

## Visual foundations

### Color
Highly contrasted, two-mode palette (cream surface vs near-black surface). One accent dominates per piece — never mix lime + magenta + cobalt as equals; pick a lead.

| Token | HEX | Use |
|---|---|---|
| `--tn-lime` | `#44FF02` | Signature. Backgrounds, radial suns, energy. |
| `--tn-lime-soft` | `#A7EA21` | Gradient mid-tone, transitions. |
| `--tn-magenta` | `#DC0073` | Disruption pieces. Never with lime as equals. |
| `--tn-cobalt` | `#1B2CC1` | Editorial weight. Quiet, conceptual. |
| `--tn-black` | `#1F1F25` | Structural fond, Agenio's secondary color. |
| `--tn-cream` | `#F3F4F6` | Cool neutral, Agenio's bg-1. |

> **v2 note (Agenio direction):** the landing page (`src/`) now uses Agenio's
> exact hex values above, not the original warmer `#44FF02`/`#1E1F1E`/`#FFF8F0`.
> This README's historical color language ("warm neutral", "not pure black")
> describes the *original* v1 brand board — kept for context, superseded in
> practice by `colors_and_type.css`, the actual source of truth.

### Type
- **Display — Space Grotesk 600/700**: geometric grotesk, sentence-case headlines by default (not ALL CAPS anymore).
- **Body/labels — Urbanist 400–700**: every label, metadata, body copy. Chips/eyebrows stay ALL CAPS + tracked; long body text stays sentence-case.
- **Pixel — That That New Pixel**: reserved *exclusively* for the `3nity` wordmark and small decorative accents (ghost numbers, glyphs). Never functional text.
- Space Grotesk / Urbanist are self-hosted via `@fontsource`, files copied into `fonts/` and `/public/fonts/`. That That New Pixel remains the original licensed asset.
- Clesmont and Montech V.02 files remain in `fonts/` (still owned by the studio) but are no longer referenced by the live site — kept in case a future direction reverts.

### Background system
3NITY operates in **3 fond modes**, each carrying meaning:
1. **Cream + black grafismo** — editorial, daytime, gallery. Vast negative space at top; logo + meta block low/centered. Used in the `AI POWERED FITNESS GUIDE` and hero shot pieces.
2. **Lime fond + black tetris invasion** — energy, peak. Pixel/Tetris blocks invade from a corner; isotype + wordmark anchor the lower-left.
3. **Black fond + neon glow** — night, lab, video-game. Radial green suns; pixel mascots; full-bleed photography (rocks, athletes, frogs) in mono or hyper-saturated.

Backgrounds are **flat fields, radial sun gradients, or full-bleed photography** — never noisy gradients, never mesh blends, never abstract blob-orgs.

### Layout
- **Pixel-modular grid.** Snap to 32px (`--grid-cell`). Tetris-shaped masses pour in from corners.
- **Vast negative space.** Headlines and logos float low or off-center. Top half often empty.
- **Mobile-first 9:16 with meta-references.** Posters mimic Instagram Reels — status bar, "@shreyaadesign" handle, "Add a comment" — as commentary on digital consumption.
- **Metadata in corners.** Editorial case-study pieces show `ABOUT / PROJECT TYPE / YEAR` in monospace, often rotated 90°.

### Photography
Two opposing registers:
- **Organic monochromatic** — high-contrast B&W rocks, sculptures, athletes mid-motion. Heavy motion blur, visible grain.
- **Hyper-saturated experimental** — tropical frogs in fuchsia/electric blue on absolute black; lime radial suns. Artificiality is the point.

Recurring subjects: rocks/minerals (raw), athletes in action (energy), helmeted/suited figures (futurism), edited exotic animals (altered nature).

### Borders, radii, shadows (v2 — Agenio direction)
- **Rounded by default.** `--r-soft` (12px) on cards/inputs, `--r-pill` (999px)
  on buttons and chips. Sharp corners are now the exception, reserved for the
  wordmark and the Hero's Tetris masses.
- **Shadows are soft**, not blocky: `--shadow-soft` / `--shadow-soft-dark`.
  `--shadow-block` remains defined but deprecated — kept for reference only.
- **Hairlines are 1px** in `--hairline` for card borders and technical frames.

### Hover / press
- Hover: background/color crossfade (lime ↔ black), or shift to `--disrupt`
  (magenta). Smooth, not a hard cut.
- Focus: 2px solid `--tn-lime` outline + glow.

### Transparency / blur
- Frosted-glass caption cards (`--glass-bg`/`--glass-border`/`--glass-blur`)
  over photography, e.g. the featured-work carousel.

### Motion (v2 — Agenio direction)
- **Smooth, not snap.** `--ease-reveal` + `--dur` (400ms) is the default for
  hover/transition states. `--ease-snap` remains defined but deprecated.
- Scroll-reveal word-by-word, count-up stats, infinite marquee, and carousel
  transitions all implemented with `IntersectionObserver` + CSS/JS vanilla —
  never Bootstrap/jQuery/GSAP/Swiper/AOS.

This is now the sitewide default — see `CLAUDE.md` in the repo root for the
full picture (this replaces the original brutalist/pixel v1 direction).

---

## Iconography

3NITY uses **almost no UI iconography**. The brand's iconographic vocabulary is:

1. **The pixel isotype.** A cruciform/diamond pixel sprite (looks like a Space Invader or a digital snowflake). Comes in expanded mandala variants for hero pieces. See `assets/isotype-on-black.png`, `assets/isotype-on-cream.png`, `assets/logo-isotype-green.png`.
2. **Pixel mascots.** Auxiliary 8-bit invader-creatures used as decoration. Pulled from `assets/wordmark-3nity-green.png`.
3. **Circular punctuation glyphs.** Three repeating circles (solid green, striped, cross-in-circle) act as visual periods. Recreate as CSS / inline SVG — they're geometric primitives, not icons.
4. **Tetris masses.** Stepped pixel blocks that invade compositions from the corners. Built as CSS grid cells, not as a sprite.
5. **No icon font, no Lucide, no Heroicons.** If a UI absolutely needs an action glyph (close, menu), draw it as a 4×4 or 5×5 pixel grid in the brand's bitmap grammar. Stroke icons would break the system.
6. **No emoji.** No unicode emoji. The `°` sign and slashes are the only typographic glyphs that act decoratively.

When in doubt, use a **pixel mascot** or a **circular glyph** instead of an icon.

---

## Substitutions / open questions

- **`uploads/3nity.pdf`** — referenced in brief but not present. If it contains the print spec or grid system, please re-upload.
- **Photography** — boards reference rocks/athletes/frogs but no photo files were provided. Posters use placeholder treatments; supply 6–10 hero photos to lock the registers.
