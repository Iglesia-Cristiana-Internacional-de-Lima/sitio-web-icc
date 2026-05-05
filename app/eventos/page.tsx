import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EventosLista from "./components/EventosLista";
import EventosMapa from "./components/EventosMapa";
import EventosSuscripcion from "./components/EventosSuscripcion";
import EventosReels from "./components/EventosReels";

export const metadata: Metadata = {
  title: "Eventos | Iglesia Cristiana Internacional de Lima",
  description:
    "Servicios dominicales, charlas bíblicas, devocionales y eventos especiales. Encuentra tu próximo evento y únete a la comunidad.",
  openGraph: {
    title: "Eventos | Iglesia Cristiana Internacional de Lima",
    description:
      "Servicios dominicales, charlas bíblicas, devocionales y eventos especiales.",
    type: "website",
    locale: "es_PE",
  },
};

export default function EventosPage() {
  return (
    <main className="bg-[#0d0d0d] text-white relative">
      <Navbar />
      <div className="pt-24" /> {/* No hero, straight to content */}
      <EventosLista />
      <EventosMapa />
      <EventosSuscripcion />
      <EventosReels />
      <Footer />
      <WhatsAppButton
        phoneNumber="51999999999"
        message="Hola! Quiero saber sobre los próximos eventos"
      />
    </main>
  );
}
