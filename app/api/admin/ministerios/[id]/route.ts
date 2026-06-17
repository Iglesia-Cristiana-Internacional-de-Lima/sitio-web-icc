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
  const ministerio = await prisma.ministerio.update({
    where: { id: parseInt(id) },
    data: {
      nombre: body.nombre,
      slug: body.slug,
      descripcion: body.descripcion || null,
      imagen: body.imagen || null,
      icono: body.icono || null,
      orden: body.orden ? parseInt(body.orden) : 0,
      activo: body.activo,
    },
  });
  return NextResponse.json({ success: true, data: ministerio });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const err = await requireAdmin();
  if (err) return err;

  const { id } = await params;
  await prisma.ministerio.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
