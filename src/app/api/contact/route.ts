import { NextRequest, NextResponse } from "next/server";

interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  position?: string;
  senderType: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// En producción, esto debería guardarse en una base de datos
// Por ahora usamos una variable en memoria (se perderá al reiniciar)
const messagesStore: ContactMessage[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, company, position, senderType, subject, message } = body;

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear mensaje
    const contactMessage: ContactMessage = {
      name,
      email,
      company: company || "",
      position: position || "",
      senderType,
      subject,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    // Guardar en memoria (en producción: guardar en BD)
    messagesStore.push(contactMessage);

    // En producción: enviar email de notificación
    // await sendEmail(contactMessage);

    console.log("Nuevo mensaje de contacto:", contactMessage);

    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // En producción: verificar autenticación
  return NextResponse.json({ messages: messagesStore });
}
