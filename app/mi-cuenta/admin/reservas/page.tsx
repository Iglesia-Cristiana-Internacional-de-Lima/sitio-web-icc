"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Monitor, Check, X, Clock } from "lucide-react";

interface Reserva {
  id: number;
  modalidad: string;
  estado: string;
  mensaje: string | null;
  createdAt: string;
  lider: { id: number; nombre: string; titulo: string };
  solicitante: { id: number; nombre: string; email: string } | null;
  nombreLegacy: string | null;
  contactoLegacy: string | null;
}

const estados = ["PENDIENTE", "CONFIRMADA", "COMPLETADA", "CANCELADA"];

const estadoColors: Record<string, string> = {
  PENDIENTE: "bg-yellow-500/20 text-yellow-400",
  CONFIRMADA: "bg-blue-500/20 text-blue-400",
  COMPLETADA: "bg-green-500/20 text-green-400",
  CANCELADA: "bg-red-500/20 text-red-400",
};

export default function AdminReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>("");

  const fetchReservas = async () => {
    const url = filtroEstado
      ? `/api/admin/reservas?estado=${filtroEstado}`
      : "/api/admin/reservas";
    const res = await fetch(url);
    const data = res.ok ? await res.json() : { data: [] };
    setReservas(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservas();
  }, [filtroEstado]);

  const updateEstado = async (id: number, estado: string) => {
    await fetch(`/api/admin/reservas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    fetchReservas();
  };

  const getSolicitante = (reserva: Reserva) => {
    if (reserva.solicitante) {
      return { nombre: reserva.solicitante.nombre, contacto: reserva.solicitante.email };
    }
    return { nombre: reserva.nombreLegacy || "—", contacto: reserva.contactoLegacy || "—" };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white">Todas las reservas</h1>
          <p className="text-white/50 mt-1">Gestiona las reservas de estudios bíblicos</p>
        </div>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none"
        >
          <option value="" className="bg-[#191919]">Todos los estados</option>
          {estados.map((e) => (
            <option key={e} value={e} className="bg-[#191919]">{e}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      ) : reservas.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Calendar size={48} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No hay reservas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservas.map((reserva) => {
            const solicitante = getSolicitante(reserva);
            return (
              <div
                key={reserva.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/40 text-xs mb-1">Solicitante</p>
                    <h3 className="font-display text-lg text-white">
                      {solicitante.nombre}
                    </h3>
                    <p className="text-white/50 text-sm">{solicitante.contacto}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-xs mb-1">Líder asignado</p>
                    <p className="text-white">{reserva.lider.nombre}</p>
                    <p className="text-white/50 text-sm">{reserva.lider.titulo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-white/50 text-sm mb-4">
                  <span className="inline-flex items-center gap-2">
                    {reserva.modalidad === "PRESENCIAL" ? (
                      <MapPin size={14} />
                    ) : (
                      <Monitor size={14} />
                    )}
                    {reserva.modalidad.toLowerCase()}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={14} />
                    {new Date(reserva.createdAt).toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {reserva.mensaje && (
                  <p className="text-white/40 text-sm mb-4 border-l-2 border-white/10 pl-4">
                    "{reserva.mensaje}"
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      estadoColors[reserva.estado] || "bg-white/10 text-white/50"
                    }`}
                  >
                    {reserva.estado.toLowerCase()}
                  </span>

                  <div className="flex gap-2">
                    {reserva.estado === "PENDIENTE" && (
                      <>
                        <button
                          onClick={() => updateEstado(reserva.id, "CONFIRMADA")}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/30 transition-colors"
                        >
                          <Check size={12} /> Confirmar
                        </button>
                        <button
                          onClick={() => updateEstado(reserva.id, "CANCELADA")}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-colors"
                        >
                          <X size={12} /> Cancelar
                        </button>
                      </>
                    )}
                    {reserva.estado === "CONFIRMADA" && (
                      <button
                        onClick={() => updateEstado(reserva.id, "COMPLETADA")}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-green-500/20 text-green-400 text-xs hover:bg-green-500/30 transition-colors"
                      >
                        <Check size={12} /> Marcar completada
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
