"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "quienes-somos", "valores", "servicios", "proceso", "contacto"];
      const scrollPosition = window.scrollY + 100;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "quienes-somos", label: "Nosotros" },
    { id: "valores",       label: "Valores" },
    { id: "servicios",     label: "Servicios" },
    { id: "proceso",       label: "Proceso" },
    { id: "contacto",      label: "Contacto" },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <a
          href="#inicio"
          className="logo"
          onClick={(e) => { e.preventDefault(); handleNavClick("inicio"); }}
        >
          <div className="logo-icon">
            {/* Simple "C" connection icon in white */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="3" fill="white" />
              <circle cx="6"  cy="17" r="2.5" fill="white" opacity="0.85" />
              <circle cx="18" cy="17" r="2.5" fill="white" opacity="0.85" />
              <line x1="12" y1="11" x2="6"  y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="11" x2="18" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="logo-text">Conexiones</span>
        </a>

        {/* Mobile Toggle */}
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

        {/* Navigation */}
        <nav id="nav-menu" className={`nav-menu ${isOpen ? "nav-menu-open" : ""}`}>
          <ul className="nav-list">
            {navLinks.map(({ id, label }) => (
              <li key={id} className="nav-item">
                <a
                  href={`#${id}`}
                  className={`nav-link ${activeSection === id ? "nav-link-active" : ""}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNavClick("contacto")}
                className="nav-cta"
              >
                Hablemos →
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
