"use client";

import { useState } from "react";
import "./Services.css";

export default function Services() {
  const [activeTab, setActiveTab] = useState("reclutamiento");
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: 1,
      title: "Relevamiento del perfil",
      desc: "Análisis del puesto, la cultura organizacional, los valores y las competencias requeridas, en conjunto con la empresa."
    },
    {
      num: 2,
      title: "Diseño de la estrategia de búsqueda",
      desc: "Definición de canales de difusión, alcance de la convocatoria y metodología de selección de acuerdo al perfil y al mercado."
    },
    {
      num: 3,
      title: "Atracción y preselección de candidatos",
      desc: "Publicación de vacantes en portales y redes, cribado curricular (screening de CVs) y realización de primeras entrevistas exploratorias."
    },
    {
      num: 4,
      title: "Evaluación de competencias",
      desc: "Entrevistas profundas por competencias y, según el caso solicitado, evaluaciones técnicas y/o psicotécnicas avanzadas."
    },
    {
      num: 5,
      title: "Presentación de finalistas",
      desc: "Envío de candidatos preseleccionados a la empresa con informes de evaluación claros, comparativas y alineados a los requerimientos del puesto."
    },
    {
      num: 6,
      title: "Acompañamiento en la decisión final",
      desc: "Asesoramiento continuo a la empresa durante la etapa de elección, entrevistas finales por su parte y el cierre del proceso."
    },
    {
      num: 7,
      title: "Seguimiento post incorporación",
      desc: "Acompañamiento inicial al candidato seleccionado y a la empresa para favorecer una integración exitosa del nuevo colaborador."
    }
  ];

  const consultorias = [
    {
      title: "Identificación y Solución de Problemas",
      desc: "Detectamos cuellos de botella y problemas clave en la estructura de trabajo para proponer soluciones prácticas y efectivas.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-sub-icon">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    },
    {
      title: "Mejora de Procesos y Recursos",
      desc: "Aportamos experiencias externas orientadas a optimizar flujos de procesos y administración de recursos, elevando la eficiencia operativa.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-sub-icon">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      title: "Innovación y Competitividad",
      desc: "Ayudamos a las organizaciones a adaptarse al entorno dinámico actual, impulsando la innovación en la toma de decisiones estratégicas.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-sub-icon">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    }
  ];

  const capacitaciones = [
    { name: "Gestión de Personas", label: "Administración, clima y retención" },
    { name: "Liderazgo Efectivo", label: "Liderazgo situacional y motivación" },
    { name: "Marketing Estratégico", label: "Posicionamiento y canales digitales" },
    { name: "Atención al Cliente", label: "Calidad de servicio y resolución" },
    { name: "Turismo & Servicios", label: "Atención especializada y hospitalidad" },
    { name: "Innovación & Agile", label: "Metodologías de cambio organizacional" }
  ];

  return (
    <section id="servicios" className="services-section">
      <div className="section">
        
        {/* Intro Header */}
        <div className="services-header">
          <span className="section-subtitle">Qué Hacemos</span>
          <h2>Nuestros Servicios</h2>
          <p className="services-intro">
            Acompañamos a organizaciones que buscan crecer, profesionalizarse y adaptarse a los nuevos desafíos, integrando personas, estrategia y aprendizaje para alcanzar soluciones a medida.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="services-tabs-control">
          <button 
            className={`tab-btn ${activeTab === "reclutamiento" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("reclutamiento")}
          >
            Reclutamiento y Selección
          </button>
          <button 
            className={`tab-btn ${activeTab === "capacitaciones" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("capacitaciones")}
          >
            Consultorías y Capacitaciones
          </button>
        </div>

        {/* Tab Content 1: Reclutamiento & Selección */}
        {activeTab === "reclutamiento" && (
          <div className="tab-content animate-tab-content">
            <div className="recruitment-grid">
              
              {/* Left Column: Context */}
              <div className="recruitment-intro-card glass-panel">
                <span className="recruitment-badge">Enfoque Conexiones</span>
                <h3>Atracción y Selección de Talento</h3>
                <p>
                  Diseñamos procesos de selección alineados a la cultura, los valores y los objetivos de cada organización. Buscamos mucho más que cubrir un puesto: <strong>conectamos talentos con oportunidades reales</strong>, evaluando competencias técnicas y humanas para lograr incorporaciones sostenibles en el tiempo.
                </p>
                <p>
                  Nuestro enfoque combina un exhaustivo análisis del perfil, entrevistas por competencias y un acompañamiento cercano durante todo el proceso.
                </p>
                
                {/* Active Step Showcase */}
                <div className="active-step-showcase">
                  <span className="showcase-step-num">Paso {steps[activeStep].num}</span>
                  <h4>{steps[activeStep].title}</h4>
                  <p>{steps[activeStep].desc}</p>
                </div>
              </div>

              {/* Right Column: Interactive Timeline */}
              <div className="timeline-container">
                <h4 className="timeline-title">Etapas del Proceso de Selección</h4>
                <div className="timeline-steps-list">
                  {steps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`timeline-step-item glass-panel ${activeStep === idx ? "step-item-active" : ""}`}
                      onClick={() => setActiveStep(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveStep(idx); }}
                    >
                      <div className="step-number">{step.num}</div>
                      <div className="step-text">
                        <h5>{step.title}</h5>
                        <p className="step-desc-short">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab Content 2: Consultorías & Capacitaciones */}
        {activeTab === "capacitaciones" && (
          <div className="tab-content animate-tab-content">
            <div className="services-dual-grid">
              
              {/* Column 1: Consultorías */}
              <div className="consulting-sub-section">
                <div className="sub-section-header">
                  <span className="sub-badge">Empresarial</span>
                  <h3>Consultorías Organizacionales</h3>
                </div>
                
                <div className="consulting-cards-stack">
                  {consultorias.map((cons, idx) => (
                    <div key={idx} className="consulting-card glass-panel">
                      <div className="consulting-card-header">
                        <div className="sub-icon-box">{cons.icon}</div>
                        <h4>{cons.title}</h4>
                      </div>
                      <p>{cons.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Capacitaciones */}
              <div className="training-sub-section">
                <div className="sub-section-header">
                  <span className="sub-badge">Desarrollo</span>
                  <h3>Capacitaciones a Medida</h3>
                </div>
                
                <div className="training-intro-box glass-panel">
                  <p>
                    Desarrollamos programas formativos prácticos enfocados en potenciar el talento interno, optimizar procesos operativos y fortalecer la toma de decisiones estratégicas.
                  </p>
                  <p className="training-highlight">
                    Nos adaptamos a las necesidades específicas y a la realidad cotidiana de cada organización.
                  </p>
                </div>
                
                <h4 className="training-modules-title">Áreas de Especialización</h4>
                <div className="training-modules-grid">
                  {capacitaciones.map((cap, idx) => (
                    <div key={idx} className="training-module-pill glass-panel">
                      <div className="pill-glow-dot"></div>
                      <h5>{cap.name}</h5>
                      <span>{cap.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
