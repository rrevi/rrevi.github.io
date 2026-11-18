import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_NAME } from '../lib/site';
import { getPublishedPosts } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site || 'https://rrevi.github.io',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.intro || post.title,
      link: `/${post.slug}`,
    })),
    customData: `<language>en</language>`,
  });
}
