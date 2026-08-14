# Iglesia Cristiana Internacional de Lima

Aplicación web Next.js 16 + React 19 + Tailwind CSS para la familia de iglesias en Lima.

## Filosofía de diseño

- **Minimalista premium**: paleta neutra (`#0d0d0d`, `#191919`, `#ffffff`)
- **Editorial**: tipografía display Fraunces + sans Inter + mono JetBrains
- **Cinematográfico**: video de fondo en hero, transiciones suaves
- **Identidad sonora**: ondas de sonido animadas como elemento de marca
- **Tono de voz**: directo, sin rodeos, no suena a IA

## Estructura

```
app/
  layout.tsx          → tipografías + metadata
  page.tsx            → home (compone todos los bloques)
  globals.css         → variables, ondas de sonido, marquee, grain
components/
  Navbar.tsx          → nav fixed con logo de ondas
  Hero.tsx            → video fullscreen + headline editorial
  Marquee.tsx         → frase rodante "una familia · muchas sedes"
  About.tsx           → visión / misión / valores + stats
  Sedes.tsx           → 6 sedes con mapa estilizado interactivo
  Ministerios.tsx     → 5 ministerios + tarjeta de contacto
  Lideres.tsx         → pastores con quote editorial
  EstudiosCTA.tsx     → flujo de 3 pasos para estudios bíblicos
  FAQ.tsx             → acordeón con las preguntas frecuentes
  Footer.tsx          → suscripción + columnas + watermark gigante
  FloatingChat.tsx    → bot/whatsapp flotante con respuestas rápidas
```

## Instalación

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Estado actual

### Implementado

- Páginas públicas: `/estudios`, `/eventos`, `/mercy`, `/login`, `/ministerios/*`
- Panel admin: `/admin/eventos` (gestión de eventos)
- Panel usuario: `/mi-cuenta` (perfil, reservas, mis estudios)
- Autenticación con NextAuth (login/registro)
- Sistema de roles en BD (Rol model con Prisma)
- Integración Resend (código listo en `lib/email.ts` — confirmaciones de reserva y notificaciones a líderes)
- API de newsletter (`/api/newsletter/subscribe`, `/api/newsletter/send-event`)
- Ministerios: universitarios, casados, profesionales

### Pendiente por probar / completar

- [ ] **Integración Resend**: configurar API key real (`RESEND_API_KEY`) y verificar dominio remitente en Resend
- [ ] **Probar flujo con cuenta Administrador**: crear usuario admin, verificar acceso a `/admin/*`, gestión de eventos y usuarios
- [ ] **Probar flujo con cuenta Líder**: asignar rol líder, verificar permisos diferenciados (ver sus estudios asignados, recibir notificaciones)
- [ ] **Probar flujo con cuenta Suscriptor**: registro, reserva de estudios, panel `/mi-cuenta`
- [ ] **Newsletter real**: envío masivo de campañas a suscriptores vía Resend
- [ ] **Google Maps real** en sección Sedes (actualmente mapa estilizado)
- [ ] **Modo claro** (toggle día/noche)
- [ ] **Reels de Instagram** embebidos en `/mercy`
