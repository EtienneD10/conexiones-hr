import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  themeColor: "#03001e",
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
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
