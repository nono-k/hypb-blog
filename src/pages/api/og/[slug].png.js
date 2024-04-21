import { getCollection, getEntryBySlug } from "astro:content";
import { getOgImage } from '@/components/ogImage/getOgImage.jsx';

export async function getStaticPaths() {
  const articles = await getCollection('articles');
  return articles.map((article) => ({
    params: { slug: article.slug },
  }));
}

export async function GET({ params }) {
  const post = await getEntryBySlug('articles', params.slug);
  const body = await getOgImage(post?.data.title ?? 'No title');

  return new Response(body)
}