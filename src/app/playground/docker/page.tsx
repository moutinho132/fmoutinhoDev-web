import DockerSimulator from "@/components/playground/DockerSimulator";
import AdBanner from "@/components/ads/AdBanner";

export const metadata = {
  title: "Docker Simulator | fmoutinhoDev",
  description: "Aprende Docker de forma interactiva. Practica comandos docker run, ps, stop, build y más en un entorno seguro.",
};

export default function DockerPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Docker Simulator</h1>
        <p className="text-muted-foreground">
          Aprende Docker de forma interactiva. Ejecuta comandos en un entorno simulado sin riesgo.
        </p>
      </div>

      <AdBanner slot="9818155394" format="horizontal" />

      <DockerSimulator />

      <div className="mt-8">
        <AdBanner slot="9818155394" format="horizontal" />
      </div>
    </main>
  );
}
