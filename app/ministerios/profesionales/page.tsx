import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProfesionalesContent from "./ProfesionalesContent";

export const metadata: Metadata = {
  title: "Profesionales | Iglesia Cristiana Internacional de Lima",
  description:
    "Comunidad de profesionales cristianos en Lima. Networking con propósito, estudios bíblicos y eventos para integrar la fe con tu vida laboral.",
  openGraph: {
    title: "Profesionales | Iglesia Cristiana Internacional de Lima",
    description:
      "Comunidad de profesionales cristianos en Lima. Fe en el mundo real.",
    type: "website",
    locale: "es_PE",
  },
};

export default function ProfesionalesPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] relative">
      <Navbar />
      <ProfesionalesContent />
      <Footer />
      <WhatsAppButton
        phoneNumber="51999999999"
        message="Hola! Quiero saber más sobre el ministerio de Profesionales"
      />
    </main>
  );
}
