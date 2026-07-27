"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReelGrid from "@/components/ReelGrid";

export default function EstudiosTestimonios() {
  const [reels, setReels] = useState<{ platform: "instagram" | "tiktok"; url: string; caption?: string }[]>([]);

  useEffect(() => {
    fetch("/api/public/reels?seccion=estudios")
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.length > 0) setReels(json.data); });
  }, []);

  if (reels.length === 0) return null;

  return (
    <section id="testimonios" className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            03 — Historias reales
          </span>
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
              Vidas que
              <br />
              <em className="italic font-light text-[var(--fg-70)]">cambiaron.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[var(--fg-60)] text-lg leading-relaxed">
              No te contamos teoría. Te mostramos personas reales cuyas vidas
              fueron transformadas a través de un estudio bíblico.
            </p>
          </div>
        </div>

        {/* Reel grid */}
        <ReelGrid reels={reels} layout="grid-3" />
      </div>
    </section>
  );
}
