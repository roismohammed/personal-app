import WrapperLayout from "@/components/wrapperLayout";
import { Briefcase, Calendar } from "lucide-react";

const experience = [
    {
        company: "PT Jadi Mudah Nusantara",
        location: "Remote",
        position: "Front-End Web Developer",
        period: "Oct 2024 - Nov 2024",
        description: "Developed a digital wedding invitation landing page, focusing on high performance and visual aesthetics.",
        tech_stack: ["JavaScript", "Framer Motion", "AOS", "Tailwind CSS"],
    },
    {
        company: "PT Puspetindo",
        location: "Full-time",
        position: "Fullstack Web Developer",
        period: "Aug 2024 - Oct 2024",
        description: "Built responsive CMS web applications and collaborated with design teams for UI/UX implementation while maintaining effective teamwork.",
        tech_stack: ["React.js", "AdonisJS", "Inertia", "Tailwind CSS"],
    },
    {
        company: "Mulia Hati Hospital",
        location: "Remote",
        position: "Junior Developer",
        period: "Apr 2025 - May 2025",
        tech_stack: ["React.js", "Inertia.js", "Laravel", "Tailwind CSS", "Shadcn UI"],
        description: "Developed a modern hospital company profile website with a clean and professional design.",
    }
];
const IndexResume = () => {
    return (
        <WrapperLayout>
            <div className="mt-10 mx-auto py-20">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-10 w-2 bg-teal-500 rounded-full"></div>
                    <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Work Experience
                    </h3>
                </div>

                <div className="relative space-y-2">
                    {/* Line Timeline */}
                    <div className="absolute left-4 md:left-[18px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-zinc-700"></div>

                    {experience.map((job, index) => (
                        <div key={index} className="relative pl-12 pb-12 group">
                            {/* Dot Timeline */}
                            <div className="absolute left-0 top-2 w-9 h-9 bg-white dark:bg-zinc-900 border-4 border-teal-500 rounded-full z-10 group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>

                            <div className="bg-white dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-2xl p-6 md:p-8 hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                            {job.position}
                                        </h4>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 dark:text-zinc-400 text-sm">
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <Briefcase className="w-4 h-4" /> {job.company}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" /> {job.period}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 dark:bg-zinc-700 rounded text-[10px] uppercase tracking-wider font-bold">
                                                {job.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-zinc-300 leading-relaxed mb-6">
                                    {job.description}
                                </p>

                                {/* Tech Stack Badges */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-zinc-700">
                                    {job.tech_stack.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-500/20 rounded-lg text-xs font-semibold"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </WrapperLayout>
    );
};

export default IndexResume;