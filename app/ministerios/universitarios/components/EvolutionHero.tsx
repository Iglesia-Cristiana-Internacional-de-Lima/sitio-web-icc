"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import EvolutionIcon from "./EvolutionIcon";

export default function EvolutionHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#093b18]">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          suppressHydrationWarning
          className="w-full h-full object-cover"
        >
          <source src="/videos/evolution-lima-hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-[#093b18]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#093b18] via-transparent to-[#093b18]/40" />
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <EvolutionIcon size={80} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="display-heading text-[clamp(4rem,12vw,10rem)] text-[#e2a633]"
        >
          Evolution
          <br />
          <span className="font-light italic text-[#f5f3ee]">Lima</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 max-w-2xl text-[#f5f3ee]/80 text-lg md:text-xl leading-relaxed"
        >
          Comunidad universitaria en Lima — un espacio para crecer en fe,
          formar amistades reales y descubrir tu propósito durante la etapa
          universitaria.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="https://chat.whatsapp.com/GLY1JFBMv5V3mxHoxN7RlA"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#e2a633] text-[#093b18] text-sm font-medium hover:bg-[#e2a633]/90 transition-all"
          >
            Únete en PUCP
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="https://chat.whatsapp.com/GP5cW4kqHBc9nJLUKv23to"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#e2a633]/50 text-[#e2a633] text-sm font-medium hover:bg-[#e2a633]/10 hover:border-[#e2a633] transition-all"
          >
            Únete en San Marcos
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[#e2a633]/50"
        >
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase">
            Descubre
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3v10M4 9l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
