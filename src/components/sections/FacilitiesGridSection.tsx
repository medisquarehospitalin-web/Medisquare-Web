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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.cards || []).map((card, idx) => (
            <Reveal key={idx} delay={idx * 0.06}>
              <div className="group flex items-center gap-5 p-4.5 rounded-xl bg-slate-50/50 border border-slate-200/65 hover:bg-white hover:border-primary/20 transition-all duration-300">
                <div className="relative h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-accent group-hover:bg-primary border border-transparent transition-all duration-300">
                  {card.icon && (
                    <Image
                      src={getImageUrl(card.icon)}
                      alt={card.title}
                      fill
                      className="object-contain p-2.5 brightness-0 invert transition-all duration-300"
                    />
                  )}
                </div>
                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-secondary group-hover:text-primary transition-colors leading-snug">
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
