"use client";
import { useState } from "react";
import WrapperLayout from "@/components/wrapperLayout";
import { Award, Calendar, CheckCircle2, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import englishCourse from '../../../public/assets/sertificate/english-course.png'
import ReactCourse from '../../../public/assets/sertificate/bwa-course.png'
import perusahaan from '../../../public/assets/sertificate/pt-jadi-mudah.png'
import juara from '../../../public/assets/sertificate/juara.jpeg'
import lks from '../../../public/assets/sertificate/lks.jpeg'
import codepolitan from '../../../public/assets/sertificate/codepolitan-course.png'




const certificates = [

    {
        title: "Fulstack Developer",
        issuer: "BuildWithAngga Course",
        date: "January 2026",
        category: "Course",
        image: ReactCourse.src
    },
    {
        title: "Remote Work",
        issuer: "PT Jadi Mudah Nusantara",
        date: "Oktober 2024",
        category: "Working",
        image: perusahaan.src
    },
    {
        title: "Bangun Website dengan AI Assist dan Deploy Instan Secure di EdgeOne",
        issuer: "CodePolitan",
        date: "February 2026",
        category: "Bootcamp",
        image: codepolitan.src
    },
     {
        title: "Champion",
        issuer: "Universitas Trunojoyo Madura",
        date: "November 2025",
        category: "Champion",
        image: juara.src
    },
      {
        title: "LKS participants",
        issuer: "Bangkalan",
        date: "February 2025",
        category: "Champion",
        image: lks.src
    },
      {
        title: "English Course",
        issuer: "English For Everyone",
        date: "Januari 2026",
        category: "Course",
        image: englishCourse.src
    },
];

const CertificatesPage = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

    return (
        <WrapperLayout>
            <div className="mt-10 mx-auto py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Award className="w-8 h-8 text-teal-500" />
                            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Certificates
                            </h3>
                        </div>
                        <p className="text-slate-600 dark:text-zinc-400 max-w-xl">
                            A collection of professional certifications and courses I have completed to enhance my technical expertise.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImg(cert.image)}
                            className="group relative bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer "
                        >
                            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-zinc-900">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-700 "
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                                        <Maximize2 className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm dark:text-white">
                                        {cert.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 mb-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-tighter">Verified Achievement</span>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                    {cert.title}
                                </h4>
                                <div className="flex flex-col gap-1 text-sm text-slate-500 dark:text-zinc-400">
                                    <p className="font-medium">{cert.issuer}</p>
                                    <div className="flex items-center gap-1.5 opacity-70">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>Issued {cert.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
                        >
                            <button
                                onClick={() => setSelectedImg(null)}
                                className="absolute -top-12 right-0 text-white hover:text-teal-400 transition-colors flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
                            >
                                <X className="w-5 h-5" />
                                <span className="text-sm font-medium">Close</span>
                            </button>
                            <img
                                src={selectedImg}
                                alt="Certificate Preview"
                                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </WrapperLayout>
    );
};

export default CertificatesPage;