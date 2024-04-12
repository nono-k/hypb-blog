import { z, defineCollection } from 'astro:content';
import { zonedTimeToUtc } from 'date-fns-tz';

const articleCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    // pubDate: z.string().transform((str) => zonedTimeToUtc(str, 'Asia/Tokyo')),
    pubDate: z.string(),
    image: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
  }),
});

export const collections = {
  articles: articleCollection,
};