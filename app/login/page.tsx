"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const liderId = searchParams.get("liderId");
  const auto = searchParams.get("auto");

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const body = isRegister
        ? { email, password, nombre }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al procesar");
        return;
      }

      // Redirect back with params
      let url = redirect;
      if (liderId) url += `#lideres`;
      if (auto) url += `#lideres`;
      router.push(url);
      router.refresh();
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
              ICI Lima
            </span>
          </Link>
          <h1 className="font-display text-4xl text-white mb-2">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h1>
          <p className="text-white/50 text-sm">
            {isRegister
              ? "Regístrate para reservar estudios bíblicos"
              : "Ingresa para continuar con tu reserva"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
                Tu nombre
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  required={isRegister}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase block mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-12 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D4A574] text-white text-sm font-medium hover:bg-[#C8956A] transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                {isRegister ? "Crear cuenta" : "Ingresar"}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="text-white/50 text-sm hover:text-white transition-colors"
          >
            {isRegister
              ? "Ya tienes cuenta? Inicia sesión"
              : "No tienes cuenta? Regístrate"}
          </button>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-white/30 text-xs hover:text-white/50 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d0d]" />}>
      <LoginForm />
    </Suspense>
  );
}
