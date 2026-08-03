import "./MissionValues.css";

export default function MissionValues() {
  const values = [
    {
      title: "Ética y transparencia",
      description: "Actuamos con integridad, honestidad y confidencialidad en cada relación profesional.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: "Enfoque humano",
      description: "Ponemos a las personas en el centro, promoviendo respeto, empatía y relaciones de confianza.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M12 11h.01" />
          <path d="M19 8h.01" />
          <path d="M19 12h.01" />
          <path d="M22 10h.01" />
        </svg>
      )
    },
    {
      title: "Excelencia profesional",
      description: "Trabajamos con compromiso, calidad y responsabilidad en cada proceso.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      )
    },
    {
      title: "Innovación y desarrollo",
      description: "Impulsamos el aprendizaje continuo y aplicamos metodologías actuales para potenciar organizaciones.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      )
    },
    {
      title: "Adaptabilidad y resultados",
      description: "Diseñamos soluciones a medida, orientadas a generar impacto sostenible en cada empresa.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-icon">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    }
  ];

  return (
    <section id="valores" className="mission-values-section">
      <div className="mv-container-grid">
        <div className="values-header">
          <span className="section-label">Nuestros Cimientos</span>
          <h2 className="values-title">Nuestros Valores</h2>
          <p className="values-intro-text">
            Nuestra cultura corporativa se rige por principios sólidos que guían cada uno de nuestros proyectos y relaciones comerciales.
          </p>
        </div>
        
        <div className="values-grid">
          {values.map((val, idx) => (
            <div key={idx} className="value-card">
              <div className="value-icon-wrapper">
                {val.icon}
              </div>
              <div className="value-text-wrapper">
                <h4>{val.title}</h4>
                <p>{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
