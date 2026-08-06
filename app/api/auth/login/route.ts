import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // ponytail: rate limit by IP, 5 attempts per minute
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const { ok } = rateLimit(`login:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!ok) {
      return NextResponse.json(
        { error: "Demasiados intentos. Intenta de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    const user = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { rol: true },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    await createSession(user.id);

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
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
