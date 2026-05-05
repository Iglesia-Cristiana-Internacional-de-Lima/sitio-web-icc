"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";

const quickReplies = [
  "¿Dónde está mi sede más cercana?",
  "¿Qué horarios tienen?",
  "Quiero un estudio bíblico",
  "Hablar con un líder",
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* WhatsApp floating */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white text-black shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
        aria-label="Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-black" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                <div className="flex items-end gap-[2px] h-4 text-white">
                  {[0.5, 0.8, 1, 0.8, 0.5].map((h, i) => (
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
              <div>
                <p className="font-display text-base text-white">
                  Hola, somos la familia
                </p>
                <p className="font-mono text-[10px] tracking-[0.28em] text-white/50 uppercase">
                  Respuesta en minutos
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3 max-h-80 overflow-y-auto">
              <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                <p className="text-white/80 text-sm leading-relaxed">
                  Cuéntanos qué necesitas. Sin formularios, sin filtros.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    className="w-full text-left px-4 py-3 rounded-full border border-white/10 text-white/80 text-sm hover:bg-white hover:text-black hover:border-white transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-transparent px-3 py-2 text-white text-sm outline-none placeholder:text-white/30"
              />
              <button
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90"
                aria-label="Enviar"
              >
                <Send size={14} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
