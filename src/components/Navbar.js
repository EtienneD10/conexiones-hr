"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = ["inicio", "quienes-somos", "valores", "equipo", "servicios", "contacto"];
      const scrollPosition = window.scrollY + 120; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        {/* SVG Logo */}
        <a href="#inicio" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick("inicio"); }}>
          <svg className="logo-svg" width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="celesteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
            </defs>
            {/* Center Body */}
            <path d="M50 44C57.732 44 64 37.732 64 30C64 22.268 57.732 16 50 16C42.268 16 36 22.268 36 30C36 37.732 42.268 44 50 44Z" fill="url(#celesteGrad)" />
            <path d="M50 48C40.059 48 30 54 30 66V76H70V66C70 54 59.941 48 50 48Z" fill="url(#celesteGrad)" opacity="0.85" />
            
            {/* Left Body */}
            <path d="M26 49C32.075 49 37 44.075 37 38C37 31.925 32.075 27 26 27C19.925 27 15 31.925 15 38C15 44.075 19.925 49 26 49Z" fill="url(#celesteGrad)" opacity="0.7" />
            <path d="M26 52.5C18.5 52.5 11 57 11 66V74H41V66C41 57 33.5 52.5 26 52.5Z" fill="url(#celesteGrad)" opacity="0.6" />
            
            {/* Right Body */}
            <path d="M74 49C80.075 49 85 44.075 85 38C85 31.925 80.075 27 74 27C67.925 27 63 31.925 63 38C63 44.075 67.925 49 74 49Z" fill="url(#celesteGrad)" opacity="0.7" />
            <path d="M74 52.5C66.5 52.5 59 57 59 66V74H89V66C89 57 81.5 52.5 74 52.5Z" fill="url(#celesteGrad)" opacity="0.6" />

            {/* Orbit Ring */}
            <ellipse cx="50" cy="70" rx="45" ry="12" stroke="url(#celesteGrad)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="180 50" transform="rotate(-6 50 70)" />
          </svg>
          <span className="logo-text">CONEXIONES</span>
        </a>

        {/* Mobile Hamburger Icon */}
        <button 
          className={`nav-toggle ${isOpen ? "nav-toggle-active" : ""}`} 
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={isOpen}
          aria-controls="nav-menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Menu */}
        <nav id="nav-menu" className={`nav-menu ${isOpen ? "nav-menu-open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a 
                href="#inicio" 
                className={`nav-link ${activeSection === "inicio" ? "nav-link-active" : ""}`}
                onClick={(e) => { e.preventDefault(); handleNavClick("inicio"); }}
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#quienes-somos" 
                className={`nav-link ${activeSection === "quienes-somos" ? "nav-link-active" : ""}`}
                onClick={(e) => { e.preventDefault(); handleNavClick("quienes-somos"); }}
              >
                Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#valores" 
                className={`nav-link ${activeSection === "valores" ? "nav-link-active" : ""}`}
                onClick={(e) => { e.preventDefault(); handleNavClick("valores"); }}
              >
                Valores
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#equipo" 
                className={`nav-link ${activeSection === "equipo" ? "nav-link-active" : ""}`}
                onClick={(e) => { e.preventDefault(); handleNavClick("equipo"); }}
              >
                Equipo
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#servicios" 
                className={`nav-link ${activeSection === "servicios" ? "nav-link-active" : ""}`}
                onClick={(e) => { e.preventDefault(); handleNavClick("servicios"); }}
              >
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <button 
                onClick={() => handleNavClick("contacto")}
                className="btn btn-primary nav-cta"
              >
                Enviar CV
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
