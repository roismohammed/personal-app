import React from "react";

export default function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
}
