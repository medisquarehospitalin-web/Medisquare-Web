"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Shield, Brain, Activity, Heart } from "lucide-react";
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

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[activeIndex];
  const imageSrc = getImageUrl(currentSlide?.image?.fileUrl);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Modern Specialties grid
  const specialties = [
    { name: "Medical Oncology", icon: Shield, link: "/oncology" },
    { name: "Neurology Care", icon: Brain, link: "/movementdisorders" },
    { name: "Movement Disorders", icon: Activity, link: "/movementdisorders" },
    { name: "Pediatric Nephrology", icon: Heart, link: "/pediatric" },
  ];

  return (
    <section className="relative w-full h-[95vh] lg:h-screen flex flex-col justify-between bg-slate-950 overflow-hidden pt-36 pb-12">
      
      {/* Background Slideshow (Ken Burns Zoom Effect) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
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
        
        {/* Layered Gradient overlays for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/35 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 my-auto flex flex-col items-start gap-8">
        
        {/* Glowing Pill Tag */}
        <Reveal>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4.5 py-2 rounded-full border border-white/20 text-white text-xs font-bold shadow-lg tracking-wider uppercase">
            <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
            <span>Ahmedabad&apos;s Premier Medical Institute</span>
          </div>
        </Reveal>

        {/* Dynamic Bold Typography */}
        <Reveal>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            MediSquare{" "}
            <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              Hospital
            </span>{" "}
            <br className="hidden md:inline" />
            & Research Institute
          </h1>
        </Reveal>

        {/* Subdescription */}
        <Reveal>
          <p className="text-base md:text-lg text-slate-200 leading-relaxed font-semibold max-w-2xl drop-shadow-[0_1px_5px_rgba(0,0,0,0.3)]">
            Providing world-class medical services in Oncology, Neurology, and Pediatric Nephrology, powered by state-of-the-art facilities.
          </p>
        </Reveal>

        {/* Premium Floating Specialty Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-2">
          {specialties.map((spec, idx) => {
            const IconComponent = spec.icon;
            return (
              <Reveal key={idx} delay={idx * 0.08}>
                <button
                  onClick={() => scrollToSection("sec-clinics-grid")}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/15 hover:border-primary/30 transition-all duration-300 group flex items-center gap-3 cursor-pointer shadow-lg"
                >
                  <div className="h-9 w-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[13px] font-bold text-white leading-tight group-hover:text-primary transition-colors">
                    {spec.name}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Action Triggers */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button
              onClick={() => scrollToSection("sec-contact-appointment")}
              className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer pulse-primary"
            >
              Book Appointment
            </button>
            <button
              onClick={() => scrollToSection("sec-clinics-grid")}
              className="border-2 border-white/20 hover:border-white text-white px-10 py-3.5 rounded-xl font-bold text-sm hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer hover:bg-white/10 backdrop-blur-sm"
            >
              View Specialties
            </button>
          </div>
        </Reveal>

      </div>

      {/* Footer Row & Navigation */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-6">
        
        {/* Dynamic checkmark row */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs md:text-sm font-bold text-slate-200">
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

        {/* Carousel indicator and chevron buttons */}
        {slides.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/40 p-3 rounded-xl transition-all cursor-pointer backdrop-blur-sm shadow-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-white font-extrabold text-xs tracking-widest bg-slate-900/60 border border-slate-800/80 px-4.5 py-2.5 rounded-xl backdrop-blur-sm min-w-[70px] text-center shadow-lg">
              {activeIndex + 1} / {slides.length}
            </span>
            <button
              onClick={handleNext}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/40 p-3 rounded-xl transition-all cursor-pointer backdrop-blur-sm shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>

      {/* Mouse scroll-wheel animate prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 z-20 pointer-events-none opacity-50">
        <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1.5 bg-white rounded-full"
          />
        </div>
      </div>

    </section>
  );
}
