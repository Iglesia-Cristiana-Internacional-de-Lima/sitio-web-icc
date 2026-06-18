"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Filter,
} from "lucide-react";

type EventCategory = "Todos" | "Servicios" | "Devocionales" | "Charlas" | "Especiales";

const eventos = [
  {
    id: 1,
    title: "Servicio Dominical",
    category: "Servicios",
    date: "Todos los domingos",
    time: "10:00 am",
    location: "Todas las sedes",
    description: "Adoración, mensaje práctico y comunidad. El corazón de nuestra semana.",
    recurring: true,
    attendees: 450,
  },
  {
    id: 2,
    title: "Devocional PUCP",
    category: "Devocionales",
    date: "Todos los jueves",
    time: "1:00 pm",
    location: "PUCP - Punto Verde",
    description: "Estudio bíblico semanal para universitarios de la PUCP.",
    recurring: true,
    attendees: 35,
  },
  {
    id: 3,
    title: "Devocional San Marcos",
    category: "Devocionales",
    date: "Todos los miércoles",
    time: "12:30 pm",
    location: "UNMSM - Comedor Central",
    description: "Almuerza con nosotros mientras exploramos la Biblia.",
    recurring: true,
    attendees: 28,
  },
  {
    id: 4,
    title: "Charla Bíblica - Miraflores",
    category: "Charlas",
    date: "10 Mayo 2026",
    time: "7:00 pm",
    location: "Starbucks Larco",
    description: "Conversación abierta sobre fe y propósito. Ideal para primera vez.",
    recurring: false,
    attendees: 12,
    featured: true,
  },
  {
    id: 5,
    title: "Charla Bíblica - San Isidro",
    category: "Charlas",
    date: "15 Mayo 2026",
    time: "7:30 pm",
    location: "Café Bisetti",
    description: "Espacio para preguntas sobre la Biblia y la vida cristiana.",
    recurring: false,
    attendees: 8,
    featured: true,
  },
  {
    id: 6,
    title: "Reunión de Profesionales",
    category: "Devocionales",
    date: "Todos los miércoles",
    time: "7:30 pm",
    location: "Sede Miraflores",
    description: "Networking con propósito. Fe en el mundo laboral.",
    recurring: true,
    attendees: 65,
  },
  {
    id: 7,
    title: "Retiro de Casados",
    category: "Especiales",
    date: "22-24 Mayo 2026",
    time: "Salida 6:00 pm viernes",
    location: "Cieneguilla",
    description: "Fin de semana para fortalecer tu matrimonio.",
    recurring: false,
    attendees: 40,
  },
  {
    id: 8,
    title: "Bautismos",
    category: "Especiales",
    date: "31 Mayo 2026",
    time: "11:00 am",
    location: "Sede Lima Centro",
    description: "Celebración de nuevas vidas en Cristo.",
    recurring: false,
    attendees: 200,
  },
];

export default function EventosLista() {
  const [filter, setFilter] = useState<EventCategory>("Todos");

  const filteredEvents =
    filter === "Todos"
      ? eventos
      : eventos.filter((e) => e.category === filter);

  const categories: EventCategory[] = [
    "Todos",
    "Servicios",
    "Devocionales",
    "Charlas",
    "Especiales",
  ];

  return (
    <section className="relative bg-[#0d0d0d] py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="display-heading text-white text-[clamp(3rem,7vw,6rem)]"
            >
              Eventos
            </motion.h1>
            <p className="text-white/60 text-lg mt-4 max-w-lg">
              Servicios, devocionales, charlas bíblicas y eventos especiales.
              Encuentra tu próximo momento con la comunidad.
            </p>
          </div>

          {/* Filters */}
          <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-end">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                    filter === cat
                      ? "bg-white text-black"
                      : "border border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events list */}
        <div className="space-y-4">
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group p-6 md:p-8 rounded-xl border transition-all cursor-pointer ${
                event.featured
                  ? "bg-white/5 border-white/20 hover:border-white/40"
                  : "bg-[#191919] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Category tag */}
                <div className="shrink-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase ${
                      event.featured
                        ? "bg-white text-black"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {event.category}
                  </span>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-2 group-hover:italic transition-all">
                    {event.title}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-1">
                    {event.description}
                  </p>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-white/50 text-sm shrink-0">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} strokeWidth={1.5} className="text-white/30" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} strokeWidth={1.5} className="text-white/30" />
                    {event.time}
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1.5">
                    <MapPin size={14} strokeWidth={1.5} className="text-white/30" />
                    {event.location}
                  </span>
                  {!event.recurring && (
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} strokeWidth={1.5} className="text-white/30" />
                      {event.attendees} confirmados
                    </span>
                  )}
                </div>

                {/* CTA */}
                <button className="shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors">
            Ver más eventos
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
