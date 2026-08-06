"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Star, 
  User, 
  Building2, 
  Mail, 
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";

interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  position?: string;
  senderType: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  createdAt: string;
  approved: boolean;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesRes, testimonialsRes] = await Promise.all([
          fetch("/api/contact"),
          fetch("/api/testimonials"),
        ]);
        
        if (messagesRes.ok) {
          const data = await messagesRes.json();
          setMessages(data.messages || []);
        }
        
        if (testimonialsRes.ok) {
          const data = await testimonialsRes.json();
          setTestimonials(data.testimonials || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pendingTestimonials = testimonials.filter((t) => !t.approved);
  const approvedTestimonials = testimonials.filter((t) => t.approved);
  const unreadMessages = messages.filter((m) => !m.read);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Volver
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Panel de administración</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{messages.length}</p>
                  <p className="text-sm text-muted-foreground">Mensajes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingTestimonials.length}</p>
                  <p className="text-sm text-muted-foreground">Testimonios pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedTestimonials.length}</p>
                  <p className="text-sm text-muted-foreground">Testimonios aprobados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Mensajes
              {unreadMessages.length > 0 && (
                <Badge className="ml-1 bg-red-500">{unreadMessages.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <Star className="h-4 w-4" />
              Testimonios
              {pendingTestimonials.length > 0 && (
                <Badge className="ml-1 bg-yellow-500">{pendingTestimonials.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No hay mensajes aún</p>
                  </CardContent>
                </Card>
              ) : (
                messages.map((msg, idx) => (
                  <Card key={idx} className={msg.read ? "" : "border-purple-500/30 bg-purple-500/5"}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline">{msg.senderType}</Badge>
                            <span className="font-medium">{msg.name}</span>
                            <span className="text-muted-foreground">•</span>
                            <a href={`mailto:${msg.email}`} className="text-purple-600 hover:underline text-sm">
                              {msg.email}
                            </a>
                          </div>
                          
                          {(msg.company || msg.position) && (
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {msg.company && (
                                <span className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {msg.company}
                                </span>
                              )}
                              {msg.position && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {msg.position}
                                </span>
                              )}
                            </div>
                          )}

                          <div>
                            <h4 className="font-medium">{msg.subject}</h4>
                            <p className="text-muted-foreground text-sm mt-1">{msg.message}</p>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDate(msg.createdAt)}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4 mr-1" />
                            Responder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="space-y-6">
              {/* Pending */}
              {pendingTestimonials.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    Pendientes de aprobación
                  </h3>
                  <div className="space-y-4">
                    {pendingTestimonials.map((testimonial) => (
                      <Card key={testimonial.id} className="border-yellow-500/30 bg-yellow-500/5">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{testimonial.name}</span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">
                                  {testimonial.role} en {testimonial.company}
                                </span>
                              </div>
                              <div className="flex gap-0.5">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                              </div>
                              <p className="text-muted-foreground">{testimonial.content}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(testimonial.createdAt)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Aprobar
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4 mr-1" />
                                Rechazar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Approved */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Aprobados ({approvedTestimonials.length})
                </h3>
                <div className="space-y-4">
                  {approvedTestimonials.map((testimonial) => (
                    <Card key={testimonial.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{testimonial.name}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">
                                {testimonial.role} en {testimonial.company}
                              </span>
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{testimonial.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
