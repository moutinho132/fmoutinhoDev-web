"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackStartPlayground } from "@/lib/metaPixel";
import { Play, RotateCcw, GitBranch, GitCommit, GitMerge, Plus, MinusCircle } from "lucide-react";

interface Commit {
  id: string;
  message: string;
  branch: string;
  parentIds: string[];
  x: number;
  y: number;
}

interface Branch {
  name: string;
  color: string;
  headCommitId: string | null;
}

export default function GitSimulator() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [branches, setBranches] = useState<Branch[]>([
    { name: "main", color: "#3b82f6", headCommitId: null },
  ]);
  const [currentBranch, setCurrentBranch] = useState<string>("main");
  const [command, setCommand] = useState<string>("");
  const [output, setOutput] = useState<string[]>([
    "Bienvenido al Simulador de Git interactivo",
    "Escribe comandos como: git init, git add, git commit, git branch, git checkout, git merge",
    "",
  ]);
  const [staged, setStaged] = useState<boolean>(false);
  const [hasTracked, setHasTracked] = useState(false);

  const addOutput = useCallback((message: string) => {
    setOutput((prev) => [...prev, message]);
  }, []);

  const generateCommitId = (): string => {
    return Math.random().toString(16).substring(2, 9);
  };

  const getCurrentBranch = useCallback(() => {
    return branches.find((b) => b.name === currentBranch);
  }, [branches, currentBranch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const executeCommand = useCallback(() => {
    // Track playground usage
    if (!hasTracked) {
      trackStartPlayground("git");
      setHasTracked(true);
    }

    const cmd = command.trim().toLowerCase();
    const parts = cmd.split(" ");

    if (parts[0] !== "git") {
      addOutput(`Error: &quot;${command}&quot; no es un comando git válido.`);
      setCommand("");
      return;
    }

    const gitCmd = parts[1];

    switch (gitCmd) {
      case "init":
        handleGitInit();
        break;
      case "add":
        handleGitAdd();
        break;
      case "commit":
        handleGitCommit(cmd);
        break;
      case "branch":
        handleGitBranch(cmd);
        break;
      case "checkout":
        handleGitCheckout(cmd);
        break;
      case "merge":
        handleGitMerge(cmd);
        break;
      case "log":
        handleGitLog();
        break;
      case "status":
        handleGitStatus();
        break;
      default:
        addOutput(`Error: Comando &quot;git ${gitCmd}&quot; no reconocido.`);
    }

    setCommand("");
  }, [command, commits, branches, currentBranch, staged, hasTracked]);

  const handleGitInit = () => {
    if (commits.length > 0) {
      addOutput("Repositorio ya inicializado.");
      return;
    }
    addOutput("Repositorio Git inicializado en /proyecto");
    addOutput("");
  };

  const handleGitAdd = () => {
    setStaged(true);
    addOutput("Archivos agregados al área de staging.");
    addOutput("");
  };

  const handleGitCommit = (cmd: string) => {
    const match = cmd.match(/git commit -m "([^"]+)"/);
    if (!match) {
      addOutput('Uso: git commit -m "mensaje del commit"');
      addOutput("");
      return;
    }

    if (!staged) {
      addOutput("Nada para confirmar. Usa 'git add' primero.");
      addOutput("");
      return;
    }

    const message = match[1];
    const commitId = generateCommitId();
    const currentBranchData = getCurrentBranch();

    const newCommit: Commit = {
      id: commitId,
      message,
      branch: currentBranch,
      parentIds: currentBranchData?.headCommitId ? [currentBranchData.headCommitId] : [],
      x: commits.length,
      y: branches.findIndex((b) => b.name === currentBranch),
    };

    setCommits((prev) => [...prev, newCommit]);
    setBranches((prev) =>
      prev.map((b) =>
        b.name === currentBranch ? { ...b, headCommitId: commitId } : b
      )
    );
    setStaged(false);

    addOutput(`[${currentBranch} ${commitId.substring(0, 7)}] ${message}`);
    addOutput(`  1 file changed, 1 insertion(+)`);
    addOutput("");
  };

  const handleGitBranch = (cmd: string) => {
    const match = cmd.match(/git branch (\w+)/);
    if (!match) {
      // List branches
      addOutput("Ramas:");
      branches.forEach((b) => {
        const marker = b.name === currentBranch ? "* " : "  ";
        addOutput(`${marker}${b.name}`);
      });
      addOutput("");
      return;
    }

    const branchName = match[1];
    if (branches.find((b) => b.name === branchName)) {
      addOutput(`Error: La rama '${branchName}' ya existe.`);
      addOutput("");
      return;
    }

    const currentBranchData = getCurrentBranch();
    const colors = ["#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

    const newBranch: Branch = {
      name: branchName,
      color: colors[branches.length % colors.length],
      headCommitId: currentBranchData?.headCommitId || null,
    };

    setBranches((prev) => [...prev, newBranch]);
    addOutput(`Rama '${branchName}' creada.`);
    addOutput("");
  };

  const handleGitCheckout = (cmd: string) => {
    const match = cmd.match(/git checkout (-b )?(\w+)/);
    if (!match) {
      addOutput("Uso: git checkout <rama> o git checkout -b <nueva-rama>");
      addOutput("");
      return;
    }

    const isCreateNew = match[1] === "-b ";
    const branchName = match[2];

    if (isCreateNew) {
      // Create and checkout new branch
      if (branches.find((b) => b.name === branchName)) {
        addOutput(`Error: La rama '${branchName}' ya existe.`);
        addOutput("");
        return;
      }

      const currentBranchData = getCurrentBranch();
      const colors = ["#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

      const newBranch: Branch = {
        name: branchName,
        color: colors[branches.length % colors.length],
        headCommitId: currentBranchData?.headCommitId || null,
      };

      setBranches((prev) => [...prev, newBranch]);
      setCurrentBranch(branchName);
      addOutput(`Rama '${branchName}' creada y activada.`);
      addOutput("");
    } else {
      // Checkout existing branch
      const branch = branches.find((b) => b.name === branchName);
      if (!branch) {
        addOutput(`Error: La rama '${branchName}' no existe.`);
        addOutput("");
        return;
      }

      setCurrentBranch(branchName);
      addOutput(`Cambiado a rama '${branchName}'.`);
      addOutput("");
    }
  };

  const handleGitMerge = (cmd: string) => {
    const match = cmd.match(/git merge (\w+)/);
    if (!match) {
      addOutput("Uso: git merge <rama>");
      addOutput("");
      return;
    }

    const sourceBranchName = match[1];
    const sourceBranch = branches.find((b) => b.name === sourceBranchName);

    if (!sourceBranch) {
      addOutput(`Error: La rama '${sourceBranchName}' no existe.`);
      addOutput("");
      return;
    }

    if (sourceBranchName === currentBranch) {
      addOutput("Error: No puedes fusionar una rama consigo misma.");
      addOutput("");
      return;
    }

    if (!sourceBranch.headCommitId) {
      addOutput(`Error: La rama '${sourceBranchName}' no tiene commits.`);
      addOutput("");
      return;
    }

    const currentBranchData = getCurrentBranch();
    const commitId = generateCommitId();
    const message = `Merge branch '${sourceBranchName}' into ${currentBranch}`;

    const newCommit: Commit = {
      id: commitId,
      message,
      branch: currentBranch,
      parentIds: [
        currentBranchData?.headCommitId || sourceBranch.headCommitId,
        sourceBranch.headCommitId,
      ],
      x: commits.length,
      y: branches.findIndex((b) => b.name === currentBranch),
    };

    setCommits((prev) => [...prev, newCommit]);
    setBranches((prev) =>
      prev.map((b) =>
        b.name === currentBranch ? { ...b, headCommitId: commitId } : b
      )
    );

    addOutput(`Merge made by the 'ort' strategy.`);
    addOutput(`${message}`);
    addOutput("");
  };

  const handleGitLog = () => {
    if (commits.length === 0) {
      addOutput("No hay commits aún.");
      addOutput("");
      return;
    }

    const currentBranchData = getCurrentBranch();
    addOutput("Historial de commits:");
    commits
      .filter((c) => c.branch === currentBranch || c.message.includes("Merge"))
      .reverse()
      .forEach((c) => {
        addOutput(`commit ${c.id}`);
        addOutput(`Author: Usuario <usuario@example.com>`);
        addOutput(`    ${c.message}`);
        addOutput("");
      });
  };

  const handleGitStatus = () => {
    addOutput(`En la rama ${currentBranch}`);
    if (staged) {
      addOutput("Cambios listos para confirmar:");
      addOutput("  (usa 'git commit -m \"mensaje\"' para confirmar)");
      addOutput("    modificado:   archivo.txt");
    } else {
      addOutput("Nada para confirmar, directorio de trabajo limpio.");
    }
    addOutput("");
  };

  const resetSimulator = () => {
    setCommits([]);
    setBranches([{ name: "main", color: "#3b82f6", headCommitId: null }]);
    setCurrentBranch("main");
    setCommand("");
    setOutput([
      "Simulador reiniciado.",
      "Escribe comandos como: git init, git add, git commit, git branch, git checkout, git merge",
      "",
    ]);
    setStaged(false);
    setHasTracked(false);
  };

  const sampleCommands = [
    { label: "git init", command: "git init" },
    { label: "git add .", command: "git add ." },
    { label: "git commit", command: 'git commit -m "Primer commit"' },
    { label: "Crear rama", command: "git branch feature" },
    { label: "Cambiar rama", command: "git checkout feature" },
    { label: "Nueva rama", command: "git checkout -b nueva-funcionalidad" },
    { label: "Ver ramas", command: "git branch" },
    { label: "Ver log", command: "git log" },
    { label: "Ver estado", command: "git status" },
    { label: "Fusionar", command: "git merge main" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Terminal */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Terminal Git
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Terminal Output */}
              <div className="bg-black rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto font-mono text-sm text-green-400">
                {output.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {line || "\u00A0"}
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-blue-400">({currentBranch})</span>
                  <span className="text-white mr-2">$</span>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && executeCommand()}
                    className="flex-1 bg-transparent text-white outline-none"
                    placeholder="Escribe un comando git..."
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={executeCommand} className="gap-2">
                  <Play className="h-4 w-4" />
                  Ejecutar
                </Button>
                <Button variant="outline" onClick={resetSimulator} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reiniciar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Visual Commit Tree */}
          <Card>
            <CardHeader>
              <CardTitle>Visualización de Commits</CardTitle>
            </CardHeader>
            <CardContent>
              {commits.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <GitCommit className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay commits aún.</p>
                  <p className="text-sm">Usa <code className="bg-muted px-1 rounded">&quot;git commit&quot;</code> para crear el primero.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex items-end gap-4 min-w-max py-4">
                    {commits.map((commit, idx) => {
                      const branch = branches.find((b) => b.name === commit.branch);
                      return (
                        <div key={commit.id} className="flex flex-col items-center">
                          {/* Connection line */}
                          {idx > 0 && (
                            <div
                              className="h-8 border-l-2 mb-2"
                              style={{ borderColor: branch?.color }}
                            />
                          )}
                          {/* Commit node */}
                          <div
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xs border-4"
                            style={{
                              backgroundColor: branch?.color,
                              borderColor: branch?.color,
                            }}
                            title={commit.message}
                          >
                            {commit.id.substring(0, 4)}
                          </div>
                          {/* Branch label */}
                          <div className="mt-2 text-xs text-muted-foreground">
                            {commit.branch}
                          </div>
                          {/* Commit message */}
                          <div className="mt-1 text-xs text-center max-w-[100px] truncate">
                            {commit.message}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Commands Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comandos de Ejemplo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleCommands.map((sample, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="w-full justify-start text-sm font-mono"
                  onClick={() => setCommand(sample.command)}
                >
                  {sample.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ramas Actuales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {branches.map((branch) => (
                  <div
                    key={branch.name}
                    className={`flex items-center gap-2 p-2 rounded ${
                      branch.name === currentBranch ? "bg-muted" : ""
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: branch.color }}
                    />
                    <span className="text-sm font-medium">{branch.name}</span>
                    {branch.name === currentBranch && (
                      <span className="text-xs text-muted-foreground">(actual)</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Guía Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><code className="bg-muted px-1 rounded">git init</code> - Inicializar repo</li>
                <li><code className="bg-muted px-1 rounded">git add .</code> - Agregar cambios</li>
                <li><code className="bg-muted px-1 rounded">&quot;git commit -m msg&quot;</code> - Confirmar</li>
                <li><code className="bg-muted px-1 rounded">git branch &lt;nombre&gt;</code> - Crear rama</li>
                <li><code className="bg-muted px-1 rounded">git checkout &lt;rama&gt;</code> - Cambiar rama</li>
                <li><code className="bg-muted px-1 rounded">git merge &lt;rama&gt;</code> - Fusionar</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
