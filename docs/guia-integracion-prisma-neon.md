# Guía de Integración al Proyecto: Iglesia Cristiana Internacional Lima

## 1. Estructura de Carpetas

```
iglesia-lima/
├── app/                    # Páginas de Next.js (App Router)
│   ├── page.tsx           # Página principal (Home)
│   ├── layout.tsx         # Layout global
│   ├── globals.css        # Estilos globales
│   ├── estudios/          # Sección de estudios bíblicos
│   ├── eventos/           # Sección de eventos
│   ├── mercy/             # Sección del ministerio Mercy
│   └── ministerios/
│       └── universitarios/  # Ministerio Evolution (jóvenes)
│
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx         # Barra de navegación
│   ├── Footer.tsx         # Pie de página
│   ├── Hero.tsx           # Sección hero principal
│   ├── Sedes.tsx          # Ubicaciones de la iglesia
│   └── ...otros
│
├── public/                # Archivos estáticos (imágenes, iconos)
├── package.json           # Dependencias del proyecto
├── tailwind.config.mjs    # Configuración de Tailwind CSS
└── tsconfig.json          # Configuración de TypeScript
```

**Stack actual:**
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS** (estilos)
- **Framer Motion** (animaciones)

---

## 2. Instalar Prisma (ORM para Base de Datos)

**Paso 1: Instalar dependencias**
```bash
npm install prisma --save-dev
npm install @prisma/client
```

**Paso 2: Inicializar Prisma**
```bash
npx prisma init
```

Esto crea:
- `prisma/schema.prisma` - Define tus modelos/tablas
- `.env` - Variables de entorno (conexión a BD)

**Paso 3: Configurar el schema** (`prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Ejemplo de modelo
model Miembro {
  id        Int      @id @default(autoincrement())
  nombre    String
  email     String   @unique
  telefono  String?
  createdAt DateTime @default(now())
}
```

---

## 3. Conectar con Neon Database

**Neon** es una base de datos PostgreSQL serverless en la nube.

**Paso 1: Crear cuenta y proyecto en Neon**
1. Ir a [neon.tech](https://neon.tech)
2. Crear cuenta (puede ser con GitHub)
3. Crear un nuevo proyecto

**Paso 2: Obtener la cadena de conexión**
En el dashboard de Neon, copiar la **Connection String**. Se ve así:
```
postgresql://usuario:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Paso 3: Configurar `.env`**
```env
DATABASE_URL="postgresql://usuario:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**Paso 4: Crear las tablas en Neon**
```bash
npx prisma db push
```

**Paso 5: Generar el cliente de Prisma**
```bash
npx prisma generate
```

---

## 4. Usar Prisma en el código

Crear un archivo `lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

Usar en una API route o Server Component:
```typescript
import { prisma } from '@/lib/prisma'

// Obtener miembros
const miembros = await prisma.miembro.findMany()

// Crear miembro
await prisma.miembro.create({
  data: { nombre: "Juan", email: "juan@email.com" }
})
```

---

## 5. Comandos útiles de Prisma

| Comando | Descripción |
|---------|-------------|
| `npx prisma studio` | Abre interfaz visual para ver/editar datos |
| `npx prisma db push` | Sincroniza schema con la BD |
| `npx prisma migrate dev` | Crea migraciones (para producción) |
| `npx prisma generate` | Regenera el cliente después de cambios |

---

## Resumen del flujo

```
1. npm install prisma @prisma/client
2. npx prisma init
3. Configurar DATABASE_URL en .env (de Neon)
4. Definir modelos en schema.prisma
5. npx prisma db push (crea tablas)
6. npx prisma generate (genera cliente)
7. Usar prisma en el código
```

---

Si tienes dudas, puedes ejecutar `npx prisma studio` para ver la base de datos visualmente.
