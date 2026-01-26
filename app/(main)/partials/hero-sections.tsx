"use client";

import { Highlighter } from "@/components/ui/highlighter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { TerminalDemo } from "@/components/terminal-demo";
import WrapperLayout from "@/components/wrapperLayout";
import { useLanguage } from "@/lib/language-context";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="bg-gray-100 dark:bg-zinc-900 relative rounded-lg border-none">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [6, 6],
            [10, 10],
            [12, 15],
            [18, 10],
            [10, 15],
            [15, 10],
            [10, 16],
            [15, 11],
          ]}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full",
            "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
            "opacity-50",
            "dark:opacity-30",
          )}
        />

        <WrapperLayout>
          <section id="home" className="mx-auto mt-7 py-16 md:py-36">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-white/80 dark:bg-zinc-700 border border-teal-100"
                >
                  {t("hero_badge")}
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold geist tracking-tight text-zinc-800 dark:text-white">
                  <Highlighter action="underline" color="#FF9800">
                    {t("hero_title_highlight")}
                  </Highlighter>{" "}
                  {t("hero_title_middle")}&nbsp;
                  <span className="bg-gradient-to-r from-cyan-800 to-teal-500 bg-clip-text text-transparent">
                    {t("hero_title_gradient")}
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl">
                  {t("hero_desc")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r cursor-pointer from-cyan-700 to-teal-600 hover:from-cyan-700 hover:to-cyan-700"
                  >
                    <Link href="/project" className="cursor-pointer w-full">
                      {t("hero_cta_primary")}
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="dark:text-gray-200 cursor-pointer"
                  >
                    <Link href="/about" className="cursor-pointer w-full">
                      {t("hero_cta_secondary")}
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6 pt-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <Avatar
                        key={i}
                        className="border-2 border-zinc-700 h-10 w-10 dark:border-gray-200"
                      >
                        <AvatarImage src="/avatars/1.png" alt="Client" />
                        <AvatarFallback className="dark:border-gray-400 dark:text-gray-200">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {t("hero_clients_count")}
                    </span>{" "}
                    {t("hero_clients_label")}
                  </div>
                </div>
              </div>

              <div className="flex justify-center z-40">
                <TerminalDemo />
              </div>
            </div>
          </section>
        </WrapperLayout>
      </div>
    </div>
  );
}
