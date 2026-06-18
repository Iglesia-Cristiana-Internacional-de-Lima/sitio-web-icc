import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const sedes = await prisma.sede.findMany({
    where: { activo: true },
    orderBy: { nombre: "asc" },
  });
  return NextResponse.json({ success: true, data: sedes });
}
