"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Copy, Check, RotateCcw, Info } from "lucide-react";

const regexExamples = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)" },
  { name: "Teléfono", pattern: "\\+?\\d{1,3}?[- .]?\\(?\\d{2,3}\\)?[- .]?\\d{3,4}[- .]?\\d{4}" },
  { name: "Fecha (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  { name: "IP Address", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b" },
  { name: "Solo números", pattern: "^\\d+$" },
  { name: "Solo letras", pattern: "^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$" },
  { name: "Username", pattern: "^[a-zA-Z0-9_-]{3,16}$" },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
  });
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const testRegex = () => {
    setError("");
    setMatches(null);
    
    if (!pattern || !testString) return;
    
    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join("");
      
      const regex = new RegExp(pattern, flagString);
      const result = testString.match(regex);
      setMatches(result);
    } catch (e) {
      setError("Expresión regular inválida: " + (e as Error).message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`/${pattern}/${Object.entries(flags).filter(([_, v]) => v).map(([k]) => k).join("")}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setPattern("");
    setTestString("");
    setMatches(null);
    setError("");
  };

  const loadExample = (example: typeof regexExamples[0]) => {
    setPattern(example.pattern);
  };

  const highlightMatches = () => {
    if (!matches || !pattern) return testString;
    
    try {
      const regex = new RegExp(`(${pattern})`, Object.entries(flags).filter(([_, v]) => v).map(([k]) => k).join(""));
      return testString.replace(regex, '|||$1|||');
    } catch {
      return testString;
    }
  };

  return (
    <div className="container py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">Regex Tester</h1>
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Nuevo
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Prueba expresiones regulares en tiempo real con resaltado de coincidencias y ejemplos.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500">
            <Zap className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pattern Input */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Patrón Regex</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCopy} disabled={!pattern}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleClear}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono text-purple-500">/</span>
                  <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    placeholder="Escribe tu patrón..."
                    className="flex-1 px-3 py-2 font-mono text-sm bg-slate-950 text-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-2xl font-mono text-purple-500">/</span>
                  <span className="font-mono text-sm text-muted-foreground">
                    {Object.entries(flags).filter(([_, v]) => v).map(([k]) => k).join("")}
                  </span>
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(flags).map(([flag, enabled]) => (
                    <Button
                      key={flag}
                      size="sm"
                      variant={enabled ? "default" : "outline"}
                      onClick={() => setFlags({ ...flags, [flag]: !enabled })}
                      className={enabled ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      {flag} - {
                        flag === 'g' ? 'Global' :
                        flag === 'i' ? 'Case insensitive' :
                        flag === 'm' ? 'Multiline' :
                        'Dotall'
                      }
                    </Button>
                  ))}
                </div>

                {/* Examples */}
                <div>
                  <p className="text-sm font-medium mb-2">Ejemplos rápidos:</p>
                  <div className="flex flex-wrap gap-2">
                    {regexExamples.map((example) => (
                      <Button
                        key={example.name}
                        size="sm"
                        variant="outline"
                        onClick={() => loadExample(example)}
                      >
                        {example.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test String */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Texto de Prueba</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Escribe o pega el texto a probar..."
                className="w-full h-[200px] p-4 font-mono text-sm bg-slate-950 text-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-500" />
                Resultados
              </CardTitle>
              <Button onClick={testRegex} className="bg-purple-600 hover:bg-purple-700">
                Probar Regex
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {error ? (
              <div className="p-4 bg-red-950 text-red-300 rounded-lg font-mono text-sm">
                {error}
              </div>
            ) : matches ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Se encontraron <span className="font-bold text-purple-600">{matches.length}</span> coincidencia(s)
                </p>
                <div className="flex flex-wrap gap-2">
                  {matches.map((match, idx) => (
                    <Badge key={idx} className="bg-purple-500/20 text-purple-700 dark:text-purple-300">
                      {match}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Escribe un patrón y texto para ver las coincidencias...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
