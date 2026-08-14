import { Metadata } from "next";
import ComingSoon from "@/components/playground/ComingSoon";

export const metadata: Metadata = {
  title: "Kotlin Playground | fmoutinhoDev",
  description: "Alternativa moderna a Java para Android y backend.",
};

export default function KotlinPlayground() {
  return (
    <ComingSoon
      title="Kotlin Playground"
      description="Alternativa moderna a Java para Android y backend. Código conciso, seguro e interoperable con Java."
      language="Kotlin"
      features={[
        "Null Safety",
        "Coroutines",
        "Extension Functions",
        "Data Classes",
        "Android Development",
        "Ktor / Spring Kotlin",
      ]}
    />
  );
}
