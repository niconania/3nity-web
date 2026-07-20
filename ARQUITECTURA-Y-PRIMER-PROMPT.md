# 3NITY Web — Arquitectura y arranque con Claude Code

## 1. Decisiones y por qué

| Decisión | Elección | Justificación |
|---|---|---|
| Framework | **Astro 5, salida estática** | Landing de contenido → HTML puro, LCP instantáneo, hosting gratis en CDN. Crece a multipágina agregando archivos en `src/pages/`. Estructura simple = código generado por IA más predecible. |
| Estilos | **CSS plano + `colors_and_type.css` del DS** | El design system ya define tokens, semánticos y modo cream. Tailwind duplicaría el sistema y degradaría la adherencia a la marca. |
| Formulario → correo | **Web3Forms** (alternativa: Formspree) | Sitio 100% estático sin backend propio. POST directo, el mensaje llega al correo del estudio. Gratis hasta 250 envíos/mes. Honeypot incluido contra spam. |
| Hosting | **Cloudflare Pages** (o Vercel) | Deploy desde GitHub, HTTPS y CDN global gratis. |
| Design system | **Como Agent Skill en `.claude/skills/3nity-design/`** | El ZIP ya trae `SKILL.md` compatible con Claude Code. Claude lo consultará automáticamente al trabajar en UI. |
| Precios | **Nunca en la web** | El embudo termina en el formulario; la cotización (tasa BCV) es proceso interno. |

## 2. Estructura del repositorio

```
3nity-web/
├── CLAUDE.md                        ← (incluido en este paquete)
├── .claude/
│   └── skills/
│       └── 3nity-design/            ← copiar AQUÍ el contenido del ZIP del DS
│           ├── SKILL.md
│           ├── README.md
│           ├── colors_and_type.css
│           ├── assets/  fonts/  preview/  ui_kits/
├── public/
│   ├── fonts/                       ← copiar desde .claude/skills/3nity-design/fonts/
│   ├── brand/                       ← isotipos y wordmark desde el DS
│   └── work/                        ← fotos de piezas impresas (pendiente: tomarlas)
├── src/
│   ├── styles/global.css            ← @import de colors_and_type.css + reset mínimo
│   ├── layouts/Base.astro           ← <head>, fonts preload, OG, footer/header slots
│   ├── components/
│   │   ├── Header.astro   Hero.astro   Servicios.astro   Trabajos.astro
│   │   ├── Proceso.astro  Estudio.astro  Contacto.astro  Footer.astro
│   │   └── pixel/                   ← TetrisMass.astro, IsotypeSprite.astro, GlyphDot.astro
│   └── pages/index.astro
├── astro.config.mjs
├── package.json
└── .env                             ← PUBLIC_W3F_KEY=xxxx (Web3Forms)
```

## 3. Pasos de preparación (tú, antes de Claude Code)

1. `npm create astro@latest 3nity-web` → plantilla "Empty", TypeScript opcional.
2. Descomprimir el ZIP del design system en `.claude/skills/3nity-design/`.
3. Copiar `fonts/` del DS a `public/fonts/` y ajustar rutas de `@font-face` si hace falta.
4. Crear cuenta en web3forms.com con el correo del estudio → obtener Access Key → `.env`.
5. Colocar `CLAUDE.md` (de este paquete) en la raíz.
6. `claude` en la terminal de VS Code y pegar el prompt de la sección 4.

## 4. Primer prompt para Claude Code

```
Lee CLAUDE.md y la skill .claude/skills/3nity-design/ (README.md y
colors_and_type.css) antes de escribir código.

Construye la landing page completa de 3NITY según la estructura de
componentes definida en CLAUDE.md:

1. Base.astro con preload de las 3 fuentes (Clesmont, Montech V.02,
   That That New Pixel), meta OG en español, e import de global.css.
2. Las 8 secciones (Header → Footer) respetando los 3 modos de fondo
   del DS: Hero en lime con invasión tetris negra, Servicios/Trabajos
   en cream con block-shadows, Estudio/Contacto en black con glow lime.
3. Contacto.astro: formulario POST a https://api.web3forms.com/submit
   con access_key desde import.meta.env.PUBLIC_W3F_KEY, campos nombre /
   correo / tipo de proyecto (select: pieza única, prototipo, serie,
   otro) / mensaje, honeypot oculto, y estados de éxito/error con la
   estética del DS (sin librerías JS, usa un script inline mínimo).
4. Componentes pixel/ reutilizables: TetrisMass (grid CSS de 32px),
   IsotypeSprite (SVG del isotipo), GlyphDot (los 3 glifos circulares).
5. Copy real en la voz de marca (bilingüe ES/EN según el README del DS),
   nada de lorem ipsum. Usa los fragmentos de manifiesto existentes.
6. Al terminar: npm run build, verifica que no haya errores, y dime qué
   fotos/contenidos reales faltan por proveer.

Trabaja mobile-first (390px) y valida contraste en cada sección.
```

## 5. Roadmap post-v1 (no construir aún)

- **Fase 2**: página `/trabajos` con casos de estudio individuales (Content Collections de Astro).
- **Fase 3**: adjuntar archivos STL/3MF en el formulario (requiere endpoint serverless o servicio tipo Uploadcare).
- **Fase 4**: cotizador interactivo privado conectado a su lógica BCV (isla React, detrás de link no indexado).
- **SEO local**: al publicar, crear Google Business Profile y schema.org LocalBusiness con la ciudad.

## 6. Riesgos a vigilar

- **Peso de imágenes**: las fotos de piezas son el activo de conversión #1; exportar AVIF ≤200KB o el LCP se arruina.
- **Fuentes**: 10 archivos TTF/OTF pesan; precargar solo los 3 cortes usados above-the-fold (Clesmont, Montech Regular, Pixel Square) y `font-display: swap` ya está configurado en el DS.
- **Spam del formulario**: si el honeypot no basta, activar el captcha invisible de Web3Forms (no usar reCAPTCHA visible: rompe la estética y la conversión).
- **Correo de destino**: usar un correo del estudio (no personal) para que los 3 socios vean las solicitudes.
