import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession, hashPassword } from "@/lib/auth";

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
  const body = await request.json();

  const updateData: Record<string, unknown> = {};

  if (body.nombre) updateData.nombre = body.nombre.trim();
  if (body.rolId) updateData.rolId = body.rolId;
  if (body.password) updateData.passwordHash = hashPassword(body.password);
  if (typeof body.activo === "boolean") updateData.activo = body.activo;

  const user = await prisma.usuario.update({
    where: { id: parseInt(id) },
    data: updateData,
    include: { rol: true },
  });

  return NextResponse.json({ success: true, data: user });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;

  await prisma.usuario.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({ success: true });
}
