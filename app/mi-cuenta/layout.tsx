"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Home, Calendar, User, LogOut, ChevronLeft, Users, Shield, BookOpen, Book, MapPin, Heart, Film } from "lucide-react";
import { useSession } from "@/hooks/useSession";

const menuItems = [
  { label: "Inicio", href: "/mi-cuenta", icon: Home },
  { label: "Mis reservas", href: "/mi-cuenta/reservas", icon: Calendar },
  { label: "Mi perfil", href: "/mi-cuenta/perfil", icon: User },
];

const liderItems = [
  { label: "Mis estudios", href: "/mi-cuenta/mis-estudios", icon: Book },
];

const adminItems = [
  { label: "Usuarios", href: "/mi-cuenta/admin/usuarios", icon: Users },
  { label: "Roles", href: "/mi-cuenta/admin/roles", icon: Shield },
  { label: "Reservas", href: "/mi-cuenta/admin/reservas", icon: BookOpen },
  { label: "Sedes", href: "/mi-cuenta/admin/sedes", icon: MapPin },
  { label: "Ministerios", href: "/mi-cuenta/admin/ministerios", icon: Heart },
  { label: "Eventos", href: "/mi-cuenta/admin/eventos", icon: Calendar },
  { label: "Reels", href: "/mi-cuenta/admin/reels", icon: Film },
];

export default function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useSession();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/mi-cuenta");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft size={16} />
            Volver al sitio
          </Link>
          <h1 className="font-display text-xl text-white mt-4">Mi cuenta</h1>
          <p className="text-white/50 text-sm mt-1">{user.email}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 overflow-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Leader section */}
          {(user.rol === "LIDER" || user.rol === "ADMIN") && (
            <>
              <div className="my-4 px-4">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
                  Líder
                </p>
              </div>
              <ul className="space-y-1">
                {liderItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <item.icon size={18} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {/* Admin section */}
          {user.rol === "ADMIN" && (
            <>
              <div className="my-4 px-4">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
                  Administración
                </p>
              </div>
              <ul className="space-y-1">
                {adminItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <item.icon size={18} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/40 hover:bg-white/5 hover:text-white transition-colors w-full"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
