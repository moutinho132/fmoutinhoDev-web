import HeroSection from "@/components/sections/HeroSection";
import YoutubeCarousel from "@/components/sections/YoutubeCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Code2, GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";
import AdBanner from "@/components/ads/AdBanner";

const playgrounds = [
  {
    title: "SQL Playground",
    description:
      "Ejecuta consultas SQL en memoria con SQLite WASM. Aprende SELECT, JOIN, GROUP BY y más.",
    icon: Database,
    href: "/playground/sql",
    color: "text-blue-600",
  },
  {
    title: "JavaScript Sandbox",
    description:
      "Escribe y ejecuta código JavaScript directamente en tu navegador. Ideal para principiantes.",
    icon: Code2,
    href: "/playground/js",
    color: "text-yellow-600",
  },
  {
    title: "Git Simulator",
    description:
      "Practica comandos de Git en un entorno seguro. Visualiza commits y ramas en tiempo real.",
    icon: GitBranch,
    href: "/playground/git",
    color: "text-orange-600",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Playgrounds Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Playgrounds Interactivos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprende practicando. Ejecuta código SQL, JavaScript y comandos Git directamente en tu navegador.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {playgrounds.map((pg) => (
              <Card key={pg.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <pg.icon className={`h-10 w-10 ${pg.color}`} />
                  <CardTitle className="mt-4">{pg.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{pg.description}</p>
                  <Button asChild className="gap-2">
                    <Link href={pg.href}>
                      Comenzar
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ad Banner */}
          <div className="mt-12">
            <AdBanner slot="home-middle" format="horizontal" />
          </div>
        </div>
      </section>

      {/* YouTube Carousel Section */}
      <YoutubeCarousel />

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para aprender?
            </h2>
            <p className="text-lg text-muted-foreground">
              Explora mis cursos y tutoriales en YouTube. Contenido práctico para desarrolladores que quieren mejorar sus habilidades.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/cursos">Ver Cursos</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://youtube.com/@fmoutinhodev" target="_blank" rel="noopener noreferrer">
                  Suscribirse en YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
