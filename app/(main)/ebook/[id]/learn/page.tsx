"use client";

import React, { useEffect, useMemo, useState } from 'react';
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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/client';

type ModuleStatus = 'completed' | 'active' | 'idle';
type ModuleItem = {
  id: string;
  title: string;
  pages: number;
  status: ModuleStatus;
  content: string;
};

type ChapterRow = {
  id: string | number;
  title: string | null;
  content: string | null;
  created_at: string | null;
};

type Theme = 'light' | 'sepia' | 'dark';

function estimatePages(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, ' ').trim();
  if (!plainText) return 1;
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 120));
}

function isHtmlString(value: string): boolean {
  return /<[^>]+>/.test(value);
}

function enhanceCodeBlocks(html: string): string {
  return html.replace(
    /<pre(?:\s[^>]*)?>\s*(?:<code([^>]*)>)?([\s\S]*?)(?:<\/code>)?\s*<\/pre>/gi,
    (_match, codeAttrs, rawCodeContent) => {

      const decoded = rawCodeContent
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");

      const languageFromClass =
        /language-([\w-]+)/i.exec(codeAttrs || "")?.[1] || "code";

      const language = languageFromClass.toUpperCase();

      return `
<div class="code-editor my-8 rounded-xl overflow-hidden border border-zinc-700 bg-[#1e1e1e] not-prose">

  <div class="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-zinc-700">
    <span class="text-xs text-zinc-400 font-semibold tracking-widest">${language}</span>
    <button class="copy-code-btn text-xs bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded text-white">
      Copy
    </button>
  </div>

  <pre class="overflow-x-auto p-5 text-sm leading-6 text-zinc-100 font-mono">
<code>${decoded}</code>
  </pre>

</div>
`;
    }
  );
}

