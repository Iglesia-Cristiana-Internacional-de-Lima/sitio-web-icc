import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CasadosContent from "./CasadosContent";

export const metadata: Metadata = {
  title: "Casados | Iglesia Cristiana Internacional de Lima",
  description:
    "Ministerio para matrimonios en Lima. Eventos, retiros y estudios bíblicos enfocados en fortalecer tu relación de pareja.",
  openGraph: {
    title: "Casados | Iglesia Cristiana Internacional de Lima",
    description:
      "Construir un matrimonio que dure. Sin frases hechas.",
    type: "website",
    locale: "es_PE",
  },
};

export default function CasadosPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] relative">
      <Navbar />
      <CasadosContent />
      <Footer />
      <WhatsAppButton
        phoneNumber="51999999999"
        message="Hola! Quiero saber más sobre el ministerio de Casados"
      />
    </main>
  );
}
