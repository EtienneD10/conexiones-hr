"use client";

import { useEffect, useState } from "react";
import "./Hero.css";

export default function Hero() {
  const slogans = [
    "Talento y estrategia que impulsan resultados",
    "Conectamos talento, formación y crecimiento",
    "Impulsamos personas - Fortalecemos empresas",
    "Desarrollamos talento - Acompañamos negocios"
  ];
  
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
        setFade(true);
      }, 500); // match transition duration
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-background-art">
        <div className="art-circle art-circle-1"></div>
        <div className="art-circle art-circle-2"></div>
      </div>

      <div className="hero-container">
        {/* Large Premium Logo */}
        <div className="hero-logo-wrapper">
          <svg className="hero-logo-svg" width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroCelesteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Center Body */}
            <path d="M50 44C57.732 44 64 37.732 64 30C64 22.268 57.732 16 50 16C42.268 16 36 22.268 36 30C36 37.732 42.268 44 50 44Z" fill="url(#heroCelesteGrad)" filter="url(#glow)" />
            <path d="M50 48C40.059 48 30 54 30 66V76H70V66C70 54 59.941 48 50 48Z" fill="url(#heroCelesteGrad)" opacity="0.9" />
            
            {/* Left Body */}
            <path d="M26 49C32.075 49 37 44.075 37 38C37 31.925 32.075 27 26 27C19.925 27 15 31.925 15 38C15 44.075 19.925 49 26 49Z" fill="url(#heroCelesteGrad)" opacity="0.75" />
            <path d="M26 52.5C18.5 52.5 11 57 11 66V74H41V66C41 57 33.5 52.5 26 52.5Z" fill="url(#heroCelesteGrad)" opacity="0.65" />
            
            {/* Right Body */}
            <path d="M74 49C80.075 49 85 44.075 85 38C85 31.925 80.075 27 74 27C67.925 27 63 31.925 63 38C63 44.075 67.925 49 74 49Z" fill="url(#heroCelesteGrad)" opacity="0.75" />
            <path d="M74 52.5C66.5 52.5 59 57 59 66V74H89V66C89 57 81.5 52.5 74 52.5Z" fill="url(#heroCelesteGrad)" opacity="0.65" />

            {/* Orbit Ring */}
            <ellipse cx="50" cy="70" rx="45" ry="12" stroke="url(#heroCelesteGrad)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="180 50" transform="rotate(-6 50 70)" filter="url(#glow)" />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="hero-title">CONEXIONES</h1>
        
        {/* Core Subtitle Specialties */}
        <div className="hero-specialties">
          <span>Reclutamiento y Selección</span>
          <span className="hero-separator">•</span>
          <span>Capacitaciones Empresariales</span>
        </div>

        {/* Dynamic Slogan Subtitle */}
        <p className={`hero-slogan ${fade ? "fade-in" : "fade-out"}`}>
          {slogans[currentSloganIndex]}
        </p>

        {/* Call to Action Buttons */}
        <div className="hero-actions">
          <button 
            onClick={() => handleScrollTo("servicios")}
            className="btn btn-primary hero-btn"
          >
            Nuestros Servicios
          </button>
          <button 
            onClick={() => handleScrollTo("contacto")}
            className="btn btn-secondary hero-btn"
          >
            Enviar Curriculum
          </button>
        </div>
      </div>
      
      {/* Decorative arrow down to next section */}
      <div className="hero-scroll-indicator" onClick={() => handleScrollTo("quienes-somos")} aria-label="Ir a la siguiente sección">
        <span className="scroll-arrow"></span>
      </div>
    </section>
  );
}
