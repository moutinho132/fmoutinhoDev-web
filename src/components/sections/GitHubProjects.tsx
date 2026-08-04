"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, ExternalLink, Code, Sparkles } from "lucide-react";
import Link from "next/link";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

// Proyectos destacados manuales (en caso de que la API falle o quieras personalizar)
const featuredProjects = [
  {
    name: "fmoutinhoDev-web",
    description: "Portafolio web interactivo con playgrounds de código, tutoriales y recursos para desarrolladores.",
    html_url: "https://github.com/moutinho132/fmoutinhoDev-web",
    homepage: "https://fmoutinho.dev",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["nextjs", "react", "typescript", "portfolio", "playground"],
  },
  {
    name: "spring-boot-apis",
    description: "Ejemplos y plantillas de APIs REST con Spring Boot. Arquitectura limpia y mejores prácticas.",
    html_url: "https://github.com/moutinho132/spring-boot-apis",
    homepage: "",
    stargazers_count: 0,
    forks_count: 0,
    language: "Java",
    topics: ["java", "spring-boot", "rest-api", "microservices"],
  },
  {
    name: "sql-practicas",
    description: "Ejercicios y soluciones de SQL para principiantes y avanzados. FROM básico hasta JOINs complejos.",
    html_url: "https://github.com/moutinho132/sql-practicas",
    homepage: "",
    stargazers_count: 0,
    forks_count: 0,
    language: "SQL",
    topics: ["sql", "database", "learning", "exercises"],
  },
];

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Java: "bg-orange-500",
  Python: "bg-green-500",
  SQL: "bg-cyan-500",
  Go: "bg-sky-500",
  Rust: "bg-rose-500",
  Kotlin: "bg-purple-500",
  HTML: "bg-red-500",
  CSS: "bg-blue-400",
  Shell: "bg-green-400",
};

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Intentar cargar desde la API de GitHub
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/moutinho132/repos?sort=updated&per_page=6&type=owner"
        );
        
        if (response.ok) {
          const data = await response.json();
          // Filtrar forks y repos archivados, ordenar por estrellas
          const filtered = data
            .filter((repo: GitHubRepo) => !repo.fork && !repo.archived)
            .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
          
          if (filtered.length > 0) {
            setRepos(filtered);
          } else {
            // Si no hay repos, usar los destacados manuales
            setRepos(featuredProjects as GitHubRepo[]);
          }
        } else {
          // Si la API falla, usar los destacados manuales
          setRepos(featuredProjects as GitHubRepo[]);
        }
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
        setError(true);
        // En caso de error, usar los destacados manuales
        setRepos(featuredProjects as GitHubRepo[]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-purple-500/5 to-background">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2">
            <Github className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Proyectos en GitHub
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora mis repositorios públicos. Código abierto, ejemplos prácticos y proyectos personales.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader>
                  <div className="h-6 bg-purple-500/20 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-purple-500/10 rounded animate-pulse w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-purple-500/10 rounded animate-pulse" />
                    <div className="h-4 bg-purple-500/10 rounded animate-pulse w-5/6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.slice(0, 6).map((repo) => (
              <Card
                key={repo.id || repo.name}
                className="group card-hover overflow-hidden border-2 hover:border-purple-500/30 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/5 group-hover:to-violet-500/5 transition-opacity" />
                <CardHeader className="relative">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {repo.name}
                    </CardTitle>
                    <Github className="h-5 w-5 text-muted-foreground/50 group-hover:text-purple-500 transition-colors shrink-0" />
                  </div>
                  {repo.language && (
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          languageColors[repo.language] || "bg-gray-500"
                        }`}
                      />
                      <span className="text-sm text-muted-foreground">{repo.language}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {repo.description || "Sin descripción disponible"}
                  </p>

                  {/* Topics/Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      asChild
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <Code className="h-4 w-4" />
                        Ver Código
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA to GitHub Profile */}
        <div className="text-center mt-8">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="gap-2 border-purple-500/30 hover:bg-purple-500/5 hover:border-purple-500/50"
          >
            <a
              href="https://github.com/moutinho132"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              Ver todos los proyectos en GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
