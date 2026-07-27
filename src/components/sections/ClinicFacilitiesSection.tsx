"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface FacilityCard {
  id: string;
  title: string;
  icon?: string | { fileUrl?: string; url?: string } | null;
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCard]);

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-0 md:p-6 animate-fade-in"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-5xl h-full md:h-[85vh] bg-white rounded-none md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side Banner (Visual Content) */}
            <div className="relative w-full md:w-5/12 h-48 md:h-full bg-slate-950 flex flex-col items-center justify-center p-6 md:p-10 text-white select-none shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-orange-950/40 to-slate-950" />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                {selectedCard.icon && (
                  <div className="h-20 w-20 p-4 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                    <Image
                      src={getImageUrl(selectedCard.icon)}
                      alt={selectedCard.title}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                    Clinic Facility
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold leading-tight font-heading mt-3" style={{ color: '#ffffff' }}>
                    {selectedCard.modalContent.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Right Side Content Panel */}
            <div className="relative flex-grow flex flex-col h-[calc(100%-12rem)] md:h-full overflow-hidden bg-white">
              {/* Sticky Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Details
                </span>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-slate-400 hover:text-primary transition-all p-2 rounded-xl hover:bg-slate-100 cursor-pointer border border-slate-150 flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Article Body */}
              <div className="p-6 md:p-10 overflow-y-auto flex-grow text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                <div
                  className="text-justify flex flex-col gap-4 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: selectedCard.modalContent.body }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
