"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Youtube, Facebook } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email.includes("@")) return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error("Ocurrió un error en el servidor. Por favor intenta más tarde.");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Ocurrió un error.");
      }

      setStatus("success");
      setMessage(data?.message || "Listo. Nos vemos pronto.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <footer className="relative bg-[var(--bg)] border-t border-[var(--line)] px-6 md:px-10 pt-32 pb-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Massive headline / signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32 border-b border-[var(--line)]">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-[var(--fg)] text-[clamp(3rem,9vw,9rem)]"
            >
              No te pierdas
              <br />
              <em className="italic font-light text-[var(--fg-70)]">
                lo que viene.
              </em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="text-[var(--fg-60)] text-lg mb-8">
              Recibe las próximas charlas bíblicas, eventos y mensajes
              dominicales directo en tu correo. Sin spam.
            </p>

            {!submitted ? (
              <div className="flex items-center border-b border-white/30 focus-within:border-white transition-colors">
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 bg-transparent text-white text-lg py-4 outline-none placeholder:text-white/30"
                />
                <button
                  onClick={handleSubmit}
                  className="p-4 text-white hover:translate-x-1 transition-transform"
                  aria-label="Suscribirse"
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display text-2xl text-white"
              >
                Listo. Nos vemos pronto.
              </motion.p>
            )}

            <p className="text-[var(--fg-40)] text-xs mt-4 font-mono tracking-wider uppercase">
              Promesa: máximo un correo por semana
            </p>
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 py-20">
          {/* Logo */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--line-strong)] bg-[var(--surface-5)]">
                <div className="flex items-end gap-[2px] h-4 text-white">
                  {[0.4, 0.7, 1, 0.7, 0.4].map((h, i) => (
                    <span
                      key={i}
                      className="sound-bar"
                      style={{
                        height: `${h * 100}%`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span                   className="font-display text-[15px] tracking-tight text-[var(--fg)]">
                  Iglesia Cristiana
                </span>
                <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--fg-50)] uppercase">
                  Internacional · Lima
                </span>
              </div>
            </div>
            <p className="text-[var(--fg-50)] text-sm leading-relaxed max-w-xs">
              Una familia. Muchas sedes. Encuentra tu lugar, conecta con Dios,
              vive en comunidad.
            </p>
          </div>

          <FooterColumn
            title="Explora"
            links={[
              { label: "Sedes", href: "#sedes" },
              { label: "Ministerios", href: "#ministerios" },
              { label: "Estudios", href: "/estudios" },
              { label: "Eventos", href: "/eventos" },
              { label: "Mercy", href: "/mercy" },
            ]}
          />

          <FooterColumn
            title="Conoce"
            links={[
              { label: "Nosotros", href: "#about" },
              { label: "Líderes", href: "#" },
              { label: "Visión", href: "#" },
              { label: "FAQ", href: "#" },
            ]}
          />

          <FooterColumn
            title="Contacto"
            links={[
              { label: "WhatsApp", href: "#" },
              { label: "Email", href: "mailto:hola@iglesiacristianalima.pe" },
              { label: "Pedir oración", href: "#" },
              { label: "Visítanos", href: "#sedes" },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-[var(--line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--fg-40)] uppercase">
              © 2026 Iglesia Cristiana Internacional Lima
            </span>
          </div>

          <div className="flex items-center gap-5 text-[var(--fg-50)]">
            <a
              href="#"
              className="hover:text-[var(--fg)] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="hover:text-[var(--fg)] transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="hover:text-[var(--fg)] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} strokeWidth={1.5} />
            </a>
          </div>

          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--fg-40)]">
            <a href="#" className="hover:text-[var(--fg)] transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-[var(--fg)] transition-colors">
              Términos
            </a>
          </div>
        </div>

        {/* Massive watermark */}
        <div className="mt-20 -mx-6 md:-mx-10 overflow-hidden">
          <p className="font-display text-[clamp(4rem,18vw,18rem)] leading-[0.85] text-[var(--fg-10)] whitespace-nowrap text-center select-none">
            <em className="italic font-light">Lima · Perú · 2026</em>
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
      <h4 className="font-mono text-[10px] tracking-[0.32em] text-[var(--fg-40)] uppercase mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[var(--fg-80)] text-sm hover:text-[var(--fg)] transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
