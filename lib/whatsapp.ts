/**
 * Genera un link de WhatsApp con mensaje pre-configurado
 */
export function generarLinkWhatsApp(params: {
  numero: string;
  nombreUsuario: string;
  nombreLider: string;
  modalidad: string;
}): string {
  const { numero, nombreUsuario, nombreLider, modalidad } = params;

  // Limpiar número (remover espacios, guiones, paréntesis)
  const numeroLimpio = numero.replace(/[\s\-\(\)\+]/g, "");

  // Crear mensaje
  const mensaje = `Hola! Soy ${nombreUsuario}. Acabo de reservar un estudio bíblico con ${nombreLider} en modalidad ${modalidad}. Quedo atento/a a la coordinación.`;

  // Codificar mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensaje);

  return `https://wa.me/${numeroLimpio}?text=${mensajeCodificado}`;
}

/**
 * Genera un link de WhatsApp para contactar directamente al líder
 */
export function generarLinkWhatsAppLider(params: {
  numeroLider: string;
  nombreUsuario: string;
  modalidad: string;
  mensaje?: string;
}): string {
  const { numeroLider, nombreUsuario, modalidad, mensaje } = params;

  const numeroLimpio = numeroLider.replace(/[\s\-\(\)\+]/g, "");

  let textoMensaje = `Hola! Soy ${nombreUsuario}. Me gustaría agendar un estudio bíblico en modalidad ${modalidad}.`;

  if (mensaje) {
    textoMensaje += `\n\nMi interés: ${mensaje}`;
  }

  const mensajeCodificado = encodeURIComponent(textoMensaje);

  return `https://wa.me/${numeroLimpio}?text=${mensajeCodificado}`;
}
