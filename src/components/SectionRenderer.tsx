"use client";

import HeroSlider from "@/components/sections/HeroSlider";
import ClinicsGridSection from "@/components/sections/ClinicsGridSection";
import FacilitiesGridSection from "@/components/sections/FacilitiesGridSection";
import TeamGridSection from "@/components/sections/TeamGridSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactAppointmentSection from "@/components/sections/ContactAppointmentSection";
import ClinicHighlightsSection from "@/components/sections/ClinicHighlightsSection";
import ClinicFacilitiesSection from "@/components/sections/ClinicFacilitiesSection";
import PatientEducationArticlesSection from "@/components/sections/PatientEducationArticlesSection";
import ComingSoonSection from "@/components/sections/ComingSoonSection";
import DoctorProfileSection from "@/components/sections/DoctorProfileSection";
import HealthAwarenessSection from "@/components/sections/HealthAwarenessSection";
import ConditionsListSection from "@/components/sections/ConditionsListSection";

interface SectionRendererProps {
  sections?: PageSection[];
  settings?: Array<{ key: string; value: string }>;
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections || !Array.isArray(sections)) return null;

  // Replicate section type mapping dynamically
  return (
    <>
      {[...sections]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((section) => {
          const key = `${section.sectionType}-${section.id}`;

          switch (section.sectionType) {
            case "hero_slider":
              return <HeroSlider key={key} data={section.sectionData as never} />;
            
            case "clinics_grid":
              return <ClinicsGridSection key={key} data={section.sectionData as never} />;
            
            case "facilities_grid":
              return <FacilitiesGridSection key={key} data={section.sectionData as never} />;
            
            case "team_grid":
              return <TeamGridSection key={key} data={section.sectionData as never} />;
            
            case "testimonials":
              return <TestimonialsSection key={key} data={section.sectionData as never} />;
            
            case "contact_appointment":
              return <ContactAppointmentSection key={key} data={section.sectionData as never} />;
            
            case "clinic_highlights":
              return <ClinicHighlightsSection key={key} data={section.sectionData as never} />;
            
            case "clinic_facilities":
              return <ClinicFacilitiesSection key={key} data={section.sectionData as never} />;
            
            case "patient_education_articles":
              return <PatientEducationArticlesSection key={key} data={section.sectionData as never} />;
            
            case "coming_soon":
              return <ComingSoonSection key={key} data={section.sectionData as never} />;
            
            case "doctor_profile":
              return <DoctorProfileSection key={key} data={section.sectionData as never} />;
            
            case "health_awareness":
              return <HealthAwarenessSection key={key} data={section.sectionData as never} />;
            
            case "conditions_list":
              return <ConditionsListSection key={key} data={section.sectionData as never} />;
            
            default:
              console.warn(`Unhandled section type: ${section.sectionType}`);
              return null;
          }
        })}
    </>
  );
}
