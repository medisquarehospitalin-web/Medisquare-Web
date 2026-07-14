"use client";

import Reveal from "@/components/site/Reveal";
import { Quote, Star } from "lucide-react";

// Aapke props ke according interface adjust kar lijiye
interface TestimonialItem {
  rating: number;
  text: string;
  author: string;
}

interface TestimonialProps {
  data: {
    badgeText: string;
    title: string;
    titleHighlight: string;
    items: TestimonialItem[]; // Assuming items are passed here
  };
}

export default function TestimonialSection({ data }: TestimonialProps) {
  const { items } = data;
  
  // Agar 3 se zyada items hain, toh hum unhe scroll karwayenge.
  // Seamless loop ke liye hum array ko double kar dete hain.
  const shouldScroll = items.length > 3;
  const displayItems = shouldScroll ? [...items, ...items] : items;

  return (
    <section className="bg-white py-16 md:py-24 border-t border-slate-100 overflow-hidden">
      
      {/* Auto-scroll Animation CSS (Tailwind config ke bina chalane ke liye) */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 0.75rem)); } /* -50% width aur gap ka half adjust kiya hai */
          }
          .animate-marquee {
            animation: scroll-left 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Reveal>
            <span className="text-[11px] font-bold tracking-widest text-primary uppercase bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm inline-block">
              {data.badgeText}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              {data.title} <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">{data.titleHighlight}</span>
            </h2>
          </Reveal>
        </div>

        {/* Horizontal Scroller Container */}
        <Reveal>
          <div className="relative w-full overflow-hidden">
            
            {/* Left & Right Fade Gradients for smooth scrolling effect (optional) */}
            {shouldScroll && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              </>
            )}

            {/* Scrolling Track */}
            <div 
              className={`flex gap-6 ${
                shouldScroll 
                  ? "animate-marquee w-max" 
                  : "justify-center flex-wrap"
              }`}
            >
              {displayItems.map((item, idx) => (
                <div 
                  key={idx}
                  // Mobile par full width thoda kam, Desktop par 3 cards fit honge (approx 380px)
                  className="group relative flex w-[85vw] sm:w-[350px] md:w-[380px] shrink-0 flex-col justify-between rounded-[24px] border border-slate-100 bg-slate-50 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white"
                >
                  
                  {/* Decorative Quote Icon */}
                  <Quote className="absolute right-6 top-6 h-10 w-10 text-slate-200/50 transition-colors group-hover:text-primary/10" />

                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {Array.from({ length: item.rating || 5 }).map((_, starIdx) => (
                        <Star key={starIdx} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-sm md:text-base leading-relaxed text-slate-600 line-clamp-5">
                      {item.text}
                    </p>
                  </div>

                  {/* Author Profile */}
                  <div className="mt-8 flex items-center gap-4 pt-6 border-t border-slate-200/60">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        {item.author}
                      </h4>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}