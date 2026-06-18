"use client";

import { motion } from "framer-motion";
import { Video, MapPin, Clock, MessageCircle } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Conversación, no clase",
    description:
      "No hay libreto. Traes tus preguntas, tus dudas, tu historia. Exploramos la Biblia juntos.",
  },
  {
    icon: Clock,
    title: "A tu ritmo",
    description:
      "Tú decides la frecuencia: semanal, quincenal, cuando puedas. Sin presión de asistencia.",
  },
  {
    icon: MapPin,
    title: "Donde prefieras",
    description:
      "En un café, en la universidad, en tu oficina o en línea. El lugar lo eliges tú.",
  },
  {
    icon: Video,
    title: "Presencial u online",
    description:
      "Si no puedes en persona, nos conectamos por video. La distancia no es excusa.",
  },
];

const steps = [
  {
    n: "01",
    title: "Elige tu líder",
    desc: "Mira los perfiles y elige con quién te sientes cómodo para conversar.",
  },
  {
    n: "02",
    title: "Reserva tu horario",
    desc: "Escoge el día, la hora y la modalidad. Recibirás confirmación inmediata.",
  },
  {
    n: "03",
    title: "Conversamos",
    desc: "Llegamos a la cita preparados para escucharte y explorar la Biblia contigo.",
  },
];

export default function EstudiosInfo() {
  return (
    <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            01 — Cómo funciona
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--surface-5)] flex items-center justify-center mb-6 group-hover:bg-[var(--surface-10)] transition-colors">
                <feature.icon
                  size={24}
                  strokeWidth={1.5}
                  className="text-[var(--fg-70)]"
                />
              </div>
              <h3 className="font-display text-2xl text-[var(--fg)] mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--fg-50)] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)] sticky top-32"
            >
              Tres pasos.
              <br />
              <em className="italic font-light text-[var(--fg-70)]">Sin complicaciones.</em>
            </motion.h2>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-px bg-[var(--line)]">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[var(--bg)] p-8 md:p-10 group hover:bg-[var(--surface)] transition-colors duration-500"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-4xl md:text-5xl text-[var(--fg-20)] group-hover:text-[var(--fg-40)] transition-colors">
                      {step.n}
                    </span>
                    <div className="flex-1 pt-2">
                      <h3 className="font-display text-2xl md:text-3xl text-[var(--fg)] mb-3 group-hover:italic transition-all">
                        {step.title}
                      </h3>
                      <p className="text-[var(--fg-50)] text-base leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
