import Link from 'next/link';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Clock3, Layers3, Library } from "lucide-react";
import WrapperLayout from '@/components/wrapperLayout';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import EbookCard from '@/components/ebookCard';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getPosts() {
  const { data: posts, error } = await supabase
    .from('ebooks')
    .select(`
      id, 
      title, 
      created_at,
      cover,
      category
    `)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Supabase error:', error);
    return [];
  }

  return posts || [];
}

export default async function EbookListPage() {
  const ebooks = await getPosts();
  const featured = ebooks[0];
  const catalogs = ebooks;
  const totalCategories = new Set(ebooks.map((item) => item.category || 'General')).size;

  const resolveCoverSrc = (ebook: any) => {
    const rawCover = ebook.cover || ebook.cover_url;
    if (!rawCover || typeof rawCover !== 'string') return null;

    if (rawCover.startsWith('http://') || rawCover.startsWith('https://') || rawCover.startsWith('/')) {
      return rawCover;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) return rawCover;

    if (rawCover.startsWith('blog-images/')) {
      return `${supabaseUrl}/storage/v1/object/public/${rawCover}`;
    }

    return `${supabaseUrl}/storage/v1/object/public/blog-images/${rawCover}`;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div>
      <div className="bg-transparent relative rounded-lg border-none">
        <GridPattern
          squares={[
            [4, 4], [5, 1], [8, 2], [5, 3], [6, 6],
            [10, 10], [12, 15], [18, 10],
          ]}
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full",
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "opacity-50 dark:opacity-30",
          )}
        />

        <div className="relative overflow-hidden pt-14 bg-white dark:bg-zinc-900 border-b">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.16),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(2,132,199,0.12),_transparent_55%)]" />

          <div className="container mx-auto px-4 py-12 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-zinc-700/50 mb-6 border border-teal-100 dark:border-zinc-600">
              <BookOpen className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium">Digital Library</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Koleksi Ebook Profesional
            </h1>

            <p className="text-lg mb-10 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-300">
              Materi terkurasi untuk meningkatkan skill teknis Anda secara
              terstruktur, praktis, dan relevan dengan kebutuhan industri.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <Card className="py-0 shadow-none border-zinc-200/80 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/70">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Library className="h-4 w-4 text-teal-600" />
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Total Ebook</p>
                  </div>
                  <p className="text-2xl font-bold">{ebooks.length}</p>
                </CardContent>
              </Card>

              <Card className="py-0 shadow-none border-zinc-200/80 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/70">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Layers3 className="h-4 w-4 text-cyan-600" />
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Kategori</p>
                  </div>
                  <p className="text-2xl font-bold">{totalCategories}</p>
                </CardContent>
              </Card>

              <Card className="py-0 shadow-none border-zinc-200/80 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/70">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock3 className="h-4 w-4 text-amber-600" />
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Update Terakhir</p>
                  </div>
                  <p className="text-lg font-semibold line-clamp-1">
                    {featured ? formatDate(featured.created_at) : '-'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <WrapperLayout>
        <div className="py-10 space-y-10">


          {ebooks.length === 0 && (
            <Card className="py-0 shadow-none border-dashed border-zinc-300 dark:border-zinc-700">
              <CardContent className="p-14 text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 mx-auto flex items-center justify-center mb-4">
                  <BookOpen className="h-7 w-7 text-zinc-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Belum ada ebook tersedia</h3>
                <p className="text-zinc-500">Koleksi akan diperbarui secara berkala. Silakan cek kembali nanti.</p>
              </CardContent>
            </Card>
          )}

          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl md:text-2xl font-bold">Katalog Ebook</h3>
              <p className="text-sm text-zinc-500">{catalogs.length} judul tersedia</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogs.map((ebook) => (
                <EbookCard key={ebook.id} ebook={ebook}/>
            ))}
            </div>
          </div>
        </div>
      </WrapperLayout>
    </div>
  );
}