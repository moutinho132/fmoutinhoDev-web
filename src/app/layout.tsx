import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fmoutinhoDev | Fullstack & Java Backend Engineer",
  description:
    "Portafolio profesional de Fernando Moutinho - Ingeniero de Sistemas con +8 años de experiencia en desarrollo backend y fullstack. Tutoriales de Java, SQL, Git y más.",
  keywords: [
    "Java",
    "Spring Boot",
    "Backend",
    "Fullstack",
    "SQL",
    "Git",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React",
    "Fernando Moutinho",
    "fmoutinhoDev",
  ],
  authors: [{ name: "Fernando Moutinho" }],
  openGraph: {
    title: "fmoutinhoDev | Fullstack & Java Backend Engineer",
    description:
      "Portafolio profesional de Fernando Moutinho - Ingeniero de Sistemas con +8 años de experiencia en desarrollo backend y fullstack.",
    type: "website",
    locale: "es_ES",
    url: "https://fmoutinho.dev",
    siteName: "fmoutinhoDev",
  },
  twitter: {
    card: "summary_large_image",
    title: "fmoutinhoDev | Fullstack & Java Backend Engineer",
    description:
      "Portafolio profesional de Fernando Moutinho - Ingeniero de Sistemas con +8 años de experiencia.",
    creator: "@fmoutinhoDev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Meta Pixel Script - Replace YOUR_PIXEL_ID with actual ID */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with actual ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
