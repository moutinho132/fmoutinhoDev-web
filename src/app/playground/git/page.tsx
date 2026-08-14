import GitSimulator from "@/components/playground/GitSimulator";
import AdBanner from "@/components/ads/AdBanner";

export const metadata = {
  title: "Git Simulator | fmoutinhoDev",
  description: "Practica comandos de Git en un entorno seguro. Visualiza commits y ramas en tiempo real.",
};

export default function GitPlaygroundPage() {
  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Simulador de Git</h1>
          <p className="text-muted-foreground mt-2">
            Practica comandos de Git en un entorno seguro. Visualiza el árbol de commits y ramas en tiempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <GitSimulator />
          </div>
          <div className="lg:col-span-1">
            <AdBanner slot="9818155394" format="vertical" />
          </div>
        </div>
      </div>
    </div>
  );
}
