import type { APIRoute, GetStaticPaths } from 'astro';
import { formatDate, getPublishedPosts } from '../../utils/posts';
import type { FormattedPost } from '../../utils/posts';
import { renderOgImage } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as FormattedPost;
  const png = await renderOgImage({
    eyebrow: `${formatDate(post.date)} • ${post.readingTime}`,
    title: post.title,
    subtitle: post.intro,
  });

  return new Response(Buffer.from(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
