"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Calendar, Star } from "lucide-react";

interface Sede {
  id: number;
  nombre: string;
}

interface Evento {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  horaInicio: string | null;
  horaFin: string | null;
  sedeId: number | null;
  sede: Sede | null;
  destacado: boolean;
  activo: boolean;
}

export default function AdminEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Evento | null>(null);
  const [form, setForm] = useState({ titulo: "", descripcion: "", fecha: "", horaInicio: "", horaFin: "", sedeId: "", destacado: false, activo: true });

  const fetchEventos = () => {
    fetch("/api/admin/eventos")
      .then((r) => r.ok ? r.json() : { data: [] })
      .then((d) => setEventos(d.data || []))
      .finally(() => setLoading(false));
  };

  const fetchSedes = () => {
    fetch("/api/admin/sedes")
      .then((r) => r.ok ? r.json() : { data: [] })
      .then((d) => setSedes(d.data || []));
  };

  useEffect(() => { fetchEventos(); fetchSedes(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ titulo: "", descripcion: "", fecha: "", horaInicio: "", horaFin: "", sedeId: "", destacado: false, activo: true });
    setShowModal(true);
  };

  const openEdit = (e: Evento) => {
    setEditing(e);
    setForm({
      titulo: e.titulo,
      descripcion: e.descripcion || "",
      fecha: e.fecha.split("T")[0],
      horaInicio: e.horaInicio || "",
      horaFin: e.horaFin || "",
      sedeId: e.sedeId?.toString() || "",
      destacado: e.destacado,
      activo: e.activo,
    });
    setShowModal(true);
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const url = editing ? `/api/admin/eventos/${editing.id}` : "/api/admin/eventos";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowModal(false);
    fetchEventos();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Eliminar este evento?")) return;
    await fetch(`/api/admin/eventos/${id}`, { method: "DELETE" });
    fetchEventos();
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white">Eventos</h1>
          <p className="text-white/50 mt-1">Gestionar eventos de la iglesia</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90">
          <Plus size={16} /> Nuevo evento
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-[#191919] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Evento</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Fecha</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Hora</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Sede</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((e) => (
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-white/40" />
                      <div>
                        <span className="text-white font-medium flex items-center gap-2">
                          {e.titulo}
                          {e.destacado && <Star size={12} className="text-yellow-400 fill-yellow-400" />}
                        </span>
                        {e.descripcion && <p className="text-white/40 text-sm truncate max-w-xs">{e.descripcion}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">{formatDate(e.fecha)}</td>
                  <td className="px-6 py-4 text-white/60 text-sm">{e.horaInicio || "-"}{e.horaFin ? ` - ${e.horaFin}` : ""}</td>
                  <td className="px-6 py-4 text-white/60 text-sm">{e.sede?.nombre || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${e.activo ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                      {e.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(e)} className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(e.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#191919] border border-white/10 rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-white/10">
              <h2 className="font-display text-xl text-white">{editing ? "Editar evento" : "Nuevo evento"}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Título</label>
                <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Fecha</label>
                <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Hora inicio</label>
                  <input type="time" value={form.horaInicio} onChange={(e) => setForm({ ...form, horaInicio: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Hora fin</label>
                  <input type="time" value={form.horaFin} onChange={(e) => setForm({ ...form, horaFin: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Sede</label>
                <select value={form.sedeId} onChange={(e) => setForm({ ...form, sedeId: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                  <option value="">Sin sede específica</option>
                  {sedes.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-white/60 text-sm">
                  <input type="checkbox" checked={form.destacado} onChange={(e) => setForm({ ...form, destacado: e.target.checked })} className="rounded" />
                  Destacado
                </label>
                <label className="flex items-center gap-2 text-white/60 text-sm">
                  <input type="checkbox" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="rounded" />
                  Activo
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
