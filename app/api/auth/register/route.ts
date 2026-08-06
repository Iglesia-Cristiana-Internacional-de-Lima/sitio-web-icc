import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // ponytail: rate limit by IP, 5 registrations per minute
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const { ok } = rateLimit(`register:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!ok) {
      return NextResponse.json(
        { error: "Demasiados intentos. Intenta de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const { email, password, nombre } = await request.json();

    if (!email || !nombre) {
      return NextResponse.json(
        { error: "Email y nombre requeridos" },
        { status: 400 }
      );
    }

    if (password && password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }

    const emailNorm = email.toLowerCase().trim();

    const existing = await prisma.usuario.findUnique({
      where: { email: emailNorm },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 409 }
      );
    }

    // Obtener rol según si tiene password
    const rolNombre = password ? "MIEMBRO" : "SUSCRIPTOR";
    const rol = await prisma.rol.findUnique({ where: { nombre: rolNombre } });

    if (!rol) {
      return NextResponse.json(
        { error: "Error de configuración: rol no encontrado" },
        { status: 500 }
      );
    }

    const user = await prisma.usuario.create({
      data: {
        email: emailNorm,
        nombre: nombre.trim(),
        passwordHash: password ? hashPassword(password) : null,
        rolId: rol.id,
      },
      include: { rol: true },
    });

    if (password) {
      await createSession(user.id);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol.nombre,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
