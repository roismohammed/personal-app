"use client";

import { useLanguage } from "@/lib/language-context";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const languages = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
];

export function LanguageSelect() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedLanguage = languages.find((l) => l.value === lang);

  if (!mounted) {
    return (
      <div className="w-[160px] h-10 bg-slate-100 rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <Button
           size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 dark:bg-zinc-800 dark:border-gray-700 dark:text-gray-300 w-[84px] px-3 py-4 rounded-lg border border-zinc-400-200 bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-800 dark:text-gray-200">
            {selectedLanguage?.label}
          </span>
        </div>
        <div
          className={cn(
            "transform transition-transform",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        >
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-50 mt-1 w-auto bg-white dark:bg-zinc-800 rounded-lg border border-slate-200 shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            {languages.map((language) => (
              <button
                key={language.value}
                onClick={() => {
                  setLang(language.value as any);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2.5 text-left hover:bg-slate-50 transition-colors",
                  lang === language.value && "bg-blue-50 text-blue-700",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{language.label}</span>
                </div>
                {lang === language.value && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
