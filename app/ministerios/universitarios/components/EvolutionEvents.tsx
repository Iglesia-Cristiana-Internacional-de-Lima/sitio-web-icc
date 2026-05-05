"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { useState } from "react";

const events = [
  {
    title: "Devocional PUCP",
    type: "Devocional",
    campus: "PUCP",
    date: "Todos los jueves",
    time: "1:00 pm",
    location: "Punto Verde, PUCP",
    description: "Estudio bíblico semanal en el corazón del campus.",
    recurring: true,
  },
  {
    title: "Devocional San Marcos",
    type: "Devocional",
    campus: "San Marcos",
    date: "Todos los miércoles",
    time: "12:30 pm",
    location: "Comedor Central, UNMSM",
    description: "Almuerza con nosotros mientras exploramos la Biblia.",
    recurring: true,
  },
  {
    title: "Retiro Universitario",
    type: "Retiro",
    campus: "Ambos",
    date: "15-17 Mayo 2026",
    time: "Salida 6:00 pm viernes",
    location: "Chosica",
    description: "Fin de semana para desconectar, reflexionar y conectar más profundo.",
    recurring: false,
    featured: true,
  },
  {
    title: "Charla: Fe y Ciencia",
    type: "Charla",
    campus: "Ambos",
    date: "22 Mayo 2026",
    time: "7:00 pm",
    location: "Online + Presencial",
    description: "Conversatorio sobre la relación entre la fe cristiana y el pensamiento científico.",
    recurring: false,
  },
  {
    title: "Voluntariado Mercy",
    type: "Servicio",
    campus: "Ambos",
    date: "30 Mayo 2026",
    time: "9:00 am",
    location: "Villa El Salvador",
    description: "Jornada de servicio comunitario con niños de la zona.",
    recurring: false,
  },
];

type FilterType = "Todos" | "PUCP" | "San Marcos" | "Ambos";

export default function EvolutionEvents() {
  const [filter, setFilter] = useState<FilterType>("Todos");

  const filteredEvents =
    filter === "Todos"
      ? events
      : events.filter((e) => e.campus === filter || e.campus === "Ambos");

  return (
    <section
      id="eventos"
      className="relative bg-[#072a12] py-32 md:py-40 px-6 md:px-10"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[#e2a633]/50 uppercase">
            03 — Agenda
          </span>
          <div className="flex-1 h-px bg-[#e2a633]/10" />
        </div>

        {/* Headline + Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[#e2a633] leading-tight"
            >
              Próximos
              <br />
              <em className="italic font-light text-[#f5f3ee]/80">eventos.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[#f5f3ee]/60 text-base mb-6">
              Devocionales, retiros, charlas y servicio. Filtra por campus.
            </p>
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {(["Todos", "PUCP", "San Marcos"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                    filter === f
                      ? "bg-[#e2a633] text-[#093b18]"
                      : "border border-[#e2a633]/30 text-[#e2a633]/70 hover:border-[#e2a633] hover:text-[#e2a633]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events list */}
        <div className="space-y-4">
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group p-6 md:p-8 rounded-xl border transition-all ${
                event.featured
                  ? "bg-[#e2a633]/10 border-[#e2a633]/30 hover:border-[#e2a633]/50"
                  : "bg-[#093b18] border-[#e2a633]/10 hover:border-[#e2a633]/30"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Type tag */}
                <div className="shrink-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase ${
                      event.featured
                        ? "bg-[#e2a633] text-[#093b18]"
                        : "bg-[#e2a633]/20 text-[#e2a633]"
                    }`}
                  >
                    {event.type}
                  </span>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl text-[#f5f3ee] mb-2 group-hover:text-[#e2a633] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-[#f5f3ee]/50 text-sm line-clamp-1">
                    {event.description}
                  </p>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[#f5f3ee]/50 text-sm shrink-0">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} strokeWidth={1.5} className="text-[#e2a633]/60" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} strokeWidth={1.5} className="text-[#e2a633]/60" />
                    {event.time}
                  </span>
                  <span className="hidden lg:inline-flex items-center gap-1.5">
                    <MapPin size={14} strokeWidth={1.5} className="text-[#e2a633]/60" />
                    {event.location}
                  </span>
                </div>

                {/* CTA */}
                <button className="shrink-0 w-10 h-10 rounded-full border border-[#e2a633]/30 flex items-center justify-center text-[#e2a633]/70 group-hover:bg-[#e2a633] group-hover:text-[#093b18] group-hover:border-[#e2a633] transition-all">
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
