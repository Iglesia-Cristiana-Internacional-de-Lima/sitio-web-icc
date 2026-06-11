import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Obtener eventos (con filtro opcional por tipo y publicado)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo");
    const publicado = searchParams.get("publicado");

    const where: Record<string, unknown> = {};

    if (tipo) {
      where.tipo = tipo;
    }

    if (publicado === "true") {
      where.publicado = true;
    }

    const eventos = await prisma.evento.findMany({
      where,
      orderBy: {
        fecha: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: eventos,
    });
  } catch (error) {
    console.error("Error obteniendo eventos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PUT: Actualizar un evento por ID
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const id = request.nextUrl.searchParams.get("id") || body.id || null;

    if (!id) {
      return NextResponse.json(
        { error: "El parámetro id es requerido" },
        { status: 400 }
      );
    }

    const eventoExistente = await prisma.evento.findUnique({
      where: { id },
    });

    if (!eventoExistente) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};

    if (body.titulo !== undefined && body.titulo !== null) {
      if (String(body.titulo).trim().length < 3) {
        return NextResponse.json(
          { error: "El título debe tener al menos 3 caracteres" },
          { status: 400 }
        );
      }
      data.titulo = String(body.titulo).trim();
    }

    if (body.descripcion !== undefined && body.descripcion !== null) {
      if (String(body.descripcion).trim().length < 10) {
        return NextResponse.json(
          { error: "La descripción debe tener al menos 10 caracteres" },
          { status: 400 }
        );
      }
      data.descripcion = String(body.descripcion).trim();
    }

    if (body.fecha !== undefined && body.fecha !== null) {
      data.fecha = new Date(body.fecha);
    }

    if (body.ubicacion !== undefined && body.ubicacion !== null) {
      if (String(body.ubicacion).trim().length < 3) {
        return NextResponse.json(
          { error: "La ubicación debe tener al menos 3 caracteres" },
          { status: 400 }
        );
      }
      data.ubicacion = String(body.ubicacion).trim();
    }

    if (body.responsable !== undefined && body.responsable !== null) {
      if (String(body.responsable).trim().length < 3) {
        return NextResponse.json(
          { error: "El responsable debe tener al menos 3 caracteres" },
          { status: 400 }
        );
      }
      data.responsable = String(body.responsable).trim();
    }

    if (body.tipo !== undefined && body.tipo !== null) {
      const VALID_TIPOS = ["Dominical", "Ministerial", "Universitario", "Charla", "Especial"];
      if (!VALID_TIPOS.includes(body.tipo)) {
        return NextResponse.json(
          { error: `Tipo inválido. Debe ser: ${VALID_TIPOS.join(", ")}` },
          { status: 400 }
        );
      }
      data.tipo = body.tipo;
    }

    if (body.latitud !== undefined) data.latitud = body.latitud;
    if (body.longitud !== undefined) data.longitud = body.longitud;
    if (body.publicado !== undefined) data.publicado = body.publicado;

    const evento = await prisma.evento.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: evento,
    });
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

// DELETE: Eliminar un evento por ID
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

    const evento = await prisma.evento.findUnique({
      where: { id },
    });

    if (!evento) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    await prisma.evento.delete({
      where: { id },
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

// POST: Crear un nuevo evento (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validaciones
    if (!body.titulo || body.titulo.trim().length < 3) {
      return NextResponse.json(
        { error: "El título es requerido (mínimo 3 caracteres)" },
        { status: 400 }
      );
    }

    if (!body.descripcion || body.descripcion.trim().length < 10) {
      return NextResponse.json(
        { error: "La descripción es requerida (mínimo 10 caracteres)" },
        { status: 400 }
      );
    }

    if (!body.fecha) {
      return NextResponse.json(
        { error: "La fecha es requerida" },
        { status: 400 }
      );
    }

    if (!body.ubicacion || body.ubicacion.trim().length < 3) {
      return NextResponse.json(
        { error: "La ubicación es requerida (mínimo 3 caracteres)" },
        { status: 400 }
      );
    }

    if (!body.responsable || body.responsable.trim().length < 3) {
      return NextResponse.json(
        { error: "El responsable es requerido (mínimo 3 caracteres)" },
        { status: 400 }
      );
    }

    if (!body.tipo) {
      return NextResponse.json(
        {
          error:
            "El tipo es requerido: Dominical, Ministerial, Universitario, Charla o Especial",
        },
        { status: 400 }
      );
    }

    const VALID_TIPOS = ["Dominical", "Ministerial", "Universitario", "Charla", "Especial"];

    if (!VALID_TIPOS.includes(body.tipo)) {
      return NextResponse.json(
        {
          error: `Tipo inválido. Debe ser: ${VALID_TIPOS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const evento = await prisma.evento.create({
      data: {
        titulo: body.titulo.trim(),
        descripcion: body.descripcion.trim(),
        fecha: new Date(body.fecha),
        ubicacion: body.ubicacion.trim(),
        latitud: body.latitud ?? null,
        longitud: body.longitud ?? null,
        responsable: body.responsable.trim(),
        tipo: body.tipo,
        publicado: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: evento,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando evento:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
