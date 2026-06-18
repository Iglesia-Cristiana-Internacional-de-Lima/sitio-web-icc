import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Obtener todos los líderes activos
export async function GET() {
  try {
    const lideres = await prisma.usuario.findMany({
      where: {
        rol: { nombre: "LIDER" },
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
        titulo: true,
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

    // ponytail: map titulo->rol for frontend compat
    const data = lideres.map((l) => ({ ...l, rol: l.titulo }));

    return NextResponse.json({ success: true, data });
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

    if (!body.nombre || !body.email) {
      return NextResponse.json(
        { error: "Nombre y email son requeridos" },
        { status: 400 }
      );
    }

    const rolLider = await prisma.rol.findUnique({ where: { nombre: "LIDER" } });
    if (!rolLider) {
      return NextResponse.json(
        { error: "Rol LIDER no configurado" },
        { status: 500 }
      );
    }

    const lider = await prisma.usuario.create({
      data: {
        email: body.email,
        nombre: body.nombre,
        rolId: rolLider.id,
        titulo: body.titulo || null,
        especialidades: body.especialidades || [],
        disponibilidad: body.disponibilidad || "Por definir",
        ubicacion: body.ubicacion || "Por definir",
        imagen: body.imagen || null,
        bio: body.bio || null,
      },
    });

    return NextResponse.json({ success: true, data: lider });
  } catch (error) {
    console.error("Error creando líder:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
