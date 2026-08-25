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
              <img src="/logo-nuevo.png" alt="Logo Conexiones" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
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
