import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';

// ponytail: lazy init — build-time has no env vars
const getResend = () => new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.NEWSLETTER_FROM || 'onboarding@resend.dev';

// Expresión regular simple para validar formato de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, nombre } = body;

    // 1. Validaciones
    if (!email) {
      return NextResponse.json(
        { error: 'El email es obligatorio.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido.' },
        { status: 400 }
      );
    }

    // 2. Verificar si ya existe
    const suscriptorExistente = await prisma.suscriptores.findUnique({
      where: { email },
    });

    if (suscriptorExistente) {
      // Si existe y está inactivo, lo reactivamos
      if (!suscriptorExistente.estado) {
        await prisma.suscriptores.update({
          where: { id: suscriptorExistente.id },
          data: { estado: true, nombre: nombre || suscriptorExistente.nombre },
        });
        return NextResponse.json(
          { message: '¡Suscripción reactivada con éxito!' },
          { status: 200 }
        );
      }

      // Si ya está activo
      return NextResponse.json(
        { message: 'Este correo ya se encuentra suscrito.' },
        { status: 200 } // Retornamos 200 para que el frontend no lo trate como error crítico
      );
    }

    // 3. Crear nuevo suscriptor
    await prisma.suscriptores.create({
      data: {
        email,
        nombre: nombre || null,
        estado: true,
      },
    });

    // 4. Enviar el correo de bienvenida usando Resend
    try {
      await getResend().emails.send({
        from: fromEmail,
        to: [email],
        subject: '¡Gracias por suscribirte a nuestra información!',
        react: WelcomeEmail({ nombre }) as React.ReactElement,
      });
    } catch (emailError) {
      console.error('Error enviando el correo de bienvenida:', emailError);
      // No bloqueamos la suscripción si falla el correo
    }

    return NextResponse.json(
      { message: '¡Suscripción exitosa!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en /api/newsletter/subscribe:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al procesar la suscripción.' },
      { status: 500 }
    );
  }
}
