import { Metadata } from "next";
import ComingSoon from "@/components/playground/ComingSoon";

export const metadata: Metadata = {
  title: "Rust Playground | fmoutinhoDev",
  description: "Aprende Rust con ejemplos interactivos. Memoria segura sin garbage collector.",
};

export default function RustPlayground() {
  return (
    <ComingSoon
      title="Rust Playground"
      description="Aprende Rust con ejemplos interactivos. Memoria segura sin garbage collector. Ownership, borrowing y lifetimes explicados de forma práctica."
      language="Rust"
      features={[
        "Ownership y Borrowing",
        "Lifetimes",
        "Pattern Matching",
        "Traits y Generics",
        "Async/Await",
        "Cargo y Crates",
      ]}
    />
  );
}
