import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    published: z.boolean().default(true),
    layout: z.string().optional(),
    intro: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    year: z.number(),
    role: z.string(),
    period: z.string(),
  }),
});

export const collections = { blog, experience };
