"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Play, Database, GitBranch, Code2, Briefcase, Award, Users } from "lucide-react";
import Link from "next/link";
import { trackDownloadCV } from "@/lib/metaPixel";

const experiences = [
  {
    company: "Claro",
    role: "Senior Backend Developer",
    description: "Arquitectura de microservicios y APIs de alto tráfico",
    icon: Briefcase,
  },
  {
    company: "LATAM Airlines",
    role: "Fullstack Engineer",
    description: "Sistemas de reservas y gestión de vuelos",
    icon: Users,
  },
  {
    company: "CENCOSUD",
    role: "Tech Lead",
    description: "Plataforma de e-commerce y procesamiento de pagos",
    icon: Award,
  },
  {
    company: "SURA",
    role: "Backend Architect",
    description: "Sistemas de seguros y gestión de salud",
    icon: Database,
  },
];

const techStack = [
  "Java", "Spring Boot", "Node.js", "TypeScript", "React", "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes"
];

export default function HeroSection() {
  const handleDownloadCV = () => {
    trackDownloadCV();
    window.open("/cv-fernando-moutinho.pdf", "_blank");
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Bio */}
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
              🚀 +8 años de experiencia
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Hola, soy{" "}
              <span className="text-primary">Fernando Moutinho</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              <strong>Fullstack & Java Backend Engineer</strong> con experiencia en sistemas distribuidos, 
              microservicios y arquitecturas cloud-native. Apasionado por crear soluciones escalables 
              y compartir conocimiento a través de contenido educativo.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleDownloadCV} size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Descargar CV
              </Button>
              <Button variant="outline" size="lg" asChild className="gap-2">
                <Link href="/playground/sql">
                  <Play className="h-5 w-5" />
                  Probar Playgrounds
                </Link>
              </Button>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Stack Tecnológico
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {experiences.map((exp) => (
              <Card key={exp.company} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <exp.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{exp.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
