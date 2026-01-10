import Footer from "@/components/footer";
import Header01 from "@/components/header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" text-gray-900 dark:text-gray-200">
      <Header01 />
      <div className="bg-gray-50 dark:bg-zinc-800">
        {children}
      </div>
      <Footer />
    </div>
  );
}
