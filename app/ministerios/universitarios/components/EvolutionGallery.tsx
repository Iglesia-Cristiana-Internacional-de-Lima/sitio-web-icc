"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import ReelGrid from "@/components/ReelGrid";

const evolutionReels = [
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DZBtwiKNh7U/",
    caption: "7 años de la Iglesia Cristiana Internacional de Lima",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DZP9tQ0jofn/",
    caption: "Pedida de enamoramiento | Freddy & Carla",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DXM8MrRGMDy/?img_index=1",
    caption: "Entresemanal - Comunidad universitaria",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DWxRitgkaNf/?img_index=1",
    caption: "Servicio Dominical - Bautismo de Amalia",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DWbvcA-jlAw/?img_index=1",
    caption: "Entresemanal de Hombres",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/p/DWRey4IjsLS/?img_index=1",
    caption: "Staff de Líderes",
  },
];

export default function EvolutionGallery() {
  return (
    <section className="relative bg-[#093b18] py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[#e2a633]/50 uppercase">
            04 — Galería
          </span>
          <div className="flex-1 h-px bg-[#e2a633]/10" />
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-[#e2a633] text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              Así vivimos
              <br />
              <em className="italic font-light text-[#f5f3ee]/80">
                la comunidad.
              </em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-between">
            <p className="text-[#f5f3ee]/60 text-base mb-6">
              Momentos reales de nuestra comunidad universitaria. Lo que ves es
              lo que somos.
            </p>
            <a
              href="https://instagram.com/evolutionlima"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#e2a633] text-sm hover:underline group"
            >
              <Instagram size={16} strokeWidth={1.5} />
              @evolutionlima
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* Reel grid */}
        <ReelGrid reels={evolutionReels} layout="carousel" variant="evolution" />
      </div>
    </section>
  );
}
