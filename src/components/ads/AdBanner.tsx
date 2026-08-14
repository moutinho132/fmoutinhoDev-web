"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "horizontal" | "vertical" | "rectangle" | "auto" | "fluid" | "autorelaxed";
  className?: string;
  responsive?: boolean;
  layoutKey?: string;
  layout?: string; // Para in-article
}

// Google AdSense Publisher ID
const ADSENSE_PUBLISHER_ID = "ca-pub-3568057064524681";

export default function AdBanner({ 
  slot, 
  format = "auto", 
  className = "",
  responsive = true,
  layoutKey,
  layout
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;
    
    // Evitar push duplicado
    if (isAdPushed.current) return;

    // Verificar si el slot parece válido (es numérico)
    const isValidSlot = /^\d+$/.test(slot);
    if (!isValidSlot) {
      console.log(`AdSense: Slot "${slot}" no es válido.`);
      return;
    }

    try {
      // @ts-expectError - AdSense global
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        isAdPushed.current = true;
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [slot]);

  const dimensions = {
    horizontal: "min-h-[90px] md:min-h-[100px]",
    vertical: "min-h-[300px] md:min-h-[600px]",
    rectangle: "min-h-[250px] md:min-h-[280px]",
    auto: "min-h-[100px] md:min-h-[150px]",
    fluid: "min-h-[100px]",
    autorelaxed: "min-h-[200px]",
  };

  // Contenido alternativo cuando no hay slot válido
  const FallbackContent = () => (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-lg p-4 border border-purple-500/20">
          <p className="font-semibold text-purple-600 dark:text-purple-400">¿Quieres aprender Java?</p>
          <p className="text-sm text-muted-foreground mt-1">
            Curso completo de Spring Boot y microservicios
          </p>
          <a 
            href="/cursos" 
            className="inline-block mt-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
          >
            Ver cursos →
          </a>
        </div>
      </div>
    </div>
  );

  // Verificar si el slot es válido (numérico)
  const isValidSlot = /^\d+$/.test(slot);

  // Si no hay slot válido, mostrar contenido propio
  if (!isValidSlot) {
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
    <div className={`ad-container ${className} ${dimensions[format]}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: "block",
          width: responsive ? "100%" : undefined,
          textAlign: layout === "in-article" ? "center" : undefined,
        }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout || undefined}
        data-ad-layout-key={layoutKey || undefined}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

// Componente para anuncios in-article
export function InArticleAd({ slot }: { slot: string }) {
  return (
    <div className="my-8">
      <AdBanner slot={slot} format="fluid" layout="in-article" />
    </div>
  );
}

// Componente para artículos relacionados
export function RelatedArticlesAd({ slot }: { slot: string }) {
  return (
    <div className="my-8">
      <AdBanner slot={slot} format="autorelaxed" />
    </div>
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
