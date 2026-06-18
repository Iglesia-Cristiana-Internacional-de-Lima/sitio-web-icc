"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import ReelGrid from "./ReelGrid";

const communityReels = [
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DZP9tQ0jofn/",
    caption: "Pedida de enamoramiento | Freddy & Carla",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DZBtwiKNh7U/",
    caption: "7 años de la Iglesia Cristiana Internacional de Lima",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DXM8MrRGMDy/?img_index=1",
    caption: "Entresemanal - Cumpleaños de Waldir",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DWxRitgkaNf/?img_index=1",
    caption: "Servicio Dominical y Bautismo de Amalia",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DWbvcA-jlAw/?img_index=1",
    caption: "Entresemanal de Hombres",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DWRey4IjsLS/?img_index=1",
    caption: "Staff de Líderes - Estudio bíblico",
  },
];

export default function CommunityReels() {
  return (
    <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)] overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--fg-60)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--fg)]" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
              En vivo · Esta semana
            </span>
          </div>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              Así se vive
              <br />
              <em className="italic font-light text-[var(--fg-70)]">la comunidad.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-between">
            <p className="text-[var(--fg-60)] text-lg leading-relaxed mb-6">
              No te lo contamos, te lo mostramos. Momentos reales de nuestra
              familia en Lima.
            </p>
            <a
              href="https://instagram.com/limaicc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--fg-60)] text-sm hover:text-[var(--fg)] transition-colors group"
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
