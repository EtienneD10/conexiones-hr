import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionValues from "@/components/MissionValues";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <MissionValues />
        <ContactForm />
      </main>

      <footer className="footer-panel">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo-icon">
              {/* Simple "C" connection icon in white */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <circle cx="12" cy="8" r="3" fill="white" />
                <circle cx="6"  cy="17" r="2.5" fill="white" opacity="0.85" />
                <circle cx="18" cy="17" r="2.5" fill="white" opacity="0.85" />
                <line x1="12" y1="11" x2="6"  y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="11" x2="18" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="footer-brand-name">Conexiones</span>
          </div>
          
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Conexiones Consultora. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
