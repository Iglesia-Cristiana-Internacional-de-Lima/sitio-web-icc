import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.rol !== "ADMIN") return null;
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const roles = await prisma.rol.findMany({
    include: { _count: { select: { usuarios: true } } },
    orderBy: { nombre: "asc" },
  });

  return NextResponse.json({ success: true, data: roles });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { nombre, descripcion } = await request.json();

    if (!nombre) {
      return NextResponse.json(
        { error: "El nombre es requerido" },
        { status: 400 }
      );
    }

    const existing = await prisma.rol.findUnique({
      where: { nombre: nombre.toUpperCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este rol ya existe" },
        { status: 409 }
      );
    }

    const rol = await prisma.rol.create({
      data: {
        nombre: nombre.toUpperCase(),
        descripcion: descripcion || null,
      },
    });

    return NextResponse.json({ success: true, data: rol });
  } catch (error) {
    console.error("Error creando rol:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
