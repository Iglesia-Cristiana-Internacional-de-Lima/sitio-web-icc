"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Users } from "lucide-react";

export default function MercyCTA() {
  return (
    <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--fg-10)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)]"
          >
            Únete.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[var(--fg-60)] text-xl leading-relaxed mt-8 max-w-xl mx-auto"
          >
            No necesitas ser perfecto, solo necesitas querer hacer algo por
            alguien más. Eso es Mercy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#actividades"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
            >
              <Users size={18} strokeWidth={1.5} />
              Ver actividades
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
              <a
                href="https://wa.me/51999999999?text=Hola! Quiero ser voluntario en Mercy"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--line-strong)] text-[var(--fg)] text-sm font-medium hover:bg-[var(--surface-10)] hover:border-[var(--fg-40)] transition-all"
            >
              <Heart size={18} strokeWidth={1.5} />
              Contactar al equipo
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-[var(--fg-40)] text-sm mt-8"
          >
            Mercy Lima es parte de Mercy Worldwide, el ministerio de servicio
            de las Iglesias Cristianas Internacionales.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
