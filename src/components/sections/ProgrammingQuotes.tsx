"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const programmingQuotes = [
  {
    quote: "El código es como el humor. Cuando tienes que explicarlo, es malo.",
    author: "Cory House",
  },
  {
    quote: "Primero resuelve el problema. Luego, escribe el código.",
    author: "John Johnson",
  },
  {
    quote: "La simplicidad es la máxima sofisticación.",
    author: "Leonardo da Vinci",
  },
  {
    quote: "El mejor código es el que no se escribe.",
    author: "Jeff Atwood",
  },
  {
    quote: "Programar no es sobre saber todo, es sobre saber cómo encontrar la respuesta.",
    author: "Chris Pine",
  },
  {
    quote: "Cualquier código tuyo que no hayas mirado en seis meses o más, es como si lo hubiera escrito otra persona.",
    author: "Eagleson's Law",
  },
  {
    quote: "La depuración es dos veces más difícil que escribir el código en primer lugar.",
    author: "Brian Kernighan",
  },
  {
    quote: "No te preocupes si no funciona bien. Si todo estuviera correcto, serías despedido.",
    author: "Mosher's Law",
  },
  {
    quote: "El software es como el sexo: es mejor cuando es gratis.",
    author: "Linus Torvalds",
  },
  {
    quote: "Hablar es barato. Muéstrame el código.",
    author: "Linus Torvalds",
  },
  {
    quote: "Los programadores de verdad no documentan. Si fue difícil de escribir, debe ser difícil de entender.",
    author: "Anónimo",
  },
  {
    quote: "Un programador es alguien que resuelve un problema que no sabías que tenías de una manera que no entiendes.",
    author: "Anónimo",
  },
  {
    quote: "El 99% del código es mantener las cosas que ya funcionan.",
    author: "Anónimo",
  },
  {
    quote: "Primero, resuelve el problema. Después, escribe el código.",
    author: "John Johnson",
  },
  {
    quote: "La programación es el arte de decirle a otro humano lo que quiere que la computadora haga.",
    author: "Donald Knuth",
  },
  {
    quote: "El código bien escrito es su propia mejor documentación.",
    author: "Steve McConnell",
  },
  {
    quote: "Hazlo funcionar, hazlo bien, hazlo rápido.",
    author: "Kent Beck",
  },
  {
    quote: "El software no se acaba, se abandona.",
    author: "Anónimo",
  },
  {
    quote: "Un programador que no writes tests es como un científico que no hace experimentos.",
    author: "Anónimo",
  },
  {
    quote: "No hay atajos para ningún lugar que valga la pena ir.",
    author: "Beverly Sills",
  },
];

const techNews = [
  {
    title: "TypeScript 5.4 Released",
    description: "Nuevas características de inferencia de tipos y mejoras de rendimiento.",
    category: "TypeScript",
    date: "Hoy",
  },
  {
    title: "React 19 Beta Disponible",
    description: "Server Components estables y nuevas APIs de concurrencia.",
    category: "React",
    date: "Ayer",
  },
  {
    title: "Node.js 22 LTS",
    description: "Nueva versión con soporte nativo para WebSocket y mejoras de rendimiento.",
    category: "Node.js",
    date: "Esta semana",
  },
  {
    title: "Docker Desktop 4.28",
    description: "Mejoras en el uso de recursos y nueva interfaz de gestión.",
    category: "Docker",
    date: "Reciente",
  },
  {
    title: "Go 1.22 Released",
    description: "Mejoras en loops genéricos y nuevas funcionalidades de testing.",
    category: "Go",
    date: "Esta semana",
  },
];

export default function ProgrammingQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextQuote();
    }, 30000); // Cambiar cada 30 segundos

    return () => clearInterval(timer);
  }, []);

  const handleNextQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % programmingQuotes.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quote of the Day */}
          <Card className="relative overflow-hidden border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
            <div className="absolute top-4 right-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleNextQuote}
                className="h-8 w-8 hover:bg-purple-500/10"
              >
                <RefreshCw className="h-4 w-4 text-purple-500" />
              </Button>
            </div>
            <CardContent className="pt-8 pb-6 px-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 mt-1">
                  <Quote className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      Frase del Día
                    </span>
                  </div>
                  <blockquote
                    className={`text-lg font-medium leading-relaxed transition-opacity duration-300 ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    &ldquo;{programmingQuotes[currentQuote].quote}&rdquo;
                  </blockquote>
                  <p className="text-sm text-muted-foreground mt-3">
                    — {programmingQuotes[currentQuote].author}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tech News */}
          <Card className="border-2 border-purple-500/20">
            <CardContent className="pt-6 pb-6 px-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                </div>
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  Noticias Tech
                </span>
              </div>
              <div className="space-y-3">
                {techNews.slice(0, 3).map((news, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-purple-500/5 transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {news.description}
                      </p>
                    </div>
                    <span className="text-xs text-purple-500 font-medium shrink-0">
                      {news.category}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
