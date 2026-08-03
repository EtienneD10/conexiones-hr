import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Conexiones | Reclutamiento, Selección y Capacitación Empresarial",
  description: "Consultora de Recursos Humanos en Uruguay especializada en la atracción y selección de talento, y capacitaciones empresariales a medida.",
  keywords: ["Recursos Humanos", "Reclutamiento", "Selección de personal", "Capacitaciones", "Consultoría", "Talento", "Uruguay"],
  authors: [{ name: "Conexiones Consultora" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
