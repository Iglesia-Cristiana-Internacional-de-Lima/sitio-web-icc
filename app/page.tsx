import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventosDestacados from "@/components/EventosDestacados";
import CommunityReels from "@/components/CommunityReels";
import About from "@/components/About";
import Sedes from "@/components/Sedes";
import Ministerios from "@/components/Ministerios";
import EstudiosCTA from "@/components/EstudiosCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <EventosDestacados />
      <CommunityReels />
      <About />
      <Sedes />
      <Ministerios />
      <EstudiosCTA />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
