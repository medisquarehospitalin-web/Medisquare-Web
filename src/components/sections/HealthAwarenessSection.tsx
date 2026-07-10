"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, PlayCircle, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  thumbnail: string;
  slides: string[];
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

  const openModal = (activity: Activity) => {
    setSelectedActivity(activity);
    setActiveSlideIndex(0);
  };

  const closeModal = () => {
    setSelectedActivity(null);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedActivity) return;
    setActiveSlideIndex(
      (prev) => (prev + 1) % selectedActivity.slides.length
    );
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedActivity) return;
    setActiveSlideIndex(
      (prev) =>
        (prev - 1 + selectedActivity.slides.length) %
        selectedActivity.slides.length
    );
  };

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
          {data.activities.map((activity, idx) => (
            <Reveal key={activity.id} delay={idx * 0.1}>
              <div className="card-interactive overflow-hidden flex flex-col h-full hover:border-primary/20 group">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                  <Image
                    src={getImageUrl(activity.thumbnail)}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
          {data.videos.map((video, idx) => (
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

      {/* Activity Carousel Modal Dialog */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg md:text-xl font-extrabold text-secondary line-clamp-2 pr-6">
                {selectedActivity.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-primary transition-colors p-2 rounded-xl hover:bg-slate-100 cursor-pointer border border-slate-100 flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body - Image Slider */}
            <div className="relative flex-grow flex items-center justify-center p-4 md:p-8 bg-slate-950 aspect-video md:aspect-[21/9]">
              <div className="relative w-full h-full">
                <Image
                  src={getImageUrl(selectedActivity.slides[activeSlideIndex])}
                  alt={`${selectedActivity.title} - Slide ${activeSlideIndex + 1}`}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Slider Controls */}
              {selectedActivity.slides.length > 1 && (
                <>
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-6 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-6 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer - Indicators */}
            {selectedActivity.slides.length > 1 && (
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center gap-2">
                {selectedActivity.slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlideIndex === idx ? "w-5 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
