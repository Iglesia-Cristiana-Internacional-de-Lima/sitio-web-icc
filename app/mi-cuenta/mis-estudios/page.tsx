"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Monitor, Check, X, Clock, MessageCircle } from "lucide-react";

interface Reserva {
  id: number;
  modalidad: string;
  estado: string;
  mensaje: string | null;
  createdAt: string;
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

export default function MisEstudiosPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>("");
  const [stats, setStats] = useState({ pendientes: 0, confirmadas: 0, completadas: 0 });

  const fetchReservas = async () => {
    const url = filtroEstado
      ? `/api/lider/estudios?estado=${filtroEstado}`
      : "/api/lider/estudios";
    const res = await fetch(url);
    const data = await res.json();
    const list = data.data || [];
    setReservas(list);
    setStats({
      pendientes: list.filter((r: Reserva) => r.estado === "PENDIENTE").length,
      confirmadas: list.filter((r: Reserva) => r.estado === "CONFIRMADA").length,
      completadas: list.filter((r: Reserva) => r.estado === "COMPLETADA").length,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchReservas();
  }, [filtroEstado]);

  const updateEstado = async (id: number, estado: string) => {
    await fetch(`/api/lider/estudios/${id}`, {
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

  const getWhatsAppLink = (contacto: string, nombre: string) => {
    const phone = contacto.replace(/\D/g, "");
    if (phone.length < 9) return null;
    const msg = encodeURIComponent(`Hola ${nombre}, soy tu líder de estudio bíblico de ICI Lima.`);
    return `https://wa.me/${phone.startsWith("51") ? phone : "51" + phone}?text=${msg}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white">Mis estudios</h1>
          <p className="text-white/50 mt-1">Reservas asignadas a ti como líder</p>
        </div>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none"
        >
          <option value="" className="bg-[#191919]">Todos</option>
          {estados.map((e) => (
            <option key={e} value={e} className="bg-[#191919]">{e}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      {!filtroEstado && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
            <p className="text-2xl text-yellow-400 font-display">{stats.pendientes}</p>
            <p className="text-yellow-400/60 text-xs">Pendientes</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
            <p className="text-2xl text-blue-400 font-display">{stats.confirmadas}</p>
            <p className="text-blue-400/60 text-xs">Confirmadas</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
            <p className="text-2xl text-green-400 font-display">{stats.completadas}</p>
            <p className="text-green-400/60 text-xs">Completadas</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      ) : reservas.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Calendar size={48} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No tienes estudios asignados</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservas.map((reserva) => {
            const solicitante = getSolicitante(reserva);
            const whatsappLink = getWhatsAppLink(solicitante.contacto, solicitante.nombre);

            return (
              <div
                key={reserva.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl text-white">
                      {solicitante.nombre}
                    </h3>
                    <p className="text-white/50 text-sm">{solicitante.contacto}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      estadoColors[reserva.estado] || "bg-white/10 text-white/50"
                    }`}
                  >
                    {reserva.estado.toLowerCase()}
                  </span>
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
                    })}
                  </span>
                </div>

                {reserva.mensaje && (
                  <p className="text-white/40 text-sm mb-4 border-l-2 border-white/10 pl-4">
                    "{reserva.mensaje}"
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex gap-2">
                    {whatsappLink && (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-green-600/20 text-green-400 text-xs hover:bg-green-600/30 transition-colors"
                      >
                        <MessageCircle size={12} /> WhatsApp
                      </a>
                    )}
                  </div>

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
                        <Check size={12} /> Completar
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
