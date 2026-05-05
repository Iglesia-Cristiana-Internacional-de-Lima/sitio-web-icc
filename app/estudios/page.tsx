import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EstudiosHero from "./components/EstudiosHero";
import EstudiosInfo from "./components/EstudiosInfo";
import EstudiosLideres from "./components/EstudiosLideres";
import EstudiosTestimonios from "./components/EstudiosTestimonios";
import EstudiosCTA from "./components/EstudiosCTA";

export const metadata: Metadata = {
  title: "Estudios Bíblicos | Iglesia Cristiana Internacional de Lima",
  description:
    "Reserva un estudio bíblico personalizado. Conversaciones uno a uno sobre la Biblia, sin presión, a tu ritmo. Elige tu líder y tu horario.",
  openGraph: {
    title: "Estudios Bíblicos | Iglesia Cristiana Internacional de Lima",
    description:
      "Reserva un estudio bíblico personalizado. Conversaciones uno a uno sobre la Biblia.",
    type: "website",
    locale: "es_PE",
  },
};

export default function EstudiosPage() {
  return (
    <main className="bg-[#0d0d0d] text-white relative">
      <Navbar />
      <EstudiosHero />
      <EstudiosInfo />
      <EstudiosLideres />
      <EstudiosTestimonios />
      <EstudiosCTA />
      <Footer />
      <WhatsAppButton
        phoneNumber="51999999999"
        message="Hola! Quiero agendar un estudio bíblico"
      />
    </main>
  );
}
