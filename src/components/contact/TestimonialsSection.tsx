"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Quote, ChevronLeft, ChevronRight, Plus, Loader2, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  date: string;
  approved: boolean;
}

// Testimonios de ejemplo (estos vendrían de una base de datos en producción)
const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "María García",
    role: "Tech Lead",
    company: "TechCorp",
    content: "Fernando es un desarrollador excepcional. Su capacidad para resolver problemas complejos y su dominio de Spring Boot nos permitió entregar el proyecto antes de lo previsto. Altamente recomendado.",
    rating: 5,
    date: "2024-01-15",
    approved: true,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    role: "CTO",
    company: "StartupX",
    content: "Trabajar con Fernando fue una experiencia muy positiva. Tiene una gran capacidad de comunicación y siempre está dispuesto a ayudar al equipo. Su código es limpio y bien documentado.",
    rating: 5,
    date: "2024-02-20",
    approved: true,
  },
  {
    id: "3",
    name: "Ana Martínez",
    role: "HR Manager",
    company: "GlobalDev",
    content: "Fernando demostró ser un profesional completo. No solo tiene excelentes habilidades técnicas, sino también gran capacidad de trabajo en equipo y adaptabilidad.",
    rating: 5,
    date: "2024-03-10",
    approved: true,
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial),
      });

      if (response.ok) {
        setSuccess(true);
        setNewTestimonial({ name: "", role: "", company: "", content: "", rating: 5 });
        setTimeout(() => {
          setShowForm(false);
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Error submitting testimonial:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const approvedTestimonials = testimonials.filter((t) => t.approved);

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Lo que dicen de mí</h2>
            <p className="text-muted-foreground mt-1">
              Testimonios de reclutadores y colegas
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowForm(!showForm)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Dejar testimonio</span>
          </Button>
        </div>

        {/* Add Testimonial Form */}
        {showForm && (
          <Card className="mb-8 border-purple-500/30">
            <CardContent className="pt-6">
              {success ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                  <p className="font-medium">¡Gracias por tu testimonio!</p>
                  <p className="text-sm text-muted-foreground">Será revisado y publicado pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input
                      placeholder="Tu nombre"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Tu cargo"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Empresa"
                      value={newTestimonial.company}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                      required
                    />
                  </div>

                  <Textarea
                    placeholder="Escribe tu testimonio..."
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    rows={3}
                    required
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground mr-2">Valoración:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                          className="p-1"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= newTestimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar"}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {/* Testimonials Carousel */}
        {approvedTestimonials.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {approvedTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-1">
                    <Card className="border-2 hover:border-purple-500/30 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {testimonial.name.charAt(0)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h4 className="font-semibold">{testimonial.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {testimonial.role} en {testimonial.company}
                                </p>
                              </div>
                              <div className="flex items-center gap-0.5 shrink-0">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                              </div>
                            </div>

                            {/* Quote */}
                            <div className="relative">
                              <Quote className="absolute -left-2 -top-2 h-6 w-6 text-purple-500/20" />
                              <p className="text-muted-foreground italic pl-4">
                                &ldquo;{testimonial.content}&rdquo;
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            {approvedTestimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {approvedTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentIndex
                          ? "bg-purple-600"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
