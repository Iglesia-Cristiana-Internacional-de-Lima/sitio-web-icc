"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sofía Ramírez",
    career: "Derecho, PUCP",
    cycle: "6to ciclo",
    quote:
      "Llegué a Evolution buscando amigos, encontré una familia. El devocional de los jueves se convirtió en el mejor día de mi semana. Por primera vez la fe tiene sentido en mi vida real.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Carlos Mendoza",
    career: "Ingeniería de Sistemas, San Marcos",
    cycle: "8vo ciclo",
    quote:
      "Pensaba que la universidad y la fe no podían coexistir. Evolution me demostró que estaba equivocado. Aquí encontré respuestas a preguntas que tenía desde hace años.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Valentina Torres",
    career: "Medicina, San Marcos",
    cycle: "4to ciclo",
    quote:
      "En medio de una carrera tan demandante, Evolution es mi espacio para respirar. No es religión vacía, es comunidad real con personas que te entienden.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
  {
    name: "Diego Vargas",
    career: "Arquitectura, PUCP",
    cycle: "7mo ciclo",
    quote:
      "El retiro universitario cambió mi perspectiva. Por primera vez entendí que la fe no es solo para crisis, sino para construir algo significativo con mi vida.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
];

export default function EvolutionTestimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="relative bg-[#072a12] py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[#e2a633]/50 uppercase">
            05 — Testimonios
          </span>
          <div className="flex-1 h-px bg-[#e2a633]/10" />
        </div>

        {/* Headline */}
        <div className="mb-20 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[#e2a633] leading-tight"
          >
            Historias
            <br />
            <em className="italic font-light text-[#f5f3ee]/80">reales.</em>
          </motion.h2>
        </div>

        {/* Testimonial carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo */}
          <motion.div
            key={`img-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-2xl border border-[#e2a633]/20">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${t.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072a12] via-transparent to-transparent" />

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-xl text-[#f5f3ee]">{t.name}</p>
                <p className="text-[#e2a633] text-sm mt-1">{t.career}</p>
                <p className="text-[#f5f3ee]/50 text-xs">{t.cycle}</p>
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            key={`quote-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <Quote
              size={48}
              strokeWidth={1}
              className="text-[#e2a633]/30 mb-6"
            />
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl text-[#f5f3ee] leading-snug mb-10">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-[#e2a633]/30 flex items-center justify-center text-[#e2a633]/70 hover:bg-[#e2a633] hover:text-[#093b18] hover:border-[#e2a633] transition-all"
                aria-label="Anterior testimonio"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-[#e2a633]/30 flex items-center justify-center text-[#e2a633]/70 hover:bg-[#e2a633] hover:text-[#093b18] hover:border-[#e2a633] transition-all"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>

              {/* Dots */}
              <div className="flex gap-2 ml-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-[#e2a633]" : "bg-[#e2a633]/30"
                    }`}
                    aria-label={`Ir a testimonio ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
