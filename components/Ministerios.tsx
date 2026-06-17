"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ministerios = [
  {
    label: "Universitarios",
    age: "18 — 24",
    desc: "Para los que están descubriendo todo. Reuniones en campus y sedes.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    href: "/ministerios/universitarios",
  },
  {
    label: "Profesionales",
    age: "25 — 35",
    desc: "Vida real, presión real, fe real. Networking con propósito.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  },
  {
    label: "Casados",
    age: "Matrimonios",
    desc: "Construir un matrimonio que dure. Sin frases hechas.",
    img: "https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=800&q=80",
  },
];

export default function Ministerios() {
  return (
    <section
      id="ministerios"
      className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            04 — Ministerios
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              Hay un lugar
              <br />
              <em className="italic font-light text-[var(--fg-70)]">para ti.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[var(--fg-60)] text-lg leading-relaxed">
              Cada etapa de la vida tiene retos diferentes. Por eso tenemos
              ministerios pensados para cada uno. Encuentra el tuyo.
            </p>
          </div>
        </div>

        {/* Cards grid - editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line-strong)]">
          {ministerios.map((m, i) => (
            <MinisterioCard key={m.label} m={m} index={i} />
          ))}
          {/* Filler card */}
          <div className="bg-[var(--bg)] p-8 flex flex-col justify-between min-h-[400px]">
            <span className="font-mono text-[10px] tracking-[0.32em] text-[var(--fg-40)] uppercase">
              ¿No encuentras el tuyo?
            </span>
            <div>
              <p className="font-display text-3xl text-[var(--fg)] mb-4">
                Conversemos.
              </p>
              <p className="text-[var(--fg-50)] text-sm mb-6">
                Escríbenos por WhatsApp y te conectamos con la comunidad
                correcta.
              </p>
              <button className="btn-line text-[var(--fg)] text-sm">
                Hablar con alguien <ArrowUpRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Ministerio = { label: string; age: string; desc: string; img: string; href?: string };

function MinisterioCard({ m, index }: { m: Ministerio; index: number }) {
  const Component = m.href ? "a" : "div";
  const linkProps = m.href ? { href: m.href } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.08 }}
      className="group relative bg-[#0d0d0d] overflow-hidden cursor-pointer min-h-[400px]"
    >
      <Component {...linkProps} className="absolute inset-0 z-20" />
      {/* Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
          style={{ backgroundImage: `url(${m.img})` }}
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 min-h-[400px]">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.32em] text-white/70 uppercase">
            {m.age}
          </span>
          <ArrowUpRight
            size={20}
            strokeWidth={1.5}
            className="text-white/70 group-hover:text-white group-hover:rotate-45 transition-all duration-500"
          />
        </div>
        <div>
          <h3 className="font-display text-4xl md:text-5xl text-white mb-3 group-hover:italic transition-all">
            {m.label}
          </h3>
          <p className="text-white/70 text-sm max-w-xs">{m.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
