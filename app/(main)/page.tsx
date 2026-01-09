import BlogSection from "@/app/(main)/server/blog/blog-section";
import CallToAction from "@/app/(main)/server/callToAction";
import HeroSection from "@/app/(main)/server/hero";
import ProjectSection from "@/app/(main)/server/project/project-section";
import ServiceSection from "@/app/(main)/server/service";

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