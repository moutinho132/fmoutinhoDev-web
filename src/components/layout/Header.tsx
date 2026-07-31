"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackDownloadCV } from "@/lib/metaPixel";
import { Menu, X, Download, Youtube, Code2, GraduationCap, User, Home, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownloadCV = () => {
    trackDownloadCV();
    window.open("/cv-fernando-moutinho.pdf", "_blank");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            <Code2 className="relative h-7 w-7 text-primary" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            <span className="gradient-text">fmoutinho</span>
            <span className="text-foreground">Dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link href="/" className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary">
            <Home className="h-4 w-4" />
            <span>Inicio</span>
          </Link>
          <Link href="/#sobre-mi" className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary">
            <User className="h-4 w-4" />
            <span>Sobre Mí</span>
          </Link>
          <Link href="/practicas" className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Prácticas IA</span>
          </Link>
          <Link href="/cursos" className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary">
            <GraduationCap className="h-4 w-4" />
            <span>Cursos</span>
          </Link>
          <Link href="/playground/sql" className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary">
            <Code2 className="h-4 w-4" />
            <span>Playgrounds</span>
          </Link>
          <Link href="/#youtube" className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 hover:text-primary">
            <Youtube className="h-4 w-4" />
            <span>YouTube</span>
          </Link>
          <Button onClick={handleDownloadCV} className="ml-4 gap-2 glow bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25">
            <Download className="h-4 w-4" />
            Descargar CV
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl">
          <nav className="container flex flex-col space-y-1 py-4">
            <Link href="/" className="flex items-center space-x-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
              <Home className="h-4 w-4 text-primary" />
              <span>Inicio</span>
            </Link>
            <Link href="/#sobre-mi" className="flex items-center space-x-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
              <User className="h-4 w-4 text-primary" />
              <span>Sobre Mí</span>
            </Link>
            <Link href="/practicas" className="flex items-center space-x-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Prácticas IA</span>
            </Link>
            <Link href="/cursos" className="flex items-center space-x-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
              <GraduationCap className="h-4 w-4 text-primary" />
              <span>Cursos</span>
            </Link>
            <Link href="/playground/sql" className="flex items-center space-x-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
              <Code2 className="h-4 w-4 text-primary" />
              <span>Playgrounds</span>
            </Link>
            <Link href="/#youtube" className="flex items-center space-x-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
              <Youtube className="h-4 w-4 youtube-accent" />
              <span>YouTube</span>
            </Link>
            <div className="pt-2">
              <Button onClick={handleDownloadCV} className="gap-2 w-full bg-gradient-to-r from-primary to-primary/80">
                <Download className="h-4 w-4" />
                Descargar CV
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
