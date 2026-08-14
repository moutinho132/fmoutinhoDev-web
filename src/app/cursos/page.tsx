import { Metadata } from "next";
import CoursesClient from "./CoursesClient";
import AdBanner from "@/components/ads/AdBanner";

export const metadata: Metadata = {
  title: "Cursos | fmoutinhoDev",
  description: "Catálogo de cursos y tutoriales de desarrollo de software. Java, SQL, Git, JavaScript y más.",
};

export default function CursosPage() {
  return (
    <>
      <CoursesClient />
      {/* In-article Ad */}
      <section className="py-6 container max-w-4xl">
        <AdBanner slot="3675072962" format="fluid" layout="in-article" />
      </section>
    </>
  );
}
