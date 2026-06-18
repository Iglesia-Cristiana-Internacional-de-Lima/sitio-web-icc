"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Monitor, ArrowRight } from "lucide-react";

interface Reserva {
  id: number;
  modalidad: string;
  estado: string;
  mensaje: string | null;
  createdAt: string;
  lider: { id: number; nombre: string; titulo: string };
}

const estadoColors: Record<string, string> = {
  PENDIENTE: "bg-yellow-500/20 text-yellow-400",
  CONFIRMADA: "bg-blue-500/20 text-blue-400",
  COMPLETADA: "bg-green-500/20 text-green-400",
  CANCELADA: "bg-red-500/20 text-red-400",
};

export default function MisReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mi-cuenta/reservas")
      .then((r) => r.json())
      .then((data) => setReservas(data.data || []))
      .catch(() => setReservas([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white">Mis reservas</h1>
        <p className="text-white/50 mt-2">
          Historial de tus estudios bíblicos
        </p>
      </div>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      ) : reservas.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Calendar size={48} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/50 mb-6">No tienes reservas aún</p>
          <Link
            href="/estudios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Reservar estudio bíblico
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reservas.map((reserva) => (
            <div
              key={reserva.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl text-white">
                    {reserva.lider.nombre}
                  </h3>
                  <p className="text-white/40 text-sm">{reserva.lider.titulo}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    estadoColors[reserva.estado] || "bg-white/10 text-white/50"
                  }`}
                >
                  {reserva.estado.toLowerCase()}
                </span>
              </div>

              <div className="flex items-center gap-6 text-white/50 text-sm">
                <span className="inline-flex items-center gap-2">
                  {reserva.modalidad === "PRESENCIAL" ? (
                    <MapPin size={14} />
                  ) : (
                    <Monitor size={14} />
                  )}
                  {reserva.modalidad.toLowerCase()}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(reserva.createdAt).toLocaleDateString("es-PE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {reserva.mensaje && (
                <p className="mt-4 text-white/40 text-sm border-t border-white/5 pt-4">
                  "{reserva.mensaje}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
