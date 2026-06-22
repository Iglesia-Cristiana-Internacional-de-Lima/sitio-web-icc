import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.rol !== "ADMIN") return null;
  return session;
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const estado = searchParams.get("estado");

  const reservas = await prisma.reserva.findMany({
    where: estado ? { estado: estado as "PENDIENTE" | "CONFIRMADA" | "COMPLETADA" | "CANCELADA" } : undefined,
    include: {
      lider: { select: { id: true, nombre: true, titulo: true } },
      solicitante: { select: { id: true, nombre: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: reservas });
}
