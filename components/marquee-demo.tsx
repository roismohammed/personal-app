"use client";

import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import react from '@/public/assets/logo/react.png'
import next from '@/public/assets/logo/nextjs.png'
import tailwinds from '@/public/assets/logo/tailwinds.png'
import javascript from '@/public/assets/logo/javascript.png'
import typscript from '@/public/assets/logo/typescript.png'
import inertia from '@/public/assets/logo/inertia.png'
import adonis from '@/public/assets/logo/adonis.png'

interface TechItem {
  name: string;
  img: StaticImageData;
}

const techStack: TechItem[] = [
  {
    name: "Next.js",
    img: next,
  },
  {
    name: "React",
    img: react,
  },
  {
    name: "Tailwind CSS",
    img: tailwinds,
  },
  {
    name: "Adonis.js",
    img: adonis,
  },
  {
    name: "TypeScript",
    img: typscript,
  },
  {
    name: "Javascript",
    img: javascript,
  },
  {
    name: "Inertia.js",
    img: inertia,
  },
];

const firstRow = techStack.slice(0, Math.ceil(techStack.length / 2));
const secondRow = techStack.slice(Math.ceil(techStack.length / 2));


const TechCard = ({ img, name }: { img: StaticImageData; name: string }) => {
  return (
    <div
      className={cn(
        "relative h-14 px-7 cursor-pointer overflow-hidden rounded-xl border flex items-center justify-center",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex items-center gap-2">
        <Image 
          src={img} 
          alt={name} 
          width={30} 
          height={30} 
          className="object-contain rounded-md" 
        />
        <p className="text-sm font-medium">{name}</p>
      </div>
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col bg-transparent items-center justify-center overflow-hidden py-10">
      <Marquee pauseOnHover className="[--duration:18s]">
        {firstRow.map((item) => (
          <TechCard key={item.name} {...item} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:18s]">
        {secondRow.map((item) => (
          <TechCard key={item.name} {...item} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r  dark:from-zinc- to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l  dark:from to-transparent" />
    </div>
  );
}