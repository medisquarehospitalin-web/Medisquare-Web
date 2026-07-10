"use client";

import { useState } from "react";
import { Phone, MapPin, Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";
import Reveal from "@/components/site/Reveal";

interface LocationInfo {
  title: string;
  address: string;
  mapUrl: string;
}

interface ContactInfo {
  title: string;
  phone: string;
  email: string;
}

interface AppointmentInfo {
  title: string;
  subtitle: string;
}

interface ContactAppointmentData {
  badgeText: string;
  title: string;
  titleHighlight: string;
  location: LocationInfo;
  contact: ContactInfo;
  appointment: AppointmentInfo;
}

interface ContactAppointmentSectionProps {
  data: ContactAppointmentData;
}

export default function ContactAppointmentSection({ data }: ContactAppointmentSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ show: false, type: "success", message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formValues: Record<string, string> = {
      "Full Name": formData.get("user_name") as string,
      "Phone Number": formData.get("user_phone") as string,
      "Email Address": formData.get("user_email") as string,
      "Concern / Message": formData.get("user_concern") as string,
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: "Appointment / Contact Form",
          formValues,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setFormStatus({
          show: true,
          type: "success",
          message: "Thank you! Your appointment request has been submitted successfully.",
        });
        form.reset();
      } else {
        setFormStatus({
          show: true,
          type: "error",
          message: resData.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setFormStatus({
        show: true,
        type: "error",
        message: "Failed to submit form. Please check your network connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background py-20 border-t border-slate-100" id="sec-contact-appointment">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal>
              <div className="flex flex-col gap-4">
                
                {/* Location Card */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 border border-orange-100 flex-shrink-0 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-base">{data.location.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500 leading-relaxed">{data.location.address}</p>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 border border-orange-100 flex-shrink-0 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-secondary text-base">{data.contact.title}</h3>
                    <a href={`tel:${data.contact.phone}`} className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">
                      {data.contact.phone}
                    </a>
                    <a href={`mailto:${data.contact.email}`} className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5 mt-0.5">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{data.contact.email}</span>
                    </a>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* Map Box */}
            <Reveal>
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
                <iframe
                  src={data.location.mapUrl}
                  title="Hospital Map Location"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-sm">
            <Reveal>
              <div>
                <h3 className="text-2xl font-extrabold text-secondary mb-2">{data.appointment.title}</h3>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-8">{data.appointment.subtitle}</p>

                {/* Form Alerts */}
                {formStatus.show && (
                  <div
                    className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${
                      formStatus.type === "success"
                        ? "bg-green-50 border-green-100 text-green-800"
                        : "bg-red-50 border-red-100 text-red-800"
                    }`}
                  >
                    {formStatus.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm font-bold leading-snug">{formStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="user_name" className="text-xs font-bold text-slate-500 uppercase pl-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all font-semibold text-secondary text-sm"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="user_phone" className="text-xs font-bold text-slate-500 uppercase pl-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="user_phone"
                        id="user_phone"
                        required
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all font-semibold text-secondary text-sm"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="user_email" className="text-xs font-bold text-slate-500 uppercase pl-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      id="user_email"
                      required
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all font-semibold text-secondary text-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="user_concern" className="text-xs font-bold text-slate-500 uppercase pl-1">
                      Message / Concern
                    </label>
                    <textarea
                      name="user_concern"
                      id="user_concern"
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all font-semibold text-secondary text-sm resize-none"
                      placeholder="Briefly describe your concern..."
                    />
                  </div>

                  {/* Attachment */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="user_pdf" className="text-xs font-bold text-slate-500 uppercase pl-1">
                      Diagnosis History (PDF)
                    </label>
                    <input
                      type="file"
                      name="user_pdf"
                      id="user_pdf"
                      accept=".pdf"
                      className="w-full text-xs font-bold text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-bold file:bg-slate-50 file:text-slate-700 hover:file:bg-orange-50 hover:file:text-primary hover:file:border-primary/20 transition-all cursor-pointer file:cursor-pointer"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white hover:bg-primary-dark disabled:bg-slate-300 font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Book Appointment</span>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}
