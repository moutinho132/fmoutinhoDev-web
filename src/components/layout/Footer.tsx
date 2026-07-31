import Link from "next/link";
import { Youtube, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">fmoutinhoDev</h3>
            <p className="text-sm text-muted-foreground">
              Ingeniero de Sistemas especializado en Backend y Fullstack Development.
              +8 años de experiencia construyendo soluciones escalables.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Enlaces Rápidos</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link href="/cursos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cursos
              </Link>
              <Link href="/playground/sql" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                SQL Playground
              </Link>
              <Link href="/playground/js" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                JavaScript Playground
              </Link>
              <Link href="/playground/git" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Git Simulator
              </Link>
            </nav>
          </div>

          {/* Legal Links - Required for Meta Ads */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Términos de Servicio
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Sígueme</h4>
            <div className="flex space-x-4">
              <a
                href="https://youtube.com/@fmoutinhodev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/fmoutinho"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/fmoutinho"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@fmoutinho.dev"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} fmoutinhoDev. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
