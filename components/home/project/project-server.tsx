import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server"
import { ProjectData } from "@/types"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { motion, Variants } from 'motion/react';
import Image from "next/image";
import Link from "next/link";

export default async function ProjectServer() {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6)

    if (error) {
        return <p className="text-center">Gagal memuat project</p>
    }
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                // staggerChildcren: 0.15,
            },
        },
    };
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {projects.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">
                    Tidak ada project
                </p>
            ) : (
                projects?.map((project:ProjectData) => {
                    const techList: string[] =
                        typeof project.tech_stack === "string"
                            ? project.tech_stack
                                .replace(/[\[\]"]/g, "")
                                .split(",")
                                .map((t: string) => t.trim())
                                .filter(Boolean)
                            : Array.isArray(project.tech_stack)
                                ? project.tech_stack.map((t: string) => String(t).trim()).filter(Boolean)
                                : [];

                    return (
                        <Card
                            key={project.id}
                            className="group border pt-0 shadow-none hover:shadow-xl transition-all duration-500 overflow-hidden bg-white/80 dark:bg-zinc-700/50 flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={project.image || "/placeholder.png"}
                                    alt={project.name || project.name || "Project Image"}
                                    fill
                                    className="object-cover transform scale-105 transition-transform duration-500 ease-out group-hover:scale-100"
                                />
                                <div className="absolute top-4 left-4 z-10">
                                    <Badge
                                        variant={project.status === "completed" ? "default" : "secondary"}
                                        className={
                                            project.status === "completed"
                                                ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
                                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                        }
                                    >
                                        {project.status === "completed" ? "Completed" : "In Progress"}
                                    </Badge>
                                </div>
                                <div className="absolute inset-0 bg-black/28 transition-opacity duration-500 ease-out group-hover:opacity-0 pointer-events-none" />

                            </div>

                            <CardHeader className="pb-">
                                <div className="flex items-center justify-between mb-">
                                    <CardTitle className="text-xl group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                                        {project.name}
                                    </CardTitle>
                                    <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                                </div>
                                <CardDescription className="line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-400">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pb-0">
                                <div className="flex flex-wrap gap-2">
                                    {techList.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="outline"
                                            className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:border-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-800"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0 mt-auto">
                                <div className="flex gap-2 w-full">
                                    <Link href={project.link_github || "#"} target="_blank" className="w-full">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 w-full cursor-pointer border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-900/50"
                                        >
                                            <Github className="h-4 w-4 mr-2" /> Code
                                        </Button>
                                    </Link>

                                    <Link href={project.link_demo || "#"} target="_blank" className="w-full">
                                        <Button
                                            size="sm"
                                            className="flex bg-gradient-to-r cursor-pointer w-full from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" /> Demo
                                        </Button>
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>

                    );
                })
            )}


        </motion.div>
    )
}
