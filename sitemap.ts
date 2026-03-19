import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const siteUrl = 'https://roisdev.my.id';

type SitemapEbook = {
  id: string;
  slug: string | null;
  created_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: ebooks } = await supabase
    .from('ebooks')
    .select('id, slug, created_at')
    .order('created_at', { ascending: false });

  const ebookEntries = ((ebooks || []) as SitemapEbook[]).map((ebook) => {
    const identifier = ebook.slug || ebook.id;
    return {
      url: `${siteUrl}/ebook/${identifier}`,
      lastModified: ebook.created_at ? new Date(ebook.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  return [
    { url: `${siteUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ebook`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...ebookEntries,
  ];
}