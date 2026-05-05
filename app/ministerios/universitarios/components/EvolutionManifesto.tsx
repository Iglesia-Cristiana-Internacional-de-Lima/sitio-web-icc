"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Devocionales semanales",
    desc: "Estudios bíblicos cortos cada semana en tu campus, pensados para la vida real del universitario.",
  },
  {
    title: "Estudios personalizados",
    desc: "Conversaciones uno a uno sobre la Biblia, tus dudas y tu búsqueda espiritual.",
  },
  {
    title: "Comunidad auténtica",
    desc: "Amistades reales que te acompañan en la presión de la universidad y de la vida.",
  },
  {
    title: "Eventos y retiros",
    desc: "Momentos especiales para desconectar, reflexionar y conectar a otro nivel.",
  },
  {
    title: "Servicio comunitario",
    desc: "Oportunidades de hacer algo significativo por otros, juntos.",
  },
  {
    title: "Red internacional",
    desc: "Conexión con universitarios cristianos en todo el mundo a través de nuestra familia de iglesias.",
  },
];

export default function EvolutionManifesto() {
  return (
    <section className="relative bg-[#072a12] py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[#e2a633]/50 uppercase">
            01 — Quiénes somos
          </span>
          <div className="flex-1 h-px bg-[#e2a633]/10" />
        </div>

        {/* Main text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[#e2a633] leading-tight"
            >
              Fe que se vive
              <br />
              <em className="italic font-light text-[#f5f3ee]/80">
                en el campus.
              </em>
            </motion.h2>
          </div>

          <div className="lg:col-span-5 lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[#f5f3ee]/70 text-lg leading-relaxed"
            >
              Evolution Lima es una comunidad de universitarios que creen que
              la fe no es solo para los domingos. Es para las aulas, los
              exámenes, las amistades, las dudas y los descubrimientos.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-6 text-[#f5f3ee]/50 text-base leading-relaxed"
            >
              No somos un club religioso ni un grupo de autoayuda. Somos
              estudiantes de carreras exigentes que encontramos en Jesús una
              razón para vivir con propósito. Y queremos que tú también lo
              descubras.
            </motion.p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e2a633]/10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#072a12] p-8 group hover:bg-[#093b18] transition-colors duration-500"
            >
              <span className="font-mono text-[11px] tracking-[0.28em] text-[#e2a633]/40 uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl text-[#f5f3ee] mt-4 mb-3 group-hover:text-[#e2a633] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#f5f3ee]/50 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
