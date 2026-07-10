"use client";

import Reveal from "@/components/site/Reveal";

interface ComingSoonSectionProps {
  data: {
    title?: string;
    titleHighlight?: string;
  };
}

export default function ComingSoonSection({ data }: ComingSoonSectionProps) {
  return (
    <section className="py-24 px-6 text-center bg-white flex flex-col items-center justify-center min-h-[50vh]">
      <Reveal>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary">
          {data.title || "Coming"}{" "}
          <span className="text-primary">{data.titleHighlight || "Soon"}</span>
        </h2>
      </Reveal>
    </section>
  );
}
