"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface AdBannerProps {
  slot: string;
  format?: "horizontal" | "vertical" | "rectangle" | "auto";
  className?: string;
  responsive?: boolean;
}

// Google AdSense Publisher ID
const ADSENSE_PUBLISHER_ID = "ca-pub-3568057064524681";

export default function AdBanner({ 
  slot, 
  format = "auto", 
  className = "",
  responsive = true 
}: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Si no hay AdSense configurado, mostrar contenido alternativo después de un delay
    if (!ADSENSE_PUBLISHER_ID) {
      const timer = setTimeout(() => setShowFallback(true), 1000);
      return () => clearTimeout(timer);
    }

    // Intentar cargar el anuncio
    try {
      // @ts-expectError - AdSense global
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).adsbygoogle) {
        // @ts-expectError - Push ad to AdSense queue
        (window as unknown as Record<string, { push: (arg: unknown) => void }>).adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch (error) {
      console.error("AdSense error:", error);
      setShowFallback(true);
    }
  }, []);

  const dimensions = {
    horizontal: "min-h-[90px] md:min-h-[100px]",
    vertical: "min-h-[300px] md:min-h-[600px]",
    rectangle: "min-h-[250px] md:min-h-[280px]",
    auto: "min-h-[100px] md:min-h-[150px]",
  };

  // Contenido alternativo cuando no hay anuncios
  const FallbackContent = () => (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        {/* Promoción propia */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
          <p className="font-semibold text-primary">¿Quieres aprender Java?</p>
          <p className="text-sm text-muted-foreground mt-1">
            Curso completo de Spring Boot y microservicios
          </p>
          <a 
            href="/cursos" 
            className="inline-block mt-2 text-sm font-medium text-primary hover:underline"
          >
            Ver cursos →
          </a>
        </div>
      </div>
    </div>
  );

  // Si no hay Publisher ID configurado, mostrar placeholder con promoción propia
  if (!ADSENSE_PUBLISHER_ID || showFallback) {
    return (
      <div
        className={`
          bg-muted/30 border border-border rounded-lg overflow-hidden
          ${dimensions[format]}
          ${className}
        `}
      >
        <FallbackContent />
      </div>
    );
  }

  return (
    <>
      {/* Google AdSense Script - Solo se carga una vez */}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* Ad Container */}
      <div className={`ad-container ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ 
            display: "block",
            width: responsive ? "100%" : undefined,
          }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format={format === "auto" ? "auto" : undefined}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </>
  );
}

// Componente para anuncios inline en contenido
export function InlineAd({ slot }: { slot: string }) {
  return (
    <div className="my-8">
      <AdBanner slot={slot} format="horizontal" />
    </div>
  );
}

// Componente para sidebar ads
export function SidebarAd({ slot }: { slot: string }) {
  return (
    <div className="sticky top-24">
      <AdBanner slot={slot} format="vertical" />
    </div>
  );
}

// Componente para promocionar contenido propio
export function SelfPromoCard({ 
  title, 
  description, 
  href, 
  cta = "Ver más" 
}: { 
  title: string; 
  description: string; 
  href: string;
  cta?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
      <a 
        href={href}
        className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:underline"
      >
        {cta}
        <span>→</span>
      </a>
    </div>
  );
}
