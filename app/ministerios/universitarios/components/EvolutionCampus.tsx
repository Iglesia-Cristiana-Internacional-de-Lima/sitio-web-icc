"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, User } from "lucide-react";
import Link from "next/link";

const campuses = [
  {
    id: "pucp",
    name: "Evolution PUCP",
    university: "Pontificia Universidad Católica del Perú",
    location: "San Miguel",
    meetingPoint: "Punto Verde",
    day: "Jueves",
    time: "1:00 pm",
    leader: {
      name: "Mateo Reyes",
      career: "Ingeniería Civil, 8vo ciclo",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    description:
      "Cada jueves nos reunimos en el campus para un devocional corto. 30 minutos para reflexionar, compartir y empezar bien la semana.",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    whatsapp: "51999999999",
  },
  {
    id: "sanmarcos",
    name: "Evolution San Marcos",
    university: "Universidad Nacional Mayor de San Marcos",
    location: "Cercado de Lima",
    meetingPoint: "Comedor Central",
    day: "Miércoles",
    time: "12:30 pm",
    leader: {
      name: "Valeria Torres",
      career: "Medicina, 6to ciclo",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    description:
      "En medio del horario más pesado, un espacio para respirar. Almuerza con nosotros y conecta antes de la siguiente clase.",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    whatsapp: "51999999998",
  },
];

export default function EvolutionCampus() {
  return (
    <section className="relative bg-[#093b18] py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[#e2a633]/50 uppercase">
            02 — Ubicaciones
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
            Dos campus.
            <br />
            <em className="italic font-light text-[#f5f3ee]/80">
              Una misma familia.
            </em>
          </motion.h2>
        </div>

        {/* Campus cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {campuses.map((campus, i) => (
            <motion.div
              key={campus.id}
              id={campus.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-[#e2a633]/20 bg-[#072a12]"
            >
              {/* Campus image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-transform duration-1000"
                  style={{ backgroundImage: `url(${campus.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072a12] via-[#072a12]/50 to-transparent" />

                {/* Location tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e2a633] text-[#093b18] font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
                    <MapPin size={12} strokeWidth={2} />
                    {campus.location}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-display text-3xl md:text-4xl text-[#e2a633] mb-2">
                  {campus.name}
                </h3>
                <p className="text-[#f5f3ee]/60 text-sm mb-6">
                  {campus.university}
                </p>

                <p className="text-[#f5f3ee]/70 text-base leading-relaxed mb-8">
                  {campus.description}
                </p>

                {/* Schedule */}
                <div className="flex flex-wrap items-center gap-6 mb-8 text-[#f5f3ee]/50">
                  <span className="inline-flex items-center gap-2 text-sm">
                    <Calendar size={16} strokeWidth={1.5} className="text-[#e2a633]" />
                    {campus.day}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm">
                    <Clock size={16} strokeWidth={1.5} className="text-[#e2a633]" />
                    {campus.time}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm">
                    <MapPin size={16} strokeWidth={1.5} className="text-[#e2a633]" />
                    {campus.meetingPoint}
                  </span>
                </div>

                {/* Leader */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#093b18] border border-[#e2a633]/10 mb-8">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center border border-[#e2a633]/30"
                    style={{ backgroundImage: `url(${campus.leader.img})` }}
                  />
                  <div>
                    <p className="text-[#f5f3ee] font-medium">
                      {campus.leader.name}
                    </p>
                    <p className="text-[#f5f3ee]/50 text-xs flex items-center gap-1">
                      <User size={10} strokeWidth={1.5} />
                      {campus.leader.career}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/${campus.whatsapp}?text=${encodeURIComponent(
                    `Hola! Quiero conectar con Evolution ${campus.name.replace("Evolution ", "")}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#e2a633] text-[#093b18] text-sm font-medium hover:bg-[#e2a633]/90 transition-all"
                >
                  Conectar con {campus.name.replace("Evolution ", "")}
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
