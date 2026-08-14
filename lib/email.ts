import { Resend } from "resend";

// ponytail: lazy init — build-time has no env vars
const getResend = () => new Resend(process.env.RESEND_API_KEY);

function hasValidKey(): boolean {
  const k = process.env.RESEND_API_KEY;
  return !!k && k.startsWith("re_") && k.length > 10;
}

// ponytail: prevent XSS in email HTML templates
function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

interface EmailReservaParams {
  nombreUsuario: string;
  contactoUsuario: string;
  nombreLider: string;
  modalidad: string;
  mensaje?: string;
  fechaRegistro: string;
}

/**
 * Envía email de confirmación al usuario
 */
export async function enviarEmailConfirmacion(params: EmailReservaParams) {
  const { nombreUsuario, contactoUsuario, nombreLider, modalidad, mensaje, fechaRegistro } = params;

  if (!contactoUsuario.includes("@")) {
    return { success: false, reason: "contact_is_whatsapp" };
  }

  if (!hasValidKey()) {
    console.warn("RESEND_API_KEY no configurada — email omitido");
    return { success: false, reason: "no_api_key" };
  }

  try {
    const { data, error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM || "Estudios Bíblicos <onboarding@resend.dev>",
      to: contactoUsuario,
      subject: "Confirmación de tu estudio bíblico",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0d0d0d; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .detail { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #0d0d0d; }
            .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
            .value { font-size: 16px; color: #333; margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Reserva Confirmada</h1>
              <p style="margin: 10px 0 0; opacity: 0.8;">Iglesia Cristiana Internacional de Lima</p>
            </div>
            <div class="content">
              <p>Hola <strong>${esc(nombreUsuario)}</strong>,</p>
              <p>Hemos recibido tu solicitud de estudio bíblico. Nos pondremos en contacto contigo en las próximas 24 horas para coordinar la fecha y hora.</p>

              <div class="detail">
                <div class="label">Líder asignado</div>
                <div class="value">${esc(nombreLider)}</div>
              </div>

              <div class="detail">
                <div class="label">Modalidad</div>
                <div class="value" style="text-transform: capitalize;">${esc(modalidad)}</div>
              </div>

              <div class="detail">
                <div class="label">Fecha de registro</div>
                <div class="value">${esc(fechaRegistro)}</div>
              </div>

              ${mensaje ? `
              <div class="detail">
                <div class="label">Tu mensaje</div>
                <div class="value">${esc(mensaje)}</div>
              </div>
              ` : ""}

              <p style="margin-top: 20px;">Si tienes alguna pregunta, no dudes en responder a este correo.</p>

              <div class="footer">
                <p>Iglesia Cristiana Internacional de Lima</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error enviando email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error enviando email:", error);
    return { success: false, error };
  }
}

/**
 * Envía notificación al líder sobre nueva reserva
 */
export async function enviarEmailNotificacionLider(
  emailLider: string,
  params: EmailReservaParams
) {
  const { nombreUsuario, contactoUsuario, modalidad, mensaje, fechaRegistro } = params;

  if (!hasValidKey()) {
    console.warn("RESEND_API_KEY no configurada — notificación al líder omitida");
    return { success: false, reason: "no_api_key" };
  }

  try {
    const { data, error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM || "Estudios Bíblicos <onboarding@resend.dev>",
      to: emailLider,
      subject: `Nueva reserva de estudio bíblico - ${nombreUsuario}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .detail { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #22c55e; }
            .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
            .value { font-size: 16px; color: #333; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Nueva Reserva</h1>
              <p style="margin: 10px 0 0; opacity: 0.8;">Tienes una nueva solicitud de estudio bíblico</p>
            </div>
            <div class="content">
              <div class="detail">
                <div class="label">Nombre</div>
                <div class="value">${esc(nombreUsuario)}</div>
              </div>

              <div class="detail">
                <div class="label">Contacto</div>
                <div class="value">${esc(contactoUsuario)}</div>
              </div>

              <div class="detail">
                <div class="label">Modalidad preferida</div>
                <div class="value" style="text-transform: capitalize;">${esc(modalidad)}</div>
              </div>

              <div class="detail">
                <div class="label">Fecha de solicitud</div>
                <div class="value">${esc(fechaRegistro)}</div>
              </div>

              ${mensaje ? `
              <div class="detail">
                <div class="label">Mensaje del interesado</div>
                <div class="value">${esc(mensaje)}</div>
              </div>
              ` : ""}

              <p style="margin-top: 20px;"><strong>Por favor, contacta a esta persona en las próximas 24 horas.</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error enviando notificación al líder:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error enviando notificación al líder:", error);
    return { success: false, error };
  }
}
