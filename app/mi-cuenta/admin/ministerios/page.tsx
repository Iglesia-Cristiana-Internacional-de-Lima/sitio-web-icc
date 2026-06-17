"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

interface Ministerio {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  icono: string | null;
  orden: number;
  activo: boolean;
}

export default function AdminMinisteriosPage() {
  const [ministerios, setMinisterios] = useState<Ministerio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Ministerio | null>(null);
  const [form, setForm] = useState({ nombre: "", slug: "", descripcion: "", icono: "", orden: "0", activo: true });

  const fetchMinisterios = () => {
    fetch("/api/admin/ministerios")
      .then((r) => r.ok ? r.json() : { data: [] })
      .then((d) => setMinisterios(d.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMinisterios(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ nombre: "", slug: "", descripcion: "", icono: "", orden: "0", activo: true });
    setShowModal(true);
  };

  const openEdit = (m: Ministerio) => {
    setEditing(m);
    setForm({
      nombre: m.nombre,
      slug: m.slug,
      descripcion: m.descripcion || "",
      icono: m.icono || "",
      orden: m.orden.toString(),
      activo: m.activo,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/admin/ministerios/${editing.id}` : "/api/admin/ministerios";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowModal(false);
    fetchMinisterios();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Eliminar este ministerio?")) return;
    await fetch(`/api/admin/ministerios/${id}`, { method: "DELETE" });
    fetchMinisterios();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white">Ministerios</h1>
          <p className="text-white/50 mt-1">Gestionar ministerios de la iglesia</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90">
          <Plus size={16} /> Nuevo ministerio
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
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Orden</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Nombre</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Slug</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Icono</th>
                <th className="text-left px-6 py-4 text-white/50 text-xs font-medium uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {ministerios.map((m) => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4 text-white/40 text-sm">{m.orden}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-white/40" />
                      <span className="text-white font-medium">{m.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm font-mono">{m.slug}</td>
                  <td className="px-6 py-4 text-white/60 text-sm">{m.icono || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${m.activo ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                      {m.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(m)} className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-400">
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
              <h2 className="font-display text-xl text-white">{editing ? "Editar ministerio" : "Nuevo ministerio"}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Nombre</label>
                <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Slug (URL)</label>
                <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="ej: universitarios" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Icono/Etiqueta</label>
                  <input type="text" value={form.icono} onChange={(e) => setForm({ ...form, icono: e.target.value })} placeholder="ej: 18 — 24" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Orden</label>
                  <input type="number" value={form.orden} onChange={(e) => setForm({ ...form, orden: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
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
