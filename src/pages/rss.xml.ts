import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { formatPost } from '../utils/posts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const rawPosts = await getCollection('blog', ({ data }) => {
    return data.published !== false;
  });

  const posts = rawPosts
    .map(formatPost)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

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
