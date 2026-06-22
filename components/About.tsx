"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            02 — Sobre Nosotros
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Big statement */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              No somos un edificio.
              <br />
              <em className="italic font-light text-[var(--fg-70)]">
                Somos personas.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-10 text-[var(--fg-70)] text-lg md:text-xl leading-relaxed max-w-xl"
            >
              Llevamos más de dos décadas reuniéndonos en Lima. Nada de teatro
              espiritual. Hablamos directo, vivimos en comunidad y creemos que
              Jesús todavía cambia vidas.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-6 text-[var(--fg-50)] text-base leading-relaxed max-w-xl"
            >
              Somos parte de una familia internacional de iglesias presente en
              más de 150 países. En Lima tenemos varias sedes, ministerios para
              cada etapa de vida y la puerta abierta para todos.
            </motion.p>
          </div>

          {/* Right: Pillars */}
          <div className="lg:col-span-5 space-y-px bg-[var(--line)]">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-[var(--bg)] p-8 group hover:bg-[var(--surface)] transition-colors duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--fg-40)] mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-[var(--fg)] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-[var(--fg-60)] text-sm leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 border-t border-[var(--line)] pt-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <span className="font-display text-5xl md:text-6xl text-[var(--fg)]">
                {s.number}
              </span>
              <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--fg-50)] uppercase mt-3">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pillars = [
  {
    title: "Visión",
    body: "Ser una iglesia que transforma Lima a través de comunidades reales que viven el evangelio sin disfraces.",
  },
  {
    title: "Misión",
    body: "Hacer discípulos. Acompañar a cada persona desde la duda hasta una fe que cambia su forma de vivir.",
  },
  {
    title: "Valores",
    body: "Familia, autenticidad, servicio, excelencia. Lo que dices y cómo vives tienen que coincidir.",
  },
];

const stats = [
  { number: "06+", label: "Sedes en Lima" },
  { number: "20+", label: "Años en Perú" },
  { number: "150+", label: "Países conectados" },
  { number: "5K+", label: "Familia activa" },
];
