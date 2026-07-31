import PythonSandbox from "@/components/playground/PythonSandbox";
import AdBanner from "@/components/ads/AdBanner";

export const metadata = {
  title: "Python Playground | fmoutinhoDev",
  description: "Practica Python directamente en el navegador con ejemplos interactivos. Ideal para aprender programación y data science.",
};

export default function PythonPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Python Playground</h1>
        <p className="text-muted-foreground">
          Ejecuta código Python directamente en tu navegador usando Pyodide. Sin instalación necesaria.
        </p>
      </div>

      <AdBanner slot="python-top" />

      <PythonSandbox />

      <div className="mt-8">
        <AdBanner slot="python-bottom" />
      </div>
    </main>
  );
}
