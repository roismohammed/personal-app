"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { 
  Plus, Edit3, Trash2, Loader2, BookOpenText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable/table";
import PageTitle from '@/components/page-title';
import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/client';

type ChapterItem = {
  id: string;
  title: string;
  slug: string;
  ebook_id: string;
  created_at: string;
  ebooks?: {
    id: string;
    title: string;
    category: string | null;
  } | Array<{
    id: string;
    title: string;
    category: string | null;
  }> | null;
};

type ChapterRow = ChapterItem & {
  name: string;
};

const getEbookTitle = (chapter: ChapterItem) => {
  if (!chapter.ebooks) return 'E-BOOK TIDAK DITEMUKAN';
  if (Array.isArray(chapter.ebooks)) return chapter.ebooks[0]?.title || 'E-BOOK TIDAK DITEMUKAN';
  return chapter.ebooks.title || 'E-BOOK TIDAK DITEMUKAN';
};

const AdminChapterIndex = () => {
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const supabase = createSupabaseServerClient();

  const fetchChapters = useCallback(async () => {
    const { data, error } = await supabase
      .from('chapters')
      .select('id, title, slug, ebook_id, created_at, ebooks(id, title, category)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setChapters(data as ChapterItem[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  const handleDeleteChapter = async (chapterId: string) => {
    const confirmed = window.confirm('Hapus bab ini? Tindakan ini tidak bisa dibatalkan.');
    if (!confirmed) return;

    setDeletingId(chapterId);
    const { error } = await supabase.from('chapters').delete().eq('id', chapterId);
    if (!error) {
      setChapters((prev) => prev.filter((chapter) => chapter.id !== chapterId));
    }
    setDeletingId(null);
  };

  const rows = useMemo<ChapterRow[]>(() => {
    return chapters.map((chapter) => ({
      ...chapter,
      name: chapter.title,
    }));
  }, [chapters]);

  const columns = useMemo<ColumnDef<ChapterRow>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Judul Bab',
        cell: ({ row }) => (
          <div className="flex items-center gap-4 py-1">
            <div className="w-10 h-10 bg-zinc-100 rounded-xl overflow-hidden relative border border-zinc-200 flex items-center justify-center text-zinc-700">
              <BookOpenText size={18} />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-zinc-900 text-sm leading-none">
                {row.original.title}
              </p>
              <p className="text-zinc-500 text-[10px] font-semibold uppercase tracking-tighter italic">
                /{row.original.slug}
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'ebook',
        header: 'E-Book',
        accessorFn: (row) => getEbookTitle(row),
        cell: ({ row }) => (
          <Badge className="bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border-none font-bold text-[9px] uppercase px-3 py-1">
            {getEbookTitle(row.original)}
          </Badge>
        ),
      },
      {
        id: 'created_at',
        header: 'Dibuat',
        accessorFn: (row) => new Date(row.created_at).toISOString(),
        cell: ({ row }) => (
          <span className="text-xs text-zinc-600 font-medium">
            {new Date(row.original.created_at).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <Link href={`/chapter/create?chapterId=${row.original.id}`}>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-lg border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              >
                <Edit3 size={16} />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              disabled={deletingId === row.original.id}
              onClick={() => handleDeleteChapter(row.original.id)}
              className="h-9 w-9 rounded-lg border-zinc-300 text-zinc-700 hover:bg-zinc-100"
            >
              {deletingId === row.original.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            </Button>
          </div>
        ),
      },
    ],
    [deletingId]
  );

  return (
    <div className="min-h-screen ">
      <div className="w-full mx-auto ">

        <div className="flex justify-between items-center">
          <PageTitle title='Admin Chapter' description='Kelola semua bab untuk e-book' />
          <Link href="/chapter/create">
            <Button className='cursor-pointer bg-black hover:bg-zinc-800 text-white'>
              <Plus size={16} className="mr-2" /> Tambah Bab
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-none overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-black text-zinc-900 text-xl tracking-tight uppercase italic">Daftar Koleksi</h3>
            <p className="text-xs text-zinc-500 font-medium">Gunakan kolom search bawaan table untuk mencari bab.</p>
          </div>
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin mx-auto text-zinc-700 mb-4" size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Menghubungkan ke Database...</span>
            </div>
          ) : (
            <div className="px-8 pb-8">
              <DataTable columns={columns} data={rows} />
            </div>
          )}

          {rows.length === 0 && !loading && (
            <div className="p-20 text-center bg-slate-50/50">
              <p className="text-slate-400 font-bold italic text-sm">Belum ada chapter. Klik Tambah Bab untuk memulai.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChapterIndex;