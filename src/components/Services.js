import "./Services.css";

const IconPeople = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconGradCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default function Services() {
  const steps = [
    { num: "01", title: "Relevamiento del perfil", desc: "Análisis del puesto, la cultura organizacional, los valores y las competencias requeridas." },
    { num: "02", title: "Diseño de la estrategia", desc: "Definición de canales, alcance y metodología de acuerdo al perfil y al mercado." },
    { num: "03", title: "Atracción y preselección", desc: "Publicación de vacantes, screening de CVs y primeras entrevistas exploratorias." },
    { num: "04", title: "Evaluación de competencias", desc: "Entrevistas profundas por competencias y, según el caso, evaluaciones técnicas." },
    { num: "05", title: "Presentación de finalistas", desc: "Candidatos preseleccionados con informes de evaluación claros y comparativas." },
    { num: "06", title: "Acompañamiento en la decisión", desc: "Asesoramiento continuo durante la etapa de elección y cierre del proceso." },
  ];

  return (
    <>
      {/* ---- Services ---- */}
      <section id="servicios" className="services-section">
        <div className="services-inner">
          <div className="services-header">
            <span className="section-label">Servicios</span>
            <h2 className="services-title">
              Soluciones a medida para que tu empresa crezca.
            </h2>
            <p className="services-intro">
              Combinamos experiencia en recursos humanos con capacitaciones y consultoría
              empresarial para acompañar tu crecimiento.
            </p>
          </div>

          {/* Cards */}
          <div className="services-grid">
            {/* Card 1: Reclutamiento */}
            <div className="service-card">
              <IconPeople />
              <h3 className="service-card-title">Atracción y selección de talento</h3>
              <p className="service-card-desc">
                Procesos de selección alineados a la cultura, los valores y los
                objetivos de cada organización. Conectamos talentos con oportunidades
                reales, evaluando competencias técnicas y humanas.
              </p>
              <ul className="service-bullets">
                <li>Análisis del perfil</li>
                <li>Entrevistas por competencias</li>
                <li>Evaluaciones técnicas</li>
                <li>Seguimiento post-incorporación</li>
              </ul>
            </div>

            {/* Card 2: Consultorías */}
            <div className="service-card">
              <IconBriefcase />
              <h3 className="service-card-title">Consultorías empresariales</h3>
              <p className="service-card-desc">
                Detectamos problemas claves y proponemos soluciones prácticas y
                efectivas: mejora de procesos, optimización de recursos, innovación
                y competitividad.
              </p>
              <ul className="service-bullets">
                <li>Identificación y solución de problemas</li>
                <li>Mejora de procesos y recursos</li>
                <li>Innovación y competitividad</li>
                <li>Toma de decisiones estratégica</li>
              </ul>
            </div>

            {/* Card 3: Capacitaciones (full width) */}
            <div className="service-card service-card-full">
              <IconGradCap />
              <h3 className="service-card-title">Capacitaciones empresariales</h3>
              <p className="service-card-desc">
                Programas prácticos y actualizados, diseñados a medida, que integran
                conocimiento técnico, visión estratégica y aplicación concreta en el
                día a día laboral.
              </p>
              <div className="cap-tags">
                {["Gestión de personas", "Liderazgo", "Marketing", "Atención al cliente", "Turismo", "Innovación"].map((t) => (
                  <span key={t} className="cap-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section id="proceso" className="process-section">
        <div className="process-inner">
          <div className="process-header">
            <span className="section-label">Cómo trabajamos</span>
            <h2 className="process-title">Etapas del proceso de selección</h2>
          </div>

          <div className="process-grid">
            {steps.map((step) => (
              <div key={step.num} className="process-step">
                <div className="step-num">{step.num}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
