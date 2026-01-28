"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Download, 
  Type, 
  ZoomIn, 
  ZoomOut,
  ChevronRight,
  CheckCircle2,
  Bookmark,
  Moon,
  Sun,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

const modules = [
  { title: "Pengenalan Ekosistem Next.js 15", pages: 5, status: "completed", content: "Next.js 15 memperkenalkan banyak perubahan fundamental terutama pada penggunaan App Router dan efisiensi caching. Dalam ekosistem modern saat ini, pemilihan framework yang tepat sangat krusial untuk skalabilitas proyek." },
  { title: "Setup Project & Tailwind v4", pages: 12, status: "active", content: "Menggunakan Tailwind CSS v4 memberikan kita fleksibilitas lebih dalam mengelola variabel CSS tanpa harus mengandalkan konfigurasi JavaScript yang berat. Dengan pendekatan CSS-first, performa build menjadi jauh lebih cepat." },
  { title: "Server Actions & Revalidation", pages: 8, status: "locked", content: "Server Actions memungkinkan kita untuk menangani mutasi data secara langsung tanpa harus membuat API endpoint manual. Ini menyederhanakan arsitektur aplikasi secara signifikan." },
  { title: "Deployment ke Vercel Edge", pages: 10, status: "locked", content: "Edge Runtime memungkinkan kode Anda berjalan di lokasi yang paling dekat dengan pengguna, mengurangi latensi dan meningkatkan responsivitas aplikasi secara global." },
];

