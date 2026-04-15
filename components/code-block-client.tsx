"use client";

import { useEffect, useRef } from "react";

interface CodeBlockClientProps {
  html: string;
  className?: string;
}

export default function CodeBlockClient({
  html,
  className,
}: CodeBlockClientProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const buttons =
      container.querySelectorAll<HTMLButtonElement>(".code-copy-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const code = btn.dataset.code ?? "";
        const label = btn.querySelector(".copy-label");

        try {
          await navigator.clipboard.writeText(code);
          if (label) {
            label.textContent = "Tersalin!";
            setTimeout(() => {
              label.textContent = "Salin";
            }, 2000);
          }
        } catch {

          const textarea = document.createElement("textarea");
          textarea.value = code;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          if (label) {
            label.textContent = "Tersalin!";
            setTimeout(() => {
              label.textContent = "Salin";
            }, 2000);
          }
        }
      });
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
