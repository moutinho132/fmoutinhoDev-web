"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackDownloadCV } from "@/lib/metaPixel";
import { Menu, X, Download, Youtube, Code2, GraduationCap, User, Home } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownloadCV = () => {
    trackDownloadCV();
    // Aquí se colocaría el enlace real al CV PDF
    window.open("/cv-fernando-moutinho.pdf", "_blank");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Code2 className="h-6 w-6" />
          <span className="font-bold text-xl">fmoutinhoDev</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Home className="h-4 w-4" />
            <span>Inicio</span>
          </Link>
          <Link href="/#sobre-mi" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <User className="h-4 w-4" />
            <span>Sobre Mí</span>
          </Link>
          <Link href="/cursos" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <GraduationCap className="h-4 w-4" />
            <span>Cursos</span>
          </Link>
          <Link href="/playground/sql" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Code2 className="h-4 w-4" />
            <span>Playgrounds</span>
          </Link>
          <Link href="/#youtube" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Youtube className="h-4 w-4" />
            <span>YouTube</span>
          </Link>
          <Button onClick={handleDownloadCV} className="gap-2">
            <Download className="h-4 w-4" />
            Descargar CV
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container flex flex-col space-y-4 py-4">
            <Link href="/" className="flex items-center space-x-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
            <Link href="/#sobre-mi" className="flex items-center space-x-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              <User className="h-4 w-4" />
              <span>Sobre Mí</span>
            </Link>
            <Link href="/cursos" className="flex items-center space-x-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              <GraduationCap className="h-4 w-4" />
              <span>Cursos</span>
            </Link>
            <Link href="/playground/sql" className="flex items-center space-x-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              <Code2 className="h-4 w-4" />
              <span>Playgrounds</span>
            </Link>
            <Link href="/#youtube" className="flex items-center space-x-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              <Youtube className="h-4 w-4" />
              <span>YouTube</span>
            </Link>
            <Button onClick={handleDownloadCV} className="gap-2 w-full">
              <Download className="h-4 w-4" />
              Descargar CV
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
