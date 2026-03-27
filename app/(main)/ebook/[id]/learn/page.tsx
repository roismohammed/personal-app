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
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/client';
import { codeToHtml } from 'shiki/bundle/web';
import DOMPurify from 'dompurify';

// --- Types --- (tidak diubah)
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

const SHIKI_THEME = 'github-dark';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const highlightCode = async (code: string, lang: string) => {
  return codeToHtml(code, {
    lang,
    theme: SHIKI_THEME,
  });
};

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
  const inlineCodeCandidates = doc.querySelectorAll('code');

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

  for (const node of Array.from(inlineCodeCandidates)) {
    if (node.closest('pre')) continue;
    const codeText = node.textContent?.trim() || '';
    if (!codeText || !looksLikeInlineCodeBlock(codeText)) continue;

    const pre = doc.createElement('pre');
    node.replaceWith(pre);
    pre.appendChild(node);
  }
};

// ── Progress Ring ─────────────────────────────────────────────────────────────
function ProgressRing({
  percent, size = 72, stroke = 5,
  trackColor = '#27272a', fillColor = '#14b8a6', children,
}: {
  percent: number; size?: number; stroke?: number;
  trackColor?: string; fillColor?: string; children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(percent, 100) / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }} className="shrink-0">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={fillColor} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

