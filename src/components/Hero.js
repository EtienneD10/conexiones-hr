"use client";

import "./Hero.css";

export default function Hero() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="hero-section">
      {/* Left: Text */}
      <div className="hero-left">
        <div className="hero-content">
          <h1 className="hero-title">
            Talento y estrategia que impulsan resultados.
          </h1>
          <p className="hero-subtitle">
            Reclutamiento, selección y capacitaciones empresariales con un
            enfoque profesional, ético y adaptado al mercado uruguayo.
          </p>
          <div className="hero-actions">
            <button
              onClick={() => handleScrollTo("servicios")}
              className="hero-btn-primary"
            >
              Nuestros servicios →
            </button>
            <button
              onClick={() => handleScrollTo("contacto")}
              className="hero-btn-outline"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hero-right">
        <img
          src="/teamTodos.jpeg"
          alt="Equipo profesional de Conexiones HR"
          className="hero-image"
          fetchPriority="high"
        />
        <div className="hero-image-overlay" />
      </div>
    </section>
  );
}
