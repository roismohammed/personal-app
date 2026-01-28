import Link from 'next/link';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import WrapperLayout from '@/components/wrapperLayout';

const ebooks = [
  { id: '1', title: 'Panduan Frontend Developer', category: 'Coding', image: '📚' },
  { id: '2', title: 'Mastering Next.js 15', category: 'Coding', image: '🚀' },
  { id: '3', title: 'UI/UX Design Fundamental', category: 'Design', image: '🎨' },
];

export default function EbookListPage() {
  return (
   <WrapperLayout>
     <div className="mt-8 mx-auto py-20 px-4">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-black text-zinc-900 mb-4 tracking-tight">E-Book Saya</h1>
        <p className="text-slate-500">Perdalam pengetahuan Anda melalui koleksi bacaan eksklusif kami.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ebooks.map((ebook) => (
          <Card key={ebook.id} className="py-0 group overflow-hidden border-slate-100 shadow-none hover:border-blue-500 transition-all rounded-[2rem]">
            <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform">
              {ebook.image}
            </div>
            <CardContent className="p-6">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{ebook.category}</span>
              <h3 className="text-xl font-bold text-zinc-900 mt-2 leading-tight">{ebook.title}</h3>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link href={`/ebook/${ebook.id}`} className="w-full">
                <Button className="w-full rounded-full cursor-pointer bg-zinc-900 hover:bg-zinc-800 gap-2 font-bold">
                  Mulai Membaca <ArrowRight size={16} />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
   </WrapperLayout>
  );
}