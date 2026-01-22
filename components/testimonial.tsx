import React from "react";
import { Star, Quote } from "lucide-react";
import { Badge } from "./ui/badge";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    image: "https://i.pravatar.cc/150?img=1",
    content:
      "Working with this team has been an absolute game-changer for our business. Their attention to detail and commitment to excellence is unmatched.",
    rating: 5,
    company: "TechStart Inc.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=13",
    content:
      "The level of professionalism and expertise demonstrated throughout our project was outstanding. Highly recommend their services!",
    rating: 5,
    company: "Innovation Labs",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    image: "https://i.pravatar.cc/150?img=5",
    content:
      "Exceptional work! They delivered beyond our expectations and the results speak for themselves. Our conversion rate increased by 150%.",
    rating: 5,
    company: "Digital Dynamics",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder & CTO",
    image: "https://i.pravatar.cc/150?img=12",
    content:
      "The technical expertise and creative solutions provided were exactly what we needed. A truly professional team that cares about results.",
    rating: 5,
    company: "CloudSync",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Head of Design",
    image: "https://i.pravatar.cc/150?img=9",
    content:
      "From concept to execution, everything was seamless. The design quality and user experience are top-notch. Couldn't be happier!",
    rating: 5,
    company: "Creative Studio",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "VP of Operations",
    image: "https://i.pravatar.cc/150?img=14",
    content:
      "Their strategic approach and ability to understand our needs made all the difference. The ROI has been phenomenal.",
    rating: 5,
    company: "Global Solutions",
  },
  {
    id: 7,
    name: "Amanda Lee",
    role: "Brand Manager",
    image: "https://i.pravatar.cc/150?img=10",
    content:
      "Outstanding quality and incredible turnaround time. They truly understand what it means to deliver excellence.",
    rating: 5,
    company: "BrandWorks",
  },
  {
    id: 8,
    name: "Robert Martinez",
    role: "Tech Lead",
    image: "https://i.pravatar.cc/150?img=15",
    content:
      "Best decision we made for our product development. The team's expertise and dedication are second to none.",
    rating: 5,
    company: "DevHub",
  },
];

const TestimonialCard = ({ testimonial }:any) => (
  <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-zinc-800 hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300 w-[350px] mx-4 flex-shrink-0">
    <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
      <Quote className="w-5 h-5 text-white" />
    </div>

    <div className="flex gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>

    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-sm">
      "{testimonial.content}"
    </p>

    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
      <div className="relative">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100 dark:ring-teal-900"
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center">
          <svg
            className="w-2.5 h-2.5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
          {testimonial.name}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {testimonial.role}
        </p>
        <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
          {testimonial.company}
        </p>
      </div>
    </div>
  </div>
);

type MarqueeProps = {
  children: React.ReactNode;
  reverse?: boolean;
};

const Marquee = ({ children, reverse = false }: MarqueeProps) => {
  return (
    <div className="relative flex overflow-hidden">
      <div
        className={`flex gap-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default function TestimonialMarquee() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-teal-950 py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="mb-4">
              Testimonial
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our amazing clients
              have to say about working with us.
            </p>
          </div>

          {/* Marquee Rows */}
          <div className="space-y-4 mb-16">
            <Marquee>
              {firstRow.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </Marquee>

            {/* Second Row - Right to Left */}
            <Marquee reverse>
              {secondRow.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </Marquee>
          </div>

       
        </div>
      </div>
    </>
  );
}
