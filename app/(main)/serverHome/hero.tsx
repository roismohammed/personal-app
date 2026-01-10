"use client"
import { TerminalDemo } from "@/components/terminal-demo";
import { Highlighter } from "@/components/ui/highlighter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import WrapperLayout from '../../../components/wrapperLayout';
export default function HeroSection() {
    return (
        <div>
            <div className="bg-gray-50 dark:bg-zinc-900 relative rounded-lg border-none">
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
                    <section id="home" className="mx-auto mt-10 py-16 md:py-36">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1 space-y-6">
                                <Badge variant="secondary" className="px-3 py-1 text-sm bg-white/80 dark:bg-zinc-700 border border-teal-100">Full-Stack Developer</Badge>
                                <h1 className="text-4xl md:text-6xl font-bold geist tracking-tight text-zinc-800 dark:text-white">
                                    <Highlighter action="underline" color="#FF9800">
                                        Transformasi
                                    </Highlighter>{" "}
                                    Ide Menjadi&nbsp;
                                    <span className="bg-gradient-to-r from-cyan-800 to-teal-500 bg-clip-text text-transparent">
                                        Digital Reality
                                    </span>
                                </h1>

                                <p className="text-xl text-muted-foreground max-w-2xl">
                                    Saya membantu bisnis dan individu membangun pengalaman digital yang luar biasa dengan teknologi terkini.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button size="lg" className="bg-gradient-to-r cursor-pointer from-cyan-700 to-teal-600 hover:from-cyan-700 hover:to-cyan-700">
                                        Mulai Proyek
                                    </Button>
                                    <Button variant="outline" size="lg" className="dark:text-gray-200 cursor-pointer">
                                        <Link href="/about" className="cursor-pointer w-full">
                                            Lihat Portofolio
                                        </Link>
                                    </Button>
                                </div>
                                <div className="flex items-center gap-6 pt-8">
                                    <div className="flex -space-x-2">
                                        <Avatar className="border-2 border-zinc-700 h-10 w-10 dark:border-gray-200">
                                            <AvatarImage src="/avatars/1.png" alt="Client" />
                                            <AvatarFallback className="dark:border-gray-400 dark:text-gray-200">CN</AvatarFallback>
                                        </Avatar>
                                        <Avatar className="border-2 border-zinc-700 h-10 w-10 dark:border-gray-200">
                                            <AvatarImage src="/avatars/1.png" alt="Client" />
                                            <AvatarFallback className="dark:border-gray-400 dark:text-gray-200">CN</AvatarFallback>
                                        </Avatar>
                                        <Avatar className="border-2 border-zinc-700 h-10 w-10 dark:border-gray-200">
                                            <AvatarImage src="/avatars/1.png" alt="Client" />
                                            <AvatarFallback className="dark:border-gray-400 dark:text-gray-200">CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">50+</span> Klien Puas
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack Floating Icons */}
                            <div className="flex justify-center z-40">
                                <TerminalDemo />
                            </div>
                        </div>
                    </section>
                </WrapperLayout>
            </div>
        </div>
    )
}
