import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().optional().default(''),
    date: z.coerce.date(),
    categories: z.array(z.string()).optional().default([]),
    cover: z.string().optional().default('')
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string().optional().default(''),
    type: z.string().optional().default('project'),
    date: z.coerce.date(),
    cover: z.string().optional().default('')
  })
});

export const collections = { posts, projects };
