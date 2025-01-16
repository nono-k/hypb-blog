import { z, defineCollection } from 'astro:content';
import { zonedTimeToUtc } from 'date-fns-tz';

const articleCollection = defineCollection({
  schema: ({image}) => z.object({
    title: z.string(),
    // pubDate: z.string().transform((str) => zonedTimeToUtc(str, 'Asia/Tokyo')),
    pubDate: z.string(),
    image: image().optional(),
    ogp: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
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