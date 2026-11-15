import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import {
  rehypeCodeBlocks,
  rehypeHeadingAnchors,
  rehypeTables,
} from './src/plugins/rehype-enhancements';

// https://astro.build/config
export default defineConfig({
  site: 'https://rrevi.github.io',
  base: '/',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'kanagawa-lotus',
        dark: 'kanagawa-wave',
      },
      wrap: false,
    },
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeHeadingAnchors,
      rehypeCodeBlocks,
      rehypeTables,
    ],
  },
});
