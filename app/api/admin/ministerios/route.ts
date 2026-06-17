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

  const ministerios = await prisma.ministerio.findMany({ orderBy: { orden: "asc" } });
  return NextResponse.json({ success: true, data: ministerios });
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin();
  if (err) return err;

  const body = await req.json();
  const ministerio = await prisma.ministerio.create({
    data: {
      nombre: body.nombre,
      slug: body.slug || body.nombre.toLowerCase().replace(/\s+/g, "-"),
      descripcion: body.descripcion || null,
      imagen: body.imagen || null,
      icono: body.icono || null,
      orden: body.orden ? parseInt(body.orden) : 0,
      activo: body.activo ?? true,
    },
  });
  return NextResponse.json({ success: true, data: ministerio });
}
