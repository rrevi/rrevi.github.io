import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'Rants on Software Development',
    description: 'Personal website and rants on software development.',
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
