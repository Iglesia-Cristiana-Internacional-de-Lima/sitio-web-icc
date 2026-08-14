"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  distrito: string | null;
  horario: string | null;
  lat: number | null;
  lng: number | null;
}

export default function Sedes() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/sedes")
      .then((r) => r.ok ? r.json() : { data: [] })
      .then((data) => setSedes(data.data || []))
      .finally(() => setLoading(false));
  }, []);

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
            <div className="sticky top-28 aspect-[3/4] lg:aspect-auto lg:h-[640px] bg-[#1a1714] border border-[var(--accent-warm-20)] rounded-lg overflow-hidden relative">
              <MapVisualization sedes={sedes} activeIndex={active} />
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-7 order-1 lg:order-2 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {loading ? (
              <div className="py-20 flex justify-center">
                <div className="w-6 h-6 border-2 border-[var(--fg-30)] border-t-[var(--fg)] rounded-full animate-spin" />
              </div>
            ) : sedes.length === 0 ? (
              <div className="py-20 text-center text-[var(--fg-50)]">No hay sedes disponibles</div>
            ) : (
              sedes.map((s, i) => (
                <motion.button
                  key={s.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`w-full text-left py-8 group transition-colors ${
                    active === i ? "bg-[var(--surface-5)]" : ""
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <span className="col-span-1 font-mono text-[11px] tracking-[0.28em] text-[var(--fg-40)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-7 md:col-span-6">
                    <h3 className="font-display text-3xl md:text-4xl text-[var(--fg)] group-hover:italic transition-all">
                      {s.nombre}
                    </h3>
                    <p className="text-[var(--fg-50)] text-sm mt-1 flex items-center gap-2">
                      <MapPin size={12} strokeWidth={1.5} />
                      {s.distrito} · {s.direccion}
                    </p>
                  </div>
                  <div className="hidden md:block md:col-span-4 text-[var(--fg-60)] text-sm">
                    <p className="font-mono text-[11px] tracking-wider mt-1 text-[var(--fg-40)]">
                      {s.horario || "Domingos"}
                    </p>
                  </div>
                  <div className="col-span-4 md:col-span-1 flex justify-end">
                    <span className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center group-hover:bg-[var(--inverse-bg)] group-hover:text-[var(--inverse-fg)] group-hover:border-[var(--inverse-bg)] transition-all">
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </div>
    </div>
  </section>
  );
}

function MapVisualization({ sedes, activeIndex }: { sedes: Sede[]; activeIndex: number }) {
  const bounds = {
    minLat: -12.22, maxLat: -11.85,
    minLng: -77.18, maxLng: -76.82,
  };
  const pad = 12;
  const w = 100 - pad * 2;
  const h = 100 - pad * 2;

  const toSvg = (lat: number, lng: number) => ({
    x: pad + ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * w,
    y: pad + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * h,
  });

  const points = sedes.map((s) => ({
    ...toSvg(s.lat || -12.05, s.lng || -77.04),
    name: s.nombre,
    distrito: s.distrito,
  }));

  const activeSede = sedes[activeIndex];
  const accent = "#D4A574";

  return (
    <div className="absolute inset-0 p-8 flex flex-col">
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-white/40">
            Lima · Perú
          </span>
          <p className="font-display text-2xl text-white mt-2">
            {points[activeIndex]?.name}
          </p>
          {activeSede?.distrito && (
            <p className="text-white/50 text-sm mt-1">{activeSede.distrito}</p>
          )}
        </div>
      </div>

      {/* Map SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Lima coastline (simplified Pacific coast) */}
        <path
          d="M 2,15 Q 8,25 5,40 Q 3,55 6,70 Q 10,85 8,98"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.4"
          strokeDasharray="1,1"
        />
        <text x="3" y="50" fill="rgba(255,255,255,0.06)" fontSize="2.5" fontFamily="monospace" transform="rotate(-90,3,50)">
          OCÉANO PACÍFICO
        </text>

        {/* Connection lines between sedes */}
        {points.map((p, i) => {
          if (i === 0) return null;
          const prev = points[i - 1];
          return (
            <line key={`line-${i}`} x1={prev.x} y1={prev.y} x2={p.x} y2={p.y}
              stroke="rgba(255,255,255,0.06)" strokeWidth="0.15" strokeDasharray="0.5,0.5" />
          );
        })}

        {/* Sede points */}
        {points.map((p, i) => (
          <g key={i}>
            {activeIndex === i && (
              <>
                <circle cx={p.x} cy={p.y} r="8" fill="url(#glow)" />
                <circle cx={p.x} cy={p.y} r="3.5" fill="none" stroke={accent} strokeWidth="0.15" opacity="0.4" className="animate-ping" />
              </>
            )}
            <circle
              cx={p.x} cy={p.y}
              r={activeIndex === i ? "1.8" : "1"}
              fill={activeIndex === i ? accent : "rgba(255,255,255,0.35)"}
              className="transition-all duration-500"
            />
            {activeIndex === i && (
              <text x={p.x + 3} y={p.y + 0.5} fill="white" fontSize="2.2" fontFamily="sans-serif" opacity="0.8">
                {p.distrito || p.name}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Footer coords */}
      <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between">
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/40">
          {activeSede?.lat ? `${Math.abs(activeSede.lat).toFixed(4)}°S` : "12.0464°S"} · {activeSede?.lng ? `${Math.abs(activeSede.lng).toFixed(4)}°W` : "77.0428°W"}
        </span>
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: accent }}>
          0{activeIndex + 1} / {String(sedes.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
