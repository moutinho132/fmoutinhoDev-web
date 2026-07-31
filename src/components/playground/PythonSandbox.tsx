"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackStartPlayground } from "@/lib/metaPixel";
import { Play, RotateCcw, Code2, Loader2 } from "lucide-react";

interface ConsoleOutput {
  type: "stdout" | "stderr" | "result";
  message: string;
  timestamp: Date;
}

declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: {
    get: (name: string) => unknown;
  };
  loadPackage: (packages: string | string[]) => Promise<void>;
}

export default function PythonSandbox() {
  const [code, setCode] = useState<string>(`# ¡Bienvenido al Playground de Python!
# Escribe tu código aquí y presiona "Ejecutar"

# Ejemplo: Variables y listas
numeros = [1, 2, 3, 4, 5]
print("Lista original:", numeros)

# Ejemplo: List comprehension
duplicados = [n * 2 for n in numeros]
print("Lista duplicada:", duplicados)

# Ejemplo: Función
def saludar(nombre):
    return f"¡Hola, {nombre}!"

print(saludar("Desarrollador"))

# Ejemplo: Bucle
for i in range(1, 6):
    print(f"Iteración: {i}")
`);
  const [output, setOutput] = useState<ConsoleOutput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasTracked, setHasTracked] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Load Pyodide
  useEffect(() => {
    const loadPyodideInstance = async () => {
      try {
        // Load Pyodide script
        if (!document.querySelector('script[src*="pyodide"]')) {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
          script.async = true;
          document.head.appendChild(script);
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }

        // Initialize Pyodide
        const pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
        });
        
        setPyodide(pyodideInstance);
        setIsLoading(false);
        addOutput("stdout", "Python listo para ejecutar. ¡Comienza a programar!");
      } catch (err) {
        console.error("Error loading Pyodide:", err);
        setError("Error al cargar Python. Por favor, recarga la página.");
        setIsLoading(false);
      }
    };

    loadPyodideInstance();
  }, []);

  const addOutput = useCallback((type: ConsoleOutput["type"], message: string) => {
    setOutput((prev) => [...prev, { type, message, timestamp: new Date() }]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executeCode = useCallback(async () => {
    if (!pyodide || isRunning) return;

    // Track playground usage
    if (!hasTracked) {
      trackStartPlayground("python");
      setHasTracked(true);
    }

    setIsRunning(true);
    setOutput([]);

    try {
      // Redirect stdout/stderr
      await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      // Run user code
      const result = await pyodide.runPythonAsync(code);

      // Get stdout/stderr
      const stdout = await pyodide.runPythonAsync("sys.stdout.getvalue()");
      const stderr = await pyodide.runPythonAsync("sys.stderr.getvalue()");

      if (stdout) {
        (stdout as string).split("\n").forEach((line) => {
          if (line) addOutput("stdout", line);
        });
      }

      if (stderr) {
        (stderr as string).split("\n").forEach((line) => {
          if (line) addOutput("stderr", line);
        });
      }

      if (result !== undefined && result !== null) {
        addOutput("result", String(result));
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      addOutput("stderr", errorMsg);
    } finally {
      setIsRunning(false);
    }
  }, [pyodide, code, isRunning, hasTracked, addOutput]);

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  const resetCode = useCallback(() => {
    setCode(`# ¡Bienvenido al Playground de Python!
# Escribe tu código aquí y presiona "Ejecutar"

# Ejemplo: Variables y listas
numeros = [1, 2, 3, 4, 5]
print("Lista original:", numeros)

# Ejemplo: List comprehension
duplicados = [n * 2 for n in numeros]
print("Lista duplicada:", duplicados)

# Ejemplo: Función
def saludar(nombre):
    return f"¡Hola, {nombre}!"

print(saludar("Desarrollador"))

# Ejemplo: Bucle
for i in range(1, 6):
    print(f"Iteración: {i}")
`);
    setOutput([]);
    setHasTracked(false);
  }, []);

  const sampleCode = [
    {
      label: "Variables y Listas",
      code: `# Variables y Listas
frutas = ["manzana", "banana", "naranja"]
print("Lista de frutas:", frutas)
print("Primera fruta:", frutas[0])
print("Total de frutas:", len(frutas))`,
    },
    {
      label: "Diccionarios",
      code: `# Diccionarios
persona = {
    "nombre": "Fernando",
    "edad": 30,
    "profesion": "Ingeniero de Software"
}

print("Persona:", persona)
print("Nombre:", persona["nombre"])
print("Es mayor de edad:", persona["edad"] >= 18)`,
    },
    {
      label: "Funciones",
      code: `# Funciones
def calcular_area_rectangulo(ancho, alto):
    return ancho * alto

area = calcular_area_rectangulo(5, 10)
print("Área del rectángulo:", area)

# Función lambda
duplicar = lambda n: n * 2
print("Duplicar 7:", duplicar(7))`,
    },
    {
      label: "Bucles",
      code: `# Bucle for
print("Contando del 1 al 5:")
for i in range(1, 6):
    print(f"  Número: {i}")

# Bucle con enumerate
colores = ["rojo", "verde", "azul"]
print("\\nColores:")
for idx, color in enumerate(colores, 1):
    print(f"  {idx}. {color}")`,
    },
    {
      label: "List Comprehension",
      code: `# List Comprehension
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter
pares = [n for n in numeros if n % 2 == 0]
print("Números pares:", pares)

# Map
cuadrados = [n ** 2 for n in numeros]
print("Cuadrados:", cuadrados[:5])

# Nested
matriz = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print("Matriz 3x3:", matriz)`,
    },
    {
      label: "Clases",
      code: `# Clases
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
    
    def saludar(self):
        return f"Hola, soy {self.nombre}"
    
    def es_mayor(self):
        return self.edad >= 18

persona = Persona("Fernando", 30)
print(persona.saludar())
print("Es mayor de edad:", persona.es_mayor())`,
    },
  ];

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Cargando Python (Pyodide)...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12 text-destructive">
          <span>{error}</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Editor Python
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-muted rounded-lg border border-input focus:ring-2 focus:ring-ring focus:outline-none resize-y"
                placeholder="Escribe tu código Python aquí..."
                spellCheck={false}
              />
              <div className="flex gap-2">
                <Button onClick={executeCode} disabled={isRunning} className="gap-2">
                  {isRunning ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
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
              <div
                ref={outputRef}
                className="bg-black rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto font-mono text-sm"
              >
                {output.length === 0 ? (
                  <p className="text-gray-500 italic">
                    La salida aparecerá aquí...
                  </p>
                ) : (
                  output.map((item, idx) => (
                    <div
                      key={idx}
                      className={`mb-1 ${
                        item.type === "stderr"
                          ? "text-red-400"
                          : item.type === "result"
                          ? "text-yellow-400"
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
                <li>• Usa <code className="bg-muted px-1 rounded">print()</code> para ver valores</li>
                <li>• Python 3.11+ corriendo en el navegador</li>
                <li>• Soporta librerías estándar de Python</li>
                <li>• Los errores se mostrarán en rojo</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
