"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackStartPlayground } from "@/lib/metaPixel";
import { Play, RotateCcw, Container, Box, Layers, Terminal } from "lucide-react";

interface ContainerInfo {
  id: string;
  name: string;
  image: string;
  status: "running" | "stopped" | "exited";
  ports: string[];
  created: Date;
}

interface ImageInfo {
  name: string;
  tag: string;
  size: string;
}

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

export default function DockerSimulator() {
  const [containers, setContainers] = useState<ContainerInfo[]>([]);
  const [images, setImages] = useState<ImageInfo[]>([
    { name: "nginx", tag: "latest", size: "142MB" },
    { name: "python", tag: "3.11-slim", size: "150MB" },
    { name: "node", tag: "18-alpine", size: "170MB" },
    { name: "postgres", tag: "15", size: "379MB" },
    { name: "redis", tag: "alpine", size: "32MB" },
  ]);
  const [command, setCommand] = useState<string>("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: "output", content: "¡Bienvenido al Simulador de Docker!" },
    { type: "output", content: "Escribe comandos como: docker run, docker ps, docker images, docker stop, docker rm" },
    { type: "output", content: "" },
  ]);
  const [hasTracked, setHasTracked] = useState(false);

  const addOutput = useCallback((content: string, type: TerminalLine["type"] = "output") => {
    setTerminalHistory((prev) => [...prev, { type, content }]);
  }, []);

  const generateContainerId = (): string => {
    return Math.random().toString(16).substring(2, 12);
  };

  const executeCommand = useCallback(() => {
    // Track playground usage
    if (!hasTracked) {
      trackStartPlayground("docker");
      setHasTracked(true);
    }

    const cmd = command.trim();
    if (!cmd) return;

    addOutput(`$ ${cmd}`, "input");

    const parts = cmd.split(/\s+/);
    const dockerCmd = parts[1];

    switch (dockerCmd) {
      case "run":
        handleDockerRun(parts);
        break;
      case "ps":
        handleDockerPs(parts);
        break;
      case "images":
        handleDockerImages();
        break;
      case "stop":
        handleDockerStop(parts);
        break;
      case "start":
        handleDockerStart(parts);
        break;
      case "rm":
        handleDockerRm(parts);
        break;
      case "rmi":
        handleDockerRmi(parts);
        break;
      case "pull":
        handleDockerPull(parts);
        break;
      case "exec":
        handleDockerExec(parts);
        break;
      case "logs":
        handleDockerLogs(parts);
        break;
      case "build":
        handleDockerBuild(parts);
        break;
      default:
        addOutput(`docker: '${dockerCmd}' no es un comando válido.`, "error");
        addOutput("Comandos disponibles: run, ps, images, stop, start, rm, rmi, pull, exec, logs, build", "output");
    }

    setCommand("");
    setTerminalHistory((prev) => [...prev, { type: "output", content: "" }]);
  }, [command, containers, images, hasTracked, addOutput]);

  const handleDockerRun = (parts: string[]) => {
    const flags: Record<string, string> = {};
    let imageName = "";
    let containerName = "";

    // Parse flags
    for (let i = 2; i < parts.length; i++) {
      if (parts[i] === "-d" || parts[i] === "--detach") {
        flags.detach = "true";
      } else if (parts[i] === "-p" || parts[i] === "--publish") {
        flags.port = parts[i + 1];
        i++;
      } else if (parts[i] === "--name") {
        containerName = parts[i + 1];
        i++;
      } else if (!parts[i].startsWith("-")) {
        imageName = parts[i];
      }
    }

    if (!imageName) {
      addOutput("Uso: docker run [OPCIONES] IMAGEN [COMANDO]", "error");
      return;
    }

    // Parse image name and tag
    const [name, tag = "latest"] = imageName.includes(":") 
      ? imageName.split(":") 
      : [imageName, "latest"];

    // Check if image exists
    const imageExists = images.some((img) => img.name === name);
    if (!imageExists) {
      addOutput(`Unable to find image '${name}:${tag}' locally`, "output");
      addOutput(`Pulling ${name}:${tag}...`, "output");
      // Add image to list
      setImages((prev) => [...prev, { name, tag, size: "~100MB" }]);
    }

    const containerId = generateContainerId();
    const newContainer: ContainerInfo = {
      id: containerId,
      name: containerName || `${name}-${containerId.substring(0, 6)}`,
      image: `${name}:${tag}`,
      status: "running",
      ports: flags.port ? [flags.port] : [],
      created: new Date(),
    };

    setContainers((prev) => [...prev, newContainer]);

    addOutput(`Container ID: ${containerId}`, "output");
    if (flags.detach) {
      addOutput("Container iniciado en modo detach.", "output");
    }
  };

  const handleDockerPs = (parts: string[]) => {
    const showAll = parts.includes("-a") || parts.includes("--all");

    const filteredContainers = showAll 
      ? containers 
      : containers.filter((c) => c.status === "running");

    if (filteredContainers.length === 0) {
      addOutput("No hay contenedores.", "output");
      return;
    }

    addOutput("CONTAINER ID   NAME               IMAGE              STATUS      PORTS", "output");
    filteredContainers.forEach((c) => {
      const status = c.status === "running" ? "Up" : "Exited";
      const ports = c.ports.length > 0 ? c.ports.join(", ") : "-";
      addOutput(
        `${c.id.substring(0, 12).padEnd(14)}${c.name.padEnd(20)}${c.image.padEnd(19)}${status.padEnd(12)}${ports}`,
        "output"
      );
    });
  };

  const handleDockerImages = () => {
    if (images.length === 0) {
      addOutput("No hay imágenes.", "output");
      return;
    }

    addOutput("REPOSITORY     TAG           SIZE", "output");
    images.forEach((img) => {
      addOutput(`${img.name.padEnd(15)}${img.tag.padEnd(14)}${img.size}`, "output");
    });
  };

  const handleDockerStop = (parts: string[]) => {
    const identifier = parts[2];
    if (!identifier) {
      addOutput("Uso: docker stop CONTENEDOR", "error");
      return;
    }

    const container = containers.find(
      (c) => c.id.startsWith(identifier) || c.name === identifier
    );

    if (!container) {
      addOutput(`Error: No such container: ${identifier}`, "error");
      return;
    }

    setContainers((prev) =>
      prev.map((c) =>
        c.id === container.id ? { ...c, status: "exited" } : c
      )
    );

    addOutput(container.id, "output");
  };

  const handleDockerStart = (parts: string[]) => {
    const identifier = parts[2];
    if (!identifier) {
      addOutput("Uso: docker start CONTENEDOR", "error");
      return;
    }

    const container = containers.find(
      (c) => c.id.startsWith(identifier) || c.name === identifier
    );

    if (!container) {
      addOutput(`Error: No such container: ${identifier}`, "error");
      return;
    }

    setContainers((prev) =>
      prev.map((c) =>
        c.id === container.id ? { ...c, status: "running" } : c
      )
    );

    addOutput(container.id, "output");
  };

  const handleDockerRm = (parts: string[]) => {
    const identifier = parts[2];
    if (!identifier) {
      addOutput("Uso: docker rm CONTENEDOR", "error");
      return;
    }

    const container = containers.find(
      (c) => c.id.startsWith(identifier) || c.name === identifier
    );

    if (!container) {
      addOutput(`Error: No such container: ${identifier}`, "error");
      return;
    }

    if (container.status === "running") {
      addOutput(`Error: No se puede eliminar un contenedor en ejecución. Usa 'docker stop' primero.`, "error");
      return;
    }

    setContainers((prev) => prev.filter((c) => c.id !== container.id));
    addOutput(container.id, "output");
  };

  const handleDockerRmi = (parts: string[]) => {
    const imageName = parts[2];
    if (!imageName) {
      addOutput("Uso: docker rmi IMAGEN", "error");
      return;
    }

    const [name, tag = "latest"] = imageName.includes(":") 
      ? imageName.split(":") 
      : [imageName, "latest"];

    const imageIndex = images.findIndex(
      (img) => img.name === name && img.tag === tag
    );

    if (imageIndex === -1) {
      addOutput(`Error: No such image: ${imageName}`, "error");
      return;
    }

    // Check if any container uses this image
    const containerUsingImage = containers.find(
      (c) => c.image === `${name}:${tag}`
    );

    if (containerUsingImage) {
      addOutput(`Error: La imagen está siendo usada por el contenedor ${containerUsingImage.name}`, "error");
      return;
    }

    setImages((prev) => prev.filter((_, i) => i !== imageIndex));
    addOutput(`Untagged: ${name}:${tag}`, "output");
    addOutput(`Deleted: ${name}:${tag}`, "output");
  };

  const handleDockerPull = (parts: string[]) => {
    const imageName = parts[2];
    if (!imageName) {
      addOutput("Uso: docker pull IMAGEN", "error");
      return;
    }

    const [name, tag = "latest"] = imageName.includes(":") 
      ? imageName.split(":") 
      : [imageName, "latest"];

    addOutput(`Pulling from library/${name}`, "output");
    addOutput(`Digest: sha256:${generateContainerId()}...`, "output");
    addOutput(`Status: Downloaded newer image for ${name}:${tag}`, "output");

    setImages((prev) => {
      if (prev.some((img) => img.name === name && img.tag === tag)) {
        return prev;
      }
      return [...prev, { name, tag, size: "~100MB" }];
    });
  };

  const handleDockerExec = (parts: string[]) => {
    const hasIt = parts.includes("-it");
    const identifierIndex = hasIt ? 3 : 2;
    const identifier = parts[identifierIndex];

    if (!identifier) {
      addOutput("Uso: docker exec [-it] CONTENEDOR COMANDO", "error");
      return;
    }

    const container = containers.find(
      (c) => c.id.startsWith(identifier) || c.name === identifier
    );

    if (!container) {
      addOutput(`Error: No such container: ${identifier}`, "error");
      return;
    }

    if (container.status !== "running") {
      addOutput(`Error: Container ${identifier} is not running`, "error");
      return;
    }

    const commandExec = parts.slice(identifierIndex + 1).join(" ");
    addOutput(`Ejecutando: ${commandExec}`, "output");
    addOutput("Comando simulado ejecutado correctamente.", "output");
  };

  const handleDockerLogs = (parts: string[]) => {
    const identifier = parts[2];
    if (!identifier) {
      addOutput("Uso: docker logs CONTENEDOR", "error");
      return;
    }

    const container = containers.find(
      (c) => c.id.startsWith(identifier) || c.name === identifier
    );

    if (!container) {
      addOutput(`Error: No such container: ${identifier}`, "error");
      return;
    }

    addOutput(`Logs de ${container.name}:`, "output");
    addOutput(`[${new Date().toISOString()}] Container started`, "output");
    addOutput(`[${new Date().toISOString()}] Ready to accept connections`, "output");
  };

  const handleDockerBuild = (parts: string[]) => {
    const tagIndex = parts.indexOf("-t");
    let imageName = "myimage:latest";

    if (tagIndex !== -1 && parts[tagIndex + 1]) {
      imageName = parts[tagIndex + 1];
    }

    addOutput("Sending build context to Docker daemon...", "output");
    addOutput("Step 1/5 : FROM alpine:latest", "output");
    addOutput(" ---> abc123def456", "output");
    addOutput("Step 2/5 : RUN apk add --no-cache python3", "output");
    addOutput(" ---> Running in xyz789...", "output");
    addOutput("Removing intermediate container xyz789", "output");
    addOutput(" ---> def456abc123", "output");
    addOutput("Step 3/5 : COPY . /app", "output");
    addOutput(" ---> 123abc456def", "output");
    addOutput("Step 4/5 : WORKDIR /app", "output");
    addOutput(" ---> 456def123abc", "output");
    addOutput("Step 5/5 : CMD ['python3', 'app.py']", "output");
    addOutput(" ---> Running in final...", "output");
    addOutput(`Successfully built ${generateContainerId()}`, "output");
    addOutput(`Successfully tagged ${imageName}`, "output");

    const [name, tag = "latest"] = imageName.includes(":") 
      ? imageName.split(":") 
      : [imageName, "latest"];

    setImages((prev) => {
      if (prev.some((img) => img.name === name && img.tag === tag)) {
        return prev;
      }
      return [...prev, { name, tag, size: "~50MB" }];
    });
  };

  const resetSimulator = () => {
    setContainers([]);
    setImages([
      { name: "nginx", tag: "latest", size: "142MB" },
      { name: "python", tag: "3.11-slim", size: "150MB" },
      { name: "node", tag: "18-alpine", size: "170MB" },
      { name: "postgres", tag: "15", size: "379MB" },
      { name: "redis", tag: "alpine", size: "32MB" },
    ]);
    setCommand("");
    setTerminalHistory([
      { type: "output", content: "Simulador reiniciado." },
      { type: "output", content: "Escribe comandos como: docker run, docker ps, docker images, docker stop, docker rm" },
      { type: "output", content: "" },
    ]);
    setHasTracked(false);
  };

  const sampleCommands = [
    { label: "docker run nginx", command: "docker run -d nginx" },
    { label: "docker run con puerto", command: "docker run -d -p 8080:80 --name web nginx" },
    { label: "Listar contenedores", command: "docker ps -a" },
    { label: "Listar imágenes", command: "docker images" },
    { label: "Detener contenedor", command: "docker stop web" },
    { label: "Iniciar contenedor", command: "docker start web" },
    { label: "Eliminar contenedor", command: "docker rm web" },
    { label: "Pull imagen", command: "docker pull ubuntu:22.04" },
    { label: "Ver logs", command: "docker logs web" },
    { label: "Exec interactivo", command: "docker exec -it web /bin/bash" },
    { label: "Build imagen", command: "docker build -t myapp:1.0 ." },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Terminal */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Terminal Docker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Terminal Output */}
              <div className="bg-black rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto font-mono text-sm">
                {terminalHistory.map((line, idx) => (
                  <div
                    key={idx}
                    className={`whitespace-pre-wrap ${
                      line.type === "input"
                        ? "text-blue-400"
                        : line.type === "error"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {line.content || "\u00A0"}
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-white mr-2">$</span>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && executeCommand()}
                    className="flex-1 bg-transparent text-white outline-none"
                    placeholder="Escribe un comando docker..."
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

          {/* Containers Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Container className="h-5 w-5" />
                Contenedores Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {containers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Box className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay contenedores.</p>
                  <p className="text-sm">Usa <code className="bg-muted px-1 rounded">docker run</code> para crear uno.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {containers.map((container) => (
                    <div
                      key={container.id}
                      className={`p-4 rounded-lg border-2 ${
                        container.status === "running"
                          ? "border-green-500 bg-green-500/10"
                          : "border-gray-500 bg-gray-500/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{container.name}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            container.status === "running"
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {container.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Image: {container.image}</p>
                        <p>ID: {container.id.substring(0, 12)}</p>
                        {container.ports.length > 0 && (
                          <p>Ports: {container.ports.join(", ")}</p>
                        )}
                      </div>
                    </div>
                  ))}
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
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Imágenes Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {images.map((img, idx) => (
                  <div key={idx} className="text-sm p-2 bg-muted rounded">
                    <span className="font-medium">{img.name}</span>
                    <span className="text-muted-foreground">:{img.tag}</span>
                    <span className="text-xs text-muted-foreground ml-2">({img.size})</span>
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
                <li><code className="bg-muted px-1 rounded">docker run</code> - Crear contenedor</li>
                <li><code className="bg-muted px-1 rounded">docker ps -a</code> - Ver contenedores</li>
                <li><code className="bg-muted px-1 rounded">docker images</code> - Ver imágenes</li>
                <li><code className="bg-muted px-1 rounded">docker stop/start</code> - Controlar</li>
                <li><code className="bg-muted px-1 rounded">docker rm</code> - Eliminar contenedor</li>
                <li><code className="bg-muted px-1 rounded">docker pull</code> - Descargar imagen</li>
                <li><code className="bg-muted px-1 rounded">docker exec -it</code> - Ejecutar comando</li>
                <li><code className="bg-muted px-1 rounded">docker logs</code> - Ver logs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
