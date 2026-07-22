"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface HighlightCard {
  id: string;
  title: string;
  image: string;
  modalContent: {
    title: string;
    body: string;
  } | null;
}

interface ClinicHighlightsData {
  badgeText: string;
  title: string;
  titleHighlight: string;
  cards: HighlightCard[];
}

interface ClinicHighlightsSectionProps {
  data: ClinicHighlightsData;
}

export default function ClinicHighlightsSection({ data }: ClinicHighlightsSectionProps) {
  const [selectedCard, setSelectedCard] = useState<HighlightCard | null>(null);

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

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards.map((card, idx) => (
            <Reveal key={card.id} delay={idx * 0.1}>
              <div className="card-interactive overflow-hidden flex flex-col h-full hover:border-primary/20 group">
                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={getImageUrl(card.image)}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-60" />
                </div>

                {/* Card Info */}
                <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                  <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors leading-snug">
                    {card.title}
                  </h3>
                  {card.modalContent ? (
                    <button
                      onClick={() => setSelectedCard(card)}
                      className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:text-primary-dark transition-colors cursor-pointer w-fit"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider mt-auto">
                      Clinic Care Service
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
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
            <div className="relative w-full md:w-5/12 h-48 md:h-full bg-slate-950 flex flex-col justify-end p-6 md:p-10 text-white select-none shrink-0">
              {selectedCard.image ? (
                <Image
                  src={getImageUrl(selectedCard.image)}
                  alt={selectedCard.title}
                  fill
                  className="object-cover opacity-60"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-orange-950/40 to-slate-950" />
              )}
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="relative z-10 flex flex-col gap-2">
                <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 w-fit">
                  Clinic Highlight
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold leading-tight font-heading mt-2" style={{ color: '#ffffff' }}>
                  {selectedCard.modalContent.title}
                </h3>
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
