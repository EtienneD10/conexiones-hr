"use client";

import { useState, useRef } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const fileInputRef = useRef(null);
  
  // Form values state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    cv: null
  });

  // Errors state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    cv: ""
  });

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [dragActive, setDragActive] = useState(false);

  // Validate individual field
  const validateField = (name, value) => {
    let errorMsg = "";
    
    if (name === "name") {
      if (!value.trim()) {
        errorMsg = "El nombre completo es requerido.";
      } else if (value.trim().length < 3) {
        errorMsg = "El nombre debe tener al menos 3 caracteres.";
      }
    }
    
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        errorMsg = "El correo electrónico es requerido.";
      } else if (!emailRegex.test(value)) {
        errorMsg = "Por favor, introduce un correo electrónico válido.";
      }
    }
    
    if (name === "phone") {
      const phoneRegex = /^[0-9+\s\-()]{8,15}$/;
      if (!value) {
        errorMsg = "El número de teléfono es requerido.";
      } else if (!phoneRegex.test(value)) {
        errorMsg = "Introduce un número de teléfono válido (8-15 dígitos).";
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  // Input change handler (clears error on typing)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Blur handler for contextual validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Validate the file input
  const validateFile = (file) => {
    let errorMsg = "";
    
    if (!file) {
      errorMsg = "El archivo del currículum es requerido.";
    } else {
      const allowedExtensions = ["pdf", "doc", "docx"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const maxSizeBytes = 5 * 1024 * 1024; // 5MB

      if (!allowedExtensions.includes(fileExtension)) {
        errorMsg = "Formato no permitido. Solo se admiten archivos .pdf, .doc o .docx.";
      } else if (file.size > maxSizeBytes) {
        errorMsg = "El archivo supera el tamaño máximo permitido (5MB).";
      }
    }

    setErrors(prev => ({ ...prev, cv: errorMsg }));
    return errorMsg === "";
  };

  // File selection handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, cv: file }));
      validateFile(file);
    }
  };

  // Drag and drop event handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData(prev => ({ ...prev, cv: file }));
      validateFile(file);
    }
  };

  // Remove selected CV
  const removeFile = () => {
    setFormData(prev => ({ ...prev, cv: null }));
    setErrors(prev => ({ ...prev, cv: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final check for all fields
    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isPhoneValid = validateField("phone", formData.phone);
    const isCvValid = validateFile(formData.cv);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isCvValid) {
      // Focus on first invalid field
      const firstInvalid = ["name", "email", "phone", "cv"].find(field => {
        if (field === "cv") return !isCvValid;
        return !validateField(field, formData[field]);
      });
      
      if (firstInvalid) {
        if (firstInvalid === "cv") {
          fileInputRef.current?.focus();
        } else {
          document.getElementById(firstInvalid)?.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare Multipart Form Data
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("email", formData.email);
    dataToSend.append("phone", formData.phone);
    dataToSend.append("message", formData.message);
    dataToSend.append("cv", formData.cv);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: dataToSend
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          cv: null
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Submitting error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="section">
        <div className="contact-header">
          <span className="section-subtitle">Trabaja con Nosotros</span>
          <h2>Envíanos tu Currículum</h2>
          <p className="contact-intro">
            ¿Buscas nuevos desafíos profesionales? Completa el siguiente formulario, adjunta tu CV y nos pondremos en contacto contigo cuando surjan búsquedas alineadas a tu perfil.
          </p>
        </div>

        <div className="contact-grid">
          {/* Form Card */}
          <div className="contact-form-card glass-panel">
            {submitStatus === "success" && (
              <div className="submit-alert alert-success animate-fade-in" role="alert">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <div className="alert-text">
                  <h4>¡Postulación Recibida!</h4>
                  <p>Hemos recibido tus datos y tu currículum correctamente. Nuestro equipo de selección te evaluará para futuras oportunidades.</p>
                </div>
                <button className="alert-close-btn" onClick={() => setSubmitStatus(null)} aria-label="Cerrar alerta">×</button>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="submit-alert alert-error animate-fade-in" role="alert">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="alert-text">
                  <h4>Hubo un Error</h4>
                  <p>No se pudo procesar tu envío. Por favor, verifica los datos e inténtalo nuevamente.</p>
                </div>
                <button className="alert-close-btn" onClick={() => setSubmitStatus(null)} aria-label="Cerrar alerta">×</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              
              {/* Field: Fullname */}
              <div className="form-group-item">
                <label htmlFor="name" className="form-label">
                  Nombre Completo <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.name ? "input-invalid" : ""}`}
                  placeholder="Ej. Juan Pérez"
                  autocomplete="name"
                  disabled={isSubmitting}
                  required
                />
                {errors.name && (
                  <span className="error-message" id="name-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Grid: Email & Phone */}
              <div className="form-row-grid">
                <div className="form-group-item">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${errors.email ? "input-invalid" : ""}`}
                    placeholder="ejemplo@correo.com"
                    autocomplete="email"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.email && (
                    <span className="error-message" id="email-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group-item">
                  <label htmlFor="phone" className="form-label">
                    Teléfono de Contacto <span className="required-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${errors.phone ? "input-invalid" : ""}`}
                    placeholder="Ej. +598 99 123 456"
                    autocomplete="tel"
                    inputmode="tel"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.phone && (
                    <span className="error-message" id="phone-error" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Field: Message */}
              <div className="form-group-item">
                <label htmlFor="message" className="form-label">
                  Mensaje / Breve Presentación
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Cuéntanos un poco sobre ti, tu perfil y tus expectativas laborales..."
                  disabled={isSubmitting}
                  rows="4"
                ></textarea>
              </div>

              {/* Field: File Upload CV */}
              <div className="form-group-item">
                <label id="cv-label" className="form-label">
                  Adjuntar Currículum Vitae (PDF, DOC, DOCX) <span className="required-star">*</span>
                </label>
                
                {/* Drag and Drop Zone */}
                {!formData.cv ? (
                  <div 
                    className={`drag-drop-zone ${dragActive ? "drag-active" : ""} ${errors.cv ? "zone-invalid" : ""}`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                  >
                    <svg className="upload-cloud-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="drag-instructions">
                      Arrastra y suelta tu archivo aquí, o{" "}
                      <button 
                        type="button" 
                        className="file-browse-btn" 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        búscalo en tu dispositivo
                      </button>
                    </p>
                    <span className="file-limits-hint">Formatos soportados: PDF, Word (Max 5MB)</span>
                  </div>
                ) : (
                  /* Selected File Display */
                  <div className="selected-file-panel glass-panel">
                    <div className="file-info-col">
                      <svg className="file-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      <div className="file-meta">
                        <span className="file-name">{formData.cv.name}</span>
                        <span className="file-size">{(formData.cv.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="file-remove-btn" 
                      onClick={removeFile}
                      aria-label="Remover currículum seleccionado"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {/* Real File Input Hidden */}
                <input
                  type="file"
                  id="cv"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="visually-hidden"
                  aria-labelledby="cv-label"
                  disabled={isSubmitting}
                />
                
                {errors.cv && (
                  <span className="error-message" id="cv-error" role="alert">
                    {errors.cv}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary submit-form-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Enviando Postulación...
                  </>
                ) : (
                  "Enviar Currículum"
                )}
              </button>

            </form>
          </div>
          
          {/* Info Card */}
          <div className="contact-info-col">
            <div className="info-detail-card glass-panel">
              <h3>¿Qué buscamos en Conexiones?</h3>
              <p>
                Valoramos la excelencia, el enfoque ético, el entusiasmo por aprender y la adaptabilidad. Ofrecemos oportunidades constantes en empresas de primer nivel dentro del mercado uruguayo.
              </p>
              
              <ul className="info-points-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="info-icon">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Confidencialidad absoluta en el manejo de tu información.
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="info-icon">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Feedback y acompañamiento integral en todas las etapas.
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="info-icon">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Acceso a capacitaciones complementarias exclusivas.
                </li>
              </ul>
            </div>
            
            <div className="info-contact-card glass-panel">
              <h4>Contacto Directo</h4>
              <div className="contact-ways">
                <div className="contact-way-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="way-icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>info@conexiones.com.uy</span>
                </div>
                <div className="contact-way-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="way-icon">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+598 2900 1234</span>
                </div>
                <div className="contact-way-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="way-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Montevideo, Uruguay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
