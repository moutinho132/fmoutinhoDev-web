import HeroSection from "@/components/sections/HeroSection";
import YoutubeCarousel from "@/components/sections/YoutubeCarousel";
import ProgrammingQuotes from "@/components/sections/ProgrammingQuotes";
import GitHubProjects from "@/components/sections/GitHubProjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Code2, GitBranch, ArrowRight, Sparkles, Container, Terminal, Zap, FileJson, FileCode, Braces, Cpu, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";
import { SelfPromoCard } from "@/components/ads/AdBanner";

const playgrounds = [
  {
    title: "SQL Playground",
    description:
      "Ejecuta consultas SQL en memoria con SQLite WASM. Aprende SELECT, JOIN, GROUP BY y más.",
    icon: Database,
    href: "/playground/sql",
    gradient: "from-purple-600 to-violet-600",
    badge: "Popular",
  },
  {
    title: "JavaScript Sandbox",
    description:
      "Escribe y ejecuta código JavaScript directamente en tu navegador. Ideal para principiantes.",
    icon: Code2,
    href: "/playground/js",
    gradient: "from-amber-500 to-orange-500",
    badge: null,
  },
  {
    title: "Python Playground",
    description:
      "Ejecuta código Python en el navegador con Pyodide. Ideal para data science y automatización.",
    icon: Terminal,
    href: "/playground/python",
    gradient: "from-green-500 to-emerald-500",
    badge: null,
  },
  {
    title: "Git Simulator",
    description:
      "Practica comandos de Git en un entorno seguro. Visualiza commits y ramas en tiempo real.",
    icon: GitBranch,
    href: "/playground/git",
    gradient: "from-rose-500 to-pink-500",
    badge: null,
  },
  {
    title: "Docker Simulator",
    description:
      "Aprende Docker de forma interactiva. Practica run, ps, stop, build y más comandos.",
    icon: Container,
    href: "/playground/docker",
    gradient: "from-cyan-500 to-blue-500",
    badge: null,
  },
  {
    title: "Go Playground",
    description:
      "Ejecuta código Go directamente en el navegador. Aprende concurrent programming y más.",
    icon: TerminalIcon,
    href: "/playground/go",
    gradient: "from-sky-500 to-cyan-500",
    badge: "Nuevo",
  },
  {
    title: "Pseudocódigo",
    description:
      "Escribe y visualiza algoritmos en pseudocódigo. Perfecto para aprender lógica de programación.",
    icon: FileCode,
    href: "/playground/pseudocode",
    gradient: "from-indigo-500 to-purple-500",
    badge: "Nuevo",
  },
  {
    title: "TypeScript Sandbox",
    description:
      "Ejecuta código TypeScript con tipos en tiempo real. Ideal para aprender tipado estático.",
    icon: Braces,
    href: "/playground/typescript",
    gradient: "from-blue-600 to-indigo-600",
    badge: "Nuevo",
  },
  {
    title: "Rust Playground",
    description:
      "Aprende Rust con ejemplos interactivos. Memoria segura sin garbage collector.",
    icon: Cpu,
    href: "/playground/rust",
    gradient: "from-orange-600 to-red-600",
    badge: "Próximamente",
  },
  {
    title: "C/C++ Playground",
    description:
      "Fundamentos de programación de sistemas. Punteros, memoria y estructuras de datos.",
    icon: Code2,
    href: "/playground/cpp",
    gradient: "from-blue-700 to-indigo-700",
    badge: "Próximamente",
  },
  {
    title: "Kotlin Playground",
    description:
      "Alternativa moderna a Java para Android y backend. Código conciso y seguro.",
    icon: Zap,
    href: "/playground/kotlin",
    gradient: "from-purple-500 to-fuchsia-500",
    badge: "Próximamente",
  },
  {
    title: "JSON Formatter",
    description:
      "Formatea, valida y visualiza JSON. Convierte a diferentes formatos fácilmente.",
    icon: FileJson,
    href: "/tools/json",
    gradient: "from-amber-600 to-yellow-600",
    badge: "Nuevo",
  },
];

const tools = [
  {
    title: "Regex Tester",
    description: "Prueba expresiones regulares en tiempo real con ejemplos y explicaciones.",
    icon: Zap,
    href: "/tools/regex",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Markdown Editor",
    description: "Editor de Markdown con preview en tiempo real y exportación a PDF.",
    icon: FileCode,
    href: "/tools/markdown",
    gradient: "from-slate-600 to-gray-600",
  },
  {
    title: "API Tester",
    description: "Cliente HTTP para probar APIs REST con soporte para autenticación.",
    icon: Braces,
    href: "/tools/api-tester",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Code Diff",
    description: "Compara código y visualiza diferencias lado a lado.",
    icon: GitBranch,
    href: "/tools/diff",
    gradient: "from-blue-500 to-purple-500",
  },
];

const features = [
  {
    title: "Prácticas con IA",
    description: "Genera ejercicios personalizados para Java, Python y PHP con ayuda de inteligencia artificial.",
    icon: Sparkles,
    href: "/practicas",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Programming Quotes & News */}
      <ProgrammingQuotes />

      {/* GitHub Projects */}
      <GitHubProjects />

      {/* AI Features Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <Button asChild className="w-full gap-2 glow bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <Link href={feature.href}>
                      Probar ahora
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Playgrounds Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Playgrounds Interactivos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprende practicando. Ejecuta código SQL, JavaScript y comandos Git directamente en tu navegador.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playgrounds.map((pg) => (
              <Card key={pg.title} className="group card-hover overflow-hidden relative">
                {pg.badge && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className={`
                      ${pg.badge === 'Popular' ? 'bg-purple-500 text-white' : ''}
                      ${pg.badge === 'Nuevo' ? 'bg-green-500 text-white' : ''}
                      ${pg.badge === 'Próximamente' ? 'bg-slate-500 text-white' : ''}
                    `}>
                      {pg.badge}
                    </Badge>
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-r ${pg.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <CardHeader className="relative">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${pg.gradient} w-fit`}>
                    <pg.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="mt-4">{pg.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground mb-4">{pg.description}</p>
                  <Button asChild className="gap-2 w-full">
                    <Link href={pg.href}>
                      Comenzar
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Promoción */}
          <div className="mt-12">
            <SelfPromoCard
              title="¿Primera vez aquí?"
              description="Prueba los playgrounds interactivos de SQL, JavaScript y Git. Aprende practicando sin configurar nada."
              href="/playground/sql"
              cta="Explorar playgrounds"
            />
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Herramientas para Desarrolladores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Utilidades esenciales para tu día a día. Formatea código, prueba APIs y más.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Card key={tool.title} className="group card-hover overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <CardHeader className="relative">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.gradient} w-fit`}>
                    <tool.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="mt-3 text-base">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Carousel Section */}
      <YoutubeCarousel />

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
            <div className="relative text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                ¿Listo para aprender?
              </h2>
              <p className="text-lg text-muted-foreground">
                Explora mis cursos y tutoriales en YouTube. Contenido práctico para desarrolladores que quieren mejorar sus habilidades.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="glow">
                  <Link href="/cursos">Ver Cursos</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2">
                  <a href="https://youtube.com/@fmoutinhodev" target="_blank" rel="noopener noreferrer">
                    Suscribirse en YouTube
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
