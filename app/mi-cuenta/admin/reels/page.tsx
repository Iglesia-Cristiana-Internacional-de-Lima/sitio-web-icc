"use client";

import { useState, useEffect, FormEvent } from "react";
import { Trash2, Loader2, Plus, Pencil, Eye, EyeOff } from "lucide-react";

interface Reel {
  id: number;
  platform: string;
  url: string;
  caption: string | null;
  seccion: string;
  orden: number;
  activo: boolean;
}

const SECCIONES = [
  { value: "comunidad", label: "Comunidad (Home)" },
  { value: "mercy", label: "Mercy" },
  { value: "eventos", label: "Eventos" },
  { value: "estudios", label: "Estudios" },
  { value: "evolution", label: "Evolution" },
];

const INITIAL_FORM = {
  platform: "instagram",
  url: "",
  caption: "",
  seccion: "comunidad",
  orden: "0",
};

type FormFields = typeof INITIAL_FORM;

export default function AdminReelsPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [filtroSeccion, setFiltroSeccion] = useState("");

  const cargarReels = () => {
    setCargando(true);
    fetch("/api/reels")
      .then((r) => r.json())
      .then((json) => { if (json.success) setReels(json.data); })
      .finally(() => setCargando(false));
  };

  useEffect(cargarReels, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (reel: Reel) => {
    setEditandoId(reel.id);
    setForm({
      platform: reel.platform,
      url: reel.url,
      caption: reel.caption || "",
      seccion: reel.seccion,
      orden: String(reel.orden),
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(INITIAL_FORM);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    const body = {
      platform: form.platform,
      url: form.url,
      caption: form.caption || null,
      seccion: form.seccion,
      orden: parseInt(form.orden, 10) || 0,
    };

    try {
      const url = editandoId ? `/api/reels?id=${editandoId}` : "/api/reels";
      const method = editandoId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) { alert(json.error || "Error al guardar"); return; }

      setForm(INITIAL_FORM);
      setEditandoId(null);
      cargarReels();
    } catch {
      alert("Error de conexión");
    } finally {
      setEnviando(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este reel?")) return;
    try {
      const res = await fetch(`/api/reels?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) { alert(json.error || "Error al eliminar"); return; }
      setReels((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Error de conexión");
    }
  };

  const handleToggleActivo = async (reel: Reel) => {
    try {
      const res = await fetch(`/api/reels?id=${reel.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: !reel.activo }),
      });
      const json = await res.json();
      if (!res.ok) { alert(json.error || "Error"); return; }
      setReels((prev) => prev.map((r) => (r.id === reel.id ? { ...r, activo: !r.activo } : r)));
    } catch {
      alert("Error de conexión");
    }
  };

  const reelsFiltrados = filtroSeccion
    ? reels.filter((r) => r.seccion === filtroSeccion)
    : reels;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Administrar Reels</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
      >
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2 text-white/80">
            {editandoId ? <Pencil size={18} /> : <Plus size={18} />}
            <h2 className="text-lg font-semibold">
              {editandoId ? "Editar Reel" : "Nuevo Reel"}
            </h2>
          </div>
          {editandoId && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              Cancelar edición
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
              Plataforma
            </label>
            <select
              name="platform"
              value={form.platform}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
              URL del Reel
            </label>
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="https://www.instagram.com/reel/..."
            />
          </div>

          <div>
            <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
              Sección
            </label>
            <select
              name="seccion"
              value={form.seccion}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
            >
              {SECCIONES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
              Caption
            </label>
            <input
              name="caption"
              value={form.caption}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Descripción corta del reel"
            />
          </div>

          <div>
            <label className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
              Orden
            </label>
            <input
              name="orden"
              type="number"
              value={form.orden}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-50"
        >
          {enviando ? (
            <><Loader2 size={16} className="animate-spin" />{editandoId ? "Guardando..." : "Creando..."}</>
          ) : (
            <>{editandoId ? <Pencil size={16} /> : <Plus size={16} />}{editandoId ? "Guardar Cambios" : "Agregar Reel"}</>
          )}
        </button>
      </form>

      {/* Lista */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-semibold text-white/80">
            Reels
            <span className="ml-2 text-sm text-white/40 font-normal">({reelsFiltrados.length})</span>
          </h2>
          <select
            value={filtroSeccion}
            onChange={(e) => setFiltroSeccion(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
          >
            <option value="">Todas las secciones</option>
            {SECCIONES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {cargando ? (
          <div className="flex items-center justify-center gap-3 py-16 text-white/40">
            <Loader2 size={20} className="animate-spin" />
            <span>Cargando reels...</span>
          </div>
        ) : reelsFiltrados.length === 0 ? (
          <div className="text-center py-16 text-white/40">
            No hay reels registrados. Agrega el primero arriba.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase tracking-wider font-semibold">
                  <th className="text-left px-6 py-3">Caption</th>
                  <th className="text-left px-6 py-3">Sección</th>
                  <th className="text-left px-6 py-3">Plataforma</th>
                  <th className="text-center px-6 py-3">Estado</th>
                  <th className="text-right px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reelsFiltrados.map((reel) => (
                  <tr
                    key={reel.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-3 text-white font-medium max-w-[200px] truncate">
                      {reel.caption || "—"}
                    </td>
                    <td className="px-6 py-3 text-white/50 capitalize">{reel.seccion}</td>
                    <td className="px-6 py-3 text-white/50 capitalize">{reel.platform}</td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider ${
                          reel.activo
                            ? "bg-green-900/50 text-green-400"
                            : "bg-yellow-900/50 text-yellow-400"
                        }`}
                      >
                        {reel.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEdit(reel)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30 transition-all"
                        >
                          <Pencil size={12} /> Editar
                        </button>
                        <button
                          onClick={() => handleToggleActivo(reel)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all border ${
                            reel.activo
                              ? "text-white/40 hover:bg-white/5 hover:border-white/20 border-transparent"
                              : "text-green-400 hover:bg-green-500/10 hover:border-green-500/30 border-transparent"
                          }`}
                        >
                          {reel.activo ? <><EyeOff size={12} /> Ocultar</> : <><Eye size={12} /> Publicar</>}
                        </button>
                        <button
                          onClick={() => handleDelete(reel.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all"
                        >
                          <Trash2 size={12} /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
