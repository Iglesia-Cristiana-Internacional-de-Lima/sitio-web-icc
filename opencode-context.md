# Contexto del Proyecto: Iglesia Cristiana Internacional Lima

## Stack Tecnológico
- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS.
- ORM: Prisma conectado a Neon Database (PostgreSQL).
- Colores Corporativos: Fondo gris oscuro (`#0d0d0d`), tarjetas/componentes gris claro (`#191919`), texto blanco (`#ffffff`).

## Mi Asignación: ÉPICA 4 - EVENTOS
Soy el encargado de desarrollar por completo la gestión y visualización de eventos del sitio web.

### Requerimientos de la Épica (PB-016 a PB-019):
- **PB-016 (Gestión de Eventos):** CRUD completo (Crear, editar, eliminar y publicar eventos). Nota: Esto va en las rutas protegidas del CMS/Panel Administrativo según los roles.
- **PB-017 (Listado de Eventos):** Vista pública directa al contenido (SIN HERO). Debe incluir filtros para: Servicios dominicales, Reuniones ministeriales, Devocionales universitarios, Charlas bíblicas para gente nueva y Actividades especiales. *REGLA: Excluir totalmente el contenido de Mercy.*
- **PB-018 (Detalle de Evento):** Al hacer clic en un evento, mostrar información completa (Ubicación, Fecha, Hora, Responsable, Descripción).
- **PB-019 (Mapa de Charlas Bíblicas):** Integración con Google Maps para geolocalización de las sedes y charlas usando coordenadas (`latitud` y `longitud`).

### Modelo Prisma Sincronizado:
```prisma
model Evento {
  id          String   @id @default(uuid())
  titulo      String
  descripcion String
  fecha       DateTime
  ubicacion   String
  latitud     Float?
  longitud    Float?
  responsable String
  tipo        String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}