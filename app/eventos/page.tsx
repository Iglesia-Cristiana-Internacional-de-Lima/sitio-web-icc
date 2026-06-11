'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
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
    <main className="bg-[#0d0d0d] text-white relative">
      <Navbar />
      <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado directo al contenido */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Eventos
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl leading-relaxed">
            Servicios, devocionales universitarios, charlas bíblicas y actividades
            especiales. Encuentra tu próximo momento con la comunidad.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filtro === cat
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-[#191919] text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600'
              }`}
            >
              {cat === 'Todos' ? 'Todos los eventos' : cat}
            </button>
          ))}
        </div>

        {/* Estados: cargando / error / vacío / grid */}
        {cargando ? (
          <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
            <Loader2 size={20} className="animate-spin" />
            <span>Cargando eventos...</span>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 rounded-lg bg-[#191919] text-gray-300 border border-gray-700 hover:bg-white hover:text-black hover:border-white transition-all"
            >
              Reintentar
            </button>
          </div>
        ) : eventosFiltrados.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">
              No hay eventos programados en esta categoría por ahora.
            </p>
            <p className="text-gray-600 text-sm mt-2">
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
                  className="group bg-[#191919] border border-gray-800 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-gray-700"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase mb-4 bg-gray-800 text-gray-400">
                      {categoria}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {evento.titulo}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {evento.descripcion}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-800 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-500 shrink-0" />
                      <span>{formatearFecha(evento.fecha)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-500 shrink-0" />
                      <span>{formatearHora(evento.fecha)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-500 shrink-0" />
                      <span className="truncate">{evento.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-500 shrink-0" />
                      <span className="truncate">{evento.responsable}</span>
                    </div>
                  </div>

                  <Link
                    href={`/eventos/${evento.id}`}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-700 text-sm text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
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
      </div>
      <Footer />
    </main>
  );
}
