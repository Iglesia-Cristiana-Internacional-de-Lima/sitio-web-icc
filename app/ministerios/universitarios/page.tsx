import { Metadata } from "next";
import EvolutionNavbar from "./components/EvolutionNavbar";
import EvolutionHero from "./components/EvolutionHero";
import EvolutionManifesto from "./components/EvolutionManifesto";
import EvolutionCampus from "./components/EvolutionCampus";
import EvolutionEvents from "./components/EvolutionEvents";
import EvolutionGallery from "./components/EvolutionGallery";
import EvolutionTestimonials from "./components/EvolutionTestimonials";
import EvolutionCTA from "./components/EvolutionCTA";
import EvolutionFooter from "./components/EvolutionFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Evolution Lima — Ministerio Universitario | Iglesia Cristiana Internacional de Lima",
  description:
    "Comunidad universitaria cristiana en Lima. Devocionales en PUCP y San Marcos. Un espacio para crecer en fe, formar amistades reales y descubrir tu propósito.",
  openGraph: {
    title: "Evolution Lima — Ministerio Universitario",
    description:
      "Comunidad universitaria cristiana en Lima. Devocionales en PUCP y San Marcos.",
    type: "website",
    locale: "es_PE",
  },
};

export default function EvolutionLimaPage() {
  return (
    <main className="evolution-theme bg-[#093b18] text-white relative">
      <EvolutionNavbar />
      <EvolutionHero />
      <EvolutionManifesto />
      <EvolutionCampus />
      <EvolutionEvents />
      <EvolutionGallery />
      <EvolutionTestimonials />
      <EvolutionCTA />
      <EvolutionFooter />
      <WhatsAppButton
        phoneNumber="51999999999"
        message="Hola! Quiero saber más sobre Evolution Lima"
      />
    </main>
  );
}
