import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const area = formData.get("area")?.toString().trim() || "No especificada";
    const message = formData.get("message")?.toString().trim() || "";
    const cvFile = formData.get("cv"); // File object

    // Validación de campos obligatorios
    if (!name || !email || !phone || !cvFile) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios en el envío." },
        { status: 400 }
      );
    }

    // Validación del archivo adjunto
    const fileName = cvFile.name || "curriculum.pdf";
    const fileSize = cvFile.size || 0;
    const fileExtension = fileName.split(".").pop().toLowerCase();

    const allowedExtensions = ["pdf", "doc", "docx"];
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        {
          success: false,
          error: "Formato no permitido. Solo se aceptan archivos PDF, DOC o DOCX.",
        },
        { status: 400 }
      );
    }

    // Límite de tamaño: 5 MB
    const maxSizeBytes = 5 * 1024 * 1024;
    if (fileSize > maxSizeBytes) {
      return NextResponse.json(
        {
          success: false,
          error: "El archivo es demasiado grande (máximo 5MB).",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        "⚠️ [API Contact] RESEND_API_KEY no está configurada en .env.local. El correo no pudo enviarse."
      );
      return NextResponse.json(
        {
          success: false,
          error: "El servicio de correo no está configurado (falta RESEND_API_KEY en .env.local).",
        },
        { status: 500 }
      );
    }

    // Convertir el CV a base64 para el adjunto de Resend
    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Content = buffer.toString("base64");

    const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "consultora@conexionesuy.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Conexiones HR <onboarding@resend.dev>";

    // Plantilla HTML del correo
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fa; margin: 0; padding: 24px; color: #1e293b; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #0f2c42; color: #ffffff; padding: 24px 30px; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.85; }
            .body { padding: 30px; }
            .field-group { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 4px; }
            .value { font-size: 15px; color: #0f172a; line-height: 1.5; }
            .value a { color: #0284c7; text-decoration: none; }
            .value-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-top: 6px; white-space: pre-wrap; font-size: 14px; color: #334155; }
            .attachment-badge { display: inline-flex; align-items: center; gap: 8px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; margin-top: 4px; }
            .footer { padding: 20px 30px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>Nueva Postulación Recibida</h1>
              <p>Formulario de postulación laboral - Conexiones HR</p>
            </div>
            <div class="body">
              <div class="field-group">
                <div class="label">Candidato</div>
                <div class="value"><strong>${escapeHtml(name)}</strong></div>
              </div>

              <div class="field-group">
                <div class="label">Área o Puesto de Interés</div>
                <div class="value"><strong>${escapeHtml(area)}</strong></div>
              </div>

              <div class="field-group">
                <div class="label">Correo Electrónico</div>
                <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
              </div>

              <div class="field-group">
                <div class="label">Teléfono</div>
                <div class="value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
              </div>

              <div class="field-group">
                <div class="label">Mensaje de presentación</div>
                <div class="value-box">${escapeHtml(message || "Sin mensaje adicional.")}</div>
              </div>

              <div class="field-group">
                <div class="label">Currículum Adjunto</div>
                <div class="attachment-badge">
                  📎 ${escapeHtml(fileName)} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)
                </div>
              </div>
            </div>
            <div class="footer">
              Este correo fue enviado automáticamente desde el formulario web.<br>
              Puedes responder a este mensaje directamente para contactar al candidato.
            </div>
          </div>
        </body>
      </html>
    `;

    // Envío a través de la API REST oficial de Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Nueva postulación: ${name} - ${area}`,
        html: emailHtml,
        attachments: [
          {
            filename: fileName,
            content: base64Content,
          },
        ],
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("❌ [API Contact] Error de Resend:", resendData);
      return NextResponse.json(
        {
          success: false,
          error: resendData.message || "Error al enviar el correo.",
        },
        { status: resendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Postulación recibida y enviada correctamente.",
      id: resendData.id,
    });
  } catch (error) {
    console.error("❌ [API Contact] Error interno:", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error inesperado al procesar el envío." },
      { status: 500 }
    );
  }
}