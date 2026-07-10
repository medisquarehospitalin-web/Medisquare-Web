"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "@/components/site/Reveal";

interface TestimonialItem {
  author: string;
  rating: number;
  text: string;
}

interface TestimonialsProps {
  data: {
    badgeText: string;
    title: string;
    titleHighlight: string;
    items: TestimonialItem[];
  };
}

export default function TestimonialsSection({ data }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = data?.items || [];

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[activeIndex];

  return (
    <section className="bg-white py-20 border-t border-slate-100">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100 shadow-sm inline-block">
              {data.badgeText}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              {data.title} <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">{data.titleHighlight}</span>
            </h2>
          </Reveal>
        </div>

        {/* Testimonials Panel */}
        <Reveal>
          <div className="relative bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-14 shadow-sm flex flex-col items-center text-center justify-center min-h-[340px] group">
            
            {/* Quote Icon Overlay */}
            <div className="absolute top-8 left-8 text-orange-200 opacity-20 pointer-events-none hidden md:block">
              <Quote className="h-16 w-16 fill-current" />
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: currentItem.rating }).map((_, idx) => (
                <Star key={idx} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote Text */}
            <blockquote className="text-base md:text-lg italic text-secondary font-medium leading-relaxed max-w-2xl z-10 whitespace-pre-line">
              {currentItem.text}
            </blockquote>

            {/* Author */}
            <cite className="not-italic font-bold text-primary tracking-widest mt-6 block text-xs uppercase z-10">
              — {currentItem.author}
            </cite>

            {/* Left/Right controls (floating) */}
            {items.length > 1 && (
              <div className="absolute inset-y-0 inset-x-2 md:inset-x-4 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handlePrev}
                  className="bg-white hover:bg-slate-50 border border-slate-100 text-slate-700 p-2.5 rounded-xl shadow-lg pointer-events-auto transition-all hover:scale-105 cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white hover:bg-slate-50 border border-slate-100 text-slate-700 p-2.5 rounded-xl shadow-lg pointer-events-auto transition-all hover:scale-105 cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

          </div>
        </Reveal>

        {/* Indicators */}
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-5 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
