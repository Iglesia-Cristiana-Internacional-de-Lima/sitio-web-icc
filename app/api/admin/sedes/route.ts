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

  const sedes = await prisma.sede.findMany({ orderBy: { nombre: "asc" } });
  return NextResponse.json({ success: true, data: sedes });
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin();
  if (err) return err;

  const body = await req.json();
  const sede = await prisma.sede.create({
    data: {
      nombre: body.nombre,
      direccion: body.direccion,
      distrito: body.distrito || null,
      horario: body.horario || null,
      lat: body.lat ? parseFloat(body.lat) : null,
      lng: body.lng ? parseFloat(body.lng) : null,
      telefono: body.telefono || null,
      imagen: body.imagen || null,
      activo: body.activo ?? true,
    },
  });
  return NextResponse.json({ success: true, data: sede });
}
