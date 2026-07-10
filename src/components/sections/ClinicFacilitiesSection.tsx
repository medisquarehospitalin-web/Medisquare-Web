"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface FacilityCard {
  id: string;
  title: string;
  icon: string;
  modalContent?: {
    title: string;
    body: string;
  } | null;
}

interface ClinicFacilitiesData {
  badgeText: string;
  title: string;
  titleHighlight: string;
  cards: FacilityCard[];
}

interface ClinicFacilitiesSectionProps {
  data: ClinicFacilitiesData;
}

export default function ClinicFacilitiesSection({ data }: ClinicFacilitiesSectionProps) {
  const [selectedCard, setSelectedCard] = useState<FacilityCard | null>(null);

  return (
    <section className="bg-background py-20 border-t border-slate-100">
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

        {/* Facilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards.map((card, idx) => {
            const isClickable = !!card.modalContent;

            return (
              <Reveal key={card.id} delay={idx * 0.08}>
                <div
                  className={`card-interactive flex flex-col items-center text-center justify-between p-8 min-h-[240px] group ${
                    isClickable ? "cursor-pointer hover:border-primary/20" : ""
                  }`}
                  onClick={() => isClickable && setSelectedCard(card)}
                >
                  <div className="flex flex-col items-center">
                    {/* Icon Container */}
                    <div className="relative h-16 w-16 mb-6 flex items-center justify-center rounded-2xl bg-orange-50 border border-orange-100 group-hover:bg-primary group-hover:border-transparent transition-all duration-300 shadow-sm">
                      <Image
                        src={getImageUrl(card.icon)}
                        alt={card.title}
                        fill
                        className="object-contain p-3.5 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-secondary leading-snug group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  {isClickable && (
                    <div className="mt-4 inline-flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-wider group-hover:text-primary-dark transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog */}
      {selectedCard && selectedCard.modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xl md:text-2xl font-extrabold text-secondary leading-tight pr-6">
                {selectedCard.modalContent.title}
              </h3>
              <button
                onClick={() => setSelectedCard(null)}
                className="text-slate-500 hover:text-primary transition-colors p-2 rounded-xl hover:bg-slate-100 cursor-pointer border border-slate-100 flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto text-sm md:text-base text-slate-600 leading-relaxed font-semibold">
              <div
                className="text-justify flex flex-col gap-4 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: selectedCard.modalContent.body }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
