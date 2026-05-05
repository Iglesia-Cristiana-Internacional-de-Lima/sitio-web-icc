"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import EvolutionIcon from "./EvolutionIcon";

const navItems = [
  { label: "PUCP", href: "#pucp" },
  { label: "San Marcos", href: "#sanmarcos" },
  { label: "Eventos", href: "#eventos" },
  { label: "Estudios", href: "/estudios" },
];

export default function EvolutionNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          ? "bg-[#093b18]/90 backdrop-blur-xl border-b border-[#e2a633]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        {/* Breadcrumb + Logo */}
        <div className="flex items-center gap-4">
          {/* Back to main site */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 text-[#e2a633]/60 hover:text-[#e2a633] transition-colors text-xs"
          >
            <span className="font-mono tracking-wider">Iglesia</span>
            <ChevronRight size={12} strokeWidth={1.5} />
          </Link>

          {/* Evolution Logo */}
          <Link href="/ministerios/universitarios" className="flex items-center gap-3 group">
            <EvolutionIcon size={36} />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[15px] tracking-tight text-[#e2a633]">
                Evolution
              </span>
              <span className="font-mono text-[10px] tracking-[0.28em] text-[#e2a633]/60 uppercase">
                Lima
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-[#e2a633]/70 hover:text-[#e2a633] transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-full h-px bg-[#e2a633] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#pucp"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e2a633] text-[#093b18] text-[13px] font-medium hover:bg-[#e2a633]/90 transition-all"
          >
            Unirme
            <span className="inline-block group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#e2a633] p-2"
          aria-label="Menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#093b18]/95 backdrop-blur-xl border-t border-[#e2a633]/10">
          <nav className="px-6 py-8 flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-[#e2a633]/90 hover:text-[#e2a633]"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-[#e2a633]/10 my-2" />
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-sm text-[#e2a633]/60"
            >
              ← Volver a Iglesia
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
