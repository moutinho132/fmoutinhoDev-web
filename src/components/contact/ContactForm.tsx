"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  User, 
  Mail, 
  Building2, 
  Briefcase, 
  CheckCircle2,
  Loader2,
  MessageSquare
} from "lucide-react";

type SenderType = "recruiter" | "company" | "other";

const senderTypes: { value: SenderType; label: string; icon: typeof User }[] = [
  { value: "recruiter", label: "Reclutador", icon: User },
  { value: "company", label: "Empresa", icon: Building2 },
  { value: "other", label: "Otro", icon: MessageSquare },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  position: string;
  senderType: SenderType;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    position: "",
    senderType: "recruiter",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          position: "",
          senderType: "recruiter",
          subject: "",
          message: "",
        });
      } else {
        setError("Error al enviar el mensaje. Por favor, intenta de nuevo.");
      }
    } catch (err) {
      setError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold">¡Mensaje enviado!</h3>
          <p className="text-muted-foreground">
            Gracias por contactarme. Responderé lo antes posible.
          </p>
          <Button
            variant="outline"
            onClick={() => setSuccess(false)}
            className="mt-4"
          >
            Enviar otro mensaje
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sender Type Selection */}
      <div>
        <label className="text-sm font-medium mb-3 block">Tipo de contacto</label>
        <div className="flex flex-wrap gap-2">
          {senderTypes.map((type) => (
            <Button
              key={type.value}
              type="button"
              variant={formData.senderType === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFormData({ ...formData, senderType: type.value })}
              className={formData.senderType === type.value ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              <type.icon className="h-4 w-4 mr-2" />
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Name & Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tu nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      {/* Company & Position (for recruiters) */}
      {(formData.senderType === "recruiter" || formData.senderType === "company") && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Empresa</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nombre de la empresa"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cargo</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tu puesto"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      )}

      {/* Subject */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Asunto *</label>
        <Input
          placeholder="¿Sobre qué quieres hablar?"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Mensaje *</label>
        <Textarea
          placeholder="Escribe tu mensaje aquí..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Enviar Mensaje
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Al enviar este formulario, aceptas que tus datos sean procesados para responder tu consulta.
      </p>
    </form>
  );
}
