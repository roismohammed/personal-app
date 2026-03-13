import React from "react"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geist = Geist({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roisdev.my.id"),
  title: "RoisDev | Frontend & Fullstack Developer",
  description: "Halo! Saya Muhammad Rois, seorang junior Software Engineer & Web Developer yang ahli di React, Next.js, dan JavaScript.",
  keywords: ["Roisdev" ,"Muhammad Rois","frontend developer", "fullstack developer", "React.js", "Next.js", "JavaScript", "Web Developer"],
  authors: [{ name: "Muhammad Rois" }],
  creator: "Muhammad Rois",
  icons: {
    icon: "/favicon.jpeg",
    apple: "/favicon.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://roisdev.my.id",
    title: "RoisDev | Frontend & Fullstack Developer",
    description: "Frontend & Fullstack Developer | React.js, Next.js, Tailwind CSS, Supabase",
    siteName: "RoisDev",
    images: [
      {
        url: "/favicon.jpeg",
        width: 1200,
        height: 630,
        alt: "RoisDev - Muhammad Rois Frontend & Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoisDev | Frontend & Fullstack Developer",
    description: "Frontend & Fullstack Developer | React.js, Next.js, Tailwind CSS, Supabase",
    creator: "@roismuhammed",
    images: ["/favicon.jpeg"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geist.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <LanguageProvider>{children}</LanguageProvider>
          <Analytics />
          <SpeedInsights/>
        </ThemeProvider>
      </body>
    </html>
  );
}