"use client"


import React, { useState } from 'react';
import { Badge } from './ui/badge';
import WrapperLayout from './wrapperLayout';

interface FAQ {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQ> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border-b cursor-pointer border-slate-100 py-4 transition-all">
      <button
        className="flex w-full items-center text-muted-foregroun cursor-pointer justify-between text-left group focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span
          className={`text-md lg:text-lg font-semibold text-muted-foreground  transition-colors duration-300 ${isOpen ? 'text-teal-700' : 'text-slate-700 group-hover:text-teal-600'
            }`}
        >
          {question}
        </span>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'lg:bg-teal-700 text-teal-700 lg:text-white rotate-180' : 'bg-white lg:bg-slate-100 text-teal-700'
            }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all  duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-slate-50 p-4 dark:bg-zinc-800 rounded-xl border-l-4 border-teal-700">
          <p className="dark:text-zinc-200 leading-relaxed font-medium">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const CodingQAPage: React.FC = () => {
  const codingFaqs: FAQ[] = [
    {
      question: "Apa teknologi stack yang ideal untuk performa tinggi?",
      answer: "Kombinasi Next.js dengan App Router, TypeScript, dan Tailwind CSS adalah standar industri saat ini. Untuk database, menggunakan ORM seperti Prisma atau Drizzle mempercepat pengembangan dengan type-safety yang kuat."
    },
    {
      question: "Bagaimana cara efektif melakukan Debugging pada aplikasi Web?",
      answer: "Manfaatkan Chrome DevTools secara maksimal, gunakan fitur 'Source Maps' untuk melacak error di file asli, dan integrasikan tools seperti Sentry untuk monitoring error di sisi produksi secara real-time."
    },
    {
      question: "Bagaimana Gemini AI mengoptimalkan workflow koding?",
      answer: "Gemini membantu dalam melakukan refactoring kode yang kompleks, memberikan saran boilerplate, hingga menjelaskan dokumentasi API secara instan. Ini memungkinkan kita fokus pada arsitektur besar aplikasi."
    },
    {
      question: "Mengapa TypeScript wajib dikuasai oleh Web Developer modern?",
      answer: "TypeScript meminimalisir error saat runtime melalui static typing. Ini sangat membantu dalam kolaborasi tim besar dan memastikan kontrak data antar komponen atau API tetap konsisten."
    }
  ];

  return (
    <div className="min-h-screen dark:bg-zinc-900 text-center bg-white py-16  font-sans antialiased">
      <WrapperLayout>
        <div className="mx-auto ">
          <div className="mb-16 flex flex-col items-center text-center">
            <Badge variant="outline" className="mb-4 border-teal-700/20 text-teal-700">
              Developer Q&A
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
              Coding <span className="text-teal-700">Knowledge</span> Base
            </h2>

            <p className="mt-4 text-muted-foreground max-w-2xl">
              Wawasan seputar pengembangan perangkat lunak, efisiensi workflow dengan AI, dan implementasi teknologi terbaru.
            </p>
          </div>

          <div className="space-y-2 -mt-4 ">
            {codingFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>


        </div>
      </WrapperLayout>
    </div>
  );
};

export default CodingQAPage;