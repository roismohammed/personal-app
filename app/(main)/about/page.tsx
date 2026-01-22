"use client";
import { MapPin, Calendar, Download } from "lucide-react";
import myImage from "@/public/assets/images/roisbaru.jpeg";
import Image from "next/image";
import { MarqueeDemo } from "@/components/marquee-demo";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  File01Icon,
  Github01Icon,
  InstagramIcon,
  Linkedin01Icon,
  TiktokFreeIcons,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import WrapperLayout from "@/components/wrapperLayout";
import GithubPage from "@/components/github";

const AboutPage = () => {
  const personalInfo = {
    name: "Muhammad Rois",
    title: "Full-Stack Developer ",
    location: "San Francisco, CA",
    email: "oliver@scott.dev",
    experience: "5+ Years",
    bio: "I'm passionate about creating digital experiences that are not only visually appealing but also functional, accessible, and user-centered. I believe in the power of clean code and thoughtful design to solve real-world problems.",
    longBio:
      "With over 5 years of experience in web development and design, I've had the privilege of working with startups and established companies to bring their digital visions to life. My journey began with a curiosity about how websites work, and it has evolved into a passion for creating seamless, intuitive user experiences.",
  };

  return (
    <div className="min-h-screen dark:bg-zinc-800">
      {/* Hero Section */}

      <section className="relative py-20 pt-36 bg-gray-100 dark:bg-zinc-800 ">
        <div className="absolute inset-0 "></div>
        <div className=" mx-auto lg:px-4 relative">
          <WrapperLayout>
            <div className="px-0 lg:px-14 mx-auto">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4  ">
                <div className="lg:col-span-1 flex lg:sticky lg:top-30 self-start flex-col items-center lg:items-start">
                  <div className="relative mb-8">
                    <div className="w-64 h-64 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl shadow flex items-center justify-center">
                      <Image
                        src={myImage}
                        alt="Profile"
                        className="w-62 h-62 rounded-xl z-20"
                      />
                    </div>
                  </div>

                  <div className="text-center lg:text-left">
                    <h1 className="text-3xl text-center font-bold text-slate-900 dark:text-gray-200 mb-2">
                      {personalInfo.name}
                    </h1>
                    <p className="text-xl text-center text-slate-600 dark:text-gray-500 mb-6">
                      {personalInfo.title}
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center mb-6">
                      <a
                        href="../../../public/assets/mycv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        Download CV
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bio & Stats */}
                <div className="lg:col-span-3 space-y-6 mt-5 lg:mt-0">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-200 mb-4">
                      Hello! 👋
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-gray-200 leading-relaxed mb-6">
                      {personalInfo.bio}
                    </p>
                    <p className="text-slate-600 text-lg leading-relaxed dark:text-gray-200">
                      {personalInfo.longBio}
                    </p>
                  </div>
                  <Link href="/resume">
                    <Button
                      variant="outline"
                      className="cursor-pointer dark:text-gray-200"
                    >
                      <HugeiconsIcon
                        icon={File01Icon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                      My Resume
                    </Button>
                  </Link>
                  <div className="mt-8">
                    <p className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-4 z-10">
                      Tech Stack
                    </p>
                    <div className="-mt-10">
                      <MarqueeDemo />
                    </div>
                  </div>

                  <GithubPage />

                  {/* Contact Info */}
                  <p className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-4 z-10">
                    Lets Connect
                  </p>
                  <p className="text-md text-slate-600 dark:text-gray-200 leading-relaxed mb-6">
                    Questions or collaborations? Reach out to me at{" "}
                    <a
                      href="mailto: id.roismohammed@gmail.com"
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      id.roismohammed@gmail.com
                    </a>{" "}
                    or connect through social media. Lets build something
                    amazing together!
                  </p>
                  <div className="flex flex-wrap gap-6 text-slate-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span>{personalInfo.experience} Experience</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    {[
                      {
                        icon: Github01Icon,
                        href: "https://github.com/roismohammed",
                        color:
                          "text-slate-700  dark:text-gray-200 hover:text-slate-900",
                      },
                      {
                        icon: Linkedin01Icon,
                        href: "https://www.linkedin.com/in/muhammad-rois-8a4a74283/",
                        color: "text-blue-600 hover:text-blue-700",
                      },
                      {
                        icon: TiktokFreeIcons,
                        href: "https://www.tiktok.com/@ig_roisdev",
                        color:
                          "text-black dark:text-gray-200 hover:text-gray-700",
                      },
                      {
                        icon: InstagramIcon,
                        href: "https://www.instagram.com/roisdev_/",
                        color: "text-pink-500 hover:text-pink-600",
                      },
                    ].map((SocialIcon, index) => (
                      <a
                        key={index}
                        href={SocialIcon.href}
                        className={`p-3 bg-white dark:bg-zinc-700/50 rounded-xl shadow-sm border hover:shadow-md transition-all ${SocialIcon.color}`}
                      >
                        <HugeiconsIcon
                          icon={SocialIcon.icon}
                          className="h-5 w-5"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </WrapperLayout>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
