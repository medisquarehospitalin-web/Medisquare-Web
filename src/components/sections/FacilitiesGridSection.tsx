"use client";

import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface FacilityCard {
  title: string;
  icon: string;
}

interface FacilitiesGridProps {
  data: {
    badgeText: string;
    title: string;
    titleHighlight: string;
    cards: FacilityCard[];
  };
}

export default function FacilitiesGridSection({ data }: FacilitiesGridProps) {
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

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards.map((card, idx) => (
            <Reveal key={idx} delay={idx * 0.06}>
              <div className="group flex items-center gap-6 p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300">
                {/* Icon Container */}
                <div className="relative h-14 w-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm group-hover:border-primary/20 transition-colors">
                  <Image
                    src={getImageUrl(card.icon)}
                    alt={card.title}
                    fill
                    className="object-contain p-3"
                  />
                </div>
                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-secondary group-hover:text-primary transition-colors leading-snug">
                  {card.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
