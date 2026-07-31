"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackStartPlayground } from "@/lib/metaPixel";
import { Play, Database, RefreshCw, AlertCircle } from "lucide-react";

// Type for sql.js
interface SqlJsStatic {
  Database: new (data?: ArrayLike<number>) => SqlJsDb;
}

interface SqlJsDb {
  run(sql: string, params?: unknown[]): SqlJsDb;
  exec(sql: string): SqlJsResult[];
  close(): void;
}

interface SqlJsResult {
  columns: string[];
  values: unknown[][];
}

export default function SqlEditor() {
  const [SQL, setSQL] = useState<SqlJsStatic | null>(null);
  const [db, setDb] = useState<SqlJsDb | null>(null);
  const [query, setQuery] = useState<string>("SELECT * FROM usuarios LIMIT 5;");
  const [results, setResults] = useState<SqlJsResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasTracked, setHasTracked] = useState(false);

  // Initialize sql.js and create database
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const initSqlJs = async () => {
      try {
        const sqlModule = await import("sql.js");
        const SQL = await sqlModule.default({
          locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
        });
        setSQL(SQL);

        const newDb = new SQL.Database();

        // Create initial tables with sample data
        newDb.run(`
          CREATE TABLE usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            pais TEXT,
            fecha_registro TEXT
          )
        `);

        newDb.run(`
          CREATE TABLE cursos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            instructor TEXT,
            duracion_horas INTEGER,
            precio REAL,
            categoria TEXT
          )
        `);

        // Insert sample usuarios
        const usuarios = [
          ["Juan García", "juan@example.com", "México", "2024-01-15"],
          ["María López", "maria@example.com", "España", "2024-02-20"],
          ["Carlos Rodríguez", "carlos@example.com", "Argentina", "2024-03-10"],
          ["Ana Martínez", "ana@example.com", "Colombia", "2024-04-05"],
          ["Pedro Sánchez", "pedro@example.com", "Chile", "2024-05-12"],
          ["Laura Fernández", "laura@example.com", "Perú", "2024-06-18"],
          ["Miguel Torres", "miguel@example.com", "México", "2024-07-22"],
          ["Sofia Ruiz", "sofia@example.com", "España", "2024-08-30"],
        ];

        usuarios.forEach((u) => {
          newDb.run(
            "INSERT INTO usuarios (nombre, email, pais, fecha_registro) VALUES (?, ?, ?, ?)",
            u
          );
        });

        // Insert sample cursos
        const cursos = [
          ["Java Spring Boot", "APIs REST escalables", "Fernando Moutinho", 45, 49.99, "Backend"],
          ["SQL desde Cero", "Bases de datos relacionales", "Fernando Moutinho", 30, 29.99, "Base de Datos"],
          ["Git & GitHub", "Control de versiones profesional", "Fernando Moutinho", 20, 19.99, "Herramientas"],
          ["Docker para Devs", "Contenedores y despliegue", "Fernando Moutinho", 25, 39.99, "DevOps"],
          ["Node.js Avanzado", "Backend con JavaScript", "Fernando Moutinho", 40, 59.99, "Backend"],
          ["React Profesional", "Frontend moderno", "Fernando Moutinho", 35, 44.99, "Frontend"],
        ];

        cursos.forEach((c) => {
          newDb.run(
            "INSERT INTO cursos (titulo, descripcion, instructor, duracion_horas, precio, categoria) VALUES (?, ?, ?, ?, ?, ?)",
            c
          );
        });

        setDb(newDb);
        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing sql.js:", err);
        setError("Error al cargar el motor SQL. Por favor, recarga la página.");
        setIsLoading(false);
      }
    };

    initSqlJs();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  const executeQuery = useCallback(() => {
    if (!db || !query.trim()) return;

    // Track playground usage
    if (!hasTracked) {
      trackStartPlayground("sql");
      setHasTracked(true);
    }

    try {
      setError(null);
      const resultsArray = db.exec(query);
      setResults(resultsArray);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en la consulta SQL");
      setResults([]);
    }
  }, [db, query, hasTracked]);

  const resetDatabase = useCallback(() => {
    if (!SQL) return;
    
    if (db) {
      db.close();
    }

    const newDb = new SQL.Database();
    // Recreate tables and data...
    newDb.run(`
      CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        pais TEXT,
        fecha_registro TEXT
      )
    `);

    newDb.run(`
      CREATE TABLE cursos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        instructor TEXT,
        duracion_horas INTEGER,
        precio REAL,
        categoria TEXT
      )
    `);

    const usuarios = [
      ["Juan García", "juan@example.com", "México", "2024-01-15"],
      ["María López", "maria@example.com", "España", "2024-02-20"],
      ["Carlos Rodríguez", "carlos@example.com", "Argentina", "2024-03-10"],
      ["Ana Martínez", "ana@example.com", "Colombia", "2024-04-05"],
      ["Pedro Sánchez", "pedro@example.com", "Chile", "2024-05-12"],
      ["Laura Fernández", "laura@example.com", "Perú", "2024-06-18"],
      ["Miguel Torres", "miguel@example.com", "México", "2024-07-22"],
      ["Sofia Ruiz", "sofia@example.com", "España", "2024-08-30"],
    ];

    usuarios.forEach((u) => {
      newDb.run(
        "INSERT INTO usuarios (nombre, email, pais, fecha_registro) VALUES (?, ?, ?, ?)",
        u
      );
    });

    const cursos = [
      ["Java Spring Boot", "APIs REST escalables", "Fernando Moutinho", 45, 49.99, "Backend"],
      ["SQL desde Cero", "Bases de datos relacionales", "Fernando Moutinho", 30, 29.99, "Base de Datos"],
      ["Git & GitHub", "Control de versiones profesional", "Fernando Moutinho", 20, 19.99, "Herramientas"],
      ["Docker para Devs", "Contenedores y despliegue", "Fernando Moutinho", 25, 39.99, "DevOps"],
      ["Node.js Avanzado", "Backend con JavaScript", "Fernando Moutinho", 40, 59.99, "Backend"],
      ["React Profesional", "Frontend moderno", "Fernando Moutinho", 35, 44.99, "Frontend"],
    ];

    cursos.forEach((c) => {
      newDb.run(
        "INSERT INTO cursos (titulo, descripcion, instructor, duracion_horas, precio, categoria) VALUES (?, ?, ?, ?, ?, ?)",
        c
      );
    });

    setDb(newDb);
    setResults([]);
    setError(null);
    setHasTracked(false);
  }, [SQL, db]);

  const sampleQueries = [
    { label: "Todos los usuarios", query: "SELECT * FROM usuarios;" },
    { label: "Usuarios por país", query: "SELECT pais, COUNT(*) as total FROM usuarios GROUP BY pais ORDER BY total DESC;" },
    { label: "Cursos de Backend", query: "SELECT * FROM cursos WHERE categoria = 'Backend';" },
    { label: "Precio promedio", query: "SELECT categoria, AVG(precio) as precio_promedio FROM cursos GROUP BY categoria;" },
    { label: "JOIN ejemplo", query: "SELECT u.nombre, c.titulo FROM usuarios u, cursos c WHERE u.pais = 'México' LIMIT 5;" },
  ];

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <Database className="h-8 w-8 animate-pulse mr-2" />
          <span>Cargando motor SQL...</span>
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
                <Database className="h-5 w-5" />
                Editor SQL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-32 p-4 font-mono text-sm bg-muted rounded-lg border border-input focus:ring-2 focus:ring-ring focus:outline-none resize-y"
                placeholder="Escribe tu consulta SQL aquí..."
                spellCheck={false}
              />
              <div className="flex gap-2">
                <Button onClick={executeQuery} className="gap-2">
                  <Play className="h-4 w-4" />
                  Ejecutar
                </Button>
                <Button variant="outline" onClick={resetDatabase} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Reiniciar DB
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="flex items-start gap-2 p-4 bg-destructive/10 text-destructive rounded-lg mb-4">
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Error en la consulta</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
              {results.length === 0 && !error && (
                <p className="text-muted-foreground text-center py-8">
                  Ejecuta una consulta para ver los resultados
                </p>
              )}
              {results.map((result, idx) => (
                <div key={idx} className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        {result.columns.map((col, colIdx) => (
                          <th key={colIdx} className="border px-4 py-2 text-left font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.values.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-muted/50">
                          {(row as unknown[]).map((cell, cellIdx) => (
                            <td key={cellIdx} className="border px-4 py-2">
                              {cell !== null ? String(cell) : <span className="text-muted-foreground italic">NULL</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-sm text-muted-foreground mt-2">
                    {(result.values as unknown[][]).length} fila(s) retornada(s)
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sample Queries Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Consultas de Ejemplo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleQueries.map((sq, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => setQuery(sq.query)}
                >
                  {sq.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tablas Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-sm">usuarios</p>
                  <p className="text-xs text-muted-foreground">id, nombre, email, pais, fecha_registro</p>
                </div>
                <div>
                  <p className="font-medium text-sm">cursos</p>
                  <p className="text-xs text-muted-foreground">id, titulo, descripcion, instructor, duracion_horas, precio, categoria</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
