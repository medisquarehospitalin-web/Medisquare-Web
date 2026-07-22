"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, PlayCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  thumbnail?: { fileUrl: string; altText?: string } | null;
  slides?: ({ fileUrl: string; altText?: string } | null)[] | null;
}

interface Video {
  title: string;
  embedUrl: string;
}

interface HealthAwarenessData {
  badgeText: string;
  title: string;
  titleHighlight: string;
  activities: Activity[];
  videoBadgeText: string;
  videoTitle: string;
  videoTitleHighlight: string;
  videos: Video[];
}

interface HealthAwarenessProps {
  data: HealthAwarenessData;
}

export default function HealthAwarenessSection({ data }: HealthAwarenessProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const getSlideUrl = (slide: unknown): string => {
    if (!slide) return "";
    if (typeof slide === "string") return slide;
    if (slide && typeof slide === "object" && "fileUrl" in slide) {
      return (slide as { fileUrl: string }).fileUrl || "";
    }
    if (slide && typeof slide === "object" && "url" in slide) {
      return (slide as { url: string }).url || "";
    }
    return "";
  };

  const openModal = (activity: Activity) => {
    setSelectedActivity(activity);
    setActiveSlideIndex(0);
  };

  const closeModal = () => {
    setSelectedActivity(null);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedActivity || !selectedActivity.slides) return;
    setActiveSlideIndex(
      (prev) => (prev + 1) % selectedActivity.slides!.length
    );
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedActivity || !selectedActivity.slides) return;
    setActiveSlideIndex(
      (prev) =>
        (prev - 1 + selectedActivity.slides!.length) %
        selectedActivity.slides!.length
    );
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedActivity) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedActivity]);

  // Keyboard controls
  useEffect(() => {
    if (!selectedActivity) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        if (selectedActivity.slides && selectedActivity.slides.length > 1) {
          setActiveSlideIndex((prev) => (prev + 1) % selectedActivity.slides!.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (selectedActivity.slides && selectedActivity.slides.length > 1) {
          setActiveSlideIndex(
            (prev) =>
              (prev - 1 + selectedActivity.slides!.length) %
              selectedActivity.slides!.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedActivity]);

  return (
    <section className="bg-white py-20 border-t border-slate-100">
      
      {/* Activities Grid */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.activities || []).map((activity, idx) => (
            <Reveal key={activity.id} delay={idx * 0.1}>
              <div className="card-interactive overflow-hidden flex flex-col h-full hover:border-primary/20 group">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                  {activity.thumbnail?.fileUrl && (
                    <Image
                      src={getImageUrl(activity.thumbnail.fileUrl)}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                  <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {activity.title}
                  </h3>
                  <button
                    onClick={() => openModal(activity)}
                    className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:text-primary-dark transition-colors cursor-pointer w-fit mt-auto"
                  >
                    <span>View Campaign Images</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 mt-28">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100 shadow-sm inline-block">
              {data.videoBadgeText}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              {data.videoTitle} <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">{data.videoTitleHighlight}</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.videos || []).map((video, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="card-interactive overflow-hidden p-4 md:p-5 flex flex-col gap-5 bg-slate-50/50 hover:bg-white hover:border-primary/20 transition-all duration-300">
                <div className="video-container rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-base font-bold text-secondary line-clamp-2 leading-snug min-h-[48px] px-2 flex items-start gap-2">
                  <PlayCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{video.title}</span>
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Activity Gallery Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              backgroundColor: "rgba(10, 10, 10, 0.98)", 
              zIndex: 9999,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)"
            }}
            className="fixed inset-0 flex flex-col justify-between select-none"
            onClick={closeModal}
          >
            {/* Top Control Bar */}
            <div 
              className="w-full flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1 max-w-[70%]">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Campaign Gallery
                </span>
                <div 
                  style={{ color: "#ffffff" }} 
                  className="text-base md:text-xl font-bold line-clamp-1"
                >
                  {selectedActivity.title}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {selectedActivity.slides && selectedActivity.slides.length > 1 && (
                  <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/10 backdrop-blur-md">
                    {activeSlideIndex + 1} / {selectedActivity.slides.length}
                  </span>
                )}
                <button
                  onClick={closeModal}
                  className="text-white/70 hover:text-white transition-all p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                  aria-label="Close gallery"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Carousel / Viewport */}
            <div 
              className="relative flex-grow flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] md:h-[70vh] max-w-5xl">
                {selectedActivity.slides && selectedActivity.slides[activeSlideIndex] && (
                  <motion.div
                    key={activeSlideIndex}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={getImageUrl(getSlideUrl(selectedActivity.slides[activeSlideIndex]))}
                      alt={`${selectedActivity.title} - Slide ${activeSlideIndex + 1}`}
                      fill
                      priority
                      className="object-contain"
                    />
                  </motion.div>
                )}
              </div>

              {/* Float Controls on Left/Right */}
              {selectedActivity.slides && selectedActivity.slides.length > 1 && (
                <>
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-4 md:left-8 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white p-3.5 rounded-full border border-white/15 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-4 md:right-8 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white p-3.5 rounded-full border border-white/15 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Section: Thumbnail strip and slide info */}
            <div 
              className="w-full flex flex-col items-center gap-4 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedActivity.slides && selectedActivity.slides.length > 1 && (
                <>
                  {/* Slide count on mobile */}
                  <span className="sm:hidden text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 backdrop-blur-md">
                    {activeSlideIndex + 1} / {selectedActivity.slides.length}
                  </span>
                  
                  {/* Thumbnail Row */}
                  <div className="flex items-center gap-2.5 overflow-x-auto max-w-full px-4 py-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {selectedActivity.slides.map((slide, idx) => {
                      const slideUrl = getSlideUrl(slide);
                      if (!slideUrl) return null;
                      const isActive = activeSlideIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`relative h-12 w-20 md:h-16 md:w-24 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 cursor-pointer ${
                            isActive 
                              ? "border-primary scale-105 shadow-[0_0_12px_rgba(233,84,32,0.6)]" 
                              : "border-white/20 opacity-50 hover:opacity-80"
                          }`}
                        >
                          <Image
                            src={getImageUrl(slideUrl)}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
