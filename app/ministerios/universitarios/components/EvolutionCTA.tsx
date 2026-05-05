"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";

export default function EvolutionCTA() {
  return (
    <section className="relative bg-[#093b18] py-32 md:py-40 px-6 md:px-10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#e2a633]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] tracking-[0.32em] text-[#e2a633]/50 uppercase"
          >
            Tu próximo paso
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-[clamp(3rem,8vw,7rem)] text-[#e2a633] leading-[0.9] mt-6"
          >
            Empieza
            <br />
            <em className="italic font-light text-[#f5f3ee]">hoy.</em>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[#f5f3ee]/60 text-lg leading-relaxed mt-8 max-w-xl mx-auto"
          >
            No necesitas tener todo claro. Solo necesitas dar el primer paso.
            Te esperamos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/estudios"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#e2a633] text-[#093b18] text-sm font-medium hover:bg-[#e2a633]/90 transition-all"
            >
              <BookOpen size={18} strokeWidth={1.5} />
              Estudio bíblico personalizado
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="#eventos"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#e2a633]/50 text-[#e2a633] text-sm font-medium hover:bg-[#e2a633]/10 hover:border-[#e2a633] transition-all"
            >
              <Calendar size={18} strokeWidth={1.5} />
              Visitar un devocional
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
