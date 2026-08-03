import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const cvFile = formData.get("cv"); // This is a File object

    // Server-side validation
    if (!name || !email || !phone || !cvFile) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios en el envío." },
        { status: 400 }
      );
    }

    // Inspect file properties
    const fileName = cvFile.name;
    const fileSize = cvFile.size;
    const fileType = cvFile.type;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    
    // Validate file type
    const allowedExtensions = ["pdf", "doc", "docx"];
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: "Formato de archivo no permitido. Solo se admiten PDF o Word." },
        { status: 400 }
      );
    }

    // Validate size (e.g. 5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (fileSize > maxSizeBytes) {
      return NextResponse.json(
        { success: false, error: "El archivo es demasiado grande (máximo 5MB)." },
        { status: 400 }
      );
    }

    // Log the submission metadata (Simulation)
    console.log("=== Nueva Postulación Recibida en Conexiones ===");
    console.log(`Nombre: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Teléfono: ${phone}`);
    console.log(`Mensaje: ${message || "Ninguno"}`);
    console.log(`Archivo Adjunto: ${fileName} (${(fileSize / 1024 / 1024).toFixed(2)} MB, tipo: ${fileType})`);
    console.log("================================================");

    /* 
      GUÍA PARA INTEGRACIÓN REAL DE ENVÍO DE EMAIL:
      ============================================
      Para enviar estos datos a tu casilla de correo con el archivo adjunto real,
      puedes utilizar una librería como 'nodemailer' o el servicio 'resend'.

      Ejemplo conceptual con Resend:
      -----------------------------
      1. Instalar la librería: npm install resend
      2. Importar: import { Resend } from 'resend';
      3. Inicializar: const resend = new Resend(process.env.RESEND_API_KEY);
      
      4. Convertir el archivo a Buffer para adjuntarlo:
         const arrayBuffer = await cvFile.arrayBuffer();
         const buffer = Buffer.from(arrayBuffer);

      5. Enviar el correo:
         await resend.emails.send({
           from: 'Conexiones Web <postulaciones@tusitio.com>',
           to: 'recursos-humanos@conexiones.com.uy',
           subject: `Nueva postulación de CV: ${name}`,
           html: `
             <h2>Nueva Postulación Recibida</h2>
             <p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Teléfono:</strong> ${phone}</p>
             <p><strong>Mensaje de presentación:</strong> ${message || 'No provisto'}</p>
           `,
           attachments: [
             {
               filename: fileName,
               content: buffer,
             }
           ]
         });
    */

    // Simulate database write / processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({
      success: true,
      message: "Postulación recibida y procesada correctamente.",
      data: {
        name,
        email,
        fileName,
        fileSize
      }
    });

  } catch (error) {
    console.error("Error en API Route /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error interno del servidor." },
      { status: 500 }
    );
  }
}
