"use client";

import React, { useEffect, useState } from 'react';
import { 
  Plus, Book, Users, BarChart3, MoreVertical, 
  Edit3, Trash2, Search, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};

const AdminDashboard = () => {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient()
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
    <div className="min-h-screen">
      <div className="mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl text-zinc-900 font-bold ">Admin Ebooks</h1>
            <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">Management System • RoisDev</p>
          </div>
          <div className="flex gap-3">
           <Link href={'/ebooks/create'}>
             <Button className="rounded-full bg-teal-700 hover:bg-teal-800 h-12 px-6 font-bold shadow-lg shadow-teal-900/20 transition-all active:scale-95">
              <Plus size={18} className="mr-2" /> Tambah E-Book
            </Button>
           </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total E-Book" value={ebooks.length.toString()} icon={Book} color="text-blue-600" bg="bg-blue-50" />
          <StatCard label="Total Pembaca" value="1,284" icon={Users} color="text-teal-600" bg="bg-teal-50" />
          {/* <StatCard label="Bab Terbit" value="-" icon={BarChart3, color: "text-purple-600", bg: "bg-purple-50" } /> */}
          <StatCard label="Rating" value="4.9" icon={BarChart3} color="text-amber-600" bg="bg-amber-50" />
        </div>

        {/* Main Management Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-none overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-black text-zinc-900 text-xl tracking-tight">Daftar Materi E-Book</h3>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input className="pl-10 rounded-full bg-slate-50 border-none h-10 text-sm" placeholder="Cari materi..." />
            </div>
          </div>

          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="font-bold text-zinc-500 uppercase text-[10px] tracking-widest pl-8">Cover & Judul</TableHead>
                <TableHead className="font-bold text-zinc-500 uppercase text-[10px] tracking-widest">Kategori</TableHead>
                <TableHead className="font-bold text-zinc-500 uppercase text-[10px] tracking-widest">Status</TableHead>
                <TableHead className="font-bold text-zinc-500 uppercase text-[10px] tracking-widest text-right pr-8">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <Loader2 className="animate-spin mx-auto text-teal-700" size={32} />
                    <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">Memuat Data...</p>
                  </TableCell>
                </TableRow>
              ) : ebooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-slate-400 italic">
                    Belum ada e-book yang diterbitkan.
                  </TableCell>
                </TableRow>
              ) : (
                ebooks.map((ebook) => (
                  <TableRow key={ebook.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                    <TableCell className="pl-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-100 flex items-center justify-center">
                          {ebook.cover_url ? (
                            <img src={ebook.cover} alt={ebook.title} className="object-cover w-full h-full" />
                          ) : (
                            <Book className="text-slate-300" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-black text-zinc-900 text-sm leading-tight">{ebook.title}</p>
                          <p className="text-slate-400 text-[10px] font-medium uppercase tracking-tighter mt-1 italic">
                            /{ebook.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-50 border-none font-bold text-[9px] uppercase">
                        {ebook.category || 'General'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-zinc-700">Published</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Link href={`/ebooks/edit/${ebook.id}`}>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all">
                            <Edit3 size={16} />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                          onClick={() => {/* Tambahkan fungsi delete di sini */}}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

// Komponen Kecil untuk Statistik
const StatCard = ({ label, value, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
    <div className={cn("p-4 rounded-2xl", bg, color)}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-zinc-900">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;