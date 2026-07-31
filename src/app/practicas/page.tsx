"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Sparkles,
  Coffee,
  Terminal,
  MessageSquare,
  RefreshCw,
  Send,
  Loader2,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Language = "java" | "python" | "php";

interface Message {
  role: "user" | "assistant";
  content: string;
  code?: string;
  language?: Language;
}

interface Practice {
  title: string;
  description: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  language: Language;
}

const languageIcons: Record<Language, React.ReactNode> = {
  java: <Coffee className="h-5 w-5" />,
  python: <Terminal className="h-5 w-5" />,
  php: <Code className="h-5 w-5" />,
};

const languageColors: Record<Language, string> = {
  java: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  python: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  php: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const suggestedPractices: Record<Language, Practice[]> = {
  java: [
    {
      title: "Clases y Objetos",
      description: "Crea una clase Persona con atributos y métodos",
      difficulty: "Principiante",
      language: "java",
    },
    {
      title: "ArrayList y Colecciones",
      description: "Maneja listas de objetos con ArrayList",
      difficulty: "Intermedio",
      language: "java",
    },
    {
      title: "Patrón Singleton",
      description: "Implementa el patrón de diseño Singleton",
      difficulty: "Avanzado",
      language: "java",
    },
  ],
  python: [
    {
      title: "Listas y Diccionarios",
      description: "Manipula estructuras de datos básicas",
      difficulty: "Principiante",
      language: "python",
    },
    {
      title: "Funciones y Lambdas",
      description: "Crea funciones reutilizables y expresiones lambda",
      difficulty: "Intermedio",
      language: "python",
    },
    {
      title: "Decoradores",
      description: "Implementa decoradores para modificar funciones",
      difficulty: "Avanzado",
      language: "python",
    },
  ],
  php: [
    {
      title: "Arrays y Funciones",
      description: "Manipula arrays con funciones nativas de PHP",
      difficulty: "Principiante",
      language: "php",
    },
    {
      title: "Clases y POO",
      description: "Crea clases con herencia y encapsulamiento",
      difficulty: "Intermedio",
      language: "php",
    },
    {
      title: "API REST con PHP",
      description: "Construye una API REST desde cero",
      difficulty: "Avanzado",
      language: "php",
    },
  ],
};

export default function PracticasPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("java");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [userCode, setUserCode] = useState("");

  const generatePractice = async (practice: Practice) => {
    setIsLoading(true);
    setMessages([]);

    try {
      const response = await fetch("/api/practicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate",
          language: practice.language,
          topic: practice.title,
          difficulty: practice.difficulty,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages([
          {
            role: "assistant",
            content: data.exercise,
            code: data.starterCode,
            language: practice.language,
          },
        ]);
        setCurrentCode(data.starterCode || "");
        setShowCodeEditor(true);
      } else {
        setMessages([
          {
            role: "assistant",
            content: "Error al generar la práctica. Por favor intenta de nuevo.",
          },
        ]);
      }
    } catch {
      setMessages([
        {
          role: "assistant",
          content: "Error de conexión. Por favor intenta más tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/practicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          language: selectedLanguage,
          message: input,
          code: userCode || currentCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
            code: data.code,
            language: selectedLanguage,
          },
        ]);
        if (data.code) {
          setCurrentCode(data.code);
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error al procesar tu mensaje.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const requestHint = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/practicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "hint",
          language: selectedLanguage,
          code: userCode || currentCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `💡 **Pista:**\n\n${data.hint}`,
            language: selectedLanguage,
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateCode = async () => {
    if (!userCode.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/practicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "validate",
          language: selectedLanguage,
          code: userCode,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.success
            ? `✅ **Resultado:**\n\n${data.feedback}`
            : "❌ Hay errores en tu código. Revisa y corrige.",
          code: data.correctedCode,
          language: selectedLanguage,
        },
      ]);

      if (data.correctedCode) {
        setCurrentCode(data.correctedCode);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">
              Prácticas con IA
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Genera ejercicios interactivos personalizados para Java, Python y
            PHP. Practica, aprende y mejora tus habilidades con ayuda de
            inteligencia artificial.
          </p>
        </div>

        {/* Language Selection */}
        <Tabs
          value={selectedLanguage}
          onValueChange={(v) => setSelectedLanguage(v as Language)}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="java" className="gap-2">
              <Coffee className="h-4 w-4" />
              Java
            </TabsTrigger>
            <TabsTrigger value="python" className="gap-2">
              <Terminal className="h-4 w-4" />
              Python
            </TabsTrigger>
            <TabsTrigger value="php" className="gap-2">
              <Code className="h-4 w-4" />
              PHP
            </TabsTrigger>
          </TabsList>

          {(["java", "python", "php"] as Language[]).map((lang) => (
            <TabsContent key={lang} value={lang} className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Suggested Practices */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    Prácticas Sugeridas
                  </h2>
                  {suggestedPractices[lang].map((practice, idx) => (
                    <Card
                      key={idx}
                      className="cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => generatePractice(practice)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium">{practice.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {practice.description}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${
                              practice.difficulty === "Principiante"
                                ? "bg-green-500/10 text-green-600 border-green-500/20"
                                : practice.difficulty === "Intermedio"
                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                : "bg-red-500/10 text-red-600 border-red-500/20"
                            }`}
                          >
                            {practice.difficulty}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Custom Practice */}
                  <Card className="border-dashed">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h3 className="font-medium">Práctica Personalizada</h3>
                        <textarea
                          className="w-full min-h-[80px] rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Describe qué tema quieres practicar..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              const topic = (
                                e.target as HTMLTextAreaElement
                              ).value;
                              if (topic.trim()) {
                                generatePractice({
                                  title: topic,
                                  description: "Práctica personalizada",
                                  difficulty: "Intermedio",
                                  language: lang,
                                });
                              }
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const textarea = document.querySelector(
                              "textarea"
                            ) as HTMLTextAreaElement;
                            if (textarea?.value.trim()) {
                              generatePractice({
                                title: textarea.value,
                                description: "Práctica personalizada",
                                difficulty: "Intermedio",
                                language: lang,
                              });
                            }
                          }}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generar con IA
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Code Editor & Chat */}
                <div className="lg:col-span-2 space-y-4">
                  {showCodeEditor ? (
                    <>
                      {/* Code Editor */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                              {languageIcons[lang]}
                              Editor de Código
                            </CardTitle>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={requestHint}
                                disabled={isLoading}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Pista
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setShowCodeEditor(false);
                                  setMessages([]);
                                }}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Nueva
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="relative">
                            <SyntaxHighlighter
                              language={lang}
                              style={vscDarkPlus}
                              customStyle={{
                                margin: 0,
                                borderRadius: "0.5rem",
                                fontSize: "0.875rem",
                              }}
                              showLineNumbers
                            >
                              {userCode || currentCode || "// Tu código aquí"}
                            </SyntaxHighlighter>
                            <textarea
                              className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white font-mono text-sm p-4 resize-none focus:outline-none"
                              value={userCode || currentCode}
                              onChange={(e) => {
                                setUserCode(e.target.value);
                              }}
                              spellCheck={false}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={validateCode}
                              disabled={isLoading || !userCode.trim()}
                              className="flex-1"
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : null}
                              Validar Código
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Chat Messages */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">
                            Asistente IA
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="max-h-[300px] overflow-y-auto space-y-4">
                            {messages.map((msg, idx) => (
                              <div
                                key={idx}
                                className={`flex ${
                                  msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >
                                <div
                                  className={`rounded-lg px-4 py-2 max-w-[85%] ${
                                    msg.role === "user"
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted"
                                  }`}
                                >
                                  <div className="text-sm whitespace-pre-wrap">
                                    {msg.content}
                                  </div>
                                  {msg.code && (
                                    <div className="mt-2">
                                      <SyntaxHighlighter
                                        language={msg.language || lang}
                                        style={vscDarkPlus}
                                        customStyle={{
                                          margin: 0,
                                          borderRadius: "0.375rem",
                                          fontSize: "0.75rem",
                                        }}
                                      >
                                        {msg.code}
                                      </SyntaxHighlighter>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            {isLoading && (
                              <div className="flex justify-start">
                                <div className="bg-muted rounded-lg px-4 py-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Input */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="Pregunta sobre tu código..."
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  sendMessage();
                                }
                              }}
                            />
                            <Button
                              size="icon"
                              onClick={sendMessage}
                              disabled={isLoading || !input.trim()}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <Card className="flex items-center justify-center min-h-[400px]">
                      <CardContent className="text-center space-y-4">
                        <Sparkles className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        <div>
                          <h3 className="text-lg font-medium">
                            Selecciona una práctica
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Elige una práctica sugerida o crea una personalizada
                            para comenzar
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
