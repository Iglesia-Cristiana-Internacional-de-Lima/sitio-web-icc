'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Marquee from '@/components/Marquee';
import Footer from '@/components/Footer';

type Categoria =
  | 'Todos'
  | 'Servicios dominicales'
  | 'Reuniones ministeriales'
  | 'Devocionales universitarios'
  | 'Charlas bíblicas'
  | 'Actividades especiales';

interface EventoAPI {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  responsable: string;
  tipo: string;
  latitud?: number | null;
  longitud?: number | null;
}

const CATEGORIAS: Categoria[] = [
  'Todos',
  'Servicios dominicales',
  'Reuniones ministeriales',
  'Devocionales universitarios',
  'Charlas bíblicas',
  'Actividades especiales',
];

const TIPO_A_CATEGORIA: Record<string, Categoria> = {
  Dominical: 'Servicios dominicales',
  Ministerial: 'Reuniones ministeriales',
  Universitario: 'Devocionales universitarios',
  Charla: 'Charlas bíblicas',
  Especial: 'Actividades especiales',
};

function formatearFecha(iso: string) {
  const d = new Date(iso);
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return d.toLocaleDateString('es-PE', opciones);
}

function formatearHora(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function EventosPage() {
  const [eventos, setEventos] = useState<EventoAPI[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Categoria>('Todos');

  useEffect(() => {
    fetch('/api/events?publicado=true')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setEventos(json.data);
        } else {
          setError('Error al cargar los eventos');
        }
      })
      .catch(() => setError('Error de conexión al servidor'))
      .finally(() => setCargando(false));
  }, []);

  const eventosFiltrados =
    filtro === 'Todos'
      ? eventos
      : eventos.filter((e) => TIPO_A_CATEGORIA[e.tipo] === filtro);

  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] relative">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 z-0" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="flex flex-col items-center gap-6">
            <span className="font-mono text-[10px] tracking-[0.32em] text-white/50 uppercase rotate-180 [writing-mode:vertical-rl]">Lima · Perú · 2026</span>
            <div className="w-px h-24 bg-white/20" />
          </div>
        </div>
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6">
          <div className="w-px h-24 bg-white/20" />
          <span className="font-mono text-[10px] tracking-[0.32em] text-white/50 uppercase [writing-mode:vertical-rl]">Una familia · Muchas sedes</span>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="display-heading text-white text-[clamp(3.5rem,9vw,9rem)] max-w-[1200px]"
          >
            La fe se vive<br />
            <em className="italic font-light text-white/90">en comunidad.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-8 max-w-xl text-white/70 text-base md:text-lg leading-relaxed"
          >
            Somos una familia de iglesias en Lima. Sin libreto, sin filtros.
            Solo personas reales buscando algo real.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/#sedes" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all">
              Encuentra tu sede
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/estudios" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm">
              Estudios bíblicos
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-10 pb-8"
        >
          <div className="max-w-[1600px] mx-auto flex items-end justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 text-white/50"
            >
              <span className="font-mono text-[10px] tracking-[0.32em] uppercase">Descubre</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/50">
                <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* Eventos content */}
      <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">02 — Eventos</span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filtro === cat
                  ? 'bg-[var(--inverse-bg)] text-[var(--inverse-fg)] font-semibold shadow-md'
                  : 'bg-[var(--surface)] text-[var(--fg-60)] hover:text-[var(--fg)] border border-[var(--line)] hover:border-[var(--fg-40)]'
              }`}
            >
              {cat === 'Todos' ? 'Todos los eventos' : cat}
            </button>
          ))}
        </div>

        {/* Estados: cargando / error / vacío / grid */}
        {cargando ? (
          <div className="flex items-center justify-center py-24 gap-3 text-[var(--fg-60)]">
            <Loader2 size={20} className="animate-spin" />
            <span>Cargando eventos...</span>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 rounded-lg bg-[var(--surface)] text-[var(--fg-70)] border border-[var(--line-strong)] hover:bg-[var(--inverse-bg)] hover:text-[var(--inverse-fg)] hover:border-[var(--inverse-bg)] transition-all"
            >
              Reintentar
            </button>
          </div>
        ) : eventosFiltrados.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[var(--fg-40)] text-lg">
              No hay eventos programados en esta categoría por ahora.
            </p>
            <p className="text-[var(--fg-30)] text-sm mt-2">
              Vuelve pronto o suscríbete para recibir notificaciones.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventosFiltrados.map((evento) => {
              const categoria = TIPO_A_CATEGORIA[evento.tipo] || evento.tipo;
              return (
                <div
                  key={evento.id}
                  className="group bg-[var(--surface)] border border-[var(--line)] rounded-xl p-6 min-w-0 flex flex-col justify-between transition-all duration-300 hover:border-[var(--line-strong)]"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase mb-4 bg-[var(--surface-10)] text-[var(--fg-60)]">
                      {categoria}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-[var(--fg-90)] transition-colors">
                      {evento.titulo}
                    </h3>
                    <p className="text-[var(--fg-60)] text-sm leading-relaxed mb-6 line-clamp-3">
                      {evento.descripcion}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[var(--line)] text-sm text-[var(--fg-60)]">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[var(--fg-40)] shrink-0" />
                      <span>{formatearFecha(evento.fecha)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[var(--fg-40)] shrink-0" />
                      <span>{formatearHora(evento.fecha)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[var(--fg-40)] shrink-0" />
                      <span className="truncate">{evento.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-[var(--fg-40)] shrink-0" />
                      <span className="truncate">{evento.responsable}</span>
                    </div>
                  </div>

                  <Link
                    href={`/eventos/${evento.id}`}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--line-strong)] text-sm text-[var(--fg-70)] hover:bg-[var(--inverse-bg)] hover:text-[var(--inverse-fg)] hover:border-[var(--inverse-bg)] transition-all duration-300"
                  >
                    Ver detalles
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </section>
      <Footer />
    </main>
  );
}
