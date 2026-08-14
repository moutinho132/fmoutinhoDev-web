import { Metadata } from "next";
import ComingSoon from "@/components/playground/ComingSoon";

export const metadata: Metadata = {
  title: "C/C++ Playground | fmoutinhoDev",
  description: "Fundamentos de programación de sistemas con C y C++.",
};

export default function CppPlayground() {
  return (
    <ComingSoon
      title="C/C++ Playground"
      description="Fundamentos de programación de sistemas. Punteros, memoria, estructuras de datos y programación orientada a objetos."
      language="C/C++"
      features={[
        "Punteros y Memoria",
        "Estructuras de Datos",
        "Programación Orientada a Objetos",
        "Templates (C++)",
        "STL",
        "Make y CMake",
      ]}
    />
  );
}
