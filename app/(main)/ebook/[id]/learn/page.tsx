"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Moon,
  Sun,
  Coffee,
  Loader2,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/client';
import { codeToHtml } from 'shiki';
import DOMPurify from 'dompurify';

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

const LANGUAGE_ALIAS: Record<string, string> = {
  js: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  html: 'html',
  xml: 'html',
  markup: 'html',
  css: 'css',
  scss: 'scss',
  json: 'json',
  sh: 'bash',
  shell: 'bash',
  bash: 'bash',
  py: 'python',
  python: 'python',
  sql: 'sql',
};

const FALLBACK_LANGUAGE = 'plaintext';

const normalizeLanguage = (input?: string) => {
  if (!input) return FALLBACK_LANGUAGE;
  const cleaned = input.toLowerCase().replace(/[^a-z0-9#+-]/g, '');
  if (!cleaned) return FALLBACK_LANGUAGE;
  return LANGUAGE_ALIAS[cleaned] || cleaned;
};

const detectLanguage = (pre: Element, code: string) => {
  const codeElement = pre.querySelector('code');
  const candidates = [
    pre.getAttribute('data-language'),
    pre.getAttribute('data-lang'),
    pre.getAttribute('lang'),
    codeElement?.getAttribute('data-language'),
    codeElement?.getAttribute('data-lang'),
    codeElement?.getAttribute('lang'),
    ...pre.className.split(/\s+/),
    ...(codeElement?.className?.split(/\s+/) || []),
  ].filter(Boolean) as string[];

  for (const item of candidates) {
    const fromClass = item.match(/(?:language|lang)-([a-z0-9#+-]+)/i)?.[1] || item;
    const lang = normalizeLanguage(fromClass);
    if (lang !== FALLBACK_LANGUAGE) return lang;
  }

  if (code.includes('<') && code.includes('>')) return 'html';
  return 'javascript';
};

const looksLikeInlineCodeBlock = (codeText: string) => {
  return codeText.includes('\n') || /[{};<>=]/.test(codeText);
};

const ensurePreCodeFromTinyMce = (doc: Document) => {
  const inlineCodeCandidates = doc.querySelectorAll('p > code, li > code, div > code');

  for (const codeNode of Array.from(inlineCodeCandidates)) {
    if (codeNode.closest('pre')) continue;
    const codeText = codeNode.textContent?.trim() || '';
    if (!codeText || !looksLikeInlineCodeBlock(codeText)) continue;

    const pre = doc.createElement('pre');
    const code = doc.createElement('code');
    code.className = codeNode.className || 'language-javascript';
    code.textContent = codeText;
    pre.appendChild(code);

    const parent = codeNode.parentElement;
    if (parent && parent.childElementCount === 1) {
      parent.replaceWith(pre);
    } else {
      codeNode.replaceWith(pre);
    }
  }

  const standaloneCode = doc.querySelectorAll('code[data-language], code.language-javascript, code.language-typescript, code.language-html');
  for (const node of Array.from(standaloneCode)) {
    if (node.closest('pre')) continue;
    const pre = doc.createElement('pre');
    node.replaceWith(pre);
    pre.appendChild(node);
  }
};

export default function LearnPage() {
  const params = useParams<{ id: string }>();
  const ebookIdentifier = Array.isArray(params?.id) ? params.id[0] : params?.id;

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
    if (!ebookIdentifier) return;
    const fetchLearnData = async () => {
      setLoading(true);
      const supabase = createSupabaseServerClient();
      const { data: ebookBySlug } = await supabase
        .from('ebooks')
        .select('id, title, description')
        .eq('slug', ebookIdentifier)
        .maybeSingle();

      const ebook = ebookBySlug || (await supabase
        .from('ebooks')
        .select('id, title, description')
        .eq('id', ebookIdentifier)
        .maybeSingle()).data;

      const resolvedEbookId = ebook?.id || ebookIdentifier;

      const { data: chapters } = await supabase
        .from('chapters')
        .select('id, title, content, created_at')
        .eq('ebook_id', resolvedEbookId)
        .order('created_at', { ascending: true });

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
  }, [ebookIdentifier]);

  const currentModule = modules[activeTab];

  useEffect(() => {
    let cancelled = false;

    const processContent = async () => {
      if (!currentModule?.content) {
        if (!cancelled) setRenderedHtml('');
        return;
      }

      const sanitized = DOMPurify.sanitize(currentModule.content, {
        USE_PROFILES: { html: true },
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus'],
      });

      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitized, 'text/html');

      ensurePreCodeFromTinyMce(doc);

      const blocks = Array.from(doc.querySelectorAll('pre'));
      for (const block of blocks) {
        const code = block.textContent?.trim() || '';
        if (!code) continue;

        const lang = detectLanguage(block, code);

        let highlighted = '';
        try {
          highlighted = await codeToHtml(code, {
            lang,
            theme: 'github-dark',
          });
        } catch {
          highlighted = await codeToHtml(code, {
            lang: FALLBACK_LANGUAGE,
            theme: 'github-dark',
          });
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'group relative my-8 rounded-xl overflow-hidden border border-zinc-800 bg-[#0d1117] shadow-xl';
        wrapper.setAttribute('data-code', code);

        const header = document.createElement('div');
        header.className = 'flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-zinc-800 text-xs text-zinc-400 font-mono';

        const dots = document.createElement('div');
        dots.className = 'flex items-center gap-2';
        dots.innerHTML = '<span class="w-3 h-3 bg-red-500 rounded-full"></span><span class="w-3 h-3 bg-yellow-500 rounded-full"></span><span class="w-3 h-3 bg-green-500 rounded-full"></span>';

        const languageLabel = document.createElement('span');
        languageLabel.className = 'uppercase tracking-widest text-[10px]';
        languageLabel.textContent = lang;

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-white transition';
        copyButton.type = 'button';
        copyButton.textContent = 'Copy';

        header.appendChild(dots);
        header.appendChild(languageLabel);
        header.appendChild(copyButton);

        const content = document.createElement('div');
        content.className = 'p-4 overflow-x-auto text-sm leading-6';
        content.innerHTML = highlighted;

        wrapper.appendChild(header);
        wrapper.appendChild(content);
        block.replaceWith(wrapper);
      }

      if (!cancelled) {
        setRenderedHtml(doc.body.innerHTML);
      }
    };

    processContent();

    return () => {
      cancelled = true;
    };
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
          <Link
            href="/ebook"
            className={cn(
              "transition-colors",
              theme === 'dark' ? "text-gray-200/80 hover:text-teal-400" : "text-zinc-500 hover:text-teal-600"
            )}
          >
            <ChevronLeft size={20} />
          </Link>
          <h2
            className={cn(
              "font-bold text-xs uppercase tracking-tighter truncate max-w-[200px]",
              theme === 'dark' ? "text-gray-200" : "text-zinc-900"
            )}
          >
            {ebookTitle}
          </h2>
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
          "w-72 hidden xl:flex flex-col border-r shrink-0 overflow-y-auto p-6 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full",
          theme === 'dark'
            ? "bg-zinc-950 border-zinc-800 [scrollbar-color:#3f3f46_#09090b] [&::-webkit-scrollbar-track]:bg-zinc-950 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600"
            : "bg-white border-zinc-200 [scrollbar-color:#cbd5e1_#f8fafc] [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb:hover]:bg-slate-400"
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
          className={cn(
            "flex-1 overflow-y-auto scroll-smooth p-1 md:p-[4px] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full",
            theme === 'dark'
              ? "[scrollbar-color:#3f3f46_#09090b] [&::-webkit-scrollbar-track]:bg-zinc-950 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600"
              : "[scrollbar-color:#cbd5e1_#f8fafc] [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb:hover]:bg-slate-400"
          )}
          onClick={handleCopy}
        >
          <div className={cn(
            "min-h-full mx-auto w-full transition-all duration-500 shadow-sm",
            theme === 'dark' ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200",
            "p-8 md:p-16 lg:p-14" // Padding dalam konten agar teks tidak nempel ke pinggir
          )}>
            <div className={cn(
              "max-w-4xl mx-auto",
              theme === 'dark' ? "text-gray-200" : "text-zinc-900"
            )}>
              <div className={cn(
                "flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-widest",
                theme === 'dark' ? "text-gray-200/70" : "opacity-40"
              )}>
                <Bookmark size={12} /> Bab {activeTab + 1} • {currentModule?.pages} Halaman
              </div>

              <h1 className={cn(
                "text-4xl md:text-5xl font-bold tracking-tighter mb-12",
                theme === 'dark' ? "text-gray-200" : "text-zinc-900"
              )}>
                {currentModule?.title}
              </h1>

              <div
                className={cn(
                  "prose max-w-none prose-pre:bg-transparent prose-pre:p-0 select-none [&_p]:select-none [&_li]:select-none [&_span]:select-none [&_h1]:select-none [&_h2]:select-none [&_h3]:select-none [&_.copy-btn]:select-none [&_.group]:select-text [&_pre]:select-text [&_code]:select-text",
                  theme === 'dark'
                    ? "prose-headings:text-gray-200 prose-p:text-gray-200 prose-li:text-gray-200 prose-strong:text-gray-100 prose-a:text-teal-300"
                    : "prose-zinc"
                )}
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
          "w-72 hidden lg:flex flex-col border-l shrink-0 p-6 overflow-y-auto transition-colors [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full",
          theme === 'dark'
            ? "bg-zinc-950 border-zinc-800 [scrollbar-color:#3f3f46_#09090b] [&::-webkit-scrollbar-track]:bg-zinc-950 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600"
            : "bg-white border-zinc-200 [scrollbar-color:#cbd5e1_#f8fafc] [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb:hover]:bg-slate-400"
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