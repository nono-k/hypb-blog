import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const articleCollection = defineCollection({
  loader: glob({ pattern: 'src/content/articles/**/*.mdx' }),
  schema: ({image}) => z.object({
    title: z.string(),
    slug: z.string(),
    pubDate: z.string(),
    image: image(),
    ogp: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    relatedPosts: z.array(reference('articles')).optional(),
    draft: z.boolean().optional(),
    isAdLink: z.boolean().optional(),
    amazon: z.object({
      title: z.string(),
      author: z.string(),
      imageId: z.string(),
      linkId: z.string(),
      coment: z.string(),
    }).optional(),
  }),
});

export const collections = {
  articles: articleCollection,
};