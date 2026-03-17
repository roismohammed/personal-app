"use client";

import Footer from "@/components/footer";
import Header01 from "@/components/header";
import React from "react";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEbookLearnPage = /^\/ebook\/[^/]+\/learn\/?$/.test(pathname || "");
 
  return (
    <div className=" text-gray-900 dark:text-gray-200">
      {!isEbookLearnPage && <Header01 />}
      <div className="bg-gray-50 dark:bg-zinc-800">
        {children}
      </div>
      {!isEbookLearnPage && <Footer />}
    </div>
  );
}
