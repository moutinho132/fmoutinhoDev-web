"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Copy, Check, Code2, Lightbulb } from "lucide-react";

const pseudocodeExamples = [
  {
    name: "Algoritmo de Búsqueda",
    code: `ALGORITMO BusquedaLineal
    // Buscar un elemento en una lista
    
    ENTRADA:
        lista: arreglo de números
        elemento: número a buscar
    
    VARIABLES:
        i: entero
        encontrado: booleano
    
    INICIO
        encontrado ← FALSO
        i ← 0
        
        MIENTRAS (i < longitud(lista)) Y (NO encontrado) HACER
            SI lista[i] = elemento ENTONCES
                encontrado ← VERDADERO
                ESCRIBIR "Elemento encontrado en posición:", i
            SI NO
                i ← i + 1
            FIN SI
        FIN MIENTRAS
        
        SI NO encontrado ENTONCES
            ESCRIBIR "Elemento no encontrado"
        FIN SI
    FIN
FIN ALGORITMO`,
  },
  {
    name: "Ordenamiento Burbuja",
    code: `ALGORITMO OrdenamientoBurbuja
    // Ordenar una lista de menor a mayor
    
    ENTRADA:
        lista: arreglo de números
    
    VARIABLES:
        i, j: enteros
        temp: número
    
    INICIO
        PARA i ← 0 HASTA longitud(lista) - 2 HACER
            PARA j ← 0 HASTA longitud(lista) - i - 2 HACER
                SI lista[j] > lista[j + 1] ENTONCES
                    // Intercambiar elementos
                    temp ← lista[j]
                    lista[j] ← lista[j + 1]
                    lista[j + 1] ← temp
                FIN SI
            FIN PARA
        FIN PARA
        
        ESCRIBIR "Lista ordenada:", lista
    FIN
FIN ALGORITMO`,
  },
  {
    name: "Factorial Recursivo",
    code: `ALGORITMO FactorialRecursivo
    // Calcular el factorial de un número
    
    ENTRADA:
        n: entero positivo
    
    VARIABLES:
        resultado: entero
    
    FUNCIÓN factorial(n: entero): entero
        INICIO
            SI n = 0 O n = 1 ENTONCES
                RETORNAR 1
            SI NO
                RETORNAR n * factorial(n - 1)
            FIN SI
        FIN
    FIN FUNCIÓN
    
    INICIO
        LEER "Ingrese un número:", n
        resultado ← factorial(n)
        ESCRIBIR "El factorial de", n, "es:", resultado
    FIN
FIN ALGORITMO`,
  },
  {
    name: "Validación de Datos",
    code: `ALGORITMO ValidarEmail
    // Validar formato de correo electrónico
    
    ENTRADA:
        email: texto
    
    VARIABLES:
        tieneArroba: booleano
        tienePunto: booleano
        i: entero
        posicionArroba: entero
    
    INICIO
        tieneArroba ← FALSO
        tienePunto ← FALSO
        
        // Verificar que tiene @
        PARA i ← 0 HASTA longitud(email) - 1 HACER
            SI email[i] = "@" ENTONCES
                tieneArroba ← VERDADERO
                posicionArroba ← i
            FIN SI
        FIN PARA
        
        // Verificar que tiene punto después del @
        SI tieneArroba ENTONCES
            PARA i ← posicionArroba HASTA longitud(email) - 1 HACER
                SI email[i] = "." ENTONCES
                    tienePunto ← VERDADERO
                FIN SI
            FIN PARA
        FIN SI
        
        // Resultado
        SI tieneArroba Y tienePunto ENTONCES
            ESCRIBIR "Email válido ✓"
        SI NO
            ESCRIBIR "Email inválido ✗"
        FIN SI
    FIN
FIN ALGORITMO`,
  },
];

export default function PseudocodePlayground() {
  const [code, setCode] = useState(pseudocodeExamples[0].code);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    // Simulación de análisis de pseudocódigo
    let result = "═══════════════════════════════════════\n";
    result += "     ANÁLISIS DE PSEUDOCÓDIGO\n";
    result += "═══════════════════════════════════════\n\n";
    
    // Contar estructuras
    const estructuras = {
      bucles: (code.match(/MIENTRAS|PARA|REPETIR/gi) || []).length,
      condicionales: (code.match(/SI|SI NO/gi) || []).length,
      funciones: (code.match(/FUNCIÓN|PROCEDIMIENTO/gi) || []).length,
      variables: (code.match(/VARIABLES:/gi) || []).length,
    };
    
    result += "📊 Estadísticas del Algoritmo:\n";
    result += `   • Bucles detectados: ${estructuras.bucles}\n`;
    result += `   • Condicionales: ${estructuras.condicionales}\n`;
    result += `   • Funciones: ${estructuras.funciones}\n`;
    result += `   • Bloques de variables: ${estructuras.variables}\n\n`;
    
    // Verificar estructura
    result += "✅ Verificación de Estructura:\n";
    if (code.includes("ALGORITMO")) result += "   ✓ Nombre del algoritmo definido\n";
    if (code.includes("INICIO")) result += "   ✓ Bloque de inicio presente\n";
    if (code.includes("FIN")) result += "   ✓ Bloque de fin presente\n";
    if (code.includes("ENTRADA") || code.includes("LEER")) result += "   ✓ Entrada de datos definida\n";
    if (code.includes("SALIDA") || code.includes("ESCRIBIR")) result += "   ✓ Salida de datos definida\n";
    
    result += "\n═══════════════════════════════════════\n";
    result += "✨ Pseudocódigo válido y bien estructurado\n";
    
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
              <h1 className="text-3xl font-bold">Pseudocódigo</h1>
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Nuevo
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Escribe y visualiza algoritmos en pseudocódigo. Perfecto para aprender lógica de programación.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Editor de Pseudocódigo</CardTitle>
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
                <CardTitle className="text-lg">Análisis</CardTitle>
                <Button size="sm" onClick={handleRun} className="gap-2">
                  <Play className="h-4 w-4" />
                  Analizar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[400px] p-4 font-mono text-sm bg-slate-950 text-green-400 overflow-auto whitespace-pre-wrap">
                {output || "// El análisis aparecerá aquí..."}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Ejemplos de Algoritmos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {pseudocodeExamples.map((example) => (
                <Button
                  key={example.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setCode(example.code)}
                  className="hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900"
                >
                  {example.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg text-purple-600 dark:text-purple-400">
              📝 Sintaxis de Pseudocódigo
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Estructuras de Control</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code className="text-purple-600">SI ... ENTONCES ... SI NO ... FIN SI</code></li>
                <li><code className="text-purple-600">MIENTRAS ... HACER ... FIN MIENTRAS</code></li>
                <li><code className="text-purple-600">PARA ... HASTA ... HACER ... FIN PARA</code></li>
                <li><code className="text-purple-600">REPETIR ... HASTA QUE ...</code></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Operaciones</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code className="text-purple-600">LEER</code> - Entrada de datos</li>
                <li><code className="text-purple-600">ESCRIBIR</code> - Salida de datos</li>
                <li><code className="text-purple-600">←</code> - Asignación</li>
                <li><code className="text-purple-600">RETORNAR</code> - Retorno de función</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
