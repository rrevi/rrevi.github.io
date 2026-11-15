import type { APIRoute } from 'astro';
import { renderOgImage } from '../../lib/og';

export const GET: APIRoute = async () => {
  const png = await renderOgImage({
    eyebrow: 'Software Engineering Log',
    title: 'Rants on Software Development',
    subtitle: 'Systems, runtimes, concurrency, and hands-on engineering notes by Rafael Revi.',
  });

  return new Response(Buffer.from(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
