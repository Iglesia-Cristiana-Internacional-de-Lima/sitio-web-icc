import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destacado = searchParams.get("destacado");
    const soloActivos = searchParams.get("activo") !== "false";

    const where: Record<string, unknown> = {};

    if (soloActivos) {
      where.activo = true;
    }

    if (destacado === "true") {
      where.destacado = true;
    }

    const eventos = await prisma.evento.findMany({
      where,
      include: { sede: true },
      orderBy: { fecha: "asc" },
    });

    return NextResponse.json({ success: true, data: eventos });
  } catch (error) {
    console.error("Error obteniendo eventos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.titulo || String(body.titulo).trim().length < 3) {
      return NextResponse.json(
        { error: "El título es requerido (mínimo 3 caracteres)" },
        { status: 400 }
      );
    }

    if (!body.fecha) {
      return NextResponse.json(
        { error: "La fecha es requerida" },
        { status: 400 }
      );
    }

    if (!body.horaInicio) {
      return NextResponse.json(
        { error: "La hora de inicio es requerida" },
        { status: 400 }
      );
    }

    const evento = await prisma.evento.create({
      data: {
        titulo: String(body.titulo).trim(),
        descripcion: body.descripcion ? String(body.descripcion).trim() : null,
        fecha: new Date(body.fecha),
        horaInicio: String(body.horaInicio).trim(),
        horaFin: body.horaFin ? String(body.horaFin).trim() : null,
        sedeId: body.sedeId ? parseInt(String(body.sedeId), 10) : null,
        imagen: body.imagen || null,
        destacado: body.destacado ?? false,
        activo: body.activo ?? true,
      },
    });

    return NextResponse.json({ success: true, data: evento }, { status: 201 });
  } catch (error) {
    console.error("Error creando evento:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const id = request.nextUrl.searchParams.get("id") || body.id;

    if (!id) {
      return NextResponse.json(
        { error: "El parámetro id es requerido" },
        { status: 400 }
      );
    }

    const eventoExistente = await prisma.evento.findUnique({
      where: { id: parseInt(String(id), 10) },
    });

    if (!eventoExistente) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};

    if (body.titulo !== undefined) {
      if (String(body.titulo).trim().length < 3) {
        return NextResponse.json(
          { error: "El título debe tener al menos 3 caracteres" },
          { status: 400 }
        );
      }
      data.titulo = String(body.titulo).trim();
    }

    if (body.descripcion !== undefined) {
      data.descripcion = body.descripcion ? String(body.descripcion).trim() : null;
    }

    if (body.fecha !== undefined) {
      data.fecha = new Date(body.fecha);
    }

    if (body.horaInicio !== undefined) {
      data.horaInicio = String(body.horaInicio).trim();
    }

    if (body.horaFin !== undefined) {
      data.horaFin = body.horaFin ? String(body.horaFin).trim() : null;
    }

    if (body.sedeId !== undefined) {
      data.sedeId = body.sedeId ? parseInt(String(body.sedeId), 10) : null;
    }

    if (body.imagen !== undefined) {
      data.imagen = body.imagen || null;
    }

    if (body.destacado !== undefined) data.destacado = body.destacado;
    if (body.activo !== undefined) data.activo = body.activo;

    const evento = await prisma.evento.update({
      where: { id: parseInt(String(id), 10) },
      data,
    });

    return NextResponse.json({ success: true, data: evento });
  } catch (error) {
    console.error("Error actualizando evento:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "El parámetro id es requerido" },
        { status: 400 }
      );
    }

    const parsedId = parseInt(id, 10);

    const evento = await prisma.evento.findUnique({
      where: { id: parsedId },
    });

    if (!evento) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    await prisma.evento.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({
      success: true,
      message: "Evento eliminado correctamente",
    });
  } catch (error) {
    console.error("Error eliminando evento:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
