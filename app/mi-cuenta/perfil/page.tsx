"use client";

import { useState } from "react";
import { useSession } from "@/hooks/useSession";
import { User, Mail, Lock, Check } from "lucide-react";

export default function PerfilPage() {
  const { user, refresh } = useSession();
  const [nombre, setNombre] = useState(user?.nombre || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password && password !== confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }

    if (password && password.length < 6) {
      setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/mi-cuenta/perfil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          ...(password ? { password } : {}),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Perfil actualizado" });
        setPassword("");
        setConfirmPassword("");
        refresh();
      } else {
        setMessage({ type: "error", text: data.error || "Error al guardar" });
      }
    } catch {
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white">Mi perfil</h1>
        <p className="text-white/50 mt-2">Actualiza tu información personal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email (read-only) */}
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
            Email
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white/50 cursor-not-allowed"
            />
          </div>
          <p className="text-white/30 text-xs mt-1">El email no se puede cambiar</p>
        </div>

        {/* Nombre */}
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
            Nombre
          </label>
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-white/50 text-sm mb-4">Cambiar contraseña (opcional)</p>

          {/* New password */}
          <div className="mb-4">
            <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
              Nueva contraseña
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Dejar en blanco para no cambiar"
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repetir contraseña"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <Check size={16} />
              Guardar cambios
            </>
          )}
        </button>
      </form>
    </div>
  );
}