type Theme = 'light' | 'sepia' | 'dark';

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const progress = ((activeTab + 1) / modules.length) * 100;

  const themeClasses = {
    light: "bg-white text-slate-600 border-slate-100",
    sepia: "bg-[#f4ecd8] text-[#5b4636] border-[#e1d3b7]",
    dark: "bg-zinc-900 text-zinc-400 border-zinc-800"
  };

  if (!mounted) return null;

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-500",
      theme === 'dark' ? "bg-zinc-950" : theme === 'sepia' ? "bg-[#ebe0c5]" : "bg-slate-50"
    )}>
      {/* Reader Header */}
      <nav className={cn(
        "h-20 border-b flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50 backdrop-blur-md transition-colors duration-500",
        theme === 'dark' ? "bg-zinc-950/80 border-zinc-800" : "bg-white/80 border-slate-200"
      )}>
        <div className="flex items-center gap-4">
          <Link href="/ebook" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] hidden md:inline">Library</span>
          </Link>
          <div className="h-4 w-px bg-slate-200 hidden md:block" />
          <h2 className={cn(
            "font-black text-[10px] uppercase tracking-widest truncate max-w-[120px] md:max-w-none",
            theme === 'dark' ? "text-zinc-200" : "text-zinc-900"
          )}>
            Mastering Next.js 15
          </h2>
        </div>
        
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-full border border-slate-200 dark:border-zinc-700">
            <button onClick={() => setTheme('light')} className={cn("p-1.5 rounded-full transition-all", theme === 'light' ? "bg-white shadow-sm text-blue-600" : "text-slate-400")}><Sun size={14} /></button>
            <button onClick={() => setTheme('sepia')} className={cn("p-1.5 rounded-full transition-all", theme === 'sepia' ? "bg-[#f4ecd8] shadow-sm text-[#5b4636]" : "text-slate-400")}><Coffee size={14} /></button>
            <button onClick={() => setTheme('dark')} className={cn("p-1.5 rounded-full transition-all", theme === 'dark' ? "bg-zinc-700 shadow-sm text-yellow-400" : "text-slate-400")}><Moon size={14} /></button>
          </div>

          <div className="flex items-center border rounded-full px-1 bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700">
            <Button variant="ghost" size="icon" onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="h-7 w-7 rounded-full"><ZoomOut size={14} /></Button>
            <div className="px-2 text-[10px] font-bold text-slate-400"><Type size={12} /></div>
            <Button variant="ghost" size="icon" onClick={() => setFontSize(Math.min(26, fontSize + 2))} className="h-7 w-7 rounded-full"><ZoomIn size={14} /></Button>
          </div>

          <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase tracking-widest h-8 px-4">
            <Download size={14} className="mr-2" /> PDF
          </Button>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row flex-1 w-full mx-auto">
        <div className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col items-center">
          <div className={cn(
            "w-full max-w-8xl shadow-none rounded-md md:rounded-xl border p-8 md:p-16 lg:p-20 min-h-[85vh] flex flex-col transition-all duration-500",
            themeClasses[theme]
          )}>
            <article className="flex-1 w-full">
              <div className="mb-12 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-2">
                  <Bookmark size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bab {activeTab + 1}</span>
                </div>
                <span className="text-[10px] font-bold uppercase italic tracking-widest">Halaman {modules[activeTab].pages} dari 40</span>
              </div>
              
              <h1 className={cn(
                "text-4xl md:text-7xl font-black tracking-tighter mb-12 leading-[1.05] w-full",
                theme === 'dark' ? "text-white" : "text-zinc-900"
              )}>
                {modules[activeTab].title}
              </h1>

              <div 
                className="leading-relaxed space-y-10 transition-all duration-300 w-full"
                style={{ fontSize: `${fontSize}px` }}
              >
                {/* Konten dilebarkan tanpa max-w-none tambahan */}
                <div className="w-full">
                    <p className="mb-8">{modules[activeTab].content}</p>
                    <div className={cn(
                    "p-10 border-l-8 rounded-r-[2.5rem] italic font-semibold text-xl md:text-2xl my-12",
                    theme === 'dark' ? "bg-zinc-800 border-blue-500 text-zinc-200" : theme === 'sepia' ? "bg-[#ede3cc] border-[#5b4636]" : "bg-slate-50 border-blue-600 text-slate-800"
                    )}>
                    "Kunci dari performa web bukan hanya pada seberapa cepat data diambil, tapi seberapa efisien data tersebut dirender ke layar pengguna."
                    </div>
                    <p className="mb-8">
                    Mari kita mulai dengan melakukan inisialisasi project menggunakan CLI terbaru dan melakukan migrasi dari versi sebelumnya jika Anda memiliki codebase lama. Pastikan semua dependensi sudah terupdate untuk menghindari konflik versi pada React 19.
                    </p>
                    <p>
                    Struktur folder pada Next.js 15 memberikan fleksibilitas tinggi. Anda dapat mengorganisir komponen, lib, dan hooks di dalam direktori <code>src</code> atau langsung di root proyek. Penggunaan sistem metadata yang baru juga memudahkan optimasi SEO secara dinamis di level page maupun layout.
                    </p>
                </div>
              </div>
            </article>

            {/* Pagination yang mengikuti lebar baru */}
            <div className="mt-24 pt-10 border-t flex items-center justify-between border-current opacity-20 hover:opacity-100 transition-opacity w-full">
              <Button 
                variant="ghost" 
                disabled={activeTab === 0}
                onClick={() => setActiveTab(activeTab - 1)}
                className="rounded-full gap-2 font-bold uppercase text-[11px] tracking-widest h-12 px-6"
              >
                <ChevronLeft size={18} /> Prev
              </Button>
              <Button 
                onClick={() => activeTab < modules.length - 1 && setActiveTab(activeTab + 1)}
                className="rounded-full gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[11px] tracking-[0.2em] px-10 h-14 shadow-xl shadow-blue-500/20"
              >
                Next Chapter <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>


        <aside className={cn(
          "w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l p-8 lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 transition-colors duration-500",
          theme === 'dark' ? "bg-zinc-950 border-zinc-800" : "bg-white border-slate-200"
        )}>

          <div className="mb-10 p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <h3 className={cn("font-black uppercase tracking-widest text-[10px]", theme === 'dark' ? "text-zinc-500" : "text-zinc-900")}>Progres Membaca</h3>
              <span className="text-[10px] font-black text-blue-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>

          <h3 className="font-black text-zinc-400 uppercase tracking-[0.3em] text-[10px] mb-8 px-2">Isi E-Book</h3>
          
          <div className="space-y-3">
            {modules.map((item, idx) => {
              const isActive = activeTab === idx;
              const isLocked = item.status === 'locked';
              
              return (
                <button
                  key={idx}
                  disabled={isLocked}
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-300 text-left group",
                    isActive 
                      ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 translate-x-1" 
                      : isLocked 
                        ? "opacity-30 cursor-not-allowed bg-transparent border-transparent"
                        : theme === 'dark' ? "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700" : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-colors",
                      isActive ? "bg-blue-500 border-blue-400 text-white" : "bg-slate-100 dark:bg-zinc-800 border-slate-100 dark:border-zinc-700 text-slate-400"
                    )}>
                      {item.status === 'completed' ? <CheckCircle2 size={14} /> : idx + 1}
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-bold text-xs tracking-tight",
                        isActive ? "text-white" : theme === 'dark' ? "text-zinc-200" : "text-zinc-800"
                      )}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  {isActive && <ChevronRight size={14} />}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}