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

export async function GET() {
  const err = await requireAdmin();
  if (err) return err;

  const eventos = await prisma.evento.findMany({
    include: { sede: true },
    orderBy: { fecha: "desc" },
  });
  return NextResponse.json({ success: true, data: eventos });
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin();
  if (err) return err;

  const body = await req.json();
  const evento = await prisma.evento.create({
    data: {
      titulo: body.titulo,
      descripcion: body.descripcion || null,
      fecha: new Date(body.fecha),
      horaInicio: body.horaInicio || null,
      horaFin: body.horaFin || null,
      sedeId: body.sedeId ? parseInt(body.sedeId) : null,
      imagen: body.imagen || null,
      destacado: body.destacado ?? false,
      activo: body.activo ?? true,
    },
  });
  return NextResponse.json({ success: true, data: evento });
}
