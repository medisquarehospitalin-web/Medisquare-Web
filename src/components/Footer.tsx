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

export default function Footer() {
  return (
    <footer className="bg-secondary text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Block */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link href="/" className="w-[60%] max-w-[200px]">
            <Image
              src="/assets/img/medisquarelogo.png"
              alt="MediSquare Logo"
              width={200}
              height={60}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Ahmedabad&apos;s premier superspeciality medical center providing high-end care in Medical Oncology, Neurology, Movement Disorders, and Pediatric Nephrology.
          </p>
          
          {/* Socials */}
          <div className="flex items-center gap-3">
            <Link
              href="https://www.facebook.com/medisquarehospital.in"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://www.instagram.com/medisquarehospital.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/company/medisquarehospital"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </Link>
            <Link
              href="https://www.google.com/search?q=medisquare+hospital+ahmedabad"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300"
              aria-label="Google Search"
            >
              <SearchIcon />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-5">
          <h4 className="text-white font-bold text-base tracking-wide uppercase">
            Specialties
          </h4>
          <ul className="flex flex-col gap-3 text-sm font-semibold">
            <li>
              <Link href="/oncology" className="hover:text-primary transition-colors">
                Medical Oncology
              </Link>
            </li>
            <li>
              <Link href="/movementdisorders" className="hover:text-primary transition-colors">
                Movement Disorders
              </Link>
            </li>
            <li>
              <Link href="/pediatric" className="hover:text-primary transition-colors">
                Pediatric Nephrology
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info block */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <h4 className="text-white font-bold text-base tracking-wide uppercase">
            Our Location
          </h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>O 201-202, Gala Empire, Opposite Doordarshan Tower, Drive In Road, Gurukul, Ahmedabad - 380 052</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0" />
              <a href="tel:08866843843" className="hover:text-primary transition-colors text-white font-bold">
                +91 8866 843 843
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <a href="mailto:contact@medisquare.in" className="hover:text-primary transition-colors">
                contact@medisquare.in
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="container mx-auto max-w-7xl px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
        <p>MediSquare © {new Date().getFullYear()} — All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Designed and Developed for excellence.
        </p>
      </div>
    </footer>
  );
}
