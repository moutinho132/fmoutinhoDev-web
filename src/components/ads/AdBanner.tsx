"use client";

interface AdBannerProps {
  slot: string;
  format?: "horizontal" | "vertical" | "rectangle";
  className?: string;
}

export default function AdBanner({ slot, format = "rectangle", className = "" }: AdBannerProps) {
  // This is a placeholder for the ad banner component
  // In production, this would integrate with Google AdSense or Meta Ads
  
  const dimensions = {
    horizontal: "h-24 md:h-28",
    vertical: "h-64 md:h-96",
    rectangle: "h-64 md:h-72",
  };

  return (
    <div
      className={`
        bg-muted/50 border-2 border-dashed border-muted-foreground/20 
        rounded-lg flex items-center justify-center
        ${dimensions[format]}
        ${className}
      `}
      aria-label="Espacio publicitario"
    >
      <div className="text-center text-muted-foreground/50 text-sm">
        <p>Espacio Publicitario</p>
        <p className="text-xs mt-1">Slot: {slot}</p>
      </div>
    </div>
  );
}
