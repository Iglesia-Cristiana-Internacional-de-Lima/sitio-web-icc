"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export default function MercyHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm">
                <Heart size={14} strokeWidth={1.5} className="text-white/70" />
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/70">
                  Mercy Worldwide · Lima
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-display text-[clamp(3.5rem,10vw,9rem)] text-white leading-[0.9]"
            >
              Fe que
              <br />
              <em className="italic font-light text-white/80">sirve.</em>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mt-8 max-w-xl"
            >
              Mercy es el brazo de servicio de nuestra iglesia. Creemos que la
              fe sin acción está incompleta. Por eso servimos a nuestra ciudad
              con acciones concretas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href="#actividades"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
              >
                Quiero ser voluntario
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="https://mercyworldwide.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
              >
                Conocer Mercy Worldwide
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase">
            Impacto
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
