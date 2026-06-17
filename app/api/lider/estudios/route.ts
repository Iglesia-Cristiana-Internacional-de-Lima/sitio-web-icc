import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireLider() {
  const session = await getSession();
  if (!session || (session.rol !== "LIDER" && session.rol !== "ADMIN")) {
    return null;
  }
  return session;
}

export async function GET(request: NextRequest) {
  const session = await requireLider();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const estado = searchParams.get("estado");

  const reservas = await prisma.reserva.findMany({
    where: {
      liderId: session.id,
      ...(estado ? { estado: estado as "PENDIENTE" | "CONFIRMADA" | "COMPLETADA" | "CANCELADA" } : {}),
    },
    include: {
      solicitante: { select: { id: true, nombre: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: reservas });
}
