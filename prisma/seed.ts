import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const lideresIniciales = [
  {
    nombre: "Andrés Mendoza",
    rol: "Pastor Principal",
    especialidades: ["Fe y trabajo", "Matrimonio", "Liderazgo"],
    disponibilidad: "Lunes a Viernes",
    ubicacion: "Lima Centro / Online",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "20 años acompañando personas en su camino de fe. Especializado en integrar la fe con la vida profesional.",
  },
  {
    nombre: "Lucía Reyes",
    rol: "Pastora · San Isidro",
    especialidades: ["Mujeres", "Familia", "Crecimiento espiritual"],
    disponibilidad: "Martes, Jueves, Sábados",
    ubicacion: "San Isidro / Miraflores / Online",
    imagen: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    bio: "Apasionada por el discipulado de mujeres. Conversaciones honestas sobre fe, identidad y propósito.",
  },
  {
    nombre: "Daniel Quispe",
    rol: "Pastor · Miraflores",
    especialidades: ["Jóvenes profesionales", "Dudas de fe", "Apologética"],
    disponibilidad: "Miércoles a Sábados",
    ubicacion: "Miraflores / La Molina / Online",
    imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bio: "Ingeniero de formación. Experto en abordar preguntas difíciles sobre fe, ciencia y razón.",
  },
  {
    nombre: "María Torres",
    rol: "Líder de Ministerios",
    especialidades: ["Universitarios", "Transiciones de vida", "Vocación"],
    disponibilidad: "Lunes, Miércoles, Viernes",
    ubicacion: "San Borja / Surco / Online",
    imagen: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    bio: "Acompañando a jóvenes en sus primeros pasos de fe y grandes decisiones de vida.",
  },
  {
    nombre: "Carlos Salazar",
    rol: "Pastor · Surco",
    especialidades: ["Hombres", "Paternidad", "Finanzas y fe"],
    disponibilidad: "Martes, Jueves, Sábados",
    ubicacion: "Surco / La Molina / Online",
    imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    bio: "Conversaciones prácticas para hombres sobre lo que realmente importa.",
  },
  {
    nombre: "Patricia Vega",
    rol: "Líder · Eventos",
    especialidades: ["Primera vez", "Exploración de fe", "Comunidad"],
    disponibilidad: "Flexible",
    ubicacion: "Todas las sedes / Online",
    imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    bio: "Especializada en acompañar a personas que están conociendo la fe por primera vez.",
  },
];

async function main() {
  console.log("Iniciando seed de la base de datos...");

  // Limpiar datos existentes (opcional, comentar en producción)
  await prisma.reserva.deleteMany();
  await prisma.lider.deleteMany();

  console.log("Creando líderes...");

  for (const lider of lideresIniciales) {
    const created = await prisma.lider.create({
      data: lider,
    });
    console.log(`  ✓ Creado: ${created.nombre}`);
  }

  console.log("\nSeed completado exitosamente!");
  console.log(`Total de líderes creados: ${lideresIniciales.length}`);
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
