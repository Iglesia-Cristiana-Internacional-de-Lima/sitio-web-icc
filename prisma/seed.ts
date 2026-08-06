import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { scryptSync, randomBytes } from "crypto";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SCRYPT_KEYLEN = 64;
const SCRYPT_COST = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_COST).toString("hex")}`;
};

const rolesIniciales = [
  { nombre: "ADMIN", descripcion: "Administrador con acceso total" },
  { nombre: "LIDER", descripcion: "Líder de estudios bíblicos y ministerios" },
  { nombre: "MIEMBRO", descripcion: "Miembro registrado de la iglesia" },
];

const suscriptoresIniciales = [
  { email: "juan.perez@gmail.com", nombre: "Juan Pérez" },
  { email: "maria.garcia@gmail.com", nombre: "María García" },
  { email: "carlos.lopez@hotmail.com", nombre: null },
];

const sedesIniciales = [
  { nombre: "Lima Centro", direccion: "Av. Garcilaso de la Vega 1234", distrito: "Cercado de Lima", horario: "Domingos · 10:00 am · 6:00 pm", lat: -12.0464, lng: -77.0428 },
  { nombre: "Miraflores", direccion: "Av. Larco 980", distrito: "Miraflores", horario: "Domingos · 11:00 am", lat: -12.1191, lng: -77.0311 },
  { nombre: "San Isidro", direccion: "Av. Javier Prado Este 456", distrito: "San Isidro", horario: "Domingos · 10:30 am", lat: -12.0977, lng: -77.0365 },
  { nombre: "La Molina", direccion: "Av. La Universidad 1820", distrito: "La Molina", horario: "Domingos · 11:00 am", lat: -12.0867, lng: -76.9356 },
  { nombre: "San Borja", direccion: "Av. Aviación 2350", distrito: "San Borja", horario: "Domingos · 10:00 am", lat: -12.1019, lng: -77.0030 },
  { nombre: "Surco", direccion: "Av. Caminos del Inca 1670", distrito: "Santiago de Surco", horario: "Domingos · 10:30 am · 6:30 pm", lat: -12.1328, lng: -76.9908 },
];

const ministeriosIniciales = [
  { nombre: "Universitarios", slug: "universitarios", descripcion: "Para los que están descubriendo todo. Reuniones en campus y sedes.", icono: "18 — 24", imagen: "/images/evolution-lima/ev-foto-1.jpg", orden: 1 },
  { nombre: "Profesionales", slug: "profesionales", descripcion: "Vida real, presión real, fe real. Networking con propósito.", icono: "25 — 35", imagen: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80", orden: 2 },
  { nombre: "Casados", slug: "casados", descripcion: "Construir un matrimonio que dure. Sin frases hechas.", icono: "Matrimonios", imagen: "https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=800&q=80", orden: 3 },
];

const lideresIniciales = [
  {
    email: "andres.mendoza@iglesia.pe",
    nombre: "Andrés Mendoza",
    titulo: "Pastor Principal",
    especialidades: ["Fe y trabajo", "Matrimonio", "Liderazgo"],
    disponibilidad: "Lunes a Viernes",
    ubicacion: "Lima Centro / Online",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "20 años acompañando personas en su camino de fe. Especializado en integrar la fe con la vida profesional.",
  },
  {
    email: "lucia.reyes@iglesia.pe",
    nombre: "Lucía Reyes",
    titulo: "Pastora · San Isidro",
    especialidades: ["Mujeres", "Familia", "Crecimiento espiritual"],
    disponibilidad: "Martes, Jueves, Sábados",
    ubicacion: "San Isidro / Miraflores / Online",
    imagen: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    bio: "Apasionada por el discipulado de mujeres. Conversaciones honestas sobre fe, identidad y propósito.",
  },
  {
    email: "daniel.quispe@iglesia.pe",
    nombre: "Daniel Quispe",
    titulo: "Pastor · Miraflores",
    especialidades: ["Jóvenes profesionales", "Dudas de fe", "Apologética"],
    disponibilidad: "Miércoles a Sábados",
    ubicacion: "Miraflores / La Molina / Online",
    imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bio: "Ingeniero de formación. Experto en abordar preguntas difíciles sobre fe, ciencia y razón.",
  },
  {
    email: "maria.torres@iglesia.pe",
    nombre: "María Torres",
    titulo: "Líder de Ministerios",
    especialidades: ["Universitarios", "Transiciones de vida", "Vocación"],
    disponibilidad: "Lunes, Miércoles, Viernes",
    ubicacion: "San Borja / Surco / Online",
    imagen: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    bio: "Acompañando a jóvenes en sus primeros pasos de fe y grandes decisiones de vida.",
  },
  {
    email: "carlos.salazar@iglesia.pe",
    nombre: "Carlos Salazar",
    titulo: "Pastor · Surco",
    especialidades: ["Hombres", "Paternidad", "Finanzas y fe"],
    disponibilidad: "Martes, Jueves, Sábados",
    ubicacion: "Surco / La Molina / Online",
    imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    bio: "Conversaciones prácticas para hombres sobre lo que realmente importa.",
  },
  {
    email: "patricia.vega@iglesia.pe",
    nombre: "Patricia Vega",
    titulo: "Líder · Eventos",
    especialidades: ["Primera vez", "Exploración de fe", "Comunidad"],
    disponibilidad: "Flexible",
    ubicacion: "Todas las sedes / Online",
    imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    bio: "Especializada en acompañar a personas que están conociendo la fe por primera vez.",
  },
];

async function main() {
  console.log("Iniciando seed de la base de datos...");

  // Limpiar datos existentes
  await prisma.reserva.deleteMany();
  await prisma.evento.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.rol.deleteMany();
  await prisma.sede.deleteMany();
  await prisma.ministerio.deleteMany();
  await prisma.campanaEmail.deleteMany();
  await prisma.suscriptores.deleteMany();

  console.log("Creando roles...");
  for (const rol of rolesIniciales) {
    await prisma.rol.create({ data: rol });
    console.log(`  ✓ Rol: ${rol.nombre}`);
  }

  // Obtener rol LIDER
  const rolLider = await prisma.rol.findUnique({ where: { nombre: "LIDER" } });
  if (!rolLider) throw new Error("Rol LIDER no encontrado");

  console.log("Creando líderes...");
  for (const lider of lideresIniciales) {
    // Password = primer nombre sin tildes en minúscula + "123"
    const password = lider.nombre
      .split(" ")[0]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") + "123";
    const created = await prisma.usuario.create({
      data: { ...lider, rolId: rolLider.id, passwordHash: hashPassword(password) },
    });
    console.log(`  ✓ Creado: ${created.nombre} (${lider.email} / ${password})`);
  }

  // Crear admin de prueba
  const rolAdmin = await prisma.rol.findUnique({ where: { nombre: "ADMIN" } });
  if (rolAdmin) {
    await prisma.usuario.create({
      data: {
        email: "admin@iglesia.pe",
        nombre: "Administrador",
        passwordHash: hashPassword("admin123"),
        rolId: rolAdmin.id,
      },
    });
    console.log("  ✓ Admin: admin@iglesia.pe / admin123");
  }

  // Crear sedes
  console.log("Creando sedes...");
  for (const sede of sedesIniciales) {
    await prisma.sede.create({ data: sede });
    console.log(`  ✓ Sede: ${sede.nombre}`);
  }

  // Crear ministerios
  console.log("Creando ministerios...");
  for (const ministerio of ministeriosIniciales) {
    await prisma.ministerio.create({ data: ministerio });
    console.log(`  ✓ Ministerio: ${ministerio.nombre}`);
  }

  // Crear eventos de ejemplo
  console.log("Creando eventos...");
  const sedeLimaCentro = await prisma.sede.findFirst({ where: { nombre: "Lima Centro" } });
  if (sedeLimaCentro) {
    await prisma.evento.create({
      data: {
        titulo: "Servicio Dominical",
        descripcion: "Adoración, mensaje práctico y comunidad. El corazón de nuestra semana.",
        fecha: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // próximo domingo
        horaInicio: "10:00",
        horaFin: "12:00",
        sedeId: sedeLimaCentro.id,
        destacado: true,
      },
    });
    console.log("  ✓ Evento: Servicio Dominical");
  }

  // Crear suscriptores de ejemplo
  console.log("Creando suscriptores...");
  for (const suscriptor of suscriptoresIniciales) {
    await prisma.suscriptores.create({ data: suscriptor });
    console.log(`  ✓ Suscriptor: ${suscriptor.email}`);
  }

  console.log("\nSeed completado!");
  console.log(`Roles: ${rolesIniciales.length}, Líderes: ${lideresIniciales.length}, Sedes: ${sedesIniciales.length}, Ministerios: ${ministeriosIniciales.length}, Suscriptores: ${suscriptoresIniciales.length}`);
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
