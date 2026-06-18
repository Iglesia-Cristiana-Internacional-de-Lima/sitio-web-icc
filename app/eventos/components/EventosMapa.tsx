"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

const charlas = [
  {
    id: 1,
    title: "Charla Bíblica Miraflores",
    date: "10 Mayo 2026",
    time: "7:00 pm",
    location: "Starbucks Larco",
    address: "Av. Larco 345, Miraflores",
    coords: { x: 28, y: 65 },
    leader: "Daniel Quispe",
  },
  {
    id: 2,
    title: "Charla Bíblica San Isidro",
    date: "15 Mayo 2026",
    time: "7:30 pm",
    location: "Café Bisetti",
    address: "Av. Conquistadores 599, San Isidro",
    coords: { x: 45, y: 55 },
    leader: "Lucía Reyes",
  },
  {
    id: 3,
    title: "Charla Bíblica La Molina",
    date: "18 Mayo 2026",
    time: "6:30 pm",
    location: "Starbucks Jockey Plaza",
    address: "Jockey Plaza, La Molina",
    coords: { x: 70, y: 50 },
    leader: "Carlos Salazar",
  },
  {
    id: 4,
    title: "Charla Bíblica Surco",
    date: "22 Mayo 2026",
    time: "7:00 pm",
    location: "Café de Lima",
    address: "Av. Primavera 890, Surco",
    coords: { x: 55, y: 72 },
    leader: "María Torres",
  },
  {
    id: 5,
    title: "Charla Bíblica Lima Centro",
    date: "25 Mayo 2026",
    time: "6:00 pm",
    location: "Sede Lima Centro",
    address: "Av. Garcilaso de la Vega 1234",
    coords: { x: 35, y: 45 },
    leader: "Andrés Mendoza",
  },
];

export default function EventosMapa() {
  const [active, setActive] = useState(0);
  const activeCharla = charlas[active];

  return (
    <section className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
            Mapa de Charlas Bíblicas
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-white text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              Encuentra una charla
              <br />
              <em className="italic font-light text-white/70">cerca de ti.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-white/60 text-lg leading-relaxed">
              Las charlas bíblicas son conversaciones abiertas, ideales si es
              tu primera vez. Haz click en el mapa para ver los detalles.
            </p>
          </div>
        </div>

        {/* Map + List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] bg-[#191919] border border-white/10 rounded-2xl overflow-hidden">
              {/* Stylized map background */}
              <svg
                className="absolute inset-0 w-full h-full opacity-40"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="map-grid"
                    width="5"
                    height="5"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 5 0 L 0 0 0 5"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="0.2"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#map-grid)" />
                {/* Topo lines */}
                {[20, 35, 50, 65, 80].map((r) => (
                  <circle
                    key={r}
                    cx="50"
                    cy="55"
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="0.15"
                  />
                ))}
              </svg>

              {/* Header */}
              <div className="absolute top-6 left-6 z-10">
                <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-white/40">
                  Lima Metropolitana
                </span>
                <p className="font-display text-xl text-white mt-1">
                  {activeCharla.title}
                </p>
              </div>

              {/* Map points */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {charlas.map((charla, i) => (
                  <g
                    key={charla.id}
                    className="cursor-pointer"
                    onClick={() => setActive(i)}
                  >
                    {active === i && (
                      <circle
                        cx={charla.coords.x}
                        cy={charla.coords.y}
                        r="3"
                        fill="rgba(255,255,255,0.2)"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={charla.coords.x}
                      cy={charla.coords.y}
                      r={active === i ? "1.5" : "1"}
                      fill={active === i ? "white" : "rgba(255,255,255,0.5)"}
                      className="transition-all"
                    />
                  </g>
                ))}
              </svg>

              {/* Active charla popup */}
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl text-white mb-2">
                      {activeCharla.location}
                    </h3>
                    <p className="text-white/50 text-sm">{activeCharla.address}</p>
                    <div className="flex items-center gap-4 mt-3 text-white/40 text-xs">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} strokeWidth={1.5} />
                        {activeCharla.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} strokeWidth={1.5} />
                        {activeCharla.time}
                      </span>
                    </div>
                  </div>
                  <button className="shrink-0 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-all">
                    Confirmar
                  </button>
                </div>
              </motion.div>

              {/* Coords */}
              <div className="absolute bottom-6 right-6 z-10">
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/40">
                  0{active + 1} / 0{charlas.length}
                </span>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-5 space-y-3">
            {charlas.map((charla, i) => (
              <motion.button
                key={charla.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-xl border transition-all ${
                  active === i
                    ? "bg-white/5 border-white/20"
                    : "bg-[#191919] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                      active === i
                        ? "bg-white text-black"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    0{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">
                      {charla.location}
                    </h4>
                    <p className="text-white/40 text-xs">
                      {charla.date} · {charla.time}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className={`shrink-0 ${
                      active === i ? "text-white" : "text-white/30"
                    }`}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
