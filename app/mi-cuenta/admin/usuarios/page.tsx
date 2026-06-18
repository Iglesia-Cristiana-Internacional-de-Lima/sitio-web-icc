"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface Rol {
  id: number;
  nombre: string;
}

interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
  activo: boolean;
  createdAt: string;
}

interface FormData {
  email: string;
  nombre: string;
  password: string;
  rolId: number;
}

const initialForm: FormData = { email: "", nombre: "", password: "", rolId: 0 };

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [form, setForm] = useState<FormData>(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const [usersRes, rolesRes] = await Promise.all([
      fetch("/api/admin/usuarios"),
      fetch("/api/admin/roles"),
    ]);
    const usersData = usersRes.ok ? await usersRes.json() : { data: [] };
    const rolesData = rolesRes.ok ? await rolesRes.json() : { data: [] };
    setUsuarios(usersData.data || []);
    setRoles(rolesData.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...initialForm, rolId: roles.find((r) => r.nombre === "MIEMBRO")?.id || roles[0]?.id || 0 });
    setError("");
    setShowModal(true);
  };

  const openEdit = (user: Usuario) => {
    setEditing(user);
    setForm({ email: user.email, nombre: user.nombre, password: "", rolId: user.rol.id });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = editing ? `/api/admin/usuarios/${editing.id}` : "/api/admin/usuarios";
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
      fetchData();
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este usuario?")) return;

    await fetch(`/api/admin/usuarios/${id}`, { method: "DELETE" });
    fetchData();
  };

  const toggleActivo = async (user: Usuario) => {
    await fetch(`/api/admin/usuarios/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: !user.activo }),
    });
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white">Usuarios</h1>
          <p className="text-white/50 mt-1">Gestiona los usuarios del sistema</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <Plus size={16} />
          Nuevo usuario
        </button>
      </div>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/50 text-xs font-normal px-6 py-4">Nombre</th>
                <th className="text-left text-white/50 text-xs font-normal px-6 py-4">Email</th>
                <th className="text-left text-white/50 text-xs font-normal px-6 py-4">Rol</th>
                <th className="text-left text-white/50 text-xs font-normal px-6 py-4">Estado</th>
                <th className="text-right text-white/50 text-xs font-normal px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 text-white">{user.nombre}</td>
                  <td className="px-6 py-4 text-white/60">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-white/10 text-white/70 text-xs">
                      {user.rol.nombre}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActivo(user)}
                      className={`px-2 py-1 rounded text-xs ${
                        user.activo
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.activo ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEdit(user)}
                      className="p-2 text-white/40 hover:text-white transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-white/40 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              {editing ? "Editar usuario" : "Nuevo usuario"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/50 text-xs block mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={!!editing}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 disabled:text-white/40"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs block mb-1">
                  {editing ? "Nueva contraseña (dejar vacío para no cambiar)" : "Contraseña"}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required={!editing}
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs block mb-1">Rol</label>
                <select
                  value={form.rolId}
                  onChange={(e) => setForm({ ...form, rolId: parseInt(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30"
                >
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id} className="bg-[#191919]">
                      {rol.nombre}
                    </option>
                  ))}
                </select>
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
                    {editing ? "Guardar cambios" : "Crear usuario"}
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
