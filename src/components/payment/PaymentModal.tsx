"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  CreditCard, 
  Wallet, 
  QrCode, 
  Check, 
  Loader2,
  Shield,
  Clock,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  fee: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "stripe",
    name: "Tarjeta de Crédito/Débito",
    icon: <CreditCard className="h-6 w-6" />,
    description: "Visa, Mastercard, American Express",
    fee: "Sin comisión adicional",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: <Wallet className="h-6 w-6" />,
    description: "Pago seguro con PayPal",
    fee: "Sin comisión adicional",
  },
  {
    id: "binance",
    name: "Binance Pay",
    icon: <QrCode className="h-6 w-6" />,
    description: "Crypto USDT, BTC, BNB",
    fee: "Sin comisión adicional",
  },
];

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency?: string;
  };
}

export default function PaymentModal({ isOpen, onClose, product }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    setPaymentStatus("idle");

    try {
      const response = await fetch(`/api/payments/${selectedMethod}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: selectedMethod === "binance" ? "create-order" : "create-order",
          amount: product.price,
          currency: selectedMethod === "binance" ? "USDT" : "USD",
          productName: product.name,
          description: product.description,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (selectedMethod === "stripe" && data.checkoutUrl) {
          // Redirect to Stripe Checkout
          window.location.href = data.checkoutUrl;
        } else if (selectedMethod === "paypal" && data.approvalUrl) {
          // Redirect to PayPal
          window.location.href = data.approvalUrl;
        } else if (selectedMethod === "binance") {
          // Show QR code for Binance Pay
          setCheckoutUrl(data.qrCode || data.demoUrl);
          setPaymentStatus("success");
        }
      } else {
        setPaymentStatus("error");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Completar Pago</DialogTitle>
          <DialogDescription>
            Selecciona tu método de pago preferido
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Summary */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">USD</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Método de Pago
            </h4>
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      selectedMethod === method.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium">{method.name}</h5>
                        {selectedMethod === method.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                      <p className="text-xs text-green-600 mt-1">{method.fee}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Pago 100% seguro. Tus datos están protegidos.</span>
          </div>

          {/* Payment Status */}
          {paymentStatus === "success" && checkoutUrl && (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-500/10 rounded-lg">
                <Check className="h-12 w-12 mx-auto text-green-600" />
                <p className="mt-2 font-medium text-green-600">
                  Escanea el código QR con Binance Pay
                </p>
              </div>
              {checkoutUrl && (
                <img
                  src={checkoutUrl}
                  alt="Binance Pay QR"
                  className="mx-auto rounded-lg shadow-lg"
                />
              )}
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                El pago expira en 15 minutos
              </p>
            </div>
          )}

          {paymentStatus === "error" && (
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <p className="text-destructive">
                Error al procesar el pago. Por favor intenta de nuevo.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handlePayment}
              disabled={!selectedMethod || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  Pagar ${product.price.toFixed(2)}
                </>
              )}
            </Button>
          </div>

          {/* Contact Support */}
          <p className="text-xs text-center text-muted-foreground">
            ¿Problemas con el pago?{" "}
            <a
              href="mailto:moutinho132@gmail.com"
              className="text-primary hover:underline"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
