"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface Rol {
  id: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  _count: { usuarios: number };
}

interface FormData {
  nombre: string;
  descripcion: string;
}

const initialForm: FormData = { nombre: "", descripcion: "" };

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Rol | null>(null);
  const [form, setForm] = useState<FormData>(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchRoles = async () => {
    const res = await fetch("/api/admin/roles");
    const data = res.ok ? await res.json() : { data: [] };
    setRoles(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(initialForm);
    setError("");
    setShowModal(true);
  };

  const openEdit = (rol: Rol) => {
    setEditing(rol);
    setForm({ nombre: rol.nombre, descripcion: rol.descripcion || "" });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = editing ? `/api/admin/roles/${editing.id}` : "/api/admin/roles";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al guardar");
        return;
      }

      setShowModal(false);
      fetchRoles();
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (rol: Rol) => {
    if (rol._count.usuarios > 0) {
      alert(`No se puede eliminar: ${rol._count.usuarios} usuarios tienen este rol`);
      return;
    }
    if (!confirm("¿Eliminar este rol?")) return;

    await fetch(`/api/admin/roles/${rol.id}`, { method: "DELETE" });
    fetchRoles();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white">Roles</h1>
          <p className="text-white/50 mt-1">Gestiona los roles del sistema</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <Plus size={16} />
          Nuevo rol
        </button>
      </div>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((rol) => (
            <div
              key={rol.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-xl text-white">{rol.nombre}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(rol)}
                    className="p-2 text-white/40 hover:text-white transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(rol)}
                    className="p-2 text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-4">
                {rol.descripcion || "Sin descripción"}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-xs">
                  {rol._count.usuarios} usuario{rol._count.usuarios !== 1 ? "s" : ""}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    rol.activo
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {rol.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#191919] border border-white/10 rounded-xl w-full max-w-md p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="font-display text-xl text-white mb-6">
              {editing ? "Editar rol" : "Nuevo rol"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/50 text-xs block mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value.toUpperCase() })}
                  required
                  placeholder="Ej: COORDINADOR"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs block mb-1">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  rows={3}
                  placeholder="Descripción del rol..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 resize-none"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Check size={16} />
                    {editing ? "Guardar cambios" : "Crear rol"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
