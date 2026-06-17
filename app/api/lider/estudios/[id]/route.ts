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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireLider();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;
  const { estado } = await request.json();

  // Verify the reservation belongs to this leader
  const reserva = await prisma.reserva.findFirst({
    where: { id: parseInt(id), liderId: session.id },
  });

  if (!reserva) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
  }

  const updated = await prisma.reserva.update({
    where: { id: parseInt(id) },
    data: { estado },
  });

  return NextResponse.json({ success: true, data: updated });
}
