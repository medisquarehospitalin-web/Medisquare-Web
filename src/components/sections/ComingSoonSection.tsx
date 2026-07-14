"use client";

import Reveal from "@/components/site/Reveal";

interface ComingSoonSectionProps {
  data: {
    title?: string;
    titleHighlight?: string;
    description?: string;
  };
}

export default function ComingSoonSection({
  data,
}: ComingSoonSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-slate-50 to-orange-100 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="mb-6 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          We&apos;re Working On It
          </span>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-secondary md:text-7xl">
            {data.title || "Coming"}{" "}
            <span className="text-primary">
              {data.titleHighlight || "Soon"}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {data.description ||
              "We're building something amazing. Stay tuned for exciting updates and a better experience coming soon."}
          </p>

          <div className="mt-10 flex justify-center">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-primary"></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}