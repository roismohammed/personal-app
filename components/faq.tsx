"use client"


import React, { useState } from 'react';
import { Badge } from './ui/badge';
import WrapperLayout from './wrapperLayout';
import { useLanguage } from '@/lib/language-context';

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
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'lg:bg-teal-700 text-teal-700 lg:text-white rotate-180' : 'bg-none dark:bg-none  lg:bg-slate-100 text-teal-700'
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
      question: "Layanan apa saja yang bisa saya pesan?",
      answer: "Saya melayani pembuatan website company profile, landing page, portfolio, blog, hingga website bisnis custom sesuai kebutuhan brand Anda."
    },
    {
      question: "Berapa lama proses pembuatan website?",
      answer: "Durasi pengerjaan menyesuaikan kompleksitas fitur. Umumnya website basic selesai dalam 5-10 hari kerja, sedangkan website custom membutuhkan waktu lebih panjang dengan timeline yang disepakati di awal."
    },
    {
      question: "Apakah website bisa responsif di HP dan cepat diakses?",
      answer: "Ya. Website dibangun mobile-first, responsif di berbagai ukuran layar, dan dioptimasi agar loading cepat untuk meningkatkan pengalaman pengguna dan konversi."
    },
    {
      question: "Apakah ada revisi setelah website selesai?",
      answer: "Tentu. Saya menyediakan revisi sesuai ruang lingkup yang disepakati agar hasil akhir benar-benar sesuai kebutuhan bisnis Anda sebelum website dipublikasikan."
    },
    {
      question: "Apakah saya bisa minta maintenance setelah website online?",
      answer: "Bisa. Tersedia layanan maintenance berkala untuk update konten, perbaikan bug, optimasi performa, dan pendampingan teknis setelah website live."
    }
  ];

   const { t } = useLanguage();
  return (
    <div className="min-h-screen dark:bg-zinc-900 text-center bg-white py-16  font-sans antialiased">
      <WrapperLayout>
        <div className="mx-auto ">
          <div className="mb-16 flex flex-col items-center text-center">
            <Badge variant="outline" className="mb-4 border-teal-700/20 text-teal-700">
              FAQ Layanan
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
                  {t("faq_title")}
            </h2>

            <p className="mt-4 text-muted-foreground max-w-2xl">
              {t("faq_desc")}
          
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