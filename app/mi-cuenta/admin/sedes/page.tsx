"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";

interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  distrito: string | null;
  horario: string | null;
  lat: number | null;
  lng: number | null;
  activo: boolean;
}

export default function AdminSedesPage() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Sede | null>(null);
  const [form, setForm] = useState({ nombre: "", direccion: "", distrito: "", horario: "", lat: "", lng: "", activo: true });

  const fetchSedes = () => {
    fetch("/api/admin/sedes")
      .then((r) => r.ok ? r.json() : { data: [] })
      .then((d) => setSedes(d.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSedes(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ nombre: "", direccion: "", distrito: "", horario: "", lat: "", lng: "", activo: true });
    setShowModal(true);
  };

  const openEdit = (s: Sede) => {
    setEditing(s);
    setForm({
      nombre: s.nombre,
      direccion: s.direccion,
      distrito: s.distrito || "",
      horario: s.horario || "",
      lat: s.lat?.toString() || "",
      lng: s.lng?.toString() || "",
      activo: s.activo,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/admin/sedes/${editing.id}` : "/api/admin/sedes";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowModal(false);
    fetchSedes();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Eliminar esta sede?")) return;
    await fetch(`/api/admin/sedes/${id}`, { method: "DELETE" });
    fetchSedes();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white">Sedes</h1>
          <p className="text-white/50 mt-1">Gestionar ubicaciones de la iglesia</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90">
          <Plus size={16} /> Nueva sede
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
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Nombre</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Dirección</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Horario</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {sedes.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-white/40" />
                      <span className="text-white font-medium">{s.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">{s.direccion}</td>
                  <td className="px-6 py-4 text-white/60 text-sm">{s.horario || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${s.activo ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                      {s.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(s)} className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-400">
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
              <h2 className="font-display text-xl text-white">{editing ? "Editar sede" : "Nueva sede"}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Nombre</label>
                <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Dirección</label>
                <input type="text" value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Distrito</label>
                  <input type="text" value={form.distrito} onChange={(e) => setForm({ ...form, distrito: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Horario</label>
                  <input type="text" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Latitud</label>
                  <input type="text" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Longitud</label>
                  <input type="text" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="activo" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="rounded" />
                <label htmlFor="activo" className="text-white/60 text-sm">Activo</label>
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
