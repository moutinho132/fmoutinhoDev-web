"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileJson, Copy, Check, RotateCcw, Download, Upload } from "lucide-react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = (indent: number = 2) => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
    } catch (e) {
      setError("JSON inválido: " + (e as Error).message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (e) {
      setError("JSON inválido: " + (e as Error).message);
      setOutput("");
    }
  };

  const validateJSON = () => {
    setError("");
    try {
      JSON.parse(input);
      setOutput("✅ JSON válido");
    } catch (e) {
      setError("❌ JSON inválido: " + (e as Error).message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const sampleJSON = {
    nombre: "Fernando Moutinho",
    rol: "Fullstack Developer",
    tecnologias: ["Java", "TypeScript", "Python", "Go"],
    experiencia: 8,
    activo: true,
  };

  const loadSample = () => {
    setInput(JSON.stringify(sampleJSON, null, 2));
  };

  return (
    <div className="container py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">JSON Formatter</h1>
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Nuevo
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Formatea, valida y convierte JSON. Soporta minificación, indentación personalizada y más.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600">
            <FileJson className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Input JSON</CardTitle>
                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <input type="file" accept=".json" onChange={handleUpload} className="hidden" />
                    <Button size="sm" variant="outline" asChild>
                      <span className="gap-2">
                        <Upload className="h-4 w-4" />
                        Cargar
                      </span>
                    </Button>
                  </label>
                  <Button size="sm" variant="outline" onClick={loadSample}>
                    Ejemplo
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleClear}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"ejemplo": "Pega tu JSON aquí"}'
                className="w-full h-[400px] p-4 font-mono text-sm bg-slate-950 text-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                spellCheck={false}
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Output</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCopy} disabled={!output}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleDownload} disabled={!output || !!error}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className={`w-full h-[400px] p-4 font-mono text-sm overflow-auto ${error ? "bg-red-950 text-red-300" : "bg-slate-950 text-green-400"}`}>
                {error || output || "// El resultado aparecerá aquí..."}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => formatJSON(2)} className="bg-purple-600 hover:bg-purple-700">
                Formatear (2 espacios)
              </Button>
              <Button onClick={() => formatJSON(4)} variant="outline">
                Formatear (4 espacios)
              </Button>
              <Button onClick={minifyJSON} variant="outline">
                Minificar
              </Button>
              <Button onClick={validateJSON} variant="outline">
                Validar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
