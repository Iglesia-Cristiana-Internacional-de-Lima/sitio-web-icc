import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

// FUNCIÓN DE INTELIGENCIA: Limpia el texto
function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!]/g, "") 
    .trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.message) {
      return NextResponse.json({ reply: "¡Hola! ¿En qué te puedo colaborar el día de hoy?" });
    }

    const msg = normalizarTexto(body.message);

    // MENU POR DEFECTO
    let botReply = `No estoy completamente seguro de cómo responder a eso, pero quiero ayudarte. Aquí tienes las opciones más buscadas:\n\n` +
      `🙏 *Horarios:* Escribe "horarios"\n` +
      `📍 *Ubicación:* Escribe "ubicación"\n` +
      `📖 *Estudios Bíblicos:* Escribe "estudios"\n` +
      `👶 *Cuidado de Niños:* Escribe "niños"\n` +
      `📌 *Actividades:* Escribe "eventos"\n\n` +
      `¿Qué te gustaría consultar?`;

    // 1. SALUDOS
    if (["hola", "buenos dias", "buenas tardes", "buenas noches", "saludos", "que tal", "alo", "hi", "bendiciones"].some(k => msg.includes(k))) {
      botReply = "¡Hola! Te damos una calurosa bienvenida al asistente virtual de la Iglesia. Estoy aquí para ayudarte a encontrar horarios, ubicación, cuidado de niños o conectarte con un grupo de estudio bíblico. ¿En qué te puedo ayudar?";
    }
    
    // 2. AGRADECIMIENTOS
    else if (["gracias", "excelente", "perfecto", "adios", "chao", "nos vemos", "bye", "amen", "listo"].some(k => msg.includes(k))) {
      botReply = "¡A ti! Que el Señor te bendiga grandemente. ¡Te esperamos en nuestras reuniones!";
    }

    // 3. UBICACIÓN Y SEDES
    else if (["ubicacion", "direccion", "donde", "queda", "mapa", "sede", "lima", "llegar", "ubica", "cercana"].some(k => msg.includes(k))) {
      botReply = "📍 *Nuestra Ubicación:* Nuestras reuniones generales se realizan en la Sede Central ubicada en [INSERTA AQUÍ LA DIRECCIÓN EXACTA]. ¡Estaremos felices de recibirte!";
    }

    // 4. HORARIOS (Actualizado con Domingos, Viernes y Miércoles)
    else if (["horario", "servicio", "culto", "reunion", "hora", "domingo", "miercoles", "viernes", "cuando", "dias"].some(k => msg.includes(k))) {
      botReply = "🙏 *Nuestros Horarios de Reunión:*\n\n" +
        "• *Domingos:* 9:00 AM y 11:30 AM\n" +
        "• *Miércoles:* [INSERTA HORA, ej. 7:30 PM]\n" +
        "• *Viernes:* [INSERTA HORA, ej. 7:30 PM]\n\n" +
        "Todas nuestras reuniones son en nuestra Sede Central. Te sugerimos llegar 15 minutos antes para ubicarte cómodamente.";
    }

    // 5. NUEVO: CUIDADO DE NIÑOS
    else if (["niño", "niños", "infantil", "cuidado", "guarderia", "hijo", "hijos", "pequeño", "pequeños", "bebe", "bebes"].some(k => msg.includes(k))) {
      botReply = "👶 *Cuidado de Niños:*\n\n" +
        "¡Sí! Contamos con cuidado de niños y clases especiales para ellos, pero **solo están disponibles durante nuestras reuniones de los Domingos**.\n\n" +
        "Tus pequeños estarán en un ambiente seguro, aprendiendo y divirtiéndose mientras tú disfrutas del servicio tranquilamente.";
    }

    // 6. ESTUDIOS BÍBLICOS (Actualizado con disponibilidad del usuario)
    else if (["estudio", "biblico", "lider", "aprender", "discipulado", "grupo", "pastor", "clase", "enseña", "reservar", "agendar"].some(k => msg.includes(k))) {
      try {
        const lideres = await prisma.lider.findMany({
          where: { activo: true },
          take: 3
        });

        if (lideres.length > 0) {
          botReply = "📖 *Estudios Bíblicos*\n\n" +
            "Contamos con líderes preparados para guiarte. **Lo mejor es que tú agendas el día y la hora de acuerdo a tu disponibilidad.**\n\n" +
            "Algunos de nuestros líderes son:\n" +
            lideres.map((l: any) => `👤 *${l.nombre}* (${l.rol})`).join('\n') +
            "\n\n👉 Para elegir tu horario y agendar tu primera reunión, ve a la sección de *'Estudios'* en nuestra página.";
        } else {
          botReply = "📖 *Estudios Bíblicos*\n\nTenemos grupos disponibles y **tú puedes agendar el día y la hora de acuerdo a tu disponibilidad**. Ve a la sección de *'Estudios'* en nuestra página para coordinarlo.";
        }
      } catch (dbError) {
        console.error("Error al buscar líderes en Neon:", dbError);
        botReply = "📖 *Estudios Bíblicos*\n\nContamos con grupos donde **tú agendas el día y la hora según tu disponibilidad**. Ingresa a la sección de *'Estudios'* de nuestra página web para reservar tu espacio.";
      }
    }

    // 7. EVENTOS
    else if (["evento", "actividad", "proximo", "calendario", "mes", "semana", "campamento", "retiro", "conferencia", "hacer"].some(k => msg.includes(k))) {
      try {
        const eventos = await prisma.evento.findMany({
          take: 3,
          orderBy: { fecha: 'asc' }
        });

        if (eventos.length > 0) {
          botReply = "📌 *Próximos Eventos:*\n\n" +
            eventos.map((e: any) => {
              const fecha = e.fecha ? new Date(e.fecha).toLocaleDateString('es-PE', { day: 'numeric', month: 'long' }) : 'Próximamente';
              return `• *${e.titulo}*\n🗓️ Fecha: ${fecha}`;
            }).join('\n\n') +
            "\n\nMira todos los detalles en la sección de *'Eventos'*.";
        } else {
          botReply = "📌 Por ahora no tenemos eventos especiales, pero te invitamos a sumarte a nuestras reuniones de Domingo, Miércoles y Viernes.";
        }
      } catch (dbError) {
        console.error("Error al buscar eventos en Neon:", dbError);
        botReply = "📌 Tenemos actividades programadas constantemente. Revisa la cartelera en la pestaña de *'Eventos'* en el menú principal.";
      }
    }

    // 8. DONACIONES
    else if (["ofrenda", "diezmo", "donar", "donacion", "cuenta", "banco", "apoyar", "aportar", "yape", "plin"].some(k => msg.includes(k))) {
      botReply = "💳 *Aportes y Ofrendas:*\n\n" +
        "Contamos con Yape, Plin y transferencias. Toda la información está en la sección de donaciones de nuestra web. ¡Gracias por tu apoyo!";
    }

    return NextResponse.json({ reply: botReply });

  } catch (error: any) {
    console.error("🔥 ERROR CRÍTICO GENERAL:", error.message);
    return NextResponse.json({ 
      reply: "¡Hola! Estoy en mantenimiento temporal. Por favor, usa el botón de WhatsApp para comunicarte directamente con nosotros." 
    });
  }
}