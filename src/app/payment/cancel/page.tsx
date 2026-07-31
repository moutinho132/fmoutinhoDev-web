"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-500/5 to-background p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Cancel Icon */}
            <div className="mx-auto w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center">
              <X className="h-10 w-10 text-orange-600" />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold">Pago Cancelado</h1>
              <p className="text-muted-foreground mt-2">
                Tu transacción fue cancelada. No se realizó ningún cargo.
              </p>
            </div>

            {/* Info */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p>
                Si tuviste algún problema durante el proceso de pago, 
                puedes intentarlo de nuevo o contactarnos para ayudarte.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full gap-2" asChild>
                <Link href="/cursos">
                  <RefreshCcw className="h-4 w-4" />
                  Intentar de Nuevo
                </Link>
              </Button>
              <Button variant="outline" className="w-full gap-2" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al Inicio
                </Link>
              </Button>
            </div>

            {/* Support */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                ¿Necesitas ayuda?
              </p>
              <a
                href="mailto:moutinho132@gmail.com"
                className="text-primary hover:underline font-medium"
              >
                moutinho132@gmail.com
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
