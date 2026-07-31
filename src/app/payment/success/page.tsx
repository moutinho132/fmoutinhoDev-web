"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ArrowRight, Download } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentData, setPaymentData] = useState<{
    verified: boolean;
    productName?: string;
    amount?: number;
    email?: string;
  } | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const paymentMethod = searchParams.get("method") || "stripe";

    const verifyPayment = async () => {
      try {
        if (sessionId) {
          const response = await fetch(`/api/payments/${paymentMethod}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "verify",
              sessionId,
            }),
          });

          const data = await response.json();
          setPaymentData({
            verified: data.success,
            productName: data.productName,
            amount: data.amount,
            email: data.customerEmail,
          });
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">
              Verificando tu pago...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-500/5 to-background p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold">¡Pago Exitoso!</h1>
              <p className="text-muted-foreground mt-2">
                Tu transacción ha sido procesada correctamente
              </p>
            </div>

            {/* Payment Details */}
            {paymentData && (
              <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                {paymentData.productName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Producto:</span>
                    <span className="font-medium">{paymentData.productName}</span>
                  </div>
                )}
                {paymentData.amount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monto:</span>
                    <span className="font-medium">${paymentData.amount.toFixed(2)}</span>
                  </div>
                )}
                {paymentData.email && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-sm">{paymentData.email}</span>
                  </div>
                )}
              </div>
            )}

            {/* Email Confirmation Notice */}
            <div className="bg-blue-500/10 text-blue-600 p-4 rounded-lg text-sm">
              <p>
                📧 Hemos enviado un correo de confirmación a{" "}
                <strong>{paymentData?.email || "tu email"}</strong> con los detalles de tu compra.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full gap-2" asChild>
                <Link href="/cursos">
                  <ArrowRight className="h-4 w-4" />
                  Ir a Mis Cursos
                </Link>
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Descargar Factura
              </Button>
            </div>

            {/* Support */}
            <p className="text-xs text-muted-foreground">
              ¿Tienes preguntas?{" "}
              <a
                href="mailto:moutinho132@gmail.com"
                className="text-primary hover:underline"
              >
                Contáctanos
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">
              Cargando...
            </p>
          </CardContent>
        </Card>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
