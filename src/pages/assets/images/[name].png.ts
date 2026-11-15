import { basename } from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';

const screenshots = import.meta.glob<string>('../../../assets/images/*.png', {
  eager: true,
  query: '?inline',
  import: 'default',
});

// Publish the original PNG URLs from the same files used for optimized post images.
export const getStaticPaths: GetStaticPaths = () =>
  Object.entries(screenshots).map(([path, dataUrl]) => ({
    params: { name: basename(path, '.png') },
    props: { dataUrl },
  }));

export const GET: APIRoute = ({ props }) => {
  const dataUrl: string = props.dataUrl;
  return new Response(Buffer.from(dataUrl.slice('data:image/png;base64,'.length), 'base64'), {
    headers: { 'Content-Type': 'image/png' },
  });
};
