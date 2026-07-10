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
    <section className="bg-white py-20 border-t border-slate-100">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        
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

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto mt-8 font-bold text-slate-700 text-sm md:text-base leading-relaxed">
          
          {/* Column 1 */}
          <Reveal>
            <ul className="flex flex-col gap-5">
              {data.col1.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/20 hover:bg-orange-50/10 hover:border-primary/20 transition-all duration-300 group">
                  <div className="h-6 w-6 rounded-full bg-orange-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="group-hover:text-secondary transition-colors duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Column 2 */}
          <Reveal>
            <ul className="flex flex-col gap-5">
              {data.col2.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/20 hover:bg-orange-50/10 hover:border-primary/20 transition-all duration-300 group">
                  <div className="h-6 w-6 rounded-full bg-orange-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="group-hover:text-secondary transition-colors duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
