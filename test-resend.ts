import { Resend } from 'resend';
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log("Probando envío con Resend usando la API Key proporcionada...");
  console.log("Email destino: gabriel.vilchez.chota@gmail.com");
  
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gabriel.vilchez.chota@gmail.com',
      subject: 'Prueba de integración Resend',
      html: '<p>Este es un correo de prueba para verificar que la API de Resend funciona.</p>'
    });

    if (data.error) {
      console.error("Resend devolvió un error esperado:", data.error);
    } else {
      console.log("¡Éxito! Resend aceptó el envío. ID del correo:", data.data?.id);
    }
  } catch (error) {
    console.error("Excepción inesperada al conectar con Resend:", error);
  }
}

testEmail();
