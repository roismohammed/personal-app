"use client";

import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import WrapperLayout from "@/components/wrapperLayout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  const { t } = useLanguage();

  return (
    <div className="dark:bg-zinc-900 overflow-hidden py-16 md:py-20 relative">
      <WrapperLayout>
        <section className="container mx-auto relative z-10 ">
          <div
            className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-zinc-800
            bg-gradient-to-br from-teal-700 via-teal-700 to-teal-900
            p-10 md:py-10 text-center shadow-none shadow-teal-900/40"
          >
            {/* GRID OVERLAY */}
            <GridPattern
              width={20}
              height={20}
              squares={[
                [1, 1],
                [3, 3],
                [5, 2],
                [8, 5],
                [10, 1],
                [12, 4],
                [15, 2],
              ]}
              className={cn(
                "pointer-events-none absolute inset-0 h-full w-full",
                "opacity-40",
                "stroke-white/20 fill-white/10",
                "[mask-image:linear-gradient(to_bottom_left,white_20%,transparent_70%)]"
              )}
            />

            <div className="relative z-10 flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 mb-6 shadow-inner backdrop-blur">
                <Sparkles className="w-4 h-4 text-white" />
               <p className="text-white">roisdev</p>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-tight">
                 {t("cta_title") || "Get Started"}
                {/* <span className="text-teal-200">Google</span> technologies? */}
              </h2>

              {/* Description */}
              <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                {t("cta_desc")}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto group">
                <Button
                  className="bg-white text-teal-700 hover:bg-teal-50 rounded-lg px-8 shadow-none active:scale-95 transition-all w-full sm:w-auto"
                  asChild
                >
                  <Link href="/about" className="flex items-center gap-2">
                    {t("cta_primary")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="text-white border hover:text-white cursor-pointer hover:bg-white/10 rounded-lg w-full sm:w-auto"
                >
                  {t("cta_secondary")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </WrapperLayout>
    </div>
  );
}