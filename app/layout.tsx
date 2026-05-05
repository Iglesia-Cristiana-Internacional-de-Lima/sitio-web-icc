import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iglesia Cristiana Internacional de Lima",
  description:
    "Una familia. Muchas sedes. Encuentra tu lugar, conecta con Dios, vive en comunidad.",
  openGraph: {
    title: "Iglesia Cristiana Internacional de Lima",
    description:
      "Una familia. Muchas sedes. Encuentra tu lugar, conecta con Dios, vive en comunidad.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({children,}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
