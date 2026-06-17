"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const sedes = [
  {
    name: "Lima Centro",
    district: "Cercado de Lima",
    pastor: "Pastor Andrés Mendoza",
    schedule: "Domingos · 10:00 am · 6:00 pm",
    address: "Av. Garcilaso de la Vega 1234",
  },
  {
    name: "Miraflores",
    district: "Miraflores",
    pastor: "Pastor Daniel Quispe",
    schedule: "Domingos · 11:00 am",
    address: "Av. Larco 980",
  },
  {
    name: "San Isidro",
    district: "San Isidro",
    pastor: "Pastor Lucía Reyes",
    schedule: "Domingos · 10:30 am",
    address: "Av. Javier Prado Este 456",
  },
  {
    name: "La Molina",
    district: "La Molina",
    pastor: "Pastor Juan Pablo Vega",
    schedule: "Domingos · 11:00 am",
    address: "Av. La Universidad 1820",
  },
  {
    name: "San Borja",
    district: "San Borja",
    pastor: "Pastor María Torres",
    schedule: "Domingos · 10:00 am",
    address: "Av. Aviación 2350",
  },
  {
    name: "Surco",
    district: "Santiago de Surco",
    pastor: "Pastor Carlos Salazar",
    schedule: "Domingos · 10:30 am · 6:30 pm",
    address: "Av. Caminos del Inca 1670",
  },
];

export default function Sedes() {
  const [active, setActive] = useState(0);

  return (
    <section id="sedes" className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            03 — Familia de iglesias
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
              Encuentra tu sede
              <br />
              <em className="italic font-light text-[var(--fg-70)]">más cercana.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[var(--fg-60)] text-lg leading-relaxed">
              Seis sedes en Lima. Cada una con su propio sabor, mismo
              corazón. Elige la que te queda cerca y ven sin avisar.
            </p>
          </div>
        </div>

        {/* Sedes list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map placeholder */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="sticky top-28 aspect-[3/4] lg:aspect-auto lg:h-[640px] bg-[#191919] border border-white/10 rounded-sm overflow-hidden relative">
              <MapVisualization activeIndex={active} />
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-7 order-1 lg:order-2 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {sedes.map((s, i) => (
              <motion.button
                key={s.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`w-full text-left py-8 group transition-colors ${
                  active === i ? "bg-white/[0.02]" : ""
                }`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <span className="col-span-1 font-mono text-[11px] tracking-[0.28em] text-[var(--fg-40)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-7 md:col-span-6">
                    <h3 className="font-display text-3xl md:text-4xl text-[var(--fg)] group-hover:italic transition-all">
                      {s.name}
                    </h3>
                    <p className="text-[var(--fg-50)] text-sm mt-1 flex items-center gap-2">
                      <MapPin size={12} strokeWidth={1.5} />
                      {s.district} · {s.address}
                    </p>
                  </div>
                  <div className="hidden md:block md:col-span-4 text-[var(--fg-60)] text-sm">
                    <p>{s.pastor}</p>
                    <p className="font-mono text-[11px] tracking-wider mt-1 text-[var(--fg-40)]">
                      {s.schedule}
                    </p>
                  </div>
                  <div className="col-span-4 md:col-span-1 flex justify-end">
                    <span className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center group-hover:bg-[var(--inverse-bg)] group-hover:text-[var(--inverse-fg)] group-hover:border-[var(--inverse-bg)] transition-all">
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapVisualization({ activeIndex }: { activeIndex: number }) {
  const [barValues, setBarValues] = useState<{ height: number; delay: number }[]>([]);

  useEffect(() => {
    setBarValues(
      Array.from({ length: 12 }).map((_, i) => ({
        height: 30 + Math.random() * 70,
        delay: i * 0.08,
      }))
    );
  }, []);

  // Stylized map with dots representing sedes
  const points = [
    { x: 35, y: 45, name: "Lima Centro" },
    { x: 28, y: 65, name: "Miraflores" },
    { x: 45, y: 55, name: "San Isidro" },
    { x: 70, y: 50, name: "La Molina" },
    { x: 55, y: 60, name: "San Borja" },
    { x: 50, y: 75, name: "Surco" },
  ];

  return (
    <div className="absolute inset-0 p-8">
      {/* Stylized topographic background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path
              d="M 5 0 L 0 0 0 5"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.2"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
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
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-white/40">
            Lima · Perú
          </span>
          <p className="font-display text-2xl text-white mt-2">
            {points[activeIndex]?.name}
          </p>
        </div>
        <div className="flex items-end gap-[2px] h-6 text-white/60">
          {barValues.map((bar, i) => (
            <span
              key={i}
              className="sound-bar"
              style={{
                height: `${bar.height}%`,
                animationDelay: `${bar.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {points.map((p, i) => (
          <g key={i}>
            {activeIndex === i && (
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="rgba(255,255,255,0.15)"
                className="animate-ping"
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={activeIndex === i ? "1.2" : "0.8"}
              fill={activeIndex === i ? "white" : "rgba(255,255,255,0.4)"}
              className="transition-all"
            />
          </g>
        ))}
      </svg>

      {/* Footer coords */}
      <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between">
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/40">
          12.0464°S · 77.0428°W
        </span>
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/60">
          0{activeIndex + 1} / 06
        </span>
      </div>
    </div>
  );
}
