"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import ReelGrid from "./ReelGrid";

// Placeholder reels - these would come from a CMS in production
const communityReels = [
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/ABC123/",
    caption: "Servicio dominical - Sede Miraflores",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/DEF456/",
    caption: "Devocional universitario PUCP",
  },
  {
    platform: "tiktok" as const,
    url: "https://www.tiktok.com/@iglesiacristianalima/video/789",
    caption: "Retiro de jóvenes 2026",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/GHI789/",
    caption: "Bautismos - Febrero 2026",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/reel/JKL012/",
    caption: "Ministerio de casados",
  },
  {
    platform: "tiktok" as const,
    url: "https://www.tiktok.com/@iglesiacristianalima/video/345",
    caption: "Alabanza domingo pasado",
  },
];

export default function CommunityReels() {
  return (
    <section className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
              En vivo · Esta semana
            </span>
          </div>
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
              className="display-heading text-white text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              Así se vive
              <br />
              <em className="italic font-light text-white/70">la comunidad.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-between">
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              No te lo contamos, te lo mostramos. Momentos reales de nuestra
              familia en Lima.
            </p>
            <a
              href="https://instagram.com/iglesiacristianalima"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors group"
            >
              <Instagram size={16} strokeWidth={1.5} />
              Síguenos en Instagram
              <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Reel carousel */}
        <ReelGrid reels={communityReels} layout="carousel" />
      </div>
    </section>
  );
}
