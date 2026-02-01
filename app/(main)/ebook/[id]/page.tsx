"use client"
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Star,
  Zap,
  ShieldCheck,
  Globe,
  PlayCircle
} from "lucide-react";
import WrapperLayout from '@/components/wrapperLayout';
import { VideoDemo } from '@/components/video-demo';

const ebookData = {
  title: "Mastering Next.js 15: App Router & Tailwind v4",
  category: "Coding",
  description: "Pelajari framework React paling populer di dunia dengan standar industri terbaru. E-book ini mencakup optimasi performa, server components, dan styling modern.",
  author: {
    name: "Muhammad Rois",
    role: "Frontend & Fullstack Developer",
    bio: "Berpengalaman dalam membangun sistem manajemen konten (CMS) dan aplikasi web berskala besar menggunakan ekosistem Next.js & Supabase. Berfokus pada penulisan kode yang bersih dan standar industri global.",
    avatar: "👨‍💻"
  },
  premiumBenefits: [
    {
      title: "Standard Industri",
      desc: "Materi disusun berdasarkan standar kebutuhan perusahaan teknologi internasional seperti di Singapura.",
      icon: <Globe className="text-teal-700" size={24} />
    },
    {
      title: "Materi Up-to-Date",
      desc: "Menggunakan Next.js 15 dan Tailwind v4 versi terbaru. Tidak ada materi usang.",
      icon: <Zap className="text-teal-700" size={24} />
    },
    {
      title: "Akses Selamanya",
      desc: "Sekali beli, dapatkan akses ke semua pembaruan materi di masa depan secara gratis.",
      icon: <ShieldCheck className="text-teal-700" size={24} />
    }
  ],
  benefits: [
    "Pemahaman App Router",
    "Integrasi Tailwind CSS v4",
    "Best practices SEO & Metadata",
    "Studi kasus proyek nyata",
    "Optimasi Core Web Vitals",
    "Deployment ke Vercel & Docker"
  ],
  tools: [
    { name: "Next.js 15", icon: "🚀" },
    { name: "Tailwind v4", icon: "🎨" },
    { name: "TypeScript", icon: "📘" },
    { name: "Supabase", icon: "⚡" },
    { name: "Prisma", icon: "💎" },
    { name: "Vercel", icon: "▲" }
  ],
  screenshots: [
    { title: "Dashboard UI", desc: "Tampilan admin yang modern", color: "bg-blue-100" },
    { title: "Responsive Design", desc: "Optimal di semua perangkat", color: "bg-teal-100" },
  ],
  curriculum: [
    { title: "Fundamental Next.js 15", items: ["Server Components", "Streaming & Suspense", "Routing Fundamentals"] },
    { title: "Advanced Styling v4", items: ["Tailwind CSS v4 Setup", "Dynamic Theming", "Container Queries"] }
  ]
};

export default function EbookDetailPage({ params }: { params: { id: string } }) {
  return (
    <WrapperLayout>
      <div className="mt-20 mx-auto py-16 px-4 space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-slate-50 dark:bg-zinc-700 dark:border-zinc-600 rounded-[3rem] border border-slate-100 flex items-center justify-center text-9xl shadow-inner order-2 lg:order-1 relative overflow-hidden group">
            <span className="group-hover:scale-110 transition-transform duration-500">🚀</span>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="outline" className="text-teal-700 border-blue-100 bg-blue-50/50 rounded-full px-4 py-1 uppercase tracking-widest text-[10px] font-bold">
                {ebookData.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-gray-200 leading-tight ">
                {ebookData.title}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                {ebookData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {ebookData.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-800 dark:text-gray-200 font-bold text-sm">
                  <CheckCircle2 className="text-teal-700" size={18} />
                  {benefit}
                </div>
              ))}
            </div>

          </div>
        </div>


        <div className='space-y-4'>
           <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-3xl font-black text-zinc-800 dark:text-gray-200 tracking-tighter italic">Video Demo</h2>
            <div className="w-24 h-2 bg-teal-700 mx-auto rounded-full" />
          </div>
          <VideoDemo />
        </div>

        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-3xl font-black text-zinc-800 dark:text-gray-200 tracking-tighter italic">Mengapa E-Book Ini?</h2>
            <div className="w-24 h-2 bg-teal-700 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ebookData.premiumBenefits.map((item, i) => (
              <div key={i} className="p-10 bg-white dark:bg-zinc-700 rounded-[3rem] border  border-slate-200 dark:border-zinc-700 shadow-none hover:shadow-sm transition-all duration-300 group ">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-7 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-zinc-900 dark:text-gray-200 mb-3 uppercase tracking-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>


        <div className="space-y-12 -mx-4 px-4  rounded-[4rem]">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-gray-200 tracking-tight italic">Powered By Latest Tech</h2>
            <p className="text-slate-500 font-medium">Teknologi standar industri yang akan Anda kuasai.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {ebookData.tools.map((tool, i) => (
              <div key={i} className="bg-white dark:bg-zinc-700 p-6 rounded-[2rem] border border-slate-200 dark:border-zinc-600 flex flex-col items-center gap-3 shadow-none  hover:scale-105 transition-transform">
                <span className="text-3xl">{tool.icon}</span>
                <span className="font-bold text-xs uppercase tracking-tighter">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-gray-200 tracking-tight italic">Kurikulum Terstruktur</h2>
            <p className="text-slate-500 font-medium">Didesain untuk mempercepat pemahaman teknis Anda dari nol.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ebookData.curriculum.map((section, idx) => (
              <div key={idx} className="p-10 bg-white dark:bg-zinc-700 rounded-[2.5rem] border dark:border-zinc-600 border-slate-200 shadow-none">
                <h3 className="text-xl font-black text-zinc-900 dark:text-gray-200 mb-6 flex items-center gap-3 italic">
                  <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">0{idx + 1}</div>
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-gray-300 font-bold text-sm  tracking-tight">
                      <Zap className="text-teal-500" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <section className="bg-zinc-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-700/20 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="w-40 h-40 md:w-56 md:h-56 bg-zinc-800 rounded-[3rem] rotate-3 flex items-center justify-center text-7xl border-4 border-zinc-700 shadow-2xl transition-transform group-hover:rotate-0">
              {ebookData.author.avatar}
            </div>
            <div className="space-y-6 text-center md:text-left flex-1">
              <div className="space-y-2">
                <Badge className="bg-teal-700 text-white border-none rounded-md px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em]">The Instructor</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">{ebookData.author.name}</h2>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">{ebookData.author.role}</p>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl font-medium">
                {ebookData.author.bio}
              </p>
            </div>
          </div>
        </section>


        <div className="bg-none  text-center space-y-8 relative overflow-hidden">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="fill-yellow-400 text-yellow-400" size={24} />)}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase">Mulai Karier Fullstack <br /> Anda Sekarang.</h2>
          <Link href={`/ebook/${params.id}/learn`}>
            <Button size="lg" className="h-16 px-10  rounded-full bg-teal-700 hover:bg-teal-600 cursor-pointer transition-all text-white font-black text-xl shadow-none duration-200 active:scale-95 uppercase tracking-widest">
              AKSES SEKARANG
            </Button>
          </Link>
          <p className="text-gray-400 mt-4 font-bold uppercase tracking-widest text-xs italic">Garansi Update Materi Selamanya</p>
        </div>

      </div>


    </WrapperLayout>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}