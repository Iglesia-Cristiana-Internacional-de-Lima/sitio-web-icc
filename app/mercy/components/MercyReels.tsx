"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import ReelGrid from "@/components/ReelGrid";

// Placeholder reels from Mercy activities
const mercyReels = [
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/MERCY001/",
    caption: "Entrega de víveres - Villa El Salvador",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/MERCY002/",
    caption: "Campaña médica en Comas",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/MERCY003/",
    caption: "Pintado de escuela",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/MERCY004/",
    caption: "Almuerzo comunitario Navidad 2025",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/MERCY005/",
    caption: "Voluntarios en acción",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/MERCY006/",
    caption: "Taller de refuerzo escolar",
  },
];

export default function MercyReels() {
  return (
    <section className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
            03 — En acción
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
              Así servimos
              <br />
              <em className="italic font-light text-white/70">juntos.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-between">
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Momentos reales de nuestras actividades. No solo hablamos de
              servir, lo hacemos.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/mercyworldwide"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors group"
              >
                <Instagram size={16} strokeWidth={1.5} />
                @mercyworldwide
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="https://instagram.com/iglesiacristianalima"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors group"
              >
                <Instagram size={16} strokeWidth={1.5} />
                @iglesiacristianalima
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Reel grid */}
        <ReelGrid reels={mercyReels} layout="grid-3" />
      </div>
    </section>
  );
}
