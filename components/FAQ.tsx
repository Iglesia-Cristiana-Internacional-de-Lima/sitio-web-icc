"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "¿Qué pasa si nunca he ido a una iglesia?",
    a: "Bienvenido. La mayoría de personas que llegan por primera vez sienten lo mismo. No hay códigos secretos ni rituales raros. Llega como vienes.",
  },
  {
    q: "¿Cuánto dura el servicio dominical?",
    a: "Aproximadamente 75 minutos. Música, un mensaje práctico y espacio para conversar después.",
  },
  {
    q: "¿Tienen algo para mis hijos?",
    a: "Sí. Mientras estás en el servicio, tus hijos están con un equipo capacitado en un espacio pensado para su edad.",
  },
  {
    q: "¿Tengo que registrarme?",
    a: "No. Ven, escucha, observa. Si más adelante quieres conectar más, te ayudamos cuando quieras.",
  },
  {
    q: "¿Cómo encuentro mi sede más cercana?",
    a: "Mira el mapa en la sección Sedes. También puedes escribirnos por WhatsApp y te orientamos.",
  },
  {
    q: "¿Qué tipo de iglesia son?",
    a: "Cristiana evangélica, parte de una familia internacional. Creemos en la Biblia, en Jesús y en la comunidad real.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            07 — Preguntas
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)] sticky top-32"
            >
              Lo que
              <br />
              <em className="italic font-light text-[var(--fg-70)]">
                normalmente nos preguntan.
              </em>
            </motion.h2>
          </div>

          <div className="lg:col-span-7 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-7 flex items-center justify-between gap-6 group"
                >
                  <span className="flex items-center gap-6 flex-1">
                    <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--fg-40)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl md:text-2xl text-[var(--fg)] group-hover:italic transition-all">
                      {f.q}
                    </span>
                  </span>
                  <span className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--fg)] shrink-0 group-hover:border-[var(--line-strong)] transition-colors">
                    {open === i ? (
                      <Minus size={16} strokeWidth={1.5} />
                    ) : (
                      <Plus size={16} strokeWidth={1.5} />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[var(--fg-60)] text-base leading-relaxed pb-7 pl-[60px] pr-12 max-w-2xl">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
