
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import WrapperLayout from "@/components/wrapperLayout";
import { Code } from "lucide-react";
import ServerProject from "./partials/server-project";


export default async function ProjectPage() {
    // const projects = await fetchProject();

    return (
        <div>
            <div className="bg-transparent relative rounded-lg border-none">
                <GridPattern
                    squares={[
                        [4, 4], [5, 1], [8, 2], [5, 3],
                        [6, 6], [10, 10], [12, 15], [18, 10],
                    ]}
                    className={cn(
                        "pointer-events-none absolute inset-0 z-10 h-full w-full",
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                        "opacity-50 dark:opacity-30"
                    )}
                />

                <div className="relative pt-14 overflow-hidden bg-white dark:bg-zinc-900/60 border-b border-slate-200 dark:border-none">
                    <div className="relative container mx-auto px-4 py-16">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-zinc-700/50 border border-blue-200 dark:border-teal-800 mb-6">
                                <Code className="h-4 w-4 text-cyan-700" />
                                <span className="text-sm font-medium text-teal-700 dark:text-blue-300 ">Portfolio Projects</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold mb-6">Creative Projects</h1>

                            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                                A collection of my work spanning web development, mobile applications, and UI/UX design.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <WrapperLayout>
                <div >
                     <ServerProject/>
                </div>
            </WrapperLayout>
        </div>
    );
}
