import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.rol !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return null;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const err = await requireAdmin();
  if (err) return err;

  const { id } = await params;
  const body = await req.json();
  const evento = await prisma.evento.update({
    where: { id: parseInt(id) },
    data: {
      titulo: body.titulo,
      descripcion: body.descripcion || null,
      fecha: new Date(body.fecha),
      horaInicio: body.horaInicio || null,
      horaFin: body.horaFin || null,
      sedeId: body.sedeId ? parseInt(body.sedeId) : null,
      imagen: body.imagen || null,
      destacado: body.destacado,
      activo: body.activo,
    },
  });
  return NextResponse.json({ success: true, data: evento });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const err = await requireAdmin();
  if (err) return err;

  const { id } = await params;
  await prisma.evento.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
