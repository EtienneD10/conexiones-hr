import "./About.css";

export default function About() {
  return (
    <section id="quienes-somos" className="about-section">
      {/* ---- Quiénes Somos ---- */}
      <div className="about-inner">
        {/* Left: Network illustration (SVG) */}
        <div className="about-illustration">
          <div className="about-illustration-card">
            <svg
              viewBox="0 0 260 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", maxWidth: 280 }}
              aria-hidden="true"
            >
              {/* Connection lines */}
              <line x1="130" y1="50"  x2="60"  y2="130" stroke="#1a5cad" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="130" y1="50"  x2="200" y2="130" stroke="#1a5cad" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="60"  y1="130" x2="30"  y2="190" stroke="#1a5cad" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="60"  y1="130" x2="110" y2="190" stroke="#1a5cad" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="200" y1="130" x2="150" y2="190" stroke="#1a5cad" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="200" y1="130" x2="230" y2="190" stroke="#1a5cad" strokeWidth="1.5" strokeDasharray="4 3" />

              {/* Nodes — people icons */}
              {[
                { cx: 130, cy: 50,  r: 22, main: true },
                { cx: 60,  cy: 130, r: 18 },
                { cx: 200, cy: 130, r: 18 },
                { cx: 30,  cy: 190, r: 15 },
                { cx: 110, cy: 190, r: 15 },
                { cx: 150, cy: 190, r: 15 },
                { cx: 230, cy: 190, r: 15 },
              ].map(({ cx, cy, r, main }, i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r={r} fill={main ? "#0d2340" : "#1a5cad"} opacity={main ? 1 : 0.75} />
                  {/* Head */}
                  <circle cx={cx} cy={cy - r * 0.35} r={r * 0.30} fill="white" opacity="0.9" />
                  {/* Body */}
                  <path
                    d={`M${cx - r * 0.45} ${cy + r * 0.55} Q${cx} ${cy + r * 0.15} ${cx + r * 0.45} ${cy + r * 0.55}`}
                    fill="white"
                    opacity="0.9"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Right: Text */}
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
          <p className="about-body">
            Conexiones nace de una amistad, conversaciones y una visión compartida:
            transformar la forma en que las empresas gestionan sus equipos y
            desarrollan su potencial.
          </p>
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
