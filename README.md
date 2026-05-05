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

## Roadmap pendiente (siguientes iteraciones)

- Páginas internas: `/estudios`, `/eventos`, `/mercy`, `/login`
- CMS: panel admin con roles (Administrador, Líder, Suscriptor)
- Integración Google Maps real en Sedes
- Suscripción de correo conectada a backend
- Modo claro (toggle día/noche)
- Mapa interactivo de charlas bíblicas en `/eventos`
- Reels de Instagram embebidos en `/mercy`
