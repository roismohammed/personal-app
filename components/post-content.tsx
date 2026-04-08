import { getSingletonHighlighter } from "shiki";
import CodeBlockClient from "./code-block-client";

interface PostContentProps {
  html: string;
  className?: string;
}

const LANG_LABEL: Record<string, string> = {
  tsx: "TSX",
  typescript: "TypeScript",
  ts: "TypeScript",
  javascript: "JavaScript",
  js: "JavaScript",
  jsx: "JSX",
  bash: "Bash",
  css: "CSS",
  json: "JSON",
  html: "HTML",
  markup: "HTML",
  text: "Plain Text",
  php: "PHP",
  sql: "SQL",
  python: "Python",
  go: "Go",
};

const LANG_NORMALIZE: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  markup: "html",
};

async function processCodeBlocks(html: string): Promise<string> {
  // class bisa ada di <pre> atau <code> — TinyMCE meletakkannya di <pre>
  const regex =
    /<pre(?:\s+class="([^"]*)")?[^>]*>\s*<code(?:\s+class="([^"]*)")?>([\s\S]*?)<\/code>\s*<\/pre>/gi;
  const matches = [...html.matchAll(regex)];

  if (matches.length === 0) return html;

  const highlighter = await getSingletonHighlighter({
    themes: ["github-dark-default", "github-light"],
    langs: [
      "tsx",
      "typescript",
      "javascript",
      "jsx",
      "bash",
      "css",
      "json",
      "html",
      "text",
      "php",
      "sql",
      "python",
      "go",
    ],
  });

  let result = html;

  for (const match of matches) {
    const [fullMatch, preClass = "", codeClass = "", encodedCode] = match;

    const classAttr = preClass || codeClass;

    // Decode HTML entities dari TinyMCE
    const rawCode = encodedCode
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    const langMatch = classAttr.match(/language-(\w+)/);
    const lang = langMatch?.[1] ?? "text";
    const resolvedLang = LANG_NORMALIZE[lang] ?? lang;
    const langLabel =
      LANG_LABEL[resolvedLang] ?? LANG_LABEL[lang] ?? lang.toUpperCase();

    const highlighted = highlighter.codeToHtml(rawCode, {
      lang: resolvedLang,
      themes: {
        light: "github-light",
        dark: "github-dark-default",
      },
    });

    // Escape untuk data attribute
    const escapedCode = rawCode.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

    // Double-wrapper: outer = bingkai gradient + rounded-2xl, inner = konten bg + rounded-xl
    const wrapped = `
<div class="code-block not-prose my-6 overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
  <div class="flex items-center justify-between px-4 py-3">
    <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">${langLabel}</span>
    <button
      class="code-copy-btn flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      data-code="${escapedCode}"
      aria-label="Salin kode"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
      <span class="copy-label">Salin</span>
    </button>
  </div>
  <div class="code-block-body overflow-hidden rounded-xl ring-1 ring-foreground/6">${highlighted}</div>
</div>`;

    result = result.replace(fullMatch, wrapped);
  }

  return result;
}

export default async function PostContent({
  html,
  className,
}: PostContentProps) {
  const processedHtml = await processCodeBlocks(html);

  return <CodeBlockClient html={processedHtml} className={className} />;
}
