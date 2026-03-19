import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | RoisDev",
  description:
    "Profil Muhammad Rois, Full-Stack Developer. Lihat pengalaman, tech stack, dan cara terhubung.",
  alternates: {
    canonical: "https://roisdev.my.id/about",
  },
  openGraph: {
    type: "website",
    url: "https://roisdev.my.id/about",
    title: "About | RoisDev",
    description:
      "Profil Muhammad Rois, Full-Stack Developer. Lihat pengalaman, tech stack, dan cara terhubung.",
    images: [
      {
        url: "/favicon.jpeg",
        width: 1200,
        height: 630,
        alt: "About RoisDev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | RoisDev",
    description:
      "Profil Muhammad Rois, Full-Stack Developer. Lihat pengalaman, tech stack, dan cara terhubung.",
    images: ["/favicon.jpeg"],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
