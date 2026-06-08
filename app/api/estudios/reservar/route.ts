import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { enviarEmailConfirmacion } from "@/lib/email";
import { generarLinkWhatsApp } from "@/lib/whatsapp";

// Tipos para la solicitud
interface ReservaRequest {
  nombre: string;
  contacto: string;
  modalidad: "presencial" | "online";
  mensaje?: string;
  liderId: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: ReservaRequest = await request.json();

    // Validaciones básicas
    if (!body.nombre || body.nombre.trim().length < 2) {
      return NextResponse.json(
        { error: "El nombre es requerido (mínimo 2 caracteres)" },
        { status: 400 }
      );
    }

    if (!body.contacto || body.contacto.trim().length < 5) {
      return NextResponse.json(
        { error: "El contacto es requerido" },
        { status: 400 }
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

    // Verificar que el líder existe
    const lider = await prisma.lider.findUnique({
      where: { id: body.liderId },
    });

    if (!lider) {
      return NextResponse.json(
        { error: "El líder seleccionado no existe" },
        { status: 404 }
      );
    }

    // Crear la reserva
    const reserva = await prisma.reserva.create({
      data: {
        nombre: body.nombre.trim(),
        contacto: body.contacto.trim(),
        modalidad: body.modalidad.toUpperCase() as "PRESENCIAL" | "ONLINE",
        mensaje: body.mensaje?.trim() || null,
        liderId: body.liderId,
      },
      include: {
        lider: true,
      },
    });

    // Generar fecha legible
    const fechaRegistro = new Date().toLocaleDateString("es-PE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Enviar email de confirmación (si el contacto es email)
    let emailEnviado = false;
    if (body.contacto.includes("@")) {
      const resultadoEmail = await enviarEmailConfirmacion({
        nombreUsuario: body.nombre,
        contactoUsuario: body.contacto,
        nombreLider: lider.nombre,
        modalidad: body.modalidad,
        mensaje: body.mensaje,
        fechaRegistro,
      });
      emailEnviado = resultadoEmail.success;

      // Actualizar estado de email en la reserva
      if (emailEnviado) {
        await prisma.reserva.update({
          where: { id: reserva.id },
          data: { emailEnviado: true },
        });
      }
    }

    // Generar link de WhatsApp
    const whatsappLink = generarLinkWhatsApp({
      numero: process.env.WHATSAPP_NUMERO || "51999999999",
      nombreUsuario: body.nombre,
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
          rol: lider.rol,
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
            rol: true,
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
