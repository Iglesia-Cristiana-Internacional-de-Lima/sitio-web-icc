import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const reels = await prisma.reel.findMany({
      orderBy: [{ orden: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ success: true, data: reels });
  } catch (error) {
    console.error("Error obteniendo reels:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.url || String(body.url).trim().length < 5) {
      return NextResponse.json({ error: "La URL es requerida" }, { status: 400 });
    }

    const reel = await prisma.reel.create({
      data: {
        platform: body.platform || "instagram",
        url: String(body.url).trim(),
        caption: body.caption ? String(body.caption).trim() : null,
        thumbnail: body.thumbnail || null,
        seccion: body.seccion || "comunidad",
        orden: body.orden ?? 0,
        activo: body.activo ?? true,
      },
    });

    return NextResponse.json({ success: true, data: reel }, { status: 201 });
  } catch (error) {
    console.error("Error creando reel:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const id = request.nextUrl.searchParams.get("id") || body.id;

    if (!id) {
      return NextResponse.json({ error: "El parámetro id es requerido" }, { status: 400 });
    }

    const parsedId = parseInt(String(id), 10);
    const existing = await prisma.reel.findUnique({ where: { id: parsedId } });

    if (!existing) {
      return NextResponse.json({ error: "Reel no encontrado" }, { status: 404 });
    }

    const data: Record<string, unknown> = {};
    if (body.platform !== undefined) data.platform = body.platform;
    if (body.url !== undefined) data.url = String(body.url).trim();
    if (body.caption !== undefined) data.caption = body.caption ? String(body.caption).trim() : null;
    if (body.thumbnail !== undefined) data.thumbnail = body.thumbnail || null;
    if (body.seccion !== undefined) data.seccion = body.seccion;
    if (body.orden !== undefined) data.orden = body.orden;
    if (body.activo !== undefined) data.activo = body.activo;

    const reel = await prisma.reel.update({ where: { id: parsedId }, data });

    return NextResponse.json({ success: true, data: reel });
  } catch (error) {
    console.error("Error actualizando reel:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "El parámetro id es requerido" }, { status: 400 });
    }

    const parsedId = parseInt(id, 10);
    const existing = await prisma.reel.findUnique({ where: { id: parsedId } });

    if (!existing) {
      return NextResponse.json({ error: "Reel no encontrado" }, { status: 404 });
    }

    await prisma.reel.delete({ where: { id: parsedId } });

    return NextResponse.json({ success: true, message: "Reel eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando reel:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
