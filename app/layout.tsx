import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
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

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({children,}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain">
        <ThemeProvider>
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
