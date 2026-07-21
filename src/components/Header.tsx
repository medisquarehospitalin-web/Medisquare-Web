"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Phone, MapPin, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { getSettingValue } from "@/lib/utils";

interface HeaderProps {
  menu?: Menu[];
  settings?: Setting[];
}

export default function Header({ menu, settings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to style header dynamically
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Load menu items from JSON schema format
  const navItems =
    menu && menu.length > 0
      ? menu.map((item: Menu) => ({
          label: item.menuName || "",
          href: item.link || "#",
          hasDropdown: Array.isArray(item.children) && item.children.length > 0,
          dropdownItems: Array.isArray(item.children)
            ? item.children.map((child: Menu) => ({
                label: child.menuName || "",
                href: child.link || "#",
              }))
            : [],
        }))
      : [];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-header shadow-sm"
            : "bg-white border-b border-slate-100"
        }`}
      >
        {/* Top Contact Bar */}
        {!isScrolled && (
          <div className="hidden lg:block bg-slate-50/70 border-b border-slate-100/40 h-9">
            <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-end gap-6 px-6 lg:px-8 text-[11px] font-semibold text-slate-500 pl-[280px]">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-450" />
                <span>{getSettingValue(settings, "hospital_address", "O 201-202, Gala Empire, Drive In Road, Gurukul, Ahmedabad")}</span>
              </div>
              <span className="h-3 w-px bg-slate-200" />
              <a href={`mailto:${getSettingValue(settings, "hospital_email", "contact@medisquare.in")}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5 text-slate-450" />
                <span>{getSettingValue(settings, "hospital_email", "contact@medisquare.in")}</span>
              </a>
            </div>
          </div>
        )}

        {/* Main Header Row */}
        <div className={`w-full max-w-7xl mx-auto flex items-center justify-between lg:justify-end gap-6 lg:gap-8 xl:gap-12 px-6 lg:px-8 relative transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        } lg:pl-[240px]`}>
          
          {/* Hanging Logo Banner (Desktop only - aligned to content grid margins) */}
          <div className={`hidden lg:flex absolute left-6 lg:left-8 z-35 items-center justify-center transition-all duration-300 ${
            isScrolled 
              ? "w-44 h-[72px] top-0 bg-white border-x border-b border-slate-200/80 rounded-b-2xl shadow-md px-4" 
              : "w-52 h-20 top-0 bg-transparent border-none shadow-none px-0"
          }`}>
            <Link href="/" className="w-full flex items-center justify-center">
              <Image
                src="/assets/img/medisquarelogo.png"
                alt="MediSquare Logo"
                width={200}
                height={60}
                priority
                className="w-full object-contain h-auto"
              />
            </Link>
          </div>

          {/* Brand Logo (Mobile only) */}
          <Link href="/" className="lg:hidden flex items-center flex-shrink-0 hover:opacity-90 transition-opacity">
            <Image
              src="/assets/img/medisquarelogo.png"
              alt="MediSquare Logo"
              width={140}
              height={42}
              priority
              className="h-8.5 w-auto object-contain"
            />
          </Link>

          {/* Navigation Menu (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold h-full">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname === ""
                  : pathname.startsWith(item.href) ||
                    item.dropdownItems.some((sub) => pathname === sub.href);

              return (
                <div
                  key={item.label}
                  className="relative group flex items-center h-full"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 py-2 px-1 text-[15px] font-bold tracking-wide transition-colors duration-200 cursor-pointer relative ${
                      isActive ? "text-primary" : "text-slate-700 hover:text-primary"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-primary transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    {/* Underline Micro-interaction */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-center ${
                        isActive ? "scale-x-100" : ""
                      }`}
                    />
                  </Link>

                  {/* Dropdown Card */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="absolute top-[80%] left-0 w-64 rounded-2xl bg-white border border-slate-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[90%] transition-all duration-300 z-50 overflow-hidden p-2">
                      <div className="flex flex-col gap-0.5">
                        {item.dropdownItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className={`px-4 py-3 text-[13px] font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                                isSubActive
                                  ? "text-primary bg-orange-50/70"
                                  : "text-slate-600 hover:text-primary hover:bg-slate-50/50"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full bg-primary transition-all duration-200 ${
                                  isSubActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                }`}
                              />
                              <span>{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Actions */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${getSettingValue(settings, "hospital_phone", "+91 8866 843 843").replace(/\s+/g, "")}`}
              className="hidden sm:flex items-center gap-2.5 group"
            >
              <div className="h-10 w-10 rounded-full border border-slate-250 text-primary flex items-center justify-center transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                <Phone className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-450 tracking-wider leading-none">Emergency? Call us!</span>
                <span className="text-sm font-bold text-slate-800 transition-colors group-hover:text-primary leading-tight mt-1">{getSettingValue(settings, "hospital_phone", "+91 8866 843 843")}</span>
              </div>
            </a>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 hover:text-primary hover:bg-orange-50/50 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Backdrop) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer (Menu List) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white px-6 py-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="w-[50%]">
              <Image
                src="/assets/img/medisquarelogo.png"
                alt="MediSquare Logo"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-xl border border-slate-100 text-slate-500 hover:text-primary focus:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {navItems.map((item) => {
              const isOpen = activeDropdown === item.label;

              return (
                <div key={item.label} className="flex flex-col">
                  {item.hasDropdown ? (
                    <button
                      onClick={() =>
                        setActiveDropdown(isOpen ? null : item.label)
                      }
                      className="flex w-full items-center justify-between py-3 px-2 rounded-xl text-sm font-bold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-2 rounded-xl text-sm font-bold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mobile Sub-Links */}
                  {item.hasDropdown && isOpen && (
                    <div className="pl-4 border-l-2 border-orange-100 flex flex-col gap-1 mt-1 mb-2 ml-4">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2.5 px-3 rounded-lg text-xs font-bold text-slate-600 hover:text-primary hover:bg-orange-50/30 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 pt-6">
          <a
            href={`tel:${getSettingValue(settings, "hospital_phone", "+91 8866 843 843").replace(/\s+/g, "")}`}
            className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold text-sm shadow hover:bg-primary-dark transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Call {getSettingValue(settings, "hospital_phone", "+91 8866 843 843")}</span>
          </a>
        </div>
      </div>
    </>
  );
}
