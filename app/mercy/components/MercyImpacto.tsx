"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "500+", label: "Familias beneficiadas", desc: "en el último año" },
  { number: "2K+", label: "Voluntarios activos", desc: "en todas las sedes" },
  { number: "12", label: "Proyectos activos", desc: "en Lima Metropolitana" },
  { number: "50+", label: "Alianzas", desc: "con organizaciones locales" },
];

const areas = [
  {
    title: "Alimentación",
    description:
      "Entrega de víveres y almuerzos comunitarios en zonas vulnerables de Lima.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
  },
  {
    title: "Educación",
    description:
      "Apoyo escolar, útiles y becas para niños y jóvenes de escasos recursos.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
  {
    title: "Salud",
    description:
      "Campañas médicas, donación de medicinas y acompañamiento a enfermos.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
  {
    title: "Comunidad",
    description:
      "Limpieza de espacios públicos, pintado de escuelas y embellecimiento urbano.",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
  },
];

export default function MercyImpacto() {
  return (
    <section className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
            01 — Impacto
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight"
            >
              Números que
              <br />
              <em className="italic font-light text-white/70">importan.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-white/60 text-lg leading-relaxed">
              Cada número representa una vida tocada, una familia ayudada, una
              comunidad transformada. Esto es lo que hacemos juntos.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 pb-20 border-b border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <span className="font-display text-5xl md:text-6xl text-white">
                {stat.number}
              </span>
              <p className="font-mono text-[11px] tracking-[0.28em] text-white/70 uppercase mt-3">
                {stat.label}
              </p>
              <p className="text-white/40 text-sm mt-1">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Areas of impact */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-3xl text-white mb-12"
          >
            Áreas de servicio
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {areas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-[#0d0d0d] overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                    style={{ backgroundImage: `url(${area.img})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="font-display text-2xl text-white mb-2 group-hover:italic transition-all">
                    {area.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
