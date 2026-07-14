"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Stethoscope } from "lucide-react";

interface TeamMember {
  name: string;
  designation: string;
  photo: {
    fileUrl: string;
    altText?: string;
  };
  bio: string;
  link: string;
}

interface TeamGridProps {
  data: {
    badgeText: string;
    title: string;
    titleHighlight: string;
    members: TeamMember[];
  };
}

export default function TeamGridSection({ data }: TeamGridProps) {
  return (
    // Reduced vertical padding from py-20 to py-12 lg:py-16
    <section className="bg-background py-12 lg:py-16 border-t border-slate-100">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <Reveal>
            <span className="text-[11px] font-bold tracking-wider text-primary uppercase bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm inline-block">
              {data.badgeText}
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight text-secondary">
              {data.title} <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">{data.titleHighlight}</span>
            </h2>
          </Reveal>
        </div>

        {/* Doctor Cards Grid - Reduced gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.members.map((member, idx) => {
            const bioLines = member.bio
              .split(/<br\s*\/?>/i)
              .map((line) => line.trim())
              .filter(Boolean);

            return (
              <Reveal key={idx} delay={idx * 0.1}>
                {/* Reduced card border radius and shadow */}
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                  
                  {/* Minimized padding around image (p-2 instead of p-3) */}
                  <div className="p-2 pb-0">
                    {/* Reduced image border radius */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-50">
                      
                      {/* Badge slightly smaller and adjusted positioning */}
                      <div className="absolute right-2 top-2 z-10">
                        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/95 px-2.5 py-1 shadow-sm backdrop-blur-sm">
                          <Stethoscope className="h-3 w-3 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
                            {member.designation}
                          </span>
                        </div>
                      </div>

                      <Image
                        src={getImageUrl(member.photo.fileUrl)}
                        alt={member.photo.altText || member.name}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5" />
                    </div>
                  </div>

                  {/* Minimized Content Section Padding (p-5 instead of p-8) */}
                  <div className="flex flex-1 flex-col p-5">
                    
                    {/* Header - Reduced margins and text sizes */}
                    <div className="mb-4">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        Specialist Doctor
                      </p>
                      <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-primary">
                        {member.name}
                      </h3>
                    </div>

                    {/* Bio List - Reduced spacing between items */}
                    <div className="flex-1">
                      <ul className="space-y-2">
                        {bioLines.map((line, lineIdx) => (
                          <li
                            key={lineIdx}
                            className="flex items-start gap-2.5 text-[13px] leading-tight text-slate-600"
                          >
                            <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 shrink-0 text-primary/80" />
                            <span
                              dangerouslySetInnerHTML={{
                                __html: line,
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Minimized Action Button - Reduced margins and paddings */}
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <Link
                        href={member.link}
                        className="group/link flex items-center justify-between text-sm font-semibold text-slate-800 transition-colors hover:text-primary"
                      >
                        <span className="relative overflow-hidden pb-0.5">
                          View Full Profile
                          <span className="absolute bottom-0 left-0 h-[1.5px] w-full -translate-x-full bg-primary transition-transform duration-300 group-hover/link:translate-x-0" />
                        </span>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-colors duration-300 group-hover/link:bg-primary group-hover/link:text-white">
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                        </div>
                      </Link>
                    </div>

                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}