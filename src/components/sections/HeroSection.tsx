"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Play, Database, GitBranch, Code2, Briefcase, Award, Users, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { trackDownloadCV } from "@/lib/metaPixel";

const experiences = [
  {
    company: "Claro",
    role: "Senior Backend Developer",
    description: "Arquitectura de microservicios y APIs de alto tráfico",
    icon: Briefcase,
    gradient: "from-red-500 to-pink-500",
  },
  {
    company: "LATAM Airlines",
    role: "Fullstack Engineer",
    description: "Sistemas de reservas y gestión de vuelos",
    icon: Users,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    company: "CENCOSUD",
    role: "Tech Lead",
    description: "Plataforma de e-commerce y procesamiento de pagos",
    icon: Award,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    company: "SURA",
    role: "Backend Architect",
    description: "Sistemas de seguros y gestión de salud",
    icon: Database,
    gradient: "from-purple-500 to-violet-500",
  },
];

const techStack = [
  { name: "Java", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  { name: "Spring Boot", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  { name: "Node.js", color: "bg-lime-500/10 text-lime-600 border-lime-500/20" },
  { name: "TypeScript", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { name: "React", color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20" },
  { name: "PostgreSQL", color: "bg-sky-500/10 text-sky-600 border-sky-500/20" },
  { name: "MongoDB", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  { name: "AWS", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  { name: "Docker", color: "bg-sky-500/10 text-sky-600 border-sky-500/20" },
  { name: "Kubernetes", color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" },
];

export default function HeroSection() {
  const handleDownloadCV = () => {
    trackDownloadCV();
    window.open("/cv-fernando-moutinho.pdf", "_blank");
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Bio */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium animate-fade-in">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                +8 años de experiencia
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight animate-slide-up">
                Hola, soy{" "}
                <span className="gradient-text">Fernando Moutinho</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Fullstack & Java Backend Engineer</strong> con experiencia en sistemas distribuidos, 
                microservicios y arquitecturas cloud-native. Apasionado por crear soluciones escalables 
                y compartir conocimiento.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleDownloadCV} size="lg" className="gap-2 glow bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25">
                <Download className="h-5 w-5" />
                Descargar CV
              </Button>
              <Button variant="outline" size="lg" asChild className="gap-2 border-2 hover:bg-primary/5">
                <Link href="/practicas">
                  <Sparkles className="h-5 w-5" />
                  Prácticas con IA
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Stack Tecnológico
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium transition-[transform,box-shadow] duration-150 active:scale-95 ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {experiences.map((exp, idx) => (
              <Card 
                key={exp.company} 
                className="group card-hover overflow-hidden border-2 hover:border-primary/30 stagger-item"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200`} />
                <CardContent className="relative pt-6">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${exp.gradient} w-fit mb-4`}>
                    <exp.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="text-sm font-medium text-primary">{exp.role}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
