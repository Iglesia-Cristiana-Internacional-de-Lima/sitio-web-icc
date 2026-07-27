import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const seccion = request.nextUrl.searchParams.get("seccion");

    const where: Record<string, unknown> = { activo: true };
    if (seccion) where.seccion = seccion;

    const reels = await prisma.reel.findMany({
      where,
      orderBy: [{ orden: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: reels });
  } catch (error) {
    console.error("Error obteniendo reels:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
