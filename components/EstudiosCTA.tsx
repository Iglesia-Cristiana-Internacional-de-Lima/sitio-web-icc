"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function EstudiosCTA() {
  return (
    <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)] overflow-hidden">
      {/* Decorative wave */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
        <div className="flex items-end gap-2 h-[80vh]">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="block w-1 bg-white"
              style={{
                height: `${Math.max(5, Math.round((20 + Math.sin(i * 0.3) * 60 + Math.cos(i * 0.15) * 30) * 10) / 10)}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto relative">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            06 — Estudios
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-[var(--fg)] text-[clamp(3rem,8vw,7.5rem)]"
            >
              Tu primera
              <br />
              conversación
              <br />
              <em className="italic font-light text-[var(--fg-70)]">empieza aquí.</em>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 lg:pb-6">
            <p className="text-[var(--fg-60)] text-lg leading-relaxed mb-8">
              Reserva un estudio bíblico uno a uno. Tú eliges el lugar, el
              día, y con qué líder quieres conversar. Sin presión, sin agenda
              oculta.
            </p>
            <Link
              href="/estudios"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent-warm)] text-white text-sm font-medium hover:opacity-90 transition-all"
            >
              Reservar estudio
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="group-hover:rotate-45 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line-strong)] border-t border-[var(--line)]">
          {[
            {
              n: "01",
              t: "Eliges líder",
              d: "Mira los perfiles disponibles y elige con quién quieres conversar.",
            },
            {
              n: "02",
              t: "Reservas el día",
              d: "Presencial o por video. A la hora que te quede.",
            },
            {
              n: "03",
              t: "Conversamos",
              d: "Sin libreto. Trae tus dudas, las que sean.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-[var(--bg)] p-10"
            >
              <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-40)] uppercase">
                Paso {s.n}
              </span>
              <h3 className="font-display text-3xl text-[var(--fg)] mt-4">{s.t}</h3>
              <p className="text-[var(--fg-60)] text-sm mt-3 leading-relaxed">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
