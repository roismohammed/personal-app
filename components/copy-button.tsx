"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { Check, Clipboard } from "@hugeicons/core-free-icons";

type CopyLinkButtonProps = {
  url?: string;
};

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const linkToCopy = url ?? window.location.href;

      await navigator.clipboard.writeText(linkToCopy);

      setCopied(true);
      toast("Link berhasil disalin 🚀");

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast("Gagal menyalin link");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="
        flex items-center gap-2 w-full justify-center
        rounded-lg border py-2 text-sm
        text-gray-600 dark:text-gray-200
        hover:bg-gray-100 dark:hover:bg-zinc-600
        transition
      "
    >
      <HugeiconsIcon icon={copied ? Check : Clipboard} size={16} />
      {copied ? "Tersalin!" : "Salin Link"}
    </button>
  );
}
