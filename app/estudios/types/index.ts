// Tipos para el módulo de Estudios Bíblicos

// Líder con campos en español (desde API/DB)
export interface LiderAPI {
  id: number;
  nombre: string;
  rol: string;
  especialidades: string[];
  disponibilidad: string;
  ubicacion: string;
  imagen: string | null;
  bio: string | null;
}

// Líder normalizado para el componente (compatibilidad)
export interface Lider {
  id: number;
  name: string;
  role: string;
  specialties: string[];
  availability: string;
  location: string;
  img: string;
  bio: string;
}

export type Modalidad = "presencial" | "online" | null;

export interface ReservaFormData {
  nombre: string;
  contacto: string;
  modalidad: Modalidad;
  mensaje: string;
  liderId: number | null;
}

export interface FormErrors {
  nombre?: string;
  contacto?: string;
  modalidad?: string;
}

export interface ReservaConfirmacion {
  success: boolean;
  lider: Lider;
  formData: ReservaFormData;
  fechaRegistro: string;
  whatsappLink?: string;
  emailEnviado?: boolean;
}

// Respuesta de la API de reserva
export interface ReservaAPIResponse {
  success: boolean;
  data?: {
    reservaId: number;
    lider: {
      id: number;
      nombre: string;
      rol: string;
    };
    modalidad: string;
    fechaRegistro: string;
    emailEnviado: boolean;
    whatsappLink: string;
  };
  error?: string;
}

// Helper para convertir LiderAPI a Lider
export function normalizarLider(liderApi: LiderAPI): Lider {
  return {
    id: liderApi.id,
    name: liderApi.nombre,
    role: liderApi.rol,
    specialties: liderApi.especialidades,
    availability: liderApi.disponibilidad,
    location: liderApi.ubicacion,
    img: liderApi.imagen || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: liderApi.bio || "",
  };
}
