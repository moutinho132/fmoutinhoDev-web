"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, Clock, Users, ExternalLink, Play, Star, 
  Server, Database, GitBranch, Container, Monitor,
  Filter, ChevronRight, CheckCircle2, BookOpen, Award, X
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  duration: string;
  lessons: number;
  students: string;
  rating: number;
  price: string;
  originalPrice?: string;
  category: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  features: string[];
  image: string;
}

const courses: Course[] = [
  {
    id: "java-spring-boot",
    title: "Java Spring Boot - APIs REST",
    description: "Construye APIs REST escalables con Spring Boot. Desde cero hasta producción.",
    longDescription: "Domina el desarrollo de APIs REST con Spring Boot. Aprenderás a crear servicios escalables, manejar bases de datos con JPA, implementar seguridad con JWT, y desplegar en la nube. Incluye proyectos prácticos reales.",
    instructor: "Fernando Moutinho",
    duration: "45 horas",
    lessons: 120,
    students: "2,340",
    rating: 4.8,
    price: "$49.99",
    originalPrice: "$79.99",
    category: "Backend",
    level: "Intermedio",
    features: [
      "Spring Boot 3.x",
      "JPA & Hibernate",
      "Seguridad con JWT",
      "Tests unitarios",
      "Despliegue en AWS",
      "Proyecto final incluido"
    ],
    image: "/courses/spring-boot.png"
  },
  {
    id: "sql-desde-cero",
    title: "SQL desde Cero",
    description: "Domina bases de datos relacionales. Desde SELECT básico hasta JOINs complejos.",
    longDescription: "Aprende SQL desde los fundamentos hasta consultas avanzadas. Cubre principales motores de base de datos, optimización de consultas, procedimientos almacenados, y diseño de esquemas relacionales.",
    instructor: "Fernando Moutinho",
    duration: "30 horas",
    lessons: 85,
    students: "3,120",
    rating: 4.9,
    price: "$29.99",
    category: "Base de Datos",
    level: "Principiante",
    features: [
      "MySQL & PostgreSQL",
      "JOINs avanzados",
      "Subconsultas",
      "Procedimientos almacenados",
      "Optimización",
      "Ejercicios prácticos"
    ],
    image: "/courses/sql.png"
  },
  {
    id: "git-github",
    title: "Git & GitHub Profesional",
    description: "Control de versiones para equipos. Flujos de trabajo, branching y colaboración.",
    longDescription: "Conviértete en experto en control de versiones. Aprende Git desde lo básico hasta flujos de trabajo avanzados como Git Flow, manejo de conflictos, y colaboración en equipo con GitHub.",
    instructor: "Fernando Moutinho",
    duration: "20 horas",
    lessons: 60,
    students: "4,560",
    rating: 4.7,
    price: "$19.99",
    originalPrice: "$29.99",
    category: "Herramientas",
    level: "Principiante",
    features: [
      "Comandos esenciales",
      "Git Flow",
      "Pull Requests",
      "Resolución de conflictos",
      "GitHub Actions",
      "Colaboración en equipo"
    ],
    image: "/courses/git.png"
  },
  {
    id: "docker-devs",
    title: "Docker para Desarrolladores",
    description: "Contenedores, imágenes y despliegue. De desarrollo a producción con Docker.",
    longDescription: "Domina Docker para desarrollo y producción. Aprende a crear imágenes optimizadas, trabajar con Docker Compose, y desplegar aplicaciones en contenedores de forma segura y eficiente.",
    instructor: "Fernando Moutinho",
    duration: "25 horas",
    lessons: 72,
    students: "1,890",
    rating: 4.8,
    price: "$39.99",
    category: "DevOps",
    level: "Intermedio",
    features: [
      "Imágenes optimizadas",
      "Docker Compose",
      "Volúmenes y redes",
      "Multi-stage builds",
      "Docker Swarm intro",
      "CI/CD con Docker"
    ],
    image: "/courses/docker.png"
  },
  {
    id: "nodejs-avanzado",
    title: "Node.js Avanzado",
    description: "Backend con JavaScript/TypeScript. APIs, autenticación y bases de datos.",
    longDescription: "Lleva tus habilidades de Node.js al siguiente nivel. Construye APIs REST y GraphQL robustas, implementa autenticación segura, y trabaja con bases de datos SQL y NoSQL.",
    instructor: "Fernando Moutinho",
    duration: "40 horas",
    lessons: 110,
    students: "1,650",
    rating: 4.6,
    price: "$59.99",
    originalPrice: "$89.99",
    category: "Backend",
    level: "Avanzado",
    features: [
      "Express & Fastify",
      "TypeScript",
      "GraphQL",
      "MongoDB & PostgreSQL",
      "JWT & OAuth2",
      "Testing con Jest"
    ],
    image: "/courses/nodejs.png"
  },
  {
    id: "react-profesional",
    title: "React Profesional",
    description: "Desarrollo frontend moderno. Componentes, hooks, estado y routing.",
    longDescription: "Construye aplicaciones web modernas con React. Domina hooks, context, Redux Toolkit, React Router, y buenas prácticas de arquitectura frontend.",
    instructor: "Fernando Moutinho",
    duration: "35 horas",
    lessons: 95,
    students: "2,780",
    rating: 4.9,
    price: "$44.99",
    category: "Frontend",
    level: "Intermedio",
    features: [
      "Hooks avanzados",
      "Context & Redux",
      "React Router 6",
      "Testing con RTL",
      "Performance",
      "Proyecto completo"
    ],
    image: "/courses/react.png"
  },
];

