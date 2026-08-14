import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Construction, ArrowLeft, CheckCircle2, Bell } from "lucide-react";
import Link from "next/link";
import AdBanner from "@/components/ads/AdBanner";

interface ComingSoonProps {
  title: string;
  description: string;
  language: string;
  features: string[];
}

export default function ComingSoon({ title, description, language, features }: ComingSoonProps) {
  return (
    <main className="container py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>

        {/* Main Card */}
        <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
          <CardContent className="pt-8 pb-8 text-center space-y-6">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
              <Construction className="h-10 w-10 text-white" />
            </div>

            {/* Title & Badge */}
            <div className="space-y-2">
              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                Próximamente
              </Badge>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                {description}
              </p>
            </div>

            {/* Features Preview */}
            <div className="bg-muted/50 rounded-xl p-6 text-left">
              <h3 className="font-semibold mb-4 text-center">Lo que podrás aprender:</h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                <Bell className="h-4 w-4" />
                Notificarme cuando esté listo
              </Button>
              <Button variant="outline" asChild>
                <Link href="/playground/sql">
                  Probar SQL Playground
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ad */}
        <AdBanner slot="9818155394" format="horizontal" />
      </div>
    </main>
  );
}
