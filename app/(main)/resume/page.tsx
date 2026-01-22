import WrapperLayout from "@/components/wrapperLayout";
import MainLayout from "../layout";



const experience = [
    {
        company: "PT Jadi Mudah Nusantara - Remote Work",
        position: "Front-End Web Developer",
        period: "Oktober 2024 - November 2024",
        description: "Leading development of web applications using modern technologies and best practices.",
        achievements: ["Improved performance by 40%", "Mentored 3 junior developers"]
    },
    {
        company: "PT Puspetindo - Full-time",
        position: "Fullstuck Web Developer",
        period: "Agustus 2024 - Oktober 2024",
        description: "Developed responsive web applications and collaborated with design teams.",
        achievements: ["Delivered 15+ projects", "Implemented design system"]
    },
    {
        company: "Rumah Sakit Mulia Hati - Remote Work",
        position: "Junior Developer",
        period: "2025 - 2025",
        description: "Built and maintained web applications in a fast-paced startup environment.",
        achievements: ["Reduced load time by 60%", "Built MVP in 3 months"]
    }
];

const IndexResume = () => {
    return (
     <MainLayout>
           <WrapperLayout>
            <div className="space-y-8 mt-26">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-200 mb-6">Work Experience</h3>
                <div className="space-y-8">
                    {experience.map((job, index) => (
                        <div key={index} className="flex gap-6 group dark:bg-zinc-800">
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 bg-teal-500 rounded-full mt-2"></div>
                                <div className="w-0.5 h-full bg-slate-200 group-last:h-0"></div>
                            </div>
                            <div className="flex-1 pb-8 group-last:pb-0">
                                <div className="bg-slate-50 dark:bg-zinc-700 rounded-xl p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                        <h4 className="text-xl font-semibold text-slate-900 dark:text-gray-200">{job.position}</h4>
                                        <span className="text-teal-600 dark:text-gray-200 font-medium">{job.period}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 mb-3">
                                        <span className="font-medium dark:text-gray-200">{job.company}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-gray-200 mb-4 leading-relaxed">
                                        {job.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {/* {job.achievements.map((achievement, achIndex) => (
                                            <span
                                                key={achIndex}
                                                className="px-3 py-1 bg-blue-100 dak:bg-zinc-800 text-teal-700 dark:text-gray-200 rounded-full text-sm"
                                            >
                                                {achievement}
                                            </span>
                                        ))} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </WrapperLayout>
     </MainLayout>
    )
}

export default IndexResume