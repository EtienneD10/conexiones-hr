import "./About.css";

export default function About() {
  const team = [
    {
      name: "Lic. Elena Coronel",
      role: "Directora de Reclutamiento y Selección",
      desc: "Especialista en atracción de talento, evaluación de competencias y psicología organizacional con más de 10 años de experiencia.",
      img: "/team-3.jpg"
    },
    {
      name: "Lic. Gonzalo Malcon",
      role: "Consultor de Capacitación & Desarrollo",
      desc: "Desarrollador de programas de liderazgo, dinámicas de equipo e integración laboral. Apasionado por potenciar las habilidades humanas.",
      img: "/team-1.jpg"
    },
    {
      name: "Juan Perez",
      role: "Consultora de Estrategia y Procesos",
      desc: "Especialista en reestructuración y optimización de recursos empresariales, acompañando a PyMEs en el crecimiento sostenible.",
      img: "/team-2.jpg"
    }
  ];

  return (
    <section id="quienes-somos" className="about-section">
      {/* ---- Quiénes Somos ---- */}
      <div className="about-inner">
        <div className="about-text">
          <span className="section-label">Quiénes somos</span>
          <h2 className="about-heading">
            Integramos talento, estrategia y desarrollo empresarial.
          </h2>
          <p className="about-body">
            Somos una consultora uruguaya que brinda servicios de reclutamiento y
            selección de talento, capacitaciones y consultorías empresariales.
            Acompañamos a empresas y pymes de distintos sectores en el
            fortalecimiento de su desempeño y competitividad.
          </p>
          
          <h3 className="about-subheading">¿Cómo surge conexiones?</h3>
          <p className="about-body">
            Esta consultora nace de una amistad, conversaciones y una visión compartida: transformar
            la forma en que las empresas gestionan sus equipos y desarrollan su potencial.
            A partir de nuestra experiencia en recursos humanos y consultoría empresarial,
            identificamos una necesidad clara en el mercado: organizaciones que buscan un
            acompañamiento integral, cercano y personalizado, más allá de soluciones aisladas.
            Por eso decidimos unir conocimientos y trayectorias para crear un espacio que conecte
            personas, estrategia y aprendizaje, brindando respuestas a medida.
          </p>
        </div>
      </div>

      {/* ---- Nuestro Equipo ---- */}
      <div className="about-team-wrapper">
        <div className="about-team-header">
          <h3 className="about-team-title">Nuestro Equipo</h3>
        </div>
        <div className="about-team-grid">
          {team.map((member, idx) => (
            <div key={idx} className="about-team-card">
              <div className="about-team-img-wrapper">
                <img src={member.img} alt={`Foto de ${member.name}`} className="about-team-img" />
              </div>
              <h4>{member.name}</h4>
              <span className="about-team-role">{member.role}</span>
              <p className="about-team-desc">{member.desc}</p>

              <div className="team-socials">
                <a href="#linkedin" className="team-social-link" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="#email" className="team-social-link" aria-label="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Misión & Visión ---- */}
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <div className="mv-row">
          <div className="mv-card">
            <h3 className="mv-card-title">Nuestra Misión</h3>
            <p>
              Acompañar a las organizaciones en el fortalecimiento de su
              desempeño y competitividad, brindando soluciones integrales en
              reclutamiento, selección, capacitaciones y consultorías, con un
              enfoque profesional, ético y adaptado a la realidad del mercado
              uruguayo.
            </p>
          </div>
          <div className="mv-card">
            <h3 className="mv-card-title">Nuestra Visión</h3>
            <p>
              Ser una consultora de referencia en Uruguay por su enfoque
              integral en la gestión del talento y el desarrollo empresarial,
              reconocida por la calidad de sus servicios, su mirada estratégica
              y su capacidad de generar impacto positivo y sostenible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
