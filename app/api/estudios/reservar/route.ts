import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { enviarEmailConfirmacion } from "@/lib/email";
import { generarLinkWhatsApp } from "@/lib/whatsapp";
import { getSession } from "@/lib/auth";

interface ReservaRequest {
  modalidad: "presencial" | "online";
  mensaje?: string;
  liderId: number;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body: ReservaRequest = await request.json();

    // Auth requerida
    if (!session) {
      return NextResponse.json(
        { error: "Debes iniciar sesión para reservar" },
        { status: 401 }
      );
    }

    if (!body.modalidad || !["presencial", "online"].includes(body.modalidad)) {
      return NextResponse.json(
        { error: "La modalidad debe ser 'presencial' u 'online'" },
        { status: 400 }
      );
    }

    if (!body.liderId) {
      return NextResponse.json(
        { error: "Debe seleccionar un líder" },
        { status: 400 }
      );
    }

    const lider = await prisma.usuario.findFirst({
      where: { id: body.liderId, rol: { nombre: "LIDER" }, activo: true },
    });

    if (!lider) {
      return NextResponse.json(
        { error: "El líder seleccionado no existe" },
        { status: 404 }
      );
    }

    const reserva = await prisma.reserva.create({
      data: {
        solicitanteId: session.id,
        modalidad: body.modalidad.toUpperCase() as "PRESENCIAL" | "ONLINE",
        mensaje: body.mensaje?.trim() || null,
        liderId: body.liderId,
      },
      include: {
        lider: true,
        solicitante: true,
      },
    });

    const fechaRegistro = new Date().toLocaleDateString("es-PE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Email de confirmación al usuario autenticado
    let emailEnviado = false;
    const resultadoEmail = await enviarEmailConfirmacion({
      nombreUsuario: session.nombre,
      contactoUsuario: session.email,
      nombreLider: lider.nombre,
      modalidad: body.modalidad,
      mensaje: body.mensaje,
      fechaRegistro,
    });
    emailEnviado = resultadoEmail.success;

    if (emailEnviado) {
      await prisma.reserva.update({
        where: { id: reserva.id },
        data: { emailEnviado: true },
      });
    }

    const whatsappLink = generarLinkWhatsApp({
      numero: process.env.WHATSAPP_NUMERO || "51999999999",
      nombreUsuario: session.nombre,
      nombreLider: lider.nombre,
      modalidad: body.modalidad,
    });

    return NextResponse.json({
      success: true,
      data: {
        reservaId: reserva.id,
        lider: {
          id: lider.id,
          nombre: lider.nombre,
          rol: lider.titulo,
        },
        modalidad: body.modalidad,
        fechaRegistro,
        emailEnviado,
        whatsappLink,
      },
    });
  } catch (error) {
    console.error("Error creando reserva:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Obtener reservas (para admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get("estado");
    const liderId = searchParams.get("liderId");

    const where: Record<string, unknown> = {};

    if (estado) {
      where.estado = estado.toUpperCase();
    }

    if (liderId) {
      where.liderId = parseInt(liderId);
    }

    const reservas = await prisma.reserva.findMany({
      where,
      include: {
        lider: {
          select: {
            id: true,
            nombre: true,
            titulo: true,
          },
        },
        solicitante: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: reservas,
    });
  } catch (error) {
    console.error("Error obteniendo reservas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
