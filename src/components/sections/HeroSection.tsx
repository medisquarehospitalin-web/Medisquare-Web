"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

interface HeroSectionProps {
  data: {
    title: string;
    breadcrumbText?: string;
    backgroundImage?: string;
  };
}

export default function HeroSection({ data }: HeroSectionProps) {
  const bgImage = data.backgroundImage || "/assets/img/carou_lobby.jpg";
  const title = data.title || "MediSquare Hospital";

  // Parse breadcrumbs. E.g. "HOME > ABOUT US" -> ["HOME", "ABOUT US"]
  const breadcrumbText = data.breadcrumbText || `Home > ${title}`;
  const breadcrumbs = breadcrumbText
    .split(">")
    .map((item) => item.trim())
    .filter(Boolean);

  // Split title to highlight the last word in primary color
  const words = title.split(" ");
  const hasMultipleWords = words.length > 1;
  const mainText = hasMultipleWords ? words.slice(0, -1).join(" ") : title;
  const highlightedText = hasMultipleWords ? words[words.length - 1] : "";

  return (
    <section className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Image - Clear and visible */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <Image
          src={getImageUrl(bgImage)}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.95] scale-102"
        />
        {/* Soft semi-transparent white overlay to ensure dark text readability */}
        <div className="absolute inset-0 bg-white/65" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10 text-center">
        <Reveal>
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
            >
              <Home className="h-3.5 w-3.5 text-primary" />
              <span>Home</span>
            </Link>
            
            {breadcrumbs.map((bc, idx) => {
              // Skip "Home" if it's already there
              if (bc.toLowerCase() === "home") return null;
              
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <ChevronRight className="h-3.5 w-3.5 text-primary" />
                  <span className={isLast ? "text-slate-700" : "text-primary hover:underline cursor-pointer"}>
                    {bc}
                  </span>
                </div>
              );
            })}
          </nav>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Main Title with last word highlighted in primary color */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase font-heading">
            {hasMultipleWords ? (
              <>
                {mainText}{" "}
                <span className="text-primary">{highlightedText}</span>
              </>
            ) : (
              title
            )}
          </h1>
          
          {/* Simple, clean orange accent underline matching the reference */}
          <div className="mt-4 w-16 h-[3px] bg-primary mx-auto rounded-full" />
        </Reveal>
      </div>
    </section>
  );
}
