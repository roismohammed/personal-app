import ProjectSection from "./partials/project-section";
import BlogSection from "./partials/blog-section";
import HeroSection from "./partials/hero-sections";
import ServiceSection from "./partials/service-section";
import CallToAction from "./partials/callt-action";
import TestimonialMarquee from "@/components/testimonial";

export default function Page() {
  return (
    <div>
      <div className="min-h-screen dark:from-zinc-900 dark:to-zinc-800 font-sans">
        <HeroSection/>
        <ServiceSection />
        <ProjectSection />
        <BlogSection/>
        <CallToAction/>
      </div>
    </div>
  );
}