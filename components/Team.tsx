"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Andrés Mendoza",
    role: "Pastor Principal",
    area: "Liderazgo",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "María Torres",
    role: "Directora de Ministerios",
    area: "Ministerios",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Waldir Caro",
    role: "Líder",
    area: "Liderazgo",
    img: "/images/team/waldir-caro.jpg",
  },
  {
    name: "Carlos Salazar",
    role: "Coordinador de Sedes",
    area: "Operaciones",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
  {
    name: "Lucía Reyes",
    role: "Líder de Alabanza",
    area: "Adoración",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
  {
    name: "Daniel Quispe",
    role: "Director de Comunicaciones",
    area: "Medios",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  },
  {
    name: "Patricia Vega",
    role: "Coordinadora de Eventos",
    area: "Eventos",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
  },
  {
    name: "Juan Pablo García",
    role: "Líder de Mercy",
    area: "Servicio Social",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
  },
];

export default function Team() {
  return (
    <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            08 — Equipo
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Headline */}
        <div className="mb-20 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)]"
          >
            Personas reales,
            <br />
            <em className="italic font-light text-[var(--fg-70)]">sirviendo juntos.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 text-[var(--fg-60)] text-lg leading-relaxed max-w-xl"
          >
            Detrás de cada sede, cada evento y cada ministerio hay un equipo
            comprometido. Conoce a quienes hacen posible esta familia.
          </motion.p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--line)]">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group bg-[#0d0d0d] overflow-hidden"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000"
                  style={{ backgroundImage: `url(${member.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Area tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm font-mono text-[9px] tracking-[0.2em] uppercase text-white/70">
                    {member.area}
                  </span>
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-xl md:text-2xl text-white mb-1 group-hover:italic transition-all">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
