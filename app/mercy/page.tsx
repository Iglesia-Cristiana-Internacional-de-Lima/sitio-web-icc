import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MercyHero from "./components/MercyHero";
import MercyImpacto from "./components/MercyImpacto";
import MercyActividades from "./components/MercyActividades";
import MercyReels from "./components/MercyReels";
import MercyCTA from "./components/MercyCTA";

export const metadata: Metadata = {
  title: "Mercy | Iglesia Cristiana Internacional de Lima",
  description:
    "Acciones de caridad y servicio comunitario. Conectados con Mercy Worldwide para impactar nuestra ciudad.",
  openGraph: {
    title: "Mercy | Iglesia Cristiana Internacional de Lima",
    description:
      "Acciones de caridad y servicio comunitario en Lima.",
    type: "website",
    locale: "es_PE",
  },
};

export default function MercyPage() {
  return (
    <main className="bg-[#0d0d0d] text-white relative">
      <Navbar />
      <MercyHero />
      <MercyImpacto />
      <MercyActividades />
      <MercyReels />
      <MercyCTA />
      <Footer />
      <WhatsAppButton
        phoneNumber="51999999999"
        message="Hola! Quiero participar como voluntario en Mercy"
      />
    </main>
  );
}
