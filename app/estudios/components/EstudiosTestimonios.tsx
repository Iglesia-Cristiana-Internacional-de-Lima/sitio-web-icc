"use client";

import { motion } from "framer-motion";
import ReelGrid from "@/components/ReelGrid";

// Placeholder reels of testimonials
const testimonioReels = [
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/TEST001/",
    caption: "Testimonio de Carlos - Ingeniero",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/TEST002/",
    caption: "Testimonio de María - Abogada",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/TEST003/",
    caption: "Testimonio de Diego - Universitario",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/TEST004/",
    caption: "Testimonio de Sofía - Médico",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/TEST005/",
    caption: "Testimonio de Juan - Empresario",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/TEST006/",
    caption: "Testimonio de Ana - Diseñadora",
  },
];

export default function EstudiosTestimonios() {
  return (
    <section id="testimonios" className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
            03 — Historias reales
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight"
            >
              Vidas que
              <br />
              <em className="italic font-light text-white/70">cambiaron.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-white/60 text-lg leading-relaxed">
              No te contamos teoría. Te mostramos personas reales cuyas vidas
              fueron transformadas a través de un estudio bíblico.
            </p>
          </div>
        </div>

        {/* Reel grid */}
        <ReelGrid reels={testimonioReels} layout="grid-3" />
      </div>
    </section>
  );
}
