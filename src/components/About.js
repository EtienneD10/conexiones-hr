import "./About.css";

export default function About() {
  return (
    <section id="quienes-somos" className="about-section">
      <div className="section">
        <div className="about-header">
          <span className="section-subtitle">Nuestra Historia</span>
          <h2>Quiénes Somos</h2>
        </div>
        
        <div className="about-grid">
          {/* Column 1: Quiénes Somos */}
          <div className="about-card glass-panel animate-card">
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>Consultoría de Talento y Estrategia</h3>
            <p>
              Somos una Consultora que integra talento, estrategia y desarrollo empresarial. Brindamos servicios de <strong>“Reclutamiento y Selección de talento”</strong> y <strong>“Capacitaciones y Consultorías empresariales”</strong>.
            </p>
            <p>
              Acompañamos a empresas y PYMES de distintos sectores en el fortalecimiento de su desempeño y competitividad en el mercado.
            </p>
            <p className="card-highlight">
              Trabajamos con un enfoque profesional y ético, adaptándonos a las necesidades reales de cada empresa y al contexto del mercado uruguayo.
            </p>
          </div>

          {/* Column 2: Origen */}
          <div className="about-card glass-panel animate-card">
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3>¿Cómo surge Conexiones?</h3>
            <p>
              Esta consultora nace de una amistad, conversaciones y una visión compartida: <strong>transformar la forma en que las empresas gestionan sus equipos y desarrollan su potencial</strong>.
            </p>
            <p>
              A partir de nuestra experiencia en recursos humanos y consultoría empresarial, identificamos una necesidad clara en el mercado: organizaciones que buscan un acompañamiento integral, cercano y personalizado, más allá de soluciones aisladas.
            </p>
            <p>
              Decidimos unir conocimientos y trayectorias para crear un espacio que conecte personas, estrategia y aprendizaje, brindando respuestas a medida para un crecimiento sostenible y consciente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
