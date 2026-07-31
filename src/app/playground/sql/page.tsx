import SqlEditor from "@/components/playground/SqlEditor";
import AdBanner from "@/components/ads/AdBanner";

export const metadata = {
  title: "SQL Playground | fmoutinhoDev",
  description: "Ejecuta consultas SQL en memoria con SQLite WASM. Aprende SELECT, JOIN, GROUP BY y más.",
};

export default function SqlPlaygroundPage() {
  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SQL Playground</h1>
          <p className="text-muted-foreground mt-2">
            Ejecuta consultas SQL en memoria usando SQLite compilado a WebAssembly. Sin configuración, sin backend.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <SqlEditor />
          </div>
          <div className="lg:col-span-1">
            <AdBanner slot="sql-sidebar" format="vertical" />
          </div>
        </div>
      </div>
    </div>
  );
}
