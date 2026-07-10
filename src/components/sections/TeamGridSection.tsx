"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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

        {/* Horizontal Doctor Cards Grid */}
        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {data.members.map((member, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="group bg-white border border-slate-100 hover:border-primary/20 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                
                {/* Doctor Photo */}
                <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100 flex-shrink-0">
                  <Image
                    src={getImageUrl(member.photo.fileUrl)}
                    alt={member.photo.altText || member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left justify-between h-full gap-4">
                  <div>
                    <span className="text-xs font-extrabold tracking-widest text-primary uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block mb-3">
                      {member.designation}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-secondary tracking-wide uppercase group-hover:text-primary transition-colors" style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
                      {member.name}
                    </h3>
                    <p
                      className="mt-3 text-slate-500 text-sm md:text-base font-semibold leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: member.bio }}
                    />
                  </div>

                  <Link
                    href={member.link}
                    className="mt-4 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold text-sm shadow hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <span>View Doctor Profile</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
