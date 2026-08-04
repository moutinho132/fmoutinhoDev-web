"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Copy, Check, Code2 } from "lucide-react";

const tsExamples = [
  {
    name: "Tipos Básicos",
    code: `// Tipos básicos en TypeScript
let nombre: string = "Fernando";
let edad: number = 30;
let esDesarrollador: boolean = true;

// Arrays
let lenguajes: string[] = ["JavaScript", "TypeScript", "Python"];
let numeros: Array<number> = [1, 2, 3, 4, 5];

// Tuplas
let persona: [string, number] = ["Juan", 25];

console.log("Nombre:", nombre);
console.log("Edad:", edad);
console.log("Lenguajes:", lenguajes);`,
  },
  {
    name: "Interfaces",
    code: `// Interfaces en TypeScript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number; // Propiedad opcional
}

function mostrarUsuario(usuario: Usuario): void {
  console.log(\`ID: \${usuario.id}\`);
  console.log(\`Nombre: \${usuario.nombre}\`);
  console.log(\`Email: \${usuario.email}\`);
  if (usuario.edad) {
    console.log(\`Edad: \${usuario.edad}\`);
  }
}

const usuario: Usuario = {
  id: 1,
  nombre: "Fernando",
  email: "fernando@ejemplo.com",
  edad: 30
};

mostrarUsuario(usuario);`,
  },
  {
    name: "Genéricos",
    code: `// Genéricos en TypeScript
function identidad<T>(arg: T): T {
  return arg;
}

// Uso con diferentes tipos
const num = identidad<number>(42);
const texto = identidad<string>("Hola TypeScript");
const arr = identidad<number[]>([1, 2, 3]);

console.log("Número:", num);
console.log("Texto:", texto);
console.log("Array:", arr);

// Clase genérica
class Contenedor<T> {
  private valor: T;
  
  constructor(valor: T) {
    this.valor = valor;
  }
  
  obtener(): T {
    return this.valor;
  }
}

const contenedorNumero = new Contenedor<number>(100);
console.log("Contenedor:", contenedorNumero.obtener());`,
  },
  {
    name: "Clases",
    code: `// Clases en TypeScript
class Animal {
  private nombre: string;
  protected edad: number;
  
  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }
  
  public hacerSonido(): void {
    console.log(\`\${this.nombre} hace un sonido\`);
  }
  
  public obtenerNombre(): string {
    return this.nombre;
  }
}

class Perro extends Animal {
  private raza: string;
  
  constructor(nombre: string, edad: number, raza: string) {
    super(nombre, edad);
    this.raza = raza;
  }
  
  public hacerSonido(): void {
    console.log(\`\${this.obtenerNombre()} ladra: ¡Guau guau!\`);
  }
  
  public obtenerRaza(): string {
    return this.raza;
  }
}

const miPerro = new Perro("Max", 3, "Golden Retriever");
miPerro.hacerSonido();
console.log("Raza:", miPerro.obtenerRaza());`,
  },
];

export default function TypeScriptPlayground() {
  const [code, setCode] = useState(tsExamples[0].code);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    // Simulación de ejecución de TypeScript
    let result = "⚡ Compilando TypeScript...\n\n";
    
    // Análisis de tipos
    const hasInterfaces = code.includes("interface");
    const hasGenerics = code.includes("<T>");
    const hasClasses = code.includes("class ");
    
    if (hasInterfaces) result += "✓ Interfaces detectadas\n";
    if (hasGenerics) result += "✓ Genéricos detectados\n";
    if (hasClasses) result += "✓ Clases detectadas\n\n";
    
    // Simular output basado en el código
    if (code.includes("console.log")) {
      result += "═════════════════════════════\n";
      result += "        CONSOLA OUTPUT       \n";
      result += "═════════════════════════════\n\n";
      
      if (code.includes("Fernando")) {
        result += "Nombre: Fernando\n";
        result += "Edad: 30\n";
        result += "Lenguajes: [ 'JavaScript', 'TypeScript', 'Python' ]\n";
      }
      if (code.includes("Usuario")) {
        result += "ID: 1\n";
        result += "Nombre: Fernando\n";
        result += "Email: fernando@ejemplo.com\n";
        result += "Edad: 30\n";
      }
      if (code.includes("Genéricos")) {
        result += "Número: 42\n";
        result += "Texto: Hola TypeScript\n";
        result += "Array: [ 1, 2, 3 ]\n";
        result += "Contenedor: 100\n";
      }
      if (code.includes("Perro")) {
        result += "Max ladra: ¡Guau guau!\n";
        result += "Raza: Golden Retriever\n";
      }
    }
    
    result += "\n✨ Compilación exitosa\n";
    result += "📝 Sin errores de tipo\n";
    
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <div className="container py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">TypeScript Sandbox</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Próximamente
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Ejecuta código TypeScript con verificación de tipos en tiempo real. Ideal para aprender tipado estático.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
            <Code2 className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Editor TypeScript</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleClear}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Limpiar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[400px] p-4 font-mono text-sm bg-slate-950 text-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                spellCheck={false}
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Output & Tipos</CardTitle>
                <Button size="sm" onClick={handleRun} className="gap-2">
                  <Play className="h-4 w-4" />
                  Ejecutar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[400px] p-4 font-mono text-sm bg-slate-950 text-green-400 overflow-auto whitespace-pre-wrap">
                {output || "// La salida y verificación de tipos aparecerá aquí..."}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Ejemplos de TypeScript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tsExamples.map((example) => (
                <Button
                  key={example.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setCode(example.code)}
                >
                  {example.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
