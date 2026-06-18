"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useSession } from "@/hooks/useSession";
import { useEffect, useState } from "react";

interface Reserva {
  id: number;
  modalidad: string;
  estado: string;
  createdAt: string;
  lider: { nombre: string; titulo: string };
}

export default function MiCuentaPage() {
  const { user } = useSession();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mi-cuenta/reservas?limit=3")
      .then((r) => r.json())
      .then((data) => setReservas(data.data || []))
      .catch(() => setReservas([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl">
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="font-display text-3xl text-white">
          Hola, {user?.nombre.split(" ")[0]}
        </h1>
        <p className="text-white/50 mt-2">
          Bienvenido a tu espacio personal
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <Calendar size={24} className="text-white/40 mb-3" />
          <p className="text-3xl text-white font-display">{reservas.length}</p>
          <p className="text-white/50 text-sm">Reservas recientes</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <Clock size={24} className="text-white/40 mb-3" />
          <p className="text-3xl text-white font-display">
            {reservas.filter((r) => r.estado === "PENDIENTE").length}
          </p>
          <p className="text-white/50 text-sm">Pendientes</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <p className="text-3xl text-white font-display">
            {reservas.filter((r) => r.estado === "COMPLETADA").length}
          </p>
          <p className="text-white/50 text-sm">Completadas</p>
        </div>
      </div>

      {/* Recent reservations */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-display text-lg text-white">Últimas reservas</h2>
          <Link
            href="/mi-cuenta/reservas"
            className="text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 text-center text-white/40">Cargando...</div>
        ) : reservas.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-white/40 mb-4">No tienes reservas aún</p>
            <Link
              href="/estudios"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Reservar estudio bíblico
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {reservas.map((reserva) => (
              <li key={reserva.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white">{reserva.lider.nombre}</p>
                  <p className="text-white/40 text-sm">
                    {reserva.modalidad.toLowerCase()} · {new Date(reserva.createdAt).toLocaleDateString("es-PE")}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    reserva.estado === "PENDIENTE"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : reserva.estado === "CONFIRMADA"
                      ? "bg-blue-500/20 text-blue-400"
                      : reserva.estado === "COMPLETADA"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {reserva.estado.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
