// Blog post collection — one article per real trabajo destacado (see
// CLAUDE.md, módulo de blog). Plain Markdown, no CMS: new articles are new
// .md files in src/content/blog/.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.date(),
    // Path público, mismo patrón que `photo` en SERVICES/WORK_SLIDES
    // (index.astro) — no usa el pipeline de assets de Astro.
    cover: z.string().optional(),
  }),
});

export const collections = { blog };
