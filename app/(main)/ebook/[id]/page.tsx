import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Star, 
  Layout, 
  Layers, 
  Globe 
} from "lucide-react";
import WrapperLayout from '@/components/wrapperLayout';

export default function EbookDetailPage({ params }: { params: { id: string } }) {
  const ebook = {
    title: "Mastering Next.js 15: App Router & Tailwind v4",
    category: "Coding",
    description: "Pelajari framework React paling populer di dunia dengan standar industri terbaru. E-book ini mencakup optimasi performa, server components, dan styling modern.",
    author: {
      name: "Muhammad Rois",
      role: "Frontend & Fullstack Developer",
      image: "👨‍💻"
    },
    benefits: [
      "Pemahaman mendalam App Router",
      "Integrasi Tailwind CSS v4",
      "Best practices SEO & Metadata",
      "Studi kasus proyek nyata"
    ],
    curriculum: [
      { title: "Fundamental Next.js 15", items: ["Server Components", "Streaming & Suspense", "Routing Fundamentals"] },
      { title: "Advanced Styling v4", items: ["Tailwind CSS v4 Setup", "Dynamic Theming", "Container Queries"] }
    ]
  };

  return (
    <WrapperLayout>
      <div className="mt-20 mx-auto py-16 px-4  space-y-24">
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center text-9xl shadow-inner order-2 lg:order-1">
            🚀
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50/50 rounded-full px-4 py-1 uppercase tracking-widest text-[10px] font-bold">
                {ebook.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-tight">
                {ebook.title}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                {ebook.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ebook.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-800 font-medium text-sm">
                  <CheckCircle2 className="text-blue-500" size={18} />
                  {benefit}
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <Link href={`/ebook/${params.id}/learn`}>
                <Button size="lg" className="h-16 px-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-black text-lg gap-3 shadow-xl transition-all active:scale-95 w-full sm:w-auto">
                  Mulai Belajar
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tight">Apa yang akan Anda pelajari?</h2>
            <p className="text-slate-500 mt-2">Kurikulum terstruktur untuk mempercepat pemahaman teknis Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ebook.curriculum.map((section, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <h3 className="text-xl font-bold text-zinc-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Author Section */}
        <div className="bg-zinc-900 rounded-[3rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-zinc-800 rounded-full flex items-center justify-center text-7xl border-4 border-zinc-700 shadow-2xl">
            {ebook.author.image}
          </div>
          <div className="space-y-4 text-center md:text-left">
            <Badge className="bg-blue-600 text-white border-none rounded-md px-3 py-1 font-bold text-[10px] uppercase tracking-widest">Penulis</Badge>
            <h2 className="text-3xl md:text-4xl font-black">{ebook.author.name}</h2>
            <p className="text-zinc-400 text-lg max-w-xl">
              {ebook.author.role}. Memiliki hasrat besar dalam membangun produk digital yang bersih, cepat, dan berdampak bagi komunitas.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-8 py-12">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="fill-yellow-400 text-yellow-400" size={20} />)}
          </div>
          <h2 className="text-4xl font-black text-zinc-900 tracking-tighter">Siap untuk menjadi ahli?</h2>
          <Link href={`/ebook/${params.id}/learn`}>
            <Button size="lg" className="h-16 px-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xl shadow-lg shadow-blue-200">
              Akses Sekarang
            </Button>
          </Link>
        </div>

      </div>
    </WrapperLayout>
  );
}