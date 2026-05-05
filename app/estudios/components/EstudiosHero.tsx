"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";

export default function EstudiosHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80"
        >
          {/* Placeholder video - reemplazar con video real de testimonio */}
          <source
            src="https://cdn.coverr.co/videos/coverr-people-talking-in-a-cafe-4531/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-[#0d0d0d]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-20 md:pb-32 pt-32 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            {/* Text content */}
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.32em] text-white/60 uppercase mb-6"
              >
                <Play size={12} className="fill-current" />
                Testimonio
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-[0.95] mb-6"
              >
                Una conversación
                <br />
                <em className="italic font-light text-white/80">
                  cambió mi vida.
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-8"
              >
                Descubre cómo un estudio bíblico personalizado puede
                transformarte. Escucha las historias de quienes ya lo vivieron.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link
                  href="#testimonios"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 transition-all"
                >
                  <Play size={18} className="fill-current" />
                  Ver más testimonios
                  <span className="inline-block group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <blockquote className="font-display text-xl md:text-2xl text-white leading-snug mb-6">
                  &ldquo;No sabía qué esperar, pero esa primera conversación me
                  mostró respuestas que llevaba años buscando. No fue presión,
                  fue claridad.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80)",
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">Carlos Mendoza</p>
                    <p className="text-white/50 text-sm">
                      Ingeniero · 28 años
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs font-mono tracking-wider">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
