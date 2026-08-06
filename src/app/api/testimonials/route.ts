import { NextRequest, NextResponse } from "next/server";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  createdAt: string;
  approved: boolean;
}

// En producción, esto debería guardarse en una base de datos
const testimonialsStore: Testimonial[] = [
  {
    id: "1",
    name: "María García",
    role: "Tech Lead",
    company: "TechCorp",
    content: "Fernando es un desarrollador excepcional. Su capacidad para resolver problemas complejos y su dominio de Spring Boot nos permitió entregar el proyecto antes de lo previsto. Altamente recomendado.",
    rating: 5,
    createdAt: "2024-01-15T00:00:00.000Z",
    approved: true,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    role: "CTO",
    company: "StartupX",
    content: "Trabajar con Fernando fue una experiencia muy positiva. Tiene una gran capacidad de comunicación y siempre está dispuesto a ayudar al equipo. Su código es limpio y bien documentado.",
    rating: 5,
    createdAt: "2024-02-20T00:00:00.000Z",
    approved: true,
  },
  {
    id: "3",
    name: "Ana Martínez",
    role: "HR Manager",
    company: "GlobalDev",
    content: "Fernando demostró ser un profesional completo. No solo tiene excelentes habilidades técnicas, sino también gran capacidad de trabajo en equipo y adaptabilidad.",
    rating: 5,
    createdAt: "2024-03-10T00:00:00.000Z",
    approved: true,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, role, company, content, rating } = body;

    // Validación
    if (!name || !role || !company || !content || !rating) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear testimonio (pendiente de aprobación)
    const testimonial: Testimonial = {
      id: Date.now().toString(),
      name,
      role,
      company,
      content,
      rating,
      createdAt: new Date().toISOString(),
      approved: false, // Requiere aprobación manual
    };

    testimonialsStore.push(testimonial);

    console.log("Nuevo testimonio pendiente:", testimonial);

    return NextResponse.json({ 
      success: true, 
      message: "Testimonio enviado. Será revisado antes de publicarse." 
    });
  } catch (error) {
    console.error("Error processing testimonial:", error);
    return NextResponse.json(
      { error: "Error al procesar el testimonio" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Retornar solo testimonios aprobados
  const approved = testimonialsStore.filter((t) => t.approved);
  return NextResponse.json({ testimonials: approved });
}
