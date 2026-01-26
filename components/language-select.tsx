"use client";

import { useLanguage } from "@/lib/language-context";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const languages = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
];

export function LanguageSelect() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguage = languages.find((l) => l.value === lang);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-1.5
          h-9 px-2 cursor-pointer
          rounded-md
          border border-zinc-200 dark:border-zinc-700
          bg-white dark:bg-zinc-800
          text-zinc-700 dark:text-zinc-200
          hover:bg-zinc-100 dark:hover:bg-zinc-700
          transition-colors
        "
      >
        <Globe className="h-3.5 w-3.5 opacity-70" />
        <span className="text-[11px] font-medium">
          {selectedLanguage?.label}
        </span>
        <svg
          className={cn(
            "h-3 w-3 opacity-60 transition-transform",
            isOpen && "rotate-180",
          )}
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
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="
              absolute z-50 mt-1 min-w-[72px]
              rounded-md
              border border-zinc-200 dark:border-zinc-700
              bg-white dark:bg-zinc-800
              shadow-md
              animate-in fade-in-0 zoom-in-95
            "
          >
            {languages.map((language) => (
              <button
                key={language.value}
                onClick={() => {
                  setLang(language.value as any);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-2 py-1.5",
                  "text-[11px] font-medium",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-700",
                  lang === language.value &&
                    "text-teal-600 dark:text-teal-400",
                )}
              >
                {language.label}
                {lang === language.value && (
                  <Check className="h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
