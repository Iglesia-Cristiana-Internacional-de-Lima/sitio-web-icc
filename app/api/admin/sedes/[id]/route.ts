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
  const sede = await prisma.sede.update({
    where: { id: parseInt(id) },
    data: {
      nombre: body.nombre,
      direccion: body.direccion,
      distrito: body.distrito || null,
      horario: body.horario || null,
      lat: body.lat ? parseFloat(body.lat) : null,
      lng: body.lng ? parseFloat(body.lng) : null,
      telefono: body.telefono || null,
      imagen: body.imagen || null,
      activo: body.activo,
    },
  });
  return NextResponse.json({ success: true, data: sede });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const err = await requireAdmin();
  if (err) return err;

  const { id } = await params;
  await prisma.sede.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
