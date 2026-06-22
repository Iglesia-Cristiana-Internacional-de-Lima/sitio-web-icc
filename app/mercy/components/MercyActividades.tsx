"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";

const actividades = [
  {
    id: 1,
    title: "Entrega de víveres",
    date: "8 Mayo 2026",
    time: "9:00 am - 1:00 pm",
    location: "Villa El Salvador",
    description: "Distribución de canastas de alimentos a 100 familias.",
    volunteers: 25,
    spotsLeft: 8,
    featured: true,
  },
  {
    id: 2,
    title: "Pintado de escuela",
    date: "15 Mayo 2026",
    time: "8:00 am - 4:00 pm",
    location: "San Juan de Miraflores",
    description: "Renovación de aulas en escuela primaria.",
    volunteers: 40,
    spotsLeft: 12,
  },
  {
    id: 3,
    title: "Campaña médica",
    date: "22 Mayo 2026",
    time: "9:00 am - 3:00 pm",
    location: "Comas",
    description: "Atención médica gratuita y entrega de medicinas.",
    volunteers: 30,
    spotsLeft: 5,
  },
  {
    id: 4,
    title: "Almuerzo comunitario",
    date: "29 Mayo 2026",
    time: "10:00 am - 2:00 pm",
    location: "Cercado de Lima",
    description: "Preparación y entrega de almuerzos para personas en situación de calle.",
    volunteers: 20,
    spotsLeft: 15,
  },
  {
    id: 5,
    title: "Taller de refuerzo escolar",
    date: "Todos los sábados",
    time: "3:00 pm - 5:00 pm",
    location: "Sede Lima Centro",
    description: "Apoyo en tareas y tutorías para niños del programa.",
    volunteers: 10,
    spotsLeft: 3,
    recurring: true,
  },
];

export default function MercyActividades() {
  return (
    <section
      id="actividades"
      className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            02 — Próximas actividades
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
              Sé parte del
              <br />
              <em className="italic font-light text-[var(--fg-70)]">cambio.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[var(--fg-60)] text-lg leading-relaxed">
              Cada actividad necesita voluntarios como tú. No necesitas
              experiencia, solo ganas de servir.
            </p>
          </div>
        </div>

        {/* Activities list */}
        <div className="space-y-4">
          {actividades.map((act, i) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
               className={`group p-6 md:p-8 rounded-xl border transition-all ${
                 act.featured
                   ? "bg-[var(--surface-5)] border-[var(--line-strong)] hover:border-[var(--fg-40)]"
                   : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--line-strong)]"
               }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Status tag */}
                <div className="shrink-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase ${
                      act.spotsLeft <= 5
                        ? "bg-[var(--inverse-bg)] text-[var(--inverse-fg)]"
                        : "bg-[var(--surface-10)] text-[var(--fg-70)]"
                    }`}
                  >
                    {act.spotsLeft <= 5
                      ? `${act.spotsLeft} lugares`
                      : act.recurring
                      ? "Recurrente"
                      : "Abierto"}
                  </span>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--fg)] mb-2 group-hover:italic transition-all">
                    {act.title}
                  </h3>
                  <p className="text-[var(--fg-50)] text-sm line-clamp-1">
                    {act.description}
                  </p>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-[var(--fg-50)] text-sm shrink-0">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} strokeWidth={1.5} className="text-[var(--fg-30)]" />
                    {act.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} strokeWidth={1.5} className="text-[var(--fg-30)]" />
                    {act.time}
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1.5">
                    <MapPin size={14} strokeWidth={1.5} className="text-[var(--fg-30)]" />
                    {act.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={14} strokeWidth={1.5} className="text-[var(--fg-30)]" />
                    {act.volunteers} voluntarios
                  </span>
                </div>

                {/* CTA */}
                <button className="shrink-0 px-5 py-2.5 rounded-full border border-[var(--line-strong)] text-[var(--fg-70)] text-sm font-medium group-hover:bg-[var(--inverse-bg)] group-hover:text-[var(--inverse-fg)] group-hover:border-[var(--inverse-bg)] transition-all flex items-center gap-2">
                  Inscribirme
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Help text */}
        <div className="mt-12 p-6 bg-[var(--surface)] border border-[var(--line)] rounded-xl">
          <p className="text-[var(--fg-50)] text-sm leading-relaxed">
            <span className="text-[var(--fg)] font-medium">Primera vez?</span> No te
            preocupes. Te enviamos toda la información necesaria al inscribirte:
            qué llevar, cómo llegar y qué esperar. Siempre hay alguien del
            equipo para guiarte.
          </p>
        </div>
      </div>
    </section>
  );
}
