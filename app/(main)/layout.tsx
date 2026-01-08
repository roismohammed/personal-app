import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" text-gray-900 dark:text-gray-200">
      <div className="">
        {children}
      </div>
    </div>
  );
}
