"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const eventosConsolidados = [
  {
    title: "Servicio Dominical",
    day: "Domingos",
    time: "10:00 am",
    location: "Todas las sedes",
    description: "Adoración, mensaje práctico y comunidad. El corazón de nuestra semana.",
    icon: Users,
  },
  {
    title: "Reuniones de Ministerios",
    day: "Miércoles",
    time: "7:30 pm",
    location: "Por sede",
    description: "Espacios para cada etapa de vida: universitarios, profesionales, casados.",
    icon: Users,
  },
  {
    title: "Devocionales Universitarios",
    day: "Jueves",
    time: "1:00 pm",
    location: "PUCP / San Marcos",
    description: "Fe en el campus. Estudios cortos, conversaciones reales.",
    icon: BookOpen,
  },
];

const eventosNuevos = [
  {
    title: "Charlas Bíblicas",
    day: "Flexible",
    time: "Tú eliges",
    location: "Presencial / Online",
    description: "Una conversación uno a uno sobre la Biblia. Sin compromiso, sin presión.",
    cta: "Agendar mi charla",
    href: "/estudios",
    featured: true,
  },
];

export default function EventosDestacados() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            02 — Eventos destacados
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Headline */}
        <div className="mb-20 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)]"
          >
            Encuentra tu
            <em className="italic font-light text-[var(--fg-70)]"> momento.</em>
          </motion.h2>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Consolidated members */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Category label */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-warm-10)] border border-[var(--accent-warm-30)]">
                <Calendar size={14} strokeWidth={1.5} className="text-[var(--accent-warm)]" />
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--accent-warm)]">
                  Eventos de la Iglesia
                </span>
              </div>
              <p className="text-[var(--fg-50)] text-sm mt-3">
                Actividades semanales para quienes ya son parte de la familia.
              </p>
            </div>

            {/* Event cards */}
            <div className="space-y-px bg-[var(--line)]">
              {eventosConsolidados.map((evento, i) => (
                <motion.div
                  key={evento.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredCard(evento.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-[var(--bg)] p-6 md:p-8 transition-colors duration-500 cursor-pointer ${
                    hoveredCard === evento.title ? "bg-[var(--surface)]" : ""
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-warm-10)] flex items-center justify-center shrink-0">
                      <evento.icon size={20} strokeWidth={1.5} className="text-[var(--accent-warm)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-2xl text-[var(--fg)] mb-2">
                        {evento.title}
                      </h3>
                      <p className="text-[var(--fg-50)] text-sm mb-4 line-clamp-2">
                        {evento.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-[var(--fg-40)]">
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <Calendar size={12} strokeWidth={1.5} />
                          {evento.day}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <Clock size={12} strokeWidth={1.5} />
                          {evento.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <MapPin size={12} strokeWidth={1.5} />
                          {evento.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 text-[var(--fg-60)] text-sm hover:text-[var(--fg)] transition-colors group mt-4"
            >
              Ver todos los eventos
              <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: New visitors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category label */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-5)] border border-[var(--line)]">
                <BookOpen size={14} strokeWidth={1.5} className="text-[var(--fg-60)]" />
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--fg-60)]">
                  Estudios Bíblicos
                </span>
              </div>
              <p className="text-[var(--fg-50)] text-sm mt-3">
                Conversaciones personales sobre la Biblia, ideales si es tu primera vez.
              </p>
            </div>

            {/* Featured CTA card */}
            {eventosNuevos.map((evento, i) => (
              <motion.div
                key={evento.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--surface-10)] to-[var(--surface-5)] border border-[var(--line)] p-8 md:p-12"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--surface-5)] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                  <span className="font-mono text-[10px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
                    Evento personal
                  </span>

                  <h3 className="font-display text-4xl md:text-5xl text-[var(--fg)] mt-4 mb-4">
                    {evento.title}
                  </h3>

                  <p className="text-[var(--fg-60)] text-lg leading-relaxed mb-8 max-w-md">
                    {evento.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-10 text-[var(--fg-50)]">
                    <span className="inline-flex items-center gap-2 text-sm">
                      <Calendar size={16} strokeWidth={1.5} />
                      {evento.day}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm">
                      <Clock size={16} strokeWidth={1.5} />
                      {evento.time}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm">
                      <MapPin size={16} strokeWidth={1.5} />
                      {evento.location}
                    </span>
                  </div>

                  <Link
                    href={evento.href}
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent-warm)] text-white text-sm font-medium hover:opacity-90 transition-all"
                  >
                    {evento.cta}
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Secondary info card */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-6">
              <p className="text-[var(--fg-50)] text-sm leading-relaxed">
                <span className="text-[var(--fg)] font-medium">No sabes por dónde empezar?</span>
                {" "}Las charlas bíblicas son perfectas para conocernos. Sin libreto,
                sin presión. Solo una conversación honesta sobre la vida y la fe.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
