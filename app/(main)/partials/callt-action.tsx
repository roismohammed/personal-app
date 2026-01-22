
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import WrapperLayout from "@/components/wrapperLayout";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function CallToAction() {
    return (
        <div  className="bg-gray-50 dark:bg-zinc-900">
            <WrapperLayout>
                <section className="container mx-auto py-16">
                    <div className="relative overflow-hidden rounded-2xl 
                    bg-gradient-to-r from-cyan-600 to-teal-600 
                    p-8 md:p-12 text-center text-white">

                        {/* GRID PATTERN */}
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
                            ]}
                            className={cn(
                                "pointer-events-none absolute inset-0",
                                "opacity-30",
                                "z-0",
                                // mask DIKURANGI supaya kelihatan
                                "[mask-image:radial-gradient(1000px_circle_at_center,white,rgba(255,255,255,0.4))]"
                            )}
                        />

                        {/* CONTENT */}
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Siap Memulai Proyek Anda?
                            </h2>

                            <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
                                Mari berkolaborasi untuk menciptakan solusi digital yang sesuai
                                dengan kebutuhan bisnis Anda.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white text-teal-600 cursor-pointer hover:bg-emerald-50"
                                >
                                    <Link href="/about">Hubungi Saya</Link>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white bg-transparent hover:text-teal-600 hover:bg-slate-100 cursor-pointer"
                                >
                                    Lihat CV
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </WrapperLayout >

        </div >
    )
}