export default function LearnPage() {
  // ── Semua state & logika data tidak diubah sama sekali ────────────────────
  const params = useParams<{ id: string }>();
  const ebookIdentifier = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [activeTab, setActiveTab] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ebookTitle, setEbookTitle] = useState('Ebook Reader');
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [renderedHtml, setRenderedHtml] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => setMounted(true), []);

  // --- Fetch Data --- (tidak diubah)
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

  // --- Process content (tidak diubah) ---
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
          highlighted = await highlightCode(code, lang);
        } catch {
          try {
            highlighted = await highlightCode(code, FALLBACK_LANGUAGE);
          } catch {
            highlighted = `<pre><code>${escapeHtml(code)}</code></pre>`;
          }
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'group relative my-8 overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#020817] shadow-[0_16px_45px_-28px_rgba(2,6,23,0.95)]';
        wrapper.setAttribute('data-code', code);

        const header = document.createElement('div');
        header.className = 'relative flex items-center gap-3 border-b border-zinc-800/80 bg-[#0f172a] px-4 py-3';

        const dots = document.createElement('div');
        dots.className = 'flex items-center gap-1.5';
        dots.innerHTML = '<span class="w-3 h-3 bg-red-500 rounded-full opacity-80"></span><span class="w-3 h-3 bg-yellow-400 rounded-full opacity-80"></span><span class="w-3 h-3 bg-green-500 rounded-full opacity-80"></span>';

        const languageLabel = document.createElement('span');
        languageLabel.className = 'pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500';
        languageLabel.textContent = lang;

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn ml-auto rounded-md border border-zinc-700/70 bg-zinc-800/90 px-3 py-1 text-[11px] font-semibold text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white';
        copyButton.type = 'button';
        copyButton.textContent = 'Copy';

        header.appendChild(dots);
        header.appendChild(languageLabel);
        header.appendChild(copyButton);

        const content = document.createElement('div');
        content.className = 'overflow-x-auto text-sm leading-6 [&>pre]:!m-0 [&>pre]:!bg-transparent [&>pre]:p-6';
        content.innerHTML = highlighted;

        wrapper.appendChild(header);
        wrapper.appendChild(content);
        block.replaceWith(wrapper);
      }

      if (!cancelled) setRenderedHtml(doc.body.innerHTML);
    };

    processContent();
    return () => { cancelled = true; };
  }, [currentModule]);

  // --- Copy Handler --- (tidak diubah)
  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    const btn = (e.target as HTMLElement).closest('.copy-btn') as HTMLButtonElement;
    if (!btn) return;
    const wrapper = btn.closest('[data-code]');
    const code = wrapper?.getAttribute('data-code') || '';
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      const original = btn.innerText;
      btn.innerText = 'Copied ✓';
      btn.style.color = '#4ade80';
      setTimeout(() => { btn.innerText = original; btn.style.color = ''; }, 1500);
    } catch {
      btn.innerText = 'Failed';
    }
  }, []);

  const handleContentCopy = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    const anchorElement = anchorNode
      ? (anchorNode.nodeType === Node.ELEMENT_NODE ? (anchorNode as Element) : anchorNode.parentElement)
      : null;
    const isInsideCode = !!anchorElement?.closest('.group, pre, code, [data-code]');
    if (!isInsideCode) {
      e.preventDefault();
      selection?.removeAllRanges();
    }
  }, []);

  // ── Scroll tracker ────────────────────────────────────────────────────────
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const pct = Math.round((el.scrollTop / Math.max(el.scrollHeight - el.clientHeight, 1)) * 100);
    setScrollPercent(pct);
  }, []);

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const tc = {
    dark: {
      root:        'bg-zinc-950 text-zinc-100',
      nav:         'bg-zinc-900 border-zinc-800',
      sidebar:     'bg-zinc-900 border-zinc-800',
      topbar:      'bg-zinc-900/80 border-zinc-800',
      muted:       'text-zinc-500',
      chipBg:      'bg-zinc-800',
      border:      'border-zinc-800',
      cardBg:      'bg-zinc-800/70 ring-zinc-700/40',
      trackColor:  '#27272a',
      insightBg:   'bg-zinc-800/40',
      hoverChap:   'hover:bg-zinc-800',
      titleColor:  'text-zinc-50',
      scrollbar:   '[scrollbar-color:#3f3f46_#09090b] [&::-webkit-scrollbar-track]:bg-zinc-950 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600',
    },
    light: {
      root:        'bg-slate-50 text-zinc-900',
      nav:         'bg-white border-zinc-200',
      sidebar:     'bg-white border-zinc-200',
      topbar:      'bg-white/90 border-zinc-200',
      muted:       'text-zinc-400',
      chipBg:      'bg-slate-100',
      border:      'border-zinc-200',
      cardBg:      'bg-black/5 ring-black/10',
      trackColor:  '#e2e8f0',
      insightBg:   'bg-slate-50',
      hoverChap:   'hover:bg-slate-100',
      titleColor:  'text-zinc-900',
      scrollbar:   '[scrollbar-color:#cbd5e1_#f8fafc] [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb:hover]:bg-slate-400',
    },
    sepia: {
      root:        'bg-[#f5edd8] text-[#3b2f1e]',
      nav:         'bg-[#ede0c4] border-[#d4c4a0]',
      sidebar:     'bg-[#ede0c4] border-[#d4c4a0]',
      topbar:      'bg-[#ede0c4]/90 border-[#d4c4a0]',
      muted:       'text-[#8a7060]',
      chipBg:      'bg-[#ddd0b3]',
      border:      'border-[#d4c4a0]',
      cardBg:      'bg-black/5 ring-black/8',
      trackColor:  '#c4a97a',
      insightBg:   'bg-[#e8d9b8]',
      hoverChap:   'hover:bg-[#ddd0b3]',
      titleColor:  'text-[#2d1f0e]',
      scrollbar:   '[scrollbar-color:#c4a97a_#f5edd8] [&::-webkit-scrollbar-track]:bg-[#f5edd8] [&::-webkit-scrollbar-thumb]:bg-[#c4a97a]',
    },
  } as const;
  const t = tc[theme];

  const overallPct = modules.length
    ? Math.round(((activeTab + 1) / modules.length) * 100)
    : 0;

  // ── Loading ───────────────────────────────────────────────────────────────
  if (!mounted || loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        <p className="text-sm text-zinc-500">Memuat materi ebook...</p>
      </div>
    );
  }

  return (
    <div className={cn('flex h-screen flex-col overflow-hidden transition-colors duration-300', t.root)}>

      {/* ══ TOP NAV ══════════════════════════════════════════════════════════ */}
      <nav className={cn('flex h-14 shrink-0 items-center justify-between border-b px-5 z-50', t.nav)}>
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/ebook"
            className={cn('shrink-0 transition-colors hover:text-teal-500', t.muted)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h2 className={cn('truncate max-w-[200px] text-sm font-bold leading-none')}>
            {ebookTitle}
          </h2>
        </div>

        {/* Right: theme switcher */}
        <div className={cn(
          'flex items-center gap-1 rounded-lg p-1',
          theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100/80'
        )}>
          <button
            onClick={() => setTheme('light')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md transition-all',
              theme === 'light' ? 'bg-white shadow text-amber-500' : t.muted
            )}
          >
            <Sun className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setTheme('sepia')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md transition-all',
              theme === 'sepia' ? 'bg-[#f4ecd8] shadow text-amber-700' : t.muted
            )}
          >
            <Coffee className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md transition-all',
              theme === 'dark' ? 'bg-zinc-700 shadow text-yellow-400' : t.muted
            )}
          >
            <Moon className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">

        <aside className={cn(
          'flex flex-col shrink-0 border-r overflow-hidden transition-all duration-300',
          t.sidebar,
          sidebarOpen ? 'w-64' : 'w-0'
        )}>
          {/* Overall progress bar */}
          <div className={cn(
            'mx-3 mt-4 mb-1 shrink-0 rounded-xl p-3',
            theme === 'dark' ? 'bg-zinc-800/70' : 'bg-black/5'
          )}>
            <div className="mb-2 flex items-center justify-between">
              <span className={cn('text-[11px]', t.muted)}>Total Progress</span>
              <span className="text-[11px] font-semibold text-teal-500">{overallPct}%</span>
            </div>
            <div className={cn('h-1.5 overflow-hidden rounded-full', theme === 'dark' ? 'bg-zinc-700' : 'bg-black/10')}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-700"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <p className={cn('mt-1.5 text-[10px]', t.muted)}>
              Bab {activeTab + 1} dari {modules.length}
            </p>
          </div>

          <p className={cn('px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-[0.25em]', t.muted)}>
            Daftar Isi
          </p>

          {/* Chapter list */}
          <nav className={cn(
            'flex-1 overflow-y-auto px-2 pb-3 space-y-0.5 [scrollbar-width:thin]',
            '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent',
            '[&::-webkit-scrollbar-thumb]:rounded-full',
            t.scrollbar
          )}>
            {modules.map((m, i) => {
              const isActive = activeTab === i;
              const isDone   = i < activeTab;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    'group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5',
                    'text-left text-xs font-semibold transition-all duration-150',
                    isActive
                      ? 'bg-teal-600 text-white shadow-md'
                      : cn(t.muted, t.hoverChap)
                  )}
                >
                  <span className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-md',
                    'border text-[10px] font-bold font-mono transition-colors',
                    isActive ? 'border-white/30 text-white' : 'border-current opacity-40'
                  )}>
                    {isDone ? '✓' : i + 1}
                  </span>
                  <span className="flex-1 min-w-0 leading-snug">{m.title}</span>
                  {isDone && !isActive && (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-500" />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ══ CENTER CONTENT ═══════════════════════════════════════════════════ */}
        <main className="flex flex-1 flex-col ">
            
          {/* Top content bar */}
          <div className={cn('flex h-11 shrink-0 items-center gap-3 border-b px-4', t.topbar)}>
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md shrink-0 transition-colors',
                theme === 'dark'
                  ? 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                  : 'text-zinc-400 hover:bg-black/5 hover:text-zinc-700'
              )}
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            {/* Breadcrumb */}
            <div className={cn('flex items-center gap-1.5 text-xs min-w-0', t.muted)}>
              <span className="hidden sm:block truncate max-w-[120px] font-medium">{ebookTitle}</span>
              <span className="hidden sm:block shrink-0">›</span>
              <span className={cn('truncate font-semibold', theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700')}>
                {currentModule?.title}
              </span>
            </div>

            {/* Reading progress pill */}
            <div className={cn(
              'ml-auto flex items-center gap-1.5 rounded-full px-3 py-1 shrink-0',
              theme === 'dark' ? 'bg-zinc-800' : 'bg-black/8'
            )}>
              <div className={cn('h-1 w-14 overflow-hidden rounded-full', theme === 'dark' ? 'bg-zinc-700' : 'bg-black/10')}>
                <div
                  className="h-full rounded-full bg-teal-500 transition-all duration-200"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
              <span className={cn('font-mono text-[10px] w-7 text-right tabular-nums', t.muted)}>
                {scrollPercent}%
              </span>
            </div>
          </div>

          {/* Scrollable article */}
          <div
            className={cn(
              'flex-1 overflow-y-auto scroll-smooth [scrollbar-width:thin]',
              '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent',
              '[&::-webkit-scrollbar-thumb]:rounded-full',
              t.scrollbar
            )}
            onScroll={handleScroll}
            onClick={handleCopy}
          >
            <div className={cn(
              'min-h-full mx-auto max-w-3xl p-5 transition-colors duration-300',
            )}>

              {/* Meta chips */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-teal-500/15 px-3 py-1 text-[11px] font-semibold text-teal-500 ring-1 ring-inset ring-teal-500/20">
                  <Bookmark className="h-3 w-3" /> Bab {activeTab + 1} • {currentModule?.pages} Halaman
                </span>
                {activeTab > 0 && (
                  <span className="rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-semibold text-teal-400 ring-1 ring-inset ring-teal-500/20">
                    ✓ Bab sebelumnya selesai
                  </span>
                )}
              </div>

              {/* Chapter title */}
              <h1 className={cn('mb-10 text-4xl md:text-5xl font-bold tracking-tighter', t.titleColor)}>
                {currentModule?.title}
              </h1>

              {/* Content styles */}
              <style>{`
                .reader { font-size: ${fontSize}px; line-height: 1.875; }
                .reader.dark  { color: #94a3b8; }
                .reader.light { color: #374151; }
                .reader.sepia { color: #4a3728; }
                .reader h1,.reader h2 {
                  font-size:1.5rem; font-weight:700; margin:2.5rem 0 1rem;
                  letter-spacing:-0.02em; border-left:3px solid #14b8a6; padding-left:1rem;
                }
                .reader.dark  h1,.reader.dark  h2 { color:#f1f5f9; }
                .reader.light h1,.reader.light h2 { color:#111827; }
                .reader.sepia h1,.reader.sepia h2 { color:#2d1f0e; }
                .reader h3 { font-size:1.15rem; font-weight:600; margin:2rem 0 .75rem; }
                .reader.dark  h3 { color:#e2e8f0; }
                .reader.light h3,.reader.sepia h3 { color:#1f2937; }
                .reader h4 { font-size:1rem; font-weight:600; margin:1.5rem 0 .5rem; }
                .reader p  { margin-bottom:1.25rem; }
                .reader ul,.reader ol { margin:1rem 0 1.5rem 1.5rem; }
                .reader li { margin-bottom:.5rem; }
                .reader strong { color:#5eead4; font-weight:600; }
                .reader.light strong { color:#0f766e; }
                .reader.sepia strong { color:#0f766e; }
                .reader em { font-style:italic; opacity:.85; }
                .reader a  { color:#2dd4bf; text-decoration:underline; }
                .reader.light a,.reader.sepia a { color:#0f766e; }
                .reader blockquote {
                  border-left:3px solid #14b8a6; margin:1.75rem 0;
                  padding:1rem 1.5rem; border-radius:0 8px 8px 0; font-style:italic;
                }
                .reader.dark  blockquote { background:rgba(20,184,166,.07); color:#7c8db5; }
                .reader.light blockquote { background:rgba(20,184,166,.06); color:#374151; }
                .reader.sepia blockquote { background:rgba(20,184,166,.06); color:#5a4030; }
                .reader :not(pre) > code {
                  background:rgba(20,184,166,.12); color:#5eead4;
                  font-family:'JetBrains Mono',monospace;
                  font-size:.85em; padding:.15em .4em; border-radius:4px;
                }
                .reader.light :not(pre) > code,.reader.sepia :not(pre) > code { color:#0f766e; }
                .reader table { width:100%; border-collapse:collapse; margin:1.5rem 0; }
                .reader th {
                  background:rgba(20,184,166,.15); color:#5eead4;
                  padding:.7rem 1rem; text-align:left; font-weight:600;
                  border-bottom:1px solid #1e293b; font-size:.9rem;
                }
                .reader.light th,.reader.sepia th { color:#0d9488; }
                .reader td { padding:.65rem 1rem; border-bottom:1px solid rgba(0,0,0,.06); font-size:.9rem; }
                .reader.dark td { border-color:#0f172a; color:#64748b; }
                .reader.light td { color:#374151; border-color:#e5e7eb; }
                .reader.sepia td { color:#5a4030; border-color:#d4c4a0; }
                .reader img { max-width:100%; border-radius:8px; margin:1rem 0; }
                .reader hr { border:none; border-top:1px solid rgba(0,0,0,.1); margin:2rem 0; }
                .reader.dark hr { border-color:#1e293b; }
                .reader .group [class*='shiki'] { background:transparent !important; }
                .reader { user-select:text; }
              `}</style>

              {/* Rendered HTML */}
              <div
                className={cn('reader', theme)}
                onCopy={handleContentCopy}
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />

              {/* Footer nav */}
              <div className={cn('mt-16 flex items-center gap-3 border-t pt-8', t.border)}>
                <button
                  disabled={activeTab === 0}
                  onClick={() => setActiveTab(a => a - 1)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-all',
                    'disabled:pointer-events-none disabled:opacity-40',
                    theme === 'dark'
                      ? 'border-zinc-700/60 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
                  )}
                >
                  <ChevronLeft className="h-4 w-4 shrink-0" />
                  <span className="max-w-[140px] truncate">
                    {activeTab > 0 ? modules[activeTab - 1]?.title : 'Sebelumnya'}
                  </span>
                </button>

                <div className="flex-1" />

                <button
                  disabled={activeTab === modules.length - 1}
                  onClick={() => setActiveTab(a => a + 1)}
                  className="flex items-center gap-2 rounded-lg border border-teal-500/30 bg-teal-600
                    px-4 py-2.5 text-sm text-white shadow-md transition-all hover:bg-teal-500
                    disabled:pointer-events-none disabled:opacity-40"
                >
                  <span className="max-w-[140px] truncate">
                    {activeTab < modules.length - 1 ? modules[activeTab + 1]?.title : 'Selesai'}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* ══ RIGHT PANEL ══════════════════════════════════════════════════════ */}
        <aside className={cn(
          'hidden lg:flex w-56 shrink-0 flex-col gap-4 overflow-y-auto border-l p-4 [scrollbar-width:thin]',
          '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full',
          t.sidebar, t.scrollbar
        )}>

          <h3 className={cn('text-[10px] font-black uppercase tracking-[0.25em]', t.muted)}>
            Progress Belajar
          </h3>

          {/* Current chapter ring */}
          <div className={cn('rounded-xl p-4 ring-1', t.cardBg)}>
            <p className={cn('mb-3 text-center text-[11px]', t.muted)}>Bab Ini</p>
            <div className="flex justify-center">
              <ProgressRing
                percent={scrollPercent} size={72} stroke={5}
                trackColor={t.trackColor} fillColor="#14b8a6"
              >
                <span className="font-mono text-xs font-semibold text-teal-500">
                  {scrollPercent}%
                </span>
              </ProgressRing>
            </div>
            <p className={cn('mt-3 text-center text-[10px]', t.muted)}>
              {scrollPercent >= 80 ? '✅ Selesai dibaca' : 'Sedang membaca...'}
            </p>
          </div>

          {/* Overall ring */}
          <div className={cn('rounded-xl p-4 ring-1', t.cardBg)}>
            <p className={cn('mb-3 text-center text-[11px]', t.muted)}>Keseluruhan</p>
            <div className="flex justify-center">
              <ProgressRing
                percent={overallPct} size={72} stroke={5}
                trackColor={t.trackColor} fillColor="#22d3ee"
              >
                <span className="font-mono text-xs font-semibold text-cyan-500">
                  {overallPct}%
                </span>
              </ProgressRing>
            </div>
            <p className={cn('mt-3 text-center text-[10px]', t.muted)}>
              Bab {activeTab + 1}/{modules.length}
            </p>
          </div>

          {/* Insight card */}
          <div className={cn('rounded-xl border p-4', t.border, t.insightBg)}>
            <div className={cn('flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider', t.muted)}>
              <Lightbulb className="h-3.5 w-3.5" /> Insight
            </div>
            <p className={cn('text-[11px] leading-relaxed italic', t.muted)}>
              "Belajar bertahap memberikan hasil lebih konsisten daripada belajar cepat tanpa struktur."
            </p>
          </div>

          {/* Status list */}
          <div>
            <p className={cn('mb-2 text-[10px] font-bold uppercase tracking-[0.2em]', t.muted)}>
              Status Bab
            </p>
            <div className="space-y-0.5">
              {modules.map((m, i) => {
                const isActive = activeTab === i;
                const isDone   = i < activeTab;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveTab(i)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors',
                      isActive
                        ? 'bg-teal-600/15'
                        : theme === 'dark' ? 'hover:bg-zinc-800/50' : 'hover:bg-black/5'
                    )}
                  >
                    <span className={cn(
                      'h-2 w-2 shrink-0 rounded-full transition-colors',
                      isDone ? 'bg-teal-500' : isActive ? 'bg-teal-400' : theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'
                    )} />
                    <span className={cn(
                      'flex-1 min-w-0 truncate text-[11px] leading-tight',
                      isActive ? 'font-semibold text-teal-500' : t.muted
                    )}>
                      {m.title}
                    </span>
                    {isDone && <CheckCircle2 className="h-3 w-3 shrink-0 text-teal-500" />}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}