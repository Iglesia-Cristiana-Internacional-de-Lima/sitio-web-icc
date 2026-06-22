"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell, Mail, Check } from "lucide-react";
import { useState } from "react";

export default function EventosSuscripcion() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const eventTypes = [
    { id: "charlas", label: "Charlas Bíblicas", desc: "Notificación cuando se agende una nueva charla" },
    { id: "servicios", label: "Servicios Especiales", desc: "Bautismos, eventos de toda la iglesia" },
    { id: "retiros", label: "Retiros", desc: "Próximos retiros y eventos de fin de semana" },
    { id: "universitarios", label: "Evolution Lima", desc: "Eventos del ministerio universitario" },
  ];

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (email.includes("@") && selectedTypes.length > 0) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative bg-[#0d0d0d] py-32 md:py-40 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="font-mono text-[11px] tracking-[0.32em] text-white/50 uppercase">
                Suscripciones
              </span>

              <h2 className="display-heading text-white text-[clamp(2.5rem,6vw,5.5rem)] mt-6">
                No te pierdas
                <br />
                <em className="italic font-light text-white/70">nada.</em>
              </h2>

              <p className="text-white/60 text-lg leading-relaxed mt-6">
                Suscríbete para recibir notificaciones cuando se programen
                nuevos eventos. Solo los que te interesan, nada de spam.
              </p>

              <div className="flex items-center gap-4 mt-8 text-white/40">
                <div className="flex items-center gap-2">
                  <Bell size={16} strokeWidth={1.5} />
                  <span className="text-sm">Notificación inmediata</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} strokeWidth={1.5} />
                  <span className="text-sm">Máx. 1 correo/semana</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-[#191919] border border-white/10 rounded-2xl p-8 md:p-10"
              >
                {/* Event type selection */}
                <div className="mb-8">
                  <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-4">
                    Qué eventos te interesan?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {eventTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => toggleType(type.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          selectedTypes.includes(type.id)
                            ? "bg-white/5 border-white/30"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              selectedTypes.includes(type.id)
                                ? "bg-white border-white"
                                : "border-white/30"
                            }`}
                          >
                            {selectedTypes.includes(type.id) && (
                              <Check size={12} strokeWidth={2} className="text-black" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">
                              {type.label}
                            </p>
                            <p className="text-white/40 text-xs mt-1">
                              {type.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email input */}
                <div className="mb-6">
                  <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-3">
                    Tu correo
                  </label>
                  <div className="flex items-center border-b border-white/20 focus-within:border-white/50 transition-colors">
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="flex-1 bg-transparent text-white text-lg py-3 outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!email.includes("@") || selectedTypes.length === 0}
                  className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suscribirme
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <p className="text-white/40 text-xs text-center mt-4">
                  Puedes cancelar en cualquier momento desde tu correo.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#191919] border border-white/10 rounded-2xl p-10 md:p-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <Check size={32} strokeWidth={1.5} className="text-white" />
                </div>
                <h3 className="font-display text-3xl text-white mb-4">
                  Listo!
                </h3>
                <p className="text-white/60 text-lg">
                  Te avisaremos cuando haya nuevos eventos de tu interés.
                </p>
                <p className="text-white/40 text-sm mt-4">
                  Revisa tu correo para confirmar la suscripción.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
