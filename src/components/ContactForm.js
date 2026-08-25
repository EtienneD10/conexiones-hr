"use client";

import { useState, useRef } from "react";
import "./ContactForm.css";

const IconEmail = () => (
  <svg className="info-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = () => (
  <svg className="info-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconLocation = () => (
  <svg className="info-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ContactForm() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", area: "", message: "", cv: null,
  });

  const [errors, setErrors] = useState({
    name: "", email: "", phone: "", area: "", cv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const validateField = (name, value) => {
    let err = "";
    if (name === "name") {
      if (!value.trim()) err = "El nombre completo es requerido.";
      else if (value.trim().length < 3) err = "Mínimo 3 caracteres.";
    }
    if (name === "email") {
      if (!value) err = "El correo es requerido.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = "Correo inválido.";
    }
    if (name === "phone") {
      if (!value) err = "El teléfono es requerido.";
      else if (!/^[0-9+\s\-()]{8,15}$/.test(value)) err = "Teléfono inválido (8-15 dígitos).";
    }
    if (name === "area") {
      if (!value.trim()) err = "Este campo es requerido.";
    }
    setErrors((p) => ({ ...p, [name]: err }));
    return err === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleBlur = (e) => validateField(e.target.name, e.target.value);

  const validateFile = (file) => {
    let err = "";
    if (!file) { err = "El currículum es requerido."; }
    else {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["pdf", "doc", "docx"].includes(ext)) err = "Solo se admiten .pdf, .doc o .docx.";
      else if (file.size > 5 * 1024 * 1024) err = "El archivo supera 5 MB.";
    }
    setErrors((p) => ({ ...p, cv: err }));
    return err === "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) { setFormData((p) => ({ ...p, cv: file })); validateFile(file); }
  };

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) { setFormData((p) => ({ ...p, cv: file })); validateFile(file); }
  };

  const removeFile = () => {
    setFormData((p) => ({ ...p, cv: null }));
    setErrors((p) => ({ ...p, cv: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = [
      validateField("name", formData.name),
      validateField("email", formData.email),
      validateField("phone", formData.phone),
      validateField("area", formData.area),
      validateFile(formData.cv),
    ].every(Boolean);
    if (!ok) return;

    setIsSubmitting(true); setSubmitStatus(null);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => { if (v) data.append(k, v); });

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", area: "", message: "", cv: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else { setSubmitStatus("error"); }
    } catch { setSubmitStatus("error"); }
    finally { setIsSubmitting(false); }
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="contact-inner">

        {/* Header */}
        <div className="contact-header">
          <span className="section-label">Contacto</span>

        </div>

        {/* Info Cards */}
        <div className="contact-info-row">
          <div className="contact-info-card">
            <IconEmail />
            <span className="info-card-label">Email</span>
            <span className="info-card-value">consultora@conexionesuy.com</span>
          </div>
          <div className="contact-info-card">
            <IconPhone />
            <span className="info-card-label">Teléfono</span>
            <span className="info-card-value">+59891263727</span>
          </div>
          <div className="contact-info-card">
            <IconLocation />
            <span className="info-card-label">Ubicación</span>
            <span className="info-card-value">Montevideo, Uruguay</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="contact-form-card">
          <span className="form-section-label">Postulate</span>
          <h3 className="form-title">Enviá tu CV</h3>
          <p className="form-intro">
            Completá tus datos y adjuntá tu currículum. Te contactaremos cuando surja
            una búsqueda acorde a tu perfil.
          </p>

          {submitStatus === "success" && (
            <div className="submit-alert alert-success" role="alert">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div className="alert-text">
                <h4>¡Postulación recibida!</h4>
                <p>Te contactaremos cuando surja una oportunidad acorde a tu perfil.</p>
              </div>
              <button className="alert-close-btn" onClick={() => setSubmitStatus(null)} aria-label="Cerrar">×</button>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="submit-alert alert-error" role="alert">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="alert-text">
                <h4>Hubo un error</h4>
                <p>No se pudo procesar tu envío. Por favor intentalo nuevamente.</p>
              </div>
              <button className="alert-close-btn" onClick={() => setSubmitStatus(null)} aria-label="Cerrar">×</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form" noValidate>

            {/* Nombre */}
            <div className="form-group-item">
              <label htmlFor="name" className="form-label">
                Nombre completo <span className="required-star">*</span>
              </label>
              <input
                type="text" id="name" name="name" value={formData.name}
                onChange={handleChange} onBlur={handleBlur}
                className={`form-input ${errors.name ? "input-invalid" : ""}`}
                placeholder="Ej. María Pérez"
                autoComplete="name" disabled={isSubmitting} required
              />
              {errors.name && <span className="error-message" role="alert">{errors.name}</span>}
            </div>

            {/* Email + Teléfono */}
            <div className="form-row-grid">
              <div className="form-group-item">
                <label htmlFor="email" className="form-label">
                  Email <span className="required-star">*</span>
                </label>
                <input
                  type="email" id="email" name="email" value={formData.email}
                  onChange={handleChange} onBlur={handleBlur}
                  className={`form-input ${errors.email ? "input-invalid" : ""}`}
                  placeholder="tu@email.com"
                  autoComplete="email" disabled={isSubmitting} required
                />
                {errors.email && <span className="error-message" role="alert">{errors.email}</span>}
              </div>
              <div className="form-group-item">
                <label htmlFor="phone" className="form-label">
                  Teléfono <span className="required-star">*</span>
                </label>
                <input
                  type="tel" id="phone" name="phone" value={formData.phone}
                  onChange={handleChange} onBlur={handleBlur}
                  className={`form-input ${errors.phone ? "input-invalid" : ""}`}
                  placeholder="+598 9 123 4567"
                  autoComplete="tel" disabled={isSubmitting} required
                />
                {errors.phone && <span className="error-message" role="alert">{errors.phone}</span>}
              </div>
            </div>

            {/* Puesto / Área */}
            <div className="form-group-item">
              <label htmlFor="area" className="form-label">
                Puesto o área de interés <span className="required-star">*</span>
              </label>
              <input
                type="text" id="area" name="area" value={formData.area}
                onChange={handleChange} onBlur={handleBlur}
                className={`form-input ${errors.area ? "input-invalid" : ""}`}
                placeholder="Ej. Administración, Ventas, Liderazgo, Turismo..."
                disabled={isSubmitting} required
              />
              {errors.area && <span className="error-message" role="alert">{errors.area}</span>}
            </div>

            {/* Mensaje */}
            <div className="form-group-item">
              <label htmlFor="message" className="form-label">Mensaje (opcional)</label>
              <textarea
                id="message" name="message" value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Contanos brevemente sobre tu experiencia o disponibilidad."
                disabled={isSubmitting} rows="4"
              />
            </div>

            {/* CV Upload */}
            <div className="form-group-item">
              <label id="cv-label" className="form-label">
                Currículum (PDF o DOC) <span className="required-star">*</span>
              </label>

              {!formData.cv ? (
                <div
                  className={`drag-drop-zone ${dragActive ? "drag-active" : ""} ${errors.cv ? "zone-invalid" : ""}`}
                  onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="upload-text-col">
                    <span className="upload-main-label">Subí tu CV</span>
                    <span className="upload-hint">PDF, DOC o DOCX · hasta 5 MB</span>
                  </div>
                </div>
              ) : (
                <div className="selected-file-panel">
                  <div className="file-info-col">
                    <svg className="file-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <div>
                      <span className="file-name">{formData.cv.name}</span>
                      <span className="file-size">{(formData.cv.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  </div>
                  <button type="button" className="file-remove-btn" onClick={removeFile} aria-label="Remover archivo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}

              <input
                type="file" id="cv" ref={fileInputRef}
                onChange={handleFileChange} accept=".pdf,.doc,.docx"
                className="visually-hidden" aria-labelledby="cv-label" disabled={isSubmitting}
              />
              {errors.cv && <span className="error-message" role="alert">{errors.cv}</span>}
            </div>

            {/* Submit Row */}
            <div className="form-submit-row">
              <p className="form-note">
                Al enviar abriremos tu correo. Recordá adjuntar el CV antes de mandarlo.
              </p>
              <button type="submit" className="submit-form-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><span className="btn-spinner" /> Enviando...</>
                ) : (
                  "Enviar postulación →"
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Bottom CTA */}
        <div className="contact-cta-row">
          <button
            className="btn btn-primary"
            onClick={() => {
              const el = document.getElementById("contacto");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Escribinos →
          </button>
        </div>

      </div>
    </section>
  );
}
