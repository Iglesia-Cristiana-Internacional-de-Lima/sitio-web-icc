"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReelGrid from "@/components/ReelGrid";

export default function EventosReels() {
  const [reels, setReels] = useState<{ platform: "instagram" | "tiktok"; url: string; caption?: string }[]>([]);

  useEffect(() => {
    fetch("/api/public/reels?seccion=eventos")
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.length > 0) setReels(json.data); });
  }, []);

  if (reels.length === 0) return null;

  return (
    <section className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
            Así se vivieron
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Headline */}
        <div className="mb-16 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="display-heading text-white text-[clamp(2.5rem,6vw,5.5rem)]"
          >
            Los últimos
            <br />
            <em className="italic font-light text-white/70">eventos.</em>
          </motion.h2>
          <p className="text-white/60 text-lg mt-6">
            Lo que ves es lo que somos. Momentos reales de la comunidad.
          </p>
        </div>

        {/* Reel carousel */}
        <ReelGrid reels={reels} layout="carousel" />
      </div>
    </section>
  );
}
