"use client";

import React, { useEffect, useState } from 'react';
import { 
  Plus, Book, Users, BarChart3, 
  Edit3, Trash2, Search, Loader2, FilePlus2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/client';

const AdminEbooksIndex = () => {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseServerClient(); //

  useEffect(() => {
    const fetchEbooks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setEbooks(data);
      }
      setLoading(false);
    };

    fetchEbooks();
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="w-full mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-none">
          <div>
            <h1 className="text-3xl text-zinc-900 font-black tracking-tighter italic uppercase">Admin E-Books</h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Management System • AMATAR Project</p>
          </div>
          <Link href="/ebooks/create">
            <Button className="rounded-full bg-teal-700 hover:bg-teal-800 h-14 px-8 font-black shadow-xl shadow-teal-900/20 transition-all active:scale-95">
              <Plus size={20} className="mr-2" /> TAMBAH E-BOOK
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-none overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-black text-zinc-900 text-xl tracking-tight uppercase italic">Daftar Koleksi</h3>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input className="pl-12 rounded-full bg-slate-50 border-none h-12 text-sm font-medium" placeholder="Cari judul atau kategori..." />
            </div>
          </div>

          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="font-black text-teal-700 uppercase text-[10px] tracking-widest pl-10 h-14">Detail Buku</TableHead>
                <TableHead className="font-black text-teal-700 uppercase text-[10px] tracking-widest h-14">Kategori</TableHead>
                <TableHead className="font-black text-teal-700 uppercase text-[10px] tracking-widest h-14 text-center">Aksi Konten</TableHead>
                <TableHead className="font-black text-teal-700 uppercase text-[10px] tracking-widest h-14 text-right pr-10">Pengaturan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-teal-700 mb-4" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Menghubungkan ke Database...</span>
                  </TableCell>
                </TableRow>
              ) : ebooks.map((ebook) => (
                <TableRow key={ebook.id} className="border-slate-50 hover:bg-teal-50/20 transition-all group">
                  <TableCell className="pl-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-20 bg-slate-100 rounded-xl overflow-hidden relative shadow-sm border border-white">
                        <img src={ebook.cover_url || "/placeholder.jpg"} className="object-cover w-full h-full" alt="" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-zinc-900 text-base tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                          {ebook.title}
                        </p>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter italic">ID: {ebook.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-none font-black text-[9px] uppercase px-3 py-1">
                      {ebook.category || 'GENERAL'}
                    </Badge>
                  </TableCell>
                  
                  {/* TOMBOL TAMBAH CHAPTER */}
                  <TableCell className="text-center">
                    <Link href={`/chapters/create?ebookId=${ebook.id}`}>
                      <Button variant="outline" className="rounded-full border-teal-200 text-teal-700 hover:bg-teal-700 hover:text-white font-black text-[10px] uppercase gap-2 shadow-sm transition-all active:scale-95 px-5">
                        <FilePlus2 size={14} /> Tambah Bab
                      </Button>
                    </Link>
                  </TableCell>

                  <TableCell className="text-right pr-10">
                    <div className="flex justify-end gap-2">
                      <Link href={`/ebooks/edit/${ebook.id}`}>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-amber-50 hover:text-amber-600 border border-transparent hover:border-amber-100 transition-all">
                          <Edit3 size={18} />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 transition-all">
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {ebooks.length === 0 && !loading && (
            <div className="p-20 text-center bg-slate-50/50">
              <p className="text-slate-400 font-bold italic text-sm">Belum ada e-book. Klik "Tambah E-Book" untuk memulai.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEbooksIndex;