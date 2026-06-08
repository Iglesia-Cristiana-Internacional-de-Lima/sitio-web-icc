import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Obtener todos los líderes activos
export async function GET() {
  try {
    const lideres = await prisma.lider.findMany({
      where: {
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
        rol: true,
        especialidades: true,
        disponibilidad: true,
        ubicacion: true,
        imagen: true,
        bio: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: lideres,
    });
  } catch (error) {
    console.error("Error obteniendo líderes:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo líder (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validaciones
    if (!body.nombre || !body.rol) {
      return NextResponse.json(
        { error: "Nombre y rol son requeridos" },
        { status: 400 }
      );
    }

    const lider = await prisma.lider.create({
      data: {
        nombre: body.nombre,
        rol: body.rol,
        especialidades: body.especialidades || [],
        disponibilidad: body.disponibilidad || "Por definir",
        ubicacion: body.ubicacion || "Por definir",
        imagen: body.imagen || null,
        bio: body.bio || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: lider,
    });
  } catch (error) {
    console.error("Error creando líder:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
