"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

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
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

import { getSettingValue } from "@/lib/utils";

interface FooterProps {
  settings?: Setting[];
  footerMenu?: Menu[];
}

export default function Footer({ settings, footerMenu }: FooterProps) {
  // Find "Facilities" or "Specialties" menu column from sanity
  const facilitiesColumn = footerMenu?.find(
    (col) =>
      col.menuName?.toLowerCase() === "facilities" ||
      col.menuName?.toLowerCase() === "specialties"
  );
  
  const facilitiesItems =
    facilitiesColumn && Array.isArray(facilitiesColumn.children)
      ? facilitiesColumn.children
      : [];

  const displayItems =
    facilitiesItems.length > 0
      ? facilitiesItems.map((item) => ({
          label: item.menuName,
          href: item.link,
          isClickable: item.isClickable !== false,
        }))
      : [];

  return (
    <footer className="bg-secondary text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Block */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link href="/" className="inline-block bg-white px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm max-w-[400px] hover:bg-slate-50 transition-colors duration-200 w-fit">
            <Image
              src="/assets/img/medisquarelogo.png"
              alt="MediSquare Logo"
              width={400}
              height={120}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
          {getSettingValue(settings, "hospital_bio")}
              </p>
          
          {/* Socials */}
          <div className="flex items-center gap-3">
            <Link
              href={getSettingValue(settings, "social_facebook", "https://www.facebook.com/medisquarehospital.in")}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link
              href={getSettingValue(settings, "social_instagram", "https://www.instagram.com/medisquarehospital.in/")}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link
              href={getSettingValue(settings, "social_linkedin", "https://www.linkedin.com/company/medisquarehospital")}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </Link>
            <Link
              href={getSettingValue(settings, "social_google", "https://www.google.com/search?q=medisquare+hospital+ahmedabad")}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300"
              aria-label="Google Search"
            >
              <SearchIcon />
            </Link>
          </div>
        </div>

        {/* Facilities Column (No heading) */}
        <div className="md:col-span-3 flex flex-col gap-5 pt-2">
          <ul className="flex flex-col gap-3 text-sm font-semibold">
            {displayItems.map((link, idx) => (
              <li key={idx}>
                {link.isClickable ? (
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ) : (
                  <span className="text-slate-450">{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info block (No heading) */}
        <div className="md:col-span-4 flex flex-col gap-5 pt-2">
          <ul className="flex flex-col gap-4 text-sm font-medium text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{getSettingValue(settings, "hospital_address", "O 201-202, Gala Empire, Opposite Doordarshan Tower, Drive In Road, Gurukul, Ahmedabad - 380 052")}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0" />
              <a href={`tel:${getSettingValue(settings, "hospital_phone", "+91 8866 843 843").replace(/\s+/g, "")}`} className="hover:text-primary transition-colors text-white font-bold">
                {getSettingValue(settings, "hospital_phone")}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <a href={`mailto:${getSettingValue(settings, "hospital_email", "contact@medisquare.in")}`} className="hover:text-primary transition-colors">
                {getSettingValue(settings, "hospital_email", "contact@medisquare.in")}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="container mx-auto max-w-7xl px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
        <p>MediSquare © {new Date().getFullYear()} — All Rights Reserved.</p>
      </div>
    </footer>
  );
}
