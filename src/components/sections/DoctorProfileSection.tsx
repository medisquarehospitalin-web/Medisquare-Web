"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import { getImageUrl } from "@/lib/utils";
import { Award, Briefcase, GraduationCap } from "lucide-react";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Socials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

interface QualificationObject {
  _type?: 'qualification';
  degree?: string;
  specialization?: string;
  university?: string;
}

interface DoctorProfileData {
  name: string;
  specialty: string;
  photo: string;
  bio: string;
  socials?: Socials;
  qualifications: (string | QualificationObject)[];
  awards?: string[];
  memberships?: string[];
}

interface DoctorProfileSectionProps {
  data: DoctorProfileData;
}

export default function DoctorProfileSection({ data }: DoctorProfileSectionProps) {
  const hasAwards = Array.isArray(data.awards) && data.awards.length > 0;
  const hasMemberships = Array.isArray(data.memberships) && data.memberships.length > 0;

  return (
    <section className="bg-background py-20 border-t border-slate-100">
      
      {/* Profile Header Card */}
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 mt-12 bg-white border border-slate-100 p-8 md:p-14 rounded-3xl shadow-sm flex flex-col lg:flex-row items-center lg:items-start gap-12">
        
        {/* Left Column: Portrait & Socials */}
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          <Reveal>
            <div className="relative h-60 w-60 md:h-72 md:w-72 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100">
              <Image
                src={getImageUrl(data.photo)}
                alt={data.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Social Links */}
          {data.socials && (
            <Reveal width="fit-content">
              <div className="flex items-center justify-center gap-4">
                {data.socials.facebook && (
                  <Link
                    href={data.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label="Facebook Link"
                  >
                    <FacebookIcon />
                  </Link>
                )}
                {data.socials.instagram && (
                  <Link
                    href={data.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label="Instagram Link"
                  >
                    <InstagramIcon />
                  </Link>
                )}
                {data.socials.linkedin && (
                  <Link
                    href={data.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label="LinkedIn Link"
                  >
                    <LinkedinIcon />
                  </Link>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {/* Right Column: Bio Details */}
        <div className="flex-grow flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <Reveal>
            <span className="text-xs font-extrabold tracking-widest text-primary uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-1">
              {data.specialty}
            </span>
          </Reveal>

          <Reveal>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary tracking-wide uppercase leading-none" style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
              {data.name}
            </h1>
          </Reveal>

          <Reveal>
            <div
              className="mt-6 text-slate-500 font-semibold text-sm md:text-base leading-relaxed text-justify flex flex-col gap-4"
              dangerouslySetInnerHTML={{ __html: data.bio }}
            />
          </Reveal>
        </div>

      </div>

      {/* Qualifications, Awards & Memberships Columns */}
      <div className={`container mx-auto max-w-7xl px-6 lg:px-8 mt-12 grid grid-cols-1 gap-8 ${
        hasAwards && hasMemberships
          ? "lg:grid-cols-3 md:grid-cols-2"
          : hasAwards || hasMemberships
            ? "md:grid-cols-2 max-w-5xl mx-auto"
            : "max-w-2xl mx-auto"
      }`}>
        
        {/* Qualifications Panel */}
        {Array.isArray(data.qualifications) && data.qualifications.length > 0 && (
          <Reveal delay={0.05}>
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm h-full flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 text-primary border border-orange-100 flex-shrink-0">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-extrabold text-secondary tracking-tight">
                  Qualifications
                </h3>
              </div>
              <ul className="flex flex-col gap-4 font-semibold text-slate-500 text-sm leading-relaxed">
                {data.qualifications.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {typeof item === 'string' ? (
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    ) : (
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-secondary text-base leading-tight">
                          {item.degree}
                        </span>
                        {item.specialization && (
                          <span className="text-slate-600 font-semibold text-sm leading-snug">
                            {item.specialization.startsWith('(') && item.specialization.endsWith(')')
                              ? item.specialization
                              : `(${item.specialization})`}
                          </span>
                        )}
                        {item.university && (
                          <span className="text-slate-400 font-normal text-xs leading-normal">
                            {item.university}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* Awards Panel */}
        {hasAwards && data.awards && (
          <Reveal delay={0.1}>
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm h-full flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 text-primary border border-orange-100 flex-shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-extrabold text-secondary tracking-tight">
                  Awards & Achievements
                </h3>
              </div>
              <ul className="flex flex-col gap-4 font-semibold text-slate-500 text-sm leading-relaxed">
                {data.awards.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* Memberships Panel */}
        {hasMemberships && data.memberships && (
          <Reveal delay={0.15}>
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm h-full flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 text-primary border border-orange-100 flex-shrink-0">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-extrabold text-secondary tracking-tight">
                  Professional Memberships
                </h3>
              </div>
              <ul className="flex flex-col gap-4 font-semibold text-slate-500 text-sm leading-relaxed">
                {data.memberships.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
}
