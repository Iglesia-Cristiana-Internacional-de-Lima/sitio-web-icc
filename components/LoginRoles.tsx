"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, User } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    title: "Administrador",
    description: "Gestión completa: eventos, ubicaciones, usuarios, correos masivos, estudios bíblicos y configuración general.",
    icon: Shield,
    href: "/login?role=admin",
    features: ["Eventos y sedes", "Usuarios y roles", "Correos masivos", "Reportes"],
  },
  {
    title: "Líder",
    description: "Gestión de ministerios, seguimiento de discípulos y coordinación de actividades de tu área.",
    icon: Users,
    href: "/login?role=leader",
    features: ["Tu ministerio", "Seguimiento", "Estudios", "Eventos locales"],
  },
  {
    title: "Suscriptor",
    description: "Accede a tu perfil, gestiona tus suscripciones a eventos y recibe notificaciones personalizadas.",
    icon: User,
    href: "/login?role=subscriber",
    features: ["Tu perfil", "Notificaciones", "Eventos guardados", "Historial"],
  },
];

export default function LoginRoles() {
  return (
    <section className="relative bg-[var(--bg)] py-32 md:py-40 px-6 md:px-10 border-t border-[var(--line)]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--fg-50)] uppercase">
            10 — Acceso
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display-heading text-[var(--fg)] text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              Tu espacio
              <br />
              <em className="italic font-light text-[var(--fg-70)]">personal.</em>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[var(--fg-60)] text-lg leading-relaxed">
              Accede según tu rol para gestionar tu participación en la
              comunidad. Cada perfil tiene herramientas diseñadas para ti.
            </p>
          </div>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-8 hover:border-[var(--line-strong)] hover:bg-[var(--surface)] transition-all duration-500">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-[var(--surface-5)] flex items-center justify-center mb-6 group-hover:bg-[var(--surface-10)] transition-colors">
                  <role.icon size={24} strokeWidth={1.5} className="text-[var(--fg-80)]" />
                </div>

                {/* Title & description */}
                <h3 className="font-display text-3xl text-[var(--fg)] mb-3 group-hover:italic transition-all">
                  {role.title}
                </h3>
                <p className="text-[var(--fg-50)] text-sm leading-relaxed mb-6">
                  {role.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-8">
                  {role.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[var(--fg-40)] text-xs"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--fg-40)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={role.href}
                  className="inline-flex items-center gap-2 text-[var(--fg)] text-sm font-medium group/link"
                >
                  Ingresar
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Help text */}
        <div className="mt-12 text-center">
          <p className="text-[var(--fg-40)] text-sm">
            Primera vez?{" "}
            <Link href="/registro" className="text-[var(--fg)] hover:underline">
              Crea tu cuenta de suscriptor
            </Link>
            {" "}o{" "}
            <Link href="#" className="text-[var(--fg)] hover:underline">
              contacta a un líder
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
