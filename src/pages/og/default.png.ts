import type { APIRoute } from 'astro';
import { renderOgImage } from '../../lib/og';
import { SITE_DESCRIPTION, SITE_NAME } from '../../lib/site';

export const GET: APIRoute = async () => {
  const png = await renderOgImage({
    eyebrow: 'Posts & experience',
    title: SITE_NAME,
    subtitle: SITE_DESCRIPTION,
  });

  return new Response(Buffer.from(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
