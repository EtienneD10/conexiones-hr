import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionValues from "@/components/MissionValues";
import Team from "@/components/Team";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      {/* Header Navigation */}
      <Navbar />

      {/* Main Single Page Content */}
      <main>
        {/* Section 1: Welcome & Branding */}
        <Hero />

        {/* Section 2: Quiénes Somos & Historia */}
        <About />

        {/* Section 3: Misión, Visión y Valores */}
        <MissionValues />

        {/* Section 4: Nuestro Equipo */}
        <Team />

        {/* Section 5: Servicios (Selección de Talento, Consultorías, Capacitaciones) */}
        <Services />

        {/* Section 6: Formulario de Carga de CV / Contacto */}
        <ContactForm />
      </main>

      {/* Footer Branding & Location */}
      <footer className="footer-panel">
        <div className="footer-container">
          <div className="footer-brand">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="footerCeleste" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d2ff" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="none" stroke="url(#footerCeleste)" strokeWidth="3" opacity="0.5" />
              <path d="M50 44C57.732 44 64 37.732 64 30C64 22.268 57.732 16 50 16C42.268 16 36 22.268 36 30C36 37.732 42.268 44 50 44Z" fill="url(#footerCeleste)" />
              <path d="M50 48C40.059 48 30 54 30 66V76H70V66C70 54 59.941 48 50 48Z" fill="url(#footerCeleste)" opacity="0.8" />
              <ellipse cx="50" cy="70" rx="45" ry="12" stroke="url(#footerCeleste)" strokeWidth="3.5" transform="rotate(-6 50 70)" />
            </svg>
            <span>CONEXIONES</span>
          </div>
          
          <div className="footer-meta">
            <p className="footer-slogan">Talento y estrategia que impulsan resultados.</p>
            <p className="footer-region">Consultoría adaptada a la realidad del mercado uruguayo.</p>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Conexiones Consultora. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
