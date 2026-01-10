import BlogSection from "@/app/(main)/serverHome/blog/blog-section";
import CallToAction from "@/app/(main)/serverHome/callToAction";
import HeroSection from "@/app/(main)/serverHome/hero";
import ProjectSection from "@/app/(main)/serverHome/project/project-section";
import ServiceSection from "@/app/(main)/serverHome/service";

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