import JsSandbox from "@/components/playground/JsSandbox";
import AdBanner from "@/components/ads/AdBanner";

export const metadata = {
  title: "JavaScript Playground | fmoutinhoDev",
  description: "Escribe y ejecuta código JavaScript directamente en tu navegador. Ideal para principiantes.",
};

export default function JsPlaygroundPage() {
  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">JavaScript Playground</h1>
          <p className="text-muted-foreground mt-2">
            Escribe y ejecuta código JavaScript directamente en tu navegador. Perfecto para practicar y aprender.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <JsSandbox />
          </div>
          <div className="lg:col-span-1">
            <AdBanner slot="js-sidebar" format="vertical" />
          </div>
        </div>
      </div>
    </div>
  );
}
