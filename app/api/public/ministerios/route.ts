import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const ministerios = await prisma.ministerio.findMany({
    where: { activo: true },
    orderBy: { orden: "asc" },
  });
  return NextResponse.json({ success: true, data: ministerios });
}
