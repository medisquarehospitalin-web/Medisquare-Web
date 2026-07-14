"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import Reveal from "@/components/site/Reveal";

interface SlideImage {
  id?: string;
  fileUrl: string;
  altText?: string;
}

interface SlideData {
  image?: SlideImage;
}

interface HeroSliderProps {
  data: {
    slides?: SlideData[];
  };
}

export default function HeroSlider({ data }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = data?.slides || [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[activeIndex];
  const imageSrc = getImageUrl(currentSlide?.image?.fileUrl);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <section className="relative w-full h-[calc(100vh-80px)] lg:h-[calc(100vh-116px)] flex flex-col justify-between bg-slate-50 overflow-hidden pt-12 pb-10">
      
      {/* Background Slideshow (Ken Burns Zoom Effect) */}
      <div className="absolute inset-0 w-full h-full z-0 bg-slate-900">
        <AnimatePresence>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={imageSrc}
              alt={currentSlide?.image?.altText || "MediSquare Facility"}
              fill
              priority
              className="object-cover object-center w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Layered light gradient overlays to keep image bright and text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent lg:from-white/60 lg:via-white/50 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 my-auto flex flex-col items-start gap-6">
        
        {/* Glowing Pill Tag (Light Theme) */}
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase w-fit">
            <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
            <span>Ahmedabad&apos;s Premier Medical Institute</span>
          </div>
        </Reveal>

        {/* Dynamic Bold Typography (Light Theme) */}
        <Reveal>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2] max-w-4xl">
            MediSquare{" "}
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              Hospital
            </span>{" "}
            <br className="hidden md:inline" />
            & Research Institute
          </h1>
        </Reveal>

        {/* Subdescription (Light Theme) */}
        <Reveal>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium max-w-2xl">
            Providing world-class medical services in Oncology, Neurology, and Pediatric Nephrology, powered by state-of-the-art facilities.
          </p>
        </Reveal>


        {/* Action Triggers */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3.5 mt-2">
            <button
              onClick={() => scrollToSection("sec-contact-appointment")}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold text-sm hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Book Appointment
            </button>
            <button
              onClick={() => scrollToSection("sec-clinics-grid")}
              className="border-2 border-slate-300 hover:border-primary hover:text-primary text-slate-700 px-8 py-2.5 rounded-lg font-semibold text-sm hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer hover:bg-primary/5 transition-all"
            >
              View Specialties
            </button>
          </div>
        </Reveal>

      </div>

      {/* Footer Row & Navigation (Light Theme) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-slate-200/80 pt-6">
        
        {/* Dynamic checkmark row */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs md:text-sm font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4.5 w-4.5 text-primary flex-shrink-0" />
            <span>Expert Oncologists</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4.5 w-4.5 text-primary flex-shrink-0" />
            <span>Movement Disorder Speciality</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4.5 w-4.5 text-primary flex-shrink-0" />
            <span>5-Bedded Day Care Center</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4.5 w-4.5 text-primary flex-shrink-0" />
            <span>Full-Scale Pharmacy</span>
          </div>
        </div>


      </div>

      {/* Mouse scroll-wheel animate prompt (Light Theme) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 z-20 pointer-events-none opacity-50">
        <div className="w-5 h-8 border-2 border-slate-400/80 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1.5 bg-primary rounded-full"
          />
        </div>
      </div>

    </section>
  );
}
