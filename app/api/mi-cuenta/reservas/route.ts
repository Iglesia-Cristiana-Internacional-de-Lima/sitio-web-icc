import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");

  const reservas = await prisma.reserva.findMany({
    where: { solicitanteId: session.id },
    include: {
      lider: {
        select: { id: true, nombre: true, titulo: true },
      },
    },
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: parseInt(limit) } : {}),
  });

  return NextResponse.json({ success: true, data: reservas });
}