export default function LearnPage() {
  const params = useParams<{ id: string }>();
  const ebookId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [activeTab, setActiveTab] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ebookTitle, setEbookTitle] = useState('Ebook Reader');
  const [modules, setModules] = useState<ModuleItem[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!ebookId) {
      setLoading(false);
      return;
    }

    const fetchLearnData = async () => {
      setLoading(true);
      const supabase = createSupabaseServerClient();

      const [{ data: ebook }, { data: chapters, error: chapterError }] = await Promise.all([
        supabase
          .from('ebooks')
          .select('title, description')
          .eq('id', ebookId)
          .maybeSingle(),
        supabase
          .from('chapters')
          .select('id, title, content, created_at')
          .eq('ebook_id', ebookId)
          .order('created_at', { ascending: true }),
      ]);

      if (ebook?.title) {
        setEbookTitle(ebook.title);
      }

      if (chapterError) {
        setModules([
          {
            id: 'fallback-1',
            title: 'Pengantar Ebook',
            pages: 1,
            status: 'active',
            content:
              'Konten chapter belum tersedia. Silakan tambahkan chapter di halaman admin agar materi dapat ditampilkan di reader.',
          },
        ]);
        setActiveTab(0);
        setLoading(false);
        return;
      }

      const chapterRows = (chapters || []) as ChapterRow[];
      const mappedChapters: ModuleItem[] = chapterRows.map((chapter, idx) => ({
        id: String(chapter.id),
        title: chapter.title || `Bab ${idx + 1}`,
        pages: estimatePages(chapter.content || ''),
        status: idx === 0 ? 'active' : 'idle',
        content:
          chapter.content ||
          'Konten untuk bab ini belum diisi. Silakan lengkapi chapter melalui dashboard admin.',
      }));

      if (mappedChapters.length === 0) {
        setModules([
          {
            id: 'fallback-1',
            title: 'Pengantar Ebook',
            pages: 1,
            status: 'active',
            content:
              ebook?.description ||
              'Ebook ini belum memiliki chapter. Tambahkan chapter terlebih dahulu agar pembelajaran dapat dimulai.',
          },
        ]);
      } else {
        setModules(mappedChapters);
      }

      setActiveTab(0);
      setLoading(false);
    };

    fetchLearnData();
  }, [ebookId]);

  const currentModule = useMemo(() => {
    if (!modules.length) return null;
    return modules[Math.min(activeTab, modules.length - 1)] || modules[0];
  }, [modules, activeTab]);

  const progress = modules.length ? ((Math.min(activeTab, modules.length - 1) + 1) / modules.length) * 100 : 0;

  const handleContentClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const copyBtn = target.closest('.copy-code-btn') as HTMLButtonElement | null;
    if (!copyBtn) return;

    const block = copyBtn.closest('.vscode-block');
    const codeElement = block?.querySelector('pre code');
    const codeText = codeElement?.textContent || '';
    if (!codeText) return;

    try {
      await navigator.clipboard.writeText(codeText);
      const initial = copyBtn.textContent;
      copyBtn.textContent = 'Copied';
      window.setTimeout(() => {
        copyBtn.textContent = initial || 'Copy';
      }, 1200);
    } catch {
      copyBtn.textContent = 'Failed';
      window.setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 1200);
    }
  };

  const themeClasses = {
    light: "bg-white text-zinc-700 border-zinc-200",
    sepia: "bg-[#f4ecd8] text-[#5b4636] border-[#e1d3b7]",
    dark: "bg-zinc-900 text-zinc-300 border-zinc-800"
  };

  if (!mounted) return null;

  if (loading || !currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="inline-flex items-center gap-3 text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Memuat materi ebook...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-500",
      theme === 'dark' ? "bg-zinc-950" : theme === 'sepia' ? "bg-[#ebe0c5]" : "bg-slate-50"
    )}>
      {/* Reader Header */}
      <nav className={cn(
        "h-20 border-b flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50 backdrop-blur-md transition-colors duration-500",
        theme === 'dark' ? "bg-zinc-950/90 border-zinc-800" : "bg-white/90 border-zinc-200"
      )}>
        <div className="flex items-center gap-4">
          <Link href="/ebook" className="flex items-center gap-2 text-zinc-500 hover:text-teal-700 transition-all group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] hidden md:inline">Library</span>
          </Link>
          <div className="h-4 w-px bg-slate-200 hidden md:block" />
          <h2 className={cn(
            "font-black text-[10px] uppercase tracking-widest truncate max-w-[120px] md:max-w-none",
            theme === 'dark' ? "text-zinc-200" : "text-zinc-900"
          )}>
            {ebookTitle}
          </h2>
        </div>
        
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-full border border-zinc-200 dark:border-zinc-700">
            <button onClick={() => setTheme('light')} className={cn("p-1.5 rounded-full transition-all", theme === 'light' ? "bg-white shadow-sm text-teal-700" : "text-zinc-400")}><Sun size={14} /></button>
            <button onClick={() => setTheme('sepia')} className={cn("p-1.5 rounded-full transition-all", theme === 'sepia' ? "bg-[#f4ecd8] shadow-sm text-[#5b4636]" : "text-slate-400")}><Coffee size={14} /></button>
            <button onClick={() => setTheme('dark')} className={cn("p-1.5 rounded-full transition-all", theme === 'dark' ? "bg-zinc-700 shadow-sm text-yellow-400" : "text-slate-400")}><Moon size={14} /></button>
          </div>

          <div className="flex items-center border rounded-full px-1 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
            <Button variant="ghost" size="icon" onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="h-7 w-7 rounded-full"><ZoomOut size={14} /></Button>
            <div className="px-2 text-[10px] font-bold text-zinc-400"><Type size={12} /></div>
            <Button variant="ghost" size="icon" onClick={() => setFontSize(Math.min(26, fontSize + 2))} className="h-7 w-7 rounded-full"><ZoomIn size={14} /></Button>
          </div>

          <Button size="sm" className="rounded-full bg-teal-700 hover:bg-teal-600 text-white font-semibold text-[10px] uppercase tracking-widest h-8 px-4">
            <Download size={14} className="mr-2" /> PDF
          </Button>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row flex-1 w-full mx-auto">
        <div className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col items-center">
          <div className={cn(
            "w-full max-w-5xl shadow-none rounded-xl border p-8 md:p-12 lg:p-14 min-h-[80vh] flex flex-col transition-all duration-500",
            themeClasses[theme]
          )}>
            <article className="flex-1 w-full">
              <div className="mb-10 flex items-center justify-between opacity-70">
                <div className="flex items-center gap-2">
                  <Bookmark size={14} className="text-teal-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bab {activeTab + 1}</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest">Halaman {currentModule.pages}</span>
              </div>
              
              <h1 className={cn(
                "text-3xl md:text-5xl font-bold tracking-tight mb-10 leading-tight w-full",
                theme === 'dark' ? "text-white" : "text-zinc-900"
              )}>
                {currentModule.title}
              </h1>

              <div 
                className="leading-relaxed space-y-10 transition-all duration-300 w-full"
                style={{ fontSize: `${fontSize}px` }}
              >
                <div className="w-full">
                  {isHtmlString(currentModule.content) ? (
                    <div
                      className="prose prose-zinc dark:prose-invert max-w-none mb-8"
                      style={{ fontSize: `${fontSize}px` }}
                      onClick={handleContentClick}
                      dangerouslySetInnerHTML={{ __html: enhanceCodeBlocks(currentModule.content) }}
                    />
                  ) : (
                    <p className="mb-8 leading-relaxed">{currentModule.content}</p>
                  )}

                    <div className={cn(
                  "p-8 border-l-4 rounded-r-2xl font-medium text-lg md:text-xl my-10",
                  theme === 'dark' ? "bg-zinc-800 border-teal-500 text-zinc-200" : theme === 'sepia' ? "bg-[#ede3cc] border-[#5b4636]" : "bg-zinc-50 border-teal-600 text-zinc-800"
                    )}>
                    "Belajar bertahap akan memberi hasil lebih konsisten daripada belajar cepat tanpa struktur."
                    </div>
                    <p className="mb-8">
                    Fokus pada satu bab terlebih dulu, selesaikan, lalu lanjut ke bab berikutnya agar pemahaman lebih kuat.
                    </p>
                    <p>
                    Gunakan panel isi ebook di sebelah kanan untuk berpindah chapter sesuai kebutuhan Anda.
                    </p>
                </div>
              </div>
            </article>

            {/* Pagination yang mengikuti lebar baru */}
            <div className="mt-16 pt-8 border-t flex items-center justify-between border-current opacity-60 transition-opacity w-full">
              <Button 
                variant="ghost" 
                disabled={activeTab === 0}
                onClick={() => setActiveTab(activeTab - 1)}
                className="rounded-full gap-2 font-semibold uppercase text-[11px] tracking-widest h-11 px-6"
              >
                <ChevronLeft size={18} /> Prev
              </Button>
              <Button 
                disabled={activeTab >= modules.length - 1}
                onClick={() => activeTab < modules.length - 1 && setActiveTab(activeTab + 1)}
                className="rounded-full gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold uppercase text-[11px] tracking-widest px-8 h-11 shadow-none"
              >
                Next Chapter <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>


        <aside className={cn(
          "w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l p-8 lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 transition-colors duration-500 flex flex-col",
          theme === 'dark' ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
        )}>

          <div className="mb-8 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <div className="flex justify-between items-end mb-4">
              <h3 className={cn("font-black uppercase tracking-widest text-[10px]", theme === 'dark' ? "text-zinc-500" : "text-zinc-900")}>Progres Membaca</h3>
              <span className="text-[10px] font-black text-teal-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-700 transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>

          <h3 className="font-black text-zinc-400 uppercase tracking-[0.3em] text-[10px] mb-8 px-2">Isi E-Book</h3>
          
          <div className="space-y-3 lg:overflow-y-auto lg:max-h-[calc(100vh-280px)] lg:pr-1">
            {modules.map((item, idx) => {
              const isActive = activeTab === idx;
              const isCompleted = idx < activeTab;
              const isCurrent = idx === activeTab;
              const itemState: ModuleStatus = isCurrent ? 'active' : isCompleted ? 'completed' : 'idle';
              
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-300 text-left group",
                    isActive
                      ? "bg-teal-700 border-teal-700 text-white shadow-none" 
                      : theme === 'dark' ? "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700" : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-colors",
                      isActive ? "bg-teal-600 border-teal-500 text-white" : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500"
                    )}>
                      {itemState === 'completed' ? <CheckCircle2 size={14} /> : idx + 1}
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-bold text-xs tracking-tight",
                        isActive ? "text-white" : theme === 'dark' ? "text-zinc-200" : "text-zinc-800"
                      )}>
                        {item.title}
                      </h4>
                      <p className={cn("text-[10px] mt-1", isActive ? "text-teal-100" : "text-zinc-400")}>~ {item.pages} halaman</p>
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
