import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.rol !== "ADMIN") return null;
  return session;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;
  const { estado } = await request.json();

  const reserva = await prisma.reserva.update({
    where: { id: parseInt(id) },
    data: { estado },
  });

  return NextResponse.json({ success: true, data: reserva });
}
