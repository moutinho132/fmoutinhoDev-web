"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Copy, Check, Terminal } from "lucide-react";

const goExamples = [
  {
    name: "Hola Mundo",
    code: `package main

import "fmt"

func main() {
    fmt.Println("¡Hola desde Go!")
}`,
  },
  {
    name: "Goroutines",
    code: `package main

import (
    "fmt"
    "time"
)

func sayHello(id int) {
    for i := 0; i < 3; i++ {
        fmt.Printf("Goroutine %d: mensaje %d\\n", id, i)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go sayHello(1)
    go sayHello(2)
    time.Sleep(500 * time.Millisecond)
    fmt.Println("Programa terminado")
}`,
  },
  {
    name: "Channels",
    code: `package main

import "fmt"

func sum(s []int, c chan int) {
    sum := 0
    for _, v := range s {
        sum += v
    }
    c <- sum
}

func main() {
    s := []int{7, 2, 8, -9, 4, 0}
    c := make(chan int)
    
    go sum(s[:len(s)/2], c)
    go sum(s[len(s)/2:], c)
    
    x, y := <-c, <-c
    fmt.Printf("Suma primera mitad: %d\\n", x)
    fmt.Printf("Suma segunda mitad: %d\\n", y)
    fmt.Printf("Total: %d\\n", x+y)
}`,
  },
  {
    name: "Structs y Métodos",
    code: `package main

import "fmt"

type Persona struct {
    Nombre string
    Edad   int
}

func (p Persona) Saludar() {
    fmt.Printf("¡Hola! Soy %s y tengo %d años\\n", p.Nombre, p.Edad)
}

func main() {
    persona := Persona{Nombre: "Fernando", Edad: 30}
    persona.Saludar()
}`,
  },
];

export default function GoPlayground() {
  const [code, setCode] = useState(goExamples[0].code);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    // Simulación de ejecución de Go
    const lines = code.split('\n');
    let result = "";
    
    if (code.includes('fmt.Println("¡Hola desde Go!")')) {
      result = "¡Hola desde Go!\n\nProgram exited with status 0";
    } else if (code.includes('Goroutine')) {
      result = `Goroutine 1: mensaje 0
Goroutine 2: mensaje 0
Goroutine 1: mensaje 1
Goroutine 2: mensaje 1
Goroutine 1: mensaje 2
Goroutine 2: mensaje 2
Programa terminado

Program exited with status 0`;
    } else if (code.includes('chan int')) {
      result = `Suma primera mitad: 17
Suma segunda mitad: -5
Total: 12

Program exited with status 0`;
    } else if (code.includes('Persona')) {
      result = `¡Hola! Soy Fernando y tengo 30 años

Program exited with status 0`;
    } else {
      result = "Ejecutando código Go...\n\nProgram exited with status 0";
    }
    
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
              <h1 className="text-3xl font-bold">Go Playground</h1>
              <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                Próximamente
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Ejecuta código Go directamente en tu navegador. Aprende concurrent programming, channels y más.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500">
            <Terminal className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Editor de Código</CardTitle>
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
                <CardTitle className="text-lg">Salida</CardTitle>
                <Button size="sm" onClick={handleRun} className="gap-2">
                  <Play className="h-4 w-4" />
                  Ejecutar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[400px] p-4 font-mono text-sm bg-slate-950 text-green-400 overflow-auto whitespace-pre-wrap">
                {output || "// La salida aparecerá aquí..."}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Ejemplos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {goExamples.map((example) => (
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
