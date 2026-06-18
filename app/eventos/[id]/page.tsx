'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

interface SedeInfo {
  id: number;
  nombre: string;
  direccion: string;
  distrito: string | null;
  lat: number | null;
  lng: number | null;
}

interface EventoDetalle {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  horaInicio: string;
  horaFin: string | null;
  sede: SedeInfo | null;
  imagen: string | null;
  destacado: boolean;
  activo: boolean;
}

function formatearFecha(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatearHora(hora: string) {
  const [h, m] = hora.split(':');
  const horas = parseInt(h, 10);
  const ampm = horas >= 12 ? 'p. m.' : 'a. m.';
  const h12 = horas % 12 || 12;
  return `${h12}:${m} ${ampm}`;
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
      <main className="bg-[var(--bg)] text-[var(--fg)] min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--fg-60)]">
          <Loader2 size={20} className="animate-spin" />
          <span>Cargando evento...</span>
        </div>
      </main>
    );
  }

  if (error || !evento) {
    return (
      <main className="bg-[var(--bg)] text-[var(--fg)] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error || 'Evento no encontrado'}</p>
          <button
            onClick={() => router.push('/eventos')}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] text-gray-300 border border-[var(--line-strong)] hover:bg-[var(--inverse-bg)] hover:text-[var(--inverse-fg)] hover:border-[var(--inverse-bg)] transition-all"
          >
            <ArrowLeft size={16} />
            Volver a eventos
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] pt-24 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Botón de regreso */}
        <button
          onClick={() => router.push('/eventos')}
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-60)] hover:text-[var(--fg)] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Volver a eventos
        </button>

        {/* Imagen destacada */}
        {evento.imagen && (
          <div
            className="w-full h-64 md:h-96 rounded-2xl bg-cover bg-center mb-8"
            style={{ backgroundImage: `url(${evento.imagen})` }}
          />
        )}

        {/* Tarjeta principal */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-8 md:p-10">
          {/* Título */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--fg)] mb-6">
            {evento.titulo}
          </h1>

          {/* Descripción */}
          <p className="text-[var(--fg-60)] text-base sm:text-lg leading-relaxed mb-10">
            {evento.descripcion}
          </p>

          {/* Detalles en dos columnas responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--line)] rounded-xl p-4">
              <Calendar size={18} className="text-[var(--fg-40)] shrink-0" />
              <div>
                <p className="text-[10px] text-[var(--fg-40)] uppercase tracking-wider font-semibold">
                  Fecha
                </p>
                <p className="text-[var(--fg)] text-sm font-medium capitalize">
                  {formatearFecha(evento.fecha)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--line)] rounded-xl p-4">
              <Clock size={18} className="text-[var(--fg-40)] shrink-0" />
              <div>
                <p className="text-[10px] text-[var(--fg-40)] uppercase tracking-wider font-semibold">
                  Hora
                </p>
                <p className="text-[var(--fg)] text-sm font-medium">
                  {formatearHora(evento.horaInicio)}
                  {evento.horaFin && ` — ${formatearHora(evento.horaFin)}`}
                </p>
              </div>
            </div>
            {evento.sede && (
              <div className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--line)] rounded-xl p-4">
                <MapPin size={18} className="text-[var(--fg-40)] shrink-0" />
                <div>
                  <p className="text-[10px] text-[var(--fg-40)] uppercase tracking-wider font-semibold">
                    Ubicación
                  </p>
                  <p className="text-[var(--fg)] text-sm font-medium">
                    {evento.sede.nombre}
                  </p>
                  <p className="text-[var(--fg-50)] text-xs">
                    {evento.sede.direccion}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mapa */}
          {evento.sede?.lat && evento.sede?.lng ? (
            <div className="bg-[var(--bg)] border border-[var(--line)] rounded-xl overflow-hidden">
              <iframe
                title={`Ubicación de ${evento.titulo}`}
                src={`https://maps.google.com/maps?q=${evento.sede.lat},${evento.sede.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full aspect-video"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="bg-[var(--bg)] border border-[var(--line)] rounded-xl p-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--surface-10)] flex items-center justify-center shrink-0">
                  <Globe size={18} className="text-[var(--fg-40)]" />
                </div>
                <div>
                  <p className="text-[var(--fg)] text-sm font-medium">Evento sin ubicación física</p>
                  <p className="text-[var(--fg-40)] text-xs mt-0.5">
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
