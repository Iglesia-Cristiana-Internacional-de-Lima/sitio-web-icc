"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, User } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useSession } from "@/hooks/useSession";

const navItems = [
  { label: "Sedes", href: "/#sedes" },
  { label: "Ministerios", href: "/#ministerios" },
  { label: "Estudios", href: "/estudios" },
  { label: "Eventos", href: "/eventos" },
  { label: "Mercy", href: "/mercy" },
  { label: "Nosotros", href: "/#about" },
];

export default function Navbar() {
  const { user, loading, logout } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--line)]"
          : "bg-transparent nav-over-hero"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <SoundLogo />
          <div className="hidden md:flex flex-col leading-tight">
            <span className="font-display text-[15px] tracking-tight text-[var(--fg)]">
              Iglesia Cristiana
            </span>
            <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--fg-50)] uppercase">
              Internacional · Lima
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-[var(--fg-70)] hover:text-[var(--fg)] transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-full h-px bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-2 rounded-full text-[var(--fg-70)] hover:text-[var(--fg)] hover:bg-[var(--surface-5)] transition-all"
            aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
          {!loading && (
            user ? (
              <>
                <Link
                  href="/mi-cuenta"
                  className="inline-flex items-center gap-2 text-[13px] text-[var(--fg-70)] hover:text-[var(--fg)] transition-colors"
                >
                  <User size={16} />
                  {user.nombre.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  className="text-[13px] text-[var(--fg-50)] hover:text-[var(--fg)] transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-[13px] text-[var(--fg-70)] hover:text-[var(--fg)] transition-colors"
              >
                Ingresar
              </Link>
            )
          )}
          <Link
            href="/#sedes"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--inverse-bg)] text-[var(--inverse-fg)] text-[13px] font-medium hover:opacity-90 transition-all"
          >
            Visítanos
            <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-full text-[var(--fg-70)] hover:text-[var(--fg)] hover:bg-[var(--surface-5)] transition-all"
            aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-[var(--fg)]"
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[var(--nav-bg-mobile)] backdrop-blur-xl border-t border-[var(--line)]">
          <nav className="px-6 py-8 flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-[var(--fg-90)] hover:text-[var(--fg)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-[var(--line)] my-2" />
            {user ? (
              <>
                <Link
                  href="/mi-cuenta"
                  onClick={() => setOpen(false)}
                  className="text-sm text-[var(--fg-60)]"
                >
                  Mi cuenta →
                </Link>
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="text-sm text-[var(--fg-40)] text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-sm text-[var(--fg-60)]"
              >
                Ingresar →
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function SoundLogo() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm group-hover:border-white/40 transition-colors">
      <div className="flex items-end gap-[2px] h-4">
        {[0.4, 0.7, 1, 0.7, 0.4].map((h, i) => (
          <span
            key={i}
            className="sound-bar"
            style={{
              height: `${h * 100}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
