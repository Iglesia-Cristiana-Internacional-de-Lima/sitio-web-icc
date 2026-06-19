import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import EventosDestacados from "@/components/EventosDestacados";
import CommunityReels from "@/components/CommunityReels";
import Sedes from "@/components/Sedes";
import Lideres from "@/components/Lideres";
import Ministerios from "@/components/Ministerios";
import About from "@/components/About";
import Team from "@/components/Team";
import EstudiosCTA from "@/components/EstudiosCTA";
import FAQ from "@/components/FAQ";
import LoginRoles from "@/components/LoginRoles";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// 1. IMPORTAMOS TU CHATBOT AQUÍ
import SmartChatbot from "@/components/SmartChatbot";

export default function Home() {
  return (
    <main className="bg-[#0d0d0d] text-white relative">
      {/* Navigation */}
      <Navbar />

      {/* 01 - Hero with video background */}
      <Hero />

      {/* Marquee separator */}
      <Marquee />

      {/* 02 - Eventos Destacados (split for consolidated/new visitors) */}
      <EventosDestacados />

      {/* 03 - Community Reels (Instagram/TikTok integration) */}
      <CommunityReels />

      {/* 04 - Familia de Iglesias (Sedes with map) */}
      <Sedes />

      {/* 05 - Líderes (Main pastors with quotes) */}
      <Lideres />

      {/* 06 - Ministerios (Grid with hover effects) */}
      <Ministerios />

      {/* 07 - About (Historia, Visión, Misión, Valores, Stats) */}
      <About />

      {/* 08 - Team (Leadership and administration) */}
      <Team />

      {/* 09 - Estudios CTA (Bible studies promotion) */}
      <EstudiosCTA />

      {/* 10 - FAQ (Accordion with common questions) */}
      <FAQ />

      {/* 11 - Login Roles (Admin, Leader, Subscriber access) */}
      <LoginRoles />

      {/* 12 - Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* 2. AGREGAMOS TU CHATBOT AQUÍ */}
      <SmartChatbot />
    </main>
  );
}