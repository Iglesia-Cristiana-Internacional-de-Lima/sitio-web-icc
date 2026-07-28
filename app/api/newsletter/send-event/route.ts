import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { EventNotificationEmail } from '@/components/emails/EventNotificationEmail';

// ponytail: lazy init — build-time has no env vars
const getResend = () => new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.NEWSLETTER_FROM || 'onboarding@resend.dev';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventoId } = body;

    if (!eventoId) {
      return NextResponse.json(
        { error: 'El eventoId es obligatorio.' },
        { status: 400 }
      );
    }

    // 1. Validar que el evento existe y está publicado
    const evento = await prisma.evento.findUnique({
      where: { id: eventoId },
    });

    if (!evento) {
      return NextResponse.json({ error: 'Evento no encontrado.' }, { status: 404 });
    }

    if (!evento.publicado) {
      return NextResponse.json(
        { error: 'El evento no está publicado aún.' },
        { status: 400 }
      );
    }

    // 2. Obtener suscriptores activos
    const suscriptores = await prisma.suscriptores.findMany({
      where: { estado: true },
    });

    if (suscriptores.length === 0) {
      return NextResponse.json(
        { message: 'No hay suscriptores activos para enviar correos.' },
        { status: 200 }
      );
    }

    // 3. Obtener envíos ya realizados para este evento (para no duplicar)
    const enviosPrevios = await prisma.newsletter_envios.findMany({
      where: {
        eventoId: evento.id,
        enviado: true,
      },
      select: { suscriptorId: true },
    });

    const suscriptoresYaEnviados = new Set(enviosPrevios.map((e: { suscriptorId: number }) => e.suscriptorId));

    const suscriptoresPendientes = suscriptores.filter(
      (s: { id: number; email: string }) => !suscriptoresYaEnviados.has(s.id)
    );

    if (suscriptoresPendientes.length === 0) {
      return NextResponse.json(
        { message: 'Ya se ha enviado el correo a todos los suscriptores activos.' },
        { status: 200 }
      );
    }

    // Formatear la fecha del evento
    const formatter = new Intl.DateTimeFormat('es-PE', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'America/Lima',
    });
    const fechaFormateada = formatter.format(evento.fecha);

    // 4. Enviar correos y registrar en base de datos
    let enviosExitosos = 0;
    let enviosFallidos = 0;

    for (const suscriptor of suscriptoresPendientes) {
      try {
        const data = await getResend().emails.send({
          from: fromEmail,
          to: [suscriptor.email],
          subject: `Nuevo Evento: ${evento.titulo}`,
          react: EventNotificationEmail({
            titulo: evento.titulo,
            descripcion: evento.descripcion || '',
            fecha: fechaFormateada,
            ubicacion: evento.ubicacion || 'Por confirmar',
            responsable: evento.responsable || 'Por confirmar',
          }) as React.ReactElement,
        });

        if (data.error) {
           console.error(`Error de Resend al enviar a ${suscriptor.email}:`, data.error);
           throw new Error(data.error.message);
        }

        // Registrar envío exitoso
        await prisma.newsletter_envios.create({
          data: {
            eventoId: evento.id,
            suscriptorId: suscriptor.id,
            enviado: true,
            enviadoAt: new Date(),
          },
        });
        
        enviosExitosos++;
      } catch (err: any) {
        // Registrar envío fallido
        await prisma.newsletter_envios.create({
          data: {
            eventoId: evento.id,
            suscriptorId: suscriptor.id,
            enviado: false,
            error: err.message || 'Error desconocido',
          },
        });
        enviosFallidos++;
      }
    }

    return NextResponse.json({
      message: 'Proceso de envío completado.',
      resultados: {
        totalPendientes: suscriptoresPendientes.length,
        exitosos: enviosExitosos,
        fallidos: enviosFallidos,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Error en /api/newsletter/send-event:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al procesar los envíos.' },
      { status: 500 }
    );
  }
}
