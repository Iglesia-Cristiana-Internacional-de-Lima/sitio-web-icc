"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Clock, MapPin, ArrowRight, BookOpen, Users } from "lucide-react";
import Link from "next/link";

const eventos = [
  {
    title: "Reunión de Profesionales",
    date: "Todos los miércoles",
    time: "7:30 pm",
    location: "Sede Miraflores",
    description: "Networking con propósito. Fe en el mundo laboral.",
    recurring: true,
  },
  {
    title: "Desayuno Ejecutivo",
    date: "Primer sábado del mes",
    time: "8:00 am",
    location: "Sede San Isidro",
    description: "Conversaciones sobre liderazgo, ética y propósito en el trabajo.",
    recurring: true,
  },
  {
    title: "Taller: Fe y Finanzas",
    date: "Próximamente",
    time: "Por confirmar",
    location: "Online + Presencial",
    description: "Principios bíblicos aplicados a tus finanzas personales.",
    featured: true,
  },
];

export default function ProfesionalesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-[var(--bg)]/30" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.32em] text-[var(--fg-60)] uppercase mb-6"
          >
            <Briefcase size={14} strokeWidth={1.5} />
            Ministerio · 25-35 años
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="display-heading text-[var(--fg)] text-[clamp(2.5rem,7vw,5.5rem)] mb-6"
          >
            Fe en el
            <br />
            <em className="italic font-light text-[var(--fg-70)]">mundo real.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[var(--fg-60)] text-lg md:text-xl leading-relaxed max-w-xl"
          >
            Vida real, presión real, fe real. Una comunidad de profesionales que
            integra lo que cree con lo que hace, de lunes a viernes.
          </motion.p>
        </div>
      </section>

      {/* Info section */}
      <section className="bg-[var(--bg)] py-24 px-6 md:px-10 border-t border-[var(--line)]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)]">
            {[
              { icon: Users, title: "Comunidad real", desc: "Profesionales como tú que buscan vivir su fe sin compartimentos." },
              { icon: BookOpen, title: "Estudios aplicados", desc: "Temas prácticos: liderazgo, ética laboral, finanzas, relaciones." },
              { icon: Briefcase, title: "Networking con propósito", desc: "Conexiones que van más allá de lo laboral." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[var(--bg)] p-8 md:p-10"
              >
                <item.icon size={24} strokeWidth={1.5} className="text-[var(--accent-warm)] mb-4" />
                <h3 className="font-display text-2xl text-[var(--fg)] mb-3">{item.title}</h3>
                <p className="text-[var(--fg-50)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="bg-[var(--bg)] py-24 px-6 md:px-10 border-t border-[var(--line)]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
              Agenda
            </span>
            <div className="flex-1 h-px bg-[var(--line)]" />
          </div>

          <div className="space-y-4">
            {eventos.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group p-6 md:p-8 rounded-xl border transition-all ${
                  event.featured
                    ? "bg-[var(--accent-warm-10)] border-[var(--accent-warm-30)]"
                    : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--line-strong)]"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-2xl text-[var(--fg)] mb-2 group-hover:italic transition-all">
                      {event.title}
                    </h3>
                    <p className="text-[var(--fg-50)] text-sm">{event.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[var(--fg-50)] text-sm shrink-0">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} strokeWidth={1.5} className="text-[var(--fg-30)]" />
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} strokeWidth={1.5} className="text-[var(--fg-30)]" />
                      {event.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} strokeWidth={1.5} className="text-[var(--fg-30)]" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-24 px-6 md:px-10 border-t border-[var(--line)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,4.5rem)] mb-6"
          >
            Tu carrera necesita
            <em className="italic font-light text-[var(--fg-70)]"> fundamento.</em>
          </motion.h2>

          <p className="text-[var(--fg-60)] text-lg mb-10">
            Agenda un estudio bíblico con un líder que entiende tu mundo profesional.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/estudios"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent-warm)] text-white text-sm font-medium hover:opacity-90 transition-all"
            >
              Agendar estudio bíblico
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/51999999999?text=Hola! Quiero unirme al ministerio de Profesionales"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--line-strong)] text-[var(--fg)] text-sm font-medium hover:bg-[var(--surface-10)] transition-all"
            >
              Contactar al equipo
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
