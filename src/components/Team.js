import "./Team.css";

export default function Team() {
  const team = [
    {
      name: "Lic. María Gómez",
      role: "Directora de Reclutamiento y Selección",
      desc: "Especialista en atracción de talento, evaluación de competencias y psicología organizacional con más de 10 años de experiencia.",
      avatar: (
        <svg viewBox="0 0 100 100" className="team-svg-avatar">
          <circle cx="50" cy="50" r="48" fill="url(#avatarGrad1)" />
          <circle cx="50" cy="38" r="18" fill="#ffffff" opacity="0.9" />
          <path d="M50 62C32 62 22 72 22 84C32 88 50 88 50 88C50 88 68 88 78 84C78 72 68 62 50 62Z" fill="#ffffff" opacity="0.9" />
          <circle cx="50" cy="50" r="46" stroke="#00d2ff" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>
      )
    },
    {
      name: "Lic. Juan Pérez",
      role: "Consultor de Capacitación & Desarrollo",
      desc: "Desarrollador de programas de liderazgo, dinámicas de equipo e integración laboral. Apasionado por potenciar las habilidades humanas.",
      avatar: (
        <svg viewBox="0 0 100 100" className="team-svg-avatar">
          <circle cx="50" cy="50" r="48" fill="url(#avatarGrad2)" />
          <circle cx="50" cy="38" r="18" fill="#ffffff" opacity="0.9" />
          <path d="M50 62C32 62 22 72 22 84C32 88 50 88 50 88C50 88 68 88 78 84C78 72 68 62 50 62Z" fill="#ffffff" opacity="0.9" />
          <circle cx="50" cy="50" r="46" stroke="#0072ff" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>
      )
    },
    {
      name: "Ing. Laura Vecino",
      role: "Consultora de Estrategia y Procesos",
      desc: "Especialista en reestructuración y optimización de recursos empresariales, acompañando a PyMEs en el crecimiento sostenible.",
      avatar: (
        <svg viewBox="0 0 100 100" className="team-svg-avatar">
          <circle cx="50" cy="50" r="48" fill="url(#avatarGrad3)" />
          <circle cx="50" cy="38" r="18" fill="#ffffff" opacity="0.9" />
          <path d="M50 62C32 62 22 72 22 84C32 88 50 88 50 88C50 88 68 88 78 84C78 72 68 62 50 62Z" fill="#ffffff" opacity="0.9" />
          <circle cx="50" cy="50" r="46" stroke="#f0c330" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>
      )
    }
  ];

  return (
    <section id="equipo" className="team-section">
      <div className="section">
        {/* Gradients definitions for avatars */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="avatarGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#0066ff" />
            </linearGradient>
            <linearGradient id="avatarGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0072ff" />
              <stop offset="100%" stopColor="#0f0c1b" />
            </linearGradient>
            <linearGradient id="avatarGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0c330" />
              <stop offset="100%" stopColor="#e28500" />
            </linearGradient>
          </defs>
        </svg>

        <div className="team-header">
          <span className="section-subtitle">Profesionales a su Servicio</span>
          <h2>Nuestro Equipo</h2>
          <p className="team-intro">
            Un equipo multidisciplinario con sólida trayectoria y el compromiso de conectar el mejor talento con los objetivos de su empresa.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, idx) => (
            <div key={idx} className="team-card glass-panel">
              <div className="avatar-container">
                <div className="avatar-ring"></div>
                {member.avatar}
              </div>
              <h3 className="member-name">{member.name}</h3>
              <span className="member-role">{member.role}</span>
              <p className="member-desc">{member.desc}</p>
              
              <div className="member-socials">
                <a href="#linkedin" className="social-link" aria-label={`LinkedIn de ${member.name}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="#email" className="social-link" aria-label={`Enviar correo a ${member.name}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
