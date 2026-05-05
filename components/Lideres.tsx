"use client";

import { motion } from "framer-motion";

const lideres = [
  {
    name: "Andrés Mendoza",
    role: "Pastor principal",
    quote:
      "El evangelio no necesita maquillaje. Necesita gente real viviéndolo.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Lucía Reyes",
    role: "Pastora · San Isidro",
    quote: "Discipular es caminar al lado, no hablar desde arriba.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Daniel Quispe",
    role: "Pastor · Miraflores",
    quote: "La iglesia no es a la que vas. Es la que eres.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
];

export default function Lideres() {
  return (
    <section className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
            05 — Liderazgo
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Headline */}
        <div className="mb-20 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="display-heading text-white text-[clamp(2.5rem,6vw,5.5rem)]"
          >
            Quienes
            <em className="italic font-light text-white/70"> caminan </em>
            contigo.
          </motion.h2>
        </div>

        {/* Leaders grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {lideres.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#191919] mb-6">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000"
                  style={{ backgroundImage: `url(${l.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <span className="font-mono text-[10px] tracking-[0.32em] text-white/80 uppercase">
                    0{i + 1}
                  </span>
                  <div className="flex items-end gap-[2px] h-4 text-white/70">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <span
                        key={j}
                        className="sound-bar"
                        style={{
                          height: `${30 + Math.random() * 70}%`,
                          animationDelay: `${j * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-display text-3xl text-white">{l.name}</h3>
              <p className="font-mono text-[11px] tracking-[0.28em] text-white/50 uppercase mt-2">
                {l.role}
              </p>
              <p className="mt-5 text-white/60 italic font-display text-lg leading-snug">
                &ldquo;{l.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
