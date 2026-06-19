"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

// Definimos los slides para el carrusel
const slides = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80",
    badge: "Mercy Worldwide · Lima",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80",
    badge: "Acción Social · Impacto",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80",
    badge: "Comunidad · Esperanza",
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 segundos por slide

export default function MercyHero() {
  const [current, setCurrent] = useState(0);

  // Lógica de auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* Background Cinematic Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
        </AnimatePresence>
        {/* Overlays para contraste de texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* Main Text Container (Ocupa la mayor parte) */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Dynamic Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md">
                  <Heart size={14} strokeWidth={1.5} className="text-white/70" />
                  <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/70">
                    {slides[current].badge}
                  </span>
                </span>
              </motion.div>
            </AnimatePresence>

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

          {/* Carrusel Progress Navigation (Innovación UI) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="lg:col-span-4 flex lg:flex-col gap-4 lg:items-end justify-end pb-8"
          >
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className="relative h-1 w-12 rounded-full bg-white/20 overflow-hidden cursor-pointer"
                >
                  {current === index && (
                    <motion.div
                      layoutId="progress"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                      className="absolute top-0 left-0 h-full bg-white"
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase mt-2 hidden lg:block">
              0{current + 1} / 0{slides.length}
            </span>
          </motion.div>

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