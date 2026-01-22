import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Code, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "../layout";
import WrapperLayout from "@/components/wrapperLayout";

// Type definition for project data
interface ProjectData {
  id: number;
  name: string;
  description: string;
  image: string;
  status: "completed" | "in_progress";
  tech_stack: string | string[];
  link_github: string;
  link_demo: string;
}

// Mock projects data - replace with actual data fetching
const mockProjects: ProjectData[] = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "A modern e-commerce platform with real-time inventory management and payment integration",
    image: "/placeholder.png",
    status: "completed",
    tech_stack: "React, Next.js, TypeScript, Tailwind, Node.js",
    link_github: "https://github.com",
    link_demo: "https://demo.com"
  },
  {
    id: 2,
    name: "Task Management App",
    description: "Collaborative task management application with drag-and-drop functionality",
    image: "/placeholder.png",
    status: "in_progress",
    tech_stack: ["React", "TypeScript", "Firebase", "shadcn/ui"],
    link_github: "https://github.com",
    link_demo: "https://demo.com"
  },
  {
    id: 3,
    name: "Portfolio Website",
    description: "Personal portfolio website with modern design and animations",
    image: "/placeholder.png",
    status: "completed",
    tech_stack: "Next.js, Framer Motion, Tailwind CSS",
    link_github: "https://github.com",
    link_demo: "https://demo.com"
  },
  {
    id: 4,
    name: "Weather Dashboard",
    description: "Real-time weather dashboard with multiple location support",
    image: "/placeholder.png",
    status: "completed",
    tech_stack: "Vue.js, Chart.js, Weather API",
    link_github: "https://github.com",
    link_demo: "https://demo.com"
  },
  {
    id: 5,
    name: "Fitness Tracker",
    description: "Mobile app for tracking workouts and nutrition plans",
    image: "/placeholder.png",
    status: "in_progress",
    tech_stack: "React Native, Firebase, Redux",
    link_github: "https://github.com",
    link_demo: "https://demo.com"
  },
  {
    id: 6,
    name: "Chat Application",
    description: "Real-time chat application with video call functionality",
    image: "/placeholder.png",
    status: "completed",
    tech_stack: "Socket.io, Express, MongoDB, React",
    link_github: "https://github.com",
    link_demo: "https://demo.com"
  }
];

export default function ProjectPage() {
  const projects = mockProjects; // Replace with actual data fetching

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

        <div className="relative pt-14 overflow-hidden bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-none">
          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-zinc-700/50 border border-blue-200 dark:border-teal-800 mb-6">
                <Code className="h-4 w-4 text-cyan-700" />
                <span className="text-sm font-medium text-teal-700 dark:text-blue-300">Portfolio Projects</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">Creative Projects</h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                A collection of my work spanning web development, mobile applications, and UI/UX design.
              </p>
            </div>
          </div>
        </div>
      </div>

      <WrapperLayout>
        <div className="container mx-auto py-6 mb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project: ProjectData) => {
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
                      alt={project.name || "Project Image"}
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

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                        {project.name}
                      </CardTitle>
                      <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                    </div>
                    <CardDescription className="line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2">
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

                  <CardFooter className="pt-4 mt-auto">
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
            })}
          </div>
        </div>
      </WrapperLayout>
    </div>
  );
}