"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface ClinicCard {
  title: string;
  description: string;
  icon: string;
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
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100 shadow-sm inline-block">
              {data.badgeText}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              {data.title} <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">{data.titleHighlight}</span>
            </h2>
          </Reveal>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards.map((card, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Link
                href={card.link}
                className="card-interactive flex flex-col justify-between h-full p-8 md:p-10 group cursor-pointer hover:border-primary/30"
              >
                <div>
                  {/* Icon Circle Container */}
                  <div className="relative h-16 w-16 mb-8 flex items-center justify-center rounded-2xl bg-orange-50 border border-orange-100/50 group-hover:bg-primary group-hover:border-transparent transition-all duration-300 shadow-sm">
                    <Image
                      src={getImageUrl(card.icon)}
                      alt={card.title}
                      fill
                      className="object-contain p-3.5 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed font-semibold">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100/60 flex items-center gap-2 text-primary font-bold text-sm tracking-wide group-hover:text-primary-dark transition-colors">
                  <span>Explore Specialty</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
