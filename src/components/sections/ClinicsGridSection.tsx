"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface ClinicCard {
  title: string;
  description: string;
  icon?: string | { fileUrl?: string; url?: string } | null;
  link: string;
}

interface ClinicsGridProps {
  data: {
    badgeText: string;
    title: string;
    titleHighlight: string;
    cards: ClinicCard[];
  };
}

export default function ClinicsGridSection({ data }: ClinicsGridProps) {
  return (
    <section className="bg-background py-20 border-t border-slate-100" id="sec-clinics-grid">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-orange-50 px-4 py-1.5 rounded-lg border border-orange-100 shadow-sm inline-block">
              {data.badgeText}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              {data.title} <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">{data.titleHighlight}</span>
            </h2>
          </Reveal>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.cards || []).map((card, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Link
                href={card.link || "#"}
                className="card-interactive flex flex-col items-center text-center justify-start h-full p-8 md:p-10 group cursor-pointer hover:border-primary/30"
              >
                {/* Icon Circle Container */}
                <div className="relative h-16 w-16 mb-6 flex items-center justify-center rounded-lg bg-accent group-hover:bg-primary border border-transparent transition-all duration-300 shadow-sm mx-auto">
                  {card.icon && (
                    <Image
                      src={getImageUrl(card.icon)}
                      alt={card.title}
                      fill
                      className="object-contain p-3.5 brightness-0 invert transition-all duration-300"
                    />
                  )}
                </div>

                <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                  {card.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
