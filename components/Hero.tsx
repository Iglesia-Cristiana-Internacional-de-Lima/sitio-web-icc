"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 z-0" />

      {/* Gradient overlays for legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Side ornaments */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.32em] text-white/50 uppercase rotate-180 [writing-mode:vertical-rl]">
            Lima · Perú · 2026
          </span>
          <div className="w-px h-24 bg-white/20" />
        </div>
      </div>

      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6">
        <div className="w-px h-24 bg-white/20" />
        <span className="font-mono text-[10px] tracking-[0.32em] text-white/50 uppercase [writing-mode:vertical-rl]">
          Una familia · Muchas sedes
        </span>
      </div>

      {/* Center content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10"
        >

        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="display-heading text-white text-[clamp(3.5rem,9vw,9rem)] max-w-[1200px]"
        >
          La fe se vive
          <br />
          <em className="italic font-light text-white/90">en comunidad.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 max-w-xl text-white/70 text-base md:text-lg leading-relaxed"
        >
          Somos una familia de iglesias en Lima. Sin libreto, sin filtros.
          Solo personas reales buscando algo real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="#sedes"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
          >
            <MapPin size={16} strokeWidth={1.5} />
            Encuentra tu sede
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/estudios"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
          >
            Estudios bíblicos
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar - Clean, minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-10 pb-8"
      >
        <div className="max-w-[1600px] mx-auto flex items-end justify-center">
          {/* Subtle scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 text-white/50"
          >
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase">
              Descubre
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-white/50"
            >
              <path
                d="M10 4v12M5 11l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
