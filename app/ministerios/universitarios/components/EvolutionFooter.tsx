"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EvolutionIcon from "./EvolutionIcon";

export default function EvolutionFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) setSubmitted(true);
  };

  return (
    <footer className="relative bg-[#072a12] border-t border-[#e2a633]/10 px-6 md:px-10 pt-32 pb-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Massive headline / signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32 border-b border-[#e2a633]/10">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-display text-[clamp(3rem,9vw,8rem)] text-[#e2a633]"
            >
              No te quedes
              <br />
              <em className="italic font-light text-[#f5f3ee]/80">afuera.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="text-[#f5f3ee]/60 text-lg mb-8">
              Recibe info de devocionales, retiros y eventos directamente en tu
              correo. Nada de spam.
            </p>

            {!submitted ? (
              <div className="flex items-center border-b border-[#e2a633]/30 focus-within:border-[#e2a633] transition-colors">
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 bg-transparent text-[#f5f3ee] text-lg py-4 outline-none placeholder:text-[#f5f3ee]/30"
                />
                <button
                  onClick={handleSubmit}
                  className="p-4 text-[#e2a633] hover:translate-x-1 transition-transform"
                  aria-label="Suscribirse"
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display text-2xl text-[#e2a633]"
              >
                Listo. Nos vemos en el campus.
              </motion.p>
            )}

            <p className="text-[#f5f3ee]/40 text-xs mt-4 font-mono tracking-wider uppercase">
              Promesa: máximo un correo por semana
            </p>
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 py-20">
          {/* Logo */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <EvolutionIcon size={36} />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-[15px] tracking-tight text-[#e2a633]">
                  Evolution
                </span>
                <span className="font-mono text-[10px] tracking-[0.28em] text-[#e2a633]/60 uppercase">
                  Lima
                </span>
              </div>
            </div>
            <p className="text-[#f5f3ee]/50 text-sm leading-relaxed max-w-xs">
              Comunidad universitaria de la Iglesia Cristiana Internacional de
              Lima. Fe en el campus, amistades reales.
            </p>
          </div>

          <FooterColumn
            title="Campus"
            links={[
              { label: "PUCP", href: "#pucp" },
              { label: "San Marcos", href: "#sanmarcos" },
            ]}
          />

          <FooterColumn
            title="Recursos"
            links={[
              { label: "Eventos", href: "#eventos" },
              { label: "Estudios", href: "/estudios" },
              { label: "Galería", href: "#galeria" },
            ]}
          />

          <FooterColumn
            title="Conexión"
            links={[
              { label: "WhatsApp PUCP", href: "#" },
              { label: "WhatsApp San Marcos", href: "#" },
              { label: "Iglesia principal", href: "/" },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-[#e2a633]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] tracking-[0.28em] text-[#f5f3ee]/40 uppercase">
              © 2026 Evolution Lima
            </span>
            <Link
              href="/"
              className="font-mono text-[10px] tracking-[0.28em] text-[#e2a633]/60 uppercase hover:text-[#e2a633] transition-colors"
            >
              ← Volver a Iglesia Cristiana Internacional de Lima
            </Link>
          </div>

          <div className="flex items-center gap-5 text-[#f5f3ee]/50">
            <a
              href="https://instagram.com/evolutionlima"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e2a633] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="hover:text-[#e2a633] transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Massive watermark */}
        <div className="mt-20 -mx-6 md:-mx-10 overflow-hidden">
          <p className="font-display text-[clamp(4rem,18vw,16rem)] leading-[0.85] text-[#e2a633]/[0.04] whitespace-nowrap text-center select-none">
            <em className="italic font-light">Evolution · Lima · 2026</em>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="md:col-span-2">
      <h4 className="font-mono text-[10px] tracking-[0.32em] text-[#e2a633]/40 uppercase mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[#f5f3ee]/80 text-sm hover:text-[#e2a633] transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