const categories = [
  { name: "Todos", icon: GraduationCap },
  { name: "Backend", icon: Server },
  { name: "Frontend", icon: Monitor },
  { name: "Base de Datos", icon: Database },
  { name: "DevOps", icon: Container },
  { name: "Herramientas", icon: GitBranch },
];

const levels = ["Todos", "Principiante", "Intermedio", "Avanzado"];

const levelColors = {
  Principiante: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Intermedio: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  Avanzado: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

const categoryColors: Record<string, string> = {
  Backend: "from-purple-500 to-violet-600",
  Frontend: "from-blue-500 to-cyan-600",
  "Base de Datos": "from-emerald-500 to-green-600",
  DevOps: "from-orange-500 to-red-600",
  Herramientas: "from-pink-500 to-rose-600",
};

export default function CoursesClient() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedLevel, setSelectedLevel] = useState("Todos");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((course) => {
    const categoryMatch = selectedCategory === "Todos" || course.category === selectedCategory;
    const levelMatch = selectedLevel === "Todos" || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <GraduationCap className="h-3 w-3 mr-1" />
              +15,000 estudiantes
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Aprende Desarrollo de Software
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Cursos prácticos y actualizados. Desde principiante hasta avanzado, 
              con proyectos reales y soporte directo.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-white/90">
                <a href="#courses">
                  Ver Cursos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                <a href="https://youtube.com/@fmoutinhodev" target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 mr-2" />
                  Contenido Gratuito
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              {categories.map((cat) => (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`shrink-0 ${selectedCategory === cat.name ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                >
                  <cat.icon className="h-4 w-4 mr-1" />
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Nivel:</span>
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                  className={selectedLevel === level ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-12">
        <div className="container">
          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Mostrando <span className="font-medium text-foreground">{filteredCourses.length}</span> cursos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="group relative overflow-hidden border-2 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                {/* Course Image/Header */}
                <div className={`h-32 bg-gradient-to-br ${categoryColors[course.category]} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                        {course.category}
                      </Badge>
                      <Badge variant="outline" className={`border-0 ${levelColors[course.level]}`}>
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(course.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-muted-foreground">({course.students})</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} lecciones</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {course.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <GraduationCap className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No hay cursos disponibles</h3>
              <p className="text-muted-foreground">
                Prueba con otros filtros o explora todos nuestros cursos.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("Todos");
                  setSelectedLevel("Todos");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`h-40 bg-gradient-to-br ${categoryColors[selectedCourse.category]} relative`}>
              <div className="absolute inset-0 bg-black/20" />
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/20 text-white border-0">
                    {selectedCourse.category}
                  </Badge>
                  <Badge variant="outline" className={`border-0 ${levelColors[selectedCourse.level]}`}>
                    {selectedCourse.level}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <p className="text-muted-foreground">{selectedCourse.longDescription}</p>

              {/* Instructor & Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedCourse.instructor}</p>
                    <p className="text-xs text-muted-foreground">Instructor</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCourse.lessons} lecciones</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCourse.students} estudiantes</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(selectedCourse.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold">{selectedCourse.rating}</span>
                <span className="text-muted-foreground">promedio</span>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  Lo que aprenderás
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCourse.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {selectedCourse.price}
                    </span>
                    {selectedCourse.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {selectedCourse.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Acceso de por vida</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <a
                      href="https://youtube.com/@fmoutinhodev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Inscribirse Ahora
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube CTA */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 p-8 md:p-12 text-white">
            <div className="relative max-w-3xl mx-auto text-center space-y-6">
              <Play className="h-12 w-12 mx-auto" />
              <h2 className="text-3xl font-bold">¿Prefieres contenido gratuito?</h2>
              <p className="text-white/80">
                Visita mi canal de YouTube para tutoriales y guías gratuitas sobre Java, 
                Spring Boot, SQL, Git y muchas tecnologías más.
              </p>
              <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-white/90">
                <a href="https://youtube.com/@fmoutinhodev" target="_blank" rel="noopener noreferrer">
                  Ir a YouTube
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
