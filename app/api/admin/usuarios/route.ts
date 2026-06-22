import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession, hashPassword } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.rol !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const usuarios = await prisma.usuario.findMany({
    include: { rol: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: usuarios });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { email, nombre, password, rolId } = await request.json();

    if (!email || !nombre || !password || !rolId) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const existing = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 409 }
      );
    }

    const user = await prisma.usuario.create({
      data: {
        email: email.toLowerCase().trim(),
        nombre: nombre.trim(),
        passwordHash: hashPassword(password),
        rolId,
      },
      include: { rol: true },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error creando usuario:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
