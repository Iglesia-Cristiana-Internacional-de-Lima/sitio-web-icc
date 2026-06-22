import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Conectando a Neon DB...");
  try {
    const subs = await prisma.suscriptores.findMany();
    console.log("Suscriptores en BD:", subs);
    
    const eventos = await prisma.evento.findMany();
    console.log("Eventos en BD:", eventos.length);
  } catch (error) {
    console.error("Error consultando BD:", error);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
