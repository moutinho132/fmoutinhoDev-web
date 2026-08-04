import { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Cursos | fmoutinhoDev",
  description: "Catálogo de cursos y tutoriales de desarrollo de software. Java, SQL, Git, JavaScript y más.",
};

export default function CursosPage() {
  return <CoursesClient />;
}
