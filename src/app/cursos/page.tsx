import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, DollarSign, ExternalLink } from "lucide-react";
import AdBanner, { SelfPromoCard } from "@/components/ads/AdBanner";

export const metadata = {
  title: "Cursos | fmoutinhoDev",
  description: "Catálogo de cursos y tutoriales de desarrollo de software. Java, SQL, Git, JavaScript y más.",
};

const courses = [
  {
    title: "Java Spring Boot - APIs REST",
    description: "Construye APIs REST escalables con Spring Boot. Desde cero hasta producción.",
    instructor: "Fernando Moutinho",
    duration: "45 horas",
    students: "2,340",
    price: "$49.99",
    category: "Backend",
    level: "Intermedio",
  },
  {
    title: "SQL desde Cero",
    description: "Domina bases de datos relacionales. Desde SELECT básico hasta JOINs complejos.",
    instructor: "Fernando Moutinho",
    duration: "30 horas",
    students: "3,120",
    price: "$29.99",
    category: "Base de Datos",
    level: "Principiante",
  },
  {
    title: "Git & GitHub Profesional",
    description: "Control de versiones para equipos. Flujos de trabajo, branching y colaboración.",
    instructor: "Fernando Moutinho",
    duration: "20 horas",
    students: "4,560",
    price: "$19.99",
    category: "Herramientas",
    level: "Principiante",
  },
  {
    title: "Docker para Desarrolladores",
    description: "Contenedores, imágenes y despliegue. De desarrollo a producción con Docker.",
    instructor: "Fernando Moutinho",
    duration: "25 horas",
    students: "1,890",
    price: "$39.99",
    category: "DevOps",
    level: "Intermedio",
  },
  {
    title: "Node.js Avanzado",
    description: "Backend con JavaScript/TypeScript. APIs, autenticación y bases de datos.",
    instructor: "Fernando Moutinho",
    duration: "40 horas",
    students: "1,650",
    price: "$59.99",
    category: "Backend",
    level: "Avanzado",
  },
  {
    title: "React Profesional",
    description: "Desarrollo frontend moderno. Componentes, hooks, estado y routing.",
    instructor: "Fernando Moutinho",
    duration: "35 horas",
    students: "2,780",
    price: "$44.99",
    category: "Frontend",
    level: "Intermedio",
  },
];

export default function CursosPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Cursos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprende desarrollo de software con cursos prácticos y actualizados. 
            Desde principiante hasta avanzado.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner slot="cursos-top" format="horizontal" />

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {course.category}
                    </span>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </div>
                  <GraduationCap className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xl font-bold">{course.price}</span>
                  <Button className="gap-2">
                    Ver Curso
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Promoción YouTube */}
        <SelfPromoCard
          title="¿Prefieres contenido gratuito?"
          description="Visita mi canal de YouTube para tutoriales y guías gratuitas sobre Java, Spring Boot, SQL, Git y más."
          href="https://youtube.com/@fmoutinhodev"
          cta="Ir a YouTube"
        />
      </div>
    </div>
  );
}
