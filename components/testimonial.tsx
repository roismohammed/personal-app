"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/lib/language-context";

type TestimonialItem = {
  id: number;
  name: string;
  business: string;
  message: string;
};

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Aulia Rahman",
    business: "UMKM Fashion",
    message:
      "Website company profile saya jadi lebih profesional. Komunikasinya enak, revisi cepat, dan hasil akhir sesuai yang saya butuhkan.",
  },
  {
    id: 2,
    name: "Dina Pratiwi",
    business: "Kursus Online",
    message:
      "Proses pembuatan website sangat jelas dari awal sampai rilis. Loading cepat, mobile-friendly, dan memudahkan calon murid daftar.",
  },
  {
    id: 3,
    name: "Fajar Nugroho",
    business: "Jasa Interior",
    message:
      "Saya minta website portofolio yang simpel tapi meyakinkan. Hasilnya rapi, modern, dan bikin klien lebih percaya dengan layanan saya.",
  },
  {
    id: 4,
    name: "Rina Maharani",
    business: "Klinik Kecantikan",
    message:
      "Website booking treatment yang dibuat sangat membantu operasional. Informasi layanan jadi lebih jelas dan pendaftaran online meningkat.",
  },
  {
    id: 5,
    name: "Bagus Pratama",
    business: "Kontraktor Rumah",
    message:
      "Saya butuh website jasa yang cepat jadi dan mudah diupdate. Hasilnya profesional, responsif di mobile, dan banyak calon klien menghubungi dari form.",
  },
];

export default function Testimonial() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();
  const scrollCards = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = 340;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 border-b">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <div>
          <Badge variant="outline" className=" border-teal-700/20 text-teal-700">
              testimonial
            </Badge>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">
                {t("testimonial_title")}
            </h2>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="min-w-[290px] snap-start rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:min-w-[340px] dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
                  <Quote className="h-4 w-4" />
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                "{item.message}"
              </p>

              <div className="flex items-center gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{item.name}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.business}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            aria-label="Geser kiri"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollCards("right")}
            aria-label="Geser kanan"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}