"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackStartPlayground } from "@/lib/metaPixel";
import { Play, RotateCcw, Code2 } from "lucide-react";

interface ConsoleOutput {
  type: "log" | "error" | "warn" | "info";
  message: string;
  timestamp: Date;
}

export default function JsSandbox() {
  const [code, setCode] = useState<string>(`// ¡Bienvenido al Playground de JavaScript!
// Escribe tu código aquí y presiona "Ejecutar"

// Ejemplo: Variables y arrays
const numeros = [1, 2, 3, 4, 5];
console.log("Array original:", numeros);

// Ejemplo: Métodos de array
const duplicados = numeros.map(n => n * 2);
console.log("Array duplicado:", duplicados);

// Ejemplo: Función
function saludar(nombre) {
  return "¡Hola, " + nombre + "!";
}

console.log(saludar("Desarrollador"));

// Ejemplo: Bucle
for (let i = 1; i <= 5; i++) {
  console.log("Iteración:", i);
}
`);
  const [output, setOutput] = useState<ConsoleOutput[]>([]);
  const [hasTracked, setHasTracked] = useState(false);

  const addOutput = useCallback((type: ConsoleOutput["type"], message: string) => {
    setOutput((prev) => [...prev, { type, message, timestamp: new Date() }]);
  }, []);

  const executeCode = useCallback(() => {
    // Track playground usage
    if (!hasTracked) {
      trackStartPlayground("js");
      setHasTracked(true);
    }

    // Clear previous output
    setOutput([]);

    // Create a custom console object
    const customConsole = {
      log: (...args: unknown[]) => {
        addOutput("log", args.map(a => formatValue(a)).join(" "));
      },
      error: (...args: unknown[]) => {
        addOutput("error", args.map(a => formatValue(a)).join(" "));
      },
      warn: (...args: unknown[]) => {
        addOutput("warn", args.map(a => formatValue(a)).join(" "));
      },
      info: (...args: unknown[]) => {
        addOutput("info", args.map(a => formatValue(a)).join(" "));
      },
    };

    try {
      // Create a function with the custom console in scope
      const fn = new Function("console", code);
      fn(customConsole);
    } catch (error) {
      addOutput("error", `Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [code, hasTracked, addOutput]);

  const formatValue = (value: unknown): string => {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "object") {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  const resetCode = useCallback(() => {
    setCode(`// ¡Bienvenido al Playground de JavaScript!
// Escribe tu código aquí y presiona "Ejecutar"

// Ejemplo: Variables y arrays
const numeros = [1, 2, 3, 4, 5];
console.log("Array original:", numeros);

// Ejemplo: Métodos de array
const duplicados = numeros.map(n => n * 2);
console.log("Array duplicado:", duplicados);

// Ejemplo: Función
function saludar(nombre) {
  return "¡Hola, " + nombre + "!";
}

console.log(saludar("Desarrollador"));

// Ejemplo: Bucle
for (let i = 1; i <= 5; i++) {
  console.log("Iteración:", i);
}
`);
    setOutput([]);
    setHasTracked(false);
  }, []);

  const sampleCode = [
    {
      label: "Variables y Arrays",
      code: `// Variables y Arrays
const frutas = ["manzana", "banana", "naranja"];
console.log("Lista de frutas:", frutas);
console.log("Primera fruta:", frutas[0]);
console.log("Total de frutas:", frutas.length);`,
    },
    {
      label: "Objetos",
      code: `// Objetos
const persona = {
  nombre: "Fernando",
  edad: 30,
  profesion: "Ingeniero de Software"
};

console.log("Persona:", persona);
console.log("Nombre:", persona.nombre);
console.log("Es mayor de edad:", persona.edad >= 18);`,
    },
    {
      label: "Funciones",
      code: `// Funciones
function calcularAreaRectangulo(ancho, alto) {
  return ancho * alto;
}

const area = calcularAreaRectangulo(5, 10);
console.log("Área del rectángulo:", area);

// Arrow function
const duplicar = (n) => n * 2;
console.log("Duplicar 7:", duplicar(7));`,
    },
    {
      label: "Bucles",
      code: `// Bucle for
console.log("Contando del 1 al 5:");
for (let i = 1; i <= 5; i++) {
  console.log("  Número:", i);
}

// Bucle forEach
const colores = ["rojo", "verde", "azul"];
console.log("\\nColores:");
colores.forEach((color, idx) => {
  console.log(\`  \${idx + 1}. \${color}\`);
});`,
    },
    {
      label: "Manipulación de Arrays",
      code: `// Métodos de Array
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter
const pares = numeros.filter(n => n % 2 === 0);
console.log("Números pares:", pares);

// Map
const cuadrados = numeros.map(n => n * n);
console.log("Cuadrados:", cuadrados.slice(0, 5));

// Reduce
const suma = numeros.reduce((acc, n) => acc + n, 0);
console.log("Suma total:", suma);

// Find
const mayorQue5 = numeros.find(n => n > 5);
console.log("Primer número mayor que 5:", mayorQue5);`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Editor JavaScript
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-muted rounded-lg border border-input focus:ring-2 focus:ring-ring focus:outline-none resize-y"
                placeholder="Escribe tu código JavaScript aquí..."
                spellCheck={false}
              />
              <div className="flex gap-2">
                <Button onClick={executeCode} className="gap-2">
                  <Play className="h-4 w-4" />
                  Ejecutar
                </Button>
                <Button variant="outline" onClick={clearOutput} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Limpiar Consola
                </Button>
                <Button variant="ghost" onClick={resetCode}>
                  Reiniciar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Console Output */}
          <Card>
            <CardHeader>
              <CardTitle>Consola</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto font-mono text-sm">
                {output.length === 0 ? (
                  <p className="text-gray-500 italic">
                    La salida aparecerá aquí...
                  </p>
                ) : (
                  output.map((item, idx) => (
                    <div
                      key={idx}
                      className={`mb-1 ${
                        item.type === "error"
                          ? "text-red-400"
                          : item.type === "warn"
                          ? "text-yellow-400"
                          : item.type === "info"
                          ? "text-blue-400"
                          : "text-green-400"
                      }`}
                    >
                      <span className="text-gray-600 text-xs mr-2">
                        [{item.timestamp.toLocaleTimeString()}]
                      </span>
                      <span className="whitespace-pre-wrap">{item.message}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Code Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ejemplos de Código</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleCode.map((sample, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => setCode(sample.code)}
                >
                  {sample.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Consejos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Usa <code className="bg-muted px-1 rounded">console.log()</code> para ver valores</li>
                <li>• Las variables declaradas con <code className="bg-muted px-1 rounded">let</code> y <code className="bg-muted px-1 rounded">const</code> son recomendadas</li>
                <li>• Puedes declarar funciones y usarlas inmediatamente</li>
                <li>• Los errores se mostrarán en rojo en la consola</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
