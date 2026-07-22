"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Search, BookOpen, Clock } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface ArticleCard {
  id: string;
  title: string;
  image: string | null;
  modalContent: {
    title: string;
    body: string;
  };
}

interface PatientEducationArticlesData {
  badgeText: string;
  title: string;
  titleHighlight: string;
  cards: ArticleCard[];
}

interface PatientEducationArticlesSectionProps {
  data: PatientEducationArticlesData;
}

export default function PatientEducationArticlesSection({
  data,
}: PatientEducationArticlesSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<ArticleCard | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  const filteredCards = data.cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {data.title}{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                {data.titleHighlight}
              </span>
            </h2>
          </Reveal>

          {/* Search Box */}
          <Reveal>
            <div className="mt-8 max-w-md mx-auto relative group">
              <input
                type="text"
                placeholder="Search medical topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl focus:outline-none transition-all font-semibold text-secondary text-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary h-5 w-5 transition-colors" />
            </div>
          </Reveal>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, idx) => (
              <Reveal key={card.id} delay={idx * 0.05}>
                <div
                  className="card-interactive flex flex-col justify-between h-full group hover:border-primary/20 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedArticle(card)}
                >
                  <div>
                    {/* Header Image or Graphic Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                      {card.image ? (
                        <Image
                          src={getImageUrl(card.image)}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-50/40 text-primary font-bold text-lg p-6 text-center leading-snug">
                          <BookOpen className="h-10 w-10 text-primary/80 mb-3" />
                          <span>{card.title}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      {/* Meta Tags */}
                      <div className="flex items-center gap-4 text-xs font-extrabold text-slate-400 mb-4">
                        <span className="uppercase text-primary tracking-wider">GUIDE</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>5 min read</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-8 pb-8 flex items-center gap-2 text-primary font-bold text-sm tracking-wide group-hover:text-primary-dark transition-colors mt-auto">
                    <span>Read Article</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              </Reveal>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-400 font-bold text-lg">
              No articles found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-0 md:p-6 animate-fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-5xl h-full md:h-[85vh] bg-white rounded-none md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side Banner (Visual Content) */}
            <div className="relative w-full md:w-5/12 h-48 md:h-full bg-slate-950 flex flex-col justify-end p-6 md:p-10 text-white select-none shrink-0">
              {selectedArticle.image ? (
                <Image
                  src={getImageUrl(selectedArticle.image)}
                  alt={selectedArticle.title}
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
                  Patient Guide
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold leading-tight font-heading mt-2" style={{ color: '#ffffff' }}>
                  {selectedArticle.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-white/60 font-bold mt-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            {/* Right Side Content Panel */}
            <div className="relative flex-grow flex flex-col h-[calc(100%-12rem)] md:h-full overflow-hidden bg-white">
              {/* Sticky Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Read Article
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-slate-400 hover:text-primary transition-all p-2 rounded-xl hover:bg-slate-100 cursor-pointer border border-slate-150 flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Article Body */}
              <div className="p-6 md:p-10 overflow-y-auto flex-grow text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                {/* Optional inline education graphics for Parkinson's disease */}
                {selectedArticle.id === "parkinson" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-150 shadow-sm">
                      <Image
                        src="/assets/img/parkinson_education_1.png"
                        alt="Parkinson Education 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-150 shadow-sm">
                      <Image
                        src="/assets/img/parkinson_education_2.png"
                        alt="Parkinson Education 2"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-150 shadow-sm">
                      <Image
                        src="/assets/img/parkinson_education_3.png"
                        alt="Parkinson Education 3"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <div
                  className="text-justify flex flex-col gap-4 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.modalContent.body }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
