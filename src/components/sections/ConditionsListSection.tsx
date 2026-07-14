"use client";

import Reveal from "@/components/site/Reveal";
import { Check } from "lucide-react";

interface ConditionsListProps {
  data: {
    badgeText: string;
    title: string;
    titleHighlight: string;
    col1: string[];
    col2: string[];
  };
}

export default function ConditionsListSection({ data }: ConditionsListProps) {
return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <Reveal>
            <span className="inline-block px-4 py-1.5 text-[11px] font-bold tracking-widest text-primary uppercase bg-orange-50 rounded-full border border-orange-100">
              {data.badgeText}
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              {data.title}{" "}
              {/* Removed gradient text to match screenshot, kept solid primary color */}
              <span className="text-primary">
                {data.titleHighlight}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* 2-Column Static List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 max-w-4xl mx-auto">
          
          {/* Column 1 */}
          <Reveal>
            <ul className="flex flex-col gap-6 md:gap-8">
              {data.col1.map((item, idx) => (
                <li 
                  key={idx} 
                  className="flex items-center gap-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-primary">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span className="text-[15px] md:text-base font-semibold text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Column 2 */}
          <Reveal>
            <ul className="flex flex-col gap-6 md:gap-8">
              {data.col2.map((item, idx) => (
                <li 
                  key={idx} 
                  className="flex items-center gap-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-primary">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span className="text-[15px] md:text-base font-semibold text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
