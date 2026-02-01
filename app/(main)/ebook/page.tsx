import Link from 'next/link';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import WrapperLayout from '@/components/wrapperLayout';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

const ebooks = [
  { id: '1', title: 'Panduan Frontend Developer', category: 'Coding', image: '📚' },
  { id: '2', title: 'Mastering Next.js 15', category: 'Coding', image: '🚀' },
  { id: '3', title: 'UI/UX Design Fundamental', category: 'Design', image: '🎨' },
];

export default function EbookListPage() {
  return (
    <div>
      <div className="bg-transparent relative rounded-lg border-none">
        <GridPattern
          squares={[
            [4, 4], [5, 1], [8, 2], [5, 3], [6, 6],
            [10, 10], [12, 15], [18, 10],
          ]}
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full",
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "opacity-50 dark:opacity-30",
          )}
        />

        <div className="relative overflow-hidden pt-14 bg-white dark:bg-zinc-900 border-b">
          <div className="container mx-auto px-4 py-12 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-zinc-700/50 mb-6">
              <BookOpen className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium">Course</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ebooks Saya
            </h1>

            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Perdalam pengetahuan Anda melalui koleksi bacaan eksklusif kami.
            </p>
          </div>
        </div>
      </div>

      <WrapperLayout>
        <div className="py-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ebooks.map((ebook) => (
              <Card key={ebook.id} className="py-0 dark:bg-zinc-700 group overflow-hidden border-gray-200 dark:border-zinc-600 shadow-none hover:border-teal-500 transition-all rounded-[2rem]">
                <div className="aspect-[4/3] bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform">
                  {ebook.image}
                </div>
                <CardContent className="p-6 -mt-4">
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-700/10 px-4 py-1 rounded-full uppercase tracking-widest">{ebook.category}</span>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-4 leading-tight">{ebook.title}</h3>
                </CardContent>
                <CardFooter className="p-6 -mt-4 pt-0">
                  <Link href={`/ebook/${ebook.id}`} className="w-full">
                    <Button className="w-full rounded-full cursor-pointer bg-zinc-900 dark:bg-zinc-900 dark:text-white hover:bg-zinc-800 gap-2 font-bold">
                      Mulai Membaca <ArrowRight size={16} />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </WrapperLayout>
    </div>
  );
}