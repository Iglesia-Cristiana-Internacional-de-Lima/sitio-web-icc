// Validaciones para el formulario de reserva de estudios bíblicos

import type { ReservaFormData, FormErrors, Lider } from "../types";

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida un número de WhatsApp peruano
 * Formatos aceptados: +51999999999, 51999999999, 999999999
 */
export function isValidWhatsApp(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const whatsappRegex = /^(\+?51)?9\d{8}$/;
  return whatsappRegex.test(cleaned);
}

/**
 * Valida si el contacto es email o WhatsApp válido
 */
export function isValidContacto(contacto: string): boolean {
  return isValidEmail(contacto) || isValidWhatsApp(contacto);
}

/**
 * Valida el formulario completo de reserva
 */
export function validateReservaForm(data: ReservaFormData): FormErrors {
  const errors: FormErrors = {};

  // Validar nombre
  if (!data.nombre.trim()) {
    errors.nombre = "El nombre es requerido";
  } else if (data.nombre.trim().length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  // Validar contacto
  if (!data.contacto.trim()) {
    errors.contacto = "El correo o WhatsApp es requerido";
  } else if (!isValidContacto(data.contacto.trim())) {
    errors.contacto = "Ingresa un correo válido o WhatsApp (ej: +51 999 999 999)";
  }

  // Validar modalidad
  if (!data.modalidad) {
    errors.modalidad = "Selecciona una modalidad";
  }

  return errors;
}

/**
 * Verifica si el formulario tiene errores
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Asigna automáticamente un líder basado en disponibilidad
 * Criterio: Selecciona aleatoriamente entre los disponibles
 * (En producción, esto consultaría la carga real de cada líder)
 */
export function asignarLiderAutomatico(lideres: Lider[]): Lider {
  // Filtrar líderes con disponibilidad flexible o amplia
  const lideresDisponibles = lideres.filter(
    (l) => l.availability.toLowerCase().includes("flexible") ||
           l.availability.split(",").length >= 2 ||
           l.availability.includes("a")
  );

  const pool = lideresDisponibles.length > 0 ? lideresDisponibles : lideres;
  const randomIndex = Math.floor(Math.random() * pool.length);

  return pool[randomIndex];
}
