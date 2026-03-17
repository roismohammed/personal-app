"use client";

import React, { useEffect, useMemo, useState, useCallback } from 'react';
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
  Lightbulb,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/client';
import { codeToHtml } from 'shiki';

// --- Types ---
type ModuleStatus = 'completed' | 'active' | 'idle';
type ModuleItem = {
  id: string;
  title: string;
  pages: number;
  status: ModuleStatus;
  content: string;
};

type Theme = 'light' | 'sepia' | 'dark';

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
  const [renderedHtml, setRenderedHtml] = useState('');

  useEffect(() => setMounted(true), []);

  // --- Fetch Data ---
  useEffect(() => {
    if (!ebookId) return;
    const fetchLearnData = async () => {
      setLoading(true);
      const supabase = createSupabaseServerClient();
      const [{ data: ebook }, { data: chapters }] = await Promise.all([
        supabase.from('ebooks').select('title, description').eq('id', ebookId).maybeSingle(),
        supabase.from('chapters').select('id, title, content, created_at').eq('ebook_id', ebookId).order('created_at', { ascending: true }),
      ]);

      if (ebook?.title) setEbookTitle(ebook.title);

      const mapped = (chapters || []).map((c: any, idx: number) => ({
        id: String(c.id),
        title: c.title || `Bab ${idx + 1}`,
        pages: Math.max(1, Math.ceil((c.content?.length || 0) / 500)),
        status: (idx === 0 ? 'active' : 'idle') as ModuleStatus,
        content: c.content || 'Konten kosong.',
      }));

      setModules(mapped.length ? mapped : [{ id: '1', title: 'Intro', pages: 1, status: 'active', content: ebook?.description || 'No content.' }]);
      setLoading(false);
    };
    fetchLearnData();
  }, [ebookId]);

  const currentModule = modules[activeTab];

  // --- Shiki Syntax Highlighter ---
  const highlightCode = async (code: string, lang: string) => {
    return await codeToHtml(code.trim(), {
      lang: lang || 'javascript',
      theme: 'github-dark'
    });
  };
  function decodeHtml(str: string) {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// AUTO DETECT HTML CODE dan bungkus jadi <pre><code>
function wrapCodeIfNeeded(content: string) {
  // kalau sudah ada <pre> skip
  if (content.includes("<pre")) return content;

  // detect kalau ada tag HTML
  if (content.includes("&lt;") || content.includes("<")) {
    return `
      <pre>
        <code class="language-html">
${content}
        </code>
      </pre>
    `;
  }

  return content;
}

  useEffect(() => {
    if (!currentModule?.content) return;

const processContent = async () => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(currentModule.content, 'text/html');

  const blocks = doc.querySelectorAll('pre');

  for (const block of Array.from(blocks)) {
    const raw = block.textContent || '';

    // decode HTML
    const code = raw
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");

    // detect language
    let lang =
      block.querySelector("code")?.className.replace("language-", "") ||
      (code.includes("<") ? "html" : "javascript");

    const highlighted = await codeToHtml(code, {
      lang,
      theme: "github-dark",
    });

    const wrapper = document.createElement("div");

    wrapper.className =
      "group relative my-8 rounded-xl overflow-hidden border border-zinc-800 bg-[#0d1117] shadow-xl";

    wrapper.setAttribute("data-code", code);

    wrapper.innerHTML = `
      <!-- HEADER -->
      <div class="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-zinc-800 text-xs text-zinc-400 font-mono">

        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-red-500 rounded-full"></span>
          <span class="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span class="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        <span class="uppercase tracking-widest text-[10px]">${lang}</span>

        <button class="copy-btn flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-white transition">
          Copy
        </button>
      </div>

      <!-- CODE -->
      <div class="p-4 overflow-x-auto text-sm leading-6">
        ${highlighted}
      </div>
    `;

    block.replaceWith(wrapper);
  }

  setRenderedHtml(doc.body.innerHTML);
};
    processContent();
  }, [currentModule]);

  // --- Copy Handler ---
  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    const btn = (e.target as HTMLElement).closest('.copy-btn') as HTMLButtonElement;
    if (!btn) return;

    const wrapper = btn.closest('[data-code]');
    const code = wrapper?.getAttribute('data-code') || '';

    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);

      const original = btn.innerText;
      btn.innerText = "Copied ✓";

      setTimeout(() => {
        btn.innerText = original;
      }, 1500);

    } catch {
      btn.innerText = "Failed";
    }
  }, []);

  const handleContentCopy = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    const anchorElement = anchorNode
      ? (anchorNode.nodeType === Node.ELEMENT_NODE
          ? (anchorNode as Element)
          : anchorNode.parentElement)
      : null;

    const isInsideCode = !!anchorElement?.closest('.group, pre, code, [data-code]');

    if (!isInsideCode) {
      e.preventDefault();
      selection?.removeAllRanges();
    }
  }, []);
  if (!mounted || loading) return <div className="h-screen flex items-center justify-center bg-zinc-950"><Loader2 className="animate-spin text-teal-500" /></div>;

  return (
    <div className={cn(
      "h-screen flex flex-col overflow-hidden transition-colors duration-500",
      theme === 'dark' ? "bg-zinc-950" : theme === 'sepia' ? "bg-[#ebe0c5]" : "bg-slate-50"
    )}>
      {/* Navbar Fixed Top */}
      <nav className={cn(
        "h-16 border-b flex items-center justify-between px-6 z-50 shrink-0",
        theme === 'dark' ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
      )}>
        <div className="flex items-center gap-4">
          <Link href="/ebook" className="text-zinc-500 hover:text-teal-600"><ChevronLeft size={20} /></Link>
          <h2 className="font-bold text-xs uppercase tracking-tighter truncate max-w-[200px]">{ebookTitle}</h2>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button onClick={() => setTheme('light')} className={cn("p-1.5 rounded", theme === 'light' && "bg-white shadow")}><Sun size={14} /></button>
            <button onClick={() => setTheme('sepia')} className={cn("p-1.5 rounded", theme === 'sepia' && "bg-[#f4ecd8] shadow")}><Coffee size={14} /></button>
            <button onClick={() => setTheme('dark')} className={cn("p-1.5 rounded", theme === 'dark' && "bg-zinc-700 shadow text-yellow-400")}><Moon size={14} /></button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR KIRI: Fixed height, internal scroll */}
        <aside className={cn(
          "w-72 hidden xl:flex flex-col border-r shrink-0 overflow-y-auto custom-scrollbar p-6",
          theme === 'dark' ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
        )}>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Daftar Isi</h3>
          <div className="space-y-2">
            {modules.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left text-xs font-semibold",
                  activeTab === i ? "bg-teal-600 text-white shadow-lg" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-md border border-current opacity-50">{i + 1}</span>
                {m.title}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT: Scrollable only here, lebar maksimal dengan gap 4px */}
        <main
          className="flex-1 overflow-y-auto scroll-smooth p-1 md:p-[4px]"
          onClick={handleCopy}
        >
          <div className={cn(
            "min-h-full mx-auto w-full transition-all duration-500 shadow-sm",
            theme === 'dark' ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200",
            "p-8 md:p-16 lg:p-24" // Padding dalam konten agar teks tidak nempel ke pinggir
          )}>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-8 opacity-40 text-[10px] font-bold uppercase tracking-widest">
                <Bookmark size={12} /> Bab {activeTab + 1} • {currentModule?.pages} Halaman
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 leading-tight">
                {currentModule?.title}
              </h1>

              <div
                className="prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0 select-none [&_p]:select-none [&_li]:select-none [&_span]:select-none [&_h1]:select-none [&_h2]:select-none [&_h3]:select-none [&_.copy-btn]:select-none [&_.group]:select-text [&_pre]:select-text [&_code]:select-text"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                onCopy={handleContentCopy}
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />

              <div className="mt-20 pt-10 border-t border-zinc-800 flex justify-between">
                <Button variant="ghost" disabled={activeTab === 0} onClick={() => setActiveTab(a => a - 1)}>
                  <ChevronLeft className="mr-2" /> Prev
                </Button>
                <Button className="bg-teal-600" disabled={activeTab === modules.length - 1} onClick={() => setActiveTab(a => a + 1)}>
                  Next <ChevronRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* SIDEBAR KANAN: Progres & Insight */}
        <aside className={cn(
          "w-72 hidden lg:flex flex-col border-l shrink-0 p-6 overflow-y-auto transition-colors",
          theme === 'dark' ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
        )}>
          <div className="space-y-8">
            <div className="p-4 rounded-xl bg-teal-600/5 border border-teal-500/20">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2">Progres</h4>
              <div className="text-2xl font-black text-teal-600 mb-3">{Math.round(((activeTab + 1) / modules.length) * 100)}%</div>
              <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 transition-all" style={{ width: `${((activeTab + 1) / modules.length) * 100}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-3 text-zinc-400 font-bold text-[10px] uppercase">
                <Lightbulb size={14} /> Insight
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-500 italic">"Belajar bertahap memberikan hasil lebih konsisten daripada belajar cepat tanpa struktur."</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}