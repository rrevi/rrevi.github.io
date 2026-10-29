import type { CollectionEntry } from 'astro:content';

export interface FormattedPost {
  entry: CollectionEntry<'blog'>;
  id: string;
  slug: string;
  title: string;
  date: Date;
  year: number;
  intro?: string;
  published: boolean;
  readingTime: string;
}

export function formatPost(entry: CollectionEntry<'blog'>): FormattedPost {
  const match = entry.id.match(/^(\d{4}-\d{2}-\d{2})-(.*)$/);
  const dateStr = match ? match[1] : null;
  const slug = match ? match[2] : entry.id;
  const date = entry.data.date || (dateStr ? new Date(`${dateStr}T00:00:00Z`) : new Date());

  const body = entry.body || '';
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  const readingTime = `${minutes} min read`;

  return {
    entry,
    id: entry.id,
    slug,
    title: entry.data.title,
    date,
    year: date.getUTCFullYear(),
    intro: entry.data.intro,
    published: entry.data.published ?? true,
    readingTime,
  };
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
