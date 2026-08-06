import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import TestimonialsSection from "@/components/contact/TestimonialsSection";

export const metadata: Metadata = {
  title: "Contacto | fmoutinhoDev",
  description: "¿Eres reclutador? Contáctame para oportunidades laborales. Déjame un mensaje o testimonio sobre tu experiencia trabajando conmigo.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-purple-500/5 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              ¿Eres Reclutador?
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Estoy abierto a nuevas oportunidades laborales. Contáctame para discutir 
              cómo puedo aportar valor a tu equipo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envíame un mensaje</h2>
              <ContactForm />
            </div>

            {/* Info Side */}
            <div className="space-y-8">
              {/* Quick Info */}
              <div className="rounded-2xl border bg-card p-6 space-y-4">
                <h3 className="text-xl font-semibold">Información de contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">contacto@fmoutinho.dev</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <p className="font-medium">Remoto / Disponible mundialmente</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <svg className="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <a href="https://linkedin.com/in/fmoutinho" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-purple-500 transition-colors">
                        linkedin.com/in/fmoutinho
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Disponible para trabajar
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Actualmente busco oportunidades como Desarrollador Backend/Full Stack. 
                  Disponible para proyectos remotos o presenciales.
                </p>
              </div>

              {/* Tech Stack */}
              <div className="rounded-2xl border bg-card p-6">
                <h3 className="text-xl font-semibold mb-4">Stack Principal</h3>
                <div className="flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "TypeScript", "Node.js", "React", "Next.js", "PostgreSQL", "Docker", "AWS", "Git"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}
