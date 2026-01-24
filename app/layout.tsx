import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/language-context";

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
  title: "RoisDev | Frontend & Fullstack Developer",
  description:
    "Halo! Saya Muhammad Rois, seorang junior Software Engineer & Web Developer yang ahli di React, Next.js, dan JavaScript.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.jpeg",
        href: "/favicon.jpeg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "favicon.jpeg",
        href: "/favicon.jpeg",
      },
    ],
  },
  openGraph: {
    title: "RoisDev | Muhammad Rois",
    description:
      "Frontend & Fullstack Developer | React.js, Next.js, Tailwind CSS, Supabase",
    url: "https://roisdev.my.id",
    siteName: "RoisDev",
    images: [
      {
        url: "/favicon.jpeg",
        width: 1200,
        height: 630,
        alt: "RoisDev Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoisDev | Muhammad Rois",
    description:
      "Frontend & Fullstack Developer | React.js, Next.js, Tailwind CSS, Supabase",
    creator: "@roismuhammed",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="70cimSw-hO3RuJf..." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Roisdev",
              url: "https://roisdev.my.id",
              sameAs: [
                "https://www.linkedin.com/in/roismuhammed",
                "https://github.com/roismuhammed",
              ],
              jobTitle: "Software Engineer",
              worksFor: { "@type": "Organization", name: "RoisDev" },
            }),
          }}
        />
        <link
          rel="icon"
          href="/favicon.jpeg"
          media="(prefers-color-scheme: light)"
        ></link>
        <link
          rel="icon"
          href="/favicon.jpeg"
          media="(prefers-color-scheme: dark)"
        ></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geist.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // pastikan ini light
          enableSystem={true} // tetap bisa mengikuti system jika mau
          disableTransitionOnChange={true}
        >
           <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
