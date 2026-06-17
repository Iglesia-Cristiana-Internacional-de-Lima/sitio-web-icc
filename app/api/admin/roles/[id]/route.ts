import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.rol !== "ADMIN") return null;
  return session;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;
  const { nombre, descripcion } = await request.json();

  const rol = await prisma.rol.update({
    where: { id: parseInt(id) },
    data: {
      ...(nombre && { nombre: nombre.toUpperCase() }),
      descripcion: descripcion || null,
    },
  });

  return NextResponse.json({ success: true, data: rol });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;

  // Check if rol has users
  const count = await prisma.usuario.count({ where: { rolId: parseInt(id) } });
  if (count > 0) {
    return NextResponse.json(
      { error: `No se puede eliminar: ${count} usuarios tienen este rol` },
      { status: 400 }
    );
  }

  await prisma.rol.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({ success: true });
}
