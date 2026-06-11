'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  User,
  ArrowLeft,
  Loader2,
  Tag,
} from 'lucide-react';

interface EventoDetalle {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  latitud?: number | null;
  longitud?: number | null;
  responsable: string;
  tipo: string;
}

const TIPO_A_CATEGORIA: Record<string, string> = {
  Dominical: 'Servicios dominicales',
  Ministerial: 'Reuniones ministeriales',
  Universitario: 'Devocionales universitarios',
  Charla: 'Charlas bíblicas',
  Especial: 'Actividades especiales',
};

function formatearFecha(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatearHora(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function EventoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [evento, setEvento] = useState<EventoDetalle | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/events/${id}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Error al cargar el evento');
        return json;
      })
      .then((json) => {
        if (json.success) {
          setEvento(json.data);
        } else {
          setError('Error al cargar el evento');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <main className="bg-[#0d0d0d] text-white min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          <span>Cargando evento...</span>
        </div>
      </main>
    );
  }

  if (error || !evento) {
    return (
      <main className="bg-[#0d0d0d] text-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error || 'Evento no encontrado'}</p>
          <button
            onClick={() => router.push('/eventos')}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#191919] text-gray-300 border border-gray-700 hover:bg-white hover:text-black hover:border-white transition-all"
          >
            <ArrowLeft size={16} />
            Volver a eventos
          </button>
        </div>
      </main>
    );
  }

  const categoria = TIPO_A_CATEGORIA[evento.tipo] || evento.tipo;

  return (
    <main className="bg-[#0d0d0d] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Botón de regreso */}
        <button
          onClick={() => router.push('/eventos')}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Volver a eventos
        </button>

        {/* Tarjeta principal */}
        <div className="bg-[#191919] border border-gray-800 rounded-2xl p-8 md:p-10">
          {/* Tipo */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-800 text-gray-400 text-[10px] font-semibold tracking-wider uppercase mb-5">
            <Tag size={12} />
            {categoria}
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            {evento.titulo}
          </h1>

          {/* Descripción */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10">
            {evento.descripcion}
          </p>

          {/* Detalles en dos columnas responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 bg-[#0d0d0d] border border-gray-800 rounded-xl p-4">
              <Calendar size={18} className="text-gray-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Fecha
                </p>
                <p className="text-white text-sm font-medium capitalize">
                  {formatearFecha(evento.fecha)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0d0d0d] border border-gray-800 rounded-xl p-4">
              <Clock size={18} className="text-gray-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Hora
                </p>
                <p className="text-white text-sm font-medium">
                  {formatearHora(evento.fecha)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0d0d0d] border border-gray-800 rounded-xl p-4">
              <MapPin size={18} className="text-gray-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Ubicación
                </p>
                <p className="text-white text-sm font-medium">
                  {evento.ubicacion}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0d0d0d] border border-gray-800 rounded-xl p-4">
              <User size={18} className="text-gray-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Organiza
                </p>
                <p className="text-white text-sm font-medium">
                  {evento.responsable}
                </p>
              </div>
            </div>
          </div>

          {/* Mapa */}
          {evento.latitud && evento.longitud ? (
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl overflow-hidden">
              <iframe
                title={`Ubicación de ${evento.titulo}`}
                src={`https://maps.google.com/maps?q=${evento.latitud},${evento.longitud}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full aspect-video"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                  <Globe size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Evento sin ubicación física</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Este evento es virtual o no requiere desplazamiento.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
