import BlogSection from "@/components/home/blog";
import CallToAction from "@/components/home/callToAction";
import HeroSection from "@/components/home/hero";
import ProjectSection from "@/components/home/project";
import ServiceSection from "@/components/home/service";

export default function Page() {
  return (
    <div>
      <div className="min-h-screen dark:from-zinc-900 dark:to-zinc-800 font-sans">
        <HeroSection />
        <ServiceSection />
        <ProjectSection />
        <BlogSection />
        <CallToAction />
      </div>
    </div>
  );
}